"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, RotateCcw } from "lucide-react"
import { MoleculeStructurePreview } from "@/components/molecules/molecule-structure-preview"
import { updateMolecule } from "@/app/actions/molecules"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  formula: z.string().min(1, { message: "Chemical formula is required" }),
  smiles: z.string().min(1, { message: "SMILES notation is required" }),
  inchi: z.string().optional(),
  inchikey: z.string().optional(),
  cas: z.string().optional(),
  molecularWeight: z.coerce.number().positive({ message: "Molecular weight must be positive" }),
  source: z.string().min(1, { message: "Source is required" }),
  sourceId: z.string().optional(),
  sourceUrl: z.string().url({ message: "Must be a valid URL" }).optional().or(z.literal("")),
  isVerified: z.boolean().default(false),
  notes: z.string().optional(),
  freezingPoint: z.coerce.number().optional(),
  viscosity: z.coerce.number().optional(),
  toxicity: z.coerce.number().optional(),
  permeability: z.coerce.number().optional(),
  osmolality: z.coerce.number().optional(),
})

type FormValues = z.infer<typeof formSchema>

export function EditMoleculeForm({ molecule }: { molecule: any }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [showResetDialog, setShowResetDialog] = useState(false)
  const [originalValues, setOriginalValues] = useState<FormValues | null>(null)

  // Initialize form with molecule data
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: molecule.name || "",
      formula: molecule.formula || "",
      smiles: molecule.smiles || "",
      inchi: molecule.inchi || "",
      inchikey: molecule.inchikey || "",
      cas: molecule.cas || "",
      molecularWeight: molecule.molecular_weight || 0,
      source: molecule.source || "",
      sourceId: molecule.source_id || "",
      sourceUrl: molecule.source_url || "",
      isVerified: molecule.is_verified || false,
      notes: molecule.notes || "",
      freezingPoint: molecule.properties?.freezing_point?.value || undefined,
      viscosity: molecule.properties?.viscosity?.value || undefined,
      toxicity: molecule.properties?.toxicity?.value || undefined,
      permeability: molecule.properties?.permeability?.value || undefined,
      osmolality: molecule.properties?.osmolality?.value || undefined,
    },
  })

  // Store original values for reset functionality
  useEffect(() => {
    if (!originalValues) {
      setOriginalValues(form.getValues())
    }
  }, [form, originalValues])

  // Track form changes
  useEffect(() => {
    const subscription = form.watch(() => {
      if (originalValues) {
        const currentValues = form.getValues()
        const changed = Object.keys(currentValues).some(
          (key) => currentValues[key as keyof FormValues] !== originalValues[key as keyof FormValues],
        )
        setHasChanges(changed)
      }
    })
    return () => subscription.unsubscribe()
  }, [form, originalValues])

  // Reset form to original values
  const handleReset = () => {
    if (originalValues) {
      form.reset(originalValues)
      setHasChanges(false)
      setShowResetDialog(false)
      toast({
        title: "Form Reset",
        description: "All changes have been discarded",
      })
    }
  }

  // Handle form submission
  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)

    try {
      // Create FormData object
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value))
        }
      })

      // Submit the form
      const result = await updateMolecule(molecule.id, formData)

      if (result.success) {
        toast({
          title: "Molecule Updated",
          description: "The molecule has been successfully updated",
        })
        // Update original values
        setOriginalValues(data)
        setHasChanges(false)
        // Navigate to molecule detail page
        router.push(`/molecules/${molecule.id}`)
        router.refresh()
      } else {
        toast({
          variant: "destructive",
          title: "Update Failed",
          description: result.error || "Failed to update molecule",
        })
      }
    } catch (error) {
      console.error("Error updating molecule:", error)
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "An unexpected error occurred",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => router.push(`/molecules/${molecule.id}`)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Details
        </Button>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowResetDialog(true)}
            disabled={!hasChanges || isSubmitting}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset Changes
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Left column - Basic Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Edit the basic information about this cryoprotectant molecule</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Molecule Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Glycerol" {...field} />
                        </FormControl>
                        <FormDescription>The common name of the molecule</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="formula"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chemical Formula</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., C3H8O3" {...field} />
                        </FormControl>
                        <FormDescription>The chemical formula of the molecule</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cas"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CAS Number</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 56-81-5" {...field} />
                        </FormControl>
                        <FormDescription>Chemical Abstracts Service registry number</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="molecularWeight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Molecular Weight (g/mol)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Chemical Identifiers</CardTitle>
                  <CardDescription>Edit the chemical identifiers for this molecule</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="smiles"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SMILES Notation</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., C(C(CO)O)O" {...field} />
                        </FormControl>
                        <FormDescription>Simplified Molecular Input Line Entry System notation</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="inchi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>InChI</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., InChI=1S/C3H8O3/c4-1-3(6)2-5/h3,5-6H,1-2H2,4H"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormDescription>International Chemical Identifier</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="inchikey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>InChIKey</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., PEDCQBHIVMGVHV-UHFFFAOYSA-N" {...field} value={field.value || ""} />
                        </FormControl>
                        <FormDescription>Hashed version of the InChI</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Right column - Properties and Structure */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Molecular Structure</CardTitle>
                  <CardDescription>Preview of the molecular structure</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <MoleculeStructurePreview smiles={form.watch("smiles")} className="h-64 w-full max-w-md" />
                </CardContent>
              </Card>

              <Tabs defaultValue="cryoprotectant">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="cryoprotectant">Cryoprotectant Properties</TabsTrigger>
                  <TabsTrigger value="general">General Properties</TabsTrigger>
                </TabsList>
                <TabsContent value="cryoprotectant" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Cryoprotectant Properties</CardTitle>
                      <CardDescription>Edit properties relevant to cryoprotection research</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="freezingPoint"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Freezing Point (°C)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.1"
                                {...field}
                                value={field.value === undefined ? "" : field.value}
                                onChange={(e) => {
                                  const value = e.target.value === "" ? undefined : Number.parseFloat(e.target.value)
                                  field.onChange(value)
                                }}
                              />
                            </FormControl>
                            <FormDescription>Temperature at which the molecule freezes</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="permeability"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cell Permeability (%)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.1"
                                {...field}
                                value={field.value === undefined ? "" : field.value}
                                onChange={(e) => {
                                  const value = e.target.value === "" ? undefined : Number.parseFloat(e.target.value)
                                  field.onChange(value)
                                }}
                              />
                            </FormControl>
                            <FormDescription>Ability to permeate cell membranes</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="toxicity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Toxicity (scale 0-10)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.1"
                                min="0"
                                max="10"
                                {...field}
                                value={field.value === undefined ? "" : field.value}
                                onChange={(e) => {
                                  const value = e.target.value === "" ? undefined : Number.parseFloat(e.target.value)
                                  field.onChange(value)
                                }}
                              />
                            </FormControl>
                            <FormDescription>Toxicity level (0 = non-toxic, 10 = highly toxic)</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="osmolality"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Osmolality (mOsm/kg)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="1"
                                {...field}
                                value={field.value === undefined ? "" : field.value}
                                onChange={(e) => {
                                  const value = e.target.value === "" ? undefined : Number.parseFloat(e.target.value)
                                  field.onChange(value)
                                }}
                              />
                            </FormControl>
                            <FormDescription>Concentration of osmotically active particles</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="general" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>General Properties</CardTitle>
                      <CardDescription>Edit general physical properties</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="viscosity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Viscosity (cP)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.1"
                                {...field}
                                value={field.value === undefined ? "" : field.value}
                                onChange={(e) => {
                                  const value = e.target.value === "" ? undefined : Number.parseFloat(e.target.value)
                                  field.onChange(value)
                                }}
                              />
                            </FormControl>
                            <FormDescription>Resistance to flow (centipoise)</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="source"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Data Source</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., PubChem" {...field} />
                            </FormControl>
                            <FormDescription>Where this molecule data was sourced from</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="sourceId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Source ID</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 753" {...field} value={field.value || ""} />
                            </FormControl>
                            <FormDescription>Identifier in the source database</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="sourceUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Source URL</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., https://pubchem.ncbi.nlm.nih.gov/compound/753"
                                {...field}
                                value={field.value || ""}
                              />
                            </FormControl>
                            <FormDescription>Link to the source data</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <Card>
                <CardHeader>
                  <CardTitle>Additional Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Additional notes about this molecule..."
                            className="min-h-32"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isVerified"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Verified Data</FormLabel>
                          <FormDescription>Mark this molecule as having verified data</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.push(`/molecules/${molecule.id}`)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                "Saving..."
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>

      {/* Reset confirmation dialog */}
      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Changes</DialogTitle>
            <DialogDescription>
              Are you sure you want to reset all changes? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowResetDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReset}>
              Reset
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

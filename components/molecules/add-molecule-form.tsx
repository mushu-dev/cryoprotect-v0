"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, HelpCircle, RefreshCw, AlertCircle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { MoleculeStructurePreview } from "./molecule-structure-preview"

// Form schema for validation
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  formula: z.string().min(1, {
    message: "Formula is required.",
  }),
  smiles: z.string().min(1, {
    message: "SMILES notation is required.",
  }),
  inchi: z.string().optional(),
  inchikey: z.string().optional(),
  cas: z.string().optional(),
  molecularWeight: z.number().positive({
    message: "Molecular weight must be a positive number.",
  }),
  source: z.string().min(1, {
    message: "Source is required.",
  }),
  sourceId: z.string().optional(),
  sourceUrl: z.string().url().optional().or(z.literal("")),
  isVerified: z.boolean().default(false),
  notes: z.string().optional(),
  // Physical properties
  freezingPoint: z.number().optional(),
  viscosity: z.number().optional(),
  toxicity: z.number().min(0).max(10).optional(),
  permeability: z.number().min(0).max(100).optional(),
  osmolality: z.number().optional(),
})

type FormValues = z.infer<typeof formSchema>

export function AddMoleculeForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDerivingProperties, setIsDerivingProperties] = useState(false)
  const [structurePreviewKey, setStructurePreviewKey] = useState(0)

  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      formula: "",
      smiles: "",
      inchi: "",
      inchikey: "",
      cas: "",
      molecularWeight: 0,
      source: "Manual Entry",
      sourceId: "",
      sourceUrl: "",
      isVerified: false,
      notes: "",
      freezingPoint: undefined,
      viscosity: undefined,
      toxicity: undefined,
      permeability: undefined,
      osmolality: undefined,
    },
  })

  // Function to derive properties from SMILES
  const derivePropertiesFromSMILES = async () => {
    const smiles = form.getValues("smiles")
    if (!smiles) {
      toast({
        title: "SMILES notation required",
        description: "Please enter a valid SMILES notation to derive properties.",
        variant: "destructive",
      })
      return
    }

    setIsDerivingProperties(true)
    try {
      // In a real implementation, this would call a chemistry API
      // For now, we'll simulate a response with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate derived data (in a real app, this would come from an API)
      if (smiles === "CS(=O)C") {
        // DMSO
        form.setValue("name", "Dimethyl Sulfoxide")
        form.setValue("formula", "C₂H₆OS")
        form.setValue("inchi", "InChI=1S/C2H6OS/c1-4(2)3/h1-2H3")
        form.setValue("inchikey", "IAZDPXIOMUYVGZ-UHFFFAOYSA-N")
        form.setValue("cas", "67-68-5")
        form.setValue("molecularWeight", 78.13)
        form.setValue("freezingPoint", 18.5)
        form.setValue("viscosity", 1.996)
        form.setValue("toxicity", 3)
        form.setValue("permeability", 85)
        form.setValue("osmolality", 1000)
      } else {
        // Generic derivation for other molecules
        form.setValue("formula", "Derived Formula")
        form.setValue("inchi", "Derived InChI")
        form.setValue("inchikey", "Derived InChIKey")
        form.setValue("molecularWeight", 100)
      }

      // Refresh the structure preview
      setStructurePreviewKey((prev) => prev + 1)

      toast({
        title: "Properties derived",
        description: "Molecule properties have been derived from SMILES notation.",
      })
    } catch (error) {
      toast({
        title: "Error deriving properties",
        description: "There was an error deriving properties from SMILES notation.",
        variant: "destructive",
      })
    } finally {
      setIsDerivingProperties(false)
    }
  }

  // Function to search for a molecule by CAS number
  const searchByCAS = async () => {
    const cas = form.getValues("cas")
    if (!cas) {
      toast({
        title: "CAS number required",
        description: "Please enter a valid CAS number to search.",
        variant: "destructive",
      })
      return
    }

    setIsDerivingProperties(true)
    try {
      // In a real implementation, this would call a chemistry database API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate found data (in a real app, this would come from an API)
      if (cas === "67-68-5") {
        // DMSO
        form.setValue("name", "Dimethyl Sulfoxide")
        form.setValue("formula", "C₂H₆OS")
        form.setValue("smiles", "CS(=O)C")
        form.setValue("inchi", "InChI=1S/C2H6OS/c1-4(2)3/h1-2H3")
        form.setValue("inchikey", "IAZDPXIOMUYVGZ-UHFFFAOYSA-N")
        form.setValue("molecularWeight", 78.13)
        form.setValue("freezingPoint", 18.5)
        form.setValue("viscosity", 1.996)
        form.setValue("toxicity", 3)
        form.setValue("permeability", 85)
        form.setValue("osmolality", 1000)
        form.setValue("source", "PubChem")
        form.setValue("sourceId", "679")
        form.setValue("sourceUrl", "https://pubchem.ncbi.nlm.nih.gov/compound/679")

        // Refresh the structure preview
        setStructurePreviewKey((prev) => prev + 1)

        toast({
          title: "Molecule found",
          description: "Molecule information has been retrieved from the database.",
        })
      } else {
        toast({
          title: "Molecule not found",
          description: "No molecule was found with the provided CAS number.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error searching molecule",
        description: "There was an error searching for the molecule.",
        variant: "destructive",
      })
    } finally {
      setIsDerivingProperties(false)
    }
  }

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    try {
      // In a real implementation, this would call your API to save the molecule
      console.log("Submitting molecule:", data)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Molecule added",
        description: "The molecule has been successfully added to the database.",
      })

      // Redirect to the molecules list
      router.push("/molecules")
    } catch (error) {
      toast({
        title: "Error adding molecule",
        description: "There was an error adding the molecule to the database.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left column - Basic information and structure preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter the basic details of the molecule</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Dimethyl Sulfoxide" {...field} />
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
                      <FormLabel>Formula</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., C₂H₆OS" {...field} />
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
                      <div className="flex items-center justify-between">
                        <FormLabel>CAS Number</FormLabel>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={searchByCAS}
                          disabled={isDerivingProperties}
                        >
                          {isDerivingProperties ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <RefreshCw className="mr-2 h-4 w-4" />
                          )}
                          Search
                        </Button>
                      </div>
                      <FormControl>
                        <Input placeholder="e.g., 67-68-5" {...field} />
                      </FormControl>
                      <FormDescription>Chemical Abstracts Service registry number (optional)</FormDescription>
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
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="e.g., 78.13"
                          {...field}
                          onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
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
                        <FormLabel>Verified Molecule</FormLabel>
                        <FormDescription>Mark this molecule as verified if the data has been validated</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Molecular Structure</CardTitle>
                <CardDescription>Visualize the molecular structure</CardDescription>
              </CardHeader>
              <CardContent>
                <MoleculeStructurePreview
                  key={structurePreviewKey}
                  smiles={form.watch("smiles")}
                  name={form.watch("name")}
                />
              </CardContent>
            </Card>
          </div>

          {/* Right column - Chemical identifiers and properties */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Chemical Identifiers</CardTitle>
                <CardDescription>Enter the chemical identifiers of the molecule</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="smiles"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>SMILES Notation</FormLabel>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={derivePropertiesFromSMILES}
                          disabled={isDerivingProperties}
                        >
                          {isDerivingProperties ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <RefreshCw className="mr-2 h-4 w-4" />
                          )}
                          Derive Properties
                        </Button>
                      </div>
                      <FormControl>
                        <Input placeholder="e.g., CS(=O)C" {...field} />
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
                          placeholder="e.g., InChI=1S/C2H6OS/c1-4(2)3/h1-2H3"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormDescription>International Chemical Identifier (optional)</FormDescription>
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
                        <Input placeholder="e.g., IAZDPXIOMUYVGZ-UHFFFAOYSA-N" {...field} value={field.value || ""} />
                      </FormControl>
                      <FormDescription>Hashed version of the InChI (optional)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />

                <FormField
                  control={form.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Source</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a source" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Manual Entry">Manual Entry</SelectItem>
                          <SelectItem value="PubChem">PubChem</SelectItem>
                          <SelectItem value="ChemSpider">ChemSpider</SelectItem>
                          <SelectItem value="ChEMBL">ChEMBL</SelectItem>
                          <SelectItem value="DrugBank">DrugBank</SelectItem>
                          <SelectItem value="Literature">Literature</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>The source of the molecule data</FormDescription>
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
                        <Input placeholder="e.g., 679" {...field} value={field.value || ""} />
                      </FormControl>
                      <FormDescription>The ID of the molecule in the source database (optional)</FormDescription>
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
                          placeholder="e.g., https://pubchem.ncbi.nlm.nih.gov/compound/679"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormDescription>The URL of the molecule in the source database (optional)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Physical Properties</CardTitle>
                <CardDescription>Enter the physical properties of the molecule</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="cryoprotectant" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="cryoprotectant">Cryoprotectant Properties</TabsTrigger>
                    <TabsTrigger value="general">General Properties</TabsTrigger>
                  </TabsList>
                  <TabsContent value="cryoprotectant" className="space-y-4 pt-4">
                    <Alert className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        These properties are particularly relevant for cryoprotectant research.
                      </AlertDescription>
                    </Alert>

                    <FormField
                      control={form.control}
                      name="freezingPoint"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2">
                            <FormLabel>Freezing Point (°C)</FormLabel>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-xs">
                                    The temperature at which the molecule transitions from liquid to solid state.
                                    Critical for cryoprotectant applications.
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.1"
                              placeholder="e.g., 18.5"
                              {...field}
                              value={field.value === undefined ? "" : field.value}
                              onChange={(e) =>
                                field.onChange(e.target.value ? Number.parseFloat(e.target.value) : undefined)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="permeability"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2">
                            <FormLabel>Permeability (%)</FormLabel>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-xs">
                                    The ability of the molecule to penetrate cell membranes. Higher values indicate
                                    better penetration.
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              step="1"
                              placeholder="e.g., 85"
                              {...field}
                              value={field.value === undefined ? "" : field.value}
                              onChange={(e) =>
                                field.onChange(e.target.value ? Number.parseFloat(e.target.value) : undefined)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="toxicity"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2">
                            <FormLabel>Toxicity (0-10)</FormLabel>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-xs">
                                    The toxicity level of the molecule on a scale of 0-10. Lower values indicate less
                                    toxicity.
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              max="10"
                              step="0.1"
                              placeholder="e.g., 3"
                              {...field}
                              value={field.value === undefined ? "" : field.value}
                              onChange={(e) =>
                                field.onChange(e.target.value ? Number.parseFloat(e.target.value) : undefined)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="osmolality"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2">
                            <FormLabel>Osmolality (mOsm/kg)</FormLabel>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-xs">
                                    The concentration of osmotically active particles in solution. Important for
                                    understanding osmotic effects on cells.
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <FormControl>
                            <Input
                              type="number"
                              step="1"
                              placeholder="e.g., 1000"
                              {...field}
                              value={field.value === undefined ? "" : field.value}
                              onChange={(e) =>
                                field.onChange(e.target.value ? Number.parseFloat(e.target.value) : undefined)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  <TabsContent value="general" className="space-y-4 pt-4">
                    <FormField
                      control={form.control}
                      name="viscosity"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2">
                            <FormLabel>Viscosity (cP)</FormLabel>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-xs">
                                    The resistance of a fluid to flow. Measured in centipoise (cP).
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.001"
                              placeholder="e.g., 1.996"
                              {...field}
                              value={field.value === undefined ? "" : field.value}
                              onChange={(e) =>
                                field.onChange(e.target.value ? Number.parseFloat(e.target.value) : undefined)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Additional general properties could be added here */}
                    <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md">
                      <p className="text-muted-foreground text-sm">
                        Additional general properties can be added in this section
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
            <CardDescription>Add any additional notes or information about the molecule</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter any additional notes or information about the molecule..."
                      className="min-h-[100px]"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.push("/molecules")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding Molecule...
                </>
              ) : (
                "Add Molecule"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

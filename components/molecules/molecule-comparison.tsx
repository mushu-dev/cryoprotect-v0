"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MoleculeIcon } from "@/components/icons/molecule-icon"
import { Download, X, Plus, BarChart2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"

interface MoleculeComparisonProps {
  moleculeIds?: string[]
  className?: string
}

export function MoleculeComparison({ moleculeIds = [], className }: MoleculeComparisonProps) {
  const [selectedMolecules, setSelectedMolecules] = useState<any[]>([])
  const [availableMolecules, setAvailableMolecules] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("basic")
  const [highlightDifferences, setHighlightDifferences] = useState(true)

  // Sample data for molecules
  const molecules = [
    {
      id: "mol-001",
      name: "Dimethyl Sulfoxide",
      formula: "C₂H₆OS",
      molecularWeight: 78.13,
      structure: "/molecules/dmso.svg",
      properties: {
        freezingPoint: 18.5,
        molarConcentration: 14.1,
        viscosity: 1.996,
        toxicity: 3,
        permeability: 85,
        osmolality: 1000,
        logP: -1.35,
        tpsa: 36.28,
      },
      isVerified: true,
      createdAt: "2023-01-15T00:00:00Z",
      updatedAt: "2023-03-20T00:00:00Z",
    },
    {
      id: "mol-002",
      name: "Glycerol",
      formula: "C₃H₈O₃",
      molecularWeight: 92.09,
      structure: "/molecules/glycerol.svg",
      properties: {
        freezingPoint: 17.8,
        molarConcentration: 13.7,
        viscosity: 1.412,
        toxicity: 1,
        permeability: 65,
        osmolality: 850,
        logP: -1.76,
        tpsa: 60.69,
      },
      isVerified: true,
      createdAt: "2023-01-20T00:00:00Z",
      updatedAt: "2023-03-22T00:00:00Z",
    },
    {
      id: "mol-003",
      name: "Ethylene Glycol",
      formula: "C₂H₆O₂",
      molecularWeight: 62.07,
      structure: "/molecules/eg.svg",
      properties: {
        freezingPoint: -12.9,
        molarConcentration: 17.8,
        viscosity: 1.61,
        toxicity: 4,
        permeability: 90,
        osmolality: 1200,
        logP: -1.2,
        tpsa: 40.46,
      },
      isVerified: true,
      createdAt: "2023-02-05T00:00:00Z",
      updatedAt: "2023-03-25T00:00:00Z",
    },
    {
      id: "mol-004",
      name: "Propylene Glycol",
      formula: "C₃H₈O₂",
      molecularWeight: 76.09,
      structure: "/molecules/pg.svg",
      properties: {
        freezingPoint: -59,
        molarConcentration: 13.1,
        viscosity: 0.581,
        toxicity: 2,
        permeability: 75,
        osmolality: 950,
        logP: -0.92,
        tpsa: 40.46,
      },
      isVerified: false,
      createdAt: "2023-02-10T00:00:00Z",
      updatedAt: "2023-03-28T00:00:00Z",
    },
    {
      id: "mol-005",
      name: "Trehalose",
      formula: "C₁₂H₂₂O₁₁",
      molecularWeight: 342.3,
      structure: "/molecules/trehalose.svg",
      properties: {
        freezingPoint: -0.5,
        molarConcentration: 0.6,
        viscosity: 2.12,
        toxicity: 0,
        permeability: 30,
        osmolality: 600,
        logP: -4.23,
        tpsa: 189.53,
      },
      isVerified: true,
      createdAt: "2023-02-15T00:00:00Z",
      updatedAt: "2023-04-01T00:00:00Z",
    },
  ]

  // Initialize with provided molecule IDs
  useEffect(() => {
    if (moleculeIds.length > 0) {
      const initialMolecules = molecules.filter((mol) => moleculeIds.includes(mol.id))
      setSelectedMolecules(initialMolecules)
    }

    // Set available molecules (those not already selected)
    updateAvailableMolecules()
  }, [moleculeIds])

  // Update available molecules when selected molecules change
  const updateAvailableMolecules = () => {
    const selectedIds = selectedMolecules.map((mol) => mol.id)
    setAvailableMolecules(molecules.filter((mol) => !selectedIds.includes(mol.id)))
  }

  // Add a molecule to comparison
  const addMolecule = (id: string) => {
    const molecule = molecules.find((mol) => mol.id === id)
    if (molecule) {
      setSelectedMolecules([...selectedMolecules, molecule])
      updateAvailableMolecules()
    }
  }

  // Remove a molecule from comparison
  const removeMolecule = (id: string) => {
    setSelectedMolecules(selectedMolecules.filter((mol) => mol.id !== id))
    updateAvailableMolecules()
  }

  // Check if values are different for highlighting
  const areDifferent = (values: any[]): boolean => {
    if (!highlightDifferences) return false
    if (values.length <= 1) return false

    // Filter out null/undefined values
    const validValues = values.filter((v) => v !== null && v !== undefined)
    if (validValues.length <= 1) return false

    // Check if all values are the same
    return !validValues.every((v) => v === validValues[0])
  }

  // Format property value with appropriate precision
  const formatValue = (value: any, property: string): string => {
    if (value === null || value === undefined) return "—"

    switch (property) {
      case "molecularWeight":
        return value.toFixed(2)
      case "freezingPoint":
      case "viscosity":
        return value.toFixed(2)
      case "logP":
        return value.toFixed(2)
      case "tpsa":
        return value.toFixed(2)
      case "permeability":
      case "toxicity":
      case "osmolality":
        return value.toString()
      default:
        return value.toString()
    }
  }

  // Export comparison data
  const exportComparison = () => {
    // In a real implementation, this would generate a CSV or PDF
    console.log("Exporting comparison data")
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle>Molecule Comparison</CardTitle>
            <CardDescription>Compare properties of multiple cryoprotectant molecules</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setHighlightDifferences(!highlightDifferences)}>
              <BarChart2 className="mr-2 h-4 w-4" />
              {highlightDifferences ? "Hide Differences" : "Highlight Differences"}
            </Button>
            <Button variant="outline" size="sm" onClick={exportComparison}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {selectedMolecules.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <MoleculeIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No molecules selected</h3>
            <p className="text-muted-foreground mb-4">Select molecules to compare their properties side by side</p>
            <div className="w-full max-w-xs">
              <Select onValueChange={(value) => addMolecule(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Add a molecule to compare" />
                </SelectTrigger>
                <SelectContent>
                  {availableMolecules.map((molecule) => (
                    <SelectItem key={molecule.id} value={molecule.id}>
                      {molecule.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Molecule selection header */}
            <div className="flex flex-wrap items-center gap-2 pb-4">
              {selectedMolecules.map((molecule) => (
                <Badge key={molecule.id} variant="secondary" className="flex items-center gap-1 px-3 py-1.5">
                  <MoleculeIcon className="h-3.5 w-3.5 text-blue-500 mr-1" />
                  {molecule.name}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 p-0"
                    onClick={() => removeMolecule(molecule.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}

              {availableMolecules.length > 0 && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Select onValueChange={(value) => addMolecule(value)}>
                        <SelectTrigger className="h-8 w-8 p-0">
                          <Plus className="h-4 w-4" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableMolecules.map((molecule) => (
                            <SelectItem key={molecule.id} value={molecule.id}>
                              {molecule.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TooltipTrigger>
                    <TooltipContent>Add molecule to comparison</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>

            {/* Comparison tabs */}
            <Tabs defaultValue="basic" onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Properties</TabsTrigger>
                <TabsTrigger value="cryo">Cryoprotectant Properties</TabsTrigger>
                <TabsTrigger value="physical">Physical Chemistry</TabsTrigger>
              </TabsList>

              {/* Basic properties tab */}
              <TabsContent value="basic" className="pt-4">
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px]">Property</TableHead>
                        {selectedMolecules.map((molecule) => (
                          <TableHead key={molecule.id}>
                            <Link href={`/molecules/${molecule.id}`} className="hover:underline">
                              {molecule.name}
                            </Link>
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Formula</TableCell>
                        {selectedMolecules.map((molecule) => (
                          <TableCell
                            key={molecule.id}
                            className={`font-mono ${
                              areDifferent(selectedMolecules.map((m) => m.formula))
                                ? "bg-amber-50 dark:bg-amber-950/20"
                                : ""
                            }`}
                          >
                            {molecule.formula}
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Molecular Weight (g/mol)</TableCell>
                        {selectedMolecules.map((molecule) => (
                          <TableCell
                            key={molecule.id}
                            className={`font-mono ${
                              areDifferent(selectedMolecules.map((m) => m.molecularWeight))
                                ? "bg-amber-50 dark:bg-amber-950/20"
                                : ""
                            }`}
                          >
                            {formatValue(molecule.molecularWeight, "molecularWeight")}
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Verified Data</TableCell>
                        {selectedMolecules.map((molecule) => (
                          <TableCell
                            key={molecule.id}
                            className={`${
                              areDifferent(selectedMolecules.map((m) => m.isVerified))
                                ? "bg-amber-50 dark:bg-amber-950/20"
                                : ""
                            }`}
                          >
                            {molecule.isVerified ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Verified
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                Unverified
                              </Badge>
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* Cryoprotectant properties tab */}
              <TabsContent value="cryo" className="pt-4">
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px]">Property</TableHead>
                        {selectedMolecules.map((molecule) => (
                          <TableHead key={molecule.id}>
                            <Link href={`/molecules/${molecule.id}`} className="hover:underline">
                              {molecule.name}
                            </Link>
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Freezing Point (°C)</TableCell>
                        {selectedMolecules.map((molecule) => (
                          <TableCell
                            key={molecule.id}
                            className={`font-mono ${
                              areDifferent(selectedMolecules.map((m) => m.properties.freezingPoint))
                                ? "bg-amber-50 dark:bg-amber-950/20"
                                : ""
                            }`}
                          >
                            {formatValue(molecule.properties.freezingPoint, "freezingPoint")}
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Permeability (%)</TableCell>
                        {selectedMolecules.map((molecule) => (
                          <TableCell
                            key={molecule.id}
                            className={`font-mono ${
                              areDifferent(selectedMolecules.map((m) => m.properties.permeability))
                                ? "bg-amber-50 dark:bg-amber-950/20"
                                : ""
                            }`}
                          >
                            {formatValue(molecule.properties.permeability, "permeability")}
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Toxicity (0-10)</TableCell>
                        {selectedMolecules.map((molecule) => (
                          <TableCell
                            key={molecule.id}
                            className={`font-mono ${
                              areDifferent(selectedMolecules.map((m) => m.properties.toxicity))
                                ? "bg-amber-50 dark:bg-amber-950/20"
                                : ""
                            }`}
                          >
                            {formatValue(molecule.properties.toxicity, "toxicity")}
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Osmolality (mOsm/kg)</TableCell>
                        {selectedMolecules.map((molecule) => (
                          <TableCell
                            key={molecule.id}
                            className={`font-mono ${
                              areDifferent(selectedMolecules.map((m) => m.properties.osmolality))
                                ? "bg-amber-50 dark:bg-amber-950/20"
                                : ""
                            }`}
                          >
                            {formatValue(molecule.properties.osmolality, "osmolality")}
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Viscosity (cP)</TableCell>
                        {selectedMolecules.map((molecule) => (
                          <TableCell
                            key={molecule.id}
                            className={`font-mono ${
                              areDifferent(selectedMolecules.map((m) => m.properties.viscosity))
                                ? "bg-amber-50 dark:bg-amber-950/20"
                                : ""
                            }`}
                          >
                            {formatValue(molecule.properties.viscosity, "viscosity")}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* Physical chemistry tab */}
              <TabsContent value="physical" className="pt-4">
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px]">Property</TableHead>
                        {selectedMolecules.map((molecule) => (
                          <TableHead key={molecule.id}>
                            <Link href={`/molecules/${molecule.id}`} className="hover:underline">
                              {molecule.name}
                            </Link>
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">LogP</TableCell>
                        {selectedMolecules.map((molecule) => (
                          <TableCell
                            key={molecule.id}
                            className={`font-mono ${
                              areDifferent(selectedMolecules.map((m) => m.properties.logP))
                                ? "bg-amber-50 dark:bg-amber-950/20"
                                : ""
                            }`}
                          >
                            {formatValue(molecule.properties.logP, "logP")}
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">TPSA (Å²)</TableCell>
                        {selectedMolecules.map((molecule) => (
                          <TableCell
                            key={molecule.id}
                            className={`font-mono ${
                              areDifferent(selectedMolecules.map((m) => m.properties.tpsa))
                                ? "bg-amber-50 dark:bg-amber-950/20"
                                : ""
                            }`}
                          >
                            {formatValue(molecule.properties.tpsa, "tpsa")}
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Molar Concentration (mol/L)</TableCell>
                        {selectedMolecules.map((molecule) => (
                          <TableCell
                            key={molecule.id}
                            className={`font-mono ${
                              areDifferent(selectedMolecules.map((m) => m.properties.molarConcentration))
                                ? "bg-amber-50 dark:bg-amber-950/20"
                                : ""
                            }`}
                          >
                            {formatValue(molecule.properties.molarConcentration, "molarConcentration")}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

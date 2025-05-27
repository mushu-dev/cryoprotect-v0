"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImportIcon as FileImport } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"

export function PubChemImportDialog() {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [selectedMolecules, setSelectedMolecules] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [batchInput, setBatchInput] = useState("")

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    // Simulate API call to PubChem
    setTimeout(() => {
      // Mock results
      const mockResults = [
        {
          id: "CID123456",
          name: "Glycerol",
          formula: "C₃H₈O₃",
          molecularWeight: 92.09,
          logP: -1.76,
          tpsa: 60.69,
        },
        {
          id: "CID234567",
          name: "Ethylene Glycol",
          formula: "C₂H₆O₂",
          molecularWeight: 62.07,
          logP: -1.2,
          tpsa: 40.46,
        },
        {
          id: "CID345678",
          name: "Propylene Glycol",
          formula: "C₃H₈O₂",
          molecularWeight: 76.09,
          logP: -0.92,
          tpsa: 40.46,
        },
      ]
      setSearchResults(mockResults)
      setIsLoading(false)
    }, 1000)
  }

  const handleBatchImport = () => {
    if (!batchInput.trim()) return

    setIsLoading(true)
    // Simulate API call to PubChem
    setTimeout(() => {
      // Mock results based on input IDs
      const ids = batchInput
        .split(/[\s,;]+/)
        .filter(Boolean)
        .slice(0, 5) // Limit to 5 for demo

      const mockResults = ids.map((id, index) => ({
        id: `CID${id}`,
        name: `Compound ${id}`,
        formula: ["C₃H₈O₃", "C₂H₆O₂", "C₃H₈O₂", "C₂H₆OS", "CH₄O"][index % 5],
        molecularWeight: 60 + Math.random() * 40,
        logP: -2 + Math.random() * 3,
        tpsa: 20 + Math.random() * 60,
      }))

      setSearchResults(mockResults)
      setIsLoading(false)
    }, 1500)
  }

  const toggleMoleculeSelection = (id: string) => {
    if (selectedMolecules.includes(id)) {
      setSelectedMolecules(selectedMolecules.filter((molId) => molId !== id))
    } else {
      setSelectedMolecules([...selectedMolecules, id])
    }
  }

  const handleImportSelected = () => {
    // Here you would implement the actual import logic
    console.log("Importing molecules:", selectedMolecules)
    setOpen(false)
    setSearchResults([])
    setSelectedMolecules([])
    setSearchQuery("")
    setBatchInput("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FileImport className="mr-2 h-4 w-4" />
          Import from PubChem
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Import from PubChem</DialogTitle>
          <DialogDescription>
            Search for molecules in the PubChem database and import them into your CryoProtect library.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search">Search by Name</TabsTrigger>
            <TabsTrigger value="batch">Batch Import</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="name">Molecule Name or CID</Label>
                <Input
                  id="name"
                  placeholder="e.g., Glycerol or 753"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                size="sm"
                className="mt-8"
                onClick={handleSearch}
                disabled={isLoading || !searchQuery.trim()}
              >
                {isLoading ? "Searching..." : "Search"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="batch" className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="batch">PubChem CIDs (comma or space separated)</Label>
              <Textarea
                id="batch"
                placeholder="e.g., 753, 174, 1030, 962"
                value={batchInput}
                onChange={(e) => setBatchInput(e.target.value)}
                rows={3}
              />
              <Button onClick={handleBatchImport} disabled={isLoading || !batchInput.trim()} className="w-full mt-2">
                {isLoading ? "Searching..." : "Find Compounds"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {searchResults.length > 0 && (
          <div className="space-y-4">
            <Label>Search Results ({searchResults.length})</Label>
            <ScrollArea className="h-[200px] rounded-md border">
              <div className="p-4 space-y-4">
                {searchResults.map((result) => (
                  <Card key={result.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Checkbox
                          checked={selectedMolecules.includes(result.id)}
                          onCheckedChange={() => toggleMoleculeSelection(result.id)}
                          id={`select-${result.id}`}
                        />
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h4 className="font-medium">{result.name}</h4>
                              <p className="text-sm text-muted-foreground">{result.id}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-mono">{result.formula}</p>
                              <p className="text-sm text-muted-foreground">{result.molecularWeight.toFixed(2)} g/mol</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                            <div>LogP: {result.logP.toFixed(2)}</div>
                            <div>TPSA: {result.tpsa.toFixed(2)} Å²</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleImportSelected} disabled={selectedMolecules.length === 0}>
            Import Selected ({selectedMolecules.length})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

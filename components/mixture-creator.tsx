"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Search, Plus, X, Beaker, AlertTriangle, Sparkles } from "lucide-react"

interface MixtureCreatorProps {
  mixture?: any
  onClose: () => void
  onSave: (mixture: any) => void
}

interface Component {
  molecule_id: string
  molecule_name: string
  concentration: number
  unit: string
  percentage: number
}

const availableMolecules = [
  { id: "1", name: "DMSO", mw: 78.13, logp: -1.35 },
  { id: "2", name: "Glycerol", mw: 92.09, logp: -1.76 },
  { id: "3", name: "Trehalose", mw: 342.3, logp: -4.2 },
  { id: "4", name: "Ethylene Glycol", mw: 62.07, logp: -1.36 },
  { id: "5", name: "Sucrose", mw: 342.3, logp: -3.7 },
  { id: "6", name: "Propylene Glycol", mw: 76.09, logp: -0.92 },
  { id: "7", name: "Mannitol", mw: 182.17, logp: -3.1 },
  { id: "8", name: "Proline", mw: 115.13, logp: -2.54 },
]

export function MixtureCreator({ mixture, onClose, onSave }: MixtureCreatorProps) {
  const [name, setName] = useState(mixture?.name || "")
  const [description, setDescription] = useState(mixture?.description || "")
  const [application, setApplication] = useState(mixture?.application || "")
  const [components, setComponents] = useState<Component[]>(mixture?.components || [])
  const [searchTerm, setSearchTerm] = useState("")
  const [predictions, setPredictions] = useState({
    efficacy: 0,
    toxicity: 0,
    stability: 0,
    osmolality: 0,
    ph: 7.0,
  })

  // Calculate predictions based on components
  useEffect(() => {
    if (components.length > 0) {
      // Mock AI predictions based on components
      const totalConc = components.reduce((sum, comp) => sum + comp.concentration, 0)
      const efficacy = Math.min(95, 60 + totalConc * 1.2 + components.length * 5)
      const toxicity = Math.max(5, totalConc * 0.8 - components.length * 2)
      const stability = Math.min(90, 70 + components.length * 3)
      const osmolality = totalConc * 45 + 200
      const ph = 7.0 + (Math.random() - 0.5) * 0.8

      setPredictions({ efficacy, toxicity, stability, osmolality, ph })
    }
  }, [components])

  const addComponent = (molecule: any) => {
    if (components.find((c) => c.molecule_id === molecule.id)) return

    const newComponent: Component = {
      molecule_id: molecule.id,
      molecule_name: molecule.name,
      concentration: 10,
      unit: "%",
      percentage: 0,
    }

    const newComponents = [...components, newComponent]
    updatePercentages(newComponents)
  }

  const removeComponent = (moleculeId: string) => {
    const newComponents = components.filter((c) => c.molecule_id !== moleculeId)
    updatePercentages(newComponents)
  }

  const updateConcentration = (moleculeId: string, concentration: number) => {
    const newComponents = components.map((c) => (c.molecule_id === moleculeId ? { ...c, concentration } : c))
    updatePercentages(newComponents)
  }

  const updatePercentages = (newComponents: Component[]) => {
    const total = newComponents.reduce((sum, comp) => sum + comp.concentration, 0)
    const withPercentages = newComponents.map((comp) => ({
      ...comp,
      percentage: total > 0 ? (comp.concentration / total) * 100 : 0,
    }))
    setComponents(withPercentages)
  }

  const handleSave = () => {
    const newMixture = {
      id: mixture?.id || Date.now().toString(),
      name,
      description,
      application,
      components,
      total_concentration: components.reduce((sum, comp) => sum + comp.concentration, 0),
      osmolality: predictions.osmolality,
      ph: predictions.ph,
      efficacy_score: Math.round(predictions.efficacy),
      toxicity_score: Math.round(predictions.toxicity),
      stability_score: Math.round(predictions.stability),
      overall_score: Math.round((predictions.efficacy + (100 - predictions.toxicity) + predictions.stability) / 3),
      created_by: "Current User",
      created_at: new Date().toISOString().split("T")[0],
      updated_at: new Date().toISOString().split("T")[0],
      version: (mixture?.version || 0) + 1,
      citations: mixture?.citations || 0,
      success_rate: Math.round(predictions.efficacy * 0.9),
      temperature_range: { min: -196, max: -80 },
      tags: ["custom", "experimental"],
    }

    onSave(newMixture)
  }

  const filteredMolecules = availableMolecules.filter(
    (mol) =>
      mol.name.toLowerCase().includes(searchTerm.toLowerCase()) && !components.find((c) => c.molecule_id === mol.id),
  )

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Beaker className="h-5 w-5" />
            {mixture ? "Edit Mixture" : "Create New Mixture"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Basic Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Mixture Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., CryoMax Pro" />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the mixture purpose and characteristics..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="application">Application</Label>
              <Select value={application} onValueChange={setApplication}>
                <SelectTrigger>
                  <SelectValue placeholder="Select application" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mammalian Cells">Mammalian Cells</SelectItem>
                  <SelectItem value="Plant Tissues">Plant Tissues</SelectItem>
                  <SelectItem value="Stem Cells">Stem Cells</SelectItem>
                  <SelectItem value="Bacteria">Bacteria</SelectItem>
                  <SelectItem value="Organs">Organs</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Add Molecules */}
            <div>
              <Label>Add Components</Label>
              <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search molecules..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="max-h-32 overflow-y-auto space-y-1">
                {filteredMolecules.map((molecule) => (
                  <div
                    key={molecule.id}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
                    onClick={() => addComponent(molecule)}
                  >
                    <div>
                      <div className="font-medium">{molecule.name}</div>
                      <div className="text-xs text-gray-500">
                        MW: {molecule.mw}, LogP: {molecule.logp}
                      </div>
                    </div>
                    <Plus className="h-4 w-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Components & Predictions */}
          <div className="space-y-4">
            {/* Current Components */}
            <div>
              <Label>Components ({components.length})</Label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {components.map((component) => (
                  <Card key={component.molecule_id} className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{component.molecule_name}</div>
                      <Button variant="ghost" size="sm" onClick={() => removeComponent(component.molecule_id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={component.concentration}
                          onChange={(e) => updateConcentration(component.molecule_id, Number(e.target.value))}
                          className="w-20"
                          min="0"
                          max="100"
                          step="0.1"
                        />
                        <span className="text-sm">%</span>
                        <div className="flex-1">
                          <Slider
                            value={[component.concentration]}
                            onValueChange={([value]) => updateConcentration(component.molecule_id, value)}
                            max={50}
                            step={0.1}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">{component.percentage.toFixed(1)}% of total mixture</div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* AI Predictions */}
            {components.length > 0 && (
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-purple-500" />
                  <Label>AI Predictions</Label>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Efficacy Score</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${predictions.efficacy}%` }} />
                      </div>
                      <span className="text-sm font-medium">{Math.round(predictions.efficacy)}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Toxicity Score</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: `${predictions.toxicity}%` }} />
                      </div>
                      <span className="text-sm font-medium">{Math.round(predictions.toxicity)}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Stability Score</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${predictions.stability}%` }} />
                      </div>
                      <span className="text-sm font-medium">{Math.round(predictions.stability)}</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t text-xs text-gray-600 space-y-1">
                    <div>Osmolality: {Math.round(predictions.osmolality)} mOsm/kg</div>
                    <div>pH: {predictions.ph.toFixed(1)}</div>
                    {predictions.osmolality > 1500 && (
                      <div className="flex items-center gap-1 text-amber-600">
                        <AlertTriangle className="h-3 w-3" />
                        High osmolality warning
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!name || components.length === 0}
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
          >
            {mixture ? "Update Mixture" : "Create Mixture"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { X, Check, Filter, RefreshCw } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function MoleculeFilters() {
  // Common filter presets for cryoprotectant research
  const filterPresets = [
    { name: "Low Toxicity", description: "Toxicity < 3" },
    { name: "High Permeability", description: "Permeability > 75%" },
    { name: "Low Freezing Point", description: "Freezing Point < -10°C" },
    { name: "Verified Only", description: "Only verified molecules" },
  ]

  const [activePreset, setActivePreset] = useState<string | null>(null)
  const [molecularWeightRange, setMolecularWeightRange] = useState([0, 500])
  const [freezingPointRange, setFreezingPointRange] = useState([-100, 50])
  const [permeabilityRange, setPermeabilityRange] = useState([0, 100])
  const [toxicityRange, setToxicityRange] = useState([0, 10])
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [experimentalDataOnly, setExperimentalDataOnly] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))
  }

  const clearAllFilters = () => {
    setMolecularWeightRange([0, 500])
    setFreezingPointRange([-100, 50])
    setPermeabilityRange([0, 100])
    setToxicityRange([0, 10])
    setVerifiedOnly(false)
    setExperimentalDataOnly(false)
    setActiveFilters([])
    setActivePreset(null)
  }

  const applyPreset = (preset: string) => {
    clearAllFilters()
    setActivePreset(preset)

    switch (preset) {
      case "Low Toxicity":
        setToxicityRange([0, 3])
        addFilter("Toxicity: 0-3")
        break
      case "High Permeability":
        setPermeabilityRange([75, 100])
        addFilter("Permeability: 75-100%")
        break
      case "Low Freezing Point":
        setFreezingPointRange([-100, -10])
        addFilter("FP: -100--10 °C")
        break
      case "Verified Only":
        setVerifiedOnly(true)
        addFilter("Verified Only")
        break
    }
  }

  return (
    <div className="space-y-4">
      {/* Quick search */}
      <div className="space-y-2">
        <Label htmlFor="search" className="text-sm font-medium">
          Quick Search
        </Label>
        <div className="relative">
          <Input id="search" placeholder="Name, formula, or ID..." />
          <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full" aria-label="Search">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Common filter presets */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Common Filters</Label>
        <div className="grid grid-cols-2 gap-2">
          {filterPresets.map((preset) => (
            <TooltipProvider key={preset.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={activePreset === preset.name ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start text-xs h-8"
                    onClick={() => applyPreset(preset.name)}
                  >
                    {activePreset === preset.name && <Check className="mr-1 h-3 w-3" />}
                    {preset.name}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p className="text-xs">{preset.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>

      {/* Active filters */}
      {activeFilters.length > 0 && (
        <div className="space-y-2 bg-muted/50 p-2 rounded-md">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-medium text-muted-foreground">Active Filters</Label>
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-6 text-xs">
              <RefreshCw className="mr-1 h-3 w-3" />
              Reset
            </Button>
          </div>
          <div className="flex flex-wrap gap-1">
            {activeFilters.map((filter) => (
              <Badge key={filter} variant="secondary" className="flex items-center gap-1 text-xs">
                {filter}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFilter(filter)}
                  className="h-3 w-3 p-0 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-2 w-2" />
                  <span className="sr-only">Remove {filter} filter</span>
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      <Separator />

      {/* Advanced filters in accordion */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-sm font-medium py-2">Physical Properties</AccordionTrigger>
          <AccordionContent>
            {/* Freezing Point - Most important for cryoprotectants */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="freezing-point" className="text-sm font-medium">
                  Freezing Point (°C)
                </Label>
                <span className="text-xs text-muted-foreground">
                  {freezingPointRange[0]} to {freezingPointRange[1]}
                </span>
              </div>
              <Slider
                id="freezing-point"
                min={-100}
                max={50}
                step={1}
                value={freezingPointRange}
                onValueChange={setFreezingPointRange}
                onValueCommit={() => addFilter(`FP: ${freezingPointRange[0]}-${freezingPointRange[1]} °C`)}
                className="py-2"
              />
            </div>

            {/* Permeability - Second most important */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="permeability" className="text-sm font-medium">
                  Permeability (%)
                </Label>
                <span className="text-xs text-muted-foreground">
                  {permeabilityRange[0]} to {permeabilityRange[1]}
                </span>
              </div>
              <Slider
                id="permeability"
                min={0}
                max={100}
                step={1}
                value={permeabilityRange}
                onValueChange={setPermeabilityRange}
                onValueCommit={() => addFilter(`Permeability: ${permeabilityRange[0]}-${permeabilityRange[1]}%`)}
                className="py-2"
              />
            </div>

            {/* Toxicity */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="toxicity" className="text-sm font-medium">
                  Toxicity (0-10)
                </Label>
                <span className="text-xs text-muted-foreground">
                  {toxicityRange[0]} to {toxicityRange[1]}
                </span>
              </div>
              <Slider
                id="toxicity"
                min={0}
                max={10}
                step={1}
                value={toxicityRange}
                onValueChange={setToxicityRange}
                onValueCommit={() => addFilter(`Toxicity: ${toxicityRange[0]}-${toxicityRange[1]}`)}
                className="py-2"
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-sm font-medium py-2">Chemical Properties</AccordionTrigger>
          <AccordionContent>
            {/* Molecular Weight */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="molecular-weight" className="text-sm font-medium">
                  Molecular Weight (g/mol)
                </Label>
                <span className="text-xs text-muted-foreground">
                  {molecularWeightRange[0]} to {molecularWeightRange[1]}
                </span>
              </div>
              <Slider
                id="molecular-weight"
                min={0}
                max={500}
                step={1}
                value={molecularWeightRange}
                onValueChange={setMolecularWeightRange}
                onValueCommit={() => addFilter(`MW: ${molecularWeightRange[0]}-${molecularWeightRange[1]} g/mol`)}
                className="py-2"
              />
            </div>

            {/* Functional Groups - Dropdown */}
            <div className="space-y-2 mb-4">
              <Label htmlFor="functional-group" className="text-sm font-medium">
                Functional Group
              </Label>
              <Select onValueChange={(value) => addFilter(`Functional Group: ${value}`)}>
                <SelectTrigger id="functional-group">
                  <SelectValue placeholder="Select functional group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hydroxyl">Hydroxyl (-OH)</SelectItem>
                  <SelectItem value="carbonyl">Carbonyl (C=O)</SelectItem>
                  <SelectItem value="carboxyl">Carboxyl (-COOH)</SelectItem>
                  <SelectItem value="amine">Amine (-NH2)</SelectItem>
                  <SelectItem value="sulfoxide">Sulfoxide (S=O)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-sm font-medium py-2">Data Quality</AccordionTrigger>
          <AccordionContent>
            {/* Switches */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="verified" className="text-sm font-medium cursor-pointer">
                  Verified Molecules Only
                </Label>
                <Switch
                  id="verified"
                  checked={verifiedOnly}
                  onCheckedChange={(checked) => {
                    setVerifiedOnly(checked)
                    if (checked) {
                      addFilter("Verified Only")
                    } else {
                      removeFilter("Verified Only")
                    }
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="experimental" className="text-sm font-medium cursor-pointer">
                  With Experimental Data
                </Label>
                <Switch
                  id="experimental"
                  checked={experimentalDataOnly}
                  onCheckedChange={(checked) => {
                    setExperimentalDataOnly(checked)
                    if (checked) {
                      addFilter("Experimental Data")
                    } else {
                      removeFilter("Experimental Data")
                    }
                  }}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Separator />

      {/* Apply button */}
      <Button className="w-full">Apply Filters</Button>
    </div>
  )
}

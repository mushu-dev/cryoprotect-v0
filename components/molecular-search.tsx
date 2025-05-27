"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
  Search,
  Filter,
  MicroscopeIcon as Molecule,
  Brain,
  Target,
  Zap,
  ChevronDown,
  Star,
  TrendingUp,
} from "lucide-react"
import { useMolecules } from "@/lib/hooks/use-molecules"
import { useState } from "react"
import type { MoleculeFilters } from "@/lib/api/molecules"
import Link from "next/link"

export function MolecularSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<MoleculeFilters>({
    limit: 10,
    sortBy: "success_rate",
    sortOrder: "desc",
  })

  const { molecules, loading, error, total } = useMolecules(filters)

  const handleSearch = () => {
    setFilters((prev) => ({
      ...prev,
      search: searchQuery,
      offset: 0,
    }))
  }

  const handleFilterChange = (newFilters: Partial<MoleculeFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      offset: 0,
    }))
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded-lg mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="h-96 bg-gray-200 rounded-lg"></div>
            <div className="lg:col-span-3 h-96 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Error loading molecules: {error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Add navigation breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
        <Link href="/" className="hover:text-blue-600">
          Dashboard
        </Link>
        <span>•</span>
        <span>Advanced Search</span>
      </div>

      {/* Search Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="w-5 h-5 mr-2 text-blue-600" />
            Advanced Molecular Search
          </CardTitle>
          <CardDescription>
            Use natural language queries or advanced filters to discover cryoprotectants
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Natural Language Search */}
            <div className="relative">
              <Brain className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Ask AI: 'Find molecules similar to DMSO with lower toxicity and better cell penetration'"
                className="pl-12 text-lg h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2" onClick={handleSearch}>
                <Zap className="w-4 h-4 mr-2" />
                AI Search
              </Button>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                Low Toxicity
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                High Permeability
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                FDA Approved
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                Natural Compounds
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                Synthetic Analogs
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Advanced Filters */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Molecular Weight */}
            <div>
              <label className="text-sm font-medium mb-2 block">Molecular Weight (Da)</label>
              <Slider
                value={[filters.minMolecularWeight || 50, filters.maxMolecularWeight || 1000]}
                onValueChange={(value) =>
                  handleFilterChange({ minMolecularWeight: value[0], maxMolecularWeight: value[1] })
                }
                max={1000}
                min={50}
                step={10}
                className="mb-2"
              />
              <div className="text-xs text-gray-500">
                {filters.molecularWeightMin || 50} - {filters.molecularWeightMax || 1000} Da
              </div>
            </div>

            {/* LogP */}
            <div>
              <label className="text-sm font-medium mb-2 block">LogP (Lipophilicity)</label>
              <Slider
                value={[filters.minLogP || -5, filters.maxLogP || 5]}
                onValueChange={(value) => handleFilterChange({ minLogP: value[0], maxLogP: value[1] })}
                max={5}
                min={-5}
                step={0.1}
                className="mb-2"
              />
              <div className="text-xs text-gray-500">
                {filters.logPMin || -5} - {filters.logPMax || 5}
              </div>
            </div>

            {/* TPSA */}
            <div>
              <label className="text-sm font-medium mb-2 block">TPSA (Ų)</label>
              <Slider
                value={[filters.minTPSA || 0, filters.maxTPSA || 200]}
                onValueChange={(value) => handleFilterChange({ minTPSA: value[0], maxTPSA: value[1] })}
                max={200}
                min={0}
                step={5}
                className="mb-2"
              />
              <div className="text-xs text-gray-500">
                {filters.tpsaMin || 0} - {filters.tpsaMax || 200} Ų
              </div>
            </div>

            {/* Additional Filters */}
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Toxicity Level</label>
                <div className="mt-2 space-y-1">
                  {["Very Low", "Low", "Moderate", "High"].map((level) => (
                    <label key={level} className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        value={level}
                        checked={filters.toxicityLevel === level.toLowerCase().replace(" ", "_")}
                        onChange={(e) =>
                          handleFilterChange({
                            toxicityLevel: e.target.checked ? level.toLowerCase().replace(" ", "_") : undefined,
                          })
                        }
                      />
                      <span className="text-sm">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Success Rate</label>
                <div className="mt-2 space-y-1">
                  {["> 90%", "80-90%", "70-80%", "< 70%"].map((range) => (
                    <label key={range} className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        value={range}
                        checked={filters.successRateRange === range}
                        onChange={(e) => handleFilterChange({ successRateRange: e.target.checked ? range : undefined })}
                      />
                      <span className="text-sm">{range}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <Button className="w-full" onClick={() => handleFilterChange({})}>
              Apply Filters
            </Button>
          </CardContent>
        </Card>

        {/* Search Results */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Search Results</CardTitle>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{molecules.length} compounds found</span>
                  <Button variant="outline" size="sm">
                    <ChevronDown className="w-4 h-4 mr-1" />
                    Sort by Relevance
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {molecules.map((compound) => (
                  <Card key={compound.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Compound Info */}
                        <div className="lg:col-span-2">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-1">{compound.name}</h3>
                              <p className="text-gray-600 font-mono text-sm">{compound.formula}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant={compound.success_rate > 90 ? "default" : "secondary"}>
                                {compound.success_rate}% success
                              </Badge>
                              <Button variant="ghost" size="sm">
                                <Star className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Properties Grid */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-xs text-gray-500">Success Rate</p>
                              <p className="font-semibold text-green-600">{compound.success_rate}%</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Toxicity</p>
                              <p className="font-semibold">{compound.toxicity_level.replace("_", " ")}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">LogP</p>
                              <p className="font-semibold">{compound.log_p?.toFixed(2) || "N/A"}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">MW</p>
                              <p className="font-semibold">{compound.molecular_weight.toFixed(1)}</p>
                            </div>
                          </div>

                          {/* AI Insight */}
                          <div className="bg-blue-50 rounded-lg p-3">
                            <div className="flex items-center mb-1">
                              <Brain className="w-4 h-4 text-blue-600 mr-2" />
                              <span className="text-sm font-medium text-blue-900">AI Insight</span>
                            </div>
                            <p className="text-sm text-blue-800">
                              {compound.toxicity_level === "very_low"
                                ? "Excellent safety profile with high membrane permeability"
                                : compound.toxicity_level === "low"
                                  ? "Good safety profile, suitable for most applications"
                                  : "Moderate toxicity, use with caution and monitoring"}
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col space-y-3">
                          <Button className="w-full">
                            <Molecule className="w-4 h-4 mr-2" />
                            View 3D Structure
                          </Button>
                          <Button variant="outline" className="w-full">
                            <Target className="w-4 h-4 mr-2" />
                            Predict Success
                          </Button>
                          <Button variant="outline" className="w-full">
                            <TrendingUp className="w-4 h-4 mr-2" />
                            Add to Collection
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-6">
                <Button variant="outline">Load More Results</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

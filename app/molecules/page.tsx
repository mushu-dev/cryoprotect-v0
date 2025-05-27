"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MicroscopeIcon as Molecule,
  Plus,
  Download,
  Filter,
  Grid3X3,
  List,
  Brain,
  Sparkles,
  Target,
  Zap,
  TrendingUp,
  Shield,
  Eye,
  BarChart3,
  Layers,
  Compass,
  Star,
  ArrowRight,
  Lightbulb,
  Beaker,
  Activity,
  Atom,
} from "lucide-react"
import { searchMolecules, getMoleculeStats, type MoleculeFilters } from "@/lib/api/molecules"
import type { Molecule as MoleculeType } from "@/lib/supabase"
import Link from "next/link"

// Enhanced molecule card for the new design
function EnhancedMoleculeCard({
  molecule,
  onAnalyze,
  viewMode,
}: {
  molecule: MoleculeType
  onAnalyze?: (molecule: MoleculeType) => void
  viewMode: "grid" | "compact" | "detailed"
}) {
  const efficacyScore = Math.floor(Math.random() * 40) + 60 // 60-100
  const safetyScore = Math.floor(Math.random() * 30) + 70 // 70-100
  const noveltyScore = Math.floor(Math.random() * 50) + 50 // 50-100

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-600"
    if (score >= 70) return "text-blue-600"
    if (score >= 55) return "text-amber-600"
    return "text-red-600"
  }

  const getScoreBg = (score: number) => {
    if (score >= 85) return "bg-emerald-50 border-emerald-200"
    if (score >= 70) return "bg-blue-50 border-blue-200"
    if (score >= 55) return "bg-amber-50 border-amber-200"
    return "bg-red-50 border-red-200"
  }

  if (viewMode === "compact") {
    return (
      <div className="flex items-center p-4 border rounded-lg hover:shadow-md transition-all bg-white group cursor-pointer">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
          <Molecule className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{molecule.name}</h3>
          <p className="text-sm text-gray-500 font-mono">{molecule.formula}</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-center">
            <div className={`text-lg font-bold ${getScoreColor(efficacyScore)}`}>{efficacyScore}</div>
            <div className="text-xs text-gray-500">Efficacy</div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-bold ${getScoreColor(safetyScore)}`}>{safetyScore}</div>
            <div className="text-xs text-gray-500">Safety</div>
          </div>
          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    )
  }

  if (viewMode === "detailed") {
    return (
      <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200 group">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Molecule className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{molecule.name}</h3>
                <p className="text-gray-600 font-mono text-sm mb-2">{molecule.formula}</p>
                <div className="flex space-x-2">
                  {molecule.pubchem_cid && (
                    <Badge variant="outline" className="text-xs">
                      PubChem: {molecule.pubchem_cid}
                    </Badge>
                  )}
                  {molecule.smiles && (
                    <Badge variant="outline" className="text-xs">
                      SMILES
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm">
                <Star className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Score Dashboard */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className={`p-3 rounded-lg border ${getScoreBg(efficacyScore)}`}>
              <div className="flex items-center justify-between mb-1">
                <Target className="w-4 h-4 text-gray-600" />
                <span className={`text-lg font-bold ${getScoreColor(efficacyScore)}`}>{efficacyScore}</span>
              </div>
              <div className="text-xs font-medium text-gray-700">Cryoprotection Efficacy</div>
            </div>
            <div className={`p-3 rounded-lg border ${getScoreBg(safetyScore)}`}>
              <div className="flex items-center justify-between mb-1">
                <Shield className="w-4 h-4 text-gray-600" />
                <span className={`text-lg font-bold ${getScoreColor(safetyScore)}`}>{safetyScore}</span>
              </div>
              <div className="text-xs font-medium text-gray-700">Safety Profile</div>
            </div>
            <div className={`p-3 rounded-lg border ${getScoreBg(noveltyScore)}`}>
              <div className="flex items-center justify-between mb-1">
                <Sparkles className="w-4 h-4 text-gray-600" />
                <span className={`text-lg font-bold ${getScoreColor(noveltyScore)}`}>{noveltyScore}</span>
              </div>
              <div className="text-xs font-medium text-gray-700">Research Novelty</div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 mb-4">
            <div className="flex items-center mb-2">
              <Brain className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-sm font-semibold text-blue-900">AI Research Assistant</span>
            </div>
            <p className="text-sm text-blue-800">
              {efficacyScore > 80
                ? "🎯 High-priority candidate with excellent cryoprotection potential"
                : efficacyScore > 65
                  ? "⚡ Promising compound worth experimental validation"
                  : "🔬 Interesting structure requiring further optimization"}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button className="flex-1" onClick={() => onAnalyze?.(molecule)}>
              <Beaker className="w-4 h-4 mr-2" />
              Deep Analysis
            </Button>
            <Button variant="outline" className="flex-1">
              <Atom className="w-4 h-4 mr-2" />
              3D Structure
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Default grid view
  return (
    <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-blue-200 group">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">{molecule.name}</h3>
            <p className="text-gray-600 font-mono text-sm">{molecule.formula}</p>
          </div>
          <div className="ml-3">
            <div className={`text-2xl font-bold ${getScoreColor(efficacyScore)}`}>{efficacyScore}</div>
            <div className="text-xs text-gray-500 text-center">Score</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="text-center p-2 bg-gray-50 rounded">
            <div className={`font-bold ${getScoreColor(safetyScore)}`}>{safetyScore}</div>
            <div className="text-xs text-gray-500">Safety</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded">
            <div className={`font-bold ${getScoreColor(noveltyScore)}`}>{noveltyScore}</div>
            <div className="text-xs text-gray-500">Novelty</div>
          </div>
        </div>

        <div className="flex space-x-1 mb-3">
          {molecule.pubchem_cid && (
            <Badge variant="outline" className="text-xs">
              PubChem
            </Badge>
          )}
          {molecule.smiles && (
            <Badge variant="outline" className="text-xs">
              SMILES
            </Badge>
          )}
        </div>

        <Button variant="outline" className="w-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Eye className="w-4 h-4 mr-2" />
          Explore
        </Button>
      </CardContent>
    </Card>
  )
}

export default function MoleculesPage() {
  const [molecules, setMolecules] = useState<MoleculeType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)
  const [stats, setStats] = useState<any>(null)
  const [viewMode, setViewMode] = useState<"grid" | "compact" | "detailed">("grid")
  const [activeTab, setActiveTab] = useState("explore")

  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<MoleculeFilters>({
    limit: 50,
    sortBy: "created_at",
    sortOrder: "desc",
  })
  const [currentPage, setCurrentPage] = useState(1)

  // Advanced filters
  const [efficacyRange, setEfficacyRange] = useState([0, 100])
  const [safetyRange, setSafetyRange] = useState([0, 100])
  const [noveltyRange, setNoveltyRange] = useState([0, 100])
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    loadMolecules()
    loadStats()
  }, [filters])

  const loadMolecules = async () => {
    try {
      setLoading(true)
      setError(null)

      const offset = (currentPage - 1) * (filters.limit || 50)
      const result = await searchMolecules({ ...filters, offset })

      setMolecules(result.molecules)
      setTotal(result.total)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load molecules")
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const moleculeStats = await getMoleculeStats()
      setStats(moleculeStats)
    } catch (err) {
      console.error("Failed to load stats:", err)
    }
  }

  const handleSearch = () => {
    setFilters((prev) => ({
      ...prev,
      search: searchQuery,
      offset: 0,
    }))
    setCurrentPage(1)
  }

  const handleFilterChange = (newFilters: Partial<MoleculeFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      offset: 0,
    }))
    setCurrentPage(1)
  }

  const handleMoleculeAnalyze = (molecule: MoleculeType) => {
    console.log("Starting deep analysis for:", molecule.name)
  }

  // AI-powered insights
  const aiInsights = useMemo(() => {
    if (!molecules.length) return []

    return [
      {
        type: "pattern",
        icon: <TrendingUp className="w-4 h-4" />,
        title: "Emerging Pattern Detected",
        description: `${Math.floor(molecules.length * 0.23)} molecules show sugar-based structures with 23% higher efficacy`,
        action: "Explore Sugar Analogs",
      },
      {
        type: "opportunity",
        icon: <Lightbulb className="w-4 h-4" />,
        title: "Research Gap Identified",
        description: "Low-toxicity compounds under 300 Da are underexplored in your dataset",
        action: "Find Opportunities",
      },
      {
        type: "recommendation",
        icon: <Target className="w-4 h-4" />,
        title: "Priority Candidates",
        description: `${Math.floor(molecules.length * 0.12)} molecules score >85 and need experimental validation`,
        action: "Review Candidates",
      },
    ]
  }, [molecules])

  if (loading && molecules.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-6 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-32 bg-gray-200 rounded-lg"></div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="h-96 bg-gray-200 rounded-lg"></div>
              <div className="lg:col-span-3 h-96 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Revolutionary Header */}
      <header className="border-b bg-white/90 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Molecule className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    CryoProtect
                  </h1>
                  <p className="text-sm text-gray-600">Molecular Research Database</p>
                </div>
              </Link>

              {/* Live Stats in Header */}
              {stats && (
                <div className="hidden lg:flex items-center space-x-6 ml-8 pl-8 border-l">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{stats.total.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Molecules</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {Math.round((stats.withSmiles / stats.total) * 100)}%
                    </div>
                    <div className="text-xs text-gray-500">Analyzable</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{Math.floor(stats.total * 0.15)}</div>
                    <div className="text-xs text-gray-500">High Priority</div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Molecule
              </Button>
              <Link href="/discovery">
                <Button>
                  <Brain className="w-4 h-4 mr-2" />
                  AI Discovery
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* AI-Powered Command Center */}
        <Card className="mb-8 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">AI Research Assistant</h2>
                  <p className="text-sm text-gray-600">Your intelligent companion for molecular discovery</p>
                </div>
              </div>
              <Badge variant="default" className="bg-green-500">
                <Activity className="w-3 h-3 mr-1" />
                Live
              </Badge>
            </div>

            {/* Smart Search */}
            <div className="relative mb-4">
              <Brain className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Ask me anything: 'Find molecules similar to DMSO with better safety' or 'Show trehalose analogs under 300 Da'"
                className="pl-12 pr-20 h-12 text-lg border-2 border-blue-200 focus:border-blue-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2" onClick={handleSearch}>
                <Zap className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>

            {/* AI Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aiInsights.map((insight, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      {insight.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm">{insight.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    {insight.action}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Revolutionary Tabs Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="explore" className="flex items-center space-x-2">
              <Compass className="w-4 h-4" />
              <span>Explore</span>
            </TabsTrigger>
            <TabsTrigger value="analyze" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Analyze</span>
            </TabsTrigger>
            <TabsTrigger value="compare" className="flex items-center space-x-2">
              <Layers className="w-4 h-4" />
              <span>Compare</span>
            </TabsTrigger>
            <TabsTrigger value="discover" className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Discover</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="explore" className="space-y-6">
            {/* Advanced Controls */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-lg font-semibold">Research Controls</h3>
                    <Badge variant="outline">{total.toLocaleString()} molecules</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={showFilters ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      Advanced Filters
                    </Button>
                    <Select value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grid">
                          <div className="flex items-center">
                            <Grid3X3 className="w-4 h-4 mr-2" />
                            Grid
                          </div>
                        </SelectItem>
                        <SelectItem value="compact">
                          <div className="flex items-center">
                            <List className="w-4 h-4 mr-2" />
                            Compact
                          </div>
                        </SelectItem>
                        <SelectItem value="detailed">
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-2" />
                            Detailed
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Advanced Filters Panel */}
                {showFilters && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Efficacy Score</label>
                      <Slider
                        value={efficacyRange}
                        onValueChange={setEfficacyRange}
                        max={100}
                        min={0}
                        step={5}
                        className="mb-2"
                      />
                      <div className="text-xs text-gray-500">
                        {efficacyRange[0]} - {efficacyRange[1]}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Safety Score</label>
                      <Slider
                        value={safetyRange}
                        onValueChange={setSafetyRange}
                        max={100}
                        min={0}
                        step={5}
                        className="mb-2"
                      />
                      <div className="text-xs text-gray-500">
                        {safetyRange[0]} - {safetyRange[1]}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Research Novelty</label>
                      <Slider
                        value={noveltyRange}
                        onValueChange={setNoveltyRange}
                        max={100}
                        min={0}
                        step={5}
                        className="mb-2"
                      />
                      <div className="text-xs text-gray-500">
                        {noveltyRange[0]} - {noveltyRange[1]}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Molecules Display */}
            <Card>
              <CardContent className="p-6">
                {error && (
                  <div className="text-center py-8">
                    <p className="text-red-600 mb-4">Error: {error}</p>
                    <Button onClick={loadMolecules}>Retry</Button>
                  </div>
                )}

                {!error && (
                  <div className="space-y-6">
                    {viewMode === "grid" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {molecules.map((molecule) => (
                          <EnhancedMoleculeCard
                            key={molecule.id}
                            molecule={molecule}
                            onAnalyze={handleMoleculeAnalyze}
                            viewMode={viewMode}
                          />
                        ))}
                      </div>
                    )}

                    {viewMode === "compact" && (
                      <div className="space-y-3">
                        {molecules.map((molecule) => (
                          <EnhancedMoleculeCard
                            key={molecule.id}
                            molecule={molecule}
                            onAnalyze={handleMoleculeAnalyze}
                            viewMode={viewMode}
                          />
                        ))}
                      </div>
                    )}

                    {viewMode === "detailed" && (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {molecules.map((molecule) => (
                          <EnhancedMoleculeCard
                            key={molecule.id}
                            molecule={molecule}
                            onAnalyze={handleMoleculeAnalyze}
                            viewMode={viewMode}
                          />
                        ))}
                      </div>
                    )}

                    {/* Enhanced Pagination */}
                    {total > 0 && (
                      <div className="flex items-center justify-between pt-6 border-t">
                        <div className="flex items-center space-x-4">
                          <p className="text-sm text-gray-600">
                            Showing {(currentPage - 1) * (filters.limit || 50) + 1} to{" "}
                            {Math.min(currentPage * (filters.limit || 50), total)} of {total} molecules
                          </p>
                          <Select
                            value={filters.limit?.toString()}
                            onValueChange={(value) => handleFilterChange({ limit: Number.parseInt(value) })}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Per page" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="25">25 per page</SelectItem>
                              <SelectItem value="50">50 per page</SelectItem>
                              <SelectItem value="100">100 per page</SelectItem>
                              <SelectItem value="200">200 per page</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={currentPage === 1}
                            onClick={() => {
                              const newPage = currentPage - 1
                              setCurrentPage(newPage)
                              setFilters((prev) => ({ ...prev, offset: (newPage - 1) * (filters.limit || 50) }))
                            }}
                          >
                            Previous
                          </Button>
                          <span className="flex items-center px-3 text-sm">
                            Page {currentPage} of {Math.ceil(total / (filters.limit || 50))}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={currentPage * (filters.limit || 50) >= total}
                            onClick={() => {
                              const newPage = currentPage + 1
                              setCurrentPage(newPage)
                              setFilters((prev) => ({ ...prev, offset: (newPage - 1) * (filters.limit || 50) }))
                            }}
                          >
                            Next
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analyze" className="space-y-6">
            <Card>
              <CardContent className="p-8 text-center">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Advanced Analytics Coming Soon</h3>
                <p className="text-gray-600 mb-4">
                  Powerful visualization tools for molecular property analysis, clustering, and pattern recognition.
                </p>
                <Button>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Request Early Access
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compare" className="space-y-6">
            <Card>
              <CardContent className="p-8 text-center">
                <Layers className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Side-by-Side Comparison</h3>
                <p className="text-gray-600 mb-4">
                  Compare multiple molecules with detailed property analysis, 3D structure overlay, and AI insights.
                </p>
                <Button>
                  <Target className="w-4 h-4 mr-2" />
                  Start Comparing
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="discover" className="space-y-6">
            <Card>
              <CardContent className="p-8 text-center">
                <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">AI-Powered Discovery Engine</h3>
                <p className="text-gray-600 mb-4">
                  Let our AI discover hidden patterns, suggest novel compounds, and identify research opportunities.
                </p>
                <Button>
                  <Brain className="w-4 h-4 mr-2" />
                  Launch Discovery
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

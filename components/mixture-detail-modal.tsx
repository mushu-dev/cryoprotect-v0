"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  X,
  Copy,
  Share2,
  Download,
  Star,
  TrendingUp,
  Shield,
  Thermometer,
  Zap,
  Target,
  Brain,
  Clock,
  BarChart3,
  Scale,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Award,
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react"

interface MixtureDetailModalProps {
  mixture: {
    id: string
    name: string
    description: string
    components: Array<{
      molecule_id: string
      molecule_name: string
      concentration: number
      unit: string
      percentage: number
      color?: string
    }>
    total_concentration: number
    osmolality: number
    ph: number
    efficacy_score: number
    toxicity_score: number
    stability_score: number
    viability_score?: number
    overall_score: number
    application: string
    created_by: string
    created_at: string
    version: number
    citations: number
    success_rate: number
    temperature_range: {
      min: number
      max: number
    }
    tags: string[]
    rarity?: "common" | "uncommon" | "rare" | "legendary"
    insights?: string[]
    applications?: Array<{
      type: string
      success_rate: number
      temperature: number
    }>
    history?: Array<{
      version: number
      date: string
      changes: string
      success_rate: number
    }>
  }
  isOpen: boolean
  onClose: () => void
}

export function MixtureDetailModal({ mixture, isOpen, onClose }: MixtureDetailModalProps) {
  const [expandedModules, setExpandedModules] = useState<string[]>([])

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => (prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]))
  }

  const getRarityColor = (rarity = "common") => {
    switch (rarity) {
      case "legendary":
        return "from-yellow-400 via-orange-500 to-red-500"
      case "rare":
        return "from-purple-400 via-pink-500 to-red-500"
      case "uncommon":
        return "from-blue-400 via-purple-500 to-pink-500"
      default:
        return "from-gray-400 via-gray-500 to-gray-600"
    }
  }

  const getStarRating = (score: number) => {
    const stars = Math.round(score / 20)
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < stars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden p-0">
        <div className={`bg-gradient-to-br ${getRarityColor(mixture.rarity)} p-[2px] rounded-lg`}>
          <div className="bg-white rounded-lg overflow-hidden">
            {/* Header Bar */}
            <div className="relative bg-gradient-to-r from-slate-50 to-slate-100 p-6 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${getRarityColor(mixture.rarity)} rounded-full blur-sm opacity-50`}
                    />
                    <div className="relative bg-white p-3 rounded-full">
                      <Award className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-2xl font-bold text-gray-900">{mixture.name}</h2>
                      <Badge
                        variant="secondary"
                        className={`${mixture.success_rate >= 80 ? "bg-green-100 text-green-800" : mixture.success_rate >= 60 ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}
                      >
                        {mixture.success_rate}% Success
                      </Badge>
                      {mixture.rarity !== "common" && (
                        <Badge className={`bg-gradient-to-r ${getRarityColor(mixture.rarity)} text-white`}>
                          {mixture.rarity?.toUpperCase()}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {getStarRating(mixture.overall_score)}
                      <span className="text-sm text-gray-600 ml-2">v{mixture.version}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className={`text-4xl font-bold ${getScoreColor(mixture.overall_score)}`}>
                      {mixture.overall_score}
                    </div>
                    <div className="text-sm text-gray-500">Overall Score</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-2" />
                      Clone
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="ghost" size="sm" onClick={onClose}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Sparkle Effects for High Performers */}
              {mixture.overall_score >= 90 && (
                <div className="absolute top-2 right-2">
                  <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />
                </div>
              )}
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6">
              {/* Modular Card Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Performance Card */}
                <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50" />
                  <CardHeader className="relative">
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      Performance Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="grid grid-cols-2 gap-4">
                      {/* Circular Progress Rings */}
                      <div className="space-y-4">
                        <div className="relative w-20 h-20 mx-auto">
                          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#e5e7eb"
                              strokeWidth="2"
                            />
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke={
                                mixture.efficacy_score >= 80
                                  ? "#10b981"
                                  : mixture.efficacy_score >= 60
                                    ? "#f59e0b"
                                    : "#ef4444"
                              }
                              strokeWidth="2"
                              strokeDasharray={`${mixture.efficacy_score}, 100`}
                              className="transition-all duration-1000"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm font-bold">{mixture.efficacy_score}</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs font-medium text-gray-600">Efficacy</div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="relative w-20 h-20 mx-auto">
                          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#e5e7eb"
                              strokeWidth="2"
                            />
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke={
                                100 - mixture.toxicity_score >= 80
                                  ? "#10b981"
                                  : 100 - mixture.toxicity_score >= 60
                                    ? "#f59e0b"
                                    : "#ef4444"
                              }
                              strokeWidth="2"
                              strokeDasharray={`${100 - mixture.toxicity_score}, 100`}
                              className="transition-all duration-1000"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm font-bold">{100 - mixture.toxicity_score}</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs font-medium text-gray-600">Safety</div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="relative w-20 h-20 mx-auto">
                          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#e5e7eb"
                              strokeWidth="2"
                            />
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke={
                                mixture.viability_score && mixture.viability_score >= 80
                                  ? "#10b981"
                                  : mixture.viability_score && mixture.viability_score >= 60
                                    ? "#f59e0b"
                                    : "#ef4444"
                              }
                              strokeWidth="2"
                              strokeDasharray={`${mixture.viability_score || 85}, 100`}
                              className="transition-all duration-1000"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm font-bold">{mixture.viability_score || 85}</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs font-medium text-gray-600">Viability</div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="relative w-20 h-20 mx-auto">
                          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#e5e7eb"
                              strokeWidth="2"
                            />
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke={
                                mixture.stability_score >= 80
                                  ? "#10b981"
                                  : mixture.stability_score >= 60
                                    ? "#f59e0b"
                                    : "#ef4444"
                              }
                              strokeWidth="2"
                              strokeDasharray={`${mixture.stability_score}, 100`}
                              className="transition-all duration-1000"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm font-bold">{mixture.stability_score}</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs font-medium text-gray-600">Stability</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Formula Card */}
                <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-50" />
                  <CardHeader className="relative">
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-purple-600" />
                      Formula Composition
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    {/* Interactive Donut Chart */}
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                        {mixture.components.map((component, index) => {
                          const colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b"]
                          const startAngle = mixture.components
                            .slice(0, index)
                            .reduce((sum, comp) => sum + comp.percentage, 0)
                          return (
                            <path
                              key={component.molecule_id}
                              d={`M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831`}
                              fill="none"
                              stroke={colors[index % colors.length]}
                              strokeWidth="4"
                              strokeDasharray={`${component.percentage}, 100`}
                              strokeDashoffset={-startAngle}
                              className="hover:stroke-width-6 transition-all cursor-pointer"
                              title={`${component.molecule_name}: ${component.concentration}${component.unit}`}
                            />
                          )
                        })}
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-lg font-bold">{mixture.components.length}</div>
                          <div className="text-xs text-gray-600">Components</div>
                        </div>
                      </div>
                    </div>

                    {/* Component List */}
                    <div className="space-y-2">
                      {mixture.components.map((component, index) => {
                        const colors = ["bg-blue-500", "bg-purple-500", "bg-pink-500", "bg-green-500", "bg-yellow-500"]
                        return (
                          <div key={component.molecule_id} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]}`} />
                              <span className="font-medium">{component.molecule_name}</span>
                            </div>
                            <span className="text-gray-600">
                              {component.concentration}
                              {component.unit}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Application Card */}
                <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 opacity-50" />
                  <CardHeader className="relative">
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-green-600" />
                      Applications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <div>
                        <div className="font-medium">{mixture.application}</div>
                        <div className="text-sm text-gray-600">Primary Application</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${getScoreColor(mixture.success_rate)}`}>
                          {mixture.success_rate}%
                        </div>
                        <div className="text-xs text-gray-500">Success Rate</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <Thermometer className="h-4 w-4 text-blue-500" />
                          Temperature Range
                        </span>
                        <span className="font-medium">
                          {mixture.temperature_range.min}°C to {mixture.temperature_range.max}°C
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-purple-500" />
                          pH Level
                        </span>
                        <span className="font-medium">{mixture.ph}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-green-500" />
                          Osmolality
                        </span>
                        <span className="font-medium">{mixture.osmolality} mOsm/kg</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Insights Card */}
                <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-orange-50 opacity-50" />
                  <CardHeader className="relative">
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-yellow-600" />
                      AI Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative space-y-3">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <div className="text-sm">
                          <div className="font-medium text-green-800">Outperforms VS55 by 18%</div>
                          <div className="text-green-600">Higher efficacy with lower toxicity</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div className="text-sm">
                          <div className="font-medium text-blue-800">Optimal for stem cells</div>
                          <div className="text-blue-600">Component synergy maximizes viability</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                        <div className="text-sm">
                          <div className="font-medium text-yellow-800">Consider reducing DMSO</div>
                          <div className="text-yellow-600">Could improve safety profile by 12%</div>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 text-center pt-2">
                      Based on analysis of {mixture.citations} citations
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Expandable Modules */}
              <div className="space-y-4">
                {/* Analysis Module */}
                <Card className="overflow-hidden">
                  <CardHeader
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleModule("analysis")}
                  >
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-blue-600" />
                        Detailed Analysis
                      </CardTitle>
                      {expandedModules.includes("analysis") ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </div>
                  </CardHeader>
                  {expandedModules.includes("analysis") && (
                    <CardContent className="border-t bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                        <div>
                          <h4 className="font-medium mb-3">Component Interactions</h4>
                          <div className="space-y-2">
                            {mixture.components.map((comp1, i) =>
                              mixture.components.slice(i + 1).map((comp2, j) => (
                                <div key={`${i}-${j}`} className="flex items-center justify-between text-sm">
                                  <span>
                                    {comp1.molecule_name} + {comp2.molecule_name}
                                  </span>
                                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                                    Synergistic
                                  </Badge>
                                </div>
                              )),
                            )}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-3">Performance Trends</h4>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Efficacy over time</span>
                                <span className="text-green-600">+5.2%</span>
                              </div>
                              <Progress value={85} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Stability at -80°C</span>
                                <span className="text-blue-600">Excellent</span>
                              </div>
                              <Progress value={92} className="h-2" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>

                {/* History Module */}
                <Card className="overflow-hidden">
                  <CardHeader
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleModule("history")}
                  >
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-purple-600" />
                        Version History
                      </CardTitle>
                      {expandedModules.includes("history") ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </div>
                  </CardHeader>
                  {expandedModules.includes("history") && (
                    <CardContent className="border-t bg-gray-50">
                      <div className="space-y-4 py-4">
                        {[
                          { version: 3, date: "2024-01-20", changes: "Optimized trehalose concentration", success: 89 },
                          {
                            version: 2,
                            date: "2024-01-15",
                            changes: "Added glycerol for improved viability",
                            success: 84,
                          },
                          { version: 1, date: "2024-01-10", changes: "Initial formulation", success: 78 },
                        ].map((entry) => (
                          <div key={entry.version} className="flex items-center gap-4 p-3 bg-white rounded-lg">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-purple-600">v{entry.version}</span>
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{entry.changes}</div>
                              <div className="text-sm text-gray-600">{entry.date}</div>
                            </div>
                            <div className="text-right">
                              <div className={`font-medium ${getScoreColor(entry.success)}`}>{entry.success}%</div>
                              <div className="text-xs text-gray-500">Success</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>

                {/* Compare Module */}
                <Card className="overflow-hidden">
                  <CardHeader
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleModule("compare")}
                  >
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Scale className="h-5 w-5 text-green-600" />
                        Comparison Analysis
                      </CardTitle>
                      {expandedModules.includes("compare") ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </div>
                  </CardHeader>
                  {expandedModules.includes("compare") && (
                    <CardContent className="border-t bg-gray-50">
                      <div className="py-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {[
                            { name: "VS55 Standard", efficacy: 76, toxicity: 25, cost: "$12/L" },
                            { name: "PlantGuard Elite", efficacy: 87, toxicity: 8, cost: "$18/L" },
                            { name: "Industry Average", efficacy: 72, toxicity: 32, cost: "$8/L" },
                          ].map((comparison) => (
                            <div key={comparison.name} className="p-4 bg-white rounded-lg border">
                              <h4 className="font-medium mb-3">{comparison.name}</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>Efficacy</span>
                                  <span
                                    className={
                                      comparison.efficacy > mixture.efficacy_score
                                        ? "text-red-600"
                                        : comparison.efficacy < mixture.efficacy_score
                                          ? "text-green-600"
                                          : "text-gray-600"
                                    }
                                  >
                                    {comparison.efficacy}%
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Toxicity</span>
                                  <span
                                    className={
                                      comparison.toxicity < mixture.toxicity_score
                                        ? "text-red-600"
                                        : comparison.toxicity > mixture.toxicity_score
                                          ? "text-green-600"
                                          : "text-gray-600"
                                    }
                                  >
                                    {comparison.toxicity}%
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Cost</span>
                                  <span className="text-gray-600">{comparison.cost}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

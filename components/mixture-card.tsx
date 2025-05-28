"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Edit, Copy, BarChart3, Beaker, TrendingUp, Shield, AlertTriangle } from "lucide-react"

interface MixtureCardProps {
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
    }>
    total_concentration: number
    osmolality: number
    ph: number
    efficacy_score: number
    toxicity_score: number
    stability_score: number
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
  }
  viewMode: "grid" | "list"
  onView: () => void
  onEdit: () => void
  onAnalyze: () => void
  onClone: () => void
}

export function MixtureCard({ mixture, viewMode, onView, onEdit, onAnalyze, onClone }: MixtureCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getToxicityColor = (score: number) => {
    if (score <= 20) return "text-green-600"
    if (score <= 50) return "text-yellow-600"
    return "text-red-600"
  }

  if (viewMode === "list") {
    return (
      <Card className="p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold">{mixture.name}</h3>
              <Badge variant="outline">{mixture.application}</Badge>
              <Badge variant="secondary">v{mixture.version}</Badge>
            </div>
            <p className="text-gray-600 text-sm mb-2">{mixture.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{mixture.components.length} components</span>
              <span>{mixture.citations} citations</span>
              <span>{mixture.success_rate}% success</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onView}>
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onEdit}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onAnalyze}>
              <BarChart3 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onClone}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
            <Beaker className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold group-hover:text-purple-600 transition-colors">{mixture.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs">
                {mixture.application}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                v{mixture.version}
              </Badge>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold ${getScoreColor(mixture.overall_score)}`}>{mixture.overall_score}</div>
          <div className="text-xs text-gray-500">Overall Score</div>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{mixture.description}</p>

      {/* Component Pie Chart */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Components ({mixture.components.length})</span>
          <span className="text-xs text-gray-500">{mixture.total_concentration}% total</span>
        </div>
        <div className="flex h-2 rounded-full overflow-hidden bg-gray-100">
          {mixture.components.map((component, index) => (
            <div
              key={component.molecule_id}
              className={`h-full ${
                index === 0
                  ? "bg-blue-500"
                  : index === 1
                    ? "bg-purple-500"
                    : index === 2
                      ? "bg-pink-500"
                      : "bg-gray-400"
              }`}
              style={{ width: `${component.percentage}%` }}
              title={`${component.molecule_name}: ${component.concentration}${component.unit}`}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {mixture.components.slice(0, 3).map((component, index) => (
            <span key={component.molecule_id} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
              {component.molecule_name} ({component.concentration}
              {component.unit})
            </span>
          ))}
          {mixture.components.length > 3 && (
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
              +{mixture.components.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center">
          <div className={`text-lg font-semibold ${getScoreColor(mixture.efficacy_score)}`}>
            {mixture.efficacy_score}
          </div>
          <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
            <TrendingUp className="h-3 w-3" />
            Efficacy
          </div>
        </div>
        <div className="text-center">
          <div className={`text-lg font-semibold ${getToxicityColor(mixture.toxicity_score)}`}>
            {mixture.toxicity_score}
          </div>
          <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
            <Shield className="h-3 w-3" />
            Toxicity
          </div>
        </div>
        <div className="text-center">
          <div className={`text-lg font-semibold ${getScoreColor(mixture.stability_score)}`}>
            {mixture.stability_score}
          </div>
          <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            Stability
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
        <span>{mixture.success_rate}% success rate</span>
        <span>{mixture.citations} citations</span>
        <span>pH {mixture.ph}</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-4">
        {mixture.tags.slice(0, 3).map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onView} className="flex-1">
          <Eye className="h-4 w-4 mr-1" />
          View
        </Button>
        <Button variant="outline" size="sm" onClick={onEdit}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={onAnalyze}>
          <BarChart3 className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={onClone}>
          <Copy className="h-4 w-4" />
        </Button>
      </div>

      {/* Created by */}
      <div className="mt-3 pt-3 border-t text-xs text-gray-500">
        Created by {mixture.created_by} • {mixture.created_at}
      </div>
    </Card>
  )
}

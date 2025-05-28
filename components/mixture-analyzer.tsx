"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, Shield, AlertTriangle, Download, Share } from "lucide-react"

interface MixtureAnalyzerProps {
  mixture: any
  onClose: () => void
}

export function MixtureAnalyzer({ mixture, onClose }: MixtureAnalyzerProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock interaction data
  const interactions = [
    { comp1: "DMSO", comp2: "Glycerol", type: "synergy", strength: 0.8, description: "Enhanced membrane permeability" },
    { comp1: "DMSO", comp2: "Trehalose", type: "neutral", strength: 0.1, description: "No significant interaction" },
    { comp1: "Glycerol", comp2: "Trehalose", type: "synergy", strength: 0.6, description: "Improved glass formation" },
  ]

  const performanceData = [
    { concentration: 10, efficacy: 65, toxicity: 15 },
    { concentration: 20, efficacy: 78, toxicity: 22 },
    { concentration: 30, efficacy: 89, toxicity: 35 },
    { concentration: 40, efficacy: 92, toxicity: 55 },
    { concentration: 50, efficacy: 88, toxicity: 75 },
  ]

  const optimizations = [
    {
      suggestion: "Reduce DMSO to 8% and increase Trehalose to 7%",
      impact: "+5% efficacy, -3% toxicity",
      confidence: 0.85,
    },
    {
      suggestion: "Add 0.5% Ascorbic Acid for antioxidant protection",
      impact: "+8% stability, +2% efficacy",
      confidence: 0.72,
    },
    {
      suggestion: "Adjust pH to 7.4 for optimal cellular compatibility",
      impact: "+3% efficacy, -2% toxicity",
      confidence: 0.91,
    },
  ]

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Mixture Analysis: {mixture.name}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="interactions">Interactions</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="optimization">Optimization</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="font-medium">Efficacy</span>
                </div>
                <div className="text-2xl font-bold text-green-600">{mixture.efficacy_score}</div>
                <div className="text-sm text-gray-500">Excellent performance</div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">Safety</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">{100 - mixture.toxicity_score}</div>
                <div className="text-sm text-gray-500">Low toxicity</div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-purple-500" />
                  <span className="font-medium">Stability</span>
                </div>
                <div className="text-2xl font-bold text-purple-600">{mixture.stability_score}</div>
                <div className="text-sm text-gray-500">Good stability</div>
              </Card>
            </div>

            <Card className="p-4">
              <h3 className="font-semibold mb-3">Component Breakdown</h3>
              <div className="space-y-3">
                {mixture.components.map((component: any, index: number) => (
                  <div key={component.molecule_id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded ${
                          index === 0
                            ? "bg-blue-500"
                            : index === 1
                              ? "bg-purple-500"
                              : index === 2
                                ? "bg-pink-500"
                                : "bg-gray-400"
                        }`}
                      />
                      <span className="font-medium">{component.molecule_name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">
                        {component.concentration}
                        {component.unit}
                      </div>
                      <div className="text-sm text-gray-500">{component.percentage.toFixed(1)}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-3">Physical Properties</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Total Concentration</div>
                  <div className="font-semibold">{mixture.total_concentration}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Osmolality</div>
                  <div className="font-semibold">{mixture.osmolality} mOsm/kg</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">pH</div>
                  <div className="font-semibold">{mixture.ph}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Temperature Range</div>
                  <div className="font-semibold">
                    {mixture.temperature_range.min}°C to {mixture.temperature_range.max}°C
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="interactions" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Component Interaction Matrix</h3>
              <div className="space-y-3">
                {interactions.map((interaction, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant={interaction.type === "synergy" ? "default" : "secondary"}>
                        {interaction.comp1} + {interaction.comp2}
                      </Badge>
                      <span
                        className={`font-medium ${interaction.type === "synergy" ? "text-green-600" : "text-gray-600"}`}
                      >
                        {interaction.type === "synergy" ? "Synergy" : "Neutral"}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">Strength: {(interaction.strength * 100).toFixed(0)}%</div>
                      <div className="text-sm text-gray-500">{interaction.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Performance vs Concentration</h3>
              <div className="h-64 flex items-end justify-between gap-2 p-4 bg-gray-50 rounded">
                {performanceData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div className="flex gap-1">
                      <div
                        className="w-4 bg-green-500 rounded-t"
                        style={{ height: `${data.efficacy * 2}px` }}
                        title={`Efficacy: ${data.efficacy}%`}
                      />
                      <div
                        className="w-4 bg-red-500 rounded-t"
                        style={{ height: `${data.toxicity * 2}px` }}
                        title={`Toxicity: ${data.toxicity}%`}
                      />
                    </div>
                    <div className="text-xs text-center">{data.concentration}%</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded" />
                  <span className="text-sm">Efficacy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded" />
                  <span className="text-sm">Toxicity</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="optimization" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-3">AI Optimization Suggestions</h3>
              <div className="space-y-3">
                {optimizations.map((opt, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="font-medium">{opt.suggestion}</div>
                        <div className="text-sm text-green-600 mt-1">{opt.impact}</div>
                      </div>
                      <Badge variant="outline">{(opt.confidence * 100).toFixed(0)}% confidence</Badge>
                    </div>
                    <Button size="sm" variant="outline">
                      Apply Suggestion
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-4 border-t">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share Analysis
            </Button>
          </div>
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from "recharts"
import { Eye, Layers, Target, Zap, Download, Share, Play, Pause } from "lucide-react"

export function MolecularLandscape() {
  const [viewMode, setViewMode] = useState("efficacy-toxicity")
  const [isAnimating, setIsAnimating] = useState(false)
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null)

  // Generate molecular landscape data
  const generateLandscapeData = () => {
    const data = []
    const clusters = [
      { name: "Sugar-based", color: "#10b981", center: { x: 85, y: 20 } },
      { name: "Glycol derivatives", color: "#3b82f6", center: { x: 70, y: 45 } },
      { name: "Amino acids", color: "#f59e0b", center: { x: 60, y: 30 } },
      { name: "Synthetic polymers", color: "#ef4444", center: { x: 50, y: 60 } },
      { name: "Natural extracts", color: "#8b5cf6", center: { x: 75, y: 35 } },
    ]

    clusters.forEach((cluster) => {
      for (let i = 0; i < 50; i++) {
        const angle = Math.random() * 2 * Math.PI
        const radius = Math.random() * 15
        data.push({
          id: `${cluster.name}-${i}`,
          efficacy: Math.max(
            0,
            Math.min(100, cluster.center.x + Math.cos(angle) * radius + (Math.random() - 0.5) * 10),
          ),
          toxicity: Math.max(
            0,
            Math.min(100, cluster.center.y + Math.sin(angle) * radius + (Math.random() - 0.5) * 10),
          ),
          permeability: Math.random() * 100,
          novelty: Math.random() * 100,
          cluster: cluster.name,
          color: cluster.color,
          size: Math.random() * 50 + 10,
          confidence: 70 + Math.random() * 30,
        })
      }
    })

    return data
  }

  const [landscapeData, setLandscapeData] = useState(generateLandscapeData())

  const viewModes = [
    { id: "efficacy-toxicity", label: "Efficacy vs Toxicity", x: "efficacy", y: "toxicity" },
    { id: "efficacy-permeability", label: "Efficacy vs Permeability", x: "efficacy", y: "permeability" },
    { id: "novelty-efficacy", label: "Novelty vs Efficacy", x: "novelty", y: "efficacy" },
  ]

  const currentView = viewModes.find((v) => v.id === viewMode) || viewModes[0]

  const clusters = [...new Set(landscapeData.map((d) => d.cluster))]

  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setLandscapeData((prev) =>
          prev.map((point) => ({
            ...point,
            efficacy: Math.max(0, Math.min(100, point.efficacy + (Math.random() - 0.5) * 2)),
            toxicity: Math.max(0, Math.min(100, point.toxicity + (Math.random() - 0.5) * 2)),
          })),
        )
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isAnimating])

  const filteredData = selectedCluster ? landscapeData.filter((d) => d.cluster === selectedCluster) : landscapeData

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{data.cluster}</p>
          <p className="text-sm">Efficacy: {data.efficacy.toFixed(1)}%</p>
          <p className="text-sm">Toxicity: {data.toxicity.toFixed(1)}%</p>
          <p className="text-sm">Confidence: {data.confidence.toFixed(1)}%</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Eye className="w-5 h-5 mr-2 text-blue-600" />
            Molecular Landscape Explorer
          </CardTitle>
          <CardDescription>
            Visualize the entire molecular space and discover patterns, clusters, and opportunities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">View:</span>
                {viewModes.map((mode) => (
                  <Button
                    key={mode.id}
                    variant={viewMode === mode.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode(mode.id)}
                  >
                    {mode.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => setIsAnimating(!isAnimating)}>
                {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isAnimating ? "Pause" : "Animate"}
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Layers className="w-4 h-4 mr-2" />
              Molecular Clusters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button
                variant={selectedCluster === null ? "default" : "outline"}
                size="sm"
                className="w-full justify-start"
                onClick={() => setSelectedCluster(null)}
              >
                <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                All Clusters ({landscapeData.length})
              </Button>

              {clusters.map((cluster) => {
                const clusterData = landscapeData.filter((d) => d.cluster === cluster)
                const color = clusterData[0]?.color || "#gray"

                return (
                  <Button
                    key={cluster}
                    variant={selectedCluster === cluster ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setSelectedCluster(cluster)}
                  >
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: color }}></div>
                    {cluster} ({clusterData.length})
                  </Button>
                )
              })}
            </div>

            <div className="mt-6 pt-4 border-t">
              <h4 className="font-medium mb-3">Cluster Insights</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>High Efficacy ({">"}80%)</span>
                  <span className="font-medium">{landscapeData.filter((d) => d.efficacy > 80).length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Low Toxicity ({"<"}30%)</span>
                  <span className="font-medium">{landscapeData.filter((d) => d.toxicity < 30).length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Optimal Zone</span>
                  <span className="font-medium text-green-600">
                    {landscapeData.filter((d) => d.efficacy > 70 && d.toxicity < 40).length}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{currentView.label} Landscape</span>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{filteredData.length} molecules</Badge>
                {isAnimating && <Badge variant="secondary">Live View</Badge>}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={500}>
              <ScatterChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  dataKey={currentView.x}
                  name={currentView.x}
                  domain={[0, 100]}
                  label={{
                    value: currentView.x.charAt(0).toUpperCase() + currentView.x.slice(1),
                    position: "insideBottom",
                    offset: -10,
                  }}
                />
                <YAxis
                  type="number"
                  dataKey={currentView.y}
                  name={currentView.y}
                  domain={[0, 100]}
                  label={{
                    value: currentView.y.charAt(0).toUpperCase() + currentView.y.slice(1),
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <ZAxis type="number" dataKey="size" range={[20, 200]} />
                <Tooltip content={<CustomTooltip />} />
                <Scatter dataKey={currentView.y} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-4 h-4 text-green-600" />
                  <h4 className="font-medium text-green-900">Optimal Zone</h4>
                </div>
                <p className="text-sm text-green-800">
                  {landscapeData.filter((d) => d.efficacy > 70 && d.toxicity < 40).length} molecules with high efficacy
                  and low toxicity
                </p>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-4 h-4 text-yellow-600" />
                  <h4 className="font-medium text-yellow-900">Improvement Opportunity</h4>
                </div>
                <p className="text-sm text-yellow-800">
                  {landscapeData.filter((d) => d.efficacy > 60 && d.efficacy < 80 && d.toxicity > 30).length} molecules
                  that could be optimized
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Eye className="w-4 h-4 text-blue-600" />
                  <h4 className="font-medium text-blue-900">Unexplored Region</h4>
                </div>
                <p className="text-sm text-blue-800">Sparse areas suggest potential for novel molecule discovery</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

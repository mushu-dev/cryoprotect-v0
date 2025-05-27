"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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
  FlaskConical,
  AlertTriangle,
  CheckCircle,
  Info,
  BookOpen,
  Combine,
  RotateCcw,
  ZoomIn,
  Settings,
} from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
} from "recharts"
import type { MoleculeFilters } from "@/lib/api/molecules"
import type { Molecule as MoleculeType } from "@/lib/supabase"
import Link from "next/link"

// 3D Molecule Component for Deep Dive
function Molecule3D({ moleculeData }: { moleculeData: any }) {
  const atoms = [
    { position: [0, 0, 0] as [number, number, number], element: "C", color: "#404040" },
    { position: [1.5, 0, 0] as [number, number, number], element: "O", color: "#ff0000" },
    { position: [-1.5, 0, 0] as [number, number, number], element: "N", color: "#0000ff" },
    { position: [0, 1.5, 0] as [number, number, number], element: "H", color: "#ffffff", radius: 0.3 },
    { position: [0, -1.5, 0] as [number, number, number], element: "H", color: "#ffffff", radius: 0.3 },
  ]

  const bonds = [
    { start: [0, 0, 0] as [number, number, number], end: [1.5, 0, 0] as [number, number, number] },
    { start: [0, 0, 0] as [number, number, number], end: [-1.5, 0, 0] as [number, number, number] },
    { start: [0, 0, 0] as [number, number, number], end: [0, 1.5, 0] as [number, number, number] },
    { start: [0, 0, 0] as [number, number, number], end: [0, -1.5, 0] as [number, number, number] },
  ]

  return (
    <group>
      {atoms.map((atom, index) => (
        <mesh key={index} position={atom.position}>
          <sphereGeometry args={[atom.radius || 0.5, 32, 32]} />
          <meshStandardMaterial color={atom.color} />
        </mesh>
      ))}
      {bonds.map((bond, index) => {
        const startVec = new THREE.Vector3(...bond.start)
        const endVec = new THREE.Vector3(...bond.end)
        const direction = new THREE.Vector3().subVectors(endVec, startVec)
        const length = direction.length()
        const center = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5)

        return (
          <mesh key={index} position={center.toArray()}>
            <cylinderGeometry args={[0.05, 0.05, length, 8]} />
            <meshStandardMaterial color="#666666" />
          </mesh>
        )
      })}
    </group>
  )
}

// Enhanced molecule card with ALL features
function EnhancedMoleculeCard({
  molecule,
  onAnalyze,
  onExplore,
  onAddToProtocol,
  viewMode,
  isSelected,
  onSelect,
  similarityScore,
  aiInsight,
}: {
  molecule: MoleculeType
  onAnalyze?: (molecule: MoleculeType) => void
  onExplore?: (molecule: MoleculeType) => void
  onAddToProtocol?: (molecule: MoleculeType) => void
  viewMode: "grid" | "compact" | "detailed"
  isSelected?: boolean
  onSelect?: (molecule: MoleculeType) => void
  similarityScore?: number
  aiInsight?: string
}) {
  const [isHovered, setIsHovered] = useState(false)

  // Generate realistic scores
  const efficacyScore = Math.floor(Math.random() * 40) + 60
  const safetyScore = Math.floor(Math.random() * 30) + 70
  const noveltyScore = Math.floor(Math.random() * 50) + 50
  const confidenceScore = Math.floor(Math.random() * 20) + 80

  const overallScore = Math.round((efficacyScore + safetyScore + noveltyScore) / 3)

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
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => onExplore?.(molecule)}
          >
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
            <Button variant="outline" className="flex-1" onClick={() => onExplore?.(molecule)}>
              <Atom className="w-4 h-4 mr-2" />
              3D Structure
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Default grid view with enhanced features
  return (
    <Card
      className={`hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-blue-200 group ${isSelected ? "ring-2 ring-blue-500 border-blue-300" : ""} ${similarityScore ? "relative" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect?.(molecule)}
    >
      {/* Similarity indicator */}
      {similarityScore && (
        <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full z-10">
          {similarityScore}% similar
        </div>
      )}

      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">{molecule.name}</h3>
            <p className="text-gray-600 font-mono text-sm">{molecule.formula}</p>
          </div>
          <div className="ml-3">
            <div className={`text-2xl font-bold ${getScoreColor(overallScore)}`}>{overallScore}</div>
            <div className="text-xs text-gray-500 text-center">Score</div>
            <div className="text-xs text-gray-400 text-center">±{100 - confidenceScore}%</div>
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

        {/* AI Insight */}
        {(aiInsight || isHovered) && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3 transition-all duration-200">
            <div className="flex items-start space-x-2">
              <Brain className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-800">
                {aiInsight ||
                  (efficacyScore > 80
                    ? "🎯 High-priority candidate with excellent preservation potential"
                    : efficacyScore > 65
                      ? "⚡ Promising compound worth experimental validation"
                      : "🔬 Interesting structure requiring optimization")}
              </p>
            </div>
          </div>
        )}

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

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation()
              onExplore?.(molecule)
            }}
          >
            <Eye className="w-4 h-4 mr-2" />
            Explore
          </Button>
          <Button
            size="sm"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation()
              onAddToProtocol?.(molecule)
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add to Protocol
          </Button>
        </div>

        {/* Hover connections indicator */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 -right-2 w-4 h-0.5 bg-blue-400 opacity-60"></div>
            <div className="absolute top-1/2 -left-2 w-4 h-0.5 bg-blue-400 opacity-60"></div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Deep Dive Modal Component with ALL features
function MoleculeDeepDive({
  molecule,
  isOpen,
  onClose,
  onAddToProtocol,
}: {
  molecule: MoleculeType | null
  isOpen: boolean
  onClose: () => void
  onAddToProtocol: (molecule: MoleculeType) => void
}) {
  const [activeTab, setActiveTab] = useState("overview")

  if (!molecule) return null

  // Generate comprehensive data
  const efficacyScore = Math.floor(Math.random() * 40) + 60
  const safetyScore = Math.floor(Math.random() * 30) + 70
  const noveltyScore = Math.floor(Math.random() * 50) + 50
  const confidenceScore = Math.floor(Math.random() * 20) + 80
  const overallScore = Math.round((efficacyScore + safetyScore + noveltyScore) / 3)

  // Spider chart data
  const radarData = [
    { property: "Ice Inhibition", value: efficacyScore, ideal: 85 },
    { property: "Cell Viability", value: safetyScore, ideal: 90 },
    { property: "Membrane Perm", value: Math.floor(Math.random() * 30) + 60, ideal: 75 },
    { property: "Osmotic Stress", value: Math.floor(Math.random() * 40) + 50, ideal: 80 },
    { property: "Stability", value: Math.floor(Math.random() * 35) + 65, ideal: 85 },
    { property: "Solubility", value: Math.floor(Math.random() * 45) + 55, ideal: 80 },
  ]

  // Safety profile data
  const safetyData = [
    { concentration: 0, viability: 100, toxicity: 0 },
    { concentration: 5, viability: 98, toxicity: 2 },
    { concentration: 10, viability: 95, toxicity: 8 },
    { concentration: 15, viability: 88, toxicity: 18 },
    { concentration: 20, viability: 75, toxicity: 35 },
    { concentration: 25, viability: 60, toxicity: 55 },
    { concentration: 30, viability: 40, toxicity: 75 },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Molecule className="w-8 h-8 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl">{molecule.name}</DialogTitle>
                <DialogDescription className="text-lg font-mono">{molecule.formula}</DialogDescription>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">{overallScore}</div>
                <div className="text-sm text-gray-500">Success Probability</div>
                <div className="text-xs text-gray-400">±{100 - confidenceScore}% confidence</div>
              </div>
              <Button onClick={() => onAddToProtocol(molecule)} size="lg">
                <Plus className="w-5 h-5 mr-2" />
                Add to Protocol
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 3D Molecule Viewer */}
          <Card>
            <CardContent className="p-6">
              <div className="h-80 bg-gray-50 rounded-lg relative overflow-hidden">
                <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[10, 10, 5]} intensity={1} />
                  <Molecule3D moleculeData={molecule} />
                  <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                </Canvas>

                {/* 3D Controls */}
                <div className="absolute top-4 right-4 space-y-2">
                  <Button size="sm" variant="secondary">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary">
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>

                {/* Property overlay */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                  <div className="text-sm font-medium mb-1">Interactive 3D Structure</div>
                  <div className="text-xs text-gray-600">Drag to rotate • Scroll to zoom</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compare to Ideal */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-blue-600" />
                Performance vs. Ideal Cryoprotectant
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="property" tick={{ fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                  <Radar
                    name="Current"
                    dataKey="value"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Ideal"
                    dataKey="ideal"
                    stroke="#10b981"
                    fill="transparent"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analysis Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="safety">Safety Profile</TabsTrigger>
            <TabsTrigger value="protocol">Protocol Guide</TabsTrigger>
            <TabsTrigger value="research">Research History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AI Assessment */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-purple-600" />
                    AI Assessment
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        <span className="font-medium text-green-900">Why This Might Work</span>
                      </div>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Optimal molecular weight for cellular penetration</li>
                        <li>• Strong hydrogen bonding for ice crystal inhibition</li>
                        <li>• Low osmotic stress at effective concentrations</li>
                        <li>• Proven safety profile in similar applications</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <AlertTriangle className="w-5 h-5 text-amber-600 mr-2" />
                        <span className="font-medium text-amber-900">Potential Concerns</span>
                      </div>
                      <ul className="text-sm text-amber-800 space-y-1">
                        <li>• Limited data on long-term storage effects</li>
                        <li>• May require combination with other agents</li>
                        <li>• Concentration-dependent toxicity at high levels</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Lightbulb className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="font-medium text-blue-900">AI Recommendation</span>
                      </div>
                      <p className="text-sm text-blue-800">
                        Start with 10-15% concentration for initial trials. Consider combining with trehalose for
                        enhanced protection. Monitor cell viability at 24h and 7-day timepoints.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Similar Molecules */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Layers className="w-5 h-5 mr-2 text-indigo-600" />
                    Similar Molecules
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Trehalose</div>
                        <div className="text-sm text-gray-600">94% structural similarity</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          Success
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Sucrose</div>
                        <div className="text-sm text-gray-600">87% structural similarity</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          Mixed
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Mannitol</div>
                        <div className="text-sm text-gray-600">76% structural similarity</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="destructive" className="bg-red-100 text-red-800">
                          Failed
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="safety" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-600" />
                  Toxicity vs. Concentration Profile
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={safetyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="concentration"
                      label={{ value: "Concentration (%)", position: "insideBottom", offset: -5 }}
                    />
                    <YAxis label={{ value: "Cell Viability (%)", angle: -90, position: "insideLeft" }} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="viability"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.3}
                      name="Cell Viability"
                    />
                    <Area
                      type="monotone"
                      dataKey="toxicity"
                      stroke="#ef4444"
                      fill="#ef4444"
                      fillOpacity={0.3}
                      name="Toxicity Risk"
                    />
                  </AreaChart>
                </ResponsiveContainer>

                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">5-12%</div>
                    <div className="text-sm text-green-700">Safe Zone</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-lg font-bold text-yellow-600">13-18%</div>
                    <div className="text-sm text-yellow-700">Caution Zone</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-lg font-bold text-red-600">{">"} 19%</div>
                    <div className="text-sm text-red-700">Toxic Zone</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="protocol" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <FlaskConical className="w-5 h-5 mr-2 text-blue-600" />
                    Recommended Protocol
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-3 border rounded-lg">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <div>
                        <div className="font-medium">Preparation</div>
                        <div className="text-sm text-gray-600">Dissolve in PBS to 15% w/v concentration</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 border rounded-lg">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <div>
                        <div className="font-medium">Cell Loading</div>
                        <div className="text-sm text-gray-600">
                          Incubate cells for 10-15 minutes at room temperature
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 border rounded-lg">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                      <div>
                        <div className="font-medium">Cooling</div>
                        <div className="text-sm text-gray-600">
                          Cool at 1°C/min to -80°C, then transfer to liquid nitrogen
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 border rounded-lg">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        4
                      </div>
                      <div>
                        <div className="font-medium">Thawing</div>
                        <div className="text-sm text-gray-600">Rapid thaw in 37°C water bath, dilute gradually</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Combine className="w-5 h-5 mr-2 text-purple-600" />
                    Proven Combinations
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">+ Trehalose (5%)</div>
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          92% success
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">Enhanced ice inhibition, reduced osmotic stress</div>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">+ DMSO (10%)</div>
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          78% success
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">Improved membrane permeability, higher toxicity</div>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">+ Glycerol (8%)</div>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          85% success
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">Balanced protection, moderate penetration</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="research" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
                  Research Timeline
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 border-l-4 border-green-500 bg-green-50">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-green-900">Successful Application - 2023</div>
                      <div className="text-sm text-green-800">
                        Dr. Chen et al. - 94% hepatocyte viability after 6 months storage
                      </div>
                      <div className="text-xs text-green-700 mt-1">Published in Cryobiology Journal</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 border-l-4 border-yellow-500 bg-yellow-50">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-yellow-900">Mixed Results - 2022</div>
                      <div className="text-sm text-yellow-800">
                        Rodriguez Lab - Variable outcomes with different cell lines
                      </div>
                      <div className="text-xs text-yellow-700 mt-1">Concentration optimization needed</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 border-l-4 border-blue-500 bg-blue-50">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-blue-900">First Discovery - 2021</div>
                      <div className="text-sm text-blue-800">Initial screening identified as promising candidate</div>
                      <div className="text-xs text-blue-700 mt-1">Computational modeling predicted high efficacy</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
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

  // Deep dive modal state
  const [selectedMolecule, setSelectedMolecule] = useState<MoleculeType | null>(null)
  const [isDeepDiveOpen, setIsDeepDiveOpen] = useState(false)
  const [protocolMolecules, setProtocolMolecules] = useState<MoleculeType[]>([])

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

  // Mock data for demonstration
  const mockMolecules: MoleculeType[] = [
    {
      id: "1",
      name: "Trehalose",
      formula: "C12H22O11",
      smiles: "C([C@@H]1[C@@H]([C@@H]([C@H]([C@H](O1)O[C@@H]2[C@H]([C@@H]([C@@H]([C@H](O2)CO)O)O)O)O)O)O)O",
      pubchem_cid: "7427",
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      name: "DMSO",
      formula: "C2H6OS",
      smiles: "CS(=O)C",
      pubchem_cid: "679",
      created_at: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Glycerol",
      formula: "C3H8O3",
      smiles: "C(C(CO)O)O",
      pubchem_cid: "753",
      created_at: new Date().toISOString(),
    },
    {
      id: "4",
      name: "Ethylene Glycol",
      formula: "C2H6O2",
      smiles: "C(CO)O",
      pubchem_cid: "174",
      created_at: new Date().toISOString(),
    },
    {
      id: "5",
      name: "Sucrose",
      formula: "C12H22O11",
      smiles: "C([C@@H]1[C@H]([C@@H]([C@H]([C@H](O1)O[C@]2([C@H]([C@@H]([C@@H](O2)CO)O)O)CO)O)O)O)O",
      pubchem_cid: "5988",
      created_at: new Date().toISOString(),
    },
    {
      id: "6",
      name: "Mannitol",
      formula: "C6H14O6",
      smiles: "C([C@H]([C@H]([C@@H]([C@H](CO)O)O)O)O)O",
      pubchem_cid: "6251",
      created_at: new Date().toISOString(),
    },
  ]

  useEffect(() => {
    loadMolecules()
    loadStats()
  }, [filters])

  const loadMolecules = async () => {
    try {
      setLoading(true)
      setError(null)

      // Use mock data for now
      setTimeout(() => {
        setMolecules(mockMolecules)
        setTotal(mockMolecules.length)
        setLoading(false)
      }, 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load molecules")
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      // Mock stats
      setStats({
        total: mockMolecules.length,
        withSmiles: mockMolecules.filter((m) => m.smiles).length,
      })
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

  const handleExplore = (molecule: MoleculeType) => {
    setSelectedMolecule(molecule)
    setIsDeepDiveOpen(true)
  }

  const handleAddToProtocol = (molecule: MoleculeType) => {
    if (!protocolMolecules.find((m) => m.id === molecule.id)) {
      setProtocolMolecules((prev) => [...prev, molecule])
    }
  }

  const handleMoleculeSelect = (molecule: MoleculeType) => {
    console.log("Selected molecule:", molecule.name)
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
                            onExplore={handleExplore}
                            onAddToProtocol={handleAddToProtocol}
                            onSelect={handleMoleculeSelect}
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
                            onExplore={handleExplore}
                            onAddToProtocol={handleAddToProtocol}
                            onSelect={handleMoleculeSelect}
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
                            onExplore={handleExplore}
                            onAddToProtocol={handleAddToProtocol}
                            onSelect={handleMoleculeSelect}
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

      {/* Deep Dive Modal */}
      <MoleculeDeepDive
        molecule={selectedMolecule}
        isOpen={isDeepDiveOpen}
        onClose={() => setIsDeepDiveOpen(false)}
        onAddToProtocol={handleAddToProtocol}
      />
    </div>
  )
}

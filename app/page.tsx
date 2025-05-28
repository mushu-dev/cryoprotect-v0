"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Line,
  Area,
  ComposedChart,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Search,
  Brain,
  Beaker,
  FlaskConical,
  BarChart3,
  Target,
  ArrowRight,
  Star,
  CheckCircle,
  Microscope,
  Lightbulb,
  Clock,
  Info,
} from "lucide-react"
import Link from "next/link"
import { MoleculeCardModal } from "@/components/molecule-card-modal"

export default function CryoprotectantDiscoveryDashboard() {
  const [activeTimeRange, setActiveTimeRange] = useState("6m")
  const [activeAnalysis, setActiveAnalysis] = useState("efficacy")
  const [showMoleculeCard, setShowMoleculeCard] = useState(false)

  // Lead candidate data
  const leadCandidate = {
    id: "CRY-2847",
    name: "CRY-2847",
    chemicalName: "6-O-Methyl-α,α-trehalose",
    formula: "C₁₃H₂₄O₁₁",
    molecularWeight: 358.3,
    efficacy: 94.2,
    toxicity: 2.1,
    glassTransition: -31,
    mechanism: "Dual-action membrane stabilization and vitrification enhancement",
    discoveryDate: "March 2024",
    concentration: "0.15M (5.4% w/v)",
    phase: "Phase II Ready",
    applications: ["Stem Cell Therapy", "Organ Preservation", "Reproductive Medicine", "Cell Banking"],
  }

  // Key Performance Indicators for Cryoprotectant Research
  const researchKPIs = [
    {
      title: "Active Compounds",
      value: "127,494",
      subtitle: "Screened molecules",
      change: "+1,247 this month",
      trend: "up",
      icon: Search,
      color: "blue",
      insight: "15% show promising cryoprotective activity",
    },
    {
      title: "Success Rate",
      value: "23.7%",
      subtitle: "Viable post-thaw",
      change: "+2.3% vs last quarter",
      trend: "up",
      icon: Target,
      color: "green",
      insight: "Above industry average of 18%",
    },
    {
      title: "Lead Candidates",
      value: "847",
      subtitle: "High-potential compounds",
      change: "+89 validated",
      trend: "up",
      icon: Star,
      color: "purple",
      insight: "Ready for clinical evaluation",
    },
    {
      title: "Research Gaps",
      value: "12",
      subtitle: "Critical areas identified",
      change: "3 new opportunities",
      trend: "up",
      icon: Lightbulb,
      color: "orange",
      insight: "Focus on membrane-permeable sugars",
    },
  ]

  // Structure-Activity Relationship Data
  const sarData = [
    { mw: 62, efficacy: 45, toxicity: 15, glassTransition: -13, name: "Ethylene Glycol", mechanism: "Colligative" },
    { mw: 92, efficacy: 72, toxicity: 8, glassTransition: -46, name: "Glycerol", mechanism: "Colligative" },
    { mw: 180, efficacy: 89, toxicity: 5, glassTransition: -93, name: "Glucose", mechanism: "Vitrification" },
    {
      mw: 342,
      efficacy: 94,
      toxicity: 3,
      glassTransition: -29,
      name: "Trehalose",
      mechanism: "Membrane Stabilization",
    },
    { mw: 400, efficacy: 78, toxicity: 12, glassTransition: -8, name: "PEG-400", mechanism: "Osmotic" },
    { mw: 150, efficacy: 85, toxicity: 6, glassTransition: -43, name: "Sorbitol", mechanism: "Vitrification" },
    { mw: 194, efficacy: 81, toxicity: 7, glassTransition: -3, name: "Mannitol", mechanism: "Colligative" },
    { mw: 146, efficacy: 76, toxicity: 9, glassTransition: -61, name: "Erythritol", mechanism: "Vitrification" },
  ]

  // Mechanism-based efficacy analysis
  const mechanismData = [
    {
      mechanism: "Membrane Stabilization",
      count: 23456,
      avgEfficacy: 87,
      avgToxicity: 4,
      examples: "Trehalose, Sucrose",
    },
    { mechanism: "Vitrification", count: 18934, avgEfficacy: 82, avgToxicity: 6, examples: "Glucose, Sorbitol" },
    { mechanism: "Colligative", count: 34567, avgEfficacy: 65, avgToxicity: 12, examples: "Glycerol, Ethylene Glycol" },
    {
      mechanism: "Ice Recrystallization Inhibition",
      count: 12847,
      avgEfficacy: 91,
      avgToxicity: 8,
      examples: "Antifreeze Proteins",
    },
    { mechanism: "Osmotic Protection", count: 15623, avgEfficacy: 58, avgToxicity: 15, examples: "PEG, Mannitol" },
  ]

  // Top Discovery vs Ideal Cryoprotectant Comparison
  const discoveryComparison = [
    { property: "Membrane Permeability", current: 92, ideal: 95, importance: "Critical" },
    { property: "Glass Transition", current: 88, ideal: 90, importance: "High" },
    { property: "Toxicity (Inverted)", current: 94, ideal: 98, importance: "Critical" },
    { property: "Solubility", current: 89, ideal: 85, importance: "Medium" },
    { property: "Thermal Stability", current: 76, ideal: 85, importance: "High" },
    { property: "Ice Inhibition", current: 95, ideal: 92, importance: "High" },
  ]

  // Research Gap Analysis
  const researchGaps = [
    {
      area: "Membrane-Permeable Disaccharides",
      priority: "High",
      compounds: 234,
      successRate: 12,
      opportunity: "Modify trehalose for better uptake",
      timeline: "6-12 months",
    },
    {
      area: "Low-Toxicity Penetrating CPAs",
      priority: "Critical",
      compounds: 89,
      successRate: 8,
      opportunity: "Novel synthetic pathways",
      timeline: "12-18 months",
    },
    {
      area: "Synergistic Combinations",
      priority: "Medium",
      compounds: 567,
      successRate: 34,
      opportunity: "AI-predicted mixtures",
      timeline: "3-6 months",
    },
    {
      area: "Temperature-Stable Formulations",
      priority: "High",
      compounds: 123,
      successRate: 19,
      opportunity: "Protein stabilizers",
      timeline: "9-15 months",
    },
  ]

  // Concentration-Efficacy Relationships
  const concentrationData = [
    { concentration: 0.5, efficacy: 15, toxicity: 2, viability: 85 },
    { concentration: 1.0, efficacy: 35, toxicity: 5, viability: 82 },
    { concentration: 2.0, efficacy: 58, toxicity: 8, viability: 78 },
    { concentration: 5.0, efficacy: 78, toxicity: 15, viability: 71 },
    { concentration: 10.0, efficacy: 89, toxicity: 28, viability: 58 },
    { concentration: 15.0, efficacy: 94, toxicity: 45, viability: 42 },
    { concentration: 20.0, efficacy: 96, toxicity: 67, viability: 25 },
  ]

  // Predictive Model Insights
  const predictiveInsights = [
    {
      prediction: "Novel trehalose analog with 97% efficacy predicted",
      confidence: 94,
      mechanism: "Enhanced membrane stabilization",
      timeline: "Ready for synthesis",
      impact: "High",
    },
    {
      prediction: "Glycerol-sugar hybrid shows 89% efficacy, 3% toxicity",
      confidence: 87,
      mechanism: "Dual vitrification + colligative",
      timeline: "In silico validation needed",
      impact: "Medium",
    },
    {
      prediction: "Protein-CPA conjugate reduces toxicity by 60%",
      confidence: 91,
      mechanism: "Targeted delivery system",
      timeline: "Proof of concept required",
      impact: "High",
    },
  ]

  // Cell Type Specificity Data
  const cellTypeData = [
    { cellType: "Hepatocytes", optimalCPA: "Trehalose", concentration: "0.2M", viability: 89 },
    { cellType: "Stem Cells", optimalCPA: "DMSO + Trehalose", concentration: "1.5M + 0.1M", viability: 92 },
    { cellType: "Oocytes", optimalCPA: "Ethylene Glycol", concentration: "1.5M", viability: 78 },
    { cellType: "Sperm", optimalCPA: "Glycerol", concentration: "0.25M", viability: 85 },
    { cellType: "Platelets", optimalCPA: "DMSO", concentration: "6%", viability: 71 },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      {/* Enhanced Header with Research Context */}
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Cryoprotectant Discovery Dashboard</h1>
            <p className="text-slate-400 mt-1 max-w-2xl">
              AI-powered analysis of molecular cryoprotection mechanisms, structure-activity relationships, and research
              opportunities across 127,494 compounds
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="border-green-500/20 text-green-400">
              <CheckCircle className="w-3 h-3 mr-1" />
              Models Online
            </Badge>
            <Badge variant="outline" className="border-blue-500/20 text-blue-400">
              <Clock className="w-3 h-3 mr-1" />
              Real-time Analysis
            </Badge>
          </div>
        </div>
      </div>

      {/* Enhanced KPI Cards with Research Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {researchKPIs.map((kpi, index) => (
          <Card key={index} className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-${kpi.color}-500/10`}>
                  <kpi.icon className={`w-5 h-5 text-${kpi.color}-400`} />
                </div>
                <Badge variant="outline" className="text-xs border-slate-700 text-slate-400">
                  {kpi.title}
                </Badge>
              </div>
              <div className="space-y-3">
                <div className="text-2xl font-bold text-white">{kpi.value}</div>
                <div className="text-sm text-slate-400">{kpi.subtitle}</div>
                <div className="flex items-center text-xs">
                  {kpi.trend === "up" ? (
                    <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-400 mr-1" />
                  )}
                  <span className={kpi.trend === "up" ? "text-green-400" : "text-red-400"}>{kpi.change}</span>
                </div>
                <div className="text-xs text-slate-500 bg-slate-800/50 rounded p-2">{kpi.insight}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Structure-Activity Relationship Analysis */}
      <Card className="bg-slate-900 border-slate-800 mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Structure-Activity Relationship Analysis</CardTitle>
              <CardDescription className="text-slate-400">
                Molecular properties correlated with cryoprotective efficacy and toxicity profiles
              </CardDescription>
            </div>
            <Tabs value={activeAnalysis} onValueChange={setActiveAnalysis}>
              <TabsList className="bg-slate-800">
                <TabsTrigger value="efficacy">Efficacy</TabsTrigger>
                <TabsTrigger value="toxicity">Toxicity</TabsTrigger>
                <TabsTrigger value="mechanism">Mechanism</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Enhanced SAR Scatter Plot */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-slate-300">Molecular Weight vs Efficacy</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={sarData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                      dataKey="mw"
                      stroke="#9ca3af"
                      fontSize={12}
                      label={{ value: "Molecular Weight (g/mol)", position: "insideBottom", offset: -10 }}
                    />
                    <YAxis
                      dataKey="efficacy"
                      stroke="#9ca3af"
                      fontSize={12}
                      label={{ value: "Cryoprotective Efficacy (%)", angle: -90, position: "insideLeft" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "6px",
                        color: "#fff",
                      }}
                      formatter={(value, name, props) => [
                        `${value}%`,
                        "Efficacy",
                        `${props.payload.name} - ${props.payload.mechanism}`,
                      ]}
                    />
                    <Scatter dataKey="efficacy" fill="#3b82f6" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div className="text-center p-3 bg-slate-800 rounded">
                  <div className="text-lg font-bold text-blue-400">62-200</div>
                  <div className="text-slate-400">Optimal MW Range</div>
                  <div className="text-slate-500">Best permeability</div>
                </div>
                <div className="text-center p-3 bg-slate-800 rounded">
                  <div className="text-lg font-bold text-green-400">200-400</div>
                  <div className="text-slate-400">High Efficacy</div>
                  <div className="text-slate-500">Membrane stabilizers</div>
                </div>
                <div className="text-center p-3 bg-slate-800 rounded">
                  <div className="text-lg font-bold text-orange-400">&gt;400</div>
                  <div className="text-slate-400">Limited Uptake</div>
                  <div className="text-slate-500">External protection</div>
                </div>
              </div>
            </div>

            {/* Mechanism-Based Analysis */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-slate-300">Protection Mechanisms</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mechanismData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                    <YAxis dataKey="mechanism" type="category" stroke="#9ca3af" fontSize={10} width={120} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "6px",
                        color: "#fff",
                      }}
                      formatter={(value, name) => [`${value}%`, name]}
                    />
                    <Bar dataKey="avgEfficacy" fill="#10b981" name="Avg Efficacy" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {mechanismData.slice(0, 3).map((mech, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-slate-800 rounded text-xs">
                    <span className="text-slate-300">{mech.mechanism}</span>
                    <span className="text-slate-400">{mech.examples}</span>
                    <Badge variant="outline" className="text-green-400 border-green-500/20">
                      {mech.avgEfficacy}%
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Discovery vs Ideal Comparison - Compact Version */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Compact Lead Candidate Section with Card Trigger */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-slate-300">Lead Candidate Analysis</h3>
                <Button
                  onClick={() => setShowMoleculeCard(true)}
                  variant="outline"
                  size="sm"
                  className="border-blue-500/20 text-blue-400 hover:bg-blue-500/10"
                >
                  <Info className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </div>

              <div
                className="p-4 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-750 transition-colors border border-slate-700 hover:border-blue-500/30"
                onClick={() => setShowMoleculeCard(true)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-xl font-bold text-white">{leadCandidate.name}</div>
                    <div className="text-sm text-slate-400">{leadCandidate.chemicalName}</div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                      <Star className="w-3 h-3 mr-1" />
                      Top Performer
                    </Badge>
                    <Badge variant="outline" className="border-green-500/20 text-green-400">
                      {leadCandidate.phase}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-400">{leadCandidate.efficacy}%</div>
                    <div className="text-slate-500">Efficacy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-400">{100 - leadCandidate.toxicity}%</div>
                    <div className="text-slate-500">Safety</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-400">{leadCandidate.glassTransition}°C</div>
                    <div className="text-slate-500">Glass Transition</div>
                  </div>
                </div>

                <div className="mt-3 text-xs text-slate-400 text-center">
                  Click to view detailed molecular profile →
                </div>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={discoveryComparison}>
                    <PolarGrid stroke="#374151" />
                    <PolarAngleAxis dataKey="property" tick={{ fontSize: 10, fill: "#9ca3af" }} />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 100]}
                      tick={{ fontSize: 10, fill: "#9ca3af" }}
                      tickCount={4}
                    />
                    <Radar
                      name="CRY-2847"
                      dataKey="current"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Radar
                      name="Ideal Target"
                      dataKey="ideal"
                      stroke="#10b981"
                      fill="transparent"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "6px",
                        color: "#fff",
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-slate-300">CRY-2847 Performance</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 border-2 border-green-500 rounded-full mr-2"></div>
                  <span className="text-slate-300">Ideal Target Profile</span>
                </div>
              </div>
            </div>

            {/* Concentration-Response Analysis */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-slate-300">Concentration-Response Relationship</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={concentrationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                      dataKey="concentration"
                      stroke="#9ca3af"
                      fontSize={12}
                      label={{ value: "Concentration (M)", position: "insideBottom", offset: -10 }}
                    />
                    <YAxis stroke="#9ca3af" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "6px",
                        color: "#fff",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="viability"
                      fill="#ef4444"
                      fillOpacity={0.3}
                      stroke="#ef4444"
                      name="Cell Viability"
                    />
                    <Line type="monotone" dataKey="efficacy" stroke="#10b981" strokeWidth={3} name="Efficacy" />
                    <Line type="monotone" dataKey="toxicity" stroke="#f59e0b" strokeWidth={2} name="Toxicity" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="text-sm font-medium text-green-400 mb-1">Optimal Window Identified</div>
                <div className="text-xs text-slate-300">
                  <strong>2-5M concentration:</strong> Best efficacy/toxicity balance with 78-89% protection and
                  acceptable cell viability (58-71%)
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Research Gaps & Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-yellow-400" />
              Research Gaps & Opportunities
            </CardTitle>
            <CardDescription className="text-slate-400">
              AI-identified areas with highest discovery potential
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {researchGaps.map((gap, index) => (
              <div key={index} className="p-4 border border-slate-700 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-white">{gap.area}</h4>
                    <p className="text-sm text-slate-400 mt-1">{gap.opportunity}</p>
                  </div>
                  <Badge
                    variant={
                      gap.priority === "Critical" ? "destructive" : gap.priority === "High" ? "default" : "secondary"
                    }
                  >
                    {gap.priority}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-400">{gap.compounds}</div>
                    <div className="text-slate-500">Compounds</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-400">{gap.successRate}%</div>
                    <div className="text-slate-500">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-green-400">{gap.timeline}</div>
                    <div className="text-slate-500">Timeline</div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Brain className="w-5 h-5 mr-2 text-purple-400" />
              AI Predictions & Insights
            </CardTitle>
            <CardDescription className="text-slate-400">
              Machine learning-driven discovery recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {predictiveInsights.map((insight, index) => (
              <div key={index} className="p-4 bg-slate-800 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <Badge
                    variant={insight.impact === "High" ? "default" : "secondary"}
                    className={insight.impact === "High" ? "bg-purple-500/10 text-purple-400" : ""}
                  >
                    {insight.confidence}% Confidence
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {insight.impact} Impact
                  </Badge>
                </div>
                <p className="text-sm text-white mb-2">{insight.prediction}</p>
                <div className="text-xs text-slate-400 space-y-1">
                  <div>
                    <strong>Mechanism:</strong> {insight.mechanism}
                  </div>
                  <div>
                    <strong>Next Step:</strong> {insight.timeline}
                  </div>
                </div>
                <Progress value={insight.confidence} className="mt-3 h-1" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Cell Type Optimization Matrix */}
      <Card className="bg-slate-900 border-slate-800 mb-8">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Microscope className="w-5 h-5 mr-2 text-green-400" />
            Cell Type Optimization Matrix
          </CardTitle>
          <CardDescription className="text-slate-400">
            Optimized cryoprotectant protocols for different cell types
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-300">Cell Type</th>
                  <th className="text-left py-3 px-4 text-slate-300">Optimal CPA</th>
                  <th className="text-left py-3 px-4 text-slate-300">Concentration</th>
                  <th className="text-left py-3 px-4 text-slate-300">Viability</th>
                  <th className="text-left py-3 px-4 text-slate-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {cellTypeData.map((cell, index) => (
                  <tr key={index} className="border-b border-slate-800">
                    <td className="py-3 px-4 text-white font-medium">{cell.cellType}</td>
                    <td className="py-3 px-4 text-slate-300">{cell.optimalCPA}</td>
                    <td className="py-3 px-4 text-slate-400">{cell.concentration}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`font-bold ${cell.viability >= 85 ? "text-green-400" : cell.viability >= 70 ? "text-yellow-400" : "text-red-400"}`}
                        >
                          {cell.viability}%
                        </span>
                        <Progress value={cell.viability} className="w-16 h-1" />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {cell.viability >= 85 ? (
                        <Badge className="bg-green-500/10 text-green-400">Optimized</Badge>
                      ) : cell.viability >= 70 ? (
                        <Badge variant="secondary">Good</Badge>
                      ) : (
                        <Badge variant="destructive">Needs Work</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Research Tools - Enhanced */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Search className="w-5 h-5 mr-2 text-blue-400" />
            Discovery Tools & Actions
          </CardTitle>
          <CardDescription className="text-slate-400">
            AI-powered tools for accelerating cryoprotectant research
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/molecules">
              <div className="p-4 bg-slate-800 rounded-lg hover:bg-slate-750 transition-colors cursor-pointer group">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Search className="w-5 h-5 text-blue-400" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
                </div>
                <div className="space-y-1">
                  <div className="font-medium text-white">SAR Explorer</div>
                  <div className="text-sm text-slate-400">Analyze structure-activity relationships</div>
                </div>
              </div>
            </Link>

            <Link href="/discovery">
              <div className="p-4 bg-slate-800 rounded-lg hover:bg-slate-750 transition-colors cursor-pointer group">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Brain className="w-5 h-5 text-purple-400" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
                </div>
                <div className="space-y-1">
                  <div className="font-medium text-white">AI Predictor</div>
                  <div className="text-sm text-slate-400">Generate novel compound predictions</div>
                </div>
              </div>
            </Link>

            <Link href="/mixtures">
              <div className="p-4 bg-slate-800 rounded-lg hover:bg-slate-750 transition-colors cursor-pointer group">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <Beaker className="w-5 h-5 text-green-400" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
                </div>
                <div className="space-y-1">
                  <div className="font-medium text-white">Synergy Finder</div>
                  <div className="text-sm text-slate-400">Discover optimal combinations</div>
                </div>
              </div>
            </Link>

            <Link href="/experiments">
              <div className="p-4 bg-slate-800 rounded-lg hover:bg-slate-750 transition-colors cursor-pointer group">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-orange-500/10">
                    <FlaskConical className="w-5 h-5 text-orange-400" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
                </div>
                <div className="space-y-1">
                  <div className="font-medium text-white">Protocol Optimizer</div>
                  <div className="text-sm text-slate-400">Design optimal freeze protocols</div>
                </div>
              </div>
            </Link>

            <Link href="/analytics">
              <div className="p-4 bg-slate-800 rounded-lg hover:bg-slate-750 transition-colors cursor-pointer group">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-indigo-500/10">
                    <BarChart3 className="w-5 h-5 text-indigo-400" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
                </div>
                <div className="space-y-1">
                  <div className="font-medium text-white">Gap Analyzer</div>
                  <div className="text-sm text-slate-400">Identify research opportunities</div>
                </div>
              </div>
            </Link>

            <Link href="/reports">
              <div className="p-4 bg-slate-800 rounded-lg hover:bg-slate-750 transition-colors cursor-pointer group">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-red-500/10">
                    <Target className="w-5 h-5 text-red-400" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
                </div>
                <div className="space-y-1">
                  <div className="font-medium text-white">Discovery Report</div>
                  <div className="text-sm text-slate-400">Generate research summaries</div>
                </div>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Molecule Card Modal */}
      <MoleculeCardModal
        isOpen={showMoleculeCard}
        onClose={() => setShowMoleculeCard(false)}
        molecule={leadCandidate}
      />
    </div>
  )
}

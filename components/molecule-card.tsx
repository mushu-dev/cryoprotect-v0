"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import {
  MicroscopeIcon as Molecule,
  Brain,
  Target,
  ExternalLink,
  Copy,
  Star,
  TrendingUp,
  Shield,
  Zap,
  FlaskConical,
  Download,
  Share,
  Bookmark,
  AlertTriangle,
  CheckCircle,
  Info,
  Plus,
} from "lucide-react"
import type { Molecule as MoleculeType } from "@/lib/supabase"

interface MoleculeCardProps {
  molecule: MoleculeType
  onAnalyze?: (molecule: MoleculeType) => void
}

// Calculate molecular properties and scores
function calculateMolecularProperties(molecule: MoleculeType) {
  // Mock calculations based on SMILES/formula - in real app, use RDKit or similar
  const smiles = molecule.smiles || ""
  const formula = molecule.formula || ""

  // Estimate molecular weight from formula
  const mw = estimateMolecularWeight(formula)

  // Estimate properties from SMILES patterns
  const logP = estimateLogP(smiles)
  const hbd = countHydrogenBondDonors(smiles)
  const hba = countHydrogenBondAcceptors(smiles)
  const tpsa = estimateTPSA(smiles, hbd, hba)

  // Calculate cryoprotectant scores
  const cryoprotectantScore = calculateCryoprotectantScore({
    mw,
    logP,
    hbd,
    hba,
    tpsa,
  })

  return {
    molecularWeight: mw,
    logP,
    hbd,
    hba,
    tpsa,
    cryoprotectantScore,
    toxicityRisk: calculateToxicityRisk({ mw, logP, tpsa }),
    membranePermeability: calculateMembranePermeability({ mw, logP, tpsa }),
    stability: calculateStability(smiles),
    solubility: calculateSolubility({ logP, hbd, hba }),
  }
}

// Helper functions for property estimation
function estimateMolecularWeight(formula: string): number {
  if (!formula) return 0
  // Simple MW estimation from formula
  const atomicWeights: { [key: string]: number } = {
    C: 12.01,
    H: 1.008,
    O: 15.999,
    N: 14.007,
    S: 32.06,
    P: 30.97,
  }

  let mw = 0
  const matches = formula.match(/([A-Z][a-z]?)(\d*)/g) || []

  matches.forEach((match) => {
    const element = match.match(/[A-Z][a-z]?/)?.[0] || ""
    const count = Number.parseInt(match.match(/\d+/)?.[0] || "1")
    mw += (atomicWeights[element] || 0) * count
  })

  return Math.round(mw * 100) / 100
}

function estimateLogP(smiles: string): number {
  if (!smiles) return 0
  // Simple LogP estimation based on SMILES patterns
  let logP = 0
  logP += (smiles.match(/C/g) || []).length * 0.5
  logP -= (smiles.match(/O/g) || []).length * 1.2
  logP -= (smiles.match(/N/g) || []).length * 0.8
  logP += (smiles.match(/\(/g) || []).length * 0.2
  return Math.round(logP * 100) / 100
}

function countHydrogenBondDonors(smiles: string): number {
  if (!smiles) return 0
  return (smiles.match(/[OH]/g) || []).length
}

function countHydrogenBondAcceptors(smiles: string): number {
  if (!smiles) return 0
  return (smiles.match(/[ON]/g) || []).length
}

function estimateTPSA(smiles: string, hbd: number, hba: number): number {
  if (!smiles) return 0
  return Math.round((hbd * 20 + hba * 9) * 100) / 100
}

function calculateCryoprotectantScore(props: any): number {
  let score = 50 // Base score

  // Molecular weight (optimal: 100-500 Da)
  if (props.mw >= 100 && props.mw <= 500) score += 20
  else if (props.mw < 100 || props.mw > 1000) score -= 20

  // LogP (optimal: -3 to 0)
  if (props.logP >= -3 && props.logP <= 0) score += 15
  else if (props.logP > 2) score -= 15

  // Hydrogen bonding (important for cryoprotection)
  if (props.hbd >= 2 && props.hbd <= 8) score += 10
  if (props.hba >= 2 && props.hba <= 10) score += 10

  // TPSA (optimal: 40-140)
  if (props.tpsa >= 40 && props.tpsa <= 140) score += 5

  return Math.max(0, Math.min(100, score))
}

function calculateToxicityRisk(props: any): number {
  let risk = 30 // Base risk

  if (props.mw > 500) risk += 20
  if (props.logP > 3) risk += 25
  if (props.tpsa < 20) risk += 15

  return Math.max(0, Math.min(100, risk))
}

function calculateMembranePermeability(props: any): number {
  let permeability = 50

  if (props.mw < 500) permeability += 20
  if (props.logP >= -1 && props.logP <= 3) permeability += 15
  if (props.tpsa < 90) permeability += 15

  return Math.max(0, Math.min(100, permeability))
}

function calculateStability(smiles: string): number {
  if (!smiles) return 50

  let stability = 70
  // Penalize reactive groups
  if (smiles.includes("=O")) stability -= 10
  if (smiles.includes("N")) stability += 5
  if (smiles.includes("S")) stability -= 5

  return Math.max(0, Math.min(100, stability))
}

function calculateSolubility(props: any): number {
  let solubility = 50

  if (props.logP < 0) solubility += 20
  if (props.hbd > 2) solubility += 15
  if (props.hba > 2) solubility += 10

  return Math.max(0, Math.min(100, solubility))
}

export function MoleculeCard({ molecule, onAnalyze }: MoleculeCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const properties = calculateMolecularProperties(molecule)

  // Radar chart data comparing to ideal cryoprotectant
  const radarData = [
    {
      property: "Cryoprotection",
      value: properties.cryoprotectantScore,
      ideal: 85,
      fullMark: 100,
    },
    {
      property: "Low Toxicity",
      value: 100 - properties.toxicityRisk,
      ideal: 90,
      fullMark: 100,
    },
    {
      property: "Permeability",
      value: properties.membranePermeability,
      ideal: 75,
      fullMark: 100,
    },
    {
      property: "Stability",
      value: properties.stability,
      ideal: 80,
      fullMark: 100,
    },
    {
      property: "Solubility",
      value: properties.solubility,
      ideal: 85,
      fullMark: 100,
    },
  ]

  // Property comparison data
  const propertyData = [
    { name: "MW", value: properties.molecularWeight, ideal: 300, unit: "Da" },
    { name: "LogP", value: properties.logP, ideal: -1.5, unit: "" },
    { name: "HBD", value: properties.hbd, ideal: 4, unit: "" },
    { name: "HBA", value: properties.hba, ideal: 6, unit: "" },
    { name: "TPSA", value: properties.tpsa, ideal: 90, unit: "Ų" },
  ]

  const overallScore = Math.round(
    (properties.cryoprotectantScore +
      (100 - properties.toxicityRisk) +
      properties.membranePermeability +
      properties.stability +
      properties.solubility) /
      5,
  )

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 80) return "default"
    if (score >= 60) return "secondary"
    return "destructive"
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{molecule.name}</h3>
                {molecule.formula && <p className="text-gray-600 font-mono text-sm">{molecule.formula}</p>}
              </div>
              <div className="flex flex-col items-end space-y-2">
                <Badge variant={getScoreBadge(overallScore)} className="text-lg px-3 py-1">
                  {overallScore}
                </Badge>
                <div className="flex space-x-1">
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
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className="text-xs text-gray-500">Cryoprotection</p>
                <p className={`font-bold ${getScoreColor(properties.cryoprotectantScore)}`}>
                  {properties.cryoprotectantScore}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Safety</p>
                <p className={`font-bold ${getScoreColor(100 - properties.toxicityRisk)}`}>
                  {100 - properties.toxicityRisk}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Permeability</p>
                <p className={`font-bold ${getScoreColor(properties.membranePermeability)}`}>
                  {properties.membranePermeability}
                </p>
              </div>
            </div>

            <Button variant="outline" className="w-full" size="sm">
              <Info className="w-4 h-4 mr-2" />
              View Research Card
            </Button>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Molecule className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{molecule.name}</h2>
                <p className="text-gray-600 font-mono">{molecule.formula}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={getScoreBadge(overallScore)} className="text-xl px-4 py-2">
                Overall Score: {overallScore}
              </Badge>
              <Button variant="outline" size="sm">
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4" />
              </Button>
            </div>
          </DialogTitle>
          <DialogDescription>Comprehensive research analysis and cryoprotectant potential assessment</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
            <TabsTrigger value="similar">Similar</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Radar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2 text-blue-600" />
                    Cryoprotectant Profile
                  </CardTitle>
                  <CardDescription>Performance vs. ideal cryoprotectant characteristics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="property" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
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
                  <div className="flex justify-center space-x-4 mt-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-sm">Current</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 border-2 border-green-500 rounded-full mr-2"></div>
                      <span className="text-sm">Ideal</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-600" />
                    Key Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <h4 className="font-semibold">Safety Score</h4>
                      <p className={`text-2xl font-bold ${getScoreColor(100 - properties.toxicityRisk)}`}>
                        {100 - properties.toxicityRisk}
                      </p>
                      <p className="text-sm text-gray-600">Low toxicity risk</p>
                    </div>

                    <div className="text-center p-4 border rounded-lg">
                      <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <h4 className="font-semibold">Efficacy</h4>
                      <p className={`text-2xl font-bold ${getScoreColor(properties.cryoprotectantScore)}`}>
                        {properties.cryoprotectantScore}
                      </p>
                      <p className="text-sm text-gray-600">Cryoprotection potential</p>
                    </div>

                    <div className="text-center p-4 border rounded-lg">
                      <FlaskConical className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <h4 className="font-semibold">Permeability</h4>
                      <p className={`text-2xl font-bold ${getScoreColor(properties.membranePermeability)}`}>
                        {properties.membranePermeability}
                      </p>
                      <p className="text-sm text-gray-600">Cell uptake</p>
                    </div>

                    <div className="text-center p-4 border rounded-lg">
                      <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                      <h4 className="font-semibold">Stability</h4>
                      <p className={`text-2xl font-bold ${getScoreColor(properties.stability)}`}>
                        {properties.stability}
                      </p>
                      <p className="text-sm text-gray-600">Chemical stability</p>
                    </div>
                  </div>

                  {/* AI Recommendations */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Brain className="w-5 h-5 text-blue-600 mr-2" />
                      <h4 className="font-semibold text-blue-900">AI Recommendations</h4>
                    </div>
                    <ul className="text-sm text-blue-800 space-y-1">
                      {overallScore >= 80 && (
                        <li>• Excellent cryoprotectant candidate - proceed with experimental validation</li>
                      )}
                      {properties.toxicityRisk < 30 && (
                        <li>• Low toxicity profile makes this suitable for sensitive applications</li>
                      )}
                      {properties.membranePermeability > 70 && (
                        <li>• High permeability suggests good cellular uptake</li>
                      )}
                      {properties.cryoprotectantScore < 60 && (
                        <li>• Consider structural modifications to improve cryoprotection efficiency</li>
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chemical Identifiers */}
            <Card>
              <CardHeader>
                <CardTitle>Chemical Identifiers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {molecule.smiles && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">SMILES</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <code className="text-sm bg-gray-100 px-3 py-2 rounded flex-1 font-mono">
                          {molecule.smiles}
                        </code>
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(molecule.smiles!)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {molecule.inchi && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">InChI</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <code className="text-sm bg-gray-100 px-3 py-2 rounded flex-1 font-mono truncate">
                          {molecule.inchi}
                        </code>
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(molecule.inchi!)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {molecule.pubchem_cid && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">PubChem CID</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm bg-gray-100 px-3 py-2 rounded flex-1">{molecule.pubchem_cid}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            window.open(`https://pubchem.ncbi.nlm.nih.gov/compound/${molecule.pubchem_cid}`, "_blank")
                          }
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {molecule.chembl_id && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">ChEMBL ID</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm bg-gray-100 px-3 py-2 rounded flex-1">{molecule.chembl_id}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            window.open(
                              `https://www.ebi.ac.uk/chembl/compound_report_card/${molecule.chembl_id}`,
                              "_blank",
                            )
                          }
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="properties" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Molecular Properties Analysis</CardTitle>
                <CardDescription>Detailed breakdown of physicochemical properties</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={propertyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name) => [
                        `${value}${propertyData.find((p) => p.name === name)?.unit || ""}`,
                        name === "value" ? "Current" : "Ideal",
                      ]}
                    />
                    <Bar dataKey="value" fill="#3b82f6" name="Current" />
                    <Bar dataKey="ideal" fill="#10b981" name="Ideal" opacity={0.7} />
                  </BarChart>
                </ResponsiveContainer>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                  {propertyData.map((prop) => (
                    <div key={prop.name} className="text-center p-3 border rounded-lg">
                      <h4 className="font-semibold text-gray-700">{prop.name}</h4>
                      <p className="text-lg font-bold text-blue-600">
                        {prop.value}
                        {prop.unit}
                      </p>
                      <p className="text-sm text-gray-500">
                        Ideal: {prop.ideal}
                        {prop.unit}
                      </p>
                      <div className="mt-2">
                        {Math.abs(prop.value - prop.ideal) / prop.ideal < 0.2 ? (
                          <CheckCircle className="w-4 h-4 text-green-600 mx-auto" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-yellow-600 mx-auto" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Structure-Activity Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-900">Favorable Features</p>
                        <ul className="text-sm text-green-800 mt-1 space-y-1">
                          {properties.hbd >= 2 && <li>• Multiple hydrogen bond donors enhance ice binding</li>}
                          {properties.hba >= 3 && <li>• Good hydrogen bond acceptors for water interaction</li>}
                          {properties.molecularWeight < 500 && <li>• Optimal size for cellular penetration</li>}
                          {properties.logP < 0 && <li>• Hydrophilic nature supports aqueous solubility</li>}
                        </ul>
                      </div>
                    </div>

                    {(properties.toxicityRisk > 50 || properties.cryoprotectantScore < 60) && (
                      <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-yellow-900">Areas for Improvement</p>
                          <ul className="text-sm text-yellow-800 mt-1 space-y-1">
                            {properties.toxicityRisk > 50 && (
                              <li>• Consider reducing lipophilicity to lower toxicity</li>
                            )}
                            {properties.cryoprotectantScore < 60 && (
                              <li>• Structural modifications may improve efficacy</li>
                            )}
                            {properties.molecularWeight > 500 && <li>• Large size may limit cellular uptake</li>}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Research Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Experimental Priority</h4>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              overallScore >= 80 ? "bg-green-500" : overallScore >= 60 ? "bg-yellow-500" : "bg-red-500"
                            }`}
                            style={{ width: `${overallScore}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {overallScore >= 80 ? "High" : overallScore >= 60 ? "Medium" : "Low"}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Suggested Experiments</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Cell viability assay at 5-20% concentration</li>
                        <li>• Ice recrystallization inhibition test</li>
                        <li>• Membrane permeability assessment</li>
                        {properties.cryoprotectantScore > 70 && <li>• Cryopreservation efficacy with target cells</li>}
                      </ul>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Optimization Targets</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {properties.toxicityRisk > 40 && <li>• Reduce cytotoxicity through structural modification</li>}
                        {properties.membranePermeability < 60 && <li>• Improve cellular uptake</li>}
                        {properties.solubility < 70 && <li>• Enhance aqueous solubility</li>}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="research" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Research History & Notes</CardTitle>
                <CardDescription>Track experimental data and research insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Database Entry</h4>
                      <Badge variant="outline">{new Date(molecule.created_at).toLocaleDateString()}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      Molecule added to database with chemical identifiers and basic properties.
                    </p>
                  </div>

                  <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-medium text-blue-900 mb-2">AI Analysis Complete</h4>
                    <p className="text-sm text-blue-800">
                      Computational analysis suggests{" "}
                      {overallScore >= 70 ? "high" : overallScore >= 50 ? "moderate" : "low"} potential as a
                      cryoprotectant based on molecular properties and structure-activity relationships.
                    </p>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Research Note
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="similar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Similar Molecules</CardTitle>
                <CardDescription>Structurally related compounds for comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Molecule className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Similar molecule analysis coming soon...</p>
                  <p className="text-sm">Will show structurally related compounds from your database</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between items-center pt-6 border-t">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline" size="sm">
              <Brain className="w-4 h-4 mr-2" />
              Run AI Analysis
            </Button>
          </div>
          <Button onClick={() => onAnalyze?.(molecule)}>
            <Target className="w-4 h-4 mr-2" />
            Start Research
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

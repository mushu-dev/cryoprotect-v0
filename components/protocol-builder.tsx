"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import {
  FlaskConical,
  Plus,
  X,
  Download,
  CheckCircle,
  AlertTriangle,
  Clock,
  Thermometer,
  Brain,
  Zap,
  Play,
  Pause,
} from "lucide-react"
import type { Molecule } from "@/lib/supabase"

interface ProtocolStep {
  id: string
  name: string
  duration: number
  temperature: number
  description: string
  critical: boolean
}

interface ProtocolBuilderProps {
  molecules: Molecule[]
  onExportProtocol: () => void
}

export function ProtocolBuilder({ molecules, onExportProtocol }: ProtocolBuilderProps) {
  const [selectedMolecules, setSelectedMolecules] = useState<Array<Molecule & { concentration: number }>>([])
  const [protocolSteps, setProtocolSteps] = useState<ProtocolStep[]>([
    {
      id: "prep",
      name: "Preparation",
      duration: 15,
      temperature: 25,
      description: "Prepare cryoprotectant solution and equilibrate to room temperature",
      critical: true,
    },
    {
      id: "loading",
      name: "Cell Loading",
      duration: 10,
      temperature: 25,
      description: "Incubate cells with cryoprotectant solution",
      critical: true,
    },
    {
      id: "cooling",
      name: "Controlled Cooling",
      duration: 120,
      temperature: -80,
      description: "Cool at 1°C/min to -80°C",
      critical: true,
    },
    {
      id: "storage",
      name: "Storage",
      duration: 0,
      temperature: -196,
      description: "Transfer to liquid nitrogen for long-term storage",
      critical: false,
    },
  ])
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationStep, setSimulationStep] = useState(0)

  const addMolecule = (molecule: Molecule) => {
    if (!selectedMolecules.find((m) => m.id === molecule.id)) {
      setSelectedMolecules((prev) => [...prev, { ...molecule, concentration: 10 }])
    }
  }

  const removeMolecule = (moleculeId: string) => {
    setSelectedMolecules((prev) => prev.filter((m) => m.id !== moleculeId))
  }

  const updateConcentration = (moleculeId: string, concentration: number) => {
    setSelectedMolecules((prev) => prev.map((m) => (m.id === moleculeId ? { ...m, concentration } : m)))
  }

  const calculateCompatibility = () => {
    if (selectedMolecules.length < 2) return null

    // Simulate compatibility calculation
    const totalConcentration = selectedMolecules.reduce((sum, m) => sum + m.concentration, 0)
    const avgCompatibility = Math.max(60, 100 - (totalConcentration - 20) * 2)

    return {
      score: Math.round(avgCompatibility),
      status: avgCompatibility > 80 ? "excellent" : avgCompatibility > 60 ? "good" : "caution",
      warnings: totalConcentration > 30 ? ["High total concentration may increase toxicity"] : [],
    }
  }

  const compatibility = calculateCompatibility()

  const startSimulation = () => {
    setIsSimulating(true)
    setSimulationStep(0)

    const interval = setInterval(() => {
      setSimulationStep((prev) => {
        if (prev >= protocolSteps.length - 1) {
          setIsSimulating(false)
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Protocol Workspace */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FlaskConical className="w-5 h-5 mr-2 text-purple-600" />
            Protocol Workspace
          </CardTitle>
          <CardDescription>Drag molecules here to build your preservation protocol</CardDescription>
        </CardHeader>
        <CardContent>
          {selectedMolecules.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
              <FlaskConical className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No molecules added yet</p>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add First Molecule
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {selectedMolecules.map((molecule) => (
                <div key={molecule.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <FlaskConical className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">{molecule.name}</h4>
                      <p className="text-sm text-gray-600">{molecule.formula}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-32">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">Concentration</span>
                        <span className="text-sm font-medium">{molecule.concentration}%</span>
                      </div>
                      <Slider
                        value={[molecule.concentration]}
                        onValueChange={([value]) => updateConcentration(molecule.id, value)}
                        max={30}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    <Button variant="ghost" size="sm" onClick={() => removeMolecule(molecule.id)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {/* Compatibility Analysis */}
              {compatibility && (
                <div
                  className={`p-4 rounded-lg border ${
                    compatibility.status === "excellent"
                      ? "bg-green-50 border-green-200"
                      : compatibility.status === "good"
                        ? "bg-blue-50 border-blue-200"
                        : "bg-yellow-50 border-yellow-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      {compatibility.status === "excellent" ? (
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                      )}
                      <span className="font-medium">Compatibility Score: {compatibility.score}%</span>
                    </div>
                    <Badge variant={compatibility.status === "excellent" ? "default" : "secondary"}>
                      {compatibility.status}
                    </Badge>
                  </div>

                  {compatibility.warnings.length > 0 && (
                    <div className="space-y-1">
                      {compatibility.warnings.map((warning, index) => (
                        <p key={index} className="text-sm text-yellow-800">
                          ⚠️ {warning}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Protocol Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-600" />
              Protocol Timeline
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={startSimulation}
                disabled={isSimulating || selectedMolecules.length === 0}
              >
                {isSimulating ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Simulating...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Simulate Protocol
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {protocolSteps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center space-x-4 p-4 border rounded-lg transition-all ${
                  isSimulating && simulationStep === index
                    ? "border-blue-500 bg-blue-50"
                    : isSimulating && simulationStep > index
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    isSimulating && simulationStep === index
                      ? "bg-blue-500 text-white"
                      : isSimulating && simulationStep > index
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {index + 1}
                </div>

                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium">{step.name}</h4>
                    {step.critical && (
                      <Badge variant="destructive" className="text-xs">
                        Critical
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>

                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-gray-500" />
                    {step.duration > 0 ? `${step.duration} min` : "Ongoing"}
                  </div>
                  <div className="flex items-center">
                    <Thermometer className="w-4 h-4 mr-1 text-gray-500" />
                    {step.temperature}°C
                  </div>
                </div>

                {isSimulating && simulationStep === index && (
                  <div className="w-24">
                    <Progress value={75} className="h-2" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Optimization */}
      {selectedMolecules.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="w-5 h-5 mr-2 text-purple-600" />
              AI Protocol Optimization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center mb-2">
                  <Zap className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="font-medium text-purple-900">Optimization Suggestions</span>
                </div>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• Reduce cooling rate to 0.5°C/min for better ice crystal control</li>
                  <li>• Add 5-minute equilibration step before cooling</li>
                  <li>• Consider pre-cooling cells to 4°C to reduce thermal shock</li>
                </ul>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">89%</div>
                  <div className="text-sm text-green-700">Predicted Success</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">±6%</div>
                  <div className="text-sm text-blue-700">Confidence Range</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">3.2h</div>
                  <div className="text-sm text-orange-700">Total Time</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

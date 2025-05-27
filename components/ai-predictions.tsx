"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Target, Shield, TrendingUp, CheckCircle, Upload, Download, Zap, BarChart3 } from "lucide-react"

export function AIPredictions() {
  const [selectedMolecule, setSelectedMolecule] = useState("")
  const [predictionResults, setPredictionResults] = useState(null)

  const predictionModels = [
    {
      name: "CryoSuccess-AI",
      description: "Predicts cryoprotection success rate",
      accuracy: 94.2,
      icon: Target,
      color: "text-green-600",
    },
    {
      name: "ToxPredict",
      description: "Assesses cytotoxicity and safety",
      accuracy: 91.8,
      icon: Shield,
      color: "text-blue-600",
    },
    {
      name: "SAR-Insight",
      description: "Structure-activity relationships",
      accuracy: 88.5,
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      name: "Membrane-Perm",
      description: "Cell membrane permeability",
      accuracy: 92.1,
      icon: BarChart3,
      color: "text-orange-600",
    },
  ]

  const samplePredictions = {
    successRate: 89,
    toxicity: {
      score: 23,
      level: "Low",
      confidence: 91,
    },
    permeability: {
      score: 87,
      level: "High",
      confidence: 94,
    },
    sarInsights: [
      "Hydroxyl groups enhance cryoprotection efficiency",
      "Molecular weight optimal for cellular uptake",
      "Low lipophilicity reduces membrane toxicity",
    ],
    recommendations: [
      "Increase concentration to 15% for optimal protection",
      "Combine with 5% DMSO for synergistic effect",
      "Monitor osmotic stress during application",
    ],
  }

  const runPrediction = () => {
    // Simulate AI prediction
    setPredictionResults(samplePredictions)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="w-5 h-5 mr-2 text-blue-600" />
            AI-Powered Predictions
          </CardTitle>
          <CardDescription>
            Get intelligent insights on cryoprotection success, toxicity, and optimization
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Input Molecule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Molecule Input */}
            <div>
              <label className="text-sm font-medium mb-2 block">SMILES or Molecule Name</label>
              <Input
                placeholder="Enter SMILES string or molecule name"
                value={selectedMolecule}
                onChange={(e) => setSelectedMolecule(e.target.value)}
              />
            </div>

            {/* Upload Options */}
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Upload SDF File
              </Button>
              <Button variant="outline" className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Upload MOL File
              </Button>
            </div>

            {/* Quick Examples */}
            <div>
              <label className="text-sm font-medium mb-2 block">Quick Examples</label>
              <div className="space-y-1">
                {[
                  {
                    name: "Trehalose",
                    smiles:
                      "C([C@@H]1[C@@H]([C@@H]([C@H]([C@H](O1)O[C@@H]2[C@H]([C@@H]([C@@H]([C@H](O2)CO)O)O)O)O)O)O)O",
                  },
                  { name: "DMSO", smiles: "CS(=O)C" },
                  { name: "Glycerol", smiles: "C(C(CO)O)O" },
                ].map((example) => (
                  <Button
                    key={example.name}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-left"
                    onClick={() => setSelectedMolecule(example.smiles)}
                  >
                    <div>
                      <div className="font-medium">{example.name}</div>
                      <div className="text-xs text-gray-500 truncate">{example.smiles.substring(0, 30)}...</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Run Prediction */}
            <Button className="w-full" onClick={runPrediction} disabled={!selectedMolecule}>
              <Zap className="w-4 h-4 mr-2" />
              Run AI Prediction
            </Button>
          </CardContent>
        </Card>

        {/* Results Panel */}
        <div className="lg:col-span-2">
          {predictionResults ? (
            <div className="space-y-6">
              {/* Overall Score */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Prediction Results</span>
                    <Badge variant="default" className="text-lg px-3 py-1">
                      {predictionResults.successRate}% Success Rate
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Toxicity */}
                    <div className="text-center p-4 border rounded-lg">
                      <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <h4 className="font-semibold">Toxicity Risk</h4>
                      <p className="text-2xl font-bold text-blue-600">{predictionResults.toxicity.level}</p>
                      <p className="text-sm text-gray-600">{predictionResults.toxicity.confidence}% confidence</p>
                      <Progress value={100 - predictionResults.toxicity.score} className="mt-2" />
                    </div>

                    {/* Permeability */}
                    <div className="text-center p-4 border rounded-lg">
                      <BarChart3 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <h4 className="font-semibold">Permeability</h4>
                      <p className="text-2xl font-bold text-green-600">{predictionResults.permeability.level}</p>
                      <p className="text-sm text-gray-600">{predictionResults.permeability.confidence}% confidence</p>
                      <Progress value={predictionResults.permeability.score} className="mt-2" />
                    </div>

                    {/* Overall Score */}
                    <div className="text-center p-4 border rounded-lg">
                      <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <h4 className="font-semibold">Overall Score</h4>
                      <p className="text-2xl font-bold text-purple-600">{predictionResults.successRate}%</p>
                      <p className="text-sm text-gray-600">High potential</p>
                      <Progress value={predictionResults.successRate} className="mt-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="sar" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="sar">SAR Insights</TabsTrigger>
                      <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                      <TabsTrigger value="confidence">Confidence</TabsTrigger>
                    </TabsList>

                    <TabsContent value="sar" className="space-y-4">
                      <div className="space-y-3">
                        {predictionResults.sarInsights.map((insight, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                            <p className="text-sm text-blue-900">{insight}</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="recommendations" className="space-y-4">
                      <div className="space-y-3">
                        {predictionResults.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                            <p className="text-sm text-green-900">{rec}</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="confidence" className="space-y-4">
                      <div className="space-y-4">
                        {predictionModels.map((model, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <model.icon className={`w-5 h-5 ${model.color}`} />
                              <div>
                                <h4 className="font-medium">{model.name}</h4>
                                <p className="text-sm text-gray-600">{model.description}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">{model.accuracy}%</p>
                              <p className="text-xs text-gray-500">accuracy</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Export Options */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Export Results</span>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        PDF Report
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        CSV Data
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            /* Prediction Models Overview */
            <Card>
              <CardHeader>
                <CardTitle>Available AI Models</CardTitle>
                <CardDescription>
                  Our ensemble of specialized AI models for comprehensive cryoprotectant analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {predictionModels.map((model, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-3 mb-3">
                        <model.icon className={`w-6 h-6 ${model.color}`} />
                        <div>
                          <h4 className="font-semibold">{model.name}</h4>
                          <p className="text-sm text-gray-600">{model.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Model Accuracy</span>
                        <Badge variant="secondary">{model.accuracy}%</Badge>
                      </div>
                      <Progress value={model.accuracy} className="mt-2" />
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">How It Works</h4>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>1. Input your molecule structure (SMILES, name, or file upload)</p>
                    <p>2. Our AI models analyze molecular properties and patterns</p>
                    <p>3. Get comprehensive predictions with confidence scores</p>
                    <p>4. Receive actionable recommendations for optimization</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

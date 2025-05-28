"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  Search,
  Upload,
  Download,
  Play,
  Target,
  BarChart3,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Atom,
  FlaskConical,
} from "lucide-react"

export default function DiscoveryPage() {
  const [predictionInput, setPredictionInput] = useState("")
  const [similarityInput, setSimilarityInput] = useState("")
  const [isValidPrediction, setIsValidPrediction] = useState(false)
  const [isValidSimilarity, setIsValidSimilarity] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [similarityThreshold, setSimilarityThreshold] = useState([0.7])
  const [resultCount, setResultCount] = useState("10")
  const [fingerprintType, setFingerprintType] = useState("Morgan")
  const [predictionResult, setPredictionResult] = useState(null)
  const [similarResults, setSimilarResults] = useState([])

  // Mock prediction data
  const mockPrediction = {
    score: 87,
    confidence: 92,
    structure: "OCCO", // Ethylene glycol
    properties: {
      toxicity: "Low",
      permeability: 78,
      stability: "Good",
      cost: "$12.50/mol",
    },
  }

  const mockSimilarMolecules = [
    { name: "Glycerol", smiles: "C(C(CO)O)O", similarity: 0.92, score: 89 },
    { name: "Propylene Glycol", smiles: "CC(CO)O", similarity: 0.87, score: 82 },
    { name: "1,3-Propanediol", smiles: "C(CCO)O", similarity: 0.83, score: 78 },
  ]

  const modelStats = {
    accuracy: 94.2,
    precision: 91.8,
    recall: 89.5,
    f1Score: 90.6,
    lastUpdated: "2 hours ago",
  }

  const discoveryStats = {
    moleculesIndexed: 9345,
    fingerprintTypes: 2,
    searchIndexSize: "2048 bits",
    avgSearchTime: "<100ms",
    morganbits: "2048 bits",
    maccsbits: "167 bits",
  }

  useEffect(() => {
    const isSmiles = /^[A-Za-z0-9@+\-[\]()=#$]+$/.test(predictionInput.trim())
    setIsValidPrediction(isSmiles && predictionInput.length > 2)
  }, [predictionInput])

  useEffect(() => {
    const isSmiles = /^[A-Za-z0-9@+\-[\]()=#$]+$/.test(similarityInput.trim())
    setIsValidSimilarity(isSmiles && similarityInput.length > 2)
  }, [similarityInput])

  const handlePredict = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setPredictionResult(mockPrediction)
    setIsLoading(false)
  }

  const handleSimilaritySearch = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSimilarResults(mockSimilarMolecules)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center">
                <Brain className="w-6 h-6 mr-3 text-blue-400" />
                ML-Powered Discovery
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                Discover new cryoprotectants using machine learning predictions and molecular similarity
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                <Download className="w-4 h-4 mr-2" />
                Export Results
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Upload className="w-4 h-4 mr-2" />
                Upload Batch
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* ML Prediction */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-white">
                <Target className="w-5 h-5 mr-2 text-blue-400" />
                ML Prediction
              </CardTitle>
              <CardDescription className="text-gray-400">
                Get instant cryoprotection score predictions for any molecule
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">SMILES String</label>
                <Input
                  placeholder="e.g., OCCO (ethylene glycol)"
                  value={predictionInput}
                  onChange={(e) => setPredictionInput(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                />
              </div>
              <Button
                onClick={handlePredict}
                disabled={!isValidPrediction || isLoading}
                className={`w-full ${isValidPrediction ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-700"}`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Predicting...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Predict Cryoprotection Score
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Prediction Results */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-white">
                <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
                Prediction Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {predictionResult ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-400 mb-2">{predictionResult.score}%</div>
                    <p className="text-gray-400">Cryoprotection Score</p>
                    <p className="text-sm text-gray-500">{predictionResult.confidence}% confidence</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-gray-800 rounded-lg">
                      <p className="text-xs text-gray-400">Toxicity</p>
                      <p className="text-sm font-medium text-green-400">{predictionResult.properties.toxicity}</p>
                    </div>
                    <div className="p-3 bg-gray-800 rounded-lg">
                      <p className="text-xs text-gray-400">Permeability</p>
                      <p className="text-sm font-medium text-white">{predictionResult.properties.permeability}%</p>
                    </div>
                    <div className="p-3 bg-gray-800 rounded-lg">
                      <p className="text-xs text-gray-400">Stability</p>
                      <p className="text-sm font-medium text-blue-400">{predictionResult.properties.stability}</p>
                    </div>
                    <div className="p-3 bg-gray-800 rounded-lg">
                      <p className="text-xs text-gray-400">Cost</p>
                      <p className="text-sm font-medium text-yellow-400">{predictionResult.properties.cost}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Atom className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Enter a SMILES string above to get predictions</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Similarity Search */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-white">
                <Search className="w-5 h-5 mr-2 text-green-400" />
                Similarity Search
              </CardTitle>
              <CardDescription className="text-gray-400">Find structurally similar molecules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Query SMILES</label>
                <Input
                  placeholder="e.g., OCCO"
                  value={similarityInput}
                  onChange={(e) => setSimilarityInput(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Fingerprint Type</label>
                <Select value={fingerprintType} onValueChange={setFingerprintType}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="Morgan">Morgan</SelectItem>
                    <SelectItem value="MACCS">MACCS</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Similarity Threshold: {similarityThreshold[0]}
                </label>
                <Slider
                  value={similarityThreshold}
                  onValueChange={setSimilarityThreshold}
                  max={1}
                  min={0.5}
                  step={0.1}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Number of Results: {resultCount}</label>
                <Slider
                  value={[Number.parseInt(resultCount)]}
                  onValueChange={(value) => setResultCount(value[0].toString())}
                  max={50}
                  min={5}
                  step={5}
                  className="w-full"
                />
              </div>

              <Button
                onClick={handleSimilaritySearch}
                disabled={!isValidSimilarity || isLoading}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <Search className="w-4 h-4 mr-2" />
                Search Similar Molecules
              </Button>
            </CardContent>
          </Card>

          {/* Similar Molecules */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-white">
                <FlaskConical className="w-5 h-5 mr-2 text-orange-400" />
                Similar Molecules
              </CardTitle>
            </CardHeader>
            <CardContent>
              {similarResults.length > 0 ? (
                <div className="space-y-3">
                  {similarResults.map((molecule, index) => (
                    <div key={index} className="p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-white">{molecule.name}</h4>
                        <Badge className="bg-blue-600 text-white">{molecule.score}%</Badge>
                      </div>
                      <p className="text-xs text-gray-400 font-mono mb-2">{molecule.smiles}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{(molecule.similarity * 100).toFixed(0)}% similar</span>
                        <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 h-7 text-xs">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Enter a SMILES string to search for similar molecules</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Secondary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Validation Summary */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-white">
                <CheckCircle className="w-5 h-5 mr-2 text-yellow-400" />
                Validation Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Model Status</span>
                  <Badge className="bg-green-600 text-white">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Last Validation</span>
                  <span className="text-white">{modelStats.lastUpdated}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Validation Set Size</span>
                  <span className="text-white">1,247 molecules</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Cross-validation Score</span>
                  <span className="text-green-400">{modelStats.accuracy}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Priority Validation Candidates */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-white">
                <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
                Priority Validation Candidates
              </CardTitle>
              <CardDescription className="text-gray-400">
                Molecules recommended for experimental validation to improve model accuracy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <AlertTriangle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No candidates available</p>
                <p className="text-sm text-gray-500 mt-2">Run predictions to generate validation recommendations</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Model Performance */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-white">
                <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
                Model Performance
              </CardTitle>
              <CardDescription className="text-gray-400">Current ML model accuracy metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{modelStats.accuracy}%</div>
                  <div className="text-sm text-gray-400">Accuracy</div>
                  <Progress value={modelStats.accuracy} className="mt-2 h-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{modelStats.precision}%</div>
                  <div className="text-sm text-gray-400">Precision</div>
                  <Progress value={modelStats.precision} className="mt-2 h-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">{modelStats.recall}%</div>
                  <div className="text-sm text-gray-400">Recall</div>
                  <Progress value={modelStats.recall} className="mt-2 h-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{modelStats.f1Score}%</div>
                  <div className="text-sm text-gray-400">F1 Score</div>
                  <Progress value={modelStats.f1Score} className="mt-2 h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Discovery Stats */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-white">
                <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                Discovery Stats
              </CardTitle>
              <CardDescription className="text-gray-400">Your discovery session statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Molecules Indexed</span>
                  <span className="text-2xl font-bold text-white">
                    {discoveryStats.moleculesIndexed.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Fingerprint Types</span>
                  <span className="text-2xl font-bold text-white">{discoveryStats.fingerprintTypes}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <div className="text-sm text-gray-400">Search Index Size</div>
                    <div className="text-white font-medium">{discoveryStats.searchIndexSize}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Average Search Time</div>
                    <div className="text-white font-medium">{discoveryStats.avgSearchTime}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 pt-2">
                  Morgan: {discoveryStats.morganbits}, MACCS: {discoveryStats.maccsbits}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

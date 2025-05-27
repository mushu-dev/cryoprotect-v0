"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Brain, TrendingUp, Zap, Target, AlertTriangle, CheckCircle } from "lucide-react"

export function AIInsightsDashboard() {
  const [modelMetrics, setModelMetrics] = useState({
    accuracy: 94.2,
    precision: 91.8,
    recall: 89.5,
    f1Score: 90.6,
    confidence: 96.1,
  })

  // Mock prediction performance data
  const performanceData = [
    { month: "Jan", accuracy: 89, predictions: 1240 },
    { month: "Feb", accuracy: 91, predictions: 1380 },
    { month: "Mar", accuracy: 93, predictions: 1520 },
    { month: "Apr", accuracy: 94, predictions: 1680 },
    { month: "May", accuracy: 95, predictions: 1820 },
    { month: "Jun", accuracy: 94, predictions: 1950 },
  ]

  const topPredictions = [
    {
      molecule: "Trehalose-6-phosphate",
      prediction: "High efficacy for organ preservation",
      confidence: 96.2,
      impact: "High",
      status: "Validated",
    },
    {
      molecule: "Modified PEG-400",
      prediction: "Low toxicity cryoprotectant",
      confidence: 93.8,
      impact: "Medium",
      status: "Testing",
    },
    {
      molecule: "Sucrose derivative",
      prediction: "Enhanced membrane permeability",
      confidence: 91.5,
      impact: "High",
      status: "Pending",
    },
  ]

  const modelInsights = [
    {
      title: "Efficacy Prediction Model",
      accuracy: 94.2,
      status: "Excellent",
      lastUpdated: "2 hours ago",
      icon: Target,
      color: "green",
    },
    {
      title: "Toxicity Assessment Model",
      accuracy: 91.8,
      status: "Good",
      lastUpdated: "4 hours ago",
      icon: AlertTriangle,
      color: "yellow",
    },
    {
      title: "Molecular Similarity Engine",
      accuracy: 96.1,
      status: "Excellent",
      lastUpdated: "1 hour ago",
      icon: Brain,
      color: "blue",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Model Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modelInsights.map((model, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <model.icon className={`w-5 h-5 mr-2 text-${model.color}-600`} />
                {model.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{model.accuracy}%</span>
                  <Badge
                    variant={model.status === "Excellent" ? "default" : "secondary"}
                    className={model.status === "Excellent" ? "bg-green-100 text-green-800" : ""}
                  >
                    {model.status}
                  </Badge>
                </div>
                <Progress value={model.accuracy} className="h-2" />
                <p className="text-sm text-gray-600">Updated {model.lastUpdated}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
            Model Performance Trends
          </CardTitle>
          <CardDescription>AI model accuracy and prediction volume over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" domain={[85, 100]} />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="accuracy"
                stroke="#3b82f6"
                strokeWidth={3}
                name="Accuracy (%)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="predictions"
                stroke="#10b981"
                strokeWidth={2}
                name="Predictions"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top AI Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="w-5 h-5 mr-2 text-purple-600" />
            Recent AI Predictions
            <Badge variant="secondary" className="ml-2">
              High Confidence
            </Badge>
          </CardTitle>
          <CardDescription>Latest molecular predictions from our AI models</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPredictions.map((prediction, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{prediction.molecule}</h3>
                    <p className="text-sm text-gray-600 mt-1">{prediction.prediction}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={prediction.status === "Validated" ? "default" : "outline"}
                      className={prediction.status === "Validated" ? "bg-green-100 text-green-800" : ""}
                    >
                      {prediction.status}
                    </Badge>
                    {prediction.status === "Validated" && <CheckCircle className="w-4 h-4 text-green-600" />}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{prediction.confidence}%</div>
                      <div className="text-xs text-gray-600">Confidence</div>
                    </div>
                    <div className="text-center">
                      <div
                        className={`text-lg font-bold ${prediction.impact === "High" ? "text-red-600" : "text-yellow-600"}`}
                      >
                        {prediction.impact}
                      </div>
                      <div className="text-xs text-gray-600">Impact</div>
                    </div>
                  </div>
                  <Progress value={prediction.confidence} className="w-32 h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Model Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="w-5 h-5 mr-2 text-indigo-600" />
            Detailed Model Metrics
          </CardTitle>
          <CardDescription>Comprehensive performance metrics for all AI models</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{modelMetrics.accuracy}%</div>
              <div className="text-sm text-gray-600">Accuracy</div>
              <Progress value={modelMetrics.accuracy} className="mt-2 h-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{modelMetrics.precision}%</div>
              <div className="text-sm text-gray-600">Precision</div>
              <Progress value={modelMetrics.precision} className="mt-2 h-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{modelMetrics.recall}%</div>
              <div className="text-sm text-gray-600">Recall</div>
              <Progress value={modelMetrics.recall} className="mt-2 h-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{modelMetrics.f1Score}%</div>
              <div className="text-sm text-gray-600">F1 Score</div>
              <Progress value={modelMetrics.f1Score} className="mt-2 h-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">{modelMetrics.confidence}%</div>
              <div className="text-sm text-gray-600">Confidence</div>
              <Progress value={modelMetrics.confidence} className="mt-2 h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

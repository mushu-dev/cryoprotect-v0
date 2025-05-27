"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Brain,
  TrendingUp,
  Lightbulb,
  Sparkles,
  ArrowRight,
  Eye,
  Clock,
  Activity,
  ChevronRight,
  Play,
  Pause,
  Database,
  BarChart3,
  Target,
  Zap,
  Award,
  Atom,
} from "lucide-react"
import Link from "next/link"

export default function DiscoveryPage() {
  const [activeView, setActiveView] = useState("search")
  const [isLiveMode, setIsLiveMode] = useState(true)

  // Mock real-time data
  const [liveStats, setLiveStats] = useState({
    totalMolecules: 9494,
    modelAccuracy: 98.4,
    activeResearchers: 247,
    todayDiscoveries: 12,
    confidenceScore: 94.2,
  })

  useEffect(() => {
    if (isLiveMode) {
      const interval = setInterval(() => {
        setLiveStats((prev) => ({
          ...prev,
          activeResearchers: prev.activeResearchers + Math.floor(Math.random() * 3 - 1),
          todayDiscoveries: prev.todayDiscoveries + (Math.random() > 0.8 ? 1 : 0),
          confidenceScore: 94.2 + (Math.random() - 0.5) * 2,
        }))
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isLiveMode])

  const quickActions = [
    {
      icon: Search,
      title: "Smart Search",
      description: "Find molecules like DMSO but safer",
      action: "search",
      color: "blue",
    },
    {
      icon: Brain,
      title: "AI Predictions",
      description: "Get ML-powered success probabilities",
      action: "predictions",
      color: "purple",
    },
    {
      icon: Eye,
      title: "Explore Landscape",
      description: "Visualize molecular relationships",
      action: "landscape",
      color: "green",
    },
    {
      icon: TrendingUp,
      title: "Research Trends",
      description: "See what's working in the field",
      action: "trends",
      color: "orange",
    },
  ]

  const recentBreakthroughs = [
    {
      title: "Novel Trehalose Analog Shows 96% Success Rate",
      researcher: "Dr. Sarah Chen",
      confidence: 94,
      time: "2 hours ago",
      impact: "High",
    },
    {
      title: "Low-Toxicity Glycerol Derivative Identified",
      researcher: "Dr. Michael Torres",
      confidence: 89,
      time: "4 hours ago",
      impact: "Medium",
    },
    {
      title: "Synergistic Combination Reduces Ice Formation",
      researcher: "Dr. Lisa Wang",
      confidence: 92,
      time: "6 hours ago",
      impact: "High",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    CryoProtect Discovery
                  </h1>
                  <p className="text-sm text-gray-600">AI-Powered Research Platform</p>
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {/* Live Stats */}
              <div className="hidden md:flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${isLiveMode ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
                  ></div>
                  <span className="text-gray-600">{liveStats.activeResearchers} researchers online</span>
                </div>
                <div className="text-gray-600">{liveStats.todayDiscoveries} discoveries today</div>
                <div className="text-gray-600">{liveStats.modelAccuracy}% AI accuracy</div>
              </div>

              <Link href="/molecules">
                <Button variant="outline" size="sm">
                  <Database className="w-4 h-4 mr-2" />
                  Molecules
                </Button>
              </Link>

              <Link href="/analytics">
                <Button variant="outline" size="sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
              </Link>

              <Button variant="outline" size="sm" onClick={() => setIsLiveMode(!isLiveMode)}>
                {isLiveMode ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Brain className="w-4 h-4" />
            <span>AI-Powered Discovery Engine</span>
            <Badge variant="secondary" className="ml-2">
              {liveStats.confidenceScore.toFixed(1)}% Confidence
            </Badge>
          </div>

          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Discover Life-Saving
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">
              Cryoprotectants
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Your AI research partner for breakthrough discoveries in cryopreservation. From organ transplants to species
            conservation - find molecules that preserve life.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{liveStats.totalMolecules.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Molecules Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{liveStats.modelAccuracy}%</div>
              <div className="text-sm text-gray-600">AI Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{liveStats.activeResearchers}</div>
              <div className="text-sm text-gray-600">Active Researchers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{liveStats.todayDiscoveries}</div>
              <div className="text-sm text-gray-600">Today's Discoveries</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-blue-200 group"
              onClick={() => setActiveView(action.action)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${action.color}-100 group-hover:bg-${action.color}-200 transition-colors`}
                  >
                    <action.icon className={`w-6 h-6 text-${action.color}-600`} />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="search" className="flex items-center space-x-2">
              <Search className="w-4 h-4" />
              <span>Smart Search</span>
            </TabsTrigger>
            <TabsTrigger value="predictions" className="flex items-center space-x-2">
              <Brain className="w-4 h-4" />
              <span>AI Insights</span>
            </TabsTrigger>
            <TabsTrigger value="landscape" className="flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>Molecular Landscape</span>
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Research Trends</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="w-5 h-5 mr-2 text-blue-600" />
                AI-Powered Molecular Discovery
              </CardTitle>
              <CardDescription>
                Use natural language to discover cryoprotectants. Ask questions like "Find molecules similar to DMSO but less toxic"
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Textarea 
                  placeholder="Describe what you're looking for... (e.g., 'Find sugar-based molecules with high cell permeability and low toxicity for organ preservation')"
                  className="min-h-[100px]"
                />
                <div className="flex space-x-2">
                  <Button className="flex-1">
                    <Brain className="w-4 h-4 mr-2" />
                    Search with AI
                  </Button>
                  <Button variant="outline">
                    <Target className="w-4 h-4 mr-2" />
                    Advanced Filters
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <h4 className="font-medium mb-2">Example: Low-Toxicity Search</h4>
                  <p className="text-sm text-gray-600">{"Find molecules with efficacy > 80% and toxicity < 20%"}</p>
                </Card>
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <h4 className="font-medium mb-2">Example: Similarity Search</h4>
                  <p className="text-sm text-gray-600">{"Show me compounds similar to trehalose but with better permeability"}</p>
                </Card>
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <h4 className="font-medium mb-2">Example: Novel Discovery</h4>
                  <p className="text-sm text-gray-600">{"Discover unexplored amino acid derivatives for organ preservation"}</p>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-purple-600" />
                  AI Model Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Efficacy Prediction</span>
                    <Badge variant="secondary">98.4% Accuracy</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Toxicity Assessment</span>
                    <Badge variant="secondary">96.7% Accuracy</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Permeability Model</span>
                    <Badge variant="secondary">94.2% Accuracy</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent AI Predictions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">Trehalose Analog #247</h4>
                      <Badge className="bg-green-100 text-green-800">96% Success</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Predicted to show excellent cryoprotection with minimal toxicity</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">Glycerol Derivative #89</h4>
                      <Badge className="bg-blue-100 text-blue-800">89% Success</Badge>
                    </div>
                    <p className="text-sm text-gray-600">High permeability with reduced osmotic stress</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="landscape" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="w-5 h-5 mr-2 text-green-600" />
                Molecular Landscape Explorer
              </CardTitle>
              <CardDescription>
                Visualize the entire molecular space and discover patterns, clusters, and opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center">
                  <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Interactive Molecular Landscape</h3>
                  <p className="text-gray-600 mb-4">Explore 9,494 molecules across efficacy, toxicity, and permeability dimensions</p>
                  <Button>
                    <Atom className="w-4 h-4 mr-2" />
                    Launch 3D Visualizer
                  </Button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-4 h-4 text-green-600" />
                    <h4 className="font-medium text-green-900">Optimal Zone</h4>
                  </div>
                  <p className="text-sm text-green-800">
                    247 molecules with high efficacy and low toxicity
                  </p>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="w-4 h-4 text-yellow-600" />
                    <h4 className="font-medium text-yellow-900">Improvement Opportunity</h4>
                  </div>
                  <p className="text-sm text-yellow-800">
                    1,847 molecules that could be optimized
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Eye className="w-4 h-4 text-blue-600" />
                    <h4 className="font-medium text-blue-900">Unexplored Region</h4>
                  </div>
                  <p className="text-sm text-blue-800">
                    Sparse areas suggest potential for novel discovery
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-orange-600" />
                  Research Momentum
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Publications This Month</span>
                    <span className="font-bold text-2xl text-green-600">127</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Active Research Groups</span>
                    <span className="font-bold text-2xl text-blue-600">89</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Breakthrough Discoveries</span>
                    <span className="font-bold text-2xl text-purple-600">12</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-600" />
                  Top Researchers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Dr. Sarah Chen</h4>
                      <p className="text-sm text-gray-600">Stanford University</p>
                    </div>
                    <Badge>247 discoveries</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Dr. Michael Torres</h4>
                      <p className="text-sm text-gray-600">MIT</p>
                    </div>
                    <Badge>189 discoveries</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Dr. Lisa Wang</h4>
                      <p className="text-sm text-gray-600">Harvard Medical</p>
                    </div>
                    <Badge>156 discoveries</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Recent Breakthroughs Sidebar */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
                Recent Breakthroughs
                <Badge variant="secondary" className="ml-2">
                  Live
                </Badge>
              </CardTitle>
              <CardDescription>Latest discoveries from the CryoProtect research community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBreakthroughs.map((breakthrough, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-gray-900">{breakthrough.title}</h4>
                        <Badge variant={breakthrough.impact === "High" ? "default" : "secondary"} className="text-xs">
                          {breakthrough.impact} Impact
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>by {breakthrough.researcher}</span>
                        <span className="flex items-center">
                          <Brain className="w-3 h-3 mr-1" />
                          {breakthrough.confidence}% confidence
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {breakthrough.time}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t">
                <Button variant="outline" className="w-full">
                  <Activity className="w-4 h-4 mr-2" />
                  View All Research Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

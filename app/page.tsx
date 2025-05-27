"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Zap,
  TrendingUp,
  Users,
  Brain,
  MicroscopeIcon as Molecule,
  BarChartIcon as ChartBar,
  Star,
  ArrowRight,
  Activity,
  Target,
  Lightbulb,
  Settings,
  Database,
  Eye,
  Clock,
  ChevronRight,
  Play,
  Pause,
  Sparkles,
  Award,
  Atom,
} from "lucide-react"
import { useAnalytics } from "@/lib/hooks/use-analytics"
import { DatabaseStatus } from "@/components/database-status"
import Link from "next/link"

export default function CryoProtectDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showDatabaseStatus, setShowDatabaseStatus] = useState(false)
  const [activeDiscoveryTab, setActiveDiscoveryTab] = useState("search")
  const [isLiveMode, setIsLiveMode] = useState(true)
  const { analytics, discoveryFeed, trendingResearch, loading, error } = useAnalytics()

  // Enhanced live stats combining both dashboards
  const [liveStats, setLiveStats] = useState({
    totalMolecules: analytics?.totalMolecules || 9494,
    modelAccuracy: 98.4,
    activeResearchers: analytics?.activeResearchers || 247,
    todayDiscoveries: 12,
    confidenceScore: 94.2,
    avgSuccessRate: analytics?.avgSuccessRate || 89,
    breakthroughs: analytics?.breakthroughs || 23,
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
    { icon: Search, label: "Smart Search", description: "AI-powered molecular discovery", href: "#discovery" },
    { icon: Database, label: "Molecules", description: "Browse molecule database", href: "/molecules" },
    { icon: Molecule, label: "3D Visualizer", description: "Interactive molecular view", href: "/visualizer" },
    { icon: ChartBar, label: "Analytics", description: "Discover patterns", href: "/analytics" },
    { icon: Users, label: "Collaborate", description: "Team workspaces", href: "/teams" },
    { icon: Brain, label: "AI Predictions", description: "Success probability", href: "/predictions" },
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading CryoProtect platform...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-red-600 mb-4">Error loading data: {error}</p>
          <div className="space-y-2">
            <Button onClick={() => window.location.reload()}>Retry</Button>
            <Button variant="outline" onClick={() => setShowDatabaseStatus(true)}>
              Check Database Status
            </Button>
            <Link href="/database-inspector">
              <Button variant="outline">
                <Database className="w-4 h-4 mr-2" />
                Inspect Database
              </Button>
            </Link>
          </div>
          {showDatabaseStatus && (
            <div className="mt-6">
              <DatabaseStatus />
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CryoProtect
                </h1>
                <p className="text-sm text-gray-600">AI-Powered Discovery Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Live Stats */}
              <div className="hidden lg:flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${isLiveMode ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
                  ></div>
                  <span className="text-gray-600">{liveStats.activeResearchers} researchers online</span>
                </div>
                <div className="text-gray-600">{liveStats.todayDiscoveries} discoveries today</div>
                <div className="text-gray-600">{liveStats.modelAccuracy}% AI accuracy</div>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search molecules, properties, or ask AI..."
                  className="pl-10 w-80"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Link href="/database-inspector">
                <Button variant="outline">
                  <Database className="w-4 h-4 mr-2" />
                  Inspect DB
                </Button>
              </Link>
              <Button variant="outline" onClick={() => setShowDatabaseStatus(!showDatabaseStatus)}>
                <Settings className="w-4 h-4 mr-2" />
                Status
              </Button>
              <Button variant="outline" onClick={() => setIsLiveMode(!isLiveMode)}>
                {isLiveMode ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button>
                <Zap className="w-4 h-4 mr-2" />
                New Discovery
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Database Status (if shown) */}
        {showDatabaseStatus && (
          <div className="mb-8">
            <DatabaseStatus />
          </div>
        )}

        {/* Hero Section */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Brain className="w-4 h-4" />
              <span>AI-Powered Discovery Engine</span>
              <Badge variant="secondary" className="ml-2">
                {liveStats.confidenceScore.toFixed(1)}% Confidence
              </Badge>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Discover Life-Saving
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                Cryoprotectants
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your AI research partner for breakthrough discoveries in cryopreservation. From organ transplants to
              species conservation - find molecules that preserve life.
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Molecules Analyzed</p>
                    <p className="text-3xl font-bold text-blue-600">{liveStats.totalMolecules.toLocaleString()}</p>
                  </div>
                  <Molecule className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-sm text-green-600 mt-2">↗ +12% this week</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">AI Accuracy</p>
                    <p className="text-3xl font-bold text-green-600">{liveStats.modelAccuracy}%</p>
                  </div>
                  <Brain className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-sm text-green-600 mt-2">↗ +2.1% improvement</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Researchers</p>
                    <p className="text-3xl font-bold text-purple-600">{liveStats.activeResearchers}</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-sm text-green-600 mt-2">↗ +8 new this week</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Breakthroughs</p>
                    <p className="text-3xl font-bold text-orange-600">{liveStats.breakthroughs}</p>
                  </div>
                  <Lightbulb className="w-8 h-8 text-orange-600" />
                </div>
                <p className="text-sm text-green-600 mt-2">↗ +3 this month</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Discovery Section */}
        <div id="discovery" className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-blue-600" />
                AI Discovery Center
                <Badge variant="secondary" className="ml-2">
                  Live
                </Badge>
              </CardTitle>
              <CardDescription>Use AI to discover, analyze, and predict cryoprotectant properties</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeDiscoveryTab} onValueChange={setActiveDiscoveryTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
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

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <h4 className="font-medium mb-2">Example: Low-Toxicity Search</h4>
                      <p className="text-sm text-gray-600">{"Find molecules with efficacy > 80% and toxicity < 20%"}</p>
                    </Card>
                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <h4 className="font-medium mb-2">Example: Similarity Search</h4>
                      <p className="text-sm text-gray-600">
                        {"Show me compounds similar to trehalose but with better permeability"}
                      </p>
                    </Card>
                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <h4 className="font-medium mb-2">Example: Novel Discovery</h4>
                      <p className="text-sm text-gray-600">
                        {"Discover unexplored amino acid derivatives for organ preservation"}
                      </p>
                    </Card>
                  </div>
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
                            <p className="text-sm text-gray-600">
                              Predicted to show excellent cryoprotection with minimal toxicity
                            </p>
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
                  <div className="h-96 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="text-center">
                      <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Interactive Molecular Landscape</h3>
                      <p className="text-gray-600 mb-4">
                        Explore {liveStats.totalMolecules.toLocaleString()} molecules across efficacy, toxicity, and
                        permeability dimensions
                      </p>
                      <Button>
                        <Atom className="w-4 h-4 mr-2" />
                        Launch 3D Visualizer
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Target className="w-4 h-4 text-green-600" />
                        <h4 className="font-medium text-green-900">Optimal Zone</h4>
                      </div>
                      <p className="text-sm text-green-800">247 molecules with high efficacy and low toxicity</p>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Zap className="w-4 h-4 text-yellow-600" />
                        <h4 className="font-medium text-yellow-900">Improvement Opportunity</h4>
                      </div>
                      <p className="text-sm text-yellow-800">1,847 molecules that could be optimized</p>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Eye className="w-4 h-4 text-blue-600" />
                        <h4 className="font-medium text-blue-900">Unexplored Region</h4>
                      </div>
                      <p className="text-sm text-blue-800">Sparse areas suggest potential for novel discovery</p>
                    </div>
                  </div>
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
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Jump into your most common workflows</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-blue-50 hover:border-blue-200"
                      asChild={action.href.startsWith("/")}
                      onClick={action.href.startsWith("#") ? () => setActiveDiscoveryTab("search") : undefined}
                    >
                      {action.href.startsWith("/") ? (
                        <Link href={action.href}>
                          <action.icon className="w-6 h-6 text-blue-600" />
                          <div className="text-center">
                            <p className="font-medium text-sm">{action.label}</p>
                            <p className="text-xs text-gray-500">{action.description}</p>
                          </div>
                        </Link>
                      ) : (
                        <>
                          <action.icon className="w-6 h-6 text-blue-600" />
                          <div className="text-center">
                            <p className="font-medium text-sm">{action.label}</p>
                            <p className="text-xs text-gray-500">{action.description}</p>
                          </div>
                        </>
                      )}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Discoveries */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-green-600" />
                  Recent Discoveries
                </CardTitle>
                <CardDescription>Latest high-potential cryoprotectants identified by the community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {discoveryFeed.map((discovery, index) => (
                    <div
                      key={discovery.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{discovery.name}</h4>
                          <Badge variant="outline">{discovery.formula}</Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Success: {discovery.successRate}%</span>
                          <span>Toxicity: {discovery.toxicity.replace("_", " ")}</span>
                          <span>by {discovery.researcher}</span>
                          <span>{discovery.time}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Research Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
                  Research Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Database Integration</span>
                      <span>Complete</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>AI Model Training</span>
                      <span>98%</span>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Data Analysis</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Breakthroughs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
                  Recent Breakthroughs
                  <Badge variant="secondary" className="ml-2">
                    Live
                  </Badge>
                </CardTitle>
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
              </CardContent>
            </Card>

            {/* Trending Research */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-600" />
                  Trending Research
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trendingResearch.map((trend, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{trend.topic}</span>
                      <Badge
                        variant={
                          trend.status === "Hot" ? "default" : trend.status === "Rising" ? "secondary" : "outline"
                        }
                      >
                        {trend.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

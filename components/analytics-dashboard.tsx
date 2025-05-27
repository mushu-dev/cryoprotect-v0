"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, BarChart3, PieChartIcon, Activity, Target, Filter, Download, RefreshCw } from "lucide-react"

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("30d")
  const [selectedMetric, setSelectedMetric] = useState("success-rate")

  // Sample data for charts
  const successRateData = [
    { month: "Jan", rate: 78, compounds: 45 },
    { month: "Feb", rate: 82, compounds: 52 },
    { month: "Mar", rate: 85, compounds: 48 },
    { month: "Apr", rate: 89, compounds: 61 },
    { month: "May", rate: 91, compounds: 58 },
    { month: "Jun", rate: 94, compounds: 67 },
  ]

  const propertyDistribution = [
    { property: "LogP", low: 25, medium: 45, high: 30 },
    { property: "MW", low: 35, medium: 40, high: 25 },
    { property: "TPSA", low: 20, medium: 50, high: 30 },
    { property: "HBD", low: 40, medium: 35, high: 25 },
  ]

  const toxicityBreakdown = [
    { name: "Very Low", value: 35, color: "#10b981" },
    { name: "Low", value: 28, color: "#3b82f6" },
    { name: "Moderate", value: 22, color: "#f59e0b" },
    { name: "High", value: 15, color: "#ef4444" },
  ]

  const discoveryTrends = [
    { week: "W1", discoveries: 12, breakthroughs: 2 },
    { week: "W2", discoveries: 15, breakthroughs: 3 },
    { week: "W3", discoveries: 18, breakthroughs: 1 },
    { week: "W4", discoveries: 22, breakthroughs: 4 },
    { week: "W5", discoveries: 19, breakthroughs: 2 },
    { week: "W6", discoveries: 25, breakthroughs: 5 },
  ]

  const correlationData = [
    { logP: -2.1, successRate: 92, size: 15 },
    { logP: -1.8, successRate: 89, size: 12 },
    { logP: -1.5, successRate: 85, size: 18 },
    { logP: -1.2, successRate: 78, size: 10 },
    { logP: -0.9, successRate: 72, size: 8 },
    { logP: -0.6, successRate: 65, size: 14 },
    { logP: -0.3, successRate: 58, size: 11 },
    { logP: 0.0, successRate: 45, size: 9 },
    { logP: 0.3, successRate: 38, size: 7 },
    { logP: 0.6, successRate: 32, size: 6 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
                Analytics & Insights Center
              </CardTitle>
              <CardDescription>
                Discover patterns, trends, and breakthrough opportunities in cryoprotectant research
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Time Range Selector */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Time Range:</span>
              <div className="flex space-x-1">
                {["7d", "30d", "90d", "1y", "all"].map((range) => (
                  <Button
                    key={range}
                    variant={timeRange === range ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeRange(range)}
                  >
                    {range}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline">Last updated: 2 minutes ago</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Success Rate Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-green-600" />
              Success Rate Trends
            </CardTitle>
            <CardDescription>Cryoprotection success rates over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={successRateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={3} name="Success Rate (%)" />
                <Bar dataKey="compounds" fill="#3b82f6" opacity={0.3} name="Compounds Tested" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Property Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="w-4 h-4 mr-2 text-blue-600" />
              Property Distribution
            </CardTitle>
            <CardDescription>Molecular property ranges in successful compounds</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={propertyDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="property" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="low" stackId="a" fill="#ef4444" name="Low" />
                <Bar dataKey="medium" stackId="a" fill="#f59e0b" name="Medium" />
                <Bar dataKey="high" stackId="a" fill="#10b981" name="High" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Toxicity Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChartIcon className="w-4 h-4 mr-2 text-orange-600" />
              Toxicity Profile
            </CardTitle>
            <CardDescription>Distribution of toxicity levels in tested compounds</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={toxicityBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {toxicityBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Discovery Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-4 h-4 mr-2 text-purple-600" />
              Discovery Activity
            </CardTitle>
            <CardDescription>Weekly discovery and breakthrough patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={discoveryTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="discoveries" fill="#3b82f6" name="Total Discoveries" />
                <Bar dataKey="breakthroughs" fill="#10b981" name="Breakthroughs" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Correlation Analysis</CardTitle>
          <CardDescription>Explore relationships between molecular properties and success rates</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="correlation" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="correlation">Property Correlation</TabsTrigger>
              <TabsTrigger value="heatmap">Success Heatmap</TabsTrigger>
              <TabsTrigger value="patterns">Pattern Recognition</TabsTrigger>
            </TabsList>

            <TabsContent value="correlation" className="space-y-4">
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={correlationData}>
                    <CartesianGrid />
                    <XAxis type="number" dataKey="logP" name="LogP" domain={[-2.5, 1]} />
                    <YAxis type="number" dataKey="successRate" name="Success Rate" domain={[0, 100]} />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter name="Compounds" dataKey="successRate" fill="#3b82f6" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <div className="text-sm text-gray-600">
                <p>
                  <strong>Insight:</strong> Strong negative correlation between LogP and success rate. Compounds with
                  LogP between -2.0 and -1.5 show optimal cryoprotection efficiency.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="heatmap" className="space-y-4">
              <div className="grid grid-cols-8 gap-1 h-64">
                {Array.from({ length: 64 }, (_, i) => {
                  const intensity = Math.random()
                  return (
                    <div
                      key={i}
                      className="rounded"
                      style={{
                        backgroundColor: `rgba(59, 130, 246, ${intensity})`,
                        minHeight: "100%",
                      }}
                      title={`Success Rate: ${(intensity * 100).toFixed(1)}%`}
                    />
                  )
                })}
              </div>
              <div className="text-sm text-gray-600">
                <p>
                  <strong>Heatmap:</strong> Success rates across different experimental conditions. Darker blue
                  indicates higher success rates.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="patterns" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">Emerging Patterns</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Sugar-based compounds show 23% higher success rates</li>
                      <li>• Molecular weight sweet spot: 200-400 Da</li>
                      <li>• Hydroxyl groups correlate with reduced toxicity</li>
                      <li>• Cyclic structures improve membrane stability</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">AI Recommendations</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Focus research on LogP range -2.0 to -1.5</li>
                      <li>• Investigate trehalose analogs</li>
                      <li>• Test synergistic combinations</li>
                      <li>• Explore natural product derivatives</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Key Insights Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-8 h-8 text-green-600" />
              <Badge variant="default">High Impact</Badge>
            </div>
            <h3 className="font-semibold mb-2">Breakthrough Opportunity</h3>
            <p className="text-sm text-gray-600">
              Novel trehalose derivatives show 94% success rate with minimal toxicity. Recommend immediate synthesis and
              testing.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              <Badge variant="secondary">Trending</Badge>
            </div>
            <h3 className="font-semibold mb-2">Rising Success Rates</h3>
            <p className="text-sm text-gray-600">
              Overall success rates improved 16% this quarter through AI-guided compound selection and optimization.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-purple-600" />
              <Badge variant="outline">Active</Badge>
            </div>
            <h3 className="font-semibold mb-2">Research Velocity</h3>
            <p className="text-sm text-gray-600">
              Platform users are discovering potential cryoprotectants 3.2x faster than traditional screening methods.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

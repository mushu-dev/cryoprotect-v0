"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { TrendingUp, Users, Award, Calendar, ArrowUp, ArrowDown, Minus } from "lucide-react"

export function ResearchMomentum() {
  const [timeRange, setTimeRange] = useState("6months")

  // Mock research momentum data
  const momentumData = [
    { month: "Jan", publications: 45, discoveries: 8, collaborations: 12, impact: 78 },
    { month: "Feb", publications: 52, discoveries: 11, collaborations: 15, impact: 82 },
    { month: "Mar", publications: 48, discoveries: 9, collaborations: 18, impact: 85 },
    { month: "Apr", publications: 61, discoveries: 14, collaborations: 22, impact: 89 },
    { month: "May", publications: 58, discoveries: 12, collaborations: 25, impact: 91 },
    { month: "Jun", publications: 67, discoveries: 16, collaborations: 28, impact: 94 },
  ]

  const topResearchers = [
    {
      name: "Dr. Sarah Chen",
      institution: "MIT",
      discoveries: 23,
      impact: 94,
      trend: "up",
      specialty: "Sugar-based cryoprotectants",
    },
    {
      name: "Dr. Michael Torres",
      institution: "Stanford",
      discoveries: 19,
      impact: 89,
      trend: "up",
      specialty: "Synthetic polymers",
    },
    {
      name: "Dr. Lisa Wang",
      institution: "Harvard",
      discoveries: 17,
      impact: 87,
      trend: "stable",
      specialty: "Natural extracts",
    },
    {
      name: "Dr. James Rodriguez",
      institution: "Caltech",
      discoveries: 15,
      impact: 85,
      trend: "down",
      specialty: "Glycol derivatives",
    },
  ]

  const researchMilestones = [
    {
      date: "2024-06-15",
      title: "Breakthrough in Non-toxic Cryoprotectants",
      researcher: "Dr. Sarah Chen",
      impact: "High",
      description: "Novel trehalose analog shows 96% success rate with minimal toxicity",
    },
    {
      date: "2024-06-10",
      title: "AI Model Achieves 95% Accuracy",
      researcher: "CryoProtect Team",
      impact: "High",
      description: "Machine learning model for efficacy prediction reaches new milestone",
    },
    {
      date: "2024-06-05",
      title: "Successful Organ Preservation Trial",
      researcher: "Dr. Michael Torres",
      impact: "Medium",
      description: "Modified PEG compound extends organ viability by 40%",
    },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="w-4 h-4 text-green-600" />
      case "down":
        return <ArrowDown className="w-4 h-4 text-red-600" />
      default:
        return <Minus className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Research Momentum Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
            Research Momentum Tracker
          </CardTitle>
          <CardDescription>
            Track research activity, discoveries, and impact across the cryoprotectant field
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Time Range:</span>
              {["3months", "6months", "1year"].map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeRange(range)}
                >
                  {range === "3months" ? "3M" : range === "6months" ? "6M" : "1Y"}
                </Button>
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={momentumData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="publications"
                stackId="1"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.6}
                name="Publications"
              />
              <Area
                type="monotone"
                dataKey="discoveries"
                stackId="1"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.6}
                name="Discoveries"
              />
              <Area
                type="monotone"
                dataKey="collaborations"
                stackId="1"
                stroke="#f59e0b"
                fill="#f59e0b"
                fillOpacity={0.6}
                name="Collaborations"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Researchers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-purple-600" />
              Leading Researchers
            </CardTitle>
            <CardDescription>Most impactful researchers in cryoprotectant discovery</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topResearchers.map((researcher, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="font-semibold">{researcher.name}</h3>
                      {getTrendIcon(researcher.trend)}
                    </div>
                    <p className="text-sm text-gray-600">{researcher.institution}</p>
                    <p className="text-xs text-gray-500 mt-1">{researcher.specialty}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">{researcher.discoveries}</div>
                    <div className="text-xs text-gray-600">Discoveries</div>
                    <Badge variant="outline" className="mt-1">
                      {researcher.impact}% Impact
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Milestones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2 text-yellow-600" />
              Recent Milestones
            </CardTitle>
            <CardDescription>Major breakthroughs and achievements in the field</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {researchMilestones.map((milestone, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-600">{milestone.date}</span>
                    </div>
                    <Badge
                      variant={milestone.impact === "High" ? "default" : "secondary"}
                      className={milestone.impact === "High" ? "bg-red-100 text-red-800" : ""}
                    >
                      {milestone.impact} Impact
                    </Badge>
                  </div>
                  <h3 className="font-semibold mb-1">{milestone.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                  <p className="text-xs text-gray-500">by {milestone.researcher}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Research Impact Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
            Field Impact Metrics
          </CardTitle>
          <CardDescription>Overall impact and growth of cryoprotectant research</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">342</div>
              <div className="text-sm text-gray-600">Publications This Year</div>
              <div className="flex items-center justify-center mt-1">
                <ArrowUp className="w-3 h-3 text-green-600 mr-1" />
                <span className="text-xs text-green-600">+23%</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">89</div>
              <div className="text-sm text-gray-600">New Discoveries</div>
              <div className="flex items-center justify-center mt-1">
                <ArrowUp className="w-3 h-3 text-green-600 mr-1" />
                <span className="text-xs text-green-600">+31%</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">156</div>
              <div className="text-sm text-gray-600">Active Collaborations</div>
              <div className="flex items-center justify-center mt-1">
                <ArrowUp className="w-3 h-3 text-green-600 mr-1" />
                <span className="text-xs text-green-600">+18%</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">94.2</div>
              <div className="text-sm text-gray-600">Average Impact Score</div>
              <div className="flex items-center justify-center mt-1">
                <ArrowUp className="w-3 h-3 text-green-600 mr-1" />
                <span className="text-xs text-green-600">+5.2%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Users, Plus, Settings, Activity, Star, Clock } from "lucide-react"

export default function TeamsPage() {
  const teams = [
    {
      name: "CryoProtect Research Lab",
      description: "Advanced cryoprotectant discovery and optimization team",
      members: 12,
      projects: 8,
      discoveries: 23,
      status: "active",
    },
    {
      name: "Biopreservation Institute",
      description: "Leading research in cellular preservation technologies",
      members: 8,
      projects: 5,
      discoveries: 15,
      status: "active",
    },
    {
      name: "Molecular Cryobiology Group",
      description: "Specialized in molecular mechanisms of cryoprotection",
      members: 6,
      projects: 3,
      discoveries: 9,
      status: "recruiting",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    CryoProtect Teams
                  </h1>
                  <p className="text-sm text-gray-600">Collaborative Research Workspaces</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Team
              </Button>
              <Link href="/">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Teams Overview */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Research Teams</h2>
          <p className="text-gray-600 mb-6">
            Collaborate with researchers worldwide to accelerate cryoprotectant discovery
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Teams</p>
                    <p className="text-3xl font-bold text-blue-600">3</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-sm text-gray-500 mt-2">Research collaborations</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Members</p>
                    <p className="text-3xl font-bold text-green-600">26</p>
                  </div>
                  <Activity className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-sm text-gray-500 mt-2">Active researchers</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Discoveries</p>
                    <p className="text-3xl font-bold text-purple-600">47</p>
                  </div>
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-sm text-gray-500 mt-2">This month</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Teams List */}
        <div className="space-y-6">
          {teams.map((team, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{team.name}</h3>
                      <Badge variant={team.status === "active" ? "default" : "secondary"}>{team.status}</Badge>
                    </div>
                    <p className="text-gray-600 mb-4">{team.description}</p>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{team.members}</p>
                        <p className="text-sm text-gray-600">Members</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{team.projects}</p>
                        <p className="text-sm text-gray-600">Projects</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">{team.discoveries}</p>
                        <p className="text-sm text-gray-600">Discoveries</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Button>Join Team</Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coming Soon Features */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-orange-600" />
              Coming Soon
            </CardTitle>
            <CardDescription>Advanced collaboration features in development</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Real-time Collaboration</h4>
                <p className="text-sm text-gray-600">
                  Work together on molecular analysis with live updates and shared workspaces
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Team Analytics</h4>
                <p className="text-sm text-gray-600">
                  Track team performance, discovery rates, and collaboration metrics
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Project Management</h4>
                <p className="text-sm text-gray-600">
                  Organize research projects with milestones, tasks, and progress tracking
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Knowledge Sharing</h4>
                <p className="text-sm text-gray-600">
                  Share protocols, findings, and best practices across research teams
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

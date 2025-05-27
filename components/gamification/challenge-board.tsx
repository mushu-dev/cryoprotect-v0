"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Target, Clock, Calendar, ChevronRight, Beaker, FlaskRoundIcon as Flask, TestTube } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface ChallengeBoardProps {
  className?: string
  fullView?: boolean
  limit?: number
}

export function ChallengeBoard({ className, fullView = false, limit = 6 }: ChallengeBoardProps) {
  // Sample challenge data
  const challenges = [
    {
      id: "chl-001",
      title: "Molecule Marathon",
      description: "Add 5 new molecules to the database this week",
      icon: Flask,
      category: "molecules",
      difficulty: "medium",
      progress: 3,
      total: 5,
      xp: 250,
      deadline: "2023-05-15",
      type: "weekly",
    },
    {
      id: "chl-002",
      title: "Experiment Excellence",
      description: "Complete 3 experiments with a viability rate above 80%",
      icon: TestTube,
      category: "experiments",
      difficulty: "hard",
      progress: 1,
      total: 3,
      xp: 500,
      deadline: "2023-05-20",
      type: "weekly",
    },
    {
      id: "chl-003",
      title: "Mixture Mastery",
      description: "Create a mixture with at least 4 components",
      icon: Beaker,
      category: "mixtures",
      difficulty: "easy",
      progress: 0,
      total: 1,
      xp: 150,
      deadline: "2023-05-10",
      type: "daily",
    },
    {
      id: "chl-004",
      title: "Property Pioneer",
      description: "Record 10 new molecular properties",
      icon: Flask,
      category: "molecules",
      difficulty: "medium",
      progress: 4,
      total: 10,
      xp: 300,
      deadline: "2023-05-25",
      type: "weekly",
    },
    {
      id: "chl-005",
      title: "Protocol Perfection",
      description: "Create a new freezing protocol and use it in an experiment",
      icon: TestTube,
      category: "experiments",
      difficulty: "medium",
      progress: 0,
      total: 1,
      xp: 350,
      deadline: "2023-05-30",
      type: "monthly",
    },
    {
      id: "chl-006",
      title: "Collaboration Quest",
      description: "Collaborate with 2 other researchers on a mixture",
      icon: Beaker,
      category: "mixtures",
      difficulty: "hard",
      progress: 1,
      total: 2,
      xp: 400,
      deadline: "2023-06-15",
      type: "monthly",
    },
  ]

  const displayChallenges = fullView ? challenges : challenges.slice(0, limit)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400"
      case "medium":
        return "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400"
      case "hard":
        return "bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400"
      default:
        return "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "daily":
        return <Clock className="h-3 w-3 mr-1" />
      case "weekly":
        return <Calendar className="h-3 w-3 mr-1" />
      case "monthly":
        return <Calendar className="h-3 w-3 mr-1" />
      default:
        return null
    }
  }

  if (!fullView) {
    return (
      <Card className={className}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Active Challenges</CardTitle>
            <Target className="h-5 w-5 text-blue-500" />
          </div>
          <CardDescription>Complete challenges to earn XP and rewards</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {displayChallenges.map((challenge) => (
            <div key={challenge.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <challenge.icon className="h-5 w-5 text-blue-500" />
                  <h3 className="font-medium">{challenge.title}</h3>
                </div>
                <Badge variant="outline" className={cn("border-none", getDifficultyColor(challenge.difficulty))}>
                  {challenge.difficulty}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{challenge.description}</p>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>
                    Progress: {challenge.progress}/{challenge.total}
                  </span>
                  <span>+{challenge.xp} XP</span>
                </div>
                <Progress value={(challenge.progress / challenge.total) * 100} className="h-1.5" />
              </div>
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <Badge
                  variant="outline"
                  className="bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 border-none"
                >
                  {getTypeIcon(challenge.type)}
                  {challenge.type}
                </Badge>
                <span>Deadline: {new Date(challenge.deadline).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
          {!fullView && (
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link href="/challenges">
                View All Challenges
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Research Challenges</CardTitle>
          <Target className="h-5 w-5 text-blue-500" />
        </div>
        <CardDescription>Complete challenges to earn XP and unlock achievements</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            {challenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </TabsContent>
          <TabsContent value="daily" className="space-y-4">
            {challenges
              .filter((c) => c.type === "daily")
              .map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
          </TabsContent>
          <TabsContent value="weekly" className="space-y-4">
            {challenges
              .filter((c) => c.type === "weekly")
              .map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
          </TabsContent>
          <TabsContent value="monthly" className="space-y-4">
            {challenges
              .filter((c) => c.type === "monthly")
              .map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

interface ChallengeCardProps {
  challenge: any
}

function ChallengeCard({ challenge }: ChallengeCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400"
      case "medium":
        return "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400"
      case "hard":
        return "bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400"
      default:
        return "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "daily":
        return <Clock className="h-3 w-3 mr-1" />
      case "weekly":
        return <Calendar className="h-3 w-3 mr-1" />
      case "monthly":
        return <Calendar className="h-3 w-3 mr-1" />
      default:
        return null
    }
  }

  const daysLeft = Math.ceil((new Date(challenge.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <challenge.icon className="h-5 w-5 text-blue-500" />
              <h3 className="font-medium">{challenge.title}</h3>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className={cn("border-none", getDifficultyColor(challenge.difficulty))}>
                {challenge.difficulty}
              </Badge>
              <Badge
                variant="outline"
                className="bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 border-none"
              >
                {getTypeIcon(challenge.type)}
                {challenge.type}
              </Badge>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{challenge.description}</p>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>
                Progress: {challenge.progress}/{challenge.total}
              </span>
              <span>+{challenge.xp} XP</span>
            </div>
            <Progress value={(challenge.progress / challenge.total) * 100} className="h-1.5" />
          </div>
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>Category: {challenge.category}</span>
            <span
              className={cn(
                "font-medium",
                daysLeft <= 1 ? "text-red-500" : daysLeft <= 3 ? "text-amber-500" : "text-green-500",
              )}
            >
              {daysLeft} {daysLeft === 1 ? "day" : "days"} left
            </span>
          </div>
          <Button size="sm" variant="outline" className="w-full mt-2">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

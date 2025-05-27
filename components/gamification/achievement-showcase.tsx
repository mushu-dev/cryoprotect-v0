"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Lock, ChevronRight, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

interface AchievementShowcaseProps {
  className?: string
  fullView?: boolean
}

export function AchievementShowcase({ className, fullView = false }: AchievementShowcaseProps) {
  // Sample achievement data
  const achievements = [
    {
      id: "ach-001",
      title: "First Molecule",
      description: "Add your first molecule to the database",
      icon: "/achievements/molecule.svg",
      category: "molecules",
      unlocked: true,
      date: "2023-04-10",
      xp: 100,
    },
    {
      id: "ach-002",
      title: "Mixture Master",
      description: "Create 5 different mixtures",
      icon: "/achievements/mixture.svg",
      category: "mixtures",
      unlocked: true,
      date: "2023-04-15",
      xp: 250,
    },
    {
      id: "ach-003",
      title: "Experiment Expert",
      description: "Complete 10 successful experiments",
      icon: "/achievements/experiment.svg",
      category: "experiments",
      unlocked: true,
      date: "2023-04-22",
      xp: 500,
    },
    {
      id: "ach-004",
      title: "Data Driven",
      description: "Record properties for 20 molecules",
      icon: "/achievements/data.svg",
      category: "molecules",
      unlocked: false,
      progress: 15,
      total: 20,
      xp: 300,
    },
    {
      id: "ach-005",
      title: "Protocol Pioneer",
      description: "Create a protocol that's used by 3 other researchers",
      icon: "/achievements/protocol.svg",
      category: "protocols",
      unlocked: false,
      progress: 1,
      total: 3,
      xp: 400,
    },
    {
      id: "ach-006",
      title: "Collaboration Champion",
      description: "Collaborate on 5 experiments with other researchers",
      icon: "/achievements/collaboration.svg",
      category: "experiments",
      unlocked: false,
      progress: 2,
      total: 5,
      xp: 350,
    },
  ]

  const recentAchievements = achievements.filter((a) => a.unlocked).slice(0, 3)
  const displayAchievements = fullView ? achievements : recentAchievements

  if (!fullView) {
    return (
      <Card className={className}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Recent Achievements</CardTitle>
            <Award className="h-5 w-5 text-amber-500" />
          </div>
          <CardDescription>Your latest research milestones</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {recentAchievements.map((achievement) => (
            <div key={achievement.id} className="flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center">
                <Image
                  src={achievement.icon || "/placeholder.svg"}
                  alt={achievement.title}
                  width={32}
                  height={32}
                  className="h-6 w-6"
                />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{achievement.title}</p>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
              </div>
              <Badge
                variant="outline"
                className="bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400 border-none"
              >
                +{achievement.xp} XP
              </Badge>
            </div>
          ))}
          <Button variant="ghost" size="sm" className="w-full" asChild>
            <Link href="/achievements">
              View All Achievements
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Research Achievements</CardTitle>
          <Award className="h-5 w-5 text-amber-500" />
        </div>
        <CardDescription>Track your progress and earn rewards</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="molecules">Molecules</TabsTrigger>
            <TabsTrigger value="mixtures">Mixtures</TabsTrigger>
            <TabsTrigger value="experiments">Experiments</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {achievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="molecules" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {achievements
                .filter((a) => a.category === "molecules")
                .map((achievement) => (
                  <AchievementCard key={achievement.id} achievement={achievement} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="mixtures" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {achievements
                .filter((a) => a.category === "mixtures")
                .map((achievement) => (
                  <AchievementCard key={achievement.id} achievement={achievement} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="experiments" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {achievements
                .filter((a) => a.category === "experiments")
                .map((achievement) => (
                  <AchievementCard key={achievement.id} achievement={achievement} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

interface AchievementCardProps {
  achievement: any
}

function AchievementCard({ achievement }: AchievementCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-md",
        achievement.unlocked ? "border-green-200 dark:border-green-800" : "opacity-80",
      )}
    >
      <CardContent className="p-0">
        <div className="flex flex-col">
          <div className="relative h-24 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 flex items-center justify-center">
            <Image
              src={achievement.icon || "/placeholder.svg"}
              alt={achievement.title}
              width={64}
              height={64}
              className={cn("h-12 w-12 transition-all", !achievement.unlocked && "opacity-50 grayscale")}
            />
            {achievement.unlocked && (
              <div className="absolute top-2 right-2">
                <Badge
                  variant="outline"
                  className="bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400 border-none"
                >
                  <Star className="mr-1 h-3 w-3" /> Unlocked
                </Badge>
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-medium flex items-center gap-2">
              {achievement.title}
              {!achievement.unlocked && <Lock className="h-3 w-3 text-muted-foreground" />}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>

            {!achievement.unlocked && achievement.progress !== undefined && (
              <div className="mt-3">
                <div className="flex justify-between text-xs">
                  <span>Progress</span>
                  <span>
                    {achievement.progress}/{achievement.total}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full mt-1">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="mt-3 flex justify-between items-center">
              <Badge
                variant="outline"
                className="bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 border-none"
              >
                +{achievement.xp} XP
              </Badge>
              {achievement.unlocked && achievement.date && (
                <span className="text-xs text-muted-foreground">
                  Unlocked: {new Date(achievement.date).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

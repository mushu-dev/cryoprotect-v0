"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FlaskRoundIcon as Flask, Beaker, TestTube, TrendingUp, Users, Award } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

interface ResearchStatsProps {
  className?: string
}

export function ResearchStats({ className }: ResearchStatsProps) {
  const [stats, setStats] = useState([
    {
      title: "Molecules",
      value: 0,
      target: 24,
      icon: Flask,
      color: "text-blue-500",
      change: "+2",
      trend: "up",
    },
    {
      title: "Mixtures",
      value: 0,
      target: 12,
      icon: Beaker,
      color: "text-purple-500",
      change: "+1",
      trend: "up",
    },
    {
      title: "Experiments",
      value: 0,
      target: 36,
      icon: TestTube,
      color: "text-green-500",
      change: "+5",
      trend: "up",
    },
    {
      title: "Success Rate",
      value: 0,
      target: 78,
      suffix: "%",
      icon: TrendingUp,
      color: "text-amber-500",
      change: "+2.3%",
      trend: "up",
    },
    {
      title: "Collaborators",
      value: 0,
      target: 8,
      icon: Users,
      color: "text-indigo-500",
      change: "+2",
      trend: "up",
    },
    {
      title: "Achievements",
      value: 0,
      target: 14,
      icon: Award,
      color: "text-cyan-500",
      change: "+3",
      trend: "up",
    },
  ])

  // Animate the stats on load
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prevStats) =>
        prevStats.map((stat) => {
          if (stat.value < stat.target) {
            return {
              ...stat,
              value: Math.min(stat.value + Math.ceil(stat.target / 20), stat.target),
            }
          }
          return stat
        }),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Research Stats</CardTitle>
        <CardDescription>Your research metrics and progress</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.title} className="space-y-2">
              <div className="flex items-center gap-2">
                <stat.icon className={cn("h-4 w-4", stat.color)} />
                <span className="text-sm font-medium">{stat.title}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tabular-nums">
                  {stat.value}
                  {stat.suffix || ""}
                </span>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs",
                    stat.trend === "up"
                      ? "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                      : "bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400",
                  )}
                >
                  {stat.change}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

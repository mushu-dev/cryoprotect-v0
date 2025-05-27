"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Award, Zap, Trophy } from "lucide-react"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ResearchProgress() {
  const [progress, setProgress] = useState(0)

  // Simulate progress loading
  useEffect(() => {
    const timer = setTimeout(() => setProgress(78), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Card className="overflow-hidden border-none bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold">Level 12 Researcher</h3>
              <Badge
                variant="outline"
                className="bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 border-none"
              >
                <Sparkles className="mr-1 h-3 w-3" /> Advanced
              </Badge>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span>Research XP: 7,845 / 10,000</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2 w-full" />
            </div>

            <p className="text-sm text-muted-foreground">
              2,155 XP until Level 13. Complete challenges to earn more XP!
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 rounded-lg bg-white dark:bg-gray-800 px-3 py-2 shadow-sm">
                    <Award className="h-5 w-5 text-amber-500" />
                    <div className="text-sm font-medium">14 Achievements</div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>You've unlocked 14 of 32 achievements</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 rounded-lg bg-white dark:bg-gray-800 px-3 py-2 shadow-sm">
                    <Zap className="h-5 w-5 text-purple-500" />
                    <div className="text-sm font-medium">5 Day Streak</div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>You've logged in for 5 consecutive days</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 rounded-lg bg-white dark:bg-gray-800 px-3 py-2 shadow-sm">
                    <Trophy className="h-5 w-5 text-green-500" />
                    <div className="text-sm font-medium">Top 10%</div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>You're in the top 10% of researchers this month</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

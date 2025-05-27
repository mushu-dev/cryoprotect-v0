"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Activity,
  Users,
  MessageSquare,
  ThumbsUp,
  Award,
  FlaskRoundIcon as Flask,
  Beaker,
  TestTube,
  FileText,
  BarChart,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function ActivityFeed() {
  // Sample activity data
  const activities = [
    {
      id: "act-001",
      type: "achievement",
      title: "Achievement Unlocked",
      description: "You unlocked the 'Experiment Expert' achievement",
      icon: Award,
      iconColor: "text-amber-500",
      timestamp: "2023-05-01T14:30:00Z",
      user: {
        name: "You",
        avatar: "/avatars/01.png",
      },
    },
    {
      id: "act-002",
      type: "experiment",
      title: "Experiment Completed",
      description: "Your experiment 'DMSO Concentration Effects' was completed successfully with 85% viability",
      icon: TestTube,
      iconColor: "text-green-500",
      timestamp: "2023-04-30T10:15:00Z",
      user: {
        name: "You",
        avatar: "/avatars/01.png",
      },
    },
    {
      id: "act-003",
      type: "social",
      title: "New Collaboration",
      description: "Dr. Sarah Chen invited you to collaborate on 'Novel Cryoprotectant Mixture'",
      icon: Users,
      iconColor: "text-blue-500",
      timestamp: "2023-04-29T16:45:00Z",
      user: {
        name: "Dr. Sarah Chen",
        avatar: "/avatars/02.png",
      },
    },
    {
      id: "act-004",
      type: "molecule",
      title: "Molecule Added",
      description: "You added a new molecule 'Trehalose' to the database",
      icon: Flask,
      iconColor: "text-purple-500",
      timestamp: "2023-04-28T09:20:00Z",
      user: {
        name: "You",
        avatar: "/avatars/01.png",
      },
    },
    {
      id: "act-005",
      type: "mixture",
      title: "Mixture Created",
      description: "You created a new mixture 'DMSO-Glycerol-Trehalose'",
      icon: Beaker,
      iconColor: "text-indigo-500",
      timestamp: "2023-04-27T13:10:00Z",
      user: {
        name: "You",
        avatar: "/avatars/01.png",
      },
    },
    {
      id: "act-006",
      type: "social",
      title: "Comment Received",
      description: "Dr. Michael Johnson commented on your experiment 'Glycerol Permeability Study'",
      icon: MessageSquare,
      iconColor: "text-blue-500",
      timestamp: "2023-04-26T15:30:00Z",
      user: {
        name: "Dr. Michael Johnson",
        avatar: "/avatars/03.png",
      },
      comment: "Great work on the permeability measurements. Have you considered testing at different temperatures?",
    },
    {
      id: "act-007",
      type: "report",
      title: "Report Generated",
      description: "You generated a new report 'Q1 Cryoprotectant Comparison'",
      icon: FileText,
      iconColor: "text-gray-500",
      timestamp: "2023-04-25T11:45:00Z",
      user: {
        name: "You",
        avatar: "/avatars/01.png",
      },
    },
    {
      id: "act-008",
      type: "social",
      title: "Experiment Liked",
      description: "Dr. Emily Wong liked your experiment 'DMSO Concentration Effects'",
      icon: ThumbsUp,
      iconColor: "text-blue-500",
      timestamp: "2023-04-24T14:20:00Z",
      user: {
        name: "Dr. Emily Wong",
        avatar: "/avatars/04.png",
      },
    },
    {
      id: "act-009",
      type: "analysis",
      title: "Analysis Completed",
      description: "Your analysis 'Viability Comparison Across Mixtures' was completed",
      icon: BarChart,
      iconColor: "text-cyan-500",
      timestamp: "2023-04-23T09:15:00Z",
      user: {
        name: "You",
        avatar: "/avatars/01.png",
      },
    },
  ]

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`
    }

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`
    }

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) {
      return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`
    }

    return date.toLocaleDateString()
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Activity Feed</CardTitle>
          <Activity className="h-5 w-5 text-blue-500" />
        </div>
        <CardDescription>Recent activity in your research network</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            {activities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} formatTimestamp={formatTimestamp} />
            ))}
          </TabsContent>
          <TabsContent value="research" className="space-y-4">
            {activities
              .filter((a) => ["molecule", "mixture", "experiment", "report", "analysis"].includes(a.type))
              .map((activity) => (
                <ActivityItem key={activity.id} activity={activity} formatTimestamp={formatTimestamp} />
              ))}
          </TabsContent>
          <TabsContent value="social" className="space-y-4">
            {activities
              .filter((a) => a.type === "social")
              .map((activity) => (
                <ActivityItem key={activity.id} activity={activity} formatTimestamp={formatTimestamp} />
              ))}
          </TabsContent>
          <TabsContent value="achievements" className="space-y-4">
            {activities
              .filter((a) => a.type === "achievement")
              .map((activity) => (
                <ActivityItem key={activity.id} activity={activity} formatTimestamp={formatTimestamp} />
              ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

interface ActivityItemProps {
  activity: any
  formatTimestamp: (timestamp: string) => string
}

function ActivityItem({ activity, formatTimestamp }: ActivityItemProps) {
  return (
    <div className="flex gap-4 items-start pb-4 border-b border-border last:border-0 last:pb-0">
      <Avatar className="h-10 w-10">
        <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
        <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <activity.icon className={cn("h-4 w-4", activity.iconColor)} />
          <p className="text-sm font-medium">{activity.title}</p>
        </div>
        <p className="text-sm text-muted-foreground">{activity.description}</p>

        {activity.comment && <div className="mt-2 rounded-md bg-muted p-3 text-sm">"{activity.comment}"</div>}

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {activity.user.name === "You" ? "You" : `By ${activity.user.name}`}
            </span>
            <span className="text-xs text-muted-foreground">{formatTimestamp(activity.timestamp)}</span>
          </div>

          {activity.type !== "achievement" && (
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

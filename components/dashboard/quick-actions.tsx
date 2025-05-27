"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FlaskRoundIcon as Flask, Beaker, TestTube, FileText, Users, BarChart } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface QuickActionsProps {
  className?: string
}

export function QuickActions({ className }: QuickActionsProps) {
  const actions = [
    {
      title: "Add Molecule",
      description: "Record a new cryoprotectant molecule",
      icon: Flask,
      color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30",
      href: "/molecules/new",
    },
    {
      title: "Create Mixture",
      description: "Formulate a new cryoprotectant mixture",
      icon: Beaker,
      color: "text-purple-500 bg-purple-50 dark:bg-purple-950/30",
      href: "/mixtures/new",
    },
    {
      title: "New Experiment",
      description: "Start a new cryopreservation experiment",
      icon: TestTube,
      color: "text-green-500 bg-green-50 dark:bg-green-950/30",
      href: "/experiments/new",
    },
    {
      title: "Generate Report",
      description: "Create a report from your research data",
      icon: FileText,
      color: "text-amber-500 bg-amber-50 dark:bg-amber-950/30",
      href: "/reports/new",
    },
    {
      title: "Invite Collaborator",
      description: "Invite a colleague to collaborate",
      icon: Users,
      color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/30",
      href: "/team/invite",
    },
    {
      title: "Analyze Data",
      description: "Run analysis on your experimental data",
      icon: BarChart,
      color: "text-cyan-500 bg-cyan-50 dark:bg-cyan-950/30",
      href: "/analytics/new",
    },
  ]

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        <CardDescription>Common research tasks and actions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {actions.map((action) => (
            <Button
              key={action.title}
              variant="outline"
              className="h-auto flex flex-col items-center justify-center gap-2 p-4 hover:bg-muted"
              asChild
            >
              <Link href={action.href}>
                <div className={cn("rounded-full p-2", action.color)}>
                  <action.icon className="h-5 w-5" />
                </div>
                <span className="font-medium text-sm">{action.title}</span>
                <span className="text-xs text-muted-foreground text-center">{action.description}</span>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

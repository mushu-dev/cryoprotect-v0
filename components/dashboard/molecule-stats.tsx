"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FlaskRoundIcon as Flask, Beaker, Activity, TestTube } from "lucide-react"
import { cn } from "@/lib/utils"

export function MoleculeStats() {
  const stats = [
    {
      title: "Molecules",
      value: "24",
      icon: Flask,
      description: "Unique cryoprotectants",
      change: "+2 this month",
      trend: "up",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Mixtures",
      value: "12",
      icon: Beaker,
      description: "Compound solutions",
      change: "+1 this month",
      trend: "up",
      color: "text-indigo-600 dark:text-indigo-400",
    },
    {
      title: "Experiments",
      value: "36",
      icon: TestTube,
      description: "Research protocols",
      change: "+5 this month",
      trend: "up",
      color: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Success Rate",
      value: "78%",
      icon: Activity,
      description: "Viability outcomes",
      change: "+2.3% increase",
      trend: "up",
      color: "text-amber-600 dark:text-amber-400",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <stat.icon className={cn("h-5 w-5", stat.color)} />
                  <h3 className="text-sm font-medium">{stat.title}</h3>
                </div>
                <div className="mt-2">
                  <p className="text-2xl font-semibold tabular-nums">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.description}</p>
                </div>
              </div>
              <div className="text-xs text-right">
                <span
                  className={cn(
                    "inline-block rounded-sm px-1.5 py-0.5 text-xs font-medium",
                    stat.trend === "up"
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
                  )}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

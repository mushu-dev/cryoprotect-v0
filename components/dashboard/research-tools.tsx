"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Beaker, TestTube, FileText, Search, BarChart } from "lucide-react"
import { MoleculeIcon } from "@/components/icons/molecule-icon"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function ResearchTools() {
  const tools = [
    {
      title: "Molecule Search",
      icon: Search,
      color: "text-blue-600 dark:text-blue-400",
      href: "/molecules",
      description: "Find cryoprotectants",
    },
    {
      title: "New Molecule",
      icon: MoleculeIcon,
      color: "text-indigo-600 dark:text-indigo-400",
      href: "/molecules/new",
      description: "Add to database",
    },
    {
      title: "Create Mixture",
      icon: Beaker,
      color: "text-emerald-600 dark:text-emerald-400",
      href: "/mixtures/new",
      description: "Design solution",
    },
    {
      title: "New Experiment",
      icon: TestTube,
      color: "text-amber-600 dark:text-amber-400",
      href: "/experiments/new",
      description: "Protocol setup",
    },
    {
      title: "Generate Report",
      icon: FileText,
      color: "text-purple-600 dark:text-purple-400",
      href: "/reports/new",
      description: "Research summary",
    },
    {
      title: "Data Analysis",
      icon: BarChart,
      color: "text-cyan-600 dark:text-cyan-400",
      href: "/analytics",
      description: "Visualize results",
    },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Research Tools</CardTitle>
        <CardDescription>Essential cryoprotectant research utilities</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-2">
          {tools.map((tool) => (
            <Button
              key={tool.title}
              variant="outline"
              className="h-auto flex flex-col items-center justify-center gap-1 p-3 hover:bg-muted"
              asChild
            >
              <Link href={tool.href}>
                <tool.icon className={cn("h-5 w-5 mb-1", tool.color)} />
                <span className="text-xs font-medium">{tool.title}</span>
                <span className="text-[10px] text-muted-foreground">{tool.description}</span>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

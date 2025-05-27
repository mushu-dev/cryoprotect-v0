"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, BarChart } from "lucide-react"
import Link from "next/link"

interface MoleculeExperimentsProps {
  id: string
}

export function MoleculeExperiments({ id }: MoleculeExperimentsProps) {
  // Sample data for experiments using this molecule
  const experiments = [
    {
      id: "exp-001",
      title: "DMSO Concentration Effects",
      mixtureName: "DMSO-PBS Solution",
      status: "completed",
      date: "2023-04-15",
      viability: 85,
      researcher: "Dr. Jane Smith",
    },
    {
      id: "exp-006",
      title: "Vitrification Protocol Optimization",
      mixtureName: "DMSO-EG-Sucrose Mix",
      status: "completed",
      date: "2023-04-18",
      viability: 88,
      researcher: "Dr. Michael Johnson",
    },
    {
      id: "exp-009",
      title: "Warming Rate Analysis",
      mixtureName: "DMSO-Trehalose Mix",
      status: "completed",
      date: "2023-04-08",
      viability: 75,
      researcher: "Dr. Sarah Chen",
    },
    {
      id: "exp-011",
      title: "DMSO Toxicity Assessment",
      mixtureName: "DMSO-PBS Solution",
      status: "in-progress",
      date: "2023-04-22",
      viability: null,
      researcher: "Dr. Jane Smith",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Related Experiments</CardTitle>
            <CardDescription>Experiments using this molecule</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <BarChart className="mr-2 h-4 w-4" />
              Compare Results
            </Button>
            <Button size="sm" asChild>
              <Link href="/experiments/new">New Experiment</Link>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Experiment</TableHead>
              <TableHead>Mixture</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Viability</TableHead>
              <TableHead>Researcher</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {experiments.map((experiment) => (
              <TableRow key={experiment.id}>
                <TableCell className="font-medium">{experiment.title}</TableCell>
                <TableCell>{experiment.mixtureName}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      experiment.status === "completed"
                        ? "default"
                        : experiment.status === "in-progress"
                          ? "outline"
                          : experiment.status === "planned"
                            ? "secondary"
                            : "destructive"
                    }
                    className="capitalize"
                  >
                    {experiment.status}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(experiment.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  {experiment.viability !== null ? (
                    <span className="font-mono">{experiment.viability}%</span>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell>{experiment.researcher}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/experiments/${experiment.id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Eye, ArrowUpDown, Search, Filter } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface RecentExperimentsProps {
  limit?: number
  compact?: boolean
  status?: string
}

export function RecentExperiments({ limit = 5, compact = false, status }: RecentExperimentsProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")

  // Sample data for recent experiments
  const allExperiments = [
    {
      id: "exp-001",
      title: "DMSO Concentration Effects",
      mixtureName: "DMSO-PBS Solution",
      status: "completed",
      date: "2023-04-15",
      success: true,
      viability: 85,
    },
    {
      id: "exp-002",
      title: "Glycerol Permeability Study",
      mixtureName: "Glycerol-Sucrose Mix",
      status: "completed",
      date: "2023-04-10",
      success: true,
      viability: 80,
    },
    {
      id: "exp-003",
      title: "Combined Cryoprotectant Test",
      mixtureName: "DMSO-Glycerol-Trehalose",
      status: "in-progress",
      date: "2023-04-05",
      success: null,
      viability: null,
    },
    {
      id: "exp-004",
      title: "Low Temperature Protocol",
      mixtureName: "EG-Sucrose Solution",
      status: "failed",
      date: "2023-03-28",
      success: false,
      viability: 35,
    },
    {
      id: "exp-005",
      title: "Rapid Cooling Method",
      mixtureName: "PG-Albumin Mix",
      status: "planned",
      date: "2023-04-20",
      success: null,
      viability: null,
    },
    {
      id: "exp-006",
      title: "Vitrification Protocol Optimization",
      mixtureName: "DMSO-EG-Sucrose Mix",
      status: "completed",
      date: "2023-04-18",
      success: true,
      viability: 88,
    },
    {
      id: "exp-007",
      title: "Cell Line Compatibility Test",
      mixtureName: "Glycerol-Albumin Solution",
      status: "in-progress",
      date: "2023-04-12",
      success: null,
      viability: null,
    },
    {
      id: "exp-008",
      title: "Long-term Storage Evaluation",
      mixtureName: "DMSO-Trehalose Mix",
      status: "planned",
      date: "2023-04-25",
      success: null,
      viability: null,
    },
    {
      id: "exp-009",
      title: "Warming Rate Analysis",
      mixtureName: "PG-Sucrose Solution",
      status: "completed",
      date: "2023-04-08",
      success: true,
      viability: 75,
    },
    {
      id: "exp-010",
      title: "Membrane Permeability Study",
      mixtureName: "EG-Glycerol Mix",
      status: "failed",
      date: "2023-03-30",
      success: false,
      viability: 42,
    },
  ]

  // Filter experiments based on search query and status
  const filteredExperiments = allExperiments
    .filter(
      (experiment) =>
        (experiment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          experiment.mixtureName.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (!status ||
          (status === "active" && ["in-progress", "planned"].includes(experiment.status)) ||
          (status === "completed" && ["completed", "failed"].includes(experiment.status)) ||
          status === experiment.status),
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime()
      } else if (sortBy === "title") {
        return sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
      } else if (sortBy === "status") {
        return sortOrder === "asc" ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status)
      } else if (sortBy === "viability") {
        const aVal = a.viability ?? -1
        const bVal = b.viability ?? -1
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal
      }
      return 0
    })
    .slice(0, limit)

  const toggleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("asc")
    }
  }

  if (compact) {
    return (
      <div className="px-1">
        <div className="space-y-1">
          {filteredExperiments.map((experiment) => (
            <div
              key={experiment.id}
              className="flex items-center justify-between py-2 px-2 hover:bg-muted/50 rounded-md"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
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
                    className="h-1.5 w-1.5 p-0 rounded-full"
                  />
                  <span className="text-sm font-medium">{experiment.title}</span>
                </div>
                <span className="text-xs text-muted-foreground ml-5">{experiment.mixtureName}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{new Date(experiment.date).toLocaleDateString()}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6" asChild>
                  <Link href={`/experiments/${experiment.id}`}>
                    <Eye className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-end">
          <Button variant="link" size="sm" asChild>
            <Link href="/experiments">View all experiments</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between pb-4">
        <div className="flex gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search experiments..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy("date")}>Sort by Date</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("title")}>Sort by Title</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("status")}>Sort by Status</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("viability")}>Sort by Viability</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" className="p-0 h-8 font-medium" onClick={() => toggleSort("title")}>
                  Title
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="hidden md:table-cell">Mixture</TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 h-8 font-medium" onClick={() => toggleSort("status")}>
                  Status
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 h-8 font-medium" onClick={() => toggleSort("date")}>
                  Date
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 h-8 font-medium" onClick={() => toggleSort("viability")}>
                  Viability
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExperiments.map((experiment) => (
              <TableRow key={experiment.id}>
                <TableCell className="font-medium">{experiment.title}</TableCell>
                <TableCell className="hidden md:table-cell">{experiment.mixtureName}</TableCell>
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
      </div>
    </div>
  )
}

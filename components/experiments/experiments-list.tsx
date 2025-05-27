"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, Edit, Trash2, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import type { Experiment } from "@/types"

export function ExperimentsList() {
  const [searchQuery, setSearchQuery] = useState("")

  // Sample data for experiments
  const experiments: Experiment[] = [
    {
      id: "exp-001",
      title: "DMSO Concentration Effects",
      description: "Testing various concentrations of DMSO on cell viability",
      mixtureId: "mix-001",
      mixtureName: "DMSO-PBS Solution",
      protocol: {
        steps: [
          {
            id: "step-001",
            name: "Sample Preparation",
            description: "Prepare cell samples in culture medium",
            duration: 30,
            temperature: 22,
            notes: "Use fresh cells from passage 3-5",
          },
          {
            id: "step-002",
            name: "Cryoprotectant Addition",
            description: "Add DMSO solution to cells",
            duration: 15,
            temperature: 4,
            notes: "Add dropwise while gently swirling",
          },
          {
            id: "step-003",
            name: "Cooling",
            description: "Cool samples at controlled rate",
            duration: 60,
            temperature: -80,
            notes: "Use CoolCell container for controlled cooling",
          },
        ],
        temperature: -196,
        duration: 7200,
        equipment: ["CoolCell", "LN2 Storage Tank", "Biosafety Cabinet"],
      },
      results: {
        success: true,
        viabilityRate: 85,
        recoveryRate: 78,
        notes: "Excellent viability with minimal cell damage",
        dataPoints: [
          { time: 0, temperature: 22, viability: 100 },
          { time: 15, temperature: 4, viability: 98 },
          { time: 75, temperature: -80, viability: 90 },
          { time: 7200, temperature: -196, viability: 85 },
        ],
      },
      status: "completed",
      startDate: "2023-04-10T00:00:00Z",
      endDate: "2023-04-15T00:00:00Z",
      createdBy: "user-001",
      createdAt: "2023-04-08T00:00:00Z",
      updatedAt: "2023-04-15T00:00:00Z",
    },
    {
      id: "exp-002",
      title: "Glycerol Permeability Study",
      description: "Investigating glycerol permeability across cell membranes",
      mixtureId: "mix-002",
      mixtureName: "Glycerol-Sucrose Mix",
      protocol: {
        steps: [
          {
            id: "step-001",
            name: "Sample Preparation",
            description: "Prepare cell samples in culture medium",
            duration: 30,
            temperature: 22,
            notes: "Use cells at 80% confluence",
          },
          {
            id: "step-002",
            name: "Cryoprotectant Addition",
            description: "Add glycerol solution to cells",
            duration: 20,
            temperature: 4,
            notes: "Add in two steps with 10 minute equilibration",
          },
          {
            id: "step-003",
            name: "Cooling",
            description: "Cool samples at controlled rate",
            duration: 90,
            temperature: -80,
            notes: "Use programmable freezer at 1°C/min",
          },
        ],
        temperature: -196,
        duration: 4320,
        equipment: ["Programmable Freezer", "LN2 Storage Tank", "Biosafety Cabinet"],
      },
      results: {
        success: true,
        viabilityRate: 80,
        recoveryRate: 75,
        notes: "Good viability with some membrane damage observed",
        dataPoints: [
          { time: 0, temperature: 22, viability: 100 },
          { time: 20, temperature: 4, viability: 95 },
          { time: 110, temperature: -80, viability: 85 },
          { time: 4320, temperature: -196, viability: 80 },
        ],
      },
      status: "completed",
      startDate: "2023-04-05T00:00:00Z",
      endDate: "2023-04-10T00:00:00Z",
      createdBy: "user-002",
      createdAt: "2023-04-03T00:00:00Z",
      updatedAt: "2023-04-10T00:00:00Z",
    },
    {
      id: "exp-003",
      title: "Combined Cryoprotectant Test",
      description: "Testing synergistic effects of multiple cryoprotectants",
      mixtureId: "mix-003",
      mixtureName: "DMSO-Glycerol-Trehalose",
      protocol: {
        steps: [
          {
            id: "step-001",
            name: "Sample Preparation",
            description: "Prepare cell samples in culture medium",
            duration: 30,
            temperature: 22,
            notes: "Use standardized cell concentration",
          },
          {
            id: "step-002",
            name: "Cryoprotectant Addition",
            description: "Add combined solution to cells",
            duration: 25,
            temperature: 4,
            notes: "Add in three steps with 5 minute equilibration between each",
          },
          {
            id: "step-003",
            name: "Cooling",
            description: "Cool samples at controlled rate",
            duration: 120,
            temperature: -80,
            notes: "Use programmable freezer at 0.5°C/min",
          },
        ],
        temperature: -196,
        duration: 2880,
        equipment: ["Programmable Freezer", "LN2 Storage Tank", "Biosafety Cabinet", "Osmometer"],
      },
      results: {
        success: null,
        viabilityRate: 0,
        recoveryRate: 0,
        notes: "Experiment in progress",
        dataPoints: [],
      },
      status: "in-progress",
      startDate: "2023-04-15T00:00:00Z",
      endDate: undefined,
      createdBy: "user-001",
      createdAt: "2023-04-12T00:00:00Z",
      updatedAt: "2023-04-15T00:00:00Z",
    },
    {
      id: "exp-004",
      title: "Low Temperature Protocol",
      description: "Testing viability at ultra-low temperatures",
      mixtureId: "mix-004",
      mixtureName: "EG-Sucrose Solution",
      protocol: {
        steps: [
          {
            id: "step-001",
            name: "Sample Preparation",
            description: "Prepare cell samples in culture medium",
            duration: 30,
            temperature: 22,
            notes: "Use high density cell suspension",
          },
          {
            id: "step-002",
            name: "Cryoprotectant Addition",
            description: "Add EG solution to cells",
            duration: 15,
            temperature: 4,
            notes: "Add rapidly with gentle mixing",
          },
          {
            id: "step-003",
            name: "Cooling",
            description: "Rapid cooling by direct immersion",
            duration: 5,
            temperature: -196,
            notes: "Direct plunge into liquid nitrogen",
          },
        ],
        temperature: -196,
        duration: 1440,
        equipment: ["LN2 Storage Tank", "Biosafety Cabinet", "Vitrification Tools"],
      },
      results: {
        success: false,
        viabilityRate: 35,
        recoveryRate: 20,
        notes: "Significant cell damage observed, likely due to ice crystal formation",
        dataPoints: [
          { time: 0, temperature: 22, viability: 100 },
          { time: 15, temperature: 4, viability: 95 },
          { time: 20, temperature: -196, viability: 40 },
          { time: 1440, temperature: -196, viability: 35 },
        ],
      },
      status: "failed",
      startDate: "2023-03-25T00:00:00Z",
      endDate: "2023-03-28T00:00:00Z",
      createdBy: "user-003",
      createdAt: "2023-03-23T00:00:00Z",
      updatedAt: "2023-03-28T00:00:00Z",
    },
    {
      id: "exp-005",
      title: "Rapid Cooling Method",
      description: "Testing vitrification approach with PG-Albumin mixture",
      mixtureId: "mix-005",
      mixtureName: "PG-Albumin Mix",
      protocol: {
        steps: [
          {
            id: "step-001",
            name: "Sample Preparation",
            description: "Prepare cell samples in culture medium",
            duration: 30,
            temperature: 22,
            notes: "Use small volume samples",
          },
          {
            id: "step-002",
            name: "Cryoprotectant Addition",
            description: "Add PG-Albumin solution to cells",
            duration: 10,
            temperature: 4,
            notes: "Add in single step with gentle mixing",
          },
          {
            id: "step-003",
            name: "Cooling",
            description: "Ultra-rapid cooling on metal surface",
            duration: 1,
            temperature: -150,
            notes: "Use metal block pre-cooled in liquid nitrogen",
          },
        ],
        temperature: -196,
        duration: 0,
        equipment: ["LN2 Storage Tank", "Biosafety Cabinet", "Metal Cooling Block"],
      },
      results: {
        success: null,
        viabilityRate: 0,
        recoveryRate: 0,
        notes: "Experiment planned",
        dataPoints: [],
      },
      status: "planned",
      startDate: "2023-04-20T00:00:00Z",
      endDate: undefined,
      createdBy: "user-002",
      createdAt: "2023-04-15T00:00:00Z",
      updatedAt: "2023-04-15T00:00:00Z",
    },
  ]

  // Filter experiments based on search query
  const filteredExperiments = experiments.filter(
    (experiment) =>
      experiment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      experiment.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      experiment.mixtureName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between pb-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search experiments..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Mixture</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Viability</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExperiments.map((experiment) => (
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
                  >
                    {experiment.status}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(experiment.startDate).toLocaleDateString()}</TableCell>
                <TableCell className="data-value">
                  {experiment.status === "completed" || experiment.status === "failed"
                    ? `${experiment.results.viabilityRate}%`
                    : "-"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/experiments/${experiment.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                    </Link>
                    <Link href={`/experiments/${experiment.id}/edit`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, Edit, Trash2, Search } from "lucide-react"
import Link from "next/link"
import type { Mixture } from "@/types"

export function MixturesList() {
  const [searchQuery, setSearchQuery] = useState("")

  // Sample data for mixtures
  const mixtures: Mixture[] = [
    {
      id: "mix-001",
      name: "DMSO-PBS Solution",
      description: "Standard DMSO solution in phosphate-buffered saline",
      components: [
        {
          moleculeId: "mol-001",
          moleculeName: "Dimethyl Sulfoxide",
          concentration: 1.5,
          ratio: 10,
        },
        {
          moleculeId: "mol-006",
          moleculeName: "Phosphate-Buffered Saline",
          concentration: 0.01,
          ratio: 90,
        },
      ],
      properties: {
        freezingPoint: -2.5,
        viscosity: 1.2,
        toxicity: 2,
        permeability: 75,
        osmolality: 320,
        glassTransitionTemp: -123,
      },
      createdAt: "2023-03-10T00:00:00Z",
      updatedAt: "2023-04-05T00:00:00Z",
    },
    {
      id: "mix-002",
      name: "Glycerol-Sucrose Mix",
      description: "Glycerol mixture with sucrose for cell preservation",
      components: [
        {
          moleculeId: "mol-002",
          moleculeName: "Glycerol",
          concentration: 2.0,
          ratio: 15,
        },
        {
          moleculeId: "mol-007",
          moleculeName: "Sucrose",
          concentration: 0.3,
          ratio: 5,
        },
        {
          moleculeId: "mol-006",
          moleculeName: "Phosphate-Buffered Saline",
          concentration: 0.01,
          ratio: 80,
        },
      ],
      properties: {
        freezingPoint: -3.2,
        viscosity: 1.5,
        toxicity: 1,
        permeability: 60,
        osmolality: 350,
        glassTransitionTemp: -115,
      },
      createdAt: "2023-03-15T00:00:00Z",
      updatedAt: "2023-04-08T00:00:00Z",
    },
    {
      id: "mix-003",
      name: "DMSO-Glycerol-Trehalose",
      description: "Combined cryoprotectant mixture for improved viability",
      components: [
        {
          moleculeId: "mol-001",
          moleculeName: "Dimethyl Sulfoxide",
          concentration: 1.0,
          ratio: 7.5,
        },
        {
          moleculeId: "mol-002",
          moleculeName: "Glycerol",
          concentration: 1.0,
          ratio: 7.5,
        },
        {
          moleculeId: "mol-005",
          moleculeName: "Trehalose",
          concentration: 0.2,
          ratio: 5,
        },
        {
          moleculeId: "mol-006",
          moleculeName: "Phosphate-Buffered Saline",
          concentration: 0.01,
          ratio: 80,
        },
      ],
      properties: {
        freezingPoint: -4.0,
        viscosity: 1.8,
        toxicity: 2,
        permeability: 80,
        osmolality: 380,
        glassTransitionTemp: -130,
      },
      createdAt: "2023-03-20T00:00:00Z",
      updatedAt: "2023-04-10T00:00:00Z",
    },
    {
      id: "mix-004",
      name: "EG-Sucrose Solution",
      description: "Ethylene glycol solution with sucrose for vitrification",
      components: [
        {
          moleculeId: "mol-003",
          moleculeName: "Ethylene Glycol",
          concentration: 3.0,
          ratio: 20,
        },
        {
          moleculeId: "mol-007",
          moleculeName: "Sucrose",
          concentration: 0.5,
          ratio: 10,
        },
        {
          moleculeId: "mol-006",
          moleculeName: "Phosphate-Buffered Saline",
          concentration: 0.01,
          ratio: 70,
        },
      ],
      properties: {
        freezingPoint: -5.5,
        viscosity: 2.0,
        toxicity: 3,
        permeability: 85,
        osmolality: 420,
        glassTransitionTemp: -140,
      },
      createdAt: "2023-03-25T00:00:00Z",
      updatedAt: "2023-04-12T00:00:00Z",
    },
    {
      id: "mix-005",
      name: "PG-Albumin Mix",
      description: "Propylene glycol mixture with albumin for protein stability",
      components: [
        {
          moleculeId: "mol-004",
          moleculeName: "Propylene Glycol",
          concentration: 2.5,
          ratio: 15,
        },
        {
          moleculeId: "mol-008",
          moleculeName: "Albumin",
          concentration: 0.1,
          ratio: 5,
        },
        {
          moleculeId: "mol-006",
          moleculeName: "Phosphate-Buffered Saline",
          concentration: 0.01,
          ratio: 80,
        },
      ],
      properties: {
        freezingPoint: -4.8,
        viscosity: 1.7,
        toxicity: 2,
        permeability: 70,
        osmolality: 400,
        glassTransitionTemp: -135,
      },
      createdAt: "2023-03-30T00:00:00Z",
      updatedAt: "2023-04-15T00:00:00Z",
    },
  ]

  // Filter mixtures based on search query
  const filteredMixtures = mixtures.filter(
    (mixture) =>
      mixture.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mixture.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between pb-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search mixtures..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Components</TableHead>
              <TableHead>Freezing Point (°C)</TableHead>
              <TableHead>Osmolality (mOsm/kg)</TableHead>
              <TableHead>Glass Transition (°C)</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMixtures.map((mixture) => (
              <TableRow key={mixture.id}>
                <TableCell className="font-medium">{mixture.name}</TableCell>
                <TableCell>{mixture.components.map((component) => component.moleculeName).join(", ")}</TableCell>
                <TableCell className="data-value">{mixture.properties.freezingPoint.toFixed(1)}</TableCell>
                <TableCell className="data-value">{mixture.properties.osmolality}</TableCell>
                <TableCell className="data-value">{mixture.properties.glassTransitionTemp}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/mixtures/${mixture.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                    </Link>
                    <Link href={`/mixtures/${mixture.id}/edit`}>
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

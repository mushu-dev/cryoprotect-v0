"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Download, BarChart } from "lucide-react"

interface MoleculePropertiesProps {
  id: string
}

export function MoleculeProperties({ id }: MoleculePropertiesProps) {
  // Sample data for molecule properties
  const properties = [
    {
      id: "prop-001",
      type: "freezing_point",
      name: "Freezing Point",
      value: 18.5,
      unit: "°C",
      isExperimental: true,
      source: "Internal Lab",
      confidence: 0.95,
      date: "2023-02-10",
    },
    {
      id: "prop-002",
      type: "viscosity",
      name: "Viscosity",
      value: 1.996,
      unit: "cP",
      isExperimental: true,
      source: "Internal Lab",
      confidence: 0.92,
      date: "2023-02-10",
    },
    {
      id: "prop-003",
      type: "toxicity",
      name: "Toxicity",
      value: 3,
      unit: "scale (0-10)",
      isExperimental: false,
      source: "Literature",
      confidence: 0.85,
      date: "2023-01-15",
    },
    {
      id: "prop-004",
      type: "permeability",
      name: "Permeability",
      value: 85,
      unit: "%",
      isExperimental: true,
      source: "Internal Lab",
      confidence: 0.9,
      date: "2023-02-15",
    },
    {
      id: "prop-005",
      type: "osmolality",
      name: "Osmolality",
      value: 1000,
      unit: "mOsm/kg",
      isExperimental: true,
      source: "Internal Lab",
      confidence: 0.88,
      date: "2023-02-20",
    },
    {
      id: "prop-006",
      type: "glass_transition",
      name: "Glass Transition Temperature",
      value: -132,
      unit: "°C",
      isExperimental: false,
      source: "Literature",
      confidence: 0.8,
      date: "2023-01-20",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Physicochemical Properties</CardTitle>
            <CardDescription>Measured and predicted properties of this molecule</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <BarChart className="mr-2 h-4 w-4" />
              Compare
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Property
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((property) => (
              <TableRow key={property.id}>
                <TableCell className="font-medium">{property.name}</TableCell>
                <TableCell className="font-mono">
                  {property.value} {property.unit}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      property.isExperimental
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }
                  >
                    {property.source}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${property.confidence * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-muted-foreground">{(property.confidence * 100).toFixed(0)}%</span>
                </TableCell>
                <TableCell>{new Date(property.date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

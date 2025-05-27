"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { MoleculesList } from "@/components/molecules/molecules-list"
import { MoleculeFilterDrawer } from "@/components/molecules/molecule-filter-drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, SlidersHorizontal, ImportIcon as FileImport } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { useState } from "react"
import dynamic from "next/dynamic"

// Dynamically import the PubChemImportDialog component with no SSR
const PubChemImportDialog = dynamic(
  () => import("@/components/molecules/pubchem-import-dialog").then((mod) => mod.PubChemImportDialog),
  { ssr: false },
)

export default function MoleculesPageClient() {
  const [activeFilters, setActiveFilters] = useState([
    { id: "freezing-point", label: "Freezing Point: -100 to -10°C" },
    { id: "permeability", label: "Permeability: 75-100%" },
    { id: "verified-only", label: "Verified Only" },
  ])

  const removeFilter = (id: string) => {
    setActiveFilters(activeFilters.filter((filter) => filter.id !== id))
  }

  const clearAllFilters = () => {
    setActiveFilters([])
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Cryoprotectant Molecules"
        description="Browse, search, and manage cryoprotectant molecules in the database"
      >
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <FileImport className="mr-2 h-4 w-4" />
            Import from PubChem
          </Button>
          <Button asChild>
            <Link href="/molecules/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Molecule
            </Link>
          </Button>
        </div>
      </DashboardHeader>

      {/* Search and filter bar */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search molecules by name, formula, or ID..." className="pl-9 pr-4" />
          </div>
          <MoleculeFilterDrawer>
            <Button variant="outline">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </MoleculeFilterDrawer>
        </div>

        {/* Active filters */}
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <Badge key={filter.id} variant="secondary" className="flex items-center gap-1">
              {filter.label}
              <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => removeFilter(filter.id)}>
                <X className="h-3 w-3" />
                <span className="sr-only">Remove filter</span>
              </Button>
            </Badge>
          ))}
          {activeFilters.length > 0 && (
            <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={clearAllFilters}>
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Full-width molecules list */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full max-w-md grid grid-cols-4">
          <TabsTrigger value="all">All Molecules</TabsTrigger>
          <TabsTrigger value="verified">Verified</TabsTrigger>
          <TabsTrigger value="recent">Recently Added</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <MoleculesList />
        </TabsContent>
        <TabsContent value="verified" className="mt-4">
          <MoleculesList filter="verified" />
        </TabsContent>
        <TabsContent value="recent" className="mt-4">
          <MoleculesList filter="recent" />
        </TabsContent>
        <TabsContent value="favorites" className="mt-4">
          <MoleculesList filter="favorites" />
        </TabsContent>
      </Tabs>

      {/* Client-side only component */}
      <PubChemImportDialog />
    </DashboardShell>
  )
}

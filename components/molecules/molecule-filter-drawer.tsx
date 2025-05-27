"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { MoleculeFilters } from "@/components/molecules/molecule-filters"
import { Badge } from "@/components/ui/badge"

interface MoleculeFilterDrawerProps {
  children: React.ReactNode
}

export function MoleculeFilterDrawer({ children }: MoleculeFilterDrawerProps) {
  const [open, setOpen] = useState(false)
  const [activeFiltersCount, setActiveFiltersCount] = useState(0)

  // This would be connected to your actual filter state in a real implementation
  useEffect(() => {
    // Simulate getting active filters count from somewhere
    setActiveFiltersCount(3)
  }, [])

  const applyFilters = () => {
    // In a real implementation, this would apply the selected filters
    console.log("Applying filters")
    // Then update your filter state or trigger a refetch
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="relative">
          {children}
          {activeFiltersCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center rounded-full">
              {activeFiltersCount}
            </Badge>
          )}
        </div>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Refine Search</SheetTitle>
          <SheetDescription>Filter molecules by key cryoprotectant properties</SheetDescription>
        </SheetHeader>
        <div className="py-6 overflow-y-auto max-h-[calc(100vh-12rem)]">
          <MoleculeFilters />
        </div>
        <SheetFooter>
          <Button
            onClick={() => {
              // Apply the filters
              applyFilters()
              // Close the drawer
              setOpen(false)
            }}
          >
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

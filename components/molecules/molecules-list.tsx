"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Eye,
  Edit,
  Trash2,
  Search,
  Download,
  ArrowUpDown,
  Star,
  StarOff,
  Check,
  Plus,
  BarChart2,
  ImportIcon as FileImport,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { MoleculeIcon } from "@/components/icons/molecule-icon"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

interface MoleculesListProps {
  filter?: string
}

export function MoleculesList({ filter }: MoleculesListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [favorites, setFavorites] = useState<string[]>(["mol-001", "mol-003"])

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [totalPages, setTotalPages] = useState(1)

  // Selection state for batch actions
  const [selectedMolecules, setSelectedMolecules] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)

  // Sample data for molecules with added LogP and TPSA values
  const molecules = [
    {
      id: "mol-001",
      name: "Dimethyl Sulfoxide",
      formula: "C₂H₆OS",
      molecularWeight: 78.13,
      structure: "/molecules/dmso.svg",
      properties: {
        freezingPoint: 18.5,
        molarConcentration: 14.1,
        viscosity: 1.996,
        toxicity: 3,
        permeability: 85,
        osmolality: 1000,
        logP: -1.35,
        tpsa: 36.28,
      },
      isVerified: true,
      createdAt: "2023-01-15T00:00:00Z",
      updatedAt: "2023-03-20T00:00:00Z",
    },
    {
      id: "mol-002",
      name: "Glycerol",
      formula: "C₃H₈O₃",
      molecularWeight: 92.09,
      structure: "/molecules/glycerol.svg",
      properties: {
        freezingPoint: 17.8,
        molarConcentration: 13.7,
        viscosity: 1.412,
        toxicity: 1,
        permeability: 65,
        osmolality: 850,
        logP: -1.76,
        tpsa: 60.69,
      },
      isVerified: true,
      createdAt: "2023-01-20T00:00:00Z",
      updatedAt: "2023-03-22T00:00:00Z",
    },
    {
      id: "mol-003",
      name: "Ethylene Glycol",
      formula: "C₂H₆O₂",
      molecularWeight: 62.07,
      structure: "/molecules/eg.svg",
      properties: {
        freezingPoint: -12.9,
        molarConcentration: 17.8,
        viscosity: 1.61,
        toxicity: 4,
        permeability: 90,
        osmolality: 1200,
        logP: -1.2,
        tpsa: 40.46,
      },
      isVerified: true,
      createdAt: "2023-02-05T00:00:00Z",
      updatedAt: "2023-03-25T00:00:00Z",
    },
    {
      id: "mol-004",
      name: "Propylene Glycol",
      formula: "C₃H₈O₂",
      molecularWeight: 76.09,
      structure: "/molecules/pg.svg",
      properties: {
        freezingPoint: -59,
        molarConcentration: 13.1,
        viscosity: 0.581,
        toxicity: 2,
        permeability: 75,
        osmolality: 950,
        logP: -0.92,
        tpsa: 40.46,
      },
      isVerified: false,
      createdAt: "2023-02-10T00:00:00Z",
      updatedAt: "2023-03-28T00:00:00Z",
    },
    {
      id: "mol-005",
      name: "Trehalose",
      formula: "C₁₂H₂₂O₁₁",
      molecularWeight: 342.3,
      structure: "/molecules/trehalose.svg",
      properties: {
        freezingPoint: -0.5,
        molarConcentration: 0.6,
        viscosity: 2.12,
        toxicity: 0,
        permeability: 30,
        osmolality: 600,
        logP: -4.23,
        tpsa: 189.53,
      },
      isVerified: true,
      createdAt: "2023-02-15T00:00:00Z",
      updatedAt: "2023-04-01T00:00:00Z",
    },
    {
      id: "mol-006",
      name: "Sucrose",
      formula: "C₁₂H₂₂O₁₁",
      molecularWeight: 342.3,
      structure: "/molecules/sucrose.svg",
      properties: {
        freezingPoint: 186,
        molarConcentration: 0.5,
        viscosity: 2.05,
        toxicity: 0,
        permeability: 25,
        osmolality: 550,
        logP: -3.76,
        tpsa: 189.53,
      },
      isVerified: true,
      createdAt: "2023-02-18T00:00:00Z",
      updatedAt: "2023-04-02T00:00:00Z",
    },
    {
      id: "mol-007",
      name: "Mannitol",
      formula: "C₆H₁₄O₆",
      molecularWeight: 182.17,
      structure: "/molecules/mannitol.svg",
      properties: {
        freezingPoint: 166,
        molarConcentration: 0.8,
        viscosity: 1.38,
        toxicity: 0,
        permeability: 20,
        osmolality: 500,
        logP: -3.1,
        tpsa: 121.38,
      },
      isVerified: true,
      createdAt: "2023-02-20T00:00:00Z",
      updatedAt: "2023-04-03T00:00:00Z",
    },
    {
      id: "mol-008",
      name: "Formamide",
      formula: "CH₃NO",
      molecularWeight: 45.04,
      structure: "/molecules/formamide.svg",
      properties: {
        freezingPoint: 2.55,
        molarConcentration: 25.1,
        viscosity: 3.34,
        toxicity: 5,
        permeability: 70,
        osmolality: 850,
        logP: -1.51,
        tpsa: 43.09,
      },
      isVerified: false,
      createdAt: "2023-02-25T00:00:00Z",
      updatedAt: "2023-04-05T00:00:00Z",
    },
    {
      id: "mol-009",
      name: "Methanol",
      formula: "CH₄O",
      molecularWeight: 32.04,
      structure: "/molecules/methanol.svg",
      properties: {
        freezingPoint: -97.6,
        molarConcentration: 24.7,
        viscosity: 0.544,
        toxicity: 8,
        permeability: 95,
        osmolality: 1100,
        logP: -0.77,
        tpsa: 20.23,
      },
      isVerified: true,
      createdAt: "2023-03-01T00:00:00Z",
      updatedAt: "2023-04-08T00:00:00Z",
    },
    {
      id: "mol-010",
      name: "Ethanol",
      formula: "C₂H₆O",
      molecularWeight: 46.07,
      structure: "/molecules/ethanol.svg",
      properties: {
        freezingPoint: -114.1,
        molarConcentration: 17.1,
        viscosity: 1.074,
        toxicity: 6,
        permeability: 90,
        osmolality: 950,
        logP: -0.31,
        tpsa: 20.23,
      },
      isVerified: true,
      createdAt: "2023-03-05T00:00:00Z",
      updatedAt: "2023-04-10T00:00:00Z",
    },
    {
      id: "mol-011",
      name: "Polyethylene Glycol 400",
      formula: "H(OCH₂CH₂)ₙOH",
      molecularWeight: 400,
      structure: "/molecules/peg400.svg",
      properties: {
        freezingPoint: 4.5,
        molarConcentration: 2.5,
        viscosity: 105.0,
        toxicity: 1,
        permeability: 40,
        osmolality: 300,
        logP: -2.48,
        tpsa: 40.46,
      },
      isVerified: false,
      createdAt: "2023-03-10T00:00:00Z",
      updatedAt: "2023-04-12T00:00:00Z",
    },
    {
      id: "mol-012",
      name: "Dextran 40",
      formula: "(C₆H₁₀O₅)n",
      molecularWeight: 40000,
      structure: "/molecules/dextran.svg",
      properties: {
        freezingPoint: null,
        molarConcentration: 0.025,
        viscosity: 3.0,
        toxicity: 1,
        permeability: 5,
        osmolality: 70,
        logP: null,
        tpsa: null,
      },
      isVerified: true,
      createdAt: "2023-03-15T00:00:00Z",
      updatedAt: "2023-04-15T00:00:00Z",
    },
  ]

  // Filter molecules based on search query and filter type
  const filteredMolecules = molecules
    .filter((molecule) => {
      // Apply search filter
      const matchesSearch =
        molecule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        molecule.formula.toLowerCase().includes(searchQuery.toLowerCase())

      // Apply specific filters
      if (filter === "verified") {
        return matchesSearch && molecule.isVerified
      } else if (filter === "recent") {
        // Consider molecules added in the last 30 days as recent
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        return matchesSearch && new Date(molecule.createdAt) >= thirtyDaysAgo
      } else if (filter === "favorites") {
        return matchesSearch && favorites.includes(molecule.id)
      }

      return matchesSearch
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      } else if (sortBy === "formula") {
        return sortOrder === "asc" ? a.formula.localeCompare(b.formula) : b.formula.localeCompare(a.formula)
      } else if (sortBy === "molecularWeight") {
        return sortOrder === "asc" ? a.molecularWeight - b.molecularWeight : b.molecularWeight - a.molecularWeight
      } else if (sortBy === "freezingPoint") {
        const aVal = a.properties.freezingPoint ?? Number.MIN_SAFE_INTEGER
        const bVal = b.properties.freezingPoint ?? Number.MIN_SAFE_INTEGER
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal
      } else if (sortBy === "permeability") {
        const aVal = a.properties.permeability ?? Number.MIN_SAFE_INTEGER
        const bVal = b.properties.permeability ?? Number.MIN_SAFE_INTEGER
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal
      } else if (sortBy === "toxicity") {
        const aVal = a.properties.toxicity ?? Number.MIN_SAFE_INTEGER
        const bVal = b.properties.toxicity ?? Number.MIN_SAFE_INTEGER
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal
      } else if (sortBy === "logP") {
        const aVal = a.properties.logP ?? Number.MIN_SAFE_INTEGER
        const bVal = b.properties.logP ?? Number.MIN_SAFE_INTEGER
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal
      } else if (sortBy === "tpsa") {
        const aVal = a.properties.tpsa ?? Number.MIN_SAFE_INTEGER
        const bVal = b.properties.tpsa ?? Number.MIN_SAFE_INTEGER
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal
      }
      return 0
    })

  // Calculate pagination
  useEffect(() => {
    setTotalPages(Math.ceil(filteredMolecules.length / itemsPerPage))
    setCurrentPage(1) // Reset to first page when filters change
  }, [filteredMolecules.length, itemsPerPage])

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredMolecules.slice(indexOfFirstItem, indexOfLastItem)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  // Go to first/last page
  const goToFirstPage = () => setCurrentPage(1)
  const goToLastPage = () => setCurrentPage(totalPages)

  const toggleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("asc")
    }
  }

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  const confirmDelete = (id: string) => {
    // In a real implementation, this would show a confirmation dialog
    if (window.confirm("Are you sure you want to delete this molecule?")) {
      // Call your delete API here
      console.log(`Deleting molecule ${id}`)
      // Then update your local state or refetch data
    }
  }

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedMolecules([])
    } else {
      setSelectedMolecules(currentItems.map((molecule) => molecule.id))
    }
    setSelectAll(!selectAll)
  }

  // Handle individual checkbox
  const handleSelect = (id: string) => {
    if (selectedMolecules.includes(id)) {
      setSelectedMolecules(selectedMolecules.filter((moleculeId) => moleculeId !== id))
      setSelectAll(false)
    } else {
      setSelectedMolecules([...selectedMolecules, id])
      // Check if all current page items are now selected
      if (currentItems.length === selectedMolecules.length + 1) {
        setSelectAll(true)
      }
    }
  }

  const { toast } = useToast()

  // Handle batch actions
  const handleBatchAction = (action: string) => {
    if (selectedMolecules.length === 0) {
      toast({
        title: "No molecules selected",
        description: "Please select at least one molecule to perform this action.",
        variant: "destructive",
      })
      return
    }

    switch (action) {
      case "compare":
        console.log(`Comparing molecules: ${selectedMolecules.join(", ")}`)
        // Navigate to comparison page with selected molecules
        break
      case "addToMixture":
        console.log(`Adding molecules to mixture: ${selectedMolecules.join(", ")}`)
        // Open add to mixture dialog
        break
      case "export":
        console.log(`Exporting molecules: ${selectedMolecules.join(", ")}`)
        // Export selected molecules
        break
      case "delete":
        if (window.confirm(`Are you sure you want to delete ${selectedMolecules.length} molecules?`)) {
          console.log(`Deleting molecules: ${selectedMolecules.join(", ")}`)
          // Delete selected molecules
        }
        break
      default:
        break
    }
  }

  // Import from PubChem
  const importFromPubChem = () => {
    console.log("Importing from PubChem")
    // Open import dialog
  }

  return (
    <Card className="w-full">
      <CardContent className="p-0 sm:p-0">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 pb-2 gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search molecules..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={String(itemsPerPage)} onValueChange={(value) => setItemsPerPage(Number(value))}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Items per page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 per page</SelectItem>
                <SelectItem value="10">10 per page</SelectItem>
                <SelectItem value="20">20 per page</SelectItem>
                <SelectItem value="50">50 per page</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <Button variant="outline" size="sm" onClick={() => importFromPubChem()}>
              <FileImport className="mr-2 h-4 w-4" />
              Import from PubChem
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" disabled={selectedMolecules.length === 0}>
                  <Plus className="mr-2 h-4 w-4" />
                  Actions ({selectedMolecules.length})
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleBatchAction("compare")}>
                  <BarChart2 className="mr-2 h-4 w-4" />
                  Compare Selected
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBatchAction("addToMixture")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add to Mixture
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleBatchAction("export")}>
                  <Download className="mr-2 h-4 w-4" />
                  Export Selected
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBatchAction("delete")} className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Selected
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="text-sm text-muted-foreground px-4 pb-2">
          Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredMolecules.length)} of{" "}
          {filteredMolecules.length} molecules
        </div>

        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox
                      checked={selectAll && currentItems.length > 0}
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all molecules"
                    />
                  </TableHead>
                  <TableHead className="w-[40px]"></TableHead>
                  <TableHead>
                    <Button variant="ghost" className="p-0 h-8 font-medium" onClick={() => toggleSort("name")}>
                      Name
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" className="p-0 h-8 font-medium" onClick={() => toggleSort("formula")}>
                      Formula
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="p-0 h-8 font-medium"
                      onClick={() => toggleSort("molecularWeight")}
                    >
                      MW (g/mol)
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" className="p-0 h-8 font-medium" onClick={() => toggleSort("freezingPoint")}>
                      Freezing Point (°C)
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" className="p-0 h-8 font-medium" onClick={() => toggleSort("logP")}>
                      LogP
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" className="p-0 h-8 font-medium" onClick={() => toggleSort("tpsa")}>
                      TPSA (Å²)
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.length > 0 ? (
                  currentItems.map((molecule) => (
                    <TableRow key={molecule.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedMolecules.includes(molecule.id)}
                          onCheckedChange={() => handleSelect(molecule.id)}
                          aria-label={`Select ${molecule.name}`}
                        />
                      </TableCell>
                      <TableCell>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => toggleFavorite(molecule.id)}
                              >
                                {favorites.includes(molecule.id) ? (
                                  <Star className="h-4 w-4 text-amber-500" />
                                ) : (
                                  <StarOff className="h-4 w-4 text-muted-foreground" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {favorites.includes(molecule.id) ? "Remove from favorites" : "Add to favorites"}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="font-medium flex items-center gap-2">
                        <MoleculeIcon className="h-4 w-4 text-blue-500" />
                        {molecule.name}
                        {molecule.isVerified && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                                  <Check className="mr-1 h-3 w-3" />
                                  Verified
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>Data verified by research team</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </TableCell>
                      <TableCell className="font-mono">{molecule.formula}</TableCell>
                      <TableCell className="font-mono">{molecule.molecularWeight.toFixed(2)}</TableCell>
                      <TableCell className="font-mono">
                        {molecule.properties.freezingPoint !== null
                          ? molecule.properties.freezingPoint.toFixed(1)
                          : "—"}
                      </TableCell>
                      <TableCell className="font-mono">
                        {molecule.properties.logP !== null ? molecule.properties.logP.toFixed(2) : "—"}
                      </TableCell>
                      <TableCell className="font-mono">
                        {molecule.properties.tpsa !== null ? molecule.properties.tpsa.toFixed(2) : "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                                  <Link href={`/molecules/${molecule.id}`}>
                                    <Eye className="h-4 w-4" />
                                  </Link>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>View Details</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                                  <Link href={`/molecules/${molecule.id}/edit`}>
                                    <Edit className="h-4 w-4" />
                                  </Link>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Edit Molecule</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleBatchAction("addToMixture")}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Add to Mixture</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <BarChart2 className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleSelect(molecule.id)}>
                                Select for Comparison
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/molecules/compare?ids=${molecule.id}`}>Quick Compare</Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => confirmDelete(molecule.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Delete Molecule</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      No molecules found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-4">
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={goToFirstPage}
                disabled={currentPage === 1}
                className="h-8 w-8"
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex items-center">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Show pages around current page
                  let pageNum = currentPage
                  if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }

                  // Ensure page numbers are within valid range
                  if (pageNum > 0 && pageNum <= totalPages) {
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="icon"
                        onClick={() => paginate(pageNum)}
                        className="h-8 w-8 mx-0.5"
                      >
                        {pageNum}
                      </Button>
                    )
                  }
                  return null
                })}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={goToLastPage}
                disabled={currentPage === totalPages}
                className="h-8 w-8"
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

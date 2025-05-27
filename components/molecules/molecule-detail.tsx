"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MoleculeIcon } from "@/components/icons/molecule-icon"
import { Check, Star, StarOff, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface MoleculeDetailProps {
  id: string
}

export function MoleculeDetail({ id }: MoleculeDetailProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  // Sample data for the molecule
  const molecule = {
    id: "mol-001",
    name: "Dimethyl Sulfoxide",
    formula: "C₂H₆OS",
    molecularWeight: 78.13,
    smiles: "CS(=O)C",
    inchi: "InChI=1S/C2H6OS/c1-4(2)3/h1-2H3",
    inchiKey: "IAZDPXIOMUYVGZ-UHFFFAOYSA-N",
    source: "PubChem",
    sourceId: "CID: 679",
    sourceUrl: "https://pubchem.ncbi.nlm.nih.gov/compound/679",
    isVerified: true,
    createdAt: "2023-01-15T00:00:00Z",
    updatedAt: "2023-03-20T00:00:00Z",
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MoleculeIcon className="h-5 w-5 text-blue-500" />
            <CardTitle>{molecule.name}</CardTitle>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsFavorite(!isFavorite)}>
                  {isFavorite ? (
                    <Star className="h-4 w-4 text-amber-500" />
                  ) : (
                    <StarOff className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isFavorite ? "Remove from favorites" : "Add to favorites"}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription>Cryoprotectant molecule details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Basic information */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Formula</span>
              <span className="text-sm font-mono">{molecule.formula}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Molecular Weight</span>
              <span className="text-sm font-mono">{molecule.molecularWeight} g/mol</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Status</span>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Check className="mr-1 h-3 w-3" />
                Verified
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Identifiers */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Identifiers</h3>
            <div className="grid grid-cols-[1fr_2fr] gap-2 text-sm">
              <span className="text-muted-foreground">SMILES</span>
              <span className="font-mono text-xs overflow-hidden text-ellipsis">{molecule.smiles}</span>
              <span className="text-muted-foreground">InChI</span>
              <span className="font-mono text-xs overflow-hidden text-ellipsis">{molecule.inchi}</span>
              <span className="text-muted-foreground">InChI Key</span>
              <span className="font-mono text-xs">{molecule.inchiKey}</span>
            </div>
          </div>

          <Separator />

          {/* Source information */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Source</h3>
            <div className="grid grid-cols-[1fr_2fr] gap-2 text-sm">
              <span className="text-muted-foreground">Database</span>
              <span>{molecule.source}</span>
              <span className="text-muted-foreground">Identifier</span>
              <span>{molecule.sourceId}</span>
              <span className="text-muted-foreground">Link</span>
              <a
                href={molecule.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center"
              >
                View in PubChem
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>

          <Separator />

          {/* Metadata */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Metadata</h3>
            <div className="grid grid-cols-[1fr_2fr] gap-2 text-sm">
              <span className="text-muted-foreground">Added</span>
              <span>{new Date(molecule.createdAt).toLocaleDateString()}</span>
              <span className="text-muted-foreground">Last Updated</span>
              <span>{new Date(molecule.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

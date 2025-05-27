"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

interface MoleculeStructurePreviewProps {
  smiles: string
  name: string
}

export function MoleculeStructurePreview({ smiles, name }: MoleculeStructurePreviewProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Reset states when SMILES changes
    setIsLoading(true)
    setError(null)

    // Skip rendering if no SMILES is provided
    if (!smiles) {
      setIsLoading(false)
      return
    }

    // In a real implementation, this would use a chemistry visualization library
    // like RDKit.js, 3DMol.js, or ChemDoodle Web Components
    // For now, we'll simulate loading with a timeout
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [smiles])

  if (!smiles) {
    return (
      <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
        <p className="text-muted-foreground text-sm">Enter a SMILES notation to visualize the molecular structure</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="h-[300px] flex flex-col items-center justify-center bg-muted/20 rounded-md">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
        <p className="text-muted-foreground text-sm">Loading molecular structure...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
        <p className="text-destructive text-sm">{error}</p>
      </div>
    )
  }

  // In a real implementation, this would render a 3D molecular structure
  // For now, we'll render a placeholder
  return (
    <div className="h-[300px] bg-muted/20 rounded-md flex items-center justify-center">
      <div className="text-center">
        <div className="mx-auto w-32 h-32 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
          <span className="text-lg font-mono">{name || "Molecule"}</span>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">SMILES: {smiles}</p>
        <p className="mt-2 text-xs text-muted-foreground">3D molecular structure visualization would appear here</p>
      </div>
    </div>
  )
}

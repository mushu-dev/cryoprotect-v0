"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import type { Molecule, MolecularProperty } from "@/types/models"
import { useMolecule, useMoleculeProperties } from "@/lib/api/molecules"

interface MoleculeContextType {
  molecule: Molecule | null
  properties: MolecularProperty[]
  isLoading: boolean
  isError: boolean
  error: Error | null
  setMoleculeId: (id: string | null) => void
}

const MoleculeContext = createContext<MoleculeContextType | undefined>(undefined)

export function MoleculeProvider({ children }: { children: React.ReactNode }) {
  const [moleculeId, setMoleculeId] = useState<string | null>(null)

  const {
    data: molecule,
    isLoading: isLoadingMolecule,
    isError: isErrorMolecule,
    error: moleculeError,
  } = useMolecule(moleculeId || "")

  const {
    data: properties = [],
    isLoading: isLoadingProperties,
    isError: isErrorProperties,
    error: propertiesError,
  } = useMoleculeProperties(moleculeId || "")

  const isLoading = isLoadingMolecule || isLoadingProperties
  const isError = isErrorMolecule || isErrorProperties
  const error = moleculeError || propertiesError

  const setMoleculeIdCallback = useCallback((id: string | null) => {
    setMoleculeId(id)
  }, [])

  const value = {
    molecule: molecule || null,
    properties: properties || [],
    isLoading,
    isError,
    error: error as Error | null,
    setMoleculeId: setMoleculeIdCallback,
  }

  return <MoleculeContext.Provider value={value}>{children}</MoleculeContext.Provider>
}

export function useMoleculeContext() {
  const context = useContext(MoleculeContext)
  if (context === undefined) {
    throw new Error("useMoleculeContext must be used within a MoleculeProvider")
  }
  return context
}

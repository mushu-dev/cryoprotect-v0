"use client"

import { useState, useEffect } from "react"
import { searchMolecules, type MoleculeFilters } from "../api/molecules"
import type { Molecule } from "../supabase"

export function useMolecules(filters: MoleculeFilters = {}) {
  const [molecules, setMolecules] = useState<Molecule[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    async function fetchMolecules() {
      try {
        setLoading(true)
        setError(null)
        const result = await searchMolecules(filters)
        setMolecules(result.molecules)
        setTotal(result.total)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch molecules")
      } finally {
        setLoading(false)
      }
    }

    fetchMolecules()
  }, [JSON.stringify(filters)])

  return { molecules, loading, error, total }
}

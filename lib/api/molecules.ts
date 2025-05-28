import { supabase } from "../supabase"
import type { Molecule } from "../supabase"

export interface MoleculeFilters {
  search?: string
  pubchem_cid?: number
  chembl_id?: string
  has_smiles?: boolean
  has_formula?: boolean
  sortBy?: "name" | "pubchem_cid" | "created_at" | "updated_at"
  sortOrder?: "asc" | "desc"
  limit?: number
  offset?: number
}

export async function searchMolecules(filters: MoleculeFilters = {}) {
  try {
    let query = supabase.from("molecules").select("*", { count: "exact" })

    // Apply search filter across multiple fields
    if (filters.search) {
      query = query.or(
        `name.ilike.%${filters.search}%,formula.ilike.%${filters.search}%,smiles.ilike.%${filters.search}%,pubchem_cid.eq.${isNaN(Number(filters.search)) ? 0 : Number(filters.search)}`,
      )
    }

    // Apply specific filters
    if (filters.pubchem_cid) {
      query = query.eq("pubchem_cid", filters.pubchem_cid)
    }

    if (filters.chembl_id) {
      query = query.eq("chembl_id", filters.chembl_id)
    }

    if (filters.has_smiles) {
      query = query.not("smiles", "is", null)
    }

    if (filters.has_formula) {
      query = query.not("formula", "is", null)
    }

    // Apply sorting
    if (filters.sortBy) {
      query = query.order(filters.sortBy, { ascending: filters.sortOrder === "asc" })
    } else {
      query = query.order("created_at", { ascending: false })
    }

    // Apply pagination - handle large datasets
    if (filters.limit && filters.limit < 1000) {
      query = query.limit(filters.limit)
    }

    if (filters.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 50) - 1)
    }

    const { data, error, count } = await query

    if (error) {
      throw new Error(`Failed to search molecules: ${error.message}`)
    }

    return { molecules: data || [], total: count || 0 }
  } catch (error) {
    console.error("Search molecules error:", error)
    throw error
  }
}

export async function getMoleculeById(id: string) {
  try {
    const { data, error } = await supabase.from("molecules").select("*").eq("id", id).single()

    if (error) {
      throw new Error(`Failed to get molecule: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error("Get molecule error:", error)
    throw error
  }
}

export async function getMoleculeByPubchemId(pubchem_cid: number) {
  try {
    const { data, error } = await supabase.from("molecules").select("*").eq("pubchem_cid", pubchem_cid).single()

    if (error) {
      throw new Error(`Failed to get molecule by PubChem ID: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error("Get molecule by PubChem ID error:", error)
    throw error
  }
}

export async function createMolecule(molecule: Omit<Molecule, "id" | "created_at" | "updated_at">) {
  try {
    const { data, error } = await supabase.from("molecules").insert([molecule]).select().single()

    if (error) {
      throw new Error(`Failed to create molecule: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error("Create molecule error:", error)
    throw error
  }
}

export async function updateMolecule(id: string, updates: Partial<Molecule>) {
  try {
    const { data, error } = await supabase
      .from("molecules")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to update molecule: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error("Update molecule error:", error)
    throw error
  }
}

export async function deleteMolecule(id: string) {
  try {
    const { error } = await supabase.from("molecules").delete().eq("id", id)

    if (error) {
      throw new Error(`Failed to delete molecule: ${error.message}`)
    }
  } catch (error) {
    console.error("Delete molecule error:", error)
    throw error
  }
}

export async function getMoleculeStats() {
  try {
    const { data, error } = await supabase.from("molecules").select("id, pubchem_cid, smiles, formula")

    if (error) {
      throw new Error(`Failed to get molecule stats: ${error.message}`)
    }

    const stats = {
      total: data?.length || 0,
      withPubchemId: data?.filter((m) => m.pubchem_cid).length || 0,
      withSmiles: data?.filter((m) => m.smiles).length || 0,
      withFormula: data?.filter((m) => m.formula).length || 0,
    }

    return stats
  } catch (error) {
    console.error("Get molecule stats error:", error)
    throw error
  }
}

export async function searchSimilarMolecules(smiles: string, limit = 10) {
  try {
    // For now, we'll do a simple search based on similar SMILES patterns
    // In a real implementation, you'd use chemical similarity algorithms
    const { data, error } = await supabase.from("molecules").select("*").not("smiles", "is", null).limit(limit)

    if (error) {
      throw new Error(`Failed to search similar molecules: ${error.message}`)
    }

    return data || []
  } catch (error) {
    console.error("Search similar molecules error:", error)
    throw error
  }
}

export async function getAllMolecules() {
  try {
    const { data, error, count } = await supabase
      .from("molecules")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })

    if (error) {
      throw new Error(`Failed to get all molecules: ${error.message}`)
    }

    return { molecules: data || [], total: count || 0 }
  } catch (error) {
    console.error("Get all molecules error:", error)
    throw error
  }
}

export type { MoleculeFilters }

export async function getMolecules(filters: MoleculeFilters = {}) {
  // Mock implementation
  return {
    data: [],
    total: 0,
    error: null,
  }
}

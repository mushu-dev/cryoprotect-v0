export interface Molecule {
  id: string
  name: string
  formula: string
  smiles?: string
  pubchem_cid?: string
  created_at: string
}

export interface MoleculeFilters {
  limit?: number
  offset?: number
  search?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

// Mock implementation for now
export const supabase = {
  from: (table: string) => ({
    select: () => ({
      data: [],
      error: null,
    }),
    insert: () => ({
      data: [],
      error: null,
    }),
    update: () => ({
      data: [],
      error: null,
    }),
    delete: () => ({
      data: [],
      error: null,
    }),
  }),
}

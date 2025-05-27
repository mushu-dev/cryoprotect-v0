import { createClient } from "@supabase/supabase-js"

// Environment variables - now properly configured
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Generic database types - we'll adapt these based on your actual schema
export interface DatabaseRow {
  id: string | number
  created_at?: string
  updated_at?: string
  [key: string]: any
}

// Updated Molecule interface to match your table structure
export interface Molecule {
  id: string
  name: string
  pubchem_cid: number | null
  chembl_id: string | null
  smiles: string | null
  inchi: string | null
  inchi_key: string | null
  formula: string | null
  created_at: string
  updated_at: string
}

export interface Prediction extends DatabaseRow {
  molecule_id?: string | number
  model_name?: string
  prediction_type?: string
  prediction_value?: number
  confidence_score?: number
  insights?: string[]
  recommendations?: string[]
}

export interface Experiment extends DatabaseRow {
  molecule_id?: string | number
  researcher_id?: string | number
  protocol_id?: string | number
  conditions?: Record<string, any>
  results?: Record<string, any>
  success_rate?: number
  notes?: string
  status?: string
}

export interface ResearchTeam extends DatabaseRow {
  name?: string
  description?: string
  created_by?: string | number
  members?: TeamMember[]
}

export interface TeamMember extends DatabaseRow {
  team_id?: string | number
  user_id?: string | number
  role?: string
  joined_at?: string
}

export interface Collection extends DatabaseRow {
  name?: string
  description?: string
  team_id?: string | number
  created_by?: string | number
  is_public?: boolean
  molecule_ids?: (string | number)[]
}

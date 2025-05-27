export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      molecules: {
        Row: {
          id: string
          name: string
          smiles: string
          inchi: string
          inchikey: string
          formula: string
          molecular_weight: number
          source: string
          source_id: string | null
          source_url: string | null
          is_verified: boolean
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          smiles: string
          inchi: string
          inchikey: string
          formula: string
          molecular_weight: number
          source: string
          source_id?: string | null
          source_url?: string | null
          is_verified?: boolean
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          smiles?: string
          inchi?: string
          inchikey?: string
          formula?: string
          molecular_weight?: number
          source?: string
          source_id?: string | null
          source_url?: string | null
          is_verified?: boolean
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      molecular_properties: {
        Row: {
          id: string
          molecule_id: string
          property_type: string
          value: number
          unit: string
          temperature: number | null
          temperature_unit: string | null
          pressure: number | null
          pressure_unit: string | null
          method_id: string | null
          is_experimental: boolean
          source: string | null
          confidence: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          molecule_id: string
          property_type: string
          value: number
          unit: string
          temperature?: number | null
          temperature_unit?: string | null
          pressure?: number | null
          pressure_unit?: string | null
          method_id?: string | null
          is_experimental?: boolean
          source?: string | null
          confidence?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          molecule_id?: string
          property_type?: string
          value?: number
          unit?: string
          temperature?: number | null
          temperature_unit?: string | null
          pressure?: number | null
          pressure_unit?: string | null
          method_id?: string | null
          is_experimental?: boolean
          source?: string | null
          confidence?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      mixtures: {
        Row: {
          id: string
          name: string
          description: string | null
          project_id: string | null
          is_public: boolean
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          project_id?: string | null
          is_public?: boolean
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          project_id?: string | null
          is_public?: boolean
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      mixture_components: {
        Row: {
          id: string
          mixture_id: string
          molecule_id: string
          amount: number
          amount_unit: string
          role: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          mixture_id: string
          molecule_id: string
          amount: number
          amount_unit: string
          role?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          mixture_id?: string
          molecule_id?: string
          amount?: number
          amount_unit?: string
          role?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      experiments: {
        Row: {
          id: string
          name: string
          description: string | null
          mixture_id: string
          preparation_protocol: string | null
          temperature: number
          temperature_unit: string
          pressure: number
          pressure_unit: string
          status: string
          start_date: string | null
          end_date: string | null
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          mixture_id: string
          preparation_protocol?: string | null
          temperature: number
          temperature_unit: string
          pressure: number
          pressure_unit: string
          status: string
          start_date?: string | null
          end_date?: string | null
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          mixture_id?: string
          preparation_protocol?: string | null
          temperature?: number
          temperature_unit?: string
          pressure?: number
          pressure_unit?: string
          status?: string
          start_date?: string | null
          end_date?: string | null
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      experiment_properties: {
        Row: {
          id: string
          experiment_id: string
          property_type: string
          value: number
          unit: string
          method_id: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          experiment_id: string
          property_type: string
          value: number
          unit: string
          method_id?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          experiment_id?: string
          property_type?: string
          value?: number
          unit?: string
          method_id?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      predictions: {
        Row: {
          id: string
          molecule_id: string
          property_type: string
          predicted_value: number
          unit: string
          method_id: string
          model_version: string
          confidence: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          molecule_id: string
          property_type: string
          predicted_value: number
          unit: string
          method_id: string
          model_version: string
          confidence: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          molecule_id?: string
          property_type?: string
          predicted_value?: number
          unit?: string
          method_id?: string
          model_version?: string
          confidence?: number
          created_at?: string
          updated_at?: string
        }
      }
      protocols: {
        Row: {
          id: string
          mixture_id: string
          name: string
          description: string | null
          temperature_min: number | null
          temperature_max: number | null
          temperature_unit: string | null
          steps: Json
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          mixture_id: string
          name: string
          description?: string | null
          temperature_min?: number | null
          temperature_max?: number | null
          temperature_unit?: string | null
          steps: Json
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          mixture_id?: string
          name?: string
          description?: string | null
          temperature_min?: number | null
          temperature_max?: number | null
          temperature_unit?: string | null
          steps?: Json
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

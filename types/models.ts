// Base types for common fields
export interface BaseModel {
  id: string
  created_at: string
  updated_at: string
}

// Molecule model
export interface Molecule extends BaseModel {
  name: string
  smiles: string
  inchi: string
  inchikey: string
  formula: string
  molecular_weight: number
  source: string
  source_id?: string
  source_url?: string
  is_verified: boolean
  notes?: string
}

// MolecularProperty model
export interface MolecularProperty extends BaseModel {
  molecule_id: string
  property_type: MolecularPropertyType
  value: number
  unit: string
  temperature?: number
  temperature_unit?: string
  pressure?: number
  pressure_unit?: string
  method_id?: string
  is_experimental: boolean
  source?: string
  confidence?: number

  // Relations
  molecule?: Molecule
}

// Mixture model
export interface Mixture extends BaseModel {
  name: string
  description?: string
  project_id?: string
  is_public: boolean
  created_by: string

  // Relations
  components?: MixtureComponent[]
}

// MixtureComponent model
export interface MixtureComponent extends BaseModel {
  mixture_id: string
  molecule_id: string
  amount: number
  amount_unit: string
  role?: string

  // Relations
  mixture?: Mixture
  molecule?: Molecule
}

// Experiment model
export interface Experiment extends BaseModel {
  name: string
  description?: string
  mixture_id: string
  preparation_protocol?: string
  temperature: number
  temperature_unit: string
  pressure: number
  pressure_unit: string
  status: ExperimentStatus
  start_date?: string
  end_date?: string
  created_by: string

  // Relations
  mixture?: Mixture
  properties?: ExperimentProperty[]
}

// ExperimentProperty model
export interface ExperimentProperty extends BaseModel {
  experiment_id: string
  property_type: ExperimentPropertyType
  value: number
  unit: string
  method_id?: string
  notes?: string

  // Relations
  experiment?: Experiment
}

// Prediction model
export interface Prediction extends BaseModel {
  molecule_id: string
  property_type: MolecularPropertyType
  predicted_value: number
  unit: string
  method_id: string
  model_version: string
  confidence: number

  // Relations
  molecule?: Molecule
}

// Protocol model
export interface Protocol extends BaseModel {
  mixture_id: string
  name: string
  description?: string
  temperature_min?: number
  temperature_max?: number
  temperature_unit?: string
  steps: ProtocolStep[]
  created_by: string

  // Relations
  mixture?: Mixture
}

// Protocol step
export interface ProtocolStep {
  id: string
  name: string
  description?: string
  duration: number
  duration_unit: string
  temperature?: number
  temperature_unit?: string
  action: string
}

// Enums
export enum MolecularPropertyType {
  FREEZING_POINT = "freezing_point",
  GLASS_TRANSITION = "glass_transition",
  VISCOSITY = "viscosity",
  TOXICITY = "toxicity",
  PERMEABILITY = "permeability",
  OSMOLALITY = "osmolality",
  DENSITY = "density",
  MOLECULAR_WEIGHT = "molecular_weight",
  SOLUBILITY = "solubility",
  PARTITION_COEFFICIENT = "partition_coefficient",
  OTHER = "other",
}

export enum ExperimentPropertyType {
  VIABILITY = "viability",
  RECOVERY = "recovery",
  MEMBRANE_INTEGRITY = "membrane_integrity",
  METABOLIC_ACTIVITY = "metabolic_activity",
  PROLIFERATION = "proliferation",
  DIFFERENTIATION = "differentiation",
  ICE_FORMATION = "ice_formation",
  OTHER = "other",
}

export enum ExperimentStatus {
  PLANNED = "planned",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  FAILED = "failed",
  CANCELLED = "cancelled",
}

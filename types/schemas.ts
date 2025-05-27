import { z } from "zod"
import { MolecularPropertyType, ExperimentPropertyType, ExperimentStatus } from "./models"

// Base schema for common fields
const baseSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
})

// Molecule schema
export const moleculeSchema = baseSchema.extend({
  name: z.string().min(1).max(255),
  smiles: z.string().min(1),
  inchi: z.string().min(1),
  inchikey: z.string().length(27),
  formula: z.string().min(1).max(255),
  molecular_weight: z.number().positive(),
  source: z.string().min(1).max(255),
  source_id: z.string().optional(),
  source_url: z.string().url().optional(),
  is_verified: z.boolean(),
  notes: z.string().optional(),
})

export type MoleculeSchema = z.infer<typeof moleculeSchema>

// MolecularProperty schema
export const molecularPropertySchema = baseSchema.extend({
  molecule_id: z.string().uuid(),
  property_type: z.nativeEnum(MolecularPropertyType),
  value: z.number(),
  unit: z.string().min(1).max(50),
  temperature: z.number().optional(),
  temperature_unit: z.string().max(50).optional(),
  pressure: z.number().optional(),
  pressure_unit: z.string().max(50).optional(),
  method_id: z.string().optional(),
  is_experimental: z.boolean(),
  source: z.string().optional(),
  confidence: z.number().min(0).max(1).optional(),
})

export type MolecularPropertySchema = z.infer<typeof molecularPropertySchema>

// Mixture schema
export const mixtureSchema = baseSchema.extend({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  project_id: z.string().optional(),
  is_public: z.boolean(),
  created_by: z.string().uuid(),
})

export type MixtureSchema = z.infer<typeof mixtureSchema>

// MixtureComponent schema
export const mixtureComponentSchema = baseSchema.extend({
  mixture_id: z.string().uuid(),
  molecule_id: z.string().uuid(),
  amount: z.number().positive(),
  amount_unit: z.string().min(1).max(50),
  role: z.string().optional(),
})

export type MixtureComponentSchema = z.infer<typeof mixtureComponentSchema>

// Experiment schema
export const experimentSchema = baseSchema.extend({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  mixture_id: z.string().uuid(),
  preparation_protocol: z.string().optional(),
  temperature: z.number(),
  temperature_unit: z.string().min(1).max(50),
  pressure: z.number(),
  pressure_unit: z.string().min(1).max(50),
  status: z.nativeEnum(ExperimentStatus),
  start_date: z.string().datetime().optional(),
  end_date: z.string().datetime().optional(),
  created_by: z.string().uuid(),
})

export type ExperimentSchema = z.infer<typeof experimentSchema>

// ExperimentProperty schema
export const experimentPropertySchema = baseSchema.extend({
  experiment_id: z.string().uuid(),
  property_type: z.nativeEnum(ExperimentPropertyType),
  value: z.number(),
  unit: z.string().min(1).max(50),
  method_id: z.string().optional(),
  notes: z.string().optional(),
})

export type ExperimentPropertySchema = z.infer<typeof experimentPropertySchema>

// Prediction schema
export const predictionSchema = baseSchema.extend({
  molecule_id: z.string().uuid(),
  property_type: z.nativeEnum(MolecularPropertyType),
  predicted_value: z.number(),
  unit: z.string().min(1).max(50),
  method_id: z.string().uuid(),
  model_version: z.string().min(1).max(100),
  confidence: z.number().min(0).max(1),
})

export type PredictionSchema = z.infer<typeof predictionSchema>

// Protocol step schema
export const protocolStepSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  duration: z.number().positive(),
  duration_unit: z.string().min(1).max(50),
  temperature: z.number().optional(),
  temperature_unit: z.string().max(50).optional(),
  action: z.string().min(1),
})

export type ProtocolStepSchema = z.infer<typeof protocolStepSchema>

// Protocol schema
export const protocolSchema = baseSchema.extend({
  mixture_id: z.string().uuid(),
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  temperature_min: z.number().optional(),
  temperature_max: z.number().optional(),
  temperature_unit: z.string().max(50).optional(),
  steps: z.array(protocolStepSchema),
  created_by: z.string().uuid(),
})

export type ProtocolSchema = z.infer<typeof protocolSchema>

// Form schemas (for creating/updating)
export const moleculeFormSchema = moleculeSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
})

export const molecularPropertyFormSchema = molecularPropertySchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
})

export const mixtureFormSchema = mixtureSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
})

export const mixtureComponentFormSchema = mixtureComponentSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
})

export const experimentFormSchema = experimentSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
})

export const experimentPropertyFormSchema = experimentPropertySchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
})

export const predictionFormSchema = predictionSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
})

export const protocolFormSchema = protocolSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
})

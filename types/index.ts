// Molecule type definition
export interface Molecule {
  id: string
  name: string
  formula: string
  molecularWeight: number
  structure: string // URL to molecular structure image or 3D model
  properties: MoleculeProperties
  createdAt: string
  updatedAt: string
}

// Molecule properties
export interface MoleculeProperties {
  freezingPoint: number // in Celsius
  molarConcentration: number // in mol/L
  viscosity: number // in cP (centipoise)
  toxicity: number // scale 0-10
  permeability: number // scale 0-100
  osmolality: number // in mOsm/kg
}

// Mixture of cryoprotectants
export interface Mixture {
  id: string
  name: string
  description: string
  components: MixtureComponent[]
  properties: MixtureProperties
  createdAt: string
  updatedAt: string
}

// Component in a mixture
export interface MixtureComponent {
  moleculeId: string
  moleculeName: string
  concentration: number // in mol/L
  ratio: number // percentage in mixture
}

// Properties of a mixture
export interface MixtureProperties {
  freezingPoint: number
  viscosity: number
  toxicity: number
  permeability: number
  osmolality: number
  glassTransitionTemp: number // in Celsius
}

// Experiment data
export interface Experiment {
  id: string
  title: string
  description: string
  mixtureId: string
  mixtureName: string
  protocol: ExperimentProtocol
  results: ExperimentResults
  status: "planned" | "in-progress" | "completed" | "failed"
  startDate: string
  endDate?: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

// Experiment protocol
export interface ExperimentProtocol {
  steps: ExperimentStep[]
  temperature: number // in Celsius
  duration: number // in minutes
  equipment: string[]
}

// Step in an experiment
export interface ExperimentStep {
  id: string
  name: string
  description: string
  duration: number // in minutes
  temperature: number // in Celsius
  notes?: string
}

// Experiment results
export interface ExperimentResults {
  success: boolean
  viabilityRate: number // percentage
  recoveryRate: number // percentage
  notes: string
  dataPoints: DataPoint[]
}

// Data point in experiment results
export interface DataPoint {
  time: number // in minutes
  temperature: number // in Celsius
  viability: number // percentage
}

// User profile
export interface UserProfile {
  id: string
  email: string
  name: string
  role: "admin" | "researcher" | "viewer"
  organization: string
  createdAt: string
}

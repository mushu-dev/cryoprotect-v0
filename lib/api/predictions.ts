import { supabase } from "../supabase"
import type { Prediction } from "../supabase"

export async function createPrediction(prediction: Omit<Prediction, "id" | "created_at">) {
  const { data, error } = await supabase.from("predictions").insert([prediction]).select().single()

  if (error) {
    throw new Error(`Failed to create prediction: ${error.message}`)
  }

  return data
}

export async function getPredictionsByMolecule(moleculeId: string) {
  const { data, error } = await supabase
    .from("predictions")
    .select("*")
    .eq("molecule_id", moleculeId)
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error(`Failed to get predictions: ${error.message}`)
  }

  return data || []
}

export async function runAIPrediction(moleculeId: string, smiles: string) {
  // Simulate AI prediction - in production, this would call your ML models
  const mockPredictions = [
    {
      molecule_id: moleculeId,
      model_name: "CryoSuccess-AI",
      prediction_type: "success_rate" as const,
      prediction_value: Math.random() * 40 + 60, // 60-100%
      confidence_score: Math.random() * 20 + 80, // 80-100%
      insights: [
        "Optimal molecular weight for cellular uptake",
        "Favorable hydrogen bonding pattern",
        "Low membrane disruption potential",
      ],
      recommendations: [
        "Test at 10-15% concentration",
        "Monitor osmotic stress",
        "Consider combination with trehalose",
      ],
    },
    {
      molecule_id: moleculeId,
      model_name: "ToxPredict",
      prediction_type: "toxicity" as const,
      prediction_value: Math.random() * 30 + 10, // 10-40% (lower is better)
      confidence_score: Math.random() * 15 + 85, // 85-100%
      insights: ["No reactive metabolites predicted", "Low hepatotoxicity risk", "Minimal protein binding"],
      recommendations: ["Safe for in vitro use", "Monitor at high concentrations", "Consider dose-response studies"],
    },
  ]

  // Create predictions in database
  const results = []
  for (const pred of mockPredictions) {
    const result = await createPrediction(pred)
    results.push(result)
  }

  return results
}

export async function getModelAccuracy() {
  // In production, this would calculate real model performance metrics
  return {
    "CryoSuccess-AI": 94.2,
    ToxPredict: 91.8,
    "SAR-Insight": 88.5,
    "Membrane-Perm": 92.1,
  }
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/lib/supabase"
import type { Prediction } from "@/types/models"
import type { predictionFormSchema } from "@/types/schemas"
import type { z } from "zod"

// Query keys
export const predictionKeys = {
  all: ["predictions"] as const,
  lists: () => [...predictionKeys.all, "list"] as const,
  list: (filters: Record<string, any>) => [...predictionKeys.lists(), filters] as const,
  details: () => [...predictionKeys.all, "detail"] as const,
  detail: (id: string) => [...predictionKeys.details(), id] as const,
  molecule: (moleculeId: string) => [...predictionKeys.all, "molecule", moleculeId] as const,
}

// Fetch predictions with optional filters
export const usePredictions = (filters: Record<string, any> = {}) => {
  return useQuery({
    queryKey: predictionKeys.list(filters),
    queryFn: async () => {
      let query = supabase.from("predictions").select(`
        *,
        molecule:molecules(id, name, formula)
      `)

      // Apply filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          query = query.eq(key, value)
        }
      })

      const { data, error } = await query.order("created_at", { ascending: false })

      if (error) throw error
      return data as Prediction[]
    },
  })
}

// Fetch predictions for a specific molecule
export const useMoleculePredictions = (moleculeId: string) => {
  return useQuery({
    queryKey: predictionKeys.molecule(moleculeId),
    queryFn: async () => {
      const { data, error } = await supabase.from("predictions").select("*").eq("molecule_id", moleculeId)

      if (error) throw error
      return data as Prediction[]
    },
    enabled: !!moleculeId,
  })
}

// Fetch a single prediction by ID
export const usePrediction = (id: string) => {
  return useQuery({
    queryKey: predictionKeys.detail(id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("predictions")
        .select(`
          *,
          molecule:molecules(id, name, formula, molecular_weight)
        `)
        .eq("id", id)
        .single()

      if (error) throw error
      return data as Prediction
    },
    enabled: !!id,
  })
}

// Create a new prediction
export const useCreatePrediction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newPrediction: z.infer<typeof predictionFormSchema>) => {
      const { data, error } = await supabase.from("predictions").insert(newPrediction).select().single()

      if (error) throw error
      return data as Prediction
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: predictionKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: predictionKeys.molecule(data.molecule_id),
      })
    },
  })
}

// Update a prediction
export const useUpdatePrediction = (id: string, moleculeId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (updatedPrediction: Partial<z.infer<typeof predictionFormSchema>>) => {
      const { data, error } = await supabase
        .from("predictions")
        .update(updatedPrediction)
        .eq("id", id)
        .select()
        .single()

      if (error) throw error
      return data as Prediction
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: predictionKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: predictionKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: predictionKeys.molecule(moleculeId),
      })
    },
  })
}

// Delete a prediction
export const useDeletePrediction = (moleculeId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("predictions").delete().eq("id", id)

      if (error) throw error
      return id
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: predictionKeys.lists() })
      queryClient.removeQueries({ queryKey: predictionKeys.detail(id) })
      queryClient.invalidateQueries({
        queryKey: predictionKeys.molecule(moleculeId),
      })
    },
  })
}

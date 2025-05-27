import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/lib/supabase"
import type { Experiment, ExperimentProperty } from "@/types/models"
import type { experimentFormSchema, experimentPropertyFormSchema } from "@/types/schemas"
import type { z } from "zod"

// Query keys
export const experimentKeys = {
  all: ["experiments"] as const,
  lists: () => [...experimentKeys.all, "list"] as const,
  list: (filters: Record<string, any>) => [...experimentKeys.lists(), filters] as const,
  details: () => [...experimentKeys.all, "detail"] as const,
  detail: (id: string) => [...experimentKeys.details(), id] as const,
  properties: (experimentId: string) => [...experimentKeys.detail(experimentId), "properties"] as const,
}

// Fetch experiments with optional filters
export const useExperiments = (filters: Record<string, any> = {}) => {
  return useQuery({
    queryKey: experimentKeys.list(filters),
    queryFn: async () => {
      let query = supabase.from("experiments").select(`
        *,
        mixture:mixtures(id, name)
      `)

      // Apply filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          if (key === "name" || key === "description") {
            query = query.ilike(key, `%${value}%`)
          } else {
            query = query.eq(key, value)
          }
        }
      })

      const { data, error } = await query.order("created_at", { ascending: false })

      if (error) throw error
      return data as Experiment[]
    },
  })
}

// Fetch a single experiment by ID
export const useExperiment = (id: string) => {
  return useQuery({
    queryKey: experimentKeys.detail(id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("experiments")
        .select(`
          *,
          mixture:mixtures(
            id, 
            name, 
            description,
            mixture_components:mixture_components(
              id,
              molecule_id,
              amount,
              amount_unit,
              role,
              molecule:molecules(id, name, formula)
            )
          )
        `)
        .eq("id", id)
        .single()

      if (error) throw error
      return data as Experiment
    },
    enabled: !!id,
  })
}

// Fetch experiment properties for an experiment
export const useExperimentProperties = (experimentId: string) => {
  return useQuery({
    queryKey: experimentKeys.properties(experimentId),
    queryFn: async () => {
      const { data, error } = await supabase.from("experiment_properties").select("*").eq("experiment_id", experimentId)

      if (error) throw error
      return data as ExperimentProperty[]
    },
    enabled: !!experimentId,
  })
}

// Create a new experiment
export const useCreateExperiment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newExperiment: z.infer<typeof experimentFormSchema>) => {
      const { data, error } = await supabase.from("experiments").insert(newExperiment).select().single()

      if (error) throw error
      return data as Experiment
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: experimentKeys.lists() })
    },
  })
}

// Update an experiment
export const useUpdateExperiment = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (updatedExperiment: Partial<z.infer<typeof experimentFormSchema>>) => {
      const { data, error } = await supabase
        .from("experiments")
        .update(updatedExperiment)
        .eq("id", id)
        .select()
        .single()

      if (error) throw error
      return data as Experiment
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: experimentKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: experimentKeys.lists() })
    },
  })
}

// Delete an experiment
export const useDeleteExperiment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("experiments").delete().eq("id", id)

      if (error) throw error
      return id
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: experimentKeys.lists() })
      queryClient.removeQueries({ queryKey: experimentKeys.detail(id) })
    },
  })
}

// Create an experiment property
export const useCreateExperimentProperty = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newProperty: z.infer<typeof experimentPropertyFormSchema>) => {
      const { data, error } = await supabase.from("experiment_properties").insert(newProperty).select().single()

      if (error) throw error
      return data as ExperimentProperty
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: experimentKeys.properties(data.experiment_id),
      })
    },
  })
}

// Update an experiment property
export const useUpdateExperimentProperty = (id: string, experimentId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (updatedProperty: Partial<z.infer<typeof experimentPropertyFormSchema>>) => {
      const { data, error } = await supabase
        .from("experiment_properties")
        .update(updatedProperty)
        .eq("id", id)
        .select()
        .single()

      if (error) throw error
      return data as ExperimentProperty
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: experimentKeys.properties(experimentId),
      })
    },
  })
}

// Delete an experiment property
export const useDeleteExperimentProperty = (experimentId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("experiment_properties").delete().eq("id", id)

      if (error) throw error
      return id
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: experimentKeys.properties(experimentId),
      })
    },
  })
}

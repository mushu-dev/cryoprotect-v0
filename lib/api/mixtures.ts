import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/lib/supabase"
import type { Mixture, MixtureComponent } from "@/types/models"
import type { mixtureFormSchema, mixtureComponentFormSchema } from "@/types/schemas"
import type { z } from "zod"

// Query keys
export const mixtureKeys = {
  all: ["mixtures"] as const,
  lists: () => [...mixtureKeys.all, "list"] as const,
  list: (filters: Record<string, any>) => [...mixtureKeys.lists(), filters] as const,
  details: () => [...mixtureKeys.all, "detail"] as const,
  detail: (id: string) => [...mixtureKeys.details(), id] as const,
  components: (mixtureId: string) => [...mixtureKeys.detail(mixtureId), "components"] as const,
}

// Fetch mixtures with optional filters
export const useMixtures = (filters: Record<string, any> = {}) => {
  return useQuery({
    queryKey: mixtureKeys.list(filters),
    queryFn: async () => {
      let query = supabase.from("mixtures").select("*")

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
      return data as Mixture[]
    },
  })
}

// Fetch a single mixture by ID
export const useMixture = (id: string) => {
  return useQuery({
    queryKey: mixtureKeys.detail(id),
    queryFn: async () => {
      const { data, error } = await supabase.from("mixtures").select("*").eq("id", id).single()

      if (error) throw error
      return data as Mixture
    },
    enabled: !!id,
  })
}

// Fetch mixture components for a mixture
export const useMixtureComponents = (mixtureId: string) => {
  return useQuery({
    queryKey: mixtureKeys.components(mixtureId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("mixture_components")
        .select(`
          *,
          molecule:molecules(id, name, formula, molecular_weight)
        `)
        .eq("mixture_id", mixtureId)

      if (error) throw error
      return data as MixtureComponent[]
    },
    enabled: !!mixtureId,
  })
}

// Create a new mixture
export const useCreateMixture = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newMixture: z.infer<typeof mixtureFormSchema>) => {
      const { data, error } = await supabase.from("mixtures").insert(newMixture).select().single()

      if (error) throw error
      return data as Mixture
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mixtureKeys.lists() })
    },
  })
}

// Update a mixture
export const useUpdateMixture = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (updatedMixture: Partial<z.infer<typeof mixtureFormSchema>>) => {
      const { data, error } = await supabase.from("mixtures").update(updatedMixture).eq("id", id).select().single()

      if (error) throw error
      return data as Mixture
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: mixtureKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: mixtureKeys.lists() })
    },
  })
}

// Delete a mixture
export const useDeleteMixture = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("mixtures").delete().eq("id", id)

      if (error) throw error
      return id
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: mixtureKeys.lists() })
      queryClient.removeQueries({ queryKey: mixtureKeys.detail(id) })
    },
  })
}

// Create a mixture component
export const useCreateMixtureComponent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newComponent: z.infer<typeof mixtureComponentFormSchema>) => {
      const { data, error } = await supabase.from("mixture_components").insert(newComponent).select().single()

      if (error) throw error
      return data as MixtureComponent
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: mixtureKeys.components(data.mixture_id),
      })
    },
  })
}

// Update a mixture component
export const useUpdateMixtureComponent = (id: string, mixtureId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (updatedComponent: Partial<z.infer<typeof mixtureComponentFormSchema>>) => {
      const { data, error } = await supabase
        .from("mixture_components")
        .update(updatedComponent)
        .eq("id", id)
        .select()
        .single()

      if (error) throw error
      return data as MixtureComponent
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: mixtureKeys.components(mixtureId),
      })
    },
  })
}

// Delete a mixture component
export const useDeleteMixtureComponent = (mixtureId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("mixture_components").delete().eq("id", id)

      if (error) throw error
      return id
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: mixtureKeys.components(mixtureId),
      })
    },
  })
}

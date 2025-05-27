import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/lib/supabase"
import type { Protocol } from "@/types/models"
import type { protocolFormSchema } from "@/types/schemas"
import type { z } from "zod"

// Query keys
export const protocolKeys = {
  all: ["protocols"] as const,
  lists: () => [...protocolKeys.all, "list"] as const,
  list: (filters: Record<string, any>) => [...protocolKeys.lists(), filters] as const,
  details: () => [...protocolKeys.all, "detail"] as const,
  detail: (id: string) => [...protocolKeys.details(), id] as const,
  mixture: (mixtureId: string) => [...protocolKeys.all, "mixture", mixtureId] as const,
}

// Fetch protocols with optional filters
export const useProtocols = (filters: Record<string, any> = {}) => {
  return useQuery({
    queryKey: protocolKeys.list(filters),
    queryFn: async () => {
      let query = supabase.from("protocols").select(`
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
      return data as Protocol[]
    },
  })
}

// Fetch protocols for a specific mixture
export const useMixtureProtocols = (mixtureId: string) => {
  return useQuery({
    queryKey: protocolKeys.mixture(mixtureId),
    queryFn: async () => {
      const { data, error } = await supabase.from("protocols").select("*").eq("mixture_id", mixtureId)

      if (error) throw error
      return data as Protocol[]
    },
    enabled: !!mixtureId,
  })
}

// Fetch a single protocol by ID
export const useProtocol = (id: string) => {
  return useQuery({
    queryKey: protocolKeys.detail(id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("protocols")
        .select(`
          *,
          mixture:mixtures(id, name, description)
        `)
        .eq("id", id)
        .single()

      if (error) throw error
      return data as Protocol
    },
    enabled: !!id,
  })
}

// Create a new protocol
export const useCreateProtocol = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newProtocol: z.infer<typeof protocolFormSchema>) => {
      const { data, error } = await supabase.from("protocols").insert(newProtocol).select().single()

      if (error) throw error
      return data as Protocol
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: protocolKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: protocolKeys.mixture(data.mixture_id),
      })
    },
  })
}

// Update a protocol
export const useUpdateProtocol = (id: string, mixtureId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (updatedProtocol: Partial<z.infer<typeof protocolFormSchema>>) => {
      const { data, error } = await supabase.from("protocols").update(updatedProtocol).eq("id", id).select().single()

      if (error) throw error
      return data as Protocol
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: protocolKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: protocolKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: protocolKeys.mixture(mixtureId),
      })
    },
  })
}

// Delete a protocol
export const useDeleteProtocol = (mixtureId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("protocols").delete().eq("id", id)

      if (error) throw error
      return id
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: protocolKeys.lists() })
      queryClient.removeQueries({ queryKey: protocolKeys.detail(id) })
      queryClient.invalidateQueries({
        queryKey: protocolKeys.mixture(mixtureId),
      })
    },
  })
}

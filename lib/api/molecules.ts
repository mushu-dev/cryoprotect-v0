import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/lib/supabase"
import type { Molecule, MolecularProperty } from "@/types/models"
import type { moleculeFormSchema, molecularPropertyFormSchema } from "@/types/schemas"
import type { z } from "zod"

// Query keys
export const moleculeKeys = {
  all: ["molecules"] as const,
  lists: () => [...moleculeKeys.all, "list"] as const,
  list: (filters: Record<string, any>) => [...moleculeKeys.lists(), filters] as const,
  details: () => [...moleculeKeys.all, "detail"] as const,
  detail: (id: string) => [...moleculeKeys.details(), id] as const,
  properties: (moleculeId: string) => [...moleculeKeys.detail(moleculeId), "properties"] as const,
}

// Fetch molecules with optional filters
export const useMolecules = (filters: Record<string, any> = {}) => {
  return useQuery({
    queryKey: moleculeKeys.list(filters),
    queryFn: async () => {
      let query = supabase.from("molecules").select("*")

      // Apply filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          if (key === "name" || key === "formula") {
            query = query.ilike(key, `%${value}%`)
          } else {
            query = query.eq(key, value)
          }
        }
      })

      const { data, error } = await query.order("created_at", { ascending: false })

      if (error) throw error
      return data as Molecule[]
    },
  })
}

// Fetch a single molecule by ID
export const useMolecule = (id: string) => {
  return useQuery({
    queryKey: moleculeKeys.detail(id),
    queryFn: async () => {
      const { data, error } = await supabase.from("molecules").select("*").eq("id", id).single()

      if (error) throw error
      return data as Molecule
    },
    enabled: !!id,
  })
}

// Fetch molecular properties for a molecule
export const useMoleculeProperties = (moleculeId: string) => {
  return useQuery({
    queryKey: moleculeKeys.properties(moleculeId),
    queryFn: async () => {
      const { data, error } = await supabase.from("molecular_properties").select("*").eq("molecule_id", moleculeId)

      if (error) throw error
      return data as MolecularProperty[]
    },
    enabled: !!moleculeId,
  })
}

// Create a new molecule
export const useCreateMolecule = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newMolecule: z.infer<typeof moleculeFormSchema>) => {
      const { data, error } = await supabase.from("molecules").insert(newMolecule).select().single()

      if (error) throw error
      return data as Molecule
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: moleculeKeys.lists() })
    },
  })
}

// Update a molecule
export const useUpdateMolecule = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (updatedMolecule: Partial<z.infer<typeof moleculeFormSchema>>) => {
      const { data, error } = await supabase.from("molecules").update(updatedMolecule).eq("id", id).select().single()

      if (error) throw error
      return data as Molecule
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: moleculeKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: moleculeKeys.lists() })
    },
  })
}

// Delete a molecule
export const useDeleteMolecule = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("molecules").delete().eq("id", id)

      if (error) throw error
      return id
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: moleculeKeys.lists() })
      queryClient.removeQueries({ queryKey: moleculeKeys.detail(id) })
    },
  })
}

// Create a molecular property
export const useCreateMolecularProperty = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newProperty: z.infer<typeof molecularPropertyFormSchema>) => {
      const { data, error } = await supabase.from("molecular_properties").insert(newProperty).select().single()

      if (error) throw error
      return data as MolecularProperty
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: moleculeKeys.properties(data.molecule_id),
      })
    },
  })
}

// Update a molecular property
export const useUpdateMolecularProperty = (id: string, moleculeId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (updatedProperty: Partial<z.infer<typeof molecularPropertyFormSchema>>) => {
      const { data, error } = await supabase
        .from("molecular_properties")
        .update(updatedProperty)
        .eq("id", id)
        .select()
        .single()

      if (error) throw error
      return data as MolecularProperty
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: moleculeKeys.properties(moleculeId),
      })
    },
  })
}

// Delete a molecular property
export const useDeleteMolecularProperty = (moleculeId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("molecular_properties").delete().eq("id", id)

      if (error) throw error
      return id
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: moleculeKeys.properties(moleculeId),
      })
    },
  })
}

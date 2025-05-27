"use server"

import { revalidatePath } from "next/cache"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/types/database.types"

export async function createMolecule(formData: FormData) {
  try {
    const supabase = createClientComponentClient<Database>()

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, error: "You must be logged in to add a molecule" }
    }

    // Extract form data
    const name = formData.get("name") as string
    const formula = formData.get("formula") as string
    const smiles = formData.get("smiles") as string
    const inchi = (formData.get("inchi") as string) || null
    const inchikey = (formData.get("inchikey") as string) || null
    const molecularWeight = Number.parseFloat(formData.get("molecularWeight") as string)
    const source = formData.get("source") as string
    const sourceId = (formData.get("sourceId") as string) || null
    const sourceUrl = (formData.get("sourceUrl") as string) || null
    const isVerified = formData.get("isVerified") === "true"
    const notes = (formData.get("notes") as string) || null

    // Insert molecule into database
    const { data, error } = await supabase
      .from("molecules")
      .insert({
        name,
        smiles,
        inchi,
        inchikey,
        formula,
        molecular_weight: molecularWeight,
        source,
        source_id: sourceId,
        source_url: sourceUrl,
        is_verified: isVerified,
        notes,
      })
      .select()
      .single()

    if (error) {
      console.error("Error adding molecule:", error)
      return { success: false, error: error.message }
    }

    // Insert physical properties if provided
    const freezingPoint = formData.get("freezingPoint")
      ? Number.parseFloat(formData.get("freezingPoint") as string)
      : null
    const viscosity = formData.get("viscosity") ? Number.parseFloat(formData.get("viscosity") as string) : null
    const toxicity = formData.get("toxicity") ? Number.parseFloat(formData.get("toxicity") as string) : null
    const permeability = formData.get("permeability") ? Number.parseFloat(formData.get("permeability") as string) : null
    const osmolality = formData.get("osmolality") ? Number.parseFloat(formData.get("osmolality") as string) : null

    if (freezingPoint !== null) {
      await supabase.from("molecular_properties").insert({
        molecule_id: data.id,
        property_type: "freezing_point",
        value: freezingPoint,
        unit: "°C",
        is_experimental: false,
      })
    }

    if (viscosity !== null) {
      await supabase.from("molecular_properties").insert({
        molecule_id: data.id,
        property_type: "viscosity",
        value: viscosity,
        unit: "cP",
        is_experimental: false,
      })
    }

    if (toxicity !== null) {
      await supabase.from("molecular_properties").insert({
        molecule_id: data.id,
        property_type: "toxicity",
        value: toxicity,
        unit: "scale",
        is_experimental: false,
      })
    }

    if (permeability !== null) {
      await supabase.from("molecular_properties").insert({
        molecule_id: data.id,
        property_type: "permeability",
        value: permeability,
        unit: "%",
        is_experimental: false,
      })
    }

    if (osmolality !== null) {
      await supabase.from("molecular_properties").insert({
        molecule_id: data.id,
        property_type: "osmolality",
        value: osmolality,
        unit: "mOsm/kg",
        is_experimental: false,
      })
    }

    // Revalidate the molecules page
    revalidatePath("/molecules")

    return { success: true, data }
  } catch (error) {
    console.error("Error in createMolecule:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

// Update the getMoleculeById function to handle non-UUID IDs

export async function getMoleculeById(id: string) {
  try {
    const supabase = createClientComponentClient<Database>()

    // Check if the ID matches the pattern used in the URL (e.g., mol-001)
    // and convert it to the appropriate format for database queries
    const queryId = id

    // Fetch the molecule - using .eq() which works with any ID format
    const { data: molecule, error: moleculeError } = await supabase
      .from("molecules")
      .select("*")
      .eq("id", queryId)
      .single()

    if (moleculeError) {
      console.error("Error fetching molecule:", moleculeError)
      return { data: null, error: moleculeError.message }
    }

    // Fetch the molecule's properties
    const { data: properties, error: propertiesError } = await supabase
      .from("molecular_properties")
      .select("*")
      .eq("molecule_id", queryId)

    if (propertiesError) {
      console.error("Error fetching molecule properties:", propertiesError)
      // We'll continue even if properties can't be fetched
    }

    // Organize properties by type
    const organizedProperties: Record<string, any> = {}
    if (properties) {
      properties.forEach((prop) => {
        organizedProperties[prop.property_type] = {
          value: prop.value,
          unit: prop.unit,
          id: prop.id,
          is_experimental: prop.is_experimental,
        }
      })
    }

    return {
      data: {
        ...molecule,
        properties: organizedProperties,
      },
      error: null,
    }
  } catch (error) {
    console.error("Error in getMoleculeById:", error)
    return { data: null, error: "An unexpected error occurred" }
  }
}

// Update the updateMolecule function to handle non-UUID IDs

export async function updateMolecule(id: string, formData: FormData) {
  try {
    const supabase = createClientComponentClient<Database>()

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, error: "You must be logged in to update a molecule" }
    }

    // Extract form data
    const name = formData.get("name") as string
    const formula = formData.get("formula") as string
    const smiles = formData.get("smiles") as string
    const inchi = (formData.get("inchi") as string) || null
    const inchikey = (formData.get("inchikey") as string) || null
    const cas = (formData.get("cas") as string) || null
    const molecularWeight = Number.parseFloat(formData.get("molecularWeight") as string)
    const source = formData.get("source") as string
    const sourceId = (formData.get("sourceId") as string) || null
    const sourceUrl = (formData.get("sourceUrl") as string) || null
    const isVerified = formData.get("isVerified") === "true"
    const notes = (formData.get("notes") as string) || null

    // Update molecule in database - using the ID as is
    const { data, error } = await supabase
      .from("molecules")
      .update({
        name,
        smiles,
        inchi,
        inchikey,
        formula,
        molecular_weight: molecularWeight,
        source,
        source_id: sourceId,
        source_url: sourceUrl,
        is_verified: isVerified,
        notes,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating molecule:", error)
      return { success: false, error: error.message }
    }

    // Handle physical properties
    // First, get existing properties
    const { data: existingProperties } = await supabase
      .from("molecular_properties")
      .select("id, property_type")
      .eq("molecule_id", id)

    const existingPropsMap = new Map()
    if (existingProperties) {
      existingProperties.forEach((prop) => {
        existingPropsMap.set(prop.property_type, prop.id)
      })
    }

    // Process each property
    const propertyTypes = [
      { name: "freezingPoint", type: "freezing_point", unit: "°C" },
      { name: "viscosity", type: "viscosity", unit: "cP" },
      { name: "toxicity", type: "toxicity", unit: "scale" },
      { name: "permeability", type: "permeability", unit: "%" },
      { name: "osmolality", type: "osmolality", unit: "mOsm/kg" },
    ]

    for (const prop of propertyTypes) {
      const value = formData.get(prop.name) ? Number.parseFloat(formData.get(prop.name) as string) : null

      if (value !== null) {
        if (existingPropsMap.has(prop.type)) {
          // Update existing property
          await supabase
            .from("molecular_properties")
            .update({
              value,
              updated_at: new Date().toISOString(),
            })
            .eq("id", existingPropsMap.get(prop.type))
        } else {
          // Insert new property
          await supabase.from("molecular_properties").insert({
            molecule_id: id,
            property_type: prop.type,
            value,
            unit: prop.unit,
            is_experimental: false,
          })
        }
      }
    }

    // Revalidate the molecules pages
    revalidatePath("/molecules")
    revalidatePath(`/molecules/${id}`)

    return { success: true, data }
  } catch (error) {
    console.error("Error in updateMolecule:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

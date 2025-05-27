"use client"

import { supabase } from "./supabase"

export async function inspectDatabase() {
  try {
    // Get list of all tables
    const { data: tables, error: tablesError } = await supabase
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_schema", "public")

    if (tablesError) {
      console.log("Trying alternative method to inspect tables...")

      // Try to query some common table names to see what exists
      const commonTables = [
        "molecules",
        "compounds",
        "chemicals",
        "substances",
        "materials",
        "data",
        "research",
        "experiments",
        "users",
        "projects",
      ]
      const existingTables = []

      for (const tableName of commonTables) {
        try {
          const { data, error } = await supabase.from(tableName).select("*").limit(1)
          if (!error) {
            existingTables.push(tableName)
            console.log(`✅ Found table: ${tableName}`)

            // Get column info
            if (data && data.length > 0) {
              console.log(`Columns in ${tableName}:`, Object.keys(data[0]))
            }
          }
        } catch (e) {
          // Table doesn't exist, continue
        }
      }

      return { tables: existingTables, error: null }
    }

    console.log("Available tables:", tables)
    return { tables: tables?.map((t) => t.table_name) || [], error: null }
  } catch (error) {
    console.error("Database inspection failed:", error)
    return { tables: [], error: error.message }
  }
}

export async function inspectTableStructure(tableName: string) {
  try {
    // Get sample data to understand structure
    const { data, error } = await supabase.from(tableName).select("*").limit(5)

    if (error) {
      return { columns: [], sampleData: [], error: error.message }
    }

    const columns = data && data.length > 0 ? Object.keys(data[0]) : []

    console.log(`Table ${tableName} structure:`)
    console.log("Columns:", columns)
    console.log("Sample data:", data)

    return { columns, sampleData: data, error: null }
  } catch (error) {
    return { columns: [], sampleData: [], error: error.message }
  }
}

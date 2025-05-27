"use client"

import { supabase } from "./supabase"

export async function setupDatabase() {
  try {
    // Test connection
    const { data, error } = await supabase.from("molecules").select("count").limit(1)

    if (error) {
      console.error("Database setup needed:", error.message)
      return {
        success: false,
        message: "Database tables not found. Please run the SQL setup scripts in your Supabase dashboard.",
        needsSetup: true,
      }
    }

    return {
      success: true,
      message: "Database connection successful",
      needsSetup: false,
    }
  } catch (error) {
    console.error("Database connection failed:", error)
    return {
      success: false,
      message: "Failed to connect to database",
      needsSetup: true,
    }
  }
}

export async function checkDataExists() {
  try {
    const { data, error } = await supabase.from("molecules").select("id").limit(1)

    if (error) {
      return { hasData: false, error: error.message }
    }

    return { hasData: (data?.length || 0) > 0, error: null }
  } catch (error) {
    return { hasData: false, error: "Connection failed" }
  }
}

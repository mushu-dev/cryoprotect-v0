// Configuration helper to check if Supabase is properly set up
export const isSupabaseConfigured = () => {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://your-project.supabase.co" &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== "your-anon-key"
  )
}

export const getSupabaseConfig = () => {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project.supabase.co",
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key",
    isConfigured: isSupabaseConfigured(),
  }
}

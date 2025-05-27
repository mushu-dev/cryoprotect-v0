"use client"

import { DatabaseInspector } from "@/components/database-inspector"

export default function DatabaseInspectorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Database Inspector</h1>
          <p className="text-gray-600">
            Explore your existing Supabase database structure to understand what tables and data are available.
          </p>
        </div>

        <DatabaseInspector />
      </div>
    </div>
  )
}

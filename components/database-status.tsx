"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Database, CheckCircle, XCircle, AlertTriangle, ExternalLink } from "lucide-react"
import { setupDatabase, checkDataExists } from "@/lib/database-setup"

export function DatabaseStatus() {
  const [status, setStatus] = useState<{
    connected: boolean
    hasData: boolean
    loading: boolean
    error?: string
  }>({
    connected: false,
    hasData: false,
    loading: true,
  })

  useEffect(() => {
    async function checkStatus() {
      setStatus((prev) => ({ ...prev, loading: true }))

      const dbStatus = await setupDatabase()
      if (dbStatus.success) {
        const dataStatus = await checkDataExists()
        setStatus({
          connected: true,
          hasData: dataStatus.hasData,
          loading: false,
          error: dataStatus.error || undefined,
        })
      } else {
        setStatus({
          connected: false,
          hasData: false,
          loading: false,
          error: dbStatus.message,
        })
      }
    }

    checkStatus()
  }, [])

  if (status.loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span>Checking database connection...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Database className="w-5 h-5 mr-2" />
          Database Status
        </CardTitle>
        <CardDescription>Supabase connection and data status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Connection Status</span>
          <Badge variant={status.connected ? "default" : "destructive"}>
            {status.connected ? <CheckCircle className="w-4 h-4 mr-1" /> : <XCircle className="w-4 h-4 mr-1" />}
            {status.connected ? "Connected" : "Disconnected"}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <span>Sample Data</span>
          <Badge variant={status.hasData ? "default" : "secondary"}>
            {status.hasData ? <CheckCircle className="w-4 h-4 mr-1" /> : <AlertTriangle className="w-4 h-4 mr-1" />}
            {status.hasData ? "Loaded" : "Not Found"}
          </Badge>
        </div>

        {status.error && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{status.error}</AlertDescription>
          </Alert>
        )}

        {!status.connected && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Database setup required. Please run the SQL scripts in your Supabase dashboard.
            </AlertDescription>
          </Alert>
        )}

        {status.connected && !status.hasData && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Database connected but no sample data found. Run the sample-data.sql script to populate with test data.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open("https://mqwdkvwfbvxdmhnbgjfd.supabase.co", "_blank")}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Open Supabase Dashboard
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
            Refresh Status
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

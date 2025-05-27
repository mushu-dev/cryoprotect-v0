"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Database, Search, Eye, RefreshCw } from "lucide-react"
import { inspectDatabase, inspectTableStructure } from "@/lib/inspect-database"

export function DatabaseInspector() {
  const [tables, setTables] = useState<string[]>([])
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [tableData, setTableData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    inspectTables()
  }, [])

  const inspectTables = async () => {
    setLoading(true)
    setError(null)

    const result = await inspectDatabase()
    if (result.error) {
      setError(result.error)
    } else {
      setTables(result.tables)
      if (result.tables.length > 0 && !selectedTable) {
        setSelectedTable(result.tables[0])
      }
    }
    setLoading(false)
  }

  const inspectTable = async (tableName: string) => {
    setSelectedTable(tableName)
    const result = await inspectTableStructure(tableName)
    setTableData(result)
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span>Inspecting database structure...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="w-5 h-5 mr-2" />
            Database Inspector
          </CardTitle>
          <CardDescription>Explore your existing Supabase tables and structure</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Available Tables ({tables.length})</h3>
            <Button variant="outline" size="sm" onClick={inspectTables}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
            {tables.map((table) => (
              <Button
                key={table}
                variant={selectedTable === table ? "default" : "outline"}
                size="sm"
                onClick={() => inspectTable(table)}
                className="justify-start"
              >
                <Search className="w-4 h-4 mr-2" />
                {table}
              </Button>
            ))}
          </div>

          {selectedTable && tableData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  Table: {selectedTable}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {tableData.error ? (
                  <Alert>
                    <AlertDescription>{tableData.error}</AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Columns ({tableData.columns.length})</h4>
                      <div className="flex flex-wrap gap-1">
                        {tableData.columns.map((column: string) => (
                          <Badge key={column} variant="outline">
                            {column}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Sample Data ({tableData.sampleData.length} rows)</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse border border-gray-200">
                          <thead>
                            <tr className="bg-gray-50">
                              {tableData.columns.slice(0, 6).map((column: string) => (
                                <th key={column} className="border border-gray-200 px-2 py-1 text-left">
                                  {column}
                                </th>
                              ))}
                              {tableData.columns.length > 6 && (
                                <th className="border border-gray-200 px-2 py-1 text-left">
                                  ... +{tableData.columns.length - 6} more
                                </th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {tableData.sampleData.map((row: any, index: number) => (
                              <tr key={index}>
                                {tableData.columns.slice(0, 6).map((column: string) => (
                                  <td key={column} className="border border-gray-200 px-2 py-1">
                                    {typeof row[column] === "object"
                                      ? JSON.stringify(row[column]).substring(0, 50) + "..."
                                      : String(row[column] || "").substring(0, 50)}
                                  </td>
                                ))}
                                {tableData.columns.length > 6 && (
                                  <td className="border border-gray-200 px-2 py-1 text-gray-500">...</td>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

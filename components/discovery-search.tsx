"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Search, Brain, Sparkles, ArrowRight, Lightbulb, Target } from "lucide-react"

export function DiscoverySearch() {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<any[]>([])

  const handleSearch = async () => {
    setIsSearching(true)
    // Simulate AI search
    setTimeout(() => {
      setResults([
        {
          name: "Trehalose-6-phosphate",
          similarity: 94,
          efficacy: 89,
          toxicity: 15,
          confidence: 92,
          reason: "Similar sugar backbone with enhanced membrane permeability",
        },
        {
          name: "Sucrose octaacetate",
          similarity: 87,
          efficacy: 82,
          toxicity: 22,
          confidence: 88,
          reason: "Modified sugar with improved cryoprotective properties",
        },
        {
          name: "Mannitol derivative",
          similarity: 81,
          efficacy: 76,
          toxicity: 18,
          confidence: 85,
          reason: "Polyol structure with reduced osmotic stress",
        },
      ])
      setIsSearching(false)
    }, 2000)
  }

  const exampleQueries = [
    "Find molecules like DMSO but with lower toxicity",
    "Sugar-based cryoprotectants for organ preservation",
    "Non-toxic alternatives to glycerol for cell freezing",
    "Novel compounds for vitrification protocols",
  ]

  return (
    <div className="space-y-6">
      {/* Search Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="w-5 h-5 mr-2 text-blue-600" />
            AI-Powered Molecular Discovery
          </CardTitle>
          <CardDescription>
            Describe what you're looking for in natural language. Our AI will find the best molecular candidates.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">What are you looking for?</label>
            <Textarea
              placeholder="e.g., Find molecules similar to DMSO but with lower toxicity for organ preservation..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-gray-600">AI-powered semantic search</span>
            </div>
            <Button onClick={handleSearch} disabled={!query.trim() || isSearching}>
              {isSearching ? (
                <>
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </>
              )}
            </Button>
          </div>

          {/* Example Queries */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Try these examples:</label>
            <div className="flex flex-wrap gap-2">
              {exampleQueries.map((example, index) => (
                <Button key={index} variant="outline" size="sm" onClick={() => setQuery(example)} className="text-xs">
                  {example}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-green-600" />
              Discovery Results
              <Badge variant="secondary" className="ml-2">
                {results.length} matches found
              </Badge>
            </CardTitle>
            <CardDescription>AI-ranked molecular candidates based on your search criteria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{result.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{result.reason}</p>
                    </div>
                    <Badge variant="default" className="bg-blue-100 text-blue-800">
                      {result.similarity}% match
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{result.efficacy}%</div>
                      <div className="text-xs text-gray-600">Efficacy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{result.toxicity}%</div>
                      <div className="text-xs text-gray-600">Toxicity</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{result.confidence}%</div>
                      <div className="text-xs text-gray-600">Confidence</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Lightbulb className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm text-gray-600">AI Recommendation</span>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

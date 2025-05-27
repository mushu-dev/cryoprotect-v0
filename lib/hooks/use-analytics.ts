"use client"

import { useState, useEffect } from "react"
import { getDashboardAnalytics, getDiscoveryFeed, getTrendingResearch } from "../api/analytics"
import type { AnalyticsData } from "../api/analytics"

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [discoveryFeed, setDiscoveryFeed] = useState<any[]>([])
  const [trendingResearch, setTrendingResearch] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        setLoading(true)
        setError(null)

        const [analyticsData, feedData, trendingData] = await Promise.all([
          getDashboardAnalytics(),
          getDiscoveryFeed(),
          getTrendingResearch(),
        ])

        setAnalytics(analyticsData)
        setDiscoveryFeed(feedData)
        setTrendingResearch(trendingData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch analytics")
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  return {
    analytics,
    discoveryFeed,
    trendingResearch,
    loading,
    error,
    refresh: () => {
      setLoading(true)
      // Re-trigger the effect
      setAnalytics(null)
    },
  }
}

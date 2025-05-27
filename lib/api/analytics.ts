import { supabase } from "../supabase"

export interface AnalyticsData {
  totalMolecules: number
  avgSuccessRate: number
  activeResearchers: number
  breakthroughs: number
  monthlyTrends: Array<{
    month: string
    molecules: number
    successRate: number
  }>
  toxicityDistribution: Array<{
    level: string
    count: number
  }>
  propertyDistribution: Array<{
    property: string
    low: number
    medium: number
    high: number
  }>
}

// Mock analytics data
const mockAnalyticsData: AnalyticsData = {
  totalMolecules: 47382,
  avgSuccessRate: 89.3,
  activeResearchers: 1247,
  breakthroughs: 23,
  monthlyTrends: [
    { month: "Jun", molecules: 67, successRate: 94 },
    { month: "May", molecules: 58, successRate: 91 },
    { month: "Apr", molecules: 61, successRate: 89 },
    { month: "Mar", molecules: 48, successRate: 85 },
    { month: "Feb", molecules: 52, successRate: 82 },
    { month: "Jan", molecules: 45, successRate: 78 },
  ],
  toxicityDistribution: [
    { level: "Very Low", count: 35 },
    { level: "Low", count: 28 },
    { level: "Moderate", count: 22 },
    { level: "High", count: 15 },
  ],
  propertyDistribution: [
    { property: "LogP", low: 25, medium: 45, high: 30 },
    { property: "MW", low: 35, medium: 40, high: 25 },
  ],
}

const mockDiscoveryFeed = [
  {
    id: "1",
    name: "Compound CRY-2847",
    formula: "C₁₂H₁₈N₂O₄",
    successRate: 94,
    toxicity: "low",
    researcher: "Dr. Sarah Chen",
    time: "2 hours ago",
    aiInsight: "94% confidence prediction",
  },
  {
    id: "2",
    name: "Modified Glycerol Analog",
    formula: "C₈H₁₆O₅",
    successRate: 89,
    toxicity: "very_low",
    researcher: "Dr. Michael Torres",
    time: "4 hours ago",
    aiInsight: "High potential compound",
  },
  {
    id: "3",
    name: "Proline Derivative PD-401",
    formula: "C₉H₁₅NO₃",
    successRate: 82,
    toxicity: "low",
    researcher: "Dr. Lisa Wang",
    time: "6 hours ago",
    aiInsight: "87% confidence prediction",
  },
]

const mockTrendingResearch = [
  { topic: "Sugar-based cryoprotectants", status: "Hot", growth: "+23%" },
  { topic: "Membrane-permeable compounds", status: "Rising", growth: "+15%" },
  { topic: "Low-toxicity alternatives", status: "Stable", growth: "+5%" },
  { topic: "Synergistic combinations", status: "New", growth: "+45%" },
]

export async function getDashboardAnalytics(): Promise<AnalyticsData> {
  try {
    // Get molecule statistics from your actual table
    const { data: moleculeStats } = await supabase
      .from("molecules")
      .select("id, pubchem_cid, smiles, formula, created_at")

    const totalMolecules = moleculeStats?.length || 0
    const withPubchemId = moleculeStats?.filter((m) => m.pubchem_cid).length || 0
    const withSmiles = moleculeStats?.filter((m) => m.smiles).length || 0
    const withFormula = moleculeStats?.filter((m) => m.formula).length || 0

    // Calculate monthly trends from actual data
    const monthlyTrends = []
    const now = new Date()
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0)

      const monthMolecules =
        moleculeStats?.filter((m) => {
          const createdAt = new Date(m.created_at)
          return createdAt >= monthStart && createdAt <= monthEnd
        }).length || 0

      monthlyTrends.push({
        month: monthStart.toLocaleDateString("en-US", { month: "short" }),
        molecules: monthMolecules,
        successRate: 85 + Math.random() * 10, // Mock success rate for now
      })
    }

    return {
      totalMolecules,
      avgSuccessRate: 89.3, // Mock for now
      activeResearchers: 1247, // Mock for now
      breakthroughs: 23, // Mock for now
      monthlyTrends,
      toxicityDistribution: mockAnalyticsData.toxicityDistribution,
      propertyDistribution: [
        {
          property: "PubChem ID",
          low: totalMolecules - withPubchemId,
          medium: 0,
          high: withPubchemId,
        },
        {
          property: "SMILES",
          low: totalMolecules - withSmiles,
          medium: 0,
          high: withSmiles,
        },
      ],
    }
  } catch (error) {
    console.warn("Supabase analytics failed, using mock data:", error)
    return mockAnalyticsData
  }
}

export async function getDiscoveryFeed(limit = 10) {
  try {
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL === "https://your-project.supabase.co"
    ) {
      return mockDiscoveryFeed.slice(0, limit)
    }

    const { data, error } = await supabase
      .from("molecules")
      .select(`
        *,
        predictions!inner (
          prediction_value,
          confidence_score,
          model_name
        )
      `)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) {
      console.warn("Supabase discovery feed failed, using mock data:", error.message)
      return mockDiscoveryFeed.slice(0, limit)
    }

    return (
      data?.map((molecule) => ({
        id: molecule.id,
        name: molecule.name,
        formula: molecule.formula,
        successRate: molecule.success_rate,
        toxicity: molecule.toxicity_level,
        researcher: "Dr. Sarah Chen", // Mock data
        time: new Date(molecule.created_at).toLocaleString(),
        aiInsight:
          molecule.predictions?.[0]?.model_name === "CryoSuccess-AI"
            ? `${molecule.predictions[0].confidence_score}% confidence prediction`
            : "High potential compound",
      })) || mockDiscoveryFeed.slice(0, limit)
    )
  } catch (error) {
    console.warn("Discovery feed error, using mock data:", error)
    return mockDiscoveryFeed.slice(0, limit)
  }
}

export async function getTrendingResearch() {
  // Always return mock trending data for now
  return mockTrendingResearch
}

"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Filter, Grid3X3, List, Beaker, TrendingUp, Shield, Sparkles } from "lucide-react"
import { MixtureCard } from "@/components/mixture-card"
import { MixtureCreator } from "@/components/mixture-creator"
import { MixtureAnalyzer } from "@/components/mixture-analyzer"
import { MixtureDetailModal } from "@/components/mixture-detail-modal"

interface Mixture {
  id: string
  name: string
  description: string
  components: Array<{
    molecule_id: string
    molecule_name: string
    concentration: number
    unit: string
    percentage: number
  }>
  total_concentration: number
  osmolality: number
  ph: number
  efficacy_score: number
  toxicity_score: number
  stability_score: number
  viability_score?: number
  overall_score: number
  application: string
  created_by: string
  created_at: string
  updated_at: string
  version: number
  citations: number
  success_rate: number
  temperature_range: {
    min: number
    max: number
  }
  tags: string[]
  rarity?: "common" | "uncommon" | "rare" | "legendary"
  insights?: string[]
}

const mockMixtures: Mixture[] = [
  {
    id: "1",
    name: "CryoMax Pro",
    description: "High-performance mixture for mammalian cell preservation with enhanced viability",
    components: [
      { molecule_id: "1", molecule_name: "DMSO", concentration: 10, unit: "%", percentage: 45 },
      { molecule_id: "2", molecule_name: "Glycerol", concentration: 15, unit: "%", percentage: 35 },
      { molecule_id: "3", molecule_name: "Trehalose", concentration: 5, unit: "%", percentage: 20 },
    ],
    total_concentration: 30,
    osmolality: 1250,
    ph: 7.2,
    efficacy_score: 94,
    toxicity_score: 12,
    stability_score: 88,
    viability_score: 91,
    overall_score: 91,
    application: "Mammalian Cells",
    created_by: "Dr. Sarah Chen",
    created_at: "2024-01-15",
    updated_at: "2024-01-20",
    version: 3,
    citations: 47,
    success_rate: 89,
    temperature_range: { min: -196, max: -80 },
    tags: ["validated", "high-performance", "low-toxicity"],
    rarity: "rare",
    insights: ["Outperforms VS55 by 18%", "Optimal for stem cells", "Consider reducing DMSO"],
  },
  {
    id: "2",
    name: "PlantGuard Elite",
    description: "Specialized formulation for plant tissue cryopreservation with anti-oxidant protection",
    components: [
      { molecule_id: "4", molecule_name: "Ethylene Glycol", concentration: 20, unit: "%", percentage: 50 },
      { molecule_id: "5", molecule_name: "Sucrose", concentration: 0.3, unit: "M", percentage: 30 },
      { molecule_id: "6", molecule_name: "Ascorbic Acid", concentration: 2, unit: "mM", percentage: 20 },
    ],
    total_concentration: 22.3,
    osmolality: 1180,
    ph: 6.8,
    efficacy_score: 87,
    toxicity_score: 8,
    stability_score: 92,
    viability_score: 85,
    overall_score: 89,
    application: "Plant Tissues",
    created_by: "Prof. Maria Rodriguez",
    created_at: "2024-02-01",
    updated_at: "2024-02-10",
    version: 2,
    citations: 23,
    success_rate: 84,
    temperature_range: { min: -196, max: -20 },
    tags: ["plant-specific", "antioxidant", "validated"],
    rarity: "uncommon",
  },
  {
    id: "3",
    name: "NanoCell Shield",
    description: "Ultra-low toxicity mixture for sensitive stem cell applications",
    components: [
      { molecule_id: "7", molecule_name: "Propylene Glycol", concentration: 8, unit: "%", percentage: 40 },
      { molecule_id: "8", molecule_name: "Mannitol", concentration: 12, unit: "%", percentage: 35 },
      { molecule_id: "9", molecule_name: "Proline", concentration: 50, unit: "mM", percentage: 25 },
    ],
    total_concentration: 20.5,
    osmolality: 980,
    ph: 7.4,
    efficacy_score: 82,
    toxicity_score: 4,
    stability_score: 85,
    viability_score: 88,
    overall_score: 84,
    application: "Stem Cells",
    created_by: "Dr. James Liu",
    created_at: "2024-01-28",
    updated_at: "2024-02-05",
    version: 1,
    citations: 12,
    success_rate: 78,
    temperature_range: { min: -80, max: -20 },
    tags: ["ultra-low-toxicity", "stem-cells", "experimental"],
    rarity: "legendary",
  },
]

export default function MixturesPage() {
  const [mixtures, setMixtures] = useState<Mixture[]>(mockMixtures)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedMixture, setSelectedMixture] = useState<Mixture | null>(null)
  const [showCreator, setShowCreator] = useState(false)
  const [showAnalyzer, setShowAnalyzer] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)

  const filteredMixtures = mixtures.filter((mixture) => {
    const matchesSearch =
      mixture.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mixture.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mixture.components.some((comp) => comp.molecule_name.toLowerCase().includes(searchTerm.toLowerCase()))

    return matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Beaker className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Mixture Formulations
              </h1>
              <p className="text-gray-600">Design and optimize multi-component cryoprotectant solutions</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Beaker className="h-4 w-4 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold">{mixtures.length}</div>
                  <div className="text-sm text-gray-600">Total Mixtures</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <div>
                  <div className="text-2xl font-bold">87%</div>
                  <div className="text-sm text-gray-600">Avg Success Rate</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-purple-500" />
                <div>
                  <div className="text-2xl font-bold">8.1</div>
                  <div className="text-sm text-gray-600">Avg Toxicity</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-yellow-500" />
                <div>
                  <div className="text-2xl font-bold">88</div>
                  <div className="text-sm text-gray-600">Avg Score</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search mixtures, components, or applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button
              onClick={() => setShowCreator(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Mixture
            </Button>
          </div>
        </div>

        {/* Mixture Grid/List */}
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredMixtures.map((mixture) => (
            <MixtureCard
              key={mixture.id}
              mixture={mixture}
              viewMode={viewMode}
              onView={() => {
                setSelectedMixture(mixture)
                setShowDetailModal(true)
              }}
              onEdit={() => {
                setSelectedMixture(mixture)
                setShowCreator(true)
              }}
              onAnalyze={() => {
                setSelectedMixture(mixture)
                setShowAnalyzer(true)
              }}
              onClone={() => {
                const cloned = {
                  ...mixture,
                  id: Date.now().toString(),
                  name: `${mixture.name} (Copy)`,
                  version: 1,
                  created_at: new Date().toISOString().split("T")[0],
                }
                setMixtures([cloned, ...mixtures])
              }}
            />
          ))}
        </div>

        {/* Modals */}
        {showCreator && (
          <MixtureCreator
            mixture={selectedMixture}
            onClose={() => {
              setShowCreator(false)
              setSelectedMixture(null)
            }}
            onSave={(mixture) => {
              if (selectedMixture) {
                setMixtures(mixtures.map((m) => (m.id === mixture.id ? mixture : m)))
              } else {
                setMixtures([mixture, ...mixtures])
              }
              setShowCreator(false)
              setSelectedMixture(null)
            }}
          />
        )}

        {showAnalyzer && selectedMixture && (
          <MixtureAnalyzer
            mixture={selectedMixture}
            onClose={() => {
              setShowAnalyzer(false)
              setSelectedMixture(null)
            }}
          />
        )}

        {showDetailModal && selectedMixture && (
          <MixtureDetailModal
            mixture={selectedMixture}
            isOpen={showDetailModal}
            onClose={() => {
              setShowDetailModal(false)
              setSelectedMixture(null)
            }}
          />
        )}
      </div>
    </div>
  )
}

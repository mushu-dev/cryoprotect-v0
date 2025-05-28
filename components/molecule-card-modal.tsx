"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Star, Beaker, Target, Thermometer, Shield, Zap, TrendingUp, ExternalLink, Download, Plus } from "lucide-react"

interface MoleculeCardModalProps {
  isOpen: boolean
  onClose: () => void
  molecule: {
    id: string
    name: string
    chemicalName: string
    formula: string
    molecularWeight: number
    efficacy: number
    toxicity: number
    glassTransition: number
    mechanism: string
    discoveryDate: string
    concentration: string
    phase: string
    applications: string[]
  }
}

export function MoleculeCardModal({ isOpen, onClose, molecule }: MoleculeCardModalProps) {
  const getEfficacyColor = (efficacy: number) => {
    if (efficacy >= 90) return "text-green-400"
    if (efficacy >= 75) return "text-blue-400"
    if (efficacy >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  const getToxicityColor = (toxicity: number) => {
    if (toxicity <= 5) return "text-green-400"
    if (toxicity <= 15) return "text-yellow-400"
    return "text-red-400"
  }

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case "Phase II Ready":
        return "bg-green-500/10 text-green-400 border-green-500/20"
      case "Phase I":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20"
      case "Pre-clinical":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-800 text-white">
        <DialogHeader className="pb-4 border-b border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-white flex flex-col sm:flex-row sm:items-center gap-2">
                {molecule.name}
                <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 w-fit">
                  <Star className="w-3 h-3 mr-1" />
                  Lead Candidate
                </Badge>
              </DialogTitle>
              <p className="text-slate-400 mt-2">{molecule.chemicalName}</p>
            </div>
            <Badge className={`${getPhaseColor(molecule.phase)} w-fit`}>{molecule.phase}</Badge>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-6">
          {/* Left Column - Molecular Structure & Basic Info */}
          <div className="space-y-6">
            {/* Molecular Structure */}
            <div className="bg-slate-800 rounded-lg p-6">
              <div className="w-full h-48 bg-slate-700 rounded-lg flex items-center justify-center mb-4">
                <div className="text-slate-400 text-center">
                  <Beaker className="w-16 h-16 mx-auto mb-3" />
                  <div className="text-sm font-medium">3D Molecular Structure</div>
                  <div className="text-xs text-slate-500 mt-1">{molecule.formula}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-slate-400 text-xs mb-1">Molecular Weight</div>
                  <div className="font-bold text-white">{molecule.molecularWeight} g/mol</div>
                </div>
                <div className="text-center">
                  <div className="text-slate-400 text-xs mb-1">Discovery Date</div>
                  <div className="font-bold text-white">{molecule.discoveryDate}</div>
                </div>
              </div>
            </div>

            {/* Mechanism & Applications */}
            <div className="bg-slate-800 rounded-lg p-6">
              <h4 className="font-semibold text-white mb-3 flex items-center">
                <Zap className="w-4 h-4 mr-2 text-blue-400" />
                Mechanism of Action
              </h4>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">{molecule.mechanism}</p>
              <div>
                <div className="text-xs text-slate-400 mb-3">Target Applications</div>
                <div className="flex flex-wrap gap-2">
                  {molecule.applications.map((app, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-slate-600 text-slate-300">
                      {app}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Performance Metrics */}
          <div className="space-y-6">
            {/* Key Performance Indicators */}
            <div className="bg-slate-800 rounded-lg p-6">
              <h4 className="font-semibold text-white mb-4 flex items-center">
                <Target className="w-4 h-4 mr-2 text-green-400" />
                Performance Metrics
              </h4>
              <div className="space-y-5">
                {/* Efficacy */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Cryoprotective Efficacy</span>
                    <span className={`font-bold text-lg ${getEfficacyColor(molecule.efficacy)}`}>
                      {molecule.efficacy}%
                    </span>
                  </div>
                  <Progress value={molecule.efficacy} className="h-2" />
                </div>

                {/* Safety Profile */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Safety Profile</span>
                    <span className={`font-bold text-lg ${getToxicityColor(molecule.toxicity)}`}>
                      {(100 - molecule.toxicity).toFixed(1)}% Safe
                    </span>
                  </div>
                  <Progress value={100 - molecule.toxicity} className="h-2" />
                </div>

                {/* Glass Transition & Concentration */}
                <div className="grid grid-cols-1 gap-4 pt-2">
                  <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                    <span className="text-sm text-slate-400 flex items-center">
                      <Thermometer className="w-4 h-4 mr-2" />
                      Glass Transition
                    </span>
                    <span className="font-bold text-blue-400">{molecule.glassTransition}°C</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                    <span className="text-sm text-slate-400">Optimal Concentration</span>
                    <span className="font-bold text-purple-400">{molecule.concentration}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Research Status */}
            <div className="bg-slate-800 rounded-lg p-6">
              <h4 className="font-semibold text-white mb-4 flex items-center">
                <Shield className="w-4 h-4 mr-2 text-purple-400" />
                Research Status
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Current Phase</span>
                  <Badge className={getPhaseColor(molecule.phase)}>{molecule.phase}</Badge>
                </div>
                <div className="text-sm text-slate-300 space-y-2">
                  <div className="p-3 bg-slate-700 rounded-lg">
                    <div className="font-medium text-white mb-1">Next Milestone</div>
                    <div className="text-xs">IND filing for Phase I trials (Q2 2024)</div>
                  </div>
                  <div className="p-3 bg-slate-700 rounded-lg">
                    <div className="font-medium text-white mb-1">Validation Status</div>
                    <div className="text-xs">Pre-clinical validation completed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-800 rounded-lg p-6">
              <h4 className="font-semibold text-white mb-4">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Protocol
                </Button>
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Compare
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Optimization Insights */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6 mt-6">
          <h4 className="font-semibold text-blue-400 mb-4 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            Optimization Opportunities
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
            <div className="p-3 bg-blue-500/5 rounded-lg">
              <div className="font-medium text-blue-300 mb-1">Thermal Stability</div>
              <div className="text-xs">Improve by 9 points through formulation optimization</div>
            </div>
            <div className="p-3 bg-blue-500/5 rounded-lg">
              <div className="font-medium text-blue-300 mb-1">Toxicity Reduction</div>
              <div className="text-xs">Further 4-point improvement possible with purification</div>
            </div>
            <div className="p-3 bg-blue-500/5 rounded-lg">
              <div className="font-medium text-blue-300 mb-1">Permeability</div>
              <div className="text-xs">Already exceeds target by 3 points</div>
            </div>
            <div className="p-3 bg-blue-500/5 rounded-lg">
              <div className="font-medium text-blue-300 mb-1">Next Steps</div>
              <div className="text-xs">Scale-up synthesis and begin clinical validation</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

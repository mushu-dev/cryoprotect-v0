"use client"

import { MolecularViewer3D } from "@/components/molecular-viewer-3d"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MicroscopeIcon as Molecule } from "lucide-react"

export default function VisualizerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Molecule className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    CryoProtect 3D Visualizer
                  </h1>
                  <p className="text-sm text-gray-600">Interactive Molecular Exploration</p>
                </div>
              </Link>
            </div>
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <MolecularViewer3D />
      </div>
    </div>
  )
}

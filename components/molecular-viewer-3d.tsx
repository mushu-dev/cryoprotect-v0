"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Html } from "@react-three/drei"
import * as THREE from "three"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import {
  MicroscopeIcon as Molecule,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Palette,
  Eye,
  ContrastIcon as Compare,
  Download,
} from "lucide-react"

// Atom component for 3D visualization
function Atom({
  position,
  element,
  color,
  radius = 0.5,
}: {
  position: [number, number, number]
  element: string
  color: string
  radius?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current && hovered) {
      meshRef.current.scale.setScalar(1.2)
    } else if (meshRef.current) {
      meshRef.current.scale.setScalar(1)
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={color} />
      {hovered && (
        <Html>
          <div className="bg-black text-white px-2 py-1 rounded text-xs">{element}</div>
        </Html>
      )}
    </mesh>
  )
}

// Bond component
function Bond({
  start,
  end,
  color = "#666666",
}: {
  start: [number, number, number]
  end: [number, number, number]
  color?: string
}) {
  const startVec = new THREE.Vector3(...start)
  const endVec = new THREE.Vector3(...end)
  const direction = new THREE.Vector3().subVectors(endVec, startVec)
  const length = direction.length()
  const center = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5)

  return (
    <mesh position={center.toArray()} lookAt={endVec}>
      <cylinderGeometry args={[0.05, 0.05, length, 8]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

// Molecule component
function Molecule3D({ moleculeData }: { moleculeData: any }) {
  const atoms = [
    { position: [0, 0, 0] as [number, number, number], element: "C", color: "#404040" },
    { position: [1.5, 0, 0] as [number, number, number], element: "O", color: "#ff0000" },
    { position: [-1.5, 0, 0] as [number, number, number], element: "N", color: "#0000ff" },
    { position: [0, 1.5, 0] as [number, number, number], element: "H", color: "#ffffff", radius: 0.3 },
    { position: [0, -1.5, 0] as [number, number, number], element: "H", color: "#ffffff", radius: 0.3 },
  ]

  const bonds = [
    { start: [0, 0, 0] as [number, number, number], end: [1.5, 0, 0] as [number, number, number] },
    { start: [0, 0, 0] as [number, number, number], end: [-1.5, 0, 0] as [number, number, number] },
    { start: [0, 0, 0] as [number, number, number], end: [0, 1.5, 0] as [number, number, number] },
    { start: [0, 0, 0] as [number, number, number], end: [0, -1.5, 0] as [number, number, number] },
  ]

  return (
    <group>
      {atoms.map((atom, index) => (
        <Atom key={index} position={atom.position} element={atom.element} color={atom.color} radius={atom.radius} />
      ))}
      {bonds.map((bond, index) => (
        <Bond key={index} start={bond.start} end={bond.end} />
      ))}
    </group>
  )
}

export function MolecularViewer3D() {
  const [selectedMolecule, setSelectedMolecule] = useState("trehalose")
  const [viewMode, setViewMode] = useState("ball-stick")
  const [colorScheme, setColorScheme] = useState("element")
  const [opacity, setOpacity] = useState([100])

  const molecules = {
    trehalose: {
      name: "Trehalose",
      formula: "C₁₂H₂₂O₁₁",
      properties: {
        mw: 342.3,
        logP: -3.2,
        tpsa: 189.5,
        hbd: 8,
        hba: 11,
      },
    },
    dmso: {
      name: "DMSO",
      formula: "C₂H₆OS",
      properties: {
        mw: 78.13,
        logP: -1.35,
        tpsa: 36.3,
        hbd: 0,
        hba: 1,
      },
    },
    glycerol: {
      name: "Glycerol",
      formula: "C₃H₈O₃",
      properties: {
        mw: 92.09,
        logP: -1.76,
        tpsa: 60.7,
        hbd: 3,
        hba: 3,
      },
    },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Molecule className="w-5 h-5 mr-2 text-purple-600" />
            3D Molecular Visualization
          </CardTitle>
          <CardDescription>Interactive 3D viewer with property overlays and comparison tools</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Controls Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Molecule Selection */}
            <div>
              <label className="text-sm font-medium mb-2 block">Select Molecule</label>
              <div className="space-y-2">
                {Object.entries(molecules).map(([key, mol]) => (
                  <Button
                    key={key}
                    variant={selectedMolecule === key ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setSelectedMolecule(key)}
                  >
                    <div className="text-left">
                      <div className="font-medium">{mol.name}</div>
                      <div className="text-xs opacity-70">{mol.formula}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* View Mode */}
            <div>
              <label className="text-sm font-medium mb-2 block">View Mode</label>
              <div className="space-y-2">
                {[
                  { key: "ball-stick", label: "Ball & Stick" },
                  { key: "space-fill", label: "Space Filling" },
                  { key: "wireframe", label: "Wireframe" },
                  { key: "surface", label: "Surface" },
                ].map((mode) => (
                  <Button
                    key={mode.key}
                    variant={viewMode === mode.key ? "default" : "outline"}
                    size="sm"
                    className="w-full"
                    onClick={() => setViewMode(mode.key)}
                  >
                    {mode.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Scheme */}
            <div>
              <label className="text-sm font-medium mb-2 block">Color Scheme</label>
              <div className="space-y-2">
                {[
                  { key: "element", label: "By Element" },
                  { key: "charge", label: "By Charge" },
                  { key: "hydrophobic", label: "Hydrophobicity" },
                  { key: "toxicity", label: "Toxicity Risk" },
                ].map((scheme) => (
                  <Button
                    key={scheme.key}
                    variant={colorScheme === scheme.key ? "default" : "outline"}
                    size="sm"
                    className="w-full"
                    onClick={() => setColorScheme(scheme.key)}
                  >
                    {scheme.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Opacity */}
            <div>
              <label className="text-sm font-medium mb-2 block">Opacity</label>
              <Slider value={opacity} onValueChange={setOpacity} max={100} min={10} step={5} className="mb-2" />
              <div className="text-xs text-gray-500">{opacity[0]}%</div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset View
              </Button>
              <Button variant="outline" className="w-full">
                <Compare className="w-4 h-4 mr-2" />
                Compare Mode
              </Button>
              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Export Image
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 3D Viewer */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{molecules[selectedMolecule as keyof typeof molecules].name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{molecules[selectedMolecule as keyof typeof molecules].formula}</Badge>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gray-50 rounded-lg relative overflow-hidden">
                <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[10, 10, 5]} intensity={1} />
                  <Molecule3D moleculeData={molecules[selectedMolecule as keyof typeof molecules]} />
                  <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                </Canvas>

                {/* Overlay Controls */}
                <div className="absolute top-4 right-4 space-y-2">
                  <Button size="sm" variant="secondary">
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary">
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary">
                    <Palette className="w-4 h-4" />
                  </Button>
                </div>

                {/* Property Overlay */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                  <div className="text-sm space-y-1">
                    <div className="font-medium">Property Overlay: {colorScheme}</div>
                    <div className="text-xs text-gray-600">Click atoms for detailed information</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Properties Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="molecular" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="molecular">Molecular</TabsTrigger>
                <TabsTrigger value="biological">Biological</TabsTrigger>
              </TabsList>

              <TabsContent value="molecular" className="space-y-4">
                <div className="space-y-3">
                  {Object.entries(molecules[selectedMolecule as keyof typeof molecules].properties).map(
                    ([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-sm text-gray-600 capitalize">
                          {key === "mw"
                            ? "Molecular Weight"
                            : key === "logP"
                              ? "LogP"
                              : key === "tpsa"
                                ? "TPSA"
                                : key === "hbd"
                                  ? "H-Bond Donors"
                                  : key === "hba"
                                    ? "H-Bond Acceptors"
                                    : key}
                        </span>
                        <span className="text-sm font-medium">
                          {typeof value === "number" ? value.toFixed(2) : value}
                          {key === "mw" ? " Da" : key === "tpsa" ? " Ų" : ""}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </TabsContent>

              <TabsContent value="biological" className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Membrane Permeability</span>
                    <Badge variant="secondary">High</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Cytotoxicity</span>
                    <Badge variant="outline">Low</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Osmotic Stress</span>
                    <Badge variant="secondary">Moderate</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Ice Formation</span>
                    <Badge variant="default">Inhibits</Badge>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* AI Predictions */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">AI Predictions</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-700">Success Rate</span>
                  <span className="font-medium text-blue-900">92%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Toxicity Risk</span>
                  <span className="font-medium text-blue-900">Low</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Confidence</span>
                  <span className="font-medium text-blue-900">87%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

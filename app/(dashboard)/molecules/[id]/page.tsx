import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { MoleculeDetail } from "@/components/molecules/molecule-detail"
import { MoleculeProperties } from "@/components/molecules/molecule-properties"
import { MoleculeStructure } from "@/components/molecules/molecule-structure"
import { MoleculeExperiments } from "@/components/molecules/molecule-experiments"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Edit, Download, Share2 } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Molecule Details | CryoProtect v2",
  description: "Detailed information about a cryoprotectant molecule",
}

export default function MoleculeDetailPage({ params }: { params: { id: string } }) {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Molecule Details"
        description="Comprehensive information about this cryoprotectant molecule"
      >
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button size="sm" asChild>
            <Link href={`/molecules/${params.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
        </div>
      </DashboardHeader>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Molecule overview */}
        <div className="md:col-span-1">
          <MoleculeDetail id={params.id} />
        </div>

        {/* Molecule structure visualization */}
        <div className="md:col-span-2">
          <MoleculeStructure id={params.id} />
        </div>
      </div>

      {/* Tabs for additional information */}
      <div className="mt-6">
        <Tabs defaultValue="properties" className="w-full">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="experiments">Experiments</TabsTrigger>
            <TabsTrigger value="mixtures">Mixtures</TabsTrigger>
            <TabsTrigger value="literature">Literature</TabsTrigger>
          </TabsList>
          <TabsContent value="properties" className="mt-4">
            <MoleculeProperties id={params.id} />
          </TabsContent>
          <TabsContent value="experiments" className="mt-4">
            <MoleculeExperiments id={params.id} />
          </TabsContent>
          <TabsContent value="mixtures" className="mt-4">
            <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
              <p className="text-muted-foreground">Mixtures containing this molecule will be displayed here</p>
            </div>
          </TabsContent>
          <TabsContent value="literature" className="mt-4">
            <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
              <p className="text-muted-foreground">Literature references for this molecule will be displayed here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}

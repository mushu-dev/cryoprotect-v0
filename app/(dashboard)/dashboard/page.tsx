import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { MoleculeStats } from "@/components/dashboard/molecule-stats"
import { ExperimentOverview } from "@/components/dashboard/experiment-overview"
import { MixtureDistribution } from "@/components/dashboard/mixture-distribution"
import { RecentExperiments } from "@/components/dashboard/recent-experiments"
import { ResearchTools } from "@/components/dashboard/research-tools"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Dashboard | CryoProtect v2",
  description: "Cryoprotectant research and analysis platform",
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <DashboardHeader
          heading="Research Dashboard"
          description="Analyze cryoprotectant molecules, mixtures, and experiment results"
        />

        {/* Key Stats */}
        <MoleculeStats />

        {/* Main Dashboard Content */}
        <div className="grid gap-6 md:grid-cols-6">
          {/* Left Column - Charts and Visualizations */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <ExperimentOverview showLegend={true} height={320} />

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              <MixtureDistribution />

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Viability Analysis</CardTitle>
                  <CardDescription>Cell viability by cryoprotectant type</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[220px] flex items-center justify-center bg-muted/20 text-muted-foreground text-sm">
                    <div className="text-center p-4">
                      <p>Advanced viability analysis</p>
                      <Button variant="link" size="sm" asChild>
                        <Link href="/analytics/viability" className="flex items-center">
                          View detailed analysis
                          <ArrowUpRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Tools and Recent Experiments */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <ResearchTools />

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Recent Experiments</CardTitle>
                <CardDescription>Latest research activities</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="all" className="w-full">
                  <div className="px-4 pt-0">
                    <TabsList className="w-full grid grid-cols-3">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="active">Active</TabsTrigger>
                      <TabsTrigger value="completed">Completed</TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent value="all" className="m-0">
                    <RecentExperiments limit={5} compact={true} />
                  </TabsContent>
                  <TabsContent value="active" className="m-0">
                    <RecentExperiments limit={5} compact={true} status="active" />
                  </TabsContent>
                  <TabsContent value="completed" className="m-0">
                    <RecentExperiments limit={5} compact={true} status="completed" />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Full-width Experiment Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Experiment Results</CardTitle>
                <CardDescription>Comprehensive view of all cryoprotection experiments</CardDescription>
              </div>
              <Button asChild>
                <Link href="/experiments/new">New Experiment</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <RecentExperiments limit={10} />
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

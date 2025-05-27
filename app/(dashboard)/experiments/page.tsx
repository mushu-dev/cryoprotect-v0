import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Experiments | CryoProtect v2",
  description: "Browse and manage cryoprotection experiments",
}

export default function ExperimentsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Cryoprotection Experiments"
        description="Browse, search, and manage your cryoprotection experiments"
      >
        <Button asChild>
          <Link href="/experiments/new">
            <Plus className="mr-2 h-4 w-4" />
            New Experiment
          </Link>
        </Button>
      </DashboardHeader>

      <Card>
        <CardHeader>
          <CardTitle>Experiments</CardTitle>
          <CardDescription>View and manage your cryoprotection experiments</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="all">All Experiments</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="planned">Planned</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-muted-foreground">Experiments list will be displayed here</p>
              </div>
            </TabsContent>
            <TabsContent value="active" className="mt-4">
              <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-muted-foreground">Active experiments will be displayed here</p>
              </div>
            </TabsContent>
            <TabsContent value="completed" className="mt-4">
              <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-muted-foreground">Completed experiments will be displayed here</p>
              </div>
            </TabsContent>
            <TabsContent value="planned" className="mt-4">
              <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-muted-foreground">Planned experiments will be displayed here</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}

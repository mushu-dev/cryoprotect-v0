import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Mixtures | CryoProtect v2",
  description: "Browse and manage cryoprotectant mixtures",
}

export default function MixturesPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Cryoprotectant Mixtures"
        description="Browse, search, and manage cryoprotectant mixtures in the database"
      >
        <Button asChild>
          <Link href="/mixtures/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Mixture
          </Link>
        </Button>
      </DashboardHeader>

      <Card>
        <CardHeader>
          <CardTitle>Mixtures</CardTitle>
          <CardDescription>View and manage your cryoprotectant mixtures</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="all">All Mixtures</TabsTrigger>
              <TabsTrigger value="recent">Recently Added</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="shared">Shared</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-muted-foreground">Mixtures list will be displayed here</p>
              </div>
            </TabsContent>
            <TabsContent value="recent" className="mt-4">
              <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-muted-foreground">Recently added mixtures will be displayed here</p>
              </div>
            </TabsContent>
            <TabsContent value="favorites" className="mt-4">
              <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-muted-foreground">Favorite mixtures will be displayed here</p>
              </div>
            </TabsContent>
            <TabsContent value="shared" className="mt-4">
              <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-muted-foreground">Shared mixtures will be displayed here</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}

import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { MoleculeComparison } from "@/components/molecules/molecule-comparison"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Compare Molecules | CryoProtect v2",
  description: "Compare properties of multiple cryoprotectant molecules",
}

export default function CompareMoleculesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Extract molecule IDs from query parameters
  const ids = searchParams.ids ? (Array.isArray(searchParams.ids) ? searchParams.ids : [searchParams.ids]) : []

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Compare Molecules"
        description="Compare properties of multiple cryoprotectant molecules side by side"
      >
        <Button variant="outline" size="sm" asChild>
          <Link href="/molecules">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Molecules
          </Link>
        </Button>
      </DashboardHeader>

      <MoleculeComparison moleculeIds={ids} />
    </DashboardShell>
  )
}

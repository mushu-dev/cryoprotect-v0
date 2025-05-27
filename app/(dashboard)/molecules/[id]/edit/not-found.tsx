import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function MoleculeNotFound() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Molecule Not Found"
        description="The molecule you're looking for doesn't exist or has been removed."
      />
      <div className="flex flex-col items-center justify-center space-y-4 py-12">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <AlertCircle className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold">Molecule Not Found</h2>
        <p className="text-center text-muted-foreground">
          The molecule you're trying to edit doesn't exist or you may not have permission to access it.
        </p>
        <div className="flex space-x-4">
          <Button asChild variant="outline">
            <Link href="/molecules">Back to Molecules</Link>
          </Button>
          <Button asChild>
            <Link href="/molecules/new">Add New Molecule</Link>
          </Button>
        </div>
      </div>
    </DashboardShell>
  )
}

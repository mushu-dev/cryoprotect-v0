import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { EditMoleculeForm } from "@/components/molecules/edit-molecule-form"
import { getMoleculeById } from "@/app/actions/molecules"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Edit Molecule | CryoProtect v2",
  description: "Edit an existing cryoprotectant molecule in the database",
}

export default async function EditMoleculePage({ params }: { params: { id: string } }) {
  // Fetch the molecule data
  const { data: molecule, error } = await getMoleculeById(params.id)

  // If molecule not found, show 404
  if (error || !molecule) {
    notFound()
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading={`Edit Molecule: ${molecule.name}`}
        description="Modify the properties of this cryoprotectant molecule"
      />
      <EditMoleculeForm molecule={molecule} />
    </DashboardShell>
  )
}

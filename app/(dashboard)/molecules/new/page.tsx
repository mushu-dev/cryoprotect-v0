import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { AddMoleculeForm } from "@/components/molecules/add-molecule-form"

export const metadata: Metadata = {
  title: "Add New Molecule | CryoProtect v2",
  description: "Add a new cryoprotectant molecule to the database",
}

export default function AddMoleculePage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Add New Molecule" description="Add a new cryoprotectant molecule to the database" />
      <AddMoleculeForm />
    </DashboardShell>
  )
}

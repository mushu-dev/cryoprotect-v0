import type { Metadata } from "next"
import MoleculesPageClient from "./molecules-page-client"

export const metadata: Metadata = {
  title: "Molecules | CryoProtect v2",
  description: "Browse and manage cryoprotectant molecules",
}

export default function MoleculesPage() {
  return <MoleculesPageClient />
}

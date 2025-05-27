"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ImportIcon as FileImport } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import the PubChemImportDialog component with no SSR
const PubChemImportDialog = dynamic(
  () => import("@/components/molecules/pubchem-import-dialog").then((mod) => mod.PubChemImportDialog),
  { ssr: false },
)

export function PubChemImportDialogWrapper() {
  const [isClient, setIsClient] = useState(false)

  // Use useEffect to set isClient to true after component mounts
  // This ensures the component only renders on the client
  useState(() => {
    setIsClient(true)
  })

  // If not client, render just the button without the dialog
  if (!isClient) {
    return (
      <Button variant="outline">
        <FileImport className="mr-2 h-4 w-4" />
        Import from PubChem
      </Button>
    )
  }

  // On client, render the full dialog component
  return <PubChemImportDialog />
}

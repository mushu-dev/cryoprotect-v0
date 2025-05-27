"use client"

import type React from "react"

import { QueryProvider } from "./query-provider"
import { MoleculeProvider } from "@/contexts/molecule-context"
import { MixtureProvider } from "@/contexts/mixture-context"
import { ExperimentProvider } from "@/contexts/experiment-context"

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <MoleculeProvider>
        <MixtureProvider>
          <ExperimentProvider>{children}</ExperimentProvider>
        </MixtureProvider>
      </MoleculeProvider>
    </QueryProvider>
  )
}

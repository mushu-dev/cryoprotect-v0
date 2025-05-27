"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import type { Mixture, MixtureComponent } from "@/types/models"
import { useMixture, useMixtureComponents } from "@/lib/api/mixtures"
import { useMixtureProtocols } from "@/lib/api/protocols"

interface MixtureContextType {
  mixture: Mixture | null
  components: MixtureComponent[]
  protocols: any[] // Using any for simplicity, should be Protocol[]
  isLoading: boolean
  isError: boolean
  error: Error | null
  setMixtureId: (id: string | null) => void
}

const MixtureContext = createContext<MixtureContextType | undefined>(undefined)

export function MixtureProvider({ children }: { children: React.ReactNode }) {
  const [mixtureId, setMixtureId] = useState<string | null>(null)

  const {
    data: mixture,
    isLoading: isLoadingMixture,
    isError: isErrorMixture,
    error: mixtureError,
  } = useMixture(mixtureId || "")

  const {
    data: components = [],
    isLoading: isLoadingComponents,
    isError: isErrorComponents,
    error: componentsError,
  } = useMixtureComponents(mixtureId || "")

  const {
    data: protocols = [],
    isLoading: isLoadingProtocols,
    isError: isErrorProtocols,
    error: protocolsError,
  } = useMixtureProtocols(mixtureId || "")

  const isLoading = isLoadingMixture || isLoadingComponents || isLoadingProtocols
  const isError = isErrorMixture || isErrorComponents || isErrorProtocols
  const error = mixtureError || componentsError || protocolsError

  const setMixtureIdCallback = useCallback((id: string | null) => {
    setMixtureId(id)
  }, [])

  const value = {
    mixture: mixture || null,
    components: components || [],
    protocols: protocols || [],
    isLoading,
    isError,
    error: error as Error | null,
    setMixtureId: setMixtureIdCallback,
  }

  return <MixtureContext.Provider value={value}>{children}</MixtureContext.Provider>
}

export function useMixtureContext() {
  const context = useContext(MixtureContext)
  if (context === undefined) {
    throw new Error("useMixtureContext must be used within a MixtureProvider")
  }
  return context
}

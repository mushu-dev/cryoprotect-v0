"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import type { Experiment, ExperimentProperty } from "@/types/models"
import { useExperiment, useExperimentProperties } from "@/lib/api/experiments"

interface ExperimentContextType {
  experiment: Experiment | null
  properties: ExperimentProperty[]
  isLoading: boolean
  isError: boolean
  error: Error | null
  setExperimentId: (id: string | null) => void
}

const ExperimentContext = createContext<ExperimentContextType | undefined>(undefined)

export function ExperimentProvider({ children }: { children: React.ReactNode }) {
  const [experimentId, setExperimentId] = useState<string | null>(null)

  const {
    data: experiment,
    isLoading: isLoadingExperiment,
    isError: isErrorExperiment,
    error: experimentError,
  } = useExperiment(experimentId || "")

  const {
    data: properties = [],
    isLoading: isLoadingProperties,
    isError: isErrorProperties,
    error: propertiesError,
  } = useExperimentProperties(experimentId || "")

  const isLoading = isLoadingExperiment || isLoadingProperties
  const isError = isErrorExperiment || isErrorProperties
  const error = experimentError || propertiesError

  const setExperimentIdCallback = useCallback((id: string | null) => {
    setExperimentId(id)
  }, [])

  const value = {
    experiment: experiment || null,
    properties: properties || [],
    isLoading,
    isError,
    error: error as Error | null,
    setExperimentId: setExperimentIdCallback,
  }

  return <ExperimentContext.Provider value={value}>{children}</ExperimentContext.Provider>
}

export function useExperimentContext() {
  const context = useContext(ExperimentContext)
  if (context === undefined) {
    throw new Error("useExperimentContext must be used within an ExperimentProvider")
  }
  return context
}

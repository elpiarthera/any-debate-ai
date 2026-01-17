"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface DemoContextType {
  isDemoMode: boolean
  setDemoMode: (enabled: boolean) => void
  toggleDemoMode: () => void
  shouldOpenCanvas: boolean
  setShouldOpenCanvas: (open: boolean) => void
}

const DemoContext = createContext<DemoContextType | undefined>(undefined)

export function DemoProvider({ children }: { children: ReactNode }) {
  const [isDemoMode, setIsDemoMode] = useState(true) // Start in demo mode
  const [shouldOpenCanvas, setShouldOpenCanvas] = useState(false)

  const setDemoMode = (enabled: boolean) => {
    setIsDemoMode(enabled)
  }

  const toggleDemoMode = () => {
    setIsDemoMode(!isDemoMode)
  }

  return (
    <DemoContext.Provider
      value={{
        isDemoMode,
        setDemoMode,
        toggleDemoMode,
        shouldOpenCanvas,
        setShouldOpenCanvas,
      }}
    >
      {children}
    </DemoContext.Provider>
  )
}

export function useDemoMode() {
  const context = useContext(DemoContext)
  if (context === undefined) {
    throw new Error("useDemoMode must be used within a DemoProvider")
  }
  return context
}

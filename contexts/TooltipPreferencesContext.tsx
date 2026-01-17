"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
// import { useConvexAuth, useQuery, useMutation } from "convex/react"
// import { api } from "@/convex/_generated/api"

interface TooltipPreferences {
  enabled: boolean
  delay: number
}

interface TooltipPreferencesContextType {
  tooltipPreferences: TooltipPreferences
  updateTooltipPreferences: (preferences: Partial<TooltipPreferences>) => Promise<void>
  isLoading: boolean
}

const TooltipPreferencesContext = createContext<TooltipPreferencesContextType | undefined>(undefined)

export function TooltipPreferencesProvider({ children }: { children: ReactNode }) {
  // const { isAuthenticated } = useConvexAuth()
  // const user = useQuery(api.users.getUser, isAuthenticated ? {} : "skip")
  // const updatePreferencesMutation = useMutation(api.users.updateTooltipPreferences)

  const [tooltipPreferences, setTooltipPreferences] = useState<TooltipPreferences>({
    enabled: true,
    delay: 300,
  })
  const [isLoading, setIsLoading] = useState(true)

  // Load preferences from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("tooltip-preferences")
    if (stored) {
      try {
        setTooltipPreferences(JSON.parse(stored))
      } catch (e) {
        console.error("Failed to parse tooltip preferences from localStorage", e)
      }
    }
    setIsLoading(false)
  }, [])

  const updateTooltipPreferences = async (preferences: Partial<TooltipPreferences>) => {
    const newPreferences = { ...tooltipPreferences, ...preferences }
    setTooltipPreferences(newPreferences)

    // Save to localStorage
    localStorage.setItem("tooltip-preferences", JSON.stringify(newPreferences))

    // TODO: When Convex is fully set up, add database sync here
    // Example:
    // if (convex && isAuthenticated) {
    //   await updatePreferencesMutation({ enabled: newPreferences.enabled, delay: newPreferences.delay })
    // }
  }

  return (
    <TooltipPreferencesContext.Provider value={{ tooltipPreferences, updateTooltipPreferences, isLoading }}>
      {children}
    </TooltipPreferencesContext.Provider>
  )
}

export function useTooltipPreferences() {
  const context = useContext(TooltipPreferencesContext)
  if (context === undefined) {
    throw new Error("useTooltipPreferences must be used within a TooltipPreferencesProvider")
  }
  return context
}

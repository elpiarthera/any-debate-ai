"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useBreakpoint, useIsMobile, useIsTablet, useIsDesktop } from "@/hooks/responsive/useBreakpoint"
import { useOrientation } from "@/hooks/responsive/useOrientation"
import { useViewport } from "@/hooks/responsive/useViewport"
import type { Orientation } from "@/config/responsive"

interface DeviceContextValue {
  // Breakpoints
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean

  // Specific breakpoint checks
  isSmUp: boolean
  isMdUp: boolean
  isLgUp: boolean
  isXlUp: boolean

  // Orientation and viewport
  orientation: Orientation
  viewport: { width: number; height: number }

  // Utility methods
  isBreakpoint: (breakpoint: "sm" | "md" | "lg" | "xl") => boolean
}

const DeviceContext = createContext<DeviceContextValue | undefined>(undefined)

interface DeviceProviderProps {
  children: ReactNode
}

export function DeviceProvider({ children }: DeviceProviderProps) {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const isDesktop = useIsDesktop()

  const isSmUp = useBreakpoint("sm")
  const isMdUp = useBreakpoint("md")
  const isLgUp = useBreakpoint("lg")
  const isXlUp = useBreakpoint("xl")

  const orientation = useOrientation()
  const viewport = useViewport()

  const isBreakpoint = (breakpoint: "sm" | "md" | "lg" | "xl") => {
    switch (breakpoint) {
      case "sm":
        return isSmUp
      case "md":
        return isMdUp
      case "lg":
        return isLgUp
      case "xl":
        return isXlUp
      default:
        return false
    }
  }

  const value: DeviceContextValue = {
    isMobile,
    isTablet,
    isDesktop,
    isSmUp,
    isMdUp,
    isLgUp,
    isXlUp,
    orientation,
    viewport,
    isBreakpoint,
  }

  return <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
}

export function useDevice(): DeviceContextValue {
  const context = useContext(DeviceContext)
  if (context === undefined) {
    throw new Error("useDevice must be used within a DeviceProvider")
  }
  return context
}

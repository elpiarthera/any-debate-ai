"use client"

import type React from "react"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { trackPageView, initScrollDepthTracking, initSectionViewTracking } from "@/lib/analytics"

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    // Track page view on mount and route change
    trackPageView(window.location.href)
  }, [pathname])

  useEffect(() => {
    // Initialize scroll depth tracking
    const cleanupScroll = initScrollDepthTracking()

    // Initialize section view tracking
    const cleanupSections = initSectionViewTracking()

    return () => {
      cleanupScroll?.()
      cleanupSections?.()
    }
  }, [])

  return <>{children}</>
}

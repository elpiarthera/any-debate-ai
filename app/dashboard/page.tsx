"use client"
import { useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardContent } from "@/components/dashboard/DashboardContent"

export default function DashboardPage() {
  useEffect(() => {
    // Scroll the main content area to top
    const contentArea = document.querySelector("[data-dashboard-content]")
    if (contentArea) {
      contentArea.scrollTop = 0
    }
    // Also scroll window to top as fallback
    window.scrollTo(0, 0)
  }, [])

  return (
    <DashboardLayout title="Home" subtitle="Welcome back! Here's what's happening with your AI debates.">
      <DashboardContent currentView="overview" />
    </DashboardLayout>
  )
}

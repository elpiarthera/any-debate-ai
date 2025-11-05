"use client"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardContent } from "@/components/dashboard/DashboardContent"
import { useEffect } from "react"

export default function DashboardPage() {
  useEffect(() => {
    console.log("[v0] ===== DashboardPage mounted =====")
    console.log("[v0] DashboardPage - window.scrollY:", window.scrollY)
    console.log("[v0] DashboardPage - document.documentElement.scrollTop:", document.documentElement.scrollTop)
    console.log("[v0] DashboardPage - document.body.scrollTop:", document.body.scrollTop)
  }, [])

  return (
    <DashboardLayout title="Home" subtitle="Welcome back! Here's what's happening with your AI debates.">
      <DashboardContent currentView="overview" />
    </DashboardLayout>
  )
}

"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
import { MemoryDashboard } from "@/components/memory/memory-dashboard"
import { MemoryFilterSidebar } from "@/components/memory/MemoryFilterSidebar"
import { useDevice } from "@/contexts/DeviceProvider"
import type { MemoryScope, MemoryCategory } from "@/components/memory/memory-dashboard"

export default function MemoryPage() {
  const { isMobile } = useDevice()
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(!isMobile)
  const [selectedScope, setSelectedScope] = useState<MemoryScope | "all">("all")
  const [selectedCategory, setSelectedCategory] = useState<MemoryCategory | "all">("all")

  return (
    <div className="flex h-screen overflow-hidden">
      {/* First level sidebar - DashboardSidebar */}
      <DashboardSidebar />

      {/* Second level sidebar - MemoryFilterSidebar */}
      <MemoryFilterSidebar
        isOpen={isFilterSidebarOpen}
        onToggle={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
        selectedScope={selectedScope}
        onScopeChange={setSelectedScope}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <MemoryDashboard
          isFilterSidebarOpen={isFilterSidebarOpen}
          onToggleFilterSidebar={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
          selectedScope={selectedScope}
          onScopeChange={setSelectedScope}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>
    </div>
  )
}

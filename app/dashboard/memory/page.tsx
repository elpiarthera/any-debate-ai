"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
import { MemoryDashboard } from "@/components/memory/memory-dashboard"
import { MemoryFilterSidebar } from "@/components/memory/MemoryFilterSidebar"
import { useDevice } from "@/contexts/DeviceProvider"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { OrgSwitcher } from "@/components/dashboard/OrgSwitcher"
import type { MemoryScope, MemoryCategory } from "@/components/memory/memory-dashboard"

export default function MemoryPage() {
  const { isMobile } = useDevice()
  const [isDashboardSidebarCollapsed, setIsDashboardSidebarCollapsed] = useState(false)
  const [isFilterSidebarCollapsed, setIsFilterSidebarCollapsed] = useState(false)
  const [isDashboardSidebarOpen, setIsDashboardSidebarOpen] = useState(false)
  const [selectedScope, setSelectedScope] = useState<MemoryScope | "all">("all")
  const [selectedCategory, setSelectedCategory] = useState<MemoryCategory | "all">("all")

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile: Dashboard Sidebar in Sheet */}
      {isMobile && (
        <Sheet open={isDashboardSidebarOpen} onOpenChange={setIsDashboardSidebarOpen}>
          <SheetContent side="left" className="w-[280px] p-0">
            <div className="p-4 border-b">
              <OrgSwitcher />
            </div>
            <DashboardSidebar isCollapsed={false} onToggleCollapse={() => setIsDashboardSidebarOpen(false)} />
          </SheetContent>
        </Sheet>
      )}

      {/* Desktop: Always visible Dashboard Sidebar */}
      {!isMobile && (
        <DashboardSidebar
          isCollapsed={isDashboardSidebarCollapsed}
          onToggleCollapse={() => setIsDashboardSidebarCollapsed(!isDashboardSidebarCollapsed)}
        />
      )}

      {/* Second level sidebar - MemoryFilterSidebar */}
      {!isMobile && (
        <MemoryFilterSidebar
          isCollapsed={isFilterSidebarCollapsed}
          onToggleCollapse={() => setIsFilterSidebarCollapsed(!isFilterSidebarCollapsed)}
          selectedScope={selectedScope}
          onScopeChange={setSelectedScope}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile: Header with hamburger menu */}
        {isMobile && (
          <div className="border-b p-4 flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDashboardSidebarOpen(true)}
              className="min-h-[44px] min-w-[44px]"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <OrgSwitcher />
          </div>
        )}

        <MemoryDashboard
          isFilterSidebarOpen={!isFilterSidebarCollapsed}
          onToggleFilterSidebar={() => setIsFilterSidebarCollapsed(!isFilterSidebarCollapsed)}
          selectedScope={selectedScope}
          onScopeChange={setSelectedScope}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>
    </div>
  )
}

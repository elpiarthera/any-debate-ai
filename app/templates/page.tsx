"use client"

import { useState } from "react"
import { useDevice } from "@/contexts/DeviceProvider"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
import { TemplateFilterSidebar } from "@/components/templates/TemplateFilterSidebar"
import { TemplateList } from "@/components/templates/template-list"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { OrgSwitcher } from "@/components/dashboard/OrgSwitcher"

export default function TemplatesPage() {
  const { isMobile } = useDevice()
  const [isDashboardSidebarCollapsed, setIsDashboardSidebarCollapsed] = useState(false)
  const [isDashboardSidebarOpen, setIsDashboardSidebarOpen] = useState(false)
  const [isFilterSidebarCollapsed, setIsFilterSidebarCollapsed] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  return (
    <div className="h-screen flex">
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

      {/* Template Filter Sidebar (Second Level) */}
      {!isMobile && (
        <TemplateFilterSidebar
          isCollapsed={isFilterSidebarCollapsed}
          onToggleCollapse={() => setIsFilterSidebarCollapsed(!isFilterSidebarCollapsed)}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
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

        {/* Template List */}
        <div className="flex-1 overflow-hidden">
          <TemplateList selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
        </div>
      </div>
    </div>
  )
}

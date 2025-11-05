"use client"

import { useState } from "react"
import { FrameworkLibrary } from "@/components/module-libraries/FrameworkLibrary"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
import { useDevice } from "@/contexts/DeviceProvider"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OrgSwitcher } from "@/components/dashboard/OrgSwitcher"

export default function FrameworksPage() {
  const { isMobile } = useDevice()
  const [isDashboardSidebarCollapsed, setIsDashboardSidebarCollapsed] = useState(false)
  const [isDashboardSidebarOpen, setIsDashboardSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {!isMobile && (
        <DashboardSidebar
          isCollapsed={isDashboardSidebarCollapsed}
          onToggleCollapse={() => setIsDashboardSidebarCollapsed(!isDashboardSidebarCollapsed)}
        />
      )}

      {!isMobile && (
        <div className="flex-1 overflow-hidden">
          <FrameworkLibrary />
        </div>
      )}

      {isMobile && (
        <div className="flex-1 flex flex-col min-h-0 min-w-0 overflow-hidden">
          <div className="border-b p-3 flex items-center gap-2 min-w-0">
            <Button
              variant="ghost"
              size="sm"
              className="min-h-[44px] min-w-[44px] p-0 flex-shrink-0"
              onClick={() => setIsDashboardSidebarOpen(!isDashboardSidebarOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            <div className="flex-1 min-w-0">
              <OrgSwitcher />
            </div>
          </div>

          <FrameworkLibrary />
        </div>
      )}

      {isMobile && (
        <AdaptiveModal
          isOpen={isDashboardSidebarOpen}
          onClose={() => setIsDashboardSidebarOpen(false)}
          title="Dashboard Menu"
          description="Navigate through dashboard sections"
        >
          <div className="flex flex-col h-[70vh]">
            <div className="p-4 border-b">
              <OrgSwitcher />
            </div>
            <DashboardSidebar
              isCollapsed={false}
              onToggleCollapse={() => {}}
              onNavigate={() => setIsDashboardSidebarOpen(false)}
            />
          </div>
        </AdaptiveModal>
      )}
    </div>
  )
}

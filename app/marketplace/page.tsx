"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
import { MarketplaceList } from "@/components/marketplace/marketplace-list"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { OrgSwitcher } from "@/components/dashboard/OrgSwitcher"
import { useDevice } from "@/contexts/DeviceProvider"

export default function MarketplacePage() {
  const [isDashboardSidebarOpen, setIsDashboardSidebarOpen] = useState(false)
  const { isMobile } = useDevice()

  return (
    <div className="flex h-screen bg-background">
      {!isMobile && (
        <DashboardSidebar
          isCollapsed={isDashboardSidebarOpen}
          onToggleCollapse={() => setIsDashboardSidebarOpen(!isDashboardSidebarOpen)}
        />
      )}

      <div className="flex-1 flex flex-col min-h-0">
        {isMobile && (
          <div className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-40">
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 flex-shrink-0"
                  onClick={() => setIsDashboardSidebarOpen(!isDashboardSidebarOpen)}
                >
                  <Menu className="h-4 w-4" />
                </Button>
                <OrgSwitcher />
              </div>
            </div>
          </div>
        )}

        <MarketplaceList />
      </div>

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
            <DashboardSidebar isCollapsed={false} onToggleCollapse={() => setIsDashboardSidebarOpen(false)} />
          </div>
        </AdaptiveModal>
      )}
    </div>
  )
}

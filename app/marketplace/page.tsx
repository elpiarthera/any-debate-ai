"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
import { MarketplaceFilterSidebar } from "@/components/marketplace/MarketplaceFilterSidebar"
import { MarketplaceList } from "@/components/marketplace/marketplace-list"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { OrgSwitcher } from "@/components/dashboard/OrgSwitcher"
import { useDevice } from "@/contexts/DeviceProvider"
import { Sheet, SheetContent } from "@/components/ui/sheet"

export default function MarketplacePage() {
  const [isDashboardSidebarCollapsed, setIsDashboardSidebarCollapsed] = useState(false)
  const [isFilterSidebarCollapsed, setIsFilterSidebarCollapsed] = useState(false)
  const [isDashboardSidebarOpen, setIsDashboardSidebarOpen] = useState(false)
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const { isMobile } = useDevice()

  return (
    <div className="flex h-screen w-full bg-background">
      {!isMobile && (
        <>
          <DashboardSidebar
            isCollapsed={isDashboardSidebarCollapsed}
            onToggleCollapse={() => setIsDashboardSidebarCollapsed(!isDashboardSidebarCollapsed)}
          />
          <MarketplaceFilterSidebar
            isCollapsed={isFilterSidebarCollapsed}
            onToggleCollapse={() => setIsFilterSidebarCollapsed(!isFilterSidebarCollapsed)}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </>
      )}

      <div className="flex-1 flex flex-col min-h-0 w-full min-w-0">
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

        <MarketplaceList
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onOpenFilters={() => setIsFilterSidebarOpen(true)}
        />
      </div>

      {isMobile && (
        <>
          <AdaptiveModal
            isOpen={isDashboardSidebarOpen}
            onClose={() => setIsDashboardSidebarOpen(false)}
            title="Dashboard Menu"
            description="Navigate through dashboard sections"
          >
            <div className="flex flex-col flex-1 min-h-0">
              <div className="p-4 border-b shrink-0">
                <OrgSwitcher />
              </div>
              <div className="flex-1 min-h-0">
                <DashboardSidebar isCollapsed={false} onToggleCollapse={() => setIsDashboardSidebarOpen(false)} />
              </div>
            </div>
          </AdaptiveModal>

          <Sheet open={isFilterSidebarOpen} onOpenChange={setIsFilterSidebarOpen}>
            <SheetContent side="right" className="w-[280px] p-0">
              <MarketplaceFilterSidebar
                isCollapsed={false}
                onToggleCollapse={() => setIsFilterSidebarOpen(false)}
                selectedCategory={selectedCategory}
                onCategoryChange={(category) => {
                  setSelectedCategory(category)
                  setIsFilterSidebarOpen(false)
                }}
              />
            </SheetContent>
          </Sheet>
        </>
      )}
    </div>
  )
}

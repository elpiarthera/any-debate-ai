"use client"

import { useState } from "react"
import { AgentList } from "@/components/agents/agent-list"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
import { AgentFilterSidebar } from "@/components/agents/AgentFilterSidebar"
import { AgentsSecondarySidebar } from "@/components/agents/AgentsSecondarySidebar"
import { useDevice } from "@/contexts/DeviceProvider"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OrgSwitcher } from "@/components/dashboard/OrgSwitcher"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function AgentsPage() {
  const { isMobile } = useDevice()
  const [isDashboardSidebarCollapsed, setIsDashboardSidebarCollapsed] = useState(false)
  const [isAgentFilterSidebarCollapsed, setIsAgentFilterSidebarCollapsed] = useState(false)
  const [isDashboardSidebarOpen, setIsDashboardSidebarOpen] = useState(false)
  const [isSecondarySidebarOpen, setIsSecondarySidebarOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("All")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {!isMobile && (
        <DashboardSidebar
          isCollapsed={isDashboardSidebarCollapsed}
          onToggleCollapse={() => setIsDashboardSidebarCollapsed(!isDashboardSidebarCollapsed)}
        />
      )}

      {!isMobile && (
        <SidebarProvider>
          <AgentsSecondarySidebar />
          <SidebarInset>
            <div className="flex h-full overflow-hidden">
              <AgentFilterSidebar
                isCollapsed={isAgentFilterSidebarCollapsed}
                onToggleCollapse={() => setIsAgentFilterSidebarCollapsed(!isAgentFilterSidebarCollapsed)}
                selectedFilter={selectedFilter}
                onFilterChange={setSelectedFilter}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
              <div className="flex-1 min-w-0 overflow-hidden">
                <AgentList selectedFilter={selectedFilter} selectedCategory={selectedCategory} />
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
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
            <Button
              variant="ghost"
              size="sm"
              className="min-h-[44px] px-3 flex-shrink-0"
              onClick={() => setIsSecondarySidebarOpen(!isSecondarySidebarOpen)}
            >
              Agents Menu
            </Button>
            <div className="flex-1 min-w-0">
              <OrgSwitcher />
            </div>
          </div>

          <AgentList selectedFilter={selectedFilter} selectedCategory={selectedCategory} />
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
            <DashboardSidebar isCollapsed={false} onToggleCollapse={() => setIsDashboardSidebarOpen(false)} />
          </div>
        </AdaptiveModal>
      )}

      {isMobile && (
        <AdaptiveModal
          isOpen={isSecondarySidebarOpen}
          onClose={() => setIsSecondarySidebarOpen(false)}
          title="Agents Menu"
          description="Navigate through agents sections"
        >
          <div className="flex flex-col h-[50vh]">
            <AgentsSecondarySidebar />
          </div>
        </AdaptiveModal>
      )}
    </div>
  )
}

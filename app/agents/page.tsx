"use client"

import { useState } from "react"
import { AgentList } from "@/components/agents/agent-list"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
import { AgentFilterSidebar } from "@/components/agents/AgentFilterSidebar"
import { useDevice } from "@/contexts/DeviceProvider"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OrgSwitcher } from "@/components/dashboard/OrgSwitcher"

export default function AgentsPage() {
  const { isMobile } = useDevice()
  const [isDashboardSidebarCollapsed, setIsDashboardSidebarCollapsed] = useState(false)
  const [isAgentFilterSidebarCollapsed, setIsAgentFilterSidebarCollapsed] = useState(false)
  const [isDashboardSidebarOpen, setIsDashboardSidebarOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("All")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")

  return (
    <div className="flex h-screen bg-background">
      {!isMobile && (
        <DashboardSidebar
          isCollapsed={isDashboardSidebarCollapsed}
          onToggleCollapse={() => setIsDashboardSidebarCollapsed(!isDashboardSidebarCollapsed)}
        />
      )}

      {!isMobile && (
        <AgentFilterSidebar
          isCollapsed={isAgentFilterSidebarCollapsed}
          onToggleCollapse={() => setIsAgentFilterSidebarCollapsed(!isAgentFilterSidebarCollapsed)}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      )}

      <div className="flex-1 flex flex-col min-h-0">
        {isMobile && (
          <div className="border-b p-3 flex items-center gap-2">
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
        )}

        <AgentList selectedFilter={selectedFilter} selectedCategory={selectedCategory} />
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

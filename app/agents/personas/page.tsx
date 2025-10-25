"use client"

import { useState } from "react"
import { PersonaLibrary } from "@/components/module-libraries/PersonaLibrary"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
import { AgentsSecondarySidebar } from "@/components/agents/AgentsSecondarySidebar"
import { useDevice } from "@/contexts/DeviceProvider"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OrgSwitcher } from "@/components/dashboard/OrgSwitcher"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function PersonasPage() {
  const { isMobile } = useDevice()
  const [isDashboardSidebarCollapsed, setIsDashboardSidebarCollapsed] = useState(false)
  const [isDashboardSidebarOpen, setIsDashboardSidebarOpen] = useState(false)
  const [isSecondarySidebarOpen, setIsSecondarySidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Main dashboard sidebar */}
      {!isMobile && (
        <DashboardSidebar
          isCollapsed={isDashboardSidebarCollapsed}
          onToggleCollapse={() => setIsDashboardSidebarCollapsed(!isDashboardSidebarCollapsed)}
        />
      )}

      {/* Secondary sidebar with SidebarProvider for inset layout */}
      {!isMobile && (
        <SidebarProvider>
          <AgentsSecondarySidebar />
          <SidebarInset>
            <PersonaLibrary />
          </SidebarInset>
        </SidebarProvider>
      )}

      {/* Mobile layout */}
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

          <PersonaLibrary />
        </div>
      )}

      {/* Mobile dashboard sidebar modal */}
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

      {/* Mobile secondary sidebar modal */}
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

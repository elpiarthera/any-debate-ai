"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useDevice } from "@/contexts/DeviceProvider"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
import { AgentComposer } from "@/components/agent-composer/AgentComposer"
import { useAgentLibrary } from "@/hooks/dashboard/useAgentLibrary"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { OrgSwitcher } from "@/components/dashboard/OrgSwitcher"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import type { Agent } from "@/types/dashboard"
import { toast } from "sonner"

export default function NewAgentPage() {
  const router = useRouter()
  const { isMobile } = useDevice()
  const { addAgent } = useAgentLibrary()
  const [isDashboardSidebarCollapsed, setIsDashboardSidebarCollapsed] = useState(false)
  const [isDashboardSidebarOpen, setIsDashboardSidebarOpen] = useState(false)

  const handleSave = (config: {
    name: string
    roleId: string
    personaId: string
    frameworkId: string
    customInstructions?: string
  }) => {
    const newAgent: Agent = {
      id: crypto.randomUUID(),
      name: config.name,
      role: config.roleId,
      persona: config.personaId,
      framework: config.frameworkId,
      isFavorite: false,
      usageCount: 0,
      createdAt: new Date(),
    }

    addAgent(newAgent)
    toast.success(`Agent "${newAgent.name}" created successfully!`)
    router.push("/agents")
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {!isMobile && (
        <DashboardSidebar
          isCollapsed={isDashboardSidebarCollapsed}
          onToggleCollapse={() => setIsDashboardSidebarCollapsed(!isDashboardSidebarCollapsed)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0 min-w-0 overflow-hidden">
        {isMobile && (
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
        )}

        {/* Agent Composer */}
        <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto h-full">
            <AgentComposer onSave={handleSave} />
          </div>
        </div>
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

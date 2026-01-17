"use client"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { AgentComposer } from "@/components/agent-composer/AgentComposer"
import { useAgentLibrary } from "@/hooks/dashboard/useAgentLibrary"
import type { Agent } from "@/types/dashboard"
import { toast } from "sonner"

export default function NewAgentPage() {
  const router = useRouter()
  const { addAgent } = useAgentLibrary()

  const handleSave = (config: {
    name: string
    roleId: string
    personaId: string
    frameworkId: string
    model?: string
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
    <DashboardLayout
      title="Create New Agent"
      subtitle="Configure your AI agent with role, personality, and thinking framework"
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Agents", href: "/agents" },
        { label: "New Agent" },
      ]}
    >
      <div className="max-w-7xl mx-auto">
        <AgentComposer onSave={handleSave} />
      </div>
    </DashboardLayout>
  )
}

"use client"

import { useRouter } from "next/navigation"
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

    // Navigate back to agents list
    router.push("/agents")
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto h-[calc(100vh-2rem)] md:h-[calc(100vh-3rem)] lg:h-[calc(100vh-4rem)]">
        <AgentComposer onSave={handleSave} />
      </div>
    </div>
  )
}

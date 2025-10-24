"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useAgentLibrary } from "@/hooks/dashboard/useAgentLibrary"
import { AgentEditor } from "@/components/agent-composer/AgentEditor"
import { toast } from "sonner"
import type { Agent } from "@/types/dashboard"

export default function EditAgentPage() {
  const params = useParams()
  const router = useRouter()
  const { agents, updateAgent } = useAgentLibrary()
  const [agent, setAgent] = useState<Agent | null>(null)

  const agentId = params.id as string

  useEffect(() => {
    const foundAgent = agents.find((a) => a.id === agentId)
    if (foundAgent) {
      setAgent(foundAgent)
    } else {
      toast.error("Agent not found")
      router.push("/dashboard")
    }
  }, [agentId, agents, router])

  const handleSave = (config: {
    name: string
    roleId: string
    personaId: string
    frameworkId: string
    customInstructions?: string
  }) => {
    updateAgent(agentId, {
      name: config.name,
      roleId: config.roleId,
      personaId: config.personaId,
      frameworkId: config.frameworkId,
      customInstructions: config.customInstructions,
    })
    toast.success("Agent updated successfully")
    router.push("/dashboard")
  }

  const handleCancel = () => {
    router.push("/dashboard")
  }

  if (!agent) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading agent...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <AgentEditor agent={agent} onSave={handleSave} onCancel={handleCancel} />
    </div>
  )
}

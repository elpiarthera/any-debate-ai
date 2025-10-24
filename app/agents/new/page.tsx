"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AgentBuilderModal } from "@/components/agent-config/AgentBuilderModal"
import { useAgentLibrary } from "@/hooks/dashboard/useAgentLibrary"
import type { AgentConfigurationDraft } from "@/lib/agent-config/types"
import type { Agent } from "@/types/dashboard"
import { toast } from "sonner"

export default function NewAgentPage() {
  const router = useRouter()
  const { addAgent } = useAgentLibrary()
  const [isOpen, setIsOpen] = useState(false)

  // Open modal on mount
  useEffect(() => {
    setIsOpen(true)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    // Navigate back to agents list after modal closes
    setTimeout(() => {
      router.push("/agents")
    }, 300)
  }

  const handleSave = (config: AgentConfigurationDraft) => {
    // Create new agent from configuration
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
    <div className="min-h-screen w-full overflow-x-hidden bg-background">
      <AgentBuilderModal isOpen={isOpen} onClose={handleClose} onSave={handleSave} />
    </div>
  )
}

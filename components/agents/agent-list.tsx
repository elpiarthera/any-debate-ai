"use client"

import { useState } from "react"
import { useDevice } from "@/contexts/DeviceProvider"
import { AgentListMobile } from "./mobile/agent-list-mobile"
import { AgentListDesktop } from "./desktop/agent-list-desktop"
import { mockAgents, type AgentWithMetadata } from "@/lib/mock-data/agents"

interface AgentListProps {
  selectedFilter: string
  selectedCategory: string
}

export function AgentList({ selectedFilter, selectedCategory }: AgentListProps) {
  const { isMobile } = useDevice()
  const [agents, setAgents] = useState<AgentWithMetadata[]>(mockAgents)

  const handleFavoriteToggle = (id: string) => {
    setAgents((prev) => prev.map((agent) => (agent.id === id ? { ...agent, isFavorite: !agent.isFavorite } : agent)))
  }

  const handleDelete = (id: string) => {
    setAgents((prev) => prev.filter((agent) => agent.id !== id))
  }

  const handleDuplicate = (id: string) => {
    const agentToDuplicate = agents.find((agent) => agent.id === id)
    if (!agentToDuplicate) return

    const newAgent: AgentWithMetadata = {
      ...agentToDuplicate,
      id: `${Date.now()}`,
      name: `${agentToDuplicate.name} (Copy)`,
      isTemplate: false,
      isFavorite: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      metadata: {
        ...agentToDuplicate.metadata,
        usageCount: 0,
        lastUsed: null,
        createdBy: "current-user",
      },
    }

    setAgents((prev) => [newAgent, ...prev])
  }

  return isMobile ? (
    <AgentListMobile
      agents={agents}
      onFavoriteToggle={handleFavoriteToggle}
      onDelete={handleDelete}
      onDuplicate={handleDuplicate}
      selectedFilter={selectedFilter}
      selectedCategory={selectedCategory}
    />
  ) : (
    <AgentListDesktop
      agents={agents}
      onFavoriteToggle={handleFavoriteToggle}
      onDelete={handleDelete}
      onDuplicate={handleDuplicate}
      selectedFilter={selectedFilter}
      selectedCategory={selectedCategory}
    />
  )
}

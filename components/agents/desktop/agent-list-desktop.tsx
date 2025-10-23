"use client"

import { useState } from "react"
import { Search, Plus, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AgentCard } from "../agent-card"
import type { AgentWithMetadata } from "@/lib/mock-data/agents"
import { useRouter } from "next/navigation"
import { OrgSwitcher } from "@/components/dashboard/OrgSwitcher"
import { TokenBalance } from "@/components/dashboard/TokenBalance"
import { QuickActionsMenu } from "@/components/dashboard/QuickActionsMenu"
import { ThemeToggle } from "@/components/ui/theme-toggle"

interface AgentListDesktopProps {
  agents: AgentWithMetadata[]
  onFavoriteToggle: (id: string) => void
  onDelete: (id: string) => void
  onDuplicate: (id: string) => void
  selectedFilter: string
  selectedCategory: string
}

export function AgentListDesktop({
  agents,
  onFavoriteToggle,
  onDelete,
  onDuplicate,
  selectedFilter,
  selectedCategory,
}: AgentListDesktopProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.persona.name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "All Categories" || agent.metadata.category === selectedCategory

    const matchesFilter =
      selectedFilter === "All" ||
      (selectedFilter === "Favorites" && agent.isFavorite) ||
      (selectedFilter === "Templates" && agent.isTemplate)

    return matchesSearch && matchesCategory && matchesFilter
  })

  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <OrgSwitcher />
            <h1 className="text-lg font-semibold">AI Agents</h1>
          </div>
          <div className="flex items-center gap-3">
            <TokenBalance />
            <QuickActionsMenu />
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="border-b p-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search agents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <Button onClick={() => router.push("/agents/new")}>
              <Plus className="h-4 w-4 mr-2" />
              Create Agent
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {filteredAgents.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Filter className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No agents found</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                Try adjusting your filters or search query, or create a new agent to get started
              </p>
              <Button onClick={() => router.push("/agents/new")}>
                <Plus className="h-4 w-4 mr-2" />
                Create Agent
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {filteredAgents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onFavoriteToggle={onFavoriteToggle}
                  onDelete={onDelete}
                  onDuplicate={onDuplicate}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

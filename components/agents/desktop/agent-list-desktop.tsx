"use client"

import { useState } from "react"
import { Search, Plus, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AgentCard } from "../agent-card"
import type { AgentWithMetadata } from "@/lib/mock-data/agents"
import { ROLE_CATEGORIES } from "@/lib/agent-config/roles"
import { useRouter } from "next/navigation"

interface AgentListDesktopProps {
  agents: AgentWithMetadata[]
  onFavoriteToggle: (id: string) => void
  onDelete: (id: string) => void
  onDuplicate: (id: string) => void
}

export function AgentListDesktop({ agents, onFavoriteToggle, onDelete, onDuplicate }: AgentListDesktopProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [filterTab, setFilterTab] = useState<"all" | "favorites" | "templates">("all")

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.persona.name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = !selectedCategory || agent.metadata.category === selectedCategory

    const matchesFilter =
      filterTab === "all" ||
      (filterTab === "favorites" && agent.isFavorite) ||
      (filterTab === "templates" && agent.isTemplate)

    return matchesSearch && matchesCategory && matchesFilter
  })

  return (
    <div className="flex h-full">
      <div className="w-64 border-r p-4 space-y-4">
        <div>
          <h3 className="text-sm font-semibold mb-3">Filters</h3>
          <Tabs value={filterTab} onValueChange={(v) => setFilterTab(v as typeof filterTab)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all" className="text-xs">
                All
              </TabsTrigger>
              <TabsTrigger value="favorites" className="text-xs">
                Favorites
              </TabsTrigger>
              <TabsTrigger value="templates" className="text-xs">
                Templates
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-3">Categories</h3>
          <div className="space-y-1">
            <Button
              variant={selectedCategory === null ? "secondary" : "ghost"}
              className="w-full justify-start text-sm"
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </Button>
            {ROLE_CATEGORIES.map((category) => {
              const count = agents.filter((a) => a.metadata.category === category).length
              return (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "secondary" : "ghost"}
                  className="w-full justify-between text-sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  <span className="truncate">{category}</span>
                  <Badge variant="outline" className="ml-2 shrink-0">
                    {count}
                  </Badge>
                </Button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
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

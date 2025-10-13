"use client"

import { useState } from "react"
import { Search, Plus, Filter, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { AgentCard } from "../agent-card"
import type { AgentWithMetadata } from "@/lib/mock-data/agents"
import { ROLE_CATEGORIES } from "@/lib/agent-config/roles"
import { useRouter } from "next/navigation"

interface AgentListMobileProps {
  agents: AgentWithMetadata[]
  onFavoriteToggle: (id: string) => void
  onDelete: (id: string) => void
  onDuplicate: (id: string) => void
}

export function AgentListMobile({ agents, onFavoriteToggle, onDelete, onDuplicate }: AgentListMobileProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [showTemplatesOnly, setShowTemplatesOnly] = useState(false)

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.persona.name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = !selectedCategory || agent.metadata.category === selectedCategory
    const matchesFavorites = !showFavoritesOnly || agent.isFavorite
    const matchesTemplates = !showTemplatesOnly || agent.isTemplate

    return matchesSearch && matchesCategory && matchesFavorites && matchesTemplates
  })

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 bg-background z-10 border-b p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh]">
              <SheetHeader>
                <SheetTitle>Filter Agents</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-3">Quick Filters</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant={showFavoritesOnly ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                    >
                      Favorites
                    </Badge>
                    <Badge
                      variant={showTemplatesOnly ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setShowTemplatesOnly(!showTemplatesOnly)}
                    >
                      Templates
                    </Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3">Category</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant={selectedCategory === null ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedCategory(null)}
                    >
                      All
                    </Badge>
                    {ROLE_CATEGORIES.map((category) => (
                      <Badge
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Button size="icon" onClick={() => router.push("/agents/new")}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <Badge
            variant={selectedCategory === null ? "default" : "outline"}
            className="cursor-pointer shrink-0"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Badge>
          {ROLE_CATEGORIES.slice(0, 4).map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer shrink-0"
              onClick={() => setSelectedCategory(category)}
            >
              {category.split(" & ")[0]}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {filteredAgents.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <Filter className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">No agents found</h3>
            <p className="text-sm text-muted-foreground mb-4">Try adjusting your filters or search query</p>
            <Button onClick={() => router.push("/agents/new")}>
              <Plus className="h-4 w-4 mr-2" />
              Create Agent
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
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
  )
}

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
import { TokenBalance } from "@/components/dashboard/TokenBalance"
import { QuickActionsMenu } from "@/components/dashboard/QuickActionsMenu"
import { ThemeToggle } from "@/components/ui/theme-toggle"

interface AgentListMobileProps {
  agents: AgentWithMetadata[]
  onFavoriteToggle: (id: string) => void
  onDelete: (id: string) => void
  onDuplicate: (id: string) => void
  selectedFilter: string
  selectedCategory: string
}

export function AgentListMobile({
  agents,
  onFavoriteToggle,
  onDelete,
  onDuplicate,
  selectedFilter,
  selectedCategory,
}: AgentListMobileProps) {
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
    <div className="flex flex-col h-full">
      <div className="border-b p-3 flex items-center justify-between">
        <h1 className="text-base font-semibold">AI Agents</h1>
        <div className="flex items-center gap-2">
          <TokenBalance />
          <QuickActionsMenu />
          <ThemeToggle />
        </div>
      </div>

      <div className="sticky top-0 bg-background z-10 border-b p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 min-h-[44px]"
            />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="min-h-[44px] min-w-[44px] bg-transparent">
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
                      variant={selectedFilter === "Favorites" ? "default" : "outline"}
                      className="cursor-pointer min-h-[44px] px-4"
                      onClick={() => console.log("Toggle Favorites")}
                    >
                      Favorites
                    </Badge>
                    <Badge
                      variant={selectedFilter === "Templates" ? "default" : "outline"}
                      className="cursor-pointer min-h-[44px] px-4"
                      onClick={() => console.log("Toggle Templates")}
                    >
                      Templates
                    </Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3">Category</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant={selectedCategory === "All Categories" ? "default" : "outline"}
                      className="cursor-pointer min-h-[44px] px-4"
                      onClick={() => console.log("Select All Categories")}
                    >
                      All Categories
                    </Badge>
                    {ROLE_CATEGORIES.map((category) => (
                      <Badge
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        className="cursor-pointer min-h-[44px] px-4"
                        onClick={() => console.log(`Select ${category}`)}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Button size="icon" onClick={() => router.push("/agents/new")} className="min-h-[44px] min-w-[44px]">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <Badge
            variant={selectedCategory === "All Categories" ? "default" : "outline"}
            className="cursor-pointer shrink-0 min-h-[44px] px-4"
            onClick={() => console.log("Select All Categories")}
          >
            All Categories
          </Badge>
          {ROLE_CATEGORIES.slice(0, 4).map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer shrink-0 min-h-[44px] px-4"
              onClick={() => console.log(`Select ${category}`)}
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
            <Button onClick={() => router.push("/agents/new")} className="min-h-[48px]">
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

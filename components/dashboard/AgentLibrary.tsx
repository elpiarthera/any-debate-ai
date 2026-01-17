"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, Star, Search, Plus, Trash2, Edit } from "lucide-react"
import { useAgentLibrary } from "@/hooks/dashboard/useAgentLibrary"
import { useDevice } from "@/contexts/DeviceProvider"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

export function AgentLibrary() {
  const { agents, favorites, toggleFavorite, deleteAgent, isLoading } = useAgentLibrary()
  const [searchQuery, setSearchQuery] = useState("")
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const { isMobile } = useDevice()
  const router = useRouter()

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.role.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFavorites = !showFavoritesOnly || favorites.includes(agent.id)
    return matchesSearch && matchesFavorites
  })

  const handleFavorite = (agentId: string) => {
    toggleFavorite(agentId)
    const isFav = favorites.includes(agentId)
    toast.success(isFav ? "Removed from favorites" : "Added to favorites")
  }

  const handleDelete = (agentId: string, name: string) => {
    if (confirm(`Delete agent "${name}"?`)) {
      deleteAgent(agentId)
      toast.success("Agent deleted")
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className={isMobile ? "text-lg" : "text-xl"}>Agent Library</CardTitle>
          <Button size="sm" onClick={() => router.push("/agents")}>
            <Plus className="h-4 w-4 mr-1" />
            New
          </Button>
        </div>

        <div className="flex gap-2 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button
            variant={showFavoritesOnly ? "default" : "outline"}
            size="icon"
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          >
            <Star className={cn("h-4 w-4", showFavoritesOnly && "fill-current")} />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {filteredAgents.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Bot className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No agents found</p>
            <Button variant="link" onClick={() => router.push("/agents")} className="mt-2">
              Create your first agent
            </Button>
          </div>
        ) : (
          <div className={cn("grid gap-3", isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2")}>
            <AnimatePresence>
              {filteredAgents.map((agent, index) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10 bg-primary/10">
                      <AvatarFallback>
                        <Bot className="h-5 w-5 text-primary" />
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm">{agent.name}</h4>
                        {favorites.includes(agent.id) && <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{agent.role}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {agent.framework}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{agent.usageCount} uses</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0"
                        onClick={() => handleFavorite(agent.id)}
                      >
                        <Star className={cn("h-3 w-3", favorites.includes(agent.id) && "fill-current")} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0"
                        onClick={() => router.push(`/agents?edit=${agent.id}`)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0"
                        onClick={() => handleDelete(agent.id, agent.name)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

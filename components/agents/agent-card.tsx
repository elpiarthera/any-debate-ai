"use client"

import { Star, MoreVertical, Play, Copy, Trash2, Edit } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { AgentWithMetadata } from "@/lib/mock-data/agents"
import { formatDistanceToNow } from "@/lib/utils/date"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface AgentCardProps {
  agent: AgentWithMetadata
  onFavoriteToggle: (id: string) => void
  onDelete: (id: string) => void
  onDuplicate: (id: string) => void
}

export function AgentCard({ agent, onFavoriteToggle, onDelete, onDuplicate }: AgentCardProps) {
  const { toast } = useToast()
  const router = useRouter()

  const handleUse = () => {
    router.push(`/chat?agent=${agent.id}`)
    toast({
      title: "Agent loaded",
      description: `${agent.name} is ready to chat`,
    })
  }

  const handleEdit = () => {
    router.push(`/agents/${agent.id}/edit`)
  }

  const handleDuplicate = () => {
    onDuplicate(agent.id)
    toast({
      title: "Agent duplicated",
      description: `Created a copy of ${agent.name}`,
    })
  }

  const handleDelete = () => {
    onDelete(agent.id)
    toast({
      title: "Agent deleted",
      description: `${agent.name} has been removed`,
      variant: "destructive",
    })
  }

  return (
    <Card className="group hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12 shrink-0">
            <AvatarFallback className="text-lg">{agent.role.icon}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate">{agent.name}</h3>
                <p className="text-xs text-muted-foreground truncate">{agent.role.name}</p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onFavoriteToggle(agent.id)}>
                  <Star className={`h-4 w-4 ${agent.isFavorite ? "fill-yellow-400 text-yellow-400" : ""}`} />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleUse}>
                      <Play className="h-4 w-4 mr-2" />
                      Use Agent
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleEdit}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDuplicate}>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-2">
              <Badge variant="secondary" className="text-xs">
                {agent.persona.name}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {agent.framework.name}
              </Badge>
              {agent.isTemplate && (
                <Badge variant="default" className="text-xs">
                  Template
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{agent.metadata.usageCount} uses</span>
              {agent.metadata.lastUsed && <span>{formatDistanceToNow(agent.metadata.lastUsed)} ago</span>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

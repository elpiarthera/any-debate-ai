"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Trash2, MoreVertical, Play, Pause, Edit } from "lucide-react"
import { toast } from "sonner"

interface AIAgent {
  id: string
  name: string
  type: "GPT-4" | "Claude-3.5" | "Llama-3" | "Gemini" | "Custom"
  description: string
  createdAt: Date
  isActive: boolean
}

interface AgentCardProps {
  agent: AIAgent
  onToggleStatus: (agentId: string) => void
  onDelete: (agentId: string) => void
  onEdit?: (agentId: string) => void
}

const MODEL_COLORS = {
  "GPT-4": "bg-green-500",
  "Claude-3.5": "bg-orange-500",
  "Llama-3": "bg-blue-500",
  Gemini: "bg-purple-500",
  Custom: "bg-primary",
}

export function AgentCard({ agent, onToggleStatus, onDelete, onEdit }: AgentCardProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleToggleStatus = async () => {
    setIsLoading(true)
    try {
      onToggleStatus(agent.id)
      toast.success(`${agent.name} ${agent.isActive ? "deactivated" : "activated"}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = () => {
    onDelete(agent.id)
    toast.success(`${agent.name} deleted`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={`relative overflow-hidden ${agent.isActive ? "ring-2 ring-primary" : ""}`}>
        {/* Status Indicator */}
        <div className={`absolute top-0 left-0 w-full h-1 ${agent.isActive ? "bg-primary" : "bg-muted"}`} />

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${MODEL_COLORS[agent.type]}`} />
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  {agent.name}
                  {agent.isActive && (
                    <Badge variant="default" className="text-xs">
                      Active
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription className="text-sm">{agent.description}</CardDescription>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleToggleStatus} disabled={isLoading}>
                  {agent.isActive ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Deactivate
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Activate
                    </>
                  )}
                </DropdownMenuItem>
                {agent.type === "Custom" && onEdit && (
                  <DropdownMenuItem onClick={() => onEdit(agent.id)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                )}
                {agent.type === "Custom" && (
                  <DropdownMenuItem onClick={handleDelete} className="text-destructive focus:text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {agent.type}
              </Badge>
              <span className="text-xs text-muted-foreground">Created {agent.createdAt.toLocaleDateString()}</span>
            </div>

            <Button
              variant={agent.isActive ? "secondary" : "default"}
              size="sm"
              onClick={handleToggleStatus}
              disabled={isLoading}
              className="h-7"
            >
              {agent.isActive ? "Pause" : "Start"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

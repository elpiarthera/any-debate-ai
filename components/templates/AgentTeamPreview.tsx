"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Brain, Target, MessageSquare, Edit, Copy, Trash2 } from "lucide-react"
import type { AgentConfig } from "@/lib/types"
import { useDevice } from "@/contexts/DeviceProvider"

interface AgentTeamPreviewProps {
  agents: AgentConfig[]
  title?: string
  description?: string
  showActions?: boolean
  onEdit?: () => void
  onDuplicate?: () => void
  onDelete?: () => void
  compact?: boolean
}

export function AgentTeamPreview({
  agents,
  title,
  description,
  showActions = false,
  onEdit,
  onDuplicate,
  onDelete,
  compact = false,
}: AgentTeamPreviewProps) {
  const { isMobile } = useDevice()

  if (compact) {
    return (
      <Card className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 flex-shrink-0">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              {title && <h4 className="font-semibold text-sm line-clamp-1">{title}</h4>}
              <p className="text-xs text-muted-foreground">
                {agents.length} {agents.length === 1 ? "agent" : "agents"}
              </p>
            </div>
          </div>
          {showActions && (
            <div className="flex items-center gap-1">
              {onEdit && (
                <Button variant="ghost" size="sm" onClick={onEdit} className="h-8 w-8 p-0">
                  <Edit className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-4 md:p-6">
      <div className="space-y-4">
        {/* Header */}
        {(title || description || showActions) && (
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0 space-y-1">
              {title && <h3 className="text-lg md:text-xl font-semibold line-clamp-2">{title}</h3>}
              {description && <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>}
            </div>
            {showActions && (
              <div className="flex items-center gap-1 flex-shrink-0">
                {onEdit && (
                  <Button variant="ghost" size="sm" onClick={onEdit} className="min-h-[36px] min-w-[36px]">
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
                {onDuplicate && (
                  <Button variant="ghost" size="sm" onClick={onDuplicate} className="min-h-[36px] min-w-[36px]">
                    <Copy className="h-4 w-4" />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onDelete}
                    className="min-h-[36px] min-w-[36px] text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Team Stats */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">
              {agents.length} {agents.length === 1 ? "Agent" : "Agents"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {agents.reduce((sum, agent) => sum + (agent.maxTurns || 3), 0)} total turns
            </span>
          </div>
        </div>

        {/* Agent Cards */}
        <div className={isMobile ? "space-y-3" : "grid grid-cols-1 md:grid-cols-2 gap-3"}>
          {agents.map((agent, index) => (
            <AgentPreviewCard key={index} agent={agent} index={index} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </Card>
  )
}

interface AgentPreviewCardProps {
  agent: AgentConfig
  index: number
  isMobile: boolean
}

function AgentPreviewCard({ agent, index, isMobile }: AgentPreviewCardProps) {
  return (
    <Card className="p-3 md:p-4 bg-accent/50 border-accent">
      <div className="space-y-3">
        {/* Agent Header */}
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 flex-shrink-0">
            <span className="text-sm font-semibold text-primary">{index + 1}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm md:text-base line-clamp-1">{agent.name}</h4>
            <p className="text-xs text-muted-foreground line-clamp-1">{agent.role}</p>
          </div>
        </div>

        {/* Agent Details */}
        <div className="space-y-2 text-xs">
          {/* Perspective */}
          {agent.perspective && (
            <div className="flex items-start gap-2">
              <Target className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <p className="text-muted-foreground line-clamp-2 flex-1">{agent.perspective}</p>
            </div>
          )}

          {/* Model */}
          <div className="flex items-center gap-2">
            <Brain className="h-3.5 w-3.5 text-muted-foreground" />
            <Badge variant="outline" className="text-xs">
              {agent.model}
            </Badge>
          </div>

          {/* Turns */}
          <div className="flex items-center gap-2">
            <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">
              {agent.maxTurns || 3} {(agent.maxTurns || 3) === 1 ? "turn" : "turns"}
            </span>
          </div>
        </div>

        {/* Temperature Indicator */}
        {agent.temperature !== undefined && (
          <div className="pt-2 border-t border-border/50">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Temperature</span>
              <span className="font-medium">{agent.temperature.toFixed(1)}</span>
            </div>
            <div className="mt-1 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${(agent.temperature / 2) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Brain, Target, MessageSquare, Edit, ChevronDown } from "lucide-react"
import { useState } from "react"
import type { AgentConfig } from "@/lib/types"

interface AgentTeamPreviewMobileProps {
  agents: AgentConfig[]
  title?: string
  description?: string
  showActions?: boolean
  onEdit?: () => void
}

export function AgentTeamPreviewMobile({
  agents,
  title,
  description,
  showActions = false,
  onEdit,
}: AgentTeamPreviewMobileProps) {
  const [expandedAgents, setExpandedAgents] = useState<Set<number>>(new Set([0]))

  const toggleAgent = (index: number) => {
    const newExpanded = new Set(expandedAgents)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedAgents(newExpanded)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      {(title || description) && (
        <div className="space-y-2">
          {title && <h3 className="text-xl font-semibold">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}

      {/* Team Stats */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold">
                {agents.length} {agents.length === 1 ? "Agent" : "Agents"}
              </p>
              <p className="text-xs text-muted-foreground">
                {agents.reduce((sum, agent) => sum + (agent.maxTurns || 3), 0)} total turns
              </p>
            </div>
          </div>
          {showActions && onEdit && (
            <Button variant="outline" size="sm" onClick={onEdit} className="min-h-[44px] min-w-[44px] bg-transparent">
              <Edit className="h-4 w-4" />
            </Button>
          )}
        </div>
      </Card>

      {/* Agent List */}
      <div className="space-y-3">
        {agents.map((agent, index) => (
          <Card key={index} className="overflow-hidden">
            <button
              onClick={() => toggleAgent(index)}
              className="w-full p-4 flex items-center justify-between gap-3 min-h-[72px]"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 flex-shrink-0">
                  <span className="text-sm font-semibold text-primary">{index + 1}</span>
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <h4 className="font-semibold text-base line-clamp-1">{agent.name}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-1">{agent.role}</p>
                </div>
              </div>
              <ChevronDown
                className={`h-5 w-5 text-muted-foreground transition-transform flex-shrink-0 ${
                  expandedAgents.has(index) ? "rotate-180" : ""
                }`}
              />
            </button>

            {expandedAgents.has(index) && (
              <div className="px-4 pb-4 space-y-3 border-t animate-in slide-in-from-top-2">
                {/* Perspective */}
                {agent.perspective && (
                  <div className="pt-3">
                    <div className="flex items-start gap-2">
                      <Target className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-muted-foreground mb-1">Perspective</p>
                        <p className="text-sm">{agent.perspective}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Model & Turns */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Brain className="h-3.5 w-3.5 text-muted-foreground" />
                      <p className="text-xs font-medium text-muted-foreground">Model</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {agent.model}
                    </Badge>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
                      <p className="text-xs font-medium text-muted-foreground">Turns</p>
                    </div>
                    <p className="text-sm font-medium">
                      {agent.maxTurns || 3} {(agent.maxTurns || 3) === 1 ? "turn" : "turns"}
                    </p>
                  </div>
                </div>

                {/* Temperature */}
                {agent.temperature !== undefined && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-medium text-muted-foreground">Temperature</p>
                      <span className="text-sm font-medium">{agent.temperature.toFixed(1)}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${(agent.temperature / 2) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

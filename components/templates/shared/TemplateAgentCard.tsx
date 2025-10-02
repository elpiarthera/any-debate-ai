"use client"

import { Badge } from "@/components/ui/badge"
import type { DebateAgent } from "@/lib/templates/types"
import { getRoleById } from "@/lib/agent-config/roles"
import { getPersonaById } from "@/lib/agent-config/personas"
import { getFrameworkById } from "@/lib/agent-config/frameworks"

interface TemplateAgentCardProps {
  agent: DebateAgent
  compact?: boolean
}

export function TemplateAgentCard({ agent, compact = false }: TemplateAgentCardProps) {
  const role = getRoleById(agent.roleId)
  const persona = getPersonaById(agent.personaId)
  const framework = getFrameworkById(agent.frameworkId)

  if (compact) {
    return (
      <div className="bg-muted/50 rounded-lg p-3 min-h-[56px] flex items-center gap-3">
        <span className="text-lg flex-shrink-0">{role?.icon}</span>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm leading-tight">{agent.name}</p>
          <p className="text-xs text-muted-foreground line-clamp-1">{role?.name}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-muted/50 rounded-lg p-3 space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-sm">{role?.icon}</span>
        <span className="font-medium text-sm">{agent.name}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        <Badge variant="outline" className="text-xs">
          {role?.name}
        </Badge>
        <Badge variant="outline" className="text-xs">
          {persona?.name}
        </Badge>
        <Badge variant="outline" className="text-xs">
          {framework?.name}
        </Badge>
      </div>
    </div>
  )
}

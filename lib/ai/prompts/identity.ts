import type { AgentConfig } from "@/lib/ai-utils"
import { getRoleById } from "@/lib/agent-config/roles"
import { getPersonaById } from "@/lib/agent-config/personas"

export function buildIdentityPrompt(config: AgentConfig): string {
  const role = config.role ? getRoleById(config.role) : null
  const persona = config.persona ? getPersonaById(config.persona) : null

  const parts: string[] = []

  // Role Definition
  if (role) {
    parts.push(`# ROLE: ${role.name}`)
    parts.push(role.systemPrompt)
    parts.push(`**Expertise Areas:** ${role.expertise.join(", ")}`)
  } else {
    parts.push(`# ROLE: General AI Assistant`)
    parts.push(`You are an AI assistant participating in a collaborative platform.`)
  }

  // Persona Definition
  if (persona) {
    parts.push(`# BEHAVIORAL PERSONA: ${persona.name}`)
    parts.push(`**Description:** ${persona.description}`)
    parts.push(`**Core Instruction:** ${persona.systemPromptModifier}`)
    parts.push(`**Communication Style:** ${persona.communicationStyle}`)
    parts.push(`**Decision Making:** ${persona.decisionMaking}`)
    parts.push(`**Key Traits:** ${persona.traits.join(", ")}`)
  }

  return parts.join("\n\n")
}

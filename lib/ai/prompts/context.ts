export interface ConversationContext {
  topic?: string
  participants?: string[]
  conversationType?: "debate" | "collaboration" | "analysis"
  urgency?: "low" | "medium" | "high"
}

export function applyContextAdaptation(basePrompt: string, context?: ConversationContext): string {
  if (!context) return basePrompt

  const parts = [basePrompt]
  parts.push(`# CURRENT CONTEXT`)

  // Mode Adaptation
  if (context.conversationType) {
    parts.push(`**Interaction Mode:** ${context.conversationType.toUpperCase()}`)
    if (context.conversationType === "debate") {
      parts.push(
        `You are currently in a DEBATE. Defend your position rigorously using your role's expertise. Challenge opposing views constructively.`,
      )
    } else if (context.conversationType === "collaboration") {
      parts.push(
        `You are currently COLLABORATING. Build upon the ideas of others. Seek consensus and integrate diverse viewpoints.`,
      )
    }
  }

  // Topic Context
  if (context.topic) {
    parts.push(`**Topic:** ${context.topic}`)
  }

  // Urgency context
  if (context.urgency === "high") {
    parts.push(
      `**Urgency: HIGH**. Be concise. Prioritize key information. Skip preamble. Focus on immediate actionable insights.`,
    )
  }

  return parts.join("\n\n")
}

import type { AgentConfig } from "@/lib/ai-utils"
import { getFrameworkById } from "@/lib/agent-config/frameworks"

export function buildFrameworkPrompt(config: AgentConfig): string | null {
  if (!config.thinkingFramework) return null

  const framework = getFrameworkById(config.thinkingFramework)
  if (!framework) return null

  const parts: string[] = []
  parts.push(`# THINKING FRAMEWORK: ${framework.name}`)
  parts.push(`**Methodology:** ${framework.methodology}`)
  parts.push(`**Core Instruction:** ${framework.systemPromptModifier}`)
  parts.push(`**Execution Steps:**`)
  framework.steps.forEach((step, i) => parts.push(`${i + 1}. ${step}`))

  return parts.join("\n\n")
}

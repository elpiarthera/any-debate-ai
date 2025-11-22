import type { AgentConfig } from "@/lib/ai-utils"
import { buildIdentityPrompt } from "./identity"
import { buildFrameworkPrompt } from "./framework"
import { applyContextAdaptation, type ConversationContext } from "./context"
import { OPERATIONAL_GUIDELINES } from "./guidelines"

export type { ConversationContext }

/**
 * Main entry point to generate the full effective system prompt.
 * Composes the specialized prompt modules into a cohesive instruction set.
 */
export function generateEffectiveSystemPrompt(config: AgentConfig, context?: ConversationContext): string {
  const parts: string[] = []

  // 1. Identity Layer (Who am I?)
  parts.push(buildIdentityPrompt(config))

  // 2. Cognitive Layer (How do I think?)
  const frameworkPrompt = buildFrameworkPrompt(config)
  if (frameworkPrompt) {
    parts.push(frameworkPrompt)
  }

  // 3. Operational Layer (Rules of engagement)
  parts.push(OPERATIONAL_GUIDELINES)

  // 4. Context Layer (What is happening right now?)
  const basePrompt = parts.join("\n\n")
  return applyContextAdaptation(basePrompt, context)
}

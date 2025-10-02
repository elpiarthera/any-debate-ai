export interface AgentConfig {
  role?: string
  persona?: string
  thinkingFramework?: string
  expertise?: string[]
  temperature?: number
}

export interface ChatMessage {
  role: "user" | "assistant" | "system"
  content: string
  agentId?: string
  timestamp?: Date
}

// Enhanced chat hook with agent configuration support
export function createChatRequest(messages: ChatMessage[], model: string, agentConfig?: AgentConfig) {
  return {
    messages: messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
    model,
    agentConfig,
    timestamp: new Date().toISOString(),
  }
}

// Model availability checker
export async function checkModelAvailability(model: string): Promise<boolean> {
  try {
    // In production, you'd implement actual model availability checking
    console.log("[v0] Checking availability for model:", model)
    return true
  } catch (error) {
    console.error("[v0] Model availability check failed:", error)
    return false
  }
}

// Rate limiting utilities
export class RateLimiter {
  private requests: Map<string, number[]> = new Map()

  constructor(
    private maxRequests = 10,
    private windowMs = 60000, // 1 minute
  ) {}

  isAllowed(identifier: string): boolean {
    const now = Date.now()
    const requests = this.requests.get(identifier) || []

    // Remove old requests outside the window
    const validRequests = requests.filter((time) => now - time < this.windowMs)

    if (validRequests.length >= this.maxRequests) {
      return false
    }

    validRequests.push(now)
    this.requests.set(identifier, validRequests)
    return true
  }
}

// Global rate limiter instance
export const rateLimiter = new RateLimiter()

import { getRoleById } from "./agent-config/roles"
import { getPersonaById } from "./agent-config/personas"
import { getFrameworkById } from "./agent-config/frameworks"

// Enhanced system prompt generation that combines role, persona, and framework
export function generateSystemPrompt(agentConfig: AgentConfig): string {
  const role = agentConfig.role ? getRoleById(agentConfig.role) : null
  const persona = agentConfig.persona ? getPersonaById(agentConfig.persona) : null
  const framework = agentConfig.thinkingFramework ? getFrameworkById(agentConfig.thinkingFramework) : null

  let systemPrompt = ""

  // Base role expertise and context
  if (role) {
    systemPrompt += `${role.systemPrompt}\n\n`
    systemPrompt += `Your expertise areas include: ${role.expertise.join(", ")}.\n\n`
  }

  // Behavioral persona integration
  if (persona) {
    systemPrompt += `BEHAVIORAL STYLE: ${persona.systemPromptModifier}\n\n`
    systemPrompt += `Your communication style: ${persona.communicationStyle}\n`
    systemPrompt += `Your decision-making approach: ${persona.decisionMaking}\n`
    systemPrompt += `Key personality traits: ${persona.traits.join(", ")}\n\n`
  }

  // Thinking framework methodology
  if (framework) {
    systemPrompt += `THINKING METHODOLOGY: ${framework.systemPromptModifier}\n\n`
    systemPrompt += `Framework steps to follow:\n`
    framework.steps.forEach((step, index) => {
      systemPrompt += `${index + 1}. ${step}\n`
    })
    systemPrompt += `\nThis framework is best for: ${framework.bestFor.join(", ")}\n\n`
  }

  // Integration instructions
  systemPrompt += `INTEGRATION GUIDELINES:\n`
  systemPrompt += `- Maintain your role expertise while expressing your personality\n`
  systemPrompt += `- Use your thinking framework to structure your reasoning\n`
  systemPrompt += `- Stay consistent with your behavioral style throughout the conversation\n`
  systemPrompt += `- Adapt your communication to the context while maintaining your core personality\n`
  systemPrompt += `- In debates, engage constructively while representing your unique perspective\n\n`

  // Conversation context
  systemPrompt += `CONVERSATION CONTEXT:\n`
  systemPrompt += `You are participating in an AI-powered debate platform where multiple agents with different roles, personalities, and thinking frameworks collaborate and discuss topics. Your unique combination of role expertise, behavioral style, and thinking methodology should be clearly reflected in your responses.\n\n`

  return systemPrompt.trim()
}

// Enhanced agent configuration validation
export function validateAgentConfig(config: AgentConfig): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (config.role && !getRoleById(config.role)) {
    errors.push(`Invalid role: ${config.role}`)
  }

  if (config.persona && !getPersonaById(config.persona)) {
    errors.push(`Invalid persona: ${config.persona}`)
  }

  if (config.thinkingFramework && !getFrameworkById(config.thinkingFramework)) {
    errors.push(`Invalid thinking framework: ${config.thinkingFramework}`)
  }

  if (config.temperature && (config.temperature < 0 || config.temperature > 2)) {
    errors.push("Temperature must be between 0 and 2")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Agent personality consistency checker
export function checkPersonalityConsistency(
  agentConfig: AgentConfig,
  previousMessages: ChatMessage[],
): { isConsistent: boolean; suggestions: string[] } {
  const suggestions: string[] = []
  const role = agentConfig.role ? getRoleById(agentConfig.role) : null
  const persona = agentConfig.persona ? getPersonaById(agentConfig.persona) : null

  // Check if recent messages align with persona traits
  if (persona && previousMessages.length > 0) {
    const recentMessages = previousMessages.slice(-3) // Check last 3 messages

    // This is a simplified consistency check - in production you might use more sophisticated analysis
    if (
      persona.id === "analytical" &&
      recentMessages.some(
        (msg) => msg.content.includes("I feel") && !msg.content.includes("data") && !msg.content.includes("analysis"),
      )
    ) {
      suggestions.push("Consider using more data-driven language consistent with your analytical persona")
    }

    if (
      persona.id === "creative" &&
      recentMessages.every(
        (msg) =>
          !msg.content.includes("innovative") && !msg.content.includes("creative") && !msg.content.includes("imagine"),
      )
    ) {
      suggestions.push("Try incorporating more creative and innovative language")
    }

    if (
      persona.id === "decisive" &&
      recentMessages.some(
        (msg) => msg.content.includes("maybe") || msg.content.includes("perhaps") || msg.content.includes("might"),
      )
    ) {
      suggestions.push("Be more definitive and confident in your recommendations")
    }
  }

  return {
    isConsistent: suggestions.length === 0,
    suggestions,
  }
}

// Context-aware personality adaptation
export function adaptPersonalityToContext(
  agentConfig: AgentConfig,
  conversationContext: {
    topic?: string
    participants?: string[]
    conversationType?: "debate" | "collaboration" | "analysis"
    urgency?: "low" | "medium" | "high"
  },
): string {
  let adaptationInstructions = ""

  const persona = agentConfig.persona ? getPersonaById(agentConfig.persona) : null
  const role = agentConfig.role ? getRoleById(agentConfig.role) : null

  // Adapt based on conversation type
  if (conversationContext.conversationType === "debate" && persona) {
    if (persona.id === "collaborative") {
      adaptationInstructions +=
        "While maintaining your collaborative nature, don't hesitate to present strong arguments and defend your position. "
    } else if (persona.id === "empathetic") {
      adaptationInstructions += "Balance your empathetic approach with clear reasoning and evidence-based arguments. "
    } else if (persona.id === "decisive") {
      adaptationInstructions +=
        "Use your decisive nature to present clear, well-reasoned positions while remaining open to valid counterarguments. "
    }
  }

  // Adapt based on urgency
  if (conversationContext.urgency === "high" && persona) {
    if (persona.id === "analytical") {
      adaptationInstructions +=
        "While maintaining analytical rigor, prioritize the most critical data points for quick decision-making. "
    } else if (persona.id === "creative") {
      adaptationInstructions += "Focus your creativity on rapid ideation and quick solution generation. "
    }
  }

  // Adapt based on topic and role expertise
  if (conversationContext.topic && role) {
    const topicLower = conversationContext.topic.toLowerCase()
    if (role.expertise.some((exp) => topicLower.includes(exp.toLowerCase()))) {
      adaptationInstructions += `This topic aligns with your expertise in ${role.expertise.join(", ")}. Leverage this knowledge confidently. `
    }
  }

  return adaptationInstructions
}

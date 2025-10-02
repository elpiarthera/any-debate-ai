// Chat mode types and utilities for Compare, Debate, and Auto-Debate modes

export type ChatMode = "compare" | "debate" | "auto-debate"

export interface ChatModeConfig {
  id: ChatMode
  name: string
  description: string
  icon: string
  features: string[]
  bestFor: string[]
}

export const CHAT_MODES: Record<ChatMode, ChatModeConfig> = {
  compare: {
    id: "compare",
    name: "Compare Mode",
    description: "Compare responses from multiple AI models side-by-side",
    icon: "columns",
    features: [
      "Side-by-side comparison",
      "Simultaneous responses",
      "Visual diff highlighting",
      "Independent scrolling",
    ],
    bestFor: [
      "Evaluating different model perspectives",
      "Finding the best answer",
      "Understanding model differences",
      "Quick comparisons",
    ],
  },
  debate: {
    id: "debate",
    name: "Debate Mode",
    description: "Facilitate interactive discussions between AI agents",
    icon: "message-circle",
    features: ["User-moderated discussion", "@mention agents", "Threaded conversations", "Reference previous messages"],
    bestFor: ["Guided discussions", "Building on ideas", "Exploring topics deeply", "Collaborative problem-solving"],
  },
  "auto-debate": {
    id: "auto-debate",
    name: "Auto-Debate Mode",
    description: "Watch AI agents debate autonomously in rounds",
    icon: "zap",
    features: ["Autonomous discussion", "Configurable rounds", "Turn-based responses", "Progress tracking"],
    bestFor: [
      "Exploring multiple perspectives",
      "Generating comprehensive analysis",
      "Watching ideas evolve",
      "Hands-off exploration",
    ],
  },
}

export interface CompareRound {
  id: string
  userPrompt: string
  timestamp: Date
  responses: {
    agentId: string
    agentName: string
    content: string
    timestamp: Date
    isStreaming?: boolean
  }[]
}

export interface DebateMessage {
  id: string
  content: string
  sender: {
    id: string
    name: string
    type: "user" | "ai"
  }
  timestamp: Date
  replyTo?: string
  mentions?: string[]
  threadId?: string
}

export interface AutoDebateConfig {
  agents: string[]
  rounds: number
  initialPrompt: string
  speakingOrder?: string[]
  currentRound?: number
  currentAgent?: number
  status?: "setup" | "running" | "paused" | "completed"
}

export interface AutoDebateMessage {
  id: string
  content: string
  agentId: string
  agentName: string
  round: number
  position: number
  timestamp: Date
  isStreaming?: boolean
}

// Mode-specific session data
export interface CompareModeSession {
  mode: "compare"
  rounds: CompareRound[]
  activeAgents: string[]
}

export interface DebateModeSession {
  mode: "debate"
  messages: DebateMessage[]
  activeAgents: string[]
  threads: string[]
}

export interface AutoDebateModeSession {
  mode: "auto-debate"
  config: AutoDebateConfig
  messages: AutoDebateMessage[]
  startedAt?: Date
  completedAt?: Date
}

export type ChatModeSession = CompareModeSession | DebateModeSession | AutoDebateModeSession

// Utility functions
export function getModeConfig(mode: ChatMode): ChatModeConfig {
  return CHAT_MODES[mode]
}

export function isModeSupported(mode: string): mode is ChatMode {
  return mode in CHAT_MODES
}

export function getDefaultMode(): ChatMode {
  return "compare"
}

export function createCompareRound(userPrompt: string, agentIds: string[]): CompareRound {
  return {
    id: `round-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    userPrompt,
    timestamp: new Date(),
    responses: agentIds.map((agentId) => ({
      agentId,
      agentName: agentId,
      content: "",
      timestamp: new Date(),
      isStreaming: true,
    })),
  }
}

export function createDebateMessage(
  content: string,
  sender: { id: string; name: string; type: "user" | "ai" },
  options?: {
    replyTo?: string
    mentions?: string[]
    threadId?: string
  },
): DebateMessage {
  return {
    id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    content,
    sender,
    timestamp: new Date(),
    replyTo: options?.replyTo,
    mentions: options?.mentions,
    threadId: options?.threadId,
  }
}

export function createAutoDebateMessage(
  content: string,
  agentId: string,
  agentName: string,
  round: number,
  position: number,
): AutoDebateMessage {
  return {
    id: `auto-msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    content,
    agentId,
    agentName,
    round,
    position,
    timestamp: new Date(),
    isStreaming: false,
  }
}

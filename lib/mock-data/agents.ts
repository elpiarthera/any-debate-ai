import type { AgentConfiguration } from "@/lib/agent-config/types"
import { PROFESSIONAL_ROLES } from "@/lib/agent-config/roles"
import { PERSONAS } from "@/lib/agent-config/personas"
import { THINKING_FRAMEWORKS } from "@/lib/agent-config/frameworks"

export interface AgentWithMetadata extends AgentConfiguration {
  isTemplate: boolean
  isPublic: boolean
  isFavorite: boolean
  metadata: {
    category: string
    usageCount: number
    lastUsed: number | null
    createdBy: string
  }
}

export const mockAgents: AgentWithMetadata[] = [
  {
    id: "1",
    name: "Strategic Advisor",
    role: PROFESSIONAL_ROLES[0],
    persona: PERSONAS[0],
    framework: THINKING_FRAMEWORKS[5],
    systemPrompt: "You are a strategic advisor focused on high-level business decisions.",
    createdAt: new Date("2025-09-15"),
    updatedAt: new Date("2025-10-10"),
    isTemplate: true,
    isPublic: true,
    isFavorite: true,
    metadata: {
      category: "Business & Strategy",
      usageCount: 145,
      lastUsed: Date.now() - 86400000,
      createdBy: "system",
    },
  },
  {
    id: "2",
    name: "Tech Innovator",
    role: PROFESSIONAL_ROLES[5],
    persona: PERSONAS[1],
    framework: THINKING_FRAMEWORKS[0],
    systemPrompt: "You are a software architect focused on innovative technical solutions.",
    createdAt: new Date("2025-09-20"),
    updatedAt: new Date("2025-10-11"),
    isTemplate: true,
    isPublic: true,
    isFavorite: false,
    metadata: {
      category: "Technology & Engineering",
      usageCount: 98,
      lastUsed: Date.now() - 172800000,
      createdBy: "system",
    },
  },
  {
    id: "3",
    name: "UX Champion",
    role: PROFESSIONAL_ROLES[10],
    persona: PERSONAS[6],
    framework: THINKING_FRAMEWORKS[0],
    systemPrompt: "You are a UX designer focused on user-centered design.",
    createdAt: new Date("2025-09-25"),
    updatedAt: new Date("2025-10-09"),
    isTemplate: true,
    isPublic: true,
    isFavorite: true,
    metadata: {
      category: "Creative & Design",
      usageCount: 76,
      lastUsed: Date.now() - 259200000,
      createdBy: "system",
    },
  },
  {
    id: "4",
    name: "Data Analyst Pro",
    role: PROFESSIONAL_ROLES[8],
    persona: PERSONAS[0],
    framework: THINKING_FRAMEWORKS[3],
    systemPrompt: "You are a data scientist focused on extracting insights from data.",
    createdAt: new Date("2025-10-01"),
    updatedAt: new Date("2025-10-12"),
    isTemplate: false,
    isPublic: false,
    isFavorite: false,
    metadata: {
      category: "Technology & Engineering",
      usageCount: 34,
      lastUsed: Date.now() - 43200000,
      createdBy: "user-123",
    },
  },
  {
    id: "5",
    name: "Marketing Guru",
    role: PROFESSIONAL_ROLES[2],
    persona: PERSONAS[4],
    framework: THINKING_FRAMEWORKS[10],
    systemPrompt: "You are a marketing director focused on brand strategy.",
    createdAt: new Date("2025-10-03"),
    updatedAt: new Date("2025-10-11"),
    isTemplate: false,
    isPublic: true,
    isFavorite: true,
    metadata: {
      category: "Business & Strategy",
      usageCount: 52,
      lastUsed: Date.now() - 604800000,
      createdBy: "user-456",
    },
  },
  {
    id: "6",
    name: "Security Expert",
    role: PROFESSIONAL_ROLES[9],
    persona: PERSONAS[5],
    framework: THINKING_FRAMEWORKS[12],
    systemPrompt: "You are a cybersecurity expert focused on threat analysis.",
    createdAt: new Date("2025-10-05"),
    updatedAt: new Date("2025-10-10"),
    isTemplate: false,
    isPublic: false,
    isFavorite: false,
    metadata: {
      category: "Technology & Engineering",
      usageCount: 18,
      lastUsed: Date.now() - 1209600000,
      createdBy: "user-123",
    },
  },
  {
    id: "7",
    name: "Content Creator",
    role: PROFESSIONAL_ROLES[12],
    persona: PERSONAS[1],
    framework: THINKING_FRAMEWORKS[11],
    systemPrompt: "You are a content strategist focused on engaging messaging.",
    createdAt: new Date("2025-10-07"),
    updatedAt: new Date("2025-10-12"),
    isTemplate: true,
    isPublic: true,
    isFavorite: false,
    metadata: {
      category: "Creative & Design",
      usageCount: 41,
      lastUsed: Date.now() - 345600000,
      createdBy: "system",
    },
  },
  {
    id: "8",
    name: "Research Specialist",
    role: PROFESSIONAL_ROLES[13],
    persona: PERSONAS[0],
    framework: THINKING_FRAMEWORKS[12],
    systemPrompt: "You are a market researcher focused on consumer insights.",
    createdAt: new Date("2025-10-08"),
    updatedAt: new Date("2025-10-11"),
    isTemplate: false,
    isPublic: true,
    isFavorite: true,
    metadata: {
      category: "Research & Analysis",
      usageCount: 29,
      lastUsed: Date.now() - 518400000,
      createdBy: "user-789",
    },
  },
]

export function getAgentsByCategory(category: string): AgentWithMetadata[] {
  return mockAgents.filter((agent) => agent.metadata.category === category)
}

export function getFavoriteAgents(): AgentWithMetadata[] {
  return mockAgents.filter((agent) => agent.isFavorite)
}

export function getTemplateAgents(): AgentWithMetadata[] {
  return mockAgents.filter((agent) => agent.isTemplate)
}

export function searchAgents(query: string): AgentWithMetadata[] {
  const lowercaseQuery = query.toLowerCase()
  return mockAgents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(lowercaseQuery) ||
      agent.role.name.toLowerCase().includes(lowercaseQuery) ||
      agent.persona.name.toLowerCase().includes(lowercaseQuery) ||
      agent.framework.name.toLowerCase().includes(lowercaseQuery),
  )
}

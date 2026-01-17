export interface SessionMetadata {
  messageCount: number
  agentCount: number
  artifactCount: number
  lastActivity: number
  participants: string[]
}

export interface SessionConfig {
  mode: "compare" | "debate" | "auto-debate"
  selectedAgents: string[]
  debateRounds?: number
}

export interface Session {
  id: string
  title: string
  description: string
  status: "active" | "archived"
  createdAt: number
  updatedAt: number
  metadata: SessionMetadata
  config: SessionConfig
}

export const mockSessions: Session[] = [
  {
    id: "1",
    title: "Product Strategy Debate",
    description: "Discussing Q1 2025 product roadmap with multiple AI perspectives",
    status: "active",
    createdAt: Date.now() - 3600000,
    updatedAt: Date.now() - 1800000,
    metadata: {
      messageCount: 24,
      agentCount: 3,
      artifactCount: 2,
      lastActivity: Date.now() - 1800000,
      participants: ["user1", "user2"],
    },
    config: {
      mode: "debate",
      selectedAgents: ["agent1", "agent2", "agent3"],
      debateRounds: 3,
    },
  },
  {
    id: "2",
    title: "Marketing Campaign Analysis",
    description: "Comparing different AI models on campaign effectiveness",
    status: "active",
    createdAt: Date.now() - 7200000,
    updatedAt: Date.now() - 3600000,
    metadata: {
      messageCount: 18,
      agentCount: 4,
      artifactCount: 3,
      lastActivity: Date.now() - 3600000,
      participants: ["user1"],
    },
    config: {
      mode: "compare",
      selectedAgents: ["agent1", "agent2", "agent3", "agent4"],
    },
  },
  {
    id: "3",
    title: "Technical Architecture Review",
    description: "Auto-debate on microservices vs monolith architecture",
    status: "active",
    createdAt: Date.now() - 10800000,
    updatedAt: Date.now() - 7200000,
    metadata: {
      messageCount: 42,
      agentCount: 5,
      artifactCount: 5,
      lastActivity: Date.now() - 7200000,
      participants: ["user1", "user2", "user3"],
    },
    config: {
      mode: "auto-debate",
      selectedAgents: ["agent1", "agent2", "agent3", "agent4", "agent5"],
      debateRounds: 5,
    },
  },
  {
    id: "4",
    title: "UX Design Feedback",
    description: "Getting multiple perspectives on new dashboard design",
    status: "archived",
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now() - 43200000,
    metadata: {
      messageCount: 15,
      agentCount: 2,
      artifactCount: 1,
      lastActivity: Date.now() - 43200000,
      participants: ["user1"],
    },
    config: {
      mode: "compare",
      selectedAgents: ["agent1", "agent2"],
    },
  },
  {
    id: "5",
    title: "Content Strategy Planning",
    description: "Debating content calendar and distribution channels",
    status: "archived",
    createdAt: Date.now() - 172800000,
    updatedAt: Date.now() - 86400000,
    metadata: {
      messageCount: 31,
      agentCount: 3,
      artifactCount: 4,
      lastActivity: Date.now() - 86400000,
      participants: ["user1", "user2"],
    },
    config: {
      mode: "debate",
      selectedAgents: ["agent1", "agent2", "agent3"],
      debateRounds: 4,
    },
  },
]

import type { ArtifactType } from "./artifacts"

export interface CollaborationEvent {
  id: string
  agentId: string
  artifactId: string
  type: "edit" | "create" | "comment" | "cursor"
  timestamp: Date
  data?: any
  description: string
}

export interface AgentCursor {
  agentId: string
  position: { x: number; y: number }
  selection?: { start: number; end: number }
  color: string
}

export class MockCollaborationEngine {
  private events: CollaborationEvent[] = []
  private cursors: Map<string, AgentCursor> = new Map()
  private subscribers: Set<(event: CollaborationEvent) => void> = new Set()
  private cursorSubscribers: Set<(cursors: AgentCursor[]) => void> = new Set()

  private agentProfiles = {
    "GPT-4": {
      name: "GPT-4",
      color: "#10b981",
      personality: "analytical",
      speed: 1200, // ms between actions
      expertise: ["documents", "analysis", "structure"],
    },
    "Claude-3.5": {
      name: "Claude-3.5",
      color: "#3b82f6",
      personality: "creative",
      speed: 1500,
      expertise: ["writing", "creativity", "refinement"],
    },
    "Llama-3": {
      name: "Llama-3",
      color: "#8b5cf6",
      personality: "systematic",
      speed: 1800,
      expertise: ["data", "organization", "checklists"],
    },
    Gemini: {
      name: "Gemini",
      color: "#f59e0b",
      personality: "visual",
      speed: 1600,
      expertise: ["charts", "visualization", "insights"],
    },
  }

  // Subscribe to collaboration events
  subscribe(callback: (event: CollaborationEvent) => void) {
    this.subscribers.add(callback)
    return () => this.subscribers.delete(callback)
  }

  // Subscribe to cursor updates
  subscribeToCursors(callback: (cursors: AgentCursor[]) => void) {
    this.cursorSubscribers.add(callback)
    return () => this.cursorSubscribers.delete(callback)
  }

  // Emit event to all subscribers
  private emit(event: CollaborationEvent) {
    this.events.push(event)
    this.subscribers.forEach((callback) => callback(event))
  }

  // Emit cursor updates
  private emitCursors() {
    const cursors = Array.from(this.cursors.values())
    this.cursorSubscribers.forEach((callback) => callback(cursors))
  }

  // Start collaboration simulation for an artifact
  startCollaboration(artifactId: string, artifactType: ArtifactType, participatingAgents: string[]) {
    console.log(`[v0] Starting collaboration simulation for ${artifactId} with agents:`, participatingAgents)

    // Clear existing cursors for this artifact
    this.cursors.clear()

    // Start simulation for each agent
    participatingAgents.forEach((agentId, index) => {
      setTimeout(() => {
        this.simulateAgentActivity(agentId, artifactId, artifactType)
      }, index * 500) // Stagger agent entry
    })
  }

  // Stop collaboration for an artifact
  stopCollaboration(artifactId: string) {
    console.log(`[v0] Stopping collaboration simulation for ${artifactId}`)

    // Remove cursors for this artifact
    this.cursors.clear()
    this.emitCursors()
  }

  // Simulate individual agent activity
  private simulateAgentActivity(agentId: string, artifactId: string, artifactType: ArtifactType) {
    const agent = this.agentProfiles[agentId as keyof typeof this.agentProfiles]
    if (!agent) return

    // Add agent cursor
    this.cursors.set(agentId, {
      agentId,
      position: { x: Math.random() * 800, y: Math.random() * 600 },
      color: agent.color,
    })
    this.emitCursors()

    // Simulate agent joining
    this.emit({
      id: `${Date.now()}-${agentId}-join`,
      agentId,
      artifactId,
      type: "comment",
      timestamp: new Date(),
      description: `${agent.name} joined the collaboration`,
    })

    // Start periodic activity
    this.scheduleAgentAction(agentId, artifactId, artifactType)
  }

  // Schedule next agent action
  private scheduleAgentAction(agentId: string, artifactId: string, artifactType: ArtifactType) {
    const agent = this.agentProfiles[agentId as keyof typeof this.agentProfiles]
    if (!agent) return

    const delay = agent.speed + Math.random() * 1000 // Add some randomness

    setTimeout(() => {
      // Check if agent is still active
      if (!this.cursors.has(agentId)) return

      // Perform random action based on artifact type and agent expertise
      this.performAgentAction(agentId, artifactId, artifactType)

      // Schedule next action
      this.scheduleAgentAction(agentId, artifactId, artifactType)
    }, delay)
  }

  // Perform a specific agent action
  private performAgentAction(agentId: string, artifactId: string, artifactType: ArtifactType) {
    const agent = this.agentProfiles[agentId as keyof typeof this.agentProfiles]
    if (!agent) return

    // Update cursor position
    const cursor = this.cursors.get(agentId)
    if (cursor) {
      cursor.position = {
        x: Math.max(0, Math.min(800, cursor.position.x + (Math.random() - 0.5) * 100)),
        y: Math.max(0, Math.min(600, cursor.position.y + (Math.random() - 0.5) * 100)),
      }
      this.emitCursors()
    }

    // Generate action based on artifact type and agent expertise
    const actions = this.getAvailableActions(artifactType, agentId)
    const action = actions[Math.floor(Math.random() * actions.length)]

    this.emit({
      id: `${Date.now()}-${agentId}-${action.type}`,
      agentId,
      artifactId,
      type: action.type,
      timestamp: new Date(),
      description: action.description,
      data: action.data,
    })
  }

  // Get available actions for agent and artifact type
  private getAvailableActions(artifactType: ArtifactType, agentId: string) {
    const agent = this.agentProfiles[agentId as keyof typeof this.agentProfiles]
    const baseActions = []

    switch (artifactType) {
      case "document":
        baseActions.push(
          {
            type: "edit" as const,
            description: `${agent.name} is editing the document content`,
            data: { section: "content" },
          },
          {
            type: "edit" as const,
            description: `${agent.name} updated the document title`,
            data: { section: "title" },
          },
          { type: "comment" as const, description: `${agent.name} suggests improving the structure` },
          { type: "edit" as const, description: `${agent.name} added a new section`, data: { section: "new" } },
        )
        break

      case "dataTable":
        baseActions.push(
          {
            type: "edit" as const,
            description: `${agent.name} is updating table data`,
            data: { row: Math.floor(Math.random() * 5) },
          },
          { type: "edit" as const, description: `${agent.name} added a new column`, data: { column: "new" } },
          { type: "comment" as const, description: `${agent.name} suggests data validation` },
          { type: "edit" as const, description: `${agent.name} sorted the table`, data: { sort: "column" } },
        )
        break

      case "checklist":
        baseActions.push(
          { type: "edit" as const, description: `${agent.name} completed a task`, data: { item: "toggle" } },
          { type: "edit" as const, description: `${agent.name} added a new task`, data: { item: "new" } },
          { type: "comment" as const, description: `${agent.name} suggests task prioritization` },
          { type: "edit" as const, description: `${agent.name} updated task priorities`, data: { item: "priority" } },
        )
        break

      case "chart":
        baseActions.push(
          { type: "edit" as const, description: `${agent.name} updated chart data`, data: { data: "refresh" } },
          { type: "edit" as const, description: `${agent.name} changed chart type`, data: { type: "switch" } },
          { type: "comment" as const, description: `${agent.name} suggests better visualization` },
          { type: "edit" as const, description: `${agent.name} adjusted chart colors`, data: { style: "colors" } },
        )
        break
    }

    // Filter actions based on agent expertise
    return baseActions.filter(() => Math.random() > 0.3) // 70% chance to perform any action
  }

  // Get recent events
  getRecentEvents(limit = 10): CollaborationEvent[] {
    return this.events.slice(-limit).reverse()
  }

  // Get active cursors
  getActiveCursors(): AgentCursor[] {
    return Array.from(this.cursors.values())
  }

  // Simulate typing indicator
  simulateTyping(agentId: string, artifactId: string, isTyping: boolean) {
    const cursor = this.cursors.get(agentId)
    if (cursor) {
      // Update cursor to show typing state
      this.emitCursors()
    }

    if (isTyping) {
      this.emit({
        id: `${Date.now()}-${agentId}-typing`,
        agentId,
        artifactId,
        type: "cursor",
        timestamp: new Date(),
        description: `${agentId} is typing...`,
      })
    }
  }

  // Clean up resources
  cleanup() {
    this.events = []
    this.cursors.clear()
    this.subscribers.clear()
    this.cursorSubscribers.clear()
  }
}

// Global instance
export const mockCollaboration = new MockCollaborationEngine()

export interface DebateSession {
  id: string
  title: string
  agents: string[]
  messageCount: number
  duration: number
  createdAt: Date
  updatedAt: Date
  mode: "compare" | "debate" | "auto-debate"
  status: "active" | "archived"
}

export interface Agent {
  id: string
  name: string
  role: string
  persona: string
  framework: string
  isFavorite: boolean
  usageCount: number
  createdAt: Date
}

export interface Project {
  id: string
  name: string
  description?: string
  sessionIds: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Activity {
  id: string
  type: "debate" | "export" | "agent" | "template"
  title: string
  description: string
  timestamp: Date
  metadata?: Record<string, any>
}

export interface UserSettings {
  theme: "light" | "dark" | "system"
  defaultModel: string
  autoSave: boolean
  notifications: boolean
  exportFormat: "pdf" | "markdown" | "json"
}

export interface DashboardMetrics {
  totalDebates: number
  activeAgents: number
  avgSessionTime: number
  engagementRate: number
}

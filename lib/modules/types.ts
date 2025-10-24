import type { ProfessionalRole } from "@/lib/agent-config/roles"
import type { Persona } from "@/lib/agent-config/personas"
import type { ThinkingFramework } from "@/lib/agent-config/frameworks"

export type ModuleType = "role" | "persona" | "framework"

export interface ModuleMetadata {
  createdAt: Date
  updatedAt: Date
  isCustom: boolean
  isPreset: boolean
  version: number
  author?: string
  tags: string[]
  visibility: "private" | "team" | "public"
}

export interface ModuleVersion {
  version: number
  timestamp: Date
  changes: string
  data: ProfessionalRole | Persona | ThinkingFramework
}

export interface ModuleAnalytics {
  moduleId: string
  moduleType: ModuleType
  usageCount: number
  lastUsed: Date
  agentCount: number // Number of agents using this module
  createdAt: Date
}

export interface ModulePreset {
  id: string
  name: string
  description: string
  category: string
  modules: {
    roleId: string
    personaId: string
    frameworkId: string
  }
  useCases: string[]
  tags: string[]
}

export interface BulkOperation {
  type: "duplicate" | "delete" | "export" | "share"
  moduleIds: string[]
  moduleType: ModuleType
}

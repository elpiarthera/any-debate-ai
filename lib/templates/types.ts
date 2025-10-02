import type { AgentConfigurationDraft } from "@/lib/agent-config/types"

export interface DebateTemplate {
  id: string
  name: string
  description: string
  category: TemplateCategory
  agents: AgentConfigurationDraft[]
  topic?: string
  conversationType: "debate" | "collaboration" | "analysis"
  suggestedQuestions?: string[]
  metadata: {
    createdAt: Date
    updatedAt: Date
    isCustom: boolean
    popularity?: number
    tags: string[]
    author?: string
  }
}

export type TemplateCategory =
  | "Business Strategy"
  | "Product Development"
  | "Technology & Engineering"
  | "Creative & Design"
  | "Research & Analysis"
  | "Education & Training"
  | "Healthcare & Science"
  | "General Purpose"

export interface TemplateFilter {
  category?: TemplateCategory
  tags?: string[]
  searchQuery?: string
  isCustom?: boolean
}

export interface TemplateSaveOptions {
  name: string
  description: string
  category: TemplateCategory
  tags?: string[]
  includeCurrentTopic?: boolean
}

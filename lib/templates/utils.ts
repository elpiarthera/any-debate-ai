import type { DebateTemplate, TemplateFilter } from "./types"
import { TemplateStorage } from "./storage"

export function filterTemplates(templates: DebateTemplate[], filter: TemplateFilter): DebateTemplate[] {
  let filtered = [...templates]

  // Filter by category
  if (filter.category) {
    filtered = filtered.filter((t) => t.category === filter.category)
  }

  // Filter by tags
  if (filter.tags && filter.tags.length > 0) {
    filtered = filtered.filter((t) => filter.tags!.some((tag) => t.metadata.tags.includes(tag)))
  }

  // Filter by custom status
  if (filter.isCustom !== undefined) {
    filtered = filtered.filter((t) => t.metadata.isCustom === filter.isCustom)
  }

  // Filter by search query
  if (filter.searchQuery) {
    const query = filter.searchQuery.toLowerCase()
    filtered = filtered.filter(
      (t) =>
        t.name.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.metadata.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        t.agents.some((agent) => agent.name.toLowerCase().includes(query)),
    )
  }

  return filtered
}

export function sortTemplatesByPopularity(templates: DebateTemplate[]): DebateTemplate[] {
  return [...templates].sort((a, b) => {
    const usageA = TemplateStorage.getTemplateUsage(a.id)
    const usageB = TemplateStorage.getTemplateUsage(b.id)
    return usageB - usageA
  })
}

export function sortTemplatesByRecent(templates: DebateTemplate[]): DebateTemplate[] {
  return [...templates].sort((a, b) => {
    return b.metadata.updatedAt.getTime() - a.metadata.updatedAt.getTime()
  })
}

export function getTemplateCategories(templates: DebateTemplate[]): string[] {
  const categories = new Set(templates.map((t) => t.category))
  return Array.from(categories).sort()
}

export function getAllTemplateTags(templates: DebateTemplate[]): string[] {
  const tags = new Set<string>()
  templates.forEach((t) => {
    t.metadata.tags.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags).sort()
}

export function validateTemplate(template: Partial<DebateTemplate>): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!template.name || template.name.trim() === "") {
    errors.push("Template name is required")
  }

  if (!template.description || template.description.trim() === "") {
    errors.push("Template description is required")
  }

  if (!template.category) {
    errors.push("Template category is required")
  }

  if (!template.agents || template.agents.length === 0) {
    errors.push("At least one agent is required")
  }

  if (template.agents && template.agents.length > 4) {
    errors.push("Maximum 4 agents allowed per template")
  }

  // Validate each agent configuration
  if (template.agents) {
    template.agents.forEach((agent, index) => {
      if (!agent.name || agent.name.trim() === "") {
        errors.push(`Agent ${index + 1}: Name is required`)
      }
      if (!agent.roleId) {
        errors.push(`Agent ${index + 1}: Role is required`)
      }
      if (!agent.personaId) {
        errors.push(`Agent ${index + 1}: Persona is required`)
      }
      if (!agent.frameworkId) {
        errors.push(`Agent ${index + 1}: Framework is required`)
      }
    })
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function createTemplateFromCurrentSession(
  agents: Array<{ name: string; config?: any }>,
  topic?: string,
): Partial<DebateTemplate> {
  return {
    agents: agents
      .filter((a) => a.config)
      .map((a) => ({
        name: a.name,
        roleId: a.config.roleId,
        personaId: a.config.personaId,
        frameworkId: a.config.frameworkId,
        customInstructions: a.config.customInstructions,
      })),
    topic: topic,
    conversationType: "debate",
  }
}

export function convertTemplateToModels(template: DebateTemplate): Array<{
  id: string
  type: "GPT-4" | "Claude-3.5" | "Llama-3" | "Gemini"
  name: string
  config: any
}> {
  return template.agents.map((agent, index) => ({
    id: `${Date.now()}-${index}`,
    type: "GPT-4", // Default model type, can be customized based on agent config
    name: agent.name,
    config: agent,
  }))
}

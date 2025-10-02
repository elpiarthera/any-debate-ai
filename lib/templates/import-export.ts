import type { DebateTemplate } from "./types"
import { TemplateStorage } from "./storage"

export function exportTemplates(templates: DebateTemplate[]): void {
  const data = {
    version: "1.0",
    exportedAt: new Date().toISOString(),
    templates,
  }

  const json = JSON.stringify(data, null, 2)
  const blob = new Blob([json], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `debate-templates-${Date.now()}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function importTemplates(jsonString: string): DebateTemplate[] {
  try {
    const data = JSON.parse(jsonString)

    // Handle both single template and batch export formats
    let templates: DebateTemplate[]

    if (Array.isArray(data)) {
      templates = data
    } else if (data.templates && Array.isArray(data.templates)) {
      templates = data.templates
    } else if (data.id && data.name && data.agents) {
      // Single template
      templates = [data]
    } else {
      throw new Error("Invalid template format")
    }

    // Validate and save templates
    const imported: DebateTemplate[] = []
    for (const template of templates) {
      if (!validateTemplate(template)) {
        console.warn(`Skipping invalid template: ${template.name || "Unknown"}`)
        continue
      }

      // Generate new ID to avoid conflicts
      const importedTemplate: DebateTemplate = {
        ...template,
        id: `imported-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        metadata: {
          ...template.metadata,
          isCustom: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      }

      TemplateStorage.saveTemplate(importedTemplate)
      imported.push(importedTemplate)
    }

    return imported
  } catch (error) {
    throw new Error(`Failed to import templates: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

function validateTemplate(template: any): template is DebateTemplate {
  return (
    template &&
    typeof template.id === "string" &&
    typeof template.name === "string" &&
    typeof template.description === "string" &&
    typeof template.category === "string" &&
    Array.isArray(template.agents) &&
    template.agents.length > 0 &&
    template.agents.every(
      (agent: any) =>
        agent && typeof agent.name === "string" && typeof agent.role === "string" && typeof agent.model === "string",
    )
  )
}

export function shareTemplate(template: DebateTemplate): string {
  // Generate a shareable JSON string
  const shareData = {
    ...template,
    metadata: {
      ...template.metadata,
      sharedAt: new Date().toISOString(),
    },
  }

  return JSON.stringify(shareData, null, 2)
}

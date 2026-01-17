import type { DebateTemplate } from "./types"
import { TemplateAnalytics } from "./analytics"

const STORAGE_KEY = "anydebate_templates"
const CUSTOM_TEMPLATES_KEY = "anydebate_custom_templates"

export class TemplateStorage {
  // Save custom template to local storage
  static saveCustomTemplate(template: DebateTemplate): void {
    try {
      const customTemplates = this.getCustomTemplates()
      const existingIndex = customTemplates.findIndex((t) => t.id === template.id)

      if (existingIndex >= 0) {
        customTemplates[existingIndex] = template
      } else {
        customTemplates.push(template)
      }

      localStorage.setItem(CUSTOM_TEMPLATES_KEY, JSON.stringify(customTemplates))
    } catch (error) {
      console.error("[v0] Failed to save custom template:", error)
      throw new Error("Failed to save template to local storage")
    }
  }

  // Get all custom templates
  static getCustomTemplates(): DebateTemplate[] {
    try {
      const stored = localStorage.getItem(CUSTOM_TEMPLATES_KEY)
      if (!stored) return []

      const templates = JSON.parse(stored)
      // Convert date strings back to Date objects
      return templates.map((t: any) => ({
        ...t,
        metadata: {
          ...t.metadata,
          createdAt: new Date(t.metadata.createdAt),
          updatedAt: new Date(t.metadata.updatedAt),
        },
      }))
    } catch (error) {
      console.error("[v0] Failed to load custom templates:", error)
      return []
    }
  }

  // Delete custom template
  static deleteCustomTemplate(templateId: string): void {
    try {
      const customTemplates = this.getCustomTemplates()
      const filtered = customTemplates.filter((t) => t.id !== templateId)
      localStorage.setItem(CUSTOM_TEMPLATES_KEY, JSON.stringify(filtered))

      // Delete associated analytics
      TemplateAnalytics.deleteTemplateAnalytics(templateId)
    } catch (error) {
      console.error("[v0] Failed to delete custom template:", error)
      throw new Error("Failed to delete template")
    }
  }

  // Get template by ID (checks both built-in and custom)
  static getTemplateById(templateId: string): DebateTemplate | undefined {
    const customTemplates = this.getCustomTemplates()
    return customTemplates.find((t) => t.id === templateId)
  }

  // Save template usage statistics
  static incrementTemplateUsage(templateId: string): void {
    try {
      const usageKey = `${STORAGE_KEY}_usage`
      const stored = localStorage.getItem(usageKey)
      const usage = stored ? JSON.parse(stored) : {}

      usage[templateId] = (usage[templateId] || 0) + 1
      localStorage.setItem(usageKey, JSON.stringify(usage))

      // Track in analytics system
      const template = this.getTemplateById(templateId)
      if (template) {
        TemplateAnalytics.trackUsage(templateId, template.name, template.category)
      }
    } catch (error) {
      console.error("[v0] Failed to update template usage:", error)
    }
  }

  // Get template usage statistics
  static getTemplateUsage(templateId: string): number {
    try {
      const usageKey = `${STORAGE_KEY}_usage`
      const stored = localStorage.getItem(usageKey)
      if (!stored) return 0

      const usage = JSON.parse(stored)
      return usage[templateId] || 0
    } catch (error) {
      console.error("[v0] Failed to get template usage:", error)
      return 0
    }
  }

  // Export template as JSON
  static exportTemplate(template: DebateTemplate): string {
    return JSON.stringify(template, null, 2)
  }

  // Import template from JSON
  static importTemplate(jsonString: string): DebateTemplate {
    try {
      const template = JSON.parse(jsonString)
      // Validate required fields
      if (!template.id || !template.name || !template.agents) {
        throw new Error("Invalid template format")
      }

      // Convert date strings to Date objects
      template.metadata.createdAt = new Date(template.metadata.createdAt)
      template.metadata.updatedAt = new Date(template.metadata.updatedAt)

      return template
    } catch (error) {
      console.error("[v0] Failed to import template:", error)
      throw new Error("Failed to import template. Invalid JSON format.")
    }
  }

  // Clear all custom templates (for testing/reset)
  static clearCustomTemplates(): void {
    try {
      localStorage.removeItem(CUSTOM_TEMPLATES_KEY)
    } catch (error) {
      console.error("[v0] Failed to clear custom templates:", error)
    }
  }
}

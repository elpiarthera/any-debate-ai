import type { ModuleType } from "./types"
import type { ProfessionalRole } from "@/lib/agent-config/roles"
import type { Persona } from "@/lib/agent-config/personas"
import type { ThinkingFramework } from "@/lib/agent-config/frameworks"
import { ModuleAnalyticsManager } from "./analytics"
import { ModuleVersionManager } from "./versioning"

export class BulkOperationsManager {
  /**
   * Duplicate multiple modules
   */
  static duplicateModules(
    moduleIds: string[],
    moduleType: ModuleType,
    getModule: (id: string) => ProfessionalRole | Persona | ThinkingFramework | undefined,
    createModule: (module: any) => any,
  ): Array<{ original: string; duplicate: string }> {
    const results: Array<{ original: string; duplicate: string }> = []

    for (const moduleId of moduleIds) {
      const module = getModule(moduleId)
      if (!module) continue

      const duplicated = createModule({
        ...module,
        name: `${module.name} (Copy)`,
        id: undefined, // Will be generated
      })

      results.push({
        original: moduleId,
        duplicate: duplicated.id,
      })
    }

    return results
  }

  /**
   * Delete multiple modules
   */
  static deleteModules(
    moduleIds: string[],
    deleteModule: (id: string) => boolean,
  ): { deleted: string[]; failed: string[] } {
    const deleted: string[] = []
    const failed: string[] = []

    for (const moduleId of moduleIds) {
      const success = deleteModule(moduleId)
      if (success) {
        deleted.push(moduleId)
        // Clean up analytics and versions
        ModuleAnalyticsManager.deleteModuleAnalytics(moduleId)
        ModuleVersionManager.deleteVersions(moduleId)
      } else {
        failed.push(moduleId)
      }
    }

    return { deleted, failed }
  }

  /**
   * Export multiple modules as JSON
   */
  static exportModules(
    moduleIds: string[],
    moduleType: ModuleType,
    getModule: (id: string) => ProfessionalRole | Persona | ThinkingFramework | undefined,
  ): string {
    const modules = moduleIds.map((id) => getModule(id)).filter((m) => m !== undefined)

    const exportData = {
      type: moduleType,
      exportedAt: new Date().toISOString(),
      count: modules.length,
      modules,
    }

    return JSON.stringify(exportData, null, 2)
  }

  /**
   * Import modules from JSON
   */
  static importModules(
    jsonString: string,
    createModule: (module: any) => any,
  ): { imported: string[]; failed: string[] } {
    const imported: string[] = []
    const failed: string[] = []

    try {
      const data = JSON.parse(jsonString)

      if (!data.modules || !Array.isArray(data.modules)) {
        throw new Error("Invalid export format")
      }

      for (const module of data.modules) {
        try {
          const created = createModule({
            ...module,
            id: undefined, // Generate new ID
          })
          imported.push(created.id)
        } catch (error) {
          console.error("[v0] Failed to import module:", error)
          failed.push(module.name || "Unknown")
        }
      }
    } catch (error) {
      console.error("[v0] Failed to parse import data:", error)
      throw new Error("Invalid JSON format")
    }

    return { imported, failed }
  }

  /**
   * Share multiple modules (change visibility)
   */
  static shareModules(
    moduleIds: string[],
    visibility: "private" | "team" | "public",
    updateModule: (id: string, updates: any) => boolean,
  ): { shared: string[]; failed: string[] } {
    const shared: string[] = []
    const failed: string[] = []

    for (const moduleId of moduleIds) {
      const success = updateModule(moduleId, { visibility })
      if (success) {
        shared.push(moduleId)
      } else {
        failed.push(moduleId)
      }
    }

    return { shared, failed }
  }

  /**
   * Download export file
   */
  static downloadExport(jsonString: string, filename: string): void {
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
}

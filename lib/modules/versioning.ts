import type { ModuleVersion, ModuleType } from "./types"
import type { ProfessionalRole } from "@/lib/agent-config/roles"
import type { Persona } from "@/lib/agent-config/personas"
import type { ThinkingFramework } from "@/lib/agent-config/frameworks"

const VERSION_STORAGE_KEY = "anydebate_module_versions"

export class ModuleVersionManager {
  /**
   * Save a new version of a module
   */
  static saveVersion(
    moduleId: string,
    moduleType: ModuleType,
    data: ProfessionalRole | Persona | ThinkingFramework,
    changes: string,
  ): ModuleVersion {
    const versions = this.getVersions(moduleId)
    const latestVersion = versions.length > 0 ? Math.max(...versions.map((v) => v.version)) : 0

    const newVersion: ModuleVersion = {
      version: latestVersion + 1,
      timestamp: new Date(),
      changes,
      data,
    }

    versions.push(newVersion)
    this.saveVersions(moduleId, versions)

    return newVersion
  }

  /**
   * Get all versions for a module
   */
  static getVersions(moduleId: string): ModuleVersion[] {
    if (typeof window === "undefined") return []

    try {
      const key = `${VERSION_STORAGE_KEY}_${moduleId}`
      const data = localStorage.getItem(key)
      if (!data) return []

      const parsed = JSON.parse(data)
      return parsed.map((item: any) => ({
        ...item,
        timestamp: new Date(item.timestamp),
      }))
    } catch (error) {
      console.error("[v0] Failed to load module versions:", error)
      return []
    }
  }

  /**
   * Get a specific version
   */
  static getVersion(moduleId: string, version: number): ModuleVersion | null {
    const versions = this.getVersions(moduleId)
    return versions.find((v) => v.version === version) || null
  }

  /**
   * Get the latest version
   */
  static getLatestVersion(moduleId: string): ModuleVersion | null {
    const versions = this.getVersions(moduleId)
    if (versions.length === 0) return null

    return versions.reduce((latest, current) => (current.version > latest.version ? current : latest))
  }

  /**
   * Restore a previous version
   */
  static restoreVersion(moduleId: string, version: number): ModuleVersion | null {
    const targetVersion = this.getVersion(moduleId, version)
    if (!targetVersion) return null

    // Create a new version based on the restored data
    const newVersion = this.saveVersion(moduleId, "role", targetVersion.data, `Restored from version ${version}`)

    return newVersion
  }

  /**
   * Delete all versions for a module
   */
  static deleteVersions(moduleId: string): void {
    if (typeof window === "undefined") return

    try {
      const key = `${VERSION_STORAGE_KEY}_${moduleId}`
      localStorage.removeItem(key)
    } catch (error) {
      console.error("[v0] Failed to delete module versions:", error)
    }
  }

  /**
   * Get version history summary
   */
  static getVersionHistory(moduleId: string): Array<{ version: number; timestamp: Date; changes: string }> {
    const versions = this.getVersions(moduleId)
    return versions.map((v) => ({
      version: v.version,
      timestamp: v.timestamp,
      changes: v.changes,
    }))
  }

  private static saveVersions(moduleId: string, versions: ModuleVersion[]): void {
    if (typeof window === "undefined") return

    try {
      const key = `${VERSION_STORAGE_KEY}_${moduleId}`
      localStorage.setItem(key, JSON.stringify(versions))
    } catch (error) {
      console.error("[v0] Failed to save module versions:", error)
    }
  }
}

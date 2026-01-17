import type { ModuleAnalytics, ModuleType } from "./types"

const ANALYTICS_STORAGE_KEY = "anydebate_module_analytics"

export class ModuleAnalyticsManager {
  /**
   * Track module usage
   */
  static trackUsage(moduleId: string, moduleType: ModuleType): void {
    const analytics = this.getAll()
    const existing = analytics.find((a) => a.moduleId === moduleId)

    if (existing) {
      existing.usageCount++
      existing.lastUsed = new Date()
    } else {
      analytics.push({
        moduleId,
        moduleType,
        usageCount: 1,
        lastUsed: new Date(),
        agentCount: 0,
        createdAt: new Date(),
      })
    }

    this.saveAll(analytics)
  }

  /**
   * Update agent count for a module
   */
  static updateAgentCount(moduleId: string, count: number): void {
    const analytics = this.getAll()
    const existing = analytics.find((a) => a.moduleId === moduleId)

    if (existing) {
      existing.agentCount = count
      this.saveAll(analytics)
    }
  }

  /**
   * Get analytics for a specific module
   */
  static getModuleAnalytics(moduleId: string): ModuleAnalytics | null {
    const analytics = this.getAll()
    return analytics.find((a) => a.moduleId === moduleId) || null
  }

  /**
   * Get all analytics data
   */
  static getAll(): ModuleAnalytics[] {
    if (typeof window === "undefined") return []

    try {
      const data = localStorage.getItem(ANALYTICS_STORAGE_KEY)
      if (!data) return []

      const parsed = JSON.parse(data)
      return parsed.map((item: any) => ({
        ...item,
        lastUsed: new Date(item.lastUsed),
        createdAt: new Date(item.createdAt),
      }))
    } catch (error) {
      console.error("[v0] Failed to load module analytics:", error)
      return []
    }
  }

  /**
   * Get popular modules by type
   */
  static getPopularModules(moduleType: ModuleType, threshold = 5): ModuleAnalytics[] {
    const analytics = this.getAll()
    return analytics
      .filter((a) => a.moduleType === moduleType && a.usageCount >= threshold)
      .sort((a, b) => b.usageCount - a.usageCount)
  }

  /**
   * Get trending modules (used in last 7 days)
   */
  static getTrendingModules(moduleType: ModuleType, threshold = 3): ModuleAnalytics[] {
    const analytics = this.getAll()
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    return analytics
      .filter((a) => a.moduleType === moduleType && a.usageCount >= threshold && a.lastUsed >= sevenDaysAgo)
      .sort((a, b) => b.usageCount - a.usageCount)
  }

  /**
   * Get modules by agent count (most used in agents)
   */
  static getMostUsedInAgents(moduleType: ModuleType, limit = 10): ModuleAnalytics[] {
    const analytics = this.getAll()
    return analytics
      .filter((a) => a.moduleType === moduleType)
      .sort((a, b) => b.agentCount - a.agentCount)
      .slice(0, limit)
  }

  /**
   * Delete analytics for a specific module
   */
  static deleteModuleAnalytics(moduleId: string): void {
    const analytics = this.getAll().filter((a) => a.moduleId !== moduleId)
    this.saveAll(analytics)
  }

  /**
   * Clear all analytics data
   */
  static clearAll(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(ANALYTICS_STORAGE_KEY)
  }

  private static saveAll(analytics: ModuleAnalytics[]): void {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(analytics))
    } catch (error) {
      console.error("[v0] Failed to save module analytics:", error)
    }
  }
}

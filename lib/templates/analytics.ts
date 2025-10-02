/**
 * Template Analytics System
 * Tracks template usage, popularity, and category statistics
 * All data stored in localStorage for client-side persistence
 */

export interface TemplateAnalytics {
  templateId: string
  usageCount: number
  lastUsed: Date
  category: string
  createdAt: Date
}

export interface CategoryStats {
  category: string
  templateCount: number
  totalUsage: number
  averageUsage: number
}

export interface AnalyticsSummary {
  totalTemplates: number
  totalUsage: number
  mostPopularTemplate: {
    id: string
    name: string
    usageCount: number
  } | null
  mostUsedCategory: {
    category: string
    usageCount: number
  } | null
  categoryStats: CategoryStats[]
  recentlyUsed: TemplateAnalytics[]
}

const ANALYTICS_STORAGE_KEY = "anydebate_template_analytics"

export class TemplateAnalytics {
  /**
   * Track template usage
   */
  static trackUsage(templateId: string, templateName: string, category: string): void {
    const analytics = this.getAll()
    const existing = analytics.find((a) => a.templateId === templateId)

    if (existing) {
      existing.usageCount++
      existing.lastUsed = new Date()
    } else {
      analytics.push({
        templateId,
        usageCount: 1,
        lastUsed: new Date(),
        category,
        createdAt: new Date(),
      })
    }

    this.saveAll(analytics)
  }

  /**
   * Get analytics for a specific template
   */
  static getTemplateAnalytics(templateId: string): TemplateAnalytics | null {
    const analytics = this.getAll()
    return analytics.find((a) => a.templateId === templateId) || null
  }

  /**
   * Get all analytics data
   */
  static getAll(): TemplateAnalytics[] {
    if (typeof window === "undefined") return []

    try {
      const data = localStorage.getItem(ANALYTICS_STORAGE_KEY)
      if (!data) return []

      const parsed = JSON.parse(data)
      // Convert date strings back to Date objects
      return parsed.map((item: any) => ({
        ...item,
        lastUsed: new Date(item.lastUsed),
        createdAt: new Date(item.createdAt),
      }))
    } catch (error) {
      console.error("[TemplateAnalytics] Failed to load analytics:", error)
      return []
    }
  }

  /**
   * Get analytics summary with statistics
   */
  static getSummary(): AnalyticsSummary {
    const analytics = this.getAll()

    if (analytics.length === 0) {
      return {
        totalTemplates: 0,
        totalUsage: 0,
        mostPopularTemplate: null,
        mostUsedCategory: null,
        categoryStats: [],
        recentlyUsed: [],
      }
    }

    // Calculate total usage
    const totalUsage = analytics.reduce((sum, a) => sum + a.usageCount, 0)

    // Find most popular template
    const mostPopular = analytics.reduce((max, a) => (a.usageCount > max.usageCount ? a : max))

    // Calculate category statistics
    const categoryMap = new Map<string, { count: number; usage: number }>()
    analytics.forEach((a) => {
      const existing = categoryMap.get(a.category) || { count: 0, usage: 0 }
      categoryMap.set(a.category, {
        count: existing.count + 1,
        usage: existing.usage + a.usageCount,
      })
    })

    const categoryStats: CategoryStats[] = Array.from(categoryMap.entries()).map(([category, stats]) => ({
      category,
      templateCount: stats.count,
      totalUsage: stats.usage,
      averageUsage: stats.usage / stats.count,
    }))

    // Find most used category
    const mostUsedCategory = categoryStats.reduce(
      (max, cat) => (cat.totalUsage > max.totalUsage ? cat : max),
      categoryStats[0],
    )

    // Get recently used templates (last 5)
    const recentlyUsed = [...analytics].sort((a, b) => b.lastUsed.getTime() - a.lastUsed.getTime()).slice(0, 5)

    return {
      totalTemplates: analytics.length,
      totalUsage,
      mostPopularTemplate: {
        id: mostPopular.templateId,
        name: "", // Name needs to be fetched from template storage
        usageCount: mostPopular.usageCount,
      },
      mostUsedCategory: {
        category: mostUsedCategory.category,
        usageCount: mostUsedCategory.totalUsage,
      },
      categoryStats,
      recentlyUsed,
    }
  }

  /**
   * Get popular templates (usage count >= threshold)
   */
  static getPopularTemplates(threshold = 10): TemplateAnalytics[] {
    const analytics = this.getAll()
    return analytics.filter((a) => a.usageCount >= threshold).sort((a, b) => b.usageCount - a.usageCount)
  }

  /**
   * Get trending templates (usage count >= threshold, used in last 7 days)
   */
  static getTrendingTemplates(threshold = 5): TemplateAnalytics[] {
    const analytics = this.getAll()
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    return analytics
      .filter((a) => a.usageCount >= threshold && a.lastUsed >= sevenDaysAgo)
      .sort((a, b) => b.usageCount - a.usageCount)
  }

  /**
   * Get category statistics
   */
  static getCategoryStats(): CategoryStats[] {
    const summary = this.getSummary()
    return summary.categoryStats.sort((a, b) => b.totalUsage - a.totalUsage)
  }

  /**
   * Clear all analytics data
   */
  static clearAll(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(ANALYTICS_STORAGE_KEY)
  }

  /**
   * Delete analytics for a specific template
   */
  static deleteTemplateAnalytics(templateId: string): void {
    const analytics = this.getAll().filter((a) => a.templateId !== templateId)
    this.saveAll(analytics)
  }

  /**
   * Save all analytics data
   */
  private static saveAll(analytics: TemplateAnalytics[]): void {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(analytics))
    } catch (error) {
      console.error("[TemplateAnalytics] Failed to save analytics:", error)
    }
  }
}

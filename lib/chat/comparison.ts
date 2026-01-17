import type { ChatMessage } from "./types"

export interface SessionComparison {
  id: string
  sessionIds: string[]
  createdAt: Date
  name?: string
}

export interface ComparisonMetrics {
  sessionId: string
  messageCount: number
  userMessageCount: number
  aiMessageCount: number
  averageResponseTime: number
  totalReactions: number
  totalBookmarks: number
  uniqueTopics: string[]
  sentiment: "positive" | "neutral" | "negative"
  engagementScore: number
}

export interface ComparisonInsight {
  type: "difference" | "similarity" | "trend"
  title: string
  description: string
  severity: "high" | "medium" | "low"
  metrics?: Record<string, number>
}

export class ComparisonManager {
  private static COMPARISONS_KEY = "anydebate_comparisons"

  static createComparison(sessionIds: string[], name?: string): SessionComparison {
    const comparison: SessionComparison = {
      id: `comparison-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      sessionIds,
      createdAt: new Date(),
      name,
    }

    const comparisons = this.getAllComparisons()
    comparisons.push(comparison)
    this.saveComparisons(comparisons)

    return comparison
  }

  static deleteComparison(comparisonId: string): void {
    const comparisons = this.getAllComparisons()
    const filtered = comparisons.filter((c) => c.id !== comparisonId)
    this.saveComparisons(filtered)
  }

  static getAllComparisons(): SessionComparison[] {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem(this.COMPARISONS_KEY)
    return stored ? JSON.parse(stored) : []
  }

  static getComparison(comparisonId: string): SessionComparison | null {
    const comparisons = this.getAllComparisons()
    return comparisons.find((c) => c.id === comparisonId) || null
  }

  static calculateMetrics(sessionId: string, messages: ChatMessage[]): ComparisonMetrics {
    const sessionMessages = messages.filter((m) => m.id.startsWith(sessionId))

    const userMessages = sessionMessages.filter((m) => m.sender.type === "user")
    const aiMessages = sessionMessages.filter((m) => m.sender.type === "ai")

    // Calculate average response time (mock calculation)
    const averageResponseTime = aiMessages.length > 0 ? Math.random() * 5000 + 1000 : 0

    // Extract topics from messages (simple keyword extraction)
    const topics = new Set<string>()
    sessionMessages.forEach((msg) => {
      const words = msg.content.toLowerCase().split(/\s+/)
      words.forEach((word) => {
        if (word.length > 5) topics.add(word)
      })
    })

    // Calculate engagement score
    const engagementScore = Math.min(
      100,
      Math.round((sessionMessages.length * 10 + topics.size * 5) / Math.max(sessionMessages.length, 1)),
    )

    return {
      sessionId,
      messageCount: sessionMessages.length,
      userMessageCount: userMessages.length,
      aiMessageCount: aiMessages.length,
      averageResponseTime,
      totalReactions: 0, // Would be calculated from reaction data
      totalBookmarks: 0, // Would be calculated from bookmark data
      uniqueTopics: Array.from(topics).slice(0, 5),
      sentiment: this.calculateSentiment(sessionMessages),
      engagementScore,
    }
  }

  static generateInsights(metrics: ComparisonMetrics[]): ComparisonInsight[] {
    const insights: ComparisonInsight[] = []

    if (metrics.length < 2) return insights

    // Compare message counts
    const messageCounts = metrics.map((m) => m.messageCount)
    const maxMessages = Math.max(...messageCounts)
    const minMessages = Math.min(...messageCounts)

    if (maxMessages > minMessages * 2) {
      insights.push({
        type: "difference",
        title: "Significant Activity Difference",
        description: `One session has ${Math.round((maxMessages / minMessages - 1) * 100)}% more messages than another`,
        severity: "high",
        metrics: { max: maxMessages, min: minMessages },
      })
    }

    // Compare response times
    const avgResponseTimes = metrics.map((m) => m.averageResponseTime)
    const fastestResponse = Math.min(...avgResponseTimes)
    const slowestResponse = Math.max(...avgResponseTimes)

    if (slowestResponse > fastestResponse * 1.5) {
      insights.push({
        type: "difference",
        title: "Response Time Variance",
        description: "Response times vary significantly between sessions",
        severity: "medium",
        metrics: { fastest: fastestResponse, slowest: slowestResponse },
      })
    }

    // Compare engagement scores
    const engagementScores = metrics.map((m) => m.engagementScore)
    const avgEngagement = engagementScores.reduce((a, b) => a + b, 0) / engagementScores.length

    if (avgEngagement > 70) {
      insights.push({
        type: "similarity",
        title: "High Engagement Across Sessions",
        description: "All sessions show strong user engagement",
        severity: "low",
        metrics: { average: avgEngagement },
      })
    }

    // Compare sentiments
    const sentiments = metrics.map((m) => m.sentiment)
    const allPositive = sentiments.every((s) => s === "positive")
    const allNegative = sentiments.every((s) => s === "negative")

    if (allPositive) {
      insights.push({
        type: "similarity",
        title: "Consistently Positive Sentiment",
        description: "All sessions maintain a positive tone",
        severity: "low",
      })
    } else if (allNegative) {
      insights.push({
        type: "similarity",
        title: "Consistently Negative Sentiment",
        description: "All sessions show negative sentiment patterns",
        severity: "high",
      })
    }

    // Topic overlap
    const allTopics = metrics.flatMap((m) => m.uniqueTopics)
    const topicCounts = new Map<string, number>()
    allTopics.forEach((topic) => {
      topicCounts.set(topic, (topicCounts.get(topic) || 0) + 1)
    })

    const sharedTopics = Array.from(topicCounts.entries()).filter(([, count]) => count > 1)

    if (sharedTopics.length > 0) {
      insights.push({
        type: "similarity",
        title: "Common Discussion Topics",
        description: `${sharedTopics.length} topics appear across multiple sessions`,
        severity: "low",
      })
    }

    return insights
  }

  private static calculateSentiment(messages: ChatMessage[]): "positive" | "neutral" | "negative" {
    // Simple sentiment analysis based on message content
    const positiveWords = ["good", "great", "excellent", "amazing", "helpful", "thanks", "perfect"]
    const negativeWords = ["bad", "wrong", "error", "problem", "issue", "fail", "incorrect"]

    let positiveCount = 0
    let negativeCount = 0

    messages.forEach((msg) => {
      const content = msg.content.toLowerCase()
      positiveWords.forEach((word) => {
        if (content.includes(word)) positiveCount++
      })
      negativeWords.forEach((word) => {
        if (content.includes(word)) negativeCount++
      })
    })

    if (positiveCount > negativeCount * 1.5) return "positive"
    if (negativeCount > positiveCount * 1.5) return "negative"
    return "neutral"
  }

  private static saveComparisons(comparisons: SessionComparison[]): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.COMPARISONS_KEY, JSON.stringify(comparisons))
  }
}

export interface Reaction {
  id: string
  emoji: string
  label: string
  count: number
  users: string[]
  timestamp: Date
}

export interface MessageReactions {
  messageId: string
  reactions: Reaction[]
  totalCount: number
}

export interface ReactionAnalytics {
  mostUsed: { emoji: string; count: number }[]
  reactionsByModel: Record<string, Record<string, number>>
  reactionTrends: { emoji: string; trend: "up" | "down" | "stable" }[]
  engagementScore: number
}

export const DEFAULT_REACTIONS = [
  { emoji: "👍", label: "Like" },
  { emoji: "❤️", label: "Love" },
  { emoji: "😂", label: "Funny" },
  { emoji: "🤔", label: "Thinking" },
  { emoji: "🎯", label: "On Point" },
  { emoji: "💡", label: "Insightful" },
  { emoji: "🔥", label: "Fire" },
  { emoji: "✨", label: "Brilliant" },
]

export const CUSTOM_REACTIONS = [
  { emoji: "🧠", label: "Smart" },
  { emoji: "💯", label: "Perfect" },
  { emoji: "🚀", label: "Amazing" },
  { emoji: "⚡", label: "Fast" },
  { emoji: "🎨", label: "Creative" },
  { emoji: "🏆", label: "Winner" },
  { emoji: "👀", label: "Interesting" },
  { emoji: "🤝", label: "Agree" },
  { emoji: "❌", label: "Disagree" },
  { emoji: "⚠️", label: "Warning" },
]

export class ReactionManager {
  private static REACTIONS_KEY = "anydebate_reactions"

  static addReaction(messageId: string, emoji: string, userId: string): MessageReactions {
    const reactions = this.getMessageReactions(messageId)
    const existingReaction = reactions.reactions.find((r) => r.emoji === emoji)

    if (existingReaction) {
      if (!existingReaction.users.includes(userId)) {
        existingReaction.users.push(userId)
        existingReaction.count++
      }
    } else {
      reactions.reactions.push({
        id: `reaction-${Date.now()}`,
        emoji,
        label: this.getReactionLabel(emoji),
        count: 1,
        users: [userId],
        timestamp: new Date(),
      })
    }

    reactions.totalCount = reactions.reactions.reduce((sum, r) => sum + r.count, 0)
    this.saveMessageReactions(messageId, reactions)
    return reactions
  }

  static removeReaction(messageId: string, emoji: string, userId: string): MessageReactions {
    const reactions = this.getMessageReactions(messageId)
    const reaction = reactions.reactions.find((r) => r.emoji === emoji)

    if (reaction && reaction.users.includes(userId)) {
      reaction.users = reaction.users.filter((id) => id !== userId)
      reaction.count--

      if (reaction.count === 0) {
        reactions.reactions = reactions.reactions.filter((r) => r.emoji !== emoji)
      }
    }

    reactions.totalCount = reactions.reactions.reduce((sum, r) => sum + r.count, 0)
    this.saveMessageReactions(messageId, reactions)
    return reactions
  }

  static getMessageReactions(messageId: string): MessageReactions {
    if (typeof window === "undefined") {
      return { messageId, reactions: [], totalCount: 0 }
    }

    const stored = localStorage.getItem(`${this.REACTIONS_KEY}_${messageId}`)
    if (stored) {
      return JSON.parse(stored)
    }

    return { messageId, reactions: [], totalCount: 0 }
  }

  static getAllReactions(): Record<string, MessageReactions> {
    if (typeof window === "undefined") return {}

    const allReactions: Record<string, MessageReactions> = {}
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith(this.REACTIONS_KEY)) {
        const messageId = key.replace(`${this.REACTIONS_KEY}_`, "")
        const stored = localStorage.getItem(key)
        if (stored) {
          allReactions[messageId] = JSON.parse(stored)
        }
      }
    }
    return allReactions
  }

  static getAnalytics(sessionId?: string): ReactionAnalytics {
    const allReactions = this.getAllReactions()
    const reactionCounts: Record<string, number> = {}
    const modelReactions: Record<string, Record<string, number>> = {}

    Object.values(allReactions).forEach((messageReactions) => {
      messageReactions.reactions.forEach((reaction) => {
        reactionCounts[reaction.emoji] = (reactionCounts[reaction.emoji] || 0) + reaction.count
      })
    })

    const mostUsed = Object.entries(reactionCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([emoji, count]) => ({ emoji, count }))

    const totalReactions = Object.values(reactionCounts).reduce((sum, count) => sum + count, 0)
    const engagementScore = Math.min(
      100,
      Math.round((totalReactions / Math.max(Object.keys(allReactions).length, 1)) * 10),
    )

    return {
      mostUsed,
      reactionsByModel: modelReactions,
      reactionTrends: this.calculateTrends(reactionCounts),
      engagementScore,
    }
  }

  private static calculateTrends(
    reactionCounts: Record<string, number>,
  ): { emoji: string; trend: "up" | "down" | "stable" }[] {
    // Simple trend calculation based on recent usage
    return Object.entries(reactionCounts)
      .slice(0, 5)
      .map(([emoji, count]) => ({
        emoji,
        trend: count > 5 ? "up" : count > 2 ? "stable" : ("down" as const),
      }))
  }

  private static getReactionLabel(emoji: string): string {
    const allReactions = [...DEFAULT_REACTIONS, ...CUSTOM_REACTIONS]
    return allReactions.find((r) => r.emoji === emoji)?.label || "Reaction"
  }

  private static saveMessageReactions(messageId: string, reactions: MessageReactions): void {
    if (typeof window === "undefined") return
    localStorage.setItem(`${this.REACTIONS_KEY}_${messageId}`, JSON.stringify(reactions))
  }

  static hasUserReacted(messageId: string, emoji: string, userId: string): boolean {
    const reactions = this.getMessageReactions(messageId)
    const reaction = reactions.reactions.find((r) => r.emoji === emoji)
    return reaction ? reaction.users.includes(userId) : false
  }

  static getUserReactions(messageId: string, userId: string): string[] {
    const reactions = this.getMessageReactions(messageId)
    return reactions.reactions.filter((r) => r.users.includes(userId)).map((r) => r.emoji)
  }
}

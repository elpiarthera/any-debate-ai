import type { ChatMessage } from "./types"

export interface MessageThread {
  id: string
  parentMessageId: string
  replies: ChatMessage[]
  participants: string[]
  createdAt: Date
  lastReplyAt: Date
}

export interface ThreadedMessage extends ChatMessage {
  threadId?: string
  parentMessageId?: string
  replyCount?: number
  hasReplies?: boolean
}

export class ThreadManager {
  private static THREADS_KEY = "anydebate_threads"
  private static MAX_THREAD_DEPTH = 3

  static createThread(parentMessage: ChatMessage): MessageThread {
    return {
      id: `thread-${parentMessage.id}`,
      parentMessageId: parentMessage.id,
      replies: [],
      participants: [parentMessage.sender.id],
      createdAt: new Date(),
      lastReplyAt: new Date(),
    }
  }

  static addReply(thread: MessageThread, reply: ChatMessage): MessageThread {
    return {
      ...thread,
      replies: [...thread.replies, reply],
      participants: Array.from(new Set([...thread.participants, reply.sender.id])),
      lastReplyAt: new Date(),
    }
  }

  static getThreadMessages(messages: ChatMessage[], threadId: string): ChatMessage[] {
    return messages.filter((msg) => (msg as ThreadedMessage).threadId === threadId)
  }

  static getThreadDepth(message: ThreadedMessage, allMessages: ChatMessage[]): number {
    let depth = 0
    let currentMessage = message

    while (currentMessage.parentMessageId && depth < this.MAX_THREAD_DEPTH) {
      const parent = allMessages.find((m) => m.id === currentMessage.parentMessageId)
      if (!parent) break
      depth++
      currentMessage = parent as ThreadedMessage
    }

    return depth
  }

  static canReply(message: ThreadedMessage, allMessages: ChatMessage[]): boolean {
    return this.getThreadDepth(message, allMessages) < this.MAX_THREAD_DEPTH
  }

  static getThreadHierarchy(parentMessageId: string, allMessages: ChatMessage[]): ChatMessage[] {
    const hierarchy: ChatMessage[] = []
    const parent = allMessages.find((m) => m.id === parentMessageId)
    if (!parent) return hierarchy

    hierarchy.push(parent)

    const getReplies = (messageId: string, depth = 0) => {
      if (depth >= this.MAX_THREAD_DEPTH) return

      const replies = allMessages.filter((m) => (m as ThreadedMessage).parentMessageId === messageId)
      replies.forEach((reply) => {
        hierarchy.push(reply)
        getReplies(reply.id, depth + 1)
      })
    }

    getReplies(parentMessageId)
    return hierarchy
  }

  static saveThreads(threads: MessageThread[]): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.THREADS_KEY, JSON.stringify(threads))
  }

  static loadThreads(): MessageThread[] {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem(this.THREADS_KEY)
    return stored ? JSON.parse(stored) : []
  }

  static getThreadStats(thread: MessageThread): {
    replyCount: number
    participantCount: number
    lastReplyTime: string
  } {
    return {
      replyCount: thread.replies.length,
      participantCount: thread.participants.length,
      lastReplyTime: this.formatRelativeTime(thread.lastReplyAt),
    }
  }

  private static formatRelativeTime(date: Date): string {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return "just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }
}

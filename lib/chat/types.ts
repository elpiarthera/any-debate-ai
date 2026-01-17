export interface ChatMessage {
  id: string
  content: string
  sender: {
    id: string
    name: string
    type: "user" | "ai"
    avatar?: string
  }
  timestamp: Date
  isStreaming?: boolean
  reactions?: {
    likes: number
    dislikes: number
  }
  threadId?: string
  parentMessageId?: string
  replyCount?: number
  hasReplies?: boolean
  bookmarked?: boolean
}

export interface SearchQuery {
  text: string
  sender?: string
  dateFrom?: Date
  dateTo?: Date
  messageType?: "user" | "ai"
}

export interface SearchResult {
  messageId: string
  message: ChatMessage
  matchedText: string
  matchIndex: number
  context: string
}

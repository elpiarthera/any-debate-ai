import type { ChatMessage, SearchQuery, SearchResult } from "./types"

export class MessageSearch {
  private static SEARCH_HISTORY_KEY = "anydebate_search_history"
  private static MAX_HISTORY = 10

  static search(messages: ChatMessage[], query: SearchQuery): SearchResult[] {
    if (!query.text.trim()) return []

    const results = messages
      .filter((msg) => this.matchesQuery(msg, query))
      .map((msg) => ({
        messageId: msg.id,
        message: msg,
        matchedText: this.extractMatch(msg.content, query.text),
        matchIndex: msg.content.toLowerCase().indexOf(query.text.toLowerCase()),
        context: this.getContext(msg.content, query.text),
      }))
      .sort((a, b) => b.message.timestamp.getTime() - a.message.timestamp.getTime())

    // Save to search history
    if (query.text.trim()) {
      this.addToHistory(query.text)
    }

    return results
  }

  private static matchesQuery(msg: ChatMessage, query: SearchQuery): boolean {
    const textMatch = msg.content.toLowerCase().includes(query.text.toLowerCase())
    const senderMatch = !query.sender || msg.sender.id === query.sender
    const dateMatch = this.isInDateRange(msg.timestamp, query.dateFrom, query.dateTo)
    const typeMatch = !query.messageType || msg.sender.type === query.messageType

    return textMatch && senderMatch && dateMatch && typeMatch
  }

  private static isInDateRange(date: Date, from?: Date, to?: Date): boolean {
    if (!from && !to) return true
    const timestamp = date.getTime()
    if (from && timestamp < from.getTime()) return false
    if (to && timestamp > to.getTime()) return false
    return true
  }

  private static extractMatch(content: string, searchText: string): string {
    const index = content.toLowerCase().indexOf(searchText.toLowerCase())
    if (index === -1) return ""
    return content.slice(index, index + searchText.length)
  }

  private static getContext(content: string, searchText: string, contextLength = 50): string {
    const index = content.toLowerCase().indexOf(searchText.toLowerCase())
    if (index === -1) return content.slice(0, 100)

    const start = Math.max(0, index - contextLength)
    const end = Math.min(content.length, index + searchText.length + contextLength)

    let context = content.slice(start, end)
    if (start > 0) context = "..." + context
    if (end < content.length) context = context + "..."

    return context
  }

  static getSearchHistory(): string[] {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem(this.SEARCH_HISTORY_KEY)
    return stored ? JSON.parse(stored) : []
  }

  static addToHistory(query: string): void {
    if (typeof window === "undefined") return
    const history = this.getSearchHistory()
    const updated = [query, ...history.filter((q) => q !== query)].slice(0, this.MAX_HISTORY)
    localStorage.setItem(this.SEARCH_HISTORY_KEY, JSON.stringify(updated))
  }

  static clearHistory(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(this.SEARCH_HISTORY_KEY)
  }

  static getSuggestions(query: string, messages: ChatMessage[]): string[] {
    if (!query.trim()) return []

    // Extract common words from messages
    const words = new Set<string>()
    messages.forEach((msg) => {
      const msgWords = msg.content
        .toLowerCase()
        .split(/\s+/)
        .filter((w) => w.length > 3)
      msgWords.forEach((w) => words.add(w))
    })

    // Filter words that start with query
    return Array.from(words)
      .filter((w) => w.startsWith(query.toLowerCase()))
      .slice(0, 5)
  }
}

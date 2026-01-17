export interface Bookmark {
  id: string
  messageId: string
  sessionId: string
  collectionId?: string
  note?: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export interface BookmarkCollection {
  id: string
  name: string
  description?: string
  color: string
  icon: string
  bookmarkIds: string[]
  createdAt: Date
  updatedAt: Date
}

export interface BookmarkStats {
  totalBookmarks: number
  totalCollections: number
  recentBookmarks: Bookmark[]
  topTags: { tag: string; count: number }[]
  bookmarksByCollection: Record<string, number>
}

export const DEFAULT_COLLECTIONS: Omit<BookmarkCollection, "id" | "bookmarkIds" | "createdAt" | "updatedAt">[] = [
  {
    name: "Important",
    description: "Critical insights and key points",
    color: "bg-red-500",
    icon: "⭐",
  },
  {
    name: "To Review",
    description: "Messages to revisit later",
    color: "bg-yellow-500",
    icon: "📋",
  },
  {
    name: "Research",
    description: "Research findings and references",
    color: "bg-blue-500",
    icon: "🔬",
  },
  {
    name: "Ideas",
    description: "Creative ideas and inspiration",
    color: "bg-purple-500",
    icon: "💡",
  },
]

export class BookmarkManager {
  private static BOOKMARKS_KEY = "anydebate_bookmarks"
  private static COLLECTIONS_KEY = "anydebate_bookmark_collections"

  static createBookmark(
    messageId: string,
    sessionId: string,
    options?: { collectionId?: string; note?: string; tags?: string[] },
  ): Bookmark {
    const bookmark: Bookmark = {
      id: `bookmark-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      messageId,
      sessionId,
      collectionId: options?.collectionId,
      note: options?.note,
      tags: options?.tags || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const bookmarks = this.getAllBookmarks()
    bookmarks.push(bookmark)
    this.saveBookmarks(bookmarks)

    if (options?.collectionId) {
      this.addBookmarkToCollection(options.collectionId, bookmark.id)
    }

    return bookmark
  }

  static deleteBookmark(bookmarkId: string): void {
    const bookmarks = this.getAllBookmarks()
    const bookmark = bookmarks.find((b) => b.id === bookmarkId)

    if (bookmark?.collectionId) {
      this.removeBookmarkFromCollection(bookmark.collectionId, bookmarkId)
    }

    const filtered = bookmarks.filter((b) => b.id !== bookmarkId)
    this.saveBookmarks(filtered)
  }

  static updateBookmark(bookmarkId: string, updates: Partial<Omit<Bookmark, "id" | "createdAt">>): Bookmark | null {
    const bookmarks = this.getAllBookmarks()
    const index = bookmarks.findIndex((b) => b.id === bookmarkId)

    if (index === -1) return null

    const oldCollectionId = bookmarks[index].collectionId
    const newCollectionId = updates.collectionId

    bookmarks[index] = {
      ...bookmarks[index],
      ...updates,
      updatedAt: new Date(),
    }

    this.saveBookmarks(bookmarks)

    // Update collection memberships
    if (oldCollectionId !== newCollectionId) {
      if (oldCollectionId) {
        this.removeBookmarkFromCollection(oldCollectionId, bookmarkId)
      }
      if (newCollectionId) {
        this.addBookmarkToCollection(newCollectionId, bookmarkId)
      }
    }

    return bookmarks[index]
  }

  static getBookmark(bookmarkId: string): Bookmark | null {
    const bookmarks = this.getAllBookmarks()
    return bookmarks.find((b) => b.id === bookmarkId) || null
  }

  static getAllBookmarks(): Bookmark[] {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem(this.BOOKMARKS_KEY)
    return stored ? JSON.parse(stored) : []
  }

  static getBookmarksBySession(sessionId: string): Bookmark[] {
    return this.getAllBookmarks().filter((b) => b.sessionId === sessionId)
  }

  static getBookmarksByCollection(collectionId: string): Bookmark[] {
    return this.getAllBookmarks().filter((b) => b.collectionId === collectionId)
  }

  static isBookmarked(messageId: string): boolean {
    return this.getAllBookmarks().some((b) => b.messageId === messageId)
  }

  static getBookmarkByMessageId(messageId: string): Bookmark | null {
    return this.getAllBookmarks().find((b) => b.messageId === messageId) || null
  }

  static searchBookmarks(query: string): Bookmark[] {
    const bookmarks = this.getAllBookmarks()
    const lowerQuery = query.toLowerCase()

    return bookmarks.filter(
      (bookmark) =>
        bookmark.note?.toLowerCase().includes(lowerQuery) ||
        bookmark.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
    )
  }

  // Collection Management
  static createCollection(
    name: string,
    options?: { description?: string; color?: string; icon?: string },
  ): BookmarkCollection {
    const collection: BookmarkCollection = {
      id: `collection-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      description: options?.description,
      color: options?.color || "bg-gray-500",
      icon: options?.icon || "📁",
      bookmarkIds: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const collections = this.getAllCollections()
    collections.push(collection)
    this.saveCollections(collections)

    return collection
  }

  static deleteCollection(collectionId: string): void {
    // Remove collection reference from bookmarks
    const bookmarks = this.getAllBookmarks()
    bookmarks.forEach((bookmark) => {
      if (bookmark.collectionId === collectionId) {
        bookmark.collectionId = undefined
      }
    })
    this.saveBookmarks(bookmarks)

    // Delete collection
    const collections = this.getAllCollections()
    const filtered = collections.filter((c) => c.id !== collectionId)
    this.saveCollections(filtered)
  }

  static updateCollection(
    collectionId: string,
    updates: Partial<Omit<BookmarkCollection, "id" | "createdAt">>,
  ): BookmarkCollection | null {
    const collections = this.getAllCollections()
    const index = collections.findIndex((c) => c.id === collectionId)

    if (index === -1) return null

    collections[index] = {
      ...collections[index],
      ...updates,
      updatedAt: new Date(),
    }

    this.saveCollections(collections)
    return collections[index]
  }

  static getAllCollections(): BookmarkCollection[] {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem(this.COLLECTIONS_KEY)

    if (!stored) {
      // Initialize with default collections
      const defaultCollections = DEFAULT_COLLECTIONS.map((col) => ({
        ...col,
        id: `collection-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        bookmarkIds: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
      this.saveCollections(defaultCollections)
      return defaultCollections
    }

    return JSON.parse(stored)
  }

  static getCollection(collectionId: string): BookmarkCollection | null {
    const collections = this.getAllCollections()
    return collections.find((c) => c.id === collectionId) || null
  }

  private static addBookmarkToCollection(collectionId: string, bookmarkId: string): void {
    const collections = this.getAllCollections()
    const collection = collections.find((c) => c.id === collectionId)

    if (collection && !collection.bookmarkIds.includes(bookmarkId)) {
      collection.bookmarkIds.push(bookmarkId)
      collection.updatedAt = new Date()
      this.saveCollections(collections)
    }
  }

  private static removeBookmarkFromCollection(collectionId: string, bookmarkId: string): void {
    const collections = this.getAllCollections()
    const collection = collections.find((c) => c.id === collectionId)

    if (collection) {
      collection.bookmarkIds = collection.bookmarkIds.filter((id) => id !== bookmarkId)
      collection.updatedAt = new Date()
      this.saveCollections(collections)
    }
  }

  static getStats(): BookmarkStats {
    const bookmarks = this.getAllBookmarks()
    const collections = this.getAllCollections()

    const tagCounts: Record<string, number> = {}
    bookmarks.forEach((bookmark) => {
      bookmark.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    })

    const topTags = Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([tag, count]) => ({ tag, count }))

    const bookmarksByCollection: Record<string, number> = {}
    collections.forEach((collection) => {
      bookmarksByCollection[collection.name] = collection.bookmarkIds.length
    })

    const recentBookmarks = [...bookmarks].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 5)

    return {
      totalBookmarks: bookmarks.length,
      totalCollections: collections.length,
      recentBookmarks,
      topTags,
      bookmarksByCollection,
    }
  }

  private static saveBookmarks(bookmarks: Bookmark[]): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.BOOKMARKS_KEY, JSON.stringify(bookmarks))
  }

  private static saveCollections(collections: BookmarkCollection[]): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.COLLECTIONS_KEY, JSON.stringify(collections))
  }
}

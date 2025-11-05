# Chat History Persistence Architecture

## Overview

AnyDebateAI's chat history persistence is designed around **Convex**, a real-time backend platform that keeps the app in sync. Currently, the application uses **browser localStorage as a temporary solution** until Convex integration is complete. This document covers both the current temporary implementation and the planned production architecture.

**Current State**: localStorage (temporary)  
**Production Target**: Convex (planned)  
**Migration Status**: In planning phase

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Current Implementation (localStorage - Temporary)](#current-implementation-localstorage---temporary)
3. [Production Architecture (Convex - Planned)](#production-architecture-convex---planned)
4. [Core Data Models](#core-data-models)
5. [Feature Modules](#feature-modules)
6. [Migration Strategy](#migration-strategy)
7. [Best Practices](#best-practices)
8. [Implementation Roadmap](#implementation-roadmap)

---

## Architecture Overview

### Production Architecture: Convex

**Convex** is the chosen backend platform for AnyDebateAI, providing:

- **Real-time Sync**: Automatic UI updates when data changes
- **TypeScript-First**: Full type safety from database to UI
- **Reactive Queries**: React hooks (`useQuery`, `useMutation`) that auto-update
- **WebSocket Management**: Automatic connection handling
- **Offline Support**: Built-in optimistic updates and conflict resolution
- **Scalability**: Cloud-hosted, serverless architecture
- **Multi-device Sync**: Seamless data sync across devices
- **Authentication**: Built-in user authentication system

### Why Convex?

1. **Perfect for React**: Designed specifically for reactive UI frameworks
2. **Real-time by Default**: No polling, no manual refresh logic
3. **Type Safety**: End-to-end TypeScript with automatic code generation
4. **Developer Experience**: Simple API, minimal boilerplate
5. **Production Ready**: Handles scaling, caching, and optimization automatically

### Temporary Solution: localStorage

Until Convex integration is complete, the application uses browser localStorage for:
- Bookmarks and collections
- Message reactions
- Thread organization
- Search history
- Session comparisons

**Limitations of localStorage**:
- No cross-device sync
- 5-10MB storage limit
- No real-time collaboration
- Data lost if browser cache cleared
- No server-side backup

---

## Current Implementation (localStorage - Temporary)

### Storage Strategy

The application uses **browser localStorage** for feature-specific persistence with the following characteristics:

- **Client-side only**: All data is stored locally in the user's browser
- **Synchronous access**: Immediate read/write operations
- **5-10MB storage limit**: Typical browser localStorage capacity
- **Domain-scoped**: Data is isolated per domain
- **No server dependency**: Works offline after initial load
- **Ephemeral messages**: Chat messages exist only in React state during active sessions

**Important**: The core chat messages themselves are NOT persisted to localStorage. Messages exist only in React component state (managed by the AI SDK's `useChat` hook) during an active session. Only feature-specific data (bookmarks, reactions, threads, search history, comparisons) is persisted.

### localStorage Keys

All data is stored under namespaced keys:

| Feature | Key Pattern | Example |
|---------|-------------|---------|
| Bookmarks | `anydebate_bookmarks` | Single key for all bookmarks |
| Collections | `anydebate_bookmark_collections` | Single key for all collections |
| Reactions | `anydebate_reactions_{messageId}` | One key per message |
| Comparisons | `anydebate_comparisons` | Single key for all comparisons |
| Threads | `anydebate_threads` | Single key for all threads |
| Search History | `anydebate_search_history` | Single key for search queries |

**Note**: These localStorage keys are temporary and will be replaced by Convex tables.

### Data Serialization

All managers follow this pattern:

\`\`\`typescript
// Save data
private static saveData(data: DataType[]): void {
  if (typeof window === "undefined") return  // SSR safety
  localStorage.setItem(KEY, JSON.stringify(data))
}

// Load data
static getData(): DataType[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(KEY)
  return stored ? JSON.parse(stored) : []
}
\`\`\`

---

## Production Architecture (Convex - Planned)

### Convex Schema Design

Convex uses TypeScript schema definitions in `convex/schema.ts`:

\`\`\`typescript
import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  // Sessions table
  sessions: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    status: v.union(v.literal("active"), v.literal("archived")),
    mode: v.union(
      v.literal("compare"),
      v.literal("debate"),
      v.literal("auto-debate")
    ),
    selectedAgents: v.array(v.string()),
    debateRounds: v.optional(v.number()),
    userId: v.string(),
    messageCount: v.number(),
    agentCount: v.number(),
    artifactCount: v.number(),
    lastActivity: v.number(),
    participants: v.array(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"])
    .index("by_last_activity", ["lastActivity"]),

  // Messages table
  messages: defineTable({
    sessionId: v.id("sessions"),
    content: v.string(),
    senderId: v.string(),
    senderName: v.string(),
    senderType: v.union(v.literal("user"), v.literal("ai")),
    senderAvatar: v.optional(v.string()),
    isStreaming: v.optional(v.boolean()),
    threadId: v.optional(v.string()),
    parentMessageId: v.optional(v.id("messages")),
    replyCount: v.number(),
  })
    .index("by_session", ["sessionId"])
    .index("by_thread", ["threadId"])
    .index("by_parent", ["parentMessageId"]),

  // Bookmarks table
  bookmarks: defineTable({
    messageId: v.id("messages"),
    sessionId: v.id("sessions"),
    userId: v.string(),
    collectionId: v.optional(v.id("bookmark_collections")),
    note: v.optional(v.string()),
    tags: v.array(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_message", ["messageId"])
    .index("by_collection", ["collectionId"])
    .index("by_session", ["sessionId"]),

  // Bookmark Collections table
  bookmark_collections: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    color: v.string(),
    icon: v.string(),
    userId: v.string(),
  }).index("by_user", ["userId"]),

  // Reactions table
  reactions: defineTable({
    messageId: v.id("messages"),
    userId: v.string(),
    emoji: v.string(),
    label: v.string(),
  })
    .index("by_message", ["messageId"])
    .index("by_user", ["userId"])
    .index("by_message_and_user", ["messageId", "userId"]),

  // Threads table
  threads: defineTable({
    parentMessageId: v.id("messages"),
    sessionId: v.id("sessions"),
    participants: v.array(v.string()),
    lastReplyAt: v.number(),
  })
    .index("by_parent", ["parentMessageId"])
    .index("by_session", ["sessionId"]),

  // Search History table
  search_history: defineTable({
    userId: v.string(),
    query: v.string(),
    timestamp: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_timestamp", ["timestamp"]),

  // Comparisons table
  comparisons: defineTable({
    name: v.optional(v.string()),
    sessionIds: v.array(v.id("sessions")),
    userId: v.string(),
  }).index("by_user", ["userId"]),
})
\`\`\`

### Convex Queries

Queries are reactive and automatically update the UI:

\`\`\`typescript
// convex/sessions.ts
import { query } from "./_generated/server"
import { v } from "convex/values"

// Get all sessions for a user
export const getUserSessions = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sessions")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect()
  },
})

// Get session messages
export const getSessionMessages = query({
  args: { sessionId: v.id("sessions") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .order("asc")
      .collect()
  },
})

// Get message with reactions
export const getMessageWithReactions = query({
  args: { messageId: v.id("messages") },
  handler: async (ctx, args) => {
    const message = await ctx.db.get(args.messageId)
    const reactions = await ctx.db
      .query("reactions")
      .withIndex("by_message", (q) => q.eq("messageId", args.messageId))
      .collect()

    // Group reactions by emoji
    const groupedReactions = reactions.reduce((acc, reaction) => {
      if (!acc[reaction.emoji]) {
        acc[reaction.emoji] = {
          emoji: reaction.emoji,
          label: reaction.label,
          count: 0,
          users: [],
        }
      }
      acc[reaction.emoji].count++
      acc[reaction.emoji].users.push(reaction.userId)
      return acc
    }, {} as Record<string, any>)

    return {
      ...message,
      reactions: Object.values(groupedReactions),
    }
  },
})
\`\`\`

### Convex Mutations

Mutations modify data and trigger reactive updates:

\`\`\`typescript
// convex/sessions.ts
import { mutation } from "./_generated/server"
import { v } from "convex/values"

// Create new session
export const createSession = mutation({
  args: {
    title: v.string(),
    mode: v.union(
      v.literal("compare"),
      v.literal("debate"),
      v.literal("auto-debate")
    ),
    selectedAgents: v.array(v.string()),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const sessionId = await ctx.db.insert("sessions", {
      title: args.title,
      description: "",
      status: "active",
      mode: args.mode,
      selectedAgents: args.selectedAgents,
      userId: args.userId,
      messageCount: 0,
      agentCount: args.selectedAgents.length,
      artifactCount: 0,
      lastActivity: Date.now(),
      participants: [],
    })
    return sessionId
  },
})

// Add message to session
export const addMessage = mutation({
  args: {
    sessionId: v.id("sessions"),
    content: v.string(),
    senderId: v.string(),
    senderName: v.string(),
    senderType: v.union(v.literal("user"), v.literal("ai")),
  },
  handler: async (ctx, args) => {
    const messageId = await ctx.db.insert("messages", {
      sessionId: args.sessionId,
      content: args.content,
      senderId: args.senderId,
      senderName: args.senderName,
      senderType: args.senderType,
      replyCount: 0,
    })

    // Update session metadata
    const session = await ctx.db.get(args.sessionId)
    if (session) {
      await ctx.db.patch(args.sessionId, {
        messageCount: session.messageCount + 1,
        lastActivity: Date.now(),
      })
    }

    return messageId
  },
})

// Add reaction to message
export const addReaction = mutation({
  args: {
    messageId: v.id("messages"),
    userId: v.string(),
    emoji: v.string(),
    label: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user already reacted with this emoji
    const existing = await ctx.db
      .query("reactions")
      .withIndex("by_message_and_user", (q) =>
        q.eq("messageId", args.messageId).eq("userId", args.userId)
      )
      .filter((q) => q.eq(q.field("emoji"), args.emoji))
      .first()

    if (existing) {
      // Remove reaction if already exists (toggle)
      await ctx.db.delete(existing._id)
      return null
    } else {
      // Add new reaction
      const reactionId = await ctx.db.insert("reactions", {
        messageId: args.messageId,
        userId: args.userId,
        emoji: args.emoji,
        label: args.label,
      })
      return reactionId
    }
  },
})
\`\`\`

### React Integration

Using Convex in React components:

\`\`\`typescript
// components/chat/ChatThread.tsx
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"

export function ChatThread({ sessionId }: { sessionId: string }) {
  // Reactive query - auto-updates when messages change
  const messages = useQuery(api.sessions.getSessionMessages, { sessionId })
  
  // Mutation for adding messages
  const addMessage = useMutation(api.sessions.addMessage)
  
  const handleSendMessage = async (content: string) => {
    await addMessage({
      sessionId,
      content,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderType: "user",
    })
  }
  
  if (messages === undefined) {
    return <div>Loading messages...</div>
  }
  
  return (
    <div>
      {messages.map((message) => (
        <MessageCard key={message._id} message={message} />
      ))}
    </div>
  )
}
\`\`\`

### Real-time Collaboration

Convex enables real-time collaboration automatically:

\`\`\`typescript
// Multiple users see updates instantly
const messages = useQuery(api.sessions.getSessionMessages, { sessionId })

// When User A adds a message, User B's UI updates automatically
// No polling, no manual refresh, no WebSocket management needed
\`\`\`

---

## Core Data Models

### ChatMessage

The fundamental unit of conversation data:

\`\`\`typescript
interface ChatMessage {
  id: string                    // Unique message identifier
  content: string               // Message text content
  sender: {
    id: string                  // Sender identifier
    name: string                // Display name
    type: "user" | "ai"        // Sender type
    avatar?: string             // Optional avatar URL
  }
  timestamp: Date               // Message creation time
  isStreaming?: boolean         // Real-time streaming indicator
  reactions?: {
    likes: number
    dislikes: number
  }
  threadId?: string             // Thread association
  parentMessageId?: string      // Reply parent reference
  replyCount?: number           // Number of replies
  hasReplies?: boolean          // Reply indicator
  bookmarked?: boolean          // Bookmark status
}
\`\`\`

### ChatSession

Session metadata for organizing conversations:

\`\`\`typescript
// From lib/mock-data/sessions.ts
interface SessionMetadata {
  messageCount: number
  agentCount: number
  artifactCount: number
  lastActivity: number
  participants: string[]
}

interface SessionConfig {
  mode: "compare" | "debate" | "auto-debate"
  selectedAgents: string[]
  debateRounds?: number
}

interface Session {
  id: string
  title: string
  description: string
  status: "active" | "archived"
  createdAt: number
  updatedAt: number
  metadata: SessionMetadata
  config: SessionConfig
}
\`\`\`

**Storage Location**: Currently uses mock data from `lib/mock-data/sessions.ts`. Sessions are NOT persisted to localStorage in the current implementation.

**Future Enhancement**: Sessions should be persisted to localStorage with a dedicated `SessionManager` class.

---

## Feature Modules

### 1. Bookmarks (`lib/chat/bookmarks.ts`)

**Purpose**: Save important messages for later reference with notes and tags.

#### Data Models

\`\`\`typescript
interface Bookmark {
  id: string
  messageId: string
  sessionId: string
  collectionId?: string
  note?: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

interface BookmarkCollection {
  id: string
  name: string
  description?: string
  color: string
  icon: string
  bookmarkIds: string[]
  createdAt: Date
  updatedAt: Date
}
\`\`\`

#### Key Operations

- `createBookmark(messageId, sessionId, options)` - Create new bookmark
- `deleteBookmark(bookmarkId)` - Remove bookmark
- `updateBookmark(bookmarkId, updates)` - Modify bookmark
- `getBookmarksBySession(sessionId)` - Filter by session
- `getBookmarksByCollection(collectionId)` - Filter by collection
- `searchBookmarks(query)` - Full-text search in notes/tags
- `getStats()` - Analytics and statistics

#### Default Collections

Four pre-configured collections are created on first use:
- **Important** (⭐) - Critical insights and key points
- **To Review** (📋) - Messages to revisit later
- **Research** (🔬) - Research findings and references
- **Ideas** (💡) - Creative ideas and inspiration

#### Storage Pattern

\`\`\`typescript
// Bookmarks: Single array in localStorage
localStorage.setItem('anydebate_bookmarks', JSON.stringify([
  { id: 'bookmark-1', messageId: 'msg-1', ... },
  { id: 'bookmark-2', messageId: 'msg-2', ... }
]))

// Collections: Single array in localStorage
localStorage.setItem('anydebate_bookmark_collections', JSON.stringify([
  { id: 'collection-1', name: 'Important', ... },
  { id: 'collection-2', name: 'Research', ... }
]))
\`\`\`

### 2. Reactions (`lib/chat/reactions.ts`)

**Purpose**: Express sentiment and feedback on individual messages.

#### Data Models

\`\`\`typescript
interface Reaction {
  id: string
  emoji: string
  label: string
  count: number
  users: string[]
  timestamp: Date
}

interface MessageReactions {
  messageId: string
  reactions: Reaction[]
  totalCount: number
}
\`\`\`

#### Available Reactions

**Default Reactions**:
- 👍 Like
- ❤️ Love
- 😂 Funny
- 🤔 Thinking
- 🎯 On Point
- 💡 Insightful
- 🔥 Fire
- ✨ Brilliant

**Custom Reactions**:
- 🧠 Smart
- 💯 Perfect
- 🚀 Amazing
- ⚡ Fast
- 🎨 Creative
- 🏆 Winner
- 👀 Interesting
- 🤝 Agree
- ❌ Disagree
- ⚠️ Warning

#### Key Operations

- `addReaction(messageId, emoji, userId)` - Add or increment reaction
- `removeReaction(messageId, emoji, userId)` - Remove user's reaction
- `getMessageReactions(messageId)` - Get all reactions for message
- `hasUserReacted(messageId, emoji, userId)` - Check user reaction status
- `getAnalytics(sessionId?)` - Reaction analytics and trends

#### Storage Pattern

\`\`\`typescript
// One localStorage key per message
localStorage.setItem('anydebate_reactions_msg-1', JSON.stringify({
  messageId: 'msg-1',
  reactions: [
    { emoji: '👍', count: 5, users: ['user1', 'user2', ...] },
    { emoji: '❤️', count: 3, users: ['user3', 'user4', ...] }
  ],
  totalCount: 8
}))
\`\`\`

### 3. Threading (`lib/chat/threading.ts`)

**Purpose**: Organize conversations into hierarchical reply threads.

#### Data Models

\`\`\`typescript
interface MessageThread {
  id: string
  parentMessageId: string
  replies: ChatMessage[]
  participants: string[]
  createdAt: Date
  lastReplyAt: Date
}

interface ThreadedMessage extends ChatMessage {
  threadId?: string
  parentMessageId?: string
  replyCount?: number
  hasReplies?: boolean
}
\`\`\`

#### Key Features

- **Maximum Thread Depth**: 3 levels to prevent excessive nesting
- **Participant Tracking**: Automatically tracks all thread participants
- **Hierarchical Navigation**: Full thread hierarchy traversal
- **Reply Validation**: Checks if message can receive replies based on depth

#### Key Operations

- `createThread(parentMessage)` - Initialize new thread
- `addReply(thread, reply)` - Add reply to thread
- `getThreadMessages(messages, threadId)` - Filter messages by thread
- `getThreadDepth(message, allMessages)` - Calculate nesting level
- `canReply(message, allMessages)` - Validate reply capability
- `getThreadHierarchy(parentMessageId, allMessages)` - Get full thread tree

#### Storage Pattern

\`\`\`typescript
localStorage.setItem('anydebate_threads', JSON.stringify([
  {
    id: 'thread-msg-1',
    parentMessageId: 'msg-1',
    replies: [
      { id: 'msg-2', parentMessageId: 'msg-1', ... },
      { id: 'msg-3', parentMessageId: 'msg-1', ... }
    ],
    participants: ['user1', 'ai-agent-1'],
    createdAt: '2025-01-15T10:00:00Z',
    lastReplyAt: '2025-01-15T10:05:00Z'
  }
]))
\`\`\`

### 4. Search (`lib/chat/search.ts`)

**Purpose**: Full-text search across messages with filtering and history.

#### Data Models

\`\`\`typescript
interface SearchQuery {
  text: string
  sender?: string
  dateFrom?: Date
  dateTo?: Date
  messageType?: "user" | "ai"
}

interface SearchResult {
  messageId: string
  message: ChatMessage
  matchedText: string
  matchIndex: number
  context: string
}
\`\`\`

#### Key Features

- **Full-text Search**: Case-insensitive content matching
- **Multi-filter Support**: Filter by sender, date range, message type
- **Context Extraction**: Shows surrounding text around matches
- **Search History**: Stores last 10 searches
- **Auto-suggestions**: Suggests words from message content

#### Key Operations

- `search(messages, query)` - Execute search with filters
- `getSearchHistory()` - Retrieve recent searches
- `addToHistory(query)` - Save search query
- `clearHistory()` - Remove all search history
- `getSuggestions(query, messages)` - Get autocomplete suggestions

#### Storage Pattern

\`\`\`typescript
localStorage.setItem('anydebate_search_history', JSON.stringify([
  'AI ethics',
  'climate change',
  'machine learning',
  ...
]))
\`\`\`

### 5. Comparison (`lib/chat/comparison.ts`)

**Purpose**: Compare multiple chat sessions side-by-side with analytics.

#### Data Models

\`\`\`typescript
interface SessionComparison {
  id: string
  sessionIds: string[]
  createdAt: Date
  name?: string
}

interface ComparisonMetrics {
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

interface ComparisonInsight {
  type: "difference" | "similarity" | "trend"
  title: string
  description: string
  severity: "high" | "medium" | "low"
  metrics?: Record<string, number>
}
\`\`\`

#### Key Features

- **Multi-session Comparison**: Compare 2+ sessions simultaneously
- **Automated Metrics**: Calculate engagement, sentiment, response times
- **Insight Generation**: AI-powered insights about differences/similarities
- **Topic Extraction**: Identify common discussion themes
- **Sentiment Analysis**: Basic positive/negative/neutral classification

#### Key Operations

- `createComparison(sessionIds, name?)` - Create comparison
- `calculateMetrics(sessionId, messages)` - Compute session metrics
- `generateInsights(metrics)` - Generate comparison insights
- `getAllComparisons()` - List all saved comparisons

#### Storage Pattern

\`\`\`typescript
localStorage.setItem('anydebate_comparisons', JSON.stringify([
  {
    id: 'comparison-1',
    sessionIds: ['session-1', 'session-2'],
    name: 'GPT-4 vs Claude Comparison',
    createdAt: '2025-01-15T10:00:00Z'
  }
]))
\`\`\`

---

## Migration Strategy

### Phase 1: Convex Setup (Week 1)

**Tasks**:
1. Install Convex: `npm install convex`
2. Initialize Convex: `npx convex dev`
3. Create schema in `convex/schema.ts`
4. Set up authentication with Convex Auth
5. Deploy Convex backend: `npx convex deploy`

**Deliverables**:
- Convex project configured
- Schema defined and deployed
- Authentication working

### Phase 2: Parallel Implementation (Week 2-3)

**Strategy**: Run localStorage and Convex side-by-side

\`\`\`typescript
// lib/chat/storage-adapter.ts
export interface StorageAdapter {
  saveMessage(sessionId: string, message: ChatMessage): Promise<void>
  getMessages(sessionId: string): Promise<ChatMessage[]>
  // ... other methods
}

// localStorage implementation (current)
export class LocalStorageAdapter implements StorageAdapter {
  async saveMessage(sessionId: string, message: ChatMessage) {
    // Current localStorage logic
  }
}

// Convex implementation (new)
export class ConvexAdapter implements StorageAdapter {
  constructor(private convex: ConvexReactClient) {}
  
  async saveMessage(sessionId: string, message: ChatMessage) {
    await this.convex.mutation(api.sessions.addMessage, {
      sessionId,
      content: message.content,
      senderId: message.sender.id,
      senderName: message.sender.name,
      senderType: message.sender.type,
    })
  }
}

// Feature flag to switch between adapters
const USE_CONVEX = process.env.NEXT_PUBLIC_USE_CONVEX === "true"
export const storage: StorageAdapter = USE_CONVEX
  ? new ConvexAdapter(convexClient)
  : new LocalStorageAdapter()
\`\`\`

**Tasks**:
1. Create storage adapter interface
2. Implement Convex adapter
3. Add feature flag for gradual rollout
4. Test both implementations in parallel

### Phase 3: Data Migration (Week 4)

**Migration Script**:

\`\`\`typescript
// scripts/migrate-to-convex.ts
import { ConvexHttpClient } from "convex/browser"
import { api } from "@/convex/_generated/api"

async function migrateUserData(userId: string) {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
  
  // 1. Migrate bookmarks
  const bookmarks = JSON.parse(
    localStorage.getItem("anydebate_bookmarks") || "[]"
  )
  for (const bookmark of bookmarks) {
    await convex.mutation(api.bookmarks.create, {
      ...bookmark,
      userId,
    })
  }
  
  // 2. Migrate collections
  const collections = JSON.parse(
    localStorage.getItem("anydebate_bookmark_collections") || "[]"
  )
  for (const collection of collections) {
    await convex.mutation(api.bookmarks.createCollection, {
      ...collection,
      userId,
    })
  }
  
  // 3. Migrate reactions
  Object.keys(localStorage).forEach(async (key) => {
    if (key.startsWith("anydebate_reactions_")) {
      const messageId = key.replace("anydebate_reactions_", "")
      const reactions = JSON.parse(localStorage.getItem(key)!)
      
      for (const reaction of reactions.reactions) {
        for (const user of reaction.users) {
          await convex.mutation(api.reactions.add, {
            messageId,
            userId: user,
            emoji: reaction.emoji,
            label: reaction.label,
          })
        }
      }
    }
  })
  
  // 4. Clear localStorage after successful migration
  localStorage.removeItem("anydebate_bookmarks")
  localStorage.removeItem("anydebate_bookmark_collections")
  // ... clear other keys
  
  console.log("Migration complete!")
}
\`\`\`

**Tasks**:
1. Create migration script
2. Add migration UI in settings
3. Test migration with sample data
4. Add rollback capability
5. Monitor migration success rate

### Phase 4: Cutover (Week 5)

**Tasks**:
1. Enable Convex for all users
2. Remove localStorage code
3. Update documentation
4. Monitor performance and errors
5. Provide user support for migration issues

### Rollback Plan

If issues arise during migration:

\`\`\`typescript
// Emergency rollback to localStorage
if (CONVEX_ERROR_RATE > 5%) {
  process.env.NEXT_PUBLIC_USE_CONVEX = "false"
  // Automatically fall back to localStorage
}
\`\`\`

---

## Best Practices

### Current (localStorage)

Always check for browser environment:

\`\`\`typescript
if (typeof window === "undefined") return []
\`\`\`

This prevents errors during server-side rendering.

### Future (Convex)

#### 1. Use Reactive Queries

\`\`\`typescript
// Good: Reactive query
const messages = useQuery(api.sessions.getSessionMessages, { sessionId })

// Bad: Manual fetching
const [messages, setMessages] = useState([])
useEffect(() => {
  fetch('/api/messages').then(/* ... */)
}, [])
\`\`\`

#### 2. Optimistic Updates

\`\`\`typescript
const addReaction = useMutation(api.reactions.add)

// Optimistic UI update
const handleReaction = async (emoji: string) => {
  // Update UI immediately
  setLocalReactions((prev) => [...prev, { emoji, userId }])
  
  try {
    await addReaction({ messageId, userId, emoji, label })
  } catch (error) {
    // Rollback on error
    setLocalReactions((prev) => prev.filter((r) => r.emoji !== emoji))
  }
}
\`\`\`

#### 3. Pagination for Large Datasets

\`\`\`typescript
export const getSessionMessages = query({
  args: {
    sessionId: v.id("sessions"),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .order("asc")
      .paginate(args.paginationOpts)
  },
})
\`\`\`

#### 4. Error Handling

\`\`\`typescript
const addMessage = useMutation(api.sessions.addMessage)

try {
  await addMessage({ sessionId, content, ... })
} catch (error) {
  if (error.message.includes("rate limit")) {
    toast.error("Too many messages. Please slow down.")
  } else {
    toast.error("Failed to send message. Please try again.")
  }
}
\`\`\`

---

## Implementation Roadmap

### Immediate (Current Sprint)

- [x] Document current localStorage implementation
- [x] Research Convex architecture
- [ ] Set up Convex project
- [ ] Define Convex schema
- [ ] Implement authentication with Convex

### Short-term (Next 2 Sprints)

- [ ] Create storage adapter interface
- [ ] Implement Convex adapter
- [ ] Add feature flag for gradual rollout
- [ ] Migrate sessions and messages
- [ ] Migrate bookmarks and collections
- [ ] Migrate reactions and threads
- [ ] Create migration UI
- [ ] Test migration with sample data

### Medium-term (Next Quarter)

- [ ] Enable Convex for all users
- [ ] Remove localStorage code
- [ ] Implement real-time collaboration features
- [ ] Add presence indicators (who's online)
- [ ] Implement typing indicators
- [ ] Add collaborative editing for artifacts
- [ ] Optimize query performance
- [ ] Add analytics and monitoring

### Long-term (Future)

- [ ] Multi-device sync
- [ ] Offline-first architecture with sync
- [ ] Advanced search with full-text indexing
- [ ] AI-powered conversation insights
- [ ] Export to multiple formats
- [ ] Integration with external tools (Slack, Discord, etc.)

---

## Conclusion

AnyDebateAI's chat history persistence is transitioning from a temporary localStorage solution to a production-ready Convex backend. Convex provides real-time sync, type safety, scalability, and an excellent developer experience—making it the ideal choice for a collaborative AI debate platform.

The migration strategy ensures a smooth transition with minimal user disruption, while the storage adapter pattern allows for gradual rollout and easy rollback if needed. Once complete, users will benefit from seamless cross-device sync, real-time collaboration, and a more robust, scalable persistence layer.

**Next Steps**:
1. Set up Convex project and schema
2. Implement storage adapter pattern
3. Begin parallel implementation
4. Create migration tooling
5. Execute phased rollout

For questions or contributions, refer to the main project documentation or contact the development team.

# Phase 4: Convex Database Integration Plan

**Status**: 🔴 Not Started (0%)  
**Priority**: P0 - Critical Foundation  
**Dependencies**: None (Phases 1-3 complete)  
**Estimated Timeline**: 2-3 weeks  
**Last Updated**: September 30, 2025

---

## 📋 Overview

This phase implements Convex as the real-time database layer for AnyDebate AI, enabling persistent storage, real-time synchronization, and offline support. All implementations follow mobile-first best practices with optimistic updates, efficient data fetching, and touch-optimized interactions.

### Key Objectives

- Set up Convex database with production-ready schema
- Implement real-time data synchronization across devices
- Migrate from localStorage to Convex with zero data loss
- Enable offline support with automatic sync when online
- Optimize for mobile performance with efficient queries
- Implement file storage for artifact attachments

### Success Criteria

- [ ] Convex database configured and deployed
- [ ] All data models defined with TypeScript schemas
- [ ] Real-time subscriptions working across all features
- [ ] Offline support with automatic sync
- [ ] Migration from localStorage completed successfully
- [ ] Mobile performance optimized (queries < 100ms)
- [ ] File uploads working for artifacts
- [ ] Zero data loss during migration

---

## 🏗️ Implementation Phases

### Phase 1: Convex Setup & Configuration

**Timeline**: 3-4 days  
**Status**: ⬜ Not Started

#### Task 1.1: Initialize Convex Project

**Requirements**:
- Install Convex CLI and dependencies
- Initialize Convex project in existing codebase
- Configure environment variables for development and production
- Set up Convex dashboard access

**Implementation**:

\`\`\`bash
# Install Convex
npm install convex

# Initialize Convex
npx convex dev

# Configure environment variables
CONVEX_DEPLOYMENT=<deployment-url>
NEXT_PUBLIC_CONVEX_URL=<public-url>
\`\`\`

**Files to Create**:
- `convex/_generated/api.d.ts` - Auto-generated API types
- `convex/_generated/dataModel.d.ts` - Auto-generated data model types
- `convex.json` - Convex configuration

**Mobile-First Considerations**:
- Configure optimistic updates for instant UI feedback
- Set up efficient query patterns for mobile bandwidth
- Enable offline mode with automatic sync

**Success Criteria**:
- [ ] Convex CLI installed and working
- [ ] Development environment connected to Convex
- [ ] Environment variables configured
- [ ] Dashboard access verified

---

#### Task 1.2: Define Database Schema

**Requirements**:
- Design schema for all data models (users, sessions, messages, agents, artifacts)
- Implement TypeScript schemas with validation
- Set up indexes for efficient queries
- Plan relationships between models

**Schema Design**:

\`\`\`typescript
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  // User sessions (debate sessions)
  sessions: defineTable({
    userId: v.optional(v.id("users")), // Optional until Phase 5
    title: v.string(),
    description: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
    status: v.union(v.literal("active"), v.literal("archived"), v.literal("deleted")),
    metadata: v.object({
      messageCount: v.number(),
      agentCount: v.number(),
      artifactCount: v.number(),
      lastActivity: v.number(),
    }),
  })
    .index("by_user", ["userId"])
    .index("by_created", ["createdAt"])
    .index("by_updated", ["updatedAt"])
    .index("by_status", ["status"]),

  // Chat messages
  messages: defineTable({
    sessionId: v.id("sessions"),
    agentId: v.optional(v.id("agents")),
    role: v.union(v.literal("user"), v.literal("assistant"), v.literal("system")),
    content: v.string(),
    timestamp: v.number(),
    metadata: v.optional(v.object({
      model: v.optional(v.string()),
      tokens: v.optional(v.number()),
      latency: v.optional(v.number()),
      parentMessageId: v.optional(v.id("messages")), // For threading
      reactions: v.optional(v.array(v.object({
        emoji: v.string(),
        count: v.number(),
      }))),
      bookmarked: v.optional(v.boolean()),
      bookmarkNote: v.optional(v.string()),
    })),
  })
    .index("by_session", ["sessionId"])
    .index("by_timestamp", ["timestamp"])
    .index("by_agent", ["agentId"]),

  // Agent configurations
  agents: defineTable({
    userId: v.optional(v.id("users")), // Optional until Phase 5
    name: v.string(),
    role: v.string(),
    persona: v.string(),
    framework: v.optional(v.string()),
    systemPrompt: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
    isTemplate: v.boolean(), // Pre-built templates vs custom
    metadata: v.object({
      category: v.string(),
      expertise: v.array(v.string()),
      usageCount: v.number(),
      lastUsed: v.optional(v.number()),
    }),
  })
    .index("by_user", ["userId"])
    .index("by_template", ["isTemplate"])
    .index("by_category", ["metadata.category"]),

  // Artifacts (documents, tables, checklists, charts)
  artifacts: defineTable({
    sessionId: v.id("sessions"),
    messageId: v.optional(v.id("messages")),
    type: v.union(
      v.literal("document"),
      v.literal("table"),
      v.literal("checklist"),
      v.literal("chart")
    ),
    title: v.string(),
    content: v.any(), // JSON content specific to artifact type
    createdAt: v.number(),
    updatedAt: v.number(),
    version: v.number(),
    metadata: v.optional(v.object({
      fileUrl: v.optional(v.string()), // For file uploads
      exportedAt: v.optional(v.number()),
      exportFormat: v.optional(v.string()),
    })),
  })
    .index("by_session", ["sessionId"])
    .index("by_type", ["type"])
    .index("by_message", ["messageId"]),

  // Agent templates (pre-built teams and scenarios)
  templates: defineTable({
    name: v.string(),
    description: v.string(),
    category: v.string(),
    agents: v.array(v.object({
      name: v.string(),
      role: v.string(),
      persona: v.string(),
      framework: v.optional(v.string()),
    })),
    scenario: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
    isPublic: v.boolean(),
    metadata: v.object({
      usageCount: v.number(),
      rating: v.optional(v.number()),
      tags: v.array(v.string()),
    }),
  })
    .index("by_category", ["category"])
    .index("by_public", ["isPublic"]),

  // Export history
  exports: defineTable({
    sessionId: v.id("sessions"),
    format: v.union(v.literal("pdf"), v.literal("markdown"), v.literal("json")),
    fileUrl: v.string(),
    createdAt: v.number(),
    metadata: v.object({
      fileSize: v.number(),
      includeArtifacts: v.boolean(),
    }),
  })
    .index("by_session", ["sessionId"])
    .index("by_created", ["createdAt"]),

  // Analytics (local tracking)
  analytics: defineTable({
    sessionId: v.optional(v.id("sessions")),
    eventType: v.string(),
    eventData: v.any(),
    timestamp: v.number(),
    metadata: v.optional(v.object({
      deviceType: v.string(),
      viewport: v.object({
        width: v.number(),
        height: v.number(),
      }),
    })),
  })
    .index("by_session", ["sessionId"])
    .index("by_event", ["eventType"])
    .index("by_timestamp", ["timestamp"]),
})
\`\`\`

**Files to Create**:
- `convex/schema.ts` - Complete database schema

**Mobile-First Considerations**:
- Efficient indexes for fast mobile queries
- Minimal data transfer with selective field queries
- Optimized for real-time updates on mobile networks

**Success Criteria**:
- [ ] All data models defined with TypeScript types
- [ ] Indexes created for efficient queries
- [ ] Schema validated and deployed to Convex
- [ ] Relationships between models working

---

#### Task 1.3: Set Up Convex Provider

**Requirements**:
- Integrate ConvexProvider into Next.js app
- Configure ConvexReactClient with optimizations
- Set up authentication hooks (prepare for Phase 5)
- Implement error boundaries for Convex errors

**Implementation**:

\`\`\`typescript
// app/providers.tsx
"use client"

import { ConvexProvider, ConvexReactClient } from "convex/react"
import { ReactNode } from "react"

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!, {
  // Mobile-first optimizations
  unsavedChangesWarning: false, // Handle manually for better UX
  verbose: process.env.NODE_ENV === "development",
})

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>
}
\`\`\`

\`\`\`typescript
// app/layout.tsx
import { ConvexClientProvider } from "./providers"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ConvexClientProvider>
          <DeviceProvider>
            {children}
          </DeviceProvider>
        </ConvexClientProvider>
      </body>
    </html>
  )
}
\`\`\`

**Files to Create/Modify**:
- `app/providers.tsx` - Convex provider setup
- `app/layout.tsx` - Add ConvexClientProvider

**Mobile-First Considerations**:
- Configure for efficient mobile network usage
- Set up optimistic updates for instant feedback
- Handle offline scenarios gracefully

**Success Criteria**:
- [ ] ConvexProvider integrated into app
- [ ] Client configured with optimizations
- [ ] Error boundaries working
- [ ] Real-time updates functional

---

### Phase 2: Core Queries & Mutations

**Timeline**: 4-5 days  
**Status**: ⬜ Not Started

#### Task 2.1: Session Management Functions

**Requirements**:
- Create queries for fetching sessions
- Implement mutations for creating/updating/deleting sessions
- Add real-time subscriptions for session updates
- Implement session search and filtering

**Implementation**:

\`\`\`typescript
// convex/sessions.ts
import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

// Query: Get all sessions (with pagination)
export const getSessions = query({
  args: {
    limit: v.optional(v.number()),
    cursor: v.optional(v.string()),
    status: v.optional(v.union(v.literal("active"), v.literal("archived"))),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 20
    
    let query = ctx.db.query("sessions")
    
    if (args.status) {
      query = query.withIndex("by_status", (q) => q.eq("status", args.status))
    } else {
      query = query.withIndex("by_updated")
    }
    
    const sessions = await query
      .order("desc")
      .take(limit)
    
    return sessions
  },
})

// Query: Get single session by ID
export const getSession = query({
  args: { sessionId: v.id("sessions") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.sessionId)
  },
})

// Mutation: Create new session
export const createSession = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now()
    
    const sessionId = await ctx.db.insert("sessions", {
      title: args.title,
      description: args.description,
      createdAt: now,
      updatedAt: now,
      status: "active",
      metadata: {
        messageCount: 0,
        agentCount: 0,
        artifactCount: 0,
        lastActivity: now,
      },
    })
    
    return sessionId
  },
})

// Mutation: Update session
export const updateSession = mutation({
  args: {
    sessionId: v.id("sessions"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    status: v.optional(v.union(v.literal("active"), v.literal("archived"), v.literal("deleted"))),
  },
  handler: async (ctx, args) => {
    const { sessionId, ...updates } = args
    
    await ctx.db.patch(sessionId, {
      ...updates,
      updatedAt: Date.now(),
    })
    
    return sessionId
  },
})

// Mutation: Delete session (soft delete)
export const deleteSession = mutation({
  args: { sessionId: v.id("sessions") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.sessionId, {
      status: "deleted",
      updatedAt: Date.now(),
    })
  },
})

// Query: Search sessions
export const searchSessions = query({
  args: {
    searchTerm: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 20
    const searchLower = args.searchTerm.toLowerCase()
    
    const sessions = await ctx.db
      .query("sessions")
      .withIndex("by_updated")
      .order("desc")
      .take(100) // Search in recent 100 sessions
    
    return sessions
      .filter(
        (s) =>
          s.title.toLowerCase().includes(searchLower) ||
          s.description?.toLowerCase().includes(searchLower)
      )
      .slice(0, limit)
  },
})
\`\`\`

**Files to Create**:
- `convex/sessions.ts` - Session queries and mutations

**Mobile-First Considerations**:
- Pagination for efficient mobile data loading
- Optimistic updates for instant UI feedback
- Efficient search with client-side filtering

**Success Criteria**:
- [ ] All session queries working
- [ ] All session mutations working
- [ ] Real-time updates functional
- [ ] Search and filtering working

---

#### Task 2.2: Message Management Functions

**Requirements**:
- Create queries for fetching messages by session
- Implement mutations for creating/updating messages
- Add real-time subscriptions for new messages
- Implement message threading and reactions

**Implementation**:

\`\`\`typescript
// convex/messages.ts
import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

// Query: Get messages for a session
export const getMessages = query({
  args: {
    sessionId: v.id("sessions"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 100
    
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .order("asc")
      .take(limit)
    
    return messages
  },
})

// Mutation: Create message (IMMEDIATE SAVE)
export const createMessage = mutation({
  args: {
    sessionId: v.id("sessions"),
    agentId: v.optional(v.id("agents")),
    role: v.union(v.literal("user"), v.literal("assistant"), v.literal("system")),
    content: v.string(),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const messageId = await ctx.db.insert("messages", {
      ...args,
      timestamp: Date.now(),
    })
    
    // Update session metadata
    const session = await ctx.db.get(args.sessionId)
    if (session) {
      await ctx.db.patch(args.sessionId, {
        updatedAt: Date.now(),
        metadata: {
          ...session.metadata,
          messageCount: session.metadata.messageCount + 1,
          lastActivity: Date.now(),
        },
      })
    }
    
    return messageId
  },
})

// Mutation: Update message (for reactions, bookmarks, etc.)
export const updateMessage = mutation({
  args: {
    messageId: v.id("messages"),
    metadata: v.any(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.messageId, {
      metadata: args.metadata,
    })
  },
})

// Query: Search messages in session
export const searchMessages = query({
  args: {
    sessionId: v.id("sessions"),
    searchTerm: v.string(),
  },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .collect()
    
    const searchLower = args.searchTerm.toLowerCase()
    return messages.filter((m) => m.content.toLowerCase().includes(searchLower))
  },
})

// Query: Get threaded messages (replies to a message)
export const getThreadedMessages = query({
  args: {
    parentMessageId: v.id("messages"),
  },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .collect()
    
    return messages.filter(
      (m) => m.metadata?.parentMessageId === args.parentMessageId
    )
  },
})
\`\`\`

**Files to Create**:
- `convex/messages.ts` - Message queries and mutations

**Mobile-First Considerations**:
- Efficient message loading with pagination
- Real-time updates for instant message delivery
- Optimistic updates for user messages

**Success Criteria**:
- [ ] Message queries working
- [ ] Message mutations working
- [ ] Real-time message updates functional
- [ ] Threading and reactions working

---

#### Task 2.3: Agent & Artifact Functions

**Requirements**:
- Create queries for fetching agents and artifacts
- Implement mutations for creating/updating agents and artifacts
- Add template management functions
- Implement file upload for artifacts

**Implementation**:

\`\`\`typescript
// convex/agents.ts
import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

// Query: Get all agents
export const getAgents = query({
  args: {
    isTemplate: v.optional(v.boolean()),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("agents")
    
    if (args.isTemplate !== undefined) {
      query = query.withIndex("by_template", (q) => q.eq("isTemplate", args.isTemplate))
    }
    
    const agents = await query.collect()
    
    if (args.category) {
      return agents.filter((a) => a.metadata.category === args.category)
    }
    
    return agents
  },
})

// Mutation: Create agent
export const createAgent = mutation({
  args: {
    name: v.string(),
    role: v.string(),
    persona: v.string(),
    framework: v.optional(v.string()),
    systemPrompt: v.string(),
    isTemplate: v.boolean(),
    metadata: v.any(),
  },
  handler: async (ctx, args) => {
    const now = Date.now()
    
    return await ctx.db.insert("agents", {
      ...args,
      createdAt: now,
      updatedAt: now,
    })
  },
})

// convex/artifacts.ts
import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

// Query: Get artifacts for session
export const getArtifacts = query({
  args: {
    sessionId: v.id("sessions"),
    type: v.optional(v.union(
      v.literal("document"),
      v.literal("table"),
      v.literal("checklist"),
      v.literal("chart")
    )),
  },
  handler: async (ctx, args) => {
    let query = ctx.db
      .query("artifacts")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
    
    const artifacts = await query.collect()
    
    if (args.type) {
      return artifacts.filter((a) => a.type === args.type)
    }
    
    return artifacts
  },
})

// Mutation: Create artifact
export const createArtifact = mutation({
  args: {
    sessionId: v.id("sessions"),
    messageId: v.optional(v.id("messages")),
    type: v.union(
      v.literal("document"),
      v.literal("table"),
      v.literal("checklist"),
      v.literal("chart")
    ),
    title: v.string(),
    content: v.any(),
  },
  handler: async (ctx, args) => {
    const now = Date.now()
    
    const artifactId = await ctx.db.insert("artifacts", {
      ...args,
      createdAt: now,
      updatedAt: now,
      version: 1,
    })
    
    // Update session metadata
    const session = await ctx.db.get(args.sessionId)
    if (session) {
      await ctx.db.patch(args.sessionId, {
        metadata: {
          ...session.metadata,
          artifactCount: session.metadata.artifactCount + 1,
        },
      })
    }
    
    return artifactId
  },
})

// Mutation: Update artifact (with versioning)
export const updateArtifact = mutation({
  args: {
    artifactId: v.id("artifacts"),
    content: v.any(),
  },
  handler: async (ctx, args) => {
    const artifact = await ctx.db.get(args.artifactId)
    if (!artifact) throw new Error("Artifact not found")
    
    await ctx.db.patch(args.artifactId, {
      content: args.content,
      updatedAt: Date.now(),
      version: artifact.version + 1,
    })
  },
})
\`\`\`

**Files to Create**:
- `convex/agents.ts` - Agent queries and mutations
- `convex/artifacts.ts` - Artifact queries and mutations

**Mobile-First Considerations**:
- Efficient artifact loading
- Real-time artifact updates
- File upload optimization for mobile

**Success Criteria**:
- [ ] Agent queries and mutations working
- [ ] Artifact queries and mutations working
- [ ] Template management functional
- [ ] File uploads working

---

### Phase 3: Migration & Offline Support

**Timeline**: 3-4 days  
**Status**: ⬜ Not Started

#### Task 3.1: LocalStorage to Convex Migration

**Requirements**:
- Create migration utility to transfer localStorage data to Convex
- Implement data validation and error handling
- Provide migration progress feedback to users
- Ensure zero data loss during migration

**Implementation**:

\`\`\`typescript
// lib/migration/localStorage-to-convex.ts
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"

export function useLocalStorageMigration() {
  const createSession = useMutation(api.sessions.createSession)
  const createMessage = useMutation(api.messages.createMessage)
  const createAgent = useMutation(api.agents.createAgent)
  const createArtifact = useMutation(api.artifacts.createArtifact)
  
  const migrateData = async () => {
    try {
      // 1. Migrate sessions
      const sessionsData = localStorage.getItem("debate-sessions")
      if (sessionsData) {
        const sessions = JSON.parse(sessionsData)
        
        for (const session of sessions) {
          const sessionId = await createSession({
            title: session.title,
            description: session.description,
          })
          
          // 2. Migrate messages for this session
          if (session.messages) {
            for (const message of session.messages) {
              await createMessage({
                sessionId,
                role: message.role,
                content: message.content,
                agentId: message.agentId,
                metadata: message.metadata,
              })
            }
          }
          
          // 3. Migrate artifacts for this session
          if (session.artifacts) {
            for (const artifact of session.artifacts) {
              await createArtifact({
                sessionId,
                type: artifact.type,
                title: artifact.title,
                content: artifact.content,
                messageId: artifact.messageId,
              })
            }
          }
        }
      }
      
      // 4. Migrate custom agents
      const agentsData = localStorage.getItem("custom-agents")
      if (agentsData) {
        const agents = JSON.parse(agentsData)
        
        for (const agent of agents) {
          await createAgent({
            name: agent.name,
            role: agent.role,
            persona: agent.persona,
            framework: agent.framework,
            systemPrompt: agent.systemPrompt,
            isTemplate: false,
            metadata: agent.metadata,
          })
        }
      }
      
      // 5. Clear localStorage after successful migration
      localStorage.removeItem("debate-sessions")
      localStorage.removeItem("custom-agents")
      localStorage.setItem("migration-completed", "true")
      
      return { success: true }
    } catch (error) {
      console.error("Migration failed:", error)
      return { success: false, error }
    }
  }
  
  return { migrateData }
}
\`\`\`

**Files to Create**:
- `lib/migration/localStorage-to-convex.ts` - Migration utility
- `components/migration/MigrationDialog.tsx` - Migration UI

**Mobile-First Considerations**:
- Show migration progress on mobile
- Handle migration in background
- Provide clear feedback and error handling

**Success Criteria**:
- [ ] Migration utility working
- [ ] Data validation successful
- [ ] Zero data loss verified
- [ ] Migration UI functional

---

#### Task 3.2: Offline Support Implementation

**Requirements**:
- Implement offline detection and status indicator
- Queue mutations when offline
- Sync queued mutations when back online
- Provide clear offline/online status to users

**Implementation**:

\`\`\`typescript
// hooks/use-offline-support.ts
"use client"

import { useEffect, useState } from "react"
import { useConvexAuth } from "convex/react"

export function useOfflineSupport() {
  const [isOnline, setIsOnline] = useState(true)
  const [queuedMutations, setQueuedMutations] = useState<any[]>([])
  const { isAuthenticated } = useConvexAuth()
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])
  
  // Sync queued mutations when back online
  useEffect(() => {
    if (isOnline && queuedMutations.length > 0) {
      syncQueuedMutations()
    }
  }, [isOnline, queuedMutations])
  
  const queueMutation = (mutation: any) => {
    setQueuedMutations((prev) => [...prev, mutation])
    // Also save to localStorage as backup
    localStorage.setItem("queued-mutations", JSON.stringify([...queuedMutations, mutation]))
  }
  
  const syncQueuedMutations = async () => {
    // Execute all queued mutations
    for (const mutation of queuedMutations) {
      try {
        await mutation.execute()
      } catch (error) {
        console.error("Failed to sync mutation:", error)
      }
    }
    
    setQueuedMutations([])
    localStorage.removeItem("queued-mutations")
  }
  
  return {
    isOnline,
    queueMutation,
    queuedMutations,
  }
}
\`\`\`

**Files to Create**:
- `hooks/use-offline-support.ts` - Offline support hook
- `components/ui/offline-indicator.tsx` - Offline status indicator

**Mobile-First Considerations**:
- Clear offline indicator on mobile
- Efficient queue management
- Automatic sync when online

**Success Criteria**:
- [ ] Offline detection working
- [ ] Mutation queuing functional
- [ ] Automatic sync working
- [ ] Status indicator visible

---

### Phase 4: File Storage & Optimization

**Timeline**: 2-3 days  
**Status**: ⬜ Not Started

#### Task 4.1: File Upload for Artifacts

**Requirements**:
- Implement file upload for artifact attachments
- Support images, PDFs, and other file types
- Optimize file storage for mobile bandwidth
- Implement file preview and download

**Implementation**:

\`\`\`typescript
// convex/files.ts
import { mutation } from "./_generated/server"
import { v } from "convex/values"

// Mutation: Generate upload URL
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl()
})

// Mutation: Save file metadata
export const saveFile = mutation({
  args: {
    storageId: v.string(),
    artifactId: v.id("artifacts"),
    fileName: v.string(),
    fileType: v.string(),
    fileSize: v.number(),
  },
  handler: async (ctx, args) => {
    const artifact = await ctx.db.get(args.artifactId)
    if (!artifact) throw new Error("Artifact not found")
    
    await ctx.db.patch(args.artifactId, {
      metadata: {
        ...artifact.metadata,
        fileUrl: args.storageId,
        fileName: args.fileName,
        fileType: args.fileType,
        fileSize: args.fileSize,
      },
    })
  },
})

// Query: Get file URL
export const getFileUrl = mutation({
  args: { storageId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId)
  },
})
\`\`\`

**Files to Create**:
- `convex/files.ts` - File storage functions
- `components/artifacts/FileUpload.tsx` - File upload UI

**Mobile-First Considerations**:
- Optimize file uploads for mobile bandwidth
- Show upload progress on mobile
- Support camera uploads on mobile

**Success Criteria**:
- [ ] File upload working
- [ ] File preview functional
- [ ] File download working
- [ ] Mobile optimization verified

---

#### Task 4.2: Performance Optimization

**Requirements**:
- Implement query caching for frequently accessed data
- Optimize indexes for mobile performance
- Add pagination for large datasets
- Monitor and optimize query performance

**Implementation**:

\`\`\`typescript
// lib/convex/optimizations.ts
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useMemo } from "react"

// Optimized hook with caching
export function useOptimizedSessions() {
  const sessions = useQuery(api.sessions.getSessions, { limit: 20 })
  
  // Memoize to prevent unnecessary re-renders
  return useMemo(() => sessions, [sessions])
}

// Paginated query hook
export function usePaginatedMessages(sessionId: string, limit = 50) {
  const [page, setPage] = useState(0)
  
  const messages = useQuery(api.messages.getMessages, {
    sessionId,
    limit,
    offset: page * limit,
  })
  
  return {
    messages,
    nextPage: () => setPage((p) => p + 1),
    prevPage: () => setPage((p) => Math.max(0, p - 1)),
    page,
  }
}
\`\`\`

**Files to Create**:
- `lib/convex/optimizations.ts` - Performance optimization utilities

**Mobile-First Considerations**:
- Efficient query patterns for mobile
- Pagination for large datasets
- Caching for frequently accessed data

**Success Criteria**:
- [ ] Query caching working
- [ ] Pagination functional
- [ ] Performance metrics improved
- [ ] Mobile performance optimized (< 100ms queries)

---

## ✅ Success Criteria

### Overall Phase Success
- [ ] Convex database fully configured and deployed
- [ ] All data models implemented with TypeScript schemas
- [ ] Real-time subscriptions working across all features
- [ ] Migration from localStorage completed with zero data loss
- [ ] Offline support functional with automatic sync
- [ ] File uploads working for artifacts
- [ ] Mobile performance optimized (queries < 100ms)
- [ ] All queries and mutations tested and working

### Technical Requirements
- [ ] TypeScript types generated and working
- [ ] Indexes optimized for efficient queries
- [ ] Error handling comprehensive
- [ ] Optimistic updates working
- [ ] Real-time updates functional
- [ ] File storage working

### User Experience
- [ ] Seamless migration experience
- [ ] Clear offline/online status
- [ ] Instant UI feedback with optimistic updates
- [ ] Fast query performance on mobile
- [ ] No data loss during migration

---

## 🧪 Testing Checklist

### Functional Testing
- [ ] Create session and verify in database
- [ ] Create message and verify real-time update
- [ ] Create agent and verify persistence
- [ ] Create artifact and verify file upload
- [ ] Update session and verify changes
- [ ] Delete session and verify soft delete
- [ ] Search sessions and verify results
- [ ] Search messages and verify results

### Performance Testing
- [ ] Query performance < 100ms on mobile
- [ ] Real-time updates < 500ms latency
- [ ] File upload < 5s for 1MB file
- [ ] Pagination working smoothly
- [ ] No memory leaks with real-time subscriptions

### Offline Testing
- [ ] Offline detection working
- [ ] Mutations queued when offline
- [ ] Automatic sync when back online
- [ ] No data loss during offline period
- [ ] Clear status indicator visible

### Migration Testing
- [ ] Migration from localStorage successful
- [ ] All data transferred correctly
- [ ] No data loss during migration
- [ ] Migration progress visible
- [ ] Error handling working

---

## 📱 Mobile-First Implementation Verification

### Touch Optimization
- [ ] All interactive elements ≥ 44px touch targets
- [ ] Adequate spacing between elements (≥ 8px)
- [ ] Touch feedback on all interactions
- [ ] No hover-dependent functionality

### Performance
- [ ] Queries optimized for mobile bandwidth
- [ ] Efficient data loading with pagination
- [ ] Optimistic updates for instant feedback
- [ ] Real-time updates without lag

### Offline Support
- [ ] Clear offline indicator on mobile
- [ ] Queued mutations visible to user
- [ ] Automatic sync when online
- [ ] No data loss during offline period

### Responsive Design
- [ ] All components responsive (320px - 1440px)
- [ ] Proper layout on portrait and landscape
- [ ] No horizontal scrolling
- [ ] Content readable on all screen sizes

---

## 📁 File Structure

\`\`\`
convex/
├── _generated/
│   ├── api.d.ts                    # Auto-generated API types
│   └── dataModel.d.ts              # Auto-generated data model types
├── schema.ts                       # Database schema definition
├── sessions.ts                     # Session queries and mutations
├── messages.ts                     # Message queries and mutations
├── agents.ts                       # Agent queries and mutations
├── artifacts.ts                    # Artifact queries and mutations
├── templates.ts                    # Template queries and mutations
├── exports.ts                      # Export queries and mutations
├── analytics.ts                    # Analytics queries and mutations
└── files.ts                        # File storage functions

lib/
├── convex/
│   └── optimizations.ts            # Performance optimization utilities
└── migration/
    └── localStorage-to-convex.ts   # Migration utility

hooks/
└── use-offline-support.ts          # Offline support hook

components/
├── migration/
│   └── MigrationDialog.tsx         # Migration UI
├── artifacts/
│   └── FileUpload.tsx              # File upload UI
└── ui/
    └── offline-indicator.tsx       # Offline status indicator

app/
├── providers.tsx                   # Convex provider setup
└── layout.tsx                      # Root layout with providers
\`\`\`

---

## 📝 Implementation Notes

### Key Decisions

1. **Convex over other databases**: Real-time subscriptions, TypeScript-first, excellent DX
2. **Soft deletes**: Keep deleted data for recovery and analytics
3. **Optimistic updates**: Instant UI feedback for better UX
4. **Offline support**: Queue mutations and sync when online
5. **File storage**: Use Convex storage for simplicity and performance

### Best Practices

1. **Always use TypeScript types** from generated API
2. **Implement optimistic updates** for all mutations
3. **Use indexes** for efficient queries
4. **Paginate large datasets** for mobile performance
5. **Handle errors gracefully** with user-friendly messages
6. **Monitor performance** with Convex dashboard

### Common Pitfalls to Avoid

1. **Don't fetch all data at once** - Use pagination
2. **Don't forget indexes** - Queries will be slow
3. **Don't ignore offline scenarios** - Users expect it to work
4. **Don't skip migration testing** - Data loss is unacceptable
5. **Don't forget mobile optimization** - Most users are on mobile

---

## 🔄 Integration with Existing Features

### Sessions
- Replace localStorage session management with Convex
- Add real-time session updates across devices
- Implement session search and filtering

### Messages
- Save each message immediately to Convex
- Add real-time message updates
- Implement message threading and reactions

### Agents
- Store custom agents in Convex
- Add agent templates and presets
- Implement agent usage analytics

### Artifacts
- Store artifacts in Convex with versioning
- Add file upload for artifact attachments
- Implement artifact search and filtering

### Dashboard
- Fetch dashboard data from Convex
- Add real-time analytics updates
- Implement project organization

---

## 🚀 Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Migration tested with real data
- [ ] Performance benchmarks met
- [ ] Error handling comprehensive
- [ ] Documentation complete

### Deployment
- [ ] Deploy Convex schema
- [ ] Deploy Convex functions
- [ ] Update environment variables
- [ ] Test in production environment
- [ ] Monitor for errors

### Post-Deployment
- [ ] Verify real-time updates working
- [ ] Monitor query performance
- [ ] Check error logs
- [ ] Gather user feedback
- [ ] Optimize based on metrics

---

**Last Updated**: September 30, 2025  
**Status**: Ready for Implementation  
**Next Steps**: Begin Task 1.1 - Initialize Convex Project

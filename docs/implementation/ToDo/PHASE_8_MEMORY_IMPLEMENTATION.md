# Phase 8: AI Memory System Implementation Plan

**Status**: ❌ NOT STARTED (0%)  
**Priority**: HIGH (Game-changer for agent intelligence)  
**Last Updated**: January 12, 2025  
**Estimated Duration**: 20-26 hours

---

## Table of Contents

1. [Overview](#overview)
2. [Official Documentation](#official-documentation)
3. [Prerequisites](#prerequisites)
4. [Implementation Phases](#implementation-phases)
5. [Database Schema](#database-schema)
6. [Testing Strategy](#testing-strategy)
7. [Deployment Checklist](#deployment-checklist)

---

## Overview

### Goals

Implement persistent memory system for AI agents using **@ai-sdk-tools/memory** with **Convex as the storage provider** to enable:
- Agents that remember facts across conversations
- Multi-scope memory: chat, user, workspace, and organization levels
- Manual memory management with UI for admins
- Document upload for automatic memory extraction
- URL scraping (Firecrawl) for knowledge import
- **Save chats as memories** for referencing past conversations
- **Save artifacts as memories** to preserve generated solutions
- **Save debate results as memories** to track decisions and insights
- Structured markdown templates for organizing learned facts
- Real-time memory updates via Convex subscriptions

### Key Features

1. **Working Memory System**
   - Agents maintain structured "learned facts" separate from message history
   - Markdown template format for organizing knowledge
   - Automatic memory updates during conversations
   - Memory scopes for different contexts

2. **Multi-Scope Memory Architecture**
   - **Chat scope**: Memory tied to single debate session
   - **User scope**: Personal memory across all user's debates
   - **Workspace scope**: Shared knowledge for all workspace members
   - **Organization scope**: Company-wide knowledge base

3. **Memory Management UI**
   - Admin dashboard for workspace/org memory
   - Manual memory entry with categories and tags
   - Document upload (PDF, DOCX, TXT, MD) with AI extraction
   - URL scraping with Firecrawl for web content import
   - Search, filter, edit, and delete memories

4. **Agent Integration**
   - Automatic memory loading based on scope hierarchy
   - Memory included in agent system prompts
   - Smart memory suggestions during debates
   - Usage analytics (which memories agents reference most)

5. **Convex Advantages Over Upstash**
   - Single database (no separate Redis service)
   - Real-time subscriptions for live memory updates
   - Full TypeScript type safety with schema
   - Better integration with existing Convex setup
   - No additional service cost

6. **Conversation-Based Memory Sources**
   - **Save Chat as Memory**: Convert entire conversations into structured knowledge
   - **Save Artifact as Memory**: Preserve generated code, documents, and analyses
   - **Save Debate Result as Memory**: Capture outcomes, winning arguments, and consensus
   - AI-powered extraction of key insights from each source type
   - Automatic linking back to original source for context

### Architecture

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    Next.js App                          │
│                  (AnyDebateAI)                          │
└────────────┬────────────────────────────────────────────┘
             │
             ├──────────────────┬──────────────────┬───────────────┬──────────────────────┬─────────────────────┬──────────────────────┐
             │                  │                  │               │                      │                     │                      │
             ▼                  ▼                  ▼               ▼                      ▼                     ▼                      ▼
    ┌────────────────┐  ┌────────────────┐  ┌──────────┐  ┌──────────────┐  ┌────────────────────┐  ┌────────────────────┐  ┌─────────────────────┐
    │ Memory Manager │  │ Document Upload│  │ Firecrawl│  │ AI Extraction│  │ Chat to Memory API │  │ Artifact to Memory │  │ Debate to Memory API│
    │      UI        │  │    Handler     │  │  Scraper │  │   (AI SDK)   │  │                    │  │        API         │  │                     │
    └────────┬───────┘  └────────┬───────┘  └────┬─────┘  └──────┬───────┘  └────────────┬───────┘  └────────────┬───────┘  └─────────────┬───────┘
             │                   │               │               │                      │                      │                      │
             └───────────────────┴───────────────┴───────────────┘                      └──────────────────────┴──────────────────────┘
                                 │
                                 ▼
                    ┌────────────────────────────┐
                    │   ConvexMemoryProvider     │
                    │  (implements MemoryProvider)│
                    └────────────┬───────────────┘
                                 │
                                 ▼
                    ┌────────────────────────────┐
                    │      Convex Database       │
                    │   (workingMemory table)    │
                    └────────────┬───────────────┘
                                 │
                                 ▼
                    ┌────────────────────────────┐
                    │      Agent System          │
                    │  (loads memory in prompts) │
                    └────────────────────────────┘
\`\`\`

---

## Official Documentation

### AI SDK Tools Memory

- **Memory Package**: https://github.com/pontusab/ai-sdk-tools/tree/main/packages/memory
- **Memory Introduction**: Documentation from AI SDK Tools
- **Storage Providers**: InMemory, Upstash, Drizzle (SQL)
- **Memory Scopes**: Chat-level and user-level memory

### Firecrawl

- **Firecrawl API**: https://firecrawl.dev
- **Documentation**: https://docs.firecrawl.dev
- **Scraping Guide**: https://docs.firecrawl.dev/features/scrape
- **API Reference**: https://docs.firecrawl.dev/api-reference

### AI SDK

- **AI SDK Core**: https://sdk.vercel.ai/docs
- **Text Generation**: https://sdk.vercel.ai/docs/ai-sdk-core/generating-text
- **Structured Output**: https://sdk.vercel.ai/docs/ai-sdk-core/generating-structured-data

---

## Prerequisites

### Required Before Starting

1. ✅ **Phase 4 Complete**: Convex database with multi-tenancy
2. ✅ **Phase 5 Complete**: Clerk Organizations with roles
3. ✅ **Agent System**: Agent configuration with roles, personas, frameworks
4. ✅ **Firecrawl Account**: API key for web scraping
5. ✅ **Environment Variables**: Set up in Vercel/local

### Environment Variables

\`\`\`bash
# Firecrawl Configuration
FIRECRAWL_API_KEY=fc-xxxxxxxxxxxxx

# AI Gateway (already configured)
AI_GATEWAY_API_KEY=xxxxxxxxxxxxx

# Convex (already configured)
NEXT_PUBLIC_CONVEX_URL=https://xxxxx.convex.cloud
\`\`\`

### NPM Packages

\`\`\`bash
npm install @ai-sdk-tools/memory
npm install @firecrawl/firecrawl-js
npm install pdf-parse mammoth # For document parsing
\`\`\`

---

## Implementation Phases

### Phase 1: Database Schema & Convex Setup (3-4 hours)

#### Task 1.1: Add workingMemory Table to Schema

**File**: `convex/schema.ts`

\`\`\`typescript
export default defineSchema({
  // ... existing tables ...

  workingMemory: defineTable({
    // Scope and identifiers
    scope: v.union(
      v.literal('chat'),
      v.literal('user'),
      v.literal('workspace'),
      v.literal('organization')
    ),
    chatId: v.optional(v.id('sessions')), // For 'chat' scope
    userId: v.optional(v.string()), // For 'user' scope
    workspaceId: v.string(), // For 'workspace' scope
    organizationId: v.string(), // For 'organization' scope

    // Memory content
    title: v.string(),
    category: v.string(), // Technical, Business, Domain, Policies, etc.
    content: v.string(), // Markdown template with learned facts
    tags: v.array(v.string()),

    // Source tracking
    source: v.union(
      v.literal('manual'), // User-created
      v.literal('document'), // Extracted from document
      v.literal('url'), // Scraped from URL
      v.literal('agent'), // Auto-generated by agent
      v.literal('chat'), // Saved from conversation
      v.literal('artifact'), // Saved from generated artifact
      v.literal('debate_result') // Saved from debate outcome
    ),
    sourceUrl: v.optional(v.string()), // Original URL if from web
    sourceDocument: v.optional(v.string()), // Original filename if from doc
    sourceChatId: v.optional(v.id('sessions')), // Link to original chat/debate
    sourceArtifactId: v.optional(v.string()), // Link to original artifact
    sourceDebateId: v.optional(v.id('sessions')), // Link to original debate

    // Metadata
    createdBy: v.string(), // User ID who created
    usageCount: v.number(), // How many times referenced by agents
    lastUsedAt: v.optional(v.number()),
    
    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_scope_chat', ['scope', 'chatId'])
    .index('by_scope_user', ['scope', 'userId'])
    .index('by_scope_workspace', ['scope', 'workspaceId'])
    .index('by_scope_organization', ['scope', 'organizationId'])
    .index('by_workspace', ['workspaceId'])
    .index('by_organization', ['organizationId'])
    .index('by_category', ['category'])
    .index('by_source', ['source'])
    .index('by_source_chat', ['sourceChatId'])
    .index('by_source_artifact', ['sourceArtifactId'])
    .index('by_source_debate', ['sourceDebateId']),
});
\`\`\`

#### Task 1.2: Create Memory Queries and Mutations

**File**: `convex/memory.ts`

\`\`\`typescript
import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

// Get memories for a specific scope
export const getMemoriesByScope = query({
  args: {
    scope: v.union(
      v.literal('chat'),
      v.literal('user'),
      v.literal('workspace'),
      v.literal('organization')
    ),
    chatId: v.optional(v.id('sessions')),
    userId: v.optional(v.string()),
    workspaceId: v.optional(v.string()),
    organizationId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db
      .query('workingMemory')
      .filter((q) => q.eq(q.field('scope'), args.scope));

    if (args.scope === 'chat' && args.chatId) {
      query = query.filter((q) => q.eq(q.field('chatId'), args.chatId));
    } else if (args.scope === 'user' && args.userId) {
      query = query.filter((q) => q.eq(q.field('userId'), args.userId));
    } else if (args.scope === 'workspace' && args.workspaceId) {
      query = query.filter((q) => q.eq(q.field('workspaceId'), args.workspaceId));
    } else if (args.scope === 'organization' && args.organizationId) {
      query = query.filter((q) => q.eq(q.field('organizationId'), args.organizationId));
    }

    return await query.collect();
  },
});

// Get all relevant memories for an agent (hierarchy)
export const getAgentMemories = query({
  args: {
    chatId: v.optional(v.id('sessions')),
    userId: v.string(),
    workspaceId: v.string(),
    organizationId: v.string(),
  },
  handler: async (ctx, args) => {
    // Load memories in order of specificity
    const [orgMemories, workspaceMemories, userMemories, chatMemories] =
      await Promise.all([
        // Organization-level (broadest)
        ctx.db
          .query('workingMemory')
          .withIndex('by_scope_organization', (q) =>
            q.eq('scope', 'organization').eq('organizationId', args.organizationId)
          )
          .collect(),

        // Workspace-level
        ctx.db
          .query('workingMemory')
          .withIndex('by_scope_workspace', (q) =>
            q.eq('scope', 'workspace').eq('workspaceId', args.workspaceId)
          )
          .collect(),

        // User-level
        ctx.db
          .query('workingMemory')
          .withIndex('by_scope_user', (q) =>
            q.eq('scope', 'user').eq('userId', args.userId)
          )
          .collect(),

        // Chat-level (most specific)
        args.chatId
          ? ctx.db
              .query('workingMemory')
              .withIndex('by_scope_chat', (q) =>
                q.eq('scope', 'chat').eq('chatId', args.chatId)
              )
              .collect()
          : [],
      ]);

    return {
      organization: orgMemories,
      workspace: workspaceMemories,
      user: userMemories,
      chat: chatMemories,
      all: [...orgMemories, ...workspaceMemories, ...userMemories, ...chatMemories],
    };
  },
});

// Create memory
export const createMemory = mutation({
  args: {
    scope: v.union(
      v.literal('chat'),
      v.literal('user'),
      v.literal('workspace'),
      v.literal('organization')
    ),
    chatId: v.optional(v.id('sessions')),
    userId: v.optional(v.string()),
    workspaceId: v.string(),
    organizationId: v.string(),
    title: v.string(),
    category: v.string(),
    content: v.string(),
    tags: v.array(v.string()),
    source: v.union(
      v.literal('manual'),
      v.literal('document'),
      v.literal('url'),
      v.literal('agent')
    ),
    sourceUrl: v.optional(v.string()),
    sourceDocument: v.optional(v.string()),
    createdBy: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('workingMemory', {
      ...args,
      usageCount: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// Update memory
export const updateMemory = mutation({
  args: {
    id: v.id('workingMemory'),
    title: v.optional(v.string()),
    category: v.optional(v.string()),
    content: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// Delete memory
export const deleteMemory = mutation({
  args: { id: v.id('workingMemory') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Increment usage count
export const incrementUsage = mutation({
  args: { id: v.id('workingMemory') },
  handler: async (ctx, args) => {
    const memory = await ctx.db.get(args.id);
    if (!memory) return;

    await ctx.db.patch(args.id, {
      usageCount: memory.usageCount + 1,
      lastUsedAt: Date.now(),
    });
  },
});
\`\`\`

**Estimated Time**: 3-4 hours

---

### Phase 2: ConvexMemoryProvider Implementation (4-5 hours)

#### Task 2.1: Create ConvexMemoryProvider Class

**File**: `lib/memory/convex-provider.ts`

\`\`\`typescript
import { MemoryProvider } from '@ai-sdk-tools/memory';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

export class ConvexMemoryProvider implements MemoryProvider {
  private convex: ConvexHttpClient;
  private workspaceId: string;
  private organizationId: string;

  constructor(
    convexUrl: string,
    workspaceId: string,
    organizationId: string
  ) {
    this.convex = new ConvexHttpClient(convexUrl);
    this.workspaceId = workspaceId;
    this.organizationId = organizationId;
  }

  async getWorkingMemory(
    scope: 'chat' | 'user',
    identifier: string
  ): Promise<string | null> {
    const memories = await this.convex.query(api.memory.getMemoriesByScope, {
      scope,
      ...(scope === 'chat'
        ? { chatId: identifier as Id<'sessions'> }
        : { userId: identifier }),
      workspaceId: this.workspaceId,
      organizationId: this.organizationId,
    });

    if (memories.length === 0) return null;

    // Combine all memories into markdown format
    return memories
      .map((m) => `## ${m.title}\n\n${m.content}`)
      .join('\n\n---\n\n');
  }

  async updateWorkingMemory(
    scope: 'chat' | 'user',
    identifier: string,
    content: string,
    userId: string
  ): Promise<void> {
    // Parse content to extract title and body
    const lines = content.split('\n');
    const title = lines[0].replace(/^##\s*/, '').trim();
    const body = lines.slice(1).join('\n').trim();

    await this.convex.mutation(api.memory.createMemory, {
      scope,
      ...(scope === 'chat'
        ? { chatId: identifier as Id<'sessions'> }
        : { userId: identifier }),
      workspaceId: this.workspaceId,
      organizationId: this.organizationId,
      title,
      category: 'General',
      content: body,
      tags: [],
      source: 'agent',
      createdBy: userId,
    });
  }

  async saveMessage(
    chatId: string,
    userId: string,
    role: 'user' | 'assistant',
    content: string
  ): Promise<void> {
    // Messages are already saved via the chat system
    // This is a no-op for Convex since we handle messages separately
  }

  async getMessages(
    chatId: string,
    limit?: number
  ): Promise<Array<{ role: 'user' | 'assistant'; content: string }>> {
    // Fetch messages from Convex messages table
    const messages = await this.convex.query(api.messages.getBySession, {
      sessionId: chatId as Id<'sessions'>,
    });

    const formatted = messages.map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    }));

    return limit ? formatted.slice(-limit) : formatted;
  }

  async saveChat(
    chatId: string,
    userId: string,
    title?: string
  ): Promise<void> {
    // Chats are already saved via the session system
    // This is a no-op for Convex
  }

  async getChats(userId: string): Promise<
    Array<{
      chatId: string;
      title: string;
      createdAt: Date;
      messageCount: number;
    }>
  > {
    const sessions = await this.convex.query(api.sessions.getUserSessions, {
      userId,
    });

    return sessions.map((s) => ({
      chatId: s._id,
      title: s.title,
      createdAt: new Date(s.createdAt),
      messageCount: s.messageCount,
    }));
  }

  async getChat(chatId: string): Promise<{
    chatId: string;
    title: string;
    createdAt: Date;
    messageCount: number;
  } | null> {
    const session = await this.convex.query(api.sessions.getById, {
      id: chatId as Id<'sessions'>,
    });

    if (!session) return null;

    return {
      chatId: session._id,
      title: session.title,
      createdAt: new Date(session.createdAt),
      messageCount: session.messageCount,
    };
  }

  async updateChatTitle(chatId: string, title: string): Promise<void> {
    await this.convex.mutation(api.sessions.updateTitle, {
      id: chatId as Id<'sessions'>,
      title,
    });
  }
}
\`\`\`

#### Task 2.2: Create Memory Hook for Agent Integration

**File**: `hooks/use-agent-memory.ts`

\`\`\`typescript
'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser, useOrganization } from '@clerk/nextjs';
import { Id } from '@/convex/_generated/dataModel';

export function useAgentMemory(chatId?: Id<'sessions'>) {
  const { user } = useUser();
  const { organization } = useOrganization();

  const memories = useQuery(
    api.memory.getAgentMemories,
    user && organization
      ? {
          chatId,
          userId: user.id,
          workspaceId: organization.id,
          organizationId: organization.id,
        }
      : 'skip'
  );

  // Format memories for agent system prompt
  const formatForPrompt = () => {
    if (!memories) return '';

    const sections = [];

    if (memories.organization.length > 0) {
      sections.push(
        '## Organization Knowledge\n\n' +
          memories.organization.map((m) => `### ${m.title}\n${m.content}`).join('\n\n')
      );
    }

    if (memories.workspace.length > 0) {
      sections.push(
        '## Workspace Knowledge\n\n' +
          memories.workspace.map((m) => `### ${m.title}\n${m.content}`).join('\n\n')
      );
    }

    if (memories.user.length > 0) {
      sections.push(
        '## User Preferences\n\n' +
          memories.user.map((m) => `### ${m.title}\n${m.content}`).join('\n\n')
      );
    }

    if (memories.chat.length > 0) {
      sections.push(
        '## Session Context\n\n' +
          memories.chat.map((m) => `### ${m.title}\n${m.content}`).join('\n\n')
      );
    }

    return sections.join('\n\n---\n\n');
  };

  return {
    memories,
    memoryPrompt: formatForPrompt(),
    isLoading: memories === undefined,
  };
}
\`\`\`

**Estimated Time**: 4-5 hours

---

### Phase 3: Memory Management UI (5-6 hours)

#### Task 3.1: Create Memory Dashboard Page

**File**: `app/dashboard/memory/page.tsx`

\`\`\`typescript
'use client';

import { useState } from 'react';
import { useOrganization } from '@clerk/nextjs';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Upload, LinkIcon, Search } from 'lucide-react';

const CATEGORIES = [
  'Technical',
  'Business',
  'Domain Knowledge',
  'Policies',
  'Processes',
  'General',
];

export default function MemoryPage() {
  const { organization, membership } = useOrganization();
  const [scope, setScope] = useState<'workspace' | 'organization'>('workspace');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const memories = useQuery(
    api.memory.getMemoriesByScope,
    organization
      ? {
          scope,
          workspaceId: organization.id,
          organizationId: organization.id,
        }
      : 'skip'
  );

  const createMemory = useMutation(api.memory.createMemory);
  const deleteMemory = useMutation(api.memory.deleteMemory);

  // Only admins can manage memory
  if (membership?.role !== 'org:admin') {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="text-muted-foreground mt-2">
          Only organization admins can manage workspace memory.
        </p>
      </div>
    );
  }

  const filteredMemories = memories?.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || m.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Memory Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage knowledge accessible to all agents in your {scope}
          </p>
        </div>

        <div className="flex gap-2">
          <Select value={scope} onValueChange={(v: any) => setScope(v)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="workspace">Workspace</SelectItem>
              <SelectItem value="organization">Organization</SelectItem>
            </SelectContent>
          </Select>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Memory
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Memory</DialogTitle>
              </DialogHeader>
              <AddMemoryForm scope={scope} onSuccess={() => {}} />
            </DialogContent>
          </Dialog>

          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>

          <Button variant="outline">
            <LinkIcon className="h-4 w-4 mr-2" />
            Import from URL
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search memories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Memory List */}
      <div className="grid gap-4">
        {filteredMemories?.map((memory) => (
          <Card key={memory._id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{memory.title}</h3>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary">{memory.category}</Badge>
                  <Badge variant="outline">{memory.source}</Badge>
                  {memory.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteMemory({ id: memory._id })}
                >
                  Delete
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {memory.content}
            </p>
            <div className="flex gap-4 mt-4 text-xs text-muted-foreground">
              <span>Used {memory.usageCount} times</span>
              <span>
                Created {new Date(memory.createdAt).toLocaleDateString()}
              </span>
              {memory.sourceUrl && (
                <a
                  href={memory.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Source
                </a>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function AddMemoryForm({
  scope,
  onSuccess,
}: {
  scope: 'workspace' | 'organization';
  onSuccess: () => void;
}) {
  // Form implementation
  return <div>Form goes here</div>;
}
\`\`\`

#### Task 3.2: Add "Save as Memory" Button to Chat Interface

**File**: `components/chat/chat-actions.tsx`

\`\`\`typescript
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BookmarkPlus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { SaveChatAsMemoryForm } from './save-chat-as-memory-form';

export function ChatActions({ sessionId }: { sessionId: string }) {
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowSaveDialog(true)}
      >
        <BookmarkPlus className="h-4 w-4 mr-2" />
        Save as Memory
      </Button>

      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Conversation as Memory</DialogTitle>
          </DialogHeader>
          <SaveChatAsMemoryForm
            sessionId={sessionId}
            onSuccess={() => setShowSaveDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
\`\`\`

#### Task 3.3: Add "Save as Memory" Button to Artifact Viewer

**File**: `components/artifacts/artifact-actions.tsx`

\`\`\`typescript
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BookmarkPlus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { SaveArtifactAsMemoryForm } from './save-artifact-as-memory-form';

export function ArtifactActions({
  artifactId,
  artifactType,
  artifactContent,
  artifactTitle,
}: {
  artifactId: string;
  artifactType: string;
  artifactContent: string;
  artifactTitle: string;
}) {
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowSaveDialog(true)}
      >
        <BookmarkPlus className="h-4 w-4 mr-2" />
        Save as Memory
      </Button>

      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Artifact as Memory</DialogTitle>
          </DialogHeader>
          <SaveArtifactAsMemoryForm
            artifactId={artifactId}
            artifactType={artifactType}
            artifactContent={artifactContent}
            artifactTitle={artifactTitle}
            onSuccess={() => setShowSaveDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
\`\`\`

#### Task 3.4: Add "Save Debate Result" Button After Debate Completion

**File**: `components/debate/debate-completion-actions.tsx`

\`\`\`typescript
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BookmarkPlus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { SaveDebateResultForm } from './save-debate-result-form';

export function DebateCompletionActions({
  sessionId,
  debateTopic,
  debateType,
}: {
  sessionId: string;
  debateTopic: string;
  debateType: string;
}) {
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  return (
    <div className="flex gap-2 mt-4">
      <Button onClick={() => setShowSaveDialog(true)}>
        <BookmarkPlus className="h-4 w-4 mr-2" />
        Save Debate Result as Memory
      </Button>

      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Debate Result as Memory</DialogTitle>
          </DialogHeader>
          <SaveDebateResultForm
            sessionId={sessionId}
            debateTopic={debateTopic}
            debateType={debateType}
            onSuccess={() => setShowSaveDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
\`\`\`

**Estimated Time**: 6-8 hours (updated from 5-6 hours)

---

### Phase 4: Document Upload & URL Scraping (5-6 hours)

#### Task 4.1: Create Document Upload API Route

**File**: `app/api/memory/upload/route.ts`

\`\`\`typescript
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { generateText } from 'ai';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

export async function POST(req: NextRequest) {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get('file') as File;
  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  // Extract text based on file type
  let text = '';
  const buffer = Buffer.from(await file.arrayBuffer());

  if (file.type === 'application/pdf') {
    const data = await pdfParse(buffer);
    text = data.text;
  } else if (
    file.type ===
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    const result = await mammoth.extractRawText({ buffer });
    text = result.value;
  } else if (file.type === 'text/plain' || file.type === 'text/markdown') {
    text = buffer.toString('utf-8');
  } else {
    return NextResponse.json(
      { error: 'Unsupported file type' },
      { status: 400 }
    );
  }

  // Use AI to extract key facts and structure as memories
  const { text: extractedMemories } = await generateText({
    model: 'openai/gpt-4.1',
    prompt: `Extract key facts, policies, and knowledge from the following document.
Format each memory entry as:

TITLE: [Short descriptive title]
CATEGORY: [Technical/Business/Domain Knowledge/Policies/Processes/General]
CONTENT: [Detailed content in markdown]
TAGS: [comma-separated tags]

---

Document content:
${text}`,
  });

  // Parse AI response into structured memories
  const memories = parseMemoriesFromAI(extractedMemories);

  return NextResponse.json({
    success: true,
    memories,
    filename: file.name,
  });
}

function parseMemoriesFromAI(text: string) {
  // Parse the AI-generated text into structured memory objects
  const entries = text.split('---').filter((e) => e.trim());

  return entries.map((entry) => {
    const lines = entry.trim().split('\n');
    const memory: any = {};

    for (const line of lines) {
      if (line.startsWith('TITLE:')) {
        memory.title = line.replace('TITLE:', '').trim();
      } else if (line.startsWith('CATEGORY:')) {
        memory.category = line.replace('CATEGORY:', '').trim();
      } else if (line.startsWith('CONTENT:')) {
        memory.content = line.replace('CONTENT:', '').trim();
      } else if (line.startsWith('TAGS:')) {
        memory.tags = line
          .replace('TAGS:', '')
          .split(',')
          .map((t) => t.trim());
      }
    }

    return memory;
  });
}
\`\`\`

#### Task 4.2: Create URL Scraping API Route

**File**: `app/api/memory/scrape/route.ts`

\`\`\`typescript
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { generateText } from 'ai';
import FirecrawlApp from '@firecrawl/firecrawl-js';

const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY!,
});

export async function POST(req: NextRequest) {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { url } = await req.json();
  if (!url) {
    return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
  }

  // Scrape URL with Firecrawl
  const scrapeResult = await firecrawl.scrapeUrl(url, {
    formats: ['markdown'],
  });

  if (!scrapeResult.success) {
    return NextResponse.json(
      { error: 'Failed to scrape URL' },
      { status: 500 }
    );
  }

  const markdown = scrapeResult.markdown;

  // Use AI to extract key facts
  const { text: extractedMemories } = await generateText({
    model: 'openai/gpt-4.1',
    prompt: `Extract key facts and knowledge from the following web page content.
Format each memory entry as:

TITLE: [Short descriptive title]
CATEGORY: [Technical/Business/Domain Knowledge/Policies/Processes/General]
CONTENT: [Detailed content in markdown]
TAGS: [comma-separated tags]

---

Web page content:
${markdown}`,
  });

  // Parse AI response
  const memories = parseMemoriesFromAI(extractedMemories);

  return NextResponse.json({
    success: true,
    memories,
    sourceUrl: url,
  });
}

function parseMemoriesFromAI(text: string) {
  // Same parsing logic as document upload
  const entries = text.split('---').filter((e) => e.trim());

  return entries.map((entry) => {
    const lines = entry.trim().split('\n');
    const memory: any = {};

    for (const line of lines) {
      if (line.startsWith('TITLE:')) {
        memory.title = line.replace('TITLE:', '').trim();
      } else if (line.startsWith('CATEGORY:')) {
        memory.category = line.replace('CATEGORY:', '').trim();
      } else if (line.startsWith('CONTENT:')) {
        memory.content = line.replace('CONTENT:', '').trim();
      } else if (line.startsWith('TAGS:')) {
        memory.tags = line
          .replace('TAGS:', '')
          .split(',')
          .map((t) => t.trim());
      }
    }

    return memory;
  });
}
\`\`\`

#### Task 4.3: Create Chat-to-Memory API Route

**File**: `app/api/memory/from-chat/route.ts`

\`\`\`typescript
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { generateText } from 'ai';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: NextRequest) {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { sessionId, scope } = await req.json();
  if (!sessionId) {
    return NextResponse.json({ error: 'No session ID provided' }, { status: 400 });
  }

  // Fetch chat messages
  const messages = await convex.query(api.messages.getBySession, {
    sessionId: sessionId as Id<'sessions'>,
  });

  // Format conversation for AI analysis
  const conversationText = messages
    .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
    .join('\n\n');

  // Use AI to extract key insights from conversation
  const { text: extractedMemories } = await generateText({
    model: 'openai/gpt-4.1',
    prompt: `Analyze the following conversation and extract key insights, learnings, and important facts that should be preserved as organizational memory.

Format each memory entry as:

TITLE: [Short descriptive title]
CATEGORY: [Debate Insights/Technical/Business/Domain Knowledge/General]
CONTENT: [Detailed summary of the insight in markdown]
TAGS: [comma-separated tags]

Focus on:
- Key arguments and counterarguments
- Important facts or data mentioned
- Conclusions or consensus reached
- Useful patterns or approaches discussed
- Decisions made or action items

---

Conversation:
${conversationText}`,
  });

  // Parse AI response into structured memories
  const memories = parseMemoriesFromAI(extractedMemories);

  // Add source metadata
  const memoriesWithSource = memories.map((m: any) => ({
    ...m,
    source: 'chat',
    sourceChatId: sessionId,
  }));

  return NextResponse.json({
    success: true,
    memories: memoriesWithSource,
    sessionId,
  });
}

function parseMemoriesFromAI(text: string) {
  const entries = text.split('---').filter((e) => e.trim());

  return entries.map((entry) => {
    const lines = entry.trim().split('\n');
    const memory: any = {};

    for (const line of lines) {
      if (line.startsWith('TITLE:')) {
        memory.title = line.replace('TITLE:', '').trim();
      } else if (line.startsWith('CATEGORY:')) {
        memory.category = line.replace('CATEGORY:', '').trim();
      } else if (line.startsWith('CONTENT:')) {
        memory.content = line.replace('CONTENT:', '').trim();
      } else if (line.startsWith('TAGS:')) {
        memory.tags = line
          .replace('TAGS:', '')
          .split(',')
          .map((t) => t.trim());
      }
    }

    return memory;
  });
}
\`\`\`

#### Task 4.4: Create Artifact-to-Memory API Route

**File**: `app/api/memory/from-artifact/route.ts`

\`\`\`typescript
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { generateText } from 'ai';

export async function POST(req: NextRequest) {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { artifactId, artifactType, artifactContent, artifactTitle } = await req.json();
  if (!artifactId || !artifactContent) {
    return NextResponse.json({ error: 'Missing artifact data' }, { status: 400 });
  }

  // Use AI to extract learnings from artifact
  const { text: extractedMemories } = await generateText({
    model: 'openai/gpt-4.1',
    prompt: `Analyze the following ${artifactType || 'artifact'} and extract key learnings, patterns, and reusable knowledge that should be preserved as organizational memory.

Artifact Title: ${artifactTitle || 'Untitled'}

Format each memory entry as:

TITLE: [Short descriptive title]
CATEGORY: [Generated Solutions/Technical/Business/Domain Knowledge/General]
CONTENT: [Detailed explanation of the learning or pattern in markdown]
TAGS: [comma-separated tags]

Focus on:
- Reusable patterns or approaches
- Technical solutions or implementations
- Best practices demonstrated
- Lessons learned or insights
- Key decisions and rationale

---

Artifact Content:
${artifactContent}`,
  });

  // Parse AI response
  const memories = parseMemoriesFromAI(extractedMemories);

  // Add source metadata
  const memoriesWithSource = memories.map((m: any) => ({
    ...m,
    source: 'artifact',
    sourceArtifactId: artifactId,
  }));

  return NextResponse.json({
    success: true,
    memories: memoriesWithSource,
    artifactId,
  });
}

function parseMemoriesFromAI(text: string) {
  const entries = text.split('---').filter((e) => e.trim());

  return entries.map((entry) => {
    const lines = entry.trim().split('\n');
    const memory: any = {};

    for (const line of lines) {
      if (line.startsWith('TITLE:')) {
        memory.title = line.replace('TITLE:', '').trim();
      } else if (line.startsWith('CATEGORY:')) {
        memory.category = line.replace('CATEGORY:', '').trim();
      } else if (line.startsWith('CONTENT:')) {
        memory.content = line.replace('CONTENT:', '').trim();
      } else if (line.startsWith('TAGS:')) {
        memory.tags = line
          .replace('TAGS:', '')
          .split(',')
          .map((t) => t.trim());
      }
    }

    return memory;
  });
}
\`\`\`

#### Task 4.5: Create Debate-Result-to-Memory API Route

**File**: `app/api/memory/from-debate/route.ts`

\`\`\`typescript
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { generateText } from 'ai';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: NextRequest) {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { sessionId, debateTopic, debateType } = await req.json();
  if (!sessionId) {
    return NextResponse.json({ error: 'No session ID provided' }, { status: 400 });
  }

  // Fetch debate messages
  const messages = await convex.query(api.messages.getBySession, {
    sessionId: sessionId as Id<'sessions'>,
  });

  // Format debate for AI analysis
  const debateText = messages
    .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
    .join('\n\n');

  // Use AI to extract debate outcome and insights
  const { text: extractedMemories } = await generateText({
    model: 'openai/gpt-4.1',
    prompt: `Analyze the following debate and extract the key outcomes, winning arguments, consensus points, and actionable insights.

Debate Topic: ${debateTopic || 'Unknown'}
Debate Type: ${debateType || 'Unknown'}

Format each memory entry as:

TITLE: [Short descriptive title]
CATEGORY: [Debate Insights/Decisions/Action Items/Learnings]
CONTENT: [Detailed summary in markdown]
TAGS: [comma-separated tags]

Focus on:
- Final outcome or consensus reached
- Strongest arguments from each side
- Key evidence or data that influenced the outcome
- Action items or next steps
- Lessons learned about the topic
- Patterns in argumentation that worked well

---

Debate:
${debateText}`,
  });

  // Parse AI response
  const memories = parseMemoriesFromAI(extractedMemories);

  // Add source metadata
  const memoriesWithSource = memories.map((m: any) => ({
    ...m,
    source: 'debate_result',
    sourceDebateId: sessionId,
  }));

  return NextResponse.json({
    success: true,
    memories: memoriesWithSource,
    sessionId,
  });
}

function parseMemoriesFromAI(text: string) {
  const entries = text.split('---').filter((e) => e.trim());

  return entries.map((entry) => {
    const lines = entry.trim().split('\n');
    const memory: any = {};

    for (const line of lines) {
      if (line.startsWith('TITLE:')) {
        memory.title = line.replace('TITLE:', '').trim();
      } else if (line.startsWith('CATEGORY:')) {
        memory.category = line.replace('CATEGORY:', '').trim();
      } else if (line.startsWith('CONTENT:')) {
        memory.content = line.replace('CONTENT:', '').trim();
      } else if (line.startsWith('TAGS:')) {
        memory.tags = line
          .replace('TAGS:', '')
          .split(',')
          .map((t) => t.trim());
      }
    }

    return memory;
  });
}
\`\`\`

**Estimated Time**: 7-9 hours (updated from 5-6 hours)

---

### Phase 5: Agent Integration & Testing (3-4 hours)

#### Task 5.1: Update Agent System Prompt to Include Memory

**File**: `lib/ai-utils.ts`

\`\`\`typescript
import { useAgentMemory } from '@/hooks/use-agent-memory';

export function generateSystemPromptWithMemory(
  agent: AgentConfig,
  memoryPrompt: string
): string {
  const basePrompt = generateSystemPrompt(agent);

  if (!memoryPrompt) return basePrompt;

  return `${basePrompt}

---

# Available Knowledge

You have access to the following knowledge base. Reference this information when relevant to the conversation:

${memoryPrompt}

---

When using information from the knowledge base, naturally incorporate it into your responses without explicitly stating "according to the knowledge base" unless necessary for clarity.`;
}
\`\`\`

#### Task 5.2: Update Chat Route to Load Memory

**File**: `app/api/chat/route.ts`

\`\`\`typescript
export async function POST(req: Request) {

  // Load agent memories
  const memories = await convex.query(api.memory.getAgentMemories, {
    chatId: sessionId,
    userId: user.id,
    workspaceId: organization.id,
    organizationId: organization.id,
  });

  const memoryPrompt = formatMemoriesForPrompt(memories);

  // Generate system prompt with memory
  const systemPrompt = generateSystemPromptWithMemory(
    agentConfig,
    memoryPrompt
  );

  // ... rest of chat logic ...
}
\`\`\`

#### Task 5.3: Testing

1. **Test Memory Creation**:
   - Create manual memory entries
   - Verify they appear in dashboard
   - Test search and filtering

2. **Test Document Upload**:
   - Upload PDF, DOCX, TXT files
   - Verify AI extraction works
   - Review and approve suggested memories

3. **Test URL Scraping**:
   - Scrape various URLs
   - Verify Firecrawl extracts content
   - Test AI memory extraction

4. **Test Agent Integration**:
   - Start debate with workspace memory
   - Verify agents reference memory in responses
   - Test memory hierarchy (org → workspace → user → chat)

5. **Test Memory Scopes**:
   - Create memories at different scopes
   - Verify correct loading based on context
   - Test usage count increments

**Estimated Time**: 3-4 hours

---

## Database Schema

### workingMemory Table

\`\`\`typescript
{
  _id: Id<'workingMemory'>,
  
  // Scope and identifiers
  scope: 'chat' | 'user' | 'workspace' | 'organization',
  chatId?: Id<'sessions'>,
  userId?: string,
  workspaceId: string,
  organizationId: string,
  
  // Memory content
  title: string,
  category: string,
  content: string, // Markdown
  tags: string[],
  
  // Source tracking
  source: 'manual' | 'document' | 'url' | 'agent' | 'chat' | 'artifact' | 'debate_result',
  sourceUrl?: string,
  sourceDocument?: string,
  sourceChatId?: Id<'sessions'>, // Link to original chat
  sourceArtifactId?: string, // Link to original artifact
  sourceDebateId?: Id<'sessions'>, // Link to original debate
  
  // Metadata
  createdBy: string,
  usageCount: number,
  lastUsedAt?: number,
  
  // Timestamps
  createdAt: number,
  updatedAt: number,
}
\`\`\`

---

## Testing Strategy

### Unit Tests

1. **ConvexMemoryProvider**:
   - Test memory retrieval by scope
   - Test memory creation and updates
   - Test memory hierarchy loading

2. **Memory parsing**:
   - Test document text extraction
   - Test AI memory extraction
   - Test markdown formatting

### Integration Tests

1. **Memory Management UI**:
   - Admin can create/edit/delete memories
   - Non-admins cannot access memory management
   - Search and filtering work correctly

2. **Document Upload**:
   - PDF extraction works
   - DOCX extraction works
   - AI suggests relevant memories

3. **URL Scraping**:
   - Firecrawl scrapes content
   - AI extracts key facts
   - Memories are created correctly

4. **Agent Integration**:
   - Agents load correct memories based on scope
   - Memory is included in system prompts
   - Usage count increments when referenced

5. **Chat-to-Memory**:
   - Save conversation as memory
   - AI extracts key insights correctly
   - Memory links back to original chat
   - Permissions work (participants can save their chats)

6. **Artifact-to-Memory**:
   - Save artifact as memory
   - AI extracts learnings correctly
   - Memory links back to original artifact
   - Creator can save their artifacts

7. **Debate-Result-to-Memory**:
   - Save debate outcome as memory
   - AI extracts winning arguments and consensus
   - Memory links back to original debate
   - Participants can save debate results

### Manual Testing Checklist

- [ ] Create workspace memory as admin
- [ ] Verify memory appears in dashboard
- [ ] Upload PDF document
- [ ] Review AI-suggested memories
- [ ] Approve and save memories
- [ ] Scrape URL with Firecrawl
- [ ] Start debate and verify agent references memory
- [ ] Test memory hierarchy (org → workspace → user → chat)
- [ ] Test as non-admin (no access to memory management)
- [ ] Verify usage analytics update
- [ ] Complete a chat and click "Save as Memory"
- [ ] Review AI-extracted insights from chat
- [ ] Approve and save chat memories
- [ ] Generate an artifact and save it as memory
- [ ] Complete a debate and save the result
- [ ] Verify memories link back to source (chat/artifact/debate)
- [ ] Click source link and navigate to original content
- [ ] Test as non-participant (should not be able to save others' chats)

---

## Deployment Checklist

### Pre-Deployment

- [ ] Set up Firecrawl account and get API key
- [ ] Add FIRECRAWL_API_KEY to environment variables
- [ ] Test document parsing libraries (pdf-parse, mammoth)
- [ ] Verify AI extraction prompts work well
- [ ] Test Convex schema migration

### Deployment

- [ ] Deploy Convex schema changes
- [ ] Deploy Next.js app with new routes
- [ ] Verify memory dashboard is accessible
- [ ] Test document upload in production
- [ ] Test URL scraping in production

### Post-Deployment

- [ ] Monitor memory creation rate
- [ ] Check AI extraction quality
- [ ] Verify agent memory loading performance
- [ ] Set up alerts for failed extractions
- [ ] Document best practices for memory management

---

## Best Practices

### Memory Content

1. **Be specific** - Write clear, actionable facts
2. **Use markdown** - Structure content with headers and lists
3. **Add context** - Include why the information matters
4. **Tag appropriately** - Use consistent tags for easy filtering

### Memory Scopes

1. **Organization** - Company-wide policies, values, standards
2. **Workspace** - Team-specific knowledge, domain expertise
3. **User** - Personal preferences, communication style
4. **Chat** - Session-specific context, temporary facts

### Performance

1. **Limit memory size** - Keep individual memories focused
2. **Use categories** - Organize memories for faster retrieval
3. **Archive old memories** - Remove outdated information
4. **Monitor usage** - Track which memories are most valuable

### Security

1. **Admin-only management** - Restrict memory creation to admins
2. **Scope isolation** - Ensure memories don't leak between scopes
3. **Audit trail** - Track who created/modified memories
4. **Sensitive data** - Don't store PII or secrets in memories

---

## Timeline Summary

| Phase | Tasks | Duration |
|-------|-------|----------|
| Phase 1 | Database schema & queries | 3-4 hours |
| Phase 2 | ConvexMemoryProvider | 4-5 hours |
| Phase 3 | Memory Management UI | 6-8 hours |
| Phase 4 | Document upload, URL scraping, chat/artifact/debate memory | 7-9 hours |
| Phase 5 | Agent integration & testing | 4-5 hours |
| **Total** | | **24-31 hours** |

---

## Success Criteria

- [ ] workingMemory table created in Convex schema
- [ ] ConvexMemoryProvider implements MemoryProvider interface
- [ ] Memory dashboard accessible to admins
- [ ] Manual memory creation works
- [ ] Document upload extracts and suggests memories
- [ ] URL scraping with Firecrawl works
- [ ] Agents load memories based on scope hierarchy
- [ ] Memory is included in agent system prompts
- [ ] Usage analytics track memory references
- [ ] All four scopes (chat, user, workspace, org) work correctly
- [ ] Non-admins cannot access memory management
- [ ] Real-time updates via Convex subscriptions
- [ ] Users can save chats as memories
- [ ] Users can save artifacts as memories
- [ ] Users can save debate results as memories
- [ ] AI extracts relevant insights from each source type
- [ ] Memories link back to original source entities
- [ ] Source links navigate to original content
- [ ] Permissions prevent saving others' private content

---

## Next Steps After Completion

1. **Memory Suggestions**: AI suggests creating memories during debates
2. **Memory Versioning**: Track changes to memories over time
3. **Memory Sharing**: Share memories between workspaces
4. **Memory Templates**: Pre-built memory templates for common use cases
5. **Memory Analytics**: Dashboard showing memory usage and effectiveness
6. **Memory Export**: Export memories to PDF/Markdown
7. **Memory Import**: Bulk import from CSV/JSON
8. **Smart Memory Suggestions**: AI proactively suggests saving valuable chats/debates
9. **Memory Relationships**: Link related memories together
10. **Memory Diff**: Show how memories evolved over time
11. **Memory Search**: Full-text search across all memory content
12. **Memory Recommendations**: Suggest relevant memories during debates

---

**Status**: ❌ NOT STARTED (0%)  
**Ready to Start**: After Phase 4 (Convex) and Phase 5 (Organizations) are complete

---

## Why Convex Over Upstash

| Feature | Convex | Upstash |
|---------|--------|---------|
| **Integration** | Single database, already in use | Separate Redis service |
| **Real-time** | Native reactive subscriptions | Manual polling required |
| **Type Safety** | Full TypeScript schema | Manual typing |
| **Cost** | No additional service | Extra service cost |
| **Queries** | Rich query capabilities | Key-value only |
| **Development** | Same for dev and production | InMemory for dev, Upstash for prod |
| **Multi-tenancy** | Built-in with indexes | Manual implementation |
| **Relationships** | Native foreign keys | Manual management |

**Conclusion**: Convex provides better integration, type safety, and cost efficiency while maintaining all the functionality of the AI SDK Tools memory system.

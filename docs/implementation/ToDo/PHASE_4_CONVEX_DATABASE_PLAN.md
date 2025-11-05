# Phase 4: Convex Database Integration Plan

**Status**: 🟡 In Progress (Phase 0)  
**Priority**: P0 - Critical Foundation  
**Dependencies**: None (Phases 1-3 complete)  
**Estimated Timeline**: 16-23 hours (2-3 focused days)  
**Last Updated**: October 11, 2025

---

## 📋 Overview

This phase implements Convex as the real-time database layer for AnyDebate AI, enabling persistent storage, real-time synchronization, offline support, **multi-tenancy via Clerk Organizations**, and **payment integration via Polar**. All implementations follow mobile-first best practices with optimistic updates, efficient data fetching, and touch-optimized interactions.

### Key Objectives

- **Phase 0**: Review documentation and design comprehensive multi-tenant schema
- Set up Convex database with production-ready multi-tenant schema
- Integrate Clerk Organizations for multi-tenancy and team collaboration
- Integrate Polar for subscription and payment management
- Implement real-time data synchronization across devices
- Migrate from localStorage to Convex with zero data loss
- Enable offline support with automatic sync when online
- Optimize for mobile performance with efficient queries
- Implement file storage for artifact attachments
- Ensure proper tenant isolation and data security

### Success Criteria

- [ ] **Phase 0 completed**: All documentation reviewed, schema designed and validated
- [ ] Convex + Clerk + Polar integration configured
- [ ] Multi-tenant database schema implemented with proper isolation
- [ ] Organization-based access control working
- [ ] Subscription and payment tracking functional
- [ ] Real-time subscriptions working across all features
- [ ] Offline support with automatic sync
- [ ] Migration from localStorage completed successfully
- [ ] Mobile performance optimized (queries < 100ms)
- [ ] File uploads working for artifacts
- [ ] Zero data loss during migration

---

## 🏗️ Implementation Phases

### Phase 0: Planning & Documentation Review

**Timeline**: 4-6 hours  
**Status**: 🟡 In Progress

**CRITICAL**: This phase must be completed before any implementation begins. It ensures we follow best practices and avoid costly refactoring later.

#### Task 0.1: Documentation Review & Analysis

**Estimated Time**: 2-3 hours

**Requirements**:
- Review all relevant Clerk Organizations documentation
- Review Clerk + Convex integration documentation
- Review Polar payment integration documentation
- Understand multi-tenancy patterns and best practices
- Document key findings and integration requirements

**Documentation to Review**:

1. **Clerk Organizations** (Multi-tenancy):
   - ✅ [Organizations Overview](https://clerk.com/docs/guides/organizations/overview)
   - ✅ [Roles and Permissions](https://clerk.com/docs/guides/organizations/roles-and-permissions)
   - ✅ [Multi-tenancy Glossary](https://clerk.com/glossary/multi-tenancy)
   - ✅ [Organization Object Reference](https://clerk.com/docs/reference/javascript/organization)
   - ✅ [useOrganization Hook](https://clerk.com/docs/nextjs/reference/hooks/use-organization)

2. **Clerk + Convex Integration**:
   - ✅ [Convex Integration Guide](https://clerk.com/docs/guides/development/integrations/databases/convex)
   - Additional: [Convex Auth Documentation](https://docs.convex.dev/auth/clerk)

3. **Polar Payment Integration**:
   - ✅ [Polar Introduction](https://polar.sh/docs/introduction)
   - Additional: [Polar API Documentation](https://polar.sh/docs/api)
   - Additional: [Polar Webhooks](https://polar.sh/docs/webhooks)

**Key Findings Summary**:

**Clerk Organizations** (MVP Simplified):
- Organizations provide multi-tenant structure
- Default roles: `org:admin` and `org:member` (NO custom roles for MVP)
- Users can belong to multiple organizations (freelancer/consultant scenario)
- Active organization concept (users switch between orgs)
- Simple per-user pricing (user added = org charged)

**Clerk + Convex Integration**:
- Requires JWT template configuration in Clerk Dashboard
- Use `ConvexProviderWithClerk` instead of regular `ConvexProvider`
- Configure `auth.config.js` with Clerk's issuer domain
- Auth state available in Convex functions via `ctx.auth`
- Add custom claims: `org_id` and `org_role` (keep it simple)

**Polar Payments** (MVP Simplified):
- Modern billing infrastructure for developers
- Global tax compliance handled automatically
- Per-user subscription pricing (user added = org charged)
- Webhook-based event system for payment updates
- Merchant of Record (handles all compliance)

**Files to Create**:
- `docs/implementation/ToDo/PHASE_4_DOCUMENTATION_REVIEW.md` - Detailed findings and notes

**Success Criteria**:
- [ ] All documentation reviewed and key points documented
- [ ] Multi-tenancy patterns understood
- [ ] Integration requirements identified
- [ ] Potential challenges and solutions documented

---

#### Task 0.2: Database Schema Design

**Estimated Time**: 1-2 hours

**Requirements**:
- Design comprehensive multi-tenant database schema
- Ensure proper tenant isolation (organizationId on all relevant tables)
- Plan user-organization relationships with roles
- Design subscription and payment tracking
- Plan data access patterns and indexes
- Validate schema against all use cases

**Schema Design Principles**:

1. **Multi-Tenancy (Shared Database, Shared Schema)**:
   - All tenant data in same database/schema
   - `organizationId` field on all tenant-specific tables
   - Indexes on `organizationId` for efficient queries
   - Row-level security via Convex query filters

2. **User-Organization Relationships**:
   - Users can belong to multiple organizations
   - Each membership has a role (synced from Clerk)
   - Active organization tracked per user session

3. **Subscription & Payment Tracking**:
   - Organization-level subscriptions (not user-level)
   - Track subscription status, plan, billing cycle
   - Store Polar customer/subscription IDs
   - Handle webhook events for payment updates

4. **Data Isolation & Security**:
   - All queries filtered by organizationId
   - Convex functions validate organization access
   - No cross-tenant data leakage
   - Audit logging for sensitive operations

**Comprehensive Schema Design**:

\`\`\`typescript
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  // ============================================
  // MULTI-TENANCY: ORGANIZATIONS & USERS
  // ============================================
  
  // 1. Organizations (synced from Clerk)
  organizations: defineTable({
    clerkOrganizationId: v.string(),
    name: v.string(),
    slug: v.optional(v.string()),
    totalSessions: v.number(),
    totalMessages: v.number(),
    totalTokensUsed: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_clerk_org_id', ['clerkOrganizationId']),

  // 2. Users (synced from Clerk)
  users: defineTable({
    clerkUserId: v.string(),
    preferences: v.object({
      theme: v.union(v.literal('light'), v.literal('dark'), v.literal('system')),
      defaultModel: v.string(),
      language: v.string(),
      notifications: v.boolean(),
      defaultAgents: v.array(v.string()),
    }),
    totalSessions: v.number(),
    lastActiveAt: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_clerk_user_id', ['clerkUserId'])
    .index('by_last_active', ['lastActiveAt']),

  // 3. Workspaces
  workspaces: defineTable({
    organizationId: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    slug: v.optional(v.string()),
    settings: v.object({
      defaultModel: v.optional(v.string()),
      autoSave: v.boolean(),
      exportFormat: v.union(v.literal('pdf'), v.literal('markdown'), v.literal('json')),
    }),
    isDefault: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_organization', ['organizationId'])
    .index('by_organization_and_name', ['organizationId', 'name'])
    .index('by_organization_and_slug', ['organizationId', 'slug']),

  // 4. Workspace Memberships
  workspaceMemberships: defineTable({
    organizationId: v.string(),
    workspaceId: v.id('workspaces'),
    userId: v.string(),
    role: v.union(v.literal('admin'), v.literal('member')),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_organization', ['organizationId'])
    .index('by_workspace', ['workspaceId'])
    .index('by_user', ['userId'])
    .index('by_organization_and_workspace', ['organizationId', 'workspaceId'])
    .index('by_organization_and_user', ['organizationId', 'userId'])
    .index('by_workspace_and_user', ['workspaceId', 'userId']),

  // ============================================
  // CORE FEATURES: SESSIONS & MESSAGES
  // ============================================
  
  // 5. Sessions
  sessions: defineTable({
    organizationId: v.string(),
    workspaceId: v.id('workspaces'),
    userId: v.string(),
    agentIds: v.array(v.id('agents')),
    title: v.string(),
    mode: v.union(v.literal('compare'), v.literal('debate'), v.literal('auto-debate')),
    status: v.union(v.literal('active'), v.literal('completed'), v.literal('archived')),
    config: v.object({
      rounds: v.optional(v.number()),
      currentRound: v.optional(v.number()),
      speakingOrder: v.optional(v.array(v.string())),
      autoDebateStatus: v.optional(v.union(
        v.literal('setup'),
        v.literal('running'),
        v.literal('paused'),
        v.literal('completed')
      )),
    }),
    metadata: v.object({
      tags: v.array(v.string()),
      description: v.optional(v.string()),
      visibility: v.union(v.literal('private'), v.literal('workspace'), v.literal('organization')),
    }),
    messageCount: v.number(),
    tokensUsed: v.number(),
    duration: v.number(),
    lastActivityAt: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_organization', ['organizationId'])
    .index('by_workspace', ['workspaceId'])
    .index('by_user', ['userId'])
    .index('by_organization_and_workspace', ['organizationId', 'workspaceId'])
    .index('by_status', ['status'])
    .index('by_organization_and_status', ['organizationId', 'status']),

  // 6. Messages
  messages: defineTable({
    organizationId: v.string(),
    workspaceId: v.id('workspaces'),
    sessionId: v.id('sessions'),
    userId: v.string(),
    agentId: v.optional(v.id('agents')),
    role: v.union(v.literal('user'), v.literal('assistant'), v.literal('system')),
    content: v.string(),
    metadata: v.object({
      model: v.optional(v.string()),
      temperature: v.optional(v.number()),
      tokens: v.optional(v.number()),
      latency: v.optional(v.number()),
    }),
    parentMessageId: v.optional(v.id('messages')),
    threadId: v.optional(v.string()),
    replyCount: v.optional(v.number()),
    hasReplies: v.optional(v.boolean()),
    bookmarked: v.optional(v.boolean()),
    reactions: v.optional(v.object({
      likes: v.number(),
      dislikes: v.number(),
    })),
    isStreaming: v.optional(v.boolean()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_organization', ['organizationId'])
    .index('by_workspace', ['workspaceId'])
    .index('by_session', ['sessionId'])
    .index('by_user', ['userId'])
    .index('by_organization_and_session', ['organizationId', 'sessionId'])
    .index('by_organization_and_user', ['organizationId', 'userId'])
    .index('by_workspace_and_session', ['workspaceId', 'sessionId'])
    .index('by_created_at', ['createdAt']),

  // ============================================
  // AGENTS & CONFIGURATION
  // ============================================
  
  // 7. Agents
  agents: defineTable({
    organizationId: v.string(),
    workspaceId: v.id('workspaces'),
    userId: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    roleId: v.string(),
    personaId: v.string(),
    frameworkId: v.string(),
    role: v.string(),
    persona: v.string(),
    framework: v.string(),
    model: v.string(),
    provider: v.string(),
    systemPrompt: v.string(),
    customInstructions: v.optional(v.string()),
    parameters: v.object({
      temperature: v.optional(v.number()),
      maxTokens: v.optional(v.number()),
      topP: v.optional(v.number()),
    }),
    usageCount: v.number(),
    isFavorite: v.boolean(),
    isTemplate: v.boolean(),
    isActive: v.boolean(),
    visibility: v.union(v.literal('private'), v.literal('workspace'), v.literal('organization')),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_organization', ['organizationId'])
    .index('by_workspace', ['workspaceId'])
    .index('by_user', ['userId'])
    .index('by_organization_and_visibility', ['organizationId', 'visibility'])
    .index('by_workspace_and_visibility', ['workspaceId', 'visibility'])
    .index('by_template', ['isTemplate']),

  // 21. Roles
  roles: defineTable({
    id: v.string(),
    name: v.string(),
    category: v.string(),
    description: v.string(),
    expertise: v.array(v.string()),
    systemPrompt: v.string(),
    icon: v.string(),
    isSystem: v.boolean(),
    isActive: v.boolean(),
    organizationId: v.optional(v.string()),
    workspaceId: v.optional(v.string()),
    usageCount: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_id', ['id'])
    .index('by_organization', ['organizationId'])
    .index('by_workspace', ['workspaceId'])
    .index('by_category', ['category'])
    .index('by_is_system', ['isSystem'])
    .index('by_is_active', ['isActive']),

  // 22. Personas
  personas: defineTable({
    id: v.string(),
    name: v.string(),
    description: v.string(),
    traits: v.array(v.string()),
    communicationStyle: v.string(),
    decisionMaking: v.string(),
    systemPromptModifier: v.string(),
    icon: v.string(),
    isSystem: v.boolean(),
    isActive: v.boolean(),
    organizationId: v.optional(v.string()),
    workspaceId: v.optional(v.string()),
    usageCount: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_id', ['id'])
    .index('by_organization', ['organizationId'])
    .index('by_workspace', ['workspaceId'])
    .index('by_is_system', ['isSystem'])
    .index('by_is_active', ['isActive']),

  // 23. Frameworks
  frameworks: defineTable({
    id: v.string(),
    name: v.string(),
    description: v.string(),
    methodology: v.string(),
    bestFor: v.array(v.string()),
    steps: v.array(v.string()),
    systemPromptModifier: v.string(),
    icon: v.string(),
    isSystem: v.boolean(),
    isActive: v.boolean(),
    organizationId: v.optional(v.string()),
    workspaceId: v.optional(v.string()),
    usageCount: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_id', ['id'])
    .index('by_organization', ['organizationId'])
    .index('by_workspace', ['workspaceId'])
    .index('by_is_system', ['isSystem'])
    .index('by_is_active', ['isActive']),

  // ============================================
  // ARTIFACTS & ORGANIZATION
  // ============================================
  
  // 8. Artifacts
  artifacts: defineTable({
    organizationId: v.string(),
    workspaceId: v.id('workspaces'),
    sessionId: v.id('sessions'),
    messageId: v.id('messages'),
    userId: v.string(),
    type: v.union(v.literal('document'), v.literal('data-table'), v.literal('checklist'), v.literal('chart')),
    title: v.string(),
    content: v.string(),
    folderId: v.optional(v.id('folders')),
    tags: v.array(v.string()),
    isFavorite: v.boolean(),
    isPinned: v.boolean(),
    lastAccessedAt: v.number(),
    collaborators: v.optional(v.array(v.string())),
    reactions: v.optional(v.object({
      likes: v.number(),
      dislikes: v.number(),
    })),
    fileId: v.optional(v.id('_storage')),
    metadata: v.object({
      size: v.optional(v.number()),
      version: v.optional(v.number()),
      exports: v.optional(v.array(v.object({
        format: v.string(),
        url: v.string(),
        timestamp: v.number(),
      }))),
      author: v.optional(v.string()),
      tags: v.optional(v.array(v.string())),
      mimeType: v.optional(v.string()),
      wordCount: v.optional(v.number()),
      rowCount: v.optional(v.number()),
      itemCount: v.optional(v.number()),
    }),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_organization', ['organizationId'])
    .index('by_workspace', ['workspaceId'])
    .index('by_session', ['sessionId'])
    .index('by_message', ['messageId'])
    .index('by_user', ['userId'])
    .index('by_organization_and_session', ['organizationId', 'sessionId'])
    .index('by_workspace_and_session', ['workspaceId', 'sessionId'])
    .index('by_folder', ['folderId'])
    .index('by_workspace_and_folder', ['workspaceId', 'folderId'])
    .index('by_workspace_and_type', ['workspaceId', 'type'])
    .index('by_favorite', ['workspaceId', 'isFavorite'])
    .index('by_pinned', ['workspaceId', 'isPinned'])
    .index('by_last_accessed', ['workspaceId', 'lastAccessedAt']),

  // 9. Folders
  folders: defineTable({
    organizationId: v.string(),
    workspaceId: v.id('workspaces'),
    userId: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    color: v.optional(v.string()),
    icon: v.optional(v.string()),
    parentId: v.optional(v.id('folders')),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_organization', ['organizationId'])
    .index('by_workspace', ['workspaceId'])
    .index('by_user', ['userId'])
    .index('by_parent', ['parentId'])
    .index('by_workspace_and_parent', ['workspaceId', 'parentId']),

  // 10. Tags
  tags: defineTable({
    organizationId: v.string(),
    workspaceId: v.id('workspaces'),
    userId: v.string(),
    name: v.string(),
    color: v.string(),
    count: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_organization', ['organizationId'])
    .index('by_workspace', ['workspaceId'])
    .index('by_user', ['userId'])
    .index('by_workspace_and_name', ['workspaceId', 'name']),

  // 11. Artifact Templates
  artifactTemplates: defineTable({
    organizationId: v.string(),
    workspaceId: v.id('workspaces'),
    userId: v.string(),
    name: v.string(),
    description: v.string(),
    icon: v.string(),
    type: v.union(v.literal('document'), v.literal('data-table'), v.literal('checklist'), v.literal('chart')),
    data: v.string(),
    category: v.string(),
    tags: v.array(v.string()),
    isSystem: v.boolean(),
    visibility: v.union(v.literal('private'), v.literal('workspace'), v.literal('organization')),
    usageCount: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_organization', ['organizationId'])
    .index('by_workspace', ['workspaceId'])
    .index('by_user', ['userId'])
    .index('by_type', ['workspaceId', 'type'])
    .index('by_category', ['workspaceId', 'category'])
    .index('by_system', ['isSystem'])
    .index('by_visibility', ['workspaceId', 'visibility']),

  // 12. Artifact Versions
  artifactVersions: defineTable({
    organizationId: v.string(),
    workspaceId: v.id('workspaces'),
    artifactId: v.id('artifacts'),
    version: v.number(),
    timestamp: v.number(),
    author: v.string(),
    changeDescription: v.string(),
    changeType: v.union(v.literal('created'), v.literal('edited'), v.literal('restored'), v.literal('auto-saved')),
    changedFields: v.optional(v.array(v.string())),
    previousVersionId: v.optional(v.id('artifactVersions')),
    data: v.string(),
    createdAt: v.number(),
  })
    .index('by_organization', ['organizationId'])
    .index('by_workspace', ['workspaceId'])
    .index('by_artifact', ['artifactId'])
    .index('by_artifact_and_version', ['artifactId', 'version'])
    .index('by_author', ['author'])
    .index('by_change_type', ['changeType'])
    .index('by_timestamp', ['timestamp']),

  // ============================================
  // TEMPLATES & PRESETS
  // ============================================
  
  // 13. Templates
  templates: defineTable({
    organizationId: v.string(),
    workspaceId: v.id('workspaces'),
    userId: v.string(),
    name: v.string(),
    description: v.string(),
    category: v.string(),
    agents: v.array(v.object({
      name: v.string(),
      roleId: v.string(),
      personaId: v.string(),
      frameworkId: v.string(),
      customInstructions: v.optional(v.string()),
    })),
    topic: v.optional(v.string()),
    conversationType: v.union(v.literal('debate'), v.literal('collaboration'), v.literal('analysis')),
    suggestedQuestions: v.optional(v.array(v.string())),
    isCustom: v.boolean(),
    popularity: v.optional(v.number()),
    usageCount: v.number(),
    lastUsed: v.optional(v.number()),
    tags: v.array(v.string()),
    author: v.optional(v.string()),
    visibility: v.union(v.literal('private'), v.literal('workspace'), v.literal('organization')),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_organization', ['organizationId'])
    .index('by_workspace', ['workspaceId'])
    .index('by_user', ['userId'])
    .index('by_category', ['organizationId', 'category'])
    .index('by_workspace_and_category', ['workspaceId', 'category'])
    .index('by_visibility', ['organizationId', 'visibility'])
    .index('by_workspace_and_visibility', ['workspaceId', 'visibility'])
    .index('by_usage', ['organizationId', 'usageCount'])
    .index('by_workspace_and_usage', ['workspaceId', 'usageCount']),

  // 14. Agent Team Presets
  agentTeamPresets: defineTable({
    organizationId: v.string(),
    workspaceId: v.id('workspaces'),
    userId: v.optional(v.string()),
    name: v.string(),
    description: v.string(),
    icon: v.string(),
    category: v.string(),
    agents: v.array(v.object({
      name: v.string(),
      roleId: v.string(),
      personaId: v.string(),
      frameworkId: v.string(),
      customInstructions: v.optional(v.string()),
    })),
    useCases: v.array(v.string()),
    isSystem: v.boolean(),
    usageCount: v.number(),
    lastUsed: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_organization', ['organizationId'])
    .index('by_workspace', ['workspaceId'])
    .index('by_user', ['userId'])
    .index('by_category', ['organizationId', 'category'])
    .index('by_system', ['organizationId', 'isSystem'])
    .index('by_usage', ['organizationId', 'usageCount']),

  // 15. Quick Start Scenarios
  quickStartScenarios: defineTable({
    organizationId: v.string(),
    workspaceId: v.id('workspaces'),
    userId: v.optional(v.string()),
    name: v.string(),
    description: v.string(),
    icon: v.string(),
    category: v.string(),
    presetId: v.id('agentTeamPresets'),
    suggestedTopic: v.string(),
    suggestedQuestions: v.array(v.string()),
    isSystem: v.boolean(),
    usageCount: v.number(),
    lastUsed: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_organization', ['organizationId'])
    .index('by_workspace', ['workspaceId'])
    .index('by_user', ['userId'])
    .index('by_preset', ['presetId'])
    .index('by_category', ['organizationId', 'category'])
    .index('by_system', ['organizationId', 'isSystem'])
    .index('by_usage', ['organizationId', 'usageCount']),

  // ============================================
  // BOOKMARKS & PROJECTS
  // ============================================
  
  // 16. Projects
  projects: defineTable({
    organizationId: v.string(),
    workspaceId: v.id('workspaces'),
    userId: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    sessionIds: v.array(v.id('sessions')),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_organization', ['organizationId'])
    .index('by_workspace', ['workspaceId'])
    .index('by_user', ['userId']),

  // 17. Bookmarks
  bookmarks: defineTable({
    organizationId: v.string(),
    workspaceId: v.id('workspaces'),
    userId: v.string(),
    messageId: v.id('messages'),
    sessionId: v.id('sessions'),
    title: v.string(),
    note: v.optional(v.string()),
    tags: v.array(v.string()),
    collectionId: v.optional(v.id('bookmarkCollections')),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_organization', ['organizationId'])
    .index('by_workspace', ['workspaceId'])
    .index('by_user', ['userId'])
    .index('by_message', ['messageId'])
    .index('by_session', ['sessionId'])
    .index('by_collection', ['collectionId']),

  // 18. Bookmark Collections
  bookmarkCollections: defineTable({
    organizationId: v.string(),
    workspaceId: v.id('workspaces'),
    userId: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    color: v.optional(v.string()),
    icon: v.optional(v.string()),
    bookmarkIds: v.array(v.id('bookmarks')),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_organization', ['organizationId'])
    .index('by_workspace', ['workspaceId'])
    .index('by_user', ['userId'])
    .index('by_name', ['name']),

  // ============================================
  // ANALYTICS & TRACKING
  // ============================================
  
  // 19. Activities
  activities: defineTable({
    organizationId: v.string(),
    workspaceId: v.optional(v.id('workspaces')),
    userId: v.string(),
    type: v.union(v.literal('debate'), v.literal('agent'), v.literal('export'), v.literal('template'), v.literal('artifact')),
    title: v.string(),
    description: v.string(),
    sessionId: v.optional(v.id('sessions')),
    agentId: v.optional(v.id('agents')),
    artifactId: v.optional(v.id('artifacts')),
    metadata: v.object({
      participants: v.optional(v.array(v.string())),
      messageCount: v.optional(v.number()),
      status: v.optional(v.string()),
    }),
    createdAt: v.number(),
  })
    .index('by_organization', ['organizationId'])
    .index('by_workspace', ['workspaceId'])
    .index('by_user', ['userId'])
    .index('by_type', ['type'])
    .index('by_created_at', ['createdAt'])
    .index('by_organization_and_created_at', ['organizationId', 'createdAt']),

  // 20. Session Comparisons
  sessionComparisons: defineTable({
    organizationId: v.string(),
    workspaceId: v.id('workspaces'),
    userId: v.string(),
    name: v.optional(v.string()),
    sessionIds: v.array(v.id('sessions')),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_organization', ['organizationId'])
    .index('by_workspace', ['workspaceId'])
    .index('by_user', ['userId'])
    .index('by_created_at', ['createdAt']),

  // 24. Collaboration Events
  collaborationEvents: defineTable({
    organizationId: v.string(),
    workspaceId: v.id('workspaces'),
    sessionId: v.id('sessions'),
    artifactId: v.id('artifacts'),
    userId: v.optional(v.string()),
    agentId: v.optional(v.id('agents')),
    eventType: v.union(v.literal('edit'), v.literal('comment'), v.literal('cursor'), v.literal('view'), v.literal('create'), v.literal('delete')),
    description: v.string(),
    metadata: v.object({
      field: v.optional(v.string()),
      oldValue: v.optional(v.string()),
      newValue: v.optional(v.string()),
      position: v.optional(v.object({
        x: v.number(),
        y: v.number(),
      })),
      color: v.optional(v.string()),
    }),
    timestamp: v.number(),
    createdAt: v.number(),
  })
    .index('by_organization', ['organizationId'])
    .index('by_workspace', ['workspaceId'])
    .index('by_session', ['sessionId'])
    .index('by_artifact', ['artifactId'])
    .index('by_user', ['userId'])
    .index('by_agent', ['agentId'])
    .index('by_organization_and_artifact', ['organizationId', 'artifactId'])
    .index('by_workspace_and_artifact', ['workspaceId', 'artifactId'])
    .index('by_session_and_artifact', ['sessionId', 'artifactId'])
    .index('by_timestamp', ['organizationId', 'timestamp']),

  // ============================================
  // PAYMENTS & BILLING
  // ============================================
  
  // 25. Subscriptions
  subscriptions: defineTable({
    organizationId: v.string(),
    polarSubscriptionId: v.string(),
    polarCustomerId: v.string(),
    polarProductId: v.string(),
    status: v.union(v.literal('active'), v.literal('canceled'), v.literal('past_due'), v.literal('trialing')),
    currentPeriodStart: v.number(),
    currentPeriodEnd: v.number(),
    cancelAtPeriodEnd: v.boolean(),
    metadata: v.object({
      planName: v.string(),
      features: v.array(v.string()),
    }),
    createdAt: v.number(),
    updatedAt: v.number(),
    canceledAt: v.optional(v.number()),
  })
    .index('by_organization', ['organizationId'])
    .index('by_polar_subscription_id', ['polarSubscriptionId'])
    .index('by_polar_product_id', ['polarProductId'])
    .index('by_status', ['status']),

  // 26. Credit Balances
  creditBalances: defineTable({
    organizationId: v.string(),
    totalCredits: v.number(),
    usedCredits: v.number(),
    remainingCredits: v.number(),
    subscriptionCredits: v.number(),
    purchasedCredits: v.number(),
    lastResetAt: v.number(),
    nextResetAt: v.number(),
    updatedAt: v.number(),
    metadata: v.object({
      resetFrequency: v.union(v.literal('monthly'), v.literal('never')),
    }),
  })
    .index('by_organization', ['organizationId']),

  // 27. Invoices
  invoices: defineTable({
    organizationId: v.string(),
    polarInvoiceId: v.string(),
    subscriptionId: v.optional(v.id('subscriptions')),
    invoiceNumber: v.string(),
    status: v.union(v.literal('draft'), v.literal('open'), v.literal('paid'), v.literal('void'), v.literal('uncollectible')),
    amount: v.number(),
    currency: v.string(),
    description: v.optional(v.string()),
    invoiceDate: v.number(),
    dueDate: v.optional(v.number()),
    paidAt: v.optional(v.number()),
    invoiceUrl: v.optional(v.string()),
    pdfUrl: v.optional(v.string()),
    metadata: v.object({
      planName: v.optional(v.string()),
      billingPeriod: v.optional(v.string()),
      items: v.optional(v.array(v.object({
        description: v.string(),
        quantity: v.number(),
        unitPrice: v.number(),
        amount: v.number(),
      }))),
    }),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_organization', ['organizationId'])
    .index('by_polar_invoice_id', ['polarInvoiceId'])
    .index('by_subscription', ['subscriptionId'])
    .index('by_status', ['status'])
    .index('by_invoice_date', ['invoiceDate'])
    .index('by_organization_and_status', ['organizationId', 'status']),

  // 28. Usage Tracking
  usageTracking: defineTable({
    organizationId: v.string(),
    workspaceId: v.optional(v.id('workspaces')),
    userId: v.string(),
    sessionId: v.optional(v.id('sessions')),
    messageId: v.optional(v.id('messages')),
    eventType: v.union(v.literal('token_usage'), v.literal('api_call'), v.literal('export'), v.literal('storage')),
    tokensUsed: v.number(),
    cost: v.optional(v.number()),
    metadata: v.object({
      inputTokens: v.number(),
      outputTokens: v.number(),
      cached: v.boolean(),
      model: v.optional(v.string()),
      provider: v.optional(v.string()),
      finishReason: v.optional(v.string()),
      toolCallsCount: v.optional(v.number()),
      latency: v.optional(v.number()),
    }),
    polarMeterId: v.optional(v.string()),
    createdAt: v.number(),
    billingPeriod: v.string(),
  })
    .index('by_organization', ['organizationId'])
    .index('by_workspace', ['workspaceId'])
    .index('by_user', ['userId'])
    .index('by_session', ['sessionId'])
    .index('by_message', ['messageId'])
    .index('by_event_type', ['eventType'])
    .index('by_created_at', ['createdAt']),

  // ============================================
  // MEMORY SYSTEM
  // ============================================
  
  // 29. Working Memory
  workingMemory: defineTable({
    organizationId: v.string(),
    workspaceId: v.string(),
    scope: v.union(v.literal('chat'), v.literal('user'), v.literal('workspace'), v.literal('organization')),
    chatId: v.optional(v.id('sessions')),
    userId: v.optional(v.string()),
    title: v.string(),
    category: v.string(),
    content: v.string(),
    tags: v.array(v.string()),
    source: v.union(v.literal('manual'), v.literal('document'), v.literal('url'), v.literal('agent'), v.literal('chat'), v.literal('artifact'), v.literal('debate_result')),
    sourceUrl: v.optional(v.string()),
    sourceDocument: v.optional(v.string()),
    sourceChatId: v.optional(v.id('sessions')),
    sourceArtifactId: v.optional(v.string()),
    sourceDebateId: v.optional(v.id('sessions')),
    createdBy: v.string(),
    usageCount: v.number(),
    lastUsedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_organization', ['organizationId'])
    .index('by_workspace', ['workspaceId'])
    .index('by_scope_chat', ['scope', 'chatId'])
    .index('by_scope_user', ['scope', 'userId'])
    .index('by_scope_workspace', ['scope', 'workspaceId'])
    .index('by_scope_organization', ['scope', 'organizationId'])
    .index('by_organization_and_workspace', ['organizationId', 'workspaceId'])
    .index('by_category', ['category'])
    .index('by_source', ['source'])
    .index('by_created_by', ['createdBy'])
    .index('by_source_chat', ['sourceChatId'])
    .index('by_source_artifact', ['sourceArtifactId'])
    .index('by_source_debate', ['sourceDebateId']),
})
\`\`\`

**Data Access Patterns**:

1. **Organization-scoped queries** (most common):
   \`\`\`typescript
   // Always filter by organizationId
   const sessions = await ctx.db
     .query("sessions")
     .withIndex("by_organization", (q) => q.eq("organizationId", orgId))
     .collect()
   \`\`\`

2. **User-scoped queries**:
   \`\`\`typescript
   // Get user's workspaces
   const memberships = await ctx.db
     .query("workspaceMemberships")
     .withIndex("by_user", (q) => q.eq("userId", userId))
     .collect()
   \`\`\`

3. **Cross-organization queries** (admin only):
   \`\`\`typescript
   // Global analytics, admin dashboards
   const allOrgs = await ctx.db.query("organizations").collect()
   \`\`\`

**Files to Create**:
- `docs/implementation/ToDo/PHASE_4_SCHEMA_DESIGN.md` - Detailed schema documentation
- `docs/implementation/ToDo/PHASE_4_DATA_ACCESS_PATTERNS.md` - Query patterns and examples

**Success Criteria**:
- [ ] Complete schema designed and documented
- [ ] Multi-tenant isolation strategy validated
- [ ] All data access patterns identified
- [ ] Indexes planned for efficient queries
- [ ] Schema reviewed and approved
- [ ] No potential data leakage identified

---

#### Task 0.3: Integration Architecture Planning

**Estimated Time**: 1 hour

**Requirements**:
- Plan Clerk + Convex integration architecture
- Plan Polar + Convex integration architecture
- Design webhook handling for Clerk and Polar events
- Plan data synchronization strategies
- Document integration flows and error handling

**Integration Architecture**:

**1. Clerk + Convex Integration**:

\`\`\`typescript
// convex/auth.config.js
export default {
  providers: [
    {
      domain: process.env.CLERK_FRONTEND_API_URL,
      applicationID: "convex",
    },
  ],
}
\`\`\`

\`\`\`typescript
// app/providers.tsx
import { ConvexProviderWithClerk } from "convex/react-clerk"
import { ConvexReactClient } from "convex/react"
import { ClerkProvider, useAuth } from "@clerk/nextjs"

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export function Providers({ children }) {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}
\`\`\`

**2. Polar + Convex Integration**:

\`\`\`typescript
// app/api/webhooks/polar/route.ts
export async function POST(req: Request) {
  const event = await req.json()
  
  // Verify webhook signature
  // Process event and update Convex
  
  return new Response("OK", { status: 200 })
}
\`\`\`

**3. Webhook Event Handling**:

- **Clerk Webhooks**: Sync organization and user data
  - `organization.created` → Create organization in Convex
  - `organization.updated` → Update organization in Convex
  - `organizationMembership.created` → Create membership in Convex
  - `user.created` → Create user in Convex
  - `user.updated` → Update user in Convex

- **Polar Webhooks**: Sync subscription and payment data
  - `subscription.created` → Update organization subscription
  - `subscription.updated` → Update subscription status
  - `payment.succeeded` → Record payment transaction
  - `payment.failed` → Handle failed payment

**4. Data Synchronization Strategy**:

- **Real-time sync**: Webhook events processed immediately
- **Fallback sync**: Periodic sync job for missed events
- **Conflict resolution**: Last-write-wins with timestamp comparison
- **Error handling**: Retry logic with exponential backoff

**Files to Create**:
- `docs/implementation/ToDo/PHASE_4_INTEGRATION_ARCHITECTURE.md` - Integration flows and diagrams
- `docs/implementation/ToDo/PHASE_4_WEBHOOK_HANDLING.md` - Webhook event handling documentation

**Success Criteria**:
- [ ] Integration architecture documented
- [ ] Webhook handling strategy defined
- [ ] Data synchronization strategy validated
- [ ] Error handling and retry logic planned
- [ ] Security considerations documented

---

### Phase 1: Convex Setup & Configuration

**Timeline**: 3-4 hours  
**Status**: ⬜ Not Started

**IMPORTANT**: Phase 0 must be completed before starting Phase 1.

#### Task 1.1: Initialize Convex Project

**Estimated Time**: 30 minutes

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

#### Task 1.2: Implement Database Schema

**Estimated Time**: 1-2 hours

**Requirements**:
- Implement the comprehensive multi-tenant schema designed in Phase 0
- Deploy schema to Convex
- Validate schema with test data
- Set up proper indexes for efficient queries

**Implementation**:

Use the schema designed in Phase 0 (Task 0.2).

**Files to Create**:
- `convex/schema.ts` - Complete multi-tenant database schema

**Success Criteria**:
- [ ] Schema implemented and deployed
- [ ] All indexes created
- [ ] Test data validates schema
- [ ] No schema errors in Convex dashboard

---

#### Task 1.3: Configure Clerk + Convex Integration

**Estimated Time**: 1 hour

**Requirements**:
- Create JWT template in Clerk Dashboard
- Configure Convex with Clerk authentication
- Set up ConvexProviderWithClerk in a Client Component
- Test authentication flow


**Implementation**:

**Official Documentation References**:
- [Convex + Clerk Integration](https://docs.convex.dev/auth/clerk)
- [Clerk + Convex Integration Guide](https://clerk.com/docs/guides/development/integrations/databases/convex)
- [Official Next.js + Clerk Template](https://github.com/get-convex/template-nextjs-clerk)
- [Official React + Clerk Template](https://github.com/get-convex/template-react-vite-clerk)

**Step 1: Create JWT Template in Clerk Dashboard**

1. Navigate to [JWT Templates](https://dashboard.clerk.com/last-active?path=jwt-templates) in Clerk Dashboard
2. Click **New template**
3. Select **Convex** from the template list
4. **IMPORTANT**: Do NOT rename the JWT token. It MUST be called `convex`
5. Copy and save the **Issuer** URL (Frontend API URL)
   - Dev format: `https://verb-noun-00.clerk.accounts.dev`
   - Prod format: `https://clerk.<your-domain>.com`

**Step 2: Add Custom Claims (Optional but Recommended)**

In the JWT template **Claims** section, add these custom claims for multi-tenancy:

\`\`\`json
{
  "org_id": "{{org.id}}",
  "org_role": "{{org.role}}"
}
\`\`\`

These claims will be available in Convex functions via `ctx.auth.getUserIdentity()`.

**Step 3: Configure Convex Auth**

Create `convex/auth.config.ts` (TypeScript, not .js):

\`\`\`typescript
// convex/auth.config.ts
export default {
  providers: [
    {
      // Use environment variable for flexibility across dev/prod
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN,
      applicationID: "convex",
    },
  ],
}
\`\`\`

**Environment Variables**:
\`\`\`bash
# .env.local
CLERK_JWT_ISSUER_DOMAIN=https://verb-noun-00.clerk.accounts.dev
# OR
CLERK_FRONTEND_API_URL=https://verb-noun-00.clerk.accounts.dev
\`\`\`

**Step 4: Deploy Convex Configuration**

Run `npx convex dev` to sync the auth configuration to your backend:

\`\`\`bash
npx convex dev
\`\`\`

**Step 5: Set Up ConvexProviderWithClerk (Client Component)**

**IMPORTANT**: `ConvexProviderWithClerk` must be in a Client Component because it uses React hooks. In Next.js, create a separate `providers.tsx` file:

\`\`\`typescript
// app/providers.tsx
"use client"

import { ConvexProviderWithClerk } from "convex/react-clerk"
import { ConvexReactClient } from "convex/react"
import { ClerkProvider, useAuth } from "@clerk/nextjs"

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}
\`\`\`

Then use it in your root layout:

\`\`\`typescript
// app/layout.tsx
import { Providers } from "./providers"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
\`\`\`

**Step 6: Use Convex Auth Helpers (Not Clerk's)**

**IMPORTANT**: Use Convex's `useConvexAuth()` hook instead of Clerk's `useAuth()` to check authentication state. This ensures the browser has fetched and validated the auth token needed for Convex backend requests.

\`\`\`typescript
// components/MyComponent.tsx
"use client"

import { useConvexAuth } from "convex/react"
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react"

export function MyComponent() {
  const { isAuthenticated, isLoading } = useConvexAuth()
  
  return (
    <>
      <AuthLoading>
        <div>Loading...</div>
      </AuthLoading>
      
      <Authenticated>
        <div>You are signed in!</div>
      </Authenticated>
      
      <Unauthenticated>
        <div>Please sign in</div>
      </Unauthenticated>
    </>
  )
}
\`\`\`

**Step 7: Access Auth in Convex Functions**

\`\`\`typescript
// convex/sessions.ts
import { query, mutation } from "./_generated/server"
import { v } from "convex/values"

export const createSession = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Get authenticated user identity
    const identity = await ctx.auth.getUserIdentity()
    
    if (!identity) {
      throw new Error("Unauthenticated")
    }
    
    // Access custom claims
    const userId = identity.subject // Clerk user ID
    const orgId = identity.org_id // Custom claim
    const orgRole = identity.org_role // Custom claim
    
    // Ensure user belongs to an organization
    if (!orgId) {
      throw new Error("No active organization")
    }
    
    const now = Date.now()
    
    const sessionId = await ctx.db.insert("sessions", {
      organizationId: orgId, // Tenant isolation
      createdBy: userId,
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
        participants: [userId],
      },
    })
    
    return sessionId
  },
})

// Query with organization isolation
export const getSessions = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    
    if (!identity) {
      throw new Error("Unauthenticated")
    }
    
    const orgId = identity.org_id
    
    if (!orgId) {
      throw new Error("No active organization")
    }
    
    const limit = args.limit ?? 20
    
    // ALWAYS filter by organizationId for tenant isolation
    const sessions = await ctx.db
      .query("sessions")
      .withIndex("by_organization", (q) => q.eq("organizationId", orgId))
      .order("desc")
      .take(limit)
    
    return sessions
  },
})
\`\`\`

**Files to Create/Modify**:
- `convex/auth.config.ts` - Clerk authentication configuration (TypeScript)
- `app/providers.tsx` - Convex + Clerk providers (Client Component)
- `app/layout.tsx` - Use Providers component

**What We're Using Out-of-the-Box**:
- ✅ Clerk's JWT template for Convex (pre-configured)
- ✅ `ConvexProviderWithClerk` (official integration)
- ✅ `useConvexAuth()` hook (official auth state)
- ✅ `Authenticated`, `Unauthenticated`, `AuthLoading` components (official helpers)
- ✅ `ctx.auth.getUserIdentity()` in Convex functions (official API)

**What We're Building Custom**:
- Custom JWT claims for multi-tenancy (`org_id`, `org_role`)
- Organization-scoped queries with tenant isolation
- Permission checks based on org roles

**Success Criteria**:
- [ ] JWT template created in Clerk (named "convex")
- [ ] Custom claims added (`org_id`, `org_role`)
- [ ] `convex/auth.config.ts` created and deployed
- [ ] `app/providers.tsx` created with ConvexProviderWithClerk
- [ ] `useConvexAuth()` hook working correctly
- [ ] Authentication working in Convex functions
- [ ] Organization ID available in all authenticated requests

---

#### Task 1.4: Configure Polar Webhook Integration

**Estimated Time**: 1 hour

**Requirements**:
- Create webhook endpoint for Polar
- Implement webhook signature verification
- Set up event processing and error handling
- Configure webhook URL in Polar dashboard

**Implementation**:

\`\`\`typescript
// app/api/webhooks/polar/route.ts
import { headers } from "next/headers"

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.POLAR_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error("Missing POLAR_WEBHOOK_SECRET")
  }

  // Verify Polar webhook signature
  const signature = headers().get("polar-signature")
  const body = await req.text()

  // Verify signature (Polar-specific verification)
  // TODO: Implement Polar's signature verification logic here
  // Example (conceptual):
  // const isValid = await verifyPolarSignature(body, signature, WEBHOOK_SECRET);
  // if (!isValid) {
  //   return new Response("Invalid signature", { status: 400 });
  // }

  const event = JSON.parse(body)

  // Process event
  if (event.type === "subscription.created") {
    // Update organization subscription in Convex
    // await updateSubscription(event.data)
  } else if (event.type === "payment.succeeded") {
    // Record payment in Convex
    // await recordPayment(event.data)
  }
  // ... handle other events

  return new Response("OK", { status: 200 })
}
\`\`\`

**Files to Create**:
- `app/api/webhooks/polar/route.ts` - Polar webhook handler
- `lib/webhooks/polar-handlers.ts` - Polar event processing functions (to be implemented)

**Success Criteria**:
- [ ] Polar webhook endpoint created
- [ ] Signature verification (to be implemented) working
- [ ] Event processing logic planned
- [ ] Webhook URL configured in Polar dashboard

---

### Phase 2: Core Queries & Mutations

**Timeline**: 4-6 hours  
**Status**: ⬜ Not Started

#### Task 2.1: Session Management Functions

**Estimated Time**: 1-2 hours

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

**Estimated Time**: 1-2 hours

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
    userId: v.optional(v.id("users")), // User who sent the message
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
- Real-time message updates for instant message delivery
- Optimistic updates for user messages

**Success Criteria**:
- [ ] Message queries working
- [ ] Message mutations working
- [ ] Real-time message updates functional
- [ ] Threading and reactions working

---

#### Task 2.3: Agent & Artifact Functions

**Estimated Time**: 1-2 hours

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

**Timeline**: 3-4 hours  
**Status**: ⬜ Not Started

#### Task 3.1: LocalStorage to Convex Migration

**Estimated Time**: 1-2 hours

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

**Estimated Time**: 1-2 hours

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

#### Task 3.3: Testing & Validation

**Estimated Time**: 1 hour

**Requirements**:
- Thoroughly test migration logic
- Verify offline functionality in various network conditions
- Ensure data integrity after syncs

**Implementation**:
Refer to the Testing Checklist and Mobile-First Implementation Verification sections for detailed test cases.

**Success Criteria**:
- [ ] Migration completes without data loss or errors
- [ ] Offline mode functions as expected
- [ ] Data remains consistent across online and offline states

---

### Phase 4: File Storage & Optimization

**Timeline**: 2-3 hours  
**Status**: ⬜ Not Started

#### Task 4.1: File Upload for Artifacts

**Estimated Time**: 1-2 hours

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

**Estimated Time**: 1 hour

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

convex/auth.config.ts               # Clerk authentication configuration (TypeScript)

app/
├── providers.tsx                   # Convex + Clerk providers (Client Component)
├── layout.tsx                      # Root layout with providers
└── api/
    └── webhooks/
        ├── clerk/
        │   └── route.ts            # Clerk webhook handler (from Task 1.4)
        └── polar/
            └── route.ts            # Polar webhook handler

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

**Last Updated**: October 11, 2025  
**Status**: Phase 0 In Progress (Task 0.1 ✅ Complete, Task 0.2 In Progress)  
**Next Steps**: Complete Task 0.2 - Database Schema Design
Implementation  
**Next Steps**: Complete Task 0.2 - Database Schema Design

Implementation  
**Next Steps**: Complete Task 0.2 - Database Schema Design
 Schema Design
Implementation  
**Next Steps**: Complete Task 0.2 - Database Schema Design

Implementation  
**Next Steps**: Complete Task 0.2 - Database Schema Design

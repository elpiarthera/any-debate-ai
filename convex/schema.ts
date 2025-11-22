import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  // 1. Organizations (Synced from Clerk)
  organizations: defineTable({
    clerkOrganizationId: v.string(), // Unique Clerk ID (used for lookup)
    name: v.string(),
    slug: v.optional(v.string()),

    // Usage Aggregates (Denormalized)
    totalSessions: v.number(),
    totalMessages: v.number(),
    totalTokensUsed: v.number(),

    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_clerk_id", ["clerkOrganizationId"]),

  // 2. Workspaces
  workspaces: defineTable({
    organizationId: v.string(), // Links to organizations.clerkOrganizationId
    name: v.string(),
    description: v.optional(v.string()),
    slug: v.optional(v.string()),

    // Settings
    settings: v.object({
      defaultModel: v.optional(v.string()),
      autoSave: v.boolean(),
      exportFormat: v.union(v.literal("pdf"), v.literal("markdown"), v.literal("json")),
    }),

    isDefault: v.boolean(),

    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_organization", ["organizationId"])
    .index("by_org_and_slug", ["organizationId", "slug"]),

  // 3. Workspace Memberships
  workspaceMemberships: defineTable({
    organizationId: v.string(),
    workspaceId: v.id("workspaces"),
    userId: v.string(), // Links to users.clerkUserId
    role: v.union(v.literal("admin"), v.literal("member")),

    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_workspace", ["workspaceId"])
    .index("by_user", ["userId"])
    .index("by_workspace_and_user", ["workspaceId", "userId"])
    .index("by_org_and_user", ["organizationId", "userId"]),

  // 4. Users (Synced from Clerk)
  users: defineTable({
    clerkUserId: v.string(), // Unique Clerk ID

    // Preferences
    preferences: v.object({
      theme: v.union(v.literal("light"), v.literal("dark"), v.literal("system")),
      defaultModel: v.string(),
      language: v.string(),
      notifications: v.boolean(),
      defaultAgents: v.array(v.string()), // Agent IDs
    }),

    // Activity
    totalSessions: v.number(),
    lastActiveAt: v.number(),

    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_clerk_id", ["clerkUserId"]),

  // 5. Roles (Agent Configuration)
  roles: defineTable({
    id: v.string(), // Unique string ID (e.g., "software-engineer")
    name: v.string(),
    category: v.string(),
    description: v.string(),
    expertise: v.array(v.string()),
    systemPrompt: v.string(),
    icon: v.string(),

    // Metadata
    isSystem: v.boolean(),
    isActive: v.boolean(),

    // Tenancy (Optional for system roles)
    organizationId: v.optional(v.string()),
    workspaceId: v.optional(v.id("workspaces")),

    usageCount: v.number(),

    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_id", ["id"])
    .index("by_category", ["category"])
    .index("by_org", ["organizationId"])
    .index("by_workspace", ["workspaceId"]),

  // 6. Personas (Agent Configuration)
  personas: defineTable({
    id: v.string(), // Unique string ID (e.g., "professional")
    name: v.string(),
    description: v.string(),
    traits: v.array(v.string()),
    communicationStyle: v.string(),
    decisionMaking: v.string(),
    systemPromptModifier: v.string(),
    icon: v.string(),

    // Metadata
    isSystem: v.boolean(),
    isActive: v.boolean(),

    // Tenancy
    organizationId: v.optional(v.string()),
    workspaceId: v.optional(v.id("workspaces")),

    usageCount: v.number(),

    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_id", ["id"])
    .index("by_org", ["organizationId"])
    .index("by_workspace", ["workspaceId"]),

  // 7. Frameworks (Agent Configuration)
  frameworks: defineTable({
    id: v.string(), // Unique string ID (e.g., "chain-of-thought")
    name: v.string(),
    description: v.string(),
    methodology: v.string(),
    bestFor: v.array(v.string()),
    steps: v.array(v.string()),
    systemPromptModifier: v.string(),
    icon: v.string(),

    // Metadata
    isSystem: v.boolean(),
    isActive: v.boolean(),

    // Tenancy
    organizationId: v.optional(v.string()),
    workspaceId: v.optional(v.id("workspaces")),

    usageCount: v.number(),

    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_id", ["id"])
    .index("by_org", ["organizationId"])
    .index("by_workspace", ["workspaceId"]),

  // 8. Agents (Configured AI Agents)
  agents: defineTable({
    organizationId: v.string(),
    workspaceId: v.id("workspaces"),
    userId: v.string(),

    // Metadata
    name: v.string(),
    description: v.optional(v.string()),

    // Configuration References
    roleId: v.string(),
    personaId: v.string(),
    frameworkId: v.string(),

    // Denormalized Display Names
    role: v.string(),
    persona: v.string(),
    framework: v.string(),

    // AI Config
    model: v.string(),
    provider: v.string(),

    // Prompting
    systemPrompt: v.string(),
    customInstructions: v.optional(v.string()),

    // Parameters
    parameters: v.object({
      temperature: v.optional(v.number()),
      maxTokens: v.optional(v.number()),
      topP: v.optional(v.number()),
    }),

    // Status & Tracking
    usageCount: v.number(),
    isFavorite: v.boolean(),
    isTemplate: v.boolean(),
    isActive: v.boolean(),
    visibility: v.union(v.literal("private"), v.literal("workspace"), v.literal("organization")),

    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_org", ["organizationId"])
    .index("by_workspace", ["workspaceId"])
    .index("by_user", ["userId"])
    .index("by_template", ["isTemplate"])
    .index("by_visibility", ["workspaceId", "visibility"]),

  // 9. Sessions (Chat Sessions)
  sessions: defineTable({
    organizationId: v.string(),
    workspaceId: v.id("workspaces"),
    userId: v.string(),

    // Participants
    agentIds: v.array(v.string()), // IDs of participating agents

    // Metadata
    title: v.string(),
    mode: v.union(v.literal("compare"), v.literal("debate"), v.literal("auto-debate")),
    status: v.union(v.literal("active"), v.literal("completed"), v.literal("archived")),

    // Mode Configuration
    config: v.object({
      rounds: v.optional(v.number()),
      currentRound: v.optional(v.number()),
      speakingOrder: v.optional(v.array(v.string())),
      autoDebateStatus: v.optional(
        v.union(v.literal("setup"), v.literal("running"), v.literal("paused"), v.literal("completed")),
      ),
    }),

    // Extra Metadata
    metadata: v.object({
      tags: v.array(v.string()),
      description: v.optional(v.string()),
      visibility: v.union(v.literal("private"), v.literal("workspace"), v.literal("organization")),
    }),

    // Stats
    messageCount: v.number(),
    tokensUsed: v.number(),
    duration: v.number(),
    lastActivityAt: v.number(),

    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_org", ["organizationId"])
    .index("by_workspace", ["workspaceId"])
    .index("by_user", ["userId"])
    .index("by_status", ["organizationId", "status"]),

  // 10. Messages
  messages: defineTable({
    organizationId: v.string(),
    workspaceId: v.id("workspaces"),
    sessionId: v.id("sessions"),
    userId: v.string(),

    // Sender
    agentId: v.optional(v.id("agents")), // If sent by AI
    role: v.union(v.literal("user"), v.literal("assistant"), v.literal("system")),

    // Content
    content: v.string(),

    // AI Metadata
    metadata: v.object({
      model: v.optional(v.string()),
      temperature: v.optional(v.number()),
      tokens: v.optional(v.number()),
      latency: v.optional(v.number()),
    }),

    // Threading
    parentMessageId: v.optional(v.id("messages")),
    threadId: v.optional(v.string()),
    replyCount: v.optional(v.number()),
    hasReplies: v.optional(v.boolean()),

    // State
    bookmarked: v.optional(v.boolean()),
    isStreaming: v.optional(v.boolean()),

    // Reactions
    reactions: v.optional(
      v.array(
        v.object({
          id: v.string(),
          emoji: v.string(),
          label: v.string(),
          count: v.number(),
          users: v.array(v.string()),
          timestamp: v.number(),
        }),
      ),
    ),

    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_session", ["sessionId"])
    .index("by_org", ["organizationId"])
    .index("by_thread", ["threadId"]),

  // 11. Artifacts
  artifacts: defineTable({
    organizationId: v.string(),
    workspaceId: v.id("workspaces"),
    sessionId: v.id("sessions"),
    messageId: v.optional(v.id("messages")),
    userId: v.string(),

    // Content
    title: v.string(),
    description: v.optional(v.string()),
    type: v.union(
      v.literal("document"),
      v.literal("data-table"),
      v.literal("checklist"),
      v.literal("chart"),
      v.literal("code"),
      v.literal("image"),
      v.literal("pdf"),
      v.literal("export"),
    ),
    content: v.optional(v.string()), // Text content or JSON string

    // Organization
    folderId: v.optional(v.id("folders")),
    tags: v.array(v.string()),

    // State
    isFavorite: v.boolean(),
    isPinned: v.boolean(),
    lastAccessedAt: v.number(),

    // Collaboration
    collaborators: v.optional(v.array(v.string())),
    reactions: v.optional(
      v.object({
        likes: v.number(),
        dislikes: v.number(),
      }),
    ),

    // Storage
    fileId: v.optional(v.string()), // Storage ID

    // Metadata
    metadata: v.object({
      size: v.optional(v.number()),
      version: v.optional(v.number()),
      exports: v.optional(
        v.array(
          v.object({
            format: v.string(),
            url: v.string(),
            timestamp: v.number(),
          }),
        ),
      ),
      author: v.optional(v.string()),
      tags: v.optional(v.array(v.string())),
      mimeType: v.optional(v.string()),
      wordCount: v.optional(v.number()),
      rowCount: v.optional(v.number()),
      itemCount: v.optional(v.number()),
    }),

    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_org", ["organizationId"])
    .index("by_workspace", ["workspaceId"])
    .index("by_session", ["sessionId"])
    .index("by_user", ["userId"])
    .index("by_folder", ["folderId"]),

  // 12. Artifact Templates
  artifactTemplates: defineTable({
    organizationId: v.string(),
    workspaceId: v.id("workspaces"),
    userId: v.string(),

    name: v.string(),
    description: v.string(),
    icon: v.string(),
    type: v.union(v.literal("document"), v.literal("data-table"), v.literal("checklist"), v.literal("chart")),
    data: v.string(), // JSON stringified

    category: v.string(),
    tags: v.array(v.string()),
    isSystem: v.boolean(),
    visibility: v.union(v.literal("private"), v.literal("workspace"), v.literal("organization")),
    usageCount: v.number(),

    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_org", ["organizationId"])
    .index("by_workspace", ["workspaceId"])
    .index("by_type", ["workspaceId", "type"])
    .index("by_system", ["isSystem"]),

  // 13. Artifact Versions
  artifactVersions: defineTable({
    organizationId: v.string(),
    workspaceId: v.id("workspaces"),
    artifactId: v.id("artifacts"),

    version: v.number(),
    timestamp: v.number(),
    author: v.string(),

    changeDescription: v.string(),
    changeType: v.union(v.literal("created"), v.literal("edited"), v.literal("restored"), v.literal("auto-saved")),
    changedFields: v.optional(v.array(v.string())),

    previousVersionId: v.optional(v.id("artifactVersions")),
    data: v.string(), // Snapshot

    createdAt: v.number(),
  })
    .index("by_artifact", ["artifactId"])
    .index("by_artifact_version", ["artifactId", "version"]),

  // 14. Folders
  folders: defineTable({
    organizationId: v.string(),
    workspaceId: v.id("workspaces"),
    userId: v.string(),

    name: v.string(),
    description: v.optional(v.string()),
    color: v.optional(v.string()),
    icon: v.optional(v.string()),

    parentId: v.optional(v.id("folders")),

    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_workspace", ["workspaceId"])
    .index("by_parent", ["parentId"]),

  // 15. Tags
  tags: defineTable({
    organizationId: v.string(),
    workspaceId: v.id("workspaces"),
    userId: v.string(),

    name: v.string(),
    color: v.string(),
    count: v.number(),

    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_workspace", ["workspaceId"])
    .index("by_name", ["workspaceId", "name"]),

  // 16. Templates (Debate Templates)
  templates: defineTable({
    organizationId: v.string(),
    workspaceId: v.id("workspaces"),
    userId: v.string(),

    name: v.string(),
    description: v.string(),
    category: v.string(),

    // Config
    agents: v.array(
      v.object({
        name: v.string(),
        roleId: v.string(),
        personaId: v.string(),
        frameworkId: v.string(),
        customInstructions: v.optional(v.string()),
      }),
    ),

    topic: v.optional(v.string()),
    conversationType: v.union(v.literal("debate"), v.literal("collaboration"), v.literal("analysis")),
    suggestedQuestions: v.optional(v.array(v.string())),

    // Metadata
    isCustom: v.boolean(),
    popularity: v.optional(v.number()),
    usageCount: v.number(),
    lastUsed: v.optional(v.number()),
    tags: v.array(v.string()),
    author: v.optional(v.string()),
    visibility: v.union(v.literal("private"), v.literal("workspace"), v.literal("organization")),

    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_workspace", ["workspaceId"])
    .index("by_category", ["workspaceId", "category"])
    .index("by_visibility", ["workspaceId", "visibility"]),

  // 17. Projects
  projects: defineTable({
    organizationId: v.string(),
    workspaceId: v.id("workspaces"),
    userId: v.string(),

    name: v.string(),
    description: v.optional(v.string()),
    sessionIds: v.array(v.id("sessions")),

    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_workspace", ["workspaceId"]),

  // 18. Bookmarks
  bookmarks: defineTable({
    organizationId: v.string(),
    workspaceId: v.id("workspaces"),
    userId: v.string(),

    messageId: v.id("messages"),
    sessionId: v.id("sessions"),

    title: v.string(),
    note: v.optional(v.string()),
    tags: v.array(v.string()),
    collectionId: v.optional(v.id("bookmarkCollections")),

    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_workspace", ["workspaceId"])
    .index("by_user", ["userId"])
    .index("by_collection", ["collectionId"]),

  // 19. Bookmark Collections
  bookmarkCollections: defineTable({
    organizationId: v.string(),
    workspaceId: v.id("workspaces"),
    userId: v.string(),

    name: v.string(),
    description: v.optional(v.string()),
    color: v.optional(v.string()),
    icon: v.optional(v.string()),
    bookmarkIds: v.array(v.id("bookmarks")),

    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_workspace", ["workspaceId"])
    .index("by_user", ["userId"]),

  // 20. Activities
  activities: defineTable({
    organizationId: v.string(),
    workspaceId: v.id("workspaces"),
    userId: v.string(),

    type: v.union(
      v.literal("debate"),
      v.literal("export"),
      v.literal("agent"),
      v.literal("template"),
      v.literal("artifact"),
    ),
    title: v.string(),
    description: v.string(),
    metadata: v.optional(v.any()), // Flexible metadata

    createdAt: v.number(),
  })
    .index("by_workspace", ["workspaceId"])
    .index("by_user", ["userId"])
    .index("by_recent", ["workspaceId", "createdAt"]),

  // 21. Subscriptions
  subscriptions: defineTable({
    organizationId: v.string(),
    polarSubscriptionId: v.string(),
    polarCustomerId: v.string(),
    polarProductId: v.string(),

    status: v.union(v.literal("active"), v.literal("canceled"), v.literal("past_due"), v.literal("trialing")),

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
    .index("by_org", ["organizationId"])
    .index("by_polar_id", ["polarSubscriptionId"]),

  // 22. Credit Balances
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
      resetFrequency: v.union(v.literal("monthly"), v.literal("never")),
    }),
  }).index("by_org", ["organizationId"]),

  // 23. Invoices
  invoices: defineTable({
    organizationId: v.string(),
    polarInvoiceId: v.string(),
    subscriptionId: v.optional(v.id("subscriptions")),
    invoiceNumber: v.string(),

    status: v.union(
      v.literal("draft"),
      v.literal("open"),
      v.literal("paid"),
      v.literal("void"),
      v.literal("uncollectible"),
    ),

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
      items: v.optional(
        v.array(
          v.object({
            description: v.string(),
            quantity: v.number(),
            unitPrice: v.number(),
            amount: v.number(),
          }),
        ),
      ),
    }),

    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_org", ["organizationId"])
    .index("by_polar_id", ["polarInvoiceId"]),

  // 24. Usage Tracking
  usageTracking: defineTable({
    organizationId: v.string(),
    workspaceId: v.optional(v.id("workspaces")),
    userId: v.string(),

    sessionId: v.optional(v.id("sessions")),
    messageId: v.optional(v.id("messages")),

    eventType: v.union(v.literal("token_usage"), v.literal("api_call"), v.literal("export"), v.literal("storage")),

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
    billingPeriod: v.string(), // "YYYY-MM"
  })
    .index("by_org", ["organizationId"])
    .index("by_created_at", ["createdAt"])
    .index("by_billing_period", ["organizationId", "billingPeriod"]),

  // 25. Invitations (Workspace Invites)
  invitations: defineTable({
    organizationId: v.string(),
    workspaceId: v.id("workspaces"),

    email: v.string(),
    role: v.union(v.literal("admin"), v.literal("member")),

    inviterId: v.string(), // userId
    status: v.union(v.literal("pending"), v.literal("accepted"), v.literal("revoked")),

    token: v.string(), // Unique invitation token

    expiresAt: v.number(),
    createdAt: v.number(),
    acceptedAt: v.optional(v.number()),
  })
    .index("by_email", ["email"])
    .index("by_token", ["token"])
    .index("by_workspace", ["workspaceId"]),

  // 26. API Keys
  apiKeys: defineTable({
    organizationId: v.string(),
    workspaceId: v.id("workspaces"),
    userId: v.string(),

    name: v.string(),
    keyPreview: v.string(), // First/Last chars
    secretHash: v.string(), // Hashed key

    scopes: v.array(v.string()), // e.g. ["read:messages", "write:messages"]

    lastUsedAt: v.optional(v.number()),
    expiresAt: v.optional(v.number()),

    createdAt: v.number(),
    revokedAt: v.optional(v.number()),
  })
    .index("by_workspace", ["workspaceId"])
    .index("by_user", ["userId"])
    .index("by_hash", ["secretHash"]),
})

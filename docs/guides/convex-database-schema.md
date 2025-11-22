# Convex Database Schema Documentation

**Version**: 2.0  
**Last Updated**: October 11, 2025  
**Status**: Design Phase  
**Database**: Convex (Real-time, serverless)

---

## 📊 Database Schema Tree

\`\`\`
AnyDebate Database (Convex)
│
├── 🏢 organizations
│   ├── _id: Id<"organizations">
│   ├── clerkOrganizationId: string (unique, indexed)
│   ├── name: string
│   ├── slug: string (optional)
│   ├── totalSessions: number
│   ├── totalMessages: number
│   ├── totalTokensUsed: number
│   ├── createdAt: number
│   └── updatedAt: number
│   │
│   ├──< 🏗️ workspaces (1:N)
│   │   ├── _id: Id<"workspaces">
│   │   ├── organizationId: string (indexed) → organizations.clerkOrganizationId
│   │   ├── name: string
│   │   ├── description: string (optional)
│   │   ├── slug: string (optional)
│   │   ├── settings: object
│   │   │   ├── defaultModel: string (optional)
│   │   │   ├── autoSave: boolean
│   │   │   └── exportFormat: "pdf" | "markdown" | "json"
│   │   ├── isDefault: boolean
│   │   ├── createdAt: number
│   │   └── updatedAt: number
│   │   │
│   │   ├──< 👥 workspaceMemberships (1:N)
│   │   │   ├── _id: Id<"workspaceMemberships">
│   │   │   ├── organizationId: string (indexed) → organizations.clerkOrganizationId
│   │   │   ├── workspaceId: string (indexed) → workspaces._id
│   │   │   ├── userId: string (indexed) → users.clerkUserId
│   │   │   ├── role: "admin" | "member"
│   │   │   ├── createdAt: number
│   │   │   └── updatedAt: number
│   │   │
│   │   ├──< 💬 sessions (1:N)
│   │   │   ├── _id: Id<"sessions">
│   │   │   ├── organizationId: string (indexed) → organizations.clerkOrganizationId
│   │   │   ├── workspaceId: string (indexed) → workspaces._id
│   │   │   ├── userId: string (indexed) → users.clerkUserId
│   │   │   ├── agentIds: string[] (indexed) → agents._id (Agents participating in this session)
│   │   │   ├── title: string
│   │   │   ├── mode: "compare" | "debate" | "auto-debate"
│   │   │   ├── status: "active" | "completed" | "archived"
│   │   │   ├── config: object
│   │   │   │   ├── rounds: number (optional, for auto-debate)
│   │   │   │   ├── currentRound: number (optional, for auto-debate)
│   │   │   │   ├── speakingOrder: string[] (optional, agent IDs)
│   │   │   │   └── autoDebateStatus: "setup" | "running" | "paused" | "completed" (optional)
│   │   │   ├── metadata: object
│   │   │   │   ├── tags: string[]
│   │   │   │   ├── description: string (optional)
│   │   │   │   └── visibility: "private" | "workspace" | "organization"
│   │   │   ├── messageCount: number
│   │   │   ├── tokensUsed: number
│   │   │   ├── duration: number (seconds)
│   │   │   ├── lastActivityAt: number
│   │   │   ├── createdAt: number
│   │   │   └── updatedAt: number
│   │   │
│   │   ├──< 💭 messages (1:N)
│   │   │   ├── _id: Id<"messages">
│   │   │   ├── organizationId: string (indexed) → organizations.clerkOrganizationId
│   │   │   ├── workspaceId: string (indexed) → workspaces._id
│   │   │   ├── sessionId: string (indexed) → sessions._id
│   │   │   ├── userId: string (indexed) → users.clerkUserId
│   │   │   ├── agentId: string (optional, indexed) → agents._id
│   │   │   ├── role: "user" | "assistant" | "system"
│   │   │   ├── content: string
│   │   │   ├── metadata: object
│   │   │   │   ├── model: string (optional)
│   │   │   │   ├── temperature: number (optional)
│   │   │   │   ├── tokens: number (optional)
│   │   │   │   └── latency: number (optional, response time in ms)
│   │   │   ├── parentMessageId: string (optional) → messages._id (for threading)
│   │   │   ├── threadId: string (optional, for grouping threaded messages)
│   │   │   ├── replyCount: number (optional)
│   │   │   ├── hasReplies: boolean (optional)
│   │   │   ├── bookmarked: boolean (optional)
│   │   │   ├── reactions: object[] (detailed reaction tracking)
│   │   │   │   ├── id: string
│   │   │   │   ├── emoji: string
│   │   │   │   ├── label: string
│   │   │   │   ├── count: number
│   │   │   │   ├── users: string[] (Array of userIds who reacted)
│   │   │   │   └── timestamp: number
│   │   │   ├── isStreaming: boolean (optional)
│   │   │   ├── createdAt: number
│   │   │   └── updatedAt: number
│   │   │
│   │   ├──< 🤖 agents (1:N)
│   │   │   ├── _id: Id<"agents">
│   │   │   ├── organizationId: string (indexed) → organizations.clerkOrganizationId
│   │   │   ├── workspaceId: string (indexed) → workspaces._id
│   │   │   ├── userId: string (indexed) → users.clerkUserId
│   │   │   ├── roleId: string (ID from roles configuration)
│   │   │   ├── personaId: string (ID from personas configuration)
│   │   │   ├── frameworkId: string (ID from frameworks configuration)
│   │   │   ├── role: string (professional role/expertise display name)
│   │   │   ├── persona: string (behavioral style display name)
│   │   │   ├── framework: string (thinking methodology display name)
│   │   │   ├── model: string (AI model identifier)
│   │   │   ├── provider: string (AI provider: openai, anthropic, etc.)
│   │   │   ├── systemPrompt: string (Generated from role + persona + framework)
│   │   │   ├── customInstructions: string (optional)
│   │   │   ├── parameters: object
│   │   │   │   ├── temperature: number (optional)
│   │   │   │   ├── maxTokens: number (optional)
│   │   │   │   └── topP: number (optional)
│   │   │   ├── usageCount: number
│   │   │   ├── isFavorite: boolean
│   │   │   ├── isTemplate: boolean
│   │   │   ├── isActive: boolean (Whether agent is currently active)
│   │   │   ├── visibility: "private" | "workspace" | "organization"
│   │   │   ├── createdAt: number
│   │   │   └── updatedAt: number
│   │   │
│   │   ├──< 📦 artifacts (1:N)
│   │   │   ├── _id: Id<"artifacts">
│   │   │   ├── organizationId: string (indexed) → organizations.clerkOrganizationId
│   │   │   ├── workspaceId: string (indexed) → workspaces._id
│   │   │   ├── sessionId: string (indexed) → sessions._id
│   │   │   ├── messageId: string (optional, indexed) → messages._id
│   │   │   ├── userId: string (indexed) → users.clerkUserId
│   │   │   ├── title: string
│   │   │   ├── description: string (optional)
│   │   │   ├── type: "document" | "data-table" | "checklist" | "chart" | "code" | "image" | "pdf" | "export"
│   │   │   ├── content: string (optional, for text-based artifacts)
│   │   │   ├── folderId: string (optional, indexed) → folders._id
│   │   │   ├── tags: string[]
│   │   │   ├── isFavorite: boolean
│   │   │   ├── isPinned: boolean
│   │   │   ├── lastAccessedAt: number
│   │   │   ├── collaborators: string[] (optional)
│   │   │   ├── reactions: object
│   │   │   │   ├── likes: number
│   │   │   │   └── dislikes: number
│   │   │   ├── fileId: string (optional) → Convex file storage
│   │   │   ├── metadata: object
│   │   │   │   ├── size: number (optional, file size in bytes)
│   │   │   │   ├── version: number (optional)
│   │   │   │   ├── exports: object[] (optional)
│   │   │   │   │   ├── format: string
│   │   │   │   │   ├── url: string
│   │   │   │   │   └── timestamp: number
│   │   │   │   ├── author: string (optional)
│   │   │   │   ├── tags: string[] (optional)
│   │   │   │   ├── mimeType: string (optional)
│   │   │   │   ├── wordCount: number (optional)
│   │   │   │   ├── rowCount: number (optional)
│   │   │   │   └── itemCount: number (optional)
│   │   │   ├── createdAt: number
│   │   │   └── updatedAt: number
│   │   │
│   │   ├──< 🗂️ artifactTemplates (1:N)
│   │   │   ├── _id: Id<"artifactTemplates">
│   │   │   ├── organizationId: string (indexed) → organizations.clerkOrganizationId
│   │   │   ├── workspaceId: string (indexed) → workspaces._id
│   │   │   ├── userId: string (indexed) → users.clerkUserId
│   │   │   ├── name: string
│   │   │   ├── description: string
│   │   │   ├── icon: string
│   │   │   ├── type: "document" | "data-table" | "checklist" | "chart"
│   │   │   ├── data: string // JSON stringified template data
│   │   │   ├── category: string
│   │   │   ├── tags: string[] // Array of tag IDs
│   │   │   ├── isSystem: boolean // True for built-in templates
│   │   │   ├── visibility: "private" | "workspace" | "organization"
│   │   │   ├── usageCount: number
│   │   │   ├── createdAt: number
│   │   │   └── updatedAt: number
│   │   │
│   │   ├──< 📜 artifactVersions (1:N)
│   │   │   ├── _id: Id<"artifactVersions">
│   │   │   ├── organizationId: string (indexed) → organizations.clerkOrganizationId
│   │   │   ├── workspaceId: string (indexed) → workspaces._id
│   │   │   ├── artifactId: string (indexed) → artifacts._id
│   │   │   ├── version: number
│   │   │   ├── timestamp: number
│   │   │   ├── author: string // userId
│   │   │   ├── changeDescription: string
│   │   │   ├── changeType: "created" | "edited" | "restored" | "auto-saved"
│   │   │   ├── changedFields: string[] (optional, for diff tracking)
│   │   │   ├── previousVersionId: string (optional) → artifactVersions._id
│   │   │   ├── data: string // JSON stringified artifact data snapshot
│   │   │   └── createdAt: number
│   │   │
│   │   ├──< 📋 templates (1:N)
│   │   │   ├── _id: Id<"templates">
│   │   │   ├── organizationId: string (indexed) → organizations.clerkOrganizationId
│   │   │   ├── workspaceId: string (indexed) → workspaces._id
│   │   │   ├── userId: string (indexed) → users.clerkUserId
│   │   │   ├── name: string
│   │   │   ├── description: string
│   │   │   ├── category: string (Business Strategy, Product Development, etc.)
│   │   │   ├── agents: object[] (agent configurations)
│   │   │   │   ├── name: string
│   │   │   │   ├── roleId: string
│   │   │   │   ├── personaId: string
│   │   │   │   ├── frameworkId: string
│   │   │   │   └── customInstructions: string (optional)
│   │   │   ├── topic: string (optional)
│   │   │   ├── conversationType: "debate" | "collaboration" | "analysis"
│   │   │   ├── suggestedQuestions: string[] (optional)
│   │   │   ├── isCustom: boolean
│   │   │   ├── popularity: number (optional)
│   │   │   ├── usageCount: number // Track how many times template has been used
│   │   │   ├── lastUsed: number (optional) // Timestamp of last usage
│   │   │   ├── tags: string[]
│   │   │   ├── author: string (optional)
│   │   │   ├── visibility: "private" | "workspace" | "organization"
│   │   │   ├── createdAt: number
│   │   │   └── updatedAt: number
│   │   │
│   │   ├──< 📁 projects (1:N)
│   │   │   ├── _id: Id<"projects">
│   │   │   ├── organizationId: string (indexed) → organizations.clerkOrganizationId
│   │   │   ├── workspaceId: string (indexed) → workspaces._id
│   │   │   ├── userId: string (indexed) → users.clerkUserId
│   │   │   ├── name: string
│   │   │   ├── description: string (optional)
│   │   │   ├── sessionIds: string[] → sessions._id
│   │   │   ├── createdAt: number
│   │   │   └── updatedAt: number
│   │   │
│   │   ├──< 📌 bookmarks (1:N)
│   │   │   ├── _id: Id<"bookmarks">
│   │   │   ├── organizationId: string (indexed) → organizations.clerkOrganizationId
│   │   │   ├── workspaceId: string (indexed) → workspaces._id
│   │   │   ├── userId: string (indexed) → users.clerkUserId
│   │   │   ├── messageId: string (indexed) → messages._id
│   │   │   ├── sessionId: string (indexed) → sessions._id
│   │   │   ├── title: string
│   │   │   ├── note: string (optional) // Changed from 'notes' to 'note' to match code
│   │   │   ├── tags: string[]
│   │   │   ├── collectionId: string (optional) → bookmarkCollections._id
│   │   │   ├── createdAt: number
│   │   │   └── updatedAt: number
│   │   │
│   │   ├──< 📚 bookmarkCollections (1:N)
│   │   │   ├── _id: Id<"bookmarkCollections">
│   │   │   ├── organizationId: string (indexed) → organizations.clerkOrganizationId
│   │   │   ├── workspaceId: string (indexed) → workspaces._id
│   │   │   ├── userId: string (indexed) → users.clerkUserId
│   │   │   ├── name: string
│   │   │   ├── description: string (optional)
│   │   │   ├── color: string (optional)
│   │   │   ├── icon: string (optional)
│   │   │   ├── bookmarkIds: string[] → bookmarks._id
│   │   │   ├── createdAt: number
│   │   │   └── updatedAt: number
│   │   │
│   │   └──< 🎯 activities (1:N)
│   │       ├── _id: Id<"activities">
│   │       ├── organizationId: string (indexed) → organizations.clerkOrganizationId
│   │       ├── workspaceId: string (indexed) → workspaces._id
│   │       ├── userId: string (indexed) → users.clerkUserId
│   │       ├── type: "debate" | "export" | "agent" | "template" | "artifact"
│   │       ├── title: string
│   │       ├── description: string
│   │       ├── metadata: object (optional, additional context)
│   │       ├── createdAt: number
│   │
│   ├──< 💳 subscriptions (1:1)
│   │   ├── _id: Id<"subscriptions">
│   │   ├── organizationId: string (unique, indexed) → organizations.clerkOrganizationId
│   │   ├── polarSubscriptionId: string (unique, indexed)
│   │   ├── polarCustomerId: string (indexed)
│   │   ├── polarProductId: string (indexed)
│   │   ├── status: "active" | "canceled" | "past_due" | "trialing"
│   │   ├── currentPeriodStart: number
│   │   ├── currentPeriodEnd: number
│   │   ├── cancelAtPeriodEnd: boolean
│   │   ├── metadata: object
│   │   │   ├── planName: string
│   │   │   └── features: string[]
│   │   ├── createdAt: number
│   │   ├── updatedAt: number
│   │   └── canceledAt: number (optional)
│   │
│   ├──< 💰 creditBalances (1:1)
│   │   ├── _id: Id<"creditBalances">
│   │   ├── organizationId: string (unique, indexed) → organizations.clerkOrganizationId
│   │   ├── totalCredits: number
│   │   ├── usedCredits: number
│   │   ├── remainingCredits: number
│   │   ├── subscriptionCredits: number
│   │   ├── purchasedCredits: number
│   │   ├── lastResetAt: number
│   │   ├── nextResetAt: number
│   │   ├── updatedAt: number
│   │   └── metadata: object
│   │       └── resetFrequency: "monthly" | "never"
│   │
│   ├──< 💵 invoices (1:N)
│   │   ├── _id: Id<"invoices">
│   │   ├── organizationId: string (indexed) → organizations.clerkOrganizationId
│   │   ├── polarInvoiceId: string (unique, indexed)
│   │   ├── subscriptionId: string (optional, indexed) → subscriptions._id
│   │   ├── invoiceNumber: string (unique)
│   │   ├── status: "draft" | "open" | "paid" | "void" | "uncollectible"
│   │   ├── amount: number
│   │   ├── currency: string
│   │   ├── description: string (optional)
│   │   ├── invoiceDate: number
│   │   ├── dueDate: number (optional)
│   │   ├── paidAt: number (optional)
│   │   ├── invoiceUrl: string (optional, Polar hosted invoice URL)
│   │   ├── pdfUrl: string (optional, downloadable PDF URL)
│   │   ├── metadata: object
│   │   │   ├── planName: string (optional)
│   │   │   ├── billingPeriod: string (optional, "YYYY-MM")
│   │   │   └── items: object[] (optional, line items)
│   │   │       ├── description: string
│   │   │       ├── quantity: number
│   │   │       ├── unitPrice: number
│   │   │       └── amount: number
│   │   ├── createdAt: number
│   │   └── updatedAt: number
│   │
│   └──< 📊 usageTracking (1:N)
│       ├── _id: Id<"usageTracking">
│       ├── organizationId: string (indexed) → organizations.clerkOrganizationId
│       ├── workspaceId: string (optional, indexed) → workspaces._id
│       ├── userId: string (indexed) → users.clerkUserId
│       ├── sessionId: string (optional, indexed) → sessions._id
│       ├── messageId: string (optional, indexed) → messages._id
│       ├── eventType: "token_usage" | "api_call" | "export" | "storage"
│       ├── tokensUsed: number
│       ├── cost: number (optional, credits deducted)
│       ├── metadata: object
│       │   ├── inputTokens: number
│       │   ├── outputTokens: number
│       │   ├── cached: boolean
│       │   ├── model: string (optional)
│       │   ├── provider: string (optional)
│       │   ├── finishReason: string (optional)
│       │   ├── toolCallsCount: number (optional)
│       │   └── latency: number (optional)
│       ├── polarMeterId: string (optional)
│       ├── createdAt: number (indexed for time-series queries)
│       └── billingPeriod: string (indexed, format: "YYYY-MM")
│
├── 👤 users
│   ├── _id: Id<"users">
│   ├── clerkUserId: string (unique, indexed)
│   ├── preferences: object
│   │   ├── theme: "light" | "dark" | "system"
│   │   ├── defaultModel: string
│   │   ├── language: string
│   │   ├── notifications: boolean
│   │   └── defaultAgents: string[] (agent IDs)
│   ├── totalSessions: number
│   ├── lastActiveAt: number
│   ├── createdAt: number
│   └── updatedAt: number
│
├── 💼 roles
│   ├── _id: Id<"roles">
│   ├── id: string (unique, indexed)
│   ├── name: string
│   ├── category: string (indexed)
│   ├── description: string
│   ├── expertise: string[]
│   ├── systemPrompt: string
│   ├── icon: string
│   ├── isSystem: boolean (indexed)
│   ├── isActive: boolean (indexed)
│   ├── organizationId: string (optional, indexed) → organizations.clerkOrganizationId
│   ├── workspaceId: string (optional, indexed) → workspaces._id
│   ├── usageCount: number
│   ├── createdAt: number
│   └── updatedAt: number
│
├── 🎭 personas
│   ├── _id: Id<"personas">
│   ├── id: string (unique, indexed)
│   ├── name: string
│   ├── description: string
│   ├── traits: string[]
│   ├── communicationStyle: string
│   ├── decisionMaking: string
│   ├── systemPromptModifier: string
│   ├── icon: string
│   ├── isSystem: boolean (indexed)
│   ├── isActive: boolean (indexed)
│   ├── organizationId: string (optional, indexed) → organizations.clerkOrganizationId
│   ├── workspaceId: string (optional, indexed) → workspaces._id
│   ├── usageCount: number
│   ├── createdAt: number
│   └── updatedAt: number
│
├── 🧠 frameworks
│   ├── _id: Id<"frameworks">
│   ├── id: string (unique, indexed)
│   ├── name: string
│   ├── description: string
│   ├── methodology: string
│   ├── bestFor: string[]
│   ├── steps: string[]
│   ├── systemPromptModifier: string
│   ├── icon: string
│   ├── isSystem: boolean (indexed)
│   ├── isActive: boolean (indexed)
│   ├── organizationId: string (optional, indexed) → organizations.clerkOrganizationId
│   ├── workspaceId: string (optional, indexed) → workspaces._id
│   ├── usageCount: number
│   ├── createdAt: number
│   └── updatedAt: number
│
├── 💬 sessions
│   ├── _id: Id<"sessions">
│   ├── organizationId: string (indexed) → organizations.clerkOrganizationId
│   ├── workspaceId: string (indexed) → workspaces._id
│   ├── userId: string (indexed) → users.clerkUserId
│   ├── agentIds: string[] (indexed) → agents._id (Agents participating in this session)
│   ├── title: string
│   ├── mode: "compare" | "debate" | "auto-debate"
│   ├── status: "active" | "completed" | "archived"
│   ├── config: object
│   │   ├── rounds: number (optional, for auto-debate)
│   │   ├── currentRound: number (optional, for auto-debate)
│   │   ├── speakingOrder: string[] (optional, agent IDs)
│   │   └── autoDebateStatus: "setup" | "running" | "paused" | "completed" (optional)
│   ├── metadata: object
│   │   ├── tags: string[]
│   │   ├── description: string (optional)
│   │   └── visibility: "private" | "workspace" | "organization"
│   ├── messageCount: number
│   ├── tokensUsed: number
│   ├── duration: number (seconds)
│   ├── lastActivityAt: number
│   ├── createdAt: number
│   └── updatedAt: number
│
├── 💭 messages
│   ├── _id: Id<"messages">
│   ├── organizationId: string (indexed) → organizations.clerkOrganizationId
│   ├── workspaceId: string (indexed) → workspaces._id
│   ├── sessionId: string (indexed) → sessions._id
│   ├── userId: string (indexed) → users.clerkUserId
│   ├── agentId: string (optional, indexed) → agents._id
│   ├── role: "user" | "assistant" | "system"
│   ├── content: string
│   ├── metadata: object
│   │   ├── model: string (optional)
│   │   ├── temperature: number (optional)
│   │   ├── tokens: number (optional)
│   │   └── latency: number (optional, response time in ms)
│   ├── parentMessageId: string (optional) → messages._id (for threading)
│   ├── threadId: string (optional, for grouping threaded messages)
│   ├── replyCount: number (optional)
│   ├── hasReplies: boolean (optional)
│   ├── bookmarked: boolean (optional)
│   ├── reactions: object[] (detailed reaction tracking)
│   │   ├── id: string
│   │   ├── emoji: string
│   │   ├── label: string
│   │   ├── count: number
│   │   ├── users: string[] (Array of userIds who reacted)
│   │   └── timestamp: number
│   ├── isStreaming: boolean (optional)
│   ├── createdAt: number
│   └── updatedAt: number
│
├── 🤖 agents
│   ├── _id: Id<"agents">
│   ├── organizationId: string (indexed) → organizations.clerkOrganizationId
│   ├── workspaceId: string (indexed) → workspaces._id
│   ├── userId: string (indexed) → users.clerkUserId
│   ├── roleId: string (ID from roles configuration)
│   ├── personaId: string (ID from personas configuration)
│   ├── frameworkId: string (ID from frameworks configuration)
│   ├── role: string (professional role/expertise display name)
│   ├── persona: string (behavioral style display name)
│   ├── framework: string (thinking methodology display name)
│   ├── model: string (AI model identifier)
│   ├── provider: string (AI provider: openai, anthropic, etc.)
│   ├── systemPrompt: string (Generated from role + persona + framework)
│   ├── customInstructions: string (optional)
│   ├── parameters: object
│   │   ├── temperature: number (optional)
│   │   ├── maxTokens: number (optional)
│   │   └── topP: number (optional)
│   ├── usageCount: number
│   ├── isFavorite: boolean
│   ├── isTemplate: boolean
│   ├── isActive: boolean (Whether agent is currently active)
│   ├── visibility: "private" | "workspace" | "organization"
│   ├── createdAt: number
│   └── updatedAt: number
│
├── 📦 artifacts
│   ├── _id: Id<"artifacts">
│   ├── organizationId: string (indexed) → organizations.clerkOrganizationId
│   ├── workspaceId: string (indexed) → workspaces._id
│   ├── sessionId: string (indexed) → sessions._id
│   ├── messageId: string (optional, indexed) → messages._id
│   ├── userId: string (indexed) → users.clerkUserId
│   ├── type: "document" | "data-table" | "checklist" | "chart" | "code" | "image" | "pdf" | "export"
│   ├── title: string
│   ├── description: string (optional)
│   ├── content: string (optional, for text-based artifacts)
│   ├── folderId: string (optional, indexed) → folders._id
│   ├── tags: string[]
│   ├── isFavorite: boolean
│   ├── isPinned: boolean
│   ├── lastAccessedAt: number
│   ├── collaborators: string[] (optional)
│   ├── reactions: object
│   │   ├── likes: number
│   │   └── dislikes: number
│   ├── fileId: string (optional) → Convex file storage
│   ├── metadata: object
│   │   ├── size: number (optional, file size in bytes)
│   │   ├── version: number (optional)
│   │   ├── exports: object[] (optional)
│   │   │   ├── format: string
│   │   │   ├── url: string
│   │   │   └── timestamp: number
│   │   ├── author: string (optional)
│   │   ├── tags: string[] (optional)
│   │   ├── mimeType: string (optional)
│   │   ├── wordCount: number (optional)
│   │   ├── rowCount: number (optional)
│   │   └── itemCount: number (optional)
│   ├── createdAt: number
│   └── updatedAt: number
│
├── 🗂️ artifactTemplates
│   ├── _id: Id<"artifactTemplates">
│   ├── organizationId: string (indexed) → organizations.clerkOrganizationId
│   ├── workspaceId: string (indexed) → workspaces._id
│   ├── userId: string (indexed) → users.clerkUserId
│   ├── name: string
│   ├── description: string
│   ├── icon: string
│   ├── type: "document" | "data-table" | "checklist" | "chart"
│   ├── data: string // JSON stringified template data
│   ├── category: string
│   ├── tags: string[] // Array of tag IDs
│   ├── isSystem: boolean // True for built-in templates
│   ├── visibility: "private" | "workspace" | "organization"
│   ├── usageCount: number
│   ├── createdAt: number
│   └── updatedAt: number
│
├── 📜 artifactVersions
│   ├── _id: Id<"artifactVersions">
│   ├── organizationId: string (indexed) → organizations.clerkOrganizationId
│   ├── workspaceId: string (indexed) → workspaces._id
│   ├── artifactId: string (indexed) → artifacts._id
│   ├── version: number
│   ├── timestamp: number
│   ├── author: string // userId
│   ├── changeDescription: string
│   ├── changeType: "created" | "edited" | "restored" | "auto-saved"
│   ├── changedFields: string[] (optional, for diff tracking)
│   ├── previousVersionId: string (optional) → artifactVersions._id
│   ├── data: string // JSON stringified artifact data snapshot
│   └── createdAt: number
│
├── 📋 templates
│   ├── _id: Id<"templates">
│   ├── organizationId: string (indexed) → organizations.clerkOrganizationId
│   ├── workspaceId: string (indexed) → workspaces._id
│   ├── userId: string (indexed) → users.clerkUserId
│   ├── name: string
│   ├── description: string
│   ├── category: string (Business Strategy, Product Development, etc.)
│   ├── agents: object[] (agent configurations)
│   │   ├── name: string
│   │   ├── roleId: string
│   │   ├── personaId: string
│   │   ├── frameworkId: string
│   │   └── customInstructions: string (optional)
│   ├── topic: string (optional)
│   ├── conversationType: "debate" | "collaboration" | "analysis"
│   ├── suggestedQuestions: string[] (optional)
│   ├── isCustom: boolean
│   ├── popularity: number (optional)
│   ├── usageCount: number // Track how many times template has been used
│   ├── lastUsed: number (optional) // Timestamp of last usage
│   ├── tags: string[]
│   ├── author: string (optional)
│   ├── visibility: "private" | "workspace" | "organization"
│   ├── createdAt: number
│   └── updatedAt: number
│
├── 🤖 agentTeamPresets
│   ├── _id: Id<"agentTeamPresets">
│   ├── organizationId: string (indexed) → organizations.clerkOrganizationId
│   ├── workspaceId: string (indexed) → workspaces._id
│   ├── userId: string (optional, indexed) → users.clerkUserId (null for system presets)
│   ├── name: string
│   ├── description: string
│   ├── icon: string // Emoji or icon identifier
│   ├── category: string // e.g., "Business", "Product", "Marketing"
│   ├── agents: object[] (agent configurations)
│   │   ├── name: string
│   │   ├── roleId: string
│   │   ├── personaId: string
│   │   ├── frameworkId: string
│   │   └── customInstructions: string (optional)
│   ├── useCases: string[] // List of use cases for this preset
│   ├── isSystem: boolean // True for built-in presets, false for custom
│   ├── usageCount: number
│   ├── lastUsed: number (optional)
│   ├── createdAt: number
│   └── updatedAt: number
│
├── 📝 quickStartScenarios
│   ├── _id: Id<"quickStartScenarios">
│   ├── organizationId: string (indexed) → organizations.clerkOrganizationId
│   ├── workspaceId: string (indexed) → workspaces._id
│   ├── userId: string (optional, indexed) → users.clerkUserId (null for system scenarios)
│   ├── name: string
│   ├── description: string
│   ├── icon: string // Emoji or icon identifier
│   ├── category: string // e.g., "Business", "Product", "Strategy"
│   ├── presetId: string (indexed) → agentTeamPresets._id // References an agent team preset
│   ├── suggestedTopic: string // Pre-filled topic for the scenario
│   ├── suggestedQuestions: string[] // Suggested questions to ask
│   ├── isSystem: boolean // True for built-in scenarios, false for custom
│   ├── usageCount: number
│   ├── lastUsed: number (optional)
│   ├── createdAt: number
│   └── updatedAt: number
│
├── 📊 sessionComparisons
│   ├── _id: Id<"sessionComparisons">
│   ├── organizationId: string (indexed) → organizations.clerkOrganizationId
│   ├── workspaceId: string (indexed) → workspaces._id
│   ├── userId: string (indexed) → users.clerkUserId
│   ├── name: string (optional)
│   ├── sessionIds: string[] (indexed) → sessions._id
│   ├── createdAt: number
│   └── updatedAt: number
│
├── 🧠 workingMemory
│   ├── _id: Id<"workingMemory">
│   ├── organizationId: string (indexed) → organizations.clerkOrganizationId
│   ├── workspaceId: string (indexed) → workspaces._id
│   ├── scope: "chat" | "user" | "workspace" | "organization"
│   ├── chatId: string (optional, indexed) → sessions._id
│   ├── userId: string (optional, indexed) → users.clerkUserId
│   ├── title: string
│   ├── category: string (Technical, Business, Domain Knowledge, Policies, etc.)
│   ├── content: string (Markdown template with learned facts)
│   ├── tags: string[]
│   ├── source: "manual" | "document" | "url" | "agent" | "chat" | "artifact" | "debate_result"
│   ├── sourceUrl: string (optional, original URL if from web)
│   ├── sourceDocument: string (optional, original filename if from doc)
│   ├── sourceChatId: string (optional) → sessions._id
│   ├── sourceArtifactId: string (optional)
│   ├── sourceDebateId: string (optional) → sessions._id
│   ├── createdBy: string (User ID who created)
│   ├── usageCount: number (How many times referenced by agents)
│   ├── lastUsedAt: number (optional)
│   ├── createdAt: number
│   └── updatedAt: number
│
├── 🤝 collaborationEvents
│   ├── _id: Id<"collaborationEvents">
│   ├── organizationId: string (indexed) → organizations.clerkOrganizationId
│   ├── workspaceId: string (indexed) → workspaces._id
│   ├── sessionId: string (indexed) → sessions._id
│   ├── artifactId: string (indexed) → artifacts._id
│   ├── userId: string (optional, indexed) → users.clerkUserId
│   ├── agentId: string (optional, indexed) → agents._id
│   ├── eventType: "edit" | "comment" | "cursor" | "view" | "create" | "delete"
│   ├── description: string
│   ├── metadata: object
│   │   ├── field: string (optional, which field was edited)
│   │   ├── oldValue: string (optional)
│   │   ├── newValue: string (optional)
│   │   ├── position: object (optional, cursor position)
│   │   │   ├── x: number
│   │   │   └── y: number
│   │   └── color: string (optional, cursor color)
│   ├── timestamp: number
│   └── createdAt: number
│
├── 📁 folders
│   ├── _id: Id<"folders">
│   ├── organizationId: string (indexed) → organizations.clerkOrganizationId
│   ├── workspaceId: string (indexed) → workspaces._id
│   ├── userId: string (indexed) → users.clerkUserId
│   ├── name: string
│   ├── description: string (optional)
│   ├── color: string (optional)
│   ├── icon: string (optional)
│   ├── parentId: string (optional, indexed) → folders._id
│   ├── createdAt: number
│   └── updatedAt: number
│
└── 🏷️ tags
    ├── _id: Id<"tags">
    ├── organizationId: string (indexed) → organizations.clerkOrganizationId
    ├── workspaceId: string (indexed) → workspaces._id
    ├── userId: string (indexed) → users.clerkUserId
    ├── name: string
    ├── color: string
    ├── count: number
    ├── createdAt: number
    └── updatedAt: number

Adding Invitations and API Keys tables to match schema.ts
,
├── ✉️ invitations
│   ├── _id: Id<"invitations">
│   ├── organizationId: string (indexed) → organizations.clerkOrganizationId
│   ├── workspaceId: string (indexed) → workspaces._id
│   ├── email: string
│   ├── role: "admin" | "member"
│   ├── inviterId: string (indexed) → users.clerkUserId
│   ├── status: "pending" | "accepted" | "revoked"
│   ├── token: string (unique, indexed)
│   ├── expiresAt: number
│   ├── createdAt: number
│   └── acceptedAt: number (optional)
│
└── 🔑 apiKeys
    ├── _id: Id<"apiKeys">
    ├── organizationId: string (indexed) → organizations.clerkOrganizationId
    ├── workspaceId: string (indexed) → workspaces._id
    ├── userId: string (indexed) → users.clerkUserId
    ├── name: string
    ├── keyPreview: string (indexed) // e.g., "sk_live_...1234"
    ├── secretHash: string (unique, indexed) // Hashed for security
    ├── scopes: string[] // e.g., ["read:messages", "write:sessions"]
    ├── lastUsedAt: number (optional)
    ├── expiresAt: number (optional)
    ├── createdAt: number
    └── revokedAt: number (optional)
\`\`\`

### Legend
- 🏢 Organization-level data (multi-tenancy root)
- 🏗️ Workspace level data
- 👥 Workspace membership
- 👤 User data (minimal, Clerk handles auth)
- 💬 Session data (chat conversations)
- 💭 Message data (AI responses)
- 🤖 Agent configurations (AI models)
- 📦 Artifacts (generated content)
- 🗂️ Artifact Templates (predefined artifact structures)
- 📜 Artifact Versions (version history for artifacts)
- 📋 Templates (debate templates)
- 📁 Projects (session grouping)
- 📌 Bookmarks (saved messages)
- 📚 Bookmark Collections (organized bookmarks)
- 🎯 Activities (user activity log)
- 💳 Subscription data (Polar integration)
- 💰 Credit balances (billing)
- 💵 Invoices (payment history)
- 📊 Usage tracking (token metering)
- 💼 Roles (agent configuration)
- 🎭 Personality personas (agent configuration)
- 🧠 Thinking frameworks (agent configuration)
- 📁 Folders (artifact organization)
- 🏷️ Tags (artifact categorization)
- 🤝 Collaboration Events (real-time collaboration tracking)
- 🤖 Agent Team Presets (pre-configured agent teams)
- 📝 Quick Start Scenarios (preset + topic combinations)
- 📊 Session Comparisons (saved session comparisons)
- 🧠 Working Memory (persistent AI knowledge)
- ✉️ Invitations (workspace invitations)
- 🔑 API Keys (programmatic access)

### Relationship Types
- `→` Foreign key relationship
- `(indexed)` Field has database index
- `(unique)` Field must be unique
- `(optional)` Field is not required

---

## Overview

This document defines the complete Convex database schema for AnyDebate AI. The schema supports:

- **Multi-tenancy**: Organization-based data isolation using Clerk Organizations
- **Workspaces**: Hierarchical organization of data within an organization
- **Three chat modes**: Compare, Debate, and Auto-Debate
- **Real-time collaboration**: Convex's built-in real-time subscriptions
- **Usage-based billing**: Token credit tracking with Polar integration
- **File storage**: Artifact attachments and exports
- **Agent Configuration**: Customizable roles, personas, and frameworks
- **Artifact Management**: Folders, tags, templates, and version history for organized artifact storage.
- **Real-time Collaboration Tracking**: Events for edits, comments, cursors, and views.
- **Persistent AI Memory**: Storing and retrieving knowledge across different scopes for agents.
- **Billing and Payment History**: Tracking subscriptions, credit balances, and invoices.
- **Workspace Invitations**: Managing user access to workspaces.
- **Programmatic Access**: Secure API keys for external integrations.

### Key Design Decisions

1. **Organization-scoped data**: All user-generated content belongs to an organization
2. **Workspace-scoped data**: Further segmentation of data within an organization
3. **Minimal user data**: Clerk handles user profiles, we only store preferences
4. **Flexible session structure**: Support all three chat modes in one table
5. **Token tracking**: Real-time credit balance and usage metering
6. **No localStorage**: Convex is the single source of truth

---

## Schema Principles

### 1. Multi-Tenancy (Organization Isolation)

Every tenant-scoped table MUST include:
\`\`\`typescript
{
  organizationId: v.string(), // Clerk organization ID (org_xxxxx)
  // ... other fields
}
\`\`\`

### 2. Workspace Isolation

Every workspace-scoped table MUST include:
\`\`\`typescript
{
  workspaceId: v.id('workspaces'), // Workspace ID (ws_xxxxx)
  // ... other fields
}
\`\`\`

### 3. Mandatory Indexes

All organization-scoped tables MUST have:
\`\`\`typescript
.index('by_organization', ['organizationId'])
.index('by_organization_and_user', ['organizationId', 'userId'])
\`\`\`

All workspace-scoped tables MUST have:
\`\`\`typescript
.index('by_workspace', ['workspaceId'])
.index('by_workspace_and_user', ['workspaceId', 'userId'])
\`\`\`

### 4. Timestamp Fields

All tables include:
\`\`\`typescript
{
  createdAt: v.number(), // Unix timestamp
  updatedAt: v.number(), // Unix timestamp
}
\`\`\`

### 5. Soft Deletes

Use status fields instead of hard deletes:
\`\`\`typescript
{
  status: v.union(v.literal('active'), v.literal('archived'), v.literal('deleted'))
}
\`\`\`

---

## Table Definitions

### 1. Organizations

**Purpose**: Track organization metadata (minimal, Clerk handles most)

\`\`\`typescript
organizations: defineTable({
  // Clerk organization ID (primary identifier)
  clerkOrganizationId: v.string(),
  
  // Organization name
  name: v.string(),
  
  // Organization slug
  slug: v.optional(v.string()),
  
  // Usage tracking
  totalSessions: v.number(),
  totalMessages: v.number(),
  totalTokensUsed: v.number(),
  
  // Timestamps
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index('by_clerk_org_id', ['clerkOrganizationId'])
\`\`\`

**Fields**:
- `clerkOrganizationId`: Links to Clerk organization (unique)
- `name`: Organization name
- `slug`: Organization slug (optional)
- `totalSessions`: Counter for analytics
- `totalMessages`: Counter for analytics
- `totalTokensUsed`: Cumulative token usage

**Notes**:
- Clerk handles: org name, slug, logo, members, invitations
- We only store: basic metadata and usage counters
- Created automatically when first user from org logs in

---

### 2. Users

**Purpose**: Store minimal user preferences (Clerk handles profiles)

\`\`\`typescript
users: defineTable({
  // Clerk user ID (primary identifier)
  clerkUserId: v.string(),
  
  // User preferences (per-user, not per-org)
  preferences: v.object({
    theme: v.union(
      v.literal('light'),
      v.literal('dark'),
      v.literal('system')
    ),
    defaultModel: v.string(),
    language: v.string(),
    notifications: v.boolean(),
    defaultAgents: v.array(v.string()), // Agent IDs
  }),
  
  // Usage stats (across all orgs)
  totalSessions: v.number(),
  lastActiveAt: v.number(),
  
  // Timestamps
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index('by_clerk_user_id', ['clerkUserId'])
  .index('by_last_active', ['lastActiveAt'])
\`\`\`

**Fields**:
- `clerkUserId`: Links to Clerk user (unique)
- `preferences`: User-specific settings (theme, language, notifications)
- `totalSessions`: Counter across all organizations
- `lastActiveAt`: For activity tracking

**Notes**:
- Clerk handles: name, email, avatar, authentication
- We only store: preferences and activity stats
- Created automatically on first login

---

### 3. Workspaces

**Purpose**: Organize data within an organization

\`\`\`typescript
workspaces: defineTable({
  // Organization isolation
  organizationId: v.string(),
  
  // Workspace metadata
  name: v.string(),
  description: v.optional(v.string()),
  slug: v.optional(v.string()),
  
  // Workspace settings
  settings: v.object({
    defaultModel: v.optional(v.string()),
    autoSave: v.boolean(),
    exportFormat: v.union(
      v.literal('pdf'),
      v.literal('markdown'),
      v.literal('json')
    ),
  }),
  
  // Default workspace flag
  isDefault: v.boolean(),
  
  // Timestamps
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index('by_organization', ['organizationId'])
  .index('by_organization_and_name', ['organizationId', 'name'])
  .index('by_organization_and_slug', ['organizationId', 'slug'])
\`\`\`

**Fields**:
- `organizationId`: Multi-tenancy isolation
- `name`: Workspace name
- `description`: Workspace description (optional)
- `slug`: Workspace slug (optional)
- `settings`: Default settings for sessions within this workspace
- `isDefault`: Indicates if this is the default workspace

**Notes**:
- Used to group related sessions, agents, and artifacts
- Organizations can have multiple workspaces

---

### 4. Workspace Memberships

**Purpose**: Manage user access to workspaces

\`\`\`typescript
workspaceMemberships: defineTable({
  // Organization isolation
  organizationId: v.string(),
  
  // Workspace reference
  workspaceId: v.id('workspaces'),
  
  // User reference
  userId: v.string(),
  
  // Role
  role: v.union(v.literal('admin'), v.literal('member')),
  
  // Timestamps
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index('by_organization', ['organizationId'])
  .index('by_workspace', ['workspaceId'])
  .index('by_user', ['userId'])
  .index('by_organization_and_workspace', ['organizationId', 'workspaceId'])
  .index('by_organization_and_user', ['organizationId', 'userId'])
  .index('by_workspace_and_user', ['workspaceId', 'userId'])
\`\`\`

**Fields**:
- `organizationId`: Multi-tenancy isolation
- `workspaceId`: The workspace the user is a member of
- `userId`: The user who is a member
- `role`: 'admin' or 'member' of the workspace
- `createdAt`: Timestamp of membership creation
- `updatedAt`: Timestamp of last update

**Notes**:
- Manages granular access control within workspaces
- Users can have different roles in different workspaces

---

### 5. Sessions

**Purpose**: Store debate/compare/auto-debate sessions

\`\`\`typescript
sessions: defineTable({
  // Organization isolation
  organizationId: v.string(),
  
  // Workspace reference
  workspaceId: v.id('workspaces'),
  
  // User reference
  userId: v.string(),
  
  // Agent reference (optional, for tracking participating agents)
  agentIds: v.array(v.id('agents')), // Agents participating in this session
  
  // Session metadata
  title: v.string(),
  mode: v.union(
    v.literal('compare'),
    v.literal('debate'),
    v.literal('auto-debate')
  ),
  status: v.union(
    v.literal('active'),
    v.literal('completed'),
    v.literal('archived')
  ),
  
  // Configuration
  config: v.object({
    // Auto-debate specific
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
  
  // Metadata
  metadata: v.object({
    tags: v.array(v.string()),
    description: v.optional(v.string()),
    visibility: v.union(
      v.literal('private'),
      v.literal('workspace'),
      v.literal('organization')
    ),
  }),
  
  // Statistics
  messageCount: v.number(),
  tokensUsed: v.number(),
  duration: v.number(), // seconds
  lastActivityAt: v.number(),
  
  // Timestamps
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index('by_organization', ['organizationId'])
  .index('by_workspace', ['workspaceId'])
  .index('by_user', ['userId'])
  .index('by_organization_and_workspace', ['organizationId', 'workspaceId'])
  .index('by_status', ['status']) // Added index for querying sessions by status
  .index('by_organization_and_status', ['organizationId', 'status'])
\`\`\`

**Fields**:
- `organizationId`: Multi-tenancy isolation
- `workspaceId`: Links to the workspace
- `userId`: User who created the session
- `agentIds`: Array of agent IDs participating in this session (NEW)
- `title`: Session display name
- `mode`: Compare, Debate, or Auto-Debate
- `status`: Active, completed, or archived
- `config`: Mode-specific settings (auto-debate rounds, etc.)
- `metadata`: Additional session details (tags, description, visibility)
- `messageCount`: Total messages in session
- `tokensUsed`: Total tokens consumed
- `duration`: Session duration in seconds
- `lastActivityAt`: Timestamp of last activity

**Notes**:
- `agentIds` tracks which agents participated in the session
- Used by dashboard to display agent avatars and names
- Indexed by status for filtering active/archived sessions
- Real-time updates via Convex subscriptions

---

### 6. Messages

**Purpose**: Store all messages (user prompts and AI responses)

\`\`\`typescript
messages: defineTable({
  // Organization isolation
  organizationId: v.string(),
  
  // Workspace reference
  workspaceId: v.id('workspaces'),
  
  // Session reference
  sessionId: v.id('sessions'),
  
  // User reference
  userId: v.string(),
  
  // Agent reference (nullable for user messages)
  agentId: v.optional(v.id('agents')),
  
  // Role
  role: v.union(v.literal('user'), v.literal('assistant'), v.literal('system')),
  
  // Message content
  content: v.string(),
  
  // Metadata
  metadata: v.object({
    model: v.optional(v.string()),
    temperature: v.optional(v.number()),
    tokens: v.optional(v.number()),
    latency: v.optional(v.number()),
  }),
  
  // Parent message reference (for threading)
  parentMessageId: v.optional(v.id('messages')),
  
  // Thread ID (for grouping threaded messages)
  threadId: v.optional(v.string()),
  
  // Reply count
  replyCount: v.optional(v.number()),
  
  // Has replies
  hasReplies: v.optional(v.boolean()),
  
  // Bookmarked
  bookmarked: v.optional(v.boolean()),
  
  // Reactions - UPDATED to support detailed tracking
  reactions: v.optional(v.object({
    likes: v.number(),
    dislikes: v.number(),
  })),
  
  // Is streaming
  isStreaming: v.optional(v.boolean()),
  
  // Timestamps
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
  .index('by_created_at', ['createdAt'])
\`\`\`

**Fields**:
- `organizationId`: Multi-tenancy isolation
- `workspaceId`: Links to the workspace
- `sessionId`: Links to parent session
- `userId`: User who sent the message
- `agentId`: AI agent who responded (optional)
- `role`: User, assistant, or system
- `content`: Message text
- `metadata`: Message-specific data (model, temperature, tokens, latency)
- `parentMessageId`: Reference to parent message for threading
- `threadId`: Reference to thread for grouping
- `replyCount`: Number of replies
- `hasReplies`: Indicates if the message has replies
- `bookmarked`: Indicates if the message is bookmarked
- `reactions`: Simple likes/dislikes structure (REVISED)
- `isStreaming`: Indicates if the message is part of a streaming response

**Notes**:
- Supports all three modes via flexible `metadata` field
- Real-time streaming updates
- Efficient querying with session-based indexes

---

### 7. Agents

**Purpose**: Store AI agent configurations and templates

\`\`\`typescript
agents: defineTable({
  // Organization isolation
  organizationId: v.string(),
  
  // Workspace reference
  workspaceId: v.id('workspaces'),
  
  // User reference (creator)
  userId: v.string(),
  
  // Agent metadata
  name: v.string(),
  description: v.optional(v.string()),
  
  // Agent role and persona - UPDATED with proper IDs
  roleId: v.string(), // ID from roles configuration
  personaId: v.string(), // ID from personas configuration
  frameworkId: v.string(), // ID from frameworks configuration
  
  // Display values (denormalized for performance)
  role: v.string(), // professional role/expertise display name
  persona: v.string(), // behavioral style display name
  framework: v.string(), // thinking methodology display name
  
  // Agent configuration
  model: v.string(), // e.g., "gpt-4", "claude-3-opus"
  provider: v.string(), // e.g., "openai", "anthropic"
  
  // System prompt - UPDATED to be required
  systemPrompt: v.string(), // Generated from role + persona + framework
  customInstructions: v.optional(v.string()),
  
  // Model parameters
  parameters: v.object({
    temperature: v.optional(v.number()),
    maxTokens: v.optional(v.number()),
    topP: v.optional(v.number()),
  }),
  
  // Usage tracking
  usageCount: v.number(),
  
  // Visibility and favorites
  isFavorite: v.boolean(),
  isTemplate: v.boolean(),
  isActive: v.boolean(), // Whether agent is currently active
  visibility: v.union(
    v.literal('private'),
    v.literal('workspace'),
    v.literal('organization')
  ),
  
  // Timestamps
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index('by_organization', ['organizationId'])
  .index('by_workspace', ['workspaceId'])
  .index('by_user', ['userId'])
  .index('by_organization_and_visibility', ['organizationId', 'visibility'])
  .index('by_workspace_and_visibility', ['workspaceId', 'visibility'])
  .index('by_template', ['isTemplate'])
\`\`\`

**Fields**:
- `organizationId`: Multi-tenancy isolation
- `workspaceId`: Links to the workspace
- `userId`: Creator of the agent
- `name`: Agent display name
- `description`: Agent description
- `roleId`: ID of the associated role configuration
- `personaId`: ID of the associated persona configuration
- `frameworkId`: ID of the associated framework configuration
- `role`: Professional role/expertise display name
- `persona`: Behavioral style display name
- `framework`: Thinking methodology display name
- `model`: AI model identifier
- `provider`: AI provider (OpenAI, Anthropic, etc.)
- `systemPrompt`: Custom instructions derived from role, persona, and framework
- `customInstructions`: Additional custom instructions
- `parameters`: Model parameters (temperature, maxTokens, topP)
- `usageCount`: How many times used
- `isFavorite`: Indicates if the agent is a favorite
- `isTemplate`: Indicates if the agent is a template
- `isActive`: Indicates if the agent is currently active
- `visibility`: Private, workspace, or organization shared

**Notes**:
- Users can create custom agents
- Templates shared within workspace or organization
- Public agents available to all users

---

### 8. Artifacts

**Purpose**: Store generated artifacts (documents, tables, checklists, charts)

\`\`\`typescript
artifacts: defineTable({
  // Organization isolation
  organizationId: v.string(),
  
  // Workspace reference
  workspaceId: v.id('workspaces'),
  
  // Session reference
  sessionId: v.id('sessions'),
  
  // Message reference (which message created this artifact)
  messageId: v.id('messages'),
  
  // User reference (creator)
  userId: v.string(),
  
  // Artifact type
  type: v.union(
    v.literal('document'),
    v.literal('data-table'),
    v.literal('checklist'),
    v.literal('chart')
  ),
  
  // Artifact content
  title: v.string(),
  content: v.string(), // JSON stringified artifact data
  
  // Folder reference for organization
  folderId: v.optional(v.id('folders')),
  
  // Tags for categorization (array of tag IDs)
  tags: v.array(v.string()),
  
  // Favorites and pinning
  isFavorite: v.boolean(),
  isPinned: v.boolean(),
  
  // Access tracking
  lastAccessedAt: v.number(),
  
  // Collaboration
  collaborators: v.optional(v.array(v.string())), // Array of userIds
  // </CHANGE>
  reactions: v.optional(v.object({
    likes: v.number(),
    dislikes: v.number(),
  })),
  
  // File storage reference (for large artifacts)
  fileId: v.optional(v.id('_storage')),
  
  // Metadata
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
    // </CHANGE>
  }),
  
  // Timestamps
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
  .index('by_last_accessed', ['workspaceId', 'lastAccessedAt'])
  // </CHANGE>
\`\`\`

**Fields**:
- `organizationId`: Multi-tenancy isolation
- `workspaceId`: Links to the workspace
- `sessionId`: Links to parent session
- `messageId`: Links to the message that created this artifact
- `userId`: Creator of the artifact
- `type`: Document, data-table, checklist, or chart
- `title`: Artifact title
- `content`: JSON stringified artifact data
- `folderId`: Optional folder for organization
- `tags`: Array of tag IDs for categorization
- `isFavorite`: Whether artifact is favorited
- `isPinned`: Whether artifact is pinned
- `lastAccessedAt`: Timestamp of last access
- `collaborators`: Array of userIds who can collaborate
- `reactions`: Simple likes/dislikes structure (REVISED)
- `fileId`: Reference to Convex file storage for large artifacts
- `metadata`: Additional artifact details (size, version, exports, author, tags, mimeType, wordCount, rowCount, itemCount)

**Notes**:
- Small artifacts stored as text in `content`
- Large files stored in Convex file storage
- Linked to sessions and messages
- Supports organization via folders and tags
- Tracks favorites, pins, and access patterns

---

### 9. Folders

**Purpose**: Organize artifacts into hierarchical folders

\`\`\`typescript
folders: defineTable({
  // Organization isolation
  organizationId: v.string(),
  
  // Workspace reference
  workspaceId: v.id('workspaces'),
  
  // User reference (creator)
  userId: v.string(),
  
  // Folder metadata
  name: v.string(),
  description: v.optional(v.string()),
  color: v.optional(v.string()),
  icon: v.optional(v.string()),
  
  // Parent folder reference (for nested folders)
  parentId: v.optional(v.id('folders')),
  
  // Timestamps
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index('by_organization', ['organizationId'])
  .index('by_workspace', ['workspaceId'])
  .index('by_user', ['userId'])
  .index('by_parent', ['parentId'])
  .index('by_workspace_and_parent', ['workspaceId', 'parentId'])
\`\`\`

**Fields**:
- `organizationId`: Multi-tenancy isolation
- `workspaceId`: Links to the workspace
- `userId`: Creator of the folder
- `name`: Folder name
- `description`: Optional folder description
- `color`: Optional color for visual organization
- `icon`: Optional icon for visual organization
- `parentId`: Optional parent folder for nested structure
- `createdAt`: Timestamp of folder creation
- `updatedAt`: Timestamp of last update

**Notes**:
- Supports hierarchical folder structure via `parentId`
- Used to organize artifacts within workspaces
- Can be nested for complex organization

---

### 10. Tags

**Purpose**: Tag system for categorizing artifacts

\`\`\`typescript
tags: defineTable({
  // Organization isolation
  organizationId: v.string(),
  
  // Workspace reference
  workspaceId: v.id('workspaces'),
  
  // User reference (creator)
  userId: v.string(),
  
  // Tag metadata
  name: v.string(),
  color: v.string(),
  
  // Usage count (denormalized for performance)
  count: v.number(),
  
  // Timestamps
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index('by_organization', ['organizationId'])
  .index('by_workspace', ['workspaceId'])
  .index('by_user', ['userId'])
  .index('by_workspace_and_name', ['workspaceId', 'name'])
\`\`\`

**Fields**:
- `organizationId`: Multi-tenancy isolation
- `workspaceId`: Links to the workspace
- `userId`: Creator of the tag
- `name`: Tag name
- `color`: Tag color for visual distinction
- `count`: Number of artifacts using this tag (denormalized)
- `createdAt`: Timestamp of tag creation
- `updatedAt`: Timestamp of last update

**Notes**:
- Separate from artifact tags array for better management
- Count field updated when artifacts are tagged/untagged
- Supports workspace-level tag management

---

### 11. Artifact Templates

**Purpose**: Store custom artifact templates (documents, tables, checklists, charts)

\`\`\`typescript
artifactTemplates: defineTable({
  // Organization isolation
  organizationId: v.string(),
  
  // Workspace reference
  workspaceId: v.id('workspaces'),
  
  // User reference (creator)
  userId: v.string(),
  
  // Template metadata
  name: v.string(),
  description: v.string(),
  icon: v.string(),
  
  // Template type
  type: v.union(
    v.literal('document'),
    v.literal('data-table'),
    v.literal('checklist'),
    v.literal('chart')
  ),
  
  // Template data (JSON stringified)
  data: v.string(),
  
  // Categorization
  category: v.string(),
  tags: v.array(v.string()),
  
  // System vs custom templates
  isSystem: v.boolean(), // True for built-in templates
  
  // Visibility
  visibility: v.union(
    v.literal('private'),
    v.literal('workspace'),
    v.literal('organization')
  ),
  
  // Usage tracking
  usageCount: v.number(),
  
  // Timestamps
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index('by_organization', ['organizationId'])
  .index('by_workspace', ['workspaceId'])
  .index('by_user', ['userId'])
  .index('by_type', ['workspaceId', 'type'])
  .index('by_category', ['workspaceId', 'category'])
  .index('by_system', ['isSystem'])
  .index('by_visibility', ['workspaceId', 'visibility'])
\`\`\`

**Fields**:
- `organizationId`: Multi-tenancy isolation
- `workspaceId`: Links to the workspace
- `userId`: Creator of the template
- `name`: Template name
- `description`: Template description
- `icon`: Template icon (emoji or icon name)
- `type`: Document, data-table, checklist, or chart
- `data`: JSON stringified template data
- `category`: Template category (e.g., Business, Development, HR)
- `tags`: Tags for the template
- `isSystem`: True for built-in templates, false for custom
- `visibility`: Private, workspace, or organization shared
- `usageCount`: Number of times template has been used
- `createdAt`: Timestamp of template creation
- `updatedAt`: Timestamp of last update

**Notes**:
- Stores both system (built-in) and custom user templates
- Templates can be shared within workspaces or organizations
- Usage tracking for analytics and recommendations

---

### 12. Artifact Versions

**Purpose**: Track version history for artifacts (version control and restore)

\`\`\`typescript
artifactVersions: defineTable({
  // Organization isolation
  organizationId: v.string(),
  
  // Workspace reference
  workspaceId: v.id('workspaces'),
  
  // Artifact reference
  artifactId: v.id('artifacts'),
  
  // Version metadata
  version: v.number(),
  timestamp: v.number(),
  author: v.string(), // userId
  changeDescription: v.string(),
  changeType: v.union(
    v.literal('created'),
    v.literal('edited'),
    v.literal('restored'),
    v.literal('auto-saved')
  ),
  
  // Changed fields (for diff tracking)
  changedFields: v.optional(v.array(v.string())),
  
  // Previous version reference
  previousVersionId: v.optional(v.id('artifactVersions')),
  
  // Version data snapshot (JSON stringified artifact data)
  data: v.string(),
  
  // Timestamps
  createdAt: v.number(),
})
  .index('by_organization', ['organizationId'])
  .index('by_workspace', ['workspaceId'])
  .index('by_artifact', ['artifactId'])
  .index('by_artifact_and_version', ['artifactId', 'version'])
  .index('by_author', ['author'])
  .index('by_change_type', ['changeType'])
  .index('by_timestamp', ['timestamp'])
\`\`\`

**Fields**:
- `organizationId`: Multi-tenancy isolation
- `workspaceId`: Links to the workspace
- `artifactId`: Links to parent artifact
- `version`: Version number (incremental)
- `timestamp`: When this version was created
- `author`: User who created this version
- `changeDescription`: Description of changes made
- `changeType`: Type of change (created, edited, restored, auto-saved)
- `changedFields`: Array of field names that changed (for diff)
- `previousVersionId`: Reference to previous version (for history chain)
- `data`: JSON stringified snapshot of artifact data at this version
- `createdAt`: Timestamp of version creation

**Notes**:
- Automatic version creation on artifact edits
- Auto-save versions created periodically during editing
- Maximum 50 versions per artifact (oldest versions pruned)
- Supports version comparison and diff generation
- Enables restore to any previous version
- Tracks complete audit trail of changes

---

### 13. Templates

**Purpose**: Store debate templates

\`\`\`typescript
templates: defineTable({
  // Organization isolation
  organizationId: v.string(),
  
  // Workspace reference
  workspaceId: v.id('workspaces'),
  
  // User reference (creator)
  userId: v.string(),
  
  // Template metadata
  name: v.string(),
  description: v.string(),
  category: v.string(), // e.g., Business Strategy, Product Development
  
  // Agent configurations
  agents: v.array(v.object({
    name: v.string(),
    roleId: v.string(),
    personaId: v.string(),
    frameworkId: v.string(),
    customInstructions: v.optional(v.string()),
  })),
  
  // Template details
  topic: v.optional(v.string()),
  conversationType: v.union(
    v.literal('debate'),
    v.literal('collaboration'),
    v.literal('analysis')
  ),
  suggestedQuestions: v.optional(v.array(v.string())),
  
  // Template visibility and popularity
  isCustom: v.boolean(),
  popularity: v.optional(v.number()),
  usageCount: v.number(), // Track how many times template has been used
  lastUsed: v.optional(v.number()), // Timestamp of last usage
  tags: v.array(v.string()),
  author: v.optional(v.string()),
  visibility: v.union(
    v.literal('private'),
    v.literal('workspace'),
    v.literal('organization')
  ),
  
  // Timestamps
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
  .index('by_workspace_and_usage', ['workspaceId', 'usageCount'])
\`\`\`

**Fields**:
- `organizationId`: Multi-tenancy isolation
- `workspaceId`: Links to the workspace
- `userId`: Creator of the template
- `name`: Template name
- `description`: Template description
- `category`: Template category (e.g., Business Strategy)
- `agents`: Configurations for agents in the template
- `topic`: Optional template topic
- `conversationType`: Debate, collaboration, or analysis
- `suggestedQuestions`: Optional questions for the template
- `isCustom`: Indicates if the template is custom
- `popularity`: Optional popularity score
- `usageCount`: Number of times template has been used
- `lastUsed`: Timestamp of last usage (for "recent" sorting)
- `tags`: Tags for the template
- `author`: Optional author name
- `visibility`: Private, workspace, or organization shared

**Notes**:
- Stores configurations for agents used in debates
- `usageCount` and `lastUsed` enable popularity tracking and "trending" badges

---

### 14. Agent Team Presets

**Purpose**: Store pre-configured agent team presets for quick start

\`\`\`typescript
agentTeamPresets: defineTable({
  // Organization isolation
  organizationId: v.string(),
  
  // Workspace reference
  workspaceId: v.id('workspaces'),
  
  // User reference (creator, null for system presets)
  userId: v.optional(v.string()),
  
  // Preset metadata
  name: v.string(),
  description: v.string(),
  icon: v.string(), // Emoji or icon identifier
  category: v.string(), // e.g., "Business", "Product", "Marketing"
  
  // Agent configurations
  agents: v.array(v.object({
    name: v.string(),
    roleId: v.string(),
    personaId: v.string(),
    frameworkId: v.string(),
    customInstructions: v.optional(v.string()),
  })),
  
  // Use cases
  useCases: v.array(v.string()), // List of use cases for this preset
  
  // System vs custom
  isSystem: v.boolean(), // True for built-in presets, false for custom
  
  // Usage tracking
  usageCount: v.number(),
  lastUsed: v.optional(v.number()),
  
  // Timestamps
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index('by_organization', ['organizationId'])
  .index('by_workspace', ['workspaceId'])
  .index('by_user', ['userId'])
  .index('by_category', ['organizationId', 'category'])
  .index('by_system', ['organizationId', 'isSystem'])
  .index('by_usage', ['organizationId', 'usageCount'])
\`\`\`

**Fields**:
- `organizationId`: Multi-tenancy isolation
- `workspaceId`: Links to the workspace
- `userId`: Creator (null for system presets)
- `name`: Preset name (e.g., "Executive Team", "Product Team")
- `description`: Preset description
- `icon`: Emoji or icon identifier
- `category`: Preset category
- `agents`: Pre-configured agent team
- `useCases`: List of use cases
- `isSystem`: True for built-in presets
- `usageCount`: Number of times used
- `lastUsed`: Timestamp of last usage

**Notes**:
- System presets (isSystem=true) are built-in and cannot be deleted
- Custom presets (isSystem=false) are user-created
- Currently 8 built-in presets: Executive, Product, Marketing, Research, Creative, Technology, Innovation, Customer Success

---

### 15. Quick Start Scenarios

**Purpose**: Store quick start scenarios that combine presets with suggested topics

\`\`\`typescript
quickStartScenarios: defineTable({
  // Organization isolation
  organizationId: v.string(),
  
  // Workspace reference
  workspaceId: v.id('workspaces'),
  
  // User reference (creator, null for system scenarios)
  userId: v.optional(v.string()),
  
  // Scenario metadata
  name: v.string(),
  description: v.string(),
  icon: v.string(), // Emoji or icon identifier
  category: v.string(), // e.g., "Business", "Product", "Strategy"
  
  // Linked preset
  presetId: v.id('agentTeamPresets'), // References an agent team preset
  
  // Suggested content
  suggestedTopic: v.string(), // Pre-filled topic for the scenario
  suggestedQuestions: v.array(v.string()), // Suggested questions to ask
  
  // System vs custom
  isSystem: v.boolean(), // True for built-in scenarios, false for custom
  
  // Usage tracking
  usageCount: v.number(),
  lastUsed: v.optional(v.number()),
  
  // Timestamps
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index('by_organization', ['organizationId'])
  .index('by_workspace', ['workspaceId'])
  .index('by_user', ['userId'])
  .index('by_preset', ['presetId'])
  .index('by_category', ['organizationId', 'category'])
  .index('by_system', ['organizationId', 'isSystem'])
  .index('by_usage', ['organizationId', 'usageCount'])
\`\`\`

**Fields**:
- `organizationId`: Multi-tenancy isolation
- `workspaceId`: Links to the workspace
- `userId`: Creator (null for system scenarios)
- `name`: Scenario name
- `description`: Scenario description
- `icon`: Emoji or icon identifier
- `category`: Scenario category
- `presetId`: References agent team preset
- `suggestedTopic`: Pre-filled topic
- `suggestedQuestions`: Suggested questions
- `isSystem`: True for built-in scenarios
- `usageCount`: Number of times used
- `lastUsed`: Timestamp of last usage

**Notes**:
- System scenarios (isSystem=true) are built-in and cannot be deleted
- Custom scenarios (isSystem=false) are user-created
- Currently 9 built-in scenarios with various business/product topics
- Links to agentTeamPresets via `presetId`

---

### 16. Projects

**Purpose**: Group sessions into projects

\`\`\`typescript
projects: defineTable({
  // Organization isolation
  organizationId: v.string(),
  
  // Workspace reference
  workspaceId: v.id('workspaces'),
  
  // User reference (creator)
  userId: v.string(),
  
  // Project metadata
  name: v.string(),
  description: v.optional(v.string()),
  
  // Session references
  sessionIds: v.array(v.id('sessions')),
  
  // Timestamps
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index('by_organization', ['organizationId'])
  .index('by_workspace', ['workspaceId'])
  .index('by_user', ['userId'])
\`\`\`

**Fields**:
- `organizationId`: Multi-tenancy isolation
- `workspaceId`: Links to the workspace
- `userId`: Creator of the project
- `name`: Project name
- `description`: Project description
- `sessionIds`: References to sessions in the project
- `createdAt`: Timestamp of project creation
- `updatedAt`: Timestamp of last update

**Notes**:
- Groups sessions for better organization and management
- Supports multi-tenancy and workspaces

---

### 17. Bookmarks

**Purpose**: Save messages for future reference

\`\`\`typescript
bookmarks: defineTable({
  // Organization isolation
  organizationId: v.string(),
  
  // Workspace reference
  workspaceId: v.id('workspaces'),
  
  // User reference (creator)
  userId: v.string(),
  
  // Message reference
  messageId: v.id('messages'),
  
  // Session reference
  sessionId: v.id('sessions'),
  
  // Bookmark metadata
  title: v.string(),
  note: v.optional(v.string()), // Changed from 'notes' to 'note' to match code
  tags: v.array(v.string()),
  
  // Collection reference (optional)
  collectionId: v.optional(v.id('bookmarkCollections')),
  
  // Timestamps
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index('by_organization', ['organizationId'])
  .index('by_workspace', ['workspaceId'])
  .index('by_user', ['userId'])
  .index('by_message', ['messageId'])
  .index('by_session', ['sessionId'])
  .index('by_collection', ['collectionId'])
\`\`\`

**Fields**:
- `organizationId`: Multi-tenancy isolation
- `workspaceId`: Links to the workspace
- `userId`: Creator of the bookmark
- `messageId`: Reference to the bookmarked message
- `sessionId`: Reference to the session containing the message
- `title`: Bookmark title
- `note`: Optional note about the bookmark
- `tags`: Tags for the bookmark
- `collectionId`: Optional reference to a bookmark collection
- `createdAt`: Timestamp of bookmark creation
- `updatedAt`: Timestamp of last update

**Notes**:
- Allows users to save important messages for later reference
- Supports grouping bookmarks into collections

---

### 18. Bookmark Collections

**Purpose**: Organize bookmarks into collections

\`\`\`typescript
bookmarkCollections: defineTable({
  // Organization isolation
  organizationId: v.string(),
  
  // Workspace reference
  workspaceId: v.id('workspaces'),
  
  // User reference (creator)
  userId: v.string(),
  
  // Collection metadata
  name: v.string(),
  description: v.optional(v.string()),
  color: v.optional(v.string()), // e.g., "#FF0000"
  icon: v.optional(v.string()), // e.g., "folder"
  
  // Bookmark references
  bookmarkIds: v.array(v.id('bookmarks')),
  
  // Timestamps
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index('by_organization', ['organizationId'])
  .index('by_workspace', ['workspaceId'])
  .index('by_user', ['userId'])
  .index('by_name', ['name'])
\`\`\`

**Fields**:
- `organizationId`: Multi-tenancy isolation
- `workspaceId`: Links to the workspace
- `userId`: Creator of the collection
- `name`: Collection name
- `description`: Collection description
- `color`: Optional color for the collection
- `icon`: Optional icon for the collection
- `bookmarkIds`: References to bookmarks in the collection
- `createdAt`: Timestamp of collection creation
- `updatedAt`: Timestamp of last update

**Notes**:
- Allows users to organize bookmarks into collections
- Supports multi-tenancy and workspaces

---

### 19. Activities

**Purpose**: Track user activities for dashboard recent activity feed

\`\`\`typescript
activities: defineTable({
  // Organization isolation
  organizationId: v.string(),
  
  // Workspace reference (optional)
  workspaceId: v.optional(v.id('workspaces')),
  
  // User reference
  userId: v.string(),
  
  // Activity details
  type: v.union(
    v.literal('debate'),
    v.literal('agent'),
    v.literal('export'),
    v.literal('template'),
    v.literal('artifact')
  ),
  
  title: v.string(),
  description: v.string(),
  
  // References
  sessionId: v.optional(v.id('sessions')),
  agentId: v.optional(v.id('agents')),
  artifactId: v.optional(v.id('artifacts')),
  
  // Metadata
  metadata: v.object({
    participants: v.optional(v.array(v.string())), // Agent names
    messageCount: v.optional(v.number()),
    status: v.optional(v.string()),
  }),
  
  // Timestamps
  createdAt: v.number(),
})
  .index('by_organization', ['organizationId'])
  .index('by_workspace', ['workspaceId'])
  .index('by_user', ['userId'])
  .index('by_type', ['type'])
  .index('by_created_at', ['createdAt'])
  .index('by_organization_and_created_at', ['organizationId', 'createdAt'])
\`\`\`

**Fields**:
- `organizationId`: Multi-tenancy isolation
- `workspaceId`: Optional workspace reference
- `userId`: User who performed the activity
- `type`: Activity type (debate, agent, export, template, artifact)
- `title`: Activity title
- `description`: Activity description
- `sessionId`: Optional session reference
- `agentId`: Optional agent reference
- `artifactId`: Optional artifact reference
- `metadata`: Additional context (participants, messageCount, status)
- `createdAt`: Activity timestamp

**Notes**:
- Immutable activity log
- Used for dashboard recent activity feed
- Automatically created when users perform actions
- Indexed by createdAt for time-series queries

---

### 20. Session Comparisons

**Purpose**: Store side-by-side session comparisons for analysis

\`\`\`typescript
sessionComparisons: defineTable({
  // Organization isolation
  organizationId: v.string(),
  
  // Workspace reference
  workspaceId: v.id('workspaces'),
  
  // User reference (creator)
  userId: v.string(),
  
  // Comparison metadata
  name: v.optional(v.string()),
  
  // Session references
  sessionIds: v.array(v.id('sessions')),
  
  // Timestamps
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index('by_organization', ['organizationId'])
  .index('by_workspace', ['workspaceId'])
  .index('by_user', ['userId'])
  .index('by_created_at', ['createdAt'])
\`\`\`

**Fields**:
- `organizationId`: Multi-tenancy isolation
- `workspaceId`: Links to the workspace
- `userId`: Creator of the comparison
- `name`: Optional name for the comparison
- `sessionIds`: Array of session IDs being compared (2-4 sessions)
- `createdAt`: Timestamp of comparison creation
- `updatedAt`: Timestamp of last update

**Notes**:
- Allows users to save session comparisons for later analysis
- Supports comparing 2-4 sessions side-by-side
- Metrics and insights are calculated on-demand from session data
- Currently stored in localStorage, will be migrated to Convex

---

### 21. Subscriptions

**Purpose**: Track Polar subscription status and billing

\`\`\`typescript
subscriptions: defineTable({
  // Organization isolation (one subscription per org)
  organizationId: v.string(),
  
  // Polar integration
  polarSubscriptionId: v.string(),
  polarCustomerId: v.string(),
  polarProductId: v.string(),
  
  // Status
  status: v.union(
    v.literal('active'),
    v.literal('canceled'),
    v.literal('past_due'),
    v.literal('trialing')
  ),
  
  // Billing
  currentPeriodStart: v.number(),
  currentPeriodEnd: v.number(),
  cancelAtPeriodEnd: v.boolean(),
  
  // Plan details
  metadata: v.object({
    planName: v.string(),
    features: v.array(v.string()),
  }),
  
  // Timestamps
  createdAt: v.number(),
  updatedAt: v.number(),
  canceledAt: v.optional(v.number()),
})
  .index('by_organization', ['organizationId'])
  .index('by_polar_subscription_id', ['polarSubscriptionId'])
  .index('by_polar_product_id', ['polarProductId'])
  .index('by_status', ['status'])
\`\`\`

**Fields**:
- `organizationId`: One subscription per organization
- `polarSubscriptionId`: Polar's subscription ID
- `polarCustomerId`: Polar's customer ID
- `polarProductId`: Polar's product ID
- `status`: Active, canceled, past_due, trialing
- `currentPeriodStart`: When current billing period starts
- `currentPeriodEnd`: When current billing period ends
- `cancelAtPeriodEnd`: Scheduled cancellation
- `metadata`: Plan name and features
- `createdAt`: Timestamp of subscription creation
- `updatedAt`: Timestamp of last update
- `canceledAt`: Timestamp of cancellation (if applicable)

**Notes**:
- One subscription per organization
- Updated via Polar webhooks
- Credit balance for usage-based billing

---

### 22. Credit Balances

**Purpose**: Track credit balances for organizations

\`\`\`typescript
creditBalances: defineTable({
  // Organization isolation (one balance per org)
  organizationId: v.string(),
  
  // Credit details
  totalCredits: v.number(),
  usedCredits: v.number(),
  remainingCredits: v.number(),
  subscriptionCredits: v.number(), // Monthly allocation from Polar
  purchasedCredits: v.number(), // One-time purchases from Polar
  
  // Reset timestamps
  lastResetAt: v.number(),
  nextResetAt: v.number(),
  
  // Timestamps
  updatedAt: v.number(),
  
  // Metadata
  metadata: v.object({
    resetFrequency: v.union(
      v.literal('monthly'),
      v.literal('never')
    ),
  }),
})
  .index('by_organization', ['organizationId'])
\`\`\`

**Fields**:
- `organizationId`: One balance per organization
- `totalCredits`: Total credits available
- `usedCredits`: Credits already used
- `remainingCredits`: Credits left
- `subscriptionCredits`: Monthly credits allocated
- `purchasedCredits`: Credits purchased one-time
- `lastResetAt`: Timestamp of last reset
- `nextResetAt`: Timestamp of next reset
- `updatedAt`: Timestamp of last update
- `metadata`: Additional details (resetFrequency)

**Notes**:
- Tracks credit balances for organizations
- Supports monthly and never reset frequencies
- Used for billing calculations

---

### 23. Invoices

**Purpose**: Track payment history and invoices from Polar

\`\`\`typescript
invoices: defineTable({
  // Organization isolation
  organizationId: v.string(),
  
  // Polar integration
  polarInvoiceId: v.string(),
  
  // Subscription reference (optional, for subscription invoices)
  subscriptionId: v.optional(v.id('subscriptions')),
  
  // Invoice details
  invoiceNumber: v.string(),
  status: v.union(
    v.literal('draft'),
    v.literal('open'),
    v.literal('paid'),
    v.literal('void'),
    v.literal('uncollectible')
  ),
  
  // Amount details
  amount: v.number(),
  currency: v.string(),
  description: v.optional(v.string()),
  
  // Dates
  invoiceDate: v.number(),
  dueDate: v.optional(v.number()),
  paidAt: v.optional(v.number()),
  
  // URLs
  invoiceUrl: v.optional(v.string()), // Polar hosted invoice URL
  pdfUrl: v.optional(v.string()), // Downloadable PDF URL
  
  // Metadata
  metadata: v.object({
    planName: v.optional(v.string()),
    billingPeriod: v.optional(v.string()), // Format: "YYYY-MM"
    items: v.optional(v.array(v.object({
      description: v.string(),
      quantity: v.number(),
      unitPrice: v.number(),
      amount: v.number(),
    }))),
  }),
  
  // Timestamps
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index('by_organization', ['organizationId'])
  .index('by_polar_invoice_id', ['polarInvoiceId'])
  .index('by_subscription', ['subscriptionId'])
  .index('by_status', ['status'])
  .index('by_invoice_date', ['invoiceDate'])
  .index('by_organization_and_status', ['organizationId', 'status'])
\`\`\`

**Fields**:
- `organizationId`: Multi-tenancy isolation
- `polarInvoiceId`: Polar's invoice ID (unique)
- `subscriptionId`: Links to subscription (optional, for recurring invoices)
- `invoiceNumber`: Human-readable invoice number (e.g., "INV-2025-001")
- `status`: Invoice status (draft, open, paid, void, uncollectible)
- `amount`: Invoice amount in cents
- `currency`: Currency code (e.g., "USD")
- `description`: Optional invoice description
- `invoiceDate`: When the invoice was issued
- `dueDate`: When payment is due (optional)
- `paidAt`: When the invoice was paid (optional)
- `invoiceUrl`: Polar hosted invoice URL for viewing
- `pdfUrl`: Downloadable PDF URL
- `metadata`: Additional invoice details (plan name, billing period, line items)
- `createdAt`: Timestamp of invoice creation
- `updatedAt`: Timestamp of last update

**Notes**:
- Created via Polar webhooks when invoices are generated
- Used for payment history display in billing page
- Supports both subscription and one-time payment invoices
- PDF URLs allow users to download invoices for accounting

---

### 24. Usage Tracking

**Purpose**: Track token usage for billing and analytics

\`\`\`typescript
usageTracking: defineTable({
  // Organization isolation
  organizationId: v.string(),
  
  // Workspace reference (optional)
  workspaceId: v.optional(v.id('workspaces')),
  
  // User reference
  userId: v.string(),
  
  // Session reference (optional)
  sessionId: v.optional(v.id('sessions')),
  
  // Message reference (optional)
  messageId: v.optional(v.id('messages')),
  
  // Event details
  eventType: v.union(
    v.literal('token_usage'),
    v.literal('api_call'),
    v.literal('export'),
    v.literal('storage')
  ),
  
  // Token usage
  tokensUsed: v.number(),
  cost: v.optional(v.number()), // Credits deducted
  
  // Metadata - UPDATED with more details
  metadata: v.object({
    inputTokens: v.number(),
    outputTokens: v.number(),
    cached: v.boolean(),
    model: v.optional(v.string()), // Model used
    provider: v.optional(v.string()), // Provider used
    finishReason: v.optional(v.string()), // stop, length, tool_calls, etc.
    toolCallsCount: v.optional(v.number()), // Number of tool calls
    latency: v.optional(v.number()), // Response time in ms
  }),
  
  // Polar meter reference (optional)
  polarMeterId: v.optional(v.string()),
  
  // Timestamps
  createdAt: v.number(), // indexed for time-series queries
  billingPeriod: v.string(), // Format: "YYYY-MM", indexed
})
  .index('by_organization', ['organizationId'])
  .index('by_workspace', ['workspaceId'])
  .index('by_user', ['userId'])
  .index('by_session', ['sessionId'])
  .index('by_message', ['messageId'])
  .index('by_event_type', ['eventType'])
  .index('by_created_at', ['createdAt'])
  .index('by_organization_and_billing_period', ['organizationId', 'billingPeriod'])
  .index('by_workspace_and_billing_period', ['workspaceId', 'billingPeriod'])
\`\`\`

**Fields**:
- `organizationId`: Multi-tenancy isolation
- `workspaceId`: Links to the workspace
- `userId`: User who triggered the event
- `sessionId`: Optional session reference
- `messageId`: Optional message reference
- `eventType`: Token usage, API call, export, or storage
- `tokensUsed`: Number of tokens consumed
- `cost`: Credits deducted (optional)
- `metadata`: Additional context (inputTokens, outputTokens, cached, model, provider, finishReason, toolCallsCount, latency)
- `polarMeterId`: Optional reference to Polar meter
- `createdAt`: Timestamp of event creation
- `billingPeriod`: Billing period in "YYYY-MM" format

**Notes**:
- Immutable event log
- Used for billing and analytics
- Synced with Polar meters

---

### 25. Invitations

**Purpose**: Manage workspace invitations

\`\`\`typescript
invitations: defineTable({
  // Context
  organizationId: v.string(),
  workspaceId: v.id('workspaces'),
  
  // Invite Details
  email: v.string(),
  role: v.union(v.literal('admin'), v.literal('member')),
  
  // Metadata
  inviterId: v.string(),
  status: v.union(v.literal('pending'), v.literal('accepted'), v.literal('revoked')),
  token: v.string(), // Unique token for the invite link
  
  // Timestamps
  expiresAt: v.number(),
  createdAt: v.number(),
  acceptedAt: v.optional(v.number()),
})
  .index('by_email', ['email'])
  .index('by_token', ['token'])
  .index('by_workspace', ['workspaceId'])
\`\`\`

**Fields**:
- `organizationId`: Multi-tenancy isolation.
- `workspaceId`: The workspace the invitation is for.
- `email`: The email address of the invitee.
- `role`: The role the invitee will have ('admin' or 'member').
- `inviterId`: The user who sent the invitation.
- `status`: Current status of the invitation (pending, accepted, revoked).
- `token`: A unique token for generating the invite link.
- `expiresAt`: Timestamp when the invitation expires.
- `createdAt`: Timestamp when the invitation was created.
- `acceptedAt`: Timestamp when the invitation was accepted (optional).

**Notes**:
- Invitations are used to grant users access to specific workspaces.
- Tokens are used to create unique, time-limited invitation links.
- Status tracking allows for managing pending, accepted, and revoked invitations.

---

### 26. API Keys

**Purpose**: Manage programmatic access keys

\`\`\`typescript
apiKeys: defineTable({
  // Context
  organizationId: v.string(),
  workspaceId: v.id('workspaces'),
  userId: v.string(),
  
  // Key Details
  name: v.string(),
  keyPreview: v.string(), // e.g., "sk_live_...1234"
  secretHash: v.string(), // Hashed for security
  
  // Permissions
  scopes: v.array(v.string()), // e.g., ["read:messages", "write:sessions"]
  
  // Usage & Lifecycle
  lastUsedAt: v.optional(v.number()),
  expiresAt: v.optional(v.number()),
  
  createdAt: v.number(),
  revokedAt: v.optional(v.number()),
})
  .index('by_workspace', ['workspaceId'])
  .index('by_user', ['userId'])
  .index('by_hash', ['secretHash'])
\`\`\`

**Fields**:
- `organizationId`: Multi-tenancy isolation.
- `workspaceId`: The workspace the API key is associated with.
- `userId`: The user who owns the API key.
- `name`: A user-friendly name for the API key.
- `keyPreview`: A short, non-sensitive preview of the key (e.g., last few characters).
- `secretHash`: The securely hashed version of the API secret.
- `scopes`: An array of strings defining the permissions granted by this key.
- `lastUsedAt`: Timestamp of the last time the key was used (optional).
- `expiresAt`: Timestamp when the key automatically expires (optional).
- `createdAt`: Timestamp when the API key was created.
- `revokedAt`: Timestamp when the API key was revoked (optional).

**Notes**:
- API keys provide programmatic access to the Convex backend.
- Security is paramount: only the key preview and hash are stored.
- Scopes define granular permissions for API key usage.
- Lifecycle management includes optional expiration and revocation.

---

### 25. Roles

**Purpose**: Define professional roles for agents

\`\`\`typescript
roles: defineTable({
  // Unique identifier for the role
  id: v.string(), // e.g., "ceo", "software-architect"
  
  // Display name for the role
  name: v.string(), // e.g., "CEO", "Software Architect"
  
  // Category for grouping roles
  category: v.string(), // e.g., "Business & Strategy", "Technology & Engineering"
  
  // Detailed description of the role
  description: v.string(),
  
  // Areas of expertise associated with the role
  expertise: v.array(v.string()),
  
  // Base system prompt for this role
  systemPrompt: v.string(),
  
  // Emoji or icon representation
  icon: v.string(),
  
  // Indicates if this is a built-in system role
  isSystem: v.boolean(),
  
  // Indicates if the role is currently available for selection
  isActive: v.boolean(),
  
  // Optional: Organization ID for custom organization-specific roles
  organizationId: v.optional(v.string()),
  
  // Optional: Workspace ID for custom workspace-specific roles
  workspaceId: v.optional(v.string()),
  
  // Count of agents currently using this role
  usageCount: v.number(),
  
  // Timestamps
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index('by_id', ['id'])
  .index('by_organization', ['organizationId'])
  .index('by_workspace', ['workspaceId'])
  .index('by_category', ['category'])
  .index('by_is_system', ['isSystem'])
  .index('by_is_active', ['isActive'])
\`\`\`

**Fields**:
- `id`: Unique identifier for the role.
- `name`: Display name of the role.
- `category`: Category for grouping roles (e.g., Business, Technology).
- `description`: Detailed explanation of the role.
- `expertise`: List of expertise areas covered by the role.
- `systemPrompt`: The base system prompt associated with this role.
- `icon`: Visual representation (emoji or icon).
- `isSystem`: Boolean indicating if it's a pre-defined system role.
- `isActive`: Boolean indicating if the role is currently selectable.
- `organizationId`: Foreign key to `organizations` for custom roles.
- `workspaceId`: Foreign key to `workspaces` for custom roles.
- `usageCount`: Number of agents utilizing this role.
- `createdAt`, `updatedAt`: Timestamps for record management.

**Notes**:
- System roles are managed by the application.
- Organizations and workspaces can define their own custom roles.

---

### 26. Personas

**Purpose**: Define personality traits and communication styles for agents

\`\`\`typescript
personas: defineTable({
  // Unique identifier for the persona
  id: v.string(), // e.g., "analytical", "creative"
  
  // Display name for the persona
  name: v.string(), // e.g., "Analytical", "Creative"
  
  // Detailed description of the persona
  description: v.string(),
  
  // Key personality traits
  traits: v.array(v.string()),
  
  // Communication style of the persona
  communicationStyle: v.string(),
  
  // Decision-making approach of the persona
  decisionMaking: v.string(),
  
  // Prompt modifier to add personality flavor
  systemPromptModifier: v.string(),
  
  // Emoji or icon representation
  icon: v.string(),
  
  // Indicates if this is a built-in system persona
  isSystem: v.boolean(),
  
  // Indicates if the persona is currently available for selection
  isActive: v.boolean(),
  
  // Optional: Organization ID for custom organization-specific personas
  organizationId: v.optional(v.string()),
  
  // Optional: Workspace ID for custom workspace-specific personas
  workspaceId: v.optional(v.string()),
  
  // Count of agents currently using this persona
  usageCount: v.number(),
  
  // Timestamps
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index('by_id', ['id'])
  .index('by_organization', ['organizationId'])
  .index('by_workspace', ['workspaceId'])
  .index('by_is_system', ['isSystem'])
  .index('by_is_active', ['isActive'])
\`\`\`

**Fields**:
- `id`: Unique identifier for the persona.
- `name`: Display name of the persona.
- `description`: Detailed explanation of the persona.
- `traits`: List of personality traits.
- `communicationStyle`: Description of how the persona communicates.
- `decisionMaking`: Description of the persona's decision-making process.
- `systemPromptModifier`: Text snippet to modify the system prompt for personality.
- `icon`: Visual representation (emoji or icon).
- `isSystem`: Boolean indicating if it's a pre-defined system persona.
- `isActive`: Boolean indicating if the persona is currently selectable.
- `organizationId`: Foreign key to `organizations` for custom personas.
- `workspaceId`: Foreign key to `workspaces` for custom personas.
- `usageCount`: Number of agents utilizing this persona.
- `createdAt`, `updatedAt`: Timestamps for record management.

**Notes**:
- System personas are pre-defined.
- Custom personas can be created at organization or workspace levels.

---

### 27. Frameworks

**Purpose**: Define thinking methodologies and problem-solving frameworks

\`\`\`typescript
frameworks: defineTable({
  // Unique identifier for the framework
  id: v.string(), // e.g., "design-thinking", "first-principles"
  
  // Display name for the framework
  name: v.string(), // e.g., "Design Thinking", "First Principles"
  
  // Detailed description of the framework
  description: v.string(),
  
  // Brief methodology description
  methodology: v.string(),
  
  // Use cases or situations where the framework is best suited
  bestFor: v.array(v.string()), // e.g., ["Innovation", "Problem Solving"]
  
  // Steps involved in the framework
  steps: v.array(v.string()),
  
  // Prompt modifier to apply the framework's logic
  systemPromptModifier: v.string(),
  
  // Emoji or icon representation
  icon: v.string(),
  
  // Indicates if this is a built-in system framework
  isSystem: v.boolean(),
  
  // Indicates if the framework is currently available for selection
  isActive: v.boolean(),
  
  // Optional: Organization ID for custom organization-specific frameworks
  organizationId: v.optional(v.string()),
  
  // Optional: Workspace ID for custom workspace-specific frameworks
  workspaceId: v.optional(v.string()),
  
  // Count of agents currently using this framework
  usageCount: v.number(),
  
  // Timestamps
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index('by_id', ['id'])
  .index('by_organization', ['organizationId'])
  .index('by_workspace', ['workspaceId'])
  .index('by_is_system', ['isSystem'])
  .index('by_is_active', ['isActive'])
\`\`\`

**Fields**:
- `id`: Unique identifier for the framework.
- `name`: Display name of the framework.
- `description`: Detailed explanation of the framework.
- `methodology`: A concise description of the framework's methodology.
- `bestFor`: List of ideal use cases for the framework.
- `steps`: An array outlining the steps of the framework.
- `systemPromptModifier`: Text snippet to modify the system prompt to incorporate the framework.
- `icon`: Visual representation (emoji or icon).
- `isSystem`: Boolean indicating if it's a pre-defined system framework.
- `isActive`: Boolean indicating if the framework is currently selectable.
- `organizationId`: Foreign key to `organizations` for custom frameworks.
- `workspaceId`: Foreign key to `workspaces` for custom frameworks.
- `usageCount`: Number of agents utilizing this framework.
- `createdAt`, `updatedAt`: Timestamps for record management.

**Notes**:
- System frameworks are provided by default.
- Custom frameworks can be created and associated with organizations or workspaces.

---

## Module System for Agent Builder

The modular agent builder system consists of three core module types that can be independently managed and composed:

### Module Architecture

\`\`\`
Agent = Role + Persona + Framework + Configuration
\`\`\`

Each module type (Role, Persona, Framework) can be:
- **System-defined**: Built-in modules provided by the application
- **Organization-defined**: Custom modules created at organization level
- **Workspace-defined**: Custom modules created at workspace level
- **User-defined**: Personal modules created by individual users

### Module Relationships

\`\`\`
roles (1:N) ← agents.roleId
personas (1:N) ← agents.personaId  
frameworks (1:N) ← agents.frameworkId
\`\`\`

### Module Queries and Mutations

#### Roles

**Queries:**
\`\`\`typescript
// Get all active roles for a workspace
export const getRoles = query({
  args: {
    workspaceId: v.optional(v.id("workspaces")),
    organizationId: v.optional(v.string()),
    category: v.optional(v.string()),
    includeSystem: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Returns system roles + organization roles + workspace roles
    // Filtered by category if provided
    // Sorted by usageCount descending
  },
});

// Get single role by ID
export const getRole = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Returns role details
  },
});

// Search roles
export const searchRoles = query({
  args: {
    query: v.string(),
    workspaceId: v.optional(v.id("workspaces")),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Full-text search across name, description, expertise
  },
});
\`\`\`

**Mutations:**
\`\`\`typescript
// Create custom role
export const createRole = mutation({
  args: {
    name: v.string(),
    category: v.string(),
    description: v.string(),
    expertise: v.array(v.string()),
    systemPrompt: v.string(),
    icon: v.string(),
    organizationId: v.optional(v.string()),
    workspaceId: v.optional(v.id("workspaces")),
  },
  handler: async (ctx, args) => {
    // Creates new custom role
    // Validates uniqueness within scope
  },
});

// Update role
export const updateRole = mutation({
  args: {
    id: v.string(),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    expertise: v.optional(v.array(v.string())),
    systemPrompt: v.optional(v.string()),
    icon: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // Updates role
    // Only allows updating custom roles (not system roles)
  },
});

// Delete role
export const deleteRole = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Soft delete (sets isActive = false)
    // Checks if role is in use by agents
  },
});

// Increment usage count
export const incrementRoleUsage = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Increments usageCount when role is used in agent
  },
});
\`\`\`

#### Personas

**Queries:**
\`\`\`typescript
// Get all active personas
export const getPersonas = query({
  args: {
    workspaceId: v.optional(v.id("workspaces")),
    organizationId: v.optional(v.string()),
    includeSystem: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Returns system personas + organization personas + workspace personas
    // Sorted by usageCount descending
  },
});

// Get single persona by ID
export const getPersona = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Returns persona details
  },
});

// Search personas
export const searchPersonas = query({
  args: {
    query: v.string(),
    workspaceId: v.optional(v.id("workspaces")),
  },
  handler: async (ctx, args) => {
    // Full-text search across name, description, traits
  },
});
\`\`\`

**Mutations:**
\`\`\`typescript
// Create custom persona
export const createPersona = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    traits: v.array(v.string()),
    communicationStyle: v.string(),
    decisionMaking: v.string(),
    systemPromptModifier: v.string(),
    icon: v.string(),
    organizationId: v.optional(v.string()),
    workspaceId: v.optional(v.id("workspaces")),
  },
  handler: async (ctx, args) => {
    // Creates new custom persona
  },
});

// Update persona
export const updatePersona = mutation({
  args: {
    id: v.string(),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    traits: v.optional(v.array(v.string())),
    communicationStyle: v.optional(v.string()),
    decisionMaking: v.optional(v.string()),
    systemPromptModifier: v.optional(v.string()),
    icon: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // Updates persona
  },
});

// Delete persona
export const deletePersona = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Soft delete (sets isActive = false)
  },
});

// Increment usage count
export const incrementPersonaUsage = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Increments usageCount
  },
});
\`\`\`

#### Frameworks

**Queries:**
\`\`\`typescript
// Get all active frameworks
export const getFrameworks = query({
  args: {
    workspaceId: v.optional(v.id("workspaces")),
    organizationId: v.optional(v.string()),
    includeSystem: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Returns system frameworks + organization frameworks + workspace frameworks
    // Sorted by usageCount descending
  },
});

// Get single framework by ID
export const getFramework = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Returns framework details
  },
});

// Search frameworks
export const searchFrameworks = query({
  args: {
    query: v.string(),
    workspaceId: v.optional(v.id("workspaces")),
  },
  handler: async (ctx, args) => {
    // Full-text search across name, description, methodology
  },
});
\`\`\`

**Mutations:**
\`\`\`typescript
// Create custom framework
export const createFramework = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    methodology: v.string(),
    bestFor: v.array(v.string()),
    steps: v.array(v.string()),
    systemPromptModifier: v.string(),
    icon: v.string(),
    organizationId: v.optional(v.string()),
    workspaceId: v.optional(v.id("workspaces")),
  },
  handler: async (ctx, args) => {
    // Creates new custom framework
  },
});

// Update framework
export const updateFramework = mutation({
  args: {
    id: v.string(),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    methodology: v.optional(v.string()),
    bestFor: v.optional(v.array(v.string())),
    steps: v.optional(v.array(v.string())),
    systemPromptModifier: v.optional(v.string()),
    icon: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // Updates framework
  },
});

// Delete framework
export const deleteFramework = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Soft delete (sets isActive = false)
  },
});

// Increment usage count
export const incrementFrameworkUsage = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Increments usageCount
  },
});
\`\`\`

### Agent Composition

When creating an agent, the system:
1. Fetches the selected role, persona, and framework modules
2. Combines their system prompts:
   \`\`\`
   finalSystemPrompt = role.systemPrompt + "\n\n" + persona.systemPromptModifier + "\n\n" + framework.systemPromptModifier
   \`\`\`
3. Stores the composed prompt in `agents.systemPrompt`
4. Increments usage counts for all three modules
5. Stores module IDs for future reference and updates

### Module Reusability

Modules can be:
- **Reused across multiple agents**: Same role/persona/framework in different combinations
- **Updated globally**: Changes to a module affect all agents using it (if they regenerate their system prompt)
- **Shared within scope**: System modules available to all, organization modules to all workspaces, workspace modules to all members
- **Versioned**: Future enhancement to track module versions and agent compatibility

### Module Queries and Mutations

#### Roles

**Queries:**
\`\`\`typescript
// Get all active roles for a workspace
export const getRoles = query({
  args: {
    workspaceId: v.optional(v.id("workspaces")),
    organizationId: v.optional(v.string()),
    category: v.optional(v.string()),
    includeSystem: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Returns system roles + organization roles + workspace roles
    // Filtered by category if provided
    // Sorted by usageCount descending
  },
});

// Get single role by ID
export const getRole = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Returns role details
  },
});

// Search roles
export const searchRoles = query({
  args: {
    query: v.string(),
    workspaceId: v.optional(v.id("workspaces")),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Full-text search across name, description, expertise
  },
});
\`\`\`

**Mutations:**
\`\`\`typescript
// Create custom role
export const createRole = mutation({
  args: {
    name: v.string(),
    category: v.string(),
    description: v.string(),
    expertise: v.array(v.string()),
    systemPrompt: v.string(),
    icon: v.string(),
    organizationId: v.optional(v.string()),
    workspaceId: v.optional(v.id("workspaces")),
  },
  handler: async (ctx, args) => {
    // Creates new custom role
    // Validates uniqueness within scope
  },
});

// Update role
export const updateRole = mutation({
  args: {
    id: v.string(),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    expertise: v.optional(v.array(v.string())),
    systemPrompt: v.optional(v.string()),
    icon: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // Updates role
    // Only allows updating custom roles (not system roles)
  },
});

// Delete role
export const deleteRole = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Soft delete (sets isActive = false)
    // Checks if role is in use by agents
  },
});

// Increment usage count
export const incrementRoleUsage = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Increments usageCount when role is used in agent
  },
});
\`\`\`

#### Personas

**Queries:**
\`\`\`typescript
// Get all active personas
export const getPersonas = query({
  args: {
    workspaceId: v.optional(v.id("workspaces")),
    organizationId: v.optional(v.string()),
    includeSystem: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Returns system personas + organization personas + workspace personas
    // Sorted by usageCount descending
  },
});

// Get single persona by ID
export const getPersona = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Returns persona details
  },
});

// Search personas
export const searchPersonas = query({
  args: {
    query: v.string(),
    workspaceId: v.optional(v.id("workspaces")),
  },
  handler: async (ctx, args) => {
    // Full-text search across name, description, traits
  },
});
\`\`\`

**Mutations:**
\`\`\`typescript
// Create custom persona
export const createPersona = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    traits: v.array(v.string()),
    communicationStyle: v.string(),
    decisionMaking: v.string(),
    systemPromptModifier: v.string(),
    icon: v.string(),
    organizationId: v.optional(v.string()),
    workspaceId: v.optional(v.id("workspaces")),
  },
  handler: async (ctx, args) => {
    // Creates new custom persona
  },
});

// Update persona
export const updatePersona = mutation({
  args: {
    id: v.string(),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    traits: v.optional(v.array(v.string())),
    communicationStyle: v.optional(v.string()),
    decisionMaking: v.optional(v.string()),
    systemPromptModifier: v.optional(v.string()),
    icon: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // Updates persona
  },
});

// Delete persona
export const deletePersona = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Soft delete (sets isActive = false)
  },
});

// Increment usage count
export const incrementPersonaUsage = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Increments usageCount
  },
});
\`\`\`

#### Frameworks

**Queries:**
\`\`\`typescript
// Get all active frameworks
export const getFrameworks = query({
  args: {
    workspaceId: v.optional(v.id("workspaces")),
    organizationId: v.optional(v.string()),
    includeSystem: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Returns system frameworks + organization frameworks + workspace frameworks
    // Sorted by usageCount descending
  },
});

// Get single framework by ID
export const getFramework = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Returns framework details
  },
});

// Search frameworks
export const searchFrameworks = query({
  args: {
    query: v.string(),
    workspaceId: v.optional(v.id("workspaces")),
  },
  handler: async (ctx, args) => {
    // Full-text search across name, description, methodology
  },
});
\`\`\`

**Mutations:**
\`\`\`typescript
// Create custom framework
export const createFramework = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    methodology: v.string(),
    bestFor: v.array(v.string()),
    steps: v.array(v.string()),
    systemPromptModifier: v.string(),
    icon: v.string(),
    organizationId: v.optional(v.string()),
    workspaceId: v.optional(v.id("workspaces")),
  },
  handler: async (ctx, args) => {
    // Creates new custom framework
  },
});

// Update framework
export const updateFramework = mutation({
  args: {
    id: v.string(),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    methodology: v.optional(v.string()),
    bestFor: v.optional(v.array(v.string())),
    steps: v.optional(v.array(v.string())),
    systemPromptModifier: v.optional(v.string()),
    icon: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // Updates framework
  },
});

// Delete framework
export const deleteFramework = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Soft delete (sets isActive = false)
  },
});

// Increment usage count
export const incrementFrameworkUsage = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Increments usageCount
  },
});
\`\`\`

### Agent Composition

When creating an agent, the system:
1. Fetches the selected role, persona, and framework modules
2. Combines their system prompts:
   \`\`\`
   finalSystemPrompt = role.systemPrompt + "\n\n" + persona.systemPromptModifier + "\n\n" + framework.systemPromptModifier
   \`\`\`
3. Stores the composed prompt in `agents.systemPrompt`
4. Increments usage counts for all three modules
5. Stores module IDs for future reference and updates

### Module Reusability

Modules can be:
- **Reused across multiple agents**: Same role/persona/framework in different combinations
- **Updated globally**: Changes to a module affect all agents using it (if they regenerate their system prompt)
- **Shared within scope**: System modules available to all, organization modules to all workspaces, workspace modules to all members
- **Versioned**: Future enhancement to track module versions and agent compatibility

### Module Queries and Mutations

#### Roles

**Queries:**
\`\`\`typescript
// Get all active roles for a workspace
export const getRoles = query({
  args: {
    workspaceId: v.optional(v.id("workspaces")),
    organizationId: v.optional(v.string()),
    category: v.optional(v.string()),
    includeSystem: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Returns system roles + organization roles + workspace roles
    // Filtered by category if provided
    // Sorted by usageCount descending
  },
});

// Get single role by ID
export const getRole = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Returns role details
  },
});

// Search roles
export const searchRoles = query({
  args: {
    query: v.string(),
    workspaceId: v.optional(v.id("workspaces")),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Full-text search across name, description, expertise
  },
});
\`\`\`

**Mutations:**
\`\`\`typescript
// Create custom role
export const createRole = mutation({
  args: {
    name: v.string(),
    category: v.string(),
    description: v.string(),
    expertise: v.array(v.string()),
    systemPrompt: v.string(),
    icon: v.string(),
    organizationId: v.optional(v.string()),
    workspaceId: v.optional(v.id("workspaces")),
  },
  handler: async (ctx, args) => {
    // Creates new custom role
    // Validates uniqueness within scope
  },
});

// Update role
export const updateRole = mutation({
  args: {
    id: v.string(),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    expertise: v.optional(v.array(v.string())),
    systemPrompt: v.optional(v.string()),
    icon: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // Updates role
    // Only allows updating custom roles (not system roles)
  },
});

// Delete role
export const deleteRole = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Soft delete (sets isActive = false)
    // Checks if role is in use by agents
  },
});

// Increment usage count
export const incrementRoleUsage = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Increments usageCount when role is used in agent
  },
});
\`\`\`

#### Personas

**Queries:**
\`\`\`typescript
// Get all active personas
export const getPersonas = query({
  args: {
    workspaceId: v.optional(v.id("workspaces")),
    organizationId: v.optional(v.string()),
    includeSystem: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Returns system personas + organization personas + workspace personas
    // Sorted by usageCount descending
  },
});

// Get single persona by ID
export const getPersona = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Returns persona details
  },
});

// Search personas
export const searchPersonas = query({
  args: {
    query: v.string(),
    workspaceId: v.optional(v.id("workspaces")),
  },
  handler: async (ctx, args) => {
    // Full-text search across name, description, traits
  },
});
\`\`\`

**Mutations:**
\`\`\`typescript
// Create custom persona
export const createPersona = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    traits: v.array(v.string()),
    communicationStyle: v.string(),
    decisionMaking: v.string(),
    systemPromptModifier: v.string(),
    icon: v.string(),
    organizationId: v.optional(v.string()),
    workspaceId: v.optional(v.id("workspaces")),
  },
  handler: async (ctx, args) => {
    // Creates new custom persona
  },
});

// Update persona
export const updatePersona = mutation({
  args: {
    id: v.string(),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    traits: v.optional(v.array(v.string())),
    communicationStyle: v.optional(v.string()),
    decisionMaking: v.optional(v.string()),
    systemPromptModifier: v.optional(v.string()),
    icon: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // Updates persona
  },
});

// Delete persona
export const deletePersona = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Soft delete (sets isActive = false)
  },
});

// Increment usage count
export const incrementPersonaUsage = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Increments usageCount
  },
});
\`\`\`

#### Frameworks

**Queries:**
\`\`\`typescript
// Get all active frameworks
export const getFrameworks = query({
  args: {
    workspaceId: v.optional(v.id("workspaces")),
    organizationId: v.optional(v.string()),
    includeSystem: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Returns system frameworks + organization frameworks + workspace frameworks
    // Sorted by usageCount descending
  },
});

// Get single framework by ID
export const getFramework = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Returns framework details
  },
});

// Search frameworks
export const searchFrameworks = query({
  args: {
    query: v.string(),
    workspaceId: v.optional(v.id("workspaces")),
  },
  handler: async (ctx, args) => {
    // Full-text search across name, description, methodology
  },
});
\`\`\`

**Mutations:**
\`\`\`typescript
// Create custom framework
export const createFramework = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    methodology: v.string(),
    bestFor: v.array(v.string()),
    steps: v.array(v.string()),
    systemPromptModifier: v.string(),
    icon: v.string(),
    organizationId: v.optional(v.string()),
    workspaceId: v.optional(v.id("workspaces")),
  },
  handler: async (ctx, args) => {
    // Creates new custom framework
  },
});

// Update framework
export const updateFramework = mutation({
  args: {
    id: v.string(),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    methodology: v.optional(v.string()),
    bestFor: v.optional(v.array(v.string())),
    steps: v.optional(v.array(v.string())),
    systemPromptModifier: v.optional(v.string()),
    icon: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // Updates framework
  },
});

// Delete framework
export const deleteFramework = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Soft delete (sets isActive = false)
  },
});

// Increment usage count
export const incrementFrameworkUsage = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Increments usageCount
  },
});
\`\`\`

### Agent Composition

When creating an agent, the system:
1. Fetches the selected role, persona, and framework modules
2. Combines their system prompts:
   \`\`\`
   finalSystemPrompt = role.systemPrompt + "\n\n" + persona.systemPromptModifier + "\n\n" + framework.systemPromptModifier
   \`\`\`
3. Stores the composed prompt in `agents.systemPrompt`
4. Increments usage counts for all three modules
5. Stores module IDs for future reference and updates

### Module Reusability

Modules can be:
- **Reused across multiple agents**: Same role/persona/framework in different combinations
- **Updated globally**: Changes to a module affect all agents using it (if they regenerate their system prompt)
- **Shared within scope**: System modules available to all, organization modules to all workspaces, workspace modules to all members
- **Versioned**: Future enhancement to track module versions and agent compatibility

### Module Queries and Mutations

#### Roles

**Queries:**
\`\`\`typescript
// Get all active roles for a workspace
export const getRoles = query({
  args: {
    workspaceId: v.optional(v.id("workspaces")),
    organizationId: v.optional(v.string()),
    category: v.optional(v.string()),
    includeSystem: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Returns system roles + organization roles + workspace roles
    // Filtered by category if provided
    // Sorted by usageCount descending
  },
});

// Get single role by ID
export const getRole = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Returns role details
  },
});

// Search roles
export const searchRoles = query({
  args: {
    query: v.string(),
    workspaceId: v.optional(v.id("workspaces")),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Full-text search across name, description, expertise
  },
});
\`\`\`

**Mutations:**
\`\`\`typescript
// Create custom role
export const createRole = mutation({
  args: {
    name: v.string(),
    category: v.string(),
    description: v.string(),
    expertise: v.array(v.string()),
    systemPrompt: v.string(),
    icon: v.string(),
    organizationId: v.optional(v.string()),
    workspaceId: v.optional(v.id("workspaces")),
  },
  handler: async (ctx, args) => {
    // Creates new custom role
    // Validates uniqueness within scope
  },
});

// Update role
export const updateRole = mutation({
  args: {
    id: v.string(),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    expertise: v.optional(v.array(v.string())),
    systemPrompt: v.optional(v.string()),
    icon: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // Updates role
    // Only allows updating custom roles (not system roles)
  },
});

// Delete role
export const deleteRole = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Soft delete (sets isActive = false)
    // Checks if role is in use by agents
  },
});

// Increment usage count
export const incrementRoleUsage = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Increments usageCount when role is used in agent
  },
});
\`\`\`

#### Personas

**Queries:**
\`\`\`typescript
// Get all active personas
export const getPersonas = query({
  args: {
    workspaceId: v.optional(v.id("workspaces")),
    organizationId: v.optional(v.string()),
    includeSystem: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Returns system personas + organization personas + workspace personas
    // Sorted by usageCount descending
  },
});

// Get single persona by ID
export const getPersona = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Returns persona details
  },
});

// Search personas
export const searchPersonas = query({
  args: {
    query: v.string(),
    workspaceId: v.optional(v.id("workspaces")),
  },
  handler: async (ctx, args) => {
    // Full-text search across name, description, traits
  },
});
\`\`\`

**Mutations:**
\`\`\`typescript
// Create custom persona
export const createPersona = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    traits: v.array(v.string()),
    communicationStyle: v.string(),
    decisionMaking: v.string(),
    systemPromptModifier: v.string(),
    icon: v.string(),
    organizationId: v.optional(v.string()),
    workspaceId: v.optional(v.id("workspaces")),
  },
  handler: async (ctx, args) => {
    // Creates new custom persona
  },
});

// Update persona
export const updatePersona = mutation({
  args: {
    id: v.string(),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    traits: v.optional(v.array(v.string())),
    communicationStyle: v.optional(v.string()),
    decisionMaking: v.optional(v.string()),
    systemPromptModifier: v.optional(v.string()),
    icon: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // Updates persona
  },
});

// Delete persona
export const deletePersona = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Soft delete (sets isActive = false)
  },
});

// Increment usage count
export const incrementPersonaUsage = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Increments usageCount
  },
});
\`\`\`

#### Frameworks

**Queries:**
\`\`\`typescript
// Get all active frameworks
export const getFrameworks = query({
  args: {
    workspaceId: v.optional(v.id("workspaces")),
    organizationId: v.optional(v.string()),
    includeSystem: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Returns system frameworks + organization frameworks + workspace frameworks
    // Sorted by usageCount descending
  },
});

// Get single framework by ID
export const getFramework = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Returns framework details
  },
});

// Search frameworks
export const searchFrameworks = query({
  args: {
    query: v.string(),
    workspaceId: v.optional(v.id("workspaces")),
  },
  handler: async (ctx, args) => {
    // Full-text search across name, description, methodology
  },
});
\`\`\`

**Mutations:**
\`\`\`typescript
// Create custom framework
export const createFramework = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    methodology: v.string(),
    bestFor: v.array(v.string()),
    steps: v.array(v.string()),
    systemPromptModifier: v.string(),
    icon: v.string(),
    organizationId: v.optional(v.string()),
    workspaceId: v.optional(v.id("workspaces")),
  },
  handler: async (ctx, args) => {
    // Creates new custom framework
  },
});

// Update framework
export const updateFramework = mutation({
  args: {
    id: v.string(),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    methodology: v.optional(v.string()),
    bestFor: v.optional(v.array(v.string())),
    steps: v.optional(v.array(v.string())),
    systemPromptModifier: v.optional(v.string()),
    icon: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // Updates framework
  },
});

// Delete framework
export const deleteFramework = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Soft delete (sets isActive = false)
  },
});

// Increment usage count
export const incrementFrameworkUsage = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Increments usageCount
  },
});
\`\`\`

### Agent Composition

When creating an agent, the system:
1. Fetches the selected role, persona, and framework modules
2. Combines their system prompts:
   \`\`\`
   finalSystemPrompt = role.systemPrompt + "\n\n" + persona.systemPromptModifier + "\n\n" + framework.systemPromptModifier
   \`\`\`
3. Stores the composed prompt in `agents.systemPrompt`
4. Increments usage counts for all three modules
5. Stores module IDs for future reference and updates

### Module Reusability

Modules can be:
- **Reused across multiple agents**: Same role/persona/framework in different combinations
- **Updated globally**: Changes to a module affect all agents using it (if they regenerate their system prompt)
- **Shared within scope**: System modules available to all, organization modules to all workspaces, workspace modules to all members
- **Versioned**: Future enhancement to track module versions and agent compatibility

### Module Queries and Mutations

#### Roles

**Queries:**
\`\`\`typescript
// Get all active roles for a workspace
export const getRoles = query({
  args: {
    workspaceId: v.optional(v.id("workspaces")),
    organizationId: v.optional(v.string()),
    category: v.optional(v.string()),
    includeSystem: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Returns system roles + organization roles + workspace roles
    // Filtered by category if provided
    // Sorted by usageCount descending
  },
});

// Get single role by ID
export const getRole = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Returns role details
  },
});

// Search roles
export const searchRoles = query({
  args: {
    query: v.string(),
    workspaceId: v.optional(v.id("workspaces")),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Full-text search across name, description, expertise
  },
});
\`\`\`

**Mutations:**
\`\`\`typescript
// Create custom role
export const createRole = mutation({
  args: {
    name: v.string(),
    category: v.string(),
    description: v.string(),
    expertise: v.array(v.string()),
    systemPrompt: v.string(),
    icon: v.string(),
    organizationId: v.optional(v.string()),
    workspaceId: v.optional(v.id("workspaces")),
  },
  handler: async (ctx, args) => {
    // Creates new custom role
    // Validates uniqueness within scope
  },
});

// Update role
export const updateRole = mutation({
  args: {
    id: v.string(),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    expertise: v.optional(v.array(v.string())),
    systemPrompt: v.optional(v.string()),
    icon: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // Updates role
    // Only allows updating custom roles (not system roles)
  },
});

// Delete role
export const deleteRole = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Soft delete (sets isActive = false)
    // Checks if role is in use by agents
  },
});

// Increment usage count
export const incrementRoleUsage = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Increments usageCount when role is used in agent
  },
});
\`\`\`

#### Personas

**Queries:**
\`\`\`typescript
// Get all active personas
export const getPersonas = query({
  args: {
    workspaceId: v.optional(v.id("workspaces")),
    organizationId: v.optional(v.string()),
    includeSystem: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Returns system personas + organization personas + workspace personas
    // Sorted by usageCount descending
  },
});

// Get single persona by ID
export const getPersona = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Returns persona details
  },
});

// Search personas
export const searchPersonas = query({
  args: {
    query: v.string(),
    workspaceId: v.optional(v.id("workspaces")),
  },
  handler: async (ctx, args) => {
    // Full-text search across name, description, traits
  },
});
\`\`\`

**Mutations:**
\`\`\`typescript
// Create custom persona
export const createPersona = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    traits: v.array(v.string()),
    communicationStyle: v.string(),
    decisionMaking: v.string(),
    systemPromptModifier: v.string(),
    icon: v.string(),
    organizationId: v.optional(v.string()),
    workspaceId: v.optional(v.id("workspaces")),
  },
  handler: async (ctx, args) => {
    // Creates new custom persona
  },
});

// Update persona
export const updatePersona = mutation({
  args: {
    id: v.string(),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    traits: v.optional(v.array(v.string())),
    communicationStyle: v.optional(v.string()),
    decisionMaking: v.optional(v.string()),
    systemPromptModifier: v.optional(v.string()),
    icon: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // Updates persona
  },
});

// Delete persona
export const deletePersona = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Soft delete (sets isActive = false)
  },
});

// Increment usage count
export const incrementPersonaUsage = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Increments usageCount
  },
});
\`\`\`

#### Frameworks

**Queries:**
\`\`\`typescript
// Get all active frameworks
export const getFrameworks = query({
  args: {
    workspaceId: v.optional(v.id("workspaces")),
    organizationId: v.optional(v.string()),
    includeSystem: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Returns system frameworks + organization frameworks + workspace frameworks
    // Sorted by usageCount descending
  },
});

// Get single framework by ID
export const getFramework = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Returns framework details
  },
});

// Search frameworks
export const searchFrameworks = query({
  args: {
    query: v.string(),
    workspaceId: v.optional(v.id("workspaces")),
  },
  handler: async (ctx, args) => {
    // Full-text search across name, description, methodology
  },
});
\`\`\`

**Mutations:**
\`\`\`typescript
// Create custom framework
export const createFramework = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    methodology: v.string(),
    bestFor: v.array(v.string()),
    steps: v.array(v.string()),
    systemPromptModifier: v.string(),
    icon: v.string(),
    organizationId: v.optional(v.string()),
    workspaceId: v.optional(v.id("workspaces")),
  },
  handler: async (ctx, args) => {
    // Creates new custom framework
  },
});

// Update framework
export const updateFramework = mutation({
  args: {
    id: v.string(),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    methodology: v.optional(v.string()),
    bestFor: v.optional(v.array(v.string())),
    steps: v.optional(v.array(v.string())),
    systemPromptModifier: v.optional(v.string()),
    icon: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // Updates framework
  },
});

// Delete framework
export const deleteFramework = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Soft delete (sets isActive = false)
  },
});

// Increment usage count
export const incrementFrameworkUsage = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Increments usageCount
  },
});
\`\`\`

### Agent Composition

When creating an agent, the system:
1. Fetches the selected role, persona, and framework modules
2. Combines their system prompts:
   \`\`\`
   finalSystemPrompt = role.systemPrompt + "\n\n" + persona.systemPromptModifier + "\n\n" + framework.systemPromptModifier
   \`\`\`
3. Stores the composed prompt in `agents.systemPrompt`
4. Increments usage counts for all three modules
5. Stores module IDs for future reference and updates

### Module Reusability

Modules can be:
- **Reused across multiple agents**: Same role/persona/framework in different combinations
- **Updated globally**: Changes to a module affect all agents using it (if they regenerate their system prompt)
- **Shared within scope**: System modules available to all, organization modules to all workspaces, workspace modules to all members
- **Versioned**: Future enhancement to track module versions and agent compatibility

### Module Queries and Mutations

#### Roles

**Queries:**
\`\`\`typescript
// Get all active roles for a workspace
export const getRoles = query({
  args: {
    workspaceId: v.optional(v.id("workspaces")),
    organizationId: v.optional(v.string()),
    category: v.optional(v.string()),
    includeSystem: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Returns system roles + organization roles + workspace roles
    // Filtered by category if provided
    // Sorted by usageCount descending
  },
});

// Get single role by ID
export const getRole = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Returns role details
  },
});

// Search roles
export const searchRoles = query({
  args: {
    query: v.string(),
    workspaceId: v.optional(v.id("workspaces")),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Full-text search across name, description, expertise
  },
});
\`\`\`

**Mutations:**
\`\`\`typescript
// Create custom role
export const createRole = mutation({
  args: {
    name: v.string(),
    category: v.string(),
    description: v.string(),
    expertise: v.array(v.string()),
    systemPrompt: v.string(),
    icon: v.string(),
    organizationId: v.optional(v.string()),
    workspaceId: v.optional(v.id("workspaces")),
  },
  handler: async (ctx, args) => {
    // Creates new custom role
    // Validates uniqueness within scope
  },
});

// Update role
export const updateRole = mutation({
  args: {
    id: v.string(),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    expertise: v.optional(v.array(v.string())),
    systemPrompt: v.optional(v.string()),
    icon: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // Updates role
    // Only allows updating custom roles (not system roles)
  },
});

// Delete role
export const deleteRole = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Soft delete (sets isActive = false)
    // Checks if role is in use by agents
  },
});

// Increment usage count
export const incrementRoleUsage = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Increments usageCount when role is used in agent
  },
});
\`\`\`

#### Personas

**Queries:**
\`\`\`typescript
// Get all active personas
export const getPersonas = query({
  args: {
    workspaceId: v.optional(v.id("workspaces")),
    organizationId: v.optional(v.string()),
    includeSystem: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Returns system personas + organization personas + workspace personas
    // Sorted by usageCount descending
  },
});

// Get single persona by ID
export const getPersona = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Returns persona details
  },
});

// Search personas
export const searchPersonas = query({
  args: {
    query: v.string(),
    workspaceId: v.optional(v.id("workspaces")),
  },
  handler: async (ctx, args) => {
    // Full-text search across name, description, traits
  },
});
\`\`\`

**Mutations:**
\`\`\`typescript
// Create custom persona
export const createPersona = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    traits: v.array(v.string()),
    communicationStyle: v.string(),
    decisionMaking: v.string(),
    systemPromptModifier: v.string(),
    icon: v.string(),
    organizationId: v.optional(v.string()),
    workspaceId: v.optional(v.id("workspaces")),
  },
  handler: async (ctx, args) => {
    // Creates new custom persona
  },
});

// Update persona
export const updatePersona = mutation({
  args: {
    id: v.string(),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    traits: v.optional(v.array(v.string())),
    communicationStyle: v.optional(v.string()),
    decisionMaking: v.optional(v.string()),
    systemPromptModifier: v.optional(v.string()),
    icon: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // Updates persona
  },
});

// Delete persona
export const deletePersona = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Soft delete (sets isActive = false)
  },
});

// Increment usage count
export const incrementPersonaUsage = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Increments usageCount
  },
});
\`\`\`

#### Frameworks

**Queries:**
\`\`\`typescript
// Get all active frameworks
export const getFrameworks = query({
  args: {
    workspaceId: v.optional(v.id("workspaces")),
    organizationId: v.optional(v.string()),
    includeSystem: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Returns system frameworks + organization frameworks + workspace frameworks
    // Sorted by usageCount descending
  },
});

// Get single framework by ID
export const getFramework = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Returns framework details
  },
});

// Search frameworks
export const searchFrameworks = query({
  args: {
    query: v.string(),
    workspaceId: v.optional(v.id("workspaces")),
  },
  handler: async (ctx, args) => {
    // Full-text search across name, description, methodology
  },
});
\`\`\`

**Mutations:**
\`\`\`typescript
// Create custom framework
export const createFramework = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    methodology: v.string(),
    bestFor: v.array(v.string()),
    steps: v.array(v.string()),
    systemPromptModifier: v.string(),
    icon: v.string(),
    organizationId: v.optional(v.string()),
    workspaceId: v.optional(v.id("workspaces")),
  },
  handler: async (ctx, args) => {
    // Creates new custom framework
  },
});

// Update framework
export const updateFramework = mutation({
  args: {
    id: v.string(),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    methodology: v.optional(v.string()),
    bestFor: v.optional(v.array(v.string())),
    steps: v.optional(v.array(v.string())),
    systemPromptModifier: v.optional(v.string()),
    icon: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // Updates framework
  },
});

// Delete framework
export const deleteFramework = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Soft delete (sets isActive = false)
  },
});

// Increment usage count
export const incrementFrameworkUsage = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Increments usageCount
  },
});
\`\`\`

### Agent Composition

When creating an agent, the system:
1. Fetches the selected role, persona, and framework modules
2. Combines their system prompts:
   \`\`\`
   finalSystemPrompt = role.systemPrompt + "\n\n" + persona.systemPromptModifier + "\n\n" + framework.systemPromptModifier
   \`\`\`
3. Stores the composed prompt in `agents.systemPrompt`
4. Increments usage counts for all three modules
5. Stores module IDs for future reference and updates

### Module Reusability

Modules can be:
- **Reused across multiple agents**: Same role/persona/framework in different combinations
- **Updated globally**: Changes to a module affect all agents using it (if they regenerate their system prompt)
- **Shared within scope**: System modules available to all, organization modules to all workspaces, workspace modules to all members
- **Versioned**: Future enhancement to track module versions and agent compatibility

### Mobile-First Considerations

The module system is designed with mobile-first principles:
- **Quick queries**: Indexed by organization, workspace, category for fast filtering
- **Minimal data transfer**: Only fetch active modules, paginate results
- **Offline support**: Cache frequently used modules in localStorage
- **Touch-optimized**: Module cards designed for 80px minimum height
- **Search-first**: Full-text search across all module fields for quick discovery

---

### 28. Collaboration Events

**Purpose**: Track real-time collaboration events for auditing and playback

\`\`\`typescript
collaborationEvents: defineTable({
  // Organization isolation
  organizationId: v.string(),
  
  // Workspace reference
  workspaceId: v.id('workspaces'),
  
  // Session reference
  sessionId: v.id('sessions'),
  
  // Artifact reference (the artifact being collaborated on)
  artifactId: v.id('artifacts'),
  
  // User reference (optional, can be agent for automated actions)
  userId: v.optional(v.string()),
  
  // Agent reference (optional, for agent-initiated actions)
  agentId: v.optional(v.id('agents')),
  
  // Type of event
  eventType: v.union(
    v.literal('edit'),
    v.literal('comment'),
    v.literal('cursor'),
    v.literal('view'),
    v.literal('create'),
    v.literal('delete')
  ),
  
  // Description of the event
  description: v.string(),
  
  // Event-specific metadata
  metadata: v.object({
    field: v.optional(v.string()), // e.g., "title", "content", "description"
    oldValue: v.optional(v.string()), // The value before the change
    newValue: v.optional(v.string()), // The value after the change
    position: v.optional(v.object({ // Cursor position
      x: v.number(),
      y: v.number(),
    })),
    color: v.optional(v.string()), // Cursor color for identification
  }),
  
  // Timestamp of when the event occurred
  timestamp: v.number(),
  
  // Timestamp of when the event was logged
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
  .index('by_timestamp', ['organizationId', 'timestamp'])
\`\`\`

**Fields**:
- `organizationId`: Multi-tenancy isolation.
- `workspaceId`: Links to the workspace.
- `sessionId`: Links to the session where the collaboration occurred.
- `artifactId`: Links to the specific artifact being collaborated on.
- `userId`: The user who performed the action (optional).
- `agentId`: The agent that performed the action (optional).
- `eventType`: The type of collaboration event (edit, comment, cursor, view, create, delete).
- `description`: A human-readable description of the event.
- `metadata`: Additional details specific to the event type (e.g., field changes, cursor position, color).
- `timestamp`: The time the event actually occurred.
- `createdAt`: The time the event was logged in the database.

**Notes**:
- This table provides a log of real-time collaboration activities.
- Can be used for auditing, debugging, or replaying collaborative sessions.
- Crucial for implementing features like collaborative editing and presence indicators.

---

### 29. Working Memory

**Purpose**: Store persistent memory for AI agents across different scopes

\`\`\`typescript
workingMemory: defineTable({
  // Organization and workspace isolation
  organizationId: v.string(),
  workspaceId: v.string(),
  
  // Scope and identifiers
  scope: v.union(
    v.literal('chat'),
    v.literal('user'),
    v.literal('workspace'),
    v.literal('organization')
  ),
  chatId: v.optional(v.id('sessions')), // For 'chat' scope
  userId: v.optional(v.string()), // For 'user' scope
  
  // Memory content
  title: v.string(),
  category: v.string(), // Technical, Business, Domain Knowledge, Policies, Processes, General
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
  .index('by_source_debate', ['sourceDebateId'])
\`\`\`

**Fields**:
- `organizationId`: Multi-tenancy isolation
- `workspaceId`: Workspace isolation
- `scope`: Memory scope (chat, user, workspace, organization)
- `chatId`: Links to session for 'chat' scope (optional)
- `userId`: Links to user for 'user' scope (optional)
- `title`: Short descriptive title for the memory
- `category`: Category for organization (Technical, Business, Domain Knowledge, Policies, Processes, General)
- `content`: Markdown-formatted memory content with learned facts
- `tags`: Array of tags for filtering and search
- `source`: How the memory was created (manual, document, url, agent)
- `sourceUrl`: Original URL if scraped from web (optional)
- `sourceDocument`: Original filename if extracted from document (optional)
- `sourceChatId`: Link to the original chat/debate session (optional)
- `sourceArtifactId`: Link to the original artifact (optional)
- `sourceDebateId`: Link to the original debate session (optional)
- `createdBy`: User ID who created the memory
- `usageCount`: Counter for how many times agents have referenced this memory
- `lastUsedAt`: Timestamp of last usage by an agent (optional)
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

**Memory Scopes**:
1. **chat**: Memory tied to a single debate session (chatId required)
   - Agents remember facts within that specific conversation
   - Cleared when session ends or archived

2. **user**: Memory tied to a single user across all their debates (userId required)
   - Personal preferences, communication style, expertise level
   - Persists across all user's sessions

3. **workspace**: Shared memory for all users in a workspace (workspaceId required)
   - Team-specific knowledge, domain expertise, project context
   - Accessible to all workspace members

4. **organization**: Company-wide memory across all workspaces (organizationId required)
   - Organizational policies, values, standards, guidelines
   - Inherited by all workspaces in the organization

**Memory Hierarchy**:
When agents load memory, they combine all relevant scopes in order of specificity:
1. Organization memory (broadest)
2. Workspace memory
3. User memory
4. Chat memory (most specific)

**Source Types**:
- `manual`: Created by user through UI
- `document`: Extracted from uploaded document (PDF, DOCX, TXT, MD)
- `url`: Scraped from web URL using Firecrawl
- `agent`: Auto-generated by agent during conversation
- `chat`: Saved directly from conversation history
- `artifact`: Saved from a generated artifact
- `debate_result`: Saved from the outcome of a debate

**Usage Tracking**:
- `usageCount`: Incremented each time an agent references this memory
- `lastUsedAt`: Updated with timestamp when memory is used
- Used for analytics and identifying most valuable memories

**Notes**:
- Implements AI SDK Tools memory feature using Convex instead of Upstash
- Supports document upload with AI extraction
- Supports URL scraping with Firecrawl
- Enables agents to maintain persistent knowledge across conversations
- Critical for Phase 8 Memory Implementation

---

## Relationships

### Entity Relationship Diagram (Text)

\`\`\`
AnyDebate Convex Database
│
├── 🏢 organizations (Organization-level data)
│   ├── clerkOrganizationId (unique)
│   ├── name, slug
│   ├── totalSessions, totalMessages, totalTokensUsed
│   ├── createdAt: number
│   └── updatedAt: number
│   │
│   ├──< 🏗️ workspaces (1:N)
│   │   ├── organizationId (FK)
│   │   ├── name, description, slug
│   │   ├── settings { defaultModel, autoSave, exportFormat }
│   │   ├── isDefault
│   │   ├── createdAt: number
│   │   └── updatedAt: number
│   │   │
│   │   ├──< 👥 workspaceMemberships (1:N)
│   │   │   ├── organizationId (FK)
│   │   │   ├── workspaceId (FK)
│   │   │   ├── userId (FK)
│   │   │   ├── role (admin|member)
│   │   │   ├── createdAt: number
│   │   │   └── updatedAt: number
│   │   │
│   │   ├──< 💬 sessions (1:N)
│   │   │   ├── organizationId (FK)
│   │   │   ├── workspaceId (FK)
│   │   │   ├── userId (FK)
│   │   │   ├── agentIds (FK) // Agents participating in this session
│   │   │   ├── title, mode (compare|debate|auto-debate), status (active|completed|archived)
│   │   │   ├── config { rounds, currentRound, speakingOrder }
│   │   │   ├── metadata { tags, description, visibility }
│   │   │   ├── messageCount, tokensUsed, duration
│   │   │   │
│   │   │   ├──< 💭 messages (1:N)
│   │   │   │   ├── organizationId (FK)
│   │   │   │   ├── workspaceId (FK)
│   │   │   │   ├── sessionId (FK)
│   │   │   │   ├── userId (FK)
│   │   │   │   ├── agentId (optional FK)
│   │   │   │   ├── role (user/assistant/system)
│   │   │   │   ├── content, metadata { model, temperature, tokens, latency }
│   │   │   │   ├── parentMessageId (for threading)
│   │   │   │   ├── threadId (for grouping threaded messages)
│   │   │   │   ├── replyCount, hasReplies, bookmarked
│   │   │   │   ├── reactions {id, emoji, label, count, users, timestamp} // CHANGED TO OBJECT
│   │   │   │   ├── isStreaming
│   │   │   │   └── createdAt, updatedAt
│   │   │   │
│   │   │   ├──< 🤖 agents (1:N)
│   │   │   │   ├── organizationId (FK)
│   │   │   │   ├── workspaceId (FK)
│   │   │   │   ├── userId (FK)
│   │   │   │   ├── roleId (FK to roles)
│   │   │   │   ├── personaId (FK to personas)
│   │   │   │   ├── frameworkId (FK to frameworks)
│   │   │   │   ├── role, persona, framework (display names)
│   │   │   │   ├── model, provider
│   │   │   │   ├── systemPrompt
│   │   │   │   ├── customInstructions
│   │   │   │   ├── parameters { temperature, maxTokens }
│   │   │   │   ├── usageCount
│   │   │   │   ├── isFavorite
│   │   │   │   ├── isTemplate
│   │   │   │   ├── isActive
│   │   │   │   ├── visibility (private|workspace|organization)
│   │   │   │   └── createdAt, updatedAt
│   │   │   │
│   │   │   ├──< 📦 artifacts (1:N)
│   │   │   │   ├── organizationId (FK)
│   │   │   │   ├── workspaceId (FK)
│   │   │   │   ├── sessionId (FK)
│   │   │   │   ├── messageId (optional FK)
│   │   │   │   ├── userId (FK)
│   │   │   │   ├── title, description
│   │   │   │   ├── type (document/data-table/checklist/chart)
│   │   │   │   ├── content (JSON stringified)
│   │   │   │   ├── folderId (optional FK)
│   │   │   │   ├── tags (array of tag IDs)
│   │   │   │   ├── isFavorite, isPinned
│   │   │   │   ├── lastAccessedAt
│   │   │   │   ├── collaborators (array of userIds)
│   │   │   │   ├── fileId (optional FK to _storage)
│   │   │   │   ├── metadata { size, version, exports {format, url, timestamp}, author, mimeType, wordCount, rowCount, itemCount }
│   │   │   │   └── createdAt, updatedAt
│   │   │   │
│   │   │   ├──< 🗂️ artifactTemplates (1:N)
│   │   │   │   ├── organizationId (FK)
│   │   │   │   ├── workspaceId (FK)
│   │   │   │   ├── userId (FK)
│   │   │   │   ├── name, description, icon, category, tags
│   │   │   │   ├── type (document/data-table/checklist/chart)
│   │   │   │   ├── data (JSON stringified)
│   │   │   │   ├── isSystem
│   │   │   │   ├── visibility (private|workspace|organization)
│   │   │   │   ├── usageCount
│   │   │   │   └── createdAt, updatedAt
│   │   │   │
│   │   │   ├──< 📜 artifactVersions (1:N)
│   │   │   │   ├── organizationId (FK)
│   │   │   │   ├── workspaceId (FK)
│   │   │   │   ├── artifactId (FK)
│   │   │   │   ├── version, timestamp, author, changeDescription, changeType
│   │   │   │   ├── changedFields (optional)
│   │   │   │   ├── previousVersionId (optional FK)
│   │   │   │   ├── data (JSON stringified snapshot)
│   │   │   │   └── createdAt
│   │   │   │
│   │   │   ├──< 🤝 collaborationEvents (1:N)
│   │   │   │   ├── organizationId (FK)
│   │   │   │   ├── workspaceId (FK)
│   │   │   │   ├── sessionId (FK)
│   │   │   │   ├── artifactId (FK)
│   │   │   │   ├── userId (optional FK)
│   │   │   │   ├── agentId (optional FK)
│   │   │   │   ├── eventType (edit|comment|cursor|view|create|delete)
│   │   │   │   ├── description
│   │   │   │   ├── metadata { field, oldValue, newValue, position {x, y}, color }
│   │   │   │   ├── timestamp
│   │   │   │   └── createdAt
│   │   │   │
│   │   │   ├──< 📋 templates (1:N)
│   │   │   │   ├── organizationId (FK)
│   │   │   │   ├── workspaceId (FK)
│   │   │   │   ├── userId (FK)
│   │   │   │   ├── name, description, category
│   │   │   │   ├── agents { name, roleId, personaId, frameworkId }
│   │   │   │   ├── topic, conversationType
│   │   │   │   ├── suggestedQuestions
│   │   │   │   ├── isCustom, popularity
│   │   │   │   ├── tags, author
│   │   │   │   ├── visibility (private|workspace|organization)
│   │   │   │   └── createdAt, updatedAt
│   │   │   │
│   │   │   ├──< 📁 projects (1:N)
│   │   │   │   ├── organizationId (FK)
│   │   │   │   ├── workspaceId (FK)
│   │   │   │   ├── userId (FK)
│   │   │   │   ├── name, description
│   │   │   │   ├── sessionIds (FK)
│   │   │   │   └── createdAt, updatedAt
│   │   │   │
│   │   │   ├──< 📌 bookmarks (1:N)
│   │   │   │   ├── organizationId (FK)
│   │   │   │   ├── workspaceId (FK)
│   │   │   │   ├── userId (FK)
│   │   │   │   ├── messageId (FK)
│   │   │   │   ├── sessionId (FK)
│   │   │   │   ├── title, note, tags // CHANGED 'notes' to 'note'
│   │   │   │   ├── collectionId (optional FK)
│   │   │   │   └── createdAt, updatedAt
│   │   │   │
│   │   │   ├──< 📚 bookmarkCollections (1:N)
│   │   │   │   ├── organizationId (FK)
│   │   │   │   ├── workspaceId (FK)
│   │   │   │   ├── userId (FK)
│   │   │   │   ├── name, description, color, icon
│   │   │   │   ├── bookmarkIds (FK)
│   │   │   │   └── createdAt, updatedAt
│   │   │   │
│   │   │   └──< 🎯 activities (1:N)
│   │   │       ├── organizationId (FK)
│   │   │       ├── workspaceId (FK)
│   │   │       ├── userId (FK)
│   │   │       ├── type (debate/export/agent/template/artifact)
│   │   │       ├── title, description, metadata
│   │   │       ├── createdAt
│   │   │
│   │   └──< 📊 sessionComparisons (1:N)
│   │       ├── organizationId (FK)
│   │       ├── workspaceId (FK)
│   │       ├── userId (FK)
│   │       ├── name (optional)
│   │       ├── sessionIds (FK)
│   │       └── createdAt, updatedAt
│   │
│   └──< 💳 subscriptions (1:1)
│       ├── organizationId (FK, unique)
│       ├── polarSubscriptionId, polarCustomerId, polarProductId
│       ├── status
│       ├── currentPeriodStart, currentPeriodEnd
│       ├── cancelAtPeriodEnd
│       ├── metadata { planName, features }
│       └── createdAt, updatedAt, canceledAt
│
├── 👤 users
│   ├── _id: Id<"users">
│   ├── clerkUserId: string (unique, indexed)
│   ├── preferences: object
│   │   ├── theme: "light" | "dark" | "system"
│   │   ├── defaultModel: string
│   │   ├── language: string
│   │   ├── notifications: boolean
│   │   └── defaultAgents: string[] (agent IDs)
│   ├── totalSessions: number
│   ├── lastActiveAt: number
│   ├── createdAt: number
│   └── updatedAt: number
│
├── 💼 roles (1:N with agents)
│   ├── _id: Id<"roles">
│   ├── id: string (unique)
│   ├── name, category, description
│   ├── expertise, systemPrompt
│   ├── icon, isSystem, isActive
│   ├── organizationId (optional FK)
│   ├── workspaceId (optional FK)
│   ├── usageCount
│   └── createdAt, updatedAt
│
├── 🎭 personas (1:N with agents)
│   ├── _id: Id<"personas">
│   ├── id: string (unique)
│   ├── name, description
│   ├── traits, communicationStyle, decisionMaking
│   ├── systemPromptModifier
│   ├── icon, isSystem, isActive
│   ├── organizationId (optional FK)
│   ├── workspaceId (optional FK)
│   ├── usageCount
│   └── createdAt, updatedAt
│
├── 🧠 frameworks (1:N with agents)
│   ├── _id: Id<"frameworks">
│   ├── id: string (unique)
│   ├── name, description
│   ├── methodology, bestFor, steps
│   ├── systemPromptModifier
│   ├── icon, isSystem, isActive
│   ├── organizationId (optional FK)
│   ├── workspaceId (optional FK)
│   ├── usageCount
│   └── createdAt, updatedAt
│
├── 📁 folders
│   ├── _id: Id<"folders">
│   ├── organizationId (FK)
│   ├── workspaceId (FK)
│   ├── userId (FK)
│   ├── name, description, color, icon
│   ├── parentId (optional FK to folders._id)
│   └── createdAt, updatedAt
│
├── 🏷️ tags
│   ├── _id: Id<"tags">
│   ├── organizationId (FK)
│   ├── workspaceId (FK)
│   ├── userId (FK)
│   ├── name, color
│   ├── count (denormalized)
│   └── createdAt, updatedAt
│
├── 🗂️ artifactTemplates
│   ├── _id: Id<"artifactTemplates">
│   ├── organizationId (FK)
│   ├── workspaceId (FK)
│   ├── userId (FK)
│   ├── name, description, icon
│   ├── type (document/data-table/checklist/chart)
│   ├── data (JSON stringified)
│   ├── category, tags (array of tag IDs)
│   ├── isSystem
│   ├── visibility (private|workspace|organization)
│   ├── usageCount
│   └── createdAt, updatedAt
│
├── 📜 artifactVersions
│   ├── _id: Id<"artifactVersions">
│   ├── organizationId (FK)
│   ├── workspaceId (FK)
│   ├── artifactId (FK)
│   ├── version, timestamp, author, changeDescription, changeType
│   ├── changedFields (optional)
│   ├── previousVersionId (optional FK)
│   ├── data (JSON stringified snapshot)
│   └── createdAt
│
├── 📋 templates
│   ├── _id: Id<"templates">
│   ├── organizationId (FK)
│   ├── workspaceId (FK)
│   ├── userId (FK)
│   ├── name, description, category
│   ├── agents { name, roleId, personaId, frameworkId }
│   ├── topic, conversationType
│   ├── suggestedQuestions
│   ├── isCustom, popularity
│   ├── usageCount
│   ├── lastUsed
│   ├── tags, author
│   ├── visibility (private|workspace|organization)
│   └── createdAt, updatedAt
│
├── 🤖 agentTeamPresets
│   ├── _id: Id<"agentTeamPresets">
│   ├── organizationId (FK)
│   ├── workspaceId (FK)
│   ├── userId (optional FK)
│   ├── name, description, icon, category
│   ├── agents { name, roleId, personaId, frameworkId }
│   ├── useCases
│   ├── isSystem
│   ├── usageCount
│   ├── lastUsed
│   └── createdAt, updatedAt
│
├── 📝 quickStartScenarios
│   ├── _id: Id<"quickStartScenarios">
│   ├── organizationId (FK)
│   ├── workspaceId (FK)
│   ├── userId (optional FK)
│   ├── name, description, icon, category
│   ├── presetId (FK to agentTeamPresets)
│   ├── suggestedTopic, suggestedQuestions
│   ├── isSystem
│   ├── usageCount
│   ├── lastUsed
│   └── createdAt, updatedAt
│
├── 📊 sessionComparisons
│   ├── _id: Id<"sessionComparisons">
│   ├── organizationId (FK)
│   ├── workspaceId (FK)
│   ├── userId (FK)
│   ├── name (optional)
│   ├── sessionIds (FK)
│   └── createdAt, updatedAt
│
├── 🧠 workingMemory
│   ├── _id: Id<"workingMemory">
│   ├── organizationId (FK)
│   ├── workspaceId (FK)
│   ├── scope (chat|user|workspace|organization)
│   ├── chatId (optional FK)
│   ├── userId (optional FK)
│   ├── title, category, content, tags
│   ├── source (manual|document|url|agent|chat|artifact|debate_result)
│   ├── sourceUrl (optional)
│   ├── sourceDocument (optional)
│   ├── sourceChatId (optional FK)
│   ├── sourceArtifactId (optional)
│   ├── sourceDebateId (optional FK)
│   ├── createdBy (User ID)
│   ├── usageCount
│   ├── lastUsedAt (optional)
│   └── createdAt, updatedAt
│
├── 🤝 collaborationEvents
│   ├── _id: Id<"collaborationEvents">
│   ├── organizationId (FK)
│   ├── workspaceId (FK)
│   ├── sessionId (FK)
│   ├── artifactId (FK)
│   ├── userId (optional FK)
│   ├── agentId (optional FK)
│   ├── eventType (edit|comment|cursor|view|create|delete)
│   ├── description
│   ├── metadata { field, oldValue, newValue, position {x, y}, color }
│   ├── timestamp
│   └── createdAt
│
├── ✉️ invitations
│   ├── _id: Id<"invitations">
│   ├── organizationId (FK)
│   ├── workspaceId (FK)
│   ├── email: string
│   ├── role: "admin" | "member"
│   ├── inviterId (FK)
│   ├── status: "pending" | "accepted" | "revoked"
│   ├── token (unique)
│   ├── expiresAt: number
│   ├── createdAt: number
│   └── acceptedAt: number (optional)
│
└── 🔑 apiKeys
    ├── _id: Id<"apiKeys">
    ├── organizationId (FK)
    ├── workspaceId (FK)
    ├── userId (FK)
    ├── name: string
    ├── keyPreview: string
    ├── secretHash: string (unique)
    ├── scopes: string[]
    ├── lastUsedAt: number (optional)
    ├── expiresAt: number (optional)
    ├── createdAt: number
    └── revokedAt: number (optional)
\`\`\`

### Key Relationships

1. **Organization → Workspaces**: One-to-many
   - Workspaces are contained within organizations.
   - Filtered by `organizationId`.

2. **Workspace → WorkspaceMemberships**: One-to-many
   - Users are associated with workspaces through memberships.
   - Filtered by `workspaceId`.

3. **Organization → Users**: One-to-many
   - Users belong to an organization.
   - Filtered by `organizationId`.

4. **Workspace → Sessions**: One-to-many
   - All sessions belong to a workspace.
   - Filtered by `workspaceId`.

5. **Session → Messages**: One-to-many
   - Messages belong to a session.
   - Ordered by `createdAt`.

6. **Workspace → Agents**: One-to-many
   - Agents belong to a workspace.
   - Filtered by `workspaceId`.

7. **Workspace → Artifacts**: One-to-many
   - Artifacts generated within a workspace.
   - Linked to sessions and optionally messages.
   - Artifacts can be organized by `folderId` and `tags`.

8. **Artifact → Artifact Versions**: One-to-many
   - Each artifact can have multiple versions.
   - Linked via `artifactId`.

9. **Workspace → Folders**: One-to-many
   - Folders belong to a workspace and are used to organize artifacts.
   - Can be nested via `parentId`.

10. **Workspace → Tags**: One-to-many
    - Tags belong to a workspace and categorize artifacts.

11. **Workspace → Artifact Templates**: One-to-many
    - Artifact templates belong to a workspace.
    - Used to create new artifacts.

12. **Workspace → Templates**: One-to-many
    - Templates belong to a workspace.
    - Filtered by `workspaceId`.

13. **Workspace → Agent Team Presets**: One-to-many
    - Agent team presets belong to a workspace.
    - Used to quickly configure agent teams.

14. **Agent Team Presets → Quick Start Scenarios**: One-to-many
    - Quick start scenarios reference agent team presets.

15. **Workspace → Projects**: One-to-many
    - Projects belong to a workspace.
    - Filtered by `workspaceId`.

16. **Workspace → Bookmarks**: One-to-many
    - Bookmarks belong to a workspace.
    - Filtered by `workspaceId`.

17. **Workspace → Bookmark Collections**: One-to-many
    - Bookmark collections belong to a workspace.
    - Filtered by `workspaceId`.

18. **Workspace → Activities**: One-to-many
    - Activities belong to a workspace.
    - Filtered by `workspaceId`.

19. **Workspace → Session Comparisons**: One-to-many
    - Session comparisons belong to a workspace.
    - Filtered by `workspaceId`.

20. **Workspace → Working Memory**: One-to-many
    - Working memory entries belong to a workspace.
    - Can be scoped to chat, user, workspace, or organization level.
    - Filtered by `workspaceId` and `scope`.

21. **Organization → Subscriptions**: One-to-one
    - Each organization has one subscription.
    - Subscription tracks billing and credits.

22. **Organization → Credit Balances**: One-to-one
    - Each organization has one credit balance entry.

23. **Organization → Invoices**: One-to-many
    - Invoices are linked to organizations for payment history.

24. **Organization → Usage Tracking**: One-to-many
    - Usage tracking records belong to an organization.
    - Filtered by `organizationId`.

25. **Organization/Workspace → Roles**: One-to-many
    - Roles can be system-wide, organization-specific, or workspace-specific.

26. **Organization/Workspace → Personas**: One-to-many
    - Personas can be system-wide, organization-specific, or workspace-specific.

27. **Organization/Workspace → Frameworks**: One-to-many
    - Frameworks can be system-wide, organization-specific, or workspace-specific.

28. **Workspace → Collaboration Events**: One-to-many
    - Collaboration events are tied to a workspace and an artifact.
    - Filtered by `workspaceId` and `artifactId`.

29. **Organization → Invitations**: One-to-many
    - Invitations are scoped to an organization and a workspace.

30. **Workspace → API Keys**: One-to-many
    - API keys are associated with a workspace, user, and organization.

---

## Index Strategy

### Performance Optimization

All indexes are designed for common query patterns:

1. **Organization-scoped queries** (most common):
   \`\`\`typescript
   .index('by_organization', ['organizationId'])
   \`\`\`

2. **Workspace-scoped queries**:
   \`\`\`typescript
   .index('by_workspace', ['workspaceId'])
   \`\`\`

3. **Organization + User queries**:
   \`\`\`typescript
   .index('by_organization_and_user', ['organizationId', 'userId'])
   \`\`\`

4. **Workspace + User queries**:
   \`\`\`typescript
   .index('by_workspace_and_user', ['workspaceId', 'userId'])
   \`\`\`

5. **Organization + Workspace queries**:
   \`\`\`typescript
   .index('by_organization_and_workspace', ['organizationId', 'workspaceId'])
   \`\`\`

6. **Session-based queries**:
   \`\`\`typescript
   .index('by_session', ['sessionId'])
   .index('by_status', ['status'])
   .index('by_organization_and_status', ['organizationId', 'status'])
   \`\`\`

7. **Message-based queries**:
   \`\`\`typescript
   .index('by_organization_and_session', ['organizationId', 'sessionId'])
   .index('by_workspace_and_session', ['workspaceId', 'sessionId'])
   \`\`\`

8. **Agent-based queries**:
   \`\`\`typescript
   .index('by_organization_and_visibility', ['organizationId', 'visibility'])
   .index('by_workspace_and_visibility', ['workspaceId', 'visibility'])
   \`\`\`

9. **Artifact-based queries**:
   \`\`\`typescript
   .index('by_organization_and_type', ['organizationId', 'type'])
   .index('by_workspace_and_type', ['workspaceId', 'type'])
   // New indexes for artifact library features:
   .index('by_folder', ['folderId'])
   .index('by_workspace_and_folder', ['workspaceId', 'folderId'])
   .index('by_favorite', ['workspaceId', 'isFavorite'])
   .index('by_pinned', ['workspaceId', 'isPinned'])
   .index('by_last_accessed', ['workspaceId', 'lastAccessedAt'])
   \`\`\`

10. **Artifact Template-based queries**:
    \`\`\`typescript
    .index('by_workspace_and_type', ['workspaceId', 'type'])
    .index('by_workspace_and_category', ['workspaceId', 'category'])
    .index('by_system', ['isSystem'])
    \`\`\`

11. **Artifact Version queries**:
    \`\`\`typescript
    .index('by_artifact_and_version', ['artifactId', 'version'])
    \`\`\`

12. **Template-based queries**:
    \`\`\`typescript
    .index('by_organization_and_category', ['organizationId', 'category'])
    .index('by_workspace_and_category', ['workspaceId', 'category'])
    .index('by_visibility', ['organizationId', 'visibility'])
    .index('by_workspace_and_visibility', ['workspaceId', 'visibility'])
    // New indexes for usage tracking:
    .index('by_usage', ['organizationId', 'usageCount'])
    .index('by_workspace_and_usage', ['workspaceId', 'usageCount'])
    \`\`\`

13. **Agent Team Preset queries**:
    \`\`\`typescript
    .index('by_category', ['organizationId', 'category'])
    .index('by_system', ['organizationId', 'isSystem'])
    .index('by_usage', ['organizationId', 'usageCount'])
    \`\`\`

14. **Quick Start Scenario queries**:
    \`\`\`typescript
    .index('by_preset', ['presetId'])
    .index('by_category', ['organizationId', 'category'])
    .index('by_system', ['organizationId', 'isSystem'])
    .index('by_usage', ['organizationId', 'usageCount'])
    \`\`\`

15. **Project-based queries**:
    \`\`\`typescript
    .index('by_organization', ['organizationId'])
    .index('by_workspace', ['workspaceId'])
    \`\`\`

16. **Bookmark-based queries**:
    \`\`\`typescript
    .index('by_collection', ['collectionId'])
    .index('by_workspace_and_collection', ['workspaceId', 'collectionId'])
    \`\`\`

17. **Activity-based queries**:
    \`\`\`typescript
    .index('by_organization', ['organizationId'])
    .index('by_workspace', ['workspaceId'])
    .index('by_user', ['userId'])
    .index('by_type', ['type'])
    .index('by_created_at', ['createdAt'])
    .index('by_organization_and_created_at', ['organizationId', 'createdAt'])
    \`\`\`

18. **Session Comparison queries**:
    \`\`\`typescript
    .index('by_organization', ['organizationId'])
    .index('by_workspace', ['workspaceId'])
    .index('by_user', ['userId'])
    .index('by_created_at', ['createdAt'])
    \`\`\`

19. **Subscription-based queries**:
    \`\`\`typescript
    .index('by_organization', ['organizationId'])
    .index('by_polar_subscription_id', ['polarSubscriptionId'])
    .index('by_polar_product_id', ['polarProductId'])
    .index('by_status', ['status'])
    \`\`\`
    
20. **Credit Balance queries**:
    \`\`\`typescript
    .index('by_organization', ['organizationId'])
    \`\`\`

21. **Invoice queries**:
    \`\`\`typescript
    .index('by_organization', ['organizationId'])
    .index('by_polar_invoice_id', ['polarInvoiceId'])
    .index('by_subscription', ['subscriptionId'])
    .index('by_status', ['status'])
    .index('by_invoice_date', ['invoiceDate'])
    .index('by_organization_and_status', ['organizationId', 'status'])
    \`\`\`

22. **Usage Tracking queries**:
    \`\`\`typescript
    .index('by_organization_and_billing_period', ['organizationId', 'billingPeriod'])
    .index('by_workspace_and_billing_period', ['workspaceId', 'billingPeriod'])
    \`\`\`
    
23. **Folder-based queries**:
    \`\`\`typescript
    .index('by_parent', ['parentId'])
    .index('by_workspace_and_parent', ['workspaceId', 'parentId'])
    \`\`\`

24. **Tag-based queries**:
    \`\`\`typescript
    .index('by_workspace_and_name', ['workspaceId', 'name'])
    \`\`\`

25. **Collaboration Event queries**:
    \`\`\`typescript
    .index('by_organization_and_artifact', ['organizationId', 'artifactId'])
    .index('by_workspace_and_artifact', ['workspaceId', 'artifactId'])
    .index('by_session_and_artifact', ['sessionId', 'artifactId'])
    .index('by_timestamp', ['organizationId', 'timestamp'])
    \`\`\`

26. **Working Memory queries**:
    \`\`\`typescript
    .index('by_scope_chat', ['scope', 'chatId'])
    .index('by_scope_user', ['scope', 'userId'])
    .index('by_scope_workspace', ['scope', 'workspaceId'])
    .index('by_scope_organization', ['scope', 'organizationId'])
    .index('by_organization_and_workspace', ['organizationId', 'workspaceId'])
    .index('by_source_chat', ['sourceChatId']) // Added for source linking
    .index('by_source_artifact', ['sourceArtifactId']) // Added for source linking
    .index('by_source_debate', ['sourceDebateId']) // Added for source linking
    \`\`\`

27. **Configuration Tables (Roles, Personas, Frameworks)**:
    - Unique identifiers are primary for direct lookups.
    - `organizationId` and `workspaceId` for scoping custom configurations.
    - `isSystem`, `isActive`, `category` for filtering.
    \`\`\`typescript
    // Roles
    .index('by_id', ['id'])
    .index('by_organization', ['organizationId'])
    .index('by_workspace', ['workspaceId'])
    .index('by_category', ['category'])
    .index('by_is_system', ['isSystem'])
    .index('by_is_active', ['isActive'])
    
    // Personas
    .index('by_id', ['id'])
    .index('by_organization', ['organizationId'])
    .index('by_workspace', ['workspaceId'])
    .index('by_is_system', ['isSystem'])
    .index('by_is_active', ['isActive'])
    
    // Frameworks
    .index('by_id', ['id'])
    .index('by_organization', ['organizationId'])
    .index('by_workspace', ['workspaceId'])
    .index('by_is_system', ['isSystem'])
    .index('by_is_active', ['isActive'])
    \`\`\`

28. **Invitation Table**:
    - Indexing by `email`, `token`, and `workspaceId` for efficient lookup and management.
    \`\`\`typescript
    // Invitations
    .index('by_email', ['email'])
    .index('by_token', ['token'])
    .index('by_workspace', ['workspaceId'])
    \`\`\`

29. **API Key Table**:
    - Indexing by `workspaceId`, `userId`, and `secretHash` for secure and efficient access control.
    \`\`\`typescript
    // API Keys
    .index('by_workspace', ['workspaceId'])
    .index('by_user', ['userId'])
    .index('by_hash', ['secretHash'])
    \`\`\`

### Index Usage Examples

\`\`\`typescript
// Get all active sessions for a workspace
const sessions = await ctx.db
  .query('sessions')
  .withIndex('by_workspace_and_status', (q) =>
    q.eq('workspaceId', workspaceId).eq('status', 'active')
  )
  .collect();

// Get messages for a session within a workspace (ordered by time)
const messages = await ctx.db
  .query('messages')
  .withIndex('by_workspace_and_session', (q) =>
    q.eq('workspaceId', workspaceId).eq('sessionId', sessionId)
  )
  .order('desc')
  .collect();

// Get user's recent sessions in a workspace
const recentSessions = await ctx.db
  .query('sessions')
  .withIndex('by_organization_and_user', (q) =>
    q.eq('organizationId', orgId).eq('userId', userId)
  )
  .filter((q) => q.eq(q.field('workspaceId'), workspaceId))
  .order('desc')
  .take(10);

// Get all available system roles
const systemRoles = await ctx.db
  .query('roles')
  .withIndex('by_is_system', (q) => q.eq('isSystem', true))
  .filter((q) => q.eq(q.field('isActive'), true))
  .collect();

// Get custom roles for a specific organization
const orgRoles = await ctx.db
  .query('roles')
  .withIndex('by_organization', (q) => q.eq('organizationId', orgId))
  .filter((q) => q.eq(q.field('isSystem'), false))
  .collect();

// Get artifacts in a specific folder within a workspace
const folderArtifacts = await ctx.db
  .query('artifacts')
  .withIndex('by_workspace_and_folder', (q) =>
    q.eq('workspaceId', workspaceId).eq('folderId', folderId)
  )
  .collect();

// Get favorited artifacts in a workspace
const favoritedArtifacts = await ctx.db
  .query('artifacts')
  .withIndex('by_favorite', (q) => q.eq('workspaceId', workspaceId).eq('isFavorite', true))
  .collect();

// Get all tags in a workspace
const workspaceTags = await ctx.db
  .query('tags')
  .withIndex('by_workspace_and_name', (q) => q.eq('workspaceId', workspaceId))
  .collect();

// Get collaboration events for a specific artifact
const artifactEvents = await ctx.db
  .query('collaborationEvents')
  .withIndex('by_organization_and_artifact', (q) =>
    q.eq('organizationId', orgId).eq('artifactId', artifactId)
  )
  .collect();

// Get all invoices for an organization
const orgInvoices = await ctx.db
  .query('invoices')
  .withIndex('by_organization', (q) => q.eq('organizationId', orgId))
  .collect();

// Get all unpaid invoices for an organization
const unpaidInvoices = await ctx.db
  .query('invoices')
  .withIndex('by_organization_and_status', (q) =>
    q.eq('organizationId', orgId).eq('status', 'open')
  )
  .collect();

// Find pending invitations for a workspace
const pendingInvitations = await ctx.db
  .query('invitations')
  .withIndex('by_workspace', (q) => q.eq('workspaceId', workspaceId))
  .filter((q) => q.eq(q.field('status'), 'pending'))
  .collect();

// Find API keys for a user in a workspace
const userApiKeys = await ctx.db
  .query('apiKeys')
  .withIndex('by_workspace', (q) => q.eq('workspaceId', workspaceId))
  .filter((q) => q.eq(q.field('userId'), userId))
  .collect();
\`\`\`

---

## Multi-Tenancy and Workspace Implementation

### Data Isolation Pattern

**Every query MUST filter by organizationId and workspaceId**:

\`\`\`typescript
// ✅ CORRECT - Tenant and Workspace isolated
export const getSessions = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Unauthenticated');
    
    const orgId = identity.org_id;
    const workspaceId = await ctx.auth.getWorkspaceId(); // Assuming auth helper for workspace
    
    if (!workspaceId) throw new Error('Workspace not selected');
    
    return await ctx.db
      .query('sessions')
      .withIndex('by_workspace_and_status', (q) =>
        q.eq('workspaceId', workspaceId).eq('status', 'active')
      )
      .collect();
  },
});

// ❌ WRONG - No tenant or workspace isolation
export const getSessions = query({
  handler: async (ctx) => {
    return await ctx.db.query('sessions').collect(); // SECURITY RISK!
  },
});
\`\`\`

### Permission Checks

\`\`\`typescript
// Check organization and workspace membership
const membership = await ctx.db.query('workspaceMemberships').withIndex('by_workspace_and_user', (q) =>
  q.eq('workspaceId', resource.workspaceId).eq('userId', identity.userId)
).unique();

if (!membership) {
  throw new Error('Unauthorized - not a member of this workspace');
}

// Check admin role within the workspace for sensitive operations
if (resource.workspaceId !== workspaceId && membership.role !== 'admin') {
  throw new Error('Unauthorized - insufficient workspace permissions');
}
\`\`\`

### Best Practices

1. **Always validate auth**: Check `ctx.auth.getUserIdentity()` first.
2. **Always filter by organization and workspace**: Use `organizationId` and `workspaceId` in every query.
3. **Verify ownership and roles**: Use `workspaceMemberships` to check user roles and permissions.
4. **Use appropriate indexes**: Always use organization- and workspace-based indexes for performance.
5. **Handle custom configurations**: For roles, personas, and frameworks, check `organizationId` and `workspaceId` for custom entries, falling back to system-wide defaults if necessary.
6. **Manage Artifacts with Folders and Tags**: Ensure `folderId` and `tags` are correctly managed for artifact organization and retrieval.
7. **Log Collaboration Events**: Record all significant collaboration actions for auditing and real-time synchronization.
8. **Manage Artifact Versions**: Implement logic to create, store, and retrieve artifact versions.
9. **Manage Working Memory**: Implement logic for creating, retrieving, and scoping working memory entries based on context.
10. **Billing and Payment Management**: Implement logic for handling subscriptions, credit balances, and invoice retrieval via Polar webhooks and APIs.
11. **Manage Invitations**: Implement logic for creating, accepting, revoking, and expiring workspace invitations.
12. **Manage API Keys**: Implement logic for generating, storing, and validating API keys with defined scopes.

---

### Implementation Notes (Frontend Mapping)
- **`ChatMessage` Interface (`lib/chat/types.ts`)**:
  - The frontend `sender` object (`{ id, name, type, avatar }`) is constructed by joining `messages` with `users` or `agents` tables.
  - `timestamp` (Date) maps to `createdAt` (number).
  - `reactions` array in DB is flattened to `{ likes, dislikes }` for the current UI, but the DB supports rich reactions for future features.

- **`Agent` Interface (`types/dashboard.ts` / `lib/agent-config/types.ts`)**:
  - Frontend types often use nested objects (e.g., `role: Role`), whereas the DB stores IDs (`roleId`) and denormalized names (`role`).
  - `provider` and `parameters` are stored in the DB but currently abstracted in some frontend views.

- **`DebateSession` Interface (`types/dashboard.ts`)**:
  - `agents` array in frontend corresponds to `agentIds` in DB.
  - `status` in DB includes `"completed"`, which covers the terminal state of a debate.

---

## Migration from Current State

### Current State Analysis

The app currently uses:
- **No database**: All data in memory/localStorage
- **Demo mode**: Simulated data for landing page
- **TypeScript types**: Defined in `lib/chat/modes.ts` and `types/dashboard.ts`

### Migration Strategy

**Phase 1: Parallel Operation** (Week 1)
- Deploy Convex schema including workspaces
- Keep existing localStorage code
- Write to both Convex and localStorage
- Read from localStorage (fallback to Convex)

**Phase 2: Gradual Migration** (Week 2)
- Migrate existing localStorage data to Convex, organizing into default workspaces
- Switch reads to Convex (fallback to localStorage)
- Monitor for issues

**Phase 3: Convex Only** (Week 3)
- Remove localStorage code
- Convex is single source of truth
- Clean up migration code

### Data Migration Script

\`\`\`typescript
// Migration utility to move localStorage to Convex
export async function migrateLocalStorageToConvex(
  userId: string,
  orgId: string,
  defaultWorkspaceId: string // ID of the default workspace created for the org
) {
  // 1. Read from localStorage
  const localSessions = JSON.parse(
    localStorage.getItem('sessions') || '[]'
  );
  
  // 2. Transform to Convex format
  const convexSessions = localSessions.map(session => ({
    organizationId: orgId,
    workspaceId: defaultWorkspaceId, // Assign to default workspace
    userId: userId,
    title: session.title,
    mode: session.mode,
    status: 'active', // Default status
    config: session.config || {},
    metadata: {
      ...session.metadata,
      visibility: session.metadata?.visibility || 'private', // Default visibility
    },
    messageCount: session.messageCount || 0,
    tokensUsed: 0,
    duration: session.duration || 0,
    lastActivityAt: Date.now(),
    createdAt: new Date(session.createdAt).getTime(),
    updatedAt: Date.now(),
  }));
  
  // 3. Batch insert to Convex
  for (const session of convexSessions) {
    await createSession(session); // Assume createSession is a Convex mutation
  }
  
  // 4. Clear localStorage (after confirmation)
  // localStorage.removeItem('sessions');
}
\`\`\`

### Zero Data Loss Guarantee

1. **Backup localStorage**: Export all data before migration.
2. **Parallel writes**: Write to both systems during transition.
3. **Validation**: Verify data integrity after migration.
4. **Rollback plan**: Keep localStorage backup for 30 days.

---

## Summary

This schema provides:

✅ **Multi-tenancy**: Organization-based isolation.
✅ **Workspaces**: Hierarchical data organization within organizations.
✅ **Three chat modes**: Compare, Debate, Auto-Debate.
✅ **Real-time updates**: Convex subscriptions.
✅ **Usage tracking**: Token credits and billing.
✅ **File storage**: Artifacts and exports.
✅ **Agent Configuration**: Robust definition of roles, personas, and frameworks.
✅ **Artifact Management**: Comprehensive features for organizing and managing artifacts (folders, tags, templates, version history).
✅ **Real-time Collaboration Tracking**: Events for auditing and synchronization.
✅ **Quick Start Features**: Agent team presets and scenarios for faster onboarding.
✅ **Persistent AI Memory**: Flexible working memory for agents across multiple scopes.
✅ **Billing and Payment Management**: Comprehensive tracking of subscriptions, credit balances, and invoices.
✅ **Workspace Invitations**: Streamlined process for adding users to workspaces.
✅ **Programmatic Access**: Secure and granular API keys for external integrations.
✅ **Performance**: Optimized indexes for organization and workspace queries.
✅ **Security**: Mandatory auth and permission checks using workspace memberships.
✅ **Scalability**: Designed for growth with robust data structuring.

**Next Steps**:
1. Review and approve schema design.
2. Implement Convex schema in `convex/schema.ts`.
3. Create queries and mutations for organization and workspace management.
4. Set up Clerk integration for user and organization management.
5. Begin migration from current state, ensuring data is properly placed within workspaces.
6. Implement CRUD operations for roles, personas, and frameworks, including management of system vs. custom configurations.
7. Develop features for artifact organization (folders, tags, templates) and version management.
8. Implement real-time collaboration tracking using the `collaborationEvents` table.
9. Develop features for agent team presets and quick start scenarios for enhanced user onboarding.
10. Implement session comparison features, including migration from localStorage.
11. Develop and integrate the working memory system for persistent AI knowledge.
12. Integrate Polar webhooks for subscriptions, credit balances, and invoices.
13. Implement invitation management for workspace access control.
14. Develop API key management for programmatic access.

---

**Document Status**: ✅ Ready for Review  
**Estimated Implementation**: 20-28 hours (Phase 4)


---

**Document Status**: ✅ Ready for Review  
**Estimated Implementation**: 20-28 hours (Phase 4)

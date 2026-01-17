import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const createSession = mutation({
  args: {
    organizationId: v.string(),
    workspaceId: v.id("workspaces"),
    title: v.string(),
    mode: v.union(v.literal("compare"), v.literal("debate"), v.literal("auto-debate")),
    agentIds: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthenticated")

    return await ctx.db.insert("sessions", {
      ...args,
      userId: identity.subject,
      status: "active",
      config: {
        rounds: 5, // Default
        autoDebateStatus: "setup",
      },
      metadata: {
        tags: [],
        visibility: "private",
      },
      messageCount: 0,
      tokensUsed: 0,
      duration: 0,
      lastActivityAt: Date.now(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
  },
})

export const addMessage = mutation({
  args: {
    organizationId: v.string(),
    workspaceId: v.id("workspaces"),
    sessionId: v.id("sessions"),
    content: v.string(),
    role: v.union(v.literal("user"), v.literal("assistant"), v.literal("system")),
    agentId: v.optional(v.id("agents")),
    metadata: v.optional(
      v.object({
        model: v.optional(v.string()),
        tokens: v.optional(v.number()),
        latency: v.optional(v.number()),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthenticated")

    const messageId = await ctx.db.insert("messages", {
      ...args,
      userId: identity.subject,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })

    // Update session stats
    const session = await ctx.db.get(args.sessionId)
    if (session) {
      await ctx.db.patch(args.sessionId, {
        messageCount: session.messageCount + 1,
        lastActivityAt: Date.now(),
        updatedAt: Date.now(),
      })
    }

    return messageId
  },
})

export const getMessages = query({
  args: { sessionId: v.id("sessions") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .collect()
  },
})

export const getSession = query({
  args: { sessionId: v.id("sessions") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.sessionId)
  },
})

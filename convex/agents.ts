import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const createAgent = mutation({
  args: {
    organizationId: v.string(),
    workspaceId: v.id("workspaces"),
    name: v.string(),
    description: v.optional(v.string()),
    roleId: v.string(),
    personaId: v.string(),
    frameworkId: v.string(),
    model: v.string(),
    systemPrompt: v.string(),
    customInstructions: v.optional(v.string()),
    visibility: v.union(v.literal("private"), v.literal("workspace"), v.literal("organization")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthenticated")

    const agentId = await ctx.db.insert("agents", {
      ...args,
      userId: identity.subject,
      provider: "openai", // Default for now, could be inferred from model
      // Denormalized defaults (would normally fetch these from config tables)
      role: args.roleId,
      persona: args.personaId,
      framework: args.frameworkId,
      parameters: {
        temperature: 0.7,
        maxTokens: 4000,
      },
      usageCount: 0,
      isFavorite: false,
      isTemplate: false,
      isActive: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })

    return agentId
  },
})

export const listAgents = query({
  args: {
    workspaceId: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("agents")
      .withIndex("by_workspace", (q) => q.eq("workspaceId", args.workspaceId))
      .collect()
  },
})

export const getAgent = query({
  args: { agentId: v.id("agents") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.agentId)
  },
})

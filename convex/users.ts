import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Called storeUser without authentication present")
    }

    // Check if user is already stored
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkUserId", identity.subject))
      .unique()

    if (user !== null) {
      // Update last active timestamp
      await ctx.db.patch(user._id, {
        lastActiveAt: Date.now(),
        updatedAt: Date.now(),
      })
      return user._id
    }

    // Create new user
    return await ctx.db.insert("users", {
      clerkUserId: identity.subject,
      preferences: {
        theme: "system",
        defaultModel: "gpt-4-turbo",
        language: "en",
        notifications: true,
        defaultAgents: [],
        tooltips: {
          enabled: true,
          delay: 300,
        },
      },
      totalSessions: 0,
      lastActiveAt: Date.now(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
  },
})

export const getUser = query({
  args: { clerkUserId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    const userId = args.clerkUserId ?? identity?.subject

    if (!userId) return null

    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkUserId", userId))
      .unique()
  },
})

export const updateTooltipPreferences = mutation({
  args: {
    enabled: v.boolean(),
    delay: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not authenticated")
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkUserId", identity.subject))
      .unique()

    if (!user) {
      throw new Error("User not found")
    }

    await ctx.db.patch(user._id, {
      preferences: {
        ...user.preferences,
        tooltips: {
          enabled: args.enabled,
          delay: args.delay,
        },
      },
      updatedAt: Date.now(),
    })

    return user._id
  },
})

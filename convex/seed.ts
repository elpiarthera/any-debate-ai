import { mutation } from "./_generated/server"
import { ROLES } from "../lib/agent-config/roles"
import { PERSONAS } from "../lib/agent-config/personas"
import { FRAMEWORKS } from "../lib/agent-config/frameworks"

export const seedStaticData = mutation({
  args: {},
  handler: async (ctx) => {
    const rolesSeeded = await seedRoles(ctx)
    const personasSeeded = await seedPersonas(ctx)
    const frameworksSeeded = await seedFrameworks(ctx)

    return {
      roles: rolesSeeded,
      personas: personasSeeded,
      frameworks: frameworksSeeded,
    }
  },
})

async function seedRoles(ctx: any) {
  let count = 0
  for (const role of ROLES) {
    const existing = await ctx.db
      .query("roles")
      .filter((q: any) => q.eq(q.field("id"), role.id))
      .first()

    if (!existing) {
      await ctx.db.insert("roles", {
        id: role.id,
        name: role.name,
        category: role.category,
        description: role.description,
        expertise: role.expertise,
        systemPrompt: role.systemPrompt,
        icon: role.icon,
        isSystem: true,
        isActive: true,
        usageCount: 0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      })
      count++
    }
  }
  return count
}

async function seedPersonas(ctx: any) {
  let count = 0
  for (const persona of PERSONAS) {
    const existing = await ctx.db
      .query("personas")
      .filter((q: any) => q.eq(q.field("id"), persona.id))
      .first()

    if (!existing) {
      await ctx.db.insert("personas", {
        id: persona.id,
        name: persona.name,
        description: persona.description,
        traits: persona.traits,
        communicationStyle: persona.communicationStyle,
        decisionMaking: persona.decisionMaking,
        systemPromptModifier: persona.systemPromptModifier,
        icon: persona.icon,
        isSystem: true,
        isActive: true,
        usageCount: 0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      })
      count++
    }
  }
  return count
}

async function seedFrameworks(ctx: any) {
  let count = 0
  for (const framework of FRAMEWORKS) {
    const existing = await ctx.db
      .query("frameworks")
      .filter((q: any) => q.eq(q.field("id"), framework.id))
      .first()

    if (!existing) {
      await ctx.db.insert("frameworks", {
        id: framework.id,
        name: framework.name,
        description: framework.description,
        methodology: framework.methodology,
        bestFor: framework.bestFor,
        steps: framework.steps,
        systemPromptModifier: framework.systemPromptModifier,
        icon: framework.icon,
        isSystem: true,
        isActive: true,
        usageCount: 0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      })
      count++
    }
  }
  return count
}

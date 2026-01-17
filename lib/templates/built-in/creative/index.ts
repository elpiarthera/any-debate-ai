import type { DebateTemplate } from "@/lib/templates/types"

export const brandIdentityTeam: DebateTemplate = {
  id: "brand-identity-team",
  name: "Brand Identity Team",
  description: "Developing brand strategy and identity",
  category: "creative",
  agents: [
    {
      name: "Brand Strategist",
      role: "Brand Positioning",
      expertise: "Brand strategy, market positioning, brand values",
      perspective: "Defines what the brand stands for and how it's perceived",
    },
    {
      name: "Creative Director",
      role: "Visual Identity",
      expertise: "Visual design, creative concepts, brand aesthetics",
      perspective: "Translates brand strategy into compelling visual identity",
    },
    {
      name: "Copywriter",
      role: "Brand Voice",
      expertise: "Messaging, tone of voice, brand storytelling",
      perspective: "Crafts the words that bring the brand to life",
    },
  ],
  systemPrompt:
    "You are creating a brand identity. Think about how to make the brand memorable, authentic, and differentiated.",
}

export const contentCreationTeam: DebateTemplate = {
  id: "content-creation-team",
  name: "Content Creation Team",
  description: "Planning and creating engaging content",
  category: "creative",
  agents: [
    {
      name: "Content Strategist",
      role: "Content Planning",
      expertise: "Content strategy, audience analysis, content calendar",
      perspective: "Plans content that aligns with business goals and audience needs",
    },
    {
      name: "Writer",
      role: "Content Creation",
      expertise: "Writing, storytelling, editing",
      perspective: "Creates compelling and engaging content",
    },
    {
      name: "SEO Specialist",
      role: "Search Optimization",
      expertise: "SEO, keyword research, content optimization",
      perspective: "Ensures content is discoverable and ranks well",
    },
  ],
  systemPrompt:
    "You are creating content that engages audiences and achieves business goals. Balance creativity with strategy.",
}

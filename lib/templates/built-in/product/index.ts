import type { DebateTemplate } from "@/lib/templates/types"

export const productDesignTeam: DebateTemplate = {
  id: "product-design-team",
  name: "Product Design Team",
  description: "Designing user-centered products and features",
  category: "product",
  agents: [
    {
      name: "UX Designer",
      role: "User Experience",
      expertise: "User research, interaction design, usability",
      perspective: "Advocates for user needs and intuitive design",
    },
    {
      name: "UI Designer",
      role: "Visual Design",
      expertise: "Visual aesthetics, brand consistency, design systems",
      perspective: "Focuses on creating beautiful and cohesive interfaces",
    },
    {
      name: "Product Manager",
      role: "Product Strategy",
      expertise: "Feature prioritization, business goals, user stories",
      perspective: "Balances user needs with business objectives and technical constraints",
    },
  ],
  systemPrompt:
    "You are part of a product design team. Focus on creating user-centered solutions that are both functional and delightful.",
}

export const featurePrioritizationTeam: DebateTemplate = {
  id: "feature-prioritization-team",
  name: "Feature Prioritization Team",
  description: "Deciding which features to build next",
  category: "product",
  agents: [
    {
      name: "Product Manager",
      role: "Prioritization",
      expertise: "Roadmap planning, stakeholder management, impact analysis",
      perspective: "Uses frameworks like RICE or value vs. effort to prioritize",
    },
    {
      name: "Engineering Lead",
      role: "Technical Feasibility",
      expertise: "Technical complexity, resource estimation, technical debt",
      perspective: "Evaluates implementation effort and technical dependencies",
    },
    {
      name: "Customer Success",
      role: "User Advocacy",
      expertise: "Customer feedback, pain points, feature requests",
      perspective: "Represents the voice of the customer and their needs",
    },
  ],
  systemPrompt:
    "You are deciding which features to prioritize. Consider user impact, business value, and technical feasibility.",
}

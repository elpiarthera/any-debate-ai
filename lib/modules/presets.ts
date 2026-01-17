import type { ModulePreset } from "./types"

export const MODULE_PRESETS: ModulePreset[] = [
  {
    id: "business-analyst",
    name: "Business Analyst",
    description: "Strategic business analysis with data-driven decision making",
    category: "Business",
    modules: {
      roleId: "business-analyst",
      personaId: "analytical",
      frameworkId: "swot",
    },
    useCases: ["Market analysis", "Competitive research", "Business strategy", "Financial planning"],
    tags: ["business", "analysis", "strategy"],
  },
  {
    id: "creative-designer",
    name: "Creative Designer",
    description: "Innovative design thinking with user-centered approach",
    category: "Creative",
    modules: {
      roleId: "ux-designer",
      personaId: "creative",
      frameworkId: "design-thinking",
    },
    useCases: ["Product design", "User experience", "Brand identity", "Visual design"],
    tags: ["design", "creative", "ux"],
  },
  {
    id: "tech-architect",
    name: "Technical Architect",
    description: "System design and technical decision making",
    category: "Technology",
    modules: {
      roleId: "software-architect",
      personaId: "pragmatic",
      frameworkId: "first-principles",
    },
    useCases: ["System architecture", "Technical planning", "Code review", "Performance optimization"],
    tags: ["technology", "architecture", "engineering"],
  },
  {
    id: "product-manager",
    name: "Product Manager",
    description: "Product strategy and roadmap planning",
    category: "Product",
    modules: {
      roleId: "product-manager",
      personaId: "strategic",
      frameworkId: "lean-startup",
    },
    useCases: ["Product roadmap", "Feature prioritization", "User research", "Market fit"],
    tags: ["product", "strategy", "management"],
  },
  {
    id: "research-scientist",
    name: "Research Scientist",
    description: "Scientific research with systematic methodology",
    category: "Research",
    modules: {
      roleId: "research-scientist",
      personaId: "analytical",
      frameworkId: "scientific-method",
    },
    useCases: ["Research design", "Data analysis", "Hypothesis testing", "Literature review"],
    tags: ["research", "science", "analysis"],
  },
]

export function getPresetById(id: string): ModulePreset | undefined {
  return MODULE_PRESETS.find((preset) => preset.id === id)
}

export function getPresetsByCategory(category: string): ModulePreset[] {
  return MODULE_PRESETS.filter((preset) => preset.category === category)
}

export function searchPresets(query: string): ModulePreset[] {
  const lowercaseQuery = query.toLowerCase()
  return MODULE_PRESETS.filter(
    (preset) =>
      preset.name.toLowerCase().includes(lowercaseQuery) ||
      preset.description.toLowerCase().includes(lowercaseQuery) ||
      preset.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
      preset.useCases.some((useCase) => useCase.toLowerCase().includes(lowercaseQuery)),
  )
}

export function getPresetCategories(): string[] {
  const categories = new Set(MODULE_PRESETS.map((preset) => preset.category))
  return Array.from(categories)
}

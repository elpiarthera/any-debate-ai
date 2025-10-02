import type { AgentConfigurationDraft } from "@/lib/agent-config/types"

export interface AgentTeamPreset {
  id: string
  name: string
  description: string
  icon: string
  agents: AgentConfigurationDraft[]
  useCases: string[]
  category: string
}

export const AGENT_TEAM_PRESETS: AgentTeamPreset[] = [
  {
    id: "executive-team",
    name: "Executive Team",
    description: "C-suite perspectives for strategic decisions and company direction",
    icon: "👔",
    category: "Business & Strategy",
    agents: [
      {
        name: "CEO",
        roleId: "ceo",
        personaId: "visionary",
        frameworkId: "first-principles",
      },
      {
        name: "CFO",
        roleId: "financial-analyst",
        personaId: "analytical",
        frameworkId: "swot-analysis",
      },
      {
        name: "COO",
        roleId: "operations-manager",
        personaId: "pragmatic",
        frameworkId: "lean-startup",
      },
    ],
    useCases: ["Strategic planning", "Investment decisions", "Company direction", "Major initiatives"],
  },
  {
    id: "product-team",
    name: "Product Team",
    description: "Cross-functional product development perspectives",
    icon: "📱",
    category: "Product Development",
    agents: [
      {
        name: "Product Manager",
        roleId: "product-manager",
        personaId: "collaborative",
        frameworkId: "design-thinking",
      },
      {
        name: "UX Designer",
        roleId: "ux-designer",
        personaId: "empathetic",
        frameworkId: "jobs-to-be-done",
      },
      {
        name: "Engineer",
        roleId: "full-stack-developer",
        personaId: "pragmatic",
        frameworkId: "agile",
      },
    ],
    useCases: ["Feature prioritization", "Product roadmap", "User experience", "Technical feasibility"],
  },
  {
    id: "marketing-team",
    name: "Marketing Team",
    description: "Comprehensive marketing strategy and execution perspectives",
    icon: "📈",
    category: "Creative & Design",
    agents: [
      {
        name: "Marketing Director",
        roleId: "marketing-director",
        personaId: "creative",
        frameworkId: "blue-ocean",
      },
      {
        name: "Content Strategist",
        roleId: "content-strategist",
        personaId: "creative",
        frameworkId: "design-thinking",
      },
      {
        name: "Data Analyst",
        roleId: "data-scientist",
        personaId: "analytical",
        frameworkId: "six-sigma",
      },
    ],
    useCases: ["Campaign planning", "Content strategy", "Brand positioning", "Marketing analytics"],
  },
  {
    id: "research-team",
    name: "Research Team",
    description: "Scientific and analytical research perspectives",
    icon: "🔬",
    category: "Research & Analysis",
    agents: [
      {
        name: "Research Scientist",
        roleId: "medical-researcher",
        personaId: "analytical",
        frameworkId: "root-cause-analysis",
      },
      {
        name: "Data Scientist",
        roleId: "data-scientist",
        personaId: "analytical",
        frameworkId: "six-sigma",
      },
      {
        name: "Research Director",
        roleId: "market-researcher",
        personaId: "decisive",
        frameworkId: "systems-thinking",
      },
    ],
    useCases: ["Research design", "Data analysis", "Methodology", "Research synthesis"],
  },
  {
    id: "creative-team",
    name: "Creative Team",
    description: "Creative and design-focused perspectives for innovative solutions",
    icon: "🎨",
    category: "Creative & Design",
    agents: [
      {
        name: "Creative Director",
        roleId: "brand-designer",
        personaId: "creative",
        frameworkId: "scamper",
      },
      {
        name: "UX Designer",
        roleId: "ux-designer",
        personaId: "empathetic",
        frameworkId: "design-thinking",
      },
      {
        name: "Content Writer",
        roleId: "content-strategist",
        personaId: "creative",
        frameworkId: "jobs-to-be-done",
      },
    ],
    useCases: ["Brand identity", "Creative campaigns", "Design systems", "Content creation"],
  },
  {
    id: "technology-team",
    name: "Technology Team",
    description: "Technical architecture and engineering perspectives",
    icon: "💻",
    category: "Technology & Engineering",
    agents: [
      {
        name: "Software Architect",
        roleId: "software-architect",
        personaId: "analytical",
        frameworkId: "systems-thinking",
      },
      {
        name: "DevOps Engineer",
        roleId: "devops-engineer",
        personaId: "pragmatic",
        frameworkId: "lean-startup",
      },
      {
        name: "Security Expert",
        roleId: "cybersecurity-expert",
        personaId: "skeptical",
        frameworkId: "root-cause-analysis",
      },
    ],
    useCases: ["System design", "Architecture decisions", "Security review", "Infrastructure planning"],
  },
  {
    id: "innovation-team",
    name: "Innovation Team",
    description: "Forward-thinking perspectives for breakthrough solutions",
    icon: "💡",
    category: "Business & Strategy",
    agents: [
      {
        name: "Innovation Lead",
        roleId: "ceo",
        personaId: "visionary",
        frameworkId: "blue-ocean",
      },
      {
        name: "Design Thinker",
        roleId: "ux-designer",
        personaId: "creative",
        frameworkId: "design-thinking",
      },
      {
        name: "Business Analyst",
        roleId: "business-analyst",
        personaId: "analytical",
        frameworkId: "first-principles",
      },
    ],
    useCases: ["Innovation strategy", "New market opportunities", "Disruptive ideas", "Future planning"],
  },
  {
    id: "customer-success-team",
    name: "Customer Success Team",
    description: "Customer-focused perspectives for satisfaction and retention",
    icon: "🤝",
    category: "Business & Strategy",
    agents: [
      {
        name: "Customer Success Manager",
        roleId: "product-manager",
        personaId: "empathetic",
        frameworkId: "jobs-to-be-done",
      },
      {
        name: "Support Lead",
        roleId: "training-specialist",
        personaId: "collaborative",
        frameworkId: "design-thinking",
      },
      {
        name: "Product Analyst",
        roleId: "business-analyst",
        personaId: "analytical",
        frameworkId: "root-cause-analysis",
      },
    ],
    useCases: ["Customer feedback", "Support strategy", "User onboarding", "Retention planning"],
  },
]

export function getPresetById(id: string): AgentTeamPreset | undefined {
  return AGENT_TEAM_PRESETS.find((preset) => preset.id === id)
}

export function getPresetsByCategory(category: string): AgentTeamPreset[] {
  return AGENT_TEAM_PRESETS.filter((preset) => preset.category === category)
}

export function searchPresets(query: string): AgentTeamPreset[] {
  const lowercaseQuery = query.toLowerCase()
  return AGENT_TEAM_PRESETS.filter(
    (preset) =>
      preset.name.toLowerCase().includes(lowercaseQuery) ||
      preset.description.toLowerCase().includes(lowercaseQuery) ||
      preset.useCases.some((useCase) => useCase.toLowerCase().includes(lowercaseQuery)),
  )
}

export function getPresetCategories(): string[] {
  const categories = new Set(AGENT_TEAM_PRESETS.map((preset) => preset.category))
  return Array.from(categories).sort()
}

import type { DebateTemplate } from "../types"
import { AGENT_TEAM_PRESETS } from "./agent-teams.ts"

export interface QuickStartScenario {
  id: string
  name: string
  description: string
  icon: string
  presetId: string
  suggestedTopic: string
  suggestedQuestions: string[]
  category: string
}

export const QUICK_START_SCENARIOS: QuickStartScenario[] = [
  {
    id: "strategic-planning",
    name: "Strategic Planning Session",
    description: "Evaluate strategic options with executive perspectives",
    icon: "🎯",
    presetId: "executive-team",
    suggestedTopic: "Q1 2025 Strategic Priorities and Resource Allocation",
    suggestedQuestions: [
      "What should be our top 3 strategic priorities for Q1?",
      "How should we allocate resources across initiatives?",
      "What are the biggest risks and opportunities ahead?",
    ],
    category: "Business & Strategy",
  },
  {
    id: "product-feature-review",
    name: "Product Feature Review",
    description: "Evaluate and prioritize product features",
    icon: "📱",
    presetId: "product-team",
    suggestedTopic: "Q1 Feature Roadmap Prioritization",
    suggestedQuestions: [
      "Which features should we prioritize for Q1?",
      "How do these features align with user needs?",
      "What are the technical constraints and trade-offs?",
    ],
    category: "Product Development",
  },
  {
    id: "marketing-campaign",
    name: "Marketing Campaign Planning",
    description: "Design and evaluate marketing campaign strategies",
    icon: "📈",
    presetId: "marketing-team",
    suggestedTopic: "New Product Launch Campaign Strategy",
    suggestedQuestions: [
      "What should be our core campaign message?",
      "Which channels should we prioritize?",
      "How do we measure campaign success?",
    ],
    category: "Creative & Design",
  },
  {
    id: "technical-architecture",
    name: "Technical Architecture Review",
    description: "Evaluate system architecture and technical decisions",
    icon: "💻",
    presetId: "technology-team",
    suggestedTopic: "Microservices Migration Strategy",
    suggestedQuestions: [
      "Should we migrate to microservices architecture?",
      "What are the security implications?",
      "How do we ensure system reliability during migration?",
    ],
    category: "Technology & Engineering",
  },
  {
    id: "innovation-workshop",
    name: "Innovation Workshop",
    description: "Explore breakthrough ideas and new opportunities",
    icon: "💡",
    presetId: "innovation-team",
    suggestedTopic: "Exploring AI Integration Opportunities",
    suggestedQuestions: [
      "What AI capabilities could transform our product?",
      "What are the market opportunities for AI features?",
      "How do we balance innovation with practical implementation?",
    ],
    category: "Business & Strategy",
  },
  {
    id: "customer-feedback-review",
    name: "Customer Feedback Review",
    description: "Analyze customer feedback and plan improvements",
    icon: "🤝",
    presetId: "customer-success-team",
    suggestedTopic: "Q4 Customer Feedback Analysis and Action Plan",
    suggestedQuestions: [
      "What are the top customer pain points?",
      "How can we improve customer satisfaction?",
      "What features are customers requesting most?",
    ],
    category: "Business & Strategy",
  },
  {
    id: "brand-identity",
    name: "Brand Identity Workshop",
    description: "Define and refine brand identity and positioning",
    icon: "🎨",
    presetId: "creative-team",
    suggestedTopic: "Brand Refresh and Positioning Strategy",
    suggestedQuestions: [
      "How should we evolve our brand identity?",
      "What makes our brand unique in the market?",
      "How do we communicate our brand values effectively?",
    ],
    category: "Creative & Design",
  },
  {
    id: "research-methodology",
    name: "Research Methodology Design",
    description: "Design research studies and methodologies",
    icon: "🔬",
    presetId: "research-team",
    suggestedTopic: "User Research Study Design for New Feature",
    suggestedQuestions: [
      "What research methodology should we use?",
      "How do we ensure statistical validity?",
      "What metrics should we track?",
    ],
    category: "Research & Analysis",
  },
]

export function getScenarioById(id: string): QuickStartScenario | undefined {
  return QUICK_START_SCENARIOS.find((scenario) => scenario.id === id)
}

export function getScenariosByCategory(category: string): QuickStartScenario[] {
  return QUICK_START_SCENARIOS.filter((scenario) => scenario.category === category)
}

export function searchScenarios(query: string): QuickStartScenario[] {
  const lowercaseQuery = query.toLowerCase()
  return QUICK_START_SCENARIOS.filter(
    (scenario) =>
      scenario.name.toLowerCase().includes(lowercaseQuery) ||
      scenario.description.toLowerCase().includes(lowercaseQuery) ||
      scenario.suggestedTopic.toLowerCase().includes(lowercaseQuery),
  )
}

export function convertScenarioToTemplate(scenario: QuickStartScenario): Partial<DebateTemplate> {
  const preset = AGENT_TEAM_PRESETS.find((p) => p.id === scenario.presetId)
  if (!preset) {
    throw new Error(`Preset not found: ${scenario.presetId}`)
  }

  return {
    id: scenario.id,
    name: scenario.name,
    description: scenario.description,
    category: scenario.category as any,
    agents: preset.agents,
    topic: scenario.suggestedTopic,
    conversationType: "debate",
    suggestedQuestions: scenario.suggestedQuestions,
    metadata: {
      createdAt: new Date(),
      updatedAt: new Date(),
      isCustom: false,
      popularity: 0,
      tags: [scenario.category.toLowerCase(), "quick-start"],
    },
  }
}

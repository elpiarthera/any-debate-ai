import type { DebateTemplate } from "../types"

// ============================================================================
// BUSINESS STRATEGY TEMPLATES
// ============================================================================

export const businessStrategyTeam: DebateTemplate = {
  id: "business-strategy-team",
  name: "Business Strategy Team",
  description: "Strategic planning and business development",
  category: "Business Strategy",
  conversationType: "collaboration",
  agents: [
    {
      name: "CEO",
      role: "Strategic Vision",
      expertise: "Overall business strategy and long-term planning",
      perspective: "Focuses on company vision, market positioning, and growth opportunities",
    },
    {
      name: "CFO",
      role: "Financial Analysis",
      expertise: "Financial planning, budgeting, and risk assessment",
      perspective: "Evaluates financial viability and ROI of strategic decisions",
    },
    {
      name: "CMO",
      role: "Market Strategy",
      expertise: "Marketing, branding, and customer acquisition",
      perspective: "Considers market trends, customer needs, and competitive positioning",
    },
  ],
  metadata: {
    tags: ["business", "strategy", "planning"],
    isCustom: false,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    popularity: 0,
  },
}

export const startupLaunchTeam: DebateTemplate = {
  id: "startup-launch-team",
  name: "Startup Launch Team",
  description: "Planning and executing a startup launch",
  category: "Business Strategy",
  conversationType: "collaboration",
  agents: [
    {
      name: "Founder",
      role: "Vision & Leadership",
      expertise: "Product vision, company culture, and overall direction",
      perspective: "Passionate about the mission, focused on building something revolutionary",
    },
    {
      name: "Product Manager",
      role: "Product Strategy",
      expertise: "MVP definition, feature prioritization, user experience",
      perspective: "Balances user needs with technical feasibility and business goals",
    },
    {
      name: "Growth Hacker",
      role: "User Acquisition",
      expertise: "Marketing experiments, viral growth, customer acquisition",
      perspective: "Creative and data-driven approach to rapid growth",
    },
  ],
  metadata: {
    tags: ["startup", "launch", "entrepreneurship"],
    isCustom: false,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    popularity: 0,
  },
}

// ============================================================================
// PRODUCT DEVELOPMENT TEMPLATES
// ============================================================================

export const productDesignTeam: DebateTemplate = {
  id: "product-design-team",
  name: "Product Design Team",
  description: "Designing user-centered products and features",
  category: "Product Development",
  conversationType: "collaboration",
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
  metadata: {
    tags: ["product", "design", "ux", "ui"],
    isCustom: false,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    popularity: 0,
  },
}

export const featurePrioritizationTeam: DebateTemplate = {
  id: "feature-prioritization-team",
  name: "Feature Prioritization Team",
  description: "Deciding which features to build next",
  category: "Product Development",
  conversationType: "debate",
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
  metadata: {
    tags: ["product", "prioritization", "roadmap"],
    isCustom: false,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    popularity: 0,
  },
}

// ============================================================================
// TECHNOLOGY & ENGINEERING TEMPLATES
// ============================================================================

export const technicalArchitectureTeam: DebateTemplate = {
  id: "technical-architecture-team",
  name: "Technical Architecture Team",
  description: "Designing scalable and robust technical systems",
  category: "Technology & Engineering",
  conversationType: "collaboration",
  agents: [
    {
      name: "Solutions Architect",
      role: "System Design",
      expertise: "System architecture, design patterns, scalability",
      perspective: "Designs high-level system architecture and technical solutions",
    },
    {
      name: "DevOps Engineer",
      role: "Infrastructure & Operations",
      expertise: "Infrastructure, deployment, monitoring, reliability",
      perspective: "Focuses on operational excellence and system reliability",
    },
    {
      name: "Security Engineer",
      role: "Security & Compliance",
      expertise: "Security architecture, threat modeling, compliance",
      perspective: "Ensures systems are secure and meet compliance requirements",
    },
  ],
  metadata: {
    tags: ["technology", "architecture", "engineering"],
    isCustom: false,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    popularity: 0,
  },
}

export const codeReviewTeam: DebateTemplate = {
  id: "code-review-team",
  name: "Code Review Team",
  description: "Reviewing code for quality, security, and best practices",
  category: "Technology & Engineering",
  conversationType: "analysis",
  agents: [
    {
      name: "Senior Developer",
      role: "Code Quality",
      expertise: "Code quality, best practices, design patterns",
      perspective: "Reviews code for maintainability, readability, and adherence to standards",
    },
    {
      name: "Security Reviewer",
      role: "Security Analysis",
      expertise: "Security vulnerabilities, secure coding, threat analysis",
      perspective: "Identifies security issues and potential vulnerabilities",
    },
    {
      name: "Performance Engineer",
      role: "Performance Optimization",
      expertise: "Performance optimization, profiling, scalability",
      perspective: "Evaluates code for performance implications and optimization opportunities",
    },
  ],
  metadata: {
    tags: ["code", "review", "quality"],
    isCustom: false,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    popularity: 0,
  },
}

// ============================================================================
// CREATIVE & DESIGN TEMPLATES
// ============================================================================

export const brandIdentityTeam: DebateTemplate = {
  id: "brand-identity-team",
  name: "Brand Identity Team",
  description: "Developing brand strategy and identity",
  category: "Creative & Design",
  conversationType: "collaboration",
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
  metadata: {
    tags: ["brand", "identity", "creative"],
    isCustom: false,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    popularity: 0,
  },
}

export const contentCreationTeam: DebateTemplate = {
  id: "content-creation-team",
  name: "Content Creation Team",
  description: "Planning and creating engaging content",
  category: "Creative & Design",
  conversationType: "collaboration",
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
  metadata: {
    tags: ["content", "writing", "seo"],
    isCustom: false,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    popularity: 0,
  },
}

// ============================================================================
// RESEARCH & ANALYSIS TEMPLATES
// ============================================================================

export const marketAnalysisTeam: DebateTemplate = {
  id: "market-analysis-team",
  name: "Market Analysis Team",
  description: "Analyzing market opportunities and trends",
  category: "Research & Analysis",
  conversationType: "analysis",
  agents: [
    {
      name: "Market Researcher",
      role: "Market Intelligence",
      expertise: "Market research, competitive analysis, industry trends",
      perspective: "Gathers and analyzes market data to identify opportunities",
    },
    {
      name: "Data Analyst",
      role: "Data Analysis",
      expertise: "Statistical analysis, data visualization, predictive modeling",
      perspective: "Extracts insights from data and identifies patterns",
    },
    {
      name: "Business Strategist",
      role: "Strategic Implications",
      expertise: "Business strategy, strategic planning, opportunity assessment",
      perspective: "Translates market insights into strategic recommendations",
    },
  ],
  metadata: {
    tags: ["market", "research", "analysis"],
    isCustom: false,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    popularity: 0,
  },
}

export const problemSolvingTeam: DebateTemplate = {
  id: "problem-solving-team",
  name: "Problem Solving Team",
  description: "Systematic problem analysis and solution development",
  category: "Research & Analysis",
  conversationType: "collaboration",
  agents: [
    {
      name: "Problem Analyst",
      role: "Problem Definition",
      expertise: "Root cause analysis, problem framing, systems thinking",
      perspective: "Breaks down complex problems and identifies root causes",
    },
    {
      name: "Solution Architect",
      role: "Solution Design",
      expertise: "Solution design, creative problem solving, innovation",
      perspective: "Develops innovative solutions to address identified problems",
    },
    {
      name: "Implementation Specialist",
      role: "Solution Implementation",
      expertise: "Project management, change management, execution",
      perspective: "Focuses on practical implementation and adoption of solutions",
    },
  ],
  metadata: {
    tags: ["problem-solving", "analysis", "solutions"],
    isCustom: false,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    popularity: 0,
  },
}

// ============================================================================
// EDUCATION & TRAINING TEMPLATES
// ============================================================================

export const curriculumDesignTeam: DebateTemplate = {
  id: "curriculum-design-team",
  name: "Curriculum Design Team",
  description: "Designing effective educational curricula",
  category: "Education & Training",
  conversationType: "collaboration",
  agents: [
    {
      name: "Curriculum Designer",
      role: "Learning Design",
      expertise: "Instructional design, learning objectives, curriculum structure",
      perspective: "Creates structured learning experiences that achieve educational goals",
    },
    {
      name: "Subject Matter Expert",
      role: "Content Expertise",
      expertise: "Deep knowledge in the subject area",
      perspective: "Ensures content accuracy and depth",
    },
    {
      name: "Educational Technologist",
      role: "Technology Integration",
      expertise: "EdTech tools, online learning, interactive content",
      perspective: "Leverages technology to enhance learning experiences",
    },
  ],
  metadata: {
    tags: ["education", "curriculum", "learning"],
    isCustom: false,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    popularity: 0,
  },
}

// ============================================================================
// HEALTHCARE & SCIENCE TEMPLATES
// ============================================================================

export const medicalResearchTeam: DebateTemplate = {
  id: "medical-research-team",
  name: "Medical Research Team",
  description: "Conducting and evaluating medical research",
  category: "Healthcare & Science",
  conversationType: "analysis",
  agents: [
    {
      name: "Research Scientist",
      role: "Research Design",
      expertise: "Research methodology, experimental design, data analysis",
      perspective: "Designs rigorous studies to test hypotheses",
    },
    {
      name: "Clinical Physician",
      role: "Clinical Application",
      expertise: "Patient care, clinical practice, medical knowledge",
      perspective: "Considers practical clinical implications and patient outcomes",
    },
    {
      name: "Bioethicist",
      role: "Ethical Oversight",
      expertise: "Medical ethics, research ethics, patient rights",
      perspective: "Ensures research is conducted ethically and respects patient welfare",
    },
  ],
  metadata: {
    tags: ["medical", "research", "healthcare"],
    isCustom: false,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    popularity: 0,
  },
}

// ============================================================================
// GENERAL PURPOSE TEMPLATES
// ============================================================================

export const decisionMakingTeam: DebateTemplate = {
  id: "decision-making-team",
  name: "Decision Making Team",
  description: "Collaborative decision making with diverse perspectives",
  category: "General Purpose",
  conversationType: "collaboration",
  agents: [
    {
      name: "Analyst",
      role: "Data-Driven Analysis",
      expertise: "Data analysis, research, evidence-based reasoning",
      perspective: "Relies on data and facts to support decisions",
    },
    {
      name: "Visionary",
      role: "Big Picture Thinking",
      expertise: "Strategic thinking, innovation, future trends",
      perspective: "Considers long-term implications and innovative possibilities",
    },
    {
      name: "Pragmatist",
      role: "Practical Implementation",
      expertise: "Execution, resource management, risk mitigation",
      perspective: "Focuses on feasibility and practical constraints",
    },
  ],
  metadata: {
    tags: ["decision-making", "collaboration", "general"],
    isCustom: false,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    popularity: 0,
  },
}

export const brainstormingTeam: DebateTemplate = {
  id: "brainstorming-team",
  name: "Brainstorming Team",
  description: "Creative ideation and problem solving",
  category: "General Purpose",
  conversationType: "collaboration",
  agents: [
    {
      name: "Creative Thinker",
      role: "Idea Generation",
      expertise: "Creative thinking, lateral thinking, ideation techniques",
      perspective: "Generates wild and innovative ideas without constraints",
    },
    {
      name: "Critical Thinker",
      role: "Idea Evaluation",
      expertise: "Critical analysis, logical reasoning, feasibility assessment",
      perspective: "Evaluates ideas for viability and potential issues",
    },
    {
      name: "Synthesizer",
      role: "Idea Combination",
      expertise: "Pattern recognition, idea synthesis, concept development",
      perspective: "Combines and refines ideas into actionable concepts",
    },
  ],
  metadata: {
    tags: ["brainstorming", "creativity", "ideation"],
    isCustom: false,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    popularity: 0,
  },
}

export const crisisManagementTeam: DebateTemplate = {
  id: "crisis-management-team",
  name: "Crisis Management Team",
  description: "Managing and responding to crisis situations",
  category: "General Purpose",
  conversationType: "collaboration",
  agents: [
    {
      name: "Crisis Manager",
      role: "Crisis Response",
      expertise: "Crisis management, emergency response, decision-making under pressure",
      perspective: "Stays calm, prioritizes actions, and coordinates response",
    },
    {
      name: "Communications Lead",
      role: "Stakeholder Communication",
      expertise: "Crisis communication, public relations, messaging",
      perspective: "Manages internal and external communications during crisis",
    },
    {
      name: "Operations Lead",
      role: "Operational Response",
      expertise: "Operations management, resource allocation, business continuity",
      perspective: "Ensures business operations continue and resources are deployed effectively",
    },
  ],
  metadata: {
    tags: ["crisis", "management", "emergency"],
    isCustom: false,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    popularity: 0,
  },
}

// ============================================================================
// AGGREGATE ALL TEMPLATES
// ============================================================================

export const BUILT_IN_TEMPLATES: DebateTemplate[] = [
  // Business Strategy
  businessStrategyTeam,
  startupLaunchTeam,

  // Product Development
  productDesignTeam,
  featurePrioritizationTeam,

  // Technology & Engineering
  technicalArchitectureTeam,
  codeReviewTeam,

  // Creative & Design
  brandIdentityTeam,
  contentCreationTeam,

  // Research & Analysis
  marketAnalysisTeam,
  problemSolvingTeam,

  // Education & Training
  curriculumDesignTeam,

  // Healthcare & Science
  medicalResearchTeam,

  // General Purpose
  decisionMakingTeam,
  brainstormingTeam,
  crisisManagementTeam,
]

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getTemplateById(templateId: string): DebateTemplate | undefined {
  return BUILT_IN_TEMPLATES.find((t) => t.id === templateId)
}

export function getTemplatesByCategory(category: string): DebateTemplate[] {
  return BUILT_IN_TEMPLATES.filter((t) => t.category === category)
}

export function searchTemplates(query: string): DebateTemplate[] {
  const lowercaseQuery = query.toLowerCase()
  return BUILT_IN_TEMPLATES.filter(
    (t) =>
      t.name.toLowerCase().includes(lowercaseQuery) ||
      t.description.toLowerCase().includes(lowercaseQuery) ||
      t.metadata.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
  )
}

export function getPopularTemplates(limit = 5): DebateTemplate[] {
  // For built-in templates, return a curated list of most useful ones
  return [businessStrategyTeam, productDesignTeam, decisionMakingTeam, brainstormingTeam, technicalArchitectureTeam]
    .filter((t): t is DebateTemplate => t !== undefined)
    .slice(0, limit)
}

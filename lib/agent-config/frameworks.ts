export interface ThinkingFramework {
  id: string
  name: string
  description: string
  methodology: string
  bestFor: string[]
  steps: string[]
  systemPromptModifier: string
  icon: string
}

export const THINKING_FRAMEWORKS: ThinkingFramework[] = [
  {
    id: "design-thinking",
    name: "Design Thinking",
    description: "Human-centered approach to innovation and problem-solving",
    methodology: "Empathize → Define → Ideate → Prototype → Test",
    bestFor: ["User Experience", "Innovation", "Product Development", "Service Design"],
    steps: [
      "Empathize with users and stakeholders",
      "Define the core problem clearly",
      "Ideate multiple creative solutions",
      "Prototype and test concepts",
      "Iterate based on feedback",
    ],
    systemPromptModifier:
      "Use design thinking methodology: Start by empathizing with users, clearly define the problem, generate multiple creative solutions, consider how to prototype and test ideas, and think about iteration cycles. Focus on human-centered solutions.",
    icon: "🎯",
  },
  {
    id: "systems-thinking",
    name: "Systems Thinking",
    description: "Holistic approach considering interconnections and feedback loops",
    methodology: "Map system → Identify patterns → Find leverage points → Consider unintended consequences",
    bestFor: ["Complex Problems", "Organizational Change", "Strategy", "Process Improvement"],
    steps: [
      "Map the system and its components",
      "Identify patterns and relationships",
      "Find high-leverage intervention points",
      "Consider feedback loops and delays",
      "Anticipate unintended consequences",
    ],
    systemPromptModifier:
      "Apply systems thinking: Consider the broader system, identify interconnections and feedback loops, look for root causes rather than symptoms, find high-leverage intervention points, and anticipate ripple effects throughout the system.",
    icon: "🔄",
  },
  {
    id: "lean-startup",
    name: "Lean Startup",
    description: "Build-Measure-Learn cycle for rapid experimentation and validation",
    methodology: "Build MVP → Measure results → Learn from data → Pivot or persevere",
    bestFor: ["Product Development", "Entrepreneurship", "Innovation", "Risk Reduction"],
    steps: [
      "Build minimum viable product (MVP)",
      "Measure key metrics and user feedback",
      "Learn from data and user behavior",
      "Decide to pivot or persevere",
      "Iterate quickly based on learnings",
    ],
    systemPromptModifier:
      "Use lean startup methodology: Focus on rapid experimentation, building MVPs, measuring key metrics, learning from data, and making quick pivot decisions. Emphasize validated learning over assumptions.",
    icon: "🚀",
  },
  {
    id: "six-sigma",
    name: "Six Sigma",
    description: "Data-driven methodology for process improvement and quality management",
    methodology: "Define → Measure → Analyze → Improve → Control (DMAIC)",
    bestFor: ["Quality Improvement", "Process Optimization", "Cost Reduction", "Performance"],
    steps: [
      "Define the problem and project scope",
      "Measure current performance and collect data",
      "Analyze data to identify root causes",
      "Improve the process with targeted solutions",
      "Control and monitor the improved process",
    ],
    systemPromptModifier:
      "Apply Six Sigma DMAIC methodology: Clearly define the problem, measure current state with data, analyze root causes statistically, propose targeted improvements, and establish controls to sustain gains.",
    icon: "📊",
  },
  {
    id: "agile",
    name: "Agile Methodology",
    description: "Iterative approach emphasizing collaboration and adaptive planning",
    methodology: "Sprint planning → Daily standups → Sprint review → Retrospective",
    bestFor: ["Software Development", "Project Management", "Team Collaboration", "Adaptability"],
    steps: [
      "Plan work in short iterations (sprints)",
      "Collaborate daily with team members",
      "Deliver working solutions incrementally",
      "Review and adapt based on feedback",
      "Continuously improve processes",
    ],
    systemPromptModifier:
      "Use agile principles: Break work into small iterations, prioritize collaboration and communication, focus on delivering working solutions, embrace change and feedback, and continuously improve processes.",
    icon: "🔄",
  },
  {
    id: "first-principles",
    name: "First Principles",
    description: "Break down complex problems to fundamental truths and build up solutions",
    methodology: "Identify assumptions → Break down to basics → Reason from fundamentals → Build new solutions",
    bestFor: ["Innovation", "Problem Solving", "Strategic Thinking", "Breakthrough Solutions"],
    steps: [
      "Identify and question all assumptions",
      "Break down to fundamental truths",
      "Reason up from basic principles",
      "Build new solutions from scratch",
      "Challenge conventional wisdom",
    ],
    systemPromptModifier:
      "Apply first principles thinking: Question all assumptions, break the problem down to fundamental truths, reason up from basic principles rather than by analogy, and build innovative solutions from the ground up.",
    icon: "🧠",
  },
  {
    id: "ooda-loop",
    name: "OODA Loop",
    description: "Rapid decision-making cycle for competitive advantage",
    methodology: "Observe → Orient → Decide → Act → Repeat",
    bestFor: ["Strategic Planning", "Competitive Analysis", "Crisis Management", "Rapid Response"],
    steps: [
      "Observe the current situation and gather information",
      "Orient by analyzing and synthesizing observations",
      "Decide on the best course of action",
      "Act quickly to implement decisions",
      "Loop back to observe results and adapt",
    ],
    systemPromptModifier:
      "Use OODA loop methodology: Continuously observe the situation, orient by analyzing information, make quick decisions, act rapidly, and loop back to observe results. Emphasize speed and adaptability.",
    icon: "🎯",
  },
  {
    id: "double-diamond",
    name: "Double Diamond",
    description: "Divergent and convergent thinking for design and innovation",
    methodology: "Discover → Define → Develop → Deliver",
    bestFor: ["Design Process", "Innovation", "Problem Definition", "Solution Development"],
    steps: [
      "Discover and explore the problem space broadly",
      "Define and focus on the right problem to solve",
      "Develop multiple solution concepts",
      "Deliver and implement the best solution",
      "Use divergent and convergent thinking at each stage",
    ],
    systemPromptModifier:
      "Apply double diamond process: First diverge to discover and explore broadly, then converge to define the right problem. Next diverge to develop multiple solutions, then converge to deliver the best one. Balance exploration with focus.",
    icon: "💎",
  },
  {
    id: "jobs-to-be-done",
    name: "Jobs-to-be-Done",
    description: "Focus on the job customers are trying to accomplish",
    methodology: "Identify job → Understand context → Map job steps → Find improvement opportunities",
    bestFor: ["Product Strategy", "Customer Research", "Innovation", "Market Analysis"],
    steps: [
      "Identify the job customers are trying to do",
      "Understand the context and circumstances",
      "Map out the job steps and pain points",
      "Find opportunities for improvement",
      "Design solutions that do the job better",
    ],
    systemPromptModifier:
      "Use Jobs-to-be-Done framework: Focus on what job customers are trying to accomplish, understand the context and circumstances, identify pain points in the current process, and design solutions that help customers do the job better.",
    icon: "🎯",
  },
  {
    id: "value-proposition-canvas",
    name: "Value Proposition Canvas",
    description: "Align products and services with customer needs and desires",
    methodology: "Map customer profile → Design value proposition → Achieve fit",
    bestFor: ["Product Development", "Marketing Strategy", "Customer Understanding", "Business Model"],
    steps: [
      "Map customer jobs, pains, and gains",
      "Design products, pain relievers, and gain creators",
      "Achieve fit between value proposition and customer profile",
      "Test and validate the fit with customers",
      "Iterate based on customer feedback",
    ],
    systemPromptModifier:
      "Apply Value Proposition Canvas: Map customer jobs, pains, and gains clearly. Design products and services that address these needs. Focus on achieving strong fit between what you offer and what customers want.",
    icon: "🎨",
  },
  {
    id: "blue-ocean",
    name: "Blue Ocean Strategy",
    description: "Create uncontested market space by making competition irrelevant",
    methodology: "Eliminate → Reduce → Raise → Create (ERRC Grid)",
    bestFor: ["Strategy Development", "Market Creation", "Competitive Advantage", "Innovation"],
    steps: [
      "Eliminate factors the industry takes for granted",
      "Reduce factors well below industry standard",
      "Raise factors well above industry standard",
      "Create new factors the industry never offered",
      "Focus on value innovation over competition",
    ],
    systemPromptModifier:
      "Use Blue Ocean Strategy: Look beyond existing competition to create new market space. Apply ERRC Grid - eliminate, reduce, raise, and create factors to achieve value innovation. Focus on making competition irrelevant.",
    icon: "🌊",
  },
  {
    id: "scamper",
    name: "SCAMPER",
    description: "Creative thinking technique using seven different approaches",
    methodology: "Substitute → Combine → Adapt → Modify → Put to other uses → Eliminate → Reverse",
    bestFor: ["Creative Problem Solving", "Innovation", "Product Development", "Process Improvement"],
    steps: [
      "Substitute components or elements",
      "Combine with other ideas or products",
      "Adapt from other contexts or industries",
      "Modify or magnify certain aspects",
      "Put to other uses or purposes",
      "Eliminate unnecessary elements",
      "Reverse or rearrange the process",
    ],
    systemPromptModifier:
      "Apply SCAMPER technique: Consider substituting elements, combining ideas, adapting from other contexts, modifying aspects, putting to other uses, eliminating unnecessary parts, and reversing processes. Use all seven approaches creatively.",
    icon: "🔀",
  },
  {
    id: "root-cause-analysis",
    name: "Root Cause Analysis",
    description: "Systematic approach to identify underlying causes of problems",
    methodology: "Define problem → Collect data → Identify causes → Determine root cause → Implement solutions",
    bestFor: ["Problem Solving", "Quality Improvement", "Process Analysis", "Troubleshooting"],
    steps: [
      "Define the problem clearly and specifically",
      "Collect relevant data and evidence",
      "Identify all possible contributing causes",
      "Use techniques like 5 Whys or fishbone diagram",
      "Implement solutions that address root causes",
    ],
    systemPromptModifier:
      "Conduct root cause analysis: Define the problem precisely, gather relevant data, identify all contributing factors, dig deeper with techniques like 5 Whys, and focus on addressing root causes rather than symptoms.",
    icon: "🔍",
  },
  {
    id: "swot-analysis",
    name: "SWOT Analysis",
    description: "Strategic planning tool analyzing Strengths, Weaknesses, Opportunities, Threats",
    methodology:
      "Identify strengths → Assess weaknesses → Explore opportunities → Evaluate threats → Develop strategies",
    bestFor: ["Strategic Planning", "Competitive Analysis", "Decision Making", "Risk Assessment"],
    steps: [
      "Identify internal strengths and advantages",
      "Assess internal weaknesses and limitations",
      "Explore external opportunities in the environment",
      "Evaluate external threats and challenges",
      "Develop strategies that leverage strengths and opportunities",
    ],
    systemPromptModifier:
      "Perform SWOT analysis: Systematically identify internal strengths and weaknesses, external opportunities and threats. Develop strategies that leverage strengths, address weaknesses, capitalize on opportunities, and mitigate threats.",
    icon: "⚖️",
  },
  {
    id: "porter-five-forces",
    name: "Porter's Five Forces",
    description: "Framework for analyzing competitive forces in an industry",
    methodology:
      "Analyze competitive rivalry → Supplier power → Buyer power → Threat of substitutes → Barriers to entry",
    bestFor: ["Industry Analysis", "Competitive Strategy", "Market Assessment", "Business Planning"],
    steps: [
      "Analyze competitive rivalry intensity",
      "Assess supplier bargaining power",
      "Evaluate buyer bargaining power",
      "Consider threat of substitute products",
      "Examine barriers to entry for new competitors",
    ],
    systemPromptModifier:
      "Apply Porter's Five Forces: Analyze competitive rivalry, supplier power, buyer power, threat of substitutes, and barriers to entry. Use this framework to understand industry attractiveness and competitive dynamics.",
    icon: "🏛️",
  },
  {
    id: "lean-canvas",
    name: "Lean Canvas",
    description: "One-page business model focusing on problems, solutions, and key metrics",
    methodology:
      "Problem → Solution → Key metrics → Unique value proposition → Unfair advantage → Channels → Customer segments → Cost structure → Revenue streams",
    bestFor: ["Business Model Design", "Startup Planning", "Product Strategy", "Validation"],
    steps: [
      "Identify key problems to solve",
      "Define your solution approach",
      "Determine key metrics to track",
      "Articulate unique value proposition",
      "Identify unfair advantages",
      "Map distribution channels",
      "Define customer segments",
      "Outline cost structure and revenue streams",
    ],
    systemPromptModifier:
      "Use Lean Canvas methodology: Focus on key problems, solutions, metrics, and value proposition. Consider unfair advantages, channels, customer segments, costs, and revenue. Keep it concise and actionable.",
    icon: "📋",
  },
]

export const FRAMEWORKS = THINKING_FRAMEWORKS

export const FRAMEWORK_CATEGORIES = ["Strategy", "Innovation", "Process", "Analysis"] as const

export function getFrameworkById(id: string): ThinkingFramework | undefined {
  return THINKING_FRAMEWORKS.find((framework) => framework.id === id)
}

export function getFrameworksByCategory(category: string): ThinkingFramework[] {
  return THINKING_FRAMEWORKS.filter((framework) =>
    framework.bestFor.some((use) => use.toLowerCase().includes(category.toLowerCase())),
  )
}

export function searchFrameworks(query: string): ThinkingFramework[] {
  const lowercaseQuery = query.toLowerCase()
  return THINKING_FRAMEWORKS.filter(
    (framework) =>
      framework.name.toLowerCase().includes(lowercaseQuery) ||
      framework.description.toLowerCase().includes(lowercaseQuery) ||
      framework.bestFor.some((use) => use.toLowerCase().includes(lowercaseQuery)),
  )
}

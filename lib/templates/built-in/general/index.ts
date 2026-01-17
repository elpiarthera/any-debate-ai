import type { DebateTemplate } from "@/lib/templates/types"

export const decisionMakingTeam: DebateTemplate = {
  id: "decision-making-team",
  name: "Decision Making Team",
  description: "Collaborative decision making with diverse perspectives",
  category: "general",
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
  systemPrompt:
    "You are part of a decision-making team. Consider multiple perspectives and work towards a well-reasoned decision.",
}

export const brainstormingTeam: DebateTemplate = {
  id: "brainstorming-team",
  name: "Brainstorming Team",
  description: "Creative ideation and problem solving",
  category: "general",
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
  systemPrompt: "You are brainstorming solutions. Be creative, build on each other's ideas, and explore possibilities.",
}

export const crisisManagementTeam: DebateTemplate = {
  id: "crisis-management-team",
  name: "Crisis Management Team",
  description: "Managing and responding to crisis situations",
  category: "general",
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
  systemPrompt:
    "You are managing a crisis situation. Act quickly, communicate clearly, and prioritize the most critical actions.",
}

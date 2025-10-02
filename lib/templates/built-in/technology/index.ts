import type { DebateTemplate } from "@/lib/templates/types"

export const technicalArchitectureTeam: DebateTemplate = {
  id: "technical-architecture-team",
  name: "Technical Architecture Team",
  description: "Designing scalable and robust technical systems",
  category: "technology",
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
  systemPrompt:
    "You are designing a technical system. Consider scalability, reliability, security, and maintainability.",
}

export const codeReviewTeam: DebateTemplate = {
  id: "code-review-team",
  name: "Code Review Team",
  description: "Reviewing code for quality, security, and best practices",
  category: "technology",
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
  systemPrompt: "You are reviewing code. Provide constructive feedback on code quality, security, and performance.",
}

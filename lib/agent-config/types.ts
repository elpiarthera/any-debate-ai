import type { Role } from "./roles"
import type { Persona } from "./personas"
import type { ThinkingFramework } from "./frameworks"

export interface AgentConfiguration {
  id: string
  name: string
  role: Role
  persona: Persona
  framework: ThinkingFramework
  customInstructions?: string
  systemPrompt: string
  createdAt: Date
  updatedAt: Date
}

export interface AgentConfigurationDraft {
  name: string
  roleId: string
  personaId: string
  frameworkId: string
  customInstructions?: string
}

export interface AgentPreview {
  configuration: AgentConfiguration
  sampleResponse: string
  personality: {
    communicationStyle: string
    decisionMaking: string
    strengths: string[]
    approach: string
  }
}

export interface ConfigurationStep {
  id: string
  title: string
  description: string
  completed: boolean
}

export type PersonaId = string
export type FrameworkId = string

export const CONFIGURATION_STEPS: ConfigurationStep[] = [
  {
    id: "role",
    title: "Select Role",
    description: "Choose the professional role and expertise area",
    completed: false,
  },
  {
    id: "persona",
    title: "Choose Persona",
    description: "Define the behavioral style and communication approach",
    completed: false,
  },
  {
    id: "framework",
    title: "Pick Framework",
    description: "Select the thinking methodology and problem-solving approach",
    completed: false,
  },
  {
    id: "preview",
    title: "Preview & Customize",
    description: "Review the configuration and add custom instructions",
    completed: false,
  },
]

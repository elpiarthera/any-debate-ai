export type ModelProvider = "openai" | "anthropic" | "google" | "xai"

export interface Model {
  id: string
  name: string
  provider: ModelProvider
  description: string
  capabilities: string[]
  contextWindow: number
  pricing: {
    input: number // per 1M tokens
    output: number // per 1M tokens
  }
  recommended?: boolean
  icon?: string
}

export interface ModelCategory {
  name: string
  models: Model[]
}

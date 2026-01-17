import type { Model, ModelCategory, ModelProvider } from "./types"

export const AVAILABLE_MODELS: Model[] = [
  // OpenAI Models
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    provider: "openai",
    description: "Most capable model, best for complex reasoning",
    capabilities: ["Text", "Code", "Analysis", "Creative Writing"],
    contextWindow: 128000,
    pricing: {
      input: 10,
      output: 30,
    },
    recommended: true,
    icon: "🤖",
  },
  {
    id: "gpt-4",
    name: "GPT-4",
    provider: "openai",
    description: "Powerful model for complex tasks",
    capabilities: ["Text", "Code", "Analysis"],
    contextWindow: 8192,
    pricing: {
      input: 30,
      output: 60,
    },
    icon: "🤖",
  },
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    provider: "openai",
    description: "Fast and cost-effective for simple tasks",
    capabilities: ["Text", "Code"],
    contextWindow: 16385,
    pricing: {
      input: 0.5,
      output: 1.5,
    },
    icon: "🤖",
  },

  // Anthropic Models
  {
    id: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "anthropic",
    description: "Balanced performance and speed",
    capabilities: ["Text", "Code", "Analysis", "Long Context"],
    contextWindow: 200000,
    pricing: {
      input: 3,
      output: 15,
    },
    recommended: true,
    icon: "🧠",
  },
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    provider: "anthropic",
    description: "Most intelligent Claude model",
    capabilities: ["Text", "Code", "Analysis", "Creative Writing"],
    contextWindow: 200000,
    pricing: {
      input: 15,
      output: 75,
    },
    icon: "🧠",
  },
  {
    id: "claude-3-haiku",
    name: "Claude 3 Haiku",
    provider: "anthropic",
    description: "Fastest and most compact model",
    capabilities: ["Text", "Code"],
    contextWindow: 200000,
    pricing: {
      input: 0.25,
      output: 1.25,
    },
    icon: "🧠",
  },

  // Google Models
  {
    id: "gemini-1.5-pro",
    name: "Gemini 1.5 Pro",
    provider: "google",
    description: "Massive context window for long documents",
    capabilities: ["Text", "Code", "Analysis", "Long Context"],
    contextWindow: 1000000,
    pricing: {
      input: 1.25,
      output: 5,
    },
    icon: "💎",
  },
  {
    id: "gemini-1.5-flash",
    name: "Gemini 1.5 Flash",
    provider: "google",
    description: "Fast and efficient for everyday tasks",
    capabilities: ["Text", "Code"],
    contextWindow: 1000000,
    pricing: {
      input: 0.075,
      output: 0.3,
    },
    icon: "💎",
  },

  // xAI Models
  {
    id: "grok-beta",
    name: "Grok Beta",
    provider: "xai",
    description: "Real-time knowledge and witty responses",
    capabilities: ["Text", "Code", "Real-time Data"],
    contextWindow: 131072,
    pricing: {
      input: 5,
      output: 15,
    },
    icon: "⚡",
  },
]

export const MODEL_CATEGORIES: ModelCategory[] = [
  {
    name: "Recommended",
    models: AVAILABLE_MODELS.filter((m) => m.recommended),
  },
  {
    name: "OpenAI",
    models: AVAILABLE_MODELS.filter((m) => m.provider === "openai"),
  },
  {
    name: "Anthropic",
    models: AVAILABLE_MODELS.filter((m) => m.provider === "anthropic"),
  },
  {
    name: "Google",
    models: AVAILABLE_MODELS.filter((m) => m.provider === "google"),
  },
  {
    name: "xAI",
    models: AVAILABLE_MODELS.filter((m) => m.provider === "xai"),
  },
]

export function getModelById(id: string): Model | undefined {
  return AVAILABLE_MODELS.find((m) => m.id === id)
}

export function getModelsByProvider(provider: ModelProvider): Model[] {
  return AVAILABLE_MODELS.filter((m) => m.provider === provider)
}

export function getRecommendedModels(): Model[] {
  return AVAILABLE_MODELS.filter((m) => m.recommended)
}

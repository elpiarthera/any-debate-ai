import { togetherai } from "@ai-sdk/togetherai"

// AI Gateway configuration using environment variables
export const AI_GATEWAY_CONFIG = {
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: "https://gateway.ai.vercel.com/v1",
}

// Together.ai configuration
export const TOGETHER_CONFIG = {
  apiKey: process.env.TOGETHER_API_KEY,
  baseURL: "https://api.together.xyz/v1",
}

// Model mappings with fallback strategy
export const MODEL_MAPPINGS = {
  "GPT-4": {
    primary: "openai/gpt-4o",
    fallback: "openai/gpt-4o-mini",
    provider: "gateway",
  },
  "Claude-3.5": {
    primary: "anthropic/claude-3-5-sonnet-20241022",
    fallback: "anthropic/claude-3-5-haiku-20241022",
    provider: "gateway",
  },
  "Llama-3": {
    primary: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
    fallback: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
    provider: "together",
  },
  Gemini: {
    primary: "google/gemini-1.5-pro",
    fallback: "google/gemini-1.5-flash",
    provider: "gateway",
  },
} as const

// Get model configuration with intelligent routing
export function getModelConfig(modelType: string) {
  const config = MODEL_MAPPINGS[modelType as keyof typeof MODEL_MAPPINGS]

  if (!config) {
    console.warn(`[v0] Unknown model type: ${modelType}, falling back to GPT-4`)
    return MODEL_MAPPINGS["GPT-4"]
  }

  return config
}

// Create model instance based on provider
export function createModelInstance(modelConfig: (typeof MODEL_MAPPINGS)[keyof typeof MODEL_MAPPINGS]) {
  if (modelConfig.provider === "together") {
    return togetherai(modelConfig.primary, {
      apiKey: TOGETHER_CONFIG.apiKey,
    })
  }

  // Use AI Gateway for OpenAI, Anthropic, and Google models
  return modelConfig.primary
}

// Export the model configuration functions that are still needed

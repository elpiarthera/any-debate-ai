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
    primary: "gpt-4-turbo",
    fallback: "gpt-3.5-turbo",
    provider: "gateway" as const,
    gatewayProvider: "openai",
  },
  "Claude-3.5": {
    primary: "claude-3-5-sonnet-20241022",
    fallback: "claude-3-haiku-20240307",
    provider: "gateway" as const,
    gatewayProvider: "anthropic",
  },
  "Llama-3": {
    primary: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
    fallback: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
    provider: "together" as const,
  },
  Gemini: {
    primary: "gemini-1.5-pro",
    fallback: "gemini-1.5-flash",
    provider: "gateway" as const,
    gatewayProvider: "google",
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

export function createModelInstance(modelConfig: (typeof MODEL_MAPPINGS)[keyof typeof MODEL_MAPPINGS]) {
  console.log("[v0] Creating model instance for config:", modelConfig)

  if (modelConfig.provider === "together") {
    const instance = togetherai(modelConfig.primary, {
      apiKey: TOGETHER_CONFIG.apiKey,
    })
    console.log("[v0] Created Together.ai instance")
    return instance
  }

  // For AI Gateway models, return the gateway format string directly
  // The AI SDK v5 will handle this automatically
  const gatewayModel = `${modelConfig.gatewayProvider}/${modelConfig.primary}`
  console.log("[v0] Returning gateway model string:", gatewayModel)
  return gatewayModel
}

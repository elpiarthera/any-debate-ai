import { streamText } from "ai"
import { getModelConfig, createModelInstance } from "@/lib/ai-config"
import { generateSystemPrompt, validateAgentConfig, adaptPersonalityToContext, rateLimiter } from "@/lib/ai-utils"
import {
  createDocumentTool,
  createTableTool,
  createChecklistTool,
  createChartTool,
} from "@/lib/ai-tools/artifact-tools"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages, model, agentConfig, conversationContext } = await req.json()

    console.log("[v0] Chat request:", { model, agentConfig, conversationContext })

    const clientId = req.headers.get("x-forwarded-for") || "anonymous"
    if (!rateLimiter.isAllowed(clientId)) {
      return new Response(
        JSON.stringify({
          error: "Rate limit exceeded",
          message: "Too many requests. Please wait before sending another message.",
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    if (agentConfig) {
      const validation = validateAgentConfig(agentConfig)
      if (!validation.isValid) {
        return new Response(
          JSON.stringify({
            error: "Invalid agent configuration",
            details: validation.errors,
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        )
      }
    }

    const modelConfig = getModelConfig(model)
    const modelInstance = createModelInstance(modelConfig)

    const baseSystemPrompt = agentConfig
      ? generateSystemPrompt(agentConfig)
      : `You are an AI assistant participating in a collaborative debate platform. Provide thoughtful, well-reasoned responses.

ARTIFACT CREATION CAPABILITIES:
You can create collaborative artifacts during debates to enhance discussions:
- Documents: Use createDocumentTool for structured arguments, research summaries, or collaborative notes
- Data Tables: Use createTableTool for comparative analysis, statistics, or structured data
- Checklists: Use createChecklistTool for action items, debate points, or task tracking  
- Charts: Use createChartTool for visualizing data, trends, or comparative information

Create artifacts when they would enhance the debate or provide valuable collaborative value. Always use your agent ID when creating artifacts.`

    const contextAdaptation =
      agentConfig && conversationContext ? adaptPersonalityToContext(agentConfig, conversationContext) : ""

    const finalSystemPrompt = contextAdaptation
      ? `${baseSystemPrompt}\n\nCONTEXT ADAPTATION: ${contextAdaptation}`
      : baseSystemPrompt

    console.log("[v0] Using model:", modelConfig.primary, "Provider:", modelConfig.provider)
    console.log("[v0] Agent config:", agentConfig)

    const temperature =
      agentConfig?.temperature ??
      (agentConfig?.persona === "creative" ? 0.9 : agentConfig?.persona === "analytical" ? 0.3 : 0.7)

    const agentId = agentConfig?.name || model || "ai-agent"

    const result = streamText({
      model: modelInstance,
      messages: [
        {
          role: "system",
          content: finalSystemPrompt,
        },
        ...messages,
      ],
      tools: {
        createDocument: createDocumentTool,
        createTable: createTableTool,
        createChecklist: createChecklistTool,
        createChart: createChartTool,
      },
      toolChoice: "auto",
      maxTokens: 1000,
      temperature,
      async onFinish({ text, usage, finishReason, toolCalls }) {
        console.log("[v0] Chat finished:", {
          model: modelConfig.primary,
          provider: modelConfig.provider,
          agentRole: agentConfig?.role,
          agentPersona: agentConfig?.persona,
          framework: agentConfig?.thinkingFramework,
          usage,
          finishReason,
          textLength: text.length,
          toolCallsCount: toolCalls?.length || 0,
        })
      },
      async onError(error) {
        console.error("[v0] Streaming error:", error)

        if (modelConfig.fallback && modelConfig.fallback !== modelConfig.primary) {
          console.log("[v0] Attempting fallback to:", modelConfig.fallback)
          // Note: In production, you'd implement actual fallback logic here
        }
      },
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("[v0] Chat API error:", error)

    const errorMessage = error instanceof Error ? error.message : "Unknown error"

    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined,
        timestamp: new Date().toISOString(),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}

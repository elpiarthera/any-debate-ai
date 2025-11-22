"use client"

import { useState, useEffect } from "react"
import { type CompareRound, createCompareRound } from "@/lib/chat/modes"
import { CompareRoundView } from "./CompareRoundView"
import { ComparePromptInput } from "./ComparePromptInput"
import { CompareAgentSelector } from "./CompareAgentSelector"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"
import { toast } from "sonner"

interface CompareModeProps {
  activeAgents: string[]
  onSendMessage?: (prompt: string, agentIds: string[]) => Promise<void>
}

const SAMPLE_PROMPTS = [
  "Compare approaches to solving climate change",
  "Explain quantum computing to a 10-year-old",
  "Write a product description for AI-powered headphones",
  "Analyze the pros and cons of remote work",
  "Create a healthy meal plan for weight loss",
]

export function CompareMode({ activeAgents: initialAgents, onSendMessage }: CompareModeProps) {
  const [rounds, setRounds] = useState<CompareRound[]>([])
  const [selectedAgents, setSelectedAgents] = useState<string[]>(initialAgents)
  const [isGenerating, setIsGenerating] = useState(false)

  // Update selected agents if props change
  useEffect(() => {
    if (initialAgents.length > 0) {
      setSelectedAgents(initialAgents)
    }
  }, [initialAgents])

  const handleNewRound = async (prompt: string) => {
    if (!prompt.trim() || selectedAgents.length < 2) {
      toast.error("Please select at least 2 agents to compare")
      return
    }

    setIsGenerating(true)
    const newRound = createCompareRound(prompt, selectedAgents)
    setRounds((prev) => [...prev, newRound])

    try {
      // Trigger AI responses
      await onSendMessage?.(prompt, selectedAgents)
    } catch (error) {
      console.error("Failed to generate responses:", error)
      toast.error("Failed to generate responses. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopyResponse = (agentId: string, content: string) => {
    navigator.clipboard.writeText(content)
    toast.success("Response copied to clipboard")
  }

  const handleReaction = (agentId: string, reaction: "like" | "dislike") => {
    toast.success(`Reaction recorded for ${agentId}`)
  }

  const handleRetry = (agentId: string) => {
    toast.info(`Retrying generation for ${agentId}...`)
    // Implementation would go here - likely needing a specific retry callback prop
  }

  const handleRemoveAgent = (agentId: string) => {
    setSelectedAgents((prev) => prev.filter((id) => id !== agentId))
    toast.success("Agent removed from comparison")
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Agent Selector Header */}
      <div className="border-b p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
        <CompareAgentSelector
          selectedModelIds={selectedAgents}
          onSelectionChange={setSelectedAgents}
          minSelection={2}
          maxSelection={4}
        />
      </div>

      {/* Main Content Area */}
      <ScrollArea className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-8 min-h-full">
          {rounds.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6 animate-in fade-in zoom-in duration-500">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-10 w-10 text-primary" />
              </div>

              <div className="space-y-2 max-w-md">
                <h2 className="text-2xl font-semibold tracking-tight">Start Comparing</h2>
                <p className="text-muted-foreground">
                  Select 2-4 AI models above, then ask a question to see how they compare side-by-side.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
                {SAMPLE_PROMPTS.map((prompt) => (
                  <Badge
                    key={prompt}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors px-3 py-1.5 text-sm font-normal"
                    onClick={() => handleNewRound(prompt)}
                  >
                    {prompt}
                  </Badge>
                ))}
              </div>
            </div>
          ) : (
            rounds.map((round, index) => (
              <CompareRoundView
                key={round.id}
                round={round}
                roundNumber={index + 1}
                onCopyResponse={handleCopyResponse}
                onReaction={handleReaction}
                onRetry={handleRetry}
                onRemove={handleRemoveAgent}
              />
            ))
          )}
          {/* Spacer for sticky input */}
          <div className="h-24" />
        </div>
      </ScrollArea>

      {/* Sticky Input Footer */}
      <div className="border-t bg-background p-4 safe-area-inset-bottom z-20">
        <div className="max-w-4xl mx-auto">
          <ComparePromptInput
            onSubmit={handleNewRound}
            disabled={selectedAgents.length < 2}
            isLoading={isGenerating}
            placeholder={
              selectedAgents.length < 2
                ? "Select at least 2 models to start..."
                : `Ask ${selectedAgents.length} models to compare...`
            }
          />
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { type CompareRound, createCompareRound } from "@/lib/chat/modes"
import { CompareRoundView } from "./CompareRoundView"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner"

interface CompareModeProps {
  activeAgents: string[]
  onSendMessage?: (prompt: string, agentIds: string[]) => Promise<void>
}

export function CompareMode({ activeAgents, onSendMessage }: CompareModeProps) {
  const [rounds, setRounds] = useState<CompareRound[]>([])

  const handleNewRound = async (prompt: string) => {
    if (!prompt.trim() || activeAgents.length === 0) return

    const newRound = createCompareRound(prompt, activeAgents)
    setRounds((prev) => [...prev, newRound])

    // Trigger AI responses
    await onSendMessage?.(prompt, activeAgents)
  }

  const handleCopyResponse = (agentId: string, content: string) => {
    navigator.clipboard.writeText(content)
    toast.success("Response copied to clipboard")
  }

  const handleReaction = (agentId: string, reaction: "like" | "dislike") => {
    toast.success(`Reaction recorded for ${agentId}`)
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 px-4 py-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {rounds.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center">
              <div className="space-y-2">
                <p className="text-lg font-medium text-muted-foreground">No comparisons yet</p>
                <p className="text-sm text-muted-foreground">
                  Ask a question to compare responses from your selected agents
                </p>
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
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

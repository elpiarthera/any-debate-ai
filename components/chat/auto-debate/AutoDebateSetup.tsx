"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Play, GripVertical } from "lucide-react"
import type { AutoDebateConfig } from "@/lib/chat/modes"
import { cn } from "@/lib/utils"

interface AutoDebateSetupProps {
  availableAgents: Array<{ id: string; name: string }>
  onStart: (config: AutoDebateConfig) => void
}

export function AutoDebateSetup({ availableAgents, onStart }: AutoDebateSetupProps) {
  const [selectedAgents, setSelectedAgents] = useState<string[]>(availableAgents.map((a) => a.id))
  const [rounds, setRounds] = useState(3)
  const [initialPrompt, setInitialPrompt] = useState("")
  const [speakingOrder, setSpeakingOrder] = useState<string[]>(availableAgents.map((a) => a.id))

  const toggleAgent = (agentId: string) => {
    setSelectedAgents((prev) => (prev.includes(agentId) ? prev.filter((id) => id !== agentId) : [...prev, agentId]))
  }

  const handleStart = () => {
    if (selectedAgents.length < 2) {
      return
    }
    if (!initialPrompt.trim()) {
      return
    }

    const config: AutoDebateConfig = {
      agents: selectedAgents,
      rounds,
      initialPrompt: initialPrompt.trim(),
      speakingOrder: speakingOrder.filter((id) => selectedAgents.includes(id)),
      currentRound: 1,
      currentAgent: 0,
      status: "setup",
    }

    onStart(config)
  }

  const canStart = selectedAgents.length >= 2 && initialPrompt.trim().length > 0

  return (
    <div className="flex items-center justify-center min-h-full p-6">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-2xl">
        <Card className="p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Auto-Debate Setup</h2>
            <p className="text-muted-foreground">Configure your autonomous AI debate session</p>
          </div>

          {/* Agent Selection */}
          <div className="space-y-3">
            <Label>Select Agents (minimum 2)</Label>
            <div className="grid grid-cols-2 gap-2">
              {availableAgents.map((agent) => (
                <Button
                  key={agent.id}
                  variant={selectedAgents.includes(agent.id) ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => toggleAgent(agent.id)}
                >
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full mr-2",
                      selectedAgents.includes(agent.id) ? "bg-primary-foreground" : "bg-muted-foreground",
                    )}
                  />
                  {agent.name}
                </Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">{selectedAgents.length} agents selected</p>
          </div>

          {/* Number of Rounds */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Number of Rounds</Label>
              <Badge variant="secondary">{rounds} rounds</Badge>
            </div>
            <Slider value={[rounds]} onValueChange={([value]) => setRounds(value)} min={1} max={10} step={1} />
            <p className="text-xs text-muted-foreground">
              Each agent will speak {rounds} time{rounds > 1 ? "s" : ""} in order
            </p>
          </div>

          {/* Initial Prompt */}
          <div className="space-y-3">
            <Label>Initial Topic/Question</Label>
            <Textarea
              placeholder="What topic should the agents debate? E.g., 'What are the top 3 strategic priorities for Q1?'"
              value={initialPrompt}
              onChange={(e) => setInitialPrompt(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">This will be the starting point for the debate</p>
          </div>

          {/* Speaking Order */}
          {selectedAgents.length > 0 && (
            <div className="space-y-3">
              <Label>Speaking Order</Label>
              <div className="space-y-2">
                {speakingOrder
                  .filter((id) => selectedAgents.includes(id))
                  .map((agentId, index) => {
                    const agent = availableAgents.find((a) => a.id === agentId)
                    return (
                      <div
                        key={agentId}
                        className="flex items-center gap-3 p-3 rounded-lg border bg-muted/50 cursor-move"
                      >
                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                        <Badge variant="outline" className="w-8 justify-center">
                          {index + 1}
                        </Badge>
                        <span className="font-medium">{agent?.name}</span>
                      </div>
                    )
                  })}
              </div>
              <p className="text-xs text-muted-foreground">Drag to reorder (coming soon)</p>
            </div>
          )}

          {/* Start Button */}
          <Button onClick={handleStart} disabled={!canStart} size="lg" className="w-full">
            <Play className="h-4 w-4 mr-2" />
            Start Auto-Debate
          </Button>

          {!canStart && (
            <p className="text-xs text-destructive text-center">
              {selectedAgents.length < 2
                ? "Select at least 2 agents"
                : !initialPrompt.trim()
                  ? "Enter an initial topic/question"
                  : ""}
            </p>
          )}
        </Card>
      </motion.div>
    </div>
  )
}

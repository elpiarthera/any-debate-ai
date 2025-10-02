"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { AutoDebateConfig, AutoDebateMessage } from "@/lib/chat/modes"
import { AutoDebateSetup } from "./AutoDebateSetup"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Pause, Play, Square, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

interface AutoDebateModeProps {
  availableAgents: Array<{ id: string; name: string }>
  onSendMessage?: (agentId: string, content: string, round: number) => Promise<string>
}

export function AutoDebateMode({ availableAgents, onSendMessage }: AutoDebateModeProps) {
  const [config, setConfig] = useState<AutoDebateConfig | null>(null)
  const [messages, setMessages] = useState<AutoDebateMessage[]>([])
  const [status, setStatus] = useState<"setup" | "running" | "paused" | "completed">("setup")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleStart = (newConfig: AutoDebateConfig) => {
    setConfig({ ...newConfig, status: "running" })
    setStatus("running")
    runDebate({ ...newConfig, status: "running" })
  }

  const runDebate = async (debateConfig: AutoDebateConfig) => {
    const { agents, rounds, initialPrompt, speakingOrder } = debateConfig

    for (let round = 1; round <= rounds; round++) {
      if (status === "paused") break

      for (let agentIndex = 0; agentIndex < agents.length; agentIndex++) {
        if (status === "paused") break

        const agentId = speakingOrder?.[agentIndex] || agents[agentIndex]
        const agent = availableAgents.find((a) => a.id === agentId)

        if (!agent) continue

        // Simulate AI response
        const response = await onSendMessage?.(agentId, initialPrompt, round)

        const message: AutoDebateMessage = {
          id: `auto-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          content:
            response ||
            `This is a simulated response from ${agent.name} in round ${round}. In production, this will be replaced with actual AI responses.`,
          agentId,
          agentName: agent.name,
          round,
          position: agentIndex + 1,
          timestamp: new Date(),
          isStreaming: false,
        }

        setMessages((prev) => [...prev, message])

        // Wait before next agent
        await new Promise((resolve) => setTimeout(resolve, 1500))
      }
    }

    setStatus("completed")
  }

  const handlePause = () => {
    setStatus("paused")
    if (config) {
      setConfig({ ...config, status: "paused" })
    }
  }

  const handleResume = () => {
    setStatus("running")
    if (config) {
      setConfig({ ...config, status: "running" })
      runDebate({ ...config, status: "running" })
    }
  }

  const handleStop = () => {
    setStatus("completed")
    if (config) {
      setConfig({ ...config, status: "completed" })
    }
  }

  const handleReset = () => {
    setConfig(null)
    setMessages([])
    setStatus("setup")
  }

  const getProgress = () => {
    if (!config) return 0
    const totalMessages = config.agents.length * config.rounds
    return (messages.length / totalMessages) * 100
  }

  const getCurrentRound = () => {
    if (!config || messages.length === 0) return 1
    return messages[messages.length - 1].round
  }

  const getAvatarColor = (name: string) => {
    const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500", "bg-pink-500"]
    const index = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[index % colors.length]
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  if (status === "setup") {
    return <AutoDebateSetup availableAgents={availableAgents} onStart={handleStart} />
  }

  return (
    <div className="flex flex-col h-full">
      {/* Progress Header */}
      <div className="border-b p-4 space-y-3 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant={status === "running" ? "default" : status === "paused" ? "secondary" : "outline"}>
              {status === "running" ? "Running" : status === "paused" ? "Paused" : "Completed"}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Round {getCurrentRound()} of {config?.rounds}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {status === "running" && (
              <Button variant="outline" size="sm" onClick={handlePause}>
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
            )}
            {status === "paused" && (
              <Button variant="outline" size="sm" onClick={handleResume}>
                <Play className="h-4 w-4 mr-2" />
                Resume
              </Button>
            )}
            {status !== "completed" && (
              <Button variant="outline" size="sm" onClick={handleStop}>
                <Square className="h-4 w-4 mr-2" />
                Stop
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {messages.length} / {(config?.agents.length || 0) * (config?.rounds || 0)} messages
            </span>
            <span>{Math.round(getProgress())}%</span>
          </div>
          <Progress value={getProgress()} className="h-2" />
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-4 py-6" ref={scrollRef}>
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Initial Prompt */}
          {config && (
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-sm font-medium mb-1">Initial Topic:</p>
              <p className="leading-relaxed">{config.initialPrompt}</p>
            </div>
          )}

          {/* Messages grouped by round */}
          {config &&
            Array.from({ length: config.rounds }, (_, roundIndex) => {
              const roundNumber = roundIndex + 1
              const roundMessages = messages.filter((m) => m.round === roundNumber)

              if (roundMessages.length === 0 && roundNumber > getCurrentRound()) return null

              return (
                <div key={roundNumber} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-sm">
                      Round {roundNumber}
                    </Badge>
                    <div className="flex-1 h-px bg-border" />
                  </div>

                  <AnimatePresence>
                    {roundMessages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-3"
                      >
                        <Avatar className={cn("h-8 w-8 shrink-0", getAvatarColor(message.agentName))}>
                          <AvatarFallback className="text-white text-xs">{message.agentName.charAt(0)}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{message.agentName}</span>
                            <Badge variant="secondary" className="text-xs">
                              #{message.position}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
                          </div>

                          <div className="rounded-lg p-3 bg-muted prose prose-sm max-w-none">
                            <p className="m-0 leading-relaxed whitespace-pre-wrap">{message.content}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Loading indicator for current round */}
                  {status === "running" &&
                    roundNumber === getCurrentRound() &&
                    roundMessages.length < config.agents.length && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                        <div className="h-8 w-8 rounded-full bg-muted animate-pulse shrink-0" />
                        <div className="flex-1 bg-muted rounded-lg p-3">
                          <div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="w-2 h-2 bg-muted-foreground/50 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{
                                  duration: 1,
                                  repeat: Number.POSITIVE_INFINITY,
                                  delay: i * 0.2,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                </div>
              )
            })}

          {/* Completion message */}
          {status === "completed" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-lg bg-primary/10 border border-primary/20 text-center space-y-3"
            >
              <p className="text-lg font-semibold">Auto-Debate Completed!</p>
              <p className="text-sm text-muted-foreground">
                {messages.length} messages across {config?.rounds} rounds
              </p>
              <Button onClick={handleReset}>Start New Debate</Button>
            </motion.div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

"use client"

import { motion } from "framer-motion"
import type { CompareRound } from "@/lib/chat/modes"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Copy, ThumbsUp, ThumbsDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDevice } from "@/contexts/DeviceProvider"

interface CompareRoundViewProps {
  round: CompareRound
  roundNumber: number
  onCopyResponse?: (agentId: string, content: string) => void
  onReaction?: (agentId: string, reaction: "like" | "dislike") => void
}

export function CompareRoundView({ round, roundNumber, onCopyResponse, onReaction }: CompareRoundViewProps) {
  const { isMobile } = useDevice()

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="flex items-start gap-3">
        <Badge variant="secondary" className="shrink-0 mt-1">
          Round {roundNumber}
        </Badge>
        <Card className="flex-1 p-4 bg-primary/10 border-primary/20">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium">You</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground mb-1">{formatTime(round.timestamp)}</p>
              <p className="text-base leading-relaxed">{round.userPrompt}</p>
            </div>
          </div>
        </Card>
      </div>

      <div
        className={cn(
          "grid gap-4",
          isMobile
            ? "grid-cols-1"
            : round.responses.length === 2
              ? "grid-cols-2"
              : round.responses.length === 3
                ? "grid-cols-3"
                : "grid-cols-2 lg:grid-cols-4",
        )}
      >
        {round.responses.map((response) => (
          <Card
            key={response.agentId}
            className="flex flex-col h-full border-2 hover:border-primary/50 transition-colors"
          >
            <div className="p-3 border-b bg-muted/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xs font-medium">{response.agentName.charAt(0)}</span>
                </div>
                <span className="font-medium text-sm">{response.agentName}</span>
              </div>
              <span className="text-xs text-muted-foreground">{formatTime(response.timestamp)}</span>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {response.isStreaming ? (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="flex gap-1">
                      <motion.div
                        className="h-2 w-2 rounded-full bg-current"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                      />
                      <motion.div
                        className="h-2 w-2 rounded-full bg-current"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                      />
                      <motion.div
                        className="h-2 w-2 rounded-full bg-current"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                      />
                    </div>
                    <span className="text-sm">Thinking...</span>
                  </div>
                ) : (
                  <p className="leading-relaxed whitespace-pre-wrap">{response.content}</p>
                )}
              </div>
            </ScrollArea>

            {!response.isStreaming && response.content && (
              <div className="p-2 border-t bg-muted/30 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2"
                    onClick={() => onReaction?.(response.agentId, "like")}
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2"
                    onClick={() => onReaction?.(response.agentId, "dislike")}
                  >
                    <ThumbsDown className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2"
                  onClick={() => onCopyResponse?.(response.agentId, response.content)}
                >
                  <Copy className="h-3.5 w-3.5 mr-1" />
                  <span className="text-xs">Copy</span>
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </motion.div>
  )
}

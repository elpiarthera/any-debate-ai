"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { User, Bot, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDevice } from "@/contexts/DeviceProvider"
import type { ChatMessage } from "@/lib/chat/types"

interface MessageTimelineProps {
  sessionIds: string[]
  allMessages: ChatMessage[]
  getSessionColor: (index: number) => string
}

export function MessageTimeline({ sessionIds, allMessages, getSessionColor }: MessageTimelineProps) {
  const { isMobile } = useDevice()

  const timelineMessages = useMemo(() => {
    const messages = allMessages
      .filter((msg) => sessionIds.some((id) => msg.id.startsWith(id)))
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())

    return messages.map((msg) => {
      const sessionIndex = sessionIds.findIndex((id) => msg.id.startsWith(id))
      return { ...msg, sessionIndex }
    })
  }, [sessionIds, allMessages])

  const getSessionName = (sessionId: string) => {
    return `Session ${sessionId.slice(-4)}`
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Card>
      <CardContent className={cn("p-4", isMobile && "p-3")}>
        <ScrollArea className={cn(isMobile ? "h-[400px]" : "h-[500px]")}>
          <div className="space-y-3">
            {timelineMessages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.02 }}
                className="relative pl-8"
              >
                {/* Timeline Line */}
                {index < timelineMessages.length - 1 && (
                  <div className="absolute left-3 top-8 bottom-0 w-px bg-border" />
                )}

                {/* Timeline Dot */}
                <div
                  className={cn(
                    "absolute left-0 top-2 w-6 h-6 rounded-full border-2 border-background flex items-center justify-center",
                    getSessionColor(message.sessionIndex),
                  )}
                >
                  {message.sender.type === "user" ? (
                    <User className="h-3 w-3 text-white" />
                  ) : (
                    <Bot className="h-3 w-3 text-white" />
                  )}
                </div>

                {/* Message Content */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className={cn("text-xs", getSessionColor(message.sessionIndex))}>
                      {getSessionName(sessionIds[message.sessionIndex])}
                    </Badge>
                    <span className={cn("font-medium", isMobile ? "text-xs" : "text-sm")}>{message.sender.name}</span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {formatTime(message.timestamp)}
                    </div>
                  </div>

                  <div
                    className={cn(
                      "p-2 rounded-lg",
                      message.sender.type === "user" ? "bg-primary/10" : "bg-muted",
                      isMobile ? "text-xs" : "text-sm",
                    )}
                  >
                    <p className="line-clamp-2">{message.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

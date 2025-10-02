"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, MessageSquare, User, Bot, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDevice } from "@/contexts/DeviceProvider"
import { ThreadManager } from "@/lib/chat/threading"
import type { ChatMessage, ThreadedMessage } from "@/lib/chat/types"
import { ReplyInput } from "./ReplyInput"

interface ThreadViewProps {
  parentMessage: ChatMessage
  allMessages: ChatMessage[]
  onClose: () => void
  onReply: (content: string, parentMessageId: string) => void
}

export function ThreadView({ parentMessage, allMessages, onClose, onReply }: ThreadViewProps) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const { isMobile } = useDevice()

  const threadMessages = ThreadManager.getThreadHierarchy(parentMessage.id, allMessages)

  const getAvatarIcon = (type: string, name: string) => {
    if (type === "user") return <User className="h-4 w-4" />
    switch (name) {
      case "GPT-4":
        return "🤖"
      case "Claude-3.5":
        return "🧠"
      case "Llama-3":
        return "🦙"
      case "Gemini":
        return "💎"
      default:
        return <Bot className="h-4 w-4" />
    }
  }

  const getAvatarColor = (name: string) => {
    const colors = {
      "GPT-4": "bg-green-500",
      "Claude-3.5": "bg-orange-500",
      "Llama-3": "bg-blue-500",
      Gemini: "bg-purple-500",
      User: "bg-gray-500",
    }
    return colors[name as keyof typeof colors] || "bg-gray-500"
  }

  const getThreadDepth = (message: ThreadedMessage): number => {
    return ThreadManager.getThreadDepth(message, allMessages)
  }

  const canReply = (message: ThreadedMessage): boolean => {
    return ThreadManager.canReply(message, allMessages)
  }

  const handleReply = (content: string) => {
    if (replyingTo) {
      onReply(content, replyingTo)
      setReplyingTo(null)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Thread Header */}
      <div className={cn("border-b border-border p-4 shrink-0", isMobile && "p-3")}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h2 className={cn("font-semibold", isMobile ? "text-sm" : "text-base")}>Thread</h2>
            <Badge variant="secondary" className="text-xs">
              {threadMessages.length} {threadMessages.length === 1 ? "message" : "messages"}
            </Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className={cn(isMobile && "h-8 w-8 p-0")}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Thread Messages */}
      <ScrollArea className="flex-1">
        <div className={cn("p-4 space-y-4", isMobile && "p-3 pb-safe")}>
          <AnimatePresence>
            {threadMessages.map((message, index) => {
              const threadedMessage = message as ThreadedMessage
              const depth = getThreadDepth(threadedMessage)
              const isReplyable = canReply(threadedMessage)

              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn("relative", depth > 0 && !isMobile && `ml-${Math.min(depth * 8, 24)}`)}
                  style={isMobile ? {} : { marginLeft: `${Math.min(depth * 32, 96)}px` }}
                >
                  {/* Thread Connection Line */}
                  {depth > 0 && !isMobile && (
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-border" style={{ left: "-16px" }} />
                  )}

                  <div className="flex gap-3">
                    <Avatar
                      className={cn("shrink-0", isMobile ? "h-6 w-6" : "h-8 w-8", getAvatarColor(message.sender.name))}
                    >
                      <AvatarImage src={message.sender.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-white text-xs">
                        {getAvatarIcon(message.sender.type, message.sender.name)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn("font-medium", isMobile ? "text-xs" : "text-sm")}>
                          {message.sender.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        {depth > 0 && (
                          <Badge variant="outline" className="text-xs h-5">
                            Reply
                          </Badge>
                        )}
                      </div>

                      <div
                        className={cn(
                          "rounded-lg prose prose-sm max-w-none",
                          isMobile ? "p-2 text-sm" : "p-3",
                          message.sender.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                        )}
                      >
                        <p className="m-0 leading-relaxed">{message.content}</p>
                      </div>

                      {/* Reply Button */}
                      {isReplyable && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setReplyingTo(message.id)}
                          className={cn("mt-2 text-xs", isMobile ? "h-7 px-2" : "h-7 px-3")}
                        >
                          <ChevronRight className="h-3 w-3 mr-1" />
                          Reply
                        </Button>
                      )}

                      {!isReplyable && depth >= ThreadManager["MAX_THREAD_DEPTH"] && (
                        <p className="text-xs text-muted-foreground mt-2">Maximum thread depth reached</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </ScrollArea>

      {/* Reply Input */}
      {replyingTo && (
        <div className={cn("border-t border-border p-4 shrink-0", isMobile && "p-3")}>
          <ReplyInput
            parentMessage={allMessages.find((m) => m.id === replyingTo)!}
            onSubmit={handleReply}
            onCancel={() => setReplyingTo(null)}
          />
        </div>
      )}
    </div>
  )
}

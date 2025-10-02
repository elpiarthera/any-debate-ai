"use client"

import { useState, useRef, useEffect } from "motion"
import { motion, AnimatePresence } from "framer-motion"
import type { DebateMessage } from "@/lib/chat/modes"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Reply, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface DebateModeProps {
  activeAgents: Array<{ id: string; name: string }>
  onSendMessage?: (content: string, mentions?: string[], replyTo?: string) => Promise<void>
}

export function DebateMode({ activeAgents, onSendMessage }: DebateModeProps) {
  const [messages, setMessages] = useState<DebateMessage[]>([])
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleReply = (messageId: string) => {
    setReplyingTo(messageId)
  }

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content)
    toast.success("Message copied to clipboard")
  }

  const getReplyToMessage = (messageId: string) => {
    return messages.find((m) => m.id === messageId)
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

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 px-4 py-6" ref={scrollRef}>
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center py-12">
              <div className="space-y-2">
                <p className="text-lg font-medium text-muted-foreground">No messages yet</p>
                <p className="text-sm text-muted-foreground">
                  Start a debate by asking a question or @mentioning an agent
                </p>
              </div>
            </div>
          ) : (
            <AnimatePresence>
              {messages.map((message, index) => {
                const replyToMsg = message.replyTo ? getReplyToMessage(message.replyTo) : null

                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group"
                  >
                    {/* Reply context */}
                    {replyToMsg && (
                      <div className="ml-12 mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <Reply className="h-3 w-3" />
                        <span>
                          Replying to <span className="font-medium">{replyToMsg.sender.name}</span>
                        </span>
                      </div>
                    )}

                    {/* Message */}
                    <div className="flex gap-3">
                      <Avatar className={cn("h-8 w-8 shrink-0", getAvatarColor(message.sender.name))}>
                        <AvatarFallback className="text-white text-xs">
                          {message.sender.type === "user" ? (
                            <User className="h-4 w-4" />
                          ) : (
                            message.sender.name.charAt(0)
                          )}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{message.sender.name}</span>
                          <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
                          {message.mentions && message.mentions.length > 0 && (
                            <div className="flex items-center gap-1">
                              {message.mentions.map((mention) => (
                                <Badge key={mention} variant="secondary" className="text-xs px-1.5 py-0">
                                  @{mention}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>

                        <div
                          className={cn(
                            "rounded-lg p-3 prose prose-sm max-w-none",
                            message.sender.type === "user" ? "bg-primary/10 border border-primary/20" : "bg-muted",
                          )}
                        >
                          <p className="m-0 leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        </div>

                        {/* Message actions */}
                        <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs"
                            onClick={() => handleReply(message.id)}
                          >
                            <Reply className="h-3 w-3 mr-1" />
                            Reply
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs"
                            onClick={() => handleCopy(message.content)}
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            Copy
                          </Button>
                          {message.sender.type === "ai" && (
                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                              Ask {activeAgents.find((a) => a.id !== message.sender.id)?.name || "another agent"} about
                              this
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          )}
        </div>
      </ScrollArea>

      {/* Reply indicator */}
      {replyingTo && (
        <div className="px-4 py-2 bg-muted/50 border-t flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Reply className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              Replying to <span className="font-medium">{getReplyToMessage(replyingTo)?.sender.name}</span>
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setReplyingTo(null)}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Copy, ThumbsUp, ThumbsDown, MoreHorizontal, Bot, User, Sparkles, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDevice } from "@/contexts/DeviceProvider"
import { ExportButton } from "@/components/export/ExportButton"
import { MessageSearch } from "./search/MessageSearch"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import type { SearchQuery } from "@/lib/chat/types"

interface ChatMessage {
  id: string
  content: string
  sender: {
    id: string
    name: string
    type: "user" | "ai"
    avatar?: string
  }
  timestamp: Date
  isStreaming?: boolean
  reactions?: {
    likes: number
    dislikes: number
  }
}

interface ChatThreadProps {
  messages: ChatMessage[]
  isLoading?: boolean
  streamingMessageId?: string
  sessionData?: {
    id: string
    title: string
    timestamp: Date
    participants: string[]
  }
}

export function ChatThread({ messages, isLoading, streamingMessageId, sessionData }: ChatThreadProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({ text: "" })
  const [highlightedMessageId, setHighlightedMessageId] = useState<string | null>(null)
  const { isMobile, isTablet } = useDevice()

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const userMessages = messages.filter((m) => m.sender.type === "user")
  const aiModels = Array.from(new Set(messages.filter((m) => m.sender.type === "ai").map((m) => m.sender.name)))
  const messagesByModel = aiModels.reduce(
    (acc, modelName) => {
      acc[modelName] = messages.filter((m) => m.sender.name === modelName)
      return acc
    },
    {} as Record<string, ChatMessage[]>,
  )

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

  const handleJumpToMessage = (messageId: string) => {
    setHighlightedMessageId(messageId)
    setIsSearchOpen(false)

    setTimeout(() => {
      const messageElement = document.getElementById(`message-${messageId}`)
      if (messageElement) {
        messageElement.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }, 100)

    setTimeout(() => {
      setHighlightedMessageId(null)
    }, 3000)
  }

  const renderMessage = (message: ChatMessage, index: number, showAvatar = true) => (
    <motion.div
      key={message.id}
      id={`message-${message.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={cn("group relative", highlightedMessageId === message.id && "ring-2 ring-primary rounded-lg")}
      onMouseEnter={() => !isMobile && setHoveredMessageId(message.id)}
      onMouseLeave={() => setHoveredMessageId(null)}
      onClick={() => isMobile && setHoveredMessageId(hoveredMessageId === message.id ? null : message.id)}
    >
      <div className="flex gap-3">
        {/* Avatar */}
        {showAvatar && (
          <Avatar className={cn("shrink-0", isMobile ? "h-6 w-6" : "h-8 w-8", getAvatarColor(message.sender.name))}>
            <AvatarImage src={message.sender.avatar || "/placeholder.svg"} />
            <AvatarFallback className="text-white text-xs">
              {getAvatarIcon(message.sender.type, message.sender.name)}
            </AvatarFallback>
          </Avatar>
        )}

        {/* Message Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn("font-medium", isMobile ? "text-xs" : "text-sm")}>{message.sender.name}</span>
            <span className="text-xs text-muted-foreground">
              {message.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <div
            className={cn(
              "rounded-lg prose prose-sm max-w-none",
              isMobile ? "p-3 text-sm" : "p-3",
              message.sender.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
            )}
          >
            <p className="m-0 leading-relaxed">
              {message.content}
              {message.isStreaming && streamingMessageId === message.id && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                  className="inline-block w-2 h-4 bg-current ml-1"
                />
              )}
            </p>
          </div>

          {/* Message Actions */}
          <AnimatePresence>
            {hoveredMessageId === message.id && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={cn("flex items-center gap-1 mt-2", isMobile && "flex-wrap")}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn("text-xs hover:bg-muted", isMobile ? "h-8 px-2" : "h-7 px-2")}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>

                {message.sender.type === "ai" && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn("text-xs hover:bg-muted", isMobile ? "h-8 px-2" : "h-7 px-2")}
                    >
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      {message.reactions?.likes || 0}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn("text-xs hover:bg-muted", isMobile ? "h-8 px-2" : "h-7 px-2")}
                    >
                      <ThumbsDown className="h-3 w-3 mr-1" />
                      {message.reactions?.dislikes || 0}
                    </Button>
                  </>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  className={cn("hover:bg-muted", isMobile ? "h-8 w-8 p-0" : "h-7 w-7 p-0")}
                >
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="border-b border-border/50 p-4 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Sparkles className="h-5 w-5 text-primary" />
              </motion.div>
              <h1 className={cn("font-semibold", isMobile ? "text-base" : "text-lg")}>
                {isMobile ? "AI Debate" : "AI Debate Session"}
              </h1>
            </div>
            <Badge variant="secondary" className="text-xs">
              {messages.length} {isMobile ? "msgs" : "messages"}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            {messages.length > 0 && (
              <>
                <Button
                  variant="ghost"
                  size={isMobile ? "default" : "sm"}
                  onClick={() => setIsSearchOpen(true)}
                  className={cn(isMobile && "h-10 w-10 p-0")}
                >
                  <Search className="h-4 w-4" />
                  {!isMobile && <span className="ml-2">Search</span>}
                </Button>
                <ExportButton
                  sessionData={sessionData}
                  messages={messages}
                  variant="ghost"
                  size="sm"
                  showText={!isMobile}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className={cn("p-4", isMobile ? "pb-safe" : "")}>
            {isMobile ? (
              <div className="space-y-4">
                <AnimatePresence>{messages.map((message, index) => renderMessage(message, index))}</AnimatePresence>

                {/* Loading indicator */}
                {isLoading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                    <Avatar className="bg-muted h-6 w-6">
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg p-3">
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
            ) : (
              /* Desktop: Multi-column layout with one column per model */
              <div className="max-w-7xl mx-auto">
                {/* User messages at the top */}
                {userMessages.length > 0 && (
                  <div className="mb-6 space-y-4">
                    {userMessages.map((message, index) => (
                      <div key={message.id} className="max-w-2xl">
                        {renderMessage(message, index)}
                      </div>
                    ))}
                  </div>
                )}

                {/* AI model columns */}
                {aiModels.length > 0 && (
                  <div
                    className={cn(
                      "grid gap-6",
                      aiModels.length === 1 && "grid-cols-1 max-w-2xl",
                      aiModels.length === 2 && "grid-cols-2",
                      aiModels.length === 3 && "grid-cols-3",
                      aiModels.length === 4 && "grid-cols-4",
                    )}
                  >
                    {aiModels.map((modelName) => (
                      <div
                        key={modelName}
                        className="flex flex-col space-y-4 rounded-xl border-2 border-border bg-card p-4 shadow-sm"
                      >
                        {/* Column header */}
                        <div className="flex items-center gap-2 pb-3 border-b-2 border-border sticky top-0 bg-card backdrop-blur-sm z-10 -mx-4 px-4 -mt-4 pt-4 rounded-t-xl">
                          <Avatar className={cn("h-6 w-6", getAvatarColor(modelName))}>
                            <AvatarFallback className="text-white text-xs">
                              {getAvatarIcon("ai", modelName)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-semibold text-sm">{modelName}</span>
                        </div>

                        {/* Model messages */}
                        <div className="space-y-4">
                          {messagesByModel[modelName]?.map((message, index) => (
                            <div key={message.id}>{renderMessage(message, index, false)}</div>
                          ))}
                        </div>

                        {/* Loading indicator for this column */}
                        {isLoading && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                            <div className="bg-muted rounded-lg p-3 w-full">
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
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Search Modal */}
      <AdaptiveModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} title="Search Messages">
        <MessageSearch messages={messages} onResultClick={handleJumpToMessage} onClose={() => setIsSearchOpen(false)} />
      </AdaptiveModal>
    </div>
  )
}

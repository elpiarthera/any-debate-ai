"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"
import { MessageCard } from "../message-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, RefreshCw, Reply } from "lucide-react"
import type { ChatMessage } from "@/lib/chat/types"
import { toast } from "sonner"
import { ScrollArea } from "@/components/ui/scroll-area"

interface MessageListMobileProps {
  messages: ChatMessage[]
  onReply?: (messageId: string) => void
  onReaction?: (messageId: string, type: "like" | "dislike") => void
  onBookmark?: (messageId: string) => void
  onLoadMore?: () => void
  hasMore?: boolean
}

export function MessageListMobile({
  messages,
  onReply,
  onReaction,
  onBookmark,
  onLoadMore,
  hasMore = false,
}: MessageListMobileProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<"all" | "user" | "ai">("all")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [swipedMessageId, setSwipedMessageId] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const startY = useRef(0)

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch = msg.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === "all" || msg.sender.type === filterType
    return matchesSearch && matchesFilter
  })

  const handlePullToRefresh = useCallback(() => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      toast.success("Messages refreshed")
    }, 1000)
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.touches[0].clientY
    const diff = currentY - startY.current

    if (diff > 100 && scrollRef.current?.scrollTop === 0) {
      handlePullToRefresh()
    }
  }

  const handleSwipe = (messageId: string, info: PanInfo) => {
    if (info.offset.x > 100) {
      setSwipedMessageId(messageId)
      onReply?.(messageId)
      toast.success("Reply to message")
      setTimeout(() => setSwipedMessageId(null), 2000)
    }
  }

  const handleLongPress = (messageId: string) => {
    toast.success("Long press detected - showing reactions")
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 space-y-3 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Messages</h2>
          <Badge variant="secondary">{filteredMessages.length}</Badge>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10"
            />
          </div>
          <Button variant="outline" size="icon" className="h-10 w-10 shrink-0 bg-transparent">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            variant={filterType === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("all")}
            className="flex-1"
          >
            All
          </Button>
          <Button
            variant={filterType === "user" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("user")}
            className="flex-1"
          >
            User
          </Button>
          <Button
            variant={filterType === "ai" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("ai")}
            className="flex-1"
          >
            AI
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1" ref={scrollRef} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
        <div className="p-4 space-y-3">
          <AnimatePresence>
            {isRefreshing && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-center justify-center py-4"
              >
                <RefreshCw className="h-5 w-5 animate-spin text-primary" />
                <span className="ml-2 text-sm text-muted-foreground">Refreshing...</span>
              </motion.div>
            )}
          </AnimatePresence>

          {filteredMessages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => handleSwipe(message.id, info)}
              onContextMenu={(e) => {
                e.preventDefault()
                handleLongPress(message.id)
              }}
              className="relative"
            >
              {swipedMessageId === message.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-primary/10 rounded-lg flex items-center justify-start pl-4 z-0"
                >
                  <Reply className="h-5 w-5 text-primary" />
                </motion.div>
              )}
              <MessageCard
                message={message}
                onReply={onReply}
                onReaction={onReaction}
                onBookmark={onBookmark}
                compact
              />
            </motion.div>
          ))}

          {hasMore && (
            <Button variant="outline" onClick={onLoadMore} className="w-full bg-transparent">
              Load more messages
            </Button>
          )}

          {filteredMessages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground">No messages found</p>
              <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

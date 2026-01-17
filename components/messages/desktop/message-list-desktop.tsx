"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCard } from "../message-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Search, Filter, Bookmark, MessageSquare, ThumbsUp, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ChatMessage } from "@/lib/chat/types"
import { formatDateTime } from "@/lib/utils/date"
import { getReplies } from "@/lib/mock-data/messages"

interface MessageListDesktopProps {
  messages: ChatMessage[]
  onReply?: (messageId: string) => void
  onReaction?: (messageId: string, type: "like" | "dislike") => void
  onBookmark?: (messageId: string) => void
  onLoadMore?: () => void
  hasMore?: boolean
}

export function MessageListDesktop({
  messages,
  onReply,
  onReaction,
  onBookmark,
  onLoadMore,
  hasMore = false,
}: MessageListDesktopProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<"all" | "user" | "ai" | "bookmarked">("all")
  const [selectedMessage, setSelectedMessage] = useState<ChatMessage | null>(null)

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch = msg.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      filterType === "all" || (filterType === "bookmarked" && msg.bookmarked) || msg.sender.type === filterType
    return matchesSearch && matchesFilter
  })

  const bookmarkedCount = messages.filter((m) => m.bookmarked).length
  const threadMessages = selectedMessage ? getReplies(selectedMessage.id) : []

  return (
    <div className="flex h-full gap-4">
      <div className="flex-1 flex flex-col">
        <div className="p-6 space-y-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Messages</h2>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{filteredMessages.length} messages</Badge>
              <Badge variant="outline">
                <Bookmark className="h-3 w-3 mr-1" />
                {bookmarkedCount}
              </Badge>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant={filterType === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("all")}
            >
              All
            </Button>
            <Button
              variant={filterType === "user" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("user")}
            >
              User
            </Button>
            <Button variant={filterType === "ai" ? "default" : "outline"} size="sm" onClick={() => setFilterType("ai")}>
              AI
            </Button>
            <Button
              variant={filterType === "bookmarked" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("bookmarked")}
            >
              <Bookmark className="h-3.5 w-3.5 mr-1" />
              Bookmarked
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-6 space-y-3">
            <AnimatePresence>
              {filteredMessages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => setSelectedMessage(message)}
                  className={cn(
                    "cursor-pointer transition-all",
                    selectedMessage?.id === message.id && "ring-2 ring-primary rounded-lg",
                  )}
                >
                  <MessageCard message={message} onReply={onReply} onReaction={onReaction} onBookmark={onBookmark} />
                </motion.div>
              ))}
            </AnimatePresence>

            {hasMore && (
              <Button variant="outline" onClick={onLoadMore} className="w-full bg-transparent">
                Load more messages
              </Button>
            )}

            {filteredMessages.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-lg text-muted-foreground">No messages found</p>
                <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      <div className="w-96 border-l">
        <ScrollArea className="h-full">
          {selectedMessage ? (
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Message Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{formatDateTime(selectedMessage.timestamp.getTime())}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {selectedMessage.reactions?.likes || 0} likes, {selectedMessage.reactions?.dislikes || 0} dislikes
                    </span>
                  </div>
                  {selectedMessage.replyCount && selectedMessage.replyCount > 0 && (
                    <div className="flex items-center gap-2 text-sm">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{selectedMessage.replyCount} replies</span>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">Message Content</h4>
                <Card className="p-4">
                  <p className="text-sm leading-relaxed">{selectedMessage.content}</p>
                </Card>
              </div>

              {threadMessages.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-3">Thread ({threadMessages.length})</h4>
                    <div className="space-y-2">
                      {threadMessages.map((msg) => (
                        <Card key={msg.id} className="p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium">{msg.sender.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {formatDateTime(msg.timestamp.getTime())}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-3">{msg.content}</p>
                        </Card>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <Separator />

              <div className="space-y-2">
                <Button className="w-full" onClick={() => onReply?.(selectedMessage.id)}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Reply to message
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => onBookmark?.(selectedMessage.id)}
                >
                  <Bookmark className="h-4 w-4 mr-2" />
                  {selectedMessage.bookmarked ? "Remove bookmark" : "Bookmark message"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">Select a message to view details</p>
              <p className="text-sm text-muted-foreground mt-1">Click on any message to see more information</p>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  )
}

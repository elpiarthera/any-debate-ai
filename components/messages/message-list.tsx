"use client"

import { useState } from "react"
import { useDevice } from "@/contexts/DeviceProvider"
import { MessageListMobile } from "./mobile/message-list-mobile"
import { MessageListDesktop } from "./desktop/message-list-desktop"
import type { ChatMessage } from "@/lib/chat/types"
import { toast } from "sonner"

interface MessageListProps {
  initialMessages: ChatMessage[]
}

export function MessageList({ initialMessages }: MessageListProps) {
  const { isMobile } = useDevice()
  const [messages, setMessages] = useState(initialMessages)
  const [hasMore] = useState(true)

  const handleReply = (messageId: string) => {
    toast.success(`Replying to message ${messageId}`)
  }

  const handleReaction = (messageId: string, type: "like" | "dislike") => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          const reactions = msg.reactions || { likes: 0, dislikes: 0 }
          return {
            ...msg,
            reactions: {
              likes: type === "like" ? reactions.likes + 1 : reactions.likes,
              dislikes: type === "dislike" ? reactions.dislikes + 1 : reactions.dislikes,
            },
          }
        }
        return msg
      }),
    )
  }

  const handleBookmark = (messageId: string) => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, bookmarked: !msg.bookmarked } : msg)))
  }

  const handleLoadMore = () => {
    toast.success("Loading more messages...")
  }

  const sharedProps = {
    messages,
    onReply: handleReply,
    onReaction: handleReaction,
    onBookmark: handleBookmark,
    onLoadMore: handleLoadMore,
    hasMore,
  }

  return isMobile ? <MessageListMobile {...sharedProps} /> : <MessageListDesktop {...sharedProps} />
}

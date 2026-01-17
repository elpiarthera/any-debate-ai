"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Copy,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  MoreHorizontal,
  Bot,
  User,
  Reply,
  Bookmark,
  BookmarkCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { formatRelativeTime } from "@/lib/utils/date"
import type { ChatMessage } from "@/lib/chat/types"
import { toast } from "sonner"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface MessageCardProps {
  message: ChatMessage
  onReply?: (messageId: string) => void
  onReaction?: (messageId: string, type: "like" | "dislike") => void
  onBookmark?: (messageId: string) => void
  showThread?: boolean
  compact?: boolean
  className?: string
}

export function MessageCard({
  message,
  onReply,
  onReaction,
  onBookmark,
  showThread = true,
  compact = false,
  className,
}: MessageCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(message.bookmarked || false)
  const [likes, setLikes] = useState(message.reactions?.likes || 0)
  const [dislikes, setDislikes] = useState(message.reactions?.dislikes || 0)
  const [hasLiked, setHasLiked] = useState(false)
  const [hasDisliked, setHasDisliked] = useState(false)

  const getAvatarIcon = () => {
    if (message.sender.type === "user") return <User className="h-4 w-4" />
    return <Bot className="h-4 w-4" />
  }

  const getAvatarColor = () => {
    const colors: Record<string, string> = {
      "GPT-4": "bg-green-500",
      "Claude-3.5": "bg-orange-500",
      "Llama-3": "bg-blue-500",
      Gemini: "bg-purple-500",
      You: "bg-gray-500",
    }
    return colors[message.sender.name] || "bg-gray-500"
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    toast.success("Message copied to clipboard")
  }

  const handleLike = () => {
    if (hasLiked) {
      setLikes(likes - 1)
      setHasLiked(false)
    } else {
      setLikes(likes + 1)
      setHasLiked(true)
      if (hasDisliked) {
        setDislikes(dislikes - 1)
        setHasDisliked(false)
      }
    }
    onReaction?.(message.id, "like")
  }

  const handleDislike = () => {
    if (hasDisliked) {
      setDislikes(dislikes - 1)
      setHasDisliked(false)
    } else {
      setDislikes(dislikes + 1)
      setHasDisliked(true)
      if (hasLiked) {
        setLikes(likes - 1)
        setHasLiked(false)
      }
    }
    onReaction?.(message.id, "dislike")
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    onBookmark?.(message.id)
    toast.success(isBookmarked ? "Bookmark removed" : "Message bookmarked")
  }

  return (
    <Card
      className={cn(
        "p-4 hover:shadow-md transition-shadow",
        compact && "p-3",
        message.sender.type === "user" && "bg-primary/5",
        className,
      )}
    >
      <div className="flex gap-3">
        <Avatar className={cn("shrink-0", compact ? "h-8 w-8" : "h-10 w-10", getAvatarColor())}>
          <AvatarImage src={message.sender.avatar || "/placeholder.svg"} />
          <AvatarFallback className="text-white">{getAvatarIcon()}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className={cn("font-medium", compact ? "text-sm" : "text-base")}>{message.sender.name}</span>
              {message.sender.type === "ai" && (
                <Badge variant="secondary" className="text-xs">
                  AI
                </Badge>
              )}
            </div>
            <span className="text-xs text-muted-foreground">{formatRelativeTime(message.timestamp.getTime())}</span>
          </div>

          <p className={cn("text-foreground leading-relaxed mb-3", compact ? "text-sm" : "text-base")}>
            {message.content}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {message.sender.type === "ai" && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLike}
                    className={cn("h-8 px-2", hasLiked && "text-primary")}
                  >
                    <ThumbsUp className={cn("h-3.5 w-3.5 mr-1", hasLiked && "fill-primary")} />
                    <span className="text-xs">{likes}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDislike}
                    className={cn("h-8 px-2", hasDisliked && "text-destructive")}
                  >
                    <ThumbsDown className={cn("h-3.5 w-3.5 mr-1", hasDisliked && "fill-destructive")} />
                    <span className="text-xs">{dislikes}</span>
                  </Button>
                </>
              )}

              {showThread && message.replyCount && message.replyCount > 0 && (
                <Button variant="ghost" size="sm" onClick={() => onReply?.(message.id)} className="h-8 px-2">
                  <MessageSquare className="h-3.5 w-3.5 mr-1" />
                  <span className="text-xs">{message.replyCount}</span>
                </Button>
              )}

              <Button variant="ghost" size="sm" onClick={() => onReply?.(message.id)} className="h-8 px-2">
                <Reply className="h-3.5 w-3.5 mr-1" />
                <span className="text-xs">Reply</span>
              </Button>
            </div>

            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={handleBookmark} className="h-8 w-8 p-0">
                {isBookmarked ? (
                  <BookmarkCheck className="h-4 w-4 text-primary fill-primary" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleCopy}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy message
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onReply?.(message.id)}>
                    <Reply className="h-4 w-4 mr-2" />
                    Reply
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleBookmark}>
                    <Bookmark className="h-4 w-4 mr-2" />
                    {isBookmarked ? "Remove bookmark" : "Bookmark"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {message.parentMessageId && showThread && (
            <div className="mt-2 pt-2 border-t">
              <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground">
                <MessageSquare className="h-3 w-3 mr-1" />
                View thread
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

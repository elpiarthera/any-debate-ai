"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Send, X, User, Bot } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDevice } from "@/contexts/DeviceProvider"
import type { ChatMessage } from "@/lib/chat/types"

interface ReplyInputProps {
  parentMessage: ChatMessage
  onSubmit: (content: string) => void
  onCancel: () => void
}

export function ReplyInput({ parentMessage, onSubmit, onCancel }: ReplyInputProps) {
  const [content, setContent] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { isMobile } = useDevice()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim()) {
      onSubmit(content.trim())
      setContent("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const getAvatarIcon = (type: string, name: string) => {
    if (type === "user") return <User className="h-3 w-3" />
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
        return <Bot className="h-3 w-3" />
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
      {/* Parent Message Context */}
      <div
        className={cn("flex items-start gap-2 p-3 bg-muted/50 rounded-lg border-l-2 border-primary", isMobile && "p-2")}
      >
        <Avatar className={cn("shrink-0", isMobile ? "h-5 w-5" : "h-6 w-6")}>
          <AvatarFallback className="text-xs">
            {getAvatarIcon(parentMessage.sender.type, parentMessage.sender.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn("font-medium", isMobile ? "text-xs" : "text-sm")}>{parentMessage.sender.name}</span>
            <span className="text-xs text-muted-foreground">Replying to</span>
          </div>
          <p className={cn("text-muted-foreground line-clamp-2", isMobile ? "text-xs" : "text-sm")}>
            {parentMessage.content}
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={onCancel} className={cn(isMobile ? "h-6 w-6 p-0" : "h-6 w-6 p-0")}>
          <X className="h-3 w-3" />
        </Button>
      </div>

      {/* Reply Input */}
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write a reply..."
          className={cn(
            "flex-1 min-h-[44px] max-h-32 resize-none",
            "bg-background border border-border rounded-lg",
            "focus:outline-none focus:ring-2 focus:ring-ring/20",
            "transition-colors placeholder:text-muted-foreground",
            isMobile ? "px-3 py-2 text-sm" : "px-4 py-3",
          )}
          rows={1}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement
            target.style.height = "auto"
            target.style.height = `${Math.min(target.scrollHeight, 128)}px`
          }}
        />
        <Button type="submit" disabled={!content.trim()} className={cn(isMobile ? "h-10 px-3" : "h-11 px-4")}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </motion.div>
  )
}

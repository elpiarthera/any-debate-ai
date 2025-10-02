"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, AtSign, Bot } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDevice } from "@/contexts/DeviceProvider"

interface Agent {
  id: string
  name: string
  type: string
  avatar?: string
}

interface MentionInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  agents: Agent[]
  placeholder?: string
  disabled?: boolean
}

export function MentionInput({
  value,
  onChange,
  onSubmit,
  agents,
  placeholder = "Type @ to mention an agent...",
  disabled = false,
}: MentionInputProps) {
  const [showMentions, setShowMentions] = useState(false)
  const [mentionQuery, setMentionQuery] = useState("")
  const [mentionPosition, setMentionPosition] = useState(0)
  const [selectedMentionIndex, setSelectedMentionIndex] = useState(0)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { isMobile, isTablet } = useDevice()

  const filteredAgents = agents.filter((agent) => agent.name.toLowerCase().includes(mentionQuery.toLowerCase()))

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showMentions) return

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setSelectedMentionIndex((prev) => (prev < filteredAgents.length - 1 ? prev + 1 : 0))
          break
        case "ArrowUp":
          e.preventDefault()
          setSelectedMentionIndex((prev) => (prev > 0 ? prev - 1 : filteredAgents.length - 1))
          break
        case "Enter":
        case "Tab":
          e.preventDefault()
          if (filteredAgents[selectedMentionIndex]) {
            insertMention(filteredAgents[selectedMentionIndex])
          }
          break
        case "Escape":
          setShowMentions(false)
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [showMentions, filteredAgents, selectedMentionIndex])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    const cursorPosition = e.target.selectionStart

    onChange(newValue)

    // Check for @ mentions
    const textBeforeCursor = newValue.slice(0, cursorPosition)
    const mentionMatch = textBeforeCursor.match(/@(\w*)$/)

    if (mentionMatch) {
      setShowMentions(true)
      setMentionQuery(mentionMatch[1])
      setMentionPosition(cursorPosition - mentionMatch[0].length)
      setSelectedMentionIndex(0)
    } else {
      setShowMentions(false)
    }
  }

  const insertMention = (agent: Agent) => {
    const beforeMention = value.slice(0, mentionPosition)
    const afterMention = value.slice(inputRef.current?.selectionStart || 0)
    const newValue = `${beforeMention}@${agent.name} ${afterMention}`

    onChange(newValue)
    setShowMentions(false)

    // Focus back to input
    setTimeout(() => {
      if (inputRef.current) {
        const newCursorPosition = mentionPosition + agent.name.length + 2
        inputRef.current.focus()
        inputRef.current.setSelectionRange(newCursorPosition, newCursorPosition)
      }
    }, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim() && !disabled) {
      onSubmit()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !showMentions) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const getAvatarIcon = (type: string, name: string) => {
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

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className={cn("flex items-end", isMobile ? "gap-2" : "gap-3")}>
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={isMobile ? "Type @ to mention..." : placeholder}
            disabled={disabled}
            className={cn(
              "w-full min-h-[44px] max-h-32 resize-none",
              "bg-background/50 border border-border/50 focus:border-primary/50",
              "transition-colors placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring/20",
              isMobile ? "px-3 py-2 pr-10 rounded-md text-sm" : "px-4 py-3 pr-12 rounded-lg",
              disabled && "opacity-50 cursor-not-allowed",
            )}
            rows={1}
            style={{
              height: "auto",
              minHeight: isMobile ? "40px" : "44px",
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement
              target.style.height = "auto"
              target.style.height = `${Math.min(target.scrollHeight, 128)}px`
            }}
          />

          <div className={cn("absolute flex items-center gap-1", isMobile ? "right-2 bottom-2" : "right-3 bottom-3")}>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={cn("text-muted-foreground hover:text-foreground", isMobile ? "h-5 w-5 p-0" : "h-6 w-6 p-0")}
              onClick={() => {
                if (inputRef.current) {
                  const cursorPosition = inputRef.current.selectionStart
                  const newValue = value.slice(0, cursorPosition) + "@" + value.slice(cursorPosition)
                  onChange(newValue)
                  setTimeout(() => {
                    if (inputRef.current) {
                      inputRef.current.focus()
                      inputRef.current.setSelectionRange(cursorPosition + 1, cursorPosition + 1)
                    }
                  }, 0)
                }
              }}
            >
              <AtSign className={cn(isMobile ? "h-3 w-3" : "h-3 w-3")} />
            </Button>
          </div>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            type="submit"
            disabled={!value.trim() || disabled}
            className={cn("bg-primary hover:bg-primary/90", isMobile ? "h-10 px-3" : "h-11 px-4")}
          >
            <Send className="h-4 w-4" />
          </Button>
        </motion.div>
      </form>

      {/* Mention Dropdown */}
      <AnimatePresence>
        {showMentions && filteredAgents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className={cn(
              "absolute bottom-full mb-2 bg-popover border border-border rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto",
              isMobile ? "left-0 right-0" : "left-0 right-0",
            )}
          >
            <div className="p-2">
              <div className="text-xs text-muted-foreground px-2 py-1 mb-1">Mention an agent</div>
              {filteredAgents.map((agent, index) => (
                <motion.button
                  key={agent.id}
                  type="button"
                  className={cn(
                    "w-full flex items-center gap-3 text-left transition-colors rounded-md",
                    "hover:bg-accent hover:text-accent-foreground",
                    isMobile ? "px-2 py-2" : "px-3 py-2",
                    index === selectedMentionIndex && "bg-accent text-accent-foreground",
                  )}
                  onClick={() => insertMention(agent)}
                  whileHover={{ x: 2 }}
                >
                  <Avatar className={cn(isMobile ? "h-5 w-5" : "h-6 w-6")}>
                    <AvatarFallback className="text-xs">{getAvatarIcon(agent.type, agent.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className={cn("font-medium", isMobile ? "text-xs" : "text-sm")}>{agent.name}</div>
                    <div className="text-xs text-muted-foreground">{agent.type}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Send, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDevice } from "@/contexts/DeviceProvider"

interface ComparePromptInputProps {
  onSubmit: (prompt: string) => Promise<void>
  disabled?: boolean
  isLoading?: boolean
  placeholder?: string
  maxLength?: number
}

export function ComparePromptInput({
  onSubmit,
  disabled = false,
  isLoading = false,
  placeholder = "Ask a question to compare responses...",
  maxLength = 2000,
}: ComparePromptInputProps) {
  const [prompt, setPrompt] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { isMobile } = useDevice()

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [prompt])

  // Auto-focus on desktop
  useEffect(() => {
    if (!isMobile && textareaRef.current && !disabled) {
      textareaRef.current.focus()
    }
  }, [isMobile, disabled])

  // Keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isMobile) return // Skip on mobile to allow new lines

    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    if (!prompt.trim() || disabled || isLoading) return

    const currentPrompt = prompt
    setPrompt("") // Optimistic clear

    // Reset height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }

    try {
      await onSubmit(currentPrompt)
    } catch (error) {
      // Restore prompt on error
      setPrompt(currentPrompt)
      console.error("Failed to submit prompt:", error)
    }
  }

  const handleClear = () => {
    setPrompt("")
    if (textareaRef.current) {
      textareaRef.current.focus()
      textareaRef.current.style.height = "auto"
    }
  }

  return (
    <div
      className={cn(
        "relative w-full transition-all duration-200",
        isFocused ? "ring-2 ring-primary/20 rounded-lg" : "",
      )}
    >
      <div className="relative flex items-end gap-2 bg-background border rounded-lg p-2 shadow-sm">
        <Textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled || isLoading}
          maxLength={maxLength}
          className={cn(
            "min-h-[48px] max-h-[200px] resize-none border-0 focus-visible:ring-0 p-2 bg-transparent",
            "text-base leading-relaxed placeholder:text-muted-foreground/70",
            disabled && "opacity-50 cursor-not-allowed",
          )}
          rows={1}
        />

        <div className="flex items-center gap-2 pb-1">
          {prompt && !isLoading && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-full"
              aria-label="Clear prompt"
            >
              <X className="h-4 w-4" />
            </Button>
          )}

          <Button
            onClick={handleSubmit}
            disabled={!prompt.trim() || disabled || isLoading}
            size="icon"
            className={cn(
              "h-10 w-10 rounded-lg transition-all duration-200 shrink-0",
              prompt.trim() && !disabled && !isLoading
                ? "bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:scale-105"
                : "bg-muted text-muted-foreground",
            )}
            aria-label="Send prompt"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5 ml-0.5" />}
          </Button>
        </div>
      </div>

      {/* Character count and shortcut hint */}
      <div className="flex justify-between items-center px-1 mt-1.5 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          {!isMobile && (
            <span className="hidden sm:inline-block opacity-70">
              Press <kbd className="px-1 py-0.5 bg-muted border rounded text-[10px] font-mono">Cmd</kbd> +{" "}
              <kbd className="px-1 py-0.5 bg-muted border rounded text-[10px] font-mono">Enter</kbd> to send
            </span>
          )}
        </div>
        <span
          className={cn(
            "transition-colors duration-200",
            prompt.length > maxLength * 0.9 ? "text-destructive font-medium" : "opacity-70",
          )}
        >
          {prompt.length} / {maxLength}
        </span>
      </div>
    </div>
  )
}

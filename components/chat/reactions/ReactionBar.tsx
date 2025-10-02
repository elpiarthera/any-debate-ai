"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDevice } from "@/contexts/DeviceProvider"
import type { MessageReactions } from "@/lib/chat/reactions"
import { ReactionManager } from "@/lib/chat/reactions"

interface ReactionBarProps {
  messageId: string
  userId: string
  reactions: MessageReactions
  onReact: (emoji: string) => void
  onShowPicker: () => void
  className?: string
}

export function ReactionBar({ messageId, userId, reactions, onReact, onShowPicker, className }: ReactionBarProps) {
  const { isMobile } = useDevice()

  const handleReactionClick = (emoji: string) => {
    const hasReacted = ReactionManager.hasUserReacted(messageId, emoji, userId)
    onReact(emoji)
  }

  if (reactions.reactions.length === 0) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={onShowPicker}
        className={cn("h-6 px-2 text-xs text-muted-foreground", className)}
      >
        <Plus className="h-3 w-3 mr-1" />
        Add reaction
      </Button>
    )
  }

  return (
    <div className={cn("flex items-center gap-1 flex-wrap", className)}>
      <AnimatePresence>
        {reactions.reactions.map((reaction) => {
          const hasReacted = reaction.users.includes(userId)

          return (
            <TooltipProvider key={reaction.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleReactionClick(reaction.emoji)}
                    className={cn(
                      "inline-flex items-center gap-1 px-2 py-1 rounded-full",
                      "border border-border transition-all",
                      "hover:border-primary/50 hover:bg-primary/5",
                      hasReacted && "bg-primary/10 border-primary/30 ring-1 ring-primary/20",
                      isMobile ? "text-xs" : "text-sm",
                    )}
                  >
                    <span>{reaction.emoji}</span>
                    <span className={cn("font-medium", hasReacted && "text-primary")}>{reaction.count}</span>
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs">
                  <div className="space-y-1">
                    <p className="font-medium">{reaction.label}</p>
                    <p className="text-muted-foreground">
                      {reaction.users.length} {reaction.users.length === 1 ? "person" : "people"}
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        })}
      </AnimatePresence>

      <Button
        variant="ghost"
        size="sm"
        onClick={onShowPicker}
        className={cn("h-6 w-6 p-0 rounded-full", isMobile && "h-7 w-7")}
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  )
}

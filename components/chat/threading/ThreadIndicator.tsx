"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDevice } from "@/contexts/DeviceProvider"
import type { MessageThread } from "@/lib/chat/threading"
import { ThreadManager } from "@/lib/chat/threading"

interface ThreadIndicatorProps {
  thread: MessageThread
  isExpanded: boolean
  onToggle: () => void
  onClick: () => void
}

export function ThreadIndicator({ thread, isExpanded, onToggle, onClick }: ThreadIndicatorProps) {
  const { isMobile } = useDevice()
  const stats = ThreadManager.getThreadStats(thread)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex items-center gap-3 p-3 bg-muted/50 border border-border rounded-lg cursor-pointer",
        "hover:bg-muted transition-colors",
        isMobile && "active:scale-98",
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <MessageSquare className="h-4 w-4 text-primary shrink-0" />

        <div className="flex items-center gap-1 flex-1 min-w-0">
          <span className={cn("font-medium", isMobile ? "text-xs" : "text-sm")}>
            {stats.replyCount} {stats.replyCount === 1 ? "reply" : "replies"}
          </span>

          {!isMobile && (
            <>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{stats.participantCount} participants</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{stats.lastReplyTime}</span>
            </>
          )}
        </div>

        {/* Participant Avatars */}
        <div className="flex -space-x-2">
          {thread.participants.slice(0, isMobile ? 2 : 3).map((participantId, index) => (
            <Avatar key={index} className={cn("border-2 border-background", isMobile ? "h-5 w-5" : "h-6 w-6")}>
              <AvatarFallback className="text-xs bg-primary/10">{index + 1}</AvatarFallback>
            </Avatar>
          ))}
          {thread.participants.length > (isMobile ? 2 : 3) && (
            <Badge variant="secondary" className={cn("text-xs", isMobile ? "h-5 px-1" : "h-6 px-2")}>
              +{thread.participants.length - (isMobile ? 2 : 3)}
            </Badge>
          )}
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation()
          onToggle()
        }}
        className={cn(isMobile ? "h-7 w-7 p-0" : "h-7 w-7 p-0")}
      >
        {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </Button>
    </motion.div>
  )
}

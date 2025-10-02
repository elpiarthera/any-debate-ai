"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Bookmark, BookmarkCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { BookmarkManager } from "@/lib/chat/bookmarks"
import { toast } from "sonner"

interface BookmarkButtonProps {
  messageId: string
  sessionId: string
  onBookmarkChange?: (isBookmarked: boolean) => void
  className?: string
}

export function BookmarkButton({ messageId, sessionId, onBookmarkChange, className }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(() => BookmarkManager.isBookmarked(messageId))

  const handleToggle = () => {
    if (isBookmarked) {
      const bookmark = BookmarkManager.getBookmarkByMessageId(messageId)
      if (bookmark) {
        BookmarkManager.deleteBookmark(bookmark.id)
        setIsBookmarked(false)
        onBookmarkChange?.(false)
        toast.success("Bookmark removed")
      }
    } else {
      BookmarkManager.createBookmark(messageId, sessionId)
      setIsBookmarked(true)
      onBookmarkChange?.(true)
      toast.success("Message bookmarked")
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleToggle} className={cn("h-7 w-7 p-0", className)}>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        {isBookmarked ? (
          <BookmarkCheck className="h-4 w-4 text-primary fill-primary" />
        ) : (
          <Bookmark className="h-4 w-4" />
        )}
      </motion.div>
    </Button>
  )
}

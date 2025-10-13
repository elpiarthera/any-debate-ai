"use client"

import { FileText, LinkIcon, File, Clock, Tag } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Memory } from "../memory-dashboard"

interface MemoryCardMobileProps {
  memory: Memory
}

const scopeColors = {
  organization: "bg-purple-500/10 text-purple-500",
  workspace: "bg-blue-500/10 text-blue-500",
  user: "bg-green-500/10 text-green-500",
  chat: "bg-orange-500/10 text-orange-500",
}

const sourceIcons = {
  manual: FileText,
  document: File,
  url: LinkIcon,
}

export function MemoryCardMobile({ memory }: MemoryCardMobileProps) {
  const SourceIcon = sourceIcons[memory.source]
  const timeAgo = getTimeAgo(memory.createdAt)

  return (
    <Card className="min-h-[80px] p-4 active:scale-[0.98] transition-transform cursor-pointer">
      <div className="space-y-2">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm line-clamp-1">{memory.title}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{memory.content}</p>
          </div>
          <SourceIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className={`text-xs ${scopeColors[memory.scope]}`}>
              {memory.scope}
            </Badge>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {timeAgo}
            </span>
          </div>
          <span className="flex items-center gap-1">
            <Tag className="h-3 w-3" />
            {memory.usageCount}
          </span>
        </div>
      </div>
    </Card>
  )
}

function getTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000)
  if (seconds < 60) return "just now"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

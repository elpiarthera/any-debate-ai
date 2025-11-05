"use client"

import { FileText, LinkIcon, File, Clock, Tag, MoreVertical } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Memory } from "../memory-dashboard"

interface MemoryCardMobileProps {
  memory: Memory
  onEdit?: (memory: Memory) => void
  onDelete?: (memoryId: string) => void
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

export function MemoryCardMobile({ memory, onEdit, onDelete }: MemoryCardMobileProps) {
  const SourceIcon = sourceIcons[memory.source]
  const timeAgo = getTimeAgo(memory.createdAt)

  return (
    <Card className="min-h-[80px] p-4">
      <div className="space-y-2">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm line-clamp-1">{memory.title}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{memory.content}</p>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <SourceIcon className="h-4 w-4 text-muted-foreground" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit?.(memory)}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete?.(memory.id)} className="text-destructive">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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

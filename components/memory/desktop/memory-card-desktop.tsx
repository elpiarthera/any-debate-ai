"use client"

import { FileText, LinkIcon, File, Clock, Tag, MoreVertical } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Memory } from "../memory-dashboard"

interface MemoryCardDesktopProps {
  memory: Memory
  onEdit?: (memory: Memory) => void
  onDelete?: (memoryId: string) => void
}

const scopeColors = {
  organization: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  workspace: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  user: "bg-green-500/10 text-green-500 border-green-500/20",
  chat: "bg-orange-500/10 text-orange-500 border-orange-500/20",
}

const sourceIcons = {
  manual: FileText,
  document: File,
  url: LinkIcon,
}

export function MemoryCardDesktop({ memory, onEdit, onDelete }: MemoryCardDesktopProps) {
  const SourceIcon = sourceIcons[memory.source]
  const timeAgo = getTimeAgo(memory.createdAt)

  return (
    <Card className="p-5 hover:shadow-lg transition-all group">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="p-2 rounded-lg bg-muted">
              <SourceIcon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base line-clamp-1">{memory.title}</h3>
              <Badge variant="secondary" className={`text-xs mt-1 ${scopeColors[memory.scope]}`}>
                {memory.scope}
              </Badge>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity min-h-[44px] min-w-[44px]"
              >
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

        {/* Content */}
        <p className="text-sm text-muted-foreground line-clamp-3">{memory.content}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {memory.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {memory.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{memory.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {timeAgo}
          </span>
          <span className="flex items-center gap-1">
            <Tag className="h-3 w-3" />
            {memory.usageCount} uses
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

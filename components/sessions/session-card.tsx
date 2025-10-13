"use client"

import type React from "react"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MessageSquare, Users, FileText, MoreVertical, Archive, Trash2, Copy, Share2 } from "lucide-react"
import { formatRelativeTime } from "@/lib/utils/date"
import type { Session } from "@/lib/mock-data/sessions"
import { cn } from "@/lib/utils"

interface SessionCardProps {
  session: Session
  onResume?: (id: string) => void
  onArchive?: (id: string) => void
  onDelete?: (id: string) => void
  compact?: boolean
}

export function SessionCard({ session, onResume, onArchive, onDelete, compact = false }: SessionCardProps) {
  const isActive = session.status === "active"

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation()
    console.log("[v0] Duplicate session:", session.id)
  }

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    console.log("[v0] Share session:", session.id)
  }

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-md",
        compact ? "min-h-[80px]" : "min-h-[120px]",
        "active:scale-[0.98]",
      )}
      onClick={() => onResume?.(session.id)}
    >
      <CardHeader>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleDuplicate}>
                <Copy className="h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleShare}>
                <Share2 className="h-4 w-4" />
                Share
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation()
                  onArchive?.(session.id)
                }}
              >
                <Archive className="h-4 w-4" />
                {isActive ? "Archive" : "Restore"}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete?.(session.id)
                }}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>

        <div className="flex items-center gap-2">
          <CardTitle className="text-base md:text-lg line-clamp-1">{session.title}</CardTitle>
          <Badge variant={isActive ? "default" : "secondary"} className="shrink-0">
            {session.status}
          </Badge>
        </div>

        <CardDescription className="line-clamp-2">{session.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MessageSquare className="h-4 w-4" />
            <span>{session.metadata.messageCount}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            <span>{session.metadata.agentCount}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <FileText className="h-4 w-4" />
            <span>{session.metadata.artifactCount}</span>
          </div>

          <div className="ml-auto text-xs">{formatRelativeTime(session.metadata.lastActivity)}</div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {session.config.mode}
          </Badge>
          {session.config.debateRounds && (
            <Badge variant="outline" className="text-xs">
              {session.config.debateRounds} rounds
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

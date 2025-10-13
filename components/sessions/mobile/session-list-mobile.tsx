"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, RefreshCw } from "lucide-react"
import { SessionCard } from "../session-card"
import type { Session } from "@/lib/mock-data/sessions"
import { cn } from "@/lib/utils"

interface SessionListMobileProps {
  sessions: Session[]
  onResume?: (id: string) => void
  onArchive?: (id: string) => void
  onDelete?: (id: string) => void
  onCreateNew?: () => void
}

export function SessionListMobile({ sessions, onResume, onArchive, onDelete, onCreateNew }: SessionListMobileProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "archived">("all")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [displayedSessions, setDisplayedSessions] = useState(20)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = activeFilter === "all" || session.status === activeFilter
    return matchesSearch && matchesFilter
  })

  const visibleSessions = filteredSessions.slice(0, displayedSessions)
  const hasMore = displayedSessions < filteredSessions.length

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const handleScroll = () => {
    if (!scrollContainerRef.current || !hasMore) return

    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current
    if (scrollHeight - scrollTop - clientHeight < 200) {
      setDisplayedSessions((prev) => Math.min(prev + 20, filteredSessions.length))
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [hasMore, filteredSessions.length])

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-10 bg-background border-b p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search sessions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 min-h-[48px]"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="min-h-[48px] min-w-[48px] shrink-0 bg-transparent"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          <Badge
            variant={activeFilter === "all" ? "default" : "outline"}
            className={cn("cursor-pointer min-h-[32px] px-4 shrink-0", "active:scale-95 transition-transform")}
            onClick={() => setActiveFilter("all")}
          >
            All ({sessions.length})
          </Badge>
          <Badge
            variant={activeFilter === "active" ? "default" : "outline"}
            className={cn("cursor-pointer min-h-[32px] px-4 shrink-0", "active:scale-95 transition-transform")}
            onClick={() => setActiveFilter("active")}
          >
            Active ({sessions.filter((s) => s.status === "active").length})
          </Badge>
          <Badge
            variant={activeFilter === "archived" ? "default" : "outline"}
            className={cn("cursor-pointer min-h-[32px] px-4 shrink-0", "active:scale-95 transition-transform")}
            onClick={() => setActiveFilter("archived")}
          >
            Archived ({sessions.filter((s) => s.status === "archived").length})
          </Badge>
        </div>
      </div>

      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredSessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground mb-4">No sessions found</p>
            <Button onClick={onCreateNew} size="lg" className="min-h-[44px]">
              <Plus className="h-4 w-4" />
              Create New Session
            </Button>
          </div>
        ) : (
          <>
            {visibleSessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                onResume={onResume}
                onArchive={onArchive}
                onDelete={onDelete}
                compact
              />
            ))}
            {hasMore && (
              <div className="flex justify-center py-4">
                <Button variant="outline" onClick={() => setDisplayedSessions((prev) => prev + 20)}>
                  Load More
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="sticky bottom-0 p-4 bg-gradient-to-t from-background via-background to-transparent">
        <Button onClick={onCreateNew} size="lg" className="w-full min-h-[48px]">
          <Plus className="h-4 w-4" />
          New Session
        </Button>
      </div>
    </div>
  )
}

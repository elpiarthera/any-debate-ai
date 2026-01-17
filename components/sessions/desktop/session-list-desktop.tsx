"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Grid3x3, List, ChevronLeft, ChevronRight } from "lucide-react"
import { SessionCard } from "../session-card"
import type { Session } from "@/lib/mock-data/sessions"
import { cn } from "@/lib/utils"

interface SessionListDesktopProps {
  sessions: Session[]
  onResume?: (id: string) => void
  onArchive?: (id: string) => void
  onDelete?: (id: string) => void
  onCreateNew?: () => void
}

const ITEMS_PER_PAGE = 12

export function SessionListDesktop({ sessions, onResume, onArchive, onDelete, onCreateNew }: SessionListDesktopProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "archived">("all")
  const [modeFilter, setModeFilter] = useState<"all" | "compare" | "debate" | "auto-debate">("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = activeFilter === "all" || session.status === activeFilter
    const matchesMode = modeFilter === "all" || session.config.mode === modeFilter
    return matchesSearch && matchesFilter && matchesMode
  })

  const totalPages = Math.ceil(filteredSessions.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedSessions = filteredSessions.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  return (
    <div className="flex h-full gap-6">
      <aside className="w-64 shrink-0 border-r pr-6 space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Status</h3>
          <div className="space-y-2">
            <Button
              variant={activeFilter === "all" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                setActiveFilter("all")
                setCurrentPage(1)
              }}
            >
              All Sessions
              <Badge variant="secondary" className="ml-auto">
                {sessions.length}
              </Badge>
            </Button>
            <Button
              variant={activeFilter === "active" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                setActiveFilter("active")
                setCurrentPage(1)
              }}
            >
              Active
              <Badge variant="secondary" className="ml-auto">
                {sessions.filter((s) => s.status === "active").length}
              </Badge>
            </Button>
            <Button
              variant={activeFilter === "archived" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                setActiveFilter("archived")
                setCurrentPage(1)
              }}
            >
              Archived
              <Badge variant="secondary" className="ml-auto">
                {sessions.filter((s) => s.status === "archived").length}
              </Badge>
            </Button>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Mode</h3>
          <div className="space-y-2">
            <Button
              variant={modeFilter === "all" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                setModeFilter("all")
                setCurrentPage(1)
              }}
            >
              All Modes
              <Badge variant="secondary" className="ml-auto">
                {sessions.length}
              </Badge>
            </Button>
            <Button
              variant={modeFilter === "compare" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                setModeFilter("compare")
                setCurrentPage(1)
              }}
            >
              Compare
              <Badge variant="secondary" className="ml-auto">
                {sessions.filter((s) => s.config.mode === "compare").length}
              </Badge>
            </Button>
            <Button
              variant={modeFilter === "debate" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                setModeFilter("debate")
                setCurrentPage(1)
              }}
            >
              Debate
              <Badge variant="secondary" className="ml-auto">
                {sessions.filter((s) => s.config.mode === "debate").length}
              </Badge>
            </Button>
            <Button
              variant={modeFilter === "auto-debate" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                setModeFilter("auto-debate")
                setCurrentPage(1)
              }}
            >
              Auto-Debate
              <Badge variant="secondary" className="ml-auto">
                {sessions.filter((s) => s.config.mode === "auto-debate").length}
              </Badge>
            </Button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search sessions..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="pl-9"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={cn(viewMode === "grid" && "bg-accent")}
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("list")}
              className={cn(viewMode === "list" && "bg-accent")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          <Button onClick={onCreateNew}>
            <Plus className="h-4 w-4" />
            New Session
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredSessions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground mb-4">No sessions found</p>
              <Button onClick={onCreateNew}>
                <Plus className="h-4 w-4" />
                Create New Session
              </Button>
            </div>
          ) : (
            <div
              className={cn(viewMode === "grid" ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4" : "space-y-3")}
            >
              {paginatedSessions.map((session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  onResume={onResume}
                  onArchive={onArchive}
                  onDelete={onDelete}
                />
              ))}
            </div>
          )}
        </div>

        {filteredSessions.length > 0 && (
          <div className="flex items-center justify-between pt-4 border-t mt-6">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredSessions.length)} of{" "}
              {filteredSessions.length} sessions
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(pageNum)}
                      className="w-9"
                    >
                      {pageNum}
                    </Button>
                  )
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

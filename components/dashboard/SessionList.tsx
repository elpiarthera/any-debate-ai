"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Clock, Trash2, Play, Search, Filter } from "lucide-react"
import { useSessionManagement } from "@/hooks/dashboard/useSessionManagement"
import { useDevice } from "@/contexts/DeviceProvider"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

export function SessionList() {
  const { sessions, deleteSession, isLoading } = useSessionManagement()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "archived">("all")
  const { isMobile } = useDevice()
  const router = useRouter()

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch = session.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || session.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleResume = (sessionId: string) => {
    router.push(`/debates?session=${sessionId}`)
    toast.success("Resuming session...")
  }

  const handleDelete = (sessionId: string, title: string) => {
    if (confirm(`Delete session "${title}"?`)) {
      deleteSession(sessionId)
      toast.success("Session deleted")
    }
  }

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className={isMobile ? "text-lg" : "text-xl"}>Debate Sessions</CardTitle>
          <Badge variant="secondary">{sessions.length} total</Badge>
        </div>

        <div className="flex gap-2 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search sessions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const next = filterStatus === "all" ? "active" : filterStatus === "active" ? "archived" : "all"
              setFilterStatus(next)
            }}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {filteredSessions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No sessions found</p>
            <Button variant="link" onClick={() => router.push("/debates")} className="mt-2">
              Start your first debate
            </Button>
          </div>
        ) : (
          <AnimatePresence>
            {filteredSessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
                className={cn("p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors", isMobile && "p-3")}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className={cn("font-medium", isMobile ? "text-sm" : "text-base")}>{session.title}</h4>
                      <Badge variant={session.status === "active" ? "default" : "secondary"} className="text-xs">
                        {session.status}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        <span>{session.messageCount} messages</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatDuration(session.duration)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {session.agents.slice(0, 3).map((agent, i) => (
                          <Avatar key={i} className="w-6 h-6 border-2 border-background">
                            <AvatarFallback className="text-xs">{agent.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      {session.agents.length > 3 && (
                        <span className="text-xs text-muted-foreground">+{session.agents.length - 3} more</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button size="sm" onClick={() => handleResume(session.id)} className="min-w-[80px]">
                      <Play className="h-3 w-3 mr-1" />
                      Resume
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(session.id, session.title)}
                      className="min-w-[80px]"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </CardContent>
    </Card>
  )
}

"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, MessageCircle, Edit3, Eye, Clock } from "lucide-react"
import { mockCollaboration, type CollaborationEvent, type AgentCursor } from "@/lib/mockCollaboration"

interface CollaborationIndicatorProps {
  artifactId: string
  className?: string
}

export function CollaborationIndicator({ artifactId, className }: CollaborationIndicatorProps) {
  const [events, setEvents] = useState<CollaborationEvent[]>([])
  const [cursors, setCursors] = useState<AgentCursor[]>([])
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    // Subscribe to collaboration events
    const unsubscribeEvents = mockCollaboration.subscribe((event) => {
      if (event.artifactId === artifactId) {
        setEvents((prev) => [event, ...prev.slice(0, 9)]) // Keep last 10 events
      }
    })

    // Subscribe to cursor updates
    const unsubscribeCursors = mockCollaboration.subscribeToCursors((newCursors) => {
      setCursors(newCursors)
    })

    // Get initial state
    setEvents(mockCollaboration.getRecentEvents().filter((e) => e.artifactId === artifactId))
    setCursors(mockCollaboration.getActiveCursors())

    return () => {
      unsubscribeEvents()
      unsubscribeCursors()
    }
  }, [artifactId])

  const getEventIcon = (type: string) => {
    switch (type) {
      case "edit":
        return <Edit3 className="h-3 w-3" />
      case "comment":
        return <MessageCircle className="h-3 w-3" />
      case "cursor":
        return <Eye className="h-3 w-3" />
      default:
        return <Clock className="h-3 w-3" />
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case "edit":
        return "default"
      case "comment":
        return "secondary"
      case "cursor":
        return "outline"
      default:
        return "outline"
    }
  }

  if (cursors.length === 0 && events.length === 0) {
    return null
  }

  return (
    <div className={className}>
      {/* Floating Cursors */}
      <AnimatePresence>
        {cursors.map((cursor) => (
          <motion.div
            key={cursor.agentId}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed pointer-events-none z-50"
            style={{
              left: cursor.position.x,
              top: cursor.position.y,
            }}
          >
            <div className="flex items-center gap-1">
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                className="w-3 h-3 rounded-full border-2 border-white shadow-lg"
                style={{ backgroundColor: cursor.color }}
              />
              <Badge
                variant="default"
                className="text-xs px-2 py-0.5 shadow-lg"
                style={{ backgroundColor: cursor.color }}
              >
                {cursor.agentId}
              </Badge>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Collaboration Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-4 right-4 z-40"
      >
        <Card className="bg-background/90 backdrop-blur-sm border-border/50 shadow-xl">
          <div className="p-3">
            {/* Header */}
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Users className="h-4 w-4 text-primary" />
                </motion.div>
                <span className="text-sm font-medium">Live Collaboration</span>
                {cursors.length > 0 && (
                  <Badge variant="default" className="text-xs animate-pulse">
                    {cursors.length} active
                  </Badge>
                )}
              </div>
            </div>

            {/* Active Agents */}
            {cursors.length > 0 && (
              <div className="flex items-center gap-1 mt-2">
                {cursors.map((cursor, index) => (
                  <motion.div
                    key={cursor.agentId}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Avatar className="h-6 w-6 border-2" style={{ borderColor: cursor.color }}>
                      <AvatarFallback
                        className="text-xs font-medium"
                        style={{ backgroundColor: cursor.color + "20", color: cursor.color }}
                      >
                        {cursor.agentId.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Expanded Activity Feed */}
            <AnimatePresence>
              {isExpanded && events.length > 0 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-3 border-t border-border/50 pt-3"
                >
                  <ScrollArea className="h-48 w-64">
                    <div className="space-y-2">
                      <AnimatePresence>
                        {events.map((event, index) => (
                          <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-start gap-2 p-2 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
                          >
                            <div className="flex-shrink-0 mt-0.5">
                              <Badge
                                variant={getEventColor(event.type)}
                                className="h-5 w-5 p-0 flex items-center justify-center"
                              >
                                {getEventIcon(event.type)}
                              </Badge>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-foreground leading-relaxed">{event.description}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {event.timestamp.toLocaleTimeString()}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </ScrollArea>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

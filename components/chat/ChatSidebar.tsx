"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  MessageSquare,
  Plus,
  Settings,
  History,
  Trash2,
  Edit3,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useDevice } from "@/contexts/DeviceProvider"
import { ExportButton } from "@/components/export/ExportButton"

interface ChatSession {
  id: string
  title: string
  timestamp: Date
  messageCount: number
  participants: string[]
}

interface ChatSidebarProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
  currentSessionId?: string
  onSessionSelect: (sessionId: string) => void
  onNewSession: () => void
}

export function ChatSidebar({
  isCollapsed,
  onToggleCollapse,
  currentSessionId,
  onSessionSelect,
  onNewSession,
}: ChatSidebarProps) {
  const [sessions] = useState<ChatSession[]>([
    {
      id: "1",
      title: "AI Ethics Discussion",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      messageCount: 24,
      participants: ["GPT-4", "Claude-3.5"],
    },
    {
      id: "2",
      title: "Climate Change Solutions",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      messageCount: 18,
      participants: ["GPT-4", "Llama-3", "Gemini"],
    },
    {
      id: "3",
      title: "Future of Work",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      messageCount: 32,
      participants: ["Claude-3.5", "Custom Agent"],
    },
  ])

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  const { isMobile, isTablet } = useDevice()

  const getWidth = () => {
    if (isMobile) return "100%" // Full width on mobile when in modal
    if (isTablet) return isCollapsed ? "64px" : "280px" // Narrower on tablet
    return isCollapsed ? "64px" : "320px" // Full width on desktop
  }

  return (
    <motion.div
      className={cn(
        "h-full bg-sidebar border-r border-sidebar-border flex flex-col",
        isMobile && "border-r-0", // No border on mobile when in modal
      )}
      animate={{ width: getWidth() }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ width: isMobile ? "100%" : undefined }} // Override for mobile
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border shrink-0">
        <div className="flex items-center justify-between">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-2"
              >
                <History className="h-5 w-5 text-sidebar-foreground" />
                <h2 className="font-semibold text-sidebar-foreground">Chat History</h2>
              </motion.div>
            )}
          </AnimatePresence>

          {!isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="h-8 w-8 p-0 hover:bg-sidebar-accent"
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          )}
        </div>

        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 space-y-2"
            >
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  onNewSession()
                }}
                className="w-full justify-start gap-2 bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
              >
                <Plus className="h-4 w-4" />
                New Debate
              </Button>
              <Button
                onClick={() => (window.location.href = "/quick-start")}
                variant="outline"
                className="w-full justify-start gap-2 bg-transparent"
              >
                <Sparkles className="h-4 w-4" />
                Start from Template
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sessions List - Fixed height calculation for proper scrolling */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-2">
            <AnimatePresence>
              {sessions.map((session, index) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "group relative rounded-lg p-3 mb-2 cursor-pointer transition-colors",
                    "hover:bg-sidebar-accent",
                    currentSessionId === session.id && "bg-sidebar-accent",
                  )}
                  onClick={() => onSessionSelect(session.id)}
                >
                  {isCollapsed ? (
                    <div className="flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-sidebar-foreground" />
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sidebar-foreground truncate">{session.title}</h3>
                          <p className="text-xs text-sidebar-foreground/60 mt-1">
                            {formatTimestamp(session.timestamp)}
                          </p>
                        </div>

                        {!isMobile && (
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExportButton
                              sessionData={{
                                id: session.id,
                                title: session.title,
                                timestamp: session.timestamp,
                                participants: session.participants,
                              }}
                              messages={[]} // In real implementation, this would fetch session messages
                              variant="ghost"
                              size="sm"
                              showText={false}
                            />
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-sidebar-accent">
                              <Edit3 className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-destructive/20 hover:text-destructive"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1">
                          {session.participants.slice(0, isMobile ? 1 : 2).map((participant, i) => (
                            <Badge key={i} variant="secondary" className="text-xs px-1.5 py-0.5 bg-sidebar-accent/50">
                              {participant}
                            </Badge>
                          ))}
                          {session.participants.length > (isMobile ? 1 : 2) && (
                            <Badge variant="secondary" className="text-xs px-1.5 py-0.5 bg-sidebar-accent/50">
                              +{session.participants.length - (isMobile ? 1 : 2)}
                            </Badge>
                          )}
                        </div>

                        <span className="text-xs text-sidebar-foreground/40">{session.messageCount} msgs</span>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border shrink-0">
        <AnimatePresence>
          {!isCollapsed ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center"
            >
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-sidebar-accent">
                <Settings className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

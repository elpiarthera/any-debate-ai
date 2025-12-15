"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
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
import { useTooltipPreferences } from "@/contexts/TooltipPreferencesContext"
import { ExportButton } from "@/components/export/ExportButton"
import { EditSessionDialog } from "./edit-session-dialog"
import { DeleteConfirmationDialog } from "@/components/shared/delete-confirmation-dialog"
import { useToast } from "@/hooks/use-toast"

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
  const [sessions, setSessions] = useState<ChatSession[]>([
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

  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedSession, setSelectedSession] = useState<string | null>(null)
  const { toast } = useToast()
  const { tooltipPreferences } = useTooltipPreferences()

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

  const handleEditSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedSession(sessionId)
    setShowEditDialog(true)
  }

  const handleDeleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedSession(sessionId)
    setShowDeleteDialog(true)
  }

  const handleSaveSessionTitle = (newTitle: string) => {
    if (!selectedSession) return

    setSessions((prev) =>
      prev.map((session) => (session.id === selectedSession ? { ...session, title: newTitle } : session)),
    )

    toast({
      title: "Session renamed",
      description: `Session renamed to "${newTitle}"`,
    })
  }

  const confirmDeleteSession = () => {
    if (!selectedSession) return

    const session = sessions.find((s) => s.id === selectedSession)
    setSessions((prev) => prev.filter((s) => s.id !== selectedSession))

    console.log("[v0] Deleting session:", selectedSession)
    toast({
      title: "Session deleted",
      description: `"${session?.title}" has been deleted.`,
      variant: "destructive",
    })
  }

  const { isMobile, isTablet } = useDevice()

  const getWidth = () => {
    if (isMobile) return "100%" // Full width on mobile when in modal
    if (isTablet) return isCollapsed ? "64px" : "280px" // Narrower on tablet
    return isCollapsed ? "64px" : "320px" // Full width on desktop
  }

  return (
    <TooltipProvider delayDuration={tooltipPreferences.delay}>
      <motion.div
        className={cn("h-full bg-sidebar border-r border-sidebar-border flex flex-col", isMobile && "border-r-0")}
        animate={{ width: getWidth() }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ width: isMobile ? "100%" : undefined }}
      >
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border shrink-0">
          <div className="flex items-center justify-between">
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="flex items-center gap-2 overflow-hidden"
                >
                  <History className="h-5 w-5 text-sidebar-foreground shrink-0" />
                  <h2 className="font-semibold text-sidebar-foreground whitespace-nowrap">Chat History</h2>
                </motion.div>
              )}
            </AnimatePresence>

            {!isMobile && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onToggleCollapse}
                    className="h-8 w-8 p-0 hover:bg-sidebar-accent shrink-0"
                  >
                    {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{isCollapsed ? "Expand sidebar" : "Collapse sidebar"}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>

          {isCollapsed && tooltipPreferences.enabled && (
            <div className="mt-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      onNewSession()
                    }}
                    size="sm"
                    className="w-full h-10 p-0 bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={8}>
                  <p>New Debate</p>
                </TooltipContent>
              </Tooltip>
            </div>
          )}

          {isCollapsed && !tooltipPreferences.enabled && (
            <div className="mt-3">
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  onNewSession()
                }}
                size="sm"
                className="w-full h-10 p-0 bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}

          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="mt-3 space-y-2 overflow-hidden"
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
                  {isCollapsed && tooltipPreferences.enabled ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center justify-center">
                          <MessageSquare className="h-5 w-5 text-sidebar-foreground" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right" sideOffset={8}>
                        <div className="max-w-[200px]">
                          <p className="font-medium">{session.title}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {session.messageCount} messages • {formatTimestamp(session.timestamp)}
                          </p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  ) : isCollapsed ? (
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
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-sidebar-accent"
                              onClick={(e) => handleEditSession(session.id, e)}
                            >
                              <Edit3 className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-destructive/20 hover:text-destructive"
                              onClick={(e) => handleDeleteSession(session.id, e)}
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
            </div>
          </ScrollArea>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border shrink-0">
          <AnimatePresence mode="wait">
            {!isCollapsed ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
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
                transition={{ duration: 0.2 }}
                className="flex justify-center"
              >
                {tooltipPreferences.enabled ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-sidebar-accent">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={8}>
                      <p>Settings</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-sidebar-accent">
                    <Settings className="h-4 w-4" />
                  </Button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dialogs */}
        <EditSessionDialog
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          sessionId={selectedSession}
          currentTitle={sessions.find((s) => s.id === selectedSession)?.title}
          onSave={handleSaveSessionTitle}
        />
        <DeleteConfirmationDialog
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          onConfirm={confirmDeleteSession}
          itemName={sessions.find((s) => s.id === selectedSession)?.title || "session"}
          itemType="Session"
        />
      </motion.div>
    </TooltipProvider>
  )
}

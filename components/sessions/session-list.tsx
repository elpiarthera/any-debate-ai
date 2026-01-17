"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useDevice } from "@/contexts/DeviceProvider"
import { SessionListMobile } from "./mobile/session-list-mobile"
import { SessionListDesktop } from "./desktop/session-list-desktop"
import { mockSessions, type Session } from "@/lib/mock-data/sessions"
import { useToast } from "@/hooks/use-toast"

export function SessionList() {
  const { isMobile } = useDevice()
  const router = useRouter()
  const { toast } = useToast()
  const [sessions, setSessions] = useState<Session[]>(mockSessions)

  const handleResume = (id: string) => {
    const session = sessions.find((s) => s.id === id)
    if (!session) return

    console.log("[v0] Resuming session:", id)
    router.push(`/chat?session=${id}`)
  }

  const handleArchive = (id: string) => {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === id ? { ...session, status: session.status === "active" ? "archived" : "active" } : session,
      ),
    )

    const session = sessions.find((s) => s.id === id)
    const newStatus = session?.status === "active" ? "archived" : "active"

    toast({
      title: newStatus === "archived" ? "Session archived" : "Session restored",
      description: `"${session?.title}" has been ${newStatus === "archived" ? "archived" : "restored"}.`,
    })
  }

  const handleDelete = (id: string) => {
    const session = sessions.find((s) => s.id === id)
    if (!session) return

    if (confirm(`Are you sure you want to delete "${session.title}"? This action cannot be undone.`)) {
      setSessions((prev) => prev.filter((s) => s.id !== id))

      toast({
        title: "Session deleted",
        description: `"${session.title}" has been permanently deleted.`,
        variant: "destructive",
      })
    }
  }

  const handleCreateNew = () => {
    console.log("[v0] Creating new session")
    router.push("/chat/new")
  }

  const sharedProps = {
    sessions,
    onResume: handleResume,
    onArchive: handleArchive,
    onDelete: handleDelete,
    onCreateNew: handleCreateNew,
  }

  return isMobile ? <SessionListMobile {...sharedProps} /> : <SessionListDesktop {...sharedProps} />
}

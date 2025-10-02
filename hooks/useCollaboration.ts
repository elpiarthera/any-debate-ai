"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { mockCollaboration, type CollaborationEvent, type AgentCursor } from "@/lib/mockCollaboration"
import type { ArtifactType } from "@/lib/artifacts"

export function useCollaboration(artifactId: string | null, artifactType?: ArtifactType) {
  const [events, setEvents] = useState<CollaborationEvent[]>([])
  const [cursors, setCursors] = useState<AgentCursor[]>([])
  const [isActive, setIsActive] = useState(false)
  const isActiveRef = useRef(false)

  // Start collaboration
  const startCollaboration = useCallback(
    (participatingAgents: string[]) => {
      if (!artifactId || !artifactType) return

      console.log(`[v0] Starting collaboration for ${artifactId}`)
      mockCollaboration.startCollaboration(artifactId, artifactType, participatingAgents)
      setIsActive(true)
      isActiveRef.current = true
    },
    [artifactId, artifactType],
  )

  // Stop collaboration
  const stopCollaboration = useCallback(() => {
    if (!artifactId) return

    console.log(`[v0] Stopping collaboration for ${artifactId}`)
    mockCollaboration.stopCollaboration(artifactId)
    setIsActive(false)
    isActiveRef.current = false
  }, [artifactId])

  // Simulate typing
  const simulateTyping = useCallback(
    (agentId: string, isTyping: boolean) => {
      if (!artifactId) return
      mockCollaboration.simulateTyping(agentId, artifactId, isTyping)
    },
    [artifactId],
  )

  useEffect(() => {
    if (!artifactId) return

    // Subscribe to events
    const unsubscribeEvents = mockCollaboration.subscribe((event) => {
      if (event.artifactId === artifactId) {
        setEvents((prev) => [event, ...prev.slice(0, 19)]) // Keep last 20 events
      }
    })

    // Subscribe to cursors
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

  useEffect(() => {
    return () => {
      if (isActiveRef.current && artifactId) {
        mockCollaboration.stopCollaboration(artifactId)
      }
    }
  }, [artifactId])

  return {
    events,
    cursors,
    isActive,
    startCollaboration,
    stopCollaboration,
    simulateTyping,
    activeAgents: cursors.map((c) => c.agentId),
  }
}

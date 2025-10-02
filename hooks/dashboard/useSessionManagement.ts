"use client"

import { useState, useEffect, useCallback } from "react"
import type { DebateSession } from "@/types/dashboard"

const STORAGE_KEY = "debate-sessions"

export function useSessionManagement() {
  const [sessions, setSessions] = useState<DebateSession[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load sessions from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        // Convert date strings back to Date objects
        const sessionsWithDates = parsed.map((session: any) => ({
          ...session,
          createdAt: new Date(session.createdAt),
          updatedAt: new Date(session.updatedAt),
        }))
        setSessions(sessionsWithDates)
      }
    } catch (error) {
      console.error("Failed to load sessions:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Save sessions to local storage
  const saveSessions = useCallback((newSessions: DebateSession[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSessions))
      setSessions(newSessions)
    } catch (error) {
      console.error("Failed to save sessions:", error)
    }
  }, [])

  const saveSession = useCallback(
    (session: DebateSession) => {
      const updated = [...sessions, session]
      saveSessions(updated)
    },
    [sessions, saveSessions],
  )

  const updateSession = useCallback(
    (sessionId: string, updates: Partial<DebateSession>) => {
      const updated = sessions.map((s) => (s.id === sessionId ? { ...s, ...updates, updatedAt: new Date() } : s))
      saveSessions(updated)
    },
    [sessions, saveSessions],
  )

  const deleteSession = useCallback(
    (sessionId: string) => {
      const updated = sessions.filter((s) => s.id !== sessionId)
      saveSessions(updated)
    },
    [sessions, saveSessions],
  )

  const getSession = useCallback(
    (sessionId: string) => {
      return sessions.find((s) => s.id === sessionId)
    },
    [sessions],
  )

  return {
    sessions,
    isLoading,
    saveSession,
    updateSession,
    deleteSession,
    getSession,
  }
}

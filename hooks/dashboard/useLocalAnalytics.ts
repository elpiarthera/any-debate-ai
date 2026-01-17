"use client"

import { useMemo } from "react"
import { useSessionManagement } from "./useSessionManagement"
import { useAgentLibrary } from "./useAgentLibrary"
import type { DashboardMetrics } from "@/types/dashboard"

export function useLocalAnalytics(): DashboardMetrics {
  const { sessions } = useSessionManagement()
  const { agents } = useAgentLibrary()

  const metrics = useMemo(() => {
    const totalDebates = sessions.length
    const activeAgents = agents.filter((a) => a.usageCount > 0).length

    const totalTime = sessions.reduce((sum, s) => sum + s.duration, 0)
    const avgSessionTime = totalDebates > 0 ? Math.round(totalTime / totalDebates) : 0

    const totalMessages = sessions.reduce((sum, s) => sum + s.messageCount, 0)
    const engagementRate = totalDebates > 0 ? Math.round((totalMessages / totalDebates / 10) * 100) : 0

    return {
      totalDebates,
      activeAgents,
      avgSessionTime,
      engagementRate: Math.min(engagementRate, 100),
    }
  }, [sessions, agents])

  return metrics
}

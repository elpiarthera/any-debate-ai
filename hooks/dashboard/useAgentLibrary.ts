"use client"

import { useState, useEffect, useCallback } from "react"
import type { Agent } from "@/types/dashboard"

const STORAGE_KEY = "agent-library"
const FAVORITES_KEY = "agent-favorites"

export function useAgentLibrary() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load agents and favorites from local storage
  useEffect(() => {
    try {
      const storedAgents = localStorage.getItem(STORAGE_KEY)
      const storedFavorites = localStorage.getItem(FAVORITES_KEY)

      if (storedAgents) {
        const parsed = JSON.parse(storedAgents)
        const agentsWithDates = parsed.map((agent: any) => ({
          ...agent,
          createdAt: new Date(agent.createdAt),
        }))
        setAgents(agentsWithDates)
      }

      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites))
      }
    } catch (error) {
      console.error("Failed to load agents:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const saveAgents = useCallback((newAgents: Agent[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newAgents))
      setAgents(newAgents)
    } catch (error) {
      console.error("Failed to save agents:", error)
    }
  }, [])

  const saveFavorites = useCallback((newFavorites: string[]) => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites))
      setFavorites(newFavorites)
    } catch (error) {
      console.error("Failed to save favorites:", error)
    }
  }, [])

  const addAgent = useCallback(
    (agent: Agent) => {
      const updated = [...agents, agent]
      saveAgents(updated)
    },
    [agents, saveAgents],
  )

  const updateAgent = useCallback(
    (agentId: string, updates: Partial<Agent>) => {
      const updated = agents.map((a) => (a.id === agentId ? { ...a, ...updates } : a))
      saveAgents(updated)
    },
    [agents, saveAgents],
  )

  const deleteAgent = useCallback(
    (agentId: string) => {
      const updated = agents.filter((a) => a.id !== agentId)
      saveAgents(updated)
      // Also remove from favorites
      if (favorites.includes(agentId)) {
        saveFavorites(favorites.filter((id) => id !== agentId))
      }
    },
    [agents, favorites, saveAgents, saveFavorites],
  )

  const toggleFavorite = useCallback(
    (agentId: string) => {
      const updated = favorites.includes(agentId) ? favorites.filter((id) => id !== agentId) : [...favorites, agentId]
      saveFavorites(updated)
    },
    [favorites, saveFavorites],
  )

  const incrementUsage = useCallback(
    (agentId: string) => {
      const agent = agents.find((a) => a.id === agentId)
      if (agent) {
        updateAgent(agentId, { usageCount: agent.usageCount + 1 })
      }
    },
    [agents, updateAgent],
  )

  return {
    agents,
    favorites,
    isLoading,
    addAgent,
    updateAgent,
    deleteAgent,
    toggleFavorite,
    incrementUsage,
  }
}

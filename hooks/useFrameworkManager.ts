"use client"

import { useState, useEffect } from "react"
import { type Framework, FRAMEWORKS } from "@/lib/agent-config/frameworks"

const STORAGE_KEY = "anydebate_custom_frameworks"

export function useFrameworkManager() {
  const [customFrameworks, setCustomFrameworks] = useState<Framework[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setCustomFrameworks(JSON.parse(stored))
      }
    } catch (error) {
      console.error("[v0] Failed to load custom frameworks:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const saveToStorage = (frameworks: Framework[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(frameworks))
    } catch (error) {
      console.error("[v0] Failed to save custom frameworks:", error)
    }
  }

  const getAllFrameworks = (): Framework[] => {
    return [...FRAMEWORKS, ...customFrameworks]
  }

  const createFramework = (framework: Omit<Framework, "id">): Framework => {
    const newFramework: Framework = {
      ...framework,
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    }
    const updated = [...customFrameworks, newFramework]
    setCustomFrameworks(updated)
    saveToStorage(updated)
    return newFramework
  }

  const updateFramework = (id: string, updates: Partial<Framework>): boolean => {
    const index = customFrameworks.findIndex((f) => f.id === id)
    if (index === -1) return false

    const updated = [...customFrameworks]
    updated[index] = { ...updated[index], ...updates }
    setCustomFrameworks(updated)
    saveToStorage(updated)
    return true
  }

  const deleteFramework = (id: string): boolean => {
    const filtered = customFrameworks.filter((f) => f.id !== id)
    if (filtered.length === customFrameworks.length) return false

    setCustomFrameworks(filtered)
    saveToStorage(filtered)
    return true
  }

  const getFramework = (id: string): Framework | undefined => {
    return getAllFrameworks().find((f) => f.id === id)
  }

  const isCustomFramework = (id: string): boolean => {
    return customFrameworks.some((f) => f.id === id)
  }

  return {
    allFrameworks: getAllFrameworks(),
    customFrameworks,
    isLoading,
    createFramework,
    updateFramework,
    deleteFramework,
    getFramework,
    isCustomFramework,
  }
}

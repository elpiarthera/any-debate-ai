"use client"

import { useState, useEffect } from "react"
import { type Persona, PERSONAS } from "@/lib/agent-config/personas"

const STORAGE_KEY = "anydebate_custom_personas"

export function usePersonaManager() {
  const [customPersonas, setCustomPersonas] = useState<Persona[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setCustomPersonas(JSON.parse(stored))
      }
    } catch (error) {
      console.error("[v0] Failed to load custom personas:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const saveToStorage = (personas: Persona[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(personas))
    } catch (error) {
      console.error("[v0] Failed to save custom personas:", error)
    }
  }

  const getAllPersonas = (): Persona[] => {
    return [...PERSONAS, ...customPersonas]
  }

  const createPersona = (persona: Omit<Persona, "id">): Persona => {
    const newPersona: Persona = {
      ...persona,
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    }
    const updated = [...customPersonas, newPersona]
    setCustomPersonas(updated)
    saveToStorage(updated)
    return newPersona
  }

  const updatePersona = (id: string, updates: Partial<Persona>): boolean => {
    const index = customPersonas.findIndex((p) => p.id === id)
    if (index === -1) return false

    const updated = [...customPersonas]
    updated[index] = { ...updated[index], ...updates }
    setCustomPersonas(updated)
    saveToStorage(updated)
    return true
  }

  const deletePersona = (id: string): boolean => {
    const filtered = customPersonas.filter((p) => p.id !== id)
    if (filtered.length === customPersonas.length) return false

    setCustomPersonas(filtered)
    saveToStorage(filtered)
    return true
  }

  const getPersona = (id: string): Persona | undefined => {
    return getAllPersonas().find((p) => p.id === id)
  }

  const isCustomPersona = (id: string): boolean => {
    return customPersonas.some((p) => p.id === id)
  }

  return {
    allPersonas: getAllPersonas(),
    customPersonas,
    isLoading,
    createPersona,
    updatePersona,
    deletePersona,
    getPersona,
    isCustomPersona,
  }
}

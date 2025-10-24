"use client"

import { useState, useEffect } from "react"
import { type ProfessionalRole, PROFESSIONAL_ROLES } from "@/lib/agent-config/roles"

const STORAGE_KEY = "anydebate_custom_roles"

export function useRoleManager() {
  const [customRoles, setCustomRoles] = useState<ProfessionalRole[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load custom roles from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setCustomRoles(JSON.parse(stored))
      }
    } catch (error) {
      console.error("[v0] Failed to load custom roles:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Save custom roles to localStorage
  const saveToStorage = (roles: ProfessionalRole[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(roles))
    } catch (error) {
      console.error("[v0] Failed to save custom roles:", error)
    }
  }

  // Get all roles (built-in + custom)
  const getAllRoles = (): ProfessionalRole[] => {
    return [...PROFESSIONAL_ROLES, ...customRoles]
  }

  // Create a new role
  const createRole = (role: Omit<ProfessionalRole, "id">): ProfessionalRole => {
    const newRole: ProfessionalRole = {
      ...role,
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    }
    const updated = [...customRoles, newRole]
    setCustomRoles(updated)
    saveToStorage(updated)
    return newRole
  }

  // Update an existing role
  const updateRole = (id: string, updates: Partial<ProfessionalRole>): boolean => {
    const index = customRoles.findIndex((r) => r.id === id)
    if (index === -1) return false

    const updated = [...customRoles]
    updated[index] = { ...updated[index], ...updates }
    setCustomRoles(updated)
    saveToStorage(updated)
    return true
  }

  // Delete a role
  const deleteRole = (id: string): boolean => {
    const filtered = customRoles.filter((r) => r.id !== id)
    if (filtered.length === customRoles.length) return false

    setCustomRoles(filtered)
    saveToStorage(filtered)
    return true
  }

  // Get a single role by ID
  const getRole = (id: string): ProfessionalRole | undefined => {
    return getAllRoles().find((r) => r.id === id)
  }

  // Check if a role is custom (can be edited/deleted)
  const isCustomRole = (id: string): boolean => {
    return customRoles.some((r) => r.id === id)
  }

  return {
    allRoles: getAllRoles(),
    customRoles,
    isLoading,
    createRole,
    updateRole,
    deleteRole,
    getRole,
    isCustomRole,
  }
}

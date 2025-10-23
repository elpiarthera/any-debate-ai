"use client"

import { useState } from "react"
import { useDevice } from "@/contexts/DeviceProvider"
import { useToast } from "@/hooks/use-toast"
import { MemoryListMobile } from "./mobile/memory-list-mobile"
import { MemoryGridDesktop } from "./desktop/memory-grid-desktop"

export type MemoryScope = "organization" | "workspace" | "user" | "chat"
export type MemoryCategory = "Technical" | "Business" | "Process" | "Product" | "Other"
export type MemorySource = "manual" | "document" | "url"

export interface Memory {
  id: string
  title: string
  category: MemoryCategory
  content: string
  tags: string[]
  source: MemorySource
  sourceDocument?: string
  sourceUrl?: string
  usageCount: number
  createdAt: number
  scope: MemoryScope
  createdBy: string
}

const mockMemories: Memory[] = [
  {
    id: "1",
    title: "Company Tech Stack",
    category: "Technical",
    content:
      "- Next.js 15 with App Router\n- Convex for backend\n- TypeScript for type safety\n- Tailwind CSS for styling",
    tags: ["tech", "stack", "frontend"],
    source: "manual",
    usageCount: 45,
    createdAt: Date.now() - 86400000,
    scope: "organization",
    createdBy: "admin@company.com",
  },
  {
    id: "2",
    title: "Agile Process",
    category: "Business",
    content: "- 2-week sprints\n- Daily standups at 9 AM\n- Sprint planning on Mondays\n- Retrospectives on Fridays",
    tags: ["process", "agile", "scrum"],
    source: "document",
    sourceDocument: "handbook.pdf",
    usageCount: 23,
    createdAt: Date.now() - 172800000,
    scope: "workspace",
    createdBy: "manager@company.com",
  },
  {
    id: "3",
    title: "Product Roadmap Q1",
    category: "Product",
    content: "- Launch memory system\n- Implement multi-agent debates\n- Add artifact collaboration\n- Mobile app beta",
    tags: ["roadmap", "planning", "q1"],
    source: "url",
    sourceUrl: "https://company.com/roadmap",
    usageCount: 67,
    createdAt: Date.now() - 259200000,
    scope: "organization",
    createdBy: "product@company.com",
  },
  {
    id: "4",
    title: "My Preferences",
    category: "Other",
    content: "- Prefer concise responses\n- Focus on technical accuracy\n- Include code examples when relevant",
    tags: ["personal", "preferences"],
    source: "manual",
    usageCount: 12,
    createdAt: Date.now() - 345600000,
    scope: "user",
    createdBy: "user@company.com",
  },
]

interface MemoryDashboardProps {
  isFilterSidebarOpen: boolean
  onToggleFilterSidebar: () => void
  selectedScope: MemoryScope | "all"
  onScopeChange: (scope: MemoryScope | "all") => void
  selectedCategory: MemoryCategory | "all"
  onCategoryChange: (category: MemoryCategory | "all") => void
}

export function MemoryDashboard({
  isFilterSidebarOpen,
  onToggleFilterSidebar,
  selectedScope,
  onScopeChange,
  selectedCategory,
  onCategoryChange,
}: MemoryDashboardProps) {
  const { isMobile } = useDevice()
  const { toast } = useToast()
  const [memories, setMemories] = useState<Memory[]>(mockMemories)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMemories = memories.filter((memory) => {
    const matchesSearch =
      memory.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memory.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memory.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesScope = selectedScope === "all" || memory.scope === selectedScope
    const matchesCategory = selectedCategory === "all" || memory.category === selectedCategory

    return matchesSearch && matchesScope && matchesCategory
  })

  const handleEditMemory = (memoryId: string, updatedMemory: Partial<Memory>) => {
    setMemories((prev) => prev.map((memory) => (memory.id === memoryId ? { ...memory, ...updatedMemory } : memory)))
  }

  const handleDeleteMemory = (memoryId: string) => {
    const memory = memories.find((m) => m.id === memoryId)
    setMemories((prev) => prev.filter((m) => m.id !== memoryId))
    toast({
      title: "Memory deleted",
      description: `"${memory?.title}" has been deleted.`,
    })
  }

  const handleAddMemory = (memoryData: any) => {
    const newMemory: Memory = {
      id: Date.now().toString(),
      title: memoryData.title,
      category: memoryData.category,
      content: memoryData.content,
      tags: memoryData.tags,
      source: memoryData.source,
      sourceUrl: memoryData.sourceUrl,
      usageCount: 0,
      createdAt: Date.now(),
      scope: memoryData.scope,
      createdBy: "current-user@company.com",
    }

    setMemories((prev) => [newMemory, ...prev])

    console.log("[v0] Adding new memory:", newMemory)
    toast({
      title: "Memory created",
      description: `"${memoryData.title}" has been added successfully.`,
    })
  }

  const handleMemoriesFromDocument = (extractedMemories: any[]) => {
    const newMemories: Memory[] = extractedMemories.map((memory) => ({
      id: Date.now().toString() + Math.random(),
      title: memory.title,
      category: memory.category as MemoryCategory,
      content: memory.content,
      tags: memory.tags,
      source: "document" as MemorySource,
      usageCount: 0,
      createdAt: Date.now(),
      scope: "workspace" as MemoryScope,
      createdBy: "current-user@company.com",
    }))

    setMemories((prev) => [...newMemories, ...prev])

    console.log("[v0] Adding memories from document:", newMemories)
    toast({
      title: "Memories imported",
      description: `${newMemories.length} memories have been added from the document.`,
    })
  }

  const handleMemoriesFromUrl = (extractedMemories: any[]) => {
    const newMemories: Memory[] = extractedMemories.map((memory) => ({
      id: Date.now().toString() + Math.random(),
      title: memory.title,
      category: memory.category as MemoryCategory,
      content: memory.content,
      tags: [],
      source: "url" as MemorySource,
      usageCount: 0,
      createdAt: Date.now(),
      scope: "workspace" as MemoryScope,
      createdBy: "current-user@company.com",
    }))

    setMemories((prev) => [...newMemories, ...prev])

    console.log("[v0] Adding memories from URL:", newMemories)
    toast({
      title: "Memories imported",
      description: `${newMemories.length} memories have been added from the URL.`,
    })
  }

  const sharedProps = {
    memories: filteredMemories,
    searchQuery,
    onSearchChange: setSearchQuery,
    selectedScope,
    onScopeChange,
    selectedCategory,
    onCategoryChange,
    onEditMemory: handleEditMemory,
    onDeleteMemory: handleDeleteMemory,
    onAddMemory: handleAddMemory,
    onMemoriesFromDocument: handleMemoriesFromDocument,
    onMemoriesFromUrl: handleMemoriesFromUrl,
    isFilterSidebarOpen,
    onToggleFilterSidebar,
  }

  return isMobile ? <MemoryListMobile {...sharedProps} /> : <MemoryGridDesktop {...sharedProps} />
}

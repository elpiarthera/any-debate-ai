"use client"

import { useState } from "react"
import { useDevice } from "@/contexts/DeviceProvider"
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

export function MemoryDashboard() {
  const { isMobile } = useDevice()
  const [memories, setMemories] = useState<Memory[]>(mockMemories)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedScope, setSelectedScope] = useState<MemoryScope | "all">("all")
  const [selectedCategory, setSelectedCategory] = useState<MemoryCategory | "all">("all")

  // Filter memories based on search and filters
  const filteredMemories = memories.filter((memory) => {
    const matchesSearch =
      memory.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memory.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memory.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesScope = selectedScope === "all" || memory.scope === selectedScope
    const matchesCategory = selectedCategory === "all" || memory.category === selectedCategory

    return matchesSearch && matchesScope && matchesCategory
  })

  const sharedProps = {
    memories: filteredMemories,
    searchQuery,
    onSearchChange: setSearchQuery,
    selectedScope,
    onScopeChange: setSelectedScope,
    selectedCategory,
    onCategoryChange: setSelectedCategory,
  }

  return isMobile ? <MemoryListMobile {...sharedProps} /> : <MemoryGridDesktop {...sharedProps} />
}

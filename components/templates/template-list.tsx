"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useDevice } from "@/contexts/DeviceProvider"
import { useToast } from "@/hooks/use-toast"
import { TemplateListMobile } from "./mobile/template-list-mobile"
import { TemplateListDesktop } from "./desktop/template-list-desktop"

export interface Template {
  id: string
  title: string
  description: string
  category: string
  participants: number
  icon: string
  color: string
  usageCount: number
  isFavorite: boolean
}

const mockTemplates: Template[] = [
  {
    id: "1",
    title: "Product Strategy Debate",
    description: "Evaluate product decisions with multiple AI perspectives",
    category: "Business",
    participants: 3,
    icon: "TrendingUp",
    color: "bg-blue-500/10 text-blue-500",
    usageCount: 234,
    isFavorite: false,
  },
  {
    id: "2",
    title: "Technical Architecture Review",
    description: "Discuss system design and architecture choices",
    category: "Engineering",
    participants: 2,
    icon: "Brain",
    color: "bg-purple-500/10 text-purple-500",
    usageCount: 189,
    isFavorite: true,
  },
  {
    id: "3",
    title: "Marketing Campaign Analysis",
    description: "Brainstorm and evaluate marketing strategies",
    category: "Marketing",
    participants: 4,
    icon: "Zap",
    color: "bg-yellow-500/10 text-yellow-500",
    usageCount: 156,
    isFavorite: false,
  },
  {
    id: "4",
    title: "Research Discussion",
    description: "Explore research topics with AI experts",
    category: "Research",
    participants: 2,
    icon: "FileText",
    color: "bg-green-500/10 text-green-500",
    usageCount: 98,
    isFavorite: false,
  },
]

interface TemplateListProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function TemplateList({ selectedCategory, onCategoryChange }: TemplateListProps) {
  const { isMobile } = useDevice()
  const router = useRouter()
  const { toast } = useToast()
  const [templates, setTemplates] = useState<Template[]>(mockTemplates)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleUseTemplate = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId)
    console.log("[v0] Using template:", templateId)
    toast({
      title: "Template loaded",
      description: `Starting debate with "${template?.title}"`,
    })
    router.push(`/debates?template=${templateId}`)
  }

  const handleFavoriteToggle = (templateId: string) => {
    setTemplates((prev) =>
      prev.map((template) =>
        template.id === templateId ? { ...template, isFavorite: !template.isFavorite } : template,
      ),
    )
    const template = templates.find((t) => t.id === templateId)
    toast({
      title: template?.isFavorite ? "Removed from favorites" : "Added to favorites",
      description: `"${template?.title}" ${template?.isFavorite ? "removed from" : "added to"} your favorites.`,
    })
  }

  const sharedProps = {
    templates: filteredTemplates,
    searchQuery,
    onSearchChange: setSearchQuery,
    selectedCategory,
    onCategoryChange,
    onUseTemplate: handleUseTemplate,
    onFavoriteToggle: handleFavoriteToggle,
  }

  return isMobile ? <TemplateListMobile {...sharedProps} /> : <TemplateListDesktop {...sharedProps} />
}

"use client"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { TemplateCardMobile } from "./template-card-mobile"
import type { Template } from "../template-list"

interface TemplateListMobileProps {
  templates: Template[]
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
  onUseTemplate: (templateId: string) => void
  onFavoriteToggle: (templateId: string) => void
}

export function TemplateListMobile({
  templates,
  searchQuery,
  onSearchChange,
  onUseTemplate,
  onFavoriteToggle,
}: TemplateListMobileProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b p-4 space-y-3">
        <h1 className="text-xl font-semibold">Templates</h1>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 min-h-[48px]"
          />
        </div>
      </div>

      {/* Template List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {templates.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No templates found</p>
            <p className="text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          templates.map((template) => (
            <TemplateCardMobile
              key={template.id}
              template={template}
              onUse={onUseTemplate}
              onFavoriteToggle={onFavoriteToggle}
            />
          ))
        )}
      </div>
    </div>
  )
}

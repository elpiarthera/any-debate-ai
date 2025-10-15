"use client"

import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
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

const categories = ["all", "Business", "Engineering", "Marketing", "Research"]

export function TemplateListMobile({
  templates,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onUseTemplate,
  onFavoriteToggle,
}: TemplateListMobileProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Templates</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFiltersOpen(true)}
            className="min-h-[44px] min-w-[44px]"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

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

      {/* Filters Modal */}
      <AdaptiveModal isOpen={isFiltersOpen} onClose={() => setIsFiltersOpen(false)} title="Filter Templates">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-3">Category</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="w-full justify-start min-h-[44px]"
                  onClick={() => {
                    onCategoryChange(category)
                    setIsFiltersOpen(false)
                  }}
                >
                  {category === "all" ? "All Categories" : category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </AdaptiveModal>
    </div>
  )
}

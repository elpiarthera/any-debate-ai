"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TemplateCardDesktop } from "./template-card-desktop"
import type { Template } from "../template-list"

interface TemplateListDesktopProps {
  templates: Template[]
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
  onUseTemplate: (templateId: string) => void
  onFavoriteToggle: (templateId: string) => void
}

const categories = ["all", "Business", "Engineering", "Marketing", "Research"]

export function TemplateListDesktop({
  templates,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onUseTemplate,
  onFavoriteToggle,
}: TemplateListDesktopProps) {
  return (
    <div className="flex h-full">
      {/* Sidebar Filters */}
      <div className="w-64 border-r p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <div className="space-y-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                className="w-full justify-start min-h-[44px]"
                onClick={() => onCategoryChange(category)}
              >
                {category === "all" ? "All Categories" : category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Debate Templates</h1>
              <p className="text-sm text-muted-foreground mt-1">Start with pre-configured debate scenarios</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 min-h-[48px]"
            />
          </div>
        </div>

        {/* Template Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {templates.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg">No templates found</p>
              <p className="text-sm mt-2">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => (
                <TemplateCardDesktop
                  key={template.id}
                  template={template}
                  onUse={onUseTemplate}
                  onFavoriteToggle={onFavoriteToggle}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

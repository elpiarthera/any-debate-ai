"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, SlidersHorizontal, TrendingUp, Clock, Star, ChevronDown } from "lucide-react"
import { BUILT_IN_TEMPLATES } from "@/lib/templates/built-in"
import { TemplateStorage } from "@/lib/templates/storage"
import { filterTemplates, sortTemplatesByPopularity, sortTemplatesByRecent } from "@/lib/templates/utils"
import type { DebateTemplate, TemplateCategory } from "@/lib/templates/types"

interface TemplateGalleryMobileProps {
  onSelectTemplate: (template: DebateTemplate) => void
  showCustomOnly?: boolean
}

type SortMode = "popular" | "recent" | "name"

const TEMPLATE_CATEGORIES: (TemplateCategory | "All")[] = [
  "All",
  "General Purpose",
  "Business Strategy",
  "Product Development",
  "Technology & Engineering",
  "Creative & Design",
  "Research & Analysis",
  "Education & Training",
  "Healthcare & Science",
]

export function TemplateGalleryMobile({ onSelectTemplate, showCustomOnly = false }: TemplateGalleryMobileProps) {
  const [sortMode, setSortMode] = useState<SortMode>("popular")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | "All">("All")
  const [showFilters, setShowFilters] = useState(false)
  const [showCategories, setShowCategories] = useState(false)

  const allTemplates = useMemo(() => {
    const customTemplates = TemplateStorage.getCustomTemplates()
    return showCustomOnly ? customTemplates : [...BUILT_IN_TEMPLATES, ...customTemplates]
  }, [showCustomOnly])

  const filteredAndSortedTemplates = useMemo(() => {
    const filtered = filterTemplates(allTemplates, {
      category: selectedCategory === "All" ? undefined : selectedCategory,
      searchQuery,
      isCustom: showCustomOnly ? true : undefined,
    })

    switch (sortMode) {
      case "popular":
        return sortTemplatesByPopularity(filtered)
      case "recent":
        return sortTemplatesByRecent(filtered)
      case "name":
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name))
      default:
        return filtered
    }
  }, [allTemplates, selectedCategory, searchQuery, showCustomOnly, sortMode])

  return (
    <div className="w-full space-y-4 pb-4">
      {/* Search */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates..."
            className="pl-9 min-h-[48px]"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="min-h-[48px] min-w-[48px]"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Filters Drawer */}
      {showFilters && (
        <div className="space-y-3 p-4 bg-accent rounded-lg animate-in slide-in-from-top-2">
          <div>
            <label className="text-sm font-medium mb-2 block">Sort by</label>
            <div className="flex gap-2">
              <Button
                variant={sortMode === "popular" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortMode("popular")}
                className="flex-1 min-h-[44px]"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Popular
              </Button>
              <Button
                variant={sortMode === "recent" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortMode("recent")}
                className="flex-1 min-h-[44px]"
              >
                <Clock className="h-4 w-4 mr-2" />
                Recent
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Category Selector */}
      <div>
        <Button
          variant="outline"
          onClick={() => setShowCategories(!showCategories)}
          className="w-full justify-between min-h-[48px]"
        >
          <span>{selectedCategory}</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${showCategories ? "rotate-180" : ""}`} />
        </Button>

        {showCategories && (
          <div className="mt-2 p-2 bg-accent rounded-lg space-y-1 animate-in slide-in-from-top-2">
            {TEMPLATE_CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                onClick={() => {
                  setSelectedCategory(category)
                  setShowCategories(false)
                }}
                className="w-full justify-start min-h-[44px]"
              >
                {category}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-muted-foreground px-1">
        <span>
          {filteredAndSortedTemplates.length} {filteredAndSortedTemplates.length === 1 ? "template" : "templates"}
        </span>
        {searchQuery && (
          <Button variant="ghost" size="sm" onClick={() => setSearchQuery("")} className="h-auto p-0 text-xs">
            Clear search
          </Button>
        )}
      </div>

      {/* Templates List */}
      {filteredAndSortedTemplates.length === 0 ? (
        <div className="text-center py-12 space-y-3">
          <p className="text-muted-foreground">No templates found</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("All")
            }}
            className="min-h-[44px]"
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredAndSortedTemplates.map((template) => (
            <MobileTemplateCard key={template.id} template={template} onSelect={() => onSelectTemplate(template)} />
          ))}
        </div>
      )}
    </div>
  )
}

interface MobileTemplateCardProps {
  template: DebateTemplate
  onSelect: () => void
}

function MobileTemplateCard({ template, onSelect }: MobileTemplateCardProps) {
  const usage = TemplateStorage.getTemplateUsage(template.id)

  return (
    <Card className="p-4 cursor-pointer active:scale-98 transition-transform min-h-[100px]" onClick={onSelect}>
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-base line-clamp-2 flex-1">{template.name}</h3>
          {template.metadata.isCustom && (
            <Badge variant="secondary" className="text-xs flex-shrink-0">
              <Star className="h-3 w-3 fill-current" />
            </Badge>
          )}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{template.description}</p>

        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {template.category}
          </Badge>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{template.agents.length} agents</span>
            {usage > 0 && (
              <span className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {usage}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

"use client"

import { useState, useMemo } from "react"
import { useDevice } from "@/contexts/DeviceProvider"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Grid3x3, List, Search, SlidersHorizontal, TrendingUp, Clock, Star } from "lucide-react"
import { BUILT_IN_TEMPLATES } from "@/lib/templates/built-in"
import { TemplateStorage } from "@/lib/templates/storage"
import { filterTemplates, sortTemplatesByPopularity, sortTemplatesByRecent } from "@/lib/templates/utils"
import type { DebateTemplate, TemplateCategory } from "@/lib/templates/types"
import { TemplateCategoryChips } from "./shared/TemplateCategoryChips"

interface TemplateGalleryProps {
  onSelectTemplate: (template: DebateTemplate) => void
  showCustomOnly?: boolean
}

type ViewMode = "grid" | "list"
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

export function TemplateGallery({ onSelectTemplate, showCustomOnly = false }: TemplateGalleryProps) {
  const { isMobile } = useDevice()
  const [viewMode, setViewMode] = useState<ViewMode>(isMobile ? "list" : "grid")
  const [sortMode, setSortMode] = useState<SortMode>("popular")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | "All">("All")
  const [showFilters, setShowFilters] = useState(false)

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
    <div className="w-full space-y-4">
      {/* Header with Search and View Controls */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isMobile ? "Search templates..." : "Search by name, description, or tags..."}
              className="pl-9 min-h-[48px]"
            />
          </div>

          {!isMobile && (
            <div className="flex items-center gap-1 border rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="min-h-[36px] min-w-[36px]"
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="min-h-[36px] min-w-[36px]"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="min-h-[44px] min-w-[44px]"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="space-y-3 p-4 bg-accent rounded-lg animate-in slide-in-from-top-2">
            <div>
              <label className="text-sm font-medium mb-2 block">Sort by</label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={sortMode === "popular" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortMode("popular")}
                  className="min-h-[36px]"
                >
                  <TrendingUp className="h-3.5 w-3.5 mr-1.5" />
                  Popular
                </Button>
                <Button
                  variant={sortMode === "recent" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortMode("recent")}
                  className="min-h-[36px]"
                >
                  <Clock className="h-3.5 w-3.5 mr-1.5" />
                  Recent
                </Button>
                <Button
                  variant={sortMode === "name" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortMode("name")}
                  className="min-h-[36px]"
                >
                  Name
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Category Chips */}
        <TemplateCategoryChips
          categories={TEMPLATE_CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Results Count */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {filteredAndSortedTemplates.length} {filteredAndSortedTemplates.length === 1 ? "template" : "templates"}
          </span>
          {searchQuery && (
            <Button variant="ghost" size="sm" onClick={() => setSearchQuery("")} className="h-auto p-0 text-xs">
              Clear search
            </Button>
          )}
        </div>
      </div>

      {/* Templates Grid/List */}
      {filteredAndSortedTemplates.length === 0 ? (
        <div className="text-center py-12 space-y-2">
          <p className="text-muted-foreground">No templates found</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("All")
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4" : "space-y-3"
          }
        >
          {filteredAndSortedTemplates.map((template) => (
            <TemplateGalleryCard
              key={template.id}
              template={template}
              viewMode={viewMode}
              onSelect={() => onSelectTemplate(template)}
              isMobile={isMobile}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface TemplateGalleryCardProps {
  template: DebateTemplate
  viewMode: ViewMode
  onSelect: () => void
  isMobile: boolean
}

function TemplateGalleryCard({ template, viewMode, onSelect, isMobile }: TemplateGalleryCardProps) {
  const usage = TemplateStorage.getTemplateUsage(template.id)

  if (viewMode === "list") {
    return (
      <Card
        className={`
          p-4 cursor-pointer transition-all
          hover:shadow-lg hover:border-primary
          ${isMobile ? "min-h-[100px] active:scale-98" : "hover:scale-101"}
        `}
        onClick={onSelect}
      >
        <div className="flex gap-4">
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-base md:text-lg line-clamp-1">{template.name}</h3>
              {template.metadata.isCustom && (
                <Badge variant="secondary" className="text-xs flex-shrink-0">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  Custom
                </Badge>
              )}
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">{template.description}</p>

            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="text-xs">
                {template.category}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {template.agents.length} {template.agents.length === 1 ? "agent" : "agents"}
              </span>
              {usage > 0 && (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {usage} {usage === 1 ? "use" : "uses"}
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card
      className={`
        p-4 cursor-pointer transition-all h-full
        hover:shadow-lg hover:border-primary
        ${isMobile ? "min-h-[140px] active:scale-98" : "hover:scale-102"}
      `}
      onClick={onSelect}
    >
      <div className="flex flex-col h-full gap-3">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-base line-clamp-2 flex-1">{template.name}</h3>
            {template.metadata.isCustom && (
              <Badge variant="secondary" className="text-xs flex-shrink-0">
                <Star className="h-3 w-3 fill-current" />
              </Badge>
            )}
          </div>

          <p className="text-sm text-muted-foreground line-clamp-3">{template.description}</p>
        </div>

        <div className="mt-auto space-y-2">
          <Badge variant="outline" className="text-xs">
            {template.category}
          </Badge>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
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

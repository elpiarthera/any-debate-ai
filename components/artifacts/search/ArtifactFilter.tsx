"use client"

import type React from "react"

import { useState } from "react"
import { useDevice } from "@/contexts/DeviceProvider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Filter, X, FileText, Table, CheckSquare, BarChart3, Calendar, User, Tag } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ArtifactType } from "@/lib/artifacts"

export interface ArtifactFilters {
  type?: ArtifactType | "all"
  dateRange?: "today" | "week" | "month" | "all"
  sortBy?: "name" | "date-created" | "date-modified" | "type"
  sortOrder?: "asc" | "desc"
  tags?: string[]
  collaborators?: string[]
}

interface ArtifactFilterProps {
  filters: ArtifactFilters
  onFiltersChange: (filters: ArtifactFilters) => void
  availableTags?: string[]
  availableCollaborators?: string[]
  className?: string
}

export function ArtifactFilter({
  filters,
  onFiltersChange,
  availableTags = [],
  availableCollaborators = [],
  className,
}: ArtifactFilterProps) {
  const { isMobile } = useDevice()
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  const artifactTypes: Array<{ value: ArtifactType | "all"; label: string; icon: React.ReactNode }> = [
    { value: "all", label: "All Types", icon: <Filter className="h-4 w-4" /> },
    { value: "document", label: "Documents", icon: <FileText className="h-4 w-4" /> },
    { value: "data-table", label: "Data Tables", icon: <Table className="h-4 w-4" /> },
    { value: "checklist", label: "Checklists", icon: <CheckSquare className="h-4 w-4" /> },
    { value: "chart", label: "Charts", icon: <BarChart3 className="h-4 w-4" /> },
  ]

  const dateRanges = [
    { value: "all", label: "All Time" },
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
  ]

  const sortOptions = [
    { value: "name", label: "Name" },
    { value: "date-created", label: "Date Created" },
    { value: "date-modified", label: "Date Modified" },
    { value: "type", label: "Type" },
  ]

  const activeFilterCount =
    (filters.type && filters.type !== "all" ? 1 : 0) +
    (filters.dateRange && filters.dateRange !== "all" ? 1 : 0) +
    (filters.tags?.length || 0) +
    (filters.collaborators?.length || 0)

  const handleClearFilters = () => {
    onFiltersChange({
      type: "all",
      dateRange: "all",
      sortBy: "date-modified",
      sortOrder: "desc",
      tags: [],
      collaborators: [],
    })
  }

  const handleToggleTag = (tag: string) => {
    const currentTags = filters.tags || []
    const newTags = currentTags.includes(tag) ? currentTags.filter((t) => t !== tag) : [...currentTags, tag]
    onFiltersChange({ ...filters, tags: newTags })
  }

  const handleToggleCollaborator = (collaborator: string) => {
    const currentCollaborators = filters.collaborators || []
    const newCollaborators = currentCollaborators.includes(collaborator)
      ? currentCollaborators.filter((c) => c !== collaborator)
      : [...currentCollaborators, collaborator]
    onFiltersChange({ ...filters, collaborators: newCollaborators })
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Artifact Type Filter */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Artifact Type</span>
        </div>
        <div className={cn("grid gap-2", isMobile ? "grid-cols-1" : "grid-cols-2")}>
          {artifactTypes.map((type) => (
            <Button
              key={type.value}
              variant={filters.type === type.value ? "default" : "outline"}
              size="sm"
              onClick={() => onFiltersChange({ ...filters, type: type.value })}
              className={cn("justify-start gap-2", isMobile && "min-h-[48px] w-full")}
            >
              {type.icon}
              {type.label}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Date Range Filter */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Date Range</span>
        </div>
        <Select
          value={filters.dateRange || "all"}
          onValueChange={(value) => onFiltersChange({ ...filters, dateRange: value as any })}
        >
          <SelectTrigger className={cn(isMobile && "min-h-[48px]")}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {dateRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Sort Options */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Sort By</span>
        </div>
        <div className="flex gap-2">
          <Select
            value={filters.sortBy || "date-modified"}
            onValueChange={(value) => onFiltersChange({ ...filters, sortBy: value as any })}
          >
            <SelectTrigger className={cn("flex-1", isMobile && "min-h-[48px]")}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              onFiltersChange({
                ...filters,
                sortOrder: filters.sortOrder === "asc" ? "desc" : "asc",
              })
            }
            className={cn(isMobile && "min-h-[48px] min-w-[48px]")}
          >
            {filters.sortOrder === "asc" ? "↑" : "↓"}
          </Button>
        </div>
      </div>

      {/* Tags Filter */}
      {availableTags.length > 0 && (
        <>
          <Separator />
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Tags</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={filters.tags?.includes(tag) ? "default" : "outline"}
                  className={cn("cursor-pointer transition-colors", isMobile && "min-h-[44px] px-4 text-sm")}
                  onClick={() => handleToggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Collaborators Filter */}
      {availableCollaborators.length > 0 && (
        <>
          <Separator />
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Collaborators</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {availableCollaborators.map((collaborator) => (
                <Badge
                  key={collaborator}
                  variant={filters.collaborators?.includes(collaborator) ? "default" : "outline"}
                  className={cn("cursor-pointer transition-colors", isMobile && "min-h-[44px] px-4 text-sm")}
                  onClick={() => handleToggleCollaborator(collaborator)}
                >
                  {collaborator}
                </Badge>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Clear Filters */}
      {activeFilterCount > 0 && (
        <>
          <Separator />
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearFilters}
            className={cn("w-full", isMobile && "min-h-[48px]")}
          >
            <X className="h-4 w-4 mr-2" />
            Clear All Filters ({activeFilterCount})
          </Button>
        </>
      )}
    </div>
  )

  if (isMobile) {
    return (
      <>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsFilterModalOpen(true)}
          className={cn("gap-2", isMobile && "min-h-[48px]", className)}
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <Badge variant="default" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
              {activeFilterCount}
            </Badge>
          )}
        </Button>

        <AdaptiveModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          title="Filter Artifacts"
          description="Refine your artifact search"
        >
          <FilterContent />
        </AdaptiveModal>
      </>
    )
  }

  return (
    <div className={cn("p-4 bg-muted/20 rounded-lg border border-border/50", className)}>
      <FilterContent />
    </div>
  )
}

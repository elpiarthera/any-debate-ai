"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { MemoryScope, MemoryCategory } from "../memory-dashboard"

interface MemoryFiltersProps {
  selectedScope: MemoryScope | "all"
  onScopeChange: (scope: MemoryScope | "all") => void
  selectedCategory: MemoryCategory | "all"
  onCategoryChange: (category: MemoryCategory | "all") => void
}

const scopes: Array<{ value: MemoryScope | "all"; label: string; description: string }> = [
  { value: "all", label: "All Scopes", description: "Show all memories" },
  { value: "organization", label: "Organization", description: "Shared across all workspaces" },
  { value: "workspace", label: "Workspace", description: "Shared within workspace" },
  { value: "user", label: "Personal", description: "Your private memories" },
  { value: "chat", label: "Chat", description: "Session-specific" },
]

const categories: Array<{ value: MemoryCategory | "all"; label: string }> = [
  { value: "all", label: "All Categories" },
  { value: "Technical", label: "Technical" },
  { value: "Business", label: "Business" },
  { value: "Process", label: "Process" },
  { value: "Product", label: "Product" },
  { value: "Other", label: "Other" },
]

export function MemoryFilters({
  selectedScope,
  onScopeChange,
  selectedCategory,
  onCategoryChange,
}: MemoryFiltersProps) {
  return (
    <div className="space-y-6">
      {/* Scope filter */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Scope</Label>
        <RadioGroup value={selectedScope} onValueChange={onScopeChange}>
          {scopes.map((scope) => (
            <div key={scope.value} className="flex items-start space-x-3 min-h-[44px]">
              <RadioGroupItem value={scope.value} id={`scope-${scope.value}`} className="mt-1" />
              <div className="flex-1">
                <Label htmlFor={`scope-${scope.value}`} className="text-sm font-normal cursor-pointer">
                  {scope.label}
                </Label>
                <p className="text-xs text-muted-foreground">{scope.description}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Category filter */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Category</Label>
        <RadioGroup value={selectedCategory} onValueChange={onCategoryChange}>
          {categories.map((category) => (
            <div key={category.value} className="flex items-center space-x-3 min-h-[44px]">
              <RadioGroupItem value={category.value} id={`category-${category.value}`} />
              <Label htmlFor={`category-${category.value}`} className="text-sm font-normal cursor-pointer">
                {category.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}

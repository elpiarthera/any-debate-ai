"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useDevice } from "@/contexts/DeviceProvider"
import { Sheet, SheetContent } from "@/components/ui/sheet"

interface TemplateFilterSidebarProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const categories = [
  { id: "all", label: "All Categories" },
  { id: "Business", label: "Business" },
  { id: "Engineering", label: "Engineering" },
  { id: "Marketing", label: "Marketing" },
  { id: "Research", label: "Research" },
]

export function TemplateFilterSidebar({
  selectedCategory,
  onCategoryChange,
  isOpen = true,
  onOpenChange,
}: TemplateFilterSidebarProps) {
  const { isMobile } = useDevice()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleCategorySelect = (categoryId: string) => {
    onCategoryChange(categoryId)
    if (isMobile && onOpenChange) {
      onOpenChange(false)
    }
  }

  const handleReset = () => {
    onCategoryChange("all")
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <RotateCcw className="h-4 w-4" />
          <h2 className="font-semibold">Template Filters</h2>
        </div>
        {!isMobile && (
          <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="h-8 w-8 p-0">
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        )}
      </div>

      {/* Filters Content */}
      {!isCollapsed && (
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            {/* Categories Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-muted-foreground">Categories</h3>
                {selectedCategory !== "all" && (
                  <Button variant="ghost" size="sm" onClick={handleReset} className="h-auto p-0 text-xs">
                    Reset
                  </Button>
                )}
              </div>
              <div className="space-y-1">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "secondary" : "ghost"}
                    className="w-full justify-start min-h-[44px]"
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      )}
    </div>
  )

  // Mobile: Sheet overlay
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent side="left" className="w-[280px] p-0">
          {sidebarContent}
        </SheetContent>
      </Sheet>
    )
  }

  // Desktop: Always visible sidebar
  return (
    <div className={`border-r bg-background transition-all duration-300 ${isCollapsed ? "w-[60px]" : "w-[280px]"}`}>
      {sidebarContent}
    </div>
  )
}

"use client"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useDevice } from "@/contexts/DeviceProvider"
import { MemoryFilters } from "./shared/memory-filters"
import type { MemoryScope, MemoryCategory } from "./memory-dashboard"

interface MemoryFilterSidebarProps {
  isOpen: boolean
  onToggle: () => void
  selectedScope: MemoryScope | "all"
  onScopeChange: (scope: MemoryScope | "all") => void
  selectedCategory: MemoryCategory | "all"
  onCategoryChange: (category: MemoryCategory | "all") => void
}

export function MemoryFilterSidebar({
  isOpen,
  onToggle,
  selectedScope,
  onScopeChange,
  selectedCategory,
  onCategoryChange,
}: MemoryFilterSidebarProps) {
  const { isMobile } = useDevice()

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Filters</h2>
        {!isMobile && (
          <Button variant="ghost" size="icon" onClick={onToggle} className="h-8 w-8">
            {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex-1 overflow-y-auto p-4">
        <MemoryFilters
          selectedScope={selectedScope}
          onScopeChange={onScopeChange}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onToggle}>
        <SheetContent side="left" className="w-[280px] p-0">
          {sidebarContent}
        </SheetContent>
      </Sheet>
    )
  }

  if (!isOpen) {
    return null
  }

  return <div className="w-64 border-r bg-background flex-shrink-0">{sidebarContent}</div>
}

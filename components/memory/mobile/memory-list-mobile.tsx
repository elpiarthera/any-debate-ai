"use client"

import { useState } from "react"
import { Plus, Filter, Upload, LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { MemoryCardMobile } from "./memory-card-mobile"
import { MemorySearch } from "../shared/memory-search"
import { MemoryFilters } from "../shared/memory-filters"
import { EditMemoryDialog } from "../edit-memory-dialog"
import type { Memory, MemoryScope, MemoryCategory } from "../memory-dashboard"

interface MemoryListMobileProps {
  memories: Memory[]
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedScope: MemoryScope | "all"
  onScopeChange: (scope: MemoryScope | "all") => void
  selectedCategory: MemoryCategory | "all"
  onCategoryChange: (category: MemoryCategory | "all") => void
  onEditMemory?: (memoryId: string, updatedMemory: Partial<Memory>) => void
  onDeleteMemory?: (memoryId: string) => void
}

export function MemoryListMobile({
  memories,
  searchQuery,
  onSearchChange,
  selectedScope,
  onScopeChange,
  selectedCategory,
  onCategoryChange,
  onEditMemory,
  onDeleteMemory,
}: MemoryListMobileProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)

  const handleEdit = (memory: Memory) => {
    setSelectedMemory(memory)
    setIsEditDialogOpen(true)
  }

  const handleSave = (memoryId: string, updatedMemory: Partial<Memory>) => {
    onEditMemory?.(memoryId, updatedMemory)
    setIsEditDialogOpen(false)
    setSelectedMemory(null)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header with search */}
      <div className="sticky top-0 z-10 bg-background border-b p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Memory</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFiltersOpen(true)}
            className="min-h-[44px] min-w-[44px]"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <MemorySearch value={searchQuery} onChange={onSearchChange} />
      </div>

      {/* Memory list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {memories.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No memories found</p>
            <p className="text-sm mt-2">Try adjusting your filters or add a new memory</p>
          </div>
        ) : (
          memories.map((memory) => (
            <MemoryCardMobile key={memory.id} memory={memory} onEdit={handleEdit} onDelete={onDeleteMemory} />
          ))
        )}
      </div>

      {/* Floating action buttons */}
      <div className="fixed bottom-6 right-4 flex flex-col gap-3">
        <Button size="icon" variant="outline" className="h-12 w-12 rounded-full shadow-lg bg-transparent">
          <Upload className="h-5 w-5" />
        </Button>
        <Button size="icon" variant="outline" className="h-12 w-12 rounded-full shadow-lg bg-transparent">
          <LinkIcon className="h-5 w-5" />
        </Button>
        <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      {/* Filters modal */}
      <AdaptiveModal isOpen={isFiltersOpen} onClose={() => setIsFiltersOpen(false)} title="Filters">
        <MemoryFilters
          selectedScope={selectedScope}
          onScopeChange={onScopeChange}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
      </AdaptiveModal>

      {/* Edit Memory Dialog */}
      <EditMemoryDialog
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false)
          setSelectedMemory(null)
        }}
        onSave={handleSave}
        memory={selectedMemory}
      />
    </div>
  )
}

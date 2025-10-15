"use client"

import { Plus, Upload, LinkIcon } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MemoryCardDesktop } from "./memory-card-desktop"
import { MemorySearch } from "../shared/memory-search"
import { MemoryFilters } from "../shared/memory-filters"
import { EditMemoryDialog } from "../edit-memory-dialog"
import type { Memory, MemoryScope, MemoryCategory } from "../memory-dashboard"

interface MemoryGridDesktopProps {
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

export function MemoryGridDesktop({
  memories,
  searchQuery,
  onSearchChange,
  selectedScope,
  onScopeChange,
  selectedCategory,
  onCategoryChange,
  onEditMemory,
  onDeleteMemory,
}: MemoryGridDesktopProps) {
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
    <div className="flex h-full">
      {/* Sidebar filters */}
      <div className="w-64 border-r p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <MemoryFilters
            selectedScope={selectedScope}
            onScopeChange={onScopeChange}
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Memory Dashboard</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="min-h-[44px] bg-transparent">
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
              <Button variant="outline" className="min-h-[44px] bg-transparent">
                <LinkIcon className="h-4 w-4 mr-2" />
                Import from URL
              </Button>
              <Button className="min-h-[44px]">
                <Plus className="h-4 w-4 mr-2" />
                Add Memory
              </Button>
            </div>
          </div>

          <MemorySearch value={searchQuery} onChange={onSearchChange} />
        </div>

        {/* Memory grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {memories.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg">No memories found</p>
              <p className="text-sm mt-2">Try adjusting your filters or add a new memory</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {memories.map((memory) => (
                <MemoryCardDesktop key={memory.id} memory={memory} onEdit={handleEdit} onDelete={onDeleteMemory} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* EditMemoryDialog */}
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

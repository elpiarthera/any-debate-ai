"use client"

import { Plus, Upload, LinkIcon, ChevronRight } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MemoryCardDesktop } from "./memory-card-desktop"
import { MemorySearch } from "../shared/memory-search"
import { MemoryFilters } from "../shared/memory-filters"
import { EditMemoryDialog } from "../edit-memory-dialog"
import { AddMemoryForm } from "../add-memory-form"
import { DocumentUpload } from "../document-upload"
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
  onAddMemory?: (memoryData: any) => void
  onMemoriesFromDocument?: (memories: any[]) => void
  onMemoriesFromUrl?: (memories: any[]) => void
  isFilterSidebarOpen: boolean
  onToggleFilterSidebar: () => void
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
  onAddMemory,
  onMemoriesFromDocument,
  onMemoriesFromUrl,
  isFilterSidebarOpen,
  onToggleFilterSidebar,
}: MemoryGridDesktopProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)
  const [isAddMemoryOpen, setIsAddMemoryOpen] = useState(false)
  const [isDocumentUploadOpen, setIsDocumentUploadOpen] = useState(false)
  const [showUrlScraper, setShowUrlScraper] = useState(false)

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
      {/* Filters sidebar - second level */}
      {isFilterSidebarOpen && (
        <div className="w-64 border-r p-6 space-y-6 bg-background overflow-y-auto">
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
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="border-b p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {!isFilterSidebarOpen && (
                <Button variant="ghost" size="icon" onClick={onToggleFilterSidebar} className="h-8 w-8">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
              <h1 className="text-2xl font-semibold">Memory Dashboard</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="min-h-[44px] bg-transparent"
                onClick={() => setIsDocumentUploadOpen(true)}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
              <Button variant="outline" className="min-h-[44px] bg-transparent" onClick={() => setShowUrlScraper(true)}>
                <LinkIcon className="h-4 w-4 mr-2" />
                Import from URL
              </Button>
              <Button className="min-h-[44px]" onClick={() => setIsAddMemoryOpen(true)}>
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

      {/* AddMemoryForm dialog */}
      <AddMemoryForm
        isOpen={isAddMemoryOpen}
        onClose={() => setIsAddMemoryOpen(false)}
        onSubmit={(memoryData) => {
          onAddMemory?.(memoryData)
          setIsAddMemoryOpen(false)
        }}
      />

      {/* DocumentUpload dialog */}
      <DocumentUpload
        isOpen={isDocumentUploadOpen}
        onClose={() => setIsDocumentUploadOpen(false)}
        onMemoriesApproved={(memories) => {
          onMemoriesFromDocument?.(memories)
          setIsDocumentUploadOpen(false)
        }}
      />

      {/* URL Scraper modal - placeholder for now */}
      {showUrlScraper && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-background border rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Import from URL</h3>
            <p className="text-sm text-muted-foreground mb-4">
              URL scraper integration coming soon. This will allow you to import content from any URL and automatically
              extract memories.
            </p>
            <Button onClick={() => setShowUrlScraper(false)} className="min-h-[44px] w-full">
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

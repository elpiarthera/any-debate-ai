"use client"

import { useState } from "react"
import { Plus, Upload, LinkIcon, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { MemoryCardMobile } from "./memory-card-mobile"
import { MemorySearch } from "../shared/memory-search"
import { EditMemoryDialog } from "../edit-memory-dialog"
import { AddMemoryForm } from "../add-memory-form"
import { DocumentUpload } from "../document-upload"
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
  onAddMemory?: (memoryData: any) => void
  onMemoriesFromDocument?: (memories: any[]) => void
  onMemoriesFromUrl?: (memories: any[]) => void
  isFilterSidebarOpen: boolean
  onToggleFilterSidebar: () => void
}

export function MemoryListMobile({
  memories,
  searchQuery,
  onSearchChange,
  onEditMemory,
  onDeleteMemory,
  onAddMemory,
  onMemoriesFromDocument,
  onMemoriesFromUrl,
  onToggleFilterSidebar,
}: MemoryListMobileProps) {
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
    <div className="flex flex-col h-full min-h-0 overflow-hidden">
      <div className="sticky top-0 z-10 bg-background border-b p-3 space-y-3 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onToggleFilterSidebar} className="min-h-[44px] min-w-[44px]">
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">Memory</h1>
          </div>
        </div>

        <MemorySearch value={searchQuery} onChange={onSearchChange} />
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-3 pb-24">
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

      <div className="fixed bottom-6 right-4 flex flex-col gap-3 z-50">
        <Button
          size="icon"
          variant="outline"
          className="h-12 w-12 rounded-full shadow-lg bg-background"
          onClick={() => setIsDocumentUploadOpen(true)}
        >
          <Upload className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="h-12 w-12 rounded-full shadow-lg bg-background"
          onClick={() => setShowUrlScraper(true)}
        >
          <LinkIcon className="h-5 w-5" />
        </Button>
        <Button size="icon" className="h-14 w-14 rounded-full shadow-lg" onClick={() => setIsAddMemoryOpen(true)}>
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      <EditMemoryDialog
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false)
          setSelectedMemory(null)
        }}
        onSave={handleSave}
        memory={selectedMemory}
      />

      <AddMemoryForm
        isOpen={isAddMemoryOpen}
        onClose={() => setIsAddMemoryOpen(false)}
        onSubmit={(memoryData) => {
          onAddMemory?.(memoryData)
          setIsAddMemoryOpen(false)
        }}
      />

      <DocumentUpload
        isOpen={isDocumentUploadOpen}
        onClose={() => setIsDocumentUploadOpen(false)}
        onMemoriesApproved={(memories) => {
          onMemoriesFromDocument?.(memories)
          setIsDocumentUploadOpen(false)
        }}
      />

      <AdaptiveModal
        isOpen={showUrlScraper}
        onClose={() => setShowUrlScraper(false)}
        title="Import from URL"
        description="Scrape content from a URL and extract memories"
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Enter a URL to scrape content and automatically extract memories using AI.
          </p>
        </div>
      </AdaptiveModal>
    </div>
  )
}

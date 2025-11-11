"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, MoreVertical } from "lucide-react"
import { useFrameworkManager } from "@/hooks/useFrameworkManager"
import { FrameworkEditorModal } from "@/components/module-libraries/FrameworkEditorModal"
import type { ThinkingFramework } from "@/lib/agent-config/frameworks"

interface FrameworkLibraryDesktopProps {
  selectedFilter: string
}

export function FrameworkLibraryDesktop({ selectedFilter }: FrameworkLibraryDesktopProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const { allFrameworks, createFramework, updateFramework, deleteFramework, isCustomFramework } = useFrameworkManager()
  const [editorOpen, setEditorOpen] = useState(false)
  const [editingFramework, setEditingFramework] = useState<ThinkingFramework | undefined>()
  const [editorMode, setEditorMode] = useState<"create" | "edit">("create")

  const getFilteredFrameworks = () => {
    let frameworks = allFrameworks

    if (selectedFilter === "My Frameworks") {
      frameworks = frameworks.filter((f) => isCustomFramework(f.id))
    } else if (selectedFilter === "System") {
      frameworks = frameworks.filter((f) => !isCustomFramework(f.id))
    }

    return frameworks.filter((framework) => framework.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }

  const filteredFrameworks = getFilteredFrameworks()

  const handleCreateFramework = () => {
    console.log("[v0] handleCreateFramework called")
    setEditingFramework(undefined)
    setEditorMode("create")
    setEditorOpen(true)
    console.log("[v0] Editor should open now, editorOpen:", true)
  }

  const handleEditFramework = (framework: ThinkingFramework) => {
    setEditingFramework(framework)
    setEditorMode("edit")
    setEditorOpen(true)
  }

  const handleSaveFramework = (frameworkData: Omit<ThinkingFramework, "id"> | ThinkingFramework) => {
    if (editorMode === "create") {
      createFramework(frameworkData as Omit<ThinkingFramework, "id">)
    } else if ("id" in frameworkData) {
      updateFramework(frameworkData.id, frameworkData)
    }
  }

  const handleDeleteFramework = (id: string) => {
    if (confirm("Are you sure you want to delete this framework?")) {
      deleteFramework(id)
    }
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <header className="border-b border-border h-[72px] flex items-center px-6">
        <div className="flex items-center justify-between w-full">
          <h1 className="font-sans text-2xl font-semibold text-foreground">Framework Library</h1>
          <Button
            className="bg-primary text-primary-foreground"
            onClick={(e) => {
              console.log("[v0] New Framework button clicked")
              e.preventDefault()
              e.stopPropagation()
              handleCreateFramework()
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Framework
          </Button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        {/* Search */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search frameworks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input border-border focus:ring-ring"
            />
          </div>
        </div>

        {/* Framework grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFrameworks.map((framework) => (
            <Card
              key={framework.id}
              className="p-4 bg-card border-border hover:bg-accent transition-colors cursor-pointer"
              onClick={() => handleEditFramework(framework)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{framework.icon}</span>
                  <h3 className="font-sans font-medium text-foreground">{framework.name}</h3>
                  {isCustomFramework(framework.id) && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground border border-border">
                      Custom
                    </span>
                  )}
                </div>
                {isCustomFramework(framework.id) && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteFramework(framework.id)
                    }}
                  >
                    <MoreVertical className="h-4 w-4 text-muted-foreground" />
                  </Button>
                )}
              </div>

              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{framework.description}</p>

              {framework.category && (
                <Badge className="text-xs px-2 py-1 mb-3 bg-primary/10 text-primary border border-primary/20">
                  {framework.category}
                </Badge>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-background border-border"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleEditFramework(framework)
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-background border-border"
                  onClick={(e) => {
                    e.stopPropagation()
                    const duplicate = { ...framework, id: `custom-${Date.now()}`, name: `${framework.name} (Copy)` }
                    createFramework(duplicate)
                  }}
                >
                  Duplicate
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <FrameworkEditorModal
        open={editorOpen}
        onOpenChange={(open) => {
          console.log("[v0] FrameworkEditorModal onOpenChange:", open)
          setEditorOpen(open)
        }}
        framework={editingFramework}
        onSave={handleSaveFramework}
        mode={editorMode}
      />
    </div>
  )
}

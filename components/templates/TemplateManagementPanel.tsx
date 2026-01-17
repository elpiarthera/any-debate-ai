"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Upload, Trash2, Copy, Share2, FileJson, CheckSquare, Square, AlertCircle } from "lucide-react"
import { TemplateStorage } from "@/lib/templates/storage"
import { exportTemplates, importTemplates } from "@/lib/templates/import-export"
import type { DebateTemplate } from "@/lib/templates/types"
import { useDevice } from "@/contexts/DeviceProvider"
import { useToast } from "@/hooks/use-toast"

interface TemplateManagementPanelProps {
  templates: DebateTemplate[]
  onTemplatesChange: () => void
}

export function TemplateManagementPanel({ templates, onTemplatesChange }: TemplateManagementPanelProps) {
  const { isMobile } = useDevice()
  const { toast } = useToast()
  const [selectedTemplates, setSelectedTemplates] = useState<Set<string>>(new Set())
  const [isSelectionMode, setIsSelectionMode] = useState(false)

  const customTemplates = templates.filter((t) => t.metadata.isCustom)

  const toggleSelection = (templateId: string) => {
    const newSelection = new Set(selectedTemplates)
    if (newSelection.has(templateId)) {
      newSelection.delete(templateId)
    } else {
      newSelection.add(templateId)
    }
    setSelectedTemplates(newSelection)
  }

  const selectAll = () => {
    setSelectedTemplates(new Set(customTemplates.map((t) => t.id)))
  }

  const clearSelection = () => {
    setSelectedTemplates(new Set())
    setIsSelectionMode(false)
  }

  const handleExport = () => {
    const templatesToExport =
      selectedTemplates.size > 0 ? customTemplates.filter((t) => selectedTemplates.has(t.id)) : customTemplates

    if (templatesToExport.length === 0) {
      toast({
        title: "No templates to export",
        description: "Create some custom templates first.",
        variant: "destructive",
      })
      return
    }

    exportTemplates(templatesToExport)
    toast({
      title: "Templates exported",
      description: `Exported ${templatesToExport.length} template(s) successfully.`,
    })
    clearSelection()
  }

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const text = await file.text()
      const imported = importTemplates(text)

      toast({
        title: "Templates imported",
        description: `Successfully imported ${imported.length} template(s).`,
      })
      onTemplatesChange()
    } catch (error) {
      toast({
        title: "Import failed",
        description: error instanceof Error ? error.message : "Failed to import templates",
        variant: "destructive",
      })
    }

    event.target.value = ""
  }

  const handleBulkDelete = () => {
    if (selectedTemplates.size === 0) return

    if (confirm(`Delete ${selectedTemplates.size} template(s)? This cannot be undone.`)) {
      selectedTemplates.forEach((id) => {
        TemplateStorage.deleteTemplate(id)
      })

      toast({
        title: "Templates deleted",
        description: `Deleted ${selectedTemplates.size} template(s).`,
      })
      clearSelection()
      onTemplatesChange()
    }
  }

  const handleDuplicate = (template: DebateTemplate) => {
    const duplicated = {
      ...template,
      id: `${template.id}-copy-${Date.now()}`,
      name: `${template.name} (Copy)`,
      metadata: {
        ...template.metadata,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    }

    TemplateStorage.saveTemplate(duplicated)
    toast({
      title: "Template duplicated",
      description: `Created a copy of "${template.name}".`,
    })
    onTemplatesChange()
  }

  const handleShare = (template: DebateTemplate) => {
    const templateData = JSON.stringify(template, null, 2)
    const blob = new Blob([templateData], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${template.id}.json`
    a.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Template exported",
      description: `"${template.name}" has been exported.`,
    })
  }

  if (customTemplates.length === 0) {
    return (
      <Card className="p-6 md:p-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
              <FileJson className="h-8 w-8 text-muted-foreground" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">No custom templates yet</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Create your first custom template or import existing ones to get started.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <label htmlFor="import-templates">
              <Button variant="outline" className="min-h-[44px] cursor-pointer bg-transparent" asChild>
                <span>
                  <Upload className="h-4 w-4 mr-2" />
                  Import Templates
                </span>
              </Button>
            </label>
            <input id="import-templates" type="file" accept=".json" onChange={handleImport} className="hidden" />
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Action Bar */}
      <Card className="p-3 md:p-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {customTemplates.length} {customTemplates.length === 1 ? "template" : "templates"}
            </Badge>
            {selectedTemplates.size > 0 && <Badge variant="default">{selectedTemplates.size} selected</Badge>}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {!isSelectionMode ? (
              <>
                <Button variant="outline" size="sm" onClick={() => setIsSelectionMode(true)} className="min-h-[40px]">
                  <CheckSquare className="h-4 w-4 mr-2" />
                  Select
                </Button>
                <label htmlFor="import-templates-main">
                  <Button variant="outline" size="sm" className="min-h-[40px] cursor-pointer bg-transparent" asChild>
                    <span>
                      <Upload className="h-4 w-4 mr-2" />
                      Import
                    </span>
                  </Button>
                </label>
                <input
                  id="import-templates-main"
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
                <Button variant="outline" size="sm" onClick={handleExport} className="min-h-[40px] bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Export All
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={selectAll} className="min-h-[40px] bg-transparent">
                  Select All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExport}
                  disabled={selectedTemplates.size === 0}
                  className="min-h-[40px] bg-transparent"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleBulkDelete}
                  disabled={selectedTemplates.size === 0}
                  className="min-h-[40px]"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
                <Button variant="ghost" size="sm" onClick={clearSelection} className="min-h-[40px]">
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>

      {/* Template List */}
      <div className="space-y-3">
        {customTemplates.map((template) => (
          <Card
            key={template.id}
            className={`
              p-4 transition-all
              ${selectedTemplates.has(template.id) ? "border-primary bg-primary/5" : ""}
            `}
          >
            <div className="flex items-start gap-3">
              {isSelectionMode && (
                <button
                  onClick={() => toggleSelection(template.id)}
                  className="flex-shrink-0 mt-1 min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  {selectedTemplates.has(template.id) ? (
                    <CheckSquare className="h-5 w-5 text-primary" />
                  ) : (
                    <Square className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
              )}

              <div className="flex-1 min-w-0 space-y-2">
                <div>
                  <h4 className="font-semibold text-base line-clamp-1">{template.name}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">{template.description}</p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs">
                    {template.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {template.agents.length} {template.agents.length === 1 ? "agent" : "agents"}
                  </span>
                  {template.metadata.tags && template.metadata.tags.length > 0 && (
                    <span className="text-xs text-muted-foreground">
                      {template.metadata.tags.slice(0, 2).join(", ")}
                    </span>
                  )}
                </div>
              </div>

              {!isSelectionMode && (
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDuplicate(template)}
                    className="min-h-[36px] min-w-[36px]"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare(template)}
                    className="min-h-[36px] min-w-[36px]"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (confirm(`Delete "${template.name}"? This cannot be undone.`)) {
                        TemplateStorage.deleteTemplate(template.id)
                        toast({
                          title: "Template deleted",
                          description: `"${template.name}" has been deleted.`,
                        })
                        onTemplatesChange()
                      }
                    }}
                    className="min-h-[36px] min-w-[36px] text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Info Card */}
      <Card className="p-4 bg-muted/50">
        <div className="flex gap-3">
          <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0 space-y-1">
            <p className="text-sm font-medium">Template Management Tips</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Export templates to back them up or share with others</li>
              <li>• Import templates from JSON files to restore or add new ones</li>
              <li>• Use selection mode to perform bulk operations</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}

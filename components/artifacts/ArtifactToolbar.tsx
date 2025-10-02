"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FileText, Table, CheckSquare, BarChart3, Plus, Download, Share, History, Users, Sparkles } from "lucide-react"
import { toast } from "sonner"
import { ArtifactExportModal } from "./export/ArtifactExportModal"
import { ArtifactTemplateSelector } from "./templates/ArtifactTemplateSelector"
import { VersionHistoryPanel } from "./version-history/VersionHistoryPanel"
import { useArtifacts } from "@ai-sdk-tools/artifacts/client"
import type { ArtifactTemplate } from "@/lib/artifacts/templates"

type ArtifactType = "document" | "dataTable" | "checklist" | "chart"

export function ArtifactToolbar() {
  const [collaboratingAgents, setCollaboratingAgents] = useState<string[]>([])
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [isTemplateSelectorOpen, setIsTemplateSelectorOpen] = useState(false)
  const [isVersionHistoryOpen, setIsVersionHistoryOpen] = useState(false)
  const { latest } = useArtifacts()

  const artifactTypes: Array<{ type: ArtifactType; icon: React.ReactNode; label: string; description: string }> = [
    {
      type: "document",
      icon: <FileText className="h-4 w-4" />,
      label: "Document",
      description: "Rich text document with sections",
    },
    {
      type: "dataTable",
      icon: <Table className="h-4 w-4" />,
      label: "Data Table",
      description: "Structured data with columns and rows",
    },
    {
      type: "checklist",
      icon: <CheckSquare className="h-4 w-4" />,
      label: "Checklist",
      description: "Task list with completion tracking",
    },
    {
      type: "chart",
      icon: <BarChart3 className="h-4 w-4" />,
      label: "Chart",
      description: "Data visualization and charts",
    },
  ]

  const simulateCollaboration = useCallback((artifactId: string, agentId: string) => {
    console.log(`[v0] Simulating collaboration on ${artifactId} by agent ${agentId}`)

    setCollaboratingAgents((prev) => (prev.includes(agentId) ? prev : [...prev, agentId]))

    setTimeout(() => {
      setCollaboratingAgents((prev) => prev.filter((id) => id !== agentId))
    }, 3000)
  }, [])

  const handleCreateArtifact = (type: ArtifactType) => {
    console.log(`[v0] Creating artifact of type ${type}`)
    toast.success(`Creating ${type} artifact...`)

    setTimeout(() => {
      simulateCollaboration(`${type}-${Date.now()}`, "GPT-4")
    }, 1000)
  }

  const handleSelectTemplate = (template: ArtifactTemplate) => {
    console.log(`[v0] Creating artifact from template:`, template.name)
    toast.success(`Creating ${template.name}...`)
  }

  const handleRestoreVersion = (version: any) => {
    console.log(`[v0] Restoring version:`, version)
    toast.success("Version restored successfully")
  }

  return (
    <>
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between p-4 border-b border-border/50 bg-background/50 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3">
          {/* Create Artifact Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" size="sm" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Artifact
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              {artifactTypes.map((artifact) => (
                <DropdownMenuItem
                  key={artifact.type}
                  onClick={() => handleCreateArtifact(artifact.type)}
                  className="flex items-start gap-3 p-3 cursor-pointer"
                >
                  <div className="flex-shrink-0 mt-0.5">{artifact.icon}</div>
                  <div className="flex-1">
                    <div className="font-medium">{artifact.label}</div>
                    <div className="text-xs text-muted-foreground">{artifact.description}</div>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Templates button */}
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 bg-transparent"
            onClick={() => setIsTemplateSelectorOpen(true)}
          >
            <Sparkles className="h-4 w-4" />
            Templates
          </Button>

          <Separator orientation="vertical" className="h-6" />

          {/* Collaboration Status */}
          {collaboratingAgents.length > 0 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-2"
            >
              <Badge variant="default" className="flex items-center gap-1 animate-pulse">
                <Users className="h-3 w-3" />
                {collaboratingAgents.length} AI{collaboratingAgents.length > 1 ? "s" : ""} active
              </Badge>
              <div className="flex -space-x-1">
                {collaboratingAgents.slice(0, 3).map((agent, index) => (
                  <motion.div
                    key={agent}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-medium"
                    style={{ zIndex: 10 - index }}
                  >
                    {agent.charAt(0)}
                  </motion.div>
                ))}
                {collaboratingAgents.length > 3 && (
                  <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                    +{collaboratingAgents.length - 3}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Version History button */}
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => setIsVersionHistoryOpen(true)}
            disabled={!latest}
          >
            <History className="h-4 w-4" />
            History
          </Button>

          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <Share className="h-4 w-4" />
            Share
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => setIsExportModalOpen(true)}
            disabled={!latest}
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Export Modal */}
      {latest && (
        <ArtifactExportModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} artifact={latest} />
      )}

      {/* Template Selector Modal */}
      <ArtifactTemplateSelector
        isOpen={isTemplateSelectorOpen}
        onClose={() => setIsTemplateSelectorOpen(false)}
        onSelectTemplate={handleSelectTemplate}
      />

      {/* Version History Panel */}
      {latest && (
        <VersionHistoryPanel
          isOpen={isVersionHistoryOpen}
          onClose={() => setIsVersionHistoryOpen(false)}
          artifactId={latest.id}
          onRestoreVersion={handleRestoreVersion}
        />
      )}
    </>
  )
}

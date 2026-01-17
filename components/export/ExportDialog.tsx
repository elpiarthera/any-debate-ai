"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText, File, Database, Settings, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { exportManager } from "@/lib/export/export-manager"
import type { ExportOptions } from "@/lib/export/types"

interface ExportDialogProps {
  sessionData?: any
  messages: any[]
  trigger?: React.ReactNode
}

export function ExportDialog({ sessionData, messages, trigger }: ExportDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [options, setOptions] = useState<ExportOptions>({
    format: "pdf",
    includeMetadata: true,
    includeArtifacts: true,
    includeReactions: true,
  })

  const handleExport = async () => {
    if (messages.length === 0) {
      toast.error("No messages to export")
      return
    }

    setIsExporting(true)

    try {
      console.log("[v0] Starting export process")
      const { blob, filename } = await exportManager.exportSession(sessionData, messages, options)

      // Create download link
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast.success(`Successfully exported as ${filename}`)
      setIsOpen(false)
    } catch (error) {
      console.error("[v0] Export failed:", error)
      toast.error("Export failed. Please try again.")
    } finally {
      setIsExporting(false)
    }
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "pdf":
        return <FileText className="h-4 w-4" />
      case "markdown":
        return <File className="h-4 w-4" />
      case "json":
        return <Database className="h-4 w-4" />
      default:
        return <Download className="h-4 w-4" />
    }
  }

  const getFormatDescription = (format: string) => {
    switch (format) {
      case "pdf":
        return "Professional PDF document with formatting"
      case "markdown":
        return "Structured markdown file for documentation"
      case "json":
        return "Complete data export for backup/sharing"
      default:
        return ""
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Session
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Export Format */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Export Format</label>
            <Select value={options.format} onValueChange={(value: any) => setOptions({ ...options, format: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>PDF Document</span>
                  </div>
                </SelectItem>
                <SelectItem value="markdown">
                  <div className="flex items-center gap-2">
                    <File className="h-4 w-4" />
                    <span>Markdown File</span>
                  </div>
                </SelectItem>
                <SelectItem value="json">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    <span>JSON Data</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">{getFormatDescription(options.format)}</p>
          </div>

          {/* Export Options */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Include</label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="metadata"
                  checked={options.includeMetadata}
                  onCheckedChange={(checked) => setOptions({ ...options, includeMetadata: !!checked })}
                />
                <label htmlFor="metadata" className="text-sm">
                  Session metadata and timestamps
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="artifacts"
                  checked={options.includeArtifacts}
                  onCheckedChange={(checked) => setOptions({ ...options, includeArtifacts: !!checked })}
                />
                <label htmlFor="artifacts" className="text-sm">
                  Collaborative artifacts (documents, tables, etc.)
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="reactions"
                  checked={options.includeReactions}
                  onCheckedChange={(checked) => setOptions({ ...options, includeReactions: !!checked })}
                />
                <label htmlFor="reactions" className="text-sm">
                  Message reactions and engagement data
                </label>
              </div>
            </div>
          </div>

          {/* Session Preview */}
          <div className="bg-muted/20 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Session Preview</span>
              <Badge variant="secondary">{messages.length} messages</Badge>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>Title: {sessionData?.title || "Current AI Debate Session"}</div>
              <div>Participants: {sessionData?.participants?.join(", ") || "User, AI"}</div>
              <div>Date: {(sessionData?.timestamp || new Date()).toLocaleDateString()}</div>
            </div>
          </div>

          {/* Export Button */}
          <div className="flex gap-2">
            <Button onClick={handleExport} disabled={isExporting || messages.length === 0} className="flex-1">
              {isExporting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  {getFormatIcon(options.format)}
                  <span className="ml-2">Export {options.format.toUpperCase()}</span>
                </>
              )}
            </Button>

            <Button variant="outline" size="icon" title="Export Settings">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

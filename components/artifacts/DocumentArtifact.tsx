"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useDevice } from "@/contexts/DeviceProvider"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Edit3,
  Save,
  X,
  Plus,
  FileText,
  Clock,
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  CheckIcon,
  Maximize2,
  Eye,
  Code,
} from "lucide-react"
import type { DocumentData } from "@/lib/artifacts"
import { toast } from "sonner"

interface DocumentArtifactProps {
  data: DocumentData
  isEditing?: boolean
  collaboratingAgents?: string[]
  onUpdate?: (data: Partial<DocumentData>) => void
}

export function DocumentArtifact({
  data,
  isEditing = false,
  collaboratingAgents = [],
  onUpdate,
}: DocumentArtifactProps) {
  const { isMobile } = useDevice()
  const [editMode, setEditMode] = useState(isEditing)
  const [editedTitle, setEditedTitle] = useState(data.title)
  const [editedContent, setEditedContent] = useState(data.content)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [autoSaving, setAutoSaving] = useState(false)
  const [wordCount, setWordCount] = useState(0)

  useEffect(() => {
    const words = editedContent.trim().split(/\s+/).filter(Boolean).length
    setWordCount(words)
  }, [editedContent])

  useEffect(() => {
    if (!editMode) return

    const timer = setTimeout(() => {
      setAutoSaving(true)
      onUpdate?.({
        title: editedTitle,
        content: editedContent,
        metadata: {
          ...data.metadata,
          updatedAt: new Date().toISOString(),
          wordCount,
        },
      })
      setTimeout(() => setAutoSaving(false), 500)
    }, 2000)

    return () => clearTimeout(timer)
  }, [editedTitle, editedContent, editMode, wordCount])

  const handleSave = () => {
    onUpdate?.({
      title: editedTitle,
      content: editedContent,
      metadata: {
        ...data.metadata,
        updatedAt: new Date().toISOString(),
        wordCount,
      },
    })
    setEditMode(false)
    toast.success("Document saved")
  }

  const handleCancel = () => {
    setEditedTitle(data.title)
    setEditedContent(data.content)
    setEditMode(false)
  }

  const insertMarkdown = (syntax: string, placeholder = "text") => {
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = editedContent.substring(start, end) || placeholder
    const before = editedContent.substring(0, start)
    const after = editedContent.substring(end)

    let newText = ""
    let cursorOffset = 0

    switch (syntax) {
      case "bold":
        newText = `${before}**${selectedText}**${after}`
        cursorOffset = start + 2
        break
      case "italic":
        newText = `${before}_${selectedText}_${after}`
        cursorOffset = start + 1
        break
      case "h1":
        newText = `${before}# ${selectedText}${after}`
        cursorOffset = start + 2
        break
      case "h2":
        newText = `${before}## ${selectedText}${after}`
        cursorOffset = start + 3
        break
      case "list":
        newText = `${before}- ${selectedText}${after}`
        cursorOffset = start + 2
        break
      case "checklist":
        newText = `${before}- [ ] ${selectedText}${after}`
        cursorOffset = start + 6
        break
      case "code":
        newText = `${before}\`${selectedText}\`${after}`
        cursorOffset = start + 1
        break
      default:
        return
    }

    setEditedContent(newText)
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(cursorOffset, cursorOffset + selectedText.length)
    }, 0)
  }

  return (
    <Card
      className={`h-full bg-gradient-to-br from-background to-muted/20 border-border/50 ${isFullscreen ? "fixed inset-0 z-50 rounded-none" : ""}`}
    >
      <div className="h-full flex flex-col">
        {/* Document Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <FileText className="h-5 w-5 text-primary flex-shrink-0" />
            {editMode ? (
              <Input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className={`font-medium bg-transparent border-none p-0 h-auto focus-visible:ring-0 ${isMobile ? "min-h-[48px]" : ""}`}
                placeholder="Document title..."
              />
            ) : (
              <h3 className="font-medium truncate">{data.title}</h3>
            )}
            <Badge variant="secondary" className="text-xs flex-shrink-0">
              Document
            </Badge>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Auto-save indicator */}
            {autoSaving && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs text-muted-foreground flex items-center gap-1"
              >
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Saving...
              </motion.div>
            )}

            {/* Word count */}
            {editMode && (
              <Badge variant="outline" className="text-xs">
                {wordCount} words
              </Badge>
            )}

            {data.metadata?.updatedAt && !editMode && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {new Date(data.metadata.updatedAt).toLocaleDateString()}
              </div>
            )}

            {collaboratingAgents.length > 0 && (
              <div className="flex -space-x-1">
                {collaboratingAgents.map((agent, index) => (
                  <motion.div
                    key={agent}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-medium animate-pulse"
                    style={{ zIndex: 10 - index }}
                  >
                    {agent.charAt(0)}
                  </motion.div>
                ))}
              </div>
            )}

            {editMode ? (
              <div className="flex items-center gap-1">
                <Button size="sm" onClick={handleSave} className={`h-7 ${isMobile ? "min-h-[44px]" : ""}`}>
                  <Save className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleCancel}
                  className={`h-7 ${isMobile ? "min-h-[44px]" : ""}`}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setEditMode(true)}
                  className={`h-7 ${isMobile ? "min-h-[44px]" : ""}`}
                >
                  <Edit3 className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className={`h-7 ${isMobile ? "min-h-[44px]" : ""}`}
                >
                  <Maximize2 className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Rich Text Toolbar */}
        {editMode && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="border-b border-border/50 bg-muted/20"
          >
            <div className={`flex items-center gap-1 p-2 ${isMobile ? "overflow-x-auto" : "flex-wrap"}`}>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => insertMarkdown("bold")}
                className={`${isMobile ? "min-h-[44px] min-w-[44px]" : "h-8 w-8"} p-0`}
                title="Bold"
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => insertMarkdown("italic")}
                className={`${isMobile ? "min-h-[44px] min-w-[44px]" : "h-8 w-8"} p-0`}
                title="Italic"
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => insertMarkdown("h1")}
                className={`${isMobile ? "min-h-[44px] min-w-[44px]" : "h-8 w-8"} p-0`}
                title="Heading 1"
              >
                <Heading1 className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => insertMarkdown("h2")}
                className={`${isMobile ? "min-h-[44px] min-w-[44px]" : "h-8 w-8"} p-0`}
                title="Heading 2"
              >
                <Heading2 className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => insertMarkdown("list")}
                className={`${isMobile ? "min-h-[44px] min-w-[44px]" : "h-8 w-8"} p-0`}
                title="List"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => insertMarkdown("checklist")}
                className={`${isMobile ? "min-h-[44px] min-w-[44px]" : "h-8 w-8"} p-0`}
                title="Checklist"
              >
                <CheckIcon className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => insertMarkdown("code")}
                className={`${isMobile ? "min-h-[44px]" : "h-8"} gap-1`}
              >
                <Code className="h-4 w-4" />
              </Button>

              <Separator orientation="vertical" className="h-6 mx-2" />

              <Button
                size="sm"
                variant={showPreview ? "default" : "ghost"}
                onClick={() => setShowPreview(!showPreview)}
                className={`${isMobile ? "min-h-[44px]" : "h-8"} gap-1`}
              >
                <Eye className="h-4 w-4" />
                {!isMobile && "Preview"}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Document Content */}
        <div className="flex-1 overflow-auto p-6">
          {editMode ? (
            showPreview ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="prose prose-sm max-w-none dark:prose-invert"
              >
                <div className="whitespace-pre-wrap leading-relaxed">
                  {editedContent || "Start writing your document..."}
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full">
                <Textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className={`h-full min-h-[400px] resize-none bg-transparent border-none p-0 focus-visible:ring-0 ${isMobile ? "min-h-[48px] text-base" : ""}`}
                  placeholder="Start writing your document..."
                />
              </motion.div>
            )
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="prose prose-sm max-w-none dark:prose-invert"
            >
              <div className="whitespace-pre-wrap leading-relaxed">
                {data.content || "This document is empty. Click edit to add content."}
              </div>
            </motion.div>
          )}
        </div>

        {/* Document Sections */}
        {data.sections && data.sections.length > 0 && (
          <div className="border-t border-border/50 p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium">Sections</h4>
              <Button size="sm" variant="ghost" className="h-6 text-xs">
                <Plus className="h-3 w-3 mr-1" />
                Add Section
              </Button>
            </div>
            <div className="space-y-2">
              {data.sections
                .sort((a, b) => a.order - b.order)
                .map((section, index) => (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2 p-2 rounded bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <div className="w-1 h-4 bg-primary rounded-full" />
                    <span className="text-sm font-medium">{section.title}</span>
                    <Badge variant="outline" className="text-xs ml-auto">
                      {section.content.length} chars
                    </Badge>
                  </motion.div>
                ))}
            </div>
          </div>
        )}

        {/* Document Tags */}
        {data.metadata?.tags && data.metadata.tags.length > 0 && (
          <div className="border-t border-border/50 p-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-muted-foreground">Tags:</span>
              {data.metadata.tags.map((tag, index) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Badge variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

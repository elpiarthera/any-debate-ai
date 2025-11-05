"use client"

import type React from "react"

import { useState } from "react"
import { useDevice } from "@/contexts/DeviceProvider"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Plus, FileText, LinkIcon } from "lucide-react"

interface AddMemoryFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (memory: MemoryFormData) => void
  userRole?: "admin" | "member"
}

interface MemoryFormData {
  title: string
  category: string
  content: string
  tags: string[]
  scope: "organization" | "workspace" | "user" | "chat"
  source: "manual" | "document" | "url"
  sourceUrl?: string
}

const CATEGORIES = [
  "Technical",
  "Business",
  "Personal",
  "Project",
  "Research",
  "Meeting Notes",
  "Documentation",
  "Other",
]

export function AddMemoryForm({ isOpen, onClose, onSubmit, userRole = "member" }: AddMemoryFormProps) {
  const { isMobile } = useDevice()
  const [formData, setFormData] = useState<MemoryFormData>({
    title: "",
    category: "",
    content: "",
    tags: [],
    scope: userRole === "admin" ? "workspace" : "user",
    source: "manual",
    sourceUrl: "",
  })
  const [tagInput, setTagInput] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      })
      setTagInput("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    })
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.category) {
      newErrors.category = "Category is required"
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required"
    }

    if (formData.source === "url" && !formData.sourceUrl?.trim()) {
      newErrors.sourceUrl = "Source URL is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
      // Reset form
      setFormData({
        title: "",
        category: "",
        content: "",
        tags: [],
        scope: userRole === "admin" ? "workspace" : "user",
        source: "manual",
        sourceUrl: "",
      })
      setTagInput("")
      setErrors({})
      onClose()
    }
  }

  return (
    <AdaptiveModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Memory"
      description="Create a new memory entry for your AI agents"
    >
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">
            Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="title"
            placeholder="Enter memory title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className={`min-h-[48px] ${errors.title ? "border-destructive" : ""}`}
          />
          {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="category">
            Category <span className="text-destructive">*</span>
          </Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger id="category" className={`min-h-[48px] ${errors.category ? "border-destructive" : ""}`}>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
        </div>

        {/* Scope Selector */}
        <div className="space-y-2">
          <Label htmlFor="scope">Memory Scope</Label>
          <Select value={formData.scope} onValueChange={(value: any) => setFormData({ ...formData, scope: value })}>
            <SelectTrigger id="scope" className="min-h-[48px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {userRole === "admin" && (
                <>
                  <SelectItem value="organization">Organization (Shared with all workspaces)</SelectItem>
                  <SelectItem value="workspace">Workspace (Shared with workspace members)</SelectItem>
                </>
              )}
              <SelectItem value="user">User (Private to you)</SelectItem>
              <SelectItem value="chat">Chat (Session-specific, temporary)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            {formData.scope === "organization" && "Visible to all members across all workspaces"}
            {formData.scope === "workspace" && "Visible to all members in this workspace"}
            {formData.scope === "user" && "Only visible to you"}
            {formData.scope === "chat" && "Temporary memory for this debate session"}
          </p>
        </div>

        {/* Source Type */}
        <div className="space-y-2">
          <Label>Source Type</Label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant={formData.source === "manual" ? "default" : "outline"}
              onClick={() => setFormData({ ...formData, source: "manual" })}
              className="min-h-[44px] flex-1"
            >
              <FileText className="h-4 w-4 mr-2" />
              Manual
            </Button>
            <Button
              type="button"
              variant={formData.source === "document" ? "default" : "outline"}
              onClick={() => setFormData({ ...formData, source: "document" })}
              className="min-h-[44px] flex-1"
            >
              <FileText className="h-4 w-4 mr-2" />
              Document
            </Button>
            <Button
              type="button"
              variant={formData.source === "url" ? "default" : "outline"}
              onClick={() => setFormData({ ...formData, source: "url" })}
              className="min-h-[44px] flex-1"
            >
              <LinkIcon className="h-4 w-4 mr-2" />
              URL
            </Button>
          </div>
        </div>

        {/* Source URL (if source is URL) */}
        {formData.source === "url" && (
          <div className="space-y-2">
            <Label htmlFor="sourceUrl">
              Source URL <span className="text-destructive">*</span>
            </Label>
            <Input
              id="sourceUrl"
              type="url"
              placeholder="https://example.com/document"
              value={formData.sourceUrl}
              onChange={(e) => setFormData({ ...formData, sourceUrl: e.target.value })}
              className={`min-h-[48px] ${errors.sourceUrl ? "border-destructive" : ""}`}
            />
            {errors.sourceUrl && <p className="text-sm text-destructive">{errors.sourceUrl}</p>}
          </div>
        )}

        {/* Content */}
        <div className="space-y-2">
          <Label htmlFor="content">
            Content <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="content"
            placeholder="Enter memory content (Markdown supported)"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className={`min-h-[120px] md:min-h-[160px] ${errors.content ? "border-destructive" : ""}`}
          />
          {errors.content && <p className="text-sm text-destructive">{errors.content}</p>}
          <p className="text-xs text-muted-foreground">Supports Markdown formatting</p>
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
          <div className="flex gap-2">
            <Input
              id="tags"
              placeholder="Add tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleAddTag()
                }
              }}
              className="min-h-[48px] flex-1"
            />
            <Button
              type="button"
              onClick={handleAddTag}
              variant="outline"
              className="min-h-[48px] min-w-[48px] bg-transparent"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  {tag}
                  <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-1 hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="min-h-[44px] flex-1 bg-transparent">
            Cancel
          </Button>
          <Button type="submit" className="min-h-[44px] flex-1">
            Save Memory
          </Button>
        </div>
      </form>
    </AdaptiveModal>
  )
}

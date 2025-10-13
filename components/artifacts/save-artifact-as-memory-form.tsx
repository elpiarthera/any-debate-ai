"use client"

import { useState } from "react"
import { useDevice } from "@/contexts/DeviceProvider"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Save, FileText, BarChart, Table, CheckSquare } from "lucide-react"
import { Card } from "@/components/ui/card"

interface SaveArtifactAsMemoryFormProps {
  isOpen: boolean
  onClose: () => void
  artifact: {
    id: string
    type: "document" | "chart" | "table" | "checklist"
    title: string
    content: string
    preview?: string
  }
  userRole?: "admin" | "member"
}

// Mock AI-extracted learnings
const mockLearnings = [
  "Key insight from the artifact content",
  "Important pattern or finding",
  "Actionable recommendation",
]

export function SaveArtifactAsMemoryForm({
  isOpen,
  onClose,
  artifact,
  userRole = "member",
}: SaveArtifactAsMemoryFormProps) {
  const { isMobile } = useDevice()
  const [title, setTitle] = useState(artifact.title)
  const [learnings, setLearnings] = useState<string[]>(mockLearnings)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editValue, setEditValue] = useState("")
  const [scope, setScope] = useState<"user" | "workspace" | "organization">("user")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const handleEditLearning = (index: number) => {
    setEditingIndex(index)
    setEditValue(learnings[index])
  }

  const handleSaveLearning = () => {
    if (editingIndex !== null && editValue.trim()) {
      const newLearnings = [...learnings]
      newLearnings[editingIndex] = editValue.trim()
      setLearnings(newLearnings)
      setEditingIndex(null)
      setEditValue("")
    }
  }

  const handleRemoveLearning = (index: number) => {
    setLearnings(learnings.filter((_, i) => i !== index))
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    onClose()
  }

  const getArtifactIcon = () => {
    switch (artifact.type) {
      case "document":
        return <FileText className="h-5 w-5" />
      case "chart":
        return <BarChart className="h-5 w-5" />
      case "table":
        return <Table className="h-5 w-5" />
      case "checklist":
        return <CheckSquare className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  return (
    <AdaptiveModal
      isOpen={isOpen}
      onClose={onClose}
      title="Save Artifact as Memory"
      description="Extract learnings from this artifact and save to memory"
    >
      <div className={`space-y-4 ${isMobile ? "" : "md:space-y-6"}`}>
        {/* Artifact Preview */}
        <Card className="p-4">
          <div className="flex items-start gap-3">
            <div className="text-muted-foreground">{getArtifactIcon()}</div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm md:text-base truncate">{artifact.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground mt-1 line-clamp-2">
                {artifact.preview || artifact.content}
              </p>
              <Badge variant="secondary" className="mt-2 text-xs">
                {artifact.type}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm md:text-base">
            Memory Title
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a descriptive title"
            className="min-h-[48px]"
          />
        </div>

        {/* AI-Extracted Learnings */}
        <div className="space-y-2">
          <Label className="text-sm md:text-base">AI-Extracted Learnings</Label>
          <p className="text-xs md:text-sm text-muted-foreground">
            Review and edit the key insights extracted from this artifact
          </p>
          <div className="space-y-2">
            {learnings.map((learning, index) => (
              <Card key={index} className="p-3">
                {editingIndex === index ? (
                  <div className="space-y-2">
                    <Textarea
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="min-h-[80px]"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleSaveLearning} className="min-h-[44px]">
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingIndex(null)
                          setEditValue("")
                        }}
                        className="min-h-[44px]"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2">
                    <p className="flex-1 text-sm">{learning}</p>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditLearning(index)}
                        className="min-h-[44px] min-w-[44px] p-2"
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveLearning(index)}
                        className="min-h-[44px] min-w-[44px] p-2"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Scope Selector */}
        <div className="space-y-2">
          <Label htmlFor="scope" className="text-sm md:text-base">
            Memory Scope
          </Label>
          <Select value={scope} onValueChange={(value: any) => setScope(value)}>
            <SelectTrigger id="scope" className="min-h-[48px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">Personal (Only visible to you)</SelectItem>
              {userRole === "admin" && (
                <>
                  <SelectItem value="workspace">Workspace (Shared with workspace members)</SelectItem>
                  <SelectItem value="organization">Organization (Shared with entire organization)</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <Label htmlFor="tags" className="text-sm md:text-base">
            Tags
          </Label>
          <div className="flex gap-2">
            <Input
              id="tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleAddTag()
                }
              }}
              placeholder="Add tags..."
              className="min-h-[48px]"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleAddTag}
              className="min-h-[44px] min-w-[44px] bg-transparent"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  {tag}
                  <button onClick={() => handleRemoveTag(tag)} className="ml-1 hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className={`flex gap-3 ${isMobile ? "flex-col" : "justify-end"}`}>
          <Button variant="outline" onClick={onClose} disabled={isSaving} className="min-h-[44px] bg-transparent">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving || !title.trim() || learnings.length === 0}
            className="min-h-[44px]"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save to Memory"}
          </Button>
        </div>
      </div>
    </AdaptiveModal>
  )
}

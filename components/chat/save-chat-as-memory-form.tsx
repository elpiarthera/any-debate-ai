"use client"

import { useState } from "react"
import { useDevice } from "@/contexts/DeviceProvider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { X, Plus, Edit2, Check } from "lucide-react"

interface ChatInsight {
  title: string
  category: string
  content: string
  tags: string[]
}

interface SaveChatAsMemoryFormProps {
  chatSummary?: string
  extractedInsights?: ChatInsight[]
  onSave?: (data: any) => void
  onCancel?: () => void
}

export function SaveChatAsMemoryForm({
  chatSummary = "Discussion about implementing memory system with focus on organization-level sharing and AI-powered extraction.",
  extractedInsights = [
    {
      title: "Feature Prioritization Decision",
      category: "Debate Insights",
      content: "Team agreed to prioritize memory system over marketplace",
      tags: ["decision", "roadmap"],
    },
  ],
  onSave,
  onCancel,
}: SaveChatAsMemoryFormProps) {
  const { isMobile } = useDevice()
  const [insights, setInsights] = useState<ChatInsight[]>(extractedInsights)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [scope, setScope] = useState<"organization" | "workspace" | "user">("user")
  const [newTag, setNewTag] = useState("")

  // Mock user role - in real app, get from auth context
  const isAdmin = true

  const handleEditInsight = (index: number, field: keyof ChatInsight, value: string) => {
    const updated = [...insights]
    updated[index] = { ...updated[index], [field]: value }
    setInsights(updated)
  }

  const handleAddTag = (insightIndex: number) => {
    if (!newTag.trim()) return
    const updated = [...insights]
    updated[insightIndex].tags.push(newTag.trim())
    setInsights(updated)
    setNewTag("")
  }

  const handleRemoveTag = (insightIndex: number, tagIndex: number) => {
    const updated = [...insights]
    updated[insightIndex].tags.splice(tagIndex, 1)
    setInsights(updated)
  }

  const handleSave = () => {
    onSave?.({
      scope,
      insights,
      chatSummary,
    })
  }

  return (
    <div className={`space-y-4 ${isMobile ? "p-4" : "p-6"}`}>
      {/* Chat Summary */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Chat Summary</Label>
        <Card className="p-3 bg-muted/50">
          <p className="text-sm text-muted-foreground">{chatSummary}</p>
        </Card>
      </div>

      {/* Extracted Insights */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">AI-Extracted Insights</Label>
        <p className="text-xs text-muted-foreground">Review and edit the insights extracted from this conversation</p>

        <div className="space-y-3">
          {insights.map((insight, index) => (
            <Card key={index} className="p-4 space-y-3">
              {/* Title */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-muted-foreground">Title</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                  >
                    {editingIndex === index ? <Check className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
                  </Button>
                </div>
                {editingIndex === index ? (
                  <Input
                    value={insight.title}
                    onChange={(e) => handleEditInsight(index, "title", e.target.value)}
                    className="min-h-[48px]"
                  />
                ) : (
                  <p className="text-sm font-medium">{insight.title}</p>
                )}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Category</Label>
                {editingIndex === index ? (
                  <Select
                    value={insight.category}
                    onValueChange={(value) => handleEditInsight(index, "category", value)}
                  >
                    <SelectTrigger className="min-h-[48px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Debate Insights">Debate Insights</SelectItem>
                      <SelectItem value="Technical">Technical</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Personal">Personal</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge variant="secondary">{insight.category}</Badge>
                )}
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Content</Label>
                {editingIndex === index ? (
                  <Textarea
                    value={insight.content}
                    onChange={(e) => handleEditInsight(index, "content", e.target.value)}
                    className="min-h-[80px] resize-none"
                  />
                ) : (
                  <p className="text-sm">{insight.content}</p>
                )}
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Tags</Label>
                <div className="flex flex-wrap gap-2">
                  {insight.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="gap-1 pr-1">
                      {tag}
                      {editingIndex === index && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => handleRemoveTag(index, tagIndex)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </Badge>
                  ))}
                  {editingIndex === index && (
                    <div className="flex gap-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add tag"
                        className="h-8 w-24 text-xs"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            handleAddTag(index)
                          }
                        }}
                      />
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleAddTag(index)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Scope Selector */}
      <div className="space-y-2">
        <Label htmlFor="scope" className="text-sm font-medium">
          Memory Scope
        </Label>
        <Select value={scope} onValueChange={(value: any) => setScope(value)}>
          <SelectTrigger id="scope" className="min-h-[48px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {isAdmin && (
              <>
                <SelectItem value="organization">Organization - Shared across all workspaces</SelectItem>
                <SelectItem value="workspace">Workspace - Shared within current workspace</SelectItem>
              </>
            )}
            <SelectItem value="user">User - Private to you only</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          {scope === "organization" && "All members can access this memory"}
          {scope === "workspace" && "Workspace members can access this memory"}
          {scope === "user" && "Only you can access this memory"}
        </p>
      </div>

      {/* Action Buttons */}
      <div className={`flex gap-3 pt-4 ${isMobile ? "flex-col" : "flex-row justify-end"}`}>
        <Button variant="outline" onClick={onCancel} className="min-h-[44px] bg-transparent">
          Cancel
        </Button>
        <Button onClick={handleSave} className="min-h-[44px]">
          Save as Memory
        </Button>
      </div>
    </div>
  )
}

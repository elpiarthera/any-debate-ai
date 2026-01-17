"use client"

import { useState, useMemo } from "react"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Save, X, Plus, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { TemplateStorage } from "@/lib/templates/storage"
import { validateTemplate } from "@/lib/templates/utils"
import type { DebateTemplate, TemplateCategory } from "@/lib/templates/types"
import type { AgentConfigurationDraft } from "@/lib/agent-config/types"

interface SaveTemplateModalProps {
  isOpen: boolean
  onClose: () => void
  agents: Array<{
    id: string
    name: string
    config?: AgentConfigurationDraft
  }>
  currentTopic?: string
}

const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  "General Purpose",
  "Business Strategy",
  "Product Development",
  "Technology & Engineering",
  "Creative & Design",
  "Research & Analysis",
  "Education & Training",
  "Healthcare & Science",
]

const CONVERSATION_TYPES = ["debate", "collaboration", "analysis"] as const

const SUGGESTED_TAGS: Record<TemplateCategory, string[]> = {
  "General Purpose": ["versatile", "flexible", "multi-use", "starter"],
  "Business Strategy": ["strategy", "planning", "growth", "competitive"],
  "Product Development": ["product", "innovation", "roadmap", "features"],
  "Technology & Engineering": ["technical", "architecture", "development", "engineering"],
  "Creative & Design": ["creative", "design", "brainstorming", "ideation"],
  "Research & Analysis": ["research", "data", "analysis", "insights"],
  "Education & Training": ["learning", "education", "training", "teaching"],
  "Healthcare & Science": ["healthcare", "medical", "scientific", "clinical"],
}

export function SaveTemplateModal({ isOpen, onClose, agents, currentTopic }: SaveTemplateModalProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState<TemplateCategory>("General Purpose")
  const [conversationType, setConversationType] = useState<"debate" | "collaboration" | "analysis">("debate")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [includeCurrentTopic, setIncludeCurrentTopic] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  const agentsWithConfig = agents.filter((a) => a.config)

  const suggestedTags = useMemo(() => {
    const categoryTags = SUGGESTED_TAGS[category] || []
    return categoryTags.filter((tag) => !tags.includes(tag))
  }, [category, tags])

  const isFormValid = useMemo(() => {
    const errors: string[] = []
    if (!name.trim()) errors.push("Template name is required")
    if (name.length < 3) errors.push("Template name must be at least 3 characters")
    if (!description.trim()) errors.push("Description is required")
    if (description.length < 10) errors.push("Description must be at least 10 characters")
    if (agentsWithConfig.length === 0) errors.push("At least one configured agent is required")
    setValidationErrors(errors)
    return errors.length === 0
  }, [name, description, agentsWithConfig.length])

  const handleAddTag = (tag?: string) => {
    const trimmedTag = (tag || tagInput).trim().toLowerCase()
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 5) {
      setTags([...tags, trimmedTag])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSave = async () => {
    if (agentsWithConfig.length === 0) {
      toast.error("No configured agents to save")
      return
    }

    const template: DebateTemplate = {
      id: `custom-${Date.now()}`,
      name,
      description,
      category,
      conversationType,
      agents: agentsWithConfig.map((a) => a.config!),
      topic: includeCurrentTopic ? currentTopic : undefined,
      metadata: {
        createdAt: new Date(),
        updatedAt: new Date(),
        isCustom: true,
        tags,
      },
    }

    const validation = validateTemplate(template)
    if (!validation.isValid) {
      toast.error(validation.errors[0])
      return
    }

    setIsSaving(true)
    try {
      TemplateStorage.saveCustomTemplate(template)
      toast.success(`Template "${name}" saved successfully!`)
      onClose()
      // Reset form
      setName("")
      setDescription("")
      setCategory("General Purpose")
      setConversationType("debate")
      setTags([])
      setIncludeCurrentTopic(false)
      setValidationErrors([])
    } catch (error) {
      toast.error("Failed to save template")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <AdaptiveModal
      isOpen={isOpen}
      onClose={onClose}
      title="Save as Template"
      description="Save your current agent configuration for future use"
      className="max-w-2xl"
    >
      <div className="space-y-6 py-4">
        {!isFormValid && (name || description) && (
          <Card className="border-yellow-500/50 bg-yellow-500/10">
            <CardContent className="p-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
                    Please complete the following:
                  </p>
                  <ul className="text-xs text-yellow-800 dark:text-yellow-200 space-y-0.5">
                    {validationErrors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {isFormValid && (
          <Card className="border-green-500/50 bg-green-500/10">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <p className="text-sm font-medium text-green-900 dark:text-green-100">Template is ready to save!</p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-2">
          <Label htmlFor="template-name">Template Name *</Label>
          <Input
            id="template-name"
            placeholder="e.g., Product Strategy Team"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
            className={!name.trim() && name ? "border-yellow-500" : ""}
          />
          <p className="text-xs text-muted-foreground">{name.length}/50 characters</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="template-description">Description *</Label>
          <Textarea
            id="template-description"
            placeholder="Describe what this template is best used for..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            maxLength={200}
            className={!description.trim() && description ? "border-yellow-500" : ""}
          />
          <p className="text-xs text-muted-foreground">{description.length}/200 characters</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="template-category">Category *</Label>
            <Select value={category} onValueChange={(value) => setCategory(value as TemplateCategory)}>
              <SelectTrigger id="template-category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TEMPLATE_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="conversation-type">Conversation Type *</Label>
            <Select
              value={conversationType}
              onValueChange={(value) => setConversationType(value as typeof conversationType)}
            >
              <SelectTrigger id="conversation-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CONVERSATION_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    <span className="capitalize">{type}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="template-tags">Tags (optional)</Label>
          <div className="flex gap-2">
            <Input
              id="template-tags"
              placeholder="Add a tag..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleAddTag()
                }
              }}
              maxLength={20}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleAddTag()}
              disabled={tags.length >= 5}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  #{tag}
                  <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-1 hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {suggestedTags.length > 0 && tags.length < 5 && (
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Suggested tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestedTags.slice(0, 5 - tags.length).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10 transition-colors"
                    onClick={() => handleAddTag(tag)}
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          <p className="text-xs text-muted-foreground">Maximum 5 tags, press Enter to add</p>
        </div>

        {currentTopic && (
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
            <input
              type="checkbox"
              id="include-topic"
              checked={includeCurrentTopic}
              onChange={(e) => setIncludeCurrentTopic(e.target.checked)}
              className="h-4 w-4 rounded border-input"
            />
            <Label htmlFor="include-topic" className="cursor-pointer text-sm">
              Include current topic: "{currentTopic}"
            </Label>
          </div>
        )}

        <div className="space-y-2">
          <Label>Agents in Template ({agentsWithConfig.length})</Label>
          <Card>
            <CardContent className="p-3 space-y-2">
              {agentsWithConfig.length === 0 ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <AlertCircle className="h-4 w-4" />
                  <span>No configured agents to save</span>
                </div>
              ) : (
                agentsWithConfig.map((agent, index) => (
                  <div key={index} className="flex items-start gap-3 text-sm p-2 rounded-lg bg-muted/50">
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                    <div className="flex-1 space-y-1">
                      <span className="font-medium">{agent.name}</span>
                      {agent.config && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Badge variant="outline" className="text-xs h-5">
                            {agent.config.roleId}
                          </Badge>
                          <Badge variant="outline" className="text-xs h-5">
                            {agent.config.personaId}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!isFormValid || isSaving} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Template"}
          </Button>
        </div>
      </div>
    </AdaptiveModal>
  )
}

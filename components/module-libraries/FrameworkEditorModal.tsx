"use client"

import { useState } from "react"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { ThinkingFramework } from "@/lib/agent-config/frameworks"
import { X, Plus } from "lucide-react"

interface FrameworkEditorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  framework?: ThinkingFramework
  onSave: (framework: Omit<ThinkingFramework, "id"> | ThinkingFramework) => void
  mode: "create" | "edit"
}

export function FrameworkEditorModal({ open, onOpenChange, framework, onSave, mode }: FrameworkEditorModalProps) {
  const [formData, setFormData] = useState<Omit<ThinkingFramework, "id">>({
    name: framework?.name || "",
    icon: framework?.icon || "🧠",
    description: framework?.description || "",
    methodology: framework?.methodology || "",
    bestFor: framework?.bestFor || [],
    steps: framework?.steps || [],
    systemPromptModifier: framework?.systemPromptModifier || "",
  })
  const [newBestFor, setNewBestFor] = useState("")
  const [newStep, setNewStep] = useState("")

  const handleSave = () => {
    if (mode === "edit" && framework) {
      onSave({ ...formData, id: framework.id })
    } else {
      onSave(formData)
    }
    onOpenChange(false)
  }

  const addBestFor = () => {
    if (newBestFor.trim() && !formData.bestFor.includes(newBestFor.trim())) {
      setFormData({ ...formData, bestFor: [...formData.bestFor, newBestFor.trim()] })
      setNewBestFor("")
    }
  }

  const removeBestFor = (item: string) => {
    setFormData({ ...formData, bestFor: formData.bestFor.filter((b) => b !== item) })
  }

  const addStep = () => {
    if (newStep.trim()) {
      setFormData({ ...formData, steps: [...formData.steps, newStep.trim()] })
      setNewStep("")
    }
  }

  const removeStep = (index: number) => {
    setFormData({ ...formData, steps: formData.steps.filter((_, i) => i !== index) })
  }

  return (
    <AdaptiveModal
      open={open}
      onOpenChange={onOpenChange}
      title={mode === "create" ? "Create New Framework" : "Edit Framework"}
      description={
        mode === "create" ? "Define a new thinking framework for your AI agents" : "Update framework details"
      }
    >
      <div className="space-y-4 p-4 md:p-6">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground">
            Framework Name
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Design Thinking, First Principles"
            className="min-h-[48px] bg-input border-border"
          />
        </div>

        {/* Icon */}
        <div className="space-y-2">
          <Label htmlFor="icon" className="text-foreground">
            Icon (Emoji)
          </Label>
          <Input
            id="icon"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            placeholder="🧠"
            className="min-h-[48px] bg-input border-border"
            maxLength={2}
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-foreground">
            Description
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe the framework's approach and purpose"
            className="min-h-[96px] bg-input border-border resize-none"
          />
        </div>

        {/* Methodology */}
        <div className="space-y-2">
          <Label htmlFor="methodology" className="text-foreground">
            Methodology
          </Label>
          <Input
            id="methodology"
            value={formData.methodology}
            onChange={(e) => setFormData({ ...formData, methodology: e.target.value })}
            placeholder="e.g., Empathize → Define → Ideate → Prototype → Test"
            className="min-h-[48px] bg-input border-border"
          />
        </div>

        {/* Best For */}
        <div className="space-y-2">
          <Label htmlFor="bestFor" className="text-foreground">
            Best For (Use Cases)
          </Label>
          <div className="flex gap-2">
            <Input
              id="bestFor"
              value={newBestFor}
              onChange={(e) => setNewBestFor(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addBestFor())}
              placeholder="Add use case"
              className="min-h-[48px] bg-input border-border flex-1"
            />
            <Button
              type="button"
              onClick={addBestFor}
              className="min-h-[48px] min-w-[48px] bg-primary text-primary-foreground"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.bestFor.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {item}
                <button type="button" onClick={() => removeBestFor(item)} className="ml-1 hover:text-primary/70">
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-2">
          <Label htmlFor="steps" className="text-foreground">
            Framework Steps
          </Label>
          <div className="flex gap-2">
            <Input
              id="steps"
              value={newStep}
              onChange={(e) => setNewStep(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addStep())}
              placeholder="Add framework step"
              className="min-h-[48px] bg-input border-border flex-1"
            />
            <Button
              type="button"
              onClick={addStep}
              className="min-h-[48px] min-w-[48px] bg-primary text-primary-foreground"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2 mt-2">
            {formData.steps.map((step, index) => (
              <div key={index} className="flex items-start gap-2 p-3 rounded-lg bg-card border border-border">
                <span className="text-sm text-muted-foreground font-mono">{index + 1}.</span>
                <span className="flex-1 text-sm text-foreground">{step}</span>
                <button
                  type="button"
                  onClick={() => removeStep(index)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* System Prompt Modifier */}
        <div className="space-y-2">
          <Label htmlFor="systemPromptModifier" className="text-foreground">
            System Prompt Modifier
          </Label>
          <Textarea
            id="systemPromptModifier"
            value={formData.systemPromptModifier}
            onChange={(e) => setFormData({ ...formData, systemPromptModifier: e.target.value })}
            placeholder="Instructions to apply this framework in AI responses"
            className="min-h-[120px] bg-input border-border resize-none font-mono text-sm"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 min-h-[48px] bg-transparent border-border"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!formData.name || !formData.description}
            className="flex-1 min-h-[48px] bg-primary text-primary-foreground"
          >
            {mode === "create" ? "Create Framework" : "Save Changes"}
          </Button>
        </div>
      </div>
    </AdaptiveModal>
  )
}

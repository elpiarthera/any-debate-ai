"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Persona } from "@/lib/agent-config/personas"
import { X } from "lucide-react"

interface PersonaFormProps {
  persona?: Persona
  onSave: (persona: Omit<Persona, "id"> | Persona) => void
  onCancel: () => void
  mode: "create" | "edit"
}

export function PersonaForm({ persona, onSave, onCancel, mode }: PersonaFormProps) {
  const [formData, setFormData] = useState<Omit<Persona, "id">>({
    name: persona?.name || "",
    icon: persona?.icon || "😊",
    description: persona?.description || "",
    traits: persona?.traits || [],
    communicationStyle: persona?.communicationStyle || "",
    decisionMaking: persona?.decisionMaking || "",
    systemPromptModifier: persona?.systemPromptModifier || "",
  })
  const [newTrait, setNewTrait] = useState("")

  const handleSave = () => {
    if (mode === "edit" && persona) {
      onSave({ ...formData, id: persona.id })
    } else {
      onSave(formData)
    }
  }

  const addTrait = () => {
    if (newTrait.trim() && !formData.traits.includes(newTrait.trim())) {
      setFormData({ ...formData, traits: [...formData.traits, newTrait.trim()] })
      setNewTrait("")
    }
  }

  const removeTrait = (trait: string) => {
    setFormData({ ...formData, traits: formData.traits.filter((t) => t !== trait) })
  }

  return (
    <div className="space-y-4">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-foreground">
          Persona Name
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., Analytical, Creative, Empathetic"
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
          placeholder="😊"
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
          placeholder="Describe the personality style and approach"
          className="min-h-[96px] bg-input border-border resize-none"
        />
      </div>

      {/* Traits */}
      <div className="space-y-2">
        <Label htmlFor="traits" className="text-foreground">
          Personality Traits
        </Label>
        <div className="flex gap-2">
          <Input
            id="traits"
            value={newTrait}
            onChange={(e) => setNewTrait(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTrait())}
            placeholder="Add personality trait"
            className="min-h-[48px] bg-input border-border flex-1"
          />
          <Button
            type="button"
            onClick={addTrait}
            className="min-h-[48px] min-w-[48px] bg-primary text-primary-foreground"
          >
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.traits.map((trait) => (
            <span
              key={trait}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
            >
              {trait}
              <button type="button" onClick={() => removeTrait(trait)} className="ml-1 hover:text-primary/70">
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Communication Style */}
      <div className="space-y-2">
        <Label htmlFor="communicationStyle" className="text-foreground">
          Communication Style
        </Label>
        <Textarea
          id="communicationStyle"
          value={formData.communicationStyle}
          onChange={(e) => setFormData({ ...formData, communicationStyle: e.target.value })}
          placeholder="How does this persona communicate?"
          className="min-h-[96px] bg-input border-border resize-none"
        />
      </div>

      {/* Decision Making */}
      <div className="space-y-2">
        <Label htmlFor="decisionMaking" className="text-foreground">
          Decision Making Approach
        </Label>
        <Textarea
          id="decisionMaking"
          value={formData.decisionMaking}
          onChange={(e) => setFormData({ ...formData, decisionMaking: e.target.value })}
          placeholder="How does this persona make decisions?"
          className="min-h-[96px] bg-input border-border resize-none"
        />
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
          placeholder="Instructions to modify the AI agent's behavior"
          className="min-h-[120px] bg-input border-border resize-none font-mono text-sm"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={onCancel} className="flex-1 min-h-[48px] bg-transparent border-border">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={!formData.name || !formData.description}
          className="flex-1 min-h-[48px] bg-primary text-primary-foreground"
        >
          {mode === "create" ? "Create Persona" : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}

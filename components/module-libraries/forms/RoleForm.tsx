"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { type ProfessionalRole, ROLE_CATEGORIES } from "@/lib/agent-config/roles"
import { X } from "lucide-react"

interface RoleFormProps {
  role?: ProfessionalRole
  onSave: (role: Omit<ProfessionalRole, "id"> | ProfessionalRole) => void
  onCancel: () => void
  mode: "create" | "edit"
}

export function RoleForm({ role, onSave, onCancel, mode }: RoleFormProps) {
  const [formData, setFormData] = useState<Omit<ProfessionalRole, "id">>({
    name: role?.name || "",
    icon: role?.icon || "👤",
    description: role?.description || "",
    category: role?.category || ROLE_CATEGORIES[0],
    expertise: role?.expertise || [],
    systemPrompt: role?.systemPrompt || "",
  })
  const [newExpertise, setNewExpertise] = useState("")

  const handleSave = () => {
    if (mode === "edit" && role) {
      onSave({ ...formData, id: role.id })
    } else {
      onSave(formData)
    }
  }

  const addExpertise = () => {
    if (newExpertise.trim() && !formData.expertise.includes(newExpertise.trim())) {
      setFormData({ ...formData, expertise: [...formData.expertise, newExpertise.trim()] })
      setNewExpertise("")
    }
  }

  const removeExpertise = (skill: string) => {
    setFormData({ ...formData, expertise: formData.expertise.filter((s) => s !== skill) })
  }

  return (
    <div className="space-y-4">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-foreground">
          Role Name
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., CEO, Software Engineer"
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
          placeholder="👤"
          className="min-h-[48px] bg-input border-border"
          maxLength={2}
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category" className="text-foreground">
          Category
        </Label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full min-h-[48px] px-3 rounded-lg bg-input border border-border text-foreground"
        >
          {ROLE_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
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
          placeholder="Describe the role's expertise and responsibilities"
          className="min-h-[96px] bg-input border-border resize-none"
        />
      </div>

      {/* Expertise */}
      <div className="space-y-2">
        <Label htmlFor="expertise" className="text-foreground">
          Expertise Areas
        </Label>
        <div className="flex gap-2">
          <Input
            id="expertise"
            value={newExpertise}
            onChange={(e) => setNewExpertise(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addExpertise())}
            placeholder="Add expertise area"
            className="min-h-[48px] bg-input border-border flex-1"
          />
          <Button
            type="button"
            onClick={addExpertise}
            className="min-h-[48px] min-w-[48px] bg-primary text-primary-foreground"
          >
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.expertise.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
            >
              {skill}
              <button type="button" onClick={() => removeExpertise(skill)} className="ml-1 hover:text-primary/70">
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* System Prompt */}
      <div className="space-y-2">
        <Label htmlFor="systemPrompt" className="text-foreground">
          System Prompt
        </Label>
        <Textarea
          id="systemPrompt"
          value={formData.systemPrompt}
          onChange={(e) => setFormData({ ...formData, systemPrompt: e.target.value })}
          placeholder="Define the AI agent's behavior and instructions"
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
          {mode === "create" ? "Create Role" : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}

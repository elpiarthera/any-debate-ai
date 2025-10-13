"use client"

import type React from "react"

import { useState } from "react"
import { useDevice } from "@/contexts/DeviceProvider"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Building2 } from "lucide-react"

interface CreateOrganizationDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (organization: OrganizationFormData) => void
}

interface OrganizationFormData {
  name: string
  slug: string
  description: string
}

export function CreateOrganizationDialog({ isOpen, onClose, onSubmit }: CreateOrganizationDialogProps) {
  const { isMobile } = useDevice()
  const [formData, setFormData] = useState<OrganizationFormData>({
    name: "",
    slug: "",
    description: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  }

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: generateSlug(name),
    })
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Organization name is required"
    } else if (formData.name.length < 3) {
      newErrors.name = "Organization name must be at least 3 characters"
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "Organization slug is required"
    } else if (formData.slug.length < 3) {
      newErrors.slug = "Organization slug must be at least 3 characters"
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = "Slug can only contain lowercase letters, numbers, and hyphens"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)
      // Mock submission - in real app would call API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      onSubmit(formData)
      // Reset form
      setFormData({
        name: "",
        slug: "",
        description: "",
      })
      setErrors({})
      setIsSubmitting(false)
      onClose()
    }
  }

  const handleClose = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
    })
    setErrors({})
    onClose()
  }

  return (
    <AdaptiveModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create Organization"
      description="Create a new organization to collaborate with your team"
    >
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        {/* Organization Name */}
        <div className="space-y-2">
          <Label htmlFor="org-name">
            Organization Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="org-name"
            placeholder="Acme Corporation"
            value={formData.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className={`min-h-[48px] ${errors.name ? "border-destructive" : ""}`}
            autoFocus={!isMobile}
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          <p className="text-xs text-muted-foreground">The name of your organization as it will appear to members</p>
        </div>

        {/* Organization Slug */}
        <div className="space-y-2">
          <Label htmlFor="org-slug">
            Organization Slug <span className="text-destructive">*</span>
          </Label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">anydebate.ai/</span>
            <Input
              id="org-slug"
              placeholder="acme-corp"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className={`min-h-[48px] flex-1 ${errors.slug ? "border-destructive" : ""}`}
            />
          </div>
          {errors.slug && <p className="text-sm text-destructive">{errors.slug}</p>}
          <p className="text-xs text-muted-foreground">
            A unique identifier for your organization URL (lowercase, numbers, and hyphens only)
          </p>
        </div>

        {/* Organization Description */}
        <div className="space-y-2">
          <Label htmlFor="org-description">Description (Optional)</Label>
          <Textarea
            id="org-description"
            placeholder="Tell us about your organization..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="min-h-[120px] md:min-h-[100px] resize-none"
          />
          <p className="text-xs text-muted-foreground">A brief description of your organization and its purpose</p>
        </div>

        {/* Info Box */}
        <div className="rounded-lg border border-border bg-muted/50 p-4">
          <div className="flex gap-3">
            <Building2 className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium">What happens next?</p>
              <p className="text-sm text-muted-foreground">
                You'll be the owner of this organization and can invite team members, manage settings, and create
                workspaces.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
            className="min-h-[44px] flex-1 bg-transparent"
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="min-h-[44px] flex-1">
            {isSubmitting ? "Creating..." : "Create Organization"}
          </Button>
        </div>
      </form>
    </AdaptiveModal>
  )
}

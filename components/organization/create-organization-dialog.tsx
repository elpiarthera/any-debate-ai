"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

interface CreateOrganizationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateOrganizationDialog({ open, onOpenChange }: CreateOrganizationDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { toast } = useToast()
  const router = useRouter()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Organization name is required"
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "Organization slug is required"
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = "Slug can only contain lowercase letters, numbers, and hyphens"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("[v0] Creating organization:", formData)

      toast({
        title: "Organization created",
        description: `${formData.name} has been successfully created.`,
      })

      // Reset form
      setFormData({ name: "", slug: "", description: "" })
      setErrors({})
      onOpenChange(false)

      // Navigate to the new organization
      router.push(`/dashboard/organization/${formData.slug}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create organization. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleNameChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      name: value,
      // Auto-generate slug from name
      slug: value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim(),
    }))
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: "" }))
    }
  }

  return (
    <AdaptiveModal
      isOpen={open}
      onClose={() => onOpenChange(false)}
      title="Create Organization"
      description="Create a new organization to collaborate with your team"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Organization Name */}
        <div className="space-y-2">
          <Label htmlFor="name">
            Organization Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            placeholder="Acme Corporation"
            value={formData.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="min-h-[48px]"
            disabled={isLoading}
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          <p className="text-xs text-muted-foreground">The name of your organization as it will appear to members</p>
        </div>

        {/* Organization Slug */}
        <div className="space-y-2">
          <Label htmlFor="slug">
            Organization Slug <span className="text-destructive">*</span>
          </Label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">anydebate.ai/</span>
            <Input
              id="slug"
              placeholder="acme-corp"
              value={formData.slug}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, slug: e.target.value }))
                if (errors.slug) {
                  setErrors((prev) => ({ ...prev, slug: "" }))
                }
              }}
              className="min-h-[48px]"
              disabled={isLoading}
            />
          </div>
          {errors.slug && <p className="text-sm text-destructive">{errors.slug}</p>}
          <p className="text-xs text-muted-foreground">
            A unique identifier for your organization URL (lowercase, numbers, and hyphens only)
          </p>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea
            id="description"
            placeholder="Tell us about your organization..."
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            className="min-h-[100px] resize-none"
            disabled={isLoading}
          />
          <p className="text-xs text-muted-foreground">A brief description of your organization and its purpose</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-2 md:flex-row md:justify-end pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="min-h-[44px]"
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="min-h-[44px]">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Organization
          </Button>
        </div>
      </form>
    </AdaptiveModal>
  )
}

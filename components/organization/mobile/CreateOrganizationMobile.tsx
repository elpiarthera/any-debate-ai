"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText } from "lucide-react"

interface CreateOrganizationMobileProps {
  onSubmit: (data: { name: string; slug: string; description?: string }) => void
  onCancel: () => void
}

export function CreateOrganizationMobile({ onSubmit, onCancel }: CreateOrganizationMobileProps) {
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [errors, setErrors] = useState<{ name?: string; slug?: string }>({})

  const generateSlug = useCallback((name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  }, [])

  const handleNameChange = useCallback(
    (value: string) => {
      setName(value)
      if (!slug || slug === generateSlug(name)) {
        setSlug(generateSlug(value))
      }
      if (errors.name) {
        setErrors((prev) => ({ ...prev, name: undefined }))
      }
    },
    [name, slug, errors.name, generateSlug],
  )

  const handleSlugChange = useCallback(
    (value: string) => {
      const sanitized = value.toLowerCase().replace(/[^a-z0-9-]/g, "")
      setSlug(sanitized)
      if (errors.slug) {
        setErrors((prev) => ({ ...prev, slug: undefined }))
      }
    },
    [errors.slug],
  )

  const handleSubmit = useCallback(() => {
    const newErrors: { name?: string; slug?: string } = {}

    if (!name.trim()) {
      newErrors.name = "Organization name is required"
    }

    if (!slug.trim()) {
      newErrors.slug = "Organization slug is required"
    } else if (slug.length < 3) {
      newErrors.slug = "Slug must be at least 3 characters"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit({
      name: name.trim(),
      slug: slug.trim(),
      description: description.trim() || undefined,
    })
  }, [name, slug, description, onSubmit])

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable Content */}
      <ScrollArea className="flex-1 -mx-6 px-6">
        <div className="space-y-6 pb-6">
          {/* Organization Name */}
          <div className="space-y-2">
            <Label htmlFor="org-name-mobile" className="text-base">
              Organization Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="org-name-mobile"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Acme Corporation"
              className="min-h-[48px] text-base"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "org-name-error-mobile" : "org-name-help-mobile"}
            />
            {errors.name ? (
              <p id="org-name-error-mobile" className="text-sm text-destructive">
                {errors.name}
              </p>
            ) : (
              <p id="org-name-help-mobile" className="text-sm text-muted-foreground">
                The name of your organization as it will appear to members
              </p>
            )}
          </div>

          {/* Organization Slug */}
          <div className="space-y-2">
            <Label htmlFor="org-slug-mobile" className="text-base">
              Organization Slug <span className="text-destructive">*</span>
            </Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">anydebate.ai/</span>
              <Input
                id="org-slug-mobile"
                value={slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="acme-corp"
                className="min-h-[48px] text-base flex-1"
                aria-invalid={!!errors.slug}
                aria-describedby={errors.slug ? "org-slug-error-mobile" : "org-slug-help-mobile"}
              />
            </div>
            {errors.slug ? (
              <p id="org-slug-error-mobile" className="text-sm text-destructive">
                {errors.slug}
              </p>
            ) : (
              <p id="org-slug-help-mobile" className="text-sm text-muted-foreground">
                A unique identifier for your organization URL (lowercase, numbers, and hyphens only)
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="org-description-mobile" className="text-base">
              Description (Optional)
            </Label>
            <Textarea
              id="org-description-mobile"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us about your organization..."
              className="min-h-[120px] text-base resize-none"
              aria-describedby="org-description-help-mobile"
            />
            <p id="org-description-help-mobile" className="text-sm text-muted-foreground">
              A brief description of your organization and its purpose
            </p>
          </div>

          {/* What Happens Next */}
          <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium">What happens next?</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  You'll be the owner of this organization and can invite team members, manage settings, and create
                  workspaces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Fixed Action Buttons */}
      <div className="flex-shrink-0 flex items-center gap-3 pt-4 border-t -mx-6 px-6">
        <Button variant="outline" onClick={onCancel} className="flex-1 min-h-[48px] bg-transparent">
          Cancel
        </Button>
        <Button onClick={handleSubmit} className="flex-1 min-h-[48px]">
          Create Organization
        </Button>
      </div>
    </div>
  )
}

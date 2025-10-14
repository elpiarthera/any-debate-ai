"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface OrganizationSettingsDesktopProps {
  slug: string
  organization: {
    id: string
    name: string
    slug: string
    description: string
  }
}

export function OrganizationSettingsDesktop({ slug, organization }: OrganizationSettingsDesktopProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [name, setName] = useState(organization.name)
  const [orgSlug, setOrgSlug] = useState(organization.slug)
  const [description, setDescription] = useState(organization.description)
  const [isSaving, setIsSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) {
      newErrors.name = "Organization name is required"
    } else if (name.length < 3) {
      newErrors.name = "Name must be at least 3 characters"
    } else if (name.length > 50) {
      newErrors.name = "Name must be less than 50 characters"
    }

    if (!orgSlug.trim()) {
      newErrors.slug = "Organization slug is required"
    } else if (!/^[a-z0-9-]+$/.test(orgSlug)) {
      newErrors.slug = "Slug can only contain lowercase letters, numbers, and hyphens"
    }

    if (description.length > 500) {
      newErrors.description = "Description must be less than 500 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validate()) return

    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("[v0] Saving organization settings:", { name, slug: orgSlug, description })

    toast({
      title: "Settings saved",
      description: "Organization settings have been updated successfully.",
    })

    setIsSaving(false)
  }

  const handleDelete = () => {
    console.log("[v0] Deleting organization:", organization.id)

    toast({
      title: "Organization deleted",
      description: "Your organization has been deleted successfully.",
      variant: "destructive",
    })

    router.push("/dashboard")
  }

  const handleCancel = () => {
    setName(organization.name)
    setOrgSlug(organization.slug)
    setDescription(organization.description)
    setErrors({})

    toast({
      title: "Changes discarded",
      description: "Your changes have been discarded.",
    })
  }

  return (
    <div className="container mx-auto p-6 lg:p-8 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Organization Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your organization details and preferences for {slug}</p>
      </div>

      {/* General Settings */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Update your organization information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Organization Name */}
          <div className="space-y-2">
            <Label htmlFor="org-name">Organization Name *</Label>
            <Input
              id="org-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Acme Corp"
              className="min-h-[48px]"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "org-name-error" : undefined}
            />
            {errors.name && (
              <p id="org-name-error" className="text-sm text-destructive">
                {errors.name}
              </p>
            )}
          </div>

          {/* Organization Slug */}
          <div className="space-y-2">
            <Label htmlFor="org-slug">Organization Slug *</Label>
            <Input
              id="org-slug"
              value={orgSlug}
              onChange={(e) => setOrgSlug(e.target.value)}
              placeholder="acme-corp"
              className="min-h-[48px]"
              aria-invalid={!!errors.slug}
              aria-describedby={errors.slug ? "org-slug-error" : undefined}
            />
            {errors.slug && (
              <p id="org-slug-error" className="text-sm text-destructive">
                {errors.slug}
              </p>
            )}
            <p className="text-sm text-muted-foreground">Used in URLs: yourapp.com/org/{orgSlug || "your-slug"}</p>
          </div>

          {/* Organization Description */}
          <div className="space-y-2">
            <Label htmlFor="org-description">Description (Optional)</Label>
            <Textarea
              id="org-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us about your organization..."
              className="min-h-[96px] resize-none"
              aria-invalid={!!errors.description}
              aria-describedby={errors.description ? "org-description-error" : undefined}
            />
            {errors.description && (
              <p id="org-description-error" className="text-sm text-destructive">
                {errors.description}
              </p>
            )}
            <p className="text-sm text-muted-foreground">{description.length}/500 characters</p>
          </div>

          {/* Action Buttons - Inline on desktop */}
          <div className="flex gap-3 justify-end pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="min-h-[44px] bg-transparent hover:bg-accent"
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleSave} className="min-h-[44px]" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>Irreversible actions for your organization</CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="min-h-[44px]">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Organization
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your organization and remove all associated
                  data including members, debates, and settings.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="min-h-[44px]">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="min-h-[44px] bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete Organization
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  )
}

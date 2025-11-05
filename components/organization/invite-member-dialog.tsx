"use client"

import type React from "react"

import { useState } from "react"
import { useDevice } from "@/contexts/DeviceProvider"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface InviteMemberDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function InviteMemberDialog({ open, onOpenChange }: InviteMemberDialogProps) {
  const { isMobile } = useDevice()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [role, setRole] = useState<"admin" | "member">("member")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email address"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)

    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("[v0] Inviting member:", { email, role })

    toast({
      title: "Invitation sent",
      description: `An invitation has been sent to ${email}.`,
    })

    setEmail("")
    setRole("member")
    setErrors({})
    setIsSubmitting(false)
    onOpenChange(false)
  }

  const handleCancel = () => {
    setEmail("")
    setRole("member")
    setErrors({})
    onOpenChange(false)
  }

  return (
    <AdaptiveModal
      isOpen={open}
      onClose={handleCancel}
      title="Invite Team Member"
      description="Send an invitation to join your organization."
    >
      <form onSubmit={handleSubmit} className="space-y-4 p-4 md:p-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="colleague@example.com"
            className="min-h-[48px]"
            aria-invalid={!!errors.email}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-sm text-destructive" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Role *</Label>
          <Select value={role} onValueChange={(value: "admin" | "member") => setRole(value)} disabled={isSubmitting}>
            <SelectTrigger id="role" className="min-h-[48px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="member">Member</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            {role === "admin" ? "Admins can manage members and settings" : "Members can participate in debates"}
          </p>
        </div>

        <div className={`flex gap-3 pt-2 ${isMobile ? "flex-col" : "flex-row justify-end"}`}>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="min-h-[44px] bg-transparent"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" className="min-h-[44px]" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Invitation"}
          </Button>
        </div>
      </form>
    </AdaptiveModal>
  )
}

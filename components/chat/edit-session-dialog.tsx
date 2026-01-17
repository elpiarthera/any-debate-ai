"use client"

import { useState, useEffect } from "react"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface EditSessionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  sessionId: string | null
  currentTitle?: string
  onSave: (newTitle: string) => void
}

export function EditSessionDialog({
  open,
  onOpenChange,
  sessionId,
  currentTitle = "",
  onSave,
}: EditSessionDialogProps) {
  const [title, setTitle] = useState(currentTitle)
  const [isLoading, setIsLoading] = useState(false)

  // Update title when currentTitle changes
  useEffect(() => {
    setTitle(currentTitle)
  }, [currentTitle])

  const handleSave = async () => {
    if (!title.trim()) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("[v0] Renaming session:", sessionId, title)
    onSave(title)
    setIsLoading(false)
    onOpenChange(false)
  }

  return (
    <AdaptiveModal
      isOpen={open}
      onClose={() => onOpenChange(false)}
      title="Rename Session"
      description="Enter a new name for this debate session"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="session-title">Session Title</Label>
          <Input
            id="session-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter session title"
            className="min-h-[48px]"
            disabled={isLoading}
          />
        </div>

        <div className="flex gap-2 flex-col sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading} className="min-h-[44px]">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!title.trim() || isLoading} className="min-h-[44px]">
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </AdaptiveModal>
  )
}

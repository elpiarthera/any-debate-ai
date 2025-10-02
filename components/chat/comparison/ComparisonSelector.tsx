"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { GitCompare, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDevice } from "@/contexts/DeviceProvider"
import { toast } from "sonner"

interface Session {
  id: string
  name: string
  createdAt: Date
  messageCount: number
}

interface ComparisonSelectorProps {
  sessions: Session[]
  onCompare: (sessionIds: string[]) => void
  onClose: () => void
}

export function ComparisonSelector({ sessions, onCompare, onClose }: ComparisonSelectorProps) {
  const [selectedSessions, setSelectedSessions] = useState<string[]>([])
  const { isMobile } = useDevice()

  const handleToggleSession = (sessionId: string) => {
    setSelectedSessions((prev) =>
      prev.includes(sessionId) ? prev.filter((id) => id !== sessionId) : [...prev, sessionId],
    )
  }

  const handleCompare = () => {
    if (selectedSessions.length < 2) {
      toast.error("Please select at least 2 sessions to compare")
      return
    }

    if (selectedSessions.length > 4) {
      toast.error("You can compare up to 4 sessions at a time")
      return
    }

    onCompare(selectedSessions)
    onClose()
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className={cn(isMobile ? "w-[95vw]" : "max-w-md")}>
        <DialogHeader>
          <DialogTitle className={cn("flex items-center gap-2", isMobile && "text-base")}>
            <GitCompare className="h-5 w-5 text-primary" />
            Compare Sessions
          </DialogTitle>
          <DialogDescription className={cn(isMobile && "text-xs")}>
            Select 2-4 sessions to compare side by side
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Selected Count */}
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className={cn("text-muted-foreground", isMobile ? "text-xs" : "text-sm")}>Selected Sessions</span>
            <Badge variant={selectedSessions.length >= 2 ? "default" : "secondary"}>
              {selectedSessions.length} / 4
            </Badge>
          </div>

          {/* Session List */}
          <ScrollArea className={cn(isMobile ? "h-[300px]" : "h-[400px]")}>
            <div className="space-y-2">
              {sessions.map((session) => {
                const isSelected = selectedSessions.includes(session.id)

                return (
                  <div
                    key={session.id}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-lg border transition-colors cursor-pointer",
                      isSelected ? "bg-primary/5 border-primary/30" : "bg-muted/50 border-border hover:bg-muted",
                    )}
                    onClick={() => handleToggleSession(session.id)}
                  >
                    <Checkbox checked={isSelected} onCheckedChange={() => handleToggleSession(session.id)} />

                    <div className="flex-1 min-w-0">
                      <Label className={cn("cursor-pointer", isMobile ? "text-sm" : "text-base")}>{session.name}</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {formatDate(session.createdAt)}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {session.messageCount} messages
                        </Badge>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollArea>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t border-border">
            <Button variant="outline" onClick={onClose} className={cn(isMobile && "h-9 text-sm")}>
              Cancel
            </Button>
            <Button
              onClick={handleCompare}
              disabled={selectedSessions.length < 2 || selectedSessions.length > 4}
              className={cn(isMobile && "h-9 text-sm")}
            >
              <GitCompare className="h-4 w-4 mr-2" />
              Compare
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

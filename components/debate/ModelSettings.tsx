"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Settings, Edit, Trash2, RotateCcw } from "lucide-react"
import { toast } from "sonner"

interface AIModel {
  id: string
  type: "GPT-4" | "Claude-3.5" | "Llama-3" | "Gemini"
  name: string
}

interface ModelSettingsProps {
  model: AIModel
  onRemove: () => void
  onRename: (newName: string) => void
  onClearMessages: () => void
  canRemove: boolean
  hasMessages: boolean
}

export function ModelSettings({
  model,
  onRemove,
  onRename,
  onClearMessages,
  canRemove,
  hasMessages,
}: ModelSettingsProps) {
  const [isRenameOpen, setIsRenameOpen] = useState(false)
  const [newName, setNewName] = useState(model.name)

  const handleRename = () => {
    if (newName.trim() && newName !== model.name) {
      onRename(newName.trim())
      toast.success(`Renamed to "${newName.trim()}"`)
    }
    setIsRenameOpen(false)
  }

  const handleRemove = () => {
    onRemove()
    toast.success(`Removed ${model.name} from debate`)
  }

  const handleClear = () => {
    onClearMessages()
    toast.success(`Cleared ${model.name} conversation`)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setIsRenameOpen(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleClear} disabled={!hasMessages}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Clear Messages
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleRemove} disabled={!canRemove} className="text-destructive">
            <Trash2 className="h-4 w-4 mr-2" />
            Remove Column
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isRenameOpen} onOpenChange={setIsRenameOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rename Model</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="model-name">Model Name</Label>
              <Input
                id="model-name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter new name..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleRename()
                  }
                }}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsRenameOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleRename} disabled={!newName.trim()}>
                Rename
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

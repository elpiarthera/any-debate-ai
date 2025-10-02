"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Save } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDevice } from "@/contexts/DeviceProvider"
import { BookmarkManager } from "@/lib/chat/bookmarks"
import type { Bookmark } from "@/lib/chat/bookmarks"
import { toast } from "sonner"

interface BookmarkEditorProps {
  bookmark: Bookmark
  onClose: () => void
}

export function BookmarkEditor({ bookmark, onClose }: BookmarkEditorProps) {
  const [note, setNote] = useState(bookmark.note || "")
  const [tags, setTags] = useState<string[]>(bookmark.tags)
  const [newTag, setNewTag] = useState("")
  const [collectionId, setCollectionId] = useState(bookmark.collectionId || "defaultCollectionId")
  const { isMobile } = useDevice()

  const collections = BookmarkManager.getAllCollections()

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleSave = () => {
    BookmarkManager.updateBookmark(bookmark.id, {
      note: note.trim() || undefined,
      tags,
      collectionId: collectionId || undefined,
    })
    toast.success("Bookmark updated")
    onClose()
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className={cn(isMobile ? "w-[95vw]" : "max-w-md")}>
        <DialogHeader>
          <DialogTitle className={cn(isMobile && "text-base")}>Edit Bookmark</DialogTitle>
          <DialogDescription className={cn(isMobile && "text-xs")}>
            Add notes, tags, and organize your bookmark
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Collection */}
          <div className="space-y-2">
            <Label className={cn(isMobile && "text-xs")}>Collection</Label>
            <Select value={collectionId} onValueChange={setCollectionId}>
              <SelectTrigger className={cn(isMobile && "h-9 text-sm")}>
                <SelectValue placeholder="Select a collection" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="defaultCollectionId">No collection</SelectItem>
                {collections.map((collection) => (
                  <SelectItem key={collection.id} value={collection.id}>
                    <span className="flex items-center gap-2">
                      <span>{collection.icon}</span>
                      <span>{collection.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Note */}
          <div className="space-y-2">
            <Label className={cn(isMobile && "text-xs")}>Note</Label>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note about this message..."
              className={cn(isMobile && "text-sm")}
              rows={3}
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label className={cn(isMobile && "text-xs")}>Tags</Label>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddTag()
                  }
                }}
                placeholder="Add a tag..."
                className={cn(isMobile && "h-9 text-sm")}
              />
              <Button type="button" onClick={handleAddTag} size="sm" className={cn(isMobile && "h-9")}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                    <button onClick={() => handleRemoveTag(tag)} className="ml-1 hover:text-destructive">
                      <X className="h-2 w-2" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className={cn(isMobile && "h-9 text-sm")}>
              Cancel
            </Button>
            <Button onClick={handleSave} className={cn(isMobile && "h-9 text-sm")}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

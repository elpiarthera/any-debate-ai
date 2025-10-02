"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Folder, Plus, Edit, Trash2, Save, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDevice } from "@/contexts/DeviceProvider"
import { BookmarkManager } from "@/lib/chat/bookmarks"
import type { BookmarkCollection } from "@/lib/chat/bookmarks"
import { toast } from "sonner"

interface CollectionManagerProps {
  onClose: () => void
}

const COLLECTION_COLORS = [
  { value: "bg-red-500", label: "Red" },
  { value: "bg-orange-500", label: "Orange" },
  { value: "bg-yellow-500", label: "Yellow" },
  { value: "bg-green-500", label: "Green" },
  { value: "bg-blue-500", label: "Blue" },
  { value: "bg-purple-500", label: "Purple" },
  { value: "bg-pink-500", label: "Pink" },
  { value: "bg-gray-500", label: "Gray" },
]

const COLLECTION_ICONS = ["📁", "⭐", "📋", "🔬", "💡", "🎯", "🔥", "✨", "🏆", "📌"]

export function CollectionManager({ onClose }: CollectionManagerProps) {
  const [collections, setCollections] = useState(BookmarkManager.getAllCollections())
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "bg-blue-500",
    icon: "📁",
  })
  const { isMobile } = useDevice()

  const handleCreate = () => {
    if (!formData.name.trim()) {
      toast.error("Collection name is required")
      return
    }

    BookmarkManager.createCollection(formData.name, {
      description: formData.description,
      color: formData.color,
      icon: formData.icon,
    })

    setCollections(BookmarkManager.getAllCollections())
    setIsCreating(false)
    setFormData({ name: "", description: "", color: "bg-blue-500", icon: "📁" })
    toast.success("Collection created")
  }

  const handleUpdate = (collectionId: string) => {
    if (!formData.name.trim()) {
      toast.error("Collection name is required")
      return
    }

    BookmarkManager.updateCollection(collectionId, {
      name: formData.name,
      description: formData.description,
      color: formData.color,
      icon: formData.icon,
    })

    setCollections(BookmarkManager.getAllCollections())
    setEditingId(null)
    setFormData({ name: "", description: "", color: "bg-blue-500", icon: "📁" })
    toast.success("Collection updated")
  }

  const handleDelete = (collectionId: string) => {
    if (confirm("Are you sure you want to delete this collection?")) {
      BookmarkManager.deleteCollection(collectionId)
      setCollections(BookmarkManager.getAllCollections())
      toast.success("Collection deleted")
    }
  }

  const startEdit = (collection: BookmarkCollection) => {
    setEditingId(collection.id)
    setFormData({
      name: collection.name,
      description: collection.description || "",
      color: collection.color,
      icon: collection.icon,
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setIsCreating(false)
    setFormData({ name: "", description: "", color: "bg-blue-500", icon: "📁" })
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className={cn(isMobile ? "w-[95vw]" : "max-w-2xl")}>
        <DialogHeader>
          <DialogTitle className={cn("flex items-center gap-2", isMobile && "text-base")}>
            <Folder className="h-5 w-5 text-primary" />
            Manage Collections
          </DialogTitle>
          <DialogDescription className={cn(isMobile && "text-xs")}>
            Organize your bookmarks into collections
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Create New Collection Button */}
          {!isCreating && !editingId && (
            <Button onClick={() => setIsCreating(true)} className="w-full" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Create New Collection
            </Button>
          )}

          {/* Collection Form */}
          {(isCreating || editingId) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-muted rounded-lg space-y-3"
            >
              <div className="space-y-2">
                <Label className={cn(isMobile && "text-xs")}>Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Collection name"
                  className={cn(isMobile && "h-9 text-sm")}
                />
              </div>

              <div className="space-y-2">
                <Label className={cn(isMobile && "text-xs")}>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Optional description"
                  className={cn(isMobile && "text-sm")}
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className={cn(isMobile && "text-xs")}>Color</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {COLLECTION_COLORS.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setFormData({ ...formData, color: color.value })}
                        className={cn(
                          "h-8 rounded-md transition-all",
                          color.value,
                          formData.color === color.value && "ring-2 ring-offset-2 ring-primary",
                        )}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className={cn(isMobile && "text-xs")}>Icon</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {COLLECTION_ICONS.map((icon) => (
                      <button
                        key={icon}
                        onClick={() => setFormData({ ...formData, icon })}
                        className={cn(
                          "h-8 rounded-md flex items-center justify-center text-lg",
                          "hover:bg-accent transition-colors",
                          formData.icon === icon && "bg-primary/10 ring-2 ring-primary/20",
                        )}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={cancelEdit} size="sm">
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
                <Button onClick={() => (editingId ? handleUpdate(editingId) : handleCreate())} size="sm">
                  <Save className="h-4 w-4 mr-1" />
                  {editingId ? "Update" : "Create"}
                </Button>
              </div>
            </motion.div>
          )}

          {/* Collections List */}
          <ScrollArea className={cn(isMobile ? "h-[300px]" : "h-[400px]")}>
            <div className="space-y-2">
              <AnimatePresence>
                {collections.map((collection, index) => (
                  <motion.div
                    key={collection.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className="group p-3 bg-muted/50 rounded-lg border border-border hover:bg-muted transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "shrink-0 w-10 h-10 rounded-lg flex items-center justify-center",
                          collection.color,
                        )}
                      >
                        <span className="text-xl">{collection.icon}</span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={cn("font-medium", isMobile ? "text-sm" : "text-base")}>{collection.name}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {collection.bookmarkIds.length}
                          </Badge>
                        </div>
                        {collection.description && (
                          <p className={cn("text-muted-foreground", isMobile ? "text-xs" : "text-sm")}>
                            {collection.description}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" onClick={() => startEdit(collection)} className="h-7 w-7 p-0">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(collection.id)}
                          className="h-7 w-7 p-0 text-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}

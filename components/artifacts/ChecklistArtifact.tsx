"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useDevice } from "@/contexts/DeviceProvider"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckSquare, Square, Plus, Calendar, User, AlertCircle, Trash2, GripVertical } from "lucide-react"
import type { ChecklistData } from "@/lib/artifacts"
import { toast } from "sonner"

interface ChecklistArtifactProps {
  data: ChecklistData
  collaboratingAgents?: string[]
  onUpdate?: (data: Partial<ChecklistData>) => void
}

export function ChecklistArtifact({ data, collaboratingAgents = [], onUpdate }: ChecklistArtifactProps) {
  const { isMobile } = useDevice()
  const [newItemText, setNewItemText] = useState("")
  const [showAddItem, setShowAddItem] = useState(false)
  const [newItemPriority, setNewItemPriority] = useState<"low" | "medium" | "high">("medium")

  const completedCount = data.items.filter((item) => item.completed).length
  const totalCount = data.items.length
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  const handleToggleItem = (itemId: string) => {
    const updatedItems = data.items.map((item) =>
      item.id === itemId
        ? {
            ...item,
            completed: !item.completed,
            completedAt: !item.completed ? Date.now() : undefined,
            completedBy: !item.completed ? "User" : undefined,
          }
        : item,
    )
    onUpdate?.({
      items: updatedItems,
      metadata: {
        ...data.metadata,
        completedCount: updatedItems.filter((item) => item.completed).length,
        totalCount: updatedItems.length,
        progress: (updatedItems.filter((item) => item.completed).length / updatedItems.length) * 100,
      },
    })
  }

  const handleAddItem = () => {
    if (!newItemText.trim()) return

    const newItem = {
      id: Date.now().toString(),
      text: newItemText,
      completed: false,
      priority: newItemPriority,
    }

    const updatedItems = [...data.items, newItem]
    onUpdate?.({
      items: updatedItems,
      metadata: {
        ...data.metadata,
        totalCount: updatedItems.length,
        progress: (updatedItems.filter((item) => item.completed).length / updatedItems.length) * 100,
      },
    })

    setNewItemText("")
    setNewItemPriority("medium")
    setShowAddItem(false)
    toast.success("Item added")
  }

  const handleDeleteItem = (itemId: string) => {
    const updatedItems = data.items.filter((item) => item.id !== itemId)
    onUpdate?.({
      items: updatedItems,
      metadata: {
        ...data.metadata,
        completedCount: updatedItems.filter((item) => item.completed).length,
        totalCount: updatedItems.length,
        progress:
          updatedItems.length > 0
            ? (updatedItems.filter((item) => item.completed).length / updatedItems.length) * 100
            : 0,
      },
    })
    toast.success("Item deleted")
  }

  const handleCompleteAll = () => {
    const updatedItems = data.items.map((item) => ({
      ...item,
      completed: true,
      completedAt: Date.now(),
      completedBy: "User",
    }))
    onUpdate?.({
      items: updatedItems,
      metadata: {
        ...data.metadata,
        completedCount: updatedItems.length,
        progress: 100,
      },
    })
    toast.success("All items completed")
  }

  const handleDeleteCompleted = () => {
    const updatedItems = data.items.filter((item) => !item.completed)
    onUpdate?.({
      items: updatedItems,
      metadata: {
        ...data.metadata,
        completedCount: 0,
        totalCount: updatedItems.length,
        progress: 0,
      },
    })
    toast.success("Completed items deleted")
  }

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getPriorityIcon = (priority?: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-3 w-3" />
      default:
        return null
    }
  }

  return (
    <Card className="h-full bg-gradient-to-br from-background to-muted/20 border-border/50">
      <div className="h-full flex flex-col">
        {/* Checklist Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <CheckSquare className="h-5 w-5 text-primary" />
            <h3 className="font-medium">{data.title}</h3>
            <Badge variant="secondary" className="text-xs">
              Checklist
            </Badge>
            <Badge variant="outline" className="text-xs">
              {completedCount}/{totalCount}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            {collaboratingAgents.length > 0 && (
              <div className="flex -space-x-1">
                {collaboratingAgents.map((agent, index) => (
                  <motion.div
                    key={agent}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-medium animate-pulse"
                    style={{ zIndex: 10 - index }}
                  >
                    {agent.charAt(0)}
                  </motion.div>
                ))}
              </div>
            )}

            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowAddItem(!showAddItem)}
              className={`h-7 ${isMobile ? "min-h-[44px]" : ""}`}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Progress Section */}
        <div className="p-4 border-b border-border/50 bg-muted/20">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Progress</span>
              <span className="text-muted-foreground">
                {completedCount} of {totalCount} completed ({Math.round(progress)}%)
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            {data.description && <p className="text-sm text-muted-foreground">{data.description}</p>}

            {/* Bulk Actions */}
            {totalCount > 0 && (
              <div className="flex items-center gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCompleteAll}
                  className={`text-xs ${isMobile ? "min-h-[44px]" : ""}`}
                  disabled={completedCount === totalCount}
                >
                  Complete All
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleDeleteCompleted}
                  className={`text-xs ${isMobile ? "min-h-[44px]" : ""}`}
                  disabled={completedCount === 0}
                >
                  Delete Completed
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Add Item Form */}
        <AnimatePresence>
          {showAddItem && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-b border-border/50 bg-muted/10"
            >
              <div className="p-4 space-y-3">
                <Input
                  placeholder="Add new item..."
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
                  className={`bg-background/50 ${isMobile ? "min-h-[48px]" : ""}`}
                />
                <div className="flex items-center gap-2">
                  <Select value={newItemPriority} onValueChange={(value: any) => setNewItemPriority(value)}>
                    <SelectTrigger className={`w-32 ${isMobile ? "min-h-[48px]" : ""}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    size="sm"
                    onClick={handleAddItem}
                    disabled={!newItemText.trim()}
                    className={isMobile ? "min-h-[48px]" : ""}
                  >
                    Add Item
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowAddItem(false)}
                    className={isMobile ? "min-h-[48px]" : ""}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Checklist Items */}
        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-3">
            <AnimatePresence>
              {data.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`group flex items-start gap-3 p-3 rounded-lg border transition-all hover:shadow-sm ${
                    item.completed
                      ? "bg-primary/10 border-primary/20"
                      : "bg-background/50 border-border/50 hover:bg-muted/20"
                  } ${isMobile ? "min-h-[80px]" : ""}`}
                >
                  {!isMobile && (
                    <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-move flex-shrink-0 mt-0.5" />
                  )}

                  <button
                    onClick={() => handleToggleItem(item.id)}
                    className={`flex-shrink-0 mt-0.5 transition-transform hover:scale-110 ${isMobile ? "min-w-[44px] min-h-[44px] flex items-center justify-center" : ""}`}
                  >
                    {item.completed ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-5 h-5 bg-primary rounded border-2 border-primary flex items-center justify-center"
                      >
                        <CheckSquare className="h-3 w-3 text-primary-foreground" />
                      </motion.div>
                    ) : (
                      <Square className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <span
                        className={`text-sm leading-relaxed ${
                          item.completed ? "line-through text-muted-foreground" : ""
                        }`}
                      >
                        {item.text}
                      </span>

                      <div className="flex items-center gap-1 flex-shrink-0">
                        {item.priority && (
                          <Badge variant={getPriorityColor(item.priority)} className="text-xs h-5">
                            {getPriorityIcon(item.priority)}
                            {item.priority}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {(item.dueDate || item.assignee || item.notes) && (
                      <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                        {item.dueDate && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(item.dueDate).toLocaleDateString()}
                          </div>
                        )}
                        {item.assignee && (
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {item.assignee}
                          </div>
                        )}
                      </div>
                    )}

                    {item.notes && (
                      <p className="mt-2 text-xs text-muted-foreground bg-muted/30 p-2 rounded">{item.notes}</p>
                    )}
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteItem(item.id)}
                    className={`flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ${isMobile ? "min-h-[44px] min-w-[44px] opacity-100" : "h-7 w-7 p-0"}`}
                  >
                    <Trash2 className="h-3 w-3 text-destructive" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Checklist Footer */}
        {data.metadata?.category && (
          <div className="border-t border-border/50 p-4 bg-muted/20">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span>Category:</span>
                <Badge variant="outline" className="text-xs">
                  {data.metadata.category}
                </Badge>
              </div>
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

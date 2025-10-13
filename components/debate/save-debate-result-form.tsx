"use client"

import { useState } from "react"
import { useDevice } from "@/contexts/DeviceProvider"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Trophy, Target, CheckCircle2, AlertCircle } from "lucide-react"

interface DebateResult {
  topic: string
  winner: string
  winningArguments: string[]
  consensusPoints: string[]
  actionItems: string[]
  duration: string
  participants: number
}

interface SaveDebateResultFormProps {
  isOpen: boolean
  onClose: () => void
  debateResult: DebateResult
  onSave: (data: any) => void
}

export function SaveDebateResultForm({ isOpen, onClose, debateResult, onSave }: SaveDebateResultFormProps) {
  const { isMobile } = useDevice()
  const [title, setTitle] = useState(`Debate: ${debateResult.topic}`)
  const [scope, setScope] = useState<"user" | "workspace" | "organization">("user")
  const [tags, setTags] = useState<string[]>(["debate", "result"])
  const [newTag, setNewTag] = useState("")
  const [isAdmin] = useState(false) // Mock: Replace with actual role check

  // Editable extracted content
  const [winningArguments, setWinningArguments] = useState(debateResult.winningArguments)
  const [consensusPoints, setConsensusPoints] = useState(debateResult.consensusPoints)
  const [actionItems, setActionItems] = useState(debateResult.actionItems)

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSave = () => {
    onSave({
      title,
      scope,
      tags,
      content: {
        topic: debateResult.topic,
        winner: debateResult.winner,
        winningArguments,
        consensusPoints,
        actionItems,
        duration: debateResult.duration,
        participants: debateResult.participants,
      },
    })
    onClose()
  }

  return (
    <AdaptiveModal
      isOpen={isOpen}
      onClose={onClose}
      title="Save Debate Result as Memory"
      description="Save this debate result for future reference"
    >
      <div className={`space-y-6 ${isMobile ? "pb-4" : ""}`}>
        {/* Debate Summary */}
        <div className={`space-y-3 ${isMobile ? "" : "grid grid-cols-2 gap-4"}`}>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Debate Topic</Label>
            <p className="text-sm text-muted-foreground">{debateResult.topic}</p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-500" />
              Winner
            </Label>
            <p className="text-sm font-semibold">{debateResult.winner}</p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Duration</Label>
            <p className="text-sm text-muted-foreground">{debateResult.duration}</p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Participants</Label>
            <p className="text-sm text-muted-foreground">{debateResult.participants} agents</p>
          </div>
        </div>

        {/* Winning Arguments */}
        <div className="space-y-3">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Target className="h-4 w-4 text-blue-500" />
            Winning Arguments
          </Label>
          <div className="space-y-2">
            {winningArguments.map((arg, index) => (
              <div key={index} className="flex gap-2">
                <Textarea
                  value={arg}
                  onChange={(e) => {
                    const updated = [...winningArguments]
                    updated[index] = e.target.value
                    setWinningArguments(updated)
                  }}
                  className="min-h-[48px] text-sm resize-none"
                  rows={2}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Consensus Points */}
        <div className="space-y-3">
          <Label className="text-sm font-medium flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            Consensus Points
          </Label>
          <div className="space-y-2">
            {consensusPoints.map((point, index) => (
              <div key={index} className="flex gap-2">
                <Textarea
                  value={point}
                  onChange={(e) => {
                    const updated = [...consensusPoints]
                    updated[index] = e.target.value
                    setConsensusPoints(updated)
                  }}
                  className="min-h-[48px] text-sm resize-none"
                  rows={2}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Action Items */}
        <div className="space-y-3">
          <Label className="text-sm font-medium flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-orange-500" />
            Action Items
          </Label>
          <div className="space-y-2">
            {actionItems.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={item}
                  onChange={(e) => {
                    const updated = [...actionItems]
                    updated[index] = e.target.value
                    setActionItems(updated)
                  }}
                  className="min-h-[48px]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Memory Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Memory Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title for this memory"
            className="min-h-[48px]"
          />
        </div>

        {/* Scope Selector */}
        <div className="space-y-2">
          <Label htmlFor="scope">Memory Scope</Label>
          <Select value={scope} onValueChange={(value: any) => setScope(value)}>
            <SelectTrigger id="scope" className="min-h-[48px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">Personal (Only You)</SelectItem>
              {isAdmin && (
                <>
                  <SelectItem value="workspace">Workspace (All Members)</SelectItem>
                  <SelectItem value="organization">Organization (All Workspaces)</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            {scope === "user" && "Only you can see this memory"}
            {scope === "workspace" && "All workspace members can see this memory"}
            {scope === "organization" && "All organization members can see this memory"}
          </p>
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1">
                {tag}
                <button onClick={() => handleRemoveTag(tag)} className="ml-1 hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              id="tags"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleAddTag()
                }
              }}
              placeholder="Add a tag"
              className="min-h-[48px]"
            />
            <Button
              type="button"
              onClick={handleAddTag}
              variant="outline"
              className="min-h-[44px] min-w-[44px] bg-transparent"
            >
              Add
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`flex gap-3 ${isMobile ? "flex-col" : "justify-end"}`}>
          <Button variant="outline" onClick={onClose} className="min-h-[44px] bg-transparent">
            Cancel
          </Button>
          <Button onClick={handleSave} className="min-h-[44px]">
            Save Memory
          </Button>
        </div>
      </div>
    </AdaptiveModal>
  )
}

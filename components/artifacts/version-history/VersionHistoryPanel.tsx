"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useDevice } from "@/contexts/DeviceProvider"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  History,
  Clock,
  User,
  RotateCcw,
  Eye,
  Download,
  Search,
  GitBranch,
  FileEdit,
  Save,
  Sparkles,
} from "lucide-react"
import type { ArtifactVersion, VersionDiff } from "@/lib/artifacts/version-history"
import { versionHistoryManager } from "@/lib/artifacts/version-history"
import { toast } from "sonner"

interface VersionHistoryPanelProps {
  isOpen: boolean
  onClose: () => void
  artifactId: string
  onRestoreVersion: (version: ArtifactVersion) => void
}

export function VersionHistoryPanel({ isOpen, onClose, artifactId, onRestoreVersion }: VersionHistoryPanelProps) {
  const { isMobile } = useDevice()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterAuthor, setFilterAuthor] = useState<string>("all")
  const [filterChangeType, setFilterChangeType] = useState<string>("all")
  const [selectedVersion, setSelectedVersion] = useState<ArtifactVersion | null>(null)
  const [compareVersion, setCompareVersion] = useState<ArtifactVersion | null>(null)
  const [showDiff, setShowDiff] = useState(false)

  const versions = versionHistoryManager.getVersions(artifactId)
  const stats = versionHistoryManager.getVersionStats(artifactId)

  const filteredVersions = useMemo(() => {
    return versionHistoryManager.searchVersions(artifactId, {
      author: filterAuthor !== "all" ? filterAuthor : undefined,
      changeType: filterChangeType !== "all" ? (filterChangeType as any) : undefined,
      searchTerm: searchTerm || undefined,
    })
  }, [artifactId, filterAuthor, filterChangeType, searchTerm])

  const versionDiff = useMemo(() => {
    if (!selectedVersion || !compareVersion) return []
    return versionHistoryManager.compareVersions(compareVersion, selectedVersion)
  }, [selectedVersion, compareVersion])

  const handleRestoreVersion = (version: ArtifactVersion) => {
    const restored = versionHistoryManager.restoreVersion(artifactId, version.id, "User")
    if (restored) {
      onRestoreVersion(version)
      toast.success(`Restored to version ${version.version}`)
      onClose()
    } else {
      toast.error("Failed to restore version")
    }
  }

  const handleExportHistory = () => {
    const json = versionHistoryManager.exportVersionHistory(artifactId)
    const blob = new Blob([json], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `version-history-${artifactId}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast.success("Version history exported")
  }

  const getChangeTypeIcon = (changeType: ArtifactVersion["changeType"]) => {
    switch (changeType) {
      case "created":
        return <Sparkles className="h-3 w-3" />
      case "edited":
        return <FileEdit className="h-3 w-3" />
      case "restored":
        return <RotateCcw className="h-3 w-3" />
      case "auto-saved":
        return <Save className="h-3 w-3" />
    }
  }

  const getChangeTypeColor = (changeType: ArtifactVersion["changeType"]) => {
    switch (changeType) {
      case "created":
        return "default"
      case "edited":
        return "secondary"
      case "restored":
        return "outline"
      case "auto-saved":
        return "outline"
    }
  }

  const getDiffColor = (changeType: VersionDiff["changeType"]) => {
    switch (changeType) {
      case "added":
        return "text-green-500"
      case "removed":
        return "text-red-500"
      case "modified":
        return "text-yellow-500"
    }
  }

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <AdaptiveModal
      isOpen={isOpen}
      onClose={onClose}
      title="Version History"
      description={`${stats.totalVersions} versions • ${stats.authors.length} contributors`}
    >
      <div className={`space-y-4 ${isMobile ? "p-4" : "p-6"}`}>
        {/* Stats Overview */}
        <div className={`grid gap-3 ${isMobile ? "grid-cols-2" : "grid-cols-4"}`}>
          <Card className="p-3 bg-muted/20">
            <div className="text-xs text-muted-foreground mb-1">Total Versions</div>
            <div className="text-2xl font-bold">{stats.totalVersions}</div>
          </Card>
          <Card className="p-3 bg-muted/20">
            <div className="text-xs text-muted-foreground mb-1">Contributors</div>
            <div className="text-2xl font-bold">{stats.authors.length}</div>
          </Card>
          <Card className="p-3 bg-muted/20">
            <div className="text-xs text-muted-foreground mb-1">Edits</div>
            <div className="text-2xl font-bold">{stats.changeTypes.edited || 0}</div>
          </Card>
          <Card className="p-3 bg-muted/20">
            <div className="text-xs text-muted-foreground mb-1">Restores</div>
            <div className="text-2xl font-bold">{stats.changeTypes.restored || 0}</div>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search versions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 ${isMobile ? "min-h-[48px]" : ""}`}
            />
          </div>

          <div className={`flex gap-2 ${isMobile ? "flex-col" : ""}`}>
            <Select value={filterAuthor} onValueChange={setFilterAuthor}>
              <SelectTrigger className={`${isMobile ? "min-h-[48px]" : "w-40"}`}>
                <SelectValue placeholder="All authors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All authors</SelectItem>
                {stats.authors.map((author) => (
                  <SelectItem key={author} value={author}>
                    {author}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterChangeType} onValueChange={setFilterChangeType}>
              <SelectTrigger className={`${isMobile ? "min-h-[48px]" : "w-40"}`}>
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                <SelectItem value="created">Created</SelectItem>
                <SelectItem value="edited">Edited</SelectItem>
                <SelectItem value="restored">Restored</SelectItem>
                <SelectItem value="auto-saved">Auto-saved</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              onClick={handleExportHistory}
              className={`${isMobile ? "min-h-[48px]" : ""}`}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Version Timeline */}
        <ScrollArea className={isMobile ? "h-[400px]" : "h-[500px]"}>
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredVersions
                .slice()
                .reverse()
                .map((version, index) => (
                  <motion.div
                    key={version.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    layout
                  >
                    <Card
                      className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                        selectedVersion?.id === version.id ? "border-primary bg-primary/5" : ""
                      }`}
                      onClick={() => setSelectedVersion(version)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <History className="h-5 w-5 text-primary" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <Badge variant="outline" className="text-xs">
                              v{version.version}
                            </Badge>
                            <Badge variant={getChangeTypeColor(version.changeType)} className="text-xs">
                              {getChangeTypeIcon(version.changeType)}
                              {version.changeType}
                            </Badge>
                            {version.version === stats.totalVersions && (
                              <Badge variant="default" className="text-xs">
                                Latest
                              </Badge>
                            )}
                          </div>

                          <p className="text-sm font-medium mb-2">{version.changeDescription}</p>

                          <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {version.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatTimestamp(version.timestamp)}
                            </div>
                            {version.changedFields && version.changedFields.length > 0 && (
                              <div className="flex items-center gap-1">
                                <GitBranch className="h-3 w-3" />
                                {version.changedFields.length} changes
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation()
                              setCompareVersion(version)
                              setShowDiff(true)
                            }}
                            className={`${isMobile ? "min-h-[44px] min-w-[44px]" : "h-8 w-8"} p-0`}
                            title="Compare"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {version.version !== stats.totalVersions && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleRestoreVersion(version)
                              }}
                              className={`${isMobile ? "min-h-[44px] min-w-[44px]" : "h-8 w-8"} p-0`}
                              title="Restore"
                            >
                              <RotateCcw className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Changed Fields */}
                      {version.changedFields && version.changedFields.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-border/50">
                          <div className="flex items-center gap-1 flex-wrap">
                            <span className="text-xs text-muted-foreground">Changed:</span>
                            {version.changedFields.slice(0, 5).map((field) => (
                              <Badge key={field} variant="outline" className="text-xs">
                                {field}
                              </Badge>
                            ))}
                            {version.changedFields.length > 5 && (
                              <Badge variant="outline" className="text-xs">
                                +{version.changedFields.length - 5} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </Card>
                  </motion.div>
                ))}
            </AnimatePresence>

            {filteredVersions.length === 0 && (
              <div className="text-center py-12">
                <History className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                <p className="text-muted-foreground">No versions found</p>
                <p className="text-sm text-muted-foreground/70 mt-1">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Version Diff View */}
        {showDiff && selectedVersion && compareVersion && (
          <Card className="p-4 bg-muted/20 border-border/50">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-sm">
                Comparing v{compareVersion.version} → v{selectedVersion.version}
              </h4>
              <Button size="sm" variant="ghost" onClick={() => setShowDiff(false)} className="h-6">
                Close
              </Button>
            </div>

            <Separator className="my-3" />

            <ScrollArea className="h-48">
              <div className="space-y-2">
                {versionDiff.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No changes detected</p>
                ) : (
                  versionDiff.map((diff, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-2 rounded bg-background/50 border border-border/50"
                    >
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className={`text-xs ${getDiffColor(diff.changeType)}`}>
                          {diff.changeType}
                        </Badge>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium mb-1">{diff.field}</p>
                          <div className="space-y-1">
                            {diff.oldValue !== undefined && (
                              <div className="text-xs text-red-500">- {JSON.stringify(diff.oldValue)}</div>
                            )}
                            {diff.newValue !== undefined && (
                              <div className="text-xs text-green-500">+ {JSON.stringify(diff.newValue)}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </ScrollArea>
          </Card>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button variant="outline" onClick={onClose} className={`flex-1 ${isMobile ? "min-h-[48px]" : ""}`}>
            Close
          </Button>
        </div>
      </div>
    </AdaptiveModal>
  )
}

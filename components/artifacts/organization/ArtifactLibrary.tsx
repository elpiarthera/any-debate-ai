"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useDevice } from "@/contexts/DeviceProvider"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Folder,
  Tag,
  Star,
  Pin,
  Grid3x3,
  List,
  FileText,
  Table,
  CheckSquare,
  BarChart3,
  Clock,
  MoreVertical,
  Trash2,
  Edit2,
  Move,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { artifactOrganizer, type OrganizedArtifact, type SearchFilters } from "@/lib/artifacts/organization"
import { toast } from "sonner"

export function ArtifactLibrary() {
  const { isMobile } = useDevice()
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedFolder, setSelectedFolder] = useState<string | undefined>(undefined)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedType, setSelectedType] = useState<OrganizedArtifact["type"] | "all">("all")
  const [sortBy, setSortBy] = useState<SearchFilters["sortBy"]>("updatedAt")
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [selectedArtifacts, setSelectedArtifacts] = useState<Set<string>>(new Set())

  const folders = artifactOrganizer.getAllFolders()
  const tags = artifactOrganizer.getAllTags()
  const stats = artifactOrganizer.getStatistics()

  const filteredArtifacts = useMemo(() => {
    const filters: SearchFilters = {
      query: searchQuery || undefined,
      type: selectedType !== "all" ? selectedType : undefined,
      folderId: selectedFolder,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
      isFavorite: showFavoritesOnly ? true : undefined,
      sortBy,
      sortOrder: "desc",
    }
    return artifactOrganizer.searchArtifacts(filters)
  }, [searchQuery, selectedType, selectedFolder, selectedTags, showFavoritesOnly, sortBy])

  const handleToggleFavorite = (artifactId: string) => {
    artifactOrganizer.toggleFavorites([artifactId])
    toast.success("Favorite toggled")
  }

  const handleDeleteArtifact = (artifactId: string) => {
    artifactOrganizer.deleteArtifact(artifactId)
    toast.success("Artifact deleted")
  }

  const handleBulkMove = (folderId?: string) => {
    artifactOrganizer.moveArtifactsToFolder(Array.from(selectedArtifacts), folderId)
    setSelectedArtifacts(new Set())
    toast.success(`Moved ${selectedArtifacts.size} artifacts`)
  }

  const handleBulkTag = (tagId: string) => {
    artifactOrganizer.addTagsToArtifacts(Array.from(selectedArtifacts), [tagId])
    setSelectedArtifacts(new Set())
    toast.success(`Tagged ${selectedArtifacts.size} artifacts`)
  }

  const handleToggleSelect = (artifactId: string) => {
    const newSelected = new Set(selectedArtifacts)
    if (newSelected.has(artifactId)) {
      newSelected.delete(artifactId)
    } else {
      newSelected.add(artifactId)
    }
    setSelectedArtifacts(newSelected)
  }

  const getTypeIcon = (type: OrganizedArtifact["type"]) => {
    switch (type) {
      case "document":
        return <FileText className="h-4 w-4" />
      case "data-table":
        return <Table className="h-4 w-4" />
      case "checklist":
        return <CheckSquare className="h-4 w-4" />
      case "chart":
        return <BarChart3 className="h-4 w-4" />
    }
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border/50 bg-background/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Artifact Library</h2>
            <p className="text-sm text-muted-foreground">
              {stats.totalArtifacts} artifacts • {folders.length} folders • {tags.length} tags
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={isMobile ? "min-h-[44px] min-w-[44px]" : "h-8 w-8 p-0"}
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={isMobile ? "min-h-[44px] min-w-[44px]" : "h-8 w-8 p-0"}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search artifacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`pl-10 ${isMobile ? "min-h-[48px]" : ""}`}
          />
        </div>

        {/* Filters */}
        <div className={`flex gap-2 ${isMobile ? "flex-col" : "flex-wrap"}`}>
          <Tabs value={selectedType} onValueChange={(value) => setSelectedType(value as any)} className="flex-1">
            <TabsList className={`grid w-full ${isMobile ? "grid-cols-2" : "grid-cols-5"}`}>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="document">Docs</TabsTrigger>
              <TabsTrigger value="data-table">Tables</TabsTrigger>
              <TabsTrigger value="checklist">Lists</TabsTrigger>
              <TabsTrigger value="chart">Charts</TabsTrigger>
            </TabsList>
          </Tabs>

          <Select
            value={selectedFolder || "all"}
            onValueChange={(value) => setSelectedFolder(value === "all" ? undefined : value)}
          >
            <SelectTrigger className={`${isMobile ? "min-h-[48px]" : "w-40"}`}>
              <Folder className="h-4 w-4 mr-2" />
              <SelectValue placeholder="All folders" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All folders</SelectItem>
              {folders.map((folder) => (
                <SelectItem key={folder.id} value={folder.id}>
                  {folder.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
            <SelectTrigger className={`${isMobile ? "min-h-[48px]" : "w-40"}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="updatedAt">Last updated</SelectItem>
              <SelectItem value="createdAt">Date created</SelectItem>
              <SelectItem value="lastAccessedAt">Last accessed</SelectItem>
              <SelectItem value="title">Title</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant={showFavoritesOnly ? "default" : "outline"}
            size="sm"
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`${isMobile ? "min-h-[48px]" : ""}`}
          >
            <Star className="h-4 w-4 mr-2" />
            Favorites
          </Button>
        </div>

        {/* Active Tags */}
        {selectedTags.length > 0 && (
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className="text-xs text-muted-foreground">Active tags:</span>
            {selectedTags.map((tagId) => {
              const tag = tags.find((t) => t.id === tagId)
              return tag ? (
                <Badge
                  key={tagId}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => setSelectedTags(selectedTags.filter((id) => id !== tagId))}
                >
                  {tag.name} ×
                </Badge>
              ) : null
            })}
          </div>
        )}

        {/* Bulk Actions */}
        {selectedArtifacts.size > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="mt-3 p-3 bg-primary/10 rounded-lg border border-primary/20"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{selectedArtifacts.size} selected</span>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline" className={isMobile ? "min-h-[44px]" : ""}>
                      <Move className="h-4 w-4 mr-2" />
                      Move to
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleBulkMove(undefined)}>No folder</DropdownMenuItem>
                    {folders.map((folder) => (
                      <DropdownMenuItem key={folder.id} onClick={() => handleBulkMove(folder.id)}>
                        {folder.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline" className={isMobile ? "min-h-[44px]" : ""}>
                      <Tag className="h-4 w-4 mr-2" />
                      Add tag
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {tags.map((tag) => (
                      <DropdownMenuItem key={tag.id} onClick={() => handleBulkTag(tag.id)}>
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: tag.color }} />
                        {tag.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedArtifacts(new Set())}
                  className={isMobile ? "min-h-[44px]" : ""}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Artifacts Grid/List */}
      <ScrollArea className="flex-1 p-4">
        <div className={viewMode === "grid" ? `grid gap-4 ${isMobile ? "grid-cols-1" : "grid-cols-3"}` : "space-y-3"}>
          <AnimatePresence mode="popLayout">
            {filteredArtifacts.map((artifact, index) => (
              <motion.div
                key={artifact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                layout
              >
                <Card
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedArtifacts.has(artifact.id) ? "border-primary bg-primary/5" : ""
                  }`}
                  onClick={() => handleToggleSelect(artifact.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">{getTypeIcon(artifact.type)}</div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium text-sm truncate">{artifact.title}</h4>
                        {artifact.isPinned && <Pin className="h-3 w-3 text-primary flex-shrink-0" />}
                        {artifact.isFavorite && <Star className="h-3 w-3 text-yellow-500 flex-shrink-0 fill-current" />}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <Clock className="h-3 w-3" />
                        {formatDate(artifact.updatedAt)}
                        <Separator orientation="vertical" className="h-3" />
                        <span>{artifact.metadata.author}</span>
                      </div>

                      {artifact.tags.length > 0 && (
                        <div className="flex items-center gap-1 flex-wrap">
                          {artifact.tags.slice(0, 3).map((tagId) => {
                            const tag = tags.find((t) => t.id === tagId)
                            return tag ? (
                              <Badge key={tagId} variant="outline" className="text-xs">
                                {tag.name}
                              </Badge>
                            ) : null
                          })}
                          {artifact.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{artifact.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button
                          size="sm"
                          variant="ghost"
                          className={`${isMobile ? "min-h-[44px] min-w-[44px]" : "h-8 w-8"} p-0 flex-shrink-0`}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            handleToggleFavorite(artifact.id)
                          }}
                        >
                          <Star className="h-4 w-4 mr-2" />
                          {artifact.isFavorite ? "Remove from favorites" : "Add to favorites"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Edit2 className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Move className="h-4 w-4 mr-2" />
                          Move to folder
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteArtifact(artifact.id)
                          }}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredArtifacts.length === 0 && (
            <div className="col-span-full text-center py-12">
              <Search className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground">No artifacts found</p>
              <p className="text-sm text-muted-foreground/70 mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

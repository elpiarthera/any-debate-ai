"use client"
import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useDevice } from "@/contexts/DeviceProvider"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FileText, X, Maximize2, Minimize2, Users, Sparkles, SlidersHorizontal } from "lucide-react"
import { ArtifactRenderer } from "./ArtifactRenderer"
import { ArtifactToolbar } from "./ArtifactToolbar"
import { ArtifactSearch } from "./search/ArtifactSearch"
import { ArtifactFilter, type ArtifactFilters } from "./search/ArtifactFilter"

interface ArtifactCanvasProps {
  className?: string
  isCanvasOpen: boolean
  onCloseCanvas: () => void
}

export function ArtifactCanvas({ className, isCanvasOpen, onCloseCanvas }: ArtifactCanvasProps) {
  const { isMobile } = useDevice()
  const [canvasLayout, setCanvasLayout] = useState<"split" | "full" | "minimal">("split")
  const [collaboratingAgents] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<ArtifactFilters>({
    type: "all",
    dateRange: "all",
    sortBy: "date-modified",
    sortOrder: "desc",
    tags: [],
    collaborators: [],
  })

  const artifacts: any[] = []
  const activeArtifactId: string | null = null

  const filteredArtifacts = useMemo(() => {
    if (!artifacts) return []

    let filtered = [...artifacts]

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter((artifact) => {
        const title = artifact.data?.title?.toLowerCase() || ""
        const content = JSON.stringify(artifact.data).toLowerCase()
        const query = searchQuery.toLowerCase()
        return title.includes(query) || content.includes(query)
      })
    }

    // Apply type filter
    if (filters.type && filters.type !== "all") {
      filtered = filtered.filter((artifact) => artifact.type === filters.type)
    }

    // Apply date range filter
    if (filters.dateRange && filters.dateRange !== "all") {
      const now = Date.now()
      const ranges = {
        today: 24 * 60 * 60 * 1000,
        week: 7 * 24 * 60 * 60 * 1000,
        month: 30 * 24 * 60 * 60 * 1000,
      }
      const range = ranges[filters.dateRange]
      if (range) {
        filtered = filtered.filter((artifact) => {
          const createdAt = artifact.createdAt ? new Date(artifact.createdAt).getTime() : now
          return now - createdAt <= range
        })
      }
    }

    // Apply sorting
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        let comparison = 0
        switch (filters.sortBy) {
          case "name":
            comparison = (a.data?.title || "").localeCompare(b.data?.title || "")
            break
          case "date-created":
            comparison = (a.createdAt || 0) - (b.createdAt || 0)
            break
          case "date-modified":
            comparison = (a.updatedAt || a.createdAt || 0) - (b.updatedAt || b.createdAt || 0)
            break
          case "type":
            comparison = (a.type || "").localeCompare(b.type || "")
            break
        }
        return filters.sortOrder === "asc" ? comparison : -comparison
      })
    }

    return filtered
  }, [artifacts, searchQuery, filters])

  if (!isCanvasOpen) return null

  const getLayoutIcon = () => {
    switch (canvasLayout) {
      case "full":
        return <Minimize2 className="h-4 w-4" />
      case "minimal":
        return <Maximize2 className="h-4 w-4" />
      default:
        return <Maximize2 className="h-4 w-4" />
    }
  }

  const toggleLayout = () => {
    const layouts: Array<"split" | "full" | "minimal"> = ["split", "full", "minimal"]
    const currentIndex = layouts.indexOf(canvasLayout)
    const nextIndex = (currentIndex + 1) % layouts.length
    setCanvasLayout(layouts[nextIndex])
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`fixed inset-0 z-50 bg-background/80 backdrop-blur-sm ${className}`}
      >
        <div className="h-full flex flex-col">
          {/* Canvas Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-between p-4 border-b border-border/50 bg-background/90 backdrop-blur-sm"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Sparkles className="h-5 w-5 text-primary" />
                </motion.div>
                <h2 className="text-lg font-semibold">Collaborative Canvas</h2>
              </div>

              {activeArtifactId && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  {activeArtifactId}
                </Badge>
              )}

              {collaboratingAgents.length > 0 && (
                <Badge variant="default" className="flex items-center gap-1 animate-pulse">
                  <Users className="h-3 w-3" />
                  {collaboratingAgents.length} AI{collaboratingAgents.length > 1 ? "s" : ""} collaborating
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={toggleLayout} className="flex items-center gap-1">
                {getLayoutIcon()}
                {canvasLayout}
              </Button>

              <Separator orientation="vertical" className="h-6" />

              <Button variant="ghost" size="sm" onClick={onCloseCanvas}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          {/* Canvas Content */}
          <div className="flex-1 overflow-hidden">
            {canvasLayout === "full" ? (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="h-full p-6"
              >
                <Card className="h-full bg-gradient-to-br from-background to-muted/20 border-border/50">
                  <div className="h-full flex flex-col">
                    <ArtifactToolbar />
                    <div className="flex-1 overflow-hidden">
                      <ArtifactRenderer artifactId={activeArtifactId} />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ) : (
              <ResizablePanelGroup direction="horizontal" className="h-full">
                {/* Left Panel - Artifact List/Navigator with Search & Filter */}
                <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
                  <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="h-full p-4">
                    <Card className="h-full bg-gradient-to-br from-muted/20 to-background border-border/50 flex flex-col">
                      <div className="p-4 border-b border-border/50">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Artifacts
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowFilters(!showFilters)}
                            className={isMobile ? "min-h-[44px] min-w-[44px]" : ""}
                          >
                            <SlidersHorizontal className="h-4 w-4" />
                          </Button>
                        </div>

                        <ArtifactSearch onSearch={setSearchQuery} className="mb-3" />

                        <AnimatePresence>
                          {showFilters && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <ArtifactFilter
                                filters={filters}
                                onFiltersChange={setFilters}
                                availableTags={["meeting", "project", "report", "analysis"]}
                                availableCollaborators={["GPT-4", "Claude-3.5", "Llama-3", "Gemini"]}
                                className="mt-3"
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="flex-1 overflow-y-auto p-4">
                        <div className="space-y-2">
                          {filteredArtifacts && filteredArtifacts.length > 0 ? (
                            <>
                              {(searchQuery || filters.type !== "all") && (
                                <div className="text-xs text-muted-foreground mb-2">
                                  {filteredArtifacts.length} result{filteredArtifacts.length !== 1 ? "s" : ""}
                                  {searchQuery && ` for "${searchQuery}"`}
                                </div>
                              )}
                              {filteredArtifacts.map((artifact: any) => (
                                <div
                                  key={artifact.id}
                                  className="p-3 rounded-lg bg-primary/10 border border-primary/20 cursor-pointer hover:bg-primary/20 transition-colors"
                                >
                                  <div className="flex items-center gap-2 mb-1">
                                    <FileText className="h-3 w-3" />
                                    <span className="text-sm font-medium">{artifact.data?.title || artifact.id}</span>
                                  </div>
                                  <p className="text-xs text-muted-foreground">{artifact.type || "Artifact"}</p>
                                </div>
                              ))}
                            </>
                          ) : searchQuery || filters.type !== "all" ? (
                            <div className="p-3 rounded-lg bg-muted/50 border border-border/50 text-center">
                              <p className="text-sm text-muted-foreground">No artifacts found</p>
                              <p className="text-xs text-muted-foreground/70 mt-1">
                                Try adjusting your search or filters
                              </p>
                            </div>
                          ) : (
                            <div className="p-3 rounded-lg bg-muted/50 border border-border/50 text-center">
                              <p className="text-sm text-muted-foreground">No artifacts created yet</p>
                              <p className="text-xs text-muted-foreground/70 mt-1">
                                Ask an AI agent to create documents, tables, or checklists
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </ResizablePanel>

                <ResizableHandle withHandle />

                {/* Right Panel - Active Artifact */}
                <ResizablePanel defaultSize={75}>
                  <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="h-full p-4">
                    <Card className="h-full bg-gradient-to-br from-background to-muted/20 border-border/50">
                      <div className="h-full flex flex-col">
                        <ArtifactToolbar />
                        <div className="flex-1 overflow-hidden">
                          <ArtifactRenderer artifactId={activeArtifactId} />
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </ResizablePanel>
              </ResizablePanelGroup>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

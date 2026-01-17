"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bookmark, Search, Folder, Tag, Trash2, Edit, Plus, Calendar, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDevice } from "@/contexts/DeviceProvider"
import { BookmarkManager } from "@/lib/chat/bookmarks"
import type { Bookmark as BookmarkType } from "@/lib/chat/bookmarks"
import { BookmarkEditor } from "./BookmarkEditor"
import { CollectionManager } from "./CollectionManager"

interface BookmarkPanelProps {
  sessionId?: string
  onNavigateToMessage?: (messageId: string) => void
  className?: string
}

export function BookmarkPanel({ sessionId, onNavigateToMessage, className }: BookmarkPanelProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null)
  const [editingBookmark, setEditingBookmark] = useState<BookmarkType | null>(null)
  const [showCollectionManager, setShowCollectionManager] = useState(false)
  const { isMobile } = useDevice()

  const bookmarks = useMemo(() => {
    let filtered = sessionId ? BookmarkManager.getBookmarksBySession(sessionId) : BookmarkManager.getAllBookmarks()

    if (searchQuery) {
      filtered = BookmarkManager.searchBookmarks(searchQuery)
    }

    if (selectedCollection) {
      filtered = filtered.filter((b) => b.collectionId === selectedCollection)
    }

    return filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }, [sessionId, searchQuery, selectedCollection])

  const collections = BookmarkManager.getAllCollections()
  const stats = BookmarkManager.getStats()

  const handleDeleteBookmark = (bookmarkId: string) => {
    BookmarkManager.deleteBookmark(bookmarkId)
    setEditingBookmark(null)
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (days === 0) return "Today"
    if (days === 1) return "Yesterday"
    if (days < 7) return `${days} days ago`
    return date.toLocaleDateString()
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader className={cn(isMobile && "p-4")}>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className={cn("flex items-center gap-2", isMobile ? "text-base" : "text-lg")}>
              <Bookmark className="h-5 w-5 text-primary" />
              Bookmarks
            </CardTitle>
            <CardDescription className={cn(isMobile && "text-xs")}>
              {stats.totalBookmarks} saved {stats.totalBookmarks === 1 ? "message" : "messages"}
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCollectionManager(true)}
            className={cn(isMobile && "h-8 px-2 text-xs")}
          >
            <Folder className="h-4 w-4 mr-1" />
            Collections
          </Button>
        </div>

        {/* Search */}
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search bookmarks..."
            className={cn("pl-9", isMobile && "h-9 text-sm")}
          />
        </div>
      </CardHeader>

      <CardContent className={cn("space-y-4", isMobile && "p-4 pt-0")}>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className={cn("w-full grid", collections.length > 3 ? "grid-cols-4" : "grid-cols-3")}>
            <TabsTrigger value="all" onClick={() => setSelectedCollection(null)} className="text-xs">
              All
            </TabsTrigger>
            {collections.slice(0, 2).map((collection) => (
              <TabsTrigger
                key={collection.id}
                value={collection.id}
                onClick={() => setSelectedCollection(collection.id)}
                className="text-xs"
              >
                <span className="mr-1">{collection.icon}</span>
                {!isMobile && collection.name}
              </TabsTrigger>
            ))}
            {collections.length > 2 && (
              <TabsTrigger value="more" onClick={() => setShowCollectionManager(true)} className="text-xs">
                <Plus className="h-3 w-3" />
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <ScrollArea className={cn(isMobile ? "h-[400px]" : "h-[500px]")}>
              <div className="space-y-2">
                <AnimatePresence>
                  {bookmarks.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <Bookmark className="h-12 w-12 text-muted-foreground/50 mb-3" />
                      <p className="text-sm text-muted-foreground">No bookmarks yet</p>
                      <p className="text-xs text-muted-foreground mt-1">Bookmark messages to save them for later</p>
                    </motion.div>
                  ) : (
                    bookmarks.map((bookmark, index) => (
                      <motion.div
                        key={bookmark.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className={cn(
                          "group p-3 bg-muted/50 rounded-lg border border-border",
                          "hover:bg-muted transition-colors cursor-pointer",
                        )}
                        onClick={() => onNavigateToMessage?.(bookmark.messageId)}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              "shrink-0 w-8 h-8 rounded-lg flex items-center justify-center",
                              bookmark.collectionId
                                ? collections.find((c) => c.id === bookmark.collectionId)?.color
                                : "bg-primary/10",
                            )}
                          >
                            <MessageSquare className="h-4 w-4" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{formatDate(bookmark.createdAt)}</span>
                              {bookmark.collectionId && (
                                <Badge variant="outline" className="text-xs h-5">
                                  {collections.find((c) => c.id === bookmark.collectionId)?.icon}{" "}
                                  {collections.find((c) => c.id === bookmark.collectionId)?.name}
                                </Badge>
                              )}
                            </div>

                            {bookmark.note && (
                              <p
                                className={cn(
                                  "text-muted-foreground line-clamp-2 mb-2",
                                  isMobile ? "text-xs" : "text-sm",
                                )}
                              >
                                {bookmark.note}
                              </p>
                            )}

                            {bookmark.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {bookmark.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs h-5">
                                    <Tag className="h-2 w-2 mr-1" />
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                setEditingBookmark(bookmark)
                              }}
                              className="h-7 w-7 p-0"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteBookmark(bookmark.id)
                              }}
                              className="h-7 w-7 p-0 text-destructive"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        {/* Top Tags */}
        {stats.topTags.length > 0 && (
          <div className="pt-4 border-t border-border">
            <h4 className={cn("font-medium mb-2", isMobile ? "text-xs" : "text-sm")}>Popular Tags</h4>
            <div className="flex flex-wrap gap-1">
              {stats.topTags.map((tag) => (
                <Badge
                  key={tag.tag}
                  variant="outline"
                  className="text-xs cursor-pointer hover:bg-primary/10"
                  onClick={() => setSearchQuery(tag.tag)}
                >
                  <Tag className="h-2 w-2 mr-1" />
                  {tag.tag} ({tag.count})
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      {/* Bookmark Editor Modal */}
      {editingBookmark && <BookmarkEditor bookmark={editingBookmark} onClose={() => setEditingBookmark(null)} />}

      {/* Collection Manager Modal */}
      {showCollectionManager && <CollectionManager onClose={() => setShowCollectionManager(false)} />}
    </Card>
  )
}

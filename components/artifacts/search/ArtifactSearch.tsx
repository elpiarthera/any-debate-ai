"use client"

import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useDevice } from "@/contexts/DeviceProvider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, X, Clock, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface ArtifactSearchProps {
  onSearch: (query: string) => void
  placeholder?: string
  className?: string
}

export function ArtifactSearch({ onSearch, placeholder = "Search artifacts...", className }: ArtifactSearchProps) {
  const { isMobile } = useDevice()
  const [query, setQuery] = useState("")
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("anydebate_recent_searches")
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored))
      } catch (error) {
        console.error("[v0] Failed to load recent searches:", error)
      }
    }
  }, [])

  // Save search to recent searches
  const saveSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) return

    setRecentSearches((prev) => {
      const updated = [searchQuery, ...prev.filter((s) => s !== searchQuery)].slice(0, 5)
      localStorage.setItem("anydebate_recent_searches", JSON.stringify(updated))
      return updated
    })
  }, [])

  // Handle search
  const handleSearch = useCallback(
    (searchQuery: string) => {
      setQuery(searchQuery)
      onSearch(searchQuery)
      if (searchQuery.trim()) {
        saveSearch(searchQuery)
      }
      setShowSuggestions(false)
    },
    [onSearch, saveSearch],
  )

  // Handle clear
  const handleClear = useCallback(() => {
    setQuery("")
    onSearch("")
    setShowSuggestions(false)
  }, [onSearch])

  // Popular search suggestions
  const popularSearches = ["documents", "tables", "checklists", "charts", "recent", "shared"]

  return (
    <div className={cn("relative", className)}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(query)
            }
            if (e.key === "Escape") {
              handleClear()
            }
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className={cn("pl-10 pr-10 bg-background/50 border-border/50", isMobile ? "min-h-[48px] text-base" : "h-10")}
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className={cn(
              "absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0",
              isMobile && "min-h-[44px] min-w-[44px]",
            )}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Search Suggestions */}
      <AnimatePresence>
        {showSuggestions && (query || recentSearches.length > 0 || popularSearches.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={cn(
              "absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg z-50 overflow-hidden",
              isMobile && "max-h-[60vh] overflow-y-auto",
            )}
          >
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="p-3 border-b border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">Recent Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleSearch(search)}
                      className={cn(
                        "px-3 py-1.5 rounded-md bg-muted/50 hover:bg-muted text-sm transition-colors",
                        isMobile && "min-h-[44px] px-4",
                      )}
                    >
                      {search}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Searches */}
            {popularSearches.length > 0 && (
              <div className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">Popular Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((search, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className={cn(
                        "cursor-pointer hover:bg-primary/20 transition-colors",
                        isMobile && "min-h-[44px] px-4 text-sm",
                      )}
                      onClick={() => handleSearch(search)}
                    >
                      {search}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close suggestions */}
      {showSuggestions && (
        <div className="fixed inset-0 z-40" onClick={() => setShowSuggestions(false)} aria-hidden="true" />
      )}
    </div>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, Clock, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useDevice } from "@/contexts/DeviceProvider"
import { MessageSearch as SearchService } from "@/lib/chat/search"
import type { ChatMessage, SearchQuery } from "@/lib/chat/types"

interface MessageSearchProps {
  messages: ChatMessage[]
  onResultClick: (messageId: string) => void
  onClose?: () => void
}

export function MessageSearch({ messages, onResultClick, onClose }: MessageSearchProps) {
  const [query, setQuery] = useState<SearchQuery>({ text: "" })
  const [results, setResults] = useState<ReturnType<typeof SearchService.search>>([])
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { isMobile } = useDevice()

  useEffect(() => {
    setSearchHistory(SearchService.getSearchHistory())
  }, [])

  useEffect(() => {
    if (query.text.trim()) {
      const searchResults = SearchService.search(messages, query)
      setResults(searchResults)
      setSuggestions(SearchService.getSuggestions(query.text, messages))
    } else {
      setResults([])
      setSuggestions([])
    }
  }, [query, messages])

  const handleSearch = (text: string) => {
    setQuery({ ...query, text })
    setShowSuggestions(text.length > 0)
  }

  const handleClearSearch = () => {
    setQuery({ text: "" })
    setResults([])
    setSuggestions([])
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  const handleHistoryClick = (historyQuery: string) => {
    setQuery({ ...query, text: historyQuery })
    setShowSuggestions(false)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery({ ...query, text: suggestion })
    setShowSuggestions(false)
  }

  const highlightMatch = (text: string, searchText: string) => {
    if (!searchText) return text
    const index = text.toLowerCase().indexOf(searchText.toLowerCase())
    if (index === -1) return text

    return (
      <>
        {text.slice(0, index)}
        <mark className="bg-primary/30 text-foreground">{text.slice(index, index + searchText.length)}</mark>
        {text.slice(index + searchText.length)}
      </>
    )
  }

  return (
    <div className={cn("flex flex-col h-full", isMobile ? "p-4" : "p-6")}>
      {/* Search Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            value={query.text}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={isMobile ? "Search messages..." : "Search messages by content..."}
            className={cn("pl-10 pr-10", isMobile ? "h-12 text-base" : "h-11")}
            autoFocus
          />
          {query.text && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearSearch}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size={isMobile ? "default" : "sm"}
            onClick={onClose}
            className={cn(isMobile && "h-12 px-4")}
          >
            Close
          </Button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-3 bg-muted rounded-lg"
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Suggestions</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer hover:bg-secondary/80"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </Badge>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search History */}
      {!query.text && searchHistory.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Recent Searches</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                SearchService.clearHistory()
                setSearchHistory([])
              }}
              className="ml-auto h-6 text-xs"
            >
              Clear
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((historyQuery, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-accent"
                onClick={() => handleHistoryClick(historyQuery)}
              >
                {historyQuery}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Results Count */}
      {query.text && (
        <div className="mb-3">
          <span className="text-sm text-muted-foreground">
            {results.length} {results.length === 1 ? "result" : "results"} found
          </span>
        </div>
      )}

      {/* Search Results */}
      <ScrollArea className="flex-1">
        <div className={cn("space-y-3", isMobile ? "pb-safe" : "")}>
          <AnimatePresence>
            {results.map((result, index) => (
              <motion.div
                key={result.messageId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onResultClick(result.messageId)}
                className={cn(
                  "p-4 bg-card border border-border rounded-lg cursor-pointer",
                  "hover:bg-accent transition-colors",
                  isMobile && "active:scale-98",
                )}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={result.message.sender.type === "user" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {result.message.sender.name}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {result.message.timestamp.toLocaleString([], {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
                <p className={cn("text-sm leading-relaxed", isMobile ? "text-sm" : "text-sm")}>
                  {highlightMatch(result.context, query.text)}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>

          {query.text && results.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <Search className="h-12 w-12 text-muted-foreground/50 mb-3" />
              <p className="text-sm text-muted-foreground">No messages found</p>
              <p className="text-xs text-muted-foreground/70 mt-1">Try a different search term</p>
            </motion.div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

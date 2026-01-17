"use client"

import { useState } from "react"
import { Filter, Calendar, User, MessageSquare, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { useDevice } from "@/contexts/DeviceProvider"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import type { SearchQuery, ChatMessage } from "@/lib/chat/types"

interface SearchFiltersProps {
  query: SearchQuery
  onQueryChange: (query: SearchQuery) => void
  messages: ChatMessage[]
}

export function SearchFilters({ query, onQueryChange, messages }: SearchFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { isMobile } = useDevice()

  // Get unique senders
  const senders = Array.from(new Set(messages.map((m) => m.sender.name)))

  const activeFiltersCount = [query.sender, query.dateFrom, query.dateTo, query.messageType].filter(Boolean).length

  const handleClearFilters = () => {
    onQueryChange({
      text: query.text,
      sender: undefined,
      dateFrom: undefined,
      dateTo: undefined,
      messageType: undefined,
    })
  }

  const FilterContent = () => (
    <div className={cn("space-y-6", isMobile ? "p-4" : "p-6")}>
      {/* Message Type Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-medium flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Message Type
        </Label>
        <RadioGroup
          value={query.messageType || "all"}
          onValueChange={(value) =>
            onQueryChange({
              ...query,
              messageType: value === "all" ? undefined : (value as "user" | "ai"),
            })
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all" className="font-normal cursor-pointer">
              All Messages
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="user" id="user" />
            <Label htmlFor="user" className="font-normal cursor-pointer">
              User Messages
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ai" id="ai" />
            <Label htmlFor="ai" className="font-normal cursor-pointer">
              AI Messages
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Sender Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-medium flex items-center gap-2">
          <User className="h-4 w-4" />
          Sender
        </Label>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={!query.sender ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => onQueryChange({ ...query, sender: undefined })}
          >
            All
          </Badge>
          {senders.map((sender) => (
            <Badge
              key={sender}
              variant={query.sender === sender ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => onQueryChange({ ...query, sender })}
            >
              {sender}
            </Badge>
          ))}
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Date Range
        </Label>
        <div className="grid grid-cols-2 gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("justify-start text-left font-normal", isMobile && "h-12")}>
                {query.dateFrom ? query.dateFrom.toLocaleDateString() : "From"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={query.dateFrom}
                onSelect={(date) => onQueryChange({ ...query, dateFrom: date })}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("justify-start text-left font-normal", isMobile && "h-12")}>
                {query.dateTo ? query.dateTo.toLocaleDateString() : "To"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={query.dateTo}
                onSelect={(date) => onQueryChange({ ...query, dateTo: date })}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button variant="outline" onClick={handleClearFilters} className={cn("w-full", isMobile && "h-12")}>
          <X className="h-4 w-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
  )

  if (isMobile) {
    return (
      <>
        <Button
          variant="outline"
          size="default"
          onClick={() => setIsOpen(true)}
          className={cn("relative", isMobile && "h-12 px-4")}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>

        <AdaptiveModal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Search Filters">
          <FilterContent />
        </AdaptiveModal>
      </>
    )
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="relative bg-transparent">
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96" align="end">
        <FilterContent />
      </PopoverContent>
    </Popover>
  )
}

"use client"

import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { MarketplaceCardMobile } from "./marketplace-card-mobile"
import type { MarketplaceItem } from "../marketplace-list"

interface MarketplaceListMobileProps {
  items: MarketplaceItem[]
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
  onInstall: (itemId: string) => void
  onUninstall: (itemId: string) => void
}

const categories = ["all", "Agent", "Template Pack", "Extension"]

export function MarketplaceListMobile({
  items,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onInstall,
  onUninstall,
}: MarketplaceListMobileProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Marketplace</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFiltersOpen(true)}
            className="min-h-[44px] min-w-[44px]"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search marketplace..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 min-h-[48px]"
          />
        </div>
      </div>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {items.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No items found</p>
            <p className="text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          items.map((item) => (
            <MarketplaceCardMobile key={item.id} item={item} onInstall={onInstall} onUninstall={onUninstall} />
          ))
        )}
      </div>

      {/* Filters Modal */}
      <AdaptiveModal isOpen={isFiltersOpen} onClose={() => setIsFiltersOpen(false)} title="Filter Items">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-3">Category</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="w-full justify-start min-h-[44px]"
                  onClick={() => {
                    onCategoryChange(category)
                    setIsFiltersOpen(false)
                  }}
                >
                  {category === "all" ? "All Categories" : category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </AdaptiveModal>
    </div>
  )
}

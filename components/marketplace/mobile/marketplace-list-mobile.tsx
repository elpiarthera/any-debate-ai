"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
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

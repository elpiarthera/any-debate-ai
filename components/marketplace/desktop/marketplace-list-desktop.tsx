"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MarketplaceCardDesktop } from "./marketplace-card-desktop"
import type { MarketplaceItem } from "../marketplace-list"

interface MarketplaceListDesktopProps {
  items: MarketplaceItem[]
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
  onInstall: (itemId: string) => void
  onUninstall: (itemId: string) => void
}

const categories = ["all", "Agent", "Template Pack", "Extension"]

export function MarketplaceListDesktop({
  items,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onInstall,
  onUninstall,
}: MarketplaceListDesktopProps) {
  return (
    <div className="flex h-full">
      {/* Sidebar Filters */}
      <div className="w-64 border-r p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <div className="space-y-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                className="w-full justify-start min-h-[44px]"
                onClick={() => onCategoryChange(category)}
              >
                {category === "all" ? "All Categories" : category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Marketplace</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Discover and install AI agents, templates, and extensions
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search marketplace..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 min-h-[48px]"
            />
          </div>
        </div>

        {/* Items Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg">No items found</p>
              <p className="text-sm mt-2">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item) => (
                <MarketplaceCardDesktop key={item.id} item={item} onInstall={onInstall} onUninstall={onUninstall} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

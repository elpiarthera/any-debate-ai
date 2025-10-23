"use client"

import { useState } from "react"
import { useDevice } from "@/contexts/DeviceProvider"
import { useToast } from "@/hooks/use-toast"
import { MarketplaceListMobile } from "./mobile/marketplace-list-mobile"
import { MarketplaceListDesktop } from "./desktop/marketplace-list-desktop"

export interface MarketplaceItem {
  id: string
  title: string
  description: string
  category: string
  rating: number
  downloads: number
  icon: string
  color: string
  price: string
  isInstalled: boolean
}

const mockMarketplaceItems: MarketplaceItem[] = [
  {
    id: "1",
    title: "Expert Analyst Agent",
    description: "Specialized in data analysis and insights",
    category: "Agent",
    rating: 4.8,
    downloads: 1234,
    icon: "Brain",
    color: "bg-purple-500/10 text-purple-500",
    price: "Free",
    isInstalled: false,
  },
  {
    id: "2",
    title: "Debate Moderator",
    description: "Keeps discussions on track and balanced",
    category: "Agent",
    rating: 4.9,
    downloads: 2341,
    icon: "Users",
    color: "bg-blue-500/10 text-blue-500",
    price: "Free",
    isInstalled: true,
  },
  {
    id: "3",
    title: "Quick Start Pack",
    description: "Collection of popular debate templates",
    category: "Template Pack",
    rating: 4.7,
    downloads: 3456,
    icon: "Zap",
    color: "bg-yellow-500/10 text-yellow-500",
    price: "Free",
    isInstalled: false,
  },
  {
    id: "4",
    title: "Advanced Reasoning Agent",
    description: "Deep analytical thinking and problem solving",
    category: "Agent",
    rating: 4.9,
    downloads: 987,
    icon: "MessageSquare",
    color: "bg-green-500/10 text-green-500",
    price: "Premium",
    isInstalled: false,
  },
]

interface MarketplaceListProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  onOpenFilters?: () => void
}

export function MarketplaceList({ selectedCategory, onCategoryChange, onOpenFilters }: MarketplaceListProps) {
  const { isMobile } = useDevice()
  const { toast } = useToast()
  const [items, setItems] = useState<MarketplaceItem[]>(mockMarketplaceItems)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleInstall = (itemId: string) => {
    const item = items.find((i) => i.id === itemId)
    setItems((prev) => prev.map((i) => (i.id === itemId ? { ...i, isInstalled: true } : i)))
    toast({
      title: "Installation started",
      description: `Installing "${item?.title}"...`,
    })
  }

  const handleUninstall = (itemId: string) => {
    const item = items.find((i) => i.id === itemId)
    setItems((prev) => prev.map((i) => (i.id === itemId ? { ...i, isInstalled: false } : i)))
    toast({
      title: "Uninstalled",
      description: `"${item?.title}" has been removed.`,
    })
  }

  const sharedProps = {
    items: filteredItems,
    searchQuery,
    onSearchChange: setSearchQuery,
    selectedCategory,
    onCategoryChange,
    onInstall: handleInstall,
    onUninstall: handleUninstall,
    onOpenFilters,
  }

  return isMobile ? <MarketplaceListMobile {...sharedProps} /> : <MarketplaceListDesktop {...sharedProps} />
}

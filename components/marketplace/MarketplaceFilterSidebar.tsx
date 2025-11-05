"use client"

import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"

interface MarketplaceFilterSidebarProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

const categories = ["all", "Agent", "Template Pack", "Extension"]

export function MarketplaceFilterSidebar({
  isCollapsed,
  onToggleCollapse,
  selectedCategory,
  onCategoryChange,
}: MarketplaceFilterSidebarProps) {
  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 56 : 256 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="border-r border-border/50 bg-background flex flex-col h-full shrink-0"
    >
      {/* Header */}
      <div className="h-[73px] border-b border-border/50 flex items-center justify-between px-4 shrink-0">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              key="expanded-header"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2"
            >
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Filters</span>
            </motion.div>
          )}
        </AnimatePresence>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="h-8 w-8 p-0 shrink-0"
          aria-label={isCollapsed ? "Expand filters" : "Collapse filters"}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {isCollapsed ? (
            <motion.div
              key="collapsed-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-center py-8"
            >
              <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
            </motion.div>
          ) : (
            <motion.div
              key="expanded-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="p-4 space-y-6"
            >
              <div>
                <h2 className="text-sm font-semibold mb-3">Categories</h2>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "ghost"}
                      className="w-full justify-start min-h-[40px]"
                      onClick={() => onCategoryChange(category)}
                    >
                      {category === "all" ? "All Categories" : category}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

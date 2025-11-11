"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, ChevronRight, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDevice } from "@/contexts/DeviceProvider"

interface AgentFilterSidebarProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
  selectedFilter: string
  onFilterChange: (filter: string) => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

const filters = ["All", "Favorites", "Templates"]

const categories = [
  { name: "All Categories", count: null },
  { name: "Business & Strategy", count: 2 },
  { name: "Technology & Engineering", count: 3 },
  { name: "Creative & Design", count: 2 },
  { name: "Research & Analysis", count: 1 },
  { name: "Communication & Media", count: 0 },
  { name: "Education & Training", count: 0 },
  { name: "Healthcare & Science", count: 0 },
  { name: "Legal & Compliance", count: 0 },
]

export function AgentFilterSidebar({
  isCollapsed,
  onToggleCollapse,
  selectedFilter,
  onFilterChange,
  selectedCategory,
  onCategoryChange,
}: AgentFilterSidebarProps) {
  const { isMobile, isTablet } = useDevice()

  const getWidth = () => {
    if (isMobile) return "100%" // Full width on mobile when in modal
    if (isTablet) return isCollapsed ? "64px" : "280px" // Narrower on tablet
    return isCollapsed ? "64px" : "320px" // Full width on desktop
  }

  return (
    <motion.div
      className={cn(
        "h-full bg-sidebar border-r border-sidebar-border flex flex-col",
        isMobile && "border-r-0", // No border on mobile when in modal
      )}
      animate={{ width: getWidth() }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ width: isMobile ? "100%" : undefined }} // Override for mobile
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border shrink-0 h-[72px] flex items-center">
        <div className="flex items-center justify-between w-full">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-2"
              >
                <Filter className="h-5 w-5 text-sidebar-foreground" />
                <h2 className="font-semibold text-sidebar-foreground">Filters</h2>
              </motion.div>
            )}
          </AnimatePresence>

          {!isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="h-8 w-8 p-0 hover:bg-sidebar-accent"
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </div>

      {/* Filters and Categories List */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4">
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6"
                >
                  {/* Filters Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      {filters.map((filter) => (
                        <button
                          key={filter}
                          onClick={() => onFilterChange(filter)}
                          className={cn(
                            "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                            selectedFilter === filter
                              ? "bg-sidebar-accent text-sidebar-accent-foreground"
                              : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50",
                          )}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Categories Section */}
                  <div>
                    <h3 className="text-sm font-semibold text-sidebar-foreground mb-3">Categories</h3>
                    <div className="space-y-1">
                      {categories.map((category) => (
                        <button
                          key={category.name}
                          onClick={() => onCategoryChange(category.name)}
                          className={cn(
                            "w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors",
                            selectedCategory === category.name
                              ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                              : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50",
                          )}
                        >
                          <span className="truncate">{category.name}</span>
                          {category.count !== null && (
                            <span className="text-xs text-sidebar-foreground/40 ml-2">{category.count}</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-2"
              >
                <Filter className="h-5 w-5 text-sidebar-foreground" />
              </motion.div>
            )}
          </div>
        </ScrollArea>
      </div>
    </motion.div>
  )
}

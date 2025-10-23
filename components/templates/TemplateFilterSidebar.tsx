"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useDevice } from "@/contexts/DeviceProvider"

interface TemplateFilterSidebarProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

const categories = [
  { id: "all", label: "All Categories" },
  { id: "Business", label: "Business" },
  { id: "Engineering", label: "Engineering" },
  { id: "Marketing", label: "Marketing" },
  { id: "Research", label: "Research" },
]

export function TemplateFilterSidebar({
  isCollapsed,
  onToggleCollapse,
  selectedCategory,
  onCategoryChange,
}: TemplateFilterSidebarProps) {
  const { isMobile, isTablet } = useDevice()

  const getWidth = () => {
    if (isMobile) return "100%"
    if (isTablet) return isCollapsed ? "64px" : "280px"
    return isCollapsed ? "64px" : "320px"
  }

  return (
    <motion.div
      className={cn("h-full bg-sidebar border-r border-sidebar-border flex flex-col", isMobile && "border-r-0")}
      animate={{ width: getWidth() }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ width: isMobile ? "100%" : undefined }}
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border shrink-0">
        <div className="flex items-center justify-between">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-5 w-5 text-sidebar-foreground" />
                <h2 className="font-semibold text-sidebar-foreground">Template Filters</h2>
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

      {/* Categories List */}
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
                  {/* Categories Section */}
                  <div>
                    <h3 className="text-sm font-semibold text-sidebar-foreground mb-3">Categories</h3>
                    <div className="space-y-1">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => onCategoryChange(category.id)}
                          className={cn(
                            "w-full flex items-center justify-start px-3 py-2 rounded-md text-sm transition-colors",
                            selectedCategory === category.id
                              ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                              : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50",
                          )}
                        >
                          <span className="truncate">{category.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </div>
    </motion.div>
  )
}

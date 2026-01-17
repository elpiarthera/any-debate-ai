"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, ChevronRight, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDevice } from "@/contexts/DeviceProvider"

interface FrameworkFilterSidebarProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
  selectedFilter: string
  onFilterChange: (filter: string) => void
}

const filters = ["All", "My Frameworks", "System"]

export function FrameworkFilterSidebar({
  isCollapsed,
  onToggleCollapse,
  selectedFilter,
  onFilterChange,
}: FrameworkFilterSidebarProps) {
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

      {/* Filters List */}
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
                    <div className="flex flex-col gap-1">
                      {filters.map((filter) => (
                        <button
                          key={filter}
                          onClick={() => onFilterChange(filter)}
                          className={cn(
                            "w-full px-3 py-2 rounded-md text-sm font-medium transition-colors text-left",
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

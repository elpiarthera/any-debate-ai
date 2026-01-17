"use client"

import { useDevice } from "@/contexts/DeviceProvider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import type { ReactNode } from "react"

interface NavigationItem {
  id: string
  title: string
  duration?: number
  isComplete?: boolean
  children?: ReactNode
}

interface AdaptiveNavigationProps {
  items: NavigationItem[]
  activeItem: string
  onItemChange: (itemId: string) => void
  expandedItems?: Set<string>
  onToggleExpanded?: (itemId: string) => void
}

export function AdaptiveNavigation({
  items,
  activeItem,
  onItemChange,
  expandedItems,
  onToggleExpanded,
}: AdaptiveNavigationProps) {
  const { isMobile } = useDevice()

  if (isMobile) {
    return (
      <div className="space-y-4" role="navigation" aria-label="Navigation">
        {items.map((item) => (
          <div key={item.id} className="border border-border rounded-lg overflow-hidden">
            <button
              className="w-full text-left p-4 flex items-center justify-between hover:bg-muted transition-colors"
              onClick={() => onToggleExpanded?.(item.id)}
              aria-expanded={expandedItems?.has(item.id)}
              aria-controls={`content-${item.id}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    item.isComplete ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {item.isComplete ? <Check className="h-4 w-4" /> : items.indexOf(item) + 1}
                </div>
                <div>
                  <h3 className="text-foreground text-base font-medium">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{item.isComplete ? "Complete" : "In progress"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {item.duration && (
                  <span className="text-xs px-2 py-1 rounded bg-primary text-primary-foreground">{item.duration}s</span>
                )}
                {expandedItems?.has(item.id) ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </button>

            {expandedItems?.has(item.id) && (
              <div id={`content-${item.id}`} className="p-4 border-t border-border">
                {item.children}
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <Tabs value={activeItem} onValueChange={onItemChange} className="w-full">
      <TabsList className="grid w-full bg-muted p-1" style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}>
        {items.map((item) => (
          <TabsTrigger
            key={item.id}
            value={item.id}
            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground"
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                item.isComplete ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
              }`}
            >
              {item.isComplete ? <Check className="h-3 w-3" /> : items.indexOf(item) + 1}
            </div>
            <span className="hidden sm:inline">{item.title}</span>
            {item.duration && (
              <span className="text-xs px-1 py-0.5 rounded bg-muted text-muted-foreground">{item.duration}s</span>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

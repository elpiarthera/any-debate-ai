"use client"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { TemplateCategory } from "@/lib/templates/types"
import { useDevice } from "@/contexts/DeviceProvider"

interface TemplateCategoryChipsProps {
  categories: (TemplateCategory | "All")[]
  selectedCategory: TemplateCategory | "All"
  onSelectCategory: (category: TemplateCategory | "All") => void
}

export function TemplateCategoryChips({ categories, selectedCategory, onSelectCategory }: TemplateCategoryChipsProps) {
  const { isMobile } = useDevice()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftScroll, setShowLeftScroll] = useState(false)
  const [showRightScroll, setShowRightScroll] = useState(false)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setShowLeftScroll(scrollLeft > 0)
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener("scroll", checkScroll)
      checkScroll()
      return () => scrollElement.removeEventListener("scroll", checkScroll)
    }
  }, [])

  if (!categories || !Array.isArray(categories)) {
    return null
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  if (isMobile) {
    return (
      <div className="relative">
        <ScrollArea className="w-full" orientation="horizontal">
          <div ref={scrollRef} className="flex gap-2 pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => onSelectCategory(category)}
                className="whitespace-nowrap text-xs h-9 px-4 min-w-[48px]"
                aria-pressed={selectedCategory === category}
              >
                {category}
              </Button>
            ))}
          </div>
        </ScrollArea>
        {showLeftScroll && (
          <div className="absolute left-0 top-0 bottom-2 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        )}
        {showRightScroll && (
          <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        )}
      </div>
    )
  }

  return (
    <div className="relative flex items-center gap-2">
      {showLeftScroll && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => scroll("left")}
          className="h-8 w-8 p-0 flex-shrink-0"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}
      <ScrollArea className="flex-1" orientation="horizontal">
        <div ref={scrollRef} className="flex gap-2 pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => onSelectCategory(category)}
              className="whitespace-nowrap text-xs h-8 px-3"
              aria-pressed={selectedCategory === category}
            >
              {category}
            </Button>
          ))}
        </div>
      </ScrollArea>
      {showRightScroll && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => scroll("right")}
          className="h-8 w-8 p-0 flex-shrink-0"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

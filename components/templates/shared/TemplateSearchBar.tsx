"use client"

import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useDevice } from "@/contexts/DeviceProvider"

interface TemplateSearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function TemplateSearchBar({ value, onChange, placeholder }: TemplateSearchBarProps) {
  const { isMobile } = useDevice()

  const defaultPlaceholder = isMobile ? "Search templates..." : "Search templates by name, description, or tags..."

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input
        placeholder={placeholder || defaultPlaceholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-10 h-12 text-base"
        aria-label="Search templates"
      />
      {value && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onChange("")}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

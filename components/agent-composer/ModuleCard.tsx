"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, Edit2 } from "lucide-react"
import { useDevice } from "@/contexts/DeviceProvider"

interface ModuleCardProps {
  type: "role" | "persona" | "framework"
  icon: string
  name: string
  description: string
  badge?: string
  onRemove?: () => void
  onEdit?: () => void
  isSelected?: boolean
}

export function ModuleCard({ type, icon, name, description, badge, onRemove, onEdit, isSelected }: ModuleCardProps) {
  const { isMobile } = useDevice()

  return (
    <Card
      className={`min-h-[80px] transition-all ${
        isSelected ? "ring-2 ring-primary bg-primary/5" : ""
      } ${isMobile ? "active:scale-[0.98]" : "hover:shadow-md"}`}
    >
      <CardContent className="p-4 flex items-center gap-3">
        <span className="text-2xl flex-shrink-0">{icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-sm truncate">{name}</h4>
            {badge && (
              <Badge variant="secondary" className="text-xs flex-shrink-0">
                {badge}
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {onEdit && (
            <Button variant="ghost" size="sm" onClick={onEdit} className="h-9 w-9 p-0 min-h-[36px] min-w-[36px]">
              <Edit2 className="h-4 w-4" />
            </Button>
          )}
          {onRemove && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="h-9 w-9 p-0 min-h-[36px] min-w-[36px] text-destructive hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

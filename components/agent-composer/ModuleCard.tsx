"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, Edit2 } from "lucide-react"
import { useDevice } from "@/contexts/DeviceProvider"
import type { Role } from "@/lib/agent-config/roles"
import type { Persona } from "@/lib/agent-config/personas"
import type { ThinkingFramework } from "@/lib/agent-config/frameworks"

interface ModuleCardProps {
  type: "role" | "persona" | "framework"
  module: Role | Persona | ThinkingFramework
  onRemove?: () => void
  onEdit?: () => void
  isSelected?: boolean
  isCustom?: boolean
}

export function ModuleCard({ type, module, onRemove, onEdit, isSelected, isCustom }: ModuleCardProps) {
  const { isMobile } = useDevice()

  const getModuleDetails = () => {
    if (type === "role" && "expertise" in module) {
      return module.expertise.slice(0, 3).join(", ")
    }
    if (type === "persona" && "traits" in module) {
      return module.traits.slice(0, 3).join(", ")
    }
    if (type === "framework" && "steps" in module) {
      return `${module.steps.length} steps`
    }
    return ""
  }

  const details = getModuleDetails()

  return (
    <Card
      className={`min-h-[80px] transition-all ${
        isSelected ? "ring-2 ring-primary bg-primary/5" : ""
      } ${isMobile ? "active:scale-[0.98]" : "hover:shadow-md"}`}
    >
      <CardContent className="p-4 flex items-start gap-3">
        <span className="text-2xl flex-shrink-0 mt-0.5">{module.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-sm truncate">{module.name}</h4>
            {isCustom && (
              <Badge variant="secondary" className="text-xs flex-shrink-0">
                CUSTOM
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{module.description}</p>
          {details && (
            <p className="text-xs text-muted-foreground/80 font-medium truncate">
              {type === "role" && "Expertise: "}
              {type === "persona" && "Traits: "}
              {type === "framework" && ""}
              {details}
            </p>
          )}
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onEdit}
              className="h-9 w-9 p-0 min-h-[36px] min-w-[36px]"
              aria-label="Edit module"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          )}
          {onRemove && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="h-9 w-9 p-0 min-h-[36px] min-w-[36px] text-destructive hover:text-destructive"
              aria-label="Remove module"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

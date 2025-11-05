"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Star, TrendingUp, Brain, Zap, FileText } from "lucide-react"
import type { Template } from "../template-list"

interface TemplateCardMobileProps {
  template: Template
  onUse: (templateId: string) => void
  onFavoriteToggle: (templateId: string) => void
}

const iconMap = {
  TrendingUp,
  Brain,
  Zap,
  FileText,
}

export function TemplateCardMobile({ template, onUse, onFavoriteToggle }: TemplateCardMobileProps) {
  const Icon = iconMap[template.icon as keyof typeof iconMap] || FileText

  return (
    <Card className="p-4 min-h-[80px] active:scale-[0.98] transition-transform">
      <div className="flex gap-3">
        {/* Icon */}
        <div className={`p-3 rounded-lg ${template.color} shrink-0`}>
          <Icon className="h-5 w-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-sm leading-tight">{template.title}</h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 shrink-0"
              onClick={(e) => {
                e.stopPropagation()
                onFavoriteToggle(template.id)
              }}
            >
              <Star className={`h-4 w-4 ${template.isFavorite ? "fill-yellow-500 text-yellow-500" : ""}`} />
            </Button>
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{template.description}</p>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{template.participants}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {template.category}
              </Badge>
            </div>

            <Button size="sm" className="min-h-[36px]" onClick={() => onUse(template.id)}>
              Use
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

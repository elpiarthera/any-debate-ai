"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Star, TrendingUp, Brain, Zap, FileText } from "lucide-react"
import type { Template } from "../template-list"

interface TemplateCardDesktopProps {
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

export function TemplateCardDesktop({ template, onUse, onFavoriteToggle }: TemplateCardDesktopProps) {
  const Icon = iconMap[template.icon as keyof typeof iconMap] || FileText

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className={`p-3 rounded-lg ${template.color}`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{template.category}</Badge>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={(e) => {
                e.stopPropagation()
                onFavoriteToggle(template.id)
              }}
            >
              <Star className={`h-4 w-4 ${template.isFavorite ? "fill-yellow-500 text-yellow-500" : ""}`} />
            </Button>
          </div>
        </div>
        <CardTitle className="mt-4">{template.title}</CardTitle>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{template.participants} participants</span>
          </div>
          <Button size="sm" className="min-h-[44px]" onClick={() => onUse(template.id)}>
            Use Template
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

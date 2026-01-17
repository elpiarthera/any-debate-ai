"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, MessageSquare, BarChart3, ChevronRight, Star, TrendingUp } from "lucide-react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import type { DebateTemplate } from "@/lib/templates/types"

interface TemplateCardCompactProps {
  template: DebateTemplate
  isSelected?: boolean
  onSelect: (template: DebateTemplate) => void
}

const conversationIcons = {
  debate: MessageSquare,
  collaboration: Users,
  analysis: BarChart3,
}

export const TemplateCardCompact = memo(function TemplateCardCompact({
  template,
  isSelected,
  onSelect,
}: TemplateCardCompactProps) {
  const ConversationIcon = conversationIcons[template.conversationType]
  const prefersReducedMotion = useReducedMotion()

  const isPopular = (template.metadata.usageCount || 0) > 10
  const isTrending = (template.metadata.usageCount || 0) > 5

  return (
    <motion.div whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}>
      <Card
        className={`cursor-pointer transition-all duration-200 min-h-[80px] ${
          isSelected ? "ring-2 ring-primary border-primary bg-primary/5" : "active:border-primary/50"
        }`}
        onClick={() => onSelect(template)}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <ConversationIcon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-sm leading-tight line-clamp-1">{template.name}</h3>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {isPopular && <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />}
                  {isTrending && <TrendingUp className="h-3.5 w-3.5 text-green-500" />}
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{template.description}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="text-xs h-5">
                  {template.category}
                </Badge>
                <Badge variant="outline" className="text-xs h-5">
                  {template.agents.length} agents
                </Badge>
                {(template.metadata.usageCount || 0) > 0 && (
                  <Badge variant="outline" className="text-xs h-5">
                    {template.metadata.usageCount} uses
                  </Badge>
                )}
                {template.metadata.tags.slice(0, 1).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs h-5">
                    #{tag}
                  </Badge>
                ))}
                {template.metadata.tags.length > 1 && (
                  <span className="text-xs text-muted-foreground">+{template.metadata.tags.length - 1}</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
})

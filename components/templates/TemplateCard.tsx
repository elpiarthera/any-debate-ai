"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, MessageSquare, BarChart3, ChevronRight, Star, TrendingUp, Copy, Eye } from "lucide-react"
import type { DebateTemplate } from "@/lib/templates/types"
import { useDevice } from "@/contexts/DeviceProvider"

interface TemplateCardProps {
  template: DebateTemplate
  isSelected?: boolean
  onSelect: (template: DebateTemplate) => void
  onQuickPreview?: (template: DebateTemplate) => void
  onDuplicate?: (template: DebateTemplate) => void
  showActions?: boolean
}

const conversationIcons = {
  debate: MessageSquare,
  collaboration: Users,
  analysis: BarChart3,
}

export function TemplateCard({
  template,
  isSelected,
  onSelect,
  onQuickPreview,
  onDuplicate,
  showActions = false,
}: TemplateCardProps) {
  const { isMobile } = useDevice()
  const ConversationIcon = conversationIcons[template.conversationType]

  const isPopular = (template.metadata.usageCount || 0) > 10
  const isTrending = (template.metadata.usageCount || 0) > 5

  return (
    <motion.div whileHover={{ scale: isMobile ? 1 : 1.02 }} whileTap={{ scale: 0.98 }}>
      <Card
        className={`cursor-pointer transition-all duration-200 ${
          isSelected ? "ring-2 ring-primary border-primary bg-primary/5" : "hover:border-primary/50"
        }`}
        onClick={() => onSelect(template)}
      >
        <CardHeader className="pb-2 space-y-1">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2 flex-1 min-w-0">
              <ConversationIcon className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              <CardTitle className="text-sm font-semibold leading-tight line-clamp-1">{template.name}</CardTitle>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              {isPopular && <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />}
              {isTrending && <TrendingUp className="h-3.5 w-3.5 text-green-500" />}
              {isMobile && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
            </div>
          </div>
          <CardDescription className="text-xs line-clamp-2 pl-6">{template.description}</CardDescription>
        </CardHeader>
        <CardContent className="pt-0 pb-3 space-y-3">
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
            {template.metadata.tags.slice(0, isMobile ? 1 : 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs h-5">
                #{tag}
              </Badge>
            ))}
            {template.metadata.tags.length > (isMobile ? 1 : 2) && (
              <span className="text-xs text-muted-foreground">
                +{template.metadata.tags.length - (isMobile ? 1 : 2)}
              </span>
            )}
          </div>

          {showActions && !isMobile && (
            <div className="flex items-center gap-2 pt-2 border-t">
              {onQuickPreview && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs flex-1"
                  onClick={(e) => {
                    e.stopPropagation()
                    onQuickPreview(template)
                  }}
                >
                  <Eye className="h-3.5 w-3.5 mr-1.5" />
                  Preview
                </Button>
              )}
              {onDuplicate && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs flex-1"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDuplicate(template)
                  }}
                >
                  <Copy className="h-3.5 w-3.5 mr-1.5" />
                  Duplicate
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ChevronLeft, X, Users, MessageSquare, BarChart3, Lightbulb, Sparkles } from "lucide-react"
import type { DebateTemplate } from "@/lib/templates/types"
import { TemplateAgentCard } from "@/components/templates/shared/TemplateAgentCard"

interface TemplateDetailMobileProps {
  template: DebateTemplate
  onBack: () => void
  onClose: () => void
  onUseTemplate: () => void
}

const conversationIcons = {
  debate: MessageSquare,
  collaboration: Users,
  analysis: BarChart3,
}

export function TemplateDetailMobile({ template, onBack, onClose, onUseTemplate }: TemplateDetailMobileProps) {
  const ConversationIcon = conversationIcons[template.conversationType]

  return (
    <div className="flex flex-col h-full">
      {/* Sticky Header */}
      <div className="flex-shrink-0 border-b bg-background">
        <div className="flex items-center justify-between p-4 min-h-[56px]">
          <Button variant="ghost" size="sm" onClick={onBack} className="h-9 px-2" aria-label="Back to templates">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h2 className="font-semibold text-base line-clamp-1 flex-1 text-center px-2">{template.name}</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-9 w-9 p-0" aria-label="Close">
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Scrollable Content */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* Template Info */}
          <div>
            <div className="flex items-start gap-3 mb-3">
              <ConversationIcon className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold leading-tight mb-2">{template.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{template.description}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs">
                {template.category}
              </Badge>
              <Badge variant="outline" className="capitalize text-xs">
                {template.conversationType}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {template.agents.length} agents
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Agent Team */}
          <div>
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Agent Team
            </h4>
            <div className="space-y-2">
              {template.agents.map((agent, index) => (
                <TemplateAgentCard key={index} agent={agent} compact />
              ))}
            </div>
          </div>

          {/* Suggested Questions */}
          {template.suggestedQuestions && template.suggestedQuestions.length > 0 && (
            <>
              <Separator />
              <div>
                <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Suggested Questions
                </h4>
                <ul className="space-y-2">
                  {template.suggestedQuestions.map((question, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex gap-2 leading-relaxed">
                      <span className="text-primary flex-shrink-0">•</span>
                      <span>{question}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* Tags */}
          {template.metadata.tags.length > 0 && (
            <>
              <Separator />
              <div>
                <h4 className="font-semibold text-sm mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {template.metadata.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Bottom padding for sticky button */}
          <div className="h-20" />
        </div>
      </ScrollArea>

      {/* Sticky CTA Button */}
      <div className="flex-shrink-0 border-t bg-background p-4">
        <Button onClick={onUseTemplate} className="w-full h-14 text-base flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5" />
          Use This Template
        </Button>
      </div>
    </div>
  )
}

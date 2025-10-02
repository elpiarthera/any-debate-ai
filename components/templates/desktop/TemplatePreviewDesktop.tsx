"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Users, MessageSquare, BarChart3, Lightbulb, Sparkles } from "lucide-react"
import type { DebateTemplate } from "@/lib/templates/types"
import { TemplateAgentCard } from "@/components/templates/shared/TemplateAgentCard"

interface TemplatePreviewDesktopProps {
  template: DebateTemplate | null
  onUseTemplate: () => void
}

const conversationIcons = {
  debate: MessageSquare,
  collaboration: Users,
  analysis: BarChart3,
}

export function TemplatePreviewDesktop({ template, onUseTemplate }: TemplatePreviewDesktopProps) {
  if (!template) {
    return (
      <div className="flex items-center justify-center h-full text-center p-6">
        <div className="space-y-3">
          <Users className="h-12 w-12 mx-auto text-muted-foreground/50" />
          <div>
            <p className="font-medium text-foreground">Select a template</p>
            <p className="text-sm text-muted-foreground">View details and agent configurations</p>
          </div>
        </div>
      </div>
    )
  }

  const ConversationIcon = conversationIcons[template.conversationType]

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-4">
          {/* Header */}
          <div>
            <div className="flex items-start gap-3 mb-2">
              <ConversationIcon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold leading-tight">{template.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{template.description}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
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
            <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Agent Team
            </h4>
            <div className="space-y-2">
              {template.agents.map((agent, index) => (
                <TemplateAgentCard key={index} agent={agent} />
              ))}
            </div>
          </div>

          {/* Suggested Questions */}
          {template.suggestedQuestions && template.suggestedQuestions.length > 0 && (
            <>
              <Separator />
              <div>
                <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
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
                <h4 className="font-medium text-sm mb-3">Tags</h4>
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
        </div>
      </ScrollArea>

      {/* CTA Button */}
      <div className="flex-shrink-0 border-t p-4">
        <Button onClick={onUseTemplate} className="w-full flex items-center justify-center gap-2">
          <Sparkles className="h-4 w-4" />
          Use This Template
        </Button>
      </div>
    </div>
  )
}

"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TemplateCardDesktop } from "./TemplateCardDesktop"
import { TemplatePreviewDesktop } from "./TemplatePreviewDesktop"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import type { DebateTemplate } from "@/lib/templates/types"

interface TemplateListDesktopProps {
  templates: DebateTemplate[]
  selectedTemplate: DebateTemplate | null
  onSelectTemplate: (template: DebateTemplate) => void
  onUseTemplate: (template: DebateTemplate) => void
}

export const TemplateListDesktop = memo(function TemplateListDesktop({
  templates,
  selectedTemplate,
  onSelectTemplate,
  onUseTemplate,
}: TemplateListDesktopProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="grid grid-cols-5 gap-4 h-full overflow-hidden">
      {/* Template List (40%) */}
      <div className="col-span-2 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-2 pr-2">
            {templates.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No templates found</p>
                <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters</p>
              </div>
            ) : (
              templates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                  animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
                  transition={prefersReducedMotion ? { duration: 0 } : { delay: index * 0.03 }}
                >
                  <TemplateCardDesktop
                    template={template}
                    isSelected={selectedTemplate?.id === template.id}
                    onSelect={onSelectTemplate}
                  />
                </motion.div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Preview Pane (60%) */}
      <div className="col-span-3 border-l pl-4 overflow-hidden">
        <TemplatePreviewDesktop template={selectedTemplate} onUseTemplate={onUseTemplate} />
      </div>
    </div>
  )
})

"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TemplateCardCompact } from "./TemplateCardCompact"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import type { DebateTemplate } from "@/lib/templates/types"

interface TemplateListMobileProps {
  templates: DebateTemplate[]
  selectedTemplate: DebateTemplate | null
  onSelectTemplate: (template: DebateTemplate) => void
}

export const TemplateListMobile = memo(function TemplateListMobile({
  templates,
  selectedTemplate,
  onSelectTemplate,
}: TemplateListMobileProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <ScrollArea className="h-full">
      <div className="space-y-3">
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
              <TemplateCardCompact
                template={template}
                isSelected={selectedTemplate?.id === template.id}
                onSelect={onSelectTemplate}
              />
            </motion.div>
          ))
        )}
      </div>
    </ScrollArea>
  )
})

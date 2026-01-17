"use client"

import { motion } from "framer-motion"
import { Columns3, MessageCircle, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { type ChatMode, CHAT_MODES } from "@/lib/chat/modes"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ModeSelectorProps {
  currentMode: ChatMode
  onModeChange: (mode: ChatMode) => void
  className?: string
}

const MODE_ICONS = {
  compare: Columns3,
  debate: MessageCircle,
  "auto-debate": Zap,
}

export function ModeSelector({ currentMode, onModeChange, className }: ModeSelectorProps) {
  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-1 bg-muted/50 rounded-lg p-1", className)}>
        {(Object.keys(CHAT_MODES) as ChatMode[]).map((mode) => {
          const config = CHAT_MODES[mode]
          const Icon = MODE_ICONS[mode]
          const isActive = currentMode === mode

          return (
            <Tooltip key={mode}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onModeChange(mode)}
                  className={cn(
                    "relative px-3 py-1.5 text-sm font-medium transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-mode"
                      className="absolute inset-0 bg-background rounded-md shadow-sm"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{config.name.replace(" Mode", "")}</span>
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs">
                <div className="space-y-2">
                  <p className="font-semibold">{config.name}</p>
                  <p className="text-xs text-muted-foreground">{config.description}</p>
                  <div className="text-xs">
                    <p className="font-medium mb-1">Best for:</p>
                    <ul className="list-disc list-inside space-y-0.5 text-muted-foreground">
                      {config.bestFor.slice(0, 2).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>
    </TooltipProvider>
  )
}

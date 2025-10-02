"use client"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Zap, ZapOff } from "lucide-react"

interface AIModel {
  id: string
  type: "GPT-4" | "Claude-3.5" | "Llama-3" | "Gemini"
  name: string
}

interface AutoModeSwitchProps {
  autoMode: boolean
  onAutoModeChange: (enabled: boolean) => void
  models: AIModel[]
  isDebating: boolean
}

export function AutoModeSwitch({ autoMode, onAutoModeChange, models, isDebating }: AutoModeSwitchProps) {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2">
              <Switch id="auto-mode" checked={autoMode} onCheckedChange={onAutoModeChange} disabled={isDebating} />
              <label htmlFor="auto-mode" className="text-sm font-medium flex items-center gap-1">
                {autoMode ? <Zap className="h-3 w-3" /> : <ZapOff className="h-3 w-3" />}
                Auto Debate
              </label>
              {autoMode && (
                <Badge variant="outline" className="text-xs">
                  {models.length} Chain
                </Badge>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-center">
              <p className="font-medium">Chain responses automatically</p>
              {autoMode && models.length > 1 && (
                <p className="text-xs text-muted-foreground mt-1">{models.map((m) => m.name).join(" → ")}</p>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}

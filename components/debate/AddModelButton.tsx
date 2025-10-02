"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Plus, Bot } from "lucide-react"

interface AIModel {
  id: string
  type: "GPT-4" | "Claude-3.5" | "Llama-3" | "Gemini"
  name: string
}

const MODEL_TYPES = ["GPT-4", "Claude-3.5", "Llama-3", "Gemini"] as const

const MODEL_DESCRIPTIONS = {
  "GPT-4": "Advanced reasoning and code generation",
  "Claude-3.5": "Ethical AI with strong safety focus",
  "Llama-3": "Open-source model with customization",
  Gemini: "Multimodal AI with visual capabilities",
} as const

interface AddModelButtonProps {
  models: AIModel[]
  onAddModel: (modelType: (typeof MODEL_TYPES)[number]) => void
  disabled?: boolean
}

export function AddModelButton({ models, onAddModel, disabled = false }: AddModelButtonProps) {
  const availableModels = MODEL_TYPES.filter((modelType) => !models.some((m) => m.type === modelType))

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={disabled || availableModels.length === 0}>
          <Plus className="h-4 w-4 mr-2" />
          Add Model
          {models.length > 0 && (
            <Badge variant="secondary" className="ml-2 text-xs">
              {models.length}/4
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <div className="px-2 py-1 text-xs font-medium text-muted-foreground">Available Models:</div>
        {availableModels.length === 0 ? (
          <div className="px-2 py-2 text-sm text-muted-foreground">All models added</div>
        ) : (
          availableModels.map((modelType) => (
            <DropdownMenuItem key={modelType} onClick={() => onAddModel(modelType)} className="flex-col items-start">
              <div className="flex items-center gap-2 w-full">
                <Bot className="h-4 w-4" />
                <span className="font-medium">{modelType}</span>
              </div>
              <span className="text-xs text-muted-foreground mt-1">{MODEL_DESCRIPTIONS[modelType]}</span>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { Plus, X, Search, Check, AlertCircle, Sparkles, Zap, Brain, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDevice } from "@/contexts/DeviceProvider"

// Model definitions
export interface AIModel {
  id: string
  name: string
  provider: string
  description: string
  icon?: React.ReactNode
  tags?: string[]
}

const AVAILABLE_MODELS: AIModel[] = [
  // OpenAI
  {
    id: "openai/gpt-4-turbo",
    name: "GPT-4 Turbo",
    provider: "OpenAI",
    description: "Most capable model for complex tasks",
    icon: <Sparkles className="h-4 w-4 text-green-500" />,
    tags: ["Complex", "Reasoning"],
  },
  {
    id: "openai/gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    description: "Fastest and most capable flagship model",
    icon: <Sparkles className="h-4 w-4 text-green-500" />,
    tags: ["Fast", "Multimodal"],
  },
  {
    id: "openai/gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    provider: "OpenAI",
    description: "Fast and cost-effective for simple tasks",
    icon: <Zap className="h-4 w-4 text-green-500" />,
    tags: ["Fast", "Cheap"],
  },

  // Anthropic
  {
    id: "anthropic/claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    description: "Excellent reasoning and coding capabilities",
    icon: <Brain className="h-4 w-4 text-orange-500" />,
    tags: ["Coding", "Writing"],
  },
  {
    id: "anthropic/claude-3-opus",
    name: "Claude 3 Opus",
    provider: "Anthropic",
    description: "Highest capability for complex analysis",
    icon: <Brain className="h-4 w-4 text-orange-500" />,
    tags: ["Analysis", "Complex"],
  },
  {
    id: "anthropic/claude-3-haiku",
    name: "Claude 3 Haiku",
    provider: "Anthropic",
    description: "Fastest and most compact model",
    icon: <Zap className="h-4 w-4 text-orange-500" />,
    tags: ["Fast"],
  },

  // Google
  {
    id: "google/gemini-1.5-pro",
    name: "Gemini 1.5 Pro",
    provider: "Google",
    description: "Mid-size multimodal model",
    icon: <MessageSquare className="h-4 w-4 text-blue-500" />,
    tags: ["Multimodal", "Long Context"],
  },
  {
    id: "google/gemini-1.5-flash",
    name: "Gemini 1.5 Flash",
    provider: "Google",
    description: "Fast and efficient multimodal model",
    icon: <Zap className="h-4 w-4 text-blue-500" />,
    tags: ["Fast", "Multimodal"],
  },

  // Meta
  {
    id: "meta/llama-3.1-405b",
    name: "Llama 3.1 405B",
    provider: "Meta",
    description: "Largest open source model",
    icon: <Brain className="h-4 w-4 text-blue-600" />,
    tags: ["Open Source", "Complex"],
  },
  {
    id: "meta/llama-3.1-70b",
    name: "Llama 3.1 70B",
    provider: "Meta",
    description: "High performance open source model",
    icon: <Brain className="h-4 w-4 text-blue-600" />,
    tags: ["Open Source", "Balanced"],
  },

  // xAI
  {
    id: "xai/grok-2",
    name: "Grok 2",
    provider: "xAI",
    description: "Latest model from xAI",
    icon: <Sparkles className="h-4 w-4 text-white" />,
    tags: ["New"],
  },
]

interface CompareAgentSelectorProps {
  selectedModelIds: string[]
  onSelectionChange: (modelIds: string[]) => void
  minSelection?: number
  maxSelection?: number
}

export function CompareAgentSelector({
  selectedModelIds,
  onSelectionChange,
  minSelection = 2,
  maxSelection = 4,
}: CompareAgentSelectorProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { isMobile } = useDevice()

  // Get full model objects for selected IDs
  const selectedModels = useMemo(() => {
    return selectedModelIds.map((id) => AVAILABLE_MODELS.find((m) => m.id === id)).filter(Boolean) as AIModel[]
  }, [selectedModelIds])

  // Filter available models based on search
  const filteredModels = useMemo(() => {
    if (!searchQuery.trim()) return AVAILABLE_MODELS

    const query = searchQuery.toLowerCase()
    return AVAILABLE_MODELS.filter(
      (model) =>
        model.name.toLowerCase().includes(query) ||
        model.provider.toLowerCase().includes(query) ||
        model.description.toLowerCase().includes(query),
    )
  }, [searchQuery])

  // Group models by provider
  const groupedModels = useMemo(() => {
    const groups: Record<string, AIModel[]> = {}
    filteredModels.forEach((model) => {
      if (!groups[model.provider]) {
        groups[model.provider] = []
      }
      groups[model.provider].push(model)
    })
    return groups
  }, [filteredModels])

  const handleToggleModel = (modelId: string) => {
    if (selectedModelIds.includes(modelId)) {
      onSelectionChange(selectedModelIds.filter((id) => id !== modelId))
    } else {
      if (selectedModelIds.length < maxSelection) {
        onSelectionChange([...selectedModelIds, modelId])
      }
    }
  }

  const handleRemoveModel = (modelId: string) => {
    onSelectionChange(selectedModelIds.filter((id) => id !== modelId))
  }

  const handleClearAll = () => {
    onSelectionChange([])
  }

  return (
    <div className="w-full space-y-4">
      {/* Selected Models Display */}
      <div className="flex flex-wrap items-center gap-2 min-h-[44px]">
        {selectedModels.length === 0 ? (
          <div className="flex items-center text-muted-foreground text-sm italic">
            <AlertCircle className="h-4 w-4 mr-2" />
            Select {minSelection} to {maxSelection} models to compare
          </div>
        ) : (
          selectedModels.map((model) => (
            <Badge
              key={model.id}
              variant="secondary"
              className="pl-2 pr-1 py-1.5 h-8 flex items-center gap-1.5 text-sm font-medium transition-all hover:bg-secondary/80"
            >
              {model.icon}
              <span>{model.name}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveModel(model.id)}
                className="h-5 w-5 rounded-full ml-1 hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {model.name}</span>
              </Button>
            </Badge>
          ))
        )}

        {selectedModels.length < maxSelection && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            className="h-8 rounded-full border-dashed border-muted-foreground/50 text-muted-foreground hover:text-foreground hover:border-foreground/50"
          >
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Add Model
          </Button>
        )}

        {selectedModels.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="h-8 text-xs text-muted-foreground hover:text-destructive ml-auto"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Validation Message */}
      {selectedModels.length > 0 && selectedModels.length < minSelection && (
        <p className="text-xs text-amber-500 font-medium flex items-center">
          <AlertCircle className="h-3 w-3 mr-1" />
          Please select at least {minSelection} models to start comparison
        </p>
      )}

      {/* Selection Modal */}
      <AdaptiveModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Select AI Models"
        description={`Choose up to ${maxSelection} models to compare side-by-side.`}
        size="lg"
      >
        <div className="flex flex-col h-[60vh] md:h-[500px]">
          {/* Search */}
          <div className="relative mb-4 px-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search models (e.g. GPT-4, Claude, Llama)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              autoFocus={!isMobile}
            />
          </div>

          {/* Model List */}
          <ScrollArea className="flex-1 -mx-6 px-6">
            <div className="space-y-6 pb-6">
              {Object.entries(groupedModels).length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No models found matching "{searchQuery}"</p>
                  <Button variant="link" onClick={() => setSearchQuery("")} className="mt-2">
                    Clear search
                  </Button>
                </div>
              ) : (
                Object.entries(groupedModels).map(([provider, models]) => (
                  <div key={provider} className="space-y-3">
                    <h3 className="text-sm font-semibold text-muted-foreground sticky top-0 bg-background py-2 z-10">
                      {provider}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {models.map((model) => {
                        const isSelected = selectedModelIds.includes(model.id)
                        const isDisabled = !isSelected && selectedModelIds.length >= maxSelection

                        return (
                          <div
                            key={model.id}
                            onClick={() => !isDisabled && handleToggleModel(model.id)}
                            className={cn(
                              "relative flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer",
                              isSelected
                                ? "border-primary bg-primary/5 ring-1 ring-primary"
                                : "border-border hover:border-primary/50 hover:bg-accent/50",
                              isDisabled && "opacity-50 cursor-not-allowed hover:border-border hover:bg-transparent",
                            )}
                          >
                            <div className="mt-0.5 shrink-0">{model.icon}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <h4 className="font-medium text-sm truncate">{model.name}</h4>
                                {isSelected && <Check className="h-4 w-4 text-primary shrink-0" />}
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{model.description}</p>
                              {model.tags && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {model.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 mt-auto border-t">
            <div className="text-sm text-muted-foreground">
              {selectedModelIds.length} / {maxSelection} selected
            </div>
            <Button onClick={() => setIsModalOpen(false)}>Done</Button>
          </div>
        </div>
      </AdaptiveModal>
    </div>
  )
}

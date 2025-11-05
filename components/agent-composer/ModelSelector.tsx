"use client"

import { useState } from "react"
import { Check, ChevronRight, Sparkles } from "lucide-react"
import type { Model } from "@/lib/models/types"
import { AVAILABLE_MODELS, getRecommendedModels } from "@/lib/models/available-models"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ModelSelectorProps {
  selected: Model | null
  onSelect: (model: Model) => void
}

export function ModelSelector({ selected, onSelect }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filter, setFilter] = useState<"all" | "recommended">("recommended")

  const displayModels = filter === "recommended" ? getRecommendedModels() : AVAILABLE_MODELS

  const handleSelect = (model: Model) => {
    onSelect(model)
    setIsOpen(false)
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="w-full min-h-[80px] h-auto flex flex-col items-start gap-2 p-4 text-left"
        aria-label="Select AI model"
      >
        {selected ? (
          <>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selected.icon}</span>
                <div>
                  <div className="font-semibold text-foreground">{selected.name}</div>
                  <div className="text-sm text-muted-foreground capitalize">{selected.provider}</div>
                </div>
              </div>
              {selected.recommended && (
                <Badge variant="secondary" className="gap-1">
                  <Sparkles className="h-3 w-3" />
                  Recommended
                </Badge>
              )}
            </div>
            <div className="text-xs text-muted-foreground">
              {selected.contextWindow.toLocaleString()} tokens • ${selected.pricing.input}/${selected.pricing.output}{" "}
              per 1M
            </div>
          </>
        ) : (
          <div className="flex items-center justify-between w-full">
            <span className="text-muted-foreground">Select AI Model</span>
            <ChevronRight className="h-4 w-4" />
          </div>
        )}
      </Button>

      <AdaptiveModal
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Select AI Model"
        description="Choose which language model will power your agent"
      >
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Button
              variant={filter === "recommended" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("recommended")}
              className="min-h-[44px]"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Recommended
            </Button>
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
              className="min-h-[44px]"
            >
              All Models
            </Button>
          </div>

          <div className="flex flex-col gap-3">
            {displayModels.map((model) => (
              <button
                key={model.id}
                onClick={() => handleSelect(model)}
                className={cn(
                  "min-h-[80px] p-4 rounded-lg border-2 transition-all text-left",
                  "hover:border-primary hover:bg-accent",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                  selected?.id === model.id ? "border-primary bg-accent" : "border-border bg-card",
                )}
                aria-label={`Select ${model.name}`}
                aria-pressed={selected?.id === model.id}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <span className="text-2xl">{model.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="font-semibold text-foreground">{model.name}</div>
                        {model.recommended && (
                          <Badge variant="secondary" className="gap-1">
                            <Sparkles className="h-3 w-3" />
                            Recommended
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground capitalize mb-2">{model.provider}</div>
                      <div className="text-sm text-muted-foreground mb-2">{model.description}</div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {model.capabilities.map((cap) => (
                          <Badge key={cap} variant="outline" className="text-xs">
                            {cap}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {model.contextWindow.toLocaleString()} tokens • ${model.pricing.input}/${model.pricing.output}{" "}
                        per 1M
                      </div>
                    </div>
                  </div>
                  {selected?.id === model.id && <Check className="h-5 w-5 text-primary flex-shrink-0" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      </AdaptiveModal>
    </>
  )
}

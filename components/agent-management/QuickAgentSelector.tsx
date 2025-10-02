"use client"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Plus, Sparkles, X } from "lucide-react"
import { toast } from "sonner"
import { useDevice } from "@/contexts/DeviceProvider"

interface AIModel {
  id: string
  type: "GPT-4" | "Claude-3.5" | "Llama-3" | "Gemini"
  name: string
  isActive?: boolean
}

interface QuickAgentSelectorProps {
  models: AIModel[]
  onAddModel: (modelType: "GPT-4" | "Claude-3.5" | "Llama-3" | "Gemini") => void
  onRemoveModel: (modelId: string) => void
  onOpenAgentBuilder: () => void
  maxModels?: number
}

const QUICK_MODELS = [
  { type: "GPT-4" as const, name: "GPT-4", description: "Advanced reasoning", color: "bg-green-500" },
  { type: "Claude-3.5" as const, name: "Claude-3.5", description: "Thoughtful analysis", color: "bg-orange-500" },
  { type: "Llama-3" as const, name: "Llama-3", description: "Open source power", color: "bg-blue-500" },
  { type: "Gemini" as const, name: "Gemini", description: "Google's latest", color: "bg-purple-500" },
]

export function QuickAgentSelector({
  models,
  onAddModel,
  onRemoveModel,
  onOpenAgentBuilder,
  maxModels = 4,
}: QuickAgentSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { isMobile } = useDevice()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const availableModels = QUICK_MODELS.filter((quickModel) => !models.some((model) => model.type === quickModel.type))

  useEffect(() => {
    if (!isOpen || isMobile) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    // Add small delay to prevent immediate close
    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside)
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, isMobile])

  const handleAddModel = (modelType: (typeof QUICK_MODELS)[0]["type"]) => {
    if (models.length >= maxModels) {
      toast.error(`Maximum ${maxModels} agents allowed`)
      return
    }
    onAddModel(modelType)
    setIsOpen(false)
  }

  const handleRemoveModel = (modelId: string) => {
    onRemoveModel(modelId)
  }

  const renderContent = () => (
    <div className="p-4">
      <h4 className="font-medium mb-3">Quick Add Agents</h4>
      <div className="space-y-2">
        {availableModels.map((quickModel) => (
          <motion.div key={quickModel.type} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="ghost"
              className="w-full justify-start h-auto p-3"
              onClick={() => handleAddModel(quickModel.type)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${quickModel.color}`} />
                <div className="text-left">
                  <div className="font-medium">{quickModel.name}</div>
                  <div className="text-xs text-muted-foreground">{quickModel.description}</div>
                </div>
              </div>
            </Button>
          </motion.div>
        ))}

        <div className="border-t pt-2 mt-2">
          <Button
            variant="ghost"
            className="w-full justify-start h-auto p-3"
            onClick={() => {
              onOpenAgentBuilder()
              setIsOpen(false)
            }}
          >
            <div className="flex items-center gap-3">
              <Sparkles className="h-4 w-4 text-primary" />
              <div className="text-left">
                <div className="font-medium">Create Custom Agent</div>
                <div className="text-xs text-muted-foreground">Configure roles & behavior</div>
              </div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide max-w-full">
        <AnimatePresence>
          {models.map((model) => {
            const quickModel = QUICK_MODELS.find((qm) => qm.type === model.type)
            return (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="group flex-shrink-0"
              >
                <Card className="relative overflow-hidden">
                  <CardContent className={`${isMobile ? "p-2" : "p-3"}`}>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${quickModel?.color || "bg-gray-500"}`} />
                      <span className={`font-medium whitespace-nowrap ${isMobile ? "text-xs" : "text-sm"}`}>
                        {isMobile ? model.type.split("-")[0] : model.name}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-4 w-4 p-0 opacity-0 group-hover:opacity-100 transition-opacity ${isMobile ? "opacity-100" : ""}`}
                        onClick={() => handleRemoveModel(model.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {models.length < maxModels && (
        <div className="relative flex-shrink-0">
          <Button
            ref={buttonRef}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 bg-transparent"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Plus className="h-4 w-4" />
            {!isMobile && "Add Agent"}
          </Button>

          {!isMobile && isOpen && (
            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-lg z-50"
            >
              {renderContent()}
            </motion.div>
          )}

          {isMobile && (
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
              <DrawerContent className="bg-background border-border">
                <DrawerHeader>
                  <DrawerTitle className="text-foreground">Add Agent</DrawerTitle>
                </DrawerHeader>
                <div className="flex-1 overflow-hidden">{renderContent()}</div>
              </DrawerContent>
            </Drawer>
          )}
        </div>
      )}

      <Badge variant="secondary" className="text-xs flex-shrink-0">
        {models.length}/{maxModels}
      </Badge>
    </div>
  )
}

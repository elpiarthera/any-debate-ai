"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { useDevice } from "@/contexts/DeviceProvider"
import { Eye, Sparkles, User, Brain, Briefcase, Cpu } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ROLES } from "@/lib/agent-config/roles"
import { PERSONAS } from "@/lib/agent-config/personas"
import { FRAMEWORKS } from "@/lib/agent-config/frameworks"
import { AVAILABLE_MODELS, MODEL_CATEGORIES } from "@/lib/models/available-models"
import type { AgentConfigurationDraft } from "@/lib/agent-config/types"

interface AgentPreviewProps {
  draft: Partial<AgentConfigurationDraft>
  onNameChange: (name: string) => void
  onModelChange: (model: string) => void
  onCustomInstructionsChange: (instructions: string) => void
}

export function AgentPreview({ draft, onNameChange, onModelChange, onCustomInstructionsChange }: AgentPreviewProps) {
  const { isMobile } = useDevice()
  const selectedRole = ROLES.find((role) => role.id === draft.roleId)
  const selectedPersona = PERSONAS.find((persona) => persona.id === draft.personaId)
  const selectedFramework = FRAMEWORKS.find((framework) => framework.id === draft.frameworkId)
  const selectedModel = AVAILABLE_MODELS.find((model) => model.id === draft.model)

  return (
    <div className="space-y-4 md:space-y-6 h-full flex flex-col">
      <div className="flex-shrink-0">
        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
          <Eye className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
          <h3 className="text-base md:text-lg font-semibold">Review & Customize</h3>
        </div>
        <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
          Review your agent configuration and add final customizations
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 md:space-y-6">
        {/* Agent Name */}
        <div className="space-y-2">
          <Label htmlFor="agent-name" className="text-sm">
            Agent Name *
          </Label>
          <Input
            id="agent-name"
            placeholder="Enter a name for your agent..."
            value={draft.name || ""}
            onChange={(e) => onNameChange(e.target.value)}
            className="text-base md:text-lg font-medium min-h-[48px]"
          />
        </div>

        {/* AI Model */}
        <div className="space-y-2">
          <Label htmlFor="agent-model" className="text-sm">
            AI Model *
          </Label>
          <Select value={draft.model} onValueChange={onModelChange}>
            <SelectTrigger id="agent-model" className="min-h-[48px]">
              <SelectValue placeholder="Select an AI model" />
            </SelectTrigger>
            <SelectContent>
              {MODEL_CATEGORIES.map((category) => (
                <SelectGroup key={category.name}>
                  <SelectLabel>{category.name}</SelectLabel>
                  {category.models.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      <div className="flex items-center gap-2">
                        <span>{model.icon}</span>
                        <span>{model.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
          {selectedModel && <p className="text-xs text-muted-foreground">{selectedModel.description}</p>}
        </div>

        {/* Configuration Summary */}
        <Card>
          <CardHeader className="p-3 md:p-4">
            <CardTitle className="flex items-center gap-2 text-sm md:text-base">
              <Sparkles className="h-4 w-4 flex-shrink-0" />
              Configuration Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 md:space-y-4 p-3 md:p-4">
            {/* Role */}
            {selectedRole && (
              <div className="flex items-start gap-2 md:gap-3">
                <Briefcase className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-medium text-xs md:text-sm">Role:</span>
                    <Badge variant="secondary" className="text-xs">
                      {selectedRole.category}
                    </Badge>
                  </div>
                  <p className="text-xs md:text-sm font-medium">{selectedRole.name}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{selectedRole.description}</p>
                </div>
              </div>
            )}

            <Separator />

            {/* Persona */}
            {selectedPersona && (
              <div className="flex items-start gap-2 md:gap-3">
                <User className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-xs md:text-sm">Personality:</span>
                  <p className="text-xs md:text-sm font-medium">{selectedPersona.name}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{selectedPersona.communicationStyle}</p>
                </div>
              </div>
            )}

            <Separator />

            {/* Framework */}
            {selectedFramework && (
              <div className="flex items-start gap-2 md:gap-3">
                <Brain className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-medium text-xs md:text-sm">Framework:</span>
                    <Badge variant="outline" className="text-xs">
                      {selectedFramework.bestFor[0]}
                    </Badge>
                  </div>
                  <p className="text-xs md:text-sm font-medium">{selectedFramework.name}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{selectedFramework.description}</p>
                </div>
              </div>
            )}

            <Separator />

            {/* Model */}
            {selectedModel && (
              <div className="flex items-start gap-2 md:gap-3">
                <Cpu className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-medium text-xs md:text-sm">Model:</span>
                    <Badge variant="secondary" className="text-xs">
                      {selectedModel.provider}
                    </Badge>
                  </div>
                  <p className="text-xs md:text-sm font-medium">{selectedModel.name}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {selectedModel.contextWindow.toLocaleString()} token context
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Custom Instructions */}
        <div className="space-y-2">
          <Label htmlFor="custom-instructions" className="text-sm">
            Custom Instructions (Optional)
          </Label>
          <Textarea
            id="custom-instructions"
            placeholder="Add any specific instructions or preferences for your agent..."
            value={draft.customInstructions || ""}
            onChange={(e) => onCustomInstructionsChange(e.target.value)}
            rows={isMobile ? 3 : 4}
            className="resize-none min-h-[48px] text-sm"
          />
          <p className="text-xs text-muted-foreground">
            These instructions will be added to your agent's system prompt
          </p>
        </div>

        {/* Preview Card */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="p-3 md:p-4">
            <CardTitle className="text-sm md:text-base">Agent Preview</CardTitle>
            <CardDescription className="text-xs md:text-sm">How your agent will appear in debates</CardDescription>
          </CardHeader>
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center gap-2 md:gap-3 p-3 bg-background rounded-lg border min-h-[80px]">
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm md:text-base truncate">{draft.name || "Unnamed Agent"}</p>
                <p className="text-xs md:text-sm text-muted-foreground line-clamp-1">
                  {selectedRole?.name} • {selectedPersona?.name} • {selectedFramework?.name} • {selectedModel?.name}
                </p>
              </div>
              <Badge variant="secondary" className="text-xs flex-shrink-0">
                Custom
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Sparkles, ArrowLeft, Save } from "lucide-react"
import { ModuleCard } from "./ModuleCard"
import type { ProfessionalRole } from "@/lib/agent-config/roles"
import type { Persona } from "@/lib/agent-config/personas"
import type { Framework } from "@/lib/agent-config/frameworks"
import type { Model } from "@/lib/models/types"

interface AgentComposerMobileProps {
  agentName: string
  onAgentNameChange: (name: string) => void
  customInstructions: string
  onCustomInstructionsChange: (instructions: string) => void
  selectedRole?: ProfessionalRole
  selectedPersona?: Persona
  selectedFramework?: Framework
  selectedModel?: Model
  onSelectRole: () => void
  onSelectPersona: () => void
  onSelectFramework: () => void
  onSelectModel: () => void
  onRemoveRole: () => void
  onRemovePersona: () => void
  onRemoveFramework: () => void
  onRemoveModel: () => void
  onSave: () => void
  onCancel?: () => void
  canSave: boolean
  isEditMode?: boolean
  isLoading?: boolean
}

export function AgentComposerMobile({
  agentName,
  onAgentNameChange,
  customInstructions,
  onCustomInstructionsChange,
  selectedRole,
  selectedPersona,
  selectedFramework,
  selectedModel,
  onSelectRole,
  onSelectPersona,
  onSelectFramework,
  onSelectModel,
  onRemoveRole,
  onRemovePersona,
  onRemoveFramework,
  onRemoveModel,
  onSave,
  onCancel,
  canSave,
  isEditMode = false,
  isLoading = false,
}: AgentComposerMobileProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 sticky top-0 z-10 bg-background border-b p-4">
        <div className="flex items-center gap-2 mb-2">
          {isEditMode && onCancel && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              className="min-h-[44px] min-w-[44px] p-0"
              disabled={isLoading}
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
          <h1 className="text-lg font-semibold">{isEditMode ? "Edit Agent" : "Compose Agent"}</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          {isEditMode ? "Update your agent configuration" : "Select modules to build your custom agent"}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Agent Name */}
        <div className="space-y-2">
          <Label htmlFor="agent-name">Agent Name</Label>
          <Input
            id="agent-name"
            placeholder="Enter agent name..."
            value={agentName}
            onChange={(e) => onAgentNameChange(e.target.value)}
            className="min-h-[48px]"
            disabled={isLoading}
            aria-required="true"
            aria-invalid={!agentName && canSave ? "true" : "false"}
          />
        </div>

        {/* Model Module */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center justify-between">
              <span>Model</span>
              <span className="text-xs text-muted-foreground font-normal">Required</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedModel ? (
              <div className="flex items-center justify-between p-3 border rounded-lg bg-card min-h-[80px]">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{selectedModel.name}</h4>
                    {selectedModel.recommended && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                        RECOMMENDED
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground capitalize">{selectedModel.provider}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedModel.contextWindow.toLocaleString()} context
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onRemoveModel}
                  className="min-h-[44px] min-w-[44px]"
                  disabled={isLoading}
                  aria-label="Remove model"
                >
                  ×
                </Button>
              </div>
            ) : (
              <Button
                onClick={onSelectModel}
                variant="outline"
                className="w-full min-h-[80px] border-dashed bg-transparent"
                disabled={isLoading}
                aria-label="Select model"
              >
                <Plus className="h-5 w-5 mr-2" aria-hidden="true" />
                Select Model
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Role Module */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center justify-between">
              <span>Role</span>
              <span className="text-xs text-muted-foreground font-normal">Required</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedRole ? (
              <ModuleCard
                type="role"
                icon={selectedRole.icon}
                name={selectedRole.name}
                description={selectedRole.description}
                badge={selectedRole.category}
                onRemove={onRemoveRole}
              />
            ) : (
              <Button
                onClick={onSelectRole}
                variant="outline"
                className="w-full min-h-[80px] border-dashed bg-transparent"
                disabled={isLoading}
                aria-label="Select role module"
              >
                <Plus className="h-5 w-5 mr-2" aria-hidden="true" />
                Select Role
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Persona Module */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center justify-between">
              <span>Persona</span>
              <span className="text-xs text-muted-foreground font-normal">Required</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedPersona ? (
              <ModuleCard
                type="persona"
                icon={selectedPersona.icon}
                name={selectedPersona.name}
                description={selectedPersona.description}
                badge={selectedPersona.decisionMaking}
                onRemove={onRemovePersona}
              />
            ) : (
              <Button
                onClick={onSelectPersona}
                variant="outline"
                className="w-full min-h-[80px] border-dashed bg-transparent"
                disabled={isLoading}
                aria-label="Select persona module"
              >
                <Plus className="h-5 w-5 mr-2" aria-hidden="true" />
                Select Persona
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Framework Module */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center justify-between">
              <span>Framework</span>
              <span className="text-xs text-muted-foreground font-normal">Required</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedFramework ? (
              <ModuleCard
                type="framework"
                icon={selectedFramework.icon}
                name={selectedFramework.name}
                description={selectedFramework.description}
                badge={selectedFramework.bestFor[0]}
                onRemove={onRemoveFramework}
              />
            ) : (
              <Button
                onClick={onSelectFramework}
                variant="outline"
                className="w-full min-h-[80px] border-dashed bg-transparent"
                disabled={isLoading}
                aria-label="Select framework module"
              >
                <Plus className="h-5 w-5 mr-2" aria-hidden="true" />
                Select Framework
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Custom Instructions */}
        <div className="space-y-2">
          <Label htmlFor="custom-instructions">Custom Instructions (Optional)</Label>
          <Textarea
            id="custom-instructions"
            placeholder="Add any specific instructions or behaviors..."
            value={customInstructions}
            onChange={(e) => onCustomInstructionsChange(e.target.value)}
            className="min-h-[120px]"
            disabled={isLoading}
            aria-describedby="custom-instructions-help"
          />
          <p id="custom-instructions-help" className="text-xs text-muted-foreground">
            Optional: Add specific behaviors or constraints for your agent
          </p>
        </div>
      </div>

      <div className="flex-shrink-0 sticky bottom-0 z-10 bg-background border-t p-4">
        {isEditMode && onCancel ? (
          <div className="flex gap-2">
            <Button
              onClick={onCancel}
              variant="outline"
              className="flex-1 min-h-[48px] bg-transparent"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button onClick={onSave} disabled={!canSave || isLoading} className="flex-1 min-h-[48px]">
              <Save className="h-4 w-4 mr-2" aria-hidden="true" />
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        ) : (
          <Button onClick={onSave} disabled={!canSave || isLoading} className="w-full min-h-[48px]">
            <Sparkles className="h-4 w-4 mr-2" aria-hidden="true" />
            {isLoading ? "Creating..." : "Create Agent"}
          </Button>
        )}
      </div>
    </div>
  )
}

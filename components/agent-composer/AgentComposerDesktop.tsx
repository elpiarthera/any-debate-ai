"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Plus, Sparkles, User, Users, Brain, Save, Cpu } from "lucide-react"
import { ModuleCard } from "./ModuleCard"
import type { ProfessionalRole } from "@/lib/agent-config/roles"
import type { Persona } from "@/lib/agent-config/personas"
import type { Framework } from "@/lib/agent-config/frameworks"
import type { Model } from "@/lib/models/types"

interface AgentComposerDesktopProps {
  agentName: string
  onAgentNameChange: (name: string) => void
  customInstructions: string
  onCustomInstructionsChange: (instructions: string) => void
  selectedRole?: ProfessionalRole
  selectedPersona?: Persona
  selectedFramework?: Framework
  selectedModel?: Model
  onSelectModel: () => void
  onSelectRole: () => void
  onSelectPersona: () => void
  onSelectFramework: () => void
  onRemoveRole: () => void
  onRemovePersona: () => void
  onRemoveFramework: () => void
  onSave: () => void
  onCancel?: () => void
  canSave: boolean
  isEditMode?: boolean
}

export function AgentComposerDesktop({
  agentName,
  onAgentNameChange,
  customInstructions,
  onCustomInstructionsChange,
  selectedRole,
  selectedPersona,
  selectedFramework,
  selectedModel,
  onSelectModel,
  onSelectRole,
  onSelectPersona,
  onSelectFramework,
  onRemoveRole,
  onRemovePersona,
  onRemoveFramework,
  onSave,
  onCancel,
  canSave,
  isEditMode = false,
}: AgentComposerDesktopProps) {
  return (
    <div className="grid grid-cols-2 gap-6 h-full">
      <div className="space-y-6 overflow-y-auto pr-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h1 className="text-2xl font-semibold">{isEditMode ? "Edit Agent" : "Compose Agent"}</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            {isEditMode ? "Update your agent configuration" : "Select modules to build your custom agent"}
          </p>
        </div>

        <Separator />

        {/* Agent Name */}
        <div className="space-y-2">
          <Label htmlFor="agent-name">Agent Name</Label>
          <Input
            id="agent-name"
            placeholder="Enter agent name..."
            value={agentName}
            onChange={(e) => onAgentNameChange(e.target.value)}
            className="min-h-[48px]"
          />
        </div>

        {/* Role Module */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">Role</CardTitle>
            </div>
            <CardDescription className="text-xs">Professional expertise and domain knowledge</CardDescription>
          </CardHeader>
          <CardContent>
            {selectedRole ? (
              <ModuleCard module={selectedRole} type="role" onEdit={onSelectRole} />
            ) : (
              <Button
                onClick={onSelectRole}
                variant="outline"
                className="w-full min-h-[80px] border-dashed bg-transparent"
              >
                <Plus className="h-5 w-5 mr-2" />
                Select Role
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Persona Module */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">Persona</CardTitle>
            </div>
            <CardDescription className="text-xs">Communication style and personality traits</CardDescription>
          </CardHeader>
          <CardContent>
            {selectedPersona ? (
              <ModuleCard module={selectedPersona} type="persona" onEdit={onSelectPersona} />
            ) : (
              <Button
                onClick={onSelectPersona}
                variant="outline"
                className="w-full min-h-[80px] border-dashed bg-transparent"
              >
                <Plus className="h-5 w-5 mr-2" />
                Select Persona
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Framework Module */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">Framework</CardTitle>
            </div>
            <CardDescription className="text-xs">Thinking approach and decision-making process</CardDescription>
          </CardHeader>
          <CardContent>
            {selectedFramework ? (
              <ModuleCard module={selectedFramework} type="framework" onEdit={onSelectFramework} />
            ) : (
              <Button
                onClick={onSelectFramework}
                variant="outline"
                className="w-full min-h-[80px] border-dashed bg-transparent"
              >
                <Plus className="h-5 w-5 mr-2" />
                Select Framework
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Model Selection */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">Model</CardTitle>
            </div>
            <CardDescription className="text-xs">AI model that powers your agent</CardDescription>
          </CardHeader>
          <CardContent>
            {selectedModel ? (
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3 p-3 rounded-lg border bg-card min-h-[80px]">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-sm">{selectedModel.name}</h4>
                      {selectedModel.recommended && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                          RECOMMENDED
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground capitalize">{selectedModel.provider}</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedModel.contextWindow.toLocaleString()} context • ${selectedModel.pricing.input}/$
                      {selectedModel.pricing.output} per 1M tokens
                    </p>
                  </div>
                </div>
                <Button
                  onClick={onSelectModel}
                  variant="outline"
                  size="sm"
                  className="w-full min-h-[44px] bg-transparent"
                >
                  Change Model
                </Button>
              </div>
            ) : (
              <Button
                onClick={onSelectModel}
                variant="outline"
                className="w-full min-h-[80px] border-dashed bg-transparent"
              >
                <Plus className="h-5 w-5 mr-2" />
                Select Model
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
          />
        </div>
      </div>

      <div className="border-l pl-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Live Preview</h2>
          <p className="text-sm text-muted-foreground">See how your agent will behave</p>
        </div>

        <Separator />

        {selectedRole && selectedPersona && selectedFramework && selectedModel ? (
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle>{agentName || "Unnamed Agent"}</CardTitle>
              <CardDescription>Your custom AI agent configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Role: {selectedRole.name}</h4>
                <p className="text-xs text-muted-foreground">{selectedRole.description}</p>
              </div>
              <Separator />
              <div>
                <h4 className="text-sm font-medium mb-2">Persona: {selectedPersona.name}</h4>
                <p className="text-xs text-muted-foreground">{selectedPersona.communicationStyle}</p>
              </div>
              <Separator />
              <div>
                <h4 className="text-sm font-medium mb-2">Framework: {selectedFramework.name}</h4>
                <p className="text-xs text-muted-foreground">{selectedFramework.description}</p>
              </div>
              <Separator />
              <div>
                <h4 className="text-sm font-medium mb-2">Model: {selectedModel.name}</h4>
                <p className="text-xs text-muted-foreground">{selectedModel.provider}</p>
                <p className="text-xs text-muted-foreground">
                  {selectedModel.contextWindow.toLocaleString()} context • ${selectedModel.pricing.input}/$
                  {selectedModel.pricing.output} per 1M tokens
                </p>
              </div>
              {customInstructions && (
                <>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-medium mb-2">Custom Instructions</h4>
                    <p className="text-xs text-muted-foreground">{customInstructions}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="flex items-center justify-center h-64 text-center">
            <div className="space-y-2">
              <Sparkles className="h-12 w-12 mx-auto text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">Select all modules to see preview</p>
            </div>
          </div>
        )}

        {isEditMode && onCancel ? (
          <div className="flex gap-2">
            <Button onClick={onCancel} variant="outline" className="flex-1 min-h-[48px] bg-transparent">
              Cancel
            </Button>
            <Button onClick={onSave} disabled={!canSave} className="flex-1 min-h-[48px]">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        ) : (
          <Button onClick={onSave} disabled={!canSave} className="w-full min-h-[48px]">
            <Sparkles className="h-4 w-4 mr-2" />
            Create Agent
          </Button>
        )}
      </div>
    </div>
  )
}

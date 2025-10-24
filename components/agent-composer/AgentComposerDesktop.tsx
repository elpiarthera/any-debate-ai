"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Plus, Sparkles, User, Users, Brain, Save } from "lucide-react"
import { ModuleCard } from "./ModuleCard"
import type { ProfessionalRole } from "@/lib/agent-config/roles"
import type { Persona } from "@/lib/agent-config/personas"
import type { Framework } from "@/lib/agent-config/frameworks"

interface AgentComposerDesktopProps {
  agentName: string
  onAgentNameChange: (name: string) => void
  customInstructions: string
  onCustomInstructionsChange: (instructions: string) => void
  selectedRole?: ProfessionalRole
  selectedPersona?: Persona
  selectedFramework?: Framework
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
              >
                <Plus className="h-5 w-5 mr-2" />
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
          />
        </div>
      </div>

      <div className="border-l pl-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Live Preview</h2>
          <p className="text-sm text-muted-foreground">See how your agent will behave</p>
        </div>

        <Separator />

        {selectedRole && selectedPersona && selectedFramework ? (
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

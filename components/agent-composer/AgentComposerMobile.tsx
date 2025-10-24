"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Sparkles } from "lucide-react"
import { ModuleCard } from "./ModuleCard"
import type { ProfessionalRole } from "@/lib/agent-config/roles"
import type { Persona } from "@/lib/agent-config/personas"
import type { Framework } from "@/lib/agent-config/frameworks"

interface AgentComposerMobileProps {
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
  canSave: boolean
}

export function AgentComposerMobile({
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
  canSave,
}: AgentComposerMobileProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 sticky top-0 z-10 bg-background border-b p-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-semibold">Compose Agent</h1>
        </div>
        <p className="text-sm text-muted-foreground">Select modules to build your custom agent</p>
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
          />
        </div>

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

      <div className="flex-shrink-0 sticky bottom-0 z-10 bg-background border-t p-4">
        <Button onClick={onSave} disabled={!canSave} className="w-full min-h-[48px]">
          <Sparkles className="h-4 w-4 mr-2" />
          Create Agent
        </Button>
      </div>
    </div>
  )
}

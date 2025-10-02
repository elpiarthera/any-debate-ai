"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Eye, Sparkles, User, Brain, Briefcase } from "lucide-react"
import { ROLES } from "@/lib/agent-config/roles"
import { PERSONAS } from "@/lib/agent-config/personas"
import { FRAMEWORKS } from "@/lib/agent-config/frameworks"
import type { AgentConfigurationDraft } from "@/lib/agent-config/types"

interface AgentPreviewProps {
  draft: Partial<AgentConfigurationDraft>
  onNameChange: (name: string) => void
  onCustomInstructionsChange: (instructions: string) => void
}

export function AgentPreview({ draft, onNameChange, onCustomInstructionsChange }: AgentPreviewProps) {
  const selectedRole = ROLES.find((role) => role.id === draft.roleId)
  const selectedPersona = PERSONAS.find((persona) => persona.id === draft.personaId)
  const selectedFramework = FRAMEWORKS.find((framework) => framework.id === draft.frameworkId)

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex-shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <Eye className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Review & Customize</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Review your agent configuration and add final customizations
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6">
        {/* Agent Name */}
        <div className="space-y-2">
          <Label htmlFor="agent-name">Agent Name *</Label>
          <Input
            id="agent-name"
            placeholder="Enter a name for your agent..."
            value={draft.name || ""}
            onChange={(e) => onNameChange(e.target.value)}
            className="text-lg font-medium"
          />
        </div>

        {/* Configuration Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4" />
              Configuration Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Role */}
            {selectedRole && (
              <div className="flex items-start gap-3">
                <Briefcase className="h-4 w-4 text-muted-foreground mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">Role:</span>
                    <Badge variant="secondary">{selectedRole.category}</Badge>
                  </div>
                  <p className="text-sm font-medium">{selectedRole.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedRole.description}</p>
                </div>
              </div>
            )}

            <Separator />

            {/* Persona */}
            {selectedPersona && (
              <div className="flex items-start gap-3">
                <User className="h-4 w-4 text-muted-foreground mt-1" />
                <div className="flex-1">
                  <span className="font-medium text-sm">Personality:</span>
                  <p className="text-sm font-medium">{selectedPersona.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedPersona.communicationStyle}</p>
                </div>
              </div>
            )}

            <Separator />

            {/* Framework */}
            {selectedFramework && (
              <div className="flex items-start gap-3">
                <Brain className="h-4 w-4 text-muted-foreground mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">Framework:</span>
                    <Badge variant="outline">{selectedFramework.bestFor[0]}</Badge>
                  </div>
                  <p className="text-sm font-medium">{selectedFramework.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedFramework.description}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Custom Instructions */}
        <div className="space-y-2">
          <Label htmlFor="custom-instructions">Custom Instructions (Optional)</Label>
          <Textarea
            id="custom-instructions"
            placeholder="Add any specific instructions or preferences for your agent..."
            value={draft.customInstructions || ""}
            onChange={(e) => onCustomInstructionsChange(e.target.value)}
            rows={4}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground">
            These instructions will be added to your agent's system prompt
          </p>
        </div>

        {/* Preview Card */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-base">Agent Preview</CardTitle>
            <CardDescription>How your agent will appear in debates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 p-3 bg-background rounded-lg border">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{draft.name || "Unnamed Agent"}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedRole?.name} • {selectedPersona?.name} • {selectedFramework?.name}
                </p>
              </div>
              <Badge variant="secondary">Custom</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

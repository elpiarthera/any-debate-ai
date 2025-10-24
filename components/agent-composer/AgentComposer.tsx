"use client"

import { useState } from "react"
import { toast } from "sonner"
import { useDevice } from "@/contexts/DeviceProvider"
import { useRoleManager } from "@/hooks/useRoleManager"
import { usePersonaManager } from "@/hooks/usePersonaManager"
import { useFrameworkManager } from "@/hooks/useFrameworkManager"
import { AgentComposerMobile } from "./AgentComposerMobile"
import { AgentComposerDesktop } from "./AgentComposerDesktop"
import { ModuleSelector } from "./ModuleSelector"
import { ModelSelector } from "./ModelSelector"
import { availableModels } from "@/lib/models/available-models"

interface AgentComposerProps {
  onSave: (config: {
    name: string
    roleId: string
    personaId: string
    frameworkId: string
    modelId: string
    modelProvider: string
    customInstructions?: string
  }) => void
  editMode?: boolean
  initialData?: {
    name: string
    roleId: string
    personaId: string
    frameworkId: string
    modelId?: string
    modelProvider?: string
    customInstructions?: string
  }
}

export function AgentComposer({ onSave, editMode = false, initialData }: AgentComposerProps) {
  const { isMobile } = useDevice()
  const { allRoles, getRole } = useRoleManager()
  const { allPersonas, getPersona } = usePersonaManager()
  const { allFrameworks, getFramework } = useFrameworkManager()

  const [agentName, setAgentName] = useState(initialData?.name || "")
  const [selectedRoleId, setSelectedRoleId] = useState<string | undefined>(initialData?.roleId)
  const [selectedPersonaId, setSelectedPersonaId] = useState<string | undefined>(initialData?.personaId)
  const [selectedFrameworkId, setSelectedFrameworkId] = useState<string | undefined>(initialData?.frameworkId)
  const [selectedModelId, setSelectedModelId] = useState<string | undefined>(initialData?.modelId)
  const [customInstructions, setCustomInstructions] = useState(initialData?.customInstructions || "")

  const [isLoading, setIsLoading] = useState(false)

  const [showRoleSelector, setShowRoleSelector] = useState(false)
  const [showPersonaSelector, setShowPersonaSelector] = useState(false)
  const [showFrameworkSelector, setShowFrameworkSelector] = useState(false)
  const [showModelSelector, setShowModelSelector] = useState(false)

  const selectedRole = selectedRoleId ? getRole(selectedRoleId) : undefined
  const selectedPersona = selectedPersonaId ? getPersona(selectedPersonaId) : undefined
  const selectedFramework = selectedFrameworkId ? getFramework(selectedFrameworkId) : undefined
  const selectedModel = selectedModelId ? availableModels.find((m) => m.id === selectedModelId) : undefined

  const canSave = Boolean(agentName && selectedRoleId && selectedPersonaId && selectedFrameworkId && selectedModelId)

  const handleSave = async () => {
    if (!canSave) {
      toast.error("Please fill in all required fields")
      return
    }

    if (agentName.trim().length < 3) {
      toast.error("Agent name must be at least 3 characters")
      return
    }

    try {
      setIsLoading(true)
      await onSave({
        name: agentName.trim(),
        roleId: selectedRoleId!,
        personaId: selectedPersonaId!,
        frameworkId: selectedFrameworkId!,
        modelId: selectedModelId!,
        modelProvider: selectedModel!.provider,
        customInstructions: customInstructions.trim() || undefined,
      })
      toast.success(editMode ? "Agent updated successfully" : "Agent created successfully")
    } catch (error) {
      console.error("[v0] Error saving agent:", error)
      toast.error(editMode ? "Failed to update agent" : "Failed to create agent")
    } finally {
      setIsLoading(false)
    }
  }

  const roleModules = allRoles.map((role) => ({
    id: role.id,
    name: role.name,
    description: role.description,
    icon: role.icon,
    badge: role.category,
  }))

  const personaModules = allPersonas.map((persona) => ({
    id: persona.id,
    name: persona.name,
    description: persona.description,
    icon: persona.icon,
    badge: persona.decisionMaking,
  }))

  const frameworkModules = allFrameworks.map((framework) => ({
    id: framework.id,
    name: framework.name,
    description: framework.description,
    icon: framework.icon,
    badge: framework.bestFor[0],
  }))

  const composerProps = {
    agentName,
    onAgentNameChange: setAgentName,
    customInstructions,
    onCustomInstructionsChange: setCustomInstructions,
    selectedRole,
    selectedPersona,
    selectedFramework,
    selectedModel,
    onSelectRole: () => setShowRoleSelector(true),
    onSelectPersona: () => setShowPersonaSelector(true),
    onSelectFramework: () => setShowFrameworkSelector(true),
    onSelectModel: () => setShowModelSelector(true),
    onRemoveRole: () => setSelectedRoleId(undefined),
    onRemovePersona: () => setSelectedPersonaId(undefined),
    onRemoveFramework: () => setSelectedFrameworkId(undefined),
    onRemoveModel: () => setSelectedModelId(undefined),
    onSave: handleSave,
    canSave,
    isLoading,
    editMode,
  }

  return (
    <>
      {isMobile ? <AgentComposerMobile {...composerProps} /> : <AgentComposerDesktop {...composerProps} />}

      <ModuleSelector
        isOpen={showRoleSelector}
        onClose={() => setShowRoleSelector(false)}
        title="Select Role"
        description="Choose the professional expertise for your agent"
        modules={roleModules}
        selectedId={selectedRoleId}
        onSelect={setSelectedRoleId}
      />

      <ModuleSelector
        isOpen={showPersonaSelector}
        onClose={() => setShowPersonaSelector(false)}
        title="Select Persona"
        description="Choose the communication style for your agent"
        modules={personaModules}
        selectedId={selectedPersonaId}
        onSelect={setSelectedPersonaId}
      />

      <ModuleSelector
        isOpen={showFrameworkSelector}
        onClose={() => setShowFrameworkSelector(false)}
        title="Select Framework"
        description="Choose the thinking approach for your agent"
        modules={frameworkModules}
        selectedId={selectedFrameworkId}
        onSelect={setSelectedFrameworkId}
      />

      <ModelSelector
        isOpen={showModelSelector}
        onClose={() => setShowModelSelector(false)}
        selectedId={selectedModelId}
        onSelect={setSelectedModelId}
      />
    </>
  )
}

"use client"

import { useState } from "react"
import { useDevice } from "@/contexts/DeviceProvider"
import { useRoleManager } from "@/hooks/useRoleManager"
import { usePersonaManager } from "@/hooks/usePersonaManager"
import { useFrameworkManager } from "@/hooks/useFrameworkManager"
import { AgentComposerMobile } from "./AgentComposerMobile"
import { AgentComposerDesktop } from "./AgentComposerDesktop"
import { ModuleSelector } from "./ModuleSelector"

interface AgentComposerProps {
  onSave: (config: {
    name: string
    roleId: string
    personaId: string
    frameworkId: string
    customInstructions?: string
  }) => void
}

export function AgentComposer({ onSave }: AgentComposerProps) {
  const { isMobile } = useDevice()
  const { allRoles, getRole } = useRoleManager()
  const { allPersonas, getPersona } = usePersonaManager()
  const { allFrameworks, getFramework } = useFrameworkManager()

  const [agentName, setAgentName] = useState("")
  const [selectedRoleId, setSelectedRoleId] = useState<string>()
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>()
  const [selectedFrameworkId, setSelectedFrameworkId] = useState<string>()
  const [customInstructions, setCustomInstructions] = useState("")

  const [showRoleSelector, setShowRoleSelector] = useState(false)
  const [showPersonaSelector, setShowPersonaSelector] = useState(false)
  const [showFrameworkSelector, setShowFrameworkSelector] = useState(false)

  const selectedRole = selectedRoleId ? getRole(selectedRoleId) : undefined
  const selectedPersona = selectedPersonaId ? getPersona(selectedPersonaId) : undefined
  const selectedFramework = selectedFrameworkId ? getFramework(selectedFrameworkId) : undefined

  const canSave = Boolean(agentName && selectedRoleId && selectedPersonaId && selectedFrameworkId)

  const handleSave = () => {
    if (canSave) {
      onSave({
        name: agentName,
        roleId: selectedRoleId!,
        personaId: selectedPersonaId!,
        frameworkId: selectedFrameworkId!,
        customInstructions: customInstructions || undefined,
      })
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
    onSelectRole: () => setShowRoleSelector(true),
    onSelectPersona: () => setShowPersonaSelector(true),
    onSelectFramework: () => setShowFrameworkSelector(true),
    onRemoveRole: () => setSelectedRoleId(undefined),
    onRemovePersona: () => setSelectedPersonaId(undefined),
    onRemoveFramework: () => setSelectedFrameworkId(undefined),
    onSave: handleSave,
    canSave,
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
    </>
  )
}

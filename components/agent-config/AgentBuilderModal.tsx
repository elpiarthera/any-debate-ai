"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ChevronLeft, ChevronRight, Sparkles, Check } from "lucide-react"
import { useDevice } from "@/contexts/DeviceProvider"
import { RoleSelector } from "./RoleSelector"
import { PersonaSelector } from "./PersonaSelector"
import { FrameworkSelector } from "./FrameworkSelector"
import { AgentPreview } from "./AgentPreview"
import { CONFIGURATION_STEPS } from "@/lib/agent-config/types"
import type { AgentConfigurationDraft, ConfigurationStep } from "@/lib/agent-config/types"
import { toast } from "sonner"

interface AgentBuilderModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (config: AgentConfigurationDraft) => void
  initialConfig?: Partial<AgentConfigurationDraft>
}

export function AgentBuilderModal({ isOpen, onClose, onSave, initialConfig }: AgentBuilderModalProps) {
  const { isMobile } = useDevice()
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<ConfigurationStep[]>(CONFIGURATION_STEPS)
  const [draft, setDraft] = useState<Partial<AgentConfigurationDraft>>({
    name: "",
    roleId: "",
    personaId: "",
    frameworkId: "",
    model: "gpt-4-turbo",
    customInstructions: "",
    ...initialConfig,
  })

  useEffect(() => {
    setSteps((prevSteps) =>
      prevSteps.map((step, index) => ({
        ...step,
        completed:
          index < currentStep ||
          (index === 0 && draft.roleId !== "") ||
          (index === 1 && draft.personaId !== "") ||
          (index === 2 && draft.frameworkId !== "") ||
          (index === 3 && draft.name !== "" && draft.model !== ""),
      })),
    )
  }, [currentStep, draft])

  const progress = ((currentStep + 1) / steps.length) * 100

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return draft.roleId !== ""
      case 1:
        return draft.personaId !== ""
      case 2:
        return draft.frameworkId !== ""
      case 3:
        return draft.name !== "" && draft.model !== ""
      default:
        return false
    }
  }

  const handleNext = () => {
    if (canProceed() && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSave = () => {
    if (draft.name && draft.roleId && draft.personaId && draft.frameworkId && draft.model) {
      onSave(draft as AgentConfigurationDraft)
      toast.success(`Agent "${draft.name}" configured successfully!`)
      onClose()
    } else {
      toast.error("Please complete all required fields")
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <RoleSelector selectedRoleId={draft.roleId} onRoleSelect={(roleId) => setDraft({ ...draft, roleId })} />
      case 1:
        return (
          <PersonaSelector
            selectedPersonaId={draft.personaId}
            onPersonaSelect={(personaId) => setDraft({ ...draft, personaId })}
          />
        )
      case 2:
        return (
          <FrameworkSelector
            selectedFrameworkId={draft.frameworkId}
            onFrameworkSelect={(frameworkId) => setDraft({ ...draft, frameworkId })}
          />
        )
      case 3:
        return (
          <AgentPreview
            draft={draft}
            onNameChange={(name) => setDraft({ ...draft, name })}
            onModelChange={(model) => setDraft({ ...draft, model })}
            onCustomInstructionsChange={(customInstructions) => setDraft({ ...draft, customInstructions })}
          />
        )
      default:
        return null
    }
  }

  return (
    <AdaptiveModal isOpen={isOpen} onClose={onClose} title="Agent Builder">
      <div className="flex flex-col h-full max-h-[85vh] md:max-h-[80vh] overflow-hidden">
        <div className="flex-shrink-0 px-4 pt-4 md:px-6 md:pt-6">
          <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-primary flex-shrink-0" />
            </motion.div>
            <h2 className="text-lg md:text-2xl font-semibold min-w-0 flex-1">Agent Builder</h2>
            <Badge variant="secondary" className="text-xs md:text-sm flex-shrink-0">
              {currentStep + 1}/{steps.length}
            </Badge>
          </div>

          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center gap-1 flex-shrink-0">
                  {step.completed ? (
                    <Check className="h-3 w-3 md:h-4 md:w-4 text-primary flex-shrink-0" />
                  ) : (
                    <div
                      className={`h-3 w-3 md:h-4 md:w-4 rounded-full border flex-shrink-0 ${
                        index === currentStep ? "border-primary bg-primary" : "border-muted-foreground"
                      }`}
                    />
                  )}
                  <span
                    className={`text-xs md:text-sm whitespace-nowrap ${
                      index === currentStep ? "text-foreground font-medium" : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-3 md:my-4" />

        <div className="flex-1 overflow-hidden px-4 md:px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full overflow-y-auto"
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        <Separator className="my-3 md:my-4" />

        <div className="flex-shrink-0 px-4 pb-4 md:px-6 md:pb-6">
          <div className="flex items-center justify-between gap-2 md:gap-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-1 md:gap-2 min-h-[44px] min-w-[44px] flex-shrink-0 bg-transparent"
            >
              <ChevronLeft className="h-4 w-4 flex-shrink-0" />
              <span className="hidden sm:inline">Previous</span>
            </Button>

            {!isMobile && (
              <div className="text-sm text-muted-foreground text-center flex-1 min-w-0 px-2">
                {steps[currentStep]?.description}
              </div>
            )}

            {currentStep === steps.length - 1 ? (
              <Button
                onClick={handleSave}
                disabled={!canProceed()}
                className="flex items-center gap-1 md:gap-2 min-h-[44px] flex-shrink-0"
              >
                <Sparkles className="h-4 w-4 flex-shrink-0" />
                <span className="whitespace-nowrap">Create Agent</span>
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center gap-1 md:gap-2 min-h-[44px] min-w-[44px] flex-shrink-0"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </AdaptiveModal>
  )
}

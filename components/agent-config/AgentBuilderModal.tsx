"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ChevronLeft, ChevronRight, Sparkles, Check } from "lucide-react"
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
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<ConfigurationStep[]>(CONFIGURATION_STEPS)
  const [draft, setDraft] = useState<Partial<AgentConfigurationDraft>>({
    name: "",
    roleId: "",
    personaId: "",
    frameworkId: "",
    customInstructions: "",
    ...initialConfig,
  })

  // Update step completion status
  useEffect(() => {
    setSteps((prevSteps) =>
      prevSteps.map((step, index) => ({
        ...step,
        completed:
          index < currentStep ||
          (index === 0 && draft.roleId !== "") ||
          (index === 1 && draft.personaId !== "") ||
          (index === 2 && draft.frameworkId !== "") ||
          (index === 3 && draft.name !== ""),
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
        return draft.name !== ""
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
    if (draft.name && draft.roleId && draft.personaId && draft.frameworkId) {
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
            onCustomInstructionsChange={(customInstructions) => setDraft({ ...draft, customInstructions })}
          />
        )
      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Sparkles className="h-6 w-6 text-primary" />
            </motion.div>
            <DialogTitle className="text-2xl">Agent Builder</DialogTitle>
            <Badge variant="secondary" className="ml-auto">
              Step {currentStep + 1} of {steps.length}
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2 mt-4">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center gap-1">
                  {step.completed ? (
                    <Check className="h-3 w-3 text-primary" />
                  ) : (
                    <div
                      className={`h-3 w-3 rounded-full border ${
                        index === currentStep ? "border-primary bg-primary" : "border-muted-foreground"
                      }`}
                    />
                  )}
                  <span className={index === currentStep ? "text-foreground font-medium" : ""}>{step.title}</span>
                </div>
              ))}
            </div>
          </div>
        </DialogHeader>

        <Separator />

        {/* Step Content */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        <Separator />

        {/* Navigation */}
        <div className="flex items-center justify-between flex-shrink-0">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center gap-2 bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="text-sm text-muted-foreground">{steps[currentStep]?.description}</div>

          {currentStep === steps.length - 1 ? (
            <Button onClick={handleSave} disabled={!canProceed()} className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Create Agent
            </Button>
          ) : (
            <Button onClick={handleNext} disabled={!canProceed()} className="flex items-center gap-2">
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

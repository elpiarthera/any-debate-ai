"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { QuickStartPanel } from "@/components/templates/QuickStartPanel"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useDevice } from "@/contexts/DeviceProvider"
import { toast } from "sonner"
import type { QuickStartScenario, AgentTeamPreset } from "@/lib/templates/presets"
import { convertScenarioToTemplate } from "@/lib/templates/presets"
import { convertTemplateToModels } from "@/lib/templates/utils"
import type { DebateTemplate } from "@/lib/templates/types"

export default function QuickStartPage() {
  const router = useRouter()
  const { isMobile } = useDevice()

  const handleSelectScenario = (scenario: QuickStartScenario) => {
    // Convert scenario to template and store in sessionStorage for debates page
    const template = convertScenarioToTemplate(scenario)
    if (template.agents) {
      const models = convertTemplateToModels(template as DebateTemplate)
      sessionStorage.setItem("quickstart-models", JSON.stringify(models))

      // Store suggested question if available
      if (scenario.suggestedQuestions && scenario.suggestedQuestions.length > 0) {
        sessionStorage.setItem("quickstart-question", scenario.suggestedQuestions[0])
      }

      toast.success(`Loading "${scenario.name}" with ${models.length} agents`)
      router.push("/debates")
    }
  }

  const handleSelectPreset = (preset: AgentTeamPreset) => {
    // Convert preset to models and store in sessionStorage for debates page
    const models = preset.agents.map((agent, index) => ({
      id: `${Date.now()}-${index}`,
      type: "GPT-4" as const,
      name: agent.name,
      config: agent,
    }))

    if (models.length > 4) {
      toast.error("Preset has too many agents. Maximum 4 allowed.")
      return
    }

    sessionStorage.setItem("quickstart-models", JSON.stringify(models))
    toast.success(`Loading "${preset.name}" with ${models.length} agents`)
    router.push("/debates")
  }

  const handleStartFromScratch = () => {
    sessionStorage.removeItem("quickstart-models")
    sessionStorage.removeItem("quickstart-question")
    router.push("/debates")
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header - Mobile optimized */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-40"
      >
        <div className={`flex items-center justify-between ${isMobile ? "p-3" : "p-4"}`}>
          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => router.push("/debates")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            {!isMobile && <h1 className="text-lg font-semibold">Quick Start</h1>}
          </div>

          <ThemeToggle />
        </div>
      </motion.header>

      {/* Main Content - Scrollable */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex-1 overflow-y-auto"
      >
        <QuickStartPanel
          onSelectScenario={handleSelectScenario}
          onSelectPreset={handleSelectPreset}
          onStartFromScratch={handleStartFromScratch}
        />
      </motion.div>
    </div>
  )
}

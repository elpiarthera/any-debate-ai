"use client"

import { useDevice } from "@/contexts/DeviceProvider"
import { QuickStartMobile } from "./mobile/QuickStartMobile"
import { QuickStartDesktop } from "./desktop/QuickStartDesktop"
import type { QuickStartScenario, AgentTeamPreset } from "@/lib/templates/presets"

interface QuickStartPanelProps {
  onSelectScenario: (scenario: QuickStartScenario) => void
  onSelectPreset: (preset: AgentTeamPreset) => void
  onStartFromScratch: () => void
}

export function QuickStartPanel({ onSelectScenario, onSelectPreset, onStartFromScratch }: QuickStartPanelProps) {
  const { isMobile } = useDevice()

  // Shared props for both mobile and desktop implementations
  const sharedProps = {
    onSelectScenario,
    onSelectPreset,
    onStartFromScratch,
  }

  // Conditionally render mobile or desktop implementation
  return isMobile ? <QuickStartMobile {...sharedProps} /> : <QuickStartDesktop {...sharedProps} />
}

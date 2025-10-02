"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, ArrowRight, Users } from "lucide-react"
import { QUICK_START_SCENARIOS, AGENT_TEAM_PRESETS } from "@/lib/templates/presets"
import type { QuickStartScenario, AgentTeamPreset } from "@/lib/templates/presets"

interface QuickStartDesktopProps {
  onSelectScenario: (scenario: QuickStartScenario) => void
  onSelectPreset: (preset: AgentTeamPreset) => void
  onStartFromScratch: () => void
}

export function QuickStartDesktop({ onSelectScenario, onSelectPreset, onStartFromScratch }: QuickStartDesktopProps) {
  const [activeTab, setActiveTab] = useState<"scenarios" | "presets">("scenarios")

  return (
    <div className="w-full max-w-6xl mx-auto p-8 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="h-8 w-8 text-primary" />
          <h2 className="text-4xl font-bold">Quick Start</h2>
        </div>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto">
          Jump right in with pre-configured agent teams and debate scenarios
        </p>
      </div>

      {/* Horizontal Tabs */}
      <div className="flex items-center gap-2 border-b">
        <Button
          variant={activeTab === "scenarios" ? "default" : "ghost"}
          onClick={() => setActiveTab("scenarios")}
          className="min-h-[44px] rounded-b-none"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Scenarios
        </Button>
        <Button
          variant={activeTab === "presets" ? "default" : "ghost"}
          onClick={() => setActiveTab("presets")}
          className="min-h-[44px] rounded-b-none"
        >
          <Users className="h-4 w-4 mr-2" />
          Team Presets
        </Button>
      </div>

      {/* Scenarios Tab */}
      {activeTab === "scenarios" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Popular Scenarios</h3>
            <Badge variant="secondary" className="text-xs">
              {QUICK_START_SCENARIOS.length} available
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {QUICK_START_SCENARIOS.map((scenario) => (
              <ScenarioCard key={scenario.id} scenario={scenario} onSelect={() => onSelectScenario(scenario)} />
            ))}
          </div>
        </div>
      )}

      {/* Presets Tab */}
      {activeTab === "presets" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Agent Team Presets</h3>
            <Badge variant="secondary" className="text-xs">
              {AGENT_TEAM_PRESETS.length} available
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {AGENT_TEAM_PRESETS.map((preset) => (
              <PresetCard key={preset.id} preset={preset} onSelect={() => onSelectPreset(preset)} />
            ))}
          </div>
        </div>
      )}

      {/* Start from Scratch */}
      <div className="pt-4 border-t">
        <Button
          variant="outline"
          onClick={onStartFromScratch}
          className="w-full min-h-[48px] text-base hover:bg-accent bg-transparent"
        >
          Or start from scratch
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

interface ScenarioCardProps {
  scenario: QuickStartScenario
  onSelect: () => void
}

function ScenarioCard({ scenario, onSelect }: ScenarioCardProps) {
  return (
    <Card
      className="p-5 cursor-pointer transition-all hover:shadow-lg hover:border-primary hover:scale-102 min-h-[120px]"
      onClick={onSelect}
    >
      <div className="flex flex-col h-full gap-3">
        <div className="flex items-start gap-3">
          <div className="text-4xl flex-shrink-0">{scenario.icon}</div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-lg mb-1 line-clamp-1">{scenario.name}</h4>
            <p className="text-sm text-muted-foreground line-clamp-2">{scenario.description}</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 mt-auto">
          <Badge variant="secondary" className="text-xs">
            {scenario.category}
          </Badge>
          <Button size="sm" className="min-h-[36px] min-w-[36px]">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

interface PresetCardProps {
  preset: AgentTeamPreset
  onSelect: () => void
}

function PresetCard({ preset, onSelect }: PresetCardProps) {
  return (
    <Card
      className="p-5 cursor-pointer transition-all hover:shadow-lg hover:border-primary hover:scale-102 min-h-[120px]"
      onClick={onSelect}
    >
      <div className="flex flex-col h-full gap-3">
        <div className="flex items-start gap-3">
          <div className="text-4xl flex-shrink-0">{preset.icon}</div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-lg mb-1 line-clamp-1">{preset.name}</h4>
            <p className="text-sm text-muted-foreground line-clamp-2">{preset.description}</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 mt-auto">
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{preset.agents.length} agents</span>
          </div>
          <Button size="sm" className="min-h-[36px] min-w-[36px]">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

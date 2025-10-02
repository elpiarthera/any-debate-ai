"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, ArrowRight, Users, ChevronRight } from "lucide-react"
import { QUICK_START_SCENARIOS, AGENT_TEAM_PRESETS } from "@/lib/templates/presets"
import type { QuickStartScenario, AgentTeamPreset } from "@/lib/templates/presets"

interface QuickStartMobileProps {
  onSelectScenario: (scenario: QuickStartScenario) => void
  onSelectPreset: (preset: AgentTeamPreset) => void
  onStartFromScratch: () => void
}

export function QuickStartMobile({ onSelectScenario, onSelectPreset, onStartFromScratch }: QuickStartMobileProps) {
  const [expandedSection, setExpandedSection] = useState<"scenarios" | "presets" | null>("scenarios")

  return (
    <div className="w-full space-y-4 p-4">
      {/* Header */}
      <div className="text-center space-y-2 pb-4">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Quick Start</h2>
        </div>
        <p className="text-sm text-muted-foreground">Choose a pre-configured setup</p>
      </div>

      {/* Scenarios Section */}
      <div className="space-y-3">
        <button
          onClick={() => setExpandedSection(expandedSection === "scenarios" ? null : "scenarios")}
          className="w-full flex items-center justify-between p-4 bg-accent rounded-lg min-h-[56px]"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-primary" />
            <div className="text-left">
              <h3 className="font-semibold">Debate Scenarios</h3>
              <p className="text-xs text-muted-foreground">{QUICK_START_SCENARIOS.length} ready-to-use scenarios</p>
            </div>
          </div>
          <ChevronRight
            className={`h-5 w-5 transition-transform ${expandedSection === "scenarios" ? "rotate-90" : ""}`}
          />
        </button>

        {expandedSection === "scenarios" && (
          <div className="space-y-2 animate-in slide-in-from-top-2">
            {QUICK_START_SCENARIOS.map((scenario) => (
              <Card
                key={scenario.id}
                className="p-4 cursor-pointer active:scale-98 transition-transform min-h-[100px]"
                onClick={() => onSelectScenario(scenario)}
              >
                <div className="flex gap-3">
                  <div className="text-3xl flex-shrink-0">{scenario.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-base mb-1 line-clamp-1">{scenario.name}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{scenario.description}</p>
                    <Badge variant="secondary" className="text-xs">
                      {scenario.category}
                    </Badge>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0 self-center" />
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Presets Section */}
      <div className="space-y-3">
        <button
          onClick={() => setExpandedSection(expandedSection === "presets" ? null : "presets")}
          className="w-full flex items-center justify-between p-4 bg-accent rounded-lg min-h-[56px]"
        >
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-primary" />
            <div className="text-left">
              <h3 className="font-semibold">Agent Team Presets</h3>
              <p className="text-xs text-muted-foreground">{AGENT_TEAM_PRESETS.length} pre-configured teams</p>
            </div>
          </div>
          <ChevronRight
            className={`h-5 w-5 transition-transform ${expandedSection === "presets" ? "rotate-90" : ""}`}
          />
        </button>

        {expandedSection === "presets" && (
          <div className="space-y-2 animate-in slide-in-from-top-2">
            {AGENT_TEAM_PRESETS.map((preset) => (
              <Card
                key={preset.id}
                className="p-4 cursor-pointer active:scale-98 transition-transform min-h-[100px]"
                onClick={() => onSelectPreset(preset)}
              >
                <div className="flex gap-3">
                  <div className="text-3xl flex-shrink-0">{preset.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-base mb-1 line-clamp-1">{preset.name}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{preset.description}</p>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{preset.agents.length} agents</span>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0 self-center" />
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Start from Scratch */}
      <div className="pt-4">
        <Button variant="outline" onClick={onStartFromScratch} className="w-full min-h-[48px] text-base bg-transparent">
          Start from scratch
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

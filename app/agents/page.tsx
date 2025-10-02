"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Sparkles, ArrowLeft, Search, Users } from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { AgentBuilderModal } from "@/components/agent-config/AgentBuilderModal"
import { AgentCard } from "@/components/agent-management/AgentCard"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { useDevice } from "@/contexts/DeviceProvider"
import { AgentTeamPreview } from "@/components/templates/AgentTeamPreview"
import { AGENT_TEAM_PRESETS, type AgentTeamPreset } from "@/lib/templates/presets"
import { toast } from "sonner"
import Link from "next/link"
import type { AgentConfigurationDraft } from "@/lib/agent-config/types"

export default function AgentsPage() {
  const [agents, setAgents] = useState<AgentConfigurationDraft[]>([])
  const [activeCount, setActiveCount] = useState<number>(0)
  const [customCount, setCustomCount] = useState<number>(0)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [filterType, setFilterType] = useState<string>("all")
  const [isAgentBuilderOpen, setIsAgentBuilderOpen] = useState<boolean>(false)
  const [isTeamPresetOpen, setIsTeamPresetOpen] = useState<boolean>(false)
  const [selectedPreset, setSelectedPreset] = useState<AgentTeamPreset | null>(null)

  const { isMobile } = useDevice()

  const toggleAgentStatus = (agentId: string) => {
    setAgents((prev) => prev.map((agent) => (agent.id === agentId ? { ...agent, isActive: !agent.isActive } : agent)))
    setActiveCount((prev) => (agents.find((a) => a.id === agentId)?.isActive ? prev - 1 : prev + 1))
  }

  const deleteAgent = (agentId: string) => {
    setAgents((prev) => prev.filter((agent) => agent.id !== agentId))
    const agent = agents.find((a) => a.id === agentId)
    if (agent?.isActive) setActiveCount((prev) => prev - 1)
    if (agent) setCustomCount((prev) => prev - 1)
    toast.success(`Deleted agent "${agent?.name}"`)
  }

  const handleAgentConfigSave = (newAgent: AgentConfigurationDraft) => {
    setAgents((prev) => [...prev, { ...newAgent, id: Date.now().toString(), isActive: true }])
    setActiveCount((prev) => prev + 1)
    setCustomCount((prev) => prev + 1)
    toast.success(`Created agent "${newAgent.name}"`)
  }

  const handleLoadTeamPreset = (preset: AgentTeamPreset) => {
    const newAgents = preset.agents.map((agent) => ({
      ...agent,
      id: `${Date.now()}-${Math.random()}`,
      isActive: true,
    }))
    setAgents((prev) => [...prev, ...newAgents])
    setActiveCount((prev) => prev + newAgents.length)
    setCustomCount((prev) => prev + newAgents.length)
    setIsTeamPresetOpen(false)
    toast.success(`Loaded "${preset.name}" with ${newAgents.length} agents`)
  }

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      filterType === "all" || (filterType === "active" && agent.isActive) || (filterType === "custom" && agent.id)
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Mobile optimized */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-40"
      >
        <div className={`container mx-auto px-4 ${isMobile ? "py-3" : "py-4"}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
              <Link href="/overview">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>

              <div className="flex items-center gap-2 min-w-0">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Sparkles className="h-5 w-5 text-primary" />
                </motion.div>
                <h1 className={`font-semibold ${isMobile ? "text-lg" : "text-xl"}`}>
                  {isMobile ? "Agents" : "Agent Management"}
                </h1>
              </div>

              {!isMobile && (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {agents.length} Total
                  </Badge>
                  <Badge variant="default" className="text-xs">
                    {activeCount} Active
                  </Badge>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <Button
                onClick={() => setIsTeamPresetOpen(true)}
                size={isMobile ? "sm" : "default"}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                {!isMobile && "Load Team"}
              </Button>
              <Button
                onClick={() => setIsAgentBuilderOpen(true)}
                size={isMobile ? "sm" : "default"}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                {!isMobile && "Create Agent"}
              </Button>
              {!isMobile && <ThemeToggle />}
            </div>
          </div>

          {/* Mobile stats */}
          {isMobile && (
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                {agents.length} Total
              </Badge>
              <Badge variant="default" className="text-xs">
                {activeCount} Active
              </Badge>
            </div>
          )}
        </div>
      </motion.header>

      {/* Main Content */}
      <div className={`container mx-auto px-4 ${isMobile ? "py-6" : "py-8"}`}>
        {/* Search and Filter - Mobile optimized */}
        <div className={`flex flex-col gap-4 mb-6 md:mb-8 ${isMobile ? "space-y-3" : "md:flex-row md:space-y-0"}`}>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            <Button
              variant={filterType === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("all")}
            >
              All
            </Button>
            <Button
              variant={filterType === "active" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("active")}
            >
              Active ({activeCount})
            </Button>
            <Button
              variant={filterType === "custom" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("custom")}
            >
              Custom ({customCount})
            </Button>
          </div>
        </div>

        {/* Agents Grid - Mobile responsive */}
        <div
          className={`grid gap-4 md:gap-6 ${isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}
        >
          {filteredAgents.map((agent, index) => (
            <AgentCard key={agent.id} agent={agent} onToggleStatus={toggleAgentStatus} onDelete={deleteAgent} />
          ))}

          {/* Add Agent Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: filteredAgents.length * 0.05 }}
          >
            <Card
              className="border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer h-full"
              onClick={() => setIsAgentBuilderOpen(true)}
            >
              <CardContent
                className={`flex flex-col items-center justify-center text-center ${isMobile ? "h-32 p-4" : "h-48"}`}
              >
                <Plus className={`text-muted-foreground mb-4 ${isMobile ? "h-8 w-8" : "h-12 w-12"}`} />
                <CardTitle className={`mb-2 ${isMobile ? "text-base" : "text-lg"}`}>Create New Agent</CardTitle>
                <CardDescription className={isMobile ? "text-sm" : ""}>
                  Configure a custom AI agent with specific roles and behaviors
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Empty State */}
        {filteredAgents.length === 0 && searchQuery && (
          <div className={`text-center ${isMobile ? "py-8" : "py-12"}`}>
            <Search className={`text-muted-foreground mx-auto mb-4 ${isMobile ? "h-8 w-8" : "h-12 w-12"}`} />
            <h3 className={`font-semibold mb-2 ${isMobile ? "text-base" : "text-lg"}`}>No agents found</h3>
            <p className={`text-muted-foreground mb-4 ${isMobile ? "text-sm" : ""}`}>
              Try adjusting your search or filter criteria
            </p>
            <Button onClick={() => setSearchQuery("")}>Clear search</Button>
          </div>
        )}
      </div>

      <AdaptiveModal
        isOpen={isAgentBuilderOpen}
        onClose={() => setIsAgentBuilderOpen(false)}
        title="Create Custom Agent"
        description="Configure a custom AI agent for your debates"
      >
        <AgentBuilderModal
          isOpen={isAgentBuilderOpen}
          onClose={() => setIsAgentBuilderOpen(false)}
          onSave={handleAgentConfigSave}
        />
      </AdaptiveModal>

      <AdaptiveModal
        isOpen={isTeamPresetOpen}
        onClose={() => setIsTeamPresetOpen(false)}
        title="Load Agent Team Preset"
        description="Choose a pre-configured team of agents for common scenarios"
      >
        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
          {AGENT_TEAM_PRESETS.map((preset) => (
            <Card
              key={preset.id}
              className="cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => setSelectedPreset(preset)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <CardTitle className="text-base mb-1">{preset.name}</CardTitle>
                    <CardDescription className="text-sm">{preset.description}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {preset.agents.length} agents
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {preset.agents.map((agent, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {agent.name}
                    </Badge>
                  ))}
                </div>
                <Button
                  size="sm"
                  className="w-full mt-3"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleLoadTeamPreset(preset)
                  }}
                >
                  Load Team
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedPreset && (
          <div className="mt-4 border-t pt-4">
            <h3 className="font-semibold mb-2">Preview: {selectedPreset.name}</h3>
            <AgentTeamPreview preset={selectedPreset} />
          </div>
        )}
      </AdaptiveModal>
    </div>
  )
}

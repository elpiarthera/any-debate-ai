"use client"
import { useState, useCallback, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Menu, Sparkles, Save, History } from "lucide-react"
import { ChatSidebar } from "@/components/chat/ChatSidebar"
import { MentionInput } from "@/components/chat/MentionInput"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { CanvasToggle } from "@/components/ui/canvas-toggle"
import { ArtifactCanvas } from "@/components/artifacts/ArtifactCanvas"
import { AgentBuilderModal } from "@/components/agent-config/AgentBuilderModal"
import { QuickAgentSelector } from "@/components/agent-management/QuickAgentSelector"
import { SaveTemplateModal } from "@/components/templates/SaveTemplateModal"
import { useDevice } from "@/contexts/DeviceProvider"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { toast } from "sonner"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { AgentConfigurationDraft } from "@/lib/agent-config/types"
import { ModeSelector } from "@/components/chat/ModeSelector"
import { CompareMode } from "@/components/chat/compare/CompareMode"
import { DebateMode } from "@/components/chat/debate/DebateMode"
import { AutoDebateMode } from "@/components/chat/auto-debate/AutoDebateMode"
import type { ChatMode } from "@/lib/chat/modes"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
import { OrgSwitcher } from "@/components/dashboard/OrgSwitcher"
import { TokenBalance } from "@/components/dashboard/TokenBalance"
import { QuickActionsMenu } from "@/components/dashboard/QuickActionsMenu"

interface AIModel {
  id: string
  type: "GPT-4" | "Claude-3.5" | "Llama-3" | "Gemini"
  name: string
  config?: AgentConfigurationDraft
}

interface ChatMessage {
  id: string
  content: string
  sender: {
    id: string
    name: string
    type: "user" | "ai"
    avatar?: string
  }
  timestamp: Date
  isStreaming?: boolean
  reactions?: {
    likes: number
    dislikes: number
  }
}

const MODEL_TYPES = ["GPT-4", "Claude-3.5", "Llama-3", "Gemini"] as const

export default function DebatesPage() {
  const [models, setModels] = useState<AIModel[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isCanvasOpen, setIsCanvasOpen] = useState(false)
  const [isAgentBuilderOpen, setIsAgentBuilderOpen] = useState(false)
  const [isSaveTemplateOpen, setIsSaveTemplateOpen] = useState(false)
  const [isDashboardSidebarOpen, setIsDashboardSidebarOpen] = useState(false)
  const [isChatSidebarOpen, setIsChatSidebarOpen] = useState(false)
  const [currentSessionId, setCurrentSessionId] = useState("1")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [hasStartedSession, setHasStartedSession] = useState(false)
  const router = useRouter()

  const [chatMode, setChatMode] = useState<ChatMode>("compare")

  useEffect(() => {
    const storedModels = sessionStorage.getItem("quickstart-models")
    const storedQuestion = sessionStorage.getItem("quickstart-question")

    if (storedModels) {
      try {
        const parsedModels = JSON.parse(storedModels)
        setModels(parsedModels)
        setHasStartedSession(true)
        sessionStorage.removeItem("quickstart-models")
      } catch (error) {
        console.error("Failed to parse stored models:", error)
      }
    }

    if (storedQuestion) {
      setInput(storedQuestion)
      sessionStorage.removeItem("quickstart-question")
    }
  }, [])

  const addModel = (modelType: (typeof MODEL_TYPES)[number]) => {
    if (models.length >= 4) {
      toast.error("Maximum 4 models allowed")
      return
    }

    if (models.some((m) => m.type === modelType)) {
      toast.error(`${modelType} is already added`)
      return
    }

    const newModel: AIModel = {
      id: Date.now().toString(),
      type: modelType,
      name: modelType,
    }
    setModels([...models, newModel])
    toast.success(`Added ${modelType} to the debate!`)
  }

  const removeModel = (modelId: string) => {
    const model = models.find((m) => m.id === modelId)
    setModels(models.filter((m) => m.id !== modelId))
    toast.success(`Removed ${model?.name} from the debate`)
  }

  const handleSubmit = useCallback(() => {
    if (!input.trim() || isLoading) return
    if (models.length === 0) {
      toast.error("Add at least one agent to start the debate")
      return
    }

    const currentInput = input
    setInput("")
    setIsLoading(true)

    // Create user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content: currentInput,
      sender: {
        id: "user",
        name: "You",
        type: "user",
      },
      timestamp: new Date(),
    }

    // Add user message to the array
    setMessages((prev) => [...prev, userMessage])

    // Simulate AI responses from each model
    models.forEach((model, index) => {
      setTimeout(
        () => {
          const aiMessage: ChatMessage = {
            id: `ai-${model.id}-${Date.now()}`,
            content: `This is a simulated response from ${model.name}. In production, this will be replaced with actual AI responses.`,
            sender: {
              id: model.id,
              name: model.name,
              type: "ai",
            },
            timestamp: new Date(),
            isStreaming: false,
          }

          setMessages((prev) => [...prev, aiMessage])

          // Mark loading as complete after last model responds
          if (index === models.length - 1) {
            setIsLoading(false)
          }
        },
        1000 * (index + 1),
      )
    })
  }, [input, isLoading, models])

  const handleAgentConfigSave = (config: AgentConfigurationDraft) => {
    const newModel: AIModel = {
      id: Date.now().toString(),
      type: "GPT-4",
      name: config.name,
      config: config,
    }

    if (models.length >= 4) {
      toast.error("Maximum 4 models allowed")
      return
    }

    setModels([...models, newModel])
    toast.success(`Custom agent "${config.name}" added to the debate!`)
  }

  const handleSaveAsTemplate = () => {
    const configuredAgents = models.filter((m) => m.config)
    if (configuredAgents.length === 0) {
      toast.error("Add at least one custom agent to save as a template")
      return
    }
    setIsSaveTemplateOpen(true)
  }

  const handleNewSession = useCallback(() => {
    console.log("[v0] New debate session started")
    setModels([])
    setInput("")
    setCurrentSessionId(Date.now().toString())
    setHasStartedSession(true)
    setMessages([]) // Reset messages array on new session
    toast.success("Starting new debate session!")
  }, [])

  const handleSessionSelect = (sessionId: string) => {
    setCurrentSessionId(sessionId)
    toast.info(`Switched to session ${sessionId}`)
  }

  const { isMobile } = useDevice()

  return (
    <div className="flex h-screen bg-background">
      {!isMobile && (
        <DashboardSidebar
          isCollapsed={isDashboardSidebarOpen}
          onToggleCollapse={() => setIsDashboardSidebarOpen(!isDashboardSidebarOpen)}
        />
      )}

      {!isMobile && (
        <ChatSidebar
          isCollapsed={isChatSidebarOpen}
          onToggleCollapse={() => setIsChatSidebarOpen(!isChatSidebarOpen)}
          currentSessionId={currentSessionId}
          onSessionSelect={handleSessionSelect}
          onNewSession={handleNewSession}
        />
      )}

      <div className="flex-1 flex flex-col min-h-0">
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-40"
        >
          <div className={`flex items-center justify-between ${isMobile ? "p-3" : "p-4"}`}>
            <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
              {isMobile && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 flex-shrink-0"
                    onClick={() => setIsDashboardSidebarOpen(!isDashboardSidebarOpen)}
                  >
                    <Menu className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 flex-shrink-0"
                    onClick={() => setIsChatSidebarOpen(!isChatSidebarOpen)}
                  >
                    <History className="h-4 w-4" />
                  </Button>
                </>
              )}

              {!isMobile ? (
                <OrgSwitcher />
              ) : (
                <Link href="/overview">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 flex-shrink-0">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
              )}

              <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
                {!isMobile && <h1 className="text-lg font-semibold flex-shrink-0">AI Debate</h1>}
                <div className="min-w-0 flex-1">
                  <QuickAgentSelector
                    models={models}
                    onAddModel={addModel}
                    onRemoveModel={removeModel}
                    onOpenAgentBuilder={() => setIsAgentBuilderOpen(true)}
                    maxModels={4}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              {!isMobile && <TokenBalance />}
              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveAsTemplate}
                className="flex items-center gap-2 bg-transparent"
                disabled={models.filter((m) => m.config).length === 0}
              >
                <Save className="h-4 w-4" />
                {!isMobile && "Save"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/quick-start")}
                className="flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                {!isMobile && "Templates"}
              </Button>
              <CanvasToggle isCanvasOpen={isCanvasOpen} onToggleCanvas={setIsCanvasOpen} />
              {!isMobile && <QuickActionsMenu />}
              <ThemeToggle />
            </div>
          </div>

          {(hasStartedSession || models.length > 0) && (
            <div className="px-4 pb-3">
              <ModeSelector currentMode={chatMode} onModeChange={setChatMode} />
            </div>
          )}
        </motion.header>

        <div className="flex-1 min-h-0 overflow-hidden">
          {!hasStartedSession && messages.length === 0 && models.length === 0 ? (
            <div className="h-full flex items-center justify-center p-8">
              <div className="text-center space-y-4 max-w-md">
                <Sparkles className="h-12 w-12 text-primary mx-auto" />
                <h2 className="text-2xl font-bold">Start Your Debate</h2>
                <p className="text-muted-foreground">
                  Add agents to begin, or use Quick Start for pre-configured setups
                </p>
                <Button size="lg" onClick={() => router.push("/quick-start")} className="min-h-[48px]">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Open Quick Start
                </Button>
              </div>
            </div>
          ) : (
            <>
              {chatMode === "compare" && (
                <CompareMode
                  activeAgents={models.map((m) => m.id)}
                  onSendMessage={async (prompt, agentIds) => {
                    // Handle compare mode message sending
                    handleSubmit()
                  }}
                />
              )}
              {chatMode === "debate" && (
                <DebateMode
                  activeAgents={models.map((m) => ({ id: m.id, name: m.name }))}
                  onSendMessage={async (content, mentions, replyTo) => {
                    // Handle debate mode message sending
                  }}
                />
              )}
              {chatMode === "auto-debate" && (
                <AutoDebateMode
                  availableAgents={models.map((m) => ({ id: m.id, name: m.name }))}
                  onSendMessage={async (agentId, content, round) => {
                    // Handle auto-debate mode message sending
                    return "Simulated response"
                  }}
                />
              )}
            </>
          )}
        </div>

        {(hasStartedSession || models.length > 0) && (
          <motion.div
            className={`border-t border-border/50 backdrop-blur-sm bg-background/80 ${isMobile ? "p-3" : "p-4"}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="max-w-4xl mx-auto">
              <MentionInput
                value={input}
                onChange={setInput}
                onSubmit={handleSubmit}
                agents={models.map((model) => ({
                  id: model.id,
                  name: model.name,
                  type: model.type,
                }))}
                disabled={isLoading}
                placeholder={isMobile ? "Type message..." : "Type your message or @ to mention an agent..."}
              />
            </div>
          </motion.div>
        )}
      </div>

      {isMobile && (
        <AdaptiveModal
          isOpen={isDashboardSidebarOpen}
          onClose={() => setIsDashboardSidebarOpen(false)}
          title="Dashboard Menu"
          description="Navigate through dashboard sections"
        >
          <div className="flex flex-col h-[70vh]">
            <div className="p-4 border-b">
              <OrgSwitcher />
            </div>
            <DashboardSidebar isCollapsed={false} onToggleCollapse={() => setIsDashboardSidebarOpen(false)} />
          </div>
        </AdaptiveModal>
      )}

      {isMobile && (
        <AdaptiveModal
          isOpen={isChatSidebarOpen}
          onClose={() => setIsChatSidebarOpen(false)}
          title="Chat History"
          description="Browse your previous debate sessions"
        >
          <div className="flex flex-col h-[70vh]">
            <ChatSidebar
              isCollapsed={false}
              onToggleCollapse={() => setIsChatSidebarOpen(false)}
              currentSessionId={currentSessionId}
              onSessionSelect={(sessionId) => {
                handleSessionSelect(sessionId)
                setIsChatSidebarOpen(false)
              }}
              onNewSession={() => {
                handleNewSession()
                setIsChatSidebarOpen(false)
              }}
            />
          </div>
        </AdaptiveModal>
      )}

      <ArtifactCanvas isCanvasOpen={isCanvasOpen} onCloseCanvas={() => setIsCanvasOpen(false)} />

      <SaveTemplateModal
        isOpen={isSaveTemplateOpen}
        onClose={() => setIsSaveTemplateOpen(false)}
        agents={models}
        currentTopic="AI Debate Session"
      />

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
    </div>
  )
}

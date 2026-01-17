"use client"
import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AlertCircle, Zap, Loader2, Sparkles } from "lucide-react"
import { MessageBubble } from "./MessageBubble"
import { ModelSettings } from "./ModelSettings"
import { useAIChat } from "@/hooks/useAIChat"
import { toast } from "sonner"

interface AIModel {
  id: string
  type: "GPT-4" | "Claude-3.5" | "Llama-3" | "Gemini"
  name: string
}

interface ModelColumnProps {
  model: AIModel
  onRemove: () => void
  onRename: (newName: string) => void
  canRemove: boolean
  models: AIModel[]
  onShareMessage?: (content: string, targetModelId: string) => void
  onAutoDebateResponse?: (modelId: string, response: string) => void
  globalInput?: string
  autoMode?: boolean
  isActiveInChain?: boolean
  chainPosition?: number
}

export function ModelColumn({
  model,
  onRemove,
  onRename,
  canRemove,
  models,
  onShareMessage,
  onAutoDebateResponse,
  globalInput,
  autoMode = false,
  isActiveInChain = false,
  chainPosition = 1,
}: ModelColumnProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    setInput,
    connectionStatus,
    retry,
    stopStreaming,
    isConnected,
    isRetrying,
    canRetry,
  } = useAIChat({
    model: model.type,
    agentConfig: {
      // You can add agent configuration here based on model
      temperature: 0.7,
    },
    conversationContext: {
      conversationType: "debate",
      participants: models.map((m) => m.name),
    },
    onFinish: (message) => {
      // Handle auto debate response when message is complete
      if (onAutoDebateResponse && autoMode && message.content) {
        onAutoDebateResponse(model.id, message.content)
      }
    },
    onError: (error) => {
      toast.error(`${model.type}: ${error.message}`)
    },
    maxRetries: 3,
    retryDelay: 1000,
  })

  useEffect(() => {
    if (scrollContainerRef.current) {
      setTimeout(() => {
        scrollContainerRef.current?.scrollTo({
          top: scrollContainerRef.current.scrollHeight,
          behavior: "smooth",
        })
      }, 100)
    }
  }, [messages])

  useEffect(() => {
    console.log("[v0] ModelColumn globalInput changed:", globalInput)
    if (globalInput && globalInput.trim()) {
      console.log("[v0] Triggering AI response for", model.name)
      setInput(globalInput)
      // Create a proper form submission event
      const submitEvent = {
        preventDefault: () => {},
        target: { elements: { message: { value: globalInput } } },
      } as any
      handleSubmit(submitEvent)
    }
  }, [globalInput, setInput, handleSubmit, model.name])

  const handleShareMessage = (content: string, targetModelId: string) => {
    if (onShareMessage) {
      onShareMessage(content, targetModelId)
    }
  }

  const handleClearMessages = () => {
    // Note: AI SDK useChat doesn't have a direct clear method
    // We'll need to reload the component or implement a custom solution
    window.location.reload()
  }

  const otherModels = models.filter((m) => m.id !== model.id)

  const getModelIcon = () => {
    switch (model.type) {
      case "GPT-4":
        return "🤖"
      case "Claude-3.5":
        return "🧠"
      case "Llama-3":
        return "🦙"
      case "Gemini":
        return "💎"
      default:
        return "🤖"
    }
  }

  const getModelColor = () => {
    switch (model.type) {
      case "GPT-4":
        return "from-green-500/20 to-emerald-500/20"
      case "Claude-3.5":
        return "from-blue-500/20 to-cyan-500/20"
      case "Llama-3":
        return "from-purple-500/20 to-pink-500/20"
      case "Gemini":
        return "from-orange-500/20 to-red-500/20"
      default:
        return "from-gray-500/20 to-slate-500/20"
    }
  }

  return (
    <motion.div layout className="h-full" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Card
        className={`flex flex-col h-[600px] min-w-[300px] overflow-hidden bg-gradient-to-br ${getModelColor()} backdrop-blur-sm border-border/50 ${
          isActiveInChain ? "ring-2 ring-primary shadow-xl shadow-primary/20" : ""
        }`}
      >
        <motion.div
          className="flex items-center justify-between p-4 border-b border-border/50 bg-background/50 backdrop-blur-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={isActiveInChain ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            >
              <Avatar className="h-8 w-8 bg-gradient-to-br from-primary/20 to-primary/10">
                <AvatarFallback className="text-sm bg-transparent">{getModelIcon()}</AvatarFallback>
              </Avatar>
            </motion.div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1 bg-background/50">
                {model.name}
                {!isConnected && <AlertCircle className="h-3 w-3 text-destructive" />}
                {isRetrying && <Loader2 className="h-3 w-3 animate-spin text-warning" />}
                {autoMode && (
                  <span className="text-xs ml-1 flex items-center gap-1">
                    #{chainPosition}
                    {isActiveInChain && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <Zap className="h-3 w-3 text-primary" />
                      </motion.div>
                    )}
                  </span>
                )}
              </Badge>
              {connectionStatus.status !== "connected" && (
                <Badge variant="destructive" className="text-xs">
                  {connectionStatus.status === "connecting"
                    ? "Connecting..."
                    : connectionStatus.status === "error"
                      ? "Error"
                      : "Disconnected"}
                </Badge>
              )}
            </div>
          </div>

          <ModelSettings
            model={model}
            onRemove={onRemove}
            onRename={onRename}
            onClearMessages={handleClearMessages}
            canRemove={canRemove}
            hasMessages={messages.length > 0}
          />
        </motion.div>

        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto overflow-x-hidden"
          style={{ height: "calc(600px - 73px)" }}
        >
          <div className="p-4 space-y-4">
            <AnimatePresence>
              {messages.length === 0 ? (
                <motion.div
                  className="flex flex-col items-center justify-center h-[400px] text-muted-foreground"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {isActiveInChain ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Loader2 className="h-8 w-8 mx-auto mb-2 text-primary" />
                    </motion.div>
                  ) : (
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                      <Sparkles className="h-8 w-8 mx-auto mb-2 text-primary" />
                    </motion.div>
                  )}
                  <p className="text-sm font-medium">
                    {isActiveInChain ? `${model.name} is thinking...` : `Ready to chat with ${model.name}`}
                  </p>
                  {autoMode && !isActiveInChain && (
                    <p className="text-xs mt-1 text-muted-foreground/70">
                      Position #{chainPosition} in auto debate chain
                    </p>
                  )}
                  {error && (
                    <div className="text-center mt-2">
                      <p className="text-xs text-destructive">Error: {error.message}</p>
                      {canRetry && (
                        <button onClick={retry} className="text-xs text-primary hover:underline mt-1">
                          Retry ({connectionStatus.retryCount}/{connectionStatus.maxRetries})
                        </button>
                      )}
                    </div>
                  )}
                </motion.div>
              ) : (
                messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <MessageBubble
                      message={{
                        id: message.id,
                        role: message.role,
                        content: message.content,
                        timestamp: message.timestamp,
                        isLoading: message.isStreaming || false,
                      }}
                      onShare={handleShareMessage}
                      otherModels={otherModels}
                    />
                  </motion.div>
                ))
              )}
            </AnimatePresence>
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  className="flex justify-center py-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-xs text-muted-foreground">{isRetrying ? "Retrying..." : "Thinking..."}</span>
                    <button onClick={stopStreaming} className="text-xs text-destructive hover:underline">
                      Stop
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

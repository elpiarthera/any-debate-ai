"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Share, Bot, Copy, User, MessageSquare } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { useArtifacts } from "@ai-sdk-tools/artifacts/client"

interface AIModel {
  id: string
  type: "GPT-4" | "Claude-3.5" | "Llama-3" | "Gemini"
  name: string
}

interface MessageData {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  isLoading?: boolean
  threadId?: string
  parentMessageId?: string
  replyCount?: number
  hasReplies?: boolean
}

interface MessageBubbleProps {
  message: MessageData
  onShare: (content: string, targetModelId: string) => void
  otherModels: AIModel[]
  onReply?: (messageId: string) => void
  onViewThread?: (messageId: string) => void
}

export function MessageBubble({ message, onShare, otherModels, onReply, onViewThread }: MessageBubbleProps) {
  const { artifacts } = useArtifacts({
    onError: (error) => {
      console.error("[v0] Artifacts error in MessageBubble:", error)
    },
  })

  const handleShare = (targetModelId: string) => {
    onShare(message.content, targetModelId)
    toast.success("Message shared successfully!")
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      toast.success("Message copied to clipboard!")
    } catch (error) {
      toast.error("Failed to copy message")
    }
  }

  const messageArtifacts = artifacts.filter((artifact) => {
    if (!artifact.metadata?.createdAt || !message.timestamp) return false

    const artifactTime = new Date(artifact.metadata.createdAt).getTime()
    const messageTime = message.timestamp.getTime()

    // Show artifacts created within 10 seconds of the message
    return Math.abs(artifactTime - messageTime) <= 10000
  })

  return (
    <div
      className={cn(
        "flex gap-3 p-4 rounded-lg",
        message.role === "user" ? "bg-blue-50 dark:bg-blue-950/20 ml-8" : "bg-gray-50 dark:bg-gray-900/50 mr-8",
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
          message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-500 text-white",
        )}
      >
        {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium">{message.role === "user" ? "You" : "Assistant"}</span>
          <span className="text-xs text-muted-foreground">{message.timestamp.toLocaleTimeString()}</span>
        </div>

        <div className="prose prose-sm max-w-none dark:prose-invert">
          {message.isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
              <span className="text-muted-foreground">Thinking...</span>
            </div>
          ) : (
            <p className="whitespace-pre-wrap">{message.content}</p>
          )}
        </div>

        {messageArtifacts.length > 0 && (
          <div className="mt-3 space-y-2">
            {messageArtifacts.map((artifact) => (
              <div
                key={artifact.id}
                className="p-3 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-primary">
                      {artifact.type === "document" && "📄"}
                      {artifact.type === "data-table" && "📊"}
                      {artifact.type === "checklist" && "✅"}
                      {artifact.type === "chart" && "📈"} {artifact.title || `${artifact.type} artifact`}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={() => {
                      const event = new CustomEvent("toggleCanvas", { detail: { show: true, artifactId: artifact.id } })
                      window.dispatchEvent(event)
                    }}
                  >
                    View →
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Collaborative artifact created - click Canvas to view and edit with other AI agents
                </p>
              </div>
            ))}
          </div>
        )}

        {message.hasReplies && message.replyCount && message.replyCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 mt-2 text-xs"
            onClick={() => onViewThread?.(message.id)}
          >
            <MessageSquare className="h-3 w-3 mr-1" />
            {message.replyCount} {message.replyCount === 1 ? "reply" : "replies"}
          </Button>
        )}

        {message.role === "assistant" && !message.isLoading && (
          <div className="flex items-center gap-1 mt-2">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={handleCopy}>
              <Copy className="h-3 w-3" />
            </Button>
            {onReply && (
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={() => onReply(message.id)}>
                <MessageSquare className="h-3 w-3 mr-1" />
                Reply
              </Button>
            )}
            {otherModels.length > 0 ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Share className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <div className="px-2 py-1 text-xs font-medium text-muted-foreground">Share to:</div>
                  {otherModels.map((model) => (
                    <DropdownMenuItem key={model.id} onClick={() => handleShare(model.id)}>
                      <Bot className="h-4 w-4 mr-2" />
                      {model.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}

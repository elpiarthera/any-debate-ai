"use client"

import type React from "react"

import { useState, useCallback, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { toast } from "sonner"
import { type AgentConfig, validateAgentConfig } from "@/lib/ai-utils"

export interface StreamingMessage {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
  isStreaming?: boolean
  isComplete?: boolean
  error?: string
}

export interface ConnectionStatus {
  status: "connected" | "connecting" | "disconnected" | "error"
  lastConnected?: Date
  retryCount: number
  maxRetries: number
}

export interface UseAIChatOptions {
  model: string
  agentConfig?: AgentConfig
  conversationContext?: {
    topic?: string
    participants?: string[]
    conversationType?: "debate" | "collaboration" | "analysis"
    urgency?: "low" | "medium" | "high"
  }
  onFinish?: (message: StreamingMessage) => void
  onError?: (error: Error) => void
  onStreamingUpdate?: (content: string, messageId: string) => void
  maxRetries?: number
  retryDelay?: number
}

export function useAIChat(options: UseAIChatOptions) {
  const {
    model,
    agentConfig,
    conversationContext,
    onFinish,
    onError,
    onStreamingUpdate,
    maxRetries = 3,
    retryDelay = 1000,
  } = options

  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    status: "connected",
    retryCount: 0,
    maxRetries,
  })

  const [streamingMessages, setStreamingMessages] = useState<Map<string, string>>(new Map())
  const retryTimeoutRef = useRef<NodeJS.Timeout>()
  const abortControllerRef = useRef<AbortController>()

  // Enhanced useChat with custom error handling
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: originalHandleSubmit,
    isLoading,
    error,
    setInput,
    reload,
    stop,
  } = useChat({
    api: "/api/chat",
    body: {
      model,
      agentConfig,
      conversationContext,
    },
    onFinish: (message) => {
      const streamingMessage: StreamingMessage = {
        id: message.id,
        role: message.role as "user" | "assistant",
        content: message.content,
        timestamp: new Date(message.createdAt || Date.now()),
        isStreaming: false,
        isComplete: true,
      }

      // Clear streaming state for this message
      setStreamingMessages((prev) => {
        const newMap = new Map(prev)
        newMap.delete(message.id)
        return newMap
      })

      setConnectionStatus((prev) => ({
        ...prev,
        status: "connected",
        lastConnected: new Date(),
        retryCount: 0,
      }))

      onFinish?.(streamingMessage)
    },
    onError: (error) => {
      console.error("[v0] Chat error:", error)
      handleError(error)
    },
    onResponse: (response) => {
      if (response.ok) {
        setConnectionStatus((prev) => ({
          ...prev,
          status: "connected",
          lastConnected: new Date(),
          retryCount: 0,
        }))
      } else {
        setConnectionStatus((prev) => ({
          ...prev,
          status: "error",
        }))
      }
    },
  })

  // Enhanced error handling with retry logic
  const handleError = useCallback(
    (error: Error) => {
      console.error("[v0] AI Chat error:", error)

      setConnectionStatus((prev) => {
        const newStatus = { ...prev, status: "error" as const }

        // Implement retry logic
        if (prev.retryCount < maxRetries) {
          newStatus.retryCount = prev.retryCount + 1
          newStatus.status = "connecting"

          // Clear any existing retry timeout
          if (retryTimeoutRef.current) {
            clearTimeout(retryTimeoutRef.current)
          }

          // Schedule retry
          retryTimeoutRef.current = setTimeout(() => {
            console.log(`[v0] Retrying connection (attempt ${newStatus.retryCount}/${maxRetries})`)
            reload()
          }, retryDelay * Math.pow(2, prev.retryCount)) // Exponential backoff

          toast.error(`Connection failed. Retrying... (${newStatus.retryCount}/${maxRetries})`)
        } else {
          toast.error(`Connection failed after ${maxRetries} attempts. Please check your connection.`)
        }

        return newStatus
      })

      onError?.(error)
    },
    [maxRetries, retryDelay, reload, onError],
  )

  // Enhanced submit with validation and error handling
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      // Validate agent configuration if provided
      if (agentConfig) {
        const validation = validateAgentConfig(agentConfig)
        if (!validation.isValid) {
          toast.error(`Invalid agent configuration: ${validation.errors.join(", ")}`)
          return
        }
      }

      // Abort any existing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController()

      setConnectionStatus((prev) => ({
        ...prev,
        status: "connecting",
      }))

      try {
        await originalHandleSubmit(e)
      } catch (error) {
        handleError(error as Error)
      }
    },
    [agentConfig, originalHandleSubmit, handleError],
  )

  // Manual retry function
  const retry = useCallback(() => {
    if (connectionStatus.retryCount < maxRetries) {
      setConnectionStatus((prev) => ({
        ...prev,
        status: "connecting",
        retryCount: prev.retryCount + 1,
      }))
      reload()
    }
  }, [connectionStatus.retryCount, maxRetries, reload])

  // Reset connection status
  const resetConnection = useCallback(() => {
    setConnectionStatus({
      status: "connected",
      retryCount: 0,
      maxRetries,
    })
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current)
    }
  }, [maxRetries])

  // Stop current request
  const stopStreaming = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    stop()
    setConnectionStatus((prev) => ({
      ...prev,
      status: "connected",
    }))
  }, [stop])

  // Enhanced messages with streaming indicators
  const enhancedMessages: StreamingMessage[] = messages.map((message) => ({
    id: message.id,
    role: message.role as "user" | "assistant",
    content: message.content,
    timestamp: new Date(message.createdAt || Date.now()),
    isStreaming: streamingMessages.has(message.id),
    isComplete: !streamingMessages.has(message.id),
    error: error?.message,
  }))

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  return {
    messages: enhancedMessages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    setInput,
    connectionStatus,
    retry,
    resetConnection,
    stopStreaming,
    // Additional utilities
    isConnected: connectionStatus.status === "connected",
    isRetrying: connectionStatus.status === "connecting" && connectionStatus.retryCount > 0,
    canRetry: connectionStatus.retryCount < maxRetries,
    streamingMessageIds: Array.from(streamingMessages.keys()),
  }
}

// Connection status hook for global connection monitoring
export function useConnectionStatus() {
  const [globalStatus, setGlobalStatus] = useState<"online" | "offline">("online")

  useEffect(() => {
    const handleOnline = () => setGlobalStatus("online")
    const handleOffline = () => setGlobalStatus("offline")

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  return globalStatus
}

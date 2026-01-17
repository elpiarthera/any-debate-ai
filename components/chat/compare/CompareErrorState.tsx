"use client"

import { AlertCircle, RefreshCw, Trash2, WifiOff, Clock, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type ErrorType =
  | "network" // Network connection failed
  | "rate_limit" // API rate limit exceeded
  | "model_error" // Model-specific error
  | "timeout" // Request timeout
  | "invalid_key" // API key invalid
  | "unknown" // Generic error

export interface ErrorState {
  type: ErrorType
  message: string
  retryable: boolean
  retryAfter?: number // seconds (for rate limit)
}

interface CompareErrorStateProps {
  error: ErrorState
  modelName: string
  onRetry?: () => void
  onRemove?: () => void
  className?: string
}

export function CompareErrorState({ error, modelName, onRetry, onRemove, className }: CompareErrorStateProps) {
  const getErrorIcon = () => {
    switch (error.type) {
      case "network":
        return <WifiOff className="h-5 w-5" />
      case "rate_limit":
        return <Clock className="h-5 w-5" />
      case "timeout":
        return <Clock className="h-5 w-5" />
      case "invalid_key":
        return <ShieldAlert className="h-5 w-5" />
      default:
        return <AlertCircle className="h-5 w-5" />
    }
  }

  const getErrorTitle = () => {
    switch (error.type) {
      case "network":
        return "Connection Failed"
      case "rate_limit":
        return "Rate Limit Exceeded"
      case "timeout":
        return "Response Timeout"
      case "invalid_key":
        return "Configuration Error"
      case "model_error":
        return "Model Error"
      default:
        return "Generation Failed"
    }
  }

  return (
    <Card
      className={cn(
        "flex flex-col items-center justify-center p-6 text-center h-full min-h-[200px]",
        "border-destructive/50 bg-destructive/5",
        className,
      )}
    >
      <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center text-destructive mb-3">
        {getErrorIcon()}
      </div>

      <h3 className="font-semibold text-foreground mb-1">{getErrorTitle()}</h3>

      <p className="text-sm text-muted-foreground mb-4 max-w-[250px]">
        {error.message || `Failed to generate response from ${modelName}.`}
      </p>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        {error.retryable && onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="border-destructive/30 hover:bg-destructive/10 hover:text-destructive min-h-[36px] bg-transparent"
          >
            <RefreshCw className="h-3.5 w-3.5 mr-2" />
            Retry
          </Button>
        )}

        {onRemove && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-muted-foreground hover:text-destructive min-h-[36px]"
          >
            <Trash2 className="h-3.5 w-3.5 mr-2" />
            Remove Model
          </Button>
        )}
      </div>
    </Card>
  )
}

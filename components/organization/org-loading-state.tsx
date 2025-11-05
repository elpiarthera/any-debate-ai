"use client"

import { useDevice } from "@/contexts/DeviceProvider"
import { Loader2, AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface OrgLoadingStateProps {
  isLoading?: boolean
  error?: string
  onRetry?: () => void
  variant?: "spinner" | "skeleton" | "card"
}

export function OrgLoadingState({ isLoading = false, error, onRetry, variant = "spinner" }: OrgLoadingStateProps) {
  const { isMobile } = useDevice()

  // Error state
  if (error) {
    return (
      <div
        className={`
        flex flex-col items-center justify-center gap-4
        p-6 md:p-8
        text-center
      `}
      >
        <AlertCircle
          className={`
          text-destructive
          ${isMobile ? "w-10 h-10" : "w-12 h-12"}
        `}
        />
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Failed to load organization</p>
          <p className="text-xs md:text-sm text-muted-foreground max-w-md">{error}</p>
        </div>
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            size={isMobile ? "lg" : "default"}
            className="min-h-[44px] gap-2 bg-transparent"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
        )}
      </div>
    )
  }

  // Loading state
  if (isLoading) {
    // Spinner variant
    if (variant === "spinner") {
      return (
        <div className="flex items-center justify-center p-8 md:p-12">
          <Loader2
            className={`
            animate-spin text-muted-foreground
            ${isMobile ? "w-6 h-6" : "w-8 h-8"}
          `}
          />
        </div>
      )
    }

    // Skeleton variant - organization info
    if (variant === "skeleton") {
      return (
        <div
          className={`
          flex items-center gap-3 md:gap-4
          p-3 md:p-4
        `}
        >
          {/* Avatar skeleton */}
          <Skeleton
            className={`
            rounded-full shrink-0
            ${isMobile ? "w-8 h-8" : "w-10 h-10"}
          `}
          />

          {/* Content skeleton */}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32 md:w-40" />
            <Skeleton className="h-3 w-20 md:w-24" />
          </div>
        </div>
      )
    }

    // Card variant - organization card
    if (variant === "card") {
      return (
        <div
          className={`
          border rounded-lg
          p-4 md:p-6
          space-y-4
        `}
        >
          {/* Header */}
          <div className="flex items-center gap-3">
            <Skeleton
              className={`
              rounded-full shrink-0
              ${isMobile ? "w-10 h-10" : "w-12 h-12"}
            `}
            />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-40 md:w-48" />
              <Skeleton className="h-3 w-24 md:w-32" />
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4 md:gap-6">
            <div className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-12" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
        </div>
      )
    }
  }

  return null
}

// Specialized loading states for common scenarios
export function OrgSwitcherLoading() {
  return <OrgLoadingState isLoading variant="skeleton" />
}

export function OrgCardLoading() {
  return <OrgLoadingState isLoading variant="card" />
}

export function OrgListLoading({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3 md:space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <OrgCardLoading key={i} />
      ))}
    </div>
  )
}

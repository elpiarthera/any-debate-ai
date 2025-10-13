"use client"

import { useState } from "react"
import { AlertTriangle, X, Coins } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useDevice } from "@/contexts/DeviceProvider"
import Link from "next/link"

interface TokenBalanceWarningProps {
  balance: number
  isDismissible?: boolean
  onDismiss?: () => void
}

export function TokenBalanceWarning({ balance, isDismissible = true, onDismiss }: TokenBalanceWarningProps) {
  const { isMobile } = useDevice()
  const [isDismissed, setIsDismissed] = useState(false)

  // Don't show if balance is sufficient
  if (balance > 1000) return null

  // Don't show if dismissed
  if (isDismissed) return null

  const isCritical = balance === 0

  const handleDismiss = () => {
    setIsDismissed(true)
    onDismiss?.()
  }

  return (
    <Alert
      variant={isCritical ? "destructive" : "default"}
      className={`
        mb-4 relative
        ${isMobile ? "pr-12" : ""}
      `}
    >
      <AlertTriangle className={`h-4 w-4 ${isMobile ? "h-5 w-5" : ""}`} />
      <AlertDescription
        className={`
        flex items-start justify-between gap-3
        ${isMobile ? "flex-col" : "flex-row items-center"}
      `}
      >
        <div className="flex-1 space-y-1">
          <p className={`font-medium ${isMobile ? "text-sm" : "text-base"}`}>
            {isCritical ? "Out of tokens" : "Low token balance"}
          </p>
          <p
            className={`text-sm ${isMobile ? "text-xs" : ""} ${isCritical ? "text-destructive-foreground" : "text-muted-foreground"}`}
          >
            {isCritical
              ? "You've used all your tokens. Buy more to continue using AI features."
              : `Only ${balance.toLocaleString()} tokens remaining. Consider adding more soon.`}
          </p>
        </div>

        <Button
          asChild
          size={isMobile ? "sm" : "default"}
          variant={isCritical ? "default" : "outline"}
          className={`
            min-h-[44px] shrink-0
            ${isMobile ? "w-full" : ""}
            ${isCritical ? "bg-background text-foreground hover:bg-background/90" : ""}
          `}
        >
          <Link href="/dashboard/billing">
            <Coins className="h-4 w-4 mr-2" />
            Buy Credits
          </Link>
        </Button>
      </AlertDescription>

      {/* Dismiss button (mobile only if dismissible) */}
      {isDismissible && isMobile && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDismiss}
          className="absolute top-2 right-2 min-h-[44px] min-w-[44px]"
          aria-label="Dismiss warning"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </Alert>
  )
}

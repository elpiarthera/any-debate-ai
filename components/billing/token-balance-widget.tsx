"use client"

import { Coins, TrendingUp, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useDevice } from "@/contexts/DeviceProvider"

interface TokenBalanceWidgetProps {
  balance?: number
  limit?: number
  usedThisMonth?: number
  onBuyCredits?: () => void
}

export function TokenBalanceWidget({
  balance = 1250,
  limit = 10000,
  usedThisMonth = 2750,
  onBuyCredits,
}: TokenBalanceWidgetProps) {
  const { isMobile } = useDevice()

  const usagePercentage = (usedThisMonth / limit) * 100
  const remainingPercentage = (balance / limit) * 100
  const isLow = balance < limit * 0.1 // Less than 10% remaining
  const isCritical = balance < limit * 0.05 // Less than 5% remaining

  return (
    <Card
      className={`
      p-4 space-y-4
      ${isMobile ? "w-full" : "w-full max-w-md"}
    `}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Coins className={`h-5 w-5 ${isMobile ? "h-4 w-4" : ""}`} />
          <h3 className={`font-semibold ${isMobile ? "text-base" : "text-lg"}`}>Token Balance</h3>
        </div>
        {(isLow || isCritical) && (
          <Badge variant={isCritical ? "destructive" : "secondary"} className="gap-1">
            <AlertCircle className="h-3 w-3" />
            {isCritical ? "Critical" : "Low"}
          </Badge>
        )}
      </div>

      {/* Balance Display */}
      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <span className={`font-bold ${isMobile ? "text-2xl" : "text-3xl"}`}>{balance.toLocaleString()}</span>
          <span className="text-sm text-muted-foreground">/ {limit.toLocaleString()} tokens</span>
        </div>

        <Progress
          value={remainingPercentage}
          className="h-2"
          indicatorClassName={isCritical ? "bg-destructive" : isLow ? "bg-yellow-500" : "bg-primary"}
        />

        <p className="text-xs text-muted-foreground">{remainingPercentage.toFixed(1)}% remaining</p>
      </div>

      {/* Usage Stats */}
      <div
        className={`
        grid gap-3
        ${isMobile ? "grid-cols-1" : "grid-cols-2"}
      `}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <TrendingUp className="h-3 w-3" />
            <span>Used this month</span>
          </div>
          <p className="text-lg font-semibold">{usedThisMonth.toLocaleString()}</p>
        </div>

        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Estimated remaining</p>
          <p className="text-lg font-semibold">~{Math.floor(balance / 25)} debates</p>
        </div>
      </div>

      {/* Low Balance Warning */}
      {isLow && (
        <div
          className={`
          p-3 rounded-lg border
          ${isCritical ? "bg-destructive/10 border-destructive" : "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-800"}
        `}
        >
          <p className={`text-sm ${isCritical ? "text-destructive" : "text-yellow-800 dark:text-yellow-200"}`}>
            {isCritical
              ? "Critical: Your token balance is very low. Add tokens to continue using AI features."
              : "Warning: Your token balance is running low. Consider adding more tokens soon."}
          </p>
        </div>
      )}

      {/* Buy Credits Button */}
      <Button onClick={onBuyCredits} className="w-full min-h-[44px]" variant={isCritical ? "destructive" : "default"}>
        <Coins className="h-4 w-4 mr-2" />
        Add Tokens
      </Button>
    </Card>
  )
}

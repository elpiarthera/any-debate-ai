"use client"
import { Coins } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useDevice } from "@/contexts/DeviceProvider"

export function TokenBalance() {
  const balance = 1250
  const isLow = balance < 500
  const { isMobile } = useDevice()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2 bg-transparent min-h-[44px] min-w-[44px]">
          <Coins className="h-4 w-4" />
          <span className="hidden md:inline">{balance.toLocaleString()}</span>
          {isLow && (
            <Badge variant="destructive" className="h-5 px-1 text-xs">
              Low
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={isMobile ? "w-[90vw] max-w-[320px]" : "w-80"} align="end">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">Token Balance</h4>
            <p className="text-sm text-muted-foreground">Your current AI token balance</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{balance.toLocaleString()}</span>
            <Badge variant={isLow ? "destructive" : "secondary"}>{isLow ? "Low Balance" : "Good"}</Badge>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Used this month:</span>
              <span className="font-medium">2,750</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated remaining:</span>
              <span className="font-medium">~50 debates</span>
            </div>
          </div>
          <Button className="w-full min-h-[44px]">Add Tokens</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

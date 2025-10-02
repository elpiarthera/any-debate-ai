"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Minus, Award } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDevice } from "@/contexts/DeviceProvider"
import type { ReactionAnalytics } from "@/lib/chat/reactions"

interface ReactionAnalyticsProps {
  analytics: ReactionAnalytics
  className?: string
}

export function ReactionAnalyticsPanel({ analytics, className }: ReactionAnalyticsProps) {
  const { isMobile } = useDevice()

  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-green-500" />
      case "down":
        return <TrendingDown className="h-3 w-3 text-red-500" />
      case "stable":
        return <Minus className="h-3 w-3 text-yellow-500" />
    }
  }

  const getEngagementLevel = (score: number): { label: string; color: string } => {
    if (score >= 80) return { label: "Excellent", color: "text-green-500" }
    if (score >= 60) return { label: "Good", color: "text-blue-500" }
    if (score >= 40) return { label: "Fair", color: "text-yellow-500" }
    return { label: "Low", color: "text-red-500" }
  }

  const engagement = getEngagementLevel(analytics.engagementScore)

  return (
    <Card className={cn("", className)}>
      <CardHeader className={cn(isMobile && "p-4")}>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className={cn(isMobile ? "text-base" : "text-lg")}>Reaction Analytics</CardTitle>
            <CardDescription className={cn(isMobile && "text-xs")}>Engagement insights and trends</CardDescription>
          </div>
          <Award className={cn("text-primary", isMobile ? "h-5 w-5" : "h-6 w-6")} />
        </div>
      </CardHeader>

      <CardContent className={cn("space-y-4", isMobile && "p-4 pt-0")}>
        {/* Engagement Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className={cn("font-medium", isMobile ? "text-sm" : "text-base")}>Engagement Score</span>
            <Badge variant="outline" className={cn("text-xs", engagement.color)}>
              {engagement.label}
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <Progress value={analytics.engagementScore} className="flex-1" />
            <span className={cn("font-bold", engagement.color, isMobile ? "text-sm" : "text-base")}>
              {analytics.engagementScore}%
            </span>
          </div>
        </div>

        {/* Most Used Reactions */}
        <div className="space-y-2">
          <h4 className={cn("font-medium", isMobile ? "text-sm" : "text-base")}>Most Used Reactions</h4>
          <div className="grid grid-cols-5 gap-2">
            {analytics.mostUsed.map((reaction, index) => (
              <motion.div
                key={reaction.emoji}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col items-center gap-1 p-2 bg-muted rounded-lg"
              >
                <span className={cn(isMobile ? "text-xl" : "text-2xl")}>{reaction.emoji}</span>
                <span className={cn("font-medium", isMobile ? "text-xs" : "text-sm")}>{reaction.count}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Reaction Trends */}
        {analytics.reactionTrends.length > 0 && (
          <div className="space-y-2">
            <h4 className={cn("font-medium", isMobile ? "text-sm" : "text-base")}>Trending Reactions</h4>
            <div className="flex flex-wrap gap-2">
              {analytics.reactionTrends.map((trend) => (
                <div key={trend.emoji} className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full">
                  <span className={cn(isMobile ? "text-base" : "text-lg")}>{trend.emoji}</span>
                  {getTrendIcon(trend.trend)}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

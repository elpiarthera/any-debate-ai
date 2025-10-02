"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, User, Bot, Clock, TrendingUp, Tag } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDevice } from "@/contexts/DeviceProvider"
import type { ComparisonMetrics } from "@/lib/chat/comparison"

interface MetricsCardProps {
  metrics: ComparisonMetrics
  sessionName: string
  color: string
}

export function MetricsCard({ metrics, sessionName, color }: MetricsCardProps) {
  const { isMobile } = useDevice()

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-500"
      case "negative":
        return "text-red-500"
      default:
        return "text-yellow-500"
    }
  }

  const getSentimentLabel = (sentiment: string) => {
    return sentiment.charAt(0).toUpperCase() + sentiment.slice(1)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card>
        <CardHeader className={cn("pb-3", isMobile && "p-3")}>
          <div className="flex items-center justify-between">
            <CardTitle className={cn("flex items-center gap-2", isMobile ? "text-sm" : "text-base")}>
              <div className={cn("w-3 h-3 rounded-full", color)} />
              {sessionName}
            </CardTitle>
            <Badge variant="outline" className={cn("text-xs", getSentimentColor(metrics.sentiment))}>
              {getSentimentLabel(metrics.sentiment)}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className={cn("space-y-3", isMobile && "p-3 pt-0")}>
          {/* Message Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center p-2 bg-muted rounded-lg">
              <MessageSquare className="h-4 w-4 text-muted-foreground mb-1" />
              <span className={cn("font-bold", isMobile ? "text-sm" : "text-base")}>{metrics.messageCount}</span>
              <span className="text-xs text-muted-foreground">Total</span>
            </div>

            <div className="flex flex-col items-center p-2 bg-muted rounded-lg">
              <User className="h-4 w-4 text-blue-500 mb-1" />
              <span className={cn("font-bold", isMobile ? "text-sm" : "text-base")}>{metrics.userMessageCount}</span>
              <span className="text-xs text-muted-foreground">User</span>
            </div>

            <div className="flex flex-col items-center p-2 bg-muted rounded-lg">
              <Bot className="h-4 w-4 text-purple-500 mb-1" />
              <span className={cn("font-bold", isMobile ? "text-sm" : "text-base")}>{metrics.aiMessageCount}</span>
              <span className="text-xs text-muted-foreground">AI</span>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className={cn("text-muted-foreground", isMobile ? "text-xs" : "text-sm")}>Avg Response</span>
              </div>
              <span className={cn("font-medium", isMobile ? "text-xs" : "text-sm")}>
                {(metrics.averageResponseTime / 1000).toFixed(2)}s
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-3 w-3 text-muted-foreground" />
                <span className={cn("text-muted-foreground", isMobile ? "text-xs" : "text-sm")}>Engagement</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {metrics.engagementScore}%
              </Badge>
            </div>
          </div>

          {/* Topics */}
          {metrics.uniqueTopics.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Tag className="h-3 w-3 text-muted-foreground" />
                <span className={cn("text-muted-foreground", isMobile ? "text-xs" : "text-sm")}>Key Topics</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {metrics.uniqueTopics.slice(0, 3).map((topic) => (
                  <Badge key={topic} variant="outline" className="text-xs">
                    {topic}
                  </Badge>
                ))}
                {metrics.uniqueTopics.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{metrics.uniqueTopics.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

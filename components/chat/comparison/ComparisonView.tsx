"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GitCompare, TrendingUp, Clock, Target, Info, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDevice } from "@/contexts/DeviceProvider"
import { ComparisonManager } from "@/lib/chat/comparison"
import type { ChatMessage } from "@/lib/chat/types"
import { MetricsCard } from "./MetricsCard"
import { InsightCard } from "./InsightCard"
import { MessageTimeline } from "./MessageTimeline"

interface ComparisonViewProps {
  sessionIds: string[]
  allMessages: ChatMessage[]
  onClose: () => void
  className?: string
}

export function ComparisonView({ sessionIds, allMessages, onClose, className }: ComparisonViewProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const { isMobile } = useDevice()

  const metrics = useMemo(() => {
    return sessionIds.map((sessionId) => ComparisonManager.calculateMetrics(sessionId, allMessages))
  }, [sessionIds, allMessages])

  const insights = useMemo(() => {
    return ComparisonManager.generateInsights(metrics)
  }, [metrics])

  const getSessionName = (sessionId: string) => {
    return `Session ${sessionId.slice(-4)}`
  }

  const getSessionColor = (index: number) => {
    const colors = ["bg-blue-500", "bg-purple-500", "bg-green-500", "bg-orange-500"]
    return colors[index % colors.length]
  }

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Header */}
      <div className={cn("border-b border-border p-4 shrink-0", isMobile && "p-3")}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitCompare className="h-5 w-5 text-primary" />
            <div>
              <h2 className={cn("font-semibold", isMobile ? "text-sm" : "text-base")}>Session Comparison</h2>
              <p className="text-xs text-muted-foreground">
                Comparing {sessionIds.length} {sessionIds.length === 1 ? "session" : "sessions"}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className={cn(isMobile && "h-8 w-8 p-0")}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Session Pills */}
        <div className="flex flex-wrap gap-2 mt-3">
          {sessionIds.map((sessionId, index) => (
            <Badge key={sessionId} variant="outline" className={cn("text-xs", getSessionColor(index))}>
              {getSessionName(sessionId)}
            </Badge>
          ))}
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className={cn("p-4", isMobile && "p-3")}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className={cn("w-full grid grid-cols-3", isMobile && "h-9")}>
              <TabsTrigger value="overview" className="text-xs">
                <Target className="h-3 w-3 mr-1" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="insights" className="text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                Insights
              </TabsTrigger>
              <TabsTrigger value="timeline" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                Timeline
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-4 space-y-4">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3">
                <Card>
                  <CardHeader className={cn("pb-2", isMobile && "p-3")}>
                    <CardDescription className="text-xs">Total Messages</CardDescription>
                    <CardTitle className={cn(isMobile ? "text-xl" : "text-2xl")}>
                      {metrics.reduce((sum, m) => sum + m.messageCount, 0)}
                    </CardTitle>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader className={cn("pb-2", isMobile && "p-3")}>
                    <CardDescription className="text-xs">Avg Engagement</CardDescription>
                    <CardTitle className={cn(isMobile ? "text-xl" : "text-2xl")}>
                      {Math.round(metrics.reduce((sum, m) => sum + m.engagementScore, 0) / metrics.length)}%
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>

              {/* Metrics Cards */}
              <div className="space-y-3">
                {metrics.map((metric, index) => (
                  <MetricsCard
                    key={metric.sessionId}
                    metrics={metric}
                    sessionName={getSessionName(metric.sessionId)}
                    color={getSessionColor(index)}
                  />
                ))}
              </div>

              {/* Comparison Chart */}
              <Card>
                <CardHeader className={cn(isMobile && "p-3")}>
                  <CardTitle className={cn(isMobile ? "text-sm" : "text-base")}>Message Distribution</CardTitle>
                </CardHeader>
                <CardContent className={cn(isMobile && "p-3 pt-0")}>
                  <div className="space-y-3">
                    {metrics.map((metric, index) => {
                      const maxMessages = Math.max(...metrics.map((m) => m.messageCount))
                      const percentage = (metric.messageCount / maxMessages) * 100

                      return (
                        <div key={metric.sessionId} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-medium">{getSessionName(metric.sessionId)}</span>
                            <span className="text-muted-foreground">{metric.messageCount} messages</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              className={cn("h-full", getSessionColor(index))}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Insights Tab */}
            <TabsContent value="insights" className="mt-4 space-y-3">
              {insights.length === 0 ? (
                <Card>
                  <CardContent className={cn("flex flex-col items-center justify-center py-12", isMobile && "py-8")}>
                    <Info className="h-12 w-12 text-muted-foreground/50 mb-3" />
                    <p className="text-sm text-muted-foreground text-center">Not enough data to generate insights</p>
                    <p className="text-xs text-muted-foreground text-center mt-1">
                      Compare more sessions or add more messages
                    </p>
                  </CardContent>
                </Card>
              ) : (
                insights.map((insight, index) => <InsightCard key={index} insight={insight} index={index} />)
              )}
            </TabsContent>

            {/* Timeline Tab */}
            <TabsContent value="timeline" className="mt-4">
              <MessageTimeline sessionIds={sessionIds} allMessages={allMessages} getSessionColor={getSessionColor} />
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  )
}

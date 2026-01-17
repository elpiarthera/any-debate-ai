"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, TrendingUp, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDevice } from "@/contexts/DeviceProvider"
import type { ComparisonInsight } from "@/lib/chat/comparison"

interface InsightCardProps {
  insight: ComparisonInsight
  index: number
}

export function InsightCard({ insight, index }: InsightCardProps) {
  const { isMobile } = useDevice()

  const getIcon = () => {
    switch (insight.type) {
      case "difference":
        return <AlertCircle className="h-5 w-5" />
      case "similarity":
        return <CheckCircle className="h-5 w-5" />
      case "trend":
        return <TrendingUp className="h-5 w-5" />
      default:
        return <Info className="h-5 w-5" />
    }
  }

  const getColor = () => {
    switch (insight.severity) {
      case "high":
        return "text-red-500 bg-red-500/10 border-red-500/20"
      case "medium":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20"
      case "low":
        return "text-green-500 bg-green-500/10 border-green-500/20"
    }
  }

  const getTypeColor = () => {
    switch (insight.type) {
      case "difference":
        return "bg-orange-500"
      case "similarity":
        return "bg-blue-500"
      case "trend":
        return "bg-purple-500"
    }
  }

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
      <Card className={cn("border-l-4", getColor())}>
        <CardContent className={cn("p-4", isMobile && "p-3")}>
          <div className="flex items-start gap-3">
            <div className={cn("shrink-0 w-10 h-10 rounded-lg flex items-center justify-center", getColor())}>
              {getIcon()}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className={cn("font-semibold", isMobile ? "text-sm" : "text-base")}>{insight.title}</h4>
                <Badge variant="outline" className={cn("text-xs", getTypeColor())}>
                  {insight.type}
                </Badge>
              </div>

              <p className={cn("text-muted-foreground mb-2", isMobile ? "text-xs" : "text-sm")}>
                {insight.description}
              </p>

              {insight.metrics && Object.keys(insight.metrics).length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {Object.entries(insight.metrics).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs">
                      <span className="text-muted-foreground">{key}:</span>
                      <span className="font-medium">
                        {typeof value === "number" && value > 100 ? Math.round(value) : value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

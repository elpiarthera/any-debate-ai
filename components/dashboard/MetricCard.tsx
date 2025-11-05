"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { useDevice } from "@/contexts/DeviceProvider"

interface MetricCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon: LucideIcon
  description?: string
  index?: number
}

export function MetricCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  description,
  index = 0,
}: MetricCardProps) {
  const { isMobile } = useDevice()

  const changeColor = {
    positive: "text-green-500",
    negative: "text-red-500",
    neutral: "text-muted-foreground",
  }[changeType]

  const getAnimationProps = () => {
    if (isMobile) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: index * 0.1 },
      }
    }
    return {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.1 },
    }
  }

  return (
    <motion.div {...getAnimationProps()}>
      <Card className="hover:shadow-lg transition-all duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className={`${isMobile ? "text-xs" : "text-sm"} font-medium`}>{title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className={`${isMobile ? "text-xl" : "text-2xl"} font-bold`}>{value}</div>
          {change && <p className={`text-xs ${changeColor} mt-1`}>{change}</p>}
          {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        </CardContent>
      </Card>
    </motion.div>
  )
}

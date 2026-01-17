"use client"

import { useDevice } from "@/contexts/DeviceProvider"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Zap } from "lucide-react"
import { motion } from "framer-motion"

interface SocialProofBadgeProps {
  type: "trending" | "users" | "activity"
  text: string
}

export function SocialProofBadge({ type, text }: SocialProofBadgeProps) {
  const { isMobile } = useDevice()

  const getIcon = () => {
    switch (type) {
      case "trending":
        return <TrendingUp className="h-3 w-3" />
      case "users":
        return <Users className="h-3 w-3" />
      case "activity":
        return <Zap className="h-3 w-3" />
    }
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
      <Badge variant="secondary" className={`flex items-center gap-1.5 ${isMobile ? "text-xs" : "text-sm"}`}>
        {getIcon()}
        <span>{text}</span>
      </Badge>
    </motion.div>
  )
}

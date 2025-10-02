"use client"

import { useState, useEffect } from "react"
import { useDevice } from "@/contexts/DeviceProvider"
import { Badge } from "@/components/ui/badge"
import { Zap, Users, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface UrgencyBannerProps {
  type?: "limited-spots" | "recent-signups" | "time-limited"
  message?: string
  countdown?: boolean
  expiresAt?: Date
}

export function UrgencyBanner({ type = "limited-spots", message, countdown = false, expiresAt }: UrgencyBannerProps) {
  const { isMobile } = useDevice()
  const [spotsLeft, setSpotsLeft] = useState(47)
  const [recentSignups, setRecentSignups] = useState(127)
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    if (countdown && expiresAt) {
      const interval = setInterval(() => {
        const now = new Date().getTime()
        const distance = expiresAt.getTime() - now

        if (distance < 0) {
          setTimeLeft("Expired")
          clearInterval(interval)
          return
        }

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [countdown, expiresAt])

  const getBannerContent = () => {
    switch (type) {
      case "limited-spots":
        return {
          icon: <Zap className="h-4 w-4" />,
          text: message || `Only ${spotsLeft} spots left in our beta program`,
          variant: "destructive" as const,
        }
      case "recent-signups":
        return {
          icon: <Users className="h-4 w-4" />,
          text: message || `${recentSignups} people signed up in the last 24 hours`,
          variant: "secondary" as const,
        }
      case "time-limited":
        return {
          icon: <Clock className="h-4 w-4" />,
          text: message || `Limited time offer ends in ${timeLeft}`,
          variant: "default" as const,
        }
      default:
        return {
          icon: <Zap className="h-4 w-4" />,
          text: message || "Limited availability",
          variant: "default" as const,
        }
    }
  }

  const content = getBannerContent()

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="flex items-center justify-center"
      >
        <Badge
          variant={content.variant}
          className={`flex items-center gap-2 ${isMobile ? "text-xs px-3 py-2" : "text-sm px-4 py-2"}`}
        >
          {content.icon}
          <span>{content.text}</span>
        </Badge>
      </motion.div>
    </AnimatePresence>
  )
}

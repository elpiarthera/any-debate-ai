"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useDevice } from "@/contexts/DeviceProvider"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Gift, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { trackExitIntent, trackEmailCapture } from "@/lib/analytics"

interface ExitIntentPopupProps {
  trigger?: "mouse-leave" | "time-delay"
  delay?: number
  showOnce?: boolean
}

export function ExitIntentPopup({ trigger = "mouse-leave", delay = 3000, showOnce = true }: ExitIntentPopupProps) {
  const { isMobile } = useDevice()
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    if (showOnce && hasShown) return

    if (trigger === "mouse-leave") {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0 && !hasShown) {
          setIsOpen(true)
          setHasShown(true)
          trackExitIntent(false)
        }
      }

      document.addEventListener("mouseleave", handleMouseLeave)
      return () => document.removeEventListener("mouseleave", handleMouseLeave)
    }

    if (trigger === "time-delay") {
      const timer = setTimeout(() => {
        if (!hasShown) {
          setIsOpen(true)
          setHasShown(true)
          trackExitIntent(false)
        }
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [trigger, delay, showOnce, hasShown])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    trackEmailCapture("exit-intent", email)
    trackExitIntent(true)

    // TODO: Integrate with email service
    console.log("Email captured:", email)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className={`${isMobile ? "max-w-[90vw]" : "max-w-md"}`}>
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center"
            >
              <Gift className="h-8 w-8 text-primary" />
            </motion.div>
          </div>
          <DialogTitle className={`text-center ${isMobile ? "text-xl" : "text-2xl"}`}>
            Wait! Get Our Free Decision-Making Guide
          </DialogTitle>
          <DialogDescription className="text-center text-pretty">
            Learn how top teams make 10x faster decisions with AI collaboration. Join 12,459 subscribers.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10 min-h-[48px]"
            />
          </div>

          <Button type="submit" size="lg" className="w-full min-h-[48px]">
            Send Me The Guide
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}

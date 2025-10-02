"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Play, ArrowRight } from "lucide-react"
import { UrgencyBanner } from "../UrgencyBanner"
import { TrustSignals } from "../TrustSignals"
import { trackCTAClick } from "@/lib/analytics"

interface LandingHeroMobileProps {
  onStartDemo: () => void
  onWatchDemo: () => void
}

export function LandingHeroMobile({ onStartDemo, onWatchDemo }: LandingHeroMobileProps) {
  return (
    <section className="relative overflow-hidden" data-section="hero">
      <div className="max-w-7xl mx-auto px-4 pt-12 pb-16">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Urgency Banner */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <UrgencyBanner type="limited-spots" message="Only 47 spots left in our beta program" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-3xl font-bold mb-4 text-balance leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Make Better Decisions in{" "}
            <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
              5 Minutes, Not 5 Days
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-base text-muted-foreground mb-8 text-pretty px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Stop struggling with analysis paralysis. Get instant insights from 4 AI experts debating your toughest
            challenges—no meetings, no delays, no guesswork.
          </motion.p>

          {/* CTAs - Mobile: Full-width stacked */}
          <motion.div
            className="flex flex-col gap-3 px-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              size="lg"
              onClick={() => {
                trackCTAClick("hero", "primary", "Start Your First Debate Now")
                onStartDemo()
              }}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-full px-6 py-6 text-base min-h-[56px] group"
            >
              <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              <div className="flex flex-col items-start">
                <span>Start Your First Debate Now</span>
                <span className="text-xs opacity-80">No card required • 2-min setup</span>
              </div>
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                trackCTAClick("hero", "secondary", "Watch 90-Second Demo")
                onWatchDemo()
              }}
              className="w-full font-semibold rounded-full px-6 py-6 text-base min-h-[56px]"
            >
              Watch 90-Second Demo
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </motion.div>

          {/* Trust Signals */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <TrustSignals />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

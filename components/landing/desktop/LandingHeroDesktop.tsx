"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Play, ArrowRight, Sparkles } from "lucide-react"
import { trackCTAClick } from "@/lib/analytics"

interface LandingHeroDesktopProps {
  onStartDemo: () => void
  onWatchDemo: () => void
}

export function LandingHeroDesktop({ onStartDemo, onWatchDemo }: LandingHeroDesktopProps) {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/20"
      data-section="hero"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-32">
        <motion.div
          className="text-center max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Collective AI Intelligence</span>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-7 text-balance leading-[1.1] tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            One AI Can Be Wrong. <br />
            <span className="text-primary">A Team of AIs Gets It Right.</span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto text-pretty leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            The world's best AI models working together. <br />
            Better decisions through collective intelligence.
          </motion.p>

          <motion.div
            className="flex flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              size="lg"
              onClick={() => {
                trackCTAClick("hero", "primary", "Try AnyDebate")
                onStartDemo()
              }}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-lg px-8 h-14 text-lg shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
            >
              <Play className="h-5 w-5 mr-2" />
              Try AnyDebate
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                trackCTAClick("hero", "secondary", "Watch Demo")
                onWatchDemo()
              }}
              className="font-medium rounded-lg px-8 h-14 text-lg border-border/50 hover:border-border"
            >
              Watch Demo
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

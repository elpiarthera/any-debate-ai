"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Play, ArrowRight, Sparkles } from "lucide-react"
import { trackCTAClick } from "@/lib/analytics"

interface LandingHeroMobileProps {
  onStartDemo: () => void
  onWatchDemo: () => void
}

export function LandingHeroMobile({ onStartDemo, onWatchDemo }: LandingHeroMobileProps) {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/20"
      data-section="hero"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-20">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Collective AI Intelligence</span>
          </motion.div>

          <motion.h1
            className="text-4xl font-bold mb-5 text-balance leading-[1.15] tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            One AI Can Be Wrong. <br />
            <span className="text-primary">A Team of AIs Gets It Right.</span>
          </motion.h1>

          <motion.p
            className="text-base text-muted-foreground mb-8 text-pretty leading-relaxed max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            The world's best AI models working together. Better decisions through collective intelligence.
          </motion.p>

          <motion.div
            className="flex flex-col gap-3"
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
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-lg px-6 h-14 text-base shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
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
              className="w-full font-medium rounded-lg px-6 h-14 text-base border-border/50 hover:border-border"
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

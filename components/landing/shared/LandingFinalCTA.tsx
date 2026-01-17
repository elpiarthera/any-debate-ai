"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { trackCTAClick } from "@/lib/analytics"

interface LandingFinalCTAProps {
  onStartDemo: () => void
}

export function LandingFinalCTA({ onStartDemo }: LandingFinalCTAProps) {
  return (
    <section className="py-24 sm:py-32 border-t border-border/20" data-section="final-cta">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-balance leading-tight">
            Ready to Experience{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Multi-Agent Debates?
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-10 text-pretty px-4 sm:px-0">
            Try the interactive demo and see how AI agents debate from multiple expert perspectives
          </p>

          <div className="flex justify-center px-4 sm:px-0">
            <Button
              size="lg"
              onClick={() => {
                trackCTAClick("final-cta", "primary", "Try the Demo Now")
                onStartDemo()
              }}
              className="
                bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-lg
                w-full sm:w-auto max-w-sm sm:max-w-none px-8 sm:px-12 py-6 text-base sm:text-lg
                min-h-[56px] group shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30
              "
            >
              <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Try the Demo Now
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            Interactive demo available now • Full AI integration coming soon
          </p>
        </motion.div>
      </div>
    </section>
  )
}

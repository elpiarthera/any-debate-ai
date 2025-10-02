"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { UrgencyBanner } from "../UrgencyBanner"
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
            Ready to Make Better Decisions?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 text-pretty px-4 sm:px-0">
            Join 12,000+ teams who've transformed their decision-making process
          </p>

          <div className="mb-8">
            <UrgencyBanner type="recent-signups" message="127 people signed up in the last 24 hours" />
          </div>

          <div className="flex justify-center px-4 sm:px-0">
            <Button
              size="lg"
              onClick={() => {
                trackCTAClick("final-cta", "primary", "Start Your First Debate")
                onStartDemo()
              }}
              className="
                bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-full
                w-full sm:w-auto max-w-sm sm:max-w-none px-8 sm:px-12 py-6 text-base sm:text-lg
                min-h-[56px] group
              "
            >
              <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              <div className="flex flex-col items-start">
                <span>Start Your First Debate</span>
                <span className="text-xs opacity-80">Free • No card required</span>
              </div>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            30-day money-back guarantee • Cancel anytime • No questions asked
          </p>
        </motion.div>
      </div>
    </section>
  )
}

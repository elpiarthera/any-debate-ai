"use client"

import { motion } from "framer-motion"
import { InteractiveDemo } from "../InteractiveDemo"

export function LandingDemo() {
  return (
    <section id="interactive-demo" className="py-12 sm:py-16 border-t border-border/20" data-section="demo">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-balance">See It In Action</h2>
          <p className="text-base sm:text-lg text-muted-foreground text-pretty">
            Watch how AnyDebate AI transforms complex decisions into clear insights
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <InteractiveDemo />
        </motion.div>
      </div>
    </section>
  )
}

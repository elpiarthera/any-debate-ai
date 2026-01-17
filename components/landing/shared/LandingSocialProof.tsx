"use client"

import { motion } from "framer-motion"
import { TestimonialCarousel } from "../TestimonialCarousel"
import { SocialProofBadge } from "../SocialProofBadge"

export function LandingSocialProof() {
  return (
    <section className="py-16 sm:py-20 border-t border-border/20 bg-muted/30" data-section="social-proof">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-balance">
            Join 12,000+ Teams Making Smarter Decisions
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground text-pretty">
            See how top teams are transforming their decision-making process
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <TestimonialCarousel />
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <SocialProofBadge type="users" text="12,459 active users" />
          <SocialProofBadge type="activity" text="2,847 debates today" />
          <SocialProofBadge type="trending" text="Trending in AI tools" />
        </motion.div>
      </div>
    </section>
  )
}

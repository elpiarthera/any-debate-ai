"use client"

import { motion } from "framer-motion"
import { X, CheckCircle } from "lucide-react"

const painPoints = [
  "Endless meetings that go nowhere",
  "Analysis paralysis from too many options",
  "Missing critical perspectives and blind spots",
  "Weeks wasted on strategic planning",
  "Decisions made on gut feeling, not data",
]

const solutions = [
  "4 AI experts debate your challenge in minutes",
  "Uncover blind spots you'd never see alone",
  "Get actionable recommendations, not just opinions",
  "Make confident decisions in 5 minutes",
  "Data-driven insights with clear reasoning",
]

export function LandingProblemSolutionMobile() {
  return (
    <section className="py-20 border-t border-border/20" data-section="problem-solution">
      <div className="max-w-7xl mx-auto px-4">
        {/* Mobile: Stacked vertically */}
        <div className="space-y-12">
          {/* Pain Points */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold">Struggling with Complex Decisions?</h3>
            <ul className="space-y-4">
              {painPoints.map((point, index) => (
                <motion.li
                  key={index}
                  className="flex gap-3 items-start min-h-[44px]"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <X className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Solutions */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold">Get Instant Expert Insights</h3>
            <ul className="space-y-4">
              {solutions.map((solution, index) => (
                <motion.li
                  key={index}
                  className="flex gap-3 items-start min-h-[44px]"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{solution}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

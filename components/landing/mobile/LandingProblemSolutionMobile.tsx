"use client"

import { motion } from "framer-motion"
import { X, CheckCircle } from "lucide-react"

const painPoints = [
  "Copy-pasting between ChatGPT, Claude, and Gemini for different perspectives",
  "Manually shuttling responses back and forth between AI models",
  "Losing context and conversation flow across multiple browser tabs",
  "Spending hours orchestrating multi-AI conversations yourself",
  "Missing insights because AIs don't respond to each other",
]

const solutions = [
  "AI agents debate each other automatically—no copy-paste needed",
  "Get multiple expert perspectives in one conversation",
  "Agents challenge each other's assumptions in real-time",
  "Save hours by automating the multi-AI perspective gathering",
  "See all viewpoints side-by-side with full context preserved",
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
            <h3 className="text-xl font-semibold">Tired of Copy-Pasting Between AI Models?</h3>
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
            <h3 className="text-xl font-semibold">Let AI Agents Debate Automatically</h3>
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

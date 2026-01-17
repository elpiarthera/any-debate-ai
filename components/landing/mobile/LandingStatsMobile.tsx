"use client"

import { motion } from "framer-motion"

const stats = [
  { value: "5 min", label: "vs 5 days", sublabel: "decision time" },
  { value: "4x", label: "more perspectives", sublabel: "than solo analysis" },
  { value: "87%", label: "faster", sublabel: "strategic planning" },
  { value: "12K+", label: "teams", sublabel: "making better decisions" },
]

export function LandingStatsMobile() {
  return (
    <section className="py-16 border-t border-border/20" data-section="stats">
      <div className="max-w-7xl mx-auto px-4">
        {/* Mobile: 2 columns */}
        <motion.div
          className="grid grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-foreground/90 mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.sublabel}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

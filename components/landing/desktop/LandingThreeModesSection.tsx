"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Columns3, MessageSquare, Users } from "lucide-react"

const modes = [
  {
    icon: Columns3,
    title: "Compare Mode",
    subtitle: "Get Multiple Perspectives Instantly",
    description: "Send one prompt. See how different AI models approach the same problem side-by-side.",
    example:
      "Ask about database architecture → See GPT-4's approach, Claude's perspective, Gemini's solution, all at once.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: MessageSquare,
    title: "Debate Mode",
    subtitle: "Let AI Models Critique Each Other",
    description: "@mention specific AI models to evaluate and critique each other's responses in threaded discussions.",
    example:
      "GPT-4 proposes a solution → @Claude to critique it → @Gemini to add perspective → Refine based on multiple critiques.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Users,
    title: "Auto-Debate Mode",
    subtitle: "Watch AI Teams Debate Autonomously",
    description: "Configure AI models with roles, personas, and frameworks. Watch them debate like a real team.",
    example:
      "CEO (strategic) vs CFO (financial) vs Designer (UX) vs Engineer (technical) → Comprehensive analysis in minutes.",
    color: "from-orange-500 to-red-500",
  },
]

export function LandingThreeModesSection() {
  return (
    <section className="py-24 border-t border-border/20" data-section="three-modes">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-5 text-balance leading-tight">
            Three Ways to Leverage Collective AI Intelligence
          </h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-3xl mx-auto">
            Choose the right mode for your needs—from quick comparisons to autonomous team debates.
          </p>
        </motion.div>

        {/* Modes Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {modes.map((mode, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-card/50 border-border/50 p-8 h-full overflow-hidden relative hover:border-primary/30 transition-colors">
                {/* Gradient accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${mode.color}`} />

                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${mode.color} flex items-center justify-center mb-6`}
                >
                  <mode.icon className="h-7 w-7 text-white" />
                </div>

                <h3 className="font-bold text-xl mb-2">{mode.title}</h3>
                <p className="text-sm text-primary font-medium mb-4">{mode.subtitle}</p>

                <p className="text-sm text-foreground mb-6 text-pretty leading-relaxed">{mode.description}</p>

                <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
                  <p className="text-xs text-muted-foreground font-medium mb-2">Example:</p>
                  <p className="text-sm text-foreground text-pretty leading-relaxed">{mode.example}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

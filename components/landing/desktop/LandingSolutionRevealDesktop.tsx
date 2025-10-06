"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Sparkles, Zap, Target } from "lucide-react"

export function LandingSolutionRevealDesktop() {
  return (
    <section className="py-24 bg-muted/30" data-section="solution-reveal">
      <div className="max-w-7xl mx-auto px-6">
        {/* Question */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <Card className="bg-card/50 border-primary/30 p-12 max-w-4xl mx-auto">
            <Sparkles className="h-16 w-16 mx-auto mb-6 text-primary" />
            <p className="text-2xl md:text-3xl font-bold text-balance leading-tight">
              What if the AIs debated{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                each other directly?
              </span>
            </p>
          </Card>
        </motion.div>

        {/* Solution Points */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-card/50 border-border/50 p-8 h-full hover:border-primary/50 transition-colors">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Zap className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-balance">Automated Multi-AI Debates</h3>
                <p className="text-base text-muted-foreground text-pretty">
                  No more copy-pasting. Agents debate each other automatically while you watch.
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-card/50 border-border/50 p-8 h-full hover:border-primary/50 transition-colors">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-balance">Richer Insights</h3>
                <p className="text-base text-muted-foreground text-pretty">
                  Agents challenge each other's assumptions and build on each other's ideas—producing better insights
                  than you manually shuttling responses.
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-card/50 border-border/50 p-8 h-full hover:border-primary/50 transition-colors">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Sparkles className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-balance">One Interface</h3>
                <p className="text-base text-muted-foreground text-pretty">
                  All perspectives in one place. Structured output. Artifacts generated automatically.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-2xl font-semibold text-balance">
            That's{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">AnyDebate</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

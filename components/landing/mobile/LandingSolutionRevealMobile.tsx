"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Sparkles, MessageSquare, Users, Zap } from "lucide-react"

export function LandingSolutionRevealMobile() {
  return (
    <section className="py-16 bg-muted/30" data-section="solution-reveal">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <Card className="bg-card/50 border-primary/30 p-8">
            <Sparkles className="h-12 w-12 mx-auto mb-4 text-primary" />
            <p className="text-xl font-bold text-balance leading-tight">
              What if AI models could work together{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                like a real team?
              </span>
            </p>
          </Card>
        </motion.div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-card/50 border-border/50 p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-balance">Compare Mode</h3>
                  <p className="text-sm text-muted-foreground text-pretty">
                    Send one prompt, see how multiple AI models approach the same problem side-by-side. No more tab
                    switching.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-card/50 border-border/50 p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-balance">Debate Mode</h3>
                  <p className="text-sm text-muted-foreground text-pretty">
                    @mention AI models to critique each other. No copy-pasting. They debate in real-time within one
                    threaded conversation.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-card/50 border-border/50 p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-balance">Auto-Debate Mode</h3>
                  <p className="text-sm text-muted-foreground text-pretty">
                    Configure AI models with roles (CEO, CFO, Designer) and watch them debate autonomously. Get
                    comprehensive analysis in minutes.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-lg font-semibold text-balance">
            This is{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              collective AI intelligence.
            </span>
          </p>
          <p className="text-lg font-semibold text-balance mt-1">
            This is{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              AnyDebate.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Users, MessageSquare, FileText, ArrowRight } from "lucide-react"

const steps = [
  {
    icon: Users,
    step: "1",
    title: "Select Your Agents",
    description: "Choose from pre-built teams or create custom agents with specific roles, personas, and frameworks",
  },
  {
    icon: MessageSquare,
    step: "2",
    title: "Start the Debate",
    description: "Watch up to 4 AI agents debate your question in real-time with different perspectives and insights",
  },
  {
    icon: FileText,
    step: "3",
    title: "Generate Artifacts",
    description: "Create documents, tables, charts, and checklists during the debate with full version history",
  },
]

export function LandingHowItWorksMobile() {
  return (
    <section className="py-20 border-t border-border/20 bg-muted/30" data-section="how-it-works">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-4 text-balance leading-tight">
            How It{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-base text-muted-foreground text-pretty px-4">
            From question to insight in three simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="bg-card/50 border-border/50 p-6 relative">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-primary mb-2">STEP {step.step}</div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground text-pretty">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute left-10 bottom-0 transform translate-y-6">
                    <ArrowRight className="h-5 w-5 text-primary rotate-90" />
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

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

export function LandingHowItWorksDesktop() {
  return (
    <section className="py-28 border-t border-border/20 bg-muted/30" data-section="how-it-works">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance leading-tight">
            How It{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            From question to insight in three simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <Card className="bg-card/50 border-border/50 p-8 h-full hover:border-primary/50 transition-all">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-xs font-semibold text-primary mb-3">STEP {step.step}</div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-base text-muted-foreground text-pretty">{step.description}</p>
                </div>
              </Card>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-6 w-6 text-primary" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Clock, MessageSquare, FileText, TrendingUp } from "lucide-react"

const benefits = [
  {
    icon: Brain,
    benefit: "Uncover Blind Spots You'd Never See Alone",
    description:
      "Multiple AI agents challenge each other's assumptions and reveal perspectives you'd miss with a single AI. Get comprehensive viewpoint coverage automatically.",
    outcome: "Make better decisions with complete perspective coverage",
  },
  {
    icon: Clock,
    benefit: "Save Hours of Manual Copy-Pasting",
    description:
      "Stop shuttling responses between ChatGPT, Claude, and Gemini. AI agents debate each other automatically while you focus on the insights.",
    outcome: "Automate multi-AI perspective gathering",
  },
  {
    icon: MessageSquare,
    benefit: "Richer Debates Than Manual Copy-Paste",
    description:
      "Agents respond directly to each other's arguments, building on ideas and challenging assumptions in real-time. Context never gets lost.",
    outcome: "Get deeper insights from AI-to-AI conversations",
  },
  {
    icon: FileText,
    benefit: "Generate Actionable Artifacts During Debates",
    description:
      "Create documents, comparison tables, and decision charts mid-debate. Export everything to PDF, Markdown, JSON, or CSV to share with your team.",
    outcome: "Turn debates into shareable deliverables instantly",
  },
]

export function LandingBenefitsMobile() {
  return (
    <section className="py-20 border-t border-border/20 bg-background" data-section="benefits">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-4 text-balance leading-tight">
            Stop Wasting Time,{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Start Deciding
            </span>
          </h2>
          <p className="text-base text-muted-foreground text-pretty px-4">
            Automate multi-AI perspective gathering and get better insights faster
          </p>
        </motion.div>

        {/* Benefits Grid - Mobile: 1 column */}
        <div className="grid grid-cols-1 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full bg-card/50 border-border/50 active:bg-card/80 active:border-primary/50 transition-all p-6 min-h-[80px]">
                <benefit.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-3">{benefit.benefit}</h3>
                <p className="text-sm text-muted-foreground text-pretty mb-4">{benefit.description}</p>
                <Badge variant="secondary" className="text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {benefit.outcome}
                </Badge>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

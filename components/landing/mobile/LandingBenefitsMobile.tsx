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
              <Card className="h-full bg-card/50 border-border/50 hover:bg-card/80 hover:border-primary transition-all p-6 overflow-hidden min-w-0">
                <div className="flex items-start gap-3 mb-3 min-w-0">
                  <benefit.icon className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <h3 className="text-lg font-semibold text-balance min-w-0 break-words overflow-hidden">
                    {benefit.benefit}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground text-pretty mb-4 break-words overflow-hidden">
                  {benefit.description}
                </p>
                <Badge
                  variant="secondary"
                  className="text-xs flex items-start gap-1.5 whitespace-normal max-w-full w-full"
                >
                  <TrendingUp className="h-3 w-3 flex-shrink-0 mt-0.5" />
                  <span className="break-words flex-1">{benefit.outcome}</span>
                </Badge>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

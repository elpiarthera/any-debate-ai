"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Brain, TrendingUp, MessageSquare, Zap, Shield } from "lucide-react"

const benefits = [
  {
    icon: Clock,
    benefit: "Save 10+ Hours Per Week",
    description: "Stop wasting time in endless meetings. Get expert insights in minutes, not days.",
    feature: "Powered by 4 AI agents working in parallel",
    metric: "87% faster decisions",
  },
  {
    icon: Brain,
    benefit: "Uncover Hidden Blind Spots",
    description:
      "Surface insights and perspectives you'd never consider alone. Challenge your assumptions systematically.",
    feature: "Multi-perspective analysis from specialized agents",
    metric: "3x more perspectives",
  },
  {
    icon: TrendingUp,
    benefit: "Make Confident Decisions",
    description: "Get clear, actionable recommendations backed by comprehensive analysis. No more analysis paralysis.",
    feature: "Structured debate with evidence-based insights",
    metric: "95% confidence boost",
  },
  {
    icon: MessageSquare,
    benefit: "Collaborate Seamlessly",
    description: "Share debates, artifacts, and insights with your team. Build on each other's thinking in real-time.",
    feature: "Shared workspace with live collaboration",
    metric: "60% better alignment",
  },
  {
    icon: Zap,
    benefit: "Automate Strategic Thinking",
    description: "Set up automated debate workflows that run on schedule. Wake up to fresh insights every morning.",
    feature: "Auto-debate mode with customizable agents",
    metric: "24/7 analysis",
  },
  {
    icon: Shield,
    benefit: "Enterprise-Grade Security",
    description: "Your data stays private and secure. SOC 2 compliant with end-to-end encryption.",
    feature: "Bank-level security and compliance",
    metric: "100% data privacy",
  },
]

export function LandingBenefitsDesktop() {
  return (
    <section className="py-28 border-t border-border/20 bg-muted/30" data-section="benefits">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance leading-tight">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Make Better Decisions
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Transform how your team approaches complex problems with our comprehensive AI collaboration platform
          </p>
        </motion.div>

        {/* Benefits Grid - Desktop: 3 columns */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full bg-card/50 border-border/50 hover:bg-card/80 hover:border-primary/50 transition-all p-8">
                <benefit.icon className="h-12 w-12 text-primary mb-6" />
                <h3 className="text-xl font-semibold mb-4">{benefit.benefit}</h3>
                <p className="text-base text-muted-foreground text-pretty mb-4">{benefit.description}</p>
                <p className="text-sm text-muted-foreground/80 mb-3">{benefit.feature}</p>
                <Badge variant="secondary" className="text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {benefit.metric}
                </Badge>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Users, FileText, MessageSquare, Download, LayoutDashboard, ArrowRight } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Debates",
    description: "Multiple AI models debate your challenge from different perspectives",
    benefits: [
      "Uncover blind spots automatically",
      "Get diverse viewpoints instantly",
      "Challenge assumptions systematically",
    ],
    cta: "Start a Debate",
    badge: "Most Popular",
  },
  {
    icon: Users,
    title: "Agent Builder",
    description: "Create custom AI agents with 50+ roles, 8 personas, and 16+ thinking frameworks",
    benefits: ["6,400+ agent combinations", "Pre-built agent teams", "Save custom configurations"],
    cta: "Build Agents",
  },
  {
    icon: FileText,
    title: "Smart Artifacts",
    description: "30+ templates for documents, tables, checklists, and charts with version history",
    benefits: ["Auto-generate reports", "Track version changes", "Export in multiple formats"],
    cta: "See Templates",
    badge: "New",
  },
  {
    icon: MessageSquare,
    title: "Advanced Chat",
    description: "Search messages, create threads, add reactions, and bookmark important insights",
    benefits: ["Full-text message search", "3-level nested replies", "18 emoji reactions"],
    cta: "Explore Chat",
  },
  {
    icon: Download,
    title: "Export Everything",
    description: "Download debates as PDF, Markdown, or JSON with custom formatting",
    benefits: ["Multi-format export", "Selective content export", "Batch export sessions"],
    cta: "Export Options",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard & Analytics",
    description: "Track metrics, organize projects, and manage debate sessions",
    benefits: ["Comprehensive metrics", "Project organization", "Activity tracking"],
    cta: "View Dashboard",
  },
]

export function LandingFeaturesMobile() {
  return (
    <section className="py-20 border-t border-border/20 bg-background" data-section="features">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-4 text-balance leading-tight">
            Powerful Features for{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Smarter Decisions
            </span>
          </h2>
          <p className="text-base text-muted-foreground text-pretty px-4">
            Everything you need to transform how your team approaches complex challenges
          </p>
        </motion.div>

        {/* Features Grid - Mobile: 1 column */}
        <div className="grid grid-cols-1 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full bg-card/50 border-border/50 active:bg-card/80 active:border-primary/50 transition-all p-6">
                <div className="flex items-start justify-between mb-4">
                  <feature.icon className="h-10 w-10 text-primary flex-shrink-0" />
                  {feature.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  )}
                </div>

                <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                <p className="text-sm text-muted-foreground text-pretty mb-4">{feature.description}</p>

                <ul className="space-y-2 mb-6">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <ArrowRight className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <Button variant="ghost" className="w-full justify-between min-h-[48px]">
                  {feature.cta}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { X, Clock, Copy, RefreshCw, Brain } from "lucide-react"
import Image from "next/image"

const painPoints = [
  {
    icon: Copy,
    text: "You ask one AI, get one perspective",
  },
  {
    icon: RefreshCw,
    text: "You copy-paste to another AI tool",
  },
  {
    icon: Copy,
    text: "You shuttle responses back and forth",
  },
  {
    icon: X,
    text: "You lose track of which AI said what",
  },
  {
    icon: X,
    text: "You manually synthesize conflicting advice",
  },
  {
    icon: Clock,
    text: "You waste 30+ minutes on logistics",
  },
]

const aiServices = [
  {
    name: "ChatGPT",
    url: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/chatgpt-icon.svg",
  },
  {
    name: "Claude",
    url: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/claude-ai-icon.svg",
  },
  {
    name: "Gemini",
    url: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-gemini-icon.svg",
  },
  {
    name: "Perplexity",
    url: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/perplexity-ai-icon.svg",
  },
  {
    name: "Grok",
    url: "/grok-ai-logo.png",
  },
  {
    name: "Meta AI",
    url: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/meta-icon.svg",
  },
  {
    name: "Mistral",
    url: "/mistral-ai-logo-inspired.png",
  },
  {
    name: "DeepSeek",
    url: "/deepseek-ai-logo.jpg",
  },
]

export function LandingProblemDeepDiveMobile() {
  return (
    <section className="py-16 border-t border-border/20" data-section="problem-deep-dive">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-4 text-balance leading-tight">Sound Familiar?</h2>
          <p className="text-base text-muted-foreground text-pretty px-2">You have a tough decision to make...</p>
        </motion.div>

        {/* Browser Tabs Visual */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <Card className="bg-card/50 border-border/50 p-4 relative overflow-hidden">
            {/* Mobile Browser Tab Bar */}
            <div className="relative mb-4">
              <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide">
                {aiServices.map((service, i) => (
                  <motion.div
                    key={i}
                    className="flex-shrink-0 px-3 py-2 bg-background rounded-t-lg border border-border/50 border-b-0 flex items-center gap-2 shadow-sm min-w-[100px]"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="relative w-4 h-4 flex-shrink-0">
                      <Image
                        src={service.url || "/placeholder.svg"}
                        alt={service.name}
                        width={16}
                        height={16}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-xs font-medium text-foreground truncate">{service.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Browser Content Area */}
            <div className="bg-background border border-border/50 rounded-lg p-6 text-center">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Brain className="h-16 w-16 mx-auto mb-3 text-destructive" />
              </motion.div>
              <p className="text-sm font-bold text-foreground mb-1">(Too) Many browser tabs open</p>
              <p className="text-xs text-muted-foreground">Mental overload trying to track everything</p>
            </div>
          </Card>
        </motion.div>

        {/* Pain Points */}
        <div className="space-y-3 mb-8">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                <point.icon className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground text-pretty">{point.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="bg-primary/5 border-primary/20 p-6">
            <p className="text-base font-medium mb-3 text-balance">The problem isn't the AIs...</p>
            <p className="text-lg font-bold text-balance leading-tight">
              The problem is{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                YOU being the middleman
              </span>
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

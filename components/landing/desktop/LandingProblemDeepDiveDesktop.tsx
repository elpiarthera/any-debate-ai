"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { X, Clock, Brain } from "lucide-react"
import Image from "next/image"

const painPoints = [
  {
    icon: X,
    text: "You ask ChatGPT, get one perspective",
  },
  {
    icon: X,
    text: "You copy-paste to Claude, get another view",
  },
  {
    icon: X,
    text: "You shuttle responses back and forth",
  },
  {
    icon: X,
    text: "You try to remember what each AI said",
  },
  {
    icon: X,
    text: "You manually synthesize conflicting advice",
  },
  {
    icon: Clock,
    text: "You still feel uncertain after 30 minutes",
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

export function LandingProblemDeepDiveDesktop() {
  return (
    <section className="py-24 border-t border-border/20" data-section="problem-deep-dive">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance leading-tight">
            Sound Familiar?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            You have a tough decision to make...
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Browser Tabs Visual */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Card className="bg-card/50 border-border/50 p-8 relative overflow-hidden">
              {/* Browser Tab Bar */}
              <div className="relative mb-6">
                <div className="flex gap-1 flex-wrap">
                  {aiServices.map((service, i) => (
                    <motion.div
                      key={i}
                      className="relative px-4 py-2.5 bg-background rounded-t-lg border border-border/50 border-b-0 flex items-center gap-2.5 shadow-sm"
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      style={{
                        transform: `rotate(${(i % 3) - 1}deg)`,
                        zIndex: aiServices.length - i,
                      }}
                    >
                      <div className="relative w-5 h-5 flex-shrink-0">
                        <Image
                          src={service.url || "/placeholder.svg"}
                          alt={service.name}
                          width={20}
                          height={20}
                          className="object-contain"
                        />
                      </div>
                      <span className="text-sm font-medium text-foreground">{service.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Browser Content Area with Brain */}
              <div className="bg-background border border-border/50 rounded-lg p-8 text-center">
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
                  <Brain className="h-24 w-24 mx-auto mb-4 text-destructive" />
                </motion.div>
                <p className="text-lg font-bold text-foreground mb-2">(Too) Many browser tabs open</p>
                <p className="text-sm text-muted-foreground">Mental overload trying to track everything</p>
              </div>
            </Card>
          </motion.div>

          {/* Pain Points */}
          <div className="space-y-4">
            {painPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4 p-5 rounded-lg bg-destructive/5 border border-destructive/20 hover:border-destructive/30 transition-colors">
                  <point.icon className="h-6 w-6 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-base text-foreground text-pretty">{point.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Insight */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="bg-primary/5 border-primary/20 p-10 max-w-3xl mx-auto">
            <p className="text-xl font-medium mb-4 text-balance">The problem isn't the AIs...</p>
            <p className="text-2xl md:text-3xl font-bold text-balance leading-tight">
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

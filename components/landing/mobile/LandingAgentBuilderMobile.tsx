"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Brain, Lightbulb, Calculator } from "lucide-react"

const agentComponents = [
  {
    icon: Users,
    title: "50 Professional Roles",
    examples: ["CEO", "CFO", "Scientist", "Designer", "Strategist", "Critic"],
    color: "text-blue-500",
  },
  {
    icon: Brain,
    title: "8 Behavioral Personas",
    examples: ["Analytical", "Visionary", "Diplomatic", "Pragmatic", "Skeptical", "Optimistic"],
    color: "text-purple-500",
  },
  {
    icon: Lightbulb,
    title: "16+ Thinking Frameworks",
    examples: ["Devil's Advocate", "Strategic Planning", "First Principles", "SWOT Analysis"],
    color: "text-amber-500",
  },
]

const prebuiltTeams = [
  { name: "Business Strategy", agents: ["CEO", "CFO", "CMO", "COO"], icon: "💼" },
  { name: "Product Development", agents: ["PM", "Designer", "Engineer", "User Researcher"], icon: "🚀" },
  { name: "Creative Studio", agents: ["Creative Director", "Copywriter", "Designer", "Strategist"], icon: "🎨" },
  { name: "Research Lab", agents: ["Scientist", "Analyst", "Ethicist", "Statistician"], icon: "🔬" },
]

export function LandingAgentBuilderMobile() {
  return (
    <section className="py-20 border-t border-border/20 bg-background" data-section="agent-builder">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge variant="secondary" className="mb-4">
            <Calculator className="h-3 w-3 mr-1" />
            6,400+ Combinations
          </Badge>
          <h2 className="text-2xl font-bold mb-4 text-balance leading-tight">
            Build Your Perfect{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              AI Agent Team
            </span>
          </h2>
          <p className="text-base text-muted-foreground text-pretty px-4">
            Mix and match roles, personas, and frameworks to create agents that think exactly how you need them to
          </p>
        </motion.div>

        {/* Agent Components */}
        <div className="grid grid-cols-1 gap-6 mb-12">
          {agentComponents.map((component, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-card/50 border-border/50 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <component.icon className={`h-8 w-8 ${component.color}`} />
                  <h3 className="text-lg font-semibold">{component.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {component.examples.map((example, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {example}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Pre-built Teams */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h3 className="text-xl font-semibold mb-6 text-center">Or Start with Pre-Built Teams</h3>
          <div className="grid grid-cols-1 gap-4">
            {prebuiltTeams.map((team, index) => (
              <Card key={index} className="bg-card/50 border-border/50 p-5 hover:border-primary/50 transition-all">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{team.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">{team.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      {team.agents.map((agent, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {agent}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

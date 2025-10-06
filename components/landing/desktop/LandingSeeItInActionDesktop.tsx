"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Clock, Frown, Zap, Smile, ArrowDown } from "lucide-react"

export function LandingSeeItInActionDesktop() {
  return (
    <section className="py-24 border-t border-border/20" data-section="see-it-in-action">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance leading-tight">
            From Manual Copy-Paste to{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Automated Debate
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-start">
          {/* The Old Way */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="text-center mb-6">
              <span className="inline-block px-6 py-2 bg-destructive/10 text-destructive text-base font-semibold rounded-full">
                The Old Way
              </span>
            </div>
            <Card className="bg-card/50 border-destructive/20 p-8">
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-mono text-muted-foreground mb-2">ChatGPT tab</p>
                  <p className="text-base">Copy response...</p>
                </div>
                <ArrowDown className="h-6 w-6 mx-auto text-muted-foreground" />
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-mono text-muted-foreground mb-2">Claude tab</p>
                  <p className="text-base">Paste, get response...</p>
                </div>
                <ArrowDown className="h-6 w-6 mx-auto text-muted-foreground" />
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-mono text-muted-foreground mb-2">Gemini tab</p>
                  <p className="text-base">Paste, get response...</p>
                </div>
                <ArrowDown className="h-6 w-6 mx-auto text-muted-foreground" />
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-mono text-muted-foreground mb-2">Back to ChatGPT</p>
                  <p className="text-base">Repeat...</p>
                </div>
              </div>
              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 text-base text-destructive">
                  <Clock className="h-5 w-5" />
                  <span>30 minutes of manual work</span>
                </div>
                <div className="flex items-center gap-3 text-base text-destructive">
                  <Frown className="h-5 w-5" />
                  <span>Fragmented insights across 10 tabs</span>
                </div>
                <div className="flex items-center gap-3 text-base text-destructive">
                  <Frown className="h-5 w-5" />
                  <span>You're the middleman in every exchange</span>
                </div>
              </div>
            </Card>
          </motion.div>

          <div className="hidden lg:flex items-center justify-center pt-32">
            <div className="w-20 h-20 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-primary">VS</span>
            </div>
          </div>

          {/* The AnyDebate Way */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="text-center mb-6">
              <span className="inline-block px-6 py-2 bg-primary/10 text-primary text-base font-semibold rounded-full">
                The AnyDebate Way
              </span>
            </div>
            <Card className="bg-card/50 border-primary/20 p-8">
              <div className="space-y-4 mb-8">
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-sm font-semibold text-primary mb-2">CEO Agent</p>
                  <p className="text-base">"We should expand to Europe"</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-sm font-semibold text-primary mb-2">CFO Agent</p>
                  <p className="text-base">"But our cash flow is tight"</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-sm font-semibold text-primary mb-2">CMO Agent</p>
                  <p className="text-base">"The market timing is perfect"</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-sm font-semibold text-primary mb-2">COO Agent</p>
                  <p className="text-base">"Our ops can't scale yet"</p>
                </div>
              </div>
              <div className="p-5 bg-muted rounded-lg mb-8">
                <p className="text-sm font-semibold text-primary mb-2">Artifact Generated</p>
                <p className="text-base font-medium">Decision Matrix: Europe Expansion</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-base text-primary">
                  <Zap className="h-5 w-5" />
                  <span className="font-medium">5 minutes, fully automated</span>
                </div>
                <div className="flex items-center gap-3 text-base text-primary">
                  <Smile className="h-5 w-5" />
                  <span className="font-medium">Structured output with artifacts</span>
                </div>
                <div className="flex items-center gap-3 text-base text-primary">
                  <Smile className="h-5 w-5" />
                  <span className="font-medium">Agents challenge each other directly</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

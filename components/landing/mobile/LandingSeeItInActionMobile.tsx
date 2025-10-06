"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Clock, Frown, Zap, Smile, ArrowDown } from "lucide-react"

export function LandingSeeItInActionMobile() {
  return (
    <section className="py-16 border-t border-border/20" data-section="see-it-in-action">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-4 text-balance leading-tight">
            From Manual Copy-Paste to{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Automated Debate
            </span>
          </h2>
        </motion.div>

        {/* The Old Way */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-4">
            <span className="inline-block px-4 py-1.5 bg-destructive/10 text-destructive text-sm font-semibold rounded-full">
              The Old Way
            </span>
          </div>
          <Card className="bg-card/50 border-destructive/20 p-6">
            <div className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs font-mono text-muted-foreground mb-2">ChatGPT tab</p>
                <p className="text-sm">Copy response...</p>
              </div>
              <ArrowDown className="h-5 w-5 mx-auto text-muted-foreground" />
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs font-mono text-muted-foreground mb-2">Claude tab</p>
                <p className="text-sm">Paste, get response...</p>
              </div>
              <ArrowDown className="h-5 w-5 mx-auto text-muted-foreground" />
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs font-mono text-muted-foreground mb-2">Gemini tab</p>
                <p className="text-sm">Paste, get response...</p>
              </div>
              <ArrowDown className="h-5 w-5 mx-auto text-muted-foreground" />
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs font-mono text-muted-foreground mb-2">Back to ChatGPT</p>
                <p className="text-sm">Repeat...</p>
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-destructive">
                <Clock className="h-4 w-4" />
                <span>30 minutes of manual work</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-destructive">
                <Frown className="h-4 w-4" />
                <span>Fragmented insights across 10 tabs</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-destructive">
                <Frown className="h-4 w-4" />
                <span>You're the middleman in every exchange</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* VS Divider */}
        <div className="text-center my-8">
          <span className="inline-block px-6 py-2 bg-primary/10 text-primary text-lg font-bold rounded-full">VS</span>
        </div>

        {/* The AnyDebate Way */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-4">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full">
              The AnyDebate Way
            </span>
          </div>
          <Card className="bg-card/50 border-primary/20 p-6">
            <div className="space-y-3 mb-6">
              <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-xs font-semibold text-primary mb-1">CEO Agent</p>
                <p className="text-sm">"We should expand to Europe"</p>
              </div>
              <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-xs font-semibold text-primary mb-1">CFO Agent</p>
                <p className="text-sm">"But our cash flow is tight"</p>
              </div>
              <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-xs font-semibold text-primary mb-1">CMO Agent</p>
                <p className="text-sm">"The market timing is perfect"</p>
              </div>
              <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-xs font-semibold text-primary mb-1">COO Agent</p>
                <p className="text-sm">"Our ops can't scale yet"</p>
              </div>
            </div>
            <div className="p-4 bg-muted rounded-lg mb-6">
              <p className="text-xs font-semibold text-primary mb-2">Artifact Generated</p>
              <p className="text-sm font-medium">Decision Matrix: Europe Expansion</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-primary">
                <Zap className="h-4 w-4" />
                <span className="font-medium">5 minutes, fully automated</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary">
                <Smile className="h-4 w-4" />
                <span className="font-medium">Structured output with artifacts</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary">
                <Smile className="h-4 w-4" />
                <span className="font-medium">Agents challenge each other directly</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

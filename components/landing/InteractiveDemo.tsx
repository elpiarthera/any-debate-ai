"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useDevice } from "@/contexts/DeviceProvider"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, CheckCircle, MessageSquare, Brain, Sparkles } from "lucide-react"
import { trackDemoInteraction } from "@/lib/analytics"

interface DemoStep {
  id: number
  title: string
  description: string
  visual: "input" | "debate" | "insights"
  duration: number
}

const demoSteps: DemoStep[] = [
  {
    id: 1,
    title: "Ask Your Question",
    description: "Type any complex decision or challenge you're facing",
    visual: "input",
    duration: 3000,
  },
  {
    id: 2,
    title: "AI Agents Debate",
    description: "Watch 4 experts analyze from different perspectives",
    visual: "debate",
    duration: 4000,
  },
  {
    id: 3,
    title: "Get Actionable Insights",
    description: "Receive clear recommendations in minutes",
    visual: "insights",
    duration: 3000,
  },
]

export function InteractiveDemo() {
  const { isMobile } = useDevice()
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    trackDemoInteraction("started", 0)
  }, [])

  useEffect(() => {
    if (!isPlaying) return

    const step = demoSteps[currentStep]
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          const nextStep = (currentStep + 1) % demoSteps.length
          setCurrentStep(nextStep)

          if (nextStep === 0) {
            trackDemoInteraction("completed")
          }

          return 0
        }
        return prev + 100 / (step.duration / 100)
      })
    }, 100)

    return () => clearInterval(interval)
  }, [currentStep, isPlaying])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    trackDemoInteraction(isPlaying ? "paused" : "started", currentStep)
  }

  const handleReset = () => {
    setCurrentStep(0)
    setProgress(0)
    setIsPlaying(true)
    trackDemoInteraction("reset", 0)
  }

  const step = demoSteps[currentStep]

  return (
    <Card
      className={`
        relative overflow-hidden bg-card/50 border-border/50
        ${isMobile ? "p-4" : "p-6 md:p-8"}
      `}
    >
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-2">
          {demoSteps.map((s, index) => (
            <button
              key={s.id}
              onClick={() => {
                setCurrentStep(index)
                setProgress(0)
              }}
              className={`
                h-2 rounded-full transition-all
                ${index === currentStep ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"}
              `}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={handlePlayPause} className="min-h-[44px] min-w-[44px]">
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button size="sm" variant="ghost" onClick={handleReset} className="min-h-[44px] min-w-[44px]">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Demo Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {/* Step Title */}
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="text-xs">
              Step {step.id}/3
            </Badge>
            <h3 className={`font-semibold ${isMobile ? "text-base" : "text-lg"}`}>{step.title}</h3>
          </div>

          {/* Step Description */}
          <p className={`text-muted-foreground ${isMobile ? "text-sm" : "text-base"}`}>{step.description}</p>

          {/* Visual Demo */}
          <div
            className={`
            rounded-lg bg-muted/30 border border-border/50
            ${isMobile ? "p-4 min-h-[200px]" : "p-6 min-h-[280px]"}
            flex items-center justify-center
          `}
          >
            {step.visual === "input" && <InputVisual isMobile={isMobile} />}
            {step.visual === "debate" && <DebateVisual isMobile={isMobile} />}
            {step.visual === "insights" && <InsightsVisual isMobile={isMobile} />}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Duration Indicator */}
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">Total demo time: 90 seconds</p>
      </div>
    </Card>
  )
}

function InputVisual({ isMobile }: { isMobile: boolean }) {
  return (
    <div className="w-full space-y-3">
      <div className="flex items-center gap-2">
        <MessageSquare className={`text-primary ${isMobile ? "h-5 w-5" : "h-6 w-6"}`} />
        <span className={`font-medium ${isMobile ? "text-sm" : "text-base"}`}>Your Question</span>
      </div>
      <div className="bg-background rounded-lg p-3 md:p-4 border border-border">
        <p className={`text-muted-foreground ${isMobile ? "text-xs" : "text-sm"}`}>
          "Should we expand to the European market or focus on growing our US presence?"
        </p>
      </div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        className="h-1 bg-primary/30 rounded-full"
      />
    </div>
  )
}

function DebateVisual({ isMobile }: { isMobile: boolean }) {
  const agents = [
    { name: "Market Analyst", color: "bg-blue-500" },
    { name: "Financial Expert", color: "bg-green-500" },
    { name: "Risk Manager", color: "bg-yellow-500" },
    { name: "Growth Strategist", color: "bg-purple-500" },
  ]

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center gap-2">
        <Brain className={`text-primary ${isMobile ? "h-5 w-5" : "h-6 w-6"}`} />
        <span className={`font-medium ${isMobile ? "text-sm" : "text-base"}`}>4 AI Agents Analyzing</span>
      </div>
      <div className="grid grid-cols-2 gap-2 md:gap-3">
        {agents.map((agent, index) => (
          <motion.div
            key={agent.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
            className="bg-background rounded-lg p-2 md:p-3 border border-border flex items-center gap-2"
          >
            <div className={`h-2 w-2 rounded-full ${agent.color} animate-pulse`} />
            <span className={`${isMobile ? "text-xs" : "text-sm"}`}>{agent.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function InsightsVisual({ isMobile }: { isMobile: boolean }) {
  const insights = [
    "European market shows 40% growth potential",
    "US market saturation at 65% in target segment",
    "Regulatory risks in EU: Medium-High",
    "Recommended: Phased EU expansion starting Q2",
  ]

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center gap-2">
        <Sparkles className={`text-primary ${isMobile ? "h-5 w-5" : "h-6 w-6"}`} />
        <span className={`font-medium ${isMobile ? "text-sm" : "text-base"}`}>Key Insights</span>
      </div>
      <div className="space-y-2">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.3 }}
            className="flex items-start gap-2 bg-background rounded-lg p-2 md:p-3 border border-border"
          >
            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
            <span className={`${isMobile ? "text-xs" : "text-sm"}`}>{insight}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

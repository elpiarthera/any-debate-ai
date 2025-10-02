"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { FileText, Table, CheckSquare, BarChart3, Users, Clock, Download } from "lucide-react"

interface ArtifactSection {
  id: string
  title: string
  content: string
  lastEditedBy: string
  lastEditedAt: number
  status: "draft" | "review" | "complete"
}

interface DocumentArtifact {
  type: "document"
  title: string
  sections: ArtifactSection[]
  activeAgents: string[]
  version: number
  wordCount: number
}

interface TableArtifact {
  type: "table"
  title: string
  headers: string[]
  rows: string[][]
  lastUpdatedBy: string
  lastUpdatedAt: number
}

interface ChecklistArtifact {
  type: "checklist"
  title: string
  items: Array<{
    id: string
    text: string
    completed: boolean
    assignedTo?: string
    priority: "low" | "medium" | "high"
  }>
  progress: {
    completed: number
    total: number
    percentage: number
  }
}

type Artifact = DocumentArtifact | TableArtifact | ChecklistArtifact

interface ArtifactCanvasProps {
  isDemo?: boolean
}

export function ArtifactCanvas({ isDemo = false }: ArtifactCanvasProps) {
  const [currentArtifact, setCurrentArtifact] = useState<Artifact | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)

  // Demo data
  const demoDocument: DocumentArtifact = {
    type: "document",
    title: "Market Analysis Report",
    sections: [
      {
        id: "intro",
        title: "Executive Summary",
        content:
          "The market shows strong growth potential with emerging opportunities in AI-driven solutions. Key findings indicate a 35% increase in demand for collaborative tools.",
        lastEditedBy: "GPT-4",
        lastEditedAt: Date.now() - 300000,
        status: "complete",
      },
      {
        id: "data",
        title: "Market Data & Trends",
        content:
          "Current market size: $2.4B with projected growth to $5.8B by 2026. Primary drivers include remote work adoption and AI integration needs.",
        lastEditedBy: "Claude-3.5",
        lastEditedAt: Date.now() - 120000,
        status: "review",
      },
      {
        id: "recommendations",
        title: "Strategic Recommendations",
        content:
          "1. Focus on enterprise clients\n2. Develop mobile-first solutions\n3. Integrate advanced AI capabilities\n4. Build strategic partnerships",
        lastEditedBy: "Gemini",
        lastEditedAt: Date.now() - 60000,
        status: "draft",
      },
    ],
    activeAgents: ["Llama-3"],
    version: 3,
    wordCount: 247,
  }

  const demoTable: TableArtifact = {
    type: "table",
    title: "Competitive Analysis",
    headers: ["Company", "Market Share", "Revenue", "Growth Rate", "Key Strengths"],
    rows: [
      ["Company A", "25%", "$50M", "15%", "Strong brand recognition"],
      ["Company B", "20%", "$40M", "12%", "Technical innovation"],
      ["Company C", "18%", "$35M", "8%", "Cost leadership"],
      ["Company D", "15%", "$30M", "22%", "Rapid expansion"],
      ["Others", "22%", "$45M", "10%", "Niche specialization"],
    ],
    lastUpdatedBy: "Claude-3.5",
    lastUpdatedAt: Date.now() - 60000,
  }

  const demoChecklist: ChecklistArtifact = {
    type: "checklist",
    title: "Product Launch Checklist",
    items: [
      { id: "1", text: "Market research completed", completed: true, assignedTo: "GPT-4", priority: "high" },
      {
        id: "2",
        text: "Product specifications finalized",
        completed: true,
        assignedTo: "Claude-3.5",
        priority: "high",
      },
      { id: "3", text: "UI/UX design approved", completed: false, assignedTo: "Gemini", priority: "medium" },
      { id: "4", text: "Beta testing initiated", completed: false, assignedTo: "Llama-3", priority: "medium" },
      { id: "5", text: "Marketing campaign prepared", completed: false, assignedTo: "GPT-4", priority: "low" },
      { id: "6", text: "Launch event planned", completed: false, assignedTo: "Claude-3.5", priority: "low" },
    ],
    progress: {
      completed: 2,
      total: 6,
      percentage: 33,
    },
  }

  useEffect(() => {
    if (isDemo) {
      // Simulate artifact generation in demo mode
      const artifacts = [demoDocument, demoTable, demoChecklist]
      let currentIndex = 0

      const cycleArtifacts = () => {
        setIsGenerating(true)
        setProgress(0)

        // Simulate generation progress
        const progressInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(progressInterval)
              setCurrentArtifact(artifacts[currentIndex])
              setIsGenerating(false)
              currentIndex = (currentIndex + 1) % artifacts.length
              return 100
            }
            return prev + 10
          })
        }, 200)
      }

      // Start with first artifact
      setTimeout(() => {
        setCurrentArtifact(demoDocument)
      }, 1000)

      // Cycle through artifacts every 15 seconds
      const cycleInterval = setInterval(cycleArtifacts, 15000)

      return () => {
        clearInterval(cycleInterval)
      }
    }
  }, [isDemo])

  const getArtifactIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-5 w-5" />
      case "table":
        return <Table className="h-5 w-5" />
      case "checklist":
        return <CheckSquare className="h-5 w-5" />
      default:
        return <BarChart3 className="h-5 w-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "review":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "draft":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-400"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400"
      case "low":
        return "bg-green-500/20 text-green-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  if (!currentArtifact && !isGenerating) {
    return (
      <div className="h-full flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Collaborative Artifact Canvas</h3>
            <p className="text-sm text-muted-foreground mb-4">
              AI agents will create and collaborate on documents, tables, and checklists here.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2 p-2 rounded bg-background/50">
              <FileText className="h-4 w-4 text-blue-400" />
              <span>Documents</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded bg-background/50">
              <Table className="h-4 w-4 text-green-400" />
              <span>Tables</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded bg-background/50">
              <CheckSquare className="h-4 w-4 text-purple-400" />
              <span>Checklists</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded bg-background/50">
              <BarChart3 className="h-4 w-4 text-orange-400" />
              <span>Charts</span>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  if (isGenerating) {
    return (
      <div className="h-full flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <div className="mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center"
            >
              <BarChart3 className="h-8 w-8 text-primary" />
            </motion.div>
            <h3 className="text-lg font-semibold mb-2">AI Agents Collaborating</h3>
            <p className="text-sm text-muted-foreground mb-4">Creating collaborative artifact...</p>
          </div>
          <Progress value={progress} className="mb-2" />
          <p className="text-xs text-muted-foreground">{progress}% complete</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentArtifact?.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          <Card className="h-full flex flex-col">
            {/* Artifact Header */}
            <div className="p-4 border-b border-border/50 bg-background/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">{getArtifactIcon(currentArtifact.type)}</div>
                  <div>
                    <h2 className="font-semibold">{currentArtifact.title}</h2>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>Version {currentArtifact.type === "document" ? currentArtifact.version : "1"}</span>
                      {currentArtifact.type === "document" && (
                        <>
                          <span>•</span>
                          <span>{currentArtifact.wordCount} words</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
              </div>

              {/* Active Agents */}
              {currentArtifact.type === "document" && currentArtifact.activeAgents.length > 0 && (
                <div className="flex items-center gap-2 text-xs">
                  <Users className="h-3 w-3 text-primary" />
                  <span className="text-muted-foreground">Active agents:</span>
                  {currentArtifact.activeAgents.map((agent) => (
                    <Badge key={agent} variant="outline" className="text-xs">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                        className="w-2 h-2 bg-green-400 rounded-full mr-1"
                      />
                      {agent}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Artifact Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {currentArtifact.type === "document" && (
                <div className="space-y-6">
                  {currentArtifact.sections.map((section, index) => (
                    <motion.div
                      key={section.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-l-2 border-primary/20 pl-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{section.title}</h3>
                        <div className="flex items-center gap-2">
                          <Badge className={`text-xs ${getStatusColor(section.status)}`}>{section.status}</Badge>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        <span>Last edited by {section.lastEditedBy}</span>
                        <span>•</span>
                        <span>{new Date(section.lastEditedAt).toLocaleTimeString()}</span>
                      </div>
                      <div className="text-sm leading-relaxed whitespace-pre-line">{section.content}</div>
                    </motion.div>
                  ))}
                </div>
              )}

              {currentArtifact.type === "table" && (
                <div className="space-y-4">
                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span>Last updated by {currentArtifact.lastUpdatedBy}</span>
                    <span>•</span>
                    <span>{new Date(currentArtifact.lastUpdatedAt).toLocaleTimeString()}</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border/50">
                          {currentArtifact.headers.map((header, index) => (
                            <th key={index} className="text-left p-2 font-medium">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {currentArtifact.rows.map((row, rowIndex) => (
                          <motion.tr
                            key={rowIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: rowIndex * 0.05 }}
                            className="border-b border-border/20 hover:bg-background/50"
                          >
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex} className="p-2">
                                {cell}
                              </td>
                            ))}
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {currentArtifact.type === "checklist" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {currentArtifact.progress.completed} of {currentArtifact.progress.total} completed
                    </div>
                    <div className="text-sm font-medium">{currentArtifact.progress.percentage}%</div>
                  </div>
                  <Progress value={currentArtifact.progress.percentage} className="mb-4" />
                  <div className="space-y-2">
                    {currentArtifact.items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`flex items-center gap-3 p-3 rounded-lg border ${
                          item.completed ? "bg-green-500/5 border-green-500/20" : "bg-background/50 border-border/50"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                            item.completed ? "bg-green-500 border-green-500" : "border-border"
                          }`}
                        >
                          {item.completed && <CheckSquare className="h-3 w-3 text-white" />}
                        </div>
                        <div className="flex-1">
                          <div className={`text-sm ${item.completed ? "line-through text-muted-foreground" : ""}`}>
                            {item.text}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            {item.assignedTo && (
                              <Badge variant="outline" className="text-xs">
                                {item.assignedTo}
                              </Badge>
                            )}
                            <Badge className={`text-xs ${getPriorityColor(item.priority)}`}>{item.priority}</Badge>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

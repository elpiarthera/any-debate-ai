"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Sparkles } from "lucide-react"
import { useArtifacts } from "@ai-sdk-tools/artifacts/client"
import { DocumentArtifact } from "./DocumentArtifact"
import { DataTableArtifact } from "./DataTableArtifact"
import { ChecklistArtifact } from "./ChecklistArtifact"
import { ChartArtifact } from "./ChartArtifact"

interface ArtifactRendererProps {
  artifactId: string | null
}

export function ArtifactRenderer({ artifactId }: ArtifactRendererProps) {
  const { artifacts, getArtifact } = useArtifacts()

  if (!artifactId) {
    return (
      <div className="h-full flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <Sparkles className="h-12 w-12 mx-auto text-primary/50" />
          </motion.div>
          <div>
            <h3 className="text-lg font-medium text-muted-foreground">No Artifact Selected</h3>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Create or select an artifact to start collaborating with AI agents
            </p>
          </div>
        </motion.div>
      </div>
    )
  }

  const artifact = getArtifact(artifactId)

  if (!artifact) {
    return (
      <div className="h-full flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <div>
            <h3 className="text-lg font-medium text-muted-foreground">Artifact Not Found</h3>
            <p className="text-sm text-muted-foreground/70 mt-1">The requested artifact could not be loaded</p>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={artifactId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="h-full"
        >
          {artifact.type === "document" && (
            <DocumentArtifact
              data={artifact.data}
              collaboratingAgents={[]} // Will be populated by real collaboration system
              onUpdate={(updates) => console.log("[v0] Document updated:", updates)}
            />
          )}

          {artifact.type === "data-table" && (
            <DataTableArtifact
              data={artifact.data}
              collaboratingAgents={[]}
              onUpdate={(updates) => console.log("[v0] Table updated:", updates)}
            />
          )}

          {artifact.type === "checklist" && (
            <ChecklistArtifact
              data={artifact.data}
              collaboratingAgents={[]}
              onUpdate={(updates) => console.log("[v0] Checklist updated:", updates)}
            />
          )}

          {artifact.type === "chart" && (
            <ChartArtifact
              data={artifact.data}
              collaboratingAgents={[]}
              onUpdate={(updates) => console.log("[v0] Chart updated:", updates)}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

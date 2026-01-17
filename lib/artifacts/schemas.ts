import { artifact } from "@ai-sdk-tools/artifacts"
import { z } from "zod"

// 1. Collaborative Document Artifact
export const DocumentArtifact = artifact(
  "document",
  z.object({
    title: z.string().default("Untitled Document"),
    content: z.string().default(""),
    sections: z
      .array(
        z.object({
          id: z.string(),
          title: z.string(),
          content: z.string(),
          lastEditedBy: z.string(), // Agent ID
          lastEditedAt: z.number(),
          status: z.enum(["draft", "review", "complete"]).default("draft"),
        }),
      )
      .default([]),
    activeAgents: z.array(z.string()).default([]),
    version: z.number().default(1),
    metadata: z
      .object({
        createdBy: z.string(),
        createdAt: z.number(),
        tags: z.array(z.string()).default([]),
        wordCount: z.number().default(0),
      })
      .optional(),
  }),
)

// 2. Data Table Artifact
export const TableArtifact = artifact(
  "table",
  z.object({
    title: z.string().default("Data Table"),
    headers: z.array(z.string()).default([]),
    rows: z.array(z.array(z.string())).default([]),
    metadata: z
      .object({
        totalRows: z.number().default(0),
        lastUpdatedBy: z.string(),
        lastUpdatedAt: z.number(),
      })
      .optional(),
    formatting: z
      .object({
        columnWidths: z.array(z.number()).default([]),
        cellStyles: z.record(z.string()).default({}),
      })
      .optional(),
  }),
)

// 3. Task Checklist Artifact
export const ChecklistArtifact = artifact(
  "checklist",
  z.object({
    title: z.string().default("Task Checklist"),
    items: z
      .array(
        z.object({
          id: z.string(),
          text: z.string(),
          completed: z.boolean().default(false),
          assignedTo: z.string().optional(), // Agent ID
          priority: z.enum(["low", "medium", "high"]).default("medium"),
          dueDate: z.number().optional(),
          completedAt: z.number().optional(),
          completedBy: z.string().optional(),
        }),
      )
      .default([]),
    progress: z.object({
      completed: z.number().default(0),
      total: z.number().default(0),
      percentage: z.number().default(0),
    }),
  }),
)

// 4. Chart/Visualization Artifact
export const ChartArtifact = artifact(
  "chart",
  z.object({
    title: z.string().default("Chart"),
    type: z.enum(["bar", "line", "pie", "scatter", "area"]).default("bar"),
    data: z
      .array(
        z.object({
          label: z.string(),
          value: z.number(),
          color: z.string().optional(),
        }),
      )
      .default([]),
    config: z
      .object({
        xAxis: z.string().optional(),
        yAxis: z.string().optional(),
        showLegend: z.boolean().default(true),
        showGrid: z.boolean().default(true),
      })
      .optional(),
  }),
)

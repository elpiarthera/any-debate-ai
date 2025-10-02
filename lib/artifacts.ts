import { artifact } from "@ai-sdk-tools/artifacts"
import { z } from "zod"

// Document Artifact Schema
export const documentSchema = z.object({
  title: z.string().describe("The title of the document"),
  content: z.string().describe("The main content of the document in markdown format"),
  sections: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        content: z.string(),
        order: z.number(),
      }),
    )
    .optional()
    .describe("Optional sections for structured documents"),
  metadata: z
    .object({
      author: z.string().optional(),
      createdAt: z.string().optional(),
      updatedAt: z.string().optional(),
      tags: z.array(z.string()).optional(),
    })
    .optional(),
})

// Data Table Artifact Schema
export const dataTableSchema = z.object({
  title: z.string().describe("The title of the data table"),
  columns: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        type: z.enum(["text", "number", "date", "boolean", "select"]),
        width: z.number().optional(),
      }),
    )
    .describe("Column definitions for the table"),
  rows: z.array(z.record(z.string(), z.any())).describe("Table data rows"),
  metadata: z
    .object({
      totalRows: z.number().optional(),
      sortBy: z.string().optional(),
      sortOrder: z.enum(["asc", "desc"]).optional(),
      filters: z.record(z.string(), z.any()).optional(),
    })
    .optional(),
})

// Checklist Artifact Schema
export const checklistSchema = z.object({
  title: z.string().describe("The title of the checklist"),
  description: z.string().optional().describe("Optional description of the checklist"),
  items: z
    .array(
      z.object({
        id: z.string(),
        text: z.string(),
        completed: z.boolean().default(false),
        priority: z.enum(["low", "medium", "high"]).optional(),
        dueDate: z.string().optional(),
        assignee: z.string().optional(),
        notes: z.string().optional(),
      }),
    )
    .describe("Checklist items"),
  metadata: z
    .object({
      completedCount: z.number().optional(),
      totalCount: z.number().optional(),
      progress: z.number().optional(),
      category: z.string().optional(),
    })
    .optional(),
})

// Chart/Visualization Artifact Schema
export const chartSchema = z.object({
  title: z.string().describe("The title of the chart"),
  type: z.enum(["bar", "line", "pie", "area", "scatter"]).describe("Chart type"),
  data: z.array(z.record(z.string(), z.any())).describe("Chart data points"),
  config: z
    .object({
      xAxis: z.string().optional(),
      yAxis: z.string().optional(),
      colors: z.array(z.string()).optional(),
      legend: z.boolean().optional(),
      grid: z.boolean().optional(),
    })
    .optional()
    .describe("Chart configuration options"),
  metadata: z
    .object({
      dataSource: z.string().optional(),
      lastUpdated: z.string().optional(),
      description: z.string().optional(),
    })
    .optional(),
})

export const documentArtifact = artifact("document", documentSchema)
export const dataTableArtifact = artifact("data-table", dataTableSchema)
export const checklistArtifact = artifact("checklist", checklistSchema)
export const chartArtifact = artifact("chart", chartSchema)

// Export types
export type DocumentData = z.infer<typeof documentSchema>
export type DataTableData = z.infer<typeof dataTableSchema>
export type ChecklistData = z.infer<typeof checklistSchema>
export type ChartData = z.infer<typeof chartSchema>

export const artifactRegistry = {
  document: documentArtifact,
  "data-table": dataTableArtifact,
  checklist: checklistArtifact,
  chart: chartArtifact,
} as const

export type ArtifactType = keyof typeof artifactRegistry

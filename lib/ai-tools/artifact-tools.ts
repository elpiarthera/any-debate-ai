import { tool } from "ai"
import { z } from "zod"
import { artifact } from "@ai-sdk-tools/artifacts"

const DocumentArtifact = artifact(
  "document",
  z.object({
    title: z.string(),
    content: z.string(),
    sections: z
      .array(
        z.object({
          id: z.string(),
          title: z.string(),
          content: z.string(),
          order: z.number(),
        }),
      )
      .optional(),
    metadata: z
      .object({
        author: z.string().optional(),
        createdAt: z.string().optional(),
        updatedAt: z.string().optional(),
        tags: z.array(z.string()).optional(),
      })
      .optional(),
  }),
)

const DataTableArtifact = artifact(
  "data-table",
  z.object({
    title: z.string(),
    columns: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        type: z.enum(["text", "number", "date", "boolean", "select"]),
      }),
    ),
    rows: z.array(z.record(z.string(), z.any())),
    metadata: z
      .object({
        author: z.string().optional(),
        createdAt: z.string().optional(),
        updatedAt: z.string().optional(),
        totalRows: z.number().optional(),
        sortBy: z.string().optional(),
        sortOrder: z.enum(["asc", "desc"]).optional(),
      })
      .optional(),
  }),
)

const ChecklistArtifact = artifact(
  "checklist",
  z.object({
    title: z.string(),
    description: z.string().optional(),
    items: z.array(
      z.object({
        id: z.string(),
        text: z.string(),
        completed: z.boolean(),
        priority: z.enum(["low", "medium", "high"]).optional(),
      }),
    ),
    metadata: z
      .object({
        author: z.string().optional(),
        createdAt: z.string().optional(),
        updatedAt: z.string().optional(),
        completedCount: z.number().optional(),
        totalCount: z.number().optional(),
        progress: z.number().optional(),
      })
      .optional(),
  }),
)

const ChartArtifact = artifact(
  "chart",
  z.object({
    title: z.string(),
    type: z.enum(["bar", "line", "pie", "area", "scatter"]),
    data: z.array(z.record(z.string(), z.any())),
    config: z
      .object({
        xAxis: z.string().optional(),
        yAxis: z.string().optional(),
        colors: z.array(z.string()).optional(),
        legend: z.boolean().optional(),
        grid: z.boolean().optional(),
      })
      .optional(),
    metadata: z
      .object({
        author: z.string().optional(),
        createdAt: z.string().optional(),
        updatedAt: z.string().optional(),
        dataSource: z.string().optional(),
        description: z.string().optional(),
      })
      .optional(),
  }),
)

export const createDocumentTool = tool({
  description: "Create a collaborative document artifact during the debate",
  parameters: z.object({
    title: z.string().describe("Title of the document"),
    content: z.string().describe("Main content in markdown format"),
    sections: z
      .array(
        z.object({
          title: z.string(),
          content: z.string(),
        }),
      )
      .optional()
      .describe("Optional document sections"),
    agentId: z.string().describe("ID of the agent creating this artifact"),
  }),
  execute: async ({ title, content, sections, agentId }) => {
    console.log(`[v0] ${agentId} creating document artifact: ${title}`)

    const artifact = DocumentArtifact.stream({
      title,
      content,
      sections:
        sections?.map((section, index) => ({
          id: `section-${index + 1}`,
          title: section.title,
          content: section.content,
          order: index + 1,
        })) || [],
      metadata: {
        author: agentId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: ["ai-generated", "collaborative"],
      },
    })

    await artifact.complete({
      title,
      content,
      sections:
        sections?.map((section, index) => ({
          id: `section-${index + 1}`,
          title: section.title,
          content: section.content,
          order: index + 1,
        })) || [],
      metadata: {
        author: agentId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: ["ai-generated", "collaborative"],
      },
    })

    return `Created collaborative document: "${title}"`
  },
})

export const createTableTool = tool({
  description: "Create a data table artifact for structured information",
  parameters: z.object({
    title: z.string().describe("Title of the data table"),
    columns: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
          type: z.enum(["text", "number", "date", "boolean", "select"]),
        }),
      )
      .describe("Table column definitions"),
    rows: z.array(z.record(z.string(), z.any())).describe("Table data rows"),
    agentId: z.string().describe("ID of the agent creating this artifact"),
  }),
  execute: async ({ title, columns, rows, agentId }) => {
    console.log(`[v0] ${agentId} creating data table artifact: ${title}`)

    const artifact = DataTableArtifact.stream({
      title,
      columns,
      rows,
      metadata: {
        author: agentId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        totalRows: rows.length,
        sortBy: columns[0]?.id,
        sortOrder: "asc" as const,
      },
    })

    await artifact.complete({
      title,
      columns,
      rows,
      metadata: {
        author: agentId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        totalRows: rows.length,
        sortBy: columns[0]?.id,
        sortOrder: "asc" as const,
      },
    })

    return `Created data table: "${title}" with ${rows.length} rows`
  },
})

export const createChecklistTool = tool({
  description: "Create a checklist artifact for task management",
  parameters: z.object({
    title: z.string().describe("Title of the checklist"),
    description: z.string().optional().describe("Optional description"),
    items: z
      .array(
        z.object({
          text: z.string(),
          priority: z.enum(["low", "medium", "high"]).optional(),
          completed: z.boolean().default(false),
        }),
      )
      .describe("Checklist items"),
    agentId: z.string().describe("ID of the agent creating this artifact"),
  }),
  execute: async ({ title, description, items, agentId }) => {
    console.log(`[v0] ${agentId} creating checklist artifact: ${title}`)

    const artifact = ChecklistArtifact.stream({
      title,
      description,
      items: items.map((item, index) => ({
        id: `item-${index + 1}`,
        text: item.text,
        completed: item.completed || false,
        priority: item.priority || "medium",
      })),
      metadata: {
        author: agentId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completedCount: items.filter((item) => item.completed).length,
        totalCount: items.length,
        progress: (items.filter((item) => item.completed).length / items.length) * 100,
      },
    })

    await artifact.complete({
      title,
      description,
      items: items.map((item, index) => ({
        id: `item-${index + 1}`,
        text: item.text,
        completed: item.completed || false,
        priority: item.priority || "medium",
      })),
      metadata: {
        author: agentId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completedCount: items.filter((item) => item.completed).length,
        totalCount: items.length,
        progress: (items.filter((item) => item.completed).length / items.length) * 100,
      },
    })

    return `Created checklist: "${title}" with ${items.length} items`
  },
})

export const createChartTool = tool({
  description: "Create a chart/visualization artifact",
  parameters: z.object({
    title: z.string().describe("Title of the chart"),
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
    agentId: z.string().describe("ID of the agent creating this artifact"),
  }),
  execute: async ({ title, type, data, config, agentId }) => {
    console.log(`[v0] ${agentId} creating chart artifact: ${title}`)

    const artifact = ChartArtifact.stream({
      title,
      type,
      data,
      config,
      metadata: {
        author: agentId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        dataSource: agentId,
        description: `${type} chart created by ${agentId}`,
      },
    })

    await artifact.complete({
      title,
      type,
      data,
      config,
      metadata: {
        author: agentId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        dataSource: agentId,
        description: `${type} chart created by ${agentId}`,
      },
    })

    return `Created ${type} chart: "${title}" with ${data.length} data points`
  },
})

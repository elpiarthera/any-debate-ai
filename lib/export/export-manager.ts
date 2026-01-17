import { PDFExporter } from "./pdf-exporter"
import { MarkdownExporter } from "./markdown-exporter"
import { JSONExporter } from "./json-exporter"
import type { ExportData, ExportOptions, ExportPreferences } from "./types"

export class ExportManager {
  private pdfExporter: PDFExporter
  private markdownExporter: MarkdownExporter
  private jsonExporter: JSONExporter

  constructor() {
    this.pdfExporter = new PDFExporter()
    this.markdownExporter = new MarkdownExporter()
    this.jsonExporter = new JSONExporter()
  }

  async exportSession(
    sessionData: any,
    messages: any[],
    options: ExportOptions,
  ): Promise<{ blob: Blob; filename: string }> {
    console.log("[v0] Starting export with options:", options)

    // Get artifacts if requested
    let artifacts: any[] = []
    if (options.includeArtifacts) {
      try {
        artifacts = await this.getSessionArtifacts(sessionData.id)
      } catch (error) {
        console.warn("[v0] Failed to fetch artifacts:", error)
      }
    }

    // Prepare export data
    const exportData: ExportData = {
      session: {
        id: sessionData.id || "current-session",
        title: sessionData.title || "AI Debate Session",
        timestamp: sessionData.timestamp || new Date(),
        participants: sessionData.participants || ["User", "AI"],
        messageCount: messages.length,
      },
      messages: messages.map((msg) => ({
        id: msg.id,
        content: msg.content,
        sender: msg.sender,
        timestamp: new Date(msg.timestamp),
        ...(options.includeReactions && msg.reactions && { reactions: msg.reactions }),
      })),
      ...(options.includeArtifacts && { artifacts }),
      metadata: {
        exportedAt: new Date(),
        exportedBy: "AnyDebate AI",
        version: "1.0.0",
        totalMessages: messages.length,
        totalArtifacts: artifacts.length,
      },
    }

    // Generate export based on format
    let blob: Blob
    let extension: string

    switch (options.format) {
      case "pdf":
        blob = await this.pdfExporter.exportToPDF(exportData, options)
        extension = "pdf"
        break

      case "markdown":
        const markdownContent = await this.markdownExporter.exportToMarkdown(exportData, options)
        blob = new Blob([markdownContent], { type: "text/markdown" })
        extension = "md"
        break

      case "json":
        const jsonContent = await this.jsonExporter.exportToJSON(exportData, options)
        blob = new Blob([jsonContent], { type: "application/json" })
        extension = "json"
        break

      default:
        throw new Error(`Unsupported export format: ${options.format}`)
    }

    // Generate filename
    const timestamp = new Date().toISOString().split("T")[0]
    const sessionTitle = exportData.session.title.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()
    const filename = `${sessionTitle}-${timestamp}.${extension}`

    return { blob, filename }
  }

  private async getSessionArtifacts(sessionId: string): Promise<any[]> {
    // For now, we'll return empty array since we don't have database persistence yet
    // In Phase 4 (Database & Persistence Layer), this would be replaced with:
    // const artifacts = await db.artifacts.findMany({ where: { sessionId } })
    try {
      console.log("[v0] Artifact fetching not yet implemented - returning empty array")
      return []
    } catch (error) {
      console.warn("[v0] Could not fetch artifacts:", error)
      return []
    }
  }

  // Local storage for export preferences
  savePreferences(preferences: ExportPreferences) {
    try {
      localStorage.setItem("anydebate-export-preferences", JSON.stringify(preferences))
      console.log("[v0] Export preferences saved")
    } catch (error) {
      console.warn("[v0] Failed to save export preferences:", error)
    }
  }

  loadPreferences(): ExportPreferences {
    try {
      const stored = localStorage.getItem("anydebate-export-preferences")
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (error) {
      console.warn("[v0] Failed to load export preferences:", error)
    }

    // Return default preferences
    return {
      defaultFormat: "pdf",
      includeMetadata: true,
      includeArtifacts: true,
      includeReactions: true,
      pdfOptions: {
        fontSize: 12,
        fontFamily: "helvetica",
        margins: { top: 20, right: 20, bottom: 20, left: 20 },
        includeHeader: true,
        includeFooter: true,
      },
      markdownOptions: {
        includeTableOfContents: true,
        codeBlockLanguage: "json",
        timestampFormat: "full",
      },
    }
  }
}

// Singleton instance
export const exportManager = new ExportManager()

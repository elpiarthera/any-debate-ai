import jsPDF from "jspdf"
import type { ExportData, ExportOptions } from "./types"

export class PDFExporter {
  private doc: jsPDF
  private pageHeight: number
  private pageWidth: number
  private margins: { top: number; right: number; bottom: number; left: number }
  private currentY: number
  private fontSize: number

  constructor() {
    this.doc = new jsPDF()
    this.pageHeight = this.doc.internal.pageSize.height
    this.pageWidth = this.doc.internal.pageSize.width
    this.margins = { top: 20, right: 20, bottom: 20, left: 20 }
    this.currentY = this.margins.top
    this.fontSize = 12
  }

  async exportToPDF(data: ExportData, options: ExportOptions): Promise<Blob> {
    console.log("[v0] Starting PDF export:", data.session.title)

    // Set up document
    this.doc.setFontSize(16)
    this.doc.setFont("helvetica", "bold")

    // Title
    this.addText(data.session.title, { bold: true, fontSize: 18 })
    this.addSpacing(10)

    // Session metadata
    this.doc.setFontSize(10)
    this.doc.setFont("helvetica", "normal")
    this.addText(`Session ID: ${data.session.id}`)
    this.addText(`Date: ${data.session.timestamp.toLocaleDateString()}`)
    this.addText(`Participants: ${data.session.participants.join(", ")}`)
    this.addText(`Messages: ${data.session.messageCount}`)
    this.addSpacing(15)

    // Messages section
    this.doc.setFontSize(14)
    this.doc.setFont("helvetica", "bold")
    this.addText("Conversation", { bold: true })
    this.addSpacing(10)

    // Export messages
    for (const message of data.messages) {
      await this.addMessage(message, options)
    }

    // Artifacts section
    if (options.includeArtifacts && data.artifacts && data.artifacts.length > 0) {
      this.addPageBreak()
      this.doc.setFontSize(14)
      this.doc.setFont("helvetica", "bold")
      this.addText("Artifacts", { bold: true })
      this.addSpacing(10)

      for (const artifact of data.artifacts) {
        await this.addArtifact(artifact)
      }
    }

    // Footer with metadata
    if (options.includeMetadata) {
      this.addPageBreak()
      this.addMetadata(data.metadata)
    }

    return new Blob([this.doc.output("blob")], { type: "application/pdf" })
  }

  private addMessage(message: any, options: ExportOptions) {
    // Check if we need a new page
    if (this.currentY > this.pageHeight - 60) {
      this.addPageBreak()
    }

    // Sender and timestamp
    this.doc.setFontSize(10)
    this.doc.setFont("helvetica", "bold")
    const senderText = `${message.sender.name} (${message.sender.type})`
    const timestampText = message.timestamp.toLocaleString()

    this.addText(`${senderText} - ${timestampText}`)
    this.addSpacing(3)

    // Message content
    this.doc.setFontSize(11)
    this.doc.setFont("helvetica", "normal")
    this.addWrappedText(message.content)

    // Reactions
    if (options.includeReactions && message.reactions) {
      this.doc.setFontSize(9)
      this.doc.setTextColor(128, 128, 128)
      this.addText(`👍 ${message.reactions.likes} 👎 ${message.reactions.dislikes}`)
      this.doc.setTextColor(0, 0, 0)
    }

    this.addSpacing(8)
  }

  private addArtifact(artifact: any) {
    // Check if we need a new page
    if (this.currentY > this.pageHeight - 100) {
      this.addPageBreak()
    }

    // Artifact header
    this.doc.setFontSize(12)
    this.doc.setFont("helvetica", "bold")
    this.addText(`${artifact.type.toUpperCase()}: ${artifact.title}`)
    this.addSpacing(5)

    // Artifact content based on type
    this.doc.setFontSize(10)
    this.doc.setFont("helvetica", "normal")

    switch (artifact.type) {
      case "document":
        this.addWrappedText(artifact.data.content || "No content")
        break
      case "checklist":
        artifact.data.items?.forEach((item: any, index: number) => {
          const status = item.completed ? "✓" : "☐"
          this.addText(`${status} ${item.text}`)
        })
        break
      case "data-table":
        this.addText(
          `Table with ${artifact.data.rows?.length || 0} rows and ${artifact.data.columns?.length || 0} columns`,
        )
        break
      case "chart":
        this.addText(`${artifact.data.type} chart with ${artifact.data.data?.length || 0} data points`)
        break
    }

    this.addSpacing(10)
  }

  private addMetadata(metadata: any) {
    this.doc.setFontSize(12)
    this.doc.setFont("helvetica", "bold")
    this.addText("Export Information")
    this.addSpacing(5)

    this.doc.setFontSize(10)
    this.doc.setFont("helvetica", "normal")
    this.addText(`Exported: ${metadata.exportedAt.toLocaleString()}`)
    this.addText(`Version: ${metadata.version}`)
    this.addText(`Total Messages: ${metadata.totalMessages}`)
    this.addText(`Total Artifacts: ${metadata.totalArtifacts}`)
  }

  private addText(text: string, options?: { bold?: boolean; fontSize?: number }) {
    if (options?.fontSize) {
      this.doc.setFontSize(options.fontSize)
    }
    if (options?.bold) {
      this.doc.setFont("helvetica", "bold")
    }

    this.doc.text(text, this.margins.left, this.currentY)
    this.currentY += this.fontSize * 0.5

    // Reset font
    this.doc.setFont("helvetica", "normal")
    if (options?.fontSize) {
      this.doc.setFontSize(this.fontSize)
    }
  }

  private addWrappedText(text: string) {
    const maxWidth = this.pageWidth - this.margins.left - this.margins.right
    const lines = this.doc.splitTextToSize(text, maxWidth)

    for (const line of lines) {
      if (this.currentY > this.pageHeight - this.margins.bottom) {
        this.addPageBreak()
      }
      this.doc.text(line, this.margins.left, this.currentY)
      this.currentY += this.fontSize * 0.5
    }
  }

  private addSpacing(points: number) {
    this.currentY += points
  }

  private addPageBreak() {
    this.doc.addPage()
    this.currentY = this.margins.top
  }
}

import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import type { DocumentData, DataTableData, ChecklistData } from "@/lib/artifacts"

export type ExportFormat = "pdf" | "png" | "csv" | "json"

export interface ExportOptions {
  format: ExportFormat
  quality?: number
  includeMetadata?: boolean
  filename?: string
}

export class ArtifactExporter {
  /**
   * Export artifact to PDF format
   * Supports all artifact types with professional formatting
   */
  static async exportToPDF(artifact: any, options?: { includeMetadata?: boolean }): Promise<Blob> {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 20
    let yPosition = margin

    // Add title
    pdf.setFontSize(20)
    pdf.setFont("helvetica", "bold")
    pdf.text(artifact.data.title || "Untitled", margin, yPosition)
    yPosition += 10

    // Add metadata if requested
    if (options?.includeMetadata && artifact.data.metadata) {
      pdf.setFontSize(10)
      pdf.setFont("helvetica", "normal")
      pdf.setTextColor(100, 100, 100)

      const metadata = artifact.data.metadata
      if (metadata.createdAt) {
        pdf.text(`Created: ${new Date(metadata.createdAt).toLocaleDateString()}`, margin, yPosition)
        yPosition += 5
      }
      if (metadata.author) {
        pdf.text(`Author: ${metadata.author}`, margin, yPosition)
        yPosition += 5
      }
      if (metadata.tags && metadata.tags.length > 0) {
        pdf.text(`Tags: ${metadata.tags.join(", ")}`, margin, yPosition)
        yPosition += 5
      }
      yPosition += 5
    }

    pdf.setTextColor(0, 0, 0)
    pdf.setFontSize(12)

    // Add content based on artifact type
    switch (artifact.type) {
      case "document":
        this.addDocumentToPDF(pdf, artifact.data as DocumentData, margin, yPosition, pageWidth, pageHeight)
        break
      case "data-table":
        this.addTableToPDF(pdf, artifact.data as DataTableData, margin, yPosition, pageWidth, pageHeight)
        break
      case "checklist":
        this.addChecklistToPDF(pdf, artifact.data as ChecklistData, margin, yPosition, pageWidth, pageHeight)
        break
      case "chart":
        // For charts, we'll need to capture the rendered chart as an image
        pdf.text("Chart export requires PNG format for best results", margin, yPosition)
        break
    }

    return pdf.output("blob")
  }

  private static addDocumentToPDF(
    pdf: jsPDF,
    data: DocumentData,
    margin: number,
    startY: number,
    pageWidth: number,
    pageHeight: number,
  ) {
    let yPosition = startY
    const maxWidth = pageWidth - 2 * margin

    // Add content
    const lines = pdf.splitTextToSize(data.content, maxWidth)
    lines.forEach((line: string) => {
      if (yPosition > pageHeight - margin) {
        pdf.addPage()
        yPosition = margin
      }
      pdf.text(line, margin, yPosition)
      yPosition += 7
    })

    // Add sections if available
    if (data.sections && data.sections.length > 0) {
      yPosition += 10
      data.sections.forEach((section) => {
        if (yPosition > pageHeight - margin) {
          pdf.addPage()
          yPosition = margin
        }

        pdf.setFont("helvetica", "bold")
        pdf.text(section.title, margin, yPosition)
        yPosition += 7

        pdf.setFont("helvetica", "normal")
        const sectionLines = pdf.splitTextToSize(section.content, maxWidth)
        sectionLines.forEach((line: string) => {
          if (yPosition > pageHeight - margin) {
            pdf.addPage()
            yPosition = margin
          }
          pdf.text(line, margin, yPosition)
          yPosition += 7
        })
        yPosition += 5
      })
    }
  }

  private static addTableToPDF(
    pdf: jsPDF,
    data: DataTableData,
    margin: number,
    startY: number,
    pageWidth: number,
    pageHeight: number,
  ) {
    // Use autoTable plugin for better table formatting
    // For now, simple text-based table
    let yPosition = startY

    // Add headers
    pdf.setFont("helvetica", "bold")
    const headerText = data.columns.map((col) => col.name).join(" | ")
    pdf.text(headerText, margin, yPosition)
    yPosition += 7

    // Add rows
    pdf.setFont("helvetica", "normal")
    data.rows.forEach((row) => {
      if (yPosition > pageHeight - margin) {
        pdf.addPage()
        yPosition = margin
      }
      const rowText = data.columns.map((col) => String(row[col.id] || "")).join(" | ")
      pdf.text(rowText, margin, yPosition)
      yPosition += 7
    })
  }

  private static addChecklistToPDF(
    pdf: jsPDF,
    data: ChecklistData,
    margin: number,
    startY: number,
    pageWidth: number,
    pageHeight: number,
  ) {
    let yPosition = startY

    // Add description if available
    if (data.description) {
      pdf.setFont("helvetica", "italic")
      const descLines = pdf.splitTextToSize(data.description, pageWidth - 2 * margin)
      descLines.forEach((line: string) => {
        pdf.text(line, margin, yPosition)
        yPosition += 7
      })
      yPosition += 5
    }

    // Add checklist items
    pdf.setFont("helvetica", "normal")
    data.items.forEach((item) => {
      if (yPosition > pageHeight - margin) {
        pdf.addPage()
        yPosition = margin
      }

      const checkbox = item.completed ? "[✓]" : "[ ]"
      const itemText = `${checkbox} ${item.text}`
      pdf.text(itemText, margin, yPosition)
      yPosition += 7

      // Add item details
      if (item.priority || item.dueDate || item.assignee) {
        pdf.setFontSize(10)
        pdf.setTextColor(100, 100, 100)
        const details = []
        if (item.priority) details.push(`Priority: ${item.priority}`)
        if (item.dueDate) details.push(`Due: ${new Date(item.dueDate).toLocaleDateString()}`)
        if (item.assignee) details.push(`Assigned: ${item.assignee}`)
        pdf.text(details.join(" | "), margin + 5, yPosition)
        yPosition += 5
        pdf.setFontSize(12)
        pdf.setTextColor(0, 0, 0)
      }
    })
  }

  /**
   * Export element to PNG format
   * Best for charts and visual artifacts
   */
  static async exportToPNG(elementId: string, options?: { quality?: number }): Promise<Blob> {
    const element = document.getElementById(elementId)
    if (!element) {
      throw new Error(`Element with id "${elementId}" not found`)
    }

    const canvas = await html2canvas(element, {
      scale: options?.quality || 2,
      backgroundColor: "#ffffff",
      logging: false,
      useCORS: true,
    })

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob)
          } else {
            reject(new Error("Failed to create PNG blob"))
          }
        },
        "image/png",
        options?.quality || 0.95,
      )
    })
  }

  /**
   * Export data table to CSV format
   * Standard CSV with proper escaping
   */
  static exportToCSV(tableData: DataTableData): string {
    const escapeCSV = (value: any): string => {
      const stringValue = String(value || "")
      if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
        return `"${stringValue.replace(/"/g, '""')}"`
      }
      return stringValue
    }

    // Add headers
    const headers = tableData.columns.map((col) => escapeCSV(col.name)).join(",")

    // Add rows
    const rows = tableData.rows
      .map((row) => tableData.columns.map((col) => escapeCSV(row[col.id])).join(","))
      .join("\n")

    return `${headers}\n${rows}`
  }

  /**
   * Export artifact to JSON format
   * Complete artifact data with metadata
   */
  static exportToJSON(artifact: any, options?: { includeMetadata?: boolean }): string {
    const exportData = {
      id: artifact.id,
      type: artifact.type,
      data: artifact.data,
      ...(options?.includeMetadata && {
        metadata: {
          exportedAt: new Date().toISOString(),
          exportedBy: "AnyDebate AI",
          version: "1.0",
        },
      }),
    }

    return JSON.stringify(exportData, null, 2)
  }

  /**
   * Download blob as file
   */
  static downloadBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  /**
   * Download text as file
   */
  static downloadText(text: string, filename: string, mimeType = "text/plain") {
    const blob = new Blob([text], { type: mimeType })
    this.downloadBlob(blob, filename)
  }

  /**
   * Get suggested filename for artifact
   */
  static getSuggestedFilename(artifact: any, format: ExportFormat): string {
    const title = artifact.data?.title || "artifact"
    const sanitized = title.replace(/[^a-z0-9]/gi, "_").toLowerCase()
    const timestamp = new Date().toISOString().split("T")[0]
    return `${sanitized}_${timestamp}.${format}`
  }
}

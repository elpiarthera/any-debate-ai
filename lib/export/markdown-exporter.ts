import type { ExportData, ExportOptions } from "./types"

export class MarkdownExporter {
  async exportToMarkdown(data: ExportData, options: ExportOptions): Promise<string> {
    console.log("[v0] Starting Markdown export:", data.session.title)

    let markdown = ""

    // Title and metadata
    markdown += `# ${data.session.title}\n\n`

    if (options.includeMetadata) {
      markdown += `## Session Information\n\n`
      markdown += `- **Session ID**: ${data.session.id}\n`
      markdown += `- **Date**: ${data.session.timestamp.toLocaleDateString()}\n`
      markdown += `- **Participants**: ${data.session.participants.join(", ")}\n`
      markdown += `- **Total Messages**: ${data.session.messageCount}\n\n`
    }

    // Table of contents
    markdown += `## Table of Contents\n\n`
    markdown += `1. [Conversation](#conversation)\n`
    if (options.includeArtifacts && data.artifacts && data.artifacts.length > 0) {
      markdown += `2. [Artifacts](#artifacts)\n`
    }
    if (options.includeMetadata) {
      markdown += `3. [Export Information](#export-information)\n`
    }
    markdown += `\n`

    // Conversation section
    markdown += `## Conversation\n\n`

    for (const message of data.messages) {
      markdown += this.formatMessage(message, options)
    }

    // Artifacts section
    if (options.includeArtifacts && data.artifacts && data.artifacts.length > 0) {
      markdown += `\n## Artifacts\n\n`

      for (const artifact of data.artifacts) {
        markdown += this.formatArtifact(artifact)
      }
    }

    // Export metadata
    if (options.includeMetadata) {
      markdown += `\n## Export Information\n\n`
      markdown += `- **Exported**: ${data.metadata.exportedAt.toLocaleString()}\n`
      markdown += `- **Version**: ${data.metadata.version}\n`
      markdown += `- **Total Messages**: ${data.metadata.totalMessages}\n`
      markdown += `- **Total Artifacts**: ${data.metadata.totalArtifacts}\n`
    }

    return markdown
  }

  private formatMessage(message: any, options: ExportOptions): string {
    let messageMarkdown = ""

    // Message header
    const senderIcon = message.sender.type === "user" ? "👤" : "🤖"
    messageMarkdown += `### ${senderIcon} ${message.sender.name}\n`
    messageMarkdown += `*${message.timestamp.toLocaleString()}*\n\n`

    // Message content
    messageMarkdown += `${message.content}\n\n`

    // Reactions
    if (options.includeReactions && message.reactions) {
      messageMarkdown += `**Reactions**: 👍 ${message.reactions.likes} 👎 ${message.reactions.dislikes}\n\n`
    }

    messageMarkdown += `---\n\n`

    return messageMarkdown
  }

  private formatArtifact(artifact: any): string {
    let artifactMarkdown = ""

    // Artifact header
    const typeIcon = this.getArtifactIcon(artifact.type)
    artifactMarkdown += `### ${typeIcon} ${artifact.title}\n`
    artifactMarkdown += `**Type**: ${artifact.type}\n`
    artifactMarkdown += `**Created**: ${artifact.createdAt.toLocaleString()}\n\n`

    // Artifact content
    switch (artifact.type) {
      case "document":
        artifactMarkdown += `${artifact.data.content || "No content"}\n\n`
        if (artifact.data.sections && artifact.data.sections.length > 0) {
          artifactMarkdown += `#### Sections\n\n`
          artifact.data.sections.forEach((section: any) => {
            artifactMarkdown += `##### ${section.title}\n${section.content}\n\n`
          })
        }
        break

      case "checklist":
        artifactMarkdown += `#### Items\n\n`
        artifact.data.items?.forEach((item: any) => {
          const status = item.completed ? "- [x]" : "- [ ]"
          artifactMarkdown += `${status} ${item.text}\n`
        })
        artifactMarkdown += `\n`
        break

      case "data-table":
        if (artifact.data.columns && artifact.data.rows) {
          // Create markdown table
          const headers = artifact.data.columns.map((col: any) => col.name).join(" | ")
          const separator = artifact.data.columns.map(() => "---").join(" | ")
          artifactMarkdown += `| ${headers} |\n`
          artifactMarkdown += `| ${separator} |\n`

          artifact.data.rows.forEach((row: any) => {
            const rowData = artifact.data.columns.map((col: any) => row[col.id] || "").join(" | ")
            artifactMarkdown += `| ${rowData} |\n`
          })
          artifactMarkdown += `\n`
        }
        break

      case "chart":
        artifactMarkdown += `**Chart Type**: ${artifact.data.type}\n`
        artifactMarkdown += `**Data Points**: ${artifact.data.data?.length || 0}\n\n`
        if (artifact.data.data && artifact.data.data.length > 0) {
          artifactMarkdown += `#### Data\n\n`
          artifactMarkdown += "```json\n"
          artifactMarkdown += JSON.stringify(artifact.data.data, null, 2)
          artifactMarkdown += "\n```\n\n"
        }
        break
    }

    return artifactMarkdown
  }

  private getArtifactIcon(type: string): string {
    switch (type) {
      case "document":
        return "📄"
      case "data-table":
        return "📊"
      case "checklist":
        return "✅"
      case "chart":
        return "📈"
      default:
        return "📎"
    }
  }
}

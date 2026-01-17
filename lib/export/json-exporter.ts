import type { ExportData, ExportOptions } from "./types"

export class JSONExporter {
  async exportToJSON(data: ExportData, options: ExportOptions): Promise<string> {
    console.log("[v0] Starting JSON export:", data.session.title)

    // Create a clean export object
    const exportObject: any = {
      format: "AnyDebate AI Export",
      version: "1.0.0",
      exportedAt: data.metadata.exportedAt.toISOString(),
      session: {
        id: data.session.id,
        title: data.session.title,
        timestamp: data.session.timestamp.toISOString(),
        participants: data.session.participants,
        messageCount: data.session.messageCount,
      },
      messages: data.messages.map((message) => ({
        id: message.id,
        content: message.content,
        sender: {
          id: message.sender.id,
          name: message.sender.name,
          type: message.sender.type,
          avatar: message.sender.avatar,
        },
        timestamp: message.timestamp.toISOString(),
        ...(options.includeReactions &&
          message.reactions && {
            reactions: message.reactions,
          }),
      })),
    }

    // Include artifacts if requested
    if (options.includeArtifacts && data.artifacts && data.artifacts.length > 0) {
      exportObject.artifacts = data.artifacts.map((artifact) => ({
        id: artifact.id,
        type: artifact.type,
        title: artifact.title,
        data: artifact.data,
        metadata: artifact.metadata,
        createdAt: artifact.createdAt.toISOString(),
      }))
    }

    // Include metadata if requested
    if (options.includeMetadata) {
      exportObject.metadata = {
        exportedBy: data.metadata.exportedBy,
        version: data.metadata.version,
        totalMessages: data.metadata.totalMessages,
        totalArtifacts: data.metadata.totalArtifacts,
      }
    }

    return JSON.stringify(exportObject, null, 2)
  }
}

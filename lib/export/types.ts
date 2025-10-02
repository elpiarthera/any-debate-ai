export interface ExportOptions {
  format: "pdf" | "markdown" | "json"
  includeMetadata?: boolean
  includeArtifacts?: boolean
  includeReactions?: boolean
  dateRange?: {
    start: Date
    end: Date
  }
}

export interface ExportData {
  session: {
    id: string
    title: string
    timestamp: Date
    participants: string[]
    messageCount: number
  }
  messages: Array<{
    id: string
    content: string
    sender: {
      id: string
      name: string
      type: "user" | "ai"
      avatar?: string
    }
    timestamp: Date
    reactions?: {
      likes: number
      dislikes: number
    }
  }>
  artifacts?: Array<{
    id: string
    type: "document" | "data-table" | "checklist" | "chart"
    title: string
    data: any
    metadata?: any
    createdAt: Date
  }>
  metadata: {
    exportedAt: Date
    exportedBy: string
    version: string
    totalMessages: number
    totalArtifacts: number
  }
}

export interface ExportPreferences {
  defaultFormat: "pdf" | "markdown" | "json"
  includeMetadata: boolean
  includeArtifacts: boolean
  includeReactions: boolean
  pdfOptions: {
    fontSize: number
    fontFamily: string
    margins: {
      top: number
      right: number
      bottom: number
      left: number
    }
    includeHeader: boolean
    includeFooter: boolean
  }
  markdownOptions: {
    includeTableOfContents: boolean
    codeBlockLanguage: string
    timestampFormat: string
  }
}

import type { DocumentData, DataTableData, ChecklistData, ChartData } from "@/lib/artifacts"

export interface ArtifactFolder {
  id: string
  name: string
  description?: string
  color?: string
  icon?: string
  parentId?: string
  createdAt: number
  updatedAt: number
}

export interface ArtifactTag {
  id: string
  name: string
  color: string
  count: number
}

export interface OrganizedArtifact {
  id: string
  type: "document" | "data-table" | "checklist" | "chart"
  title: string
  data: DocumentData | DataTableData | ChecklistData | ChartData
  folderId?: string
  tags: string[]
  isFavorite: boolean
  isPinned: boolean
  createdAt: number
  updatedAt: number
  lastAccessedAt: number
  metadata: {
    author: string
    collaborators?: string[]
    size?: number
    wordCount?: number
    rowCount?: number
    itemCount?: number
  }
}

export interface SearchFilters {
  query?: string
  type?: OrganizedArtifact["type"]
  folderId?: string
  tags?: string[]
  isFavorite?: boolean
  isPinned?: boolean
  dateRange?: {
    start: number
    end: number
  }
  author?: string
  sortBy?: "title" | "createdAt" | "updatedAt" | "lastAccessedAt"
  sortOrder?: "asc" | "desc"
}

export class ArtifactOrganizer {
  private artifacts: Map<string, OrganizedArtifact> = new Map()
  private folders: Map<string, ArtifactFolder> = new Map()
  private tags: Map<string, ArtifactTag> = new Map()

  // Artifact Management
  addArtifact(artifact: OrganizedArtifact): void {
    this.artifacts.set(artifact.id, artifact)
    this.updateTagCounts()
  }

  getArtifact(id: string): OrganizedArtifact | undefined {
    const artifact = this.artifacts.get(id)
    if (artifact) {
      artifact.lastAccessedAt = Date.now()
      this.artifacts.set(id, artifact)
    }
    return artifact
  }

  updateArtifact(id: string, updates: Partial<OrganizedArtifact>): void {
    const artifact = this.artifacts.get(id)
    if (artifact) {
      this.artifacts.set(id, {
        ...artifact,
        ...updates,
        updatedAt: Date.now(),
      })
      this.updateTagCounts()
    }
  }

  deleteArtifact(id: string): void {
    this.artifacts.delete(id)
    this.updateTagCounts()
  }

  getAllArtifacts(): OrganizedArtifact[] {
    return Array.from(this.artifacts.values())
  }

  // Folder Management
  createFolder(folder: Omit<ArtifactFolder, "id" | "createdAt" | "updatedAt">): ArtifactFolder {
    const newFolder: ArtifactFolder = {
      ...folder,
      id: `folder-${Date.now()}`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    this.folders.set(newFolder.id, newFolder)
    return newFolder
  }

  getFolder(id: string): ArtifactFolder | undefined {
    return this.folders.get(id)
  }

  updateFolder(id: string, updates: Partial<ArtifactFolder>): void {
    const folder = this.folders.get(id)
    if (folder) {
      this.folders.set(id, {
        ...folder,
        ...updates,
        updatedAt: Date.now(),
      })
    }
  }

  deleteFolder(id: string, moveToParent = true): void {
    const folder = this.folders.get(id)
    if (!folder) return

    // Handle artifacts in this folder
    this.artifacts.forEach((artifact) => {
      if (artifact.folderId === id) {
        if (moveToParent) {
          artifact.folderId = folder.parentId
        } else {
          artifact.folderId = undefined
        }
        this.artifacts.set(artifact.id, artifact)
      }
    })

    // Handle subfolders
    this.folders.forEach((subfolder) => {
      if (subfolder.parentId === id) {
        if (moveToParent) {
          subfolder.parentId = folder.parentId
        } else {
          subfolder.parentId = undefined
        }
        this.folders.set(subfolder.id, subfolder)
      }
    })

    this.folders.delete(id)
  }

  getAllFolders(): ArtifactFolder[] {
    return Array.from(this.folders.values())
  }

  getFolderTree(): ArtifactFolder[] {
    const rootFolders = Array.from(this.folders.values()).filter((f) => !f.parentId)
    return rootFolders
  }

  // Tag Management
  addTag(name: string, color: string): ArtifactTag {
    const id = name.toLowerCase().replace(/\s+/g, "-")
    const tag: ArtifactTag = {
      id,
      name,
      color,
      count: 0,
    }
    this.tags.set(id, tag)
    this.updateTagCounts()
    return tag
  }

  getTag(id: string): ArtifactTag | undefined {
    return this.tags.get(id)
  }

  getAllTags(): ArtifactTag[] {
    return Array.from(this.tags.values())
  }

  deleteTag(id: string): void {
    this.tags.delete(id)
    // Remove tag from all artifacts
    this.artifacts.forEach((artifact) => {
      artifact.tags = artifact.tags.filter((tagId) => tagId !== id)
      this.artifacts.set(artifact.id, artifact)
    })
  }

  private updateTagCounts(): void {
    // Reset all counts
    this.tags.forEach((tag) => {
      tag.count = 0
    })

    // Count tag usage
    this.artifacts.forEach((artifact) => {
      artifact.tags.forEach((tagId) => {
        const tag = this.tags.get(tagId)
        if (tag) {
          tag.count++
          this.tags.set(tagId, tag)
        }
      })
    })
  }

  // Search and Filter
  searchArtifacts(filters: SearchFilters): OrganizedArtifact[] {
    let results = Array.from(this.artifacts.values())

    // Text search
    if (filters.query) {
      const query = filters.query.toLowerCase()
      results = results.filter(
        (artifact) =>
          artifact.title.toLowerCase().includes(query) ||
          artifact.metadata.author.toLowerCase().includes(query) ||
          artifact.tags.some((tagId) => {
            const tag = this.tags.get(tagId)
            return tag?.name.toLowerCase().includes(query)
          }),
      )
    }

    // Type filter
    if (filters.type) {
      results = results.filter((artifact) => artifact.type === filters.type)
    }

    // Folder filter
    if (filters.folderId !== undefined) {
      results = results.filter((artifact) => artifact.folderId === filters.folderId)
    }

    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      results = results.filter((artifact) => filters.tags!.every((tagId) => artifact.tags.includes(tagId)))
    }

    // Favorite filter
    if (filters.isFavorite !== undefined) {
      results = results.filter((artifact) => artifact.isFavorite === filters.isFavorite)
    }

    // Pinned filter
    if (filters.isPinned !== undefined) {
      results = results.filter((artifact) => artifact.isPinned === filters.isPinned)
    }

    // Date range filter
    if (filters.dateRange) {
      results = results.filter(
        (artifact) => artifact.createdAt >= filters.dateRange!.start && artifact.createdAt <= filters.dateRange!.end,
      )
    }

    // Author filter
    if (filters.author) {
      results = results.filter((artifact) => artifact.metadata.author === filters.author)
    }

    // Sort
    const sortBy = filters.sortBy || "updatedAt"
    const sortOrder = filters.sortOrder || "desc"

    results.sort((a, b) => {
      let aValue: any
      let bValue: any

      switch (sortBy) {
        case "title":
          aValue = a.title.toLowerCase()
          bValue = b.title.toLowerCase()
          break
        case "createdAt":
          aValue = a.createdAt
          bValue = b.createdAt
          break
        case "updatedAt":
          aValue = a.updatedAt
          bValue = b.updatedAt
          break
        case "lastAccessedAt":
          aValue = a.lastAccessedAt
          bValue = b.lastAccessedAt
          break
        default:
          aValue = a.updatedAt
          bValue = b.updatedAt
      }

      if (typeof aValue === "string") {
        return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      } else {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue
      }
    })

    return results
  }

  // Bulk Operations
  moveArtifactsToFolder(artifactIds: string[], folderId?: string): void {
    artifactIds.forEach((id) => {
      const artifact = this.artifacts.get(id)
      if (artifact) {
        artifact.folderId = folderId
        artifact.updatedAt = Date.now()
        this.artifacts.set(id, artifact)
      }
    })
  }

  addTagsToArtifacts(artifactIds: string[], tagIds: string[]): void {
    artifactIds.forEach((id) => {
      const artifact = this.artifacts.get(id)
      if (artifact) {
        artifact.tags = Array.from(new Set([...artifact.tags, ...tagIds]))
        artifact.updatedAt = Date.now()
        this.artifacts.set(id, artifact)
      }
    })
    this.updateTagCounts()
  }

  removeTagsFromArtifacts(artifactIds: string[], tagIds: string[]): void {
    artifactIds.forEach((id) => {
      const artifact = this.artifacts.get(id)
      if (artifact) {
        artifact.tags = artifact.tags.filter((tagId) => !tagIds.includes(tagId))
        artifact.updatedAt = Date.now()
        this.artifacts.set(id, artifact)
      }
    })
    this.updateTagCounts()
  }

  toggleFavorites(artifactIds: string[]): void {
    artifactIds.forEach((id) => {
      const artifact = this.artifacts.get(id)
      if (artifact) {
        artifact.isFavorite = !artifact.isFavorite
        artifact.updatedAt = Date.now()
        this.artifacts.set(id, artifact)
      }
    })
  }

  // Statistics
  getStatistics(): {
    totalArtifacts: number
    byType: Record<string, number>
    byFolder: Record<string, number>
    favorites: number
    pinned: number
    recentlyAccessed: OrganizedArtifact[]
  } {
    const artifacts = Array.from(this.artifacts.values())

    const byType = artifacts.reduce(
      (acc, artifact) => {
        acc[artifact.type] = (acc[artifact.type] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const byFolder = artifacts.reduce(
      (acc, artifact) => {
        const folderId = artifact.folderId || "uncategorized"
        acc[folderId] = (acc[folderId] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const favorites = artifacts.filter((a) => a.isFavorite).length
    const pinned = artifacts.filter((a) => a.isPinned).length

    const recentlyAccessed = artifacts.sort((a, b) => b.lastAccessedAt - a.lastAccessedAt).slice(0, 10)

    return {
      totalArtifacts: artifacts.length,
      byType,
      byFolder,
      favorites,
      pinned,
      recentlyAccessed,
    }
  }
}

// Singleton instance
export const artifactOrganizer = new ArtifactOrganizer()

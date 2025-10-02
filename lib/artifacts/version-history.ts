import type { DocumentData, DataTableData, ChecklistData, ChartData } from "@/lib/artifacts"

export interface ArtifactVersion {
  id: string
  artifactId: string
  version: number
  timestamp: number
  author: string
  changeDescription: string
  data: DocumentData | DataTableData | ChecklistData | ChartData
  changeType: "created" | "edited" | "restored" | "auto-saved"
  changedFields?: string[]
  previousVersionId?: string
}

export interface VersionDiff {
  field: string
  oldValue: any
  newValue: any
  changeType: "added" | "removed" | "modified"
}

export class VersionHistoryManager {
  private versions: Map<string, ArtifactVersion[]> = new Map()
  private maxVersionsPerArtifact = 50

  // Create a new version snapshot
  createVersion(
    artifactId: string,
    data: DocumentData | DataTableData | ChecklistData | ChartData,
    author: string,
    changeDescription: string,
    changeType: ArtifactVersion["changeType"] = "edited",
    changedFields?: string[],
  ): ArtifactVersion {
    const versions = this.versions.get(artifactId) || []
    const latestVersion = versions[versions.length - 1]

    const newVersion: ArtifactVersion = {
      id: `${artifactId}-v${versions.length + 1}-${Date.now()}`,
      artifactId,
      version: versions.length + 1,
      timestamp: Date.now(),
      author,
      changeDescription,
      data: JSON.parse(JSON.stringify(data)), // Deep clone
      changeType,
      changedFields,
      previousVersionId: latestVersion?.id,
    }

    versions.push(newVersion)

    // Limit versions per artifact
    if (versions.length > this.maxVersionsPerArtifact) {
      versions.shift()
    }

    this.versions.set(artifactId, versions)
    return newVersion
  }

  // Get all versions for an artifact
  getVersions(artifactId: string): ArtifactVersion[] {
    return this.versions.get(artifactId) || []
  }

  // Get a specific version
  getVersion(artifactId: string, versionId: string): ArtifactVersion | undefined {
    const versions = this.versions.get(artifactId) || []
    return versions.find((v) => v.id === versionId)
  }

  // Get the latest version
  getLatestVersion(artifactId: string): ArtifactVersion | undefined {
    const versions = this.versions.get(artifactId) || []
    return versions[versions.length - 1]
  }

  // Compare two versions and generate diff
  compareVersions(version1: ArtifactVersion, version2: ArtifactVersion): VersionDiff[] {
    const diffs: VersionDiff[] = []

    const compare = (obj1: any, obj2: any, path = "") => {
      const keys = new Set([...Object.keys(obj1 || {}), ...Object.keys(obj2 || {})])

      keys.forEach((key) => {
        const fullPath = path ? `${path}.${key}` : key
        const val1 = obj1?.[key]
        const val2 = obj2?.[key]

        if (val1 === undefined && val2 !== undefined) {
          diffs.push({
            field: fullPath,
            oldValue: undefined,
            newValue: val2,
            changeType: "added",
          })
        } else if (val1 !== undefined && val2 === undefined) {
          diffs.push({
            field: fullPath,
            oldValue: val1,
            newValue: undefined,
            changeType: "removed",
          })
        } else if (
          typeof val1 === "object" &&
          typeof val2 === "object" &&
          !Array.isArray(val1) &&
          !Array.isArray(val2)
        ) {
          compare(val1, val2, fullPath)
        } else if (JSON.stringify(val1) !== JSON.stringify(val2)) {
          diffs.push({
            field: fullPath,
            oldValue: val1,
            newValue: val2,
            changeType: "modified",
          })
        }
      })
    }

    compare(version1.data, version2.data)
    return diffs
  }

  // Restore a specific version
  restoreVersion(artifactId: string, versionId: string, author: string): ArtifactVersion | null {
    const version = this.getVersion(artifactId, versionId)
    if (!version) return null

    return this.createVersion(artifactId, version.data, author, `Restored to version ${version.version}`, "restored")
  }

  // Delete all versions for an artifact
  deleteVersions(artifactId: string): void {
    this.versions.delete(artifactId)
  }

  // Get version statistics
  getVersionStats(artifactId: string): {
    totalVersions: number
    firstVersion?: ArtifactVersion
    latestVersion?: ArtifactVersion
    authors: string[]
    changeTypes: Record<string, number>
  } {
    const versions = this.versions.get(artifactId) || []

    const authors = Array.from(new Set(versions.map((v) => v.author)))
    const changeTypes = versions.reduce(
      (acc, v) => {
        acc[v.changeType] = (acc[v.changeType] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return {
      totalVersions: versions.length,
      firstVersion: versions[0],
      latestVersion: versions[versions.length - 1],
      authors,
      changeTypes,
    }
  }

  // Search versions by criteria
  searchVersions(
    artifactId: string,
    criteria: {
      author?: string
      changeType?: ArtifactVersion["changeType"]
      startDate?: number
      endDate?: number
      searchTerm?: string
    },
  ): ArtifactVersion[] {
    const versions = this.versions.get(artifactId) || []

    return versions.filter((version) => {
      if (criteria.author && version.author !== criteria.author) return false
      if (criteria.changeType && version.changeType !== criteria.changeType) return false
      if (criteria.startDate && version.timestamp < criteria.startDate) return false
      if (criteria.endDate && version.timestamp > criteria.endDate) return false
      if (criteria.searchTerm && !version.changeDescription.toLowerCase().includes(criteria.searchTerm.toLowerCase())) {
        return false
      }
      return true
    })
  }

  // Export version history
  exportVersionHistory(artifactId: string): string {
    const versions = this.versions.get(artifactId) || []
    return JSON.stringify(versions, null, 2)
  }

  // Import version history
  importVersionHistory(artifactId: string, jsonData: string): boolean {
    try {
      const versions = JSON.parse(jsonData) as ArtifactVersion[]
      this.versions.set(artifactId, versions)
      return true
    } catch (error) {
      console.error("Failed to import version history:", error)
      return false
    }
  }
}

// Singleton instance
export const versionHistoryManager = new VersionHistoryManager()

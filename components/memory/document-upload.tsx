"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useDevice } from "@/contexts/DeviceProvider"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { Upload, File, FileText, ImageIcon, X, Check, AlertCircle, Loader2 } from "lucide-react"

interface ExtractedMemory {
  title: string
  category: string
  content: string
  tags: string[]
}

interface DocumentUploadProps {
  isOpen: boolean
  onClose: () => void
  onMemoriesApproved: (memories: ExtractedMemory[]) => void
}

export function DocumentUpload({ isOpen, onClose, onMemoriesApproved }: DocumentUploadProps) {
  const { isMobile } = useDevice()
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [isExtracting, setIsExtracting] = useState(false)
  const [extractedMemories, setExtractedMemories] = useState<ExtractedMemory[]>([])
  const [isDragging, setIsDragging] = useState(false)

  // Mock extracted memories
  const mockExtractedMemories: ExtractedMemory[] = [
    {
      title: "Vacation Policy",
      category: "Policies",
      content: "- 20 days PTO\n- Flexible scheduling",
      tags: ["hr", "benefits"],
    },
    {
      title: "Work Hours",
      category: "Policies",
      content: "- Core hours: 10am-4pm\n- Flexible start/end",
      tags: ["hr", "schedule"],
    },
  ]

  const handleFileSelect = useCallback((file: File) => {
    setUploadedFile(file)
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setIsExtracting(true)

          // Simulate AI extraction
          setTimeout(() => {
            setIsExtracting(false)
            setExtractedMemories(mockExtractedMemories)
          }, 2000)

          return 100
        }
        return prev + 10
      })
    }, 200)
  }, [])

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const file = e.dataTransfer.files[0]
      if (file) {
        handleFileSelect(file)
      }
    },
    [handleFileSelect],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleRemoveFile = () => {
    setUploadedFile(null)
    setUploadProgress(0)
    setExtractedMemories([])
  }

  const handleApproveAll = () => {
    onMemoriesApproved(extractedMemories)
    onClose()
    // Reset state
    setUploadedFile(null)
    setExtractedMemories([])
  }

  const handleRemoveMemory = (index: number) => {
    setExtractedMemories((prev) => prev.filter((_, i) => i !== index))
  }

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase()
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext || "")) {
      return <ImageIcon className="h-5 w-5" />
    }
    if (["pdf"].includes(ext || "")) {
      return <FileText className="h-5 w-5" />
    }
    return <File className="h-5 w-5" />
  }

  return (
    <AdaptiveModal
      isOpen={isOpen}
      onClose={onClose}
      title="Upload Document"
      description="Upload a document to extract memories automatically"
    >
      <div className="space-y-4 md:space-y-6">
        {/* Upload Zone */}
        {!uploadedFile && (
          <div>
            {/* Desktop: Drag & Drop Zone */}
            {!isMobile && (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`
                  border-2 border-dashed rounded-lg p-8 text-center
                  transition-colors cursor-pointer
                  ${isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"}
                `}
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm font-medium mb-2">Drag and drop your file here</p>
                <p className="text-xs text-muted-foreground mb-4">or click to browse</p>
                <input
                  type="file"
                  id="file-upload-desktop"
                  className="hidden"
                  onChange={handleFileInputChange}
                  accept=".pdf,.doc,.docx,.txt,.md"
                />
                <label htmlFor="file-upload-desktop">
                  <Button
                    type="button"
                    variant="outline"
                    className="min-h-[44px] bg-transparent"
                    onClick={() => document.getElementById("file-upload-desktop")?.click()}
                  >
                    Choose File
                  </Button>
                </label>
              </div>
            )}

            {/* Mobile: Large File Picker Button */}
            {isMobile && (
              <div className="space-y-3">
                <input
                  type="file"
                  id="file-upload-mobile"
                  className="hidden"
                  onChange={handleFileInputChange}
                  accept=".pdf,.doc,.docx,.txt,.md"
                />
                <label htmlFor="file-upload-mobile" className="block">
                  <div
                    className="
                    border-2 border-dashed border-muted-foreground/25 
                    rounded-lg p-6 text-center cursor-pointer
                    active:bg-muted/50 transition-colors
                    min-h-[120px] flex flex-col items-center justify-center
                  "
                  >
                    <Upload className="h-10 w-10 mb-3 text-muted-foreground" />
                    <p className="text-sm font-medium mb-1">Tap to choose file</p>
                    <p className="text-xs text-muted-foreground">PDF, DOC, TXT, or MD</p>
                  </div>
                </label>
              </div>
            )}

            <p className="text-xs text-muted-foreground text-center mt-3">
              Supported formats: PDF, DOC, DOCX, TXT, MD (Max 10MB)
            </p>
          </div>
        )}

        {/* Uploaded File Card */}
        {uploadedFile && (
          <Card className="p-4">
            <div className="flex items-start gap-3">
              <div className="text-muted-foreground mt-1">{getFileIcon(uploadedFile.name)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{uploadedFile.name}</p>
                <p className="text-xs text-muted-foreground">{(uploadedFile.size / 1024).toFixed(1)} KB</p>

                {/* Upload Progress */}
                {isUploading && (
                  <div className="mt-3 space-y-2">
                    <Progress value={uploadProgress} className="h-2" />
                    <p className="text-xs text-muted-foreground">Uploading... {uploadProgress}%</p>
                  </div>
                )}

                {/* Extraction Progress */}
                {isExtracting && (
                  <div className="mt-3 flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <p className="text-xs text-muted-foreground">Extracting memories with AI...</p>
                  </div>
                )}
              </div>

              {!isUploading && !isExtracting && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveFile}
                  className="min-h-[44px] min-w-[44px] -mr-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </Card>
        )}

        {/* Extracted Memories */}
        {extractedMemories.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold">Extracted Memories ({extractedMemories.length})</h3>
                <p className="text-xs text-muted-foreground">Review and approve memories to add</p>
              </div>
            </div>

            {/* Memory Cards */}
            <div className="space-y-2">
              {extractedMemories.map((memory, index) => (
                <Card key={index} className="p-4 min-h-[80px]">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-medium">{memory.title}</h4>
                        <Badge variant="secondary" className="shrink-0">
                          {memory.category}
                        </Badge>
                      </div>

                      <p className="text-xs text-muted-foreground line-clamp-2">{memory.content}</p>

                      <div className="flex flex-wrap gap-1">
                        {memory.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveMemory(index)}
                      className="min-h-[44px] min-w-[44px] shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-2 pt-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="min-h-[44px] flex-1 sm:flex-initial bg-transparent"
              >
                Cancel
              </Button>
              <Button
                onClick={handleApproveAll}
                disabled={extractedMemories.length === 0}
                className="min-h-[44px] flex-1 sm:flex-initial"
              >
                <Check className="h-4 w-4 mr-2" />
                Approve All ({extractedMemories.length})
              </Button>
            </div>
          </div>
        )}

        {/* Info Message */}
        {!uploadedFile && (
          <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
            <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground">
              Our AI will automatically extract key information and suggest memories. You can review and edit before
              adding them.
            </p>
          </div>
        )}
      </div>
    </AdaptiveModal>
  )
}

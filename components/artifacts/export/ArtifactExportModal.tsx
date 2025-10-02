"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useDevice } from "@/contexts/DeviceProvider"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { FileText, ImageIcon, Table, FileJson, Download, Loader2, CheckCircle2 } from "lucide-react"
import { ArtifactExporter, type ExportFormat } from "@/lib/artifacts/export"
import { toast } from "sonner"

interface ArtifactExportModalProps {
  isOpen: boolean
  onClose: () => void
  artifact: any
}

export function ArtifactExportModal({ isOpen, onClose, artifact }: ArtifactExportModalProps) {
  const { isMobile } = useDevice()
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>("pdf")
  const [includeMetadata, setIncludeMetadata] = useState(true)
  const [isExporting, setIsExporting] = useState(false)
  const [exportSuccess, setExportSuccess] = useState(false)

  const exportFormats = [
    {
      format: "pdf" as ExportFormat,
      icon: <FileText className="h-5 w-5" />,
      label: "PDF Document",
      description: "Professional document format",
      supported: ["document", "data-table", "checklist"],
    },
    {
      format: "png" as ExportFormat,
      icon: <ImageIcon className="h-5 w-5" />,
      label: "PNG Image",
      description: "High-resolution image",
      supported: ["chart", "document"],
    },
    {
      format: "csv" as ExportFormat,
      icon: <Table className="h-5 w-5" />,
      label: "CSV Spreadsheet",
      description: "Excel-compatible format",
      supported: ["data-table"],
    },
    {
      format: "json" as ExportFormat,
      icon: <FileJson className="h-5 w-5" />,
      label: "JSON Data",
      description: "Raw data format",
      supported: ["document", "data-table", "checklist", "chart"],
    },
  ]

  const availableFormats = exportFormats.filter((format) => format.supported.includes(artifact.type))

  const handleExport = async () => {
    setIsExporting(true)
    setExportSuccess(false)

    try {
      const filename = ArtifactExporter.getSuggestedFilename(artifact, selectedFormat)

      switch (selectedFormat) {
        case "pdf": {
          const blob = await ArtifactExporter.exportToPDF(artifact, { includeMetadata })
          ArtifactExporter.downloadBlob(blob, filename)
          break
        }

        case "png": {
          // Need to get the artifact element ID
          const elementId = `artifact-${artifact.id}`
          const blob = await ArtifactExporter.exportToPNG(elementId, { quality: 2 })
          ArtifactExporter.downloadBlob(blob, filename)
          break
        }

        case "csv": {
          const csv = ArtifactExporter.exportToCSV(artifact.data)
          ArtifactExporter.downloadText(csv, filename, "text/csv")
          break
        }

        case "json": {
          const json = ArtifactExporter.exportToJSON(artifact, { includeMetadata })
          ArtifactExporter.downloadText(json, filename, "application/json")
          break
        }
      }

      setExportSuccess(true)
      toast.success(`Exported as ${selectedFormat.toUpperCase()}`)

      // Close modal after short delay
      setTimeout(() => {
        onClose()
        setExportSuccess(false)
      }, 1500)
    } catch (error) {
      console.error("[v0] Export failed:", error)
      toast.error("Export failed. Please try again.")
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <AdaptiveModal
      isOpen={isOpen}
      onClose={onClose}
      title="Export Artifact"
      description="Choose a format to export your artifact"
    >
      <div className={`space-y-6 ${isMobile ? "p-4" : "p-6"}`}>
        {/* Artifact Info */}
        <Card className="p-4 bg-muted/20 border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium truncate">{artifact.data?.title || "Untitled"}</h4>
              <p className="text-sm text-muted-foreground">
                {artifact.type} • {artifact.data?.rows?.length || artifact.data?.items?.length || "N/A"} items
              </p>
            </div>
            <Badge variant="secondary">{artifact.type}</Badge>
          </div>
        </Card>

        {/* Format Selection */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Export Format</Label>
          <RadioGroup value={selectedFormat} onValueChange={(value) => setSelectedFormat(value as ExportFormat)}>
            <div className={`grid gap-3 ${isMobile ? "grid-cols-1" : "grid-cols-2"}`}>
              {availableFormats.map((format) => (
                <motion.div key={format.format} whileHover={{ scale: isMobile ? 1 : 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Card
                    className={`p-4 cursor-pointer transition-all min-h-[80px] ${
                      selectedFormat === format.format
                        ? "border-primary bg-primary/5"
                        : "border-border/50 hover:border-border"
                    }`}
                    onClick={() => setSelectedFormat(format.format)}
                  >
                    <div className="flex items-start gap-3">
                      <RadioGroupItem value={format.format} id={format.format} className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {format.icon}
                          <Label htmlFor={format.format} className="font-medium cursor-pointer">
                            {format.label}
                          </Label>
                        </div>
                        <p className="text-xs text-muted-foreground">{format.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </RadioGroup>
        </div>

        <Separator />

        {/* Export Options */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Export Options</Label>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <div className="flex-1">
              <Label htmlFor="metadata" className="font-medium cursor-pointer">
                Include Metadata
              </Label>
              <p className="text-xs text-muted-foreground mt-1">Add creation date, author, and tags</p>
            </div>
            <Switch id="metadata" checked={includeMetadata} onCheckedChange={setIncludeMetadata} />
          </div>
        </div>

        <Separator />

        {/* Export Actions */}
        <div className="flex items-center gap-3">
          <Button
            onClick={handleExport}
            disabled={isExporting || exportSuccess}
            className={`flex-1 ${isMobile ? "min-h-[48px]" : "min-h-[44px]"}`}
          >
            {isExporting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Exporting...
              </>
            ) : exportSuccess ? (
              <>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Exported!
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Export {selectedFormat.toUpperCase()}
              </>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={onClose}
            disabled={isExporting}
            className={`${isMobile ? "min-h-[48px]" : "min-h-[44px]"}`}
          >
            Cancel
          </Button>
        </div>

        {/* Format Info */}
        <Card className="p-3 bg-muted/10 border-border/50">
          <p className="text-xs text-muted-foreground">
            {selectedFormat === "pdf" && "PDF exports include formatted text, tables, and metadata."}
            {selectedFormat === "png" && "PNG exports create high-resolution images of your artifact."}
            {selectedFormat === "csv" && "CSV exports are compatible with Excel and Google Sheets."}
            {selectedFormat === "json" && "JSON exports include complete artifact data for re-importing."}
          </p>
        </Card>
      </div>
    </AdaptiveModal>
  )
}

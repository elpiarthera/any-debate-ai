"use client"

import { useState } from "react"
import { useDevice } from "@/contexts/DeviceProvider"
import { useToast } from "@/hooks/use-toast"
import { ExportCenterMobile } from "./mobile/export-center-mobile"
import { ExportCenterDesktop } from "./desktop/export-center-desktop"

export interface ExportOption {
  id: string
  title: string
  description: string
  format: string
  icon: string
  color: string
}

const mockExportOptions: ExportOption[] = [
  {
    id: "1",
    title: "Export as PDF",
    description: "Download debates as formatted PDF documents",
    format: "PDF",
    icon: "FileText",
    color: "bg-red-500/10 text-red-500",
  },
  {
    id: "2",
    title: "Export as JSON",
    description: "Export raw data in JSON format for analysis",
    format: "JSON",
    icon: "FileJson",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    id: "3",
    title: "Export as Markdown",
    description: "Save debates as markdown files",
    format: "MD",
    icon: "FileCode",
    color: "bg-green-500/10 text-green-500",
  },
  {
    id: "4",
    title: "Bulk Export",
    description: "Export all your data at once",
    format: "ZIP",
    icon: "Database",
    color: "bg-purple-500/10 text-purple-500",
  },
]

export function ExportCenter() {
  const { isMobile } = useDevice()
  const { toast } = useToast()
  const [exportOptions] = useState<ExportOption[]>(mockExportOptions)

  const handleExport = (optionId: string) => {
    const option = exportOptions.find((o) => o.id === optionId)
    console.log("[v0] Exporting as:", option?.format)
    toast({
      title: "Export started",
      description: `Preparing your data in ${option?.format} format...`,
    })
  }

  const sharedProps = {
    exportOptions,
    onExport: handleExport,
  }

  return isMobile ? <ExportCenterMobile {...sharedProps} /> : <ExportCenterDesktop {...sharedProps} />
}

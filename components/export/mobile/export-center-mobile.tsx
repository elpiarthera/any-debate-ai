"use client"

import { Download, FileText, FileJson, FileCode, Database } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { ExportOption } from "../export-center"

interface ExportCenterMobileProps {
  exportOptions: ExportOption[]
  onExport: (optionId: string) => void
}

const iconMap = {
  FileText,
  FileJson,
  FileCode,
  Database,
}

export function ExportCenterMobile({ exportOptions, onExport }: ExportCenterMobileProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b p-4">
        <h1 className="text-xl font-semibold">Export</h1>
        <p className="text-sm text-muted-foreground mt-1">Download and export your debate data</p>
      </div>

      {/* Export Options */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {exportOptions.map((option) => {
          const Icon = iconMap[option.icon as keyof typeof iconMap] || FileText
          return (
            <Card key={option.id} className="p-4 min-h-[80px]">
              <div className="flex gap-3">
                {/* Icon */}
                <div className={`p-3 rounded-lg ${option.color} shrink-0`}>
                  <Icon className="h-5 w-5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-sm leading-tight">{option.title}</h3>
                    <span className="text-xs font-mono bg-muted px-2 py-1 rounded shrink-0">{option.format}</span>
                  </div>

                  <p className="text-xs text-muted-foreground mb-3">{option.description}</p>

                  <Button size="sm" className="w-full min-h-[44px]" onClick={() => onExport(option.id)}>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

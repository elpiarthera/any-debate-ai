"use client"

import { Download, FileText, FileJson, FileCode, Database } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { ExportOption } from "../export-center"

interface ExportCenterDesktopProps {
  exportOptions: ExportOption[]
  onExport: (optionId: string) => void
}

const iconMap = {
  FileText,
  FileJson,
  FileCode,
  Database,
}

export function ExportCenterDesktop({ exportOptions, onExport }: ExportCenterDesktopProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="grid grid-cols-2 gap-4 max-w-4xl">
        {exportOptions.map((option) => {
          const Icon = iconMap[option.icon as keyof typeof iconMap] || FileText
          return (
            <Card key={option.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-lg ${option.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-mono bg-muted px-2 py-1 rounded">{option.format}</span>
                </div>
                <CardTitle className="mt-4">{option.title}</CardTitle>
                <CardDescription>{option.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full min-h-[44px]" onClick={() => onExport(option.id)}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

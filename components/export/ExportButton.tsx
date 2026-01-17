"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ExportDialog } from "./ExportDialog"

interface ExportButtonProps {
  sessionData?: any
  messages: any[]
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "default" | "lg"
  showText?: boolean
}

export function ExportButton({
  sessionData,
  messages,
  variant = "outline",
  size = "sm",
  showText = true,
}: ExportButtonProps) {
  return (
    <ExportDialog
      sessionData={sessionData}
      messages={messages}
      trigger={
        <Button variant={variant} size={size}>
          <Download className="h-4 w-4" />
          {showText && <span className="ml-2">Export</span>}
        </Button>
      }
    />
  )
}

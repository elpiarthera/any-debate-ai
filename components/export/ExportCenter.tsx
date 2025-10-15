"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, FileJson, FileCode, Database } from "lucide-react"
import { useDevice } from "@/contexts/DeviceProvider"

const exportOptions = [
  {
    id: "1",
    title: "Export as PDF",
    description: "Download debates as formatted PDF documents",
    icon: FileText,
    format: "PDF",
    color: "bg-red-500/10 text-red-500",
  },
  {
    id: "2",
    title: "Export as JSON",
    description: "Export raw data in JSON format for analysis",
    icon: FileJson,
    format: "JSON",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    id: "3",
    title: "Export as Markdown",
    description: "Save debates as markdown files",
    icon: FileCode,
    format: "MD",
    color: "bg-green-500/10 text-green-500",
  },
  {
    id: "4",
    title: "Bulk Export",
    description: "Export all your data at once",
    icon: Database,
    format: "ZIP",
    color: "bg-purple-500/10 text-purple-500",
  },
]

export function ExportCenter() {
  const { isMobile } = useDevice()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Export Center</h2>
        <p className="text-muted-foreground">Download and export your debate data</p>
      </div>

      <div className={`grid gap-4 ${isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
        {exportOptions.map((option, index) => {
          const Icon = option.icon
          return (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
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
                  <Button className="w-full bg-transparent" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

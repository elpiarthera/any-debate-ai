import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { ExportCenter } from "@/components/export/export-center"

export default function ExportPage() {
  return (
    <DashboardLayout title="Export Center" subtitle="Download and export your debate data in various formats">
      <ExportCenter />
    </DashboardLayout>
  )
}

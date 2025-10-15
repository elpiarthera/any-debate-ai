import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { ExportCenter } from "@/components/export/ExportCenter"

export default function ExportPage() {
  return (
    <DashboardLayout
      title="Export"
      subtitle="Export your debates and data"
      breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Export" }]}
    >
      <div className="h-full overflow-auto p-4 md:p-6">
        <ExportCenter />
      </div>
    </DashboardLayout>
  )
}

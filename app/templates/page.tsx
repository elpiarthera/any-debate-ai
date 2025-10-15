import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { TemplateLibrary } from "@/components/templates/TemplateLibrary"

export default function TemplatesPage() {
  return (
    <DashboardLayout
      title="Templates"
      subtitle="Browse and use pre-built debate templates"
      breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Templates" }]}
    >
      <div className="h-full overflow-auto p-4 md:p-6">
        <TemplateLibrary />
      </div>
    </DashboardLayout>
  )
}

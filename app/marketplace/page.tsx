import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { Marketplace } from "@/components/marketplace/Marketplace"

export default function MarketplacePage() {
  return (
    <DashboardLayout
      title="Marketplace"
      subtitle="Discover and install AI agents, templates, and extensions"
      breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Marketplace" }]}
    >
      <div className="h-full overflow-auto p-4 md:p-6">
        <Marketplace />
      </div>
    </DashboardLayout>
  )
}

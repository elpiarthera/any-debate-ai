import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { MemoryDashboard } from "@/components/memory/memory-dashboard"

export default function MemoryPage() {
  return (
    <DashboardLayout>
      <MemoryDashboard />
    </DashboardLayout>
  )
}

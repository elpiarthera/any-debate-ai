import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardContent } from "@/components/dashboard/DashboardContent"

export default function DashboardPage() {
  return (
    <DashboardLayout title="Home" subtitle="Welcome back! Here's what's happening with your AI debates.">
      <DashboardContent currentView="overview" />
    </DashboardLayout>
  )
}

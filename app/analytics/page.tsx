import { DashboardLayout } from "@/components/dashboard/DashboardLayout"

export default function AnalyticsPage() {
  return (
    <DashboardLayout title="Analytics" subtitle="Track your debate performance and insights">
      <div className="p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Coming soon - Detailed analytics and insights</p>
        </div>
      </div>
    </DashboardLayout>
  )
}

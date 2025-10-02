import { DashboardLayout } from "@/components/dashboard/DashboardLayout"

export default function SettingsPage() {
  return (
    <DashboardLayout title="Settings" subtitle="Manage your preferences and configurations">
      <div className="p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Settings</h2>
          <p className="text-muted-foreground">Coming soon - Customize your experience</p>
        </div>
      </div>
    </DashboardLayout>
  )
}

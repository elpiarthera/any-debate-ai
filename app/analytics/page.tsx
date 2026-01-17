"use client"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { MetricCard } from "@/components/dashboard/MetricCard"
import { useDevice } from "@/contexts/DeviceProvider"
import { useLocalAnalytics } from "@/hooks/dashboard/useLocalAnalytics"
import { MessageSquare, Users, TrendingUp, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function AnalyticsPage() {
  const { isMobile } = useDevice()
  const metrics = useLocalAnalytics()

  return (
    <DashboardLayout title="Analytics" subtitle="Track your debate performance and insights">
      <div className={`${isMobile ? "p-4" : "p-6"} space-y-6`}>
        <div className={`grid gap-4 ${isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"}`}>
          <MetricCard
            title="Total Debates"
            value={metrics.totalDebates.toString()}
            change="+12% from last month"
            changeType="positive"
            icon={MessageSquare}
            index={0}
          />
          <MetricCard
            title="Active Agents"
            value={metrics.activeAgents.toString()}
            change="+2 this week"
            changeType="positive"
            icon={Users}
            index={1}
          />
          <MetricCard
            title="Avg. Session Time"
            value={`${metrics.avgSessionTime}m`}
            change="-5% from last week"
            changeType="negative"
            icon={Clock}
            index={2}
          />
          <MetricCard
            title="Engagement Rate"
            value={`${metrics.engagementRate}%`}
            change="+3% from last month"
            changeType="positive"
            icon={TrendingUp}
            index={3}
          />
        </div>

        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-muted-foreground">Advanced Analytics Coming Soon</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Detailed charts, trends, and insights will be available here soon.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

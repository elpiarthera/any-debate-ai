"use client"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { MetricCard } from "@/components/dashboard/MetricCard"
import { useDevice } from "@/contexts/DeviceProvider"
import { useLocalAnalytics } from "@/hooks/dashboard/useLocalAnalytics"
import { MessageSquare, Users, TrendingUp, Clock } from "lucide-react"

export default function AnalyticsPage() {
  const { isMobile } = useDevice()
  const metrics = useLocalAnalytics()

  return (
    <DashboardLayout title="Analytics" subtitle="Track your debate performance and insights">
      <div className={`${isMobile ? "p-4" : "p-6"}`}>
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
      </div>
    </DashboardLayout>
  )
}

"use client"
import { motion } from "framer-motion"
import { MetricCard } from "./MetricCard"
import { QuickActions } from "./QuickActions"
import { RecentActivity } from "./RecentActivity"
import { SessionList } from "./SessionList"
import { AgentLibrary } from "./AgentLibrary"
import { useDevice } from "@/contexts/DeviceProvider"
import { useLocalAnalytics } from "@/hooks/dashboard/useLocalAnalytics"
import { MessageSquare, Users, TrendingUp, Clock, BarChart3, Settings } from "lucide-react"

interface DashboardContentProps {
  currentView: string
}

export function DashboardContent({ currentView }: DashboardContentProps) {
  const { isMobile } = useDevice()
  const metrics = useLocalAnalytics()

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Metrics Grid */}
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

      {/* Quick Actions and Recent Activity */}
      <div className={`grid gap-6 ${isMobile ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"}`}>
        <QuickActions />
        <RecentActivity />
      </div>
    </div>
  )

  const renderDebates = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <SessionList />
    </motion.div>
  )

  const renderAgents = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <AgentLibrary />
    </motion.div>
  )

  const renderAnalytics = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center gap-2">
        <BarChart3 className="h-6 w-6" />
        <h2 className="text-2xl font-bold">Analytics</h2>
      </div>
      <p className="text-muted-foreground">View detailed analytics and insights.</p>
      {/* Analytics content would go here */}
    </motion.div>
  )

  const renderSettings = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center gap-2">
        <Settings className="h-6 w-6" />
        <h2 className="text-2xl font-bold">Settings</h2>
      </div>
      <p className="text-muted-foreground">Configure your preferences and account settings.</p>
      {/* Settings content would go here */}
    </motion.div>
  )

  const renderContent = () => {
    switch (currentView) {
      case "debates":
        return renderDebates()
      case "agents":
        return renderAgents()
      case "analytics":
        return renderAnalytics()
      case "settings":
        return renderSettings()
      default:
        return renderOverview()
    }
  }

  return <div className={`${isMobile ? "p-4" : "p-6"} h-full overflow-auto`}>{renderContent()}</div>
}

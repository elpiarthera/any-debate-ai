"use client"
import { motion } from "framer-motion"
import { QuickActions } from "./QuickActions"
import { RecentActivity } from "./RecentActivity"
import { SessionList } from "./SessionList"
import { AgentLibrary } from "./AgentLibrary"
import { useDevice } from "@/contexts/DeviceProvider"
import { BarChart3, Settings } from "lucide-react"

interface DashboardContentProps {
  currentView: string
}

export function DashboardContent({ currentView }: DashboardContentProps) {
  const { isMobile } = useDevice()

  const renderOverview = () => (
    <div className="space-y-6">
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

  return <div className={`${isMobile ? "p-2" : "p-6"} h-full overflow-auto`}>{renderContent()}</div>
}

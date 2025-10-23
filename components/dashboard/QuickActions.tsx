"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Users, Plus, FileText, Zap, Settings } from "lucide-react"
import { useDevice } from "@/contexts/DeviceProvider"
import Link from "next/link"

const quickActions = [
  {
    title: "Quick Start",
    description: "Browse templates",
    icon: Zap,
    href: "/quick-start",
    color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  },
  {
    title: "New Debate",
    description: "Start a debate",
    icon: MessageSquare,
    href: "/debates",
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  {
    title: "Create Agent",
    description: "Configure new agent",
    icon: Plus,
    href: "/agents",
    color: "bg-green-500/10 text-green-500 border-green-500/20",
  },
  {
    title: "View Analytics",
    description: "Usage & metrics",
    icon: FileText,
    href: "/analytics",
    color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  },
  {
    title: "Auto-Debate",
    description: "AI vs AI discussion",
    icon: Zap,
    href: "/debates?mode=auto",
    color: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  },
  {
    title: "Manage Agents",
    description: "Edit agent library",
    icon: Users,
    href: "/agents",
    color: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  },
  {
    title: "Settings",
    description: "Your preferences",
    icon: Settings,
    href: "/settings",
    color: "bg-gray-500/10 text-gray-500 border-gray-500/20",
  },
]

export function QuickActions() {
  const { isMobile } = useDevice()

  return (
    <Card>
      <CardHeader>
        <CardTitle className={`${isMobile ? "text-lg" : "text-xl"}`}>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`grid gap-3 ${isMobile ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3"}`}>
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="h-full"
            >
              <Link href={action.href} className="h-full block">
                <Button
                  variant="outline"
                  className={`h-full min-h-[120px] p-4 flex flex-col items-center justify-center gap-2 w-full ${action.color} hover:scale-105 transition-all`}
                >
                  <action.icon className="h-6 w-6 shrink-0" />
                  <div className="text-center space-y-0.5 w-full">
                    <div className={`font-medium ${isMobile ? "text-xs" : "text-sm"}`}>{action.title}</div>
                    <div className={`text-muted-foreground ${isMobile ? "text-xs" : "text-xs"} leading-tight`}>
                      {action.description}
                    </div>
                  </div>
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

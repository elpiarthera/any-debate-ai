"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Users, FileText, Clock, ArrowRight } from "lucide-react"
import { useDevice } from "@/contexts/DeviceProvider"
import Link from "next/link"

const recentActivities = [
  {
    id: "1",
    type: "debate",
    title: "AI Ethics Discussion",
    description: "GPT-4 vs Claude-3.5 debate on AI safety",
    timestamp: "2 hours ago",
    participants: ["GPT-4", "Claude"],
    messages: 24,
    status: "active",
  },
  {
    id: "2",
    type: "agent",
    title: "Created Marketing Expert",
    description: "New agent with marketing specialization",
    timestamp: "4 hours ago",
    status: "completed",
  },
  {
    id: "3",
    type: "export",
    title: "Exported Climate Debate",
    description: "PDF export of 3-agent climate discussion",
    timestamp: "1 day ago",
    status: "completed",
  },
  {
    id: "4",
    type: "debate",
    title: "Product Strategy Session",
    description: "Multi-agent product planning discussion",
    timestamp: "2 days ago",
    participants: ["Strategist", "Analyst", "Designer"],
    messages: 18,
    status: "archived",
  },
]

const getActivityIcon = (type: string) => {
  switch (type) {
    case "debate":
      return MessageSquare
    case "agent":
      return Users
    case "export":
      return FileText
    default:
      return Clock
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-500/10 text-green-500 border-green-500/20"
    case "completed":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    case "archived":
      return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20"
  }
}

export function RecentActivity() {
  const { isMobile } = useDevice()

  return (
    <Card className="glass-effect">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className={`${isMobile ? "text-lg" : "text-xl"}`}>Recent Activity</CardTitle>
        <Link href="/history">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            {!isMobile && "View All"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentActivities.map((activity, index) => {
          const Icon = getActivityIcon(activity.type)

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h4 className={`font-medium ${isMobile ? "text-sm" : "text-sm"}`}>{activity.title}</h4>
                    <p className={`text-muted-foreground ${isMobile ? "text-xs" : "text-sm"} mt-1`}>
                      {activity.description}
                    </p>

                    {activity.participants && (
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex -space-x-2">
                          {activity.participants.slice(0, 3).map((participant, i) => (
                            <Avatar key={i} className="w-6 h-6 border-2 border-background">
                              <AvatarFallback className="text-xs">{participant.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        {activity.messages && (
                          <span className="text-xs text-muted-foreground">{activity.messages} messages</span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                    <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </CardContent>
    </Card>
  )
}

"use client"

import { use } from "react"
import { useDevice } from "@/contexts/DeviceProvider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, MessageSquare, Coins, TrendingUp, UserPlus, SettingsIcon, FileText } from "lucide-react"
import { useRouter } from "next/navigation"

// Mock data
const mockOrgStats = {
  totalMembers: 12,
  activeDebates: 8,
  totalTokens: 50000,
  usedTokens: 12500,
}

const mockRecentActivity = [
  { id: "1", user: "John Doe", action: "started a debate", time: "2 hours ago", icon: MessageSquare },
  { id: "2", user: "Jane Smith", action: "invited a member", time: "5 hours ago", icon: UserPlus },
  { id: "3", user: "Bob Wilson", action: "updated settings", time: "1 day ago", icon: SettingsIcon },
  { id: "4", user: "Alice Brown", action: "created a template", time: "2 days ago", icon: FileText },
  { id: "5", user: "Charlie Davis", action: "started a debate", time: "3 days ago", icon: MessageSquare },
]

const mockMembers = [
  { id: "1", name: "John Doe", role: "admin" },
  { id: "2", name: "Jane Smith", role: "member" },
  { id: "3", name: "Bob Wilson", role: "member" },
  { id: "4", name: "Alice Brown", role: "member" },
  { id: "5", name: "Charlie Davis", role: "member" },
]

export default function OrganizationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { isMobile } = useDevice()
  const router = useRouter()

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Organization Overview</h1>
        <p className="text-muted-foreground mt-1">Manage your organization and track activity for {slug}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Members */}
        <Card className="min-h-[80px]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockOrgStats.totalMembers}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        {/* Active Debates */}
        <Card className="min-h-[80px]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Debates</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockOrgStats.activeDebates}</div>
            <p className="text-xs text-muted-foreground">+3 from last week</p>
          </CardContent>
        </Card>

        {/* Token Usage */}
        <Card className="min-h-[80px]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Token Usage</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((mockOrgStats.usedTokens / mockOrgStats.totalTokens) * 100).toFixed(0)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {mockOrgStats.usedTokens.toLocaleString()} / {mockOrgStats.totalTokens.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        {/* Growth */}
        <Card className="min-h-[80px]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12%</div>
            <p className="text-xs text-muted-foreground">vs last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card
            className="min-h-[80px] cursor-pointer hover:bg-accent transition-colors"
            onClick={() => router.push(`/dashboard/organization/${slug}/members`)}
          >
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Invite Members
              </CardTitle>
              <CardDescription>Add new team members to your organization</CardDescription>
            </CardHeader>
          </Card>

          <Card
            className="min-h-[80px] cursor-pointer hover:bg-accent transition-colors"
            onClick={() => router.push(`/dashboard/organization/${slug}/settings`)}
          >
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                Organization Settings
              </CardTitle>
              <CardDescription>Manage organization details and preferences</CardDescription>
            </CardHeader>
          </Card>

          <Card className="min-h-[80px] cursor-pointer hover:bg-accent transition-colors">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-5 w-5" />
                View Reports
              </CardTitle>
              <CardDescription>Access analytics and usage reports</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Recent Activity & Members */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions in your organization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentActivity.map((activity) => {
                const Icon = activity.icon
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="rounded-full bg-muted p-2">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Member Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>Your organization members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockMembers.map((member) => (
                <div key={member.id} className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{member.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{member.role}</p>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full min-h-[44px] bg-transparent"
                onClick={() => router.push(`/dashboard/organization/${slug}/members`)}
              >
                View All Members
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

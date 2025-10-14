"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, MessageSquare, Coins, TrendingUp, UserPlus, SettingsIcon, FileText } from "lucide-react"
import { useRouter } from "next/navigation"

interface OrganizationOverviewDesktopProps {
  slug: string
  stats: {
    totalMembers: number
    activeDebates: number
    totalTokens: number
    usedTokens: number
  }
  recentActivity: Array<{
    id: string
    user: string
    action: string
    time: string
    icon: any
  }>
  members: Array<{
    id: string
    name: string
    role: string
  }>
}

export function OrganizationOverviewDesktop({
  slug,
  stats,
  recentActivity,
  members,
}: OrganizationOverviewDesktopProps) {
  const router = useRouter()

  return (
    <div className="container mx-auto p-6 lg:p-8 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Organization Overview</h1>
        <p className="text-muted-foreground mt-1">Manage your organization and track activity for {slug}</p>
      </div>

      {/* Stats Grid - 4 columns on desktop */}
      <div className="grid grid-cols-4 gap-4">
        {/* Total Members */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMembers}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        {/* Active Debates */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Debates</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeDebates}</div>
            <p className="text-xs text-muted-foreground">+3 from last week</p>
          </CardContent>
        </Card>

        {/* Token Usage */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Token Usage</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{((stats.usedTokens / stats.totalTokens) * 100).toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">
              {stats.usedTokens.toLocaleString()} / {stats.totalTokens.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        {/* Growth */}
        <Card className="hover:shadow-md transition-shadow">
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

      {/* Quick Actions - 3 columns on desktop */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-4">
          <Card
            className="cursor-pointer hover:bg-accent hover:shadow-md transition-all"
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
            className="cursor-pointer hover:bg-accent hover:shadow-md transition-all"
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

          <Card className="cursor-pointer hover:bg-accent hover:shadow-md transition-all">
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

      {/* Recent Activity & Members - 2 columns on desktop */}
      <div className="grid grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions in your organization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => {
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
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>Your organization members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {members.map((member) => (
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
                className="w-full min-h-[44px] bg-transparent hover:bg-accent"
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

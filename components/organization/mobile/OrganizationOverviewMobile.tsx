"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, MessageSquare, Coins, TrendingUp, UserPlus, SettingsIcon, FileText } from "lucide-react"
import { useRouter } from "next/navigation"

interface OrganizationOverviewMobileProps {
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

export function OrganizationOverviewMobile({ slug, stats, recentActivity, members }: OrganizationOverviewMobileProps) {
  const router = useRouter()

  return (
    <div className="p-4 space-y-4">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold">Organization</h1>
        <p className="text-sm text-muted-foreground mt-1">{slug}</p>
      </div>

      {/* Stats Grid - 2 columns on mobile */}
      <div className="grid grid-cols-2 gap-3">
        {/* Total Members */}
        <Card className="min-h-[80px]">
          <CardHeader className="p-3 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-medium">Members</CardTitle>
              <Users className="h-3 w-3 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="text-xl font-bold">{stats.totalMembers}</div>
            <p className="text-[10px] text-muted-foreground">+2 this month</p>
          </CardContent>
        </Card>

        {/* Active Debates */}
        <Card className="min-h-[80px]">
          <CardHeader className="p-3 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-medium">Debates</CardTitle>
              <MessageSquare className="h-3 w-3 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="text-xl font-bold">{stats.activeDebates}</div>
            <p className="text-[10px] text-muted-foreground">+3 this week</p>
          </CardContent>
        </Card>

        {/* Token Usage */}
        <Card className="min-h-[80px]">
          <CardHeader className="p-3 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-medium">Tokens</CardTitle>
              <Coins className="h-3 w-3 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="text-xl font-bold">{((stats.usedTokens / stats.totalTokens) * 100).toFixed(0)}%</div>
            <p className="text-[10px] text-muted-foreground">
              {(stats.usedTokens / 1000).toFixed(0)}k / {(stats.totalTokens / 1000).toFixed(0)}k
            </p>
          </CardContent>
        </Card>

        {/* Growth */}
        <Card className="min-h-[80px]">
          <CardHeader className="p-3 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-medium">Growth</CardTitle>
              <TrendingUp className="h-3 w-3 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="text-xl font-bold">+12%</div>
            <p className="text-[10px] text-muted-foreground">vs last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-base font-semibold mb-3">Quick Actions</h2>
        <div className="space-y-3">
          <Card
            className="min-h-[80px] active:scale-98 transition-transform cursor-pointer"
            onClick={() => router.push(`/dashboard/organization/${slug}/members`)}
          >
            <CardHeader className="p-4">
              <CardTitle className="text-sm flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Invite Members
              </CardTitle>
              <CardDescription className="text-xs">Add new team members</CardDescription>
            </CardHeader>
          </Card>

          <Card
            className="min-h-[80px] active:scale-98 transition-transform cursor-pointer"
            onClick={() => router.push(`/dashboard/organization/${slug}/settings`)}
          >
            <CardHeader className="p-4">
              <CardTitle className="text-sm flex items-center gap-2">
                <SettingsIcon className="h-4 w-4" />
                Settings
              </CardTitle>
              <CardDescription className="text-xs">Manage organization details</CardDescription>
            </CardHeader>
          </Card>

          <Card className="min-h-[80px] active:scale-98 transition-transform cursor-pointer">
            <CardHeader className="p-4">
              <CardTitle className="text-sm flex items-center gap-2">
                <FileText className="h-4 w-4" />
                View Reports
              </CardTitle>
              <CardDescription className="text-xs">Access analytics</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-base">Recent Activity</CardTitle>
          <CardDescription className="text-xs">Latest actions</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-3">
            {recentActivity.map((activity) => {
              const Icon = activity.icon
              return (
                <div key={activity.id} className="flex items-start gap-2 min-h-[48px]">
                  <div className="rounded-full bg-muted p-2 flex-shrink-0">
                    <Icon className="h-3 w-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs">
                      <span className="font-medium">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Team Members Preview */}
      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-base">Team Members</CardTitle>
          <CardDescription className="text-xs">Your organization members</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-3">
            {members.map((member) => (
              <div key={member.id} className="flex items-center gap-3 min-h-[48px]">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-medium">
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
              className="w-full min-h-[48px] bg-transparent"
              onClick={() => router.push(`/dashboard/organization/${slug}/members`)}
            >
              View All Members
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

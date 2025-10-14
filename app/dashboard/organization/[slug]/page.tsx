"use client"

import { useDevice } from "@/contexts/DeviceProvider"
import { OrganizationOverviewMobile } from "@/components/organization/mobile/OrganizationOverviewMobile"
import { OrganizationOverviewDesktop } from "@/components/organization/desktop/OrganizationOverviewDesktop"
import { MessageSquare, UserPlus, SettingsIcon, FileText } from "lucide-react"

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

export default function OrganizationPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const { isMobile } = useDevice()

  const sharedProps = {
    slug,
    stats: mockOrgStats,
    recentActivity: mockRecentActivity,
    members: mockMembers,
  }

  return isMobile ? <OrganizationOverviewMobile {...sharedProps} /> : <OrganizationOverviewDesktop {...sharedProps} />
}

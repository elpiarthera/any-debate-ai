"use client"

import { Building2, Users, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OrgRoleBadge } from "./role-badge"
import { useDevice } from "@/contexts/DeviceProvider"

// Mock data for organization context
const mockOrgContext = {
  id: "1",
  name: "Acme Corp",
  avatar: "/org-avatars/acme.png",
  memberCount: 12,
  userRole: "admin" as const,
}

interface OrgContextDisplayProps {
  onSwitchOrg?: () => void
}

export function OrgContextDisplay({ onSwitchOrg }: OrgContextDisplayProps) {
  const { isMobile } = useDevice()

  return (
    <Button
      variant="outline"
      onClick={onSwitchOrg}
      className={`
        flex items-center gap-3 w-full justify-start
        ${isMobile ? "min-h-[44px] p-2" : "min-h-[44px] p-3"}
        hover:bg-accent transition-colors
      `}
    >
      {/* Organization Avatar */}
      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Building2 className="w-4 h-4 md:w-5 md:h-5 text-primary" />
      </div>

      {/* Organization Info */}
      <div className="flex-1 text-left min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm md:text-base truncate">{mockOrgContext.name}</span>
          {!isMobile && <OrgRoleBadge role={mockOrgContext.userRole} />}
        </div>

        {!isMobile && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="w-3 h-3" />
            <span>{mockOrgContext.memberCount} members</span>
          </div>
        )}
      </div>

      {/* Switch Button Indicator */}
      <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
    </Button>
  )
}

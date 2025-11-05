"use client"

import { useDevice } from "@/contexts/DeviceProvider"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Role configuration
const roleConfig = {
  admin: {
    label: "Admin",
    variant: "default" as const,
    description: "Full access to organization settings, billing, and memory management",
  },
  member: {
    label: "Member",
    variant: "secondary" as const,
    description: "Standard access to workspaces and debates",
  },
}

type ClerkRole = "admin" | "member" | "org:admin" | "org:member" | "org:owner"
type DisplayRole = "admin" | "member"

interface RoleBadgeProps {
  role: ClerkRole
  className?: string
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  const { isMobile } = useDevice()

  // Map Clerk roles to our simplified display roles
  const displayRole: DisplayRole = role === "org:admin" || role === "org:owner" || role === "admin" ? "admin" : "member"

  const config = roleConfig[displayRole]

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant={config.variant}
            className={`
              ${isMobile ? "text-[10px] px-1.5 py-0.5" : "text-xs px-2 py-0.5"}
              ${className}
            `}
          >
            {config.label}
          </Badge>
        </TooltipTrigger>
        <TooltipContent
          side={isMobile ? "top" : "bottom"}
          className={isMobile ? "max-w-[200px] text-xs" : "max-w-[280px]"}
        >
          <p>{config.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

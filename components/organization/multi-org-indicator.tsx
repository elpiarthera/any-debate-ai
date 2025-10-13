"use client"

import { useState } from "react"
import { Building2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useDevice } from "@/contexts/DeviceProvider"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { OrgSwitcher } from "./org-switcher"

interface MultiOrgIndicatorProps {
  orgCount: number
  currentOrgName?: string
}

export function MultiOrgIndicator({ orgCount, currentOrgName = "Current Organization" }: MultiOrgIndicatorProps) {
  const { isMobile } = useDevice()
  const [isOrgSwitcherOpen, setIsOrgSwitcherOpen] = useState(false)

  // Don't show indicator if user only has one org
  if (orgCount <= 1) return null

  return (
    <>
      <div className="flex items-center gap-2">
        {/* Multi-org badge - clickable on mobile */}
        {isMobile ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOrgSwitcherOpen(true)}
            className="min-h-[44px] h-auto px-3 py-2"
          >
            <Badge variant="secondary" className="gap-1.5 text-xs md:text-sm pointer-events-none">
              <Building2 className="w-3 h-3 md:w-4 md:h-4" />
              <span>{orgCount} orgs</span>
            </Badge>
          </Button>
        ) : (
          <Badge variant="secondary" className="gap-1.5 text-sm">
            <Building2 className="w-4 h-4" />
            <span>{orgCount} organizations</span>
          </Badge>
        )}

        {/* Desktop: Show inline org switcher */}
        {!isMobile && <OrgSwitcher />}
      </div>

      {/* Mobile: Show org switcher in modal */}
      {isMobile && (
        <AdaptiveModal
          isOpen={isOrgSwitcherOpen}
          onClose={() => setIsOrgSwitcherOpen(false)}
          title="Switch Organization"
          description={`Currently viewing: ${currentOrgName}`}
        >
          <div className="py-4">
            <OrgSwitcher />
          </div>
        </AdaptiveModal>
      )}
    </>
  )
}

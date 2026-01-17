"use client"

import { useDevice } from "@/contexts/DeviceProvider"
import { Star, Users, Shield } from "lucide-react"

export function TrustSignals() {
  const { isMobile } = useDevice()

  return (
    <div
      className={`
      flex items-center justify-center flex-wrap gap-4 md:gap-6
      ${isMobile ? "text-sm" : "text-base"}
    `}
    >
      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
          ))}
        </div>
        <span className="font-medium">4.9/5</span>
        <span className="text-muted-foreground">(2,847 reviews)</span>
      </div>

      {/* Divider */}
      <div className="h-4 w-px bg-border" />

      {/* Active Users */}
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-primary" />
        <span className="font-medium">12,459</span>
        <span className="text-muted-foreground">decisions today</span>
      </div>

      {/* Divider */}
      {!isMobile && <div className="h-4 w-px bg-border" />}

      {/* Security */}
      {!isMobile && (
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-green-500" />
          <span className="text-muted-foreground">Enterprise-grade security</span>
        </div>
      )}
    </div>
  )
}

"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Shield, AlertTriangle, ArrowLeft } from "lucide-react"
import { useDevice } from "@/contexts/DeviceProvider"
import { Button } from "@/components/ui/button"
import { OrgLoadingState } from "./org-loading-state"

// Mock organization context hook (replace with real implementation later)
function useOrganizationContext() {
  // TODO: Replace with real Clerk organization context
  const mockUserRole = "member" // Change to "admin" to test admin access

  return {
    isAdmin: mockUserRole === "admin",
    isLoaded: true,
  }
}

interface AdminOnlyGuardProps {
  children: React.ReactNode
}

export function AdminOnlyGuard({ children }: AdminOnlyGuardProps) {
  const { isAdmin, isLoaded } = useOrganizationContext()
  const router = useRouter()
  const { isMobile } = useDevice()

  useEffect(() => {
    // Redirect non-admin users to dashboard after loading
    if (isLoaded && !isAdmin) {
      router.push("/dashboard")
    }
  }, [isLoaded, isAdmin, router])

  // Show loading state while checking permissions
  if (!isLoaded) {
    return <OrgLoadingState variant="spinner" />
  }

  // Show error state for non-admin users (before redirect)
  if (!isAdmin) {
    return (
      <div
        className={`
        flex flex-col items-center justify-center min-h-screen
        p-4 md:p-8
      `}
      >
        <div
          className={`
          flex flex-col items-center gap-4 md:gap-6
          max-w-md w-full
          p-6 md:p-8
          rounded-lg border bg-card
        `}
        >
          {/* Icon */}
          <div
            className={`
            flex items-center justify-center
            ${isMobile ? "w-16 h-16" : "w-20 h-20"}
            rounded-full bg-destructive/10
          `}
          >
            <AlertTriangle
              className={`
              ${isMobile ? "w-8 h-8" : "w-10 h-10"}
              text-destructive
            `}
            />
          </div>

          {/* Title */}
          <h2
            className={`
            font-semibold text-center
            ${isMobile ? "text-lg" : "text-xl"}
          `}
          >
            Admin Access Required
          </h2>

          {/* Description */}
          <p
            className={`
            text-center text-muted-foreground
            ${isMobile ? "text-sm" : "text-base"}
          `}
          >
            This page is only accessible to organization administrators. Please contact your organization owner to
            request admin access.
          </p>

          {/* Required Role Badge */}
          <div
            className={`
            flex items-center gap-2
            px-3 py-2 rounded-md
            bg-primary/10 text-primary
            ${isMobile ? "text-xs" : "text-sm"}
          `}
          >
            <Shield className={isMobile ? "w-3 h-3" : "w-4 h-4"} />
            <span className="font-medium">Required role: Admin</span>
          </div>

          {/* Back to Dashboard Button */}
          <Button
            onClick={() => router.push("/dashboard")}
            className="min-h-[44px] w-full mt-2"
            size={isMobile ? "lg" : "default"}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  // User is admin, render protected content
  return <>{children}</>
}

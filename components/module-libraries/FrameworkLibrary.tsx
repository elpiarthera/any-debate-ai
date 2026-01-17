"use client"

import { useDevice } from "@/contexts/DeviceProvider"
import { FrameworkLibraryMobile } from "./mobile/FrameworkLibraryMobile"
import { FrameworkLibraryDesktop } from "./desktop/FrameworkLibraryDesktop"
import { Skeleton } from "@/components/ui/skeleton"
import { useFrameworkManager } from "@/hooks/useFrameworkManager"

interface FrameworkLibraryProps {
  selectedFilter: string
}

export function FrameworkLibrary({ selectedFilter }: FrameworkLibraryProps) {
  const { isMobile } = useDevice()
  const { isLoading } = useFrameworkManager()

  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        <Skeleton className="h-10 w-full" />
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    )
  }

  return isMobile ? <FrameworkLibraryMobile /> : <FrameworkLibraryDesktop selectedFilter={selectedFilter} />
}

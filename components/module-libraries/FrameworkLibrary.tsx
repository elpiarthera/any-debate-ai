"use client"

import { useDevice } from "@/contexts/DeviceProvider"
import { FrameworkLibraryMobile } from "./mobile/FrameworkLibraryMobile"
import { FrameworkLibraryDesktop } from "./desktop/FrameworkLibraryDesktop"

export function FrameworkLibrary() {
  const { isMobile } = useDevice()

  return isMobile ? <FrameworkLibraryMobile /> : <FrameworkLibraryDesktop />
}

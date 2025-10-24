"use client"

import { useDevice } from "@/contexts/DeviceProvider"
import { RoleLibraryMobile } from "./mobile/RoleLibraryMobile"
import { RoleLibraryDesktop } from "./desktop/RoleLibraryDesktop"

export function RoleLibrary() {
  const { isMobile } = useDevice()

  return isMobile ? <RoleLibraryMobile /> : <RoleLibraryDesktop />
}

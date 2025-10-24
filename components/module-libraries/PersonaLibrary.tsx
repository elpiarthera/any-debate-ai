"use client"

import { useDevice } from "@/contexts/DeviceProvider"
import { PersonaLibraryMobile } from "./mobile/PersonaLibraryMobile"
import { PersonaLibraryDesktop } from "./desktop/PersonaLibraryDesktop"

export function PersonaLibrary() {
  const { isMobile } = useDevice()

  return isMobile ? <PersonaLibraryMobile /> : <PersonaLibraryDesktop />
}

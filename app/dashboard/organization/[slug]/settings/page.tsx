"use client"

import { useDevice } from "@/contexts/DeviceProvider"
import { OrganizationSettingsMobile } from "@/components/organization/mobile/OrganizationSettingsMobile"
import { OrganizationSettingsDesktop } from "@/components/organization/desktop/OrganizationSettingsDesktop"

// Mock data
const mockOrganization = {
  id: "2",
  name: "Acme Corp",
  slug: "acme-corp",
  description: "Building the future of AI debates",
}

export default function OrganizationSettingsPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const { isMobile } = useDevice()

  const sharedProps = {
    slug,
    organization: mockOrganization,
  }

  return isMobile ? <OrganizationSettingsMobile {...sharedProps} /> : <OrganizationSettingsDesktop {...sharedProps} />
}

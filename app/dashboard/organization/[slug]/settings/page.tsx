"use client"

import { use } from "react"
import { useDevice } from "@/contexts/DeviceProvider"
import { OrganizationSettingsMobile } from "@/components/organization/mobile/OrganizationSettingsMobile"
import { OrganizationSettingsDesktop } from "@/components/organization/desktop/OrganizationSettingsDesktop"
import DashboardLayout from "@/components/dashboard/DashboardLayout"

// Mock data
const mockOrganization = {
  id: "2",
  name: "Acme Corp",
  slug: "acme-corp",
  description: "Building the future of AI debates",
}

export default function OrganizationSettingsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { isMobile } = useDevice()

  const sharedProps = {
    slug,
    organization: mockOrganization,
  }

  return (
    <DashboardLayout
      title="Organization Settings"
      subtitle={`Manage your organization details and preferences for ${slug}`}
    >
      {isMobile ? <OrganizationSettingsMobile {...sharedProps} /> : <OrganizationSettingsDesktop {...sharedProps} />}
    </DashboardLayout>
  )
}

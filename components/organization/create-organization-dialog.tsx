"use client"

import { useDevice } from "@/contexts/DeviceProvider"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { CreateOrganizationMobile } from "./mobile/CreateOrganizationMobile"
import { CreateOrganizationDesktop } from "./desktop/CreateOrganizationDesktop"

interface CreateOrganizationDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (organization: OrganizationFormData) => void
}

interface OrganizationFormData {
  name: string
  slug: string
  description?: string
}

export function CreateOrganizationDialog({ isOpen, onClose, onSubmit }: CreateOrganizationDialogProps) {
  const { isMobile } = useDevice()

  const handleSubmit = async (data: { name: string; slug: string; description?: string }) => {
    // Mock submission - in real app would call API
    await new Promise((resolve) => setTimeout(resolve, 1000))
    onSubmit(data)
    onClose()
  }

  return (
    <AdaptiveModal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Organization"
      description="Create a new organization to collaborate with your team"
      className={isMobile ? "h-[85vh]" : "max-w-2xl"}
    >
      {isMobile ? (
        <CreateOrganizationMobile onSubmit={handleSubmit} onCancel={onClose} />
      ) : (
        <CreateOrganizationDesktop onSubmit={handleSubmit} onCancel={onClose} />
      )}
    </AdaptiveModal>
  )
}

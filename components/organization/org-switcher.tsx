"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Plus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { useDevice } from "@/contexts/DeviceProvider"
import { CreateOrganizationDialog } from "./create-organization-dialog"

interface Organization {
  id: string
  name: string
  role: "owner" | "admin" | "member"
  members: number
}

const mockOrganizations: Organization[] = [
  { id: "1", name: "Personal Workspace", role: "owner", members: 1 },
  { id: "2", name: "Acme Corp", role: "admin", members: 12 },
  { id: "3", name: "Tech Startup", role: "member", members: 5 },
]

export function OrgSwitcher() {
  const [selectedOrg, setSelectedOrg] = useState<Organization>(mockOrganizations[0])
  const [isOpen, setIsOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const { isMobile } = useDevice()

  console.log("[v0] OrgSwitcher render - isMobile:", isMobile, "isCreateDialogOpen:", isCreateDialogOpen)

  const handleSelectOrg = (org: Organization) => {
    console.log("[v0] handleSelectOrg called:", org.name)
    setSelectedOrg(org)
    setIsOpen(false)
  }

  const handleCreateOrg = () => {
    console.log("[v0] handleCreateOrg called - opening create dialog")
    setIsOpen(false)
    setIsCreateDialogOpen(true)
    console.log("[v0] isCreateDialogOpen set to true")
  }

  const handleSubmitOrganization = (orgData: any) => {
    console.log("[v0] Creating organization:", orgData)
    // TODO: Integrate with Clerk API when backend is ready
  }

  const OrgList = () => (
    <div className="space-y-1">
      {mockOrganizations.map((org) => (
        <button
          key={org.id}
          onClick={() => handleSelectOrg(org)}
          className={`
            w-full flex items-center justify-between
            min-h-[80px] px-4 py-3
            rounded-lg transition-colors
            hover:bg-accent active:bg-accent
            ${selectedOrg.id === org.id ? "bg-accent" : ""}
          `}
        >
          <div className="flex flex-col items-start gap-1">
            <span className="font-medium">{org.name}</span>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="capitalize">{org.role}</span>
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {org.members}
              </span>
            </div>
          </div>
          {selectedOrg.id === org.id && <Check className="h-5 w-5 text-primary" />}
        </button>
      ))}

      <button
        onClick={(e) => {
          console.log("[v0] Create Organization button clicked")
          e.preventDefault()
          e.stopPropagation()
          handleCreateOrg()
        }}
        className="
          w-full flex items-center gap-2
          min-h-[80px] px-4 py-3
          rounded-lg transition-colors
          hover:bg-accent active:bg-accent
          text-primary font-medium
        "
      >
        <Plus className="h-5 w-5" />
        Create Organization
      </button>
    </div>
  )

  if (isMobile) {
    return (
      <>
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="
            justify-between bg-transparent
            min-h-[44px] min-w-[44px]
            w-full max-w-[280px]
          "
        >
          <span className="truncate">{selectedOrg.name}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>

        <AdaptiveModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Switch Organization"
          description="Select an organization or create a new one"
        >
          <OrgList />
        </AdaptiveModal>

        {console.log("[v0] Rendering CreateOrganizationDialog (mobile) - isOpen:", isCreateDialogOpen)}
        <CreateOrganizationDialog
          isOpen={isCreateDialogOpen}
          onClose={() => {
            console.log("[v0] CreateOrganizationDialog onClose called")
            setIsCreateDialogOpen(false)
          }}
          onSubmit={handleSubmitOrganization}
        />
      </>
    )
  }

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="
              justify-between bg-transparent
              min-h-[44px] min-w-[44px]
              w-[200px] md:w-[240px]
            "
          >
            <span className="truncate">{selectedOrg.name}</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[280px]" align="start">
          <DropdownMenuLabel>Organizations</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="p-1">
            <OrgList />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {console.log("[v0] Rendering CreateOrganizationDialog (desktop) - isOpen:", isCreateDialogOpen)}
      <CreateOrganizationDialog
        isOpen={isCreateDialogOpen}
        onClose={() => {
          console.log("[v0] CreateOrganizationDialog onClose called")
          setIsCreateDialogOpen(false)
        }}
        onSubmit={handleSubmitOrganization}
      />
    </>
  )
}

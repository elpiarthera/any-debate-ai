"use client"
import { useState } from "react"
import { Check, ChevronsUpDown, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDevice } from "@/contexts/DeviceProvider"
import { CreateOrganizationDialog } from "@/components/organization/create-organization-dialog"

interface Organization {
  id: string
  name: string
  role: "owner" | "admin" | "member"
}

const mockOrganizations: Organization[] = [
  { id: "1", name: "Personal Workspace", role: "owner" },
  { id: "2", name: "Acme Corp", role: "admin" },
  { id: "3", name: "Tech Startup", role: "member" },
]

export function OrgSwitcher() {
  const [selectedOrg, setSelectedOrg] = useState<Organization>(mockOrganizations[0])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const { isMobile } = useDevice()

  const handleSubmitOrganization = (orgData: any) => {
    console.log("[v0] Creating organization:", orgData)
    // TODO: Integrate with Clerk API when backend is ready
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={`
              justify-between bg-transparent
              min-h-[44px] min-w-[44px]
              ${isMobile ? "w-full max-w-[280px]" : "w-[200px]"}
            `}
          >
            <span className="truncate">{selectedOrg.name}</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={isMobile ? "w-[280px]" : "w-[200px]"} align="start">
          <DropdownMenuLabel>Organizations</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {mockOrganizations.map((org) => (
            <DropdownMenuItem
              key={org.id}
              onClick={() => setSelectedOrg(org)}
              className="flex items-center justify-between min-h-[44px]"
            >
              <div className="flex flex-col">
                <span>{org.name}</span>
                <span className="text-xs text-muted-foreground capitalize">{org.role}</span>
              </div>
              {selectedOrg.id === org.id && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="min-h-[44px]" onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Organization
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CreateOrganizationDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleSubmitOrganization}
      />
    </>
  )
}

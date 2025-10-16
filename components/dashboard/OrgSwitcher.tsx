"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Settings, Users, LayoutDashboard, Plus, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Badge } from "@/components/ui/badge"
import { useDevice } from "@/contexts/DeviceProvider"
import { useRouter } from "next/navigation"
import { CreateOrganizationDialog } from "@/components/organization/create-organization-dialog"

interface Organization {
  id: string
  name: string
  role: "owner" | "admin" | "member"
  slug: string
  memberCount?: number
}

const mockOrganizations: Organization[] = [
  { id: "1", name: "Personal Workspace", role: "owner", slug: "personal", memberCount: 1 },
  { id: "2", name: "Acme Corp", role: "admin", slug: "acme-corp", memberCount: 12 },
  { id: "3", name: "Tech Startup", role: "member", slug: "tech-startup", memberCount: 8 },
]

export function OrgSwitcher() {
  const [selectedOrg, setSelectedOrg] = useState<Organization>(mockOrganizations[0])
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const { isMobile } = useDevice()
  const router = useRouter()

  const handleSelectOrg = (org: Organization) => {
    setSelectedOrg(org)
    console.log("[v0] Switching to organization:", org.name)
  }

  const handleCreateOrg = () => {
    setShowCreateDialog(true)
    console.log("[v0] Opening create organization dialog")
  }

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={`
                justify-between bg-transparent
                min-h-[44px] min-w-[44px]
                ${isMobile ? "w-full max-w-[280px]" : "w-[200px]"}
              `}
            >
              <span className="truncate">{selectedOrg.name}</span>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className={`${isMobile ? "w-[320px]" : "w-[700px]"} p-6 bg-popover`}>
                <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-[2fr_1fr]"} gap-6`}>
                  {/* Organizations List */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="mb-3 font-semibold text-muted-foreground text-sm">YOUR ORGANIZATIONS</h4>
                      <div className="space-y-2">
                        {mockOrganizations.map((org) => (
                          <div
                            key={org.id}
                            className={`
                              flex items-start gap-3 p-3 rounded-lg border cursor-pointer
                              transition-colors hover:bg-accent
                              ${selectedOrg.id === org.id ? "bg-accent border-primary" : ""}
                              min-h-[60px]
                            `}
                            onClick={() => handleSelectOrg(org)}
                          >
                            <div className="rounded-full bg-muted p-2 mt-1">
                              <Building2 className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium truncate">{org.name}</span>
                                {selectedOrg.id === org.id && <Check className="h-4 w-4 text-primary shrink-0" />}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Badge variant="secondary" className="capitalize">
                                  {org.role}
                                </Badge>
                                <span>•</span>
                                <span>
                                  {org.memberCount} {org.memberCount === 1 ? "member" : "members"}
                                </span>
                              </div>
                              {/* Quick Actions for each org */}
                              <div className="flex gap-2 mt-2">
                                <NavigationMenuLink
                                  href={`/dashboard/organization/${org.slug}`}
                                  className="text-xs text-primary hover:underline"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  Overview
                                </NavigationMenuLink>
                                {(org.role === "owner" || org.role === "admin") && (
                                  <>
                                    <span className="text-xs text-muted-foreground">•</span>
                                    <NavigationMenuLink
                                      href={`/dashboard/organization/${org.slug}/settings`}
                                      className="text-xs text-primary hover:underline"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      Settings
                                    </NavigationMenuLink>
                                    <span className="text-xs text-muted-foreground">•</span>
                                    <NavigationMenuLink
                                      href={`/dashboard/organization/${org.slug}/members`}
                                      className="text-xs text-primary hover:underline"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      Members
                                    </NavigationMenuLink>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar Actions */}
                  <div className="space-y-4">
                    {/* Create Organization Card */}
                    <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Plus className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">Create Organization</h4>
                          <p className="text-muted-foreground text-xs mt-1">Start collaborating with your team</p>
                        </div>
                      </div>
                      <Button onClick={handleCreateOrg} className="w-full min-h-[44px]" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        New Organization
                      </Button>
                    </div>

                    {/* Quick Links Card */}
                    <div className="rounded-lg border bg-card p-4">
                      <h4 className="font-semibold text-sm mb-3">Quick Links</h4>
                      <div className="space-y-2">
                        <NavigationMenuLink
                          href={`/dashboard/organization/${selectedOrg.slug}`}
                          className="flex items-center gap-2 text-sm hover:text-primary transition-colors min-h-[36px]"
                        >
                          <LayoutDashboard className="h-4 w-4" />
                          <span>Overview</span>
                        </NavigationMenuLink>
                        {(selectedOrg.role === "owner" || selectedOrg.role === "admin") && (
                          <>
                            <NavigationMenuLink
                              href={`/dashboard/organization/${selectedOrg.slug}/members`}
                              className="flex items-center gap-2 text-sm hover:text-primary transition-colors min-h-[36px]"
                            >
                              <Users className="h-4 w-4" />
                              <span>Manage Members</span>
                            </NavigationMenuLink>
                            <NavigationMenuLink
                              href={`/dashboard/organization/${selectedOrg.slug}/settings`}
                              className="flex items-center gap-2 text-sm hover:text-primary transition-colors min-h-[36px]"
                            >
                              <Settings className="h-4 w-4" />
                              <span>Settings</span>
                            </NavigationMenuLink>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <CreateOrganizationDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </>
  )
}

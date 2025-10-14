"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserPlus, Mail, MoreVertical, Shield, User, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data
const mockMembers = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "owner", joinedAt: "2024-01-15" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "admin", joinedAt: "2024-02-20" },
  { id: "3", name: "Bob Wilson", email: "bob@example.com", role: "member", joinedAt: "2024-03-10" },
  { id: "4", name: "Alice Brown", email: "alice@example.com", role: "member", joinedAt: "2024-03-15" },
  { id: "5", name: "Charlie Davis", email: "charlie@example.com", role: "member", joinedAt: "2024-04-01" },
]

export default function OrganizationMembersPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const { toast } = useToast()
  const [showInviteDialog, setShowInviteDialog] = useState(false)

  // Handle invite member (mock)
  const handleInviteMember = () => {
    console.log("[v0] Opening invite member dialog")
    toast({
      title: "Invite member",
      description: "Invite member dialog would open here.",
    })
  }

  // Handle remove member (mock)
  const handleRemoveMember = (memberId: string, memberName: string) => {
    console.log("[v0] Removing member:", memberId)
    toast({
      title: "Member removed",
      description: `${memberName} has been removed from your organization.`,
    })
  }

  // Handle change role (mock)
  const handleChangeRole = (memberId: string, memberName: string, newRole: string) => {
    console.log("[v0] Changing role:", { memberId, newRole })
    toast({
      title: "Role updated",
      description: `${memberName}'s role has been changed to ${newRole}.`,
    })
  }

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Team Members</h1>
          <p className="text-muted-foreground mt-1">Manage your organization members and their roles for {slug}</p>
        </div>
        <Button onClick={handleInviteMember} className="min-h-[44px]">
          <UserPlus className="h-4 w-4 mr-2" />
          Invite Member
        </Button>
      </div>

      {/* Member List */}
      <Card>
        <CardHeader>
          <CardTitle>Members ({mockMembers.length})</CardTitle>
          <CardDescription>People who have access to this organization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 rounded-lg border min-h-[80px]">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Mail className="h-3 w-3" />
                      {member.email}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Joined {new Date(member.joinedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={member.role === "owner" ? "default" : "secondary"} className="capitalize">
                    {member.role}
                  </Badge>
                  {member.role !== "owner" && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleChangeRole(member.id, member.name, "admin")}>
                          <Shield className="h-4 w-4 mr-2" />
                          Make Admin
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChangeRole(member.id, member.name, "member")}>
                          <User className="h-4 w-4 mr-2" />
                          Make Member
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleRemoveMember(member.id, member.name)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove Member
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"
import { useDevice } from "@/contexts/DeviceProvider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { MemberListMobile } from "@/components/organization/mobile/MemberListMobile"
import { MemberListDesktop } from "@/components/organization/desktop/MemberListDesktop"

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
  const { isMobile } = useDevice()

  const handleInviteMember = () => {
    toast({
      title: "Invite member",
      description: "Invite member dialog would open here.",
    })
  }

  const handleRemoveMember = (memberId: string, memberName: string) => {
    toast({
      title: "Member removed",
      description: `${memberName} has been removed from your organization.`,
    })
  }

  const handleChangeRole = (memberId: string, memberName: string, newRole: string) => {
    toast({
      title: "Role updated",
      description: `${memberName}'s role has been changed to ${newRole}.`,
    })
  }

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">Team Members</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Manage your organization members and their roles for {slug}
          </p>
        </div>
        <Button onClick={handleInviteMember} className="min-h-[48px] md:min-h-[44px] w-full md:w-auto">
          <UserPlus className="h-4 w-4 mr-2" />
          Invite Member
        </Button>
      </div>

      {/* Member List */}
      {isMobile ? (
        <div>
          <div className="mb-3">
            <h2 className="text-lg font-semibold">Members ({mockMembers.length})</h2>
            <p className="text-sm text-muted-foreground">People who have access to this organization</p>
          </div>
          <MemberListMobile members={mockMembers} onChangeRole={handleChangeRole} onRemoveMember={handleRemoveMember} />
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Members ({mockMembers.length})</CardTitle>
            <CardDescription>People who have access to this organization</CardDescription>
          </CardHeader>
          <CardContent>
            <MemberListDesktop
              members={mockMembers}
              onChangeRole={handleChangeRole}
              onRemoveMember={handleRemoveMember}
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

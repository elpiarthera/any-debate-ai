"use client"

import { useState } from "react"
import { useDevice } from "@/contexts/DeviceProvider"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { OrgRoleBadge } from "./role-badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus, MoreVertical, Search, Trash2, Shield } from "lucide-react"

// Mock data
const mockMembers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@acme.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "org:admin" as const,
    joinedAt: Date.now() - 86400000 * 30,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@acme.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "org:member" as const,
    joinedAt: Date.now() - 86400000 * 15,
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@acme.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "org:member" as const,
    joinedAt: Date.now() - 86400000 * 7,
  },
]

// Mock current user role (admin for demo)
const mockCurrentUserRole = "org:admin"

interface OrgMemberListProps {
  onInviteMember?: () => void
  onRemoveMember?: (memberId: string) => void
  onChangeRole?: (memberId: string, newRole: string) => void
}

export function OrgMemberList({ onInviteMember, onRemoveMember, onChangeRole }: OrgMemberListProps) {
  const { isMobile } = useDevice()
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")

  const isAdmin = mockCurrentUserRole === "org:admin" || mockCurrentUserRole === "org:owner"

  // Filter members based on search and role filter
  const filteredMembers = mockMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || member.role === roleFilter
    return matchesSearch && matchesRole
  })

  const formatJoinedDate = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 30) return `${diffDays} days ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
    return `${Math.floor(diffDays / 365)} years ago`
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold md:text-xl">Members ({filteredMembers.length})</h3>
        {isAdmin && (
          <Button onClick={onInviteMember} className="min-h-[44px] gap-2" size={isMobile ? "default" : "default"}>
            <UserPlus className="h-4 w-4" />
            <span>Invite Member</span>
          </Button>
        )}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="min-h-[48px] pl-9"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="min-h-[48px] w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="org:admin">Admin</SelectItem>
            <SelectItem value="org:member">Member</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Member List */}
      <div className="space-y-2">
        {filteredMembers.length === 0 ? (
          <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed">
            <p className="text-sm text-muted-foreground">No members found</p>
          </div>
        ) : (
          filteredMembers.map((member) => (
            <div
              key={member.id}
              className="flex min-h-[80px] items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-accent/50 md:gap-4 md:p-4"
            >
              {/* Avatar */}
              <Avatar className="h-10 w-10 md:h-12 md:w-12">
                <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>

              {/* Member Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-sm md:text-base truncate">{member.name}</span>
                  <OrgRoleBadge role={member.role} />
                </div>
                <p className="text-xs text-muted-foreground truncate md:text-sm">{member.email}</p>
                {!isMobile && (
                  <p className="text-xs text-muted-foreground">Joined {formatJoinedDate(member.joinedAt)}</p>
                )}
              </div>

              {/* Actions */}
              {isAdmin && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="min-h-[44px] min-w-[44px] shrink-0">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Member actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuItem
                      onClick={() => onChangeRole?.(member.id, "org:admin")}
                      disabled={member.role === "org:admin"}
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Make Admin
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onChangeRole?.(member.id, "org:member")}
                      disabled={member.role === "org:member"}
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Make Member
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onRemoveMember?.(member.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove Member
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

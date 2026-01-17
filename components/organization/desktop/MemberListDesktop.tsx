"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, MoreVertical, Shield, User, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Member {
  id: string
  name: string
  email: string
  role: string
  joinedAt: string
}

interface MemberListDesktopProps {
  members: Member[]
  onChangeRole: (memberId: string, memberName: string, newRole: string) => void
  onRemoveMember: (memberId: string, memberName: string) => void
}

export function MemberListDesktop({ members, onChangeRole, onRemoveMember }: MemberListDesktopProps) {
  return (
    <div className="space-y-2">
      {members.map((member) => (
        <div
          key={member.id}
          className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
        >
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
              <span className="text-sm font-medium">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>

            {/* Member Info */}
            <div>
              <p className="font-medium">{member.name}</p>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Mail className="h-3 w-3" />
                {member.email}
              </p>
            </div>
          </div>

          {/* Role, Join Date, and Actions */}
          <div className="flex items-center gap-4">
            <Badge variant={member.role === "owner" ? "default" : "secondary"} className="capitalize">
              {member.role}
            </Badge>
            <span className="text-sm text-muted-foreground min-w-[100px]">
              Joined {new Date(member.joinedAt).toLocaleDateString()}
            </span>
            {member.role !== "owner" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onChangeRole(member.id, member.name, "admin")}>
                    <Shield className="h-4 w-4 mr-2" />
                    Make Admin
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onChangeRole(member.id, member.name, "member")}>
                    <User className="h-4 w-4 mr-2" />
                    Make Member
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onRemoveMember(member.id, member.name)} className="text-destructive">
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
  )
}

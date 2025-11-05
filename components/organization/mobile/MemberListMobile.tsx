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

interface MemberListMobileProps {
  members: Member[]
  onChangeRole: (memberId: string, memberName: string, newRole: string) => void
  onRemoveMember: (memberId: string, memberName: string) => void
}

export function MemberListMobile({ members, onChangeRole, onRemoveMember }: MemberListMobileProps) {
  return (
    <div className="space-y-3">
      {members.map((member) => (
        <div
          key={member.id}
          className="flex items-start gap-3 p-4 rounded-lg border bg-card min-h-[80px] active:bg-accent transition-colors"
        >
          {/* Avatar */}
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-medium">
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>

          {/* Member Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{member.name}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <Mail className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{member.email}</span>
                </p>
              </div>

              {/* Actions */}
              {member.role !== "owner" && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-11 w-11 p-0 flex-shrink-0">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => onChangeRole(member.id, member.name, "admin")}>
                      <Shield className="h-4 w-4 mr-2" />
                      Make Admin
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onChangeRole(member.id, member.name, "member")}>
                      <User className="h-4 w-4 mr-2" />
                      Make Member
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onRemoveMember(member.id, member.name)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove Member
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {/* Role Badge and Join Date */}
            <div className="flex items-center gap-2 mt-2">
              <Badge variant={member.role === "owner" ? "default" : "secondary"} className="capitalize">
                {member.role}
              </Badge>
              <span className="text-xs text-muted-foreground">
                Joined {new Date(member.joinedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

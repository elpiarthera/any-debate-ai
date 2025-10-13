"use client"
import { Plus, MessageSquare, Users, Download, Settings, FileUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useDevice } from "@/contexts/DeviceProvider"

export function QuickActionsMenu() {
  const { isMobile } = useDevice()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 bg-transparent min-h-[44px] min-w-[44px]">
          <Plus className="h-4 w-4" />
          <span className="hidden md:inline">Quick Actions</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={isMobile ? "w-[90vw] max-w-[280px]" : "w-56"}>
        <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/debates" className="flex items-center gap-2 cursor-pointer min-h-[44px]">
            <MessageSquare className="h-4 w-4" />
            <span>New Debate</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/agents" className="flex items-center gap-2 cursor-pointer min-h-[44px]">
            <Users className="h-4 w-4" />
            <span>Create Agent</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/export" className="flex items-center gap-2 cursor-pointer min-h-[44px]">
            <FileUp className="h-4 w-4" />
            <span>Import Template</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/export" className="flex items-center gap-2 cursor-pointer min-h-[44px]">
            <Download className="h-4 w-4" />
            <span>Export Data</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/settings" className="flex items-center gap-2 cursor-pointer min-h-[44px]">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

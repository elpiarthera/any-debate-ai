"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Users, Briefcase, User, Brain } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

const navigation = [
  {
    title: "All Agents",
    href: "/agents",
    icon: Users,
  },
  {
    title: "Roles",
    href: "/agents/roles",
    icon: Briefcase,
  },
  {
    title: "Personas",
    href: "/agents/personas",
    icon: User,
  },
  {
    title: "Frameworks",
    href: "/agents/frameworks",
    icon: Brain,
  },
]

export function AgentsSecondarySidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="inset" collapsible="none">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive} size="lg" className="min-h-[48px]">
                      <Link href={item.href}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

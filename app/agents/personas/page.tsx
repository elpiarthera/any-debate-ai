"use client"

import { useState } from "react"
import { PersonaLibrary } from "@/components/module-libraries/PersonaLibrary"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
import { useDevice } from "@/contexts/DeviceProvider"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { Menu, Users, Briefcase, User, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OrgSwitcher } from "@/components/dashboard/OrgSwitcher"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const secondaryNav = [
  { title: "All Agents", href: "/agents", icon: Users },
  { title: "Roles", href: "/agents/roles", icon: Briefcase },
  { title: "Personas", href: "/agents/personas", icon: User },
  { title: "Frameworks", href: "/agents/frameworks", icon: Brain },
]

export default function PersonasPage() {
  const { isMobile } = useDevice()
  const pathname = usePathname()
  const [isDashboardSidebarCollapsed, setIsDashboardSidebarCollapsed] = useState(false)
  const [isDashboardSidebarOpen, setIsDashboardSidebarOpen] = useState(false)
  const [isSecondarySidebarOpen, setIsSecondarySidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {!isMobile && (
        <DashboardSidebar
          isCollapsed={isDashboardSidebarCollapsed}
          onToggleCollapse={() => setIsDashboardSidebarCollapsed(!isDashboardSidebarCollapsed)}
        />
      )}

      {!isMobile && (
        <div className="flex-1 flex overflow-hidden">
          <div className="w-56 border-r bg-card flex-shrink-0">
            <nav className="p-2 space-y-1">
              {secondaryNav.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[48px]",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span>{item.title}</span>
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="flex-1 overflow-hidden">
            <PersonaLibrary />
          </div>
        </div>
      )}

      {isMobile && (
        <div className="flex-1 flex flex-col min-h-0 min-w-0 overflow-hidden">
          <div className="border-b p-3 flex items-center gap-2 min-w-0">
            <Button
              variant="ghost"
              size="sm"
              className="min-h-[44px] min-w-[44px] p-0 flex-shrink-0"
              onClick={() => setIsDashboardSidebarOpen(!isDashboardSidebarOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="min-h-[44px] px-3 flex-shrink-0"
              onClick={() => setIsSecondarySidebarOpen(!isSecondarySidebarOpen)}
            >
              Agents Menu
            </Button>
            <div className="flex-1 min-w-0">
              <OrgSwitcher />
            </div>
          </div>

          <PersonaLibrary />
        </div>
      )}

      {isMobile && (
        <AdaptiveModal
          isOpen={isDashboardSidebarOpen}
          onClose={() => setIsDashboardSidebarOpen(false)}
          title="Dashboard Menu"
          description="Navigate through dashboard sections"
        >
          <div className="flex flex-col h-[70vh]">
            <div className="p-4 border-b">
              <OrgSwitcher />
            </div>
            <DashboardSidebar isCollapsed={false} onToggleCollapse={() => setIsDashboardSidebarOpen(false)} />
          </div>
        </AdaptiveModal>
      )}

      {isMobile && (
        <AdaptiveModal
          isOpen={isSecondarySidebarOpen}
          onClose={() => setIsSecondarySidebarOpen(false)}
          title="Agents Menu"
          description="Navigate through agents sections"
        >
          <nav className="p-4 space-y-2">
            {secondaryNav.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSecondarySidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors min-h-[48px]",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span>{item.title}</span>
                </Link>
              )
            })}
          </nav>
        </AdaptiveModal>
      )}
    </div>
  )
}

"use client"
import type { ReactNode } from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { DashboardSidebar } from "./DashboardSidebar"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useDevice } from "@/contexts/DeviceProvider"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import Link from "next/link"
import { OrgSwitcher } from "./OrgSwitcher"
import { TokenBalance } from "./TokenBalance"
import { QuickActionsMenu } from "./QuickActionsMenu"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"

interface DashboardLayoutProps {
  children: ReactNode
  title?: string
  subtitle?: string
  breadcrumbs?: Array<{ label: string; href?: string }>
  actions?: ReactNode
}

export function DashboardLayout({
  children,
  title = "Dashboard",
  subtitle,
  breadcrumbs,
  actions,
}: DashboardLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true)
  const { isMobile } = useDevice()

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <DashboardSidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0 w-full min-w-0">
        {/* Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-40 shrink-0"
        >
          <div className="flex items-center justify-between p-4 h-[72px]">
            <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
              {/* Mobile menu button */}
              {isMobile && (
                <Button
                  variant="ghost"
                  className="min-h-[44px] min-w-[44px] p-0 shrink-0"
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                >
                  <Menu className="h-4 w-4" />
                </Button>
              )}

              {!isMobile && <OrgSwitcher />}

              <div className="flex-1 min-w-0">
                <h1 className="text-base md:text-lg font-semibold truncate">{title}</h1>
                {subtitle && (
                  <p className="text-xs md:text-sm text-muted-foreground hidden md:block truncate">{subtitle}</p>
                )}
                {breadcrumbs && breadcrumbs.length > 0 && (
                  <Breadcrumb className="hidden md:block mt-1">
                    <BreadcrumbList>
                      {breadcrumbs.map((crumb, index) => (
                        <>
                          <BreadcrumbItem key={`item-${index}`}>
                            {index < breadcrumbs.length - 1 ? (
                              <BreadcrumbLink asChild>
                                <Link href={crumb.href || "#"}>{crumb.label}</Link>
                              </BreadcrumbLink>
                            ) : (
                              <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                            )}
                          </BreadcrumbItem>
                          {index < breadcrumbs.length - 1 && <BreadcrumbSeparator key={`separator-${index}`} />}
                        </>
                      ))}
                    </BreadcrumbList>
                  </Breadcrumb>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3 shrink-0">
              {actions}
              <TokenBalance />
              <QuickActionsMenu />
              <ThemeToggle />
            </div>
          </div>
        </motion.header>

        {/* Content */}
        <div className="flex-1 min-h-0 overflow-auto w-full min-w-0">
          <div className={`w-full max-w-full ${isMobile ? "p-3" : "p-4 md:p-6 lg:p-8"}`}>{children}</div>
        </div>
      </div>

      {/* Mobile Sidebar Modal */}
      {isMobile && (
        <AdaptiveModal
          isOpen={!isSidebarCollapsed}
          onClose={() => setIsSidebarCollapsed(true)}
          title="Dashboard Menu"
          description="Navigate through dashboard sections"
        >
          <OrgSwitcher />
          <div className="mt-3">
            <DashboardSidebar
              isCollapsed={false}
              onToggleCollapse={() => setIsSidebarCollapsed(true)}
              onNavigate={() => setIsSidebarCollapsed(true)}
            />
          </div>
        </AdaptiveModal>
      )}
    </div>
  )
}

export default DashboardLayout

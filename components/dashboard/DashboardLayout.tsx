"use client"
import type { ReactNode } from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Menu } from "lucide-react"
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
}

export function DashboardLayout({ children, title = "Dashboard", subtitle, breadcrumbs }: DashboardLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const { isMobile } = useDevice()

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <DashboardSidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-40"
        >
          <div className={`flex items-center justify-between p-3 md:p-4`}>
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

              <Link href="/">
                <Button variant="ghost" className="min-h-[44px] min-w-[44px] p-0 shrink-0">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>

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
                        <BreadcrumbItem key={index}>
                          {index < breadcrumbs.length - 1 ? (
                            <>
                              <BreadcrumbLink asChild>
                                <Link href={crumb.href || "#"}>{crumb.label}</Link>
                              </BreadcrumbLink>
                              <BreadcrumbSeparator />
                            </>
                          ) : (
                            <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                          )}
                        </BreadcrumbItem>
                      ))}
                    </BreadcrumbList>
                  </Breadcrumb>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3 shrink-0">
              <TokenBalance />
              <QuickActionsMenu />
              <ThemeToggle />
            </div>
          </div>
        </motion.header>

        {/* Content */}
        <div className="flex-1 min-h-0 overflow-hidden">{children}</div>
      </div>

      {/* Mobile Sidebar Modal */}
      {isMobile && (
        <AdaptiveModal
          isOpen={!isSidebarCollapsed}
          onClose={() => setIsSidebarCollapsed(true)}
          title="Dashboard Menu"
          description="Navigate through dashboard sections"
        >
          <div className="flex flex-col h-[70vh]">
            <div className="p-4 border-b">
              <OrgSwitcher />
            </div>
            <DashboardSidebar isCollapsed={false} onToggleCollapse={() => setIsSidebarCollapsed(true)} />
          </div>
        </AdaptiveModal>
      )}
    </div>
  )
}

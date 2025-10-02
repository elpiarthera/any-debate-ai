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

interface DashboardLayoutProps {
  children: ReactNode
  title?: string
  subtitle?: string
}

export function DashboardLayout({ children, title = "Dashboard", subtitle }: DashboardLayoutProps) {
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
          <div className={`flex items-center justify-between ${isMobile ? "p-3" : "p-4"}`}>
            <div className="flex items-center gap-2 md:gap-4">
              {/* Mobile menu button */}
              {isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                >
                  <Menu className="h-4 w-4" />
                </Button>
              )}

              <Link href="/">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>

              <div>
                <h1 className="text-lg font-semibold">{title}</h1>
                {subtitle && <p className="text-sm text-muted-foreground hidden md:block">{subtitle}</p>}
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
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
            <DashboardSidebar isCollapsed={false} onToggleCollapse={() => setIsSidebarCollapsed(true)} />
          </div>
        </AdaptiveModal>
      )}
    </div>
  )
}

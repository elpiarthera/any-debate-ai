"use client"
import type { ReactNode } from "react"
import { useState, useEffect, useRef } from "react"
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
import { motion } from "framer-motion"
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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const { isMobile } = useDevice()
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log("[v0] DashboardLayout mounted, title:", title)
    console.log("[v0] Initial window.scrollY:", window.scrollY)
    console.log("[v0] Initial contentRef.scrollTop:", contentRef.current?.scrollTop)
  }, [])

  useEffect(() => {
    console.log("[v0] Title changed to:", title)

    const scrollToTop = () => {
      if (contentRef.current) {
        contentRef.current.scrollTop = 0
      }
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }

    // Scroll immediately
    scrollToTop()

    // Scroll again after a frame
    requestAnimationFrame(() => {
      scrollToTop()
      console.log("[v0] Scrolled to top after requestAnimationFrame")
    })

    // Scroll again after animation frame completes
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToTop()
        console.log("[v0] Scrolled to top after double requestAnimationFrame")
      })
    })
  }, [title])

  useEffect(() => {
    console.log("[v0] ===== SCROLL MONITORING STARTED =====")

    const logScrollState = (source: string) => {
      console.log(`[v0] ${source}:`)
      console.log(`  - window.scrollY: ${window.scrollY}`)
      console.log(`  - document.documentElement.scrollTop: ${document.documentElement.scrollTop}`)
      console.log(`  - document.body.scrollTop: ${document.body.scrollTop}`)
      console.log(`  - contentRef.scrollTop: ${contentRef.current?.scrollTop}`)
    }

    // Log initial state
    logScrollState("INITIAL STATE")

    // Monitor window scroll events
    const handleWindowScroll = (e: Event) => {
      console.log("[v0] ⚠️ WINDOW SCROLL EVENT DETECTED")
      logScrollState("Window scroll")
      console.log("[v0] Event target:", e.target)
      console.trace("[v0] Stack trace:")
    }

    // Monitor content container scroll events
    const handleContentScroll = (e: Event) => {
      console.log("[v0] ⚠️ CONTENT SCROLL EVENT DETECTED")
      logScrollState("Content scroll")
      console.log("[v0] Event target:", e.target)
      console.trace("[v0] Stack trace:")
    }

    // Monitor document scroll events
    const handleDocumentScroll = (e: Event) => {
      console.log("[v0] ⚠️ DOCUMENT SCROLL EVENT DETECTED")
      logScrollState("Document scroll")
    }

    window.addEventListener("scroll", handleWindowScroll, true)
    document.addEventListener("scroll", handleDocumentScroll, true)
    contentRef.current?.addEventListener("scroll", handleContentScroll, true)

    // Check scroll position at multiple intervals
    const intervals = [100, 200, 500, 1000, 2000, 3000, 5000]
    const timeouts = intervals.map((delay) =>
      setTimeout(() => {
        console.log(`[v0] ===== ${delay}ms CHECK =====`)
        logScrollState(`After ${delay}ms`)
      }, delay),
    )

    return () => {
      window.removeEventListener("scroll", handleWindowScroll, true)
      document.removeEventListener("scroll", handleDocumentScroll, true)
      contentRef.current?.removeEventListener("scroll", handleContentScroll, true)
      timeouts.forEach(clearTimeout)
      console.log("[v0] ===== SCROLL MONITORING STOPPED =====")
    }
  }, [])

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
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="border-b border-border/50 backdrop-blur-sm bg-background/95 sticky top-0 z-50 shrink-0 w-full"
        >
          <div className={`flex items-center justify-between ${isMobile ? "p-3" : "p-3 md:p-4"} w-full`}>
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
              {actions}
              <TokenBalance />
              <QuickActionsMenu />
              <ThemeToggle />
            </div>
          </div>
        </motion.header>

        {/* Content */}
        <div ref={contentRef} className="flex-1 min-h-0 overflow-auto w-full min-w-0" data-dashboard-content>
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
          <div className="mt-2">
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

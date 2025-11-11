"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useDevice } from "@/contexts/DeviceProvider"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import {
  Home,
  MessageSquare,
  Users,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  TrendingUp,
  Activity,
  Zap,
  FileText,
  Brain,
  Download,
  Store,
  CreditCard,
  ChevronDown,
  Briefcase,
  UserCircle,
  Lightbulb,
} from "lucide-react"

interface DashboardSidebarProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
  onNavigate?: () => void
}

const navigationItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard", badge: null, adminOnly: false },
  { href: "/debates", icon: MessageSquare, label: "Debates", badge: "3", adminOnly: false },
  {
    href: "/agents",
    icon: Users,
    label: "Agents",
    badge: null,
    adminOnly: false,
    submenu: [
      { href: "/agents", icon: Users, label: "All Agents" },
      { href: "/agents/roles", icon: Briefcase, label: "Roles" },
      { href: "/agents/personas", icon: UserCircle, label: "Personas" },
      { href: "/agents/frameworks", icon: Lightbulb, label: "Frameworks" },
    ],
  },
  { href: "/templates", icon: FileText, label: "Templates", badge: null, adminOnly: false },
  { href: "/dashboard/memory", icon: Brain, label: "Memory", badge: "New", adminOnly: true },
  { href: "/analytics", icon: BarChart3, label: "Analytics", badge: null, adminOnly: false },
  { href: "/export", icon: Download, label: "Export", badge: null, adminOnly: false },
  { href: "/marketplace", icon: Store, label: "Marketplace", badge: null, adminOnly: false },
  { href: "/settings", icon: Settings, label: "Settings", badge: null, adminOnly: false },
  { href: "/dashboard/billing", icon: CreditCard, label: "Billing", badge: null, adminOnly: true },
]

const quickActions = [
  { icon: Zap, label: "Quick Start", action: "quick-start" },
  { icon: Plus, label: "New Debate", action: "new-debate" },
  { icon: Users, label: "Create Agent", action: "create-agent" },
  { icon: Activity, label: "Quick Stats", action: "quick-stats" },
]

const recentActivity = [
  {
    id: "1",
    title: "AI Ethics Discussion",
    time: "2 hours ago",
    participants: 3,
    type: "debate",
  },
  {
    id: "2",
    title: "Product Strategy",
    time: "5 hours ago",
    participants: 2,
    type: "debate",
  },
  {
    id: "3",
    title: "Marketing Agent",
    time: "1 day ago",
    participants: 1,
    type: "agent",
  },
]

export function DashboardSidebar({ isCollapsed, onToggleCollapse, onNavigate }: DashboardSidebarProps) {
  const { isMobile, isTablet } = useDevice()
  const pathname = usePathname()
  const router = useRouter()
  const [expandedItems, setExpandedItems] = useState<string[]>(["/agents"])

  const getWidth = () => {
    if (isMobile) return "100%" // Full width on mobile when in modal
    if (isTablet) return isCollapsed ? "64px" : "280px" // Narrower on tablet
    return isCollapsed ? "64px" : "320px" // Full width on desktop
  }

  const isAdmin = true

  const visibleNavigationItems = navigationItems.filter((item) => !item.adminOnly || isAdmin)

  const handleNavigation = () => {
    if (isMobile && onNavigate) {
      onNavigate()
    }
  }

  const toggleSubmenu = (href: string) => {
    setExpandedItems((prev) => (prev.includes(href) ? prev.filter((item) => item !== href) : [...prev, href]))
  }

  return (
    <motion.div
      className={cn(
        "h-full bg-sidebar border-r border-sidebar-border flex flex-col",
        isMobile && "border-r-0", // No border on mobile when in modal
      )}
      animate={{ width: getWidth() }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ width: isMobile ? "100%" : undefined }} // Override for mobile
    >
      {/* Header */}
      <div className="border-b border-sidebar-border shrink-0">
        <div className="flex items-center justify-between p-4 h-[72px]">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-2"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-white" />
                  </div>
                  <h2 className="font-semibold text-sidebar-foreground">AnyDebate AI</h2>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="min-h-[44px] min-w-[44px] p-0 hover:bg-sidebar-accent"
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </div>

      {/* Navigation - Fixed height calculation for proper scrolling */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-2">
            <div className="space-y-1">
              {visibleNavigationItems.map((item, index) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                const isSubmenuActive = item.submenu?.some((sub) => pathname === sub.href)
                const isExpanded = expandedItems.includes(item.href)
                const hasSubmenu = item.submenu && item.submenu.length > 0

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {/* Main nav item */}
                    <div
                      onClick={() => {
                        if (hasSubmenu && !isCollapsed) {
                          toggleSubmenu(item.href)
                        } else {
                          router.push(item.href)
                          handleNavigation()
                        }
                      }}
                      className={cn(
                        "group relative rounded-lg p-3 mb-2 cursor-pointer transition-colors flex min-h-[44px] items-center",
                        "hover:bg-sidebar-accent",
                        (isActive || isSubmenuActive) && "bg-sidebar-accent",
                      )}
                    >
                      {isCollapsed ? (
                        <div className="flex items-center justify-center w-full">
                          <Icon className="h-5 w-5 text-sidebar-foreground" />
                        </div>
                      ) : (
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-3">
                            <Icon className="h-5 w-5 text-sidebar-foreground" />
                            <span className="font-medium text-sidebar-foreground">{item.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {item.badge && (
                              <Badge variant="secondary" className="bg-sidebar-accent/50">
                                {item.badge}
                              </Badge>
                            )}
                            {hasSubmenu && (
                              <ChevronDown
                                className={cn(
                                  "h-4 w-4 text-sidebar-foreground/60 transition-transform",
                                  isExpanded && "rotate-180",
                                )}
                              />
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {hasSubmenu && !isCollapsed && isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-4 space-y-1 mb-2"
                      >
                        {item.submenu.map((subItem) => {
                          const SubIcon = subItem.icon
                          const isSubActive = pathname === subItem.href

                          return (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              onClick={handleNavigation}
                              className={cn(
                                "flex items-center gap-3 rounded-lg p-2 pl-3 min-h-[44px] transition-colors",
                                "hover:bg-sidebar-accent/50",
                                isSubActive && "bg-sidebar-accent/70 text-sidebar-foreground font-medium",
                              )}
                            >
                              <SubIcon className="h-4 w-4 text-sidebar-foreground/80" />
                              <span className="text-sm text-sidebar-foreground">{subItem.label}</span>
                            </Link>
                          )
                        })}
                      </motion.div>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* Quick Actions */}
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6"
                >
                  <h3 className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider mb-3 px-3">
                    Quick Actions
                  </h3>
                  <div className="space-y-1">
                    {quickActions.map((action) => {
                      const Icon = action.icon
                      return (
                        <Button
                          key={action.action}
                          variant="ghost"
                          className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent min-h-[44px]"
                          onClick={() => {
                            if (action.action === "quick-start") {
                              router.push("/quick-start")
                              handleNavigation()
                            } else {
                              console.log(`[v0] Quick action: ${action.action}`)
                            }
                          }}
                        >
                          <Icon className="h-4 w-4" />
                          {action.label}
                        </Button>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Recent Activity */}
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6"
                >
                  <h3 className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider mb-3 px-3">
                    Recent Activity
                  </h3>
                  <div className="space-y-2">
                    {recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="p-3 rounded-lg bg-sidebar-accent/30 hover:bg-sidebar-accent transition-colors cursor-pointer"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-sidebar-foreground truncate">{activity.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock className="h-3 w-3 text-sidebar-foreground/60" />
                              <span className="text-xs text-sidebar-foreground/60">{activity.time}</span>
                            </div>
                          </div>
                          <Badge variant="secondary" className="ml-2 text-xs bg-sidebar-accent/50">
                            {activity.participants}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border shrink-0">
        <AnimatePresence>
          {!isCollapsed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent/30"
            >
              <TrendingUp className="h-4 w-4 text-green-500" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground">Active Sessions</p>
                <p className="text-xs text-sidebar-foreground/60">3 debates running</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center"
            >
              <div className="h-8 w-8 rounded-lg bg-sidebar-accent/30 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

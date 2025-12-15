"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useDevice } from "@/contexts/DeviceProvider"
import { useTooltipPreferences } from "@/contexts/TooltipPreferencesContext"
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
  const { tooltipPreferences } = useTooltipPreferences()

  const getWidth = () => {
    if (isMobile) return "100%" // Full width on mobile when in modal
    if (isTablet) return isCollapsed ? "64px" : "240px" // Reduced from 280px to 240px for tablet
    return isCollapsed ? "64px" : "260px" // Reduced from 320px to 260px for desktop - more compact
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
    <TooltipProvider delayDuration={tooltipPreferences.delay}>
      <motion.div
        className={cn("h-full bg-sidebar border-r border-sidebar-border flex flex-col", isMobile && "border-r-0")}
        animate={{ width: getWidth() }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ width: isMobile ? "100%" : undefined }}
      >
        {/* Header */}
        <div className="border-b border-sidebar-border shrink-0">
          <div className="flex items-center justify-between p-3 h-16">
            {" "}
            {/* Reduced padding from p-4 to p-3 and height from h-[72px] to h-16 */}
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="flex items-center gap-2 overflow-hidden"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
                      {" "}
                      {/* Reduced logo size from w-8 h-8 to w-7 h-7 */}
                      <MessageSquare className="h-4 w-4 text-white" />
                    </div>
                    <h2 className="font-semibold text-sidebar-foreground whitespace-nowrap text-sm">AnyDebate AI</h2>{" "}
                    {/* Added text-sm for smaller title */}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {!isMobile && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onToggleCollapse}
                    className="min-h-[44px] min-w-[44px] p-0 hover:bg-sidebar-accent shrink-0"
                  >
                    {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{isCollapsed ? "Expand sidebar" : "Collapse sidebar"}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>

        {/* Navigation - Fixed height calculation for proper scrolling */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-2">
              {" "}
              {/* Kept p-2 but reduced item spacing below */}
              <div className="space-y-0.5">
                {" "}
                {/* Reduced from space-y-1 to space-y-0.5 for tighter spacing */}
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
                      {isCollapsed && tooltipPreferences.enabled ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
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
                                "group relative rounded-lg p-2.5 mb-2 cursor-pointer transition-colors flex min-h-[40px] items-center", // Reduced padding from p-3 to p-2.5, min-h from 44px to 40px
                                "hover:bg-sidebar-accent",
                                (isActive || isSubmenuActive) && "bg-sidebar-accent",
                              )}
                            >
                              <div
                                className="flex items-center justify-center shrink-0"
                                style={{ width: isCollapsed ? "100%" : "auto" }}
                              >
                                <Icon className="h-5 w-5 text-sidebar-foreground" />
                              </div>

                              <AnimatePresence mode="wait">
                                {!isCollapsed && (
                                  <motion.div
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: "auto" }}
                                    exit={{ opacity: 0, width: 0 }}
                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                    className="flex items-center justify-between flex-1 ml-2.5 overflow-hidden" // Reduced left margin from ml-3 to ml-2.5
                                  >
                                    <span className="font-medium text-sidebar-foreground whitespace-nowrap text-sm">
                                      {" "}
                                      {/* Added text-sm for smaller label */}
                                      {item.label}
                                    </span>
                                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                      {" "}
                                      {/* Reduced gap from gap-2 to gap-1.5 */}
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
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="right" sideOffset={8}>
                            <p>{item.label}</p>
                          </TooltipContent>
                        </Tooltip>
                      ) : (
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
                            "group relative rounded-lg p-2.5 mb-2 cursor-pointer transition-colors flex min-h-[40px] items-center", // Reduced padding from p-3 to p-2.5, min-h from 44px to 40px
                            "hover:bg-sidebar-accent",
                            (isActive || isSubmenuActive) && "bg-sidebar-accent",
                          )}
                        >
                          <div
                            className="flex items-center justify-center shrink-0"
                            style={{ width: isCollapsed ? "100%" : "auto" }}
                          >
                            <Icon className="h-5 w-5 text-sidebar-foreground" />
                          </div>

                          <AnimatePresence mode="wait">
                            {!isCollapsed && (
                              <motion.div
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: "auto" }}
                                exit={{ opacity: 0, width: 0 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                className="flex items-center justify-between flex-1 ml-2.5 overflow-hidden" // Reduced left margin from ml-3 to ml-2.5
                              >
                                <span className="font-medium text-sidebar-foreground whitespace-nowrap text-sm">
                                  {" "}
                                  {/* Added text-sm for smaller label */}
                                  {item.label}
                                </span>
                                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                  {" "}
                                  {/* Reduced gap from gap-2 to gap-1.5 */}
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
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}

                      {hasSubmenu && !isCollapsed && isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="ml-3 space-y-0.5 mb-2" // Reduced left margin from ml-4 to ml-3, space-y from 1 to 0.5
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
                                  "flex items-center gap-2.5 rounded-lg p-2 pl-2.5 min-h-[36px] transition-colors", // Reduced gap from 3 to 2.5, pl from 3 to 2.5, min-h from 44px to 36px
                                  "hover:bg-sidebar-accent/50",
                                  isSubActive && "bg-sidebar-accent/70 text-sidebar-foreground font-medium",
                                )}
                              >
                                <SubIcon className="h-4 w-4 text-sidebar-foreground/80" />
                                <span className="text-xs text-sidebar-foreground">{subItem.label}</span>{" "}
                                {/* Reduced from text-sm to text-xs for submenu items */}
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
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="mt-6 overflow-hidden"
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
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="mt-6 overflow-hidden"
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
          <AnimatePresence mode="wait">
            {!isCollapsed ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
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
                transition={{ duration: 0.2 }}
                className="flex justify-center"
              >
                {tooltipPreferences.enabled ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="h-8 w-8 rounded-lg bg-sidebar-accent/30 flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={8}>
                      <p>3 active sessions</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <div className="h-8 w-8 rounded-lg bg-sidebar-accent/30 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </TooltipProvider>
  )
}

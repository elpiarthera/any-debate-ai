"use client"

import type React from "react"

import { useDevice } from "@/contexts/DeviceProvider"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Brain, CreditCard, Settings, Store, Download, Home, MessageSquare, Users, BarChart3 } from "lucide-react"
import { useState } from "react"

interface NavItem {
  href: string
  label: string
  icon: React.ElementType
  adminOnly?: boolean
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/debates", label: "Debates", icon: MessageSquare },
  { href: "/agents", label: "Agents", icon: Users },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/memory", label: "Memory", icon: Brain, adminOnly: true },
  { href: "/billing", label: "Billing", icon: CreditCard, adminOnly: true },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/marketplace", label: "Marketplace", icon: Store },
  { href: "/export", label: "Export", icon: Download },
]

interface MainNavProps {
  isAdmin?: boolean
}

export function MainNav({ isAdmin = false }: MainNavProps) {
  const { isMobile } = useDevice()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const filteredNavItems = navItems.filter((item) => !item.adminOnly || isAdmin)

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="min-h-[44px] min-w-[44px] p-0" aria-label="Open navigation menu">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] p-0">
          <nav className="flex flex-col gap-1 p-4" role="navigation" aria-label="Main navigation">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Navigation</h2>
              <p className="text-sm text-muted-foreground">Access all features</p>
            </div>
            {filteredNavItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    "min-h-[44px]",
                    isActive && "bg-accent text-accent-foreground",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                  {item.adminOnly && (
                    <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Admin</span>
                  )}
                </Link>
              )
            })}
          </nav>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <nav className="flex items-center gap-1" role="navigation" aria-label="Main navigation">
      {filteredNavItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive && "bg-accent text-accent-foreground",
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{item.label}</span>
            {item.adminOnly && <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">Admin</span>}
          </Link>
        )
      })}
    </nav>
  )
}

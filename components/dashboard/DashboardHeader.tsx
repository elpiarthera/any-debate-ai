"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Bell, Search, Plus, Sparkles } from "lucide-react"
import { useDevice } from "@/contexts/DeviceProvider"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface DashboardHeaderProps {
  title?: string
  subtitle?: string
}

export function DashboardHeader({ title = "Dashboard", subtitle }: DashboardHeaderProps) {
  const { isMobile } = useDevice()

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-40"
    >
      <div className={`${isMobile ? "px-4 py-3" : "container mx-auto px-4 py-4"}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Sparkles className="h-5 w-5 text-primary" />
              </motion.div>
              <div>
                <h1 className={`font-semibold ${isMobile ? "text-lg" : "text-xl"}`}>{title}</h1>
                {subtitle && !isMobile && <p className="text-sm text-muted-foreground">{subtitle}</p>}
              </div>
            </div>
          </div>

          {!isMobile && (
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search debates, agents..." className="pl-10" />
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 md:gap-3">
            {isMobile && (
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Search className="h-4 w-4" />
              </Button>
            )}

            <Button variant="ghost" size="sm" className="relative h-8 w-8 p-0">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs flex items-center justify-center">3</Badge>
            </Button>

            <Link href="/debates">
              <Button size={isMobile ? "sm" : "default"} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                {!isMobile && "New Debate"}
              </Button>
            </Link>

            {!isMobile && <ThemeToggle />}
          </div>
        </div>

        {subtitle && isMobile && <p className="text-sm text-muted-foreground mt-2">{subtitle}</p>}
      </div>
    </motion.header>
  )
}

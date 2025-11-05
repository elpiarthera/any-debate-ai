"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Download, Brain, Users, Zap, MessageSquare, Check } from "lucide-react"
import type { MarketplaceItem } from "../marketplace-list"

interface MarketplaceCardDesktopProps {
  item: MarketplaceItem
  onInstall: (itemId: string) => void
  onUninstall: (itemId: string) => void
}

const iconMap = {
  Brain,
  Users,
  Zap,
  MessageSquare,
}

export function MarketplaceCardDesktop({ item, onInstall, onUninstall }: MarketplaceCardDesktopProps) {
  const Icon = iconMap[item.icon as keyof typeof iconMap] || Brain

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className={`p-3 rounded-lg ${item.color}`}>
            <Icon className="h-6 w-6" />
          </div>
          <Badge variant={item.price === "Free" ? "secondary" : "default"}>{item.price}</Badge>
        </div>
        <CardTitle className="mt-4">{item.title}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <span className="font-medium">{item.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Download className="h-4 w-4" />
              <span>{item.downloads.toLocaleString()}</span>
            </div>
          </div>
          {item.isInstalled ? (
            <Button
              variant="outline"
              className="w-full min-h-[44px] bg-transparent"
              onClick={() => onUninstall(item.id)}
            >
              <Check className="h-4 w-4 mr-2" />
              Installed
            </Button>
          ) : (
            <Button className="w-full min-h-[44px]" onClick={() => onInstall(item.id)}>
              Install
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

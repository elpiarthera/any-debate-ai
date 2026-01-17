"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Download, Brain, Users, Zap, MessageSquare, Check } from "lucide-react"
import type { MarketplaceItem } from "../marketplace-list"

interface MarketplaceCardMobileProps {
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

export function MarketplaceCardMobile({ item, onInstall, onUninstall }: MarketplaceCardMobileProps) {
  const Icon = iconMap[item.icon as keyof typeof iconMap] || Brain

  return (
    <Card className="p-4 min-h-[80px]">
      <div className="flex gap-3">
        {/* Icon */}
        <div className={`p-3 rounded-lg ${item.color} shrink-0`}>
          <Icon className="h-5 w-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-sm leading-tight">{item.title}</h3>
            <Badge variant={item.price === "Free" ? "secondary" : "default"} className="shrink-0">
              {item.price}
            </Badge>
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{item.description}</p>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                <span className="font-medium">{item.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Download className="h-3 w-3" />
                <span>{item.downloads.toLocaleString()}</span>
              </div>
            </div>

            {item.isInstalled ? (
              <Button
                size="sm"
                variant="outline"
                className="min-h-[36px] bg-transparent"
                onClick={() => onUninstall(item.id)}
              >
                <Check className="h-3 w-3 mr-1" />
                Installed
              </Button>
            ) : (
              <Button size="sm" className="min-h-[36px]" onClick={() => onInstall(item.id)}>
                Install
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

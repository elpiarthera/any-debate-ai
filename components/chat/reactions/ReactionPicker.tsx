"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Smile, Plus, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDevice } from "@/contexts/DeviceProvider"
import { DEFAULT_REACTIONS, CUSTOM_REACTIONS, ReactionManager } from "@/lib/chat/reactions"

interface ReactionPickerProps {
  messageId: string
  userId: string
  onReact: (emoji: string) => void
  className?: string
}

export function ReactionPicker({ messageId, userId, onReact, className }: ReactionPickerProps) {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("default")
  const { isMobile } = useDevice()

  const userReactions = ReactionManager.getUserReactions(messageId, userId)
  const analytics = ReactionManager.getAnalytics()

  const handleReact = (emoji: string) => {
    onReact(emoji)
    if (!isMobile) {
      setOpen(false)
    }
  }

  const ReactionButton = ({ emoji, label }: { emoji: string; label: string }) => {
    const isActive = userReactions.includes(emoji)

    return (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleReact(emoji)}
        className={cn(
          "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors",
          "hover:bg-accent",
          isActive && "bg-primary/10 ring-2 ring-primary/20",
          isMobile ? "min-w-[60px]" : "min-w-[70px]",
        )}
      >
        <span className={cn("text-2xl", isMobile && "text-xl")}>{emoji}</span>
        <span className={cn("text-xs text-muted-foreground", isMobile && "text-[10px]")}>{label}</span>
      </motion.button>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className={cn("h-7 px-2", className)}>
          <Smile className="h-4 w-4" />
          {userReactions.length > 0 && <span className="ml-1 text-xs font-medium">{userReactions.length}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("p-0", isMobile ? "w-[280px]" : "w-[320px]")} align={isMobile ? "center" : "start"}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3 h-9">
            <TabsTrigger value="default" className="text-xs">
              <Smile className="h-3 w-3 mr-1" />
              Default
            </TabsTrigger>
            <TabsTrigger value="custom" className="text-xs">
              <Plus className="h-3 w-3 mr-1" />
              More
            </TabsTrigger>
            <TabsTrigger value="trending" className="text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              Popular
            </TabsTrigger>
          </TabsList>

          <TabsContent value="default" className="m-0">
            <ScrollArea className={cn(isMobile ? "h-[200px]" : "h-[240px]")}>
              <div className="grid grid-cols-4 gap-1 p-2">
                {DEFAULT_REACTIONS.map((reaction) => (
                  <ReactionButton key={reaction.emoji} emoji={reaction.emoji} label={reaction.label} />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="custom" className="m-0">
            <ScrollArea className={cn(isMobile ? "h-[200px]" : "h-[240px]")}>
              <div className="grid grid-cols-4 gap-1 p-2">
                {CUSTOM_REACTIONS.map((reaction) => (
                  <ReactionButton key={reaction.emoji} emoji={reaction.emoji} label={reaction.label} />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="trending" className="m-0">
            <ScrollArea className={cn(isMobile ? "h-[200px]" : "h-[240px]")}>
              <div className="p-3 space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium">Most Used</span>
                  <span className="text-xs text-muted-foreground">Engagement: {analytics.engagementScore}%</span>
                </div>
                <div className="grid grid-cols-4 gap-1">
                  {analytics.mostUsed.map((reaction) => (
                    <motion.button
                      key={reaction.emoji}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleReact(reaction.emoji)}
                      className={cn(
                        "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors",
                        "hover:bg-accent",
                        userReactions.includes(reaction.emoji) && "bg-primary/10 ring-2 ring-primary/20",
                      )}
                    >
                      <span className="text-2xl">{reaction.emoji}</span>
                      <span className="text-xs text-muted-foreground">{reaction.count}</span>
                    </motion.button>
                  ))}
                </div>

                {analytics.reactionTrends.length > 0 && (
                  <div className="pt-2 border-t border-border">
                    <span className="text-xs font-medium mb-2 block">Trending</span>
                    <div className="flex flex-wrap gap-2">
                      {analytics.reactionTrends.map((trend) => (
                        <div key={trend.emoji} className="flex items-center gap-1 px-2 py-1 bg-muted rounded-full">
                          <span className="text-sm">{trend.emoji}</span>
                          <span
                            className={cn(
                              "text-xs",
                              trend.trend === "up" && "text-green-500",
                              trend.trend === "down" && "text-red-500",
                              trend.trend === "stable" && "text-yellow-500",
                            )}
                          >
                            {trend.trend === "up" && "↗"}
                            {trend.trend === "down" && "↘"}
                            {trend.trend === "stable" && "→"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}

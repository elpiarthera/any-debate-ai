"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, MoreVertical } from "lucide-react"
import { frameworks } from "@/lib/agent-config/frameworks"

export function FrameworkLibraryMobile() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"my" | "system">("my")

  const filteredFrameworks = frameworks.filter((framework) =>
    framework.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Sticky header - 56px min-h */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border min-h-[56px] p-4">
        <div className="flex items-center justify-between gap-3">
          <h1 className="font-sans text-lg font-semibold text-foreground">Framework Library</h1>
          <Button size="lg" className="min-h-[44px] min-w-[44px] bg-primary text-primary-foreground">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Search bar - 48px min-h */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search frameworks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="min-h-[48px] pl-10 text-base bg-input border-border focus:ring-ring"
          />
        </div>
      </div>

      {/* Category chips - horizontal scroll */}
      <div className="border-b border-border">
        <div className="flex gap-2 p-4 overflow-x-auto">
          <Button
            variant={activeTab === "my" ? "default" : "outline"}
            size="lg"
            onClick={() => setActiveTab("my")}
            className={`min-h-[44px] whitespace-nowrap ${
              activeTab === "my" ? "bg-primary text-primary-foreground" : "bg-background border-border"
            }`}
          >
            My Frameworks
          </Button>
          <Button
            variant={activeTab === "system" ? "default" : "outline"}
            size="lg"
            onClick={() => setActiveTab("system")}
            className={`min-h-[44px] whitespace-nowrap ${
              activeTab === "system" ? "bg-primary text-primary-foreground" : "bg-background border-border"
            }`}
          >
            System
          </Button>
          <Button variant="outline" size="lg" className="min-h-[44px] whitespace-nowrap bg-background border-border">
            Import
          </Button>
        </div>
      </div>

      {/* Framework cards - scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground">
          {activeTab === "my" ? "My Frameworks" : "System Frameworks"} ({filteredFrameworks.length})
        </h2>

        {filteredFrameworks.map((framework) => (
          <Card key={framework.id} className="min-h-[80px] p-4 bg-card border-border hover:bg-accent transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{framework.icon}</span>
                  <h3 className="font-sans font-medium text-foreground truncate">{framework.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{framework.description}</p>
                {framework.category && (
                  <Badge className="text-xs px-2 py-1 mt-2 bg-primary/10 text-primary border border-primary/20">
                    {framework.category}
                  </Badge>
                )}
              </div>
              <Button variant="ghost" size="icon" className="min-h-[44px] min-w-[44px] flex-shrink-0">
                <MoreVertical className="h-5 w-5 text-muted-foreground" />
              </Button>
            </div>

            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="sm" className="min-h-[44px] flex-1 bg-background border-border">
                Edit
              </Button>
              <Button variant="outline" size="sm" className="min-h-[44px] flex-1 bg-background border-border">
                Duplicate
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Sticky footer */}
      <footer className="sticky bottom-0 z-10 bg-background/95 backdrop-blur-sm border-t border-border p-4">
        <Button size="lg" className="w-full min-h-[56px] bg-primary text-primary-foreground">
          Create New Framework
        </Button>
      </footer>
    </div>
  )
}

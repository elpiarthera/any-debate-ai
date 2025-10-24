"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, MoreVertical } from "lucide-react"
import { frameworks } from "@/lib/agent-config/frameworks"

export function FrameworkLibraryDesktop() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"my" | "system">("my")

  const filteredFrameworks = frameworks.filter((framework) =>
    framework.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <header className="border-b border-border p-6">
        <div className="flex items-center justify-between">
          <h1 className="font-sans text-2xl font-semibold text-foreground">Framework Library</h1>
          <Button className="bg-primary text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" />
            New Framework
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Search and filters */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search frameworks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input border-border focus:ring-ring"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={activeTab === "my" ? "default" : "outline"}
                onClick={() => setActiveTab("my")}
                className={activeTab === "my" ? "bg-primary text-primary-foreground" : "bg-background border-border"}
              >
                My Frameworks
              </Button>
              <Button
                variant={activeTab === "system" ? "default" : "outline"}
                onClick={() => setActiveTab("system")}
                className={
                  activeTab === "system" ? "bg-primary text-primary-foreground" : "bg-background border-border"
                }
              >
                System
              </Button>
            </div>
          </div>

          {/* Framework grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFrameworks.map((framework) => (
              <Card
                key={framework.id}
                className="p-4 bg-card border-border hover:bg-accent transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{framework.icon}</span>
                    <h3 className="font-sans font-medium text-foreground">{framework.name}</h3>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{framework.description}</p>

                {framework.category && (
                  <Badge className="text-xs px-2 py-1 mb-3 bg-primary/10 text-primary border border-primary/20">
                    {framework.category}
                  </Badge>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-background border-border">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-background border-border">
                    Duplicate
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-80 border-l border-border p-6 overflow-y-auto">
          <h2 className="font-sans font-semibold text-foreground mb-4">Filters</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Sort by</h3>
              <select className="w-full p-2 rounded-md bg-input border-border text-foreground">
                <option>Most Used</option>
                <option>Recently Created</option>
                <option>Name (A-Z)</option>
              </select>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

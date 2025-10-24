"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { AdaptiveGrid } from "@/components/adaptive/AdaptiveGrid"
import { PROFESSIONAL_ROLES, ROLE_CATEGORIES, searchRoles, getRolesByCategory } from "@/lib/agent-config/roles"
import { Plus, MoreVertical } from "lucide-react"

export function RoleLibraryDesktop() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("all")

  // Filter roles based on search and category
  const filteredRoles = searchQuery
    ? searchRoles(searchQuery)
    : activeCategory === "all"
      ? PROFESSIONAL_ROLES
      : getRolesByCategory(activeCategory)

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <header className="border-b border-border p-6">
        <div className="flex items-center justify-between">
          <h1 className="font-sans text-2xl font-semibold text-foreground">Role Library</h1>
          <Button
            size="default"
            className="bg-primary text-primary-foreground"
            onClick={() => router.push("/agents/roles/new")}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Role
          </Button>
        </div>
      </header>

      {/* Search and filters */}
      <div className="p-6 border-b border-border">
        <div className="flex gap-4">
          <Input
            placeholder="Search roles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-input border-border focus:ring-ring"
          />
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Button
            variant={activeCategory === "all" ? "default" : "outline"}
            size="sm"
            className={activeCategory === "all" ? "bg-primary text-primary-foreground" : "bg-background border-border"}
            onClick={() => setActiveCategory("all")}
          >
            All Roles
          </Button>
          {ROLE_CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              className={
                activeCategory === category ? "bg-primary text-primary-foreground" : "bg-background border-border"
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Role grid */}
      <div className="flex-1 overflow-y-auto p-6 bg-background">
        <p className="text-sm text-muted-foreground mb-4">
          {filteredRoles.length} {filteredRoles.length === 1 ? "Role" : "Roles"}
        </p>

        <AdaptiveGrid mobileColumns={1} tabletColumns={2} desktopColumns={3}>
          {filteredRoles.map((role) => (
            <Card
              key={role.id}
              className="p-4 bg-card border-border hover:bg-accent transition-colors cursor-pointer"
              onClick={() => router.push(`/agents/roles/${role.id}`)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{role.icon}</span>
                  <h3 className="font-sans font-medium text-foreground">{role.name}</h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    // TODO: Open action menu
                  }}
                >
                  <MoreVertical className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{role.description}</p>
              <div className="flex flex-wrap gap-1 mt-3">
                {role.expertise.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {skill}
                  </span>
                ))}
                {role.expertise.length > 3 && (
                  <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    +{role.expertise.length - 3}
                  </span>
                )}
              </div>
            </Card>
          ))}
        </AdaptiveGrid>

        {filteredRoles.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">No roles found</p>
            <Button
              variant="outline"
              className="mt-4 bg-transparent"
              onClick={() => {
                setSearchQuery("")
                setActiveCategory("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

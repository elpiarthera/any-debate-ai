"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { PROFESSIONAL_ROLES, ROLE_CATEGORIES, searchRoles, getRolesByCategory } from "@/lib/agent-config/roles"
import { ArrowLeft, Plus, MoreVertical } from "lucide-react"

export function RoleLibraryMobile() {
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
      {/* Sticky header - 56px min-h */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border min-h-[56px] p-4">
        <div className="flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="min-h-[44px] min-w-[44px] flex-shrink-0"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </Button>
          <h1 className="font-sans text-lg font-semibold text-foreground flex-1 min-w-0 truncate">Role Library</h1>
          <Button
            size="lg"
            className="min-h-[44px] min-w-[44px] flex-shrink-0 bg-primary text-primary-foreground"
            onClick={() => router.push("/agents/roles/new")}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Search bar - 48px min-h */}
      <div className="p-4 border-b border-border">
        <Input
          placeholder="Search roles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="min-h-[48px] text-base bg-input border-border focus:ring-ring"
        />
      </div>

      {/* Category chips - horizontal scroll */}
      <div className="border-b border-border bg-background">
        <div className="flex gap-2 p-4 overflow-x-auto">
          <Button
            variant={activeCategory === "all" ? "default" : "outline"}
            size="lg"
            className={`min-h-[44px] whitespace-nowrap flex-shrink-0 ${
              activeCategory === "all" ? "bg-primary text-primary-foreground" : "bg-background border-border"
            }`}
            onClick={() => setActiveCategory("all")}
          >
            All Roles
          </Button>
          {ROLE_CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="lg"
              className={`min-h-[44px] whitespace-nowrap flex-shrink-0 ${
                activeCategory === category ? "bg-primary text-primary-foreground" : "bg-background border-border"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Role cards - scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background">
        <h2 className="text-sm font-medium text-muted-foreground">
          {filteredRoles.length} {filteredRoles.length === 1 ? "Role" : "Roles"}
        </h2>

        {filteredRoles.map((role) => (
          <Card
            key={role.id}
            className="min-h-[80px] p-4 bg-card border-border hover:bg-accent transition-colors cursor-pointer"
            onClick={() => router.push(`/agents/roles/${role.id}`)}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xl flex-shrink-0">{role.icon}</span>
                  <h3 className="font-sans font-medium text-foreground truncate">{role.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{role.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {role.expertise.slice(0, 2).map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {skill}
                    </span>
                  ))}
                  {role.expertise.length > 2 && (
                    <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                      +{role.expertise.length - 2}
                    </span>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="min-h-[44px] min-w-[44px] flex-shrink-0"
                onClick={(e) => {
                  e.stopPropagation()
                  // TODO: Open action menu
                }}
              >
                <MoreVertical className="h-5 w-5 text-muted-foreground" />
              </Button>
            </div>
          </Card>
        ))}

        {filteredRoles.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">No roles found</p>
            <Button
              variant="outline"
              size="lg"
              className="mt-4 min-h-[44px] bg-transparent"
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

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, MoreVertical } from "lucide-react"
import { personas } from "@/lib/agent-config/personas"

export function PersonaLibraryDesktop() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"my" | "system">("my")

  const filteredPersonas = personas.filter(
    (persona) =>
      persona.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      persona.traits.some((trait) => trait.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <header className="border-b border-border p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5 text-foreground" />
            </Button>
            <h1 className="font-sans text-2xl font-semibold text-foreground">Persona Library</h1>
          </div>
          <Button className="bg-primary text-primary-foreground">
            <Plus className="h-5 w-5 mr-2" />
            New Persona
          </Button>
        </div>
      </header>

      <div className="flex-1 overflow-hidden flex">
        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Search and filters */}
          <div className="mb-6 space-y-4">
            <Input
              placeholder="Search personas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md bg-input border-border focus:ring-ring"
            />

            <div className="flex gap-2">
              <Button
                variant={activeTab === "my" ? "default" : "outline"}
                onClick={() => setActiveTab("my")}
                className={activeTab === "my" ? "bg-primary text-primary-foreground" : "bg-background border-border"}
              >
                My Personas
              </Button>
              <Button
                variant={activeTab === "system" ? "default" : "outline"}
                onClick={() => setActiveTab("system")}
                className={
                  activeTab === "system" ? "bg-primary text-primary-foreground" : "bg-background border-border"
                }
              >
                System Library
              </Button>
            </div>
          </div>

          {/* Persona grid */}
          <div className="space-y-4">
            <h2 className="text-sm font-medium text-muted-foreground">
              {activeTab === "my" ? "My Personas" : "System Personas"} ({filteredPersonas.length})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPersonas.map((persona) => (
                <Card
                  key={persona.id}
                  className="p-4 bg-card border-border hover:bg-accent transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-sans font-medium text-foreground">{persona.name}</h3>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{persona.description}</p>

                  {/* Trait badges */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {persona.traits.slice(0, 4).map((trait) => (
                      <Badge
                        key={trait}
                        className="text-xs px-2 py-1 bg-primary/10 text-primary border border-primary/20"
                      >
                        {trait}
                      </Badge>
                    ))}
                    {persona.traits.length > 4 && (
                      <Badge className="text-xs px-2 py-1 bg-muted text-muted-foreground">
                        +{persona.traits.length - 4}
                      </Badge>
                    )}
                  </div>

                  {/* Action buttons */}
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

            {filteredPersonas.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No personas found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

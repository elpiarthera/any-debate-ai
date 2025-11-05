"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, MoreVertical } from "lucide-react"
import { usePersonaManager } from "@/hooks/usePersonaManager"
import { PersonaEditorModal } from "@/components/module-libraries/PersonaEditorModal"
import type { Persona } from "@/lib/agent-config/personas"

export function PersonaLibraryMobile() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"my" | "system">("my")
  const { allPersonas, createPersona, updatePersona, deletePersona, isCustomPersona } = usePersonaManager()
  const [editorOpen, setEditorOpen] = useState(false)
  const [editingPersona, setEditingPersona] = useState<Persona | undefined>()
  const [editorMode, setEditorMode] = useState<"create" | "edit">("create")

  const filteredPersonas = allPersonas.filter(
    (persona) =>
      persona.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      persona.traits.some((trait) => trait.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleCreatePersona = () => {
    setEditingPersona(undefined)
    setEditorMode("create")
    setEditorOpen(true)
  }

  const handleEditPersona = (persona: Persona) => {
    setEditingPersona(persona)
    setEditorMode("edit")
    setEditorOpen(true)
  }

  const handleSavePersona = (personaData: Omit<Persona, "id"> | Persona) => {
    try {
      if (editorMode === "create") {
        createPersona(personaData as Omit<Persona, "id">)
        toast.success("Persona created successfully")
      } else if ("id" in personaData) {
        updatePersona(personaData.id, personaData)
        toast.success("Persona updated successfully")
      }
      setEditorOpen(false)
    } catch (error) {
      console.error("[v0] Error saving persona:", error)
      toast.error("Failed to save persona")
    }
  }

  const handleDeletePersona = (id: string) => {
    if (confirm("Are you sure you want to delete this persona?")) {
      try {
        const success = deletePersona(id)
        if (success) {
          toast.success("Persona deleted successfully")
        } else {
          toast.error("Failed to delete persona")
        }
      } catch (error) {
        console.error("[v0] Error deleting persona:", error)
        toast.error("Failed to delete persona")
      }
    }
  }

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
          <h1 className="font-sans text-lg font-semibold text-foreground flex-1 min-w-0 truncate">Persona Library</h1>
          <Button
            size="lg"
            className="min-h-[44px] min-w-[44px] flex-shrink-0 bg-primary text-primary-foreground"
            onClick={handleCreatePersona}
            aria-label="Create new persona"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Search bar - 48px min-h */}
      <div className="p-4 border-b border-border">
        <Input
          placeholder="Search personas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="min-h-[48px] text-base bg-input border-border focus:ring-ring"
        />
      </div>

      {/* Category chips - horizontal scroll */}
      <div className="border-b border-border bg-background">
        <div className="flex gap-2 p-4 overflow-x-auto scrollbar-hide">
          <Button
            variant={activeTab === "my" ? "default" : "outline"}
            size="lg"
            className={`min-h-[44px] whitespace-nowrap flex-shrink-0 ${
              activeTab === "my" ? "bg-primary text-primary-foreground" : "bg-background border-border"
            }`}
            onClick={() => setActiveTab("my")}
          >
            My Personas
          </Button>
          <Button
            variant={activeTab === "system" ? "default" : "outline"}
            size="lg"
            className={`min-h-[44px] whitespace-nowrap flex-shrink-0 ${
              activeTab === "system" ? "bg-primary text-primary-foreground" : "bg-background border-border"
            }`}
            onClick={() => setActiveTab("system")}
          >
            System
          </Button>
        </div>
      </div>

      {/* Persona cards - scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background">
        <h2 className="text-sm font-medium text-muted-foreground">
          {activeTab === "my" ? "My Personas" : "System Personas"} ({filteredPersonas.length})
        </h2>

        {filteredPersonas.map((persona) => (
          <Card
            key={persona.id}
            className="min-h-[80px] p-4 bg-card border-border hover:bg-accent transition-colors cursor-pointer"
            onClick={() => handleEditPersona(persona)}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-sans font-medium text-foreground truncate">{persona.name}</h3>
                  {isCustomPersona(persona.id) && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground border border-border">
                      Custom
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{persona.description}</p>

                {/* Trait badges */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {persona.traits.slice(0, 3).map((trait) => (
                    <Badge
                      key={trait}
                      className="text-xs px-2 py-1 bg-primary/10 text-primary border border-primary/20"
                    >
                      {trait}
                    </Badge>
                  ))}
                  {persona.traits.length > 3 && (
                    <Badge className="text-xs px-2 py-1 bg-muted text-muted-foreground">
                      +{persona.traits.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              {isCustomPersona(persona.id) && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="min-h-[44px] min-w-[44px] flex-shrink-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeletePersona(persona.id)
                  }}
                  aria-label={`Delete ${persona.name}`}
                >
                  <MoreVertical className="h-5 w-5 text-muted-foreground" />
                </Button>
              )}
            </div>
          </Card>
        ))}

        {filteredPersonas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No personas found</p>
          </div>
        )}
      </div>

      {/* Sticky footer */}
      <footer className="sticky bottom-0 z-10 bg-background/95 backdrop-blur-sm border-t border-border p-4">
        <Button
          size="lg"
          className="w-full min-h-[56px] bg-primary text-primary-foreground"
          onClick={handleCreatePersona}
        >
          Create New Persona
        </Button>
      </footer>

      {/* Persona editor modal */}
      <PersonaEditorModal
        open={editorOpen}
        onOpenChange={setEditorOpen}
        persona={editingPersona}
        onSave={handleSavePersona}
        mode={editorMode}
      />
    </div>
  )
}

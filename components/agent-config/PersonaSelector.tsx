"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useDevice } from "@/contexts/DeviceProvider"
import { Search, User, Plus } from "lucide-react"
import { PERSONAS } from "@/lib/agent-config/personas"
import { PersonaEditorModal } from "@/components/module-libraries/PersonaEditorModal"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface PersonaSelectorProps {
  selectedPersonaId?: string
  onPersonaSelect: (personaId: string) => void
}

export function PersonaSelector({ selectedPersonaId, onPersonaSelect }: PersonaSelectorProps) {
  const { isMobile } = useDevice()
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const filteredPersonas = PERSONAS.filter(
    (persona) =>
      persona.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      persona.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      persona.communicationStyle.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreatePersona = (newPersona: any) => {
    console.log("[v0] Created new persona:", newPersona)
    // Auto-select the newly created persona
    if (newPersona.id) {
      onPersonaSelect(newPersona.id)
      toast.success(`Persona "${newPersona.name}" created and selected!`)
    }
  }

  return (
    <div className="space-y-4 md:space-y-6 h-full flex flex-col">
      <div className="flex-shrink-0">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div className="flex items-center gap-2 md:gap-3">
            <User className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
            <h3 className="text-base md:text-lg font-semibold">Choose Personality Style</h3>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-1 bg-transparent"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Create New</span>
          </Button>
        </div>
        <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
          Select how your agent communicates and makes decisions
        </p>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search personas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 min-h-[48px]"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {filteredPersonas.map((persona) => (
            <motion.div key={persona.id} whileHover={isMobile ? undefined : { scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card
                className={`cursor-pointer transition-all duration-200 min-h-[80px] ${
                  selectedPersonaId === persona.id
                    ? "ring-2 ring-primary border-primary bg-primary/5"
                    : isMobile
                      ? "active:border-primary/50"
                      : "hover:border-primary/50"
                }`}
                onClick={() => onPersonaSelect(persona.id)}
              >
                <CardHeader className="pb-2 p-3 md:pb-3 md:p-4">
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-sm md:text-base flex items-center gap-2 min-w-0 flex-1">
                      <span className="text-base md:text-lg flex-shrink-0">{persona.icon}</span>
                      <span className="truncate">{persona.name}</span>
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs flex-shrink-0">
                      {persona.decisionMaking}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs md:text-sm line-clamp-2">{persona.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0 p-3 md:pt-0 md:p-4">
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Communication</p>
                      <p className="text-xs md:text-sm line-clamp-1">{persona.communicationStyle}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Strengths</p>
                      <div className="flex flex-wrap gap-1">
                        {persona.traits.slice(0, 3).map((strength) => (
                          <Badge key={strength} variant="outline" className="text-xs">
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <PersonaEditorModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onSave={handleCreatePersona}
        mode="create"
      />
    </div>
  )
}

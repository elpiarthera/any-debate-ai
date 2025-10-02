"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, User } from "lucide-react"
import { PERSONAS } from "@/lib/agent-config/personas"

interface PersonaSelectorProps {
  selectedPersonaId?: string
  onPersonaSelect: (personaId: string) => void
}

export function PersonaSelector({ selectedPersonaId, onPersonaSelect }: PersonaSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPersonas = PERSONAS.filter(
    (persona) =>
      persona.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      persona.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      persona.communicationStyle.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex-shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <User className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Choose Personality Style</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Select how your agent communicates and makes decisions</p>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search personas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPersonas.map((persona) => (
            <motion.div key={persona.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card
                className={`cursor-pointer transition-all duration-200 ${
                  selectedPersonaId === persona.id
                    ? "ring-2 ring-primary border-primary bg-primary/5"
                    : "hover:border-primary/50"
                }`}
                onClick={() => onPersonaSelect(persona.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span className="text-lg">{persona.icon}</span>
                      {persona.name}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {persona.decisionMaking}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">{persona.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Communication Style</p>
                      <p className="text-sm">{persona.communicationStyle}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Key Strengths</p>
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
    </div>
  )
}

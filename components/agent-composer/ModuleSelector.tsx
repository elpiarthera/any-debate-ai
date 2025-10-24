"use client"

import { useState } from "react"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { useDevice } from "@/contexts/DeviceProvider"
import { ModuleCard } from "./ModuleCard"

interface Module {
  id: string
  name: string
  description: string
  icon: string
  badge?: string
}

interface ModuleSelectorProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  modules: Module[]
  selectedId?: string
  onSelect: (id: string) => void
}

export function ModuleSelector({
  isOpen,
  onClose,
  title,
  description,
  modules,
  selectedId,
  onSelect,
}: ModuleSelectorProps) {
  const { isMobile } = useDevice()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredModules = modules.filter(
    (module) =>
      module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSelect = (id: string) => {
    onSelect(id)
    onClose()
  }

  return (
    <AdaptiveModal isOpen={isOpen} onClose={onClose} title={title} description={description} className="max-w-3xl">
      <div className="flex flex-col h-[60vh] gap-4">
        <div className="flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 min-h-[48px]"
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <Badge variant="secondary" className="text-xs">
              {filteredModules.length} {filteredModules.length === 1 ? "module" : "modules"}
            </Badge>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="space-y-2 pr-4">
            {filteredModules.map((module) => (
              <div key={module.id} onClick={() => handleSelect(module.id)} className="cursor-pointer">
                <ModuleCard
                  type="role"
                  icon={module.icon}
                  name={module.name}
                  description={module.description}
                  badge={module.badge}
                  isSelected={selectedId === module.id}
                />
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex-shrink-0 flex items-center gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose} className="flex-1 min-h-[48px] bg-transparent">
            Cancel
          </Button>
        </div>
      </div>
    </AdaptiveModal>
  )
}

"use client"

import { useState } from "react"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Grid3x3, Plus } from "lucide-react"
import { useDevice } from "@/contexts/DeviceProvider"
import { ModuleCard } from "./ModuleCard"
import { RoleForm } from "@/components/module-libraries/forms/RoleForm"
import { PersonaForm } from "@/components/module-libraries/forms/PersonaForm"
import { FrameworkForm } from "@/components/module-libraries/forms/FrameworkForm"

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
  moduleType: "role" | "persona" | "framework"
  onCreateModule?: (module: any) => void
}

export function ModuleSelector({
  isOpen,
  onClose,
  title,
  description,
  modules,
  selectedId,
  onSelect,
  moduleType,
  onCreateModule,
}: ModuleSelectorProps) {
  const { isMobile } = useDevice()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"browse" | "create">("browse")

  const filteredModules = modules.filter(
    (module) =>
      module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  console.log("[v0] ModuleSelector render - moduleType:", moduleType)
  console.log("[v0] Total modules:", modules.length)
  console.log("[v0] Filtered modules:", filteredModules.length)
  console.log("[v0] First 3 modules:", modules.slice(0, 3))

  const handleSelect = (id: string) => {
    onSelect(id)
    onClose()
  }

  const handleCreateModule = (moduleData: any) => {
    if (onCreateModule) {
      const newModule = onCreateModule(moduleData)
      if (newModule?.id) {
        onSelect(newModule.id)
      }
    }
    onClose()
  }

  const handleCancelCreate = () => {
    setActiveTab("browse")
  }

  return (
    <AdaptiveModal isOpen={isOpen} onClose={onClose} title={title} description={description} className="max-w-3xl">
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "browse" | "create")}
        className="flex flex-col h-[70vh]"
      >
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="browse" className="flex items-center gap-2">
            <Grid3x3 className="h-4 w-4" />
            <span>Browse Library</span>
          </TabsTrigger>
          <TabsTrigger value="create" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>Create New</span>
          </TabsTrigger>
        </TabsList>

        {/* Browse Tab */}
        <TabsContent value="browse" className="flex-1 overflow-hidden mt-0 flex flex-col gap-4">
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
              {filteredModules.length === 0 ? (
                <div className="flex items-center justify-center py-12 text-center">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">No modules found</p>
                    <p className="text-xs text-muted-foreground">Try adjusting your search</p>
                  </div>
                </div>
              ) : (
                filteredModules.map((module) => (
                  <div key={module.id} onClick={() => handleSelect(module.id)} className="cursor-pointer">
                    <ModuleCard
                      type={moduleType}
                      icon={module.icon}
                      name={module.name}
                      description={module.description}
                      badge={module.badge}
                      isSelected={selectedId === module.id}
                    />
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          <div className="flex-shrink-0 flex items-center gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="flex-1 min-h-[48px] bg-transparent">
              Cancel
            </Button>
          </div>
        </TabsContent>

        {/* Create Tab */}
        <TabsContent value="create" className="flex-1 overflow-hidden mt-0">
          <ScrollArea className="h-full">
            <div className="pr-4">
              {moduleType === "role" && onCreateModule && (
                <RoleForm mode="create" onSave={handleCreateModule} onCancel={handleCancelCreate} />
              )}
              {moduleType === "persona" && onCreateModule && (
                <PersonaForm mode="create" onSave={handleCreateModule} onCancel={handleCancelCreate} />
              )}
              {moduleType === "framework" && onCreateModule && (
                <FrameworkForm mode="create" onSave={handleCreateModule} onCancel={handleCancelCreate} />
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </AdaptiveModal>
  )
}

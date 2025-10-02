"use client"

import { useState, useMemo, useCallback } from "react"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Zap, Grid3x3 } from "lucide-react"
import { BUILT_IN_TEMPLATES } from "@/lib/templates/built-in"
import { TemplateStorage } from "@/lib/templates/storage"
import { filterTemplates, sortTemplatesByPopularity } from "@/lib/templates/utils"
import type { DebateTemplate, TemplateCategory } from "@/lib/templates/types"
import { useDevice } from "@/contexts/DeviceProvider"
import { TemplateSearchBar } from "./shared/TemplateSearchBar"
import { TemplateCategoryChips } from "./shared/TemplateCategoryChips"
import { TemplateListMobile } from "./mobile/TemplateListMobile"
import { TemplateDetailMobile } from "./mobile/TemplateDetailMobile"
import { TemplateListDesktop } from "./desktop/TemplateListDesktop"
import { QuickStartPanel } from "./QuickStartPanel"
import type { QuickStartScenario, AgentTeamPreset } from "@/lib/templates/presets"

interface TemplateSelectorModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (template: DebateTemplate) => void
}

const TEMPLATE_CATEGORIES: (TemplateCategory | "All")[] = [
  "All",
  "General Purpose",
  "Business Strategy",
  "Product Development",
  "Technology & Engineering",
  "Creative & Design",
  "Research & Analysis",
  "Education & Training",
  "Healthcare & Science",
]

export function TemplateSelectorModal({ isOpen, onClose, onSelectTemplate }: TemplateSelectorModalProps) {
  const { isMobile } = useDevice()
  const [activeTab, setActiveTab] = useState<"quick-start" | "templates">("quick-start")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | "All">("All")
  const [selectedTemplate, setSelectedTemplate] = useState<DebateTemplate | null>(null)
  const [showCustomOnly, setShowCustomOnly] = useState(false)
  const [showMobileDetail, setShowMobileDetail] = useState(false)

  const allTemplates = useMemo(() => {
    const customTemplates = TemplateStorage.getCustomTemplates()
    return showCustomOnly ? customTemplates : [...BUILT_IN_TEMPLATES, ...customTemplates]
  }, [showCustomOnly])

  const sortedTemplates = useMemo(() => {
    const filteredTemplates = filterTemplates(allTemplates, {
      category: selectedCategory === "All" ? undefined : selectedCategory,
      searchQuery,
      isCustom: showCustomOnly ? true : undefined,
    })
    return sortTemplatesByPopularity(filteredTemplates)
  }, [allTemplates, selectedCategory, searchQuery, showCustomOnly])

  const handleSelectTemplate = useCallback(
    (template: DebateTemplate) => {
      TemplateStorage.incrementTemplateUsage(template.id)
      onSelectTemplate(template)
      onClose()
    },
    [onSelectTemplate, onClose],
  )

  const handleTemplateClick = useCallback(
    (template: DebateTemplate) => {
      setSelectedTemplate(template)
      if (isMobile) {
        setShowMobileDetail(true)
      }
    },
    [isMobile],
  )

  const handleBackToList = useCallback(() => {
    setShowMobileDetail(false)
  }, [])

  const handleToggleCustomOnly = useCallback(() => {
    setShowCustomOnly((prev) => !prev)
  }, [])

  const handleSelectScenario = useCallback(
    (scenario: QuickStartScenario) => {
      const template: DebateTemplate = {
        id: scenario.id,
        name: scenario.name,
        description: scenario.description,
        category: scenario.category as TemplateCategory,
        agents: scenario.agents,
        isCustom: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      handleSelectTemplate(template)
    },
    [handleSelectTemplate],
  )

  const handleSelectPreset = useCallback(
    (preset: AgentTeamPreset) => {
      const template: DebateTemplate = {
        id: preset.id,
        name: preset.name,
        description: preset.description,
        category: "General Purpose",
        agents: preset.agents,
        isCustom: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      handleSelectTemplate(template)
    },
    [handleSelectTemplate],
  )

  const handleStartFromScratch = useCallback(() => {
    onClose()
  }, [onClose])

  if (isMobile && showMobileDetail && selectedTemplate) {
    return (
      <AdaptiveModal
        isOpen={isOpen}
        onClose={onClose}
        title={selectedTemplate.name}
        description={selectedTemplate.description}
        className="max-w-full"
      >
        <TemplateDetailMobile
          template={selectedTemplate}
          onBack={handleBackToList}
          onSelect={() => handleSelectTemplate(selectedTemplate)}
        />
      </AdaptiveModal>
    )
  }

  return (
    <AdaptiveModal
      isOpen={isOpen}
      onClose={onClose}
      title="Choose a Template"
      description="Start with a pre-configured agent team or quick-start scenario"
      className="max-w-6xl"
    >
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "quick-start" | "templates")}
        className="flex flex-col h-[70vh]"
      >
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="quick-start" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline">Quick Start</span>
            <span className="sm:hidden">Quick</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Grid3x3 className="h-4 w-4" />
            <span>Templates</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quick-start" className="flex-1 overflow-hidden mt-0">
          <QuickStartPanel
            onSelectScenario={handleSelectScenario}
            onSelectPreset={handleSelectPreset}
            onStartFromScratch={handleStartFromScratch}
          />
        </TabsContent>

        <TabsContent value="templates" className="flex-1 overflow-hidden mt-0 flex flex-col gap-4">
          <div className="flex-shrink-0 space-y-3">
            <TemplateSearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={isMobile ? "Search templates..." : "Search templates by name, description, or tags..."}
            />

            <TemplateCategoryChips
              categories={TEMPLATE_CATEGORIES}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            <div className="flex items-center justify-between gap-2">
              <Button
                variant={showCustomOnly ? "default" : "outline"}
                size="sm"
                onClick={handleToggleCustomOnly}
                className="text-xs h-9 px-3 min-h-[36px]"
              >
                <Star className={`h-3.5 w-3.5 ${showCustomOnly ? "mr-1.5 fill-current" : ""}`} />
                {showCustomOnly && <span className="ml-1">Custom</span>}
              </Button>
              <Badge variant="secondary" className="text-xs px-2 py-1">
                {sortedTemplates.length} {sortedTemplates.length === 1 ? "template" : "templates"}
              </Badge>
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            {isMobile ? (
              <TemplateListMobile
                templates={sortedTemplates}
                selectedTemplate={selectedTemplate}
                onSelectTemplate={handleTemplateClick}
              />
            ) : (
              <TemplateListDesktop
                templates={sortedTemplates}
                selectedTemplate={selectedTemplate}
                onSelectTemplate={setSelectedTemplate}
                onUseTemplate={handleSelectTemplate}
              />
            )}
          </div>

          {isMobile && (
            <div className="flex-shrink-0 flex items-center gap-3 pt-4 border-t">
              <Button variant="outline" onClick={onClose} className="flex-1 min-h-[48px] bg-transparent">
                Cancel
              </Button>
              <Button
                onClick={() => selectedTemplate && setShowMobileDetail(true)}
                disabled={!selectedTemplate}
                className="flex-1 min-h-[48px]"
              >
                Preview
              </Button>
            </div>
          )}

          {!isMobile && (
            <div className="flex-shrink-0 pt-4 border-t">
              <Button variant="outline" onClick={onClose} className="w-full bg-transparent">
                Cancel
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </AdaptiveModal>
  )
}

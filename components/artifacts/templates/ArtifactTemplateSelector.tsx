"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useDevice } from "@/contexts/DeviceProvider"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, FileText, Table, CheckSquare, BarChart3, Sparkles } from "lucide-react"
import { allTemplates, searchTemplates, templateCategories, type ArtifactTemplate } from "@/lib/artifacts/templates"
import { toast } from "sonner"

interface ArtifactTemplateSelectorProps {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (template: ArtifactTemplate) => void
}

export function ArtifactTemplateSelector({ isOpen, onClose, onSelectTemplate }: ArtifactTemplateSelectorProps) {
  const { isMobile } = useDevice()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedType, setSelectedType] = useState<ArtifactTemplate["type"] | "all">("all")
  const [previewTemplate, setPreviewTemplate] = useState<ArtifactTemplate | null>(null)

  const filteredTemplates = (() => {
    let templates = searchQuery ? searchTemplates(searchQuery) : allTemplates

    if (selectedType !== "all") {
      templates = templates.filter((t) => t.type === selectedType)
    }

    if (selectedCategory !== "All") {
      templates = templates.filter((t) => t.category === selectedCategory)
    }

    return templates
  })()

  const handleSelectTemplate = (template: ArtifactTemplate) => {
    onSelectTemplate(template)
    toast.success(`Created ${template.name}`)
    onClose()
  }

  const getTypeIcon = (type: ArtifactTemplate["type"]) => {
    switch (type) {
      case "document":
        return <FileText className="h-4 w-4" />
      case "data-table":
        return <Table className="h-4 w-4" />
      case "checklist":
        return <CheckSquare className="h-4 w-4" />
      case "chart":
        return <BarChart3 className="h-4 w-4" />
    }
  }

  return (
    <AdaptiveModal
      isOpen={isOpen}
      onClose={onClose}
      title="Choose Template"
      description="Start with a pre-built template or create from scratch"
    >
      <div className={`space-y-4 ${isMobile ? "p-4" : "p-6"}`}>
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`pl-10 ${isMobile ? "min-h-[48px]" : "min-h-[44px]"}`}
          />
        </div>

        {/* Type Tabs */}
        <Tabs value={selectedType} onValueChange={(value) => setSelectedType(value as any)}>
          <TabsList className={`grid w-full ${isMobile ? "grid-cols-2" : "grid-cols-5"}`}>
            <TabsTrigger value="all" className={isMobile ? "text-xs" : ""}>
              All
            </TabsTrigger>
            <TabsTrigger value="document" className={isMobile ? "text-xs" : ""}>
              {!isMobile && <FileText className="h-3 w-3 mr-1" />}
              Docs
            </TabsTrigger>
            <TabsTrigger value="data-table" className={isMobile ? "text-xs" : ""}>
              {!isMobile && <Table className="h-3 w-3 mr-1" />}
              Tables
            </TabsTrigger>
            <TabsTrigger value="checklist" className={isMobile ? "text-xs" : ""}>
              {!isMobile && <CheckSquare className="h-3 w-3 mr-1" />}
              Lists
            </TabsTrigger>
            <TabsTrigger value="chart" className={isMobile ? "text-xs" : ""}>
              {!isMobile && <BarChart3 className="h-3 w-3 mr-1" />}
              Charts
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Category Filters */}
        <ScrollArea className="w-full">
          <div className="flex gap-2 pb-2">
            <Button
              variant={selectedCategory === "All" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("All")}
              className={isMobile ? "min-h-[44px]" : ""}
            >
              All
            </Button>
            {templateCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={isMobile ? "min-h-[44px] whitespace-nowrap" : "whitespace-nowrap"}
              >
                {category}
              </Button>
            ))}
          </div>
        </ScrollArea>

        {/* Templates Grid */}
        <ScrollArea className={isMobile ? "h-[400px]" : "h-[500px]"}>
          <div className={`grid gap-3 ${isMobile ? "grid-cols-1" : "grid-cols-2"}`}>
            <AnimatePresence mode="popLayout">
              {filteredTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                >
                  <Card
                    className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                      isMobile ? "min-h-[80px]" : ""
                    } ${previewTemplate?.id === template.id ? "border-primary bg-primary/5" : ""}`}
                    onClick={() => (isMobile ? handleSelectTemplate(template) : setPreviewTemplate(template))}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl flex-shrink-0">{template.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-sm truncate">{template.name}</h4>
                          {getTypeIcon(template.type)}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{template.description}</p>
                        <div className="flex items-center gap-1 mt-2 flex-wrap">
                          <Badge variant="secondary" className="text-xs">
                            {template.category}
                          </Badge>
                          {template.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredTemplates.length === 0 && (
              <div className="col-span-full text-center py-12">
                <Sparkles className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                <p className="text-muted-foreground">No templates found</p>
                <p className="text-sm text-muted-foreground/70 mt-1">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Desktop Preview & Actions */}
        {!isMobile && previewTemplate && (
          <Card className="p-4 bg-muted/20 border-border/50">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{previewTemplate.icon}</span>
                  <h4 className="font-medium">{previewTemplate.name}</h4>
                  <Badge variant="secondary">{previewTemplate.type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{previewTemplate.description}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {previewTemplate.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button onClick={() => handleSelectTemplate(previewTemplate)} className="min-h-[44px]">
                Use Template
              </Button>
            </div>
          </Card>
        )}

        {/* Mobile Actions */}
        {isMobile && (
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={onClose} className="flex-1 min-h-[48px] bg-transparent">
              Cancel
            </Button>
          </div>
        )}
      </div>
    </AdaptiveModal>
  )
}

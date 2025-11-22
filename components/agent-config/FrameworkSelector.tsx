"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Brain, Plus } from "lucide-react"
import { FRAMEWORKS, FRAMEWORK_CATEGORIES } from "@/lib/agent-config/frameworks"
import { FrameworkEditorModal } from "@/components/module-libraries/FrameworkEditorModal"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface FrameworkSelectorProps {
  selectedFrameworkId?: string
  onFrameworkSelect: (frameworkId: string) => void
}

export function FrameworkSelector({ selectedFrameworkId, onFrameworkSelect }: FrameworkSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const filteredFrameworks = FRAMEWORKS.filter((framework) => {
    const matchesSearch =
      framework.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      framework.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      framework.bestFor.some((useCase) => useCase.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory =
      selectedCategory === "all" ||
      framework.bestFor.some((use) => use.toLowerCase().includes(selectedCategory.toLowerCase()))

    return matchesSearch && matchesCategory
  })

  const handleCreateFramework = (newFramework: any) => {
    console.log("[v0] Created new framework:", newFramework)
    // Auto-select the newly created framework
    if (newFramework.id) {
      onFrameworkSelect(newFramework.id)
      toast.success(`Framework "${newFramework.name}" created and selected!`)
    }
  }

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Brain className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Select Thinking Framework</h3>
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
        <p className="text-sm text-muted-foreground mb-4">
          Choose how your agent approaches problems and makes decisions
        </p>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search frameworks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" className="text-xs">
              All
            </TabsTrigger>
            {FRAMEWORK_CATEGORIES.slice(0, 3).map((category) => (
              <TabsTrigger key={category} value={category} className="text-xs">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFrameworks.map((framework) => (
            <motion.div key={framework.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card
                className={`cursor-pointer transition-all duration-200 ${
                  selectedFrameworkId === framework.id
                    ? "ring-2 ring-primary border-primary bg-primary/5"
                    : "hover:border-primary/50"
                }`}
                onClick={() => onFrameworkSelect(framework.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span className="text-lg">{framework.icon}</span>
                      {framework.name}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {framework.bestFor[0]}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">{framework.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Key Steps</p>
                      <div className="text-sm">
                        {framework.steps.slice(0, 2).join(" → ")}
                        {framework.steps.length > 2 && "..."}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Best For</p>
                      <div className="flex flex-wrap gap-1">
                        {framework.bestFor.slice(0, 2).map((useCase) => (
                          <Badge key={useCase} variant="outline" className="text-xs">
                            {useCase}
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

      <FrameworkEditorModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onSave={handleCreateFramework}
        mode="create"
      />
    </div>
  )
}

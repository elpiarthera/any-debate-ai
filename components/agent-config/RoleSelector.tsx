"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useDevice } from "@/contexts/DeviceProvider"
import {
  Search,
  Users,
  Briefcase,
  Palette,
  BarChart3,
  Megaphone,
  GraduationCap,
  Stethoscope,
  Scale,
} from "lucide-react"
import {
  PROFESSIONAL_ROLES,
  ROLE_CATEGORIES,
  getRolesByCategory,
  searchRoles,
  getRoleById,
} from "@/lib/agent-config/roles"

interface RoleSelectorProps {
  selectedRoleId?: string
  onRoleSelect: (roleId: string) => void
}

const categoryIcons: Record<string, any> = {
  "Business & Strategy": Briefcase,
  "Technology & Engineering": Users,
  "Creative & Design": Palette,
  "Research & Analysis": BarChart3,
  "Communication & Media": Megaphone,
  "Education & Training": GraduationCap,
  "Healthcare & Science": Stethoscope,
  "Legal & Compliance": Scale,
}

export function RoleSelector({ selectedRoleId, onRoleSelect }: RoleSelectorProps) {
  const { isMobile } = useDevice()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredRoles = searchQuery
    ? searchRoles(searchQuery)
    : selectedCategory
      ? getRolesByCategory(selectedCategory)
      : PROFESSIONAL_ROLES

  const selectedRole = selectedRoleId ? getRoleById(selectedRoleId) : null

  return (
    <div className="h-full flex flex-col space-y-3 md:space-y-4">
      <div className="flex-shrink-0">
        <h3 className="text-base md:text-lg font-semibold mb-2">Choose Professional Role</h3>
        <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
          Select the professional expertise and domain knowledge for your AI agent
        </p>

        {/* Search */}
        <div className="relative mb-3 md:mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search roles by name, description, or expertise..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 min-h-[48px]"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap scrollbar-hide">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className="min-h-[44px] flex-shrink-0 whitespace-nowrap"
          >
            All Categories
          </Button>
          {ROLE_CATEGORIES.map((category) => {
            const Icon = categoryIcons[category]
            return (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="flex items-center gap-1 min-h-[44px] flex-shrink-0 whitespace-nowrap"
              >
                <Icon className="h-3 w-3 flex-shrink-0" />
                <span className="hidden md:inline">{category}</span>
                <span className="md:hidden">{category.split(" ")[0]}</span>
              </Button>
            )
          })}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 overflow-hidden">
        {/* Role List */}
        <ScrollArea className="h-full">
          <div className="space-y-2 md:space-y-3 pr-2 md:pr-4">
            {filteredRoles.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={`cursor-pointer transition-all min-h-[80px] ${
                    isMobile ? "active:scale-[0.98]" : "hover:shadow-md"
                  } ${selectedRoleId === role.id ? "ring-2 ring-primary bg-primary/5" : ""}`}
                  onClick={() => onRoleSelect(role.id)}
                >
                  <CardHeader className="pb-2 p-3 md:p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-base md:text-lg flex-shrink-0">{role.icon}</span>
                      <CardTitle className="text-sm md:text-base min-w-0 flex-1">{role.name}</CardTitle>
                      <Badge variant="secondary" className="text-xs flex-shrink-0">
                        {role.category.split(" ")[0]}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs md:text-sm line-clamp-2">{role.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 p-3 md:p-4">
                    <div className="flex flex-wrap gap-1">
                      {role.expertise.slice(0, isMobile ? 2 : 3).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {role.expertise.length > (isMobile ? 2 : 3) && (
                        <Badge variant="outline" className="text-xs">
                          +{role.expertise.length - (isMobile ? 2 : 3)}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollArea>

        {/* Selected Role Details */}
        {!isMobile && (
          <div className="border-l pl-4">
            {selectedRole ? (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selectedRole.icon}</span>
                  <div>
                    <h4 className="text-lg font-semibold">{selectedRole.name}</h4>
                    <Badge variant="secondary">{selectedRole.category}</Badge>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{selectedRole.description}</p>

                <div>
                  <h5 className="font-medium mb-2">Core Expertise</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedRole.expertise.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-2">AI Behavior</h5>
                  <div className="bg-muted/50 rounded-lg p-3 text-sm">{selectedRole.systemPrompt}</div>
                </div>
              </motion.div>
            ) : (
              <div className="flex items-center justify-center h-full text-center">
                <div className="space-y-2">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">Select a role to see details</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

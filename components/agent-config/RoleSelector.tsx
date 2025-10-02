"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
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
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredRoles = searchQuery
    ? searchRoles(searchQuery)
    : selectedCategory
      ? getRolesByCategory(selectedCategory)
      : PROFESSIONAL_ROLES

  const selectedRole = selectedRoleId ? getRoleById(selectedRoleId) : null

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex-shrink-0">
        <h3 className="text-lg font-semibold mb-2">Choose Professional Role</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Select the professional expertise and domain knowledge for your AI agent
        </p>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search roles by name, description, or expertise..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
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
                className="flex items-center gap-1"
              >
                <Icon className="h-3 w-3" />
                {category}
              </Button>
            )
          })}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-hidden">
        {/* Role List */}
        <ScrollArea className="h-full">
          <div className="space-y-3 pr-4">
            {filteredRoles.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedRoleId === role.id ? "ring-2 ring-primary bg-primary/5" : ""
                  }`}
                  onClick={() => onRoleSelect(role.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{role.icon}</span>
                      <CardTitle className="text-base">{role.name}</CardTitle>
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {role.category}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm">{role.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-1">
                      {role.expertise.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {role.expertise.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{role.expertise.length - 3} more
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
      </div>
    </div>
  )
}

"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Users, Zap, TrendingUp, Brain } from "lucide-react"
import { useDevice } from "@/contexts/DeviceProvider"

const templates = [
  {
    id: "1",
    title: "Product Strategy Debate",
    description: "Evaluate product decisions with multiple AI perspectives",
    category: "Business",
    participants: 3,
    icon: TrendingUp,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    id: "2",
    title: "Technical Architecture Review",
    description: "Discuss system design and architecture choices",
    category: "Engineering",
    participants: 2,
    icon: Brain,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    id: "3",
    title: "Marketing Campaign Analysis",
    description: "Brainstorm and evaluate marketing strategies",
    category: "Marketing",
    participants: 4,
    icon: Zap,
    color: "bg-yellow-500/10 text-yellow-500",
  },
  {
    id: "4",
    title: "Research Discussion",
    description: "Explore research topics with AI experts",
    category: "Research",
    participants: 2,
    icon: FileText,
    color: "bg-green-500/10 text-green-500",
  },
]

export function TemplateLibrary() {
  const { isMobile } = useDevice()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Debate Templates</h2>
          <p className="text-muted-foreground">Start with pre-configured debate scenarios</p>
        </div>
      </div>

      <div className={`grid gap-4 ${isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}>
        {templates.map((template, index) => {
          const Icon = template.icon
          return (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-lg ${template.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge variant="secondary">{template.category}</Badge>
                  </div>
                  <CardTitle className="mt-4">{template.title}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{template.participants} participants</span>
                    </div>
                    <Button size="sm">Use Template</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

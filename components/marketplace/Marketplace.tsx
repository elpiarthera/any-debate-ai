"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Download, Users, Zap, Brain, MessageSquare } from "lucide-react"
import { useDevice } from "@/contexts/DeviceProvider"

const marketplaceItems = [
  {
    id: "1",
    title: "Expert Analyst Agent",
    description: "Specialized in data analysis and insights",
    category: "Agent",
    rating: 4.8,
    downloads: 1234,
    icon: Brain,
    color: "bg-purple-500/10 text-purple-500",
    price: "Free",
  },
  {
    id: "2",
    title: "Debate Moderator",
    description: "Keeps discussions on track and balanced",
    category: "Agent",
    rating: 4.9,
    downloads: 2341,
    icon: Users,
    color: "bg-blue-500/10 text-blue-500",
    price: "Free",
  },
  {
    id: "3",
    title: "Quick Start Pack",
    description: "Collection of popular debate templates",
    category: "Template Pack",
    rating: 4.7,
    downloads: 3456,
    icon: Zap,
    color: "bg-yellow-500/10 text-yellow-500",
    price: "Free",
  },
  {
    id: "4",
    title: "Advanced Reasoning Agent",
    description: "Deep analytical thinking and problem solving",
    category: "Agent",
    rating: 4.9,
    downloads: 987,
    icon: MessageSquare,
    color: "bg-green-500/10 text-green-500",
    price: "Premium",
  },
]

export function Marketplace() {
  const { isMobile } = useDevice()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Marketplace</h2>
        <p className="text-muted-foreground">Discover agents, templates, and extensions</p>
      </div>

      <div className={`grid gap-4 ${isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}>
        {marketplaceItems.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-lg ${item.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge variant={item.price === "Free" ? "secondary" : "default"}>{item.price}</Badge>
                  </div>
                  <CardTitle className="mt-4">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        <span className="font-medium">{item.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Download className="h-4 w-4" />
                        <span>{item.downloads.toLocaleString()}</span>
                      </div>
                    </div>
                    <Button className="w-full bg-transparent" variant="outline">
                      Install
                    </Button>
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

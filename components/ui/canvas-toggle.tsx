"use client"

import { useState } from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Layers } from "lucide-react"

interface CanvasToggleProps {
  isCanvasOpen: boolean
  onToggleCanvas: (open: boolean) => void
}

export function CanvasToggle({ isCanvasOpen, onToggleCanvas }: CanvasToggleProps) {
  const [collaboratingAgents] = useState<string[]>([]) // Mock collaboration state

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant={isCanvasOpen ? "default" : "outline"}
        size="sm"
        onClick={() => onToggleCanvas(!isCanvasOpen)}
        className="flex items-center gap-2 relative"
      >
        <motion.div animate={isCanvasOpen ? { rotate: 360 } : {}} transition={{ duration: 0.5 }}>
          <Layers className="h-4 w-4" />
        </motion.div>
        Canvas
        {collaboratingAgents.length > 0 && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1">
            <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-xs animate-pulse">
              {collaboratingAgents.length}
            </Badge>
          </motion.div>
        )}
      </Button>
    </motion.div>
  )
}

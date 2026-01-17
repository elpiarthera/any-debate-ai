"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useDemoMode } from "@/contexts/DemoContext"
import { LandingPage } from "@/components/landing/LandingPage"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RootPage() {
  const { isDemoMode } = useDemoMode()
  const router = useRouter()

  useEffect(() => {
    if (!isDemoMode) {
      router.push("/dashboard")
    }
  }, [isDemoMode, router])

  return (
    <AnimatePresence mode="wait">
      {isDemoMode && (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LandingPage />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

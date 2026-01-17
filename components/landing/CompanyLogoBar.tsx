"use client"

import { useDevice } from "@/contexts/DeviceProvider"
import { motion } from "framer-motion"

const companies = [
  { name: "OpenAI", logo: "OpenAI" },
  { name: "Anthropic", logo: "Anthropic" },
  { name: "Meta", logo: "Meta" },
  { name: "Google", logo: "Google" },
  { name: "Microsoft", logo: "Microsoft" },
]

export function CompanyLogoBar() {
  const { isMobile } = useDevice()

  return (
    <div className="space-y-6">
      <p className="text-center text-sm text-muted-foreground">Powered by industry-leading AI models</p>

      <div
        className={`
        flex flex-wrap justify-center items-center
        ${isMobile ? "gap-4" : "gap-6 md:gap-12"}
      `}
      >
        {companies.map((company, index) => (
          <motion.div
            key={company.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`
              font-bold text-muted-foreground/60 hover:text-foreground/80 transition-colors
              ${isMobile ? "text-base" : "text-lg md:text-xl"}
            `}
          >
            {company.logo}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

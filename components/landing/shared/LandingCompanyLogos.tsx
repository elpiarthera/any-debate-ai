"use client"

import { motion } from "framer-motion"
import { CompanyLogoBar } from "../CompanyLogoBar"

export function LandingCompanyLogos() {
  return (
    <section className="py-12 sm:py-16 border-t border-border/20" data-section="company-logos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <CompanyLogoBar />
        </motion.div>
      </div>
    </section>
  )
}

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { DemoProvider } from "@/contexts/DemoContext"
import { DeviceProvider } from "@/contexts/DeviceProvider"
import { TooltipPreferencesProvider } from "@/contexts/TooltipPreferencesContext"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "AnyDebate AI - AI Collaboration Platform",
  description:
    "The complete platform for AI collaboration. Deploy multiple AI agents, create collaborative workspaces, and accelerate innovation.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark overflow-x-hidden`} suppressHydrationWarning>
      <body className="overflow-x-hidden">
        <DeviceProvider>
          <DemoProvider>
            <TooltipPreferencesProvider>{children}</TooltipPreferencesProvider>
          </DemoProvider>
        </DeviceProvider>
      </body>
    </html>
  )
}

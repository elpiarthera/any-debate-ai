"use client"

import { useDemoMode } from "@/contexts/DemoContext"
import { useDevice } from "@/contexts/DeviceProvider"
import { ExitIntentPopup } from "./ExitIntentPopup"

import { LandingHeroMobile } from "./mobile/LandingHeroMobile"
import { LandingStatsMobile } from "./mobile/LandingStatsMobile"
import { LandingBenefitsMobile } from "./mobile/LandingBenefitsMobile"
import { LandingProblemSolutionMobile } from "./mobile/LandingProblemSolutionMobile"
import { LandingFeaturesMobile } from "./mobile/LandingFeaturesMobile"

import { LandingHeroDesktop } from "./desktop/LandingHeroDesktop"
import { LandingStatsDesktop } from "./desktop/LandingStatsDesktop"
import { LandingBenefitsDesktop } from "./desktop/LandingBenefitsDesktop"
import { LandingProblemSolutionDesktop } from "./desktop/LandingProblemSolutionDesktop"
import { LandingFeaturesDesktop } from "./desktop/LandingFeaturesDesktop"

import { LandingDemo } from "./shared/LandingDemo"
import { LandingSocialProof } from "./shared/LandingSocialProof"
import { LandingCompanyLogos } from "./shared/LandingCompanyLogos"
import { LandingFinalCTA } from "./shared/LandingFinalCTA"

export function LandingPage() {
  const { setDemoMode } = useDemoMode()
  const { isMobile } = useDevice()

  const handleStartDemo = () => {
    setDemoMode(false)
  }

  const handleWatchDemo = () => {
    document.getElementById("interactive-demo")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background grid-pattern-large">
      <ExitIntentPopup trigger="mouse-leave" showOnce={true} />

      {isMobile ? (
        <LandingHeroMobile onStartDemo={handleStartDemo} onWatchDemo={handleWatchDemo} />
      ) : (
        <LandingHeroDesktop onStartDemo={handleStartDemo} onWatchDemo={handleWatchDemo} />
      )}

      <LandingDemo />

      <LandingSocialProof />

      {isMobile ? <LandingStatsMobile /> : <LandingStatsDesktop />}

      {isMobile ? <LandingProblemSolutionMobile /> : <LandingProblemSolutionDesktop />}

      {isMobile ? <LandingBenefitsMobile /> : <LandingBenefitsDesktop />}

      {isMobile ? <LandingFeaturesMobile /> : <LandingFeaturesDesktop />}

      <LandingCompanyLogos />

      <LandingFinalCTA onStartDemo={handleStartDemo} />
    </div>
  )
}

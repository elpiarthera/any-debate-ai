"use client"

import { useDemoMode } from "@/contexts/DemoContext"
import { useDevice } from "@/contexts/DeviceProvider"
import { ExitIntentPopup } from "./ExitIntentPopup"

import { LandingHeroMobile } from "./mobile/LandingHeroMobile"
import { LandingProblemDeepDiveMobile } from "./mobile/LandingProblemDeepDiveMobile"
import { LandingSolutionRevealMobile } from "./mobile/LandingSolutionRevealMobile"
import { LandingThreeModesSection as LandingThreeModesSectionMobile } from "./mobile/LandingThreeModesSection"
import { LandingSeeItInActionMobile } from "./mobile/LandingSeeItInActionMobile"
import { LandingBenefitsMobile } from "./mobile/LandingBenefitsMobile"
import { LandingAgentBuilderMobile } from "./mobile/LandingAgentBuilderMobile"
import { LandingFeaturesMobile } from "./mobile/LandingFeaturesMobile"

import { LandingHeroDesktop } from "./desktop/LandingHeroDesktop"
import { LandingProblemDeepDiveDesktop } from "./desktop/LandingProblemDeepDiveDesktop"
import { LandingSolutionRevealDesktop } from "./desktop/LandingSolutionRevealDesktop"
import { LandingThreeModesSection as LandingThreeModesSectionDesktop } from "./desktop/LandingThreeModesSection"
import { LandingSeeItInActionDesktop } from "./desktop/LandingSeeItInActionDesktop"
import { LandingBenefitsDesktop } from "./desktop/LandingBenefitsDesktop"
import { LandingAgentBuilderDesktop } from "./desktop/LandingAgentBuilderDesktop"
import { LandingFeaturesDesktop } from "./desktop/LandingFeaturesDesktop"

import { LandingDemo } from "./shared/LandingDemo"
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

      {/* Hero Section */}
      {isMobile ? (
        <LandingHeroMobile onStartDemo={handleStartDemo} onWatchDemo={handleWatchDemo} />
      ) : (
        <LandingHeroDesktop onStartDemo={handleStartDemo} onWatchDemo={handleWatchDemo} />
      )}

      {/* Problem Deep Dive - Show the pain of manual copy-pasting */}
      {isMobile ? <LandingProblemDeepDiveMobile /> : <LandingProblemDeepDiveDesktop />}

      {/* Solution Reveal - Introduce AnyDebate as the answer */}
      {isMobile ? <LandingSolutionRevealMobile /> : <LandingSolutionRevealDesktop />}

      {isMobile ? <LandingThreeModesSectionMobile /> : <LandingThreeModesSectionDesktop />}

      {/* See It In Action - Before/After comparison */}
      {isMobile ? <LandingSeeItInActionMobile /> : <LandingSeeItInActionDesktop />}

      {/* Interactive Demo */}
      <LandingDemo />

      {/* Benefits Section - Show outcomes */}
      {isMobile ? <LandingBenefitsMobile /> : <LandingBenefitsDesktop />}

      {/* Agent Builder - Show customization */}
      {isMobile ? <LandingAgentBuilderMobile /> : <LandingAgentBuilderDesktop />}

      {/* Features Section - Show advanced capabilities */}
      {isMobile ? <LandingFeaturesMobile /> : <LandingFeaturesDesktop />}

      {/* Final CTA */}
      <LandingFinalCTA onStartDemo={handleStartDemo} />
    </div>
  )
}

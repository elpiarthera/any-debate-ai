// Analytics utility for tracking user interactions and conversions

export interface AnalyticsEvent {
  event: string
  properties?: Record<string, any>
}

/**
 * Track a custom event
 */
export function trackEvent(event: string, properties?: Record<string, any>) {
  // Google Analytics
  if (typeof window !== "undefined" && (window as any).gtag) {
    ;(window as any).gtag("event", event, properties)
  }

  // Console log for development
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", event, properties)
  }

  // Add other analytics providers here (Mixpanel, Amplitude, etc.)
}

/**
 * Track page view
 */
export function trackPageView(url: string, title?: string) {
  trackEvent("page_view", {
    page_location: url,
    page_title: title || document.title,
  })
}

/**
 * Track CTA click
 */
export function trackCTAClick(location: string, variant: string, text: string) {
  trackEvent("cta_clicked", {
    location,
    variant,
    text,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Track demo interaction
 */
export function trackDemoInteraction(action: "started" | "completed" | "paused" | "reset", step?: number) {
  trackEvent("demo_interaction", {
    action,
    step,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(depth: number) {
  trackEvent("scroll_depth", {
    depth_percentage: depth,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Track exit intent
 */
export function trackExitIntent(captured: boolean) {
  trackEvent("exit_intent", {
    captured,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Track email capture
 */
export function trackEmailCapture(source: string, email?: string) {
  trackEvent("email_captured", {
    source,
    has_email: !!email,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Track testimonial interaction
 */
export function trackTestimonialInteraction(action: "view" | "navigate", testimonialId: number) {
  trackEvent("testimonial_interaction", {
    action,
    testimonial_id: testimonialId,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Track section view (for heatmap analysis)
 */
export function trackSectionView(sectionName: string) {
  trackEvent("section_viewed", {
    section: sectionName,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Initialize scroll depth tracking
 */
export function initScrollDepthTracking() {
  if (typeof window === "undefined") return

  let maxScrollDepth = 0
  const milestones = [25, 50, 75, 100]
  const trackedMilestones = new Set<number>()

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollDepth = Math.round((window.scrollY / scrollHeight) * 100)

    if (scrollDepth > maxScrollDepth) {
      maxScrollDepth = scrollDepth

      // Track milestones
      milestones.forEach((milestone) => {
        if (scrollDepth >= milestone && !trackedMilestones.has(milestone)) {
          trackedMilestones.add(milestone)
          trackScrollDepth(milestone)
        }
      })
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true })

  return () => {
    window.removeEventListener("scroll", handleScroll)
  }
}

/**
 * Initialize section view tracking with Intersection Observer
 */
export function initSectionViewTracking() {
  if (typeof window === "undefined") return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionName = entry.target.getAttribute("data-section")
          if (sectionName) {
            trackSectionView(sectionName)
          }
        }
      })
    },
    {
      threshold: 0.5, // Track when 50% of section is visible
    },
  )

  // Observe all sections with data-section attribute
  document.querySelectorAll("[data-section]").forEach((section) => {
    observer.observe(section)
  })

  return () => {
    observer.disconnect()
  }
}

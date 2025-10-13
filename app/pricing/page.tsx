"use client"
import { useDevice } from "@/contexts/DeviceProvider"
import { AdaptiveGrid } from "@/components/adaptive/AdaptiveGrid"
import { AdaptiveNavigation } from "@/components/adaptive/AdaptiveNavigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

const mockPlans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    tokens: 10000,
    features: ["Compare Mode", "10K tokens/month", "1 user", "Basic support"],
    popular: false,
  },
  {
    id: "starter",
    name: "Starter",
    price: 29,
    tokens: 100000,
    features: ["All modes", "100K tokens/month", "Up to 5 users", "Priority support", "Custom agents"],
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: 99,
    tokens: 500000,
    features: [
      "Everything",
      "500K tokens/month",
      "Unlimited users",
      "24/7 support",
      "Advanced analytics",
      "API access",
    ],
    popular: false,
  },
]

const faqItems = [
  {
    id: "tokens",
    label: "What are tokens?",
    content:
      "Tokens are units of AI processing. Each message, debate, or agent interaction consumes tokens based on complexity. 1 token ≈ 4 characters of text.",
  },
  {
    id: "billing",
    label: "How does billing work?",
    content:
      "You are billed monthly based on your selected plan. Unused tokens do not roll over. You can upgrade or downgrade at any time.",
  },
  {
    id: "users",
    label: "Can I add more users?",
    content:
      "Yes! The Starter plan supports up to 5 users, and the Pro plan supports unlimited users. Each user gets access to all plan features.",
  },
  {
    id: "cancel",
    label: "Can I cancel anytime?",
    content:
      "Absolutely. You can cancel your subscription at any time. Your plan will remain active until the end of your billing period.",
  },
]

function PricingCard({ plan }: { plan: (typeof mockPlans)[0] }) {
  const { isMobile } = useDevice()

  return (
    <Card className={`relative flex flex-col ${plan.popular ? "border-primary shadow-lg" : ""}`}>
      {plan.popular && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>}

      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl md:text-3xl">{plan.name}</CardTitle>
        <CardDescription className="text-sm md:text-base">{plan.tokens.toLocaleString()} tokens/month</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 space-y-4 md:space-y-6">
        {/* Price */}
        <div className="text-center">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-4xl md:text-5xl font-bold">${plan.price}</span>
            <span className="text-muted-foreground text-sm md:text-base">/month</span>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-2 md:space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 md:gap-3 min-h-[44px]">
              <Check className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
              <span className="text-sm md:text-base">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button
          size={isMobile ? "lg" : "default"}
          variant={plan.popular ? "default" : "outline"}
          className="w-full min-h-[44px]"
        >
          {plan.price === 0 ? "Get Started" : "Subscribe"}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function PricingPage() {
  const { isMobile } = useDevice()

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16 space-y-12 md:space-y-16 lg:space-y-20">
      {/* Header */}
      <div className="text-center space-y-3 md:space-y-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Simple, Transparent Pricing</h1>
        <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-2xl mx-auto">
          Choose the plan that fits your needs. All plans include access to our AI debate platform.
        </p>
      </div>

      {/* Pricing Cards */}
      <AdaptiveGrid mobileColumns={1} tabletColumns={2} desktopColumns={3} className="gap-4 md:gap-6 lg:gap-8">
        {mockPlans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </AdaptiveGrid>

      {/* FAQ Section */}
      <div className="space-y-6 md:space-y-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">Frequently Asked Questions</h2>

        <div className="max-w-3xl mx-auto">
          <AdaptiveNavigation
            items={faqItems}
            renderContent={(item) => (
              <div className="p-4 md:p-6 text-sm md:text-base text-muted-foreground">{item.content}</div>
            )}
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center space-y-4 md:space-y-6 py-8 md:py-12">
        <h2 className="text-2xl md:text-3xl font-bold">Ready to get started?</h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
          Join thousands of users already using AnyDebate AI to have better debates.
        </p>
        <Button size={isMobile ? "lg" : "default"} className="min-h-[44px] min-w-[200px]">
          Start Free Trial
        </Button>
      </div>
    </div>
  )
}

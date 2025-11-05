"use client"

import type React from "react"

import { useState } from "react"
import { useDevice } from "@/contexts/DeviceProvider"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { CheckIcon, Zap, TrendingUp, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChangePlanDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentPlan?: "free" | "pro" | "enterprise"
}

export function ChangePlanDialog({ open, onOpenChange, currentPlan = "pro" }: ChangePlanDialogProps) {
  const { isMobile } = useDevice()
  const { toast } = useToast()
  const [selectedPlan, setSelectedPlan] = useState<"free" | "pro" | "enterprise">(currentPlan)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const plans = [
    {
      id: "free" as const,
      name: "Free",
      price: "$0",
      description: "For personal projects",
      monthlyTokens: 50000,
      users: 1,
      icon: Zap,
      features: ["50K tokens/month", "1 team member", "Basic analytics", "Community support", "Public debates"],
    },
    {
      id: "pro" as const,
      name: "Pro",
      price: "$99",
      description: "For professionals",
      monthlyTokens: 500000,
      users: 10,
      icon: TrendingUp,
      popular: true,
      features: [
        "500K tokens/month",
        "Up to 10 team members",
        "Advanced analytics",
        "Priority support",
        "Private debates",
        "Custom branding",
        "API access",
      ],
    },
    {
      id: "enterprise" as const,
      name: "Enterprise",
      price: "$299",
      description: "For large teams",
      monthlyTokens: 2000000,
      users: -1, // Unlimited
      icon: Shield,
      features: [
        "2M tokens/month",
        "Unlimited team members",
        "Enterprise analytics",
        "24/7 dedicated support",
        "Private debates",
        "Custom branding",
        "API access",
        "SSO & SAML",
        "Custom integrations",
      ],
    },
  ]

  const selectedPlanData = plans.find((p) => p.id === selectedPlan)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (selectedPlan === currentPlan) {
      toast({
        title: "No changes",
        description: "You're already on this plan.",
        variant: "default",
      })
      return
    }

    setIsSubmitting(true)

    // Mock API call - will integrate with polar.sh later
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("[v0] Changing plan:", { from: currentPlan, to: selectedPlan })

    toast({
      title: "Plan updated",
      description: `Your plan has been changed to ${selectedPlanData?.name}. Changes will take effect immediately.`,
    })

    setIsSubmitting(false)
    onOpenChange(false)
  }

  const handleCancel = () => {
    setSelectedPlan(currentPlan)
    onOpenChange(false)
  }

  return (
    <AdaptiveModal
      isOpen={open}
      onClose={handleCancel}
      title="Change Your Plan"
      description="Select the plan that best fits your needs. Billing will be prorated."
    >
      <form onSubmit={handleSubmit} className="space-y-6 p-4 md:p-6">
        {/* Plan Selection Grid */}
        <div className={cn("grid gap-3", isMobile ? "grid-cols-1" : "grid-cols-3")}>
          {plans.map((plan) => {
            const Icon = plan.icon
            const isCurrentPlan = plan.id === currentPlan
            const isSelected = plan.id === selectedPlan

            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedPlan(plan.id)}
                disabled={isSubmitting}
                className={cn(
                  "relative flex flex-col items-center justify-center rounded-lg border-2 p-4 transition-all",
                  "min-h-[120px]",
                  isSelected
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-input hover:border-primary/50 active:border-primary/50",
                  isSubmitting && "opacity-50 cursor-not-allowed",
                  isMobile && "min-h-[100px]",
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                {isCurrentPlan && (
                  <div className="absolute top-2 right-2">
                    <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-medium px-2 py-0.5 rounded">
                      Current
                    </span>
                  </div>
                )}

                <Icon className="h-6 w-6 mb-2 text-primary" />
                <span className="font-semibold text-base">{plan.name}</span>
                <span className="font-bold text-2xl">{plan.price}</span>
                <span className="text-center text-muted-foreground text-xs mt-1">{plan.description}</span>
              </button>
            )
          })}
        </div>

        {/* Selected Plan Features */}
        {selectedPlanData && (
          <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold text-sm">Features included in {selectedPlanData.name}:</h4>
            <ul className="space-y-2">
              {selectedPlanData.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckIcon className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Plan Comparison Summary */}
        {selectedPlan !== currentPlan && (
          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg space-y-2">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Plan Change Summary:</p>
            <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <p>
                • From: <span className="font-semibold">{plans.find((p) => p.id === currentPlan)?.name}</span>
              </p>
              <p>
                • To: <span className="font-semibold">{selectedPlanData?.name}</span>
              </p>
              <p className="text-xs mt-2 text-blue-700 dark:text-blue-300">
                Your billing will be prorated based on the remaining days in your current billing cycle.
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className={cn("flex gap-3 pt-2", isMobile ? "flex-col" : "flex-row justify-end")}>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="min-h-[44px] bg-transparent"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" className="min-h-[44px]" disabled={isSubmitting || selectedPlan === currentPlan}>
            {isSubmitting
              ? "Updating..."
              : selectedPlan === currentPlan
                ? "Current Plan"
                : `Switch to ${selectedPlanData?.name}`}
          </Button>
        </div>

        {/* Polar.sh Integration Note */}
        <p className="text-xs text-center text-muted-foreground">
          Payments powered by{" "}
          <a href="https://polar.sh" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
            Polar
          </a>
        </p>
      </form>
    </AdaptiveModal>
  )
}

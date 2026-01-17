"use client"

import type React from "react"

import { useState } from "react"
import { useDevice } from "@/contexts/DeviceProvider"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckIcon, Zap, CreditCard, Wallet, Building2, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface PurchaseTokensDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PurchaseTokensDialog({ open, onOpenChange }: PurchaseTokensDialogProps) {
  const { isMobile } = useDevice()
  const { toast } = useToast()
  const [selectedPackage, setSelectedPackage] = useState<string>("2")
  const [paymentMethod, setPaymentMethod] = useState<string>("card")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const tokenPackages = [
    {
      id: "1",
      tokens: 50000,
      price: 10,
      popular: false,
      description: "Perfect for small projects",
      icon: Zap,
    },
    {
      id: "2",
      tokens: 150000,
      price: 25,
      popular: true,
      description: "Most popular choice",
      icon: Sparkles,
    },
    {
      id: "3",
      tokens: 300000,
      price: 45,
      popular: false,
      description: "Great for teams",
      icon: Wallet,
    },
    {
      id: "4",
      tokens: 1000000,
      price: 120,
      popular: false,
      description: "Enterprise volume",
      icon: Building2,
    },
  ]

  const paymentMethods = [
    { id: "card", name: "Credit Card", icon: CreditCard, description: "Visa, Mastercard, Amex" },
    { id: "paypal", name: "PayPal", icon: Wallet, description: "Pay with PayPal balance" },
  ]

  const selectedPackageData = tokenPackages.find((p) => p.id === selectedPackage)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedPackage || !paymentMethod) {
      toast({
        title: "Missing information",
        description: "Please select a token package and payment method.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Mock API call - will integrate with polar.sh later
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("[v0] Purchasing tokens:", {
      package: selectedPackageData,
      paymentMethod,
    })

    toast({
      title: "Purchase successful",
      description: `${(selectedPackageData!.tokens / 1000).toFixed(0)}K tokens have been added to your account.`,
    })

    setIsSubmitting(false)
    onOpenChange(false)
  }

  const handleCancel = () => {
    setSelectedPackage("2")
    setPaymentMethod("card")
    onOpenChange(false)
  }

  return (
    <AdaptiveModal
      isOpen={open}
      onClose={handleCancel}
      title="Purchase Tokens"
      description="Select a token package to add to your account"
    >
      <form onSubmit={handleSubmit} className="space-y-6 p-4 md:p-6">
        {/* Token Package Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Select Token Package</Label>
          <div className={cn("grid gap-3", isMobile ? "grid-cols-1" : "grid-cols-2")}>
            {tokenPackages.map((pkg) => {
              const Icon = pkg.icon
              const isSelected = pkg.id === selectedPackage

              return (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => setSelectedPackage(pkg.id)}
                  disabled={isSubmitting}
                  className={cn(
                    "relative flex flex-col items-start justify-between rounded-lg border-2 p-4 transition-all text-left",
                    "min-h-[120px]",
                    isSelected
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-input hover:border-primary/50 active:border-primary/50",
                    isSubmitting && "opacity-50 cursor-not-allowed",
                    isMobile && "min-h-[100px]",
                  )}
                >
                  {pkg.popular && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="flex items-start justify-between w-full">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <span className="font-semibold text-lg">{(pkg.tokens / 1000).toFixed(0)}K</span>
                    </div>
                    {isSelected && <CheckIcon className="h-5 w-5 text-primary" />}
                  </div>

                  <div className="space-y-1 w-full">
                    <p className="text-xs text-muted-foreground">{pkg.description}</p>
                    <p className="font-bold text-2xl">${pkg.price}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Payment Method</Label>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} disabled={isSubmitting}>
            <div className="space-y-2">
              {paymentMethods.map((method) => {
                const Icon = method.icon
                return (
                  <div
                    key={method.id}
                    className={cn(
                      "flex items-center space-x-3 rounded-lg border-2 p-4 transition-all",
                      "min-h-[60px]",
                      paymentMethod === method.id
                        ? "border-primary bg-primary/5"
                        : "border-input hover:border-primary/50 active:border-primary/50",
                      isSubmitting && "opacity-50 cursor-not-allowed",
                    )}
                  >
                    <RadioGroupItem value={method.id} id={method.id} className="min-h-[24px] min-w-[24px]" />
                    <Label htmlFor={method.id} className="flex items-center gap-3 flex-1 cursor-pointer">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="font-medium">{method.name}</p>
                        <p className="text-xs text-muted-foreground">{method.description}</p>
                      </div>
                    </Label>
                  </div>
                )
              })}
            </div>
          </RadioGroup>
        </div>

        {/* Purchase Summary */}
        {selectedPackageData && (
          <div className="p-4 bg-muted/50 rounded-lg space-y-2">
            <h4 className="font-semibold text-sm">Purchase Summary:</h4>
            <div className="space-y-1 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Token Package:</span>
                <span className="font-medium">{(selectedPackageData.tokens / 1000).toFixed(0)}K tokens</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Payment Method:</span>
                <span className="font-medium capitalize">
                  {paymentMethods.find((m) => m.id === paymentMethod)?.name}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t mt-2">
                <span className="font-semibold">Total:</span>
                <span className="font-bold text-lg">${selectedPackageData.price}</span>
              </div>
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
          <Button type="submit" className="min-h-[44px]" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : `Purchase for $${selectedPackageData?.price}`}
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

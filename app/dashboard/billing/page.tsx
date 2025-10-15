"use client"

import { useDevice } from "@/contexts/DeviceProvider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AdaptiveGrid } from "@/components/adaptive/AdaptiveGrid"
import { CreditCard, Download, Calendar, TrendingUp, Users, Zap, CheckCircle2, AlertCircle } from "lucide-react"
import { ChangePlanDialog } from "@/components/billing/change-plan-dialog"
import { PurchaseTokensDialog } from "@/components/billing/purchase-tokens-dialog"
import { useState } from "react"

const mockSubscription = {
  plan: "Pro",
  status: "active",
  userCount: 8,
  monthlyTokens: 500000,
  nextBilling: "2025-02-12",
  amount: 99,
}

const mockTokenBalance = {
  monthlyAllocation: 500000,
  used: 234567,
  remaining: 265433,
  overage: 0,
}

const mockCreditPackages = [
  { id: 1, tokens: 50000, price: 10, popular: false },
  { id: 2, tokens: 150000, price: 25, popular: true },
  { id: 3, tokens: 300000, price: 45, popular: false },
  { id: 4, tokens: 1000000, price: 120, popular: false },
]

const mockPaymentHistory = [
  { id: 1, date: "2025-01-12", amount: 99, status: "paid", invoice: "INV-2025-001" },
  { id: 2, date: "2024-12-12", amount: 99, status: "paid", invoice: "INV-2024-012" },
  { id: 3, date: "2024-11-12", amount: 99, status: "paid", invoice: "INV-2024-011" },
]

export default function BillingPage() {
  const { isMobile } = useDevice()
  const [showChangePlanDialog, setShowChangePlanDialog] = useState(false)
  const [showPurchaseTokensDialog, setShowPurchaseTokensDialog] = useState(false)

  const usagePercentage = (mockTokenBalance.used / mockTokenBalance.monthlyAllocation) * 100

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold">Billing & Usage</h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Manage your subscription, tokens, and payment methods
        </p>
      </div>

      <AdaptiveGrid mobileColumns={1} tabletColumns={2} desktopColumns={2} className="gap-4 md:gap-6">
        {/* Current Plan Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg md:text-xl">Current Plan</CardTitle>
              <Badge variant={mockSubscription.status === "active" ? "default" : "secondary"}>
                {mockSubscription.status}
              </Badge>
            </div>
            <CardDescription>Your subscription details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl md:text-3xl font-bold">{mockSubscription.plan}</span>
                <span className="text-2xl md:text-3xl font-bold">${mockSubscription.amount}/mo</span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{mockSubscription.userCount} team members</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-muted-foreground" />
                  <span>{(mockSubscription.monthlyTokens / 1000).toFixed(0)}K tokens/month</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Next billing: {mockSubscription.nextBilling}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                className="flex-1 min-h-[44px] bg-transparent"
                onClick={() => setShowChangePlanDialog(true)}
              >
                Change Plan
              </Button>
              <Button variant="ghost" className="flex-1 min-h-[44px]">
                Cancel Subscription
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Token Balance Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Token Balance</CardTitle>
            <CardDescription>Monthly allocation and usage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Used</span>
                <span className="font-medium">
                  {(mockTokenBalance.used / 1000).toFixed(0)}K /{" "}
                  {(mockTokenBalance.monthlyAllocation / 1000).toFixed(0)}K
                </span>
              </div>
              <Progress value={usagePercentage} className="h-2" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Remaining</span>
                <span className="font-medium text-green-600">
                  {(mockTokenBalance.remaining / 1000).toFixed(0)}K tokens
                </span>
              </div>
            </div>

            {usagePercentage > 80 && (
              <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950 rounded-lg">
                <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-amber-600">
                  You've used {usagePercentage.toFixed(0)}% of your monthly allocation. Consider purchasing additional
                  tokens.
                </p>
              </div>
            )}

            <Button className="w-full min-h-[44px]" onClick={() => setShowPurchaseTokensDialog(true)}>
              <TrendingUp className="h-4 w-4 mr-2" />
              Purchase Tokens
            </Button>
          </CardContent>
        </Card>
      </AdaptiveGrid>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">Token Packages</h2>
          <p className="text-muted-foreground text-sm md:text-base">Purchase additional tokens as needed</p>
        </div>

        <AdaptiveGrid mobileColumns={1} tabletColumns={2} desktopColumns={4} className="gap-4">
          {mockCreditPackages.map((pkg) => (
            <Card key={pkg.id} className={pkg.popular ? "border-primary shadow-lg" : ""}>
              <CardHeader>
                {pkg.popular && <Badge className="w-fit mb-2">Most Popular</Badge>}
                <CardTitle className="text-2xl md:text-3xl">{(pkg.tokens / 1000).toFixed(0)}K</CardTitle>
                <CardDescription>tokens</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl md:text-4xl font-bold">${pkg.price}</div>
                <Button
                  className="w-full min-h-[44px]"
                  variant={pkg.popular ? "default" : "outline"}
                  onClick={() => setShowPurchaseTokensDialog(true)}
                >
                  Purchase
                </Button>
              </CardContent>
            </Card>
          ))}
        </AdaptiveGrid>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Payment History</CardTitle>
          <CardDescription>Your recent transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockPaymentHistory.map((payment) => (
              <div
                key={payment.id}
                className={`
                  flex flex-col sm:flex-row sm:items-center justify-between
                  p-3 md:p-4 rounded-lg border
                  ${isMobile ? "space-y-2" : "gap-4"}
                `}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{payment.invoice}</p>
                    <p className="text-sm text-muted-foreground">{payment.date}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">${payment.amount}</span>
                  </div>
                  <Button variant="ghost" size={isMobile ? "sm" : "default"} className="min-h-[44px] min-w-[44px]">
                    <Download className="h-4 w-4" />
                    {!isMobile && <span className="ml-2">Download</span>}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ChangePlanDialog */}
      <ChangePlanDialog open={showChangePlanDialog} onOpenChange={setShowChangePlanDialog} currentPlan="pro" />

      {/* PurchaseTokensDialog */}
      <PurchaseTokensDialog open={showPurchaseTokensDialog} onOpenChange={setShowPurchaseTokensDialog} />
    </div>
  )
}

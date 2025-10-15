"use client"

import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"
import { AlertTriangle } from "lucide-react"

interface CancelSubscriptionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentPlan: string
}

const cancellationReasons = [
  { value: "too-expensive", label: "Too expensive" },
  { value: "not-using", label: "Not using enough" },
  { value: "missing-features", label: "Missing features" },
  { value: "switching-service", label: "Switching to another service" },
  { value: "technical-issues", label: "Technical issues" },
  { value: "other", label: "Other" },
]

export function CancelSubscriptionDialog({ open, onOpenChange, currentPlan }: CancelSubscriptionDialogProps) {
  const [reason, setReason] = useState<string>("")
  const [confirmed, setConfirmed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleCancel = async () => {
    if (!confirmed) {
      toast({
        title: "Confirmation required",
        description: "Please confirm that you understand the consequences.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Mock API call with 1.5s delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("[v0] Cancelling subscription:", {
        plan: currentPlan,
        reason: reason || "Not specified",
      })

      toast({
        title: "Subscription cancelled",
        description:
          "Your subscription has been cancelled. You will retain access until the end of your billing period.",
      })

      onOpenChange(false)

      // Reset form
      setReason("")
      setConfirmed(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel subscription. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            <AlertDialogTitle>Cancel Subscription</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="space-y-4 pt-4">
            <p>
              Are you sure you want to cancel your <strong>{currentPlan}</strong> subscription?
            </p>
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 space-y-2">
              <p className="text-sm font-medium text-foreground">What happens when you cancel:</p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>You'll lose access to premium features</li>
                <li>Your token allowance will be reduced to the free tier</li>
                <li>Team member limit will be reduced to 1</li>
                <li>Access continues until the end of your billing period</li>
              </ul>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 py-4">
          {/* Reason Selector */}
          <div className="space-y-2">
            <Label htmlFor="reason" className="text-sm font-medium">
              Why are you cancelling? (Optional)
            </Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger id="reason" className="min-h-[48px] w-full">
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                {cancellationReasons.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Confirmation Checkbox */}
          <div className="flex items-start gap-3 rounded-lg border p-4">
            <Checkbox
              id="confirm"
              checked={confirmed}
              onCheckedChange={(checked) => setConfirmed(checked === true)}
              className="mt-0.5"
            />
            <div className="space-y-1">
              <Label htmlFor="confirm" className="text-sm font-medium leading-none cursor-pointer">
                I understand the consequences
              </Label>
              <p className="text-xs text-muted-foreground">
                I confirm that I want to cancel my subscription and understand that I will lose access to premium
                features.
              </p>
            </div>
          </div>
        </div>

        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          <AlertDialogCancel className="min-h-[44px] w-full sm:w-auto" disabled={isLoading}>
            Keep Subscription
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleCancel}
            disabled={!confirmed || isLoading}
            className="min-h-[44px] w-full sm:w-auto bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50"
          >
            {isLoading ? "Cancelling..." : "Cancel Subscription"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

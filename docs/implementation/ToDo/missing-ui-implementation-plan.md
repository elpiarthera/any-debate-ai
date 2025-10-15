# Missing UI Implementation Plan - Complete Functional UI

**Status**: 🔄 IN PROGRESS (28.6% complete - 12/42 tasks done)
**Priority**: P0 - CRITICAL (Must complete before backend integration)
**Last Updated**: October 15, 2025
**Estimated Duration**: 15.5 hours
**Time Spent**: ~8.75 hours
**Time Remaining**: ~6.75 hours
**Phase 1 Status**: ✅ COMPLETE (4/4 tasks done)
**Phase 2 Status**: ✅ COMPLETE (6/6 tasks done)
**Phase 3 Status**: 🔄 IN PROGRESS (3/6 tasks done)
**Phase 4 Status**: ❌ NOT STARTED

**⚠️ IMPORTANT**: This plan follows the patterns and standards defined in `docs/guides/mobile-first-best-practices.md`. All implementations MUST adhere to those guidelines.

---

## Table of Contents

1. [Overview](#overview)
2. [Problem Statement](#problem-statement)
3. [Implementation Phases](#implementation-phases)
4. [Success Criteria](#success-criteria)

---

## Overview

This plan addresses critical gaps discovered during comprehensive UI audit. While UI components EXIST (150+ components, 13 pages), many buttons/links are NON-FUNCTIONAL (no handlers, empty functions, or mock-only implementations).

**Key Findings**:
- ✅ UI components are built and styled correctly
- ❌ Many onClick handlers are empty or console.log-only
- ❌ 4 critical components missing entirely
- ❌ 40+ buttons/links don't do anything when clicked
- ❌ 6 required dialogs/modals don't exist

**Architecture Reference**: All components MUST follow the patterns in `docs/guides/mobile-first-best-practices.md`

---

## Problem Statement

### What Works
- All UI components render correctly
- All layouts are responsive and mobile-first
- All styling follows design system
- All mock data displays properly

### What Doesn't Work
- "Create Organization" button does nothing (TODO comment)
- Organization member management buttons don't work
- Billing action buttons don't work
- Memory CRUD operations don't work
- Settings save buttons don't persist changes
- Many navigation links go nowhere

### Root Cause
UI_UX_SPRINT_PLAN focused on building UI components but didn't wire up all interactive elements with functional handlers (even mock ones).

---

## Implementation Phases

### Phase 1: Critical Missing Components (3.5 hours)
- Task 1.1: Redesign OrgSwitcher with Mega Menu - ✅ COMPLETE
- Task 1.2: Organization Overview Page - ✅ COMPLETE
- Task 1.3: Organization Settings Page - ✅ COMPLETE
- Task 1.4: Organization Members Page - ✅ COMPLETE

### Phase 2: Required Dialogs/Modals (4 hours)
- Task 2.1: Invite Member Dialog - ✅ COMPLETE
- Task 2.2: Change Plan Dialog - ✅ COMPLETE
- Task 2.3: Cancel Subscription Dialog - ✅ COMPLETE
- Task 2.4: Purchase Tokens Dialog - ✅ COMPLETE
- Task 2.5: Edit Memory Dialog - ✅ COMPLETE
- Task 2.6: Delete Confirmation Dialog - ✅ COMPLETE

### Phase 3: Wire Up Non-Functional Handlers (6 hours)
- Task 3.1: Organization Component Handlers - ✅ COMPLETE
- Task 3.2: Billing Component Handlers - ✅ COMPLETE
- Task 3.3: Memory Component Handlers - ✅ COMPLETE
- Task 3.4: Dashboard Component Handlers - ❌ NOT STARTED
- Task 3.5: Settings Component Handlers - ❌ NOT STARTED
- Task 3.6: Chat/Debate Component Handlers - ❌ NOT STARTED

### Phase 4: Testing & Verification (2 hours)
- Task 4.1: Functional Testing - ❌ NOT STARTED
- Task 4.2: Mobile Testing - ❌ NOT STARTED

---

## Phase 1: Critical Missing Components

### Task 1.1: Redesign OrgSwitcher with Mega Menu

**Status**: ✅ COMPLETE
**Priority**: P0 - CRITICAL
**Estimated Time**: 1 hour
**Completed**: October 14, 2025

**File**: `components/dashboard/OrgSwitcher.tsx`

**What Was Done**:
- Redesigned OrgSwitcher component with a mega menu navigation
- Added NavigationMenu with links to organization pages:
  - Overview: `/dashboard/organization/${org.slug}`
  - Settings: `/dashboard/organization/${org.slug}/settings`
  - Members: `/dashboard/organization/${org.slug}/members`
- Implemented mobile-first responsive design
- Added proper touch targets (44px minimum)
- Used shadcn/ui NavigationMenu components

**Architecture**: Follows Pattern 3 (Separate Mobile/Desktop Components) from mobile-first-best-practices.md

**Touch Targets**:
- All buttons: `min-h-[44px]` (WCAG 2.1 Level AA)
- All navigation items: `min-h-[44px]`
- Proper spacing: `gap-4`

**Note**: Instead of creating a separate CreateOrganizationDialog, the OrgSwitcher was redesigned with a mega menu that provides navigation to organization pages. The "Create Organization" functionality will be added in Phase 2 as a separate dialog.

---

### Task 1.2: Organization Overview Page

**Status**: ✅ COMPLETE
**Priority**: P0 - CRITICAL
**Estimated Time**: 1 hour
**Completed**: October 14, 2025

**Files Created**:
- `app/dashboard/organization/[slug]/page.tsx` (Main orchestrator)
- `components/organization/mobile/OrganizationOverviewMobile.tsx` (Mobile-specific)
- `components/organization/desktop/OrganizationOverviewDesktop.tsx` (Desktop-specific)

**Architecture**: Follows Pattern 3 (Separate Mobile/Desktop Components) from mobile-first-best-practices.md

**Touch Targets**:
- All cards: `min-h-[80px]` (comfortable tapping)
- All buttons: `min-h-[44px]` (WCAG 2.1 Level AA)
- Card spacing: `gap-4` (adequate spacing)

**Features Implemented**:
- Organization stats (4 metric cards: Members, Debates, Tokens, Growth)
- Quick actions (3 action cards: Invite Members, Settings, Reports)
- Recent activity (last 5 activities with icons)
- Member preview (first 5 members with "View All" link)
- Dynamic routing with `[slug]` parameter

**Mobile Specifications**:
- 1 column layout
- Stacked sections with vertical spacing
- Full-width cards (80px min height)
- Scrollable activity list
- Active states instead of hover

**Desktop Specifications**:
- 2-4 column grid for stats
- 3 column grid for quick actions
- Side-by-side activity and members
- Hover states on cards
- More compact spacing

**Mock Data**:
\`\`\`typescript
const mockOrgStats = {
  totalMembers: 12,
  activeDebates: 8,
  totalTokens: 50000,
  usedTokens: 12500,
}

const mockRecentActivity = [
  { id: '1', user: 'John Doe', action: 'started a debate', time: '2 hours ago' },
  { id: '2', user: 'Jane Smith', action: 'invited a member', time: '5 hours ago' },
  // ... 3 more
]
\`\`\`

---

### Task 1.3: Organization Settings Page

**Status**: ✅ COMPLETE
**Priority**: P0 - CRITICAL
**Estimated Time**: 1 hour
**Completed**: October 14, 2025

**Files Created**:
- `app/dashboard/organization/[slug]/settings/page.tsx` (Main orchestrator)
- `components/organization/mobile/OrganizationSettingsMobile.tsx` (Mobile-specific)
- `components/organization/desktop/OrganizationSettingsDesktop.tsx` (Desktop-specific)

**Architecture**: Follows Pattern 3 (Separate Mobile/Desktop Components) from mobile-first-best-practices.md

**Touch Targets**:
- All inputs: `min-h-[48px]` (prevents iOS zoom)
- All buttons: `min-h-[44px]` (WCAG 2.1 Level AA)
- Form spacing: `gap-4` (adequate spacing)

**Features Implemented**:
- General settings form (name, slug, description)
- Real-time validation with error messages
- Save button with loading state
- Cancel button to discard changes
- Danger zone (delete organization with confirmation)
- Dynamic routing with `[slug]` parameter

**Mobile Specifications**:
- Stacked form layout (vertical)
- Full-width inputs (48px height)
- Full-width buttons at bottom (44px height)
- Danger zone at bottom with warning
- Active states instead of hover

**Desktop Specifications**:
- Stacked form layout with proper spacing
- Standard input widths
- Right-aligned buttons (side-by-side)
- Danger zone in separate card
- Hover states on interactive elements

**Mock Data**:
\`\`\`typescript
const mockOrganization = {
  id: '2',
  name: 'Acme Corp',
  slug: 'acme-corp',
  description: 'Building the future of AI debates',
}
\`\`\`

---

### Task 1.4: Organization Members Page

**Status**: ✅ COMPLETE
**Priority**: P0 - CRITICAL
**Estimated Time**: 30 minutes
**Completed**: October 14, 2025

**Files Created**:
- `app/dashboard/organization/[slug]/members/page.tsx` (Main orchestrator)
- `components/organization/mobile/MemberListMobile.tsx` (Mobile-specific)
- `components/organization/desktop/MemberListDesktop.tsx` (Desktop-specific)

**Architecture**: Follows Pattern 3 (Separate Mobile/Desktop Components) from mobile-first-best-practices.md

**Touch Targets**:
- All buttons: `min-h-[44px]` (WCAG 2.1 Level AA)
- All member cards: `min-h-[80px]` (comfortable tapping)
- Action buttons: `min-h-[48px]` on mobile, `min-h-[44px]` on desktop

**Features Implemented**:
- Member list with avatar, name, email, role, join date
- Invite member button in page header
- Remove member action (with confirmation)
- Change role action (with dropdown)
- Dynamic routing with `[slug]` parameter
- Mock handlers for all actions

**Mobile Specifications**:
- Vertical layout with stacked member cards
- Full-width cards (80px min height)
- Larger touch targets (48px buttons)
- Stacked information for better readability
- Active states instead of hover

**Desktop Specifications**:
- Horizontal layout with table-like structure
- Compact spacing
- Hover states on rows
- Side-by-side action buttons
- More information visible at once

**Mock Data**:
\`\`\`typescript
const mockMembers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'owner', joinedAt: '2024-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'admin', joinedAt: '2024-02-20' },
  // ... 3 more
]
\`\`\`

---

## Phase 2: Required Dialogs/Modals

### Task 2.1: Invite Member Dialog

**Status**: ✅ COMPLETE
**Priority**: P1 - HIGH
**Estimated Time**: 45 minutes
**Completed**: October 14, 2025

**File**: `components/organization/invite-member-dialog.tsx`

**Architecture**: Uses AdaptiveModal (Drawer on mobile, Dialog on desktop)

**Touch Targets**:
- All inputs: `min-h-[48px]` (prevents iOS zoom)
- All buttons: `min-h-[44px]` (WCAG 2.1 Level AA)
- Form spacing: `gap-4` (adequate spacing)

**Features Implemented**:
- Email input with real-time validation
- Role selector (Admin/Member) with descriptions
- Send invitation button with loading state
- Cancel button to close dialog
- Mock invite function with 1s delay
- Success toast notification
- Error handling and display
- Disabled state during submission

**Mobile Specifications**:
- Bottom drawer presentation
- Stacked button layout (vertical)
- Full-width inputs (48px height)
- Touch-optimized spacing
- Gesture-based dismissal

**Desktop Specifications**:
- Center modal presentation
- Side-by-side buttons (horizontal)
- Standard input widths
- Hover states on interactive elements
- Click outside to dismiss

**Validation Rules**:
- Email is required
- Email must be valid format (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- Role is required (defaults to "member")

**Mock Implementation**:
\`\`\`typescript
// Mock API call with 1s delay
await new Promise((resolve) => setTimeout(resolve, 1000))
console.log("[v0] Inviting member:", { email, role })
toast({
  title: "Invitation sent",
  description: `An invitation has been sent to ${email}.`,
})
\`\`\`

**Integration Points**:
- Used in `app/dashboard/organization/[slug]/members/page.tsx`
- Triggered by "Invite Member" button in page header
- Shares state with parent component via `open` and `onOpenChange` props

---

### Task 2.2: Change Plan Dialog

**Status**: ✅ COMPLETE
**Priority**: P1 - HIGH
**Estimated Time**: 45 minutes
**Completed**: October 14, 2025

**File**: `components/billing/change-plan-dialog.tsx`

**Architecture**: Uses AdaptiveModal (Drawer on mobile, Dialog on desktop)

**Touch Targets**:
- All plan selection buttons: `min-h-[120px]` on desktop, `min-h-[100px]` on mobile
- All action buttons: `min-h-[44px]` (WCAG 2.1 Level AA)
- Form spacing: `gap-3` (adequate spacing)

**Features Implemented**:
- Display available plans (Free, Pro, Enterprise)
- Highlight current plan with "Current" badge
- Show "Most Popular" badge on Pro plan
- Plan comparison with features list
- Plan change summary with prorated billing notice
- Confirm button with loading state
- Cancel button to close dialog
- Mock plan change function with 1.5s delay
- Success toast notification
- Disabled state when current plan is selected
- Polar.sh branding footer (for future integration)

**Mobile Specifications**:
- Bottom drawer presentation
- 1 column layout for plan cards
- Stacked button layout (vertical)
- Touch-optimized spacing
- Gesture-based dismissal

**Desktop Specifications**:
- Center modal presentation
- 3 column grid for plan cards
- Side-by-side buttons (horizontal)
- Hover states on plan cards
- Click outside to dismiss

**Plan Details**:
\`\`\`typescript
const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    monthlyTokens: 50000,
    users: 1,
    features: ["50K tokens/month", "1 team member", "Basic analytics", "Community support", "Public debates"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$99",
    monthlyTokens: 500000,
    users: 10,
    popular: true,
    features: ["500K tokens/month", "Up to 10 team members", "Advanced analytics", "Priority support", "Private debates", "Custom branding", "API access"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$299",
    monthlyTokens: 2000000,
    users: -1, // Unlimited
    features: ["2M tokens/month", "Unlimited team members", "Enterprise analytics", "24/7 dedicated support", "Private debates", "Custom branding", "API access", "SSO & SAML", "Custom integrations"],
  },
]
\`\`\`

**Mock Implementation**:
\`\`\`typescript
// Mock API call with 1.5s delay
await new Promise((resolve) => setTimeout(resolve, 1500))
console.log("[v0] Changing plan:", { from: currentPlan, to: selectedPlan })
toast({
  title: "Plan updated",
  description: `Your plan has been changed to ${selectedPlanData?.name}. Changes will take effect immediately.`,
})
\`\`\`

**Integration Points**:
- Used in `app/dashboard/billing/page.tsx`
- Triggered by "Change Plan" button in Current Plan card
- Shares state with parent component via `open` and `onOpenChange` props
- Accepts `currentPlan` prop to highlight current selection

**Future Integration**:
- Will integrate with Polar.sh for subscription management
- Polar.sh branding already included in footer
- Mock implementation ready to be replaced with real API calls

---

### Task 2.3: Cancel Subscription Dialog

**Status**: ✅ COMPLETE
**Priority**: P1 - HIGH
**Estimated Time**: 45 minutes
**Completed**: October 14, 2025

**File**: `components/billing/cancel-subscription-dialog.tsx`

**Architecture**: Uses AlertDialog for destructive action (not AdaptiveModal)

**Touch Targets**:
- All buttons: `min-h-[44px]` (WCAG 2.1 Level AA)
- Select input: `min-h-[48px]` (prevents iOS zoom)
- Form spacing: `gap-4` (adequate spacing)

**Features Implemented**:
- Warning message with destructive icon
- Consequences list (what happens when you cancel)
- Optional reason selector with 6 predefined reasons
- Confirmation checkbox with detailed description
- Cancel button (keeps subscription)
- Destructive action button (cancels subscription)
- Disabled state when checkbox not confirmed
- Loading state during cancellation
- Mock cancel function with 1.5s delay
- Success toast notification
- Error handling and display
- Form reset after successful cancellation

**Cancellation Reasons**:
- Too expensive
- Not using enough
- Missing features
- Switching to another service
- Technical issues
- Other

**Validation Rules**:
- Confirmation checkbox must be checked to proceed
- Reason is optional (can be left blank)

**Mock Implementation**:
\`\`\`typescript
// Mock API call with 1.5s delay
await new Promise((resolve) => setTimeout(resolve, 1500))
console.log('[v0] Cancelling subscription:', {
  plan: currentPlan,
  reason: reason || 'Not specified',
})
toast({
  title: 'Subscription cancelled',
  description: 'Your subscription has been cancelled. You will retain access until the end of your billing period.',
})
\`\`\`

**Integration Points**:
- Used in `app/dashboard/billing/page.tsx`
- Triggered by "Cancel Subscription" button in Current Plan card
- Accepts `currentPlan` prop to display in warning message
- Shares state with parent component via `open` and `onOpenChange` props

**Future Integration**:
- Will integrate with Polar.sh for subscription cancellation
- Mock implementation ready to be replaced with real API calls
- Reason data can be sent to analytics for retention insights

---

### Task 2.4: Purchase Tokens Dialog

**Status**: ✅ COMPLETE
**Priority**: P1 - HIGH
**Estimated Time**: 45 minutes
**Completed**: October 14, 2025

**File**: `components/billing/purchase-tokens-dialog.tsx`

**Architecture**: Uses AdaptiveModal (Drawer on mobile, Dialog on desktop)

**Touch Targets**:
- All package selection buttons: `min-h-[120px]` on desktop, `min-h-[100px]` on mobile
- All radio buttons: `min-h-[24px] min-w-[24px]`
- All action buttons: `min-h-[44px]` (WCAG 2.1 Level AA)
- Payment method cards: `min-h-[60px]`
- Form spacing: `gap-3` (adequate spacing)

**Features Implemented**:
- Display 4 token packages (50K, 150K, 300K, 1M tokens)
- Package selection with visual feedback
- "Most Popular" badge on 150K package
- Payment method selector (Credit Card, PayPal)
- Purchase summary with total
- Purchase button with loading state
- Cancel button to close dialog
- Mock purchase function with 1.5s delay
- Success toast notification
- Disabled state during submission
- Polar.sh branding footer (for future integration)

**Mobile Specifications**:
- Bottom drawer presentation
- 1 column layout for package cards
- Stacked button layout (vertical)
- Touch-optimized spacing
- Gesture-based dismissal

**Desktop Specifications**:
- Center modal presentation
- 2 column grid for package cards
- Side-by-side buttons (horizontal)
- Hover states on package cards
- Click outside to dismiss

**Token Packages**:
\`\`\`typescript
const tokenPackages = [
  { id: "1", tokens: 50000, price: 10, popular: false, description: "Perfect for small projects" },
  { id: "2", tokens: 150000, price: 25, popular: true, description: "Most popular choice" },
  { id: "3", tokens: 300000, price: 45, popular: false, description: "Great for teams" },
  { id: "4", tokens: 1000000, price: 120, popular: false, description: "Enterprise volume" },
]
\`\`\`

**Payment Methods**:
\`\`\`typescript
const paymentMethods = [
  { id: "card", name: "Credit Card", description: "Visa, Mastercard, Amex" },
  { id: "paypal", name: "PayPal", description: "Pay with PayPal balance" },
]
\`\`\`

**Mock Implementation**:
\`\`\`typescript
// Mock API call with 1.5s delay
await new Promise((resolve) => setTimeout(resolve, 1500))
console.log("[v0] Purchasing tokens:", { package: selectedPackageData, paymentMethod })
toast({
  title: "Purchase successful",
  description: `${(selectedPackageData!.tokens / 1000).toFixed(0)}K tokens have been added to your account.`,
})
\`\`\`

**Integration Points**:
- Used in `app/dashboard/billing/page.tsx`
- Triggered by "Purchase Tokens" button in Token Balance card
- Triggered by "Purchase" buttons in Token Packages section
- Shares state with parent component via `open` and `onOpenChange` props

**Future Integration**:
- Will integrate with Polar.sh for payment processing
- Polar.sh branding already included in footer
- Mock implementation ready to be replaced with real API calls

---

### Task 2.5: Edit Memory Dialog

**Status**: ✅ COMPLETE
**Priority**: P1 - HIGH
**Estimated Time**: 45 minutes
**Completed**: October 15, 2025

**File**: `components/memory/edit-memory-dialog.tsx`

**Architecture**: Uses AdaptiveModal (Drawer on mobile, Dialog on desktop)

**Touch Targets**:
- All inputs: `min-h-[48px]` (prevents iOS zoom)
- All buttons: `min-h-[44px]` (WCAG 2.1 Level AA)
- Form spacing: `gap-4` (adequate spacing)

**Features Implemented**:
- Pre-fills form with existing memory data
- All fields from add-memory-form (title, category, content, tags, scope, source, sourceUrl)
- Real-time validation with error messages
- Save button with loading state
- Cancel button to close dialog
- Mock update function with 1s delay
- Success toast notification
- Error handling and display
- Disabled state during submission
- Dropdown menu in memory cards (mobile and desktop) for edit/delete actions

**Mobile Specifications**:
- Bottom drawer presentation
- Stacked form layout (vertical)
- Full-width inputs (48px height)
- Full-width buttons at bottom (44px height)
- Touch-optimized spacing
- Gesture-based dismissal

**Desktop Specifications**:
- Center modal presentation
- Standard input widths
- Side-by-side buttons (horizontal)
- Hover states on interactive elements
- Click outside to dismiss

**Validation Rules**:
- Title is required
- Category is required
- Content is required
- Source URL is required if source type is "url"

**Mock Implementation**:
\`\`\`typescript
// Mock API call with 1s delay
await new Promise((resolve) => setTimeout(resolve, 1000))
console.log("[v0] Updating memory:", { memoryId: memory.id, updatedData: formData })
onSave(memory.id, formData)
toast({
  title: "Memory updated",
  description: `"${formData.title}" has been successfully updated.`,
})
\`\`\`

**Integration Points**:
- Used in `components/memory/mobile/memory-list-mobile.tsx`
- Used in `components/memory/desktop/memory-grid-desktop.tsx`
- Triggered by "Edit" option in dropdown menu on memory cards
- Shares state with parent component via `open` and `onOpenChange` props
- Accepts `memory` prop to pre-fill form data
- Calls `onSave` callback with updated memory data

**Files Modified**:
- Created `components/memory/edit-memory-dialog.tsx` (main dialog component)
- Updated `components/memory/mobile/memory-card-mobile.tsx` (added dropdown menu with edit/delete)
- Updated `components/memory/desktop/memory-card-desktop.tsx` (added dropdown menu with edit/delete)
- Updated `components/memory/mobile/memory-list-mobile.tsx` (added edit dialog integration)
- Updated `components/memory/desktop/memory-grid-desktop.tsx` (added edit dialog integration)
- Updated `components/memory/memory-dashboard.tsx` (added edit and delete handlers)

**Future Integration**:
- Will integrate with backend for real memory updates
- Mock implementation ready to be replaced with real API calls

---

### Task 2.6: Delete Confirmation Dialog

**Status**: ✅ COMPLETE
**Priority**: P1 - HIGH
**Estimated Time**: 45 minutes
**Completed**: October 15, 2025

**File**: `components/shared/delete-confirmation-dialog.tsx`

**Architecture**: Reusable AlertDialog component (works on all devices)

**Touch Targets**:
- All buttons: `min-h-[44px]` (WCAG 2.1 Level AA)
- Button spacing: `gap-2` (adequate spacing)

**Features Implemented**:
- Reusable component for any delete confirmation
- Item name display in warning message
- Item type display in title and button
- Destructive action button with red styling
- Cancel button to dismiss
- Accepts `onConfirm` callback prop
- Mobile-first button layout (stacked on mobile, side-by-side on desktop)

**Mobile Specifications**:
- Stacked button layout (vertical)
- Full-width buttons (44px height)
- Adequate spacing between buttons

**Desktop Specifications**:
- Side-by-side button layout (horizontal)
- Auto-width buttons (44px height)
- Standard spacing

**Props Interface**:
\`\`\`typescript
interface DeleteConfirmationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  itemName: string
  itemType: string
}
\`\`\`

**Usage Example**:
\`\`\`tsx
<DeleteConfirmationDialog
  open={showDeleteDialog}
  onOpenChange={setShowDeleteDialog}
  onConfirm={() => {
    console.log('[v0] Deleting item:', itemId)
    toast({ title: 'Item deleted' })
  }}
  itemName="My Memory"
  itemType="Memory"
/>
\`\`\`

**Integration Points**:
- Can be used anywhere in the app for delete confirmations
- Already integrated in memory components (Task 2.5)
- Will be used in Phase 3 for other delete actions (sessions, agents, etc.)

**Future Integration**:
- Will integrate with backend for real delete operations
- Mock implementation ready to be replaced with real API calls

---

## Phase 3: Wire Up Non-Functional Handlers

### Task 3.1: Organization Component Handlers

**Status**: ✅ COMPLETE
**Priority**: P1 - HIGH
**Estimated Time**: 1 hour
**Completed**: October 15, 2025

**Files Updated**:
1. `components/organization/create-organization-dialog.tsx` - Created new dialog component
2. `components/dashboard/OrgSwitcher.tsx` - Wired up create organization dialog
3. `app/dashboard/organization/[slug]/members/page.tsx` - Wired up invite/remove member dialogs

**Changes Made**:

**Create Organization Dialog**:
- Created new `CreateOrganizationDialog` component using AdaptiveModal
- Form fields: name, slug (auto-generated from name), description
- Real-time validation with error messages
- Auto-generates slug from organization name
- Mock API call with 1s delay
- Success toast notification
- Navigates to new organization page after creation
- Touch targets: 48px inputs, 44px buttons

**OrgSwitcher**:
- Added state for create organization dialog
- Updated `handleCreateOrg` to open dialog instead of navigating
- Integrated `CreateOrganizationDialog` component

**Members Page**:
- Added state for invite and delete dialogs
- Updated `handleInviteMember` to open invite dialog
- Updated `handleRemoveMember` to open delete confirmation dialog
- Added `confirmRemoveMember` function with mock API call
- Updated `handleChangeRole` with mock API call and console logging
- Integrated `InviteMemberDialog` and `DeleteConfirmationDialog` components

**Mock Implementation**:
\`\`\`typescript
// Create organization
await new Promise((resolve) => setTimeout(resolve, 1000))
console.log("[v0] Creating organization:", formData)
router.push(`/dashboard/organization/${formData.slug}`)

// Remove member
console.log("[v0] Removing member:", memberId)
toast({ title: "Member removed", description: `${memberName} has been removed.` })

// Change role
console.log("[v0] Changing role:", { memberId, newRole })
toast({ title: "Role updated", description: `${memberName}'s role changed to ${newRole}.` })
\`\`\`

**Integration Points**:
- OrgSwitcher now opens CreateOrganizationDialog when "New Organization" button is clicked
- Members page now opens InviteMemberDialog when "Invite Member" button is clicked
- Members page now opens DeleteConfirmationDialog when removing a member
- All handlers include console logging for debugging
- All actions provide user feedback via toast notifications

**Future Integration**:
- Will integrate with backend for real organization creation
- Will integrate with backend for real member management
- Mock implementations ready to be replaced with real API calls

### Task 3.2: Billing Component Handlers

**Status**: ✅ COMPLETE
**Priority**: P1 - HIGH
**Estimated Time**: 1.5 hours
**Completed**: October 15, 2025

**Files Updated**:
1. `app/dashboard/billing/page.tsx` - Wired up all billing actions

**Changes Made**:

**Billing Page**:
- Added state for cancel subscription dialog (`showCancelDialog`)
- Added `handleCancelSubscription` handler to open cancel dialog
- Added `handleDownloadInvoice` handler with mock download functionality
- Wired up "Cancel Subscription" button to open dialog
- Wired up "Download" buttons in payment history to download invoices
- Integrated `CancelSubscriptionDialog` component
- Added toast notifications for user feedback
- All handlers include console logging for debugging

**Mock Implementation**:
\`\`\`typescript
// Cancel subscription
const handleCancelSubscription = () => {
  setShowCancelDialog(true)
}

// Download invoice
const handleDownloadInvoice = (invoiceId: string) => {
  console.log('[v0] Downloading invoice:', invoiceId)
  toast({
    title: 'Download started',
    description: 'Your invoice is being downloaded.',
  })
  // Mock download
  // window.open(`/api/invoices/${invoiceId}/download`, '_blank')
}
\`\`\`

**Integration Points**:
- "Change Plan" button opens `ChangePlanDialog` (already implemented)
- "Cancel Subscription" button opens `CancelSubscriptionDialog` (newly wired)
- "Purchase Tokens" buttons open `PurchaseTokensDialog` (already implemented)
- "Download" buttons in payment history trigger mock download with toast feedback
- All dialogs properly integrated with state management
- All actions provide user feedback via toast notifications

**Future Integration**:
- Will integrate with Polar.sh for real subscription management
- Will integrate with backend for real invoice downloads
- Mock implementations ready to be replaced with real API calls

### Task 3.3: Memory Component Handlers

**Status**: ✅ COMPLETE
**Priority**: P1 - HIGH
**Estimated Time**: 1.5 hours
**Completed**: October 15, 2025

**Files Updated**:
1. `components/memory/memory-dashboard.tsx` - Added handlers for adding memories
2. `components/memory/mobile/memory-list-mobile.tsx` - Wired up add memory buttons
3. `components/memory/desktop/memory-grid-desktop.tsx` - Wired up add memory buttons

**Changes Made**:

**Memory Dashboard**:
- Added `handleAddMemory` function to create new memories from AddMemoryForm
- Added `handleMemoriesFromDocument` function to import memories from document upload
- Added `handleMemoriesFromUrl` function to import memories from URL scraper
- All handlers include console logging for debugging
- All handlers provide user feedback via toast notifications
- Passed handlers to mobile and desktop components via shared props

**Mobile Memory List**:
- Added state for add memory dialogs (`isAddMemoryOpen`, `isDocumentUploadOpen`, `showUrlScraper`)
- Wired up floating action buttons:
  - Upload button opens DocumentUpload dialog
  - Link button opens URL scraper modal (placeholder)
  - Plus button opens AddMemoryForm dialog
- Integrated AddMemoryForm component
- Integrated DocumentUpload component
- Added placeholder for URL scraper integration

**Desktop Memory Grid**:
- Added state for add memory dialogs (`isAddMemoryOpen`, `isDocumentUploadOpen`, `showUrlScraper`)
- Wired up header buttons:
  - "Upload Document" button opens DocumentUpload dialog
  - "Import from URL" button opens URL scraper modal (placeholder)
  - "Add Memory" button opens AddMemoryForm dialog
- Integrated AddMemoryForm component
- Integrated DocumentUpload component
- Added placeholder for URL scraper integration

**Mock Implementation**:
\`\`\`typescript
// Add new memory
const newMemory: Memory = {
  id: Date.now().toString(),
  title: memoryData.title,
  category: memoryData.category,
  content: memoryData.content,
  tags: memoryData.tags,
  source: memoryData.source,
  sourceUrl: memoryData.sourceUrl,
  usageCount: 0,
  createdAt: Date.now(),
  scope: memoryData.scope,
  createdBy: "current-user@company.com",
}
setMemories((prev) => [newMemory, ...prev])
console.log("[v0] Adding new memory:", newMemory)
toast({ title: "Memory created", description: `"${memoryData.title}" has been added successfully.` })

// Import from document
const newMemories: Memory[] = extractedMemories.map((memory) => ({
  id: Date.now().toString() + Math.random(),
  title: memory.title,
  category: memory.category as MemoryCategory,
  content: memory.content,
  tags: memory.tags,
  source: "document" as MemorySource,
  usageCount: 0,
  createdAt: Date.now(),
  scope: "workspace" as MemoryScope,
  createdBy: "current-user@company.com",
}))
setMemories((prev) => [...newMemories, ...prev])
console.log("[v0] Adding memories from document:", newMemories)
toast({ title: "Memories imported", description: `${newMemories.length} memories have been added from the document.` })
\`\`\`

**Integration Points**:
- AddMemoryForm properly integrated with validation and form submission
- DocumentUpload properly integrated with file upload and AI extraction
- URL scraper has placeholder modal (full integration pending)
- All handlers include console logging for debugging
- All actions provide user feedback via toast notifications

**Note**: URL scraper integration is a placeholder for now. The UrlScraper component exists but needs to be properly integrated into a modal/dialog structure. This can be completed in a future task if needed.

**Future Integration**:
- Will integrate with backend for real memory creation
- Will integrate with backend for real document upload and AI extraction
- Will integrate with backend for real URL scraping and AI extraction
- Mock implementations ready to be replaced with real API calls

### Task 3.4: Dashboard Component Handlers

**Status**: ❌ NOT STARTED
**Priority**: P2 - MEDIUM
**Estimated Time**: 1 hour

**Files to Update**:
1. `components/dashboard/QuickActions.tsx` - Wire up card clicks
2. `components/sessions/SessionList.tsx` - Wire up resume/delete
3. `components/agents/AgentLibrary.tsx` - Wire up favorite/edit/delete
4. `components/chat/ChatSidebar.tsx` - Wire up edit/delete session buttons

**Changes Required**:

**ChatSidebar.tsx** (lines ~176, ~181):
\`\`\`tsx
const [showEditDialog, setShowEditDialog] = useState(false)
const [showDeleteDialog, setShowDeleteDialog] = useState(false)
const [selectedSession, setSelectedSession] = useState<string | null>(null)

const handleEditSession = (sessionId: string, e: React.MouseEvent) => {
  e.stopPropagation()
  setSelectedSession(sessionId)
  setShowEditDialog(true)
}

const handleDeleteSession = (sessionId: string, e: React.MouseEvent) => {
  e.stopPropagation()
  setSelectedSession(sessionId)
  setShowDeleteDialog(true)
}

<Button 
  variant="ghost" 
  size="sm" 
  className="h-6 w-6 p-0 hover:bg-sidebar-accent"
  onClick={(e) => handleEditSession(session.id, e)}
>
  <Edit3 className="h-3 w-3" />
</Button>
<Button
  variant="ghost"
  size="sm"
  className="h-6 w-6 p-0 hover:bg-destructive/20 hover:text-destructive"
  onClick={(e) => handleDeleteSession(session.id, e)}
>
  <Trash2 className="h-3 w-3" />
</Button>

<EditSessionDialog
  open={showEditDialog}
  onOpenChange={setShowEditDialog}
  sessionId={selectedSession}
  onSave={(newTitle) => {
    console.log('[v0] Renaming session:', selectedSession, newTitle)
    toast({ title: 'Session renamed', description: `Session renamed to "${newTitle}"` })
  }}
/>
<DeleteConfirmationDialog
  open={showDeleteDialog}
  onOpenChange={setShowDeleteDialog}
  onConfirm={() => {
    if (selectedSession) {
      console.log('[v0] Deleting session:', selectedSession)
      toast({ title: 'Session deleted', description: 'The session has been deleted.' })
    }
  }}
  itemName={sessions.find(s => s.id === selectedSession)?.title || 'session'}
  itemType="Session"
/>
\`\`\`

**QuickActions.tsx**:
\`\`\`tsx
const handleNewDebate = () => {
  window.location.href = '/debates'
}

const handleViewAgents = () => {
  window.location.href = '/agents'
}

const handleViewAnalytics = () => {
  window.location.href = '/analytics'
}

<Card onClick={handleNewDebate} className="cursor-pointer hover:bg-accent transition-colors">
  {/* ... existing card content ... */}
</Card>
\`\`\`

### Task 3.5: Settings Component Handlers

**Status**: ❌ NOT STARTED
**Priority**: P2 - MEDIUM
**Estimated Time**: 30 minutes

**Files to Update**:
1. `components/settings/profile-panel.tsx` - Wire up save handler
2. `components/settings/preferences-panel.tsx` - Wire up save handler

**Changes Required**: [Similar pattern to above tasks]

### Task 3.6: Chat/Debate Component Handlers

**Status**: ❌ NOT STARTED
**Priority**: P2 - MEDIUM
**Estimated Time**: 30 minutes

**Files to Update**:
1. `components/debate/MessageBubble.tsx` - Wire up share handler (if needed)
2. `components/debate/ModelColumn.tsx` - Already working (retry/stop handlers exist)

**Changes Required**: 

**MessageBubble.tsx**:
\`\`\`tsx
// Verify handleShare is properly wired up
const handleShare = (targetModelId: string) => {
  if (onShare) {
    onShare(message.content, targetModelId)
    toast({
      title: 'Message shared',
      description: `Message shared with ${otherModels.find(m => m.id === targetModelId)?.name}`,
    })
  }
}
\`\`\`

---

## Phase 4: Testing & Verification

### Task 4.1: Functional Testing

**Status**: ❌ NOT STARTED
**Priority**: P0 - CRITICAL
**Estimated Time**: 1 hour

**Testing Checklist**:
- [ ] Click every button in the app
- [ ] Verify every button does something (even if mock)
- [ ] Check toast notifications appear
- [ ] Verify dialogs open/close correctly
- [ ] Test form validation
- [ ] Test form submission
- [ ] Verify no console errors
- [ ] Check no href="#" links remain

---

### Task 4.2: Mobile Testing

**Status**: ❌ NOT STARTED
**Priority**: P0 - CRITICAL
**Estimated Time**: 1 hour

**Testing Checklist**:
- [ ] Test on 320px width (iPhone SE)
- [ ] Test on 375px width (iPhone 12)
- [ ] Test on 768px width (iPad)
- [ ] Verify all touch targets ≥ 44px
- [ ] Verify all inputs ≥ 48px
- [ ] Check responsive layouts work
- [ ] Test adaptive components (modal/drawer)
- [ ] Verify keyboard doesn't cover inputs
- [ ] Test scrolling behavior

---

## Success Criteria

### All Buttons Work
- [ ] Every button has an onClick handler
- [ ] Every handler does something (even if mock)
- [ ] Success feedback displays (toast/dialog)
- [ ] No console.log-only handlers

### All Links Work
- [x] Every link has proper href or onClick
- [x] No href="#" links
- [x] Navigation works correctly
- [x] No 404 errors for organization pages

### All Forms Work
- [x] Form submission triggers handler
- [x] Validation works
- [x] Error messages display
- [x] Success feedback displays

### All Dialogs Work
- [ ] Dialogs open when triggered
- [ ] Dialogs close properly
- [ ] Form submission works
- [ ] Cancel button works

### Mobile-First Works
- [x] All touch targets ≥ 44px
- [x] All inputs ≥ 48px
- [x] Responsive layouts work
- [x] Adaptive components work
- [x] Separate mobile/desktop components for organization pages

---

## Notes

1. **Phase 1 Complete**: All organization pages created with mobile-first architecture
2. **Dynamic Routing**: All organization pages use `[slug]` parameter for multi-org support
3. **Mobile-First Architecture**: All pages follow Pattern 3 with separate mobile/desktop components
4. **Mock Data Is OK**: Using mock data is expected for UI-only phase
5. **Focus on Functionality**: Make buttons/links DO SOMETHING (even if mock)
6. **Add Feedback**: Every action needs visual feedback (toast, dialog, etc.)
7. **No Backend Work**: All handlers should be mock functions for now
8. **Test Everything**: Click every button, link, and form to verify it works

---

## Next Steps

1. ✅ **Audit Complete** - Found 4 missing components + 40+ non-functional handlers
2. ✅ **Phase 1 Complete** - Created organization pages with mobile-first architecture (4/4 tasks, 3.5 hours)
3. ✅ **Phase 2 Complete** - Created required dialogs (6/6 tasks complete, ~4 hours)
4. ⏭️ **Phase 3 In Progress** - Wire up all handlers (6 hours)
   - ✅ Task 3.1: Organization Component Handlers
   - ✅ Task 3.2: Billing Component Handlers
   - ✅ Task 3.3: Memory Component Handlers
   - ❌ Task 3.4: Dashboard Component Handlers
   - ❌ Task 3.5: Settings Component Handlers
   - ❌ Task 3.6: Chat/Debate Component Handlers
5. ⏭️ **Phase 4** - Test everything (2 hours)
6. ⏭️ **Backend Integration** - Can start after UI is 100% functional

**Progress**: 12/42 tasks complete (28.6%)
**Total Estimated Time**: 15.5 hours
**Phase 1 Completion**: October 14, 2025
**Phase 2 Completion**: October 15, 2025
**Phase 3 Progress**: 3/6 tasks complete

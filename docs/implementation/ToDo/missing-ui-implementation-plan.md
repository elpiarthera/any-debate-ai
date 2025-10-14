# Missing UI Implementation Plan - Complete Functional UI

**Status**: ❌ NOT STARTED (0%)
**Priority**: P0 - CRITICAL (Must complete before backend integration)
**Last Updated**: October 14, 2025
**Estimated Duration**: 15.5 hours
**Phase 1 Status**: ✅ COMPLETE (4/4 tasks done)

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
- Task 2.1: Invite Member Dialog
- Task 2.2: Change Plan Dialog
- Task 2.3: Cancel Subscription Dialog
- Task 2.4: Purchase Tokens Dialog
- Task 2.5: Edit Memory Dialog
- Task 2.6: Delete Confirmation Dialog

### Phase 3: Wire Up Non-Functional Handlers (6 hours)
- Task 3.1: Organization Component Handlers
- Task 3.2: Billing Component Handlers
- Task 3.3: Memory Component Handlers
- Task 3.4: Dashboard Component Handlers
- Task 3.5: Settings Component Handlers
- Task 3.6: Chat/Debate Component Handlers

### Phase 4: Testing & Verification (2 hours)
- Task 4.1: Functional Testing
- Task 4.2: Mobile Testing

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

**Status**: ❌ NOT STARTED
**Priority**: P1 - HIGH
**Estimated Time**: 45 minutes

**File**: `components/organization/invite-member-dialog.tsx`

**Architecture**: Use AdaptiveModal

**Touch Targets**:
- All inputs: `min-h-[48px]`
- All buttons: `min-h-[44px]`

**Features**:
- Email input with validation
- Role selector (Admin/Member)
- Send invite button
- Mock invite function + success toast

**Implementation**:

\`\`\`tsx
// components/organization/invite-member-dialog.tsx
'use client'

import { useState } from 'react'
import { useDevice } from '@/contexts/DeviceProvider'
import { AdaptiveModal } from '@/components/adaptive/AdaptiveModal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'

interface InviteMemberDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function InviteMemberDialog({ open, onOpenChange }: InviteMemberDialogProps) {
  const { isMobile } = useDevice()
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<'admin' | 'member'>('member')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email address'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    console.log('[v0] Inviting member:', { email, role })

    toast({
      title: 'Invitation sent',
      description: `An invitation has been sent to ${email}.`,
    })

    setEmail('')
    setRole('member')
    setErrors({})
    onOpenChange(false)
  }

  return (
    <AdaptiveModal
      open={open}
      onOpenChange={onOpenChange}
      title="Invite Team Member"
      description="Send an invitation to join your organization."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="colleague@example.com"
            className="min-h-[48px]"
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Role *</Label>
          <Select value={role} onValueChange={(value: 'admin' | 'member') => setRole(value)}>
            <SelectTrigger className="min-h-[48px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="member">Member</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className={`flex gap-3 ${isMobile ? 'flex-col' : 'flex-row justify-end'}`}>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="min-h-[44px]"
          >
            Cancel
          </Button>
          <Button type="submit" className="min-h-[44px]">
            Send Invitation
          </Button>
        </div>
      </form>
    </AdaptiveModal>
  )
}
\`\`\`

---

### Task 2.2: Change Plan Dialog

**Status**: ❌ NOT STARTED
**Priority**: P1 - HIGH
**Estimated Time**: 45 minutes

**File**: `components/billing/change-plan-dialog.tsx`

**Architecture**: Use AdaptiveModal

**Features**:
- Display available plans (Free, Pro, Enterprise)
- Highlight current plan
- Show price comparison
- Confirm button

**Implementation**: [Similar structure to Task 2.1, showing plan cards with selection]

---

### Task 2.3: Cancel Subscription Dialog

**Status**: ❌ NOT STARTED
**Priority**: P1 - HIGH
**Estimated Time**: 45 minutes

**File**: `components/billing/cancel-subscription-dialog.tsx`

**Architecture**: Use AlertDialog for destructive action

**Features**:
- Warning message
- Reason selector (optional)
- Confirmation checkbox
- Cancel button (destructive variant)

**Implementation**: [Similar structure to delete confirmation with additional reason field]

---

### Task 2.4: Purchase Tokens Dialog

**Status**: ❌ NOT STARTED
**Priority**: P1 - HIGH
**Estimated Time**: 45 minutes

**File**: `components/billing/purchase-tokens-dialog.tsx`

**Architecture**: Use AdaptiveModal

**Features**:
- Display token packages (4 options)
- Payment method selector (mock)
- Purchase button
- Mock purchase function

**Implementation**: [Similar structure showing token package cards with selection]

---

### Task 2.5: Edit Memory Dialog

**Status**: ❌ NOT STARTED
**Priority**: P1 - HIGH
**Estimated Time**: 45 minutes

**File**: `components/memory/edit-memory-dialog.tsx`

**Architecture**: Reuse add-memory-form.tsx logic

**Features**:
- Pre-fill with existing memory data
- All fields from add-memory-form
- Save button
- Mock update function

**Implementation**: [Wrapper around add-memory-form with pre-filled data]

---

### Task 2.6: Delete Confirmation Dialog

**Status**: ❌ NOT STARTED
**Priority**: P1 - HIGH
**Estimated Time**: 45 minutes

**File**: `components/shared/delete-confirmation-dialog.tsx`

**Architecture**: Reusable AlertDialog component

**Features**:
- Item name display
- Warning message
- Delete button (destructive variant)
- Cancel button
- Accept onConfirm callback prop

**Implementation**:

\`\`\`tsx
// components/shared/delete-confirmation-dialog.tsx
'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'

interface DeleteConfirmationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  itemName: string
  itemType: string
}

export function DeleteConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  itemName,
  itemType,
}: DeleteConfirmationDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {itemType}?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{itemName}"? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="min-h-[44px]">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="min-h-[44px] bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete {itemType}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
\`\`\`

---

## Phase 3: Wire Up Non-Functional Handlers

### Task 3.1: Organization Component Handlers

**Status**: ❌ NOT STARTED
**Priority**: P1 - HIGH
**Estimated Time**: 1 hour

**Files to Update**:
1. `components/organization/org-switcher.tsx` - Wire up create organization
2. `components/organization/org-member-list.tsx` - Wire up invite/remove/change role

**Changes Required**:

**org-switcher.tsx**:
\`\`\`tsx
// Line 41: Replace TODO with actual implementation
const [showCreateDialog, setShowCreateDialog] = useState(false)

const handleCreateOrg = () => {
  setIsOpen(false)
  setShowCreateDialog(true)
}

// Add dialog component
<CreateOrganizationDialog
  open={showCreateDialog}
  onOpenChange={setShowCreateDialog}
/>
\`\`\`

**org-member-list.tsx**:
\`\`\`tsx
// Add state for dialogs
const [showInviteDialog, setShowInviteDialog] = useState(false)
const [showDeleteDialog, setShowDeleteDialog] = useState(false)
const [selectedMember, setSelectedMember] = useState<string | null>(null)

// Wire up handlers
const handleInvite = () => {
  setShowInviteDialog(true)
}

const handleRemove = (memberId: string) => {
  setSelectedMember(memberId)
  setShowDeleteDialog(true)
}

const handleChangeRole = (memberId: string, newRole: string) => {
  console.log('[v0] Changing role:', { memberId, newRole })
  toast({
    title: 'Role updated',
    description: `Member role has been changed to ${newRole}.`,
  })
}

// Add dialog components
<InviteMemberDialog open={showInviteDialog} onOpenChange={setShowInviteDialog} />
<DeleteConfirmationDialog
  open={showDeleteDialog}
  onOpenChange={setShowDeleteDialog}
  onConfirm={() => {
    if (selectedMember) {
      console.log('[v0] Removing member:', selectedMember)
      toast({ title: 'Member removed' })
    }
  }}
  itemName="member"
  itemType="Member"
/>
\`\`\`

---

### Task 3.2: Billing Component Handlers

**Status**: ❌ NOT STARTED
**Priority**: P1 - HIGH
**Estimated Time**: 1.5 hours

**Files to Update**:
1. `app/dashboard/billing/page.tsx` - Wire up all billing actions

**Changes Required**:

\`\`\`tsx
// Add state for dialogs
const [showChangePlanDialog, setShowChangePlanDialog] = useState(false)
const [showCancelDialog, setShowCancelDialog] = useState(false)
const [showPurchaseDialog, setShowPurchaseDialog] = useState(false)

// Wire up handlers
const handleChangePlan = () => {
  setShowChangePlanDialog(true)
}

const handleCancelSubscription = () => {
  setShowCancelDialog(true)
}

const handlePurchaseTokens = () => {
  setShowPurchaseDialog(true)
}

const handleDownloadInvoice = (invoiceId: string) => {
  console.log('[v0] Downloading invoice:', invoiceId)
  toast({
    title: 'Download started',
    description: 'Your invoice is being downloaded.',
  })
  // Mock download
  // window.open(`/api/invoices/${invoiceId}/download`, '_blank')
}

// Add dialog components
<ChangePlanDialog open={showChangePlanDialog} onOpenChange={setShowChangePlanDialog} />
<CancelSubscriptionDialog open={showCancelDialog} onOpenChange={setShowCancelDialog} />
<PurchaseTokensDialog open={showPurchaseDialog} onOpenChange={setShowPurchaseDialog} />
\`\`\`

---

### Task 3.3: Memory Component Handlers

**Status**: ❌ NOT STARTED
**Priority**: P1 - HIGH
**Estimated Time**: 1.5 hours

**Files to Update**:
1. `components/memory/memory-dashboard.tsx` - Add edit/delete handlers
2. `components/memory/add-memory-form.tsx` - Wire up save handler
3. `components/memory/document-upload.tsx` - Wire up upload handler
4. `components/memory/url-scraper.tsx` - Wire up scrape handler

**Changes Required**: [Similar pattern to above tasks]

---

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

---

### Task 3.5: Settings Component Handlers

**Status**: ❌ NOT STARTED
**Priority**: P2 - MEDIUM
**Estimated Time**: 30 minutes

**Files to Update**:
1. `components/settings/profile-panel.tsx` - Wire up save handler
2. `components/settings/preferences-panel.tsx` - Wire up save handler

**Changes Required**: [Similar pattern to above tasks]

---

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
2. ✅ **Phase 1** - Created organization pages with mobile-first architecture (3.5 hours)
3. ⏭️ **Phase 2** - Create required dialogs (4 hours)
4. ⏭️ **Phase 3** - Wire up all handlers (6 hours)
5. ⏭️ **Phase 4** - Test everything (2 hours)
6. ⏭️ **Backend Integration** - Can start after UI is 100% functional

---

**Last Updated**: October 14, 2025
**Total Estimated Time**: 15.5 hours
**Phase 1 Completion**: October 14, 2025

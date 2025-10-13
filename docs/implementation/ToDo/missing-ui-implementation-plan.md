# Missing UI Implementation Plan - Complete Functional UI

**Status**: ❌ NOT STARTED (0%)
**Priority**: P0 - CRITICAL (Must complete before backend integration)
**Last Updated**: October 13, 2025
**Estimated Duration**: 15.5 hours

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
- Task 1.1: Create Organization Dialog
- Task 1.2: Organization Overview Page
- Task 1.3: Organization Settings Page
- Task 1.4: Organization Members Page

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

### Task 1.1: Create Organization Dialog

**Status**: ❌ NOT STARTED
**Priority**: P0 - CRITICAL
**Estimated Time**: 1 hour

**File**: `components/organization/create-organization-dialog.tsx`

**Architecture**: Use AdaptiveModal (full-screen drawer on mobile, center modal on desktop)

**Touch Targets**:
- All inputs: `min-h-[48px]` (prevents iOS zoom)
- All buttons: `min-h-[44px]` (WCAG 2.1 Level AA)
- Form spacing: `gap-4` (adequate spacing between elements)

**Features**:
- Organization name input (required, 3-50 chars)
- Organization slug input (required, auto-generate from name)
- Organization description textarea (optional, max 500 chars)
- Real-time validation with error messages
- Create button (primary, 44px min height)
- Cancel button (secondary, 44px min height)

**Mobile Specifications**:
- Full-screen drawer using AdaptiveModal
- Stacked form layout (vertical)
- Full-width inputs (48px height)
- Full-width buttons at bottom (44px height)
- Keyboard-aware scrolling

**Desktop Specifications**:
- Center modal (500px width)
- Stacked form layout with proper spacing
- Standard input widths
- Right-aligned buttons (side-by-side)
- Focus trap for accessibility

**Mock Data**:
\`\`\`typescript
const mockOrganizations = [
  { id: '1', name: 'Personal Workspace', slug: 'personal', role: 'owner' },
  { id: '2', name: 'Acme Corp', slug: 'acme-corp', role: 'admin' },
];
\`\`\`

**Implementation**:

\`\`\`tsx
// components/organization/create-organization-dialog.tsx
'use client'

import { useState } from 'react'
import { useDevice } from '@/contexts/DeviceProvider'
import { AdaptiveModal } from '@/components/adaptive/AdaptiveModal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'

interface CreateOrganizationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateOrganizationDialog({
  open,
  onOpenChange,
}: CreateOrganizationDialogProps) {
  const { isMobile } = useDevice()
  const { toast } = useToast()
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Auto-generate slug from name
  const handleNameChange = (value: string) => {
    setName(value)
    const generatedSlug = value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    setSlug(generatedSlug)
  }

  // Validate form
  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) {
      newErrors.name = 'Organization name is required'
    } else if (name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters'
    } else if (name.length > 50) {
      newErrors.name = 'Name must be less than 50 characters'
    }

    if (!slug.trim()) {
      newErrors.slug = 'Organization slug is required'
    } else if (!/^[a-z0-9-]+$/.test(slug)) {
      newErrors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens'
    }

    if (description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission (mock)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    // Mock organization creation
    console.log('[v0] Creating organization:', { name, slug, description })

    // Show success toast
    toast({
      title: 'Organization created',
      description: `${name} has been created successfully.`,
    })

    // Reset form and close dialog
    setName('')
    setSlug('')
    setDescription('')
    setErrors({})
    onOpenChange(false)
  }

  return (
    <AdaptiveModal
      open={open}
      onOpenChange={onOpenChange}
      title="Create Organization"
      description="Create a new organization to collaborate with your team."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Organization Name */}
        <div className="space-y-2">
          <Label htmlFor="org-name">Organization Name *</Label>
          <Input
            id="org-name"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Acme Corp"
            className="min-h-[48px]"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'org-name-error' : undefined}
          />
          {errors.name && (
            <p id="org-name-error" className="text-sm text-destructive">
              {errors.name}
            </p>
          )}
        </div>

        {/* Organization Slug */}
        <div className="space-y-2">
          <Label htmlFor="org-slug">Organization Slug *</Label>
          <Input
            id="org-slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="acme-corp"
            className="min-h-[48px]"
            aria-invalid={!!errors.slug}
            aria-describedby={errors.slug ? 'org-slug-error' : undefined}
          />
          {errors.slug && (
            <p id="org-slug-error" className="text-sm text-destructive">
              {errors.slug}
            </p>
          )}
          <p className="text-sm text-muted-foreground">
            Used in URLs: yourapp.com/org/{slug || 'your-slug'}
          </p>
        </div>

        {/* Organization Description */}
        <div className="space-y-2">
          <Label htmlFor="org-description">Description (Optional)</Label>
          <Textarea
            id="org-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us about your organization..."
            className="min-h-[96px] resize-none"
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? 'org-description-error' : undefined}
          />
          {errors.description && (
            <p id="org-description-error" className="text-sm text-destructive">
              {errors.description}
            </p>
          )}
          <p className="text-sm text-muted-foreground">
            {description.length}/500 characters
          </p>
        </div>

        {/* Action Buttons */}
        <div className={`flex gap-3 ${isMobile ? 'flex-col' : 'flex-row justify-end'}`}>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="min-h-[44px]"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="min-h-[44px]"
          >
            Create Organization
          </Button>
        </div>
      </form>
    </AdaptiveModal>
  )
}
\`\`\`

**Integration Required**:
- Update `components/organization/org-switcher.tsx` line 41:
  \`\`\`tsx
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

---

### Task 1.2: Organization Overview Page

**Status**: ❌ NOT STARTED
**Priority**: P0 - CRITICAL
**Estimated Time**: 1 hour

**File**: `app/dashboard/organization/page.tsx`

**Architecture**: Use DashboardLayout wrapper with AdminOnlyGuard

**Touch Targets**:
- All cards: `min-h-[80px]` (comfortable tapping)
- All buttons: `min-h-[44px]` (WCAG 2.1 Level AA)
- Card spacing: `gap-4` (adequate spacing)

**Features**:
- Organization stats (4 metric cards)
- Quick actions (3 action cards)
- Recent activity (last 5 activities)
- Member preview (first 5 members with "View All" link)

**Mobile Specifications**:
- 1 column layout
- Stacked sections with vertical spacing
- Full-width cards (80px min height)
- Scrollable activity list

**Desktop Specifications**:
- 2-4 column grid for stats
- 3 column grid for quick actions
- Side-by-side activity and members
- Hover states on cards

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

**Implementation**:

\`\`\`tsx
// app/dashboard/organization/page.tsx
'use client'

import { useDevice } from '@/contexts/DeviceProvider'
import { AdminOnlyGuard } from '@/components/organization/admin-only-guard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, MessageSquare, Coins, TrendingUp, UserPlus, Settings, FileText } from 'lucide-react'

// Mock data
const mockOrgStats = {
  totalMembers: 12,
  activeDebates: 8,
  totalTokens: 50000,
  usedTokens: 12500,
}

const mockRecentActivity = [
  { id: '1', user: 'John Doe', action: 'started a debate', time: '2 hours ago', icon: MessageSquare },
  { id: '2', user: 'Jane Smith', action: 'invited a member', time: '5 hours ago', icon: UserPlus },
  { id: '3', user: 'Bob Wilson', action: 'updated settings', time: '1 day ago', icon: Settings },
  { id: '4', user: 'Alice Brown', action: 'created a template', time: '2 days ago', icon: FileText },
  { id: '5', user: 'Charlie Davis', action: 'started a debate', time: '3 days ago', icon: MessageSquare },
]

const mockMembers = [
  { id: '1', name: 'John Doe', role: 'admin', avatar: '/avatars/john.png' },
  { id: '2', name: 'Jane Smith', role: 'member', avatar: '/avatars/jane.png' },
  { id: '3', name: 'Bob Wilson', role: 'member', avatar: '/avatars/bob.png' },
  { id: '4', name: 'Alice Brown', role: 'member', avatar: '/avatars/alice.png' },
  { id: '5', name: 'Charlie Davis', role: 'member', avatar: '/avatars/charlie.png' },
]

export default function OrganizationPage() {
  const { isMobile } = useDevice()

  return (
    <AdminOnlyGuard>
      <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Organization Overview</h1>
          <p className="text-muted-foreground mt-1">
            Manage your organization and track activity
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Members */}
          <Card className="min-h-[80px]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockOrgStats.totalMembers}</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>

          {/* Active Debates */}
          <Card className="min-h-[80px]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Debates</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockOrgStats.activeDebates}</div>
              <p className="text-xs text-muted-foreground">+3 from last week</p>
            </CardContent>
          </Card>

          {/* Token Usage */}
          <Card className="min-h-[80px]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Token Usage</CardTitle>
              <Coins className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {((mockOrgStats.usedTokens / mockOrgStats.totalTokens) * 100).toFixed(0)}%
              </div>
              <p className="text-xs text-muted-foreground">
                {mockOrgStats.usedTokens.toLocaleString()} / {mockOrgStats.totalTokens.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          {/* Growth */}
          <Card className="min-h-[80px]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Growth</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12%</div>
              <p className="text-xs text-muted-foreground">vs last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="min-h-[80px] cursor-pointer hover:bg-accent transition-colors">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  Invite Members
                </CardTitle>
                <CardDescription>Add new team members to your organization</CardDescription>
              </CardHeader>
            </Card>

            <Card className="min-h-[80px] cursor-pointer hover:bg-accent transition-colors">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Organization Settings
                </CardTitle>
                <CardDescription>Manage organization details and preferences</CardDescription>
              </CardHeader>
            </Card>

            <Card className="min-h-[80px] cursor-pointer hover:bg-accent transition-colors">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  View Reports
                </CardTitle>
                <CardDescription>Access analytics and usage reports</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Recent Activity & Members */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions in your organization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentActivity.map((activity) => {
                  const Icon = activity.icon
                  return (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="rounded-full bg-muted p-2">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span>{' '}
                          {activity.action}
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Member Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Your organization members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{member.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{member.role}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full min-h-[44px] bg-transparent">
                  View All Members
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminOnlyGuard>
  )
}
\`\`\`

---

### Task 1.3: Organization Settings Page

**Status**: ❌ NOT STARTED
**Priority**: P0 - CRITICAL
**Estimated Time**: 1 hour

**File**: `app/dashboard/organization/settings/page.tsx`

**Architecture**: Use DashboardLayout wrapper with AdminOnlyGuard

**Touch Targets**:
- All inputs: `min-h-[48px]` (prevents iOS zoom)
- All buttons: `min-h-[44px]` (WCAG 2.1 Level AA)
- Form spacing: `gap-4` (adequate spacing)

**Features**:
- General settings form (name, slug, description, avatar)
- Danger zone (delete organization with confirmation)
- Save button with loading state
- Cancel button to discard changes

**Mobile Specifications**:
- Stacked form layout (vertical)
- Full-width inputs (48px height)
- Full-width buttons at bottom (44px height)
- Danger zone at bottom with warning

**Desktop Specifications**:
- Stacked form layout with proper spacing
- Standard input widths
- Right-aligned buttons (side-by-side)
- Danger zone in separate card

**Mock Data**:
\`\`\`typescript
const mockOrganization = {
  id: '2',
  name: 'Acme Corp',
  slug: 'acme-corp',
  description: 'Building the future of AI debates',
  avatar: '/org-avatars/acme.png',
}
\`\`\`

**Implementation**:

\`\`\`tsx
// app/dashboard/organization/settings/page.tsx
'use client'

import { useState } from 'react'
import { useDevice } from '@/contexts/DeviceProvider'
import { AdminOnlyGuard } from '@/components/organization/admin-only-guard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { useToast } from '@/hooks/use-toast'
import { Trash2 } from 'lucide-react'

// Mock data
const mockOrganization = {
  id: '2',
  name: 'Acme Corp',
  slug: 'acme-corp',
  description: 'Building the future of AI debates',
  avatar: '/org-avatars/acme.png',
}

export default function OrganizationSettingsPage() {
  const { isMobile } = useDevice()
  const { toast } = useToast()
  const [name, setName] = useState(mockOrganization.name)
  const [slug, setSlug] = useState(mockOrganization.slug)
  const [description, setDescription] = useState(mockOrganization.description)
  const [isSaving, setIsSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Validate form
  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) {
      newErrors.name = 'Organization name is required'
    } else if (name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters'
    } else if (name.length > 50) {
      newErrors.name = 'Name must be less than 50 characters'
    }

    if (!slug.trim()) {
      newErrors.slug = 'Organization slug is required'
    } else if (!/^[a-z0-9-]+$/.test(slug)) {
      newErrors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens'
    }

    if (description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle save (mock)
  const handleSave = async () => {
    if (!validate()) return

    setIsSaving(true)

    // Mock save delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    console.log('[v0] Saving organization settings:', { name, slug, description })

    toast({
      title: 'Settings saved',
      description: 'Organization settings have been updated successfully.',
    })

    setIsSaving(false)
  }

  // Handle delete (mock)
  const handleDelete = () => {
    console.log('[v0] Deleting organization:', mockOrganization.id)

    toast({
      title: 'Organization deleted',
      description: 'Your organization has been deleted successfully.',
      variant: 'destructive',
    })

    // Mock redirect to dashboard
    // router.push('/dashboard')
  }

  // Handle cancel
  const handleCancel = () => {
    setName(mockOrganization.name)
    setSlug(mockOrganization.slug)
    setDescription(mockOrganization.description)
    setErrors({})

    toast({
      title: 'Changes discarded',
      description: 'Your changes have been discarded.',
    })
  }

  return (
    <AdminOnlyGuard>
      <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Organization Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your organization details and preferences
          </p>
        </div>

        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Update your organization information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Organization Name */}
            <div className="space-y-2">
              <Label htmlFor="org-name">Organization Name *</Label>
              <Input
                id="org-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Acme Corp"
                className="min-h-[48px]"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'org-name-error' : undefined}
              />
              {errors.name && (
                <p id="org-name-error" className="text-sm text-destructive">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Organization Slug */}
            <div className="space-y-2">
              <Label htmlFor="org-slug">Organization Slug *</Label>
              <Input
                id="org-slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="acme-corp"
                className="min-h-[48px]"
                aria-invalid={!!errors.slug}
                aria-describedby={errors.slug ? 'org-slug-error' : undefined}
              />
              {errors.slug && (
                <p id="org-slug-error" className="text-sm text-destructive">
                  {errors.slug}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                Used in URLs: yourapp.com/org/{slug || 'your-slug'}
              </p>
            </div>

            {/* Organization Description */}
            <div className="space-y-2">
              <Label htmlFor="org-description">Description (Optional)</Label>
              <Textarea
                id="org-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell us about your organization..."
                className="min-h-[96px] resize-none"
                aria-invalid={!!errors.description}
                aria-describedby={errors.description ? 'org-description-error' : undefined}
              />
              {errors.description && (
                <p id="org-description-error" className="text-sm text-destructive">
                  {errors.description}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                {description.length}/500 characters
              </p>
            </div>

            {/* Action Buttons */}
            <div className={`flex gap-3 ${isMobile ? 'flex-col' : 'flex-row justify-end'}`}>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="min-h-[44px] bg-transparent"
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSave}
                className="min-h-[44px]"
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>Irreversible actions for your organization</CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="min-h-[44px]">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Organization
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    organization and remove all associated data including members,
                    debates, and settings.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="min-h-[44px]">Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="min-h-[44px] bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete Organization
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </AdminOnlyGuard>
  )
}
\`\`\`

---

### Task 1.4: Organization Members Page

**Status**: ❌ NOT STARTED
**Priority**: P0 - CRITICAL
**Estimated Time**: 30 minutes

**File**: `app/dashboard/organization/members/page.tsx`

**Architecture**: Use DashboardLayout wrapper with AdminOnlyGuard, wrap existing OrgMemberList component

**Touch Targets**:
- All buttons: `min-h-[44px]` (WCAG 2.1 Level AA)
- All list items: `min-h-[80px]` (comfortable tapping)

**Features**:
- Reuse existing `OrgMemberList` component
- Wire up invite, remove, and change role handlers
- Add page header with invite button

**Mobile Specifications**:
- Full-width layout
- Stacked member cards (80px min height)
- Floating action button for invite (56px)

**Desktop Specifications**:
- Constrained width layout
- Table/list view for members
- Invite button in page header

**Implementation**:

\`\`\`tsx
// app/dashboard/organization/members/page.tsx
'use client'

import { useState } from 'react'
import { AdminOnlyGuard } from '@/components/organization/admin-only-guard'
import { OrgMemberList } from '@/components/organization/org-member-list'
import { Button } from '@/components/ui/button'
import { UserPlus } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function OrganizationMembersPage() {
  const { toast } = useToast()
  const [showInviteDialog, setShowInviteDialog] = useState(false)

  // Handle invite member (mock)
  const handleInviteMember = () => {
    setShowInviteDialog(true)
    console.log('[v0] Opening invite member dialog')
  }

  // Handle remove member (mock)
  const handleRemoveMember = (memberId: string) => {
    console.log('[v0] Removing member:', memberId)
    toast({
      title: 'Member removed',
      description: 'The member has been removed from your organization.',
    })
  }

  // Handle change role (mock)
  const handleChangeRole = (memberId: string, newRole: string) => {
    console.log('[v0] Changing role:', { memberId, newRole })
    toast({
      title: 'Role updated',
      description: `Member role has been changed to ${newRole}.`,
    })
  }

  return (
    <AdminOnlyGuard>
      <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Team Members</h1>
            <p className="text-muted-foreground mt-1">
              Manage your organization members and their roles
            </p>
          </div>
          <Button onClick={handleInviteMember} className="min-h-[44px]">
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Member
          </Button>
        </div>

        {/* Member List */}
        <OrgMemberList
          onInviteMember={handleInviteMember}
          onRemoveMember={handleRemoveMember}
          onChangeRole={handleChangeRole}
        />
      </div>
    </AdminOnlyGuard>
  )
}
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
- [ ] Every link has proper href or onClick
- [ ] No href="#" links
- [ ] Navigation works correctly
- [ ] No 404 errors

### All Forms Work
- [ ] Form submission triggers handler
- [ ] Validation works
- [ ] Error messages display
- [ ] Success feedback displays

### All Dialogs Work
- [ ] Dialogs open when triggered
- [ ] Dialogs close properly
- [ ] Form submission works
- [ ] Cancel button works

### Mobile-First Works
- [ ] All touch targets ≥ 44px
- [ ] All inputs ≥ 48px
- [ ] Responsive layouts work
- [ ] Adaptive components work

---

## Notes

1. **UI Exists But Non-Functional**: Most components are built but handlers are empty/mock-only
2. **Mock Data Is OK**: Using mock data is expected for UI-only phase
3. **Focus on Functionality**: Make buttons/links DO SOMETHING (even if mock)
4. **Add Feedback**: Every action needs visual feedback (toast, dialog, etc.)
5. **Follow Mobile-First**: All new components must follow best practices
6. **No Backend Work**: All handlers should be mock functions for now
7. **Test Everything**: Click every button, link, and form to verify it works

---

## Next Steps

1. ✅ **Audit Complete** - Found 4 missing components + 40+ non-functional handlers
2. ⏭️ **Phase 1** - Create missing components (3.5 hours)
3. ⏭️ **Phase 2** - Create required dialogs (4 hours)
4. ⏭️ **Phase 3** - Wire up all handlers (6 hours)
5. ⏭️ **Phase 4** - Test everything (2 hours)
6. ⏭️ **Backend Integration** - Can start after UI is 100% functional

---

**Last Updated**: October 13, 2025
**Total Estimated Time**: 15.5 hours

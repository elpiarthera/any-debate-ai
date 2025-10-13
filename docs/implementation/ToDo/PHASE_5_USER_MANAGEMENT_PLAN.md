# Phase 5: User Management & Organizations Plan

**Status**: 🔴 Not Started (0%)  
**Priority**: P2 - Medium Priority  
**Dependencies**: Phase 4 (Convex Database) Complete  
**Estimated Timeline**: 8-12 hours  
**Last Updated**: October 11, 2025

---

## 📋 Overview

This phase implements user management and multi-tenant organization features using **Clerk Organizations** (out-of-the-box). We leverage Clerk's built-in organization management instead of building custom team features.

**Key Principle**: Keep it simple - use Clerk's ready-to-use solutions, don't reinvent the wheel.

**Official Documentation**:
- [Clerk Organizations Overview](https://clerk.com/docs/guides/organizations/overview)
- [Clerk Roles & Permissions](https://clerk.com/docs/guides/organizations/roles-and-permissions)
- [useOrganization Hook](https://clerk.com/docs/nextjs/reference/hooks/use-organization)
- [Organization Components](https://clerk.com/docs/nextjs/reference/components/overview)
- [Official Example App](https://github.com/clerk/orgs)

### Key Objectives

- Integrate Clerk Organizations for multi-tenancy
- Implement organization switcher for multi-org users
- Add minimal user preferences (theme, default model)
- Ensure organization-scoped data access
- Implement admin-only billing access
- Enable cross-device synchronization

### Success Criteria

- [ ] Clerk Organizations integrated and working
- [ ] Organization switcher functional
- [ ] User preferences working
- [ ] Organization-scoped queries enforced
- [ ] Admin-only billing access implemented
- [ ] Cross-device sync functional
- [ ] Mobile-optimized UI

---

## 🏗️ Implementation Phases

### Phase 1: Clerk Organizations Setup

**Timeline**: 3-4 hours  
**Status**: ⬜ Not Started

#### Task 1.1: Clerk Organizations Configuration

**Requirements**:
- Enable Organizations in Clerk Dashboard
- Configure organization settings
- Set up JWT template with custom claims
- Integrate ClerkProvider with organization support

**Implementation**:

\`\`\`bash
# Clerk SDK already installed in Phase 4
# Just need to enable Organizations feature in Clerk Dashboard
\`\`\`

**Clerk Dashboard Configuration Steps**:

1. **Enable Organizations**:
   - Navigate to [Organizations Settings](https://dashboard.clerk.com/last-active?path=organizations-settings)
   - Click "Enable Organizations"

2. **Configure Default Roles** (already set by default):
   - **Creator role**: `org:admin` (assigned to organization creator)
   - **Default role**: `org:member` (assigned to new members)
   - Keep these defaults for MVP

3. **Configure JWT Template** (from Phase 4):
   - Navigate to [JWT Templates](https://dashboard.clerk.com/last-active?path=jwt-templates)
   - Select the "convex" template (created in Phase 4)
   - Verify custom claims include:
     \`\`\`json
     {
       "org_id": "{{org.id}}",
       "org_role": "{{org.role}}",
       "org_slug": "{{org.slug}}"
     }
     \`\`\`

4. **Organization Settings**:
   - **Membership limit**: Set to unlimited (Pro plan) or 5 (Free plan)
   - **Allow organization creation**: Enable (users can create orgs)
   - **Allow organization deletion**: Enable (admins can delete orgs)

**Files to Modify**:
- `app/layout.tsx` - Already has ClerkProvider from Phase 4
- Clerk Dashboard - Enable Organizations

**Success Criteria**:
- [ ] Organizations enabled in Clerk
- [ ] JWT template configured with org claims
- [ ] ClerkProvider working

---

#### Task 1.2: Organization Switcher UI

**Requirements**:
- Add Clerk's OrganizationSwitcher component
- Implement organization creation flow
- Add mobile-optimized organization selector

**Implementation**:

\`\`\`typescript
// components/layout/Header.tsx
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Logo />
        
        {/* Organization Switcher - Clerk's built-in component */}
        <OrganizationSwitcher
          appearance={{
            elements: {
              rootBox: "flex items-center",
              organizationSwitcherTrigger: "min-h-[44px] px-4", // Touch-optimized
              organizationSwitcherTriggerIcon: "text-muted-foreground",
            },
          }}
          createOrganizationMode="modal"
          createOrganizationUrl="/create-organization"
          afterCreateOrganizationUrl="/dashboard"
          organizationProfileMode="modal"
          organizationProfileUrl="/organization-profile"
          afterSelectOrganizationUrl="/dashboard"
          afterSelectPersonalUrl="/dashboard"
          hidePersonal={false} // Set to true if you want B2B-only
        />
        
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: "w-10 h-10", // Touch-optimized
            },
          }}
          afterSignOutUrl="/"
        />
      </div>
    </header>
  )
}
\`\`\`

**Alternative: OrganizationList Component**

If you want more control over the organization selection UI, use `<OrganizationList />`:

\`\`\`typescript
// app/select-organization/page.tsx
"use client"

import { OrganizationList } from "@clerk/nextjs"

export default function SelectOrganizationPage() {
  return (
    <div className="container mx-auto p-4 flex items-center justify-center min-h-screen">
      <OrganizationList
        afterCreateOrganizationUrl="/dashboard"
        afterSelectOrganizationUrl="/dashboard"
        hidePersonal={false}
      />
    </div>
  )
}
\`\`\`

**Files to Create/Modify**:
- `components/layout/Header.tsx` - Add OrganizationSwitcher

**Mobile-First Considerations**:
- Touch-optimized switcher (44px minimum height)
- Responsive organization list
- Clear visual feedback on mobile

**Success Criteria**:
- [ ] OrganizationSwitcher visible in header
- [ ] Organization creation working
- [ ] Organization switching functional
- [ ] Mobile-optimized UI

---

#### Task 1.3: Organization Context & Hooks

**Requirements**:
- Create hooks for accessing organization data
- Implement organization-scoped queries
- Add organization loading states

**Implementation**:

\`\`\`typescript
// hooks/use-organization-context.ts
import { useOrganization } from "@clerk/nextjs"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

export function useOrganizationContext() {
  const { 
    organization, 
    membership, 
    isLoaded,
    memberships,
  } = useOrganization({
    memberships: {
      pageSize: 10,
      keepPreviousData: true,
    },
  })
  
  // Fetch organization data from Convex (if needed)
  const orgData = useQuery(
    api.organizations.getOrganization,
    organization?.id ? { organizationId: organization.id } : "skip"
  )
  
  const isAdmin = membership?.role === 'org:admin'
  const isMember = membership?.role === 'org:member'
  
  return {
    organization,
    orgData,
    membership,
    memberships,
    isAdmin,
    isMember,
    isLoaded,
    organizationId: organization?.id,
  }
}
\`\`\`

**Files to Create**:
- `hooks/use-organization-context.ts` - Organization context hook
- `hooks/use-require-organization.ts` - Organization requirement hook

**Success Criteria**:
- [ ] Organization hooks working
- [ ] Organization data accessible
- [ ] Loading states working
- [ ] Admin/member role checks working

---

### Phase 2: User Preferences & Settings

**Timeline**: 2-3 hours  
**Status**: ⬜ Not Started

#### Task 2.1: User Preferences Schema

**Requirements**:
- Add minimal user preferences to Convex
- Store only app-specific preferences (NOT user profile data)
- Link preferences to Clerk user ID

**Implementation**:

\`\`\`typescript
// convex/schema.ts (additions)
export default defineSchema({
  // ... existing tables ...
  
  userPreferences: defineTable({
    clerkUserId: v.string(), // Clerk user ID
    organizationId: v.string(), // Current org context
    preferences: v.object({
      theme: v.union(v.literal("light"), v.literal("dark"), v.literal("system")),
      defaultModel: v.optional(v.string()),
      autoSave: v.boolean(),
      language: v.string(),
    }),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerk_user", ["clerkUserId"])
    .index("by_organization", ["organizationId"])
    .index("by_clerk_user_and_org", ["clerkUserId", "organizationId"]),
})
\`\`\`

**Note**: We do NOT store user profile data (name, email, avatar) - Clerk handles that.

**Files to Modify**:
- `convex/schema.ts` - Add userPreferences table

**Success Criteria**:
- [ ] User preferences schema defined
- [ ] Preferences linked to Clerk user ID
- [ ] Organization-scoped preferences

---

#### Task 2.2: Preferences Functions

**Requirements**:
- Create queries for fetching preferences
- Implement mutations for updating preferences
- Add default preferences initialization

**Implementation**:

\`\`\`typescript
// convex/userPreferences.ts
import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

// Query: Get user preferences
export const getUserPreferences = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return null
    
    const orgId = identity.org_id
    if (!orgId) return null
    
    return await ctx.db
      .query("userPreferences")
      .withIndex("by_clerk_user_and_org", (q) => 
        q.eq("clerkUserId", identity.subject).eq("organizationId", orgId)
      )
      .first()
  },
})

// Mutation: Update user preferences
export const updatePreferences = mutation({
  args: {
    preferences: v.object({
      theme: v.optional(v.union(v.literal("light"), v.literal("dark"), v.literal("system"))),
      defaultModel: v.optional(v.string()),
      autoSave: v.optional(v.boolean()),
      language: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthenticated")
    
    const orgId = identity.org_id
    if (!orgId) throw new Error("No active organization")
    
    const existing = await ctx.db
      .query("userPreferences")
      .withIndex("by_clerk_user_and_org", (q) => 
        q.eq("clerkUserId", identity.subject).eq("organizationId", orgId)
      )
      .first()
    
    if (existing) {
      await ctx.db.patch(existing._id, {
        preferences: { ...existing.preferences, ...args.preferences },
        updatedAt: Date.now(),
      })
    } else {
      await ctx.db.insert("userPreferences", {
        clerkUserId: identity.subject,
        organizationId: orgId,
        preferences: {
          theme: "system",
          autoSave: true,
          language: "en",
          ...args.preferences,
        },
        createdAt: Date.now(),
        updatedAt: Date.now(),
      })
    }
  },
})
\`\`\`

**Files to Create**:
- `convex/userPreferences.ts` - Preferences queries and mutations

**Success Criteria**:
- [ ] Preferences queries working
- [ ] Preferences mutations working
- [ ] Default preferences initialization

---

#### Task 2.3: Settings UI

**Requirements**:
- Create settings page
- Implement preferences editing interface
- Add Clerk's UserProfile component for profile management

**Implementation**:

\`\`\`typescript
// app/settings/page.tsx
"use client"

import { UserProfile } from "@clerk/nextjs"
import { PreferencesPanel } from "@/components/settings/PreferencesPanel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          {/* Clerk's built-in profile management */}
          <UserProfile
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none border",
                navbar: "hidden", // Hide navbar for cleaner look
                pageScrollBox: "p-0",
              },
            }}
            routing="path"
            path="/settings"
          />
        </TabsContent>
        
        <TabsContent value="preferences">
          <PreferencesPanel />
        </TabsContent>
      </Tabs>
    </div>
  )
}
\`\`\`

**Files to Create**:
- `app/settings/page.tsx` - Settings page
- `components/settings/PreferencesPanel.tsx` - Preferences panel

**Mobile-First Considerations**:
- Touch-optimized inputs (48px height)
- Touch-optimized buttons (44px minimum)
- Responsive layout
- Clear visual feedback

**Success Criteria**:
- [ ] Settings page working
- [ ] Clerk UserProfile integrated
- [ ] Preferences editing functional
- [ ] Mobile-optimized UI

---

### Phase 3: Organization-Scoped Data Access

**Timeline**: 2-3 hours  
**Status**: ⬜ Not Started

#### Task 3.1: Update All Queries with Organization Filtering

**Requirements**:
- Add organizationId to all tenant-scoped tables
- Update all queries to filter by organizationId
- Add organization checks to all mutations

**Implementation**:

\`\`\`typescript
// convex/sessions.ts (updated)
export const getSessions = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return []
    
    const orgId = identity.org_id
    if (!orgId) return []
    
    return await ctx.db
      .query("sessions")
      .withIndex("by_organization", (q) => q.eq("organizationId", orgId))
      .order("desc")
      .take(args.limit || 50)
  },
})

export const createSession = mutation({
  args: {
    title: v.string(),
    mode: v.union(v.literal("compare"), v.literal("debate"), v.literal("auto-debate")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthenticated")
    
    const orgId = identity.org_id
    if (!orgId) throw new Error("No active organization")
    
    return await ctx.db.insert("sessions", {
      ...args,
      organizationId: orgId,
      userId: identity.subject,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
  },
})
\`\`\`

**Files to Modify**:
- `convex/sessions.ts` - Add organization filtering
- `convex/messages.ts` - Add organization filtering
- `convex/agents.ts` - Add organization filtering
- `convex/artifacts.ts` - Add organization filtering

**Success Criteria**:
- [ ] All queries filter by organizationId
- [ ] All mutations include organizationId
- [ ] Organization isolation enforced

---

#### Task 3.2: Admin-Only Billing Access

**Requirements**:
- Create billing page accessible only to admins
- Add permission checks for billing routes
- Implement billing UI with Polar integration

**Implementation**:

\`\`\`typescript
// app/billing/page.tsx
"use client"

import { useOrganizationContext } from "@/hooks/use-organization-context"
import { useRouter } from 'next/navigation'
import { useEffect } from "react"
import { BillingPanel } from "@/components/billing/BillingPanel"

export default function BillingPage() {
  const { isAdmin, isLoaded } = useOrganizationContext()
  const router = useRouter()
  
  useEffect(() => {
    if (isLoaded && !isAdmin) {
      router.push("/dashboard")
    }
  }, [isLoaded, isAdmin, router])
  
  if (!isLoaded) return <div>Loading...</div>
  if (!isAdmin) return null
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Billing & Subscription</h1>
      <p className="text-muted-foreground">
        Only organization admins can access billing settings.
      </p>
      <BillingPanel />
    </div>
  )
}
\`\`\`

**Files to Create/Modify**:
- `app/billing/page.tsx` - Billing page (admin-only)
- `components/billing/BillingPanel.tsx` - Billing UI
- `middleware.ts` - Add billing route protection

**Success Criteria**:
- [ ] Billing page accessible only to admins
- [ ] Members redirected from billing page
- [ ] Clear error messages for unauthorized access

---

### Phase 4: Cross-Device Synchronization

**Timeline**: 1-2 hours  
**Status**: ⬜ Not Started

#### Task 4.1: Real-Time Sync

**Requirements**:
- Implement real-time sync using Convex subscriptions
- Add sync status indicators
- Handle offline scenarios

**Implementation**:

\`\`\`typescript
// hooks/use-cross-device-sync.ts
"use client"

import { useEffect, useState } from "react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useOrganizationContext } from "./use-organization-context"

export function useCrossDeviceSync() {
  const { organizationId } = useOrganizationContext()
  const [syncStatus, setSyncStatus] = useState<"synced" | "syncing" | "offline">("synced")
  
  // Subscribe to organization's sessions for real-time updates
  const sessions = useQuery(
    api.sessions.getSessions,
    organizationId ? {} : "skip"
  )
  
  useEffect(() => {
    if (!navigator.onLine) {
      setSyncStatus("offline")
    } else if (sessions) {
      setSyncStatus("synced")
    } else {
      setSyncStatus("syncing")
    }
  }, [sessions])
  
  return {
    syncStatus,
    isSynced: syncStatus === "synced",
    isOffline: syncStatus === "offline",
  }
}
\`\`\`

\`\`\`typescript
// components/ui/sync-indicator.tsx
"use client"

import { useCrossDeviceSync } from "@/hooks/use-cross-device-sync"
import { Cloud, CloudOff, Loader2 } from 'lucide-react'

export function SyncIndicator() {
  const { syncStatus } = useCrossDeviceSync()
  
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      {syncStatus === "synced" && (
        <>
          <Cloud className="w-4 h-4" />
          <span>Synced</span>
        </>
      )}
      {syncStatus === "syncing" && (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Syncing...</span>
        </>
      )}
      {syncStatus === "offline" && (
        <>
          <CloudOff className="w-4 h-4" />
          <span>Offline</span>
        </>
      )}
    </div>
  )
}
\`\`\`

**Files to Create**:
- `hooks/use-cross-device-sync.ts` - Cross-device sync hook
- `components/ui/sync-indicator.tsx` - Sync status indicator

**Success Criteria**:
- [ ] Real-time sync working
- [ ] Sync status indicators visible
- [ ] Offline scenarios handled
- [ ] Cross-device sync verified

---

## ✅ Success Criteria

### Overall Phase Success
- [ ] Clerk Organizations fully integrated
- [ ] Organization switcher working
- [ ] User preferences functional
- [ ] Organization-scoped data access enforced
- [ ] Admin-only billing access implemented
- [ ] Cross-device sync functional
- [ ] Mobile-optimized UI

### Technical Requirements
- [ ] Clerk Organizations enabled
- [ ] JWT custom claims configured
- [ ] Organization hooks working
- [ ] Preferences schema implemented
- [ ] Organization filtering enforced
- [ ] Real-time sync functional

### User Experience
- [ ] Seamless organization switching
- [ ] Clear role indicators (admin vs member)
- [ ] Efficient multi-org support
- [ ] Personalized preferences
- [ ] Cross-device sync transparent
- [ ] Mobile-optimized UI

---

## 🧪 Testing Checklist

### Organization Testing
- [ ] Organization creation working
- [ ] Organization switching functional
- [ ] Multi-org support working (freelancer scenario)
- [ ] Organization data isolation verified

### Preferences Testing
- [ ] Preferences saving working
- [ ] Preferences loading functional
- [ ] Default preferences applied
- [ ] Organization-scoped preferences working

### Permission Testing
- [ ] Admin role checks working
- [ ] Member role checks working
- [ ] Billing access restricted to admins
- [ ] Members cannot access billing

### Sync Testing
- [ ] Real-time sync working
- [ ] Sync status accurate
- [ ] Offline scenarios handled
- [ ] Cross-device sync verified

---

## 📱 Mobile-First Implementation Verification

### Touch Optimization
- [ ] All form inputs ≥ 48px height
- [ ] All buttons ≥ 44px touch targets
- [ ] Adequate spacing between elements
- [ ] Touch feedback on all interactions

### Performance
- [ ] Organization switching fast
- [ ] Efficient data loading
- [ ] Real-time updates without lag
- [ ] Optimistic updates working

### Responsive Design
- [ ] All components responsive (320px - 1440px)
- [ ] Proper layout on portrait and landscape
- [ ] No horizontal scrolling
- [ ] Content readable on all screen sizes

---

## 📁 File Structure

\`\`\`
convex/
├── schema.ts                       # Extended with userPreferences
├── userPreferences.ts              # Preferences queries and mutations
├── sessions.ts                     # Updated with org filtering
├── messages.ts                     # Updated with org filtering
├── agents.ts                       # Updated with org filtering
└── artifacts.ts                    # Updated with org filtering

app/
├── settings/page.tsx               # Settings page
├── billing/page.tsx                # Billing page (admin-only)
└── select-organization/page.tsx    # Organization selection page

components/
├── layout/
│   └── Header.tsx                  # With OrganizationSwitcher
├── settings/
│   └── PreferencesPanel.tsx        # Preferences editing
├── billing/
│   └── BillingPanel.tsx            # Billing UI
└── ui/
    └── sync-indicator.tsx          # Sync status indicator

hooks/
├── use-organization-context.ts     # Organization context hook
├── use-require-organization.ts     # Organization requirement hook
└── use-cross-device-sync.ts        # Cross-device sync hook

middleware.ts                       # Updated with billing protection
\`\`\`

---

## 📝 Implementation Notes

### Key Decisions

1. **Clerk Organizations**: Use out-of-the-box solution, don't build custom teams
2. **Simple roles**: Admin vs Member (no custom roles for MVP)
3. **Minimal preferences**: Only app-specific settings, not user profile
4. **Organization-scoped**: All data filtered by organizationId
5. **Admin-only billing**: Members cannot access billing

### Best Practices

1. **Always filter by organizationId** in queries
2. **Use Clerk's built-in components** (OrganizationSwitcher, UserProfile, OrganizationList)
3. **Check admin role** server-side for sensitive operations using middleware
4. **Provide clear feedback** on organization context
5. **Optimize for mobile** with touch-friendly UI (44px minimum touch targets)
6. **Use Clerk's appearance prop** for consistent styling

### Official Resources

- **Clerk Organizations Guide**: https://clerk.com/docs/guides/organizations/overview
- **Roles & Permissions**: https://clerk.com/docs/guides/organizations/roles-and-permissions
- **useOrganization Hook**: https://clerk.com/docs/nextjs/reference/hooks/use-organization
- **Organization Components**: https://clerk.com/docs/nextjs/reference/components/overview
- **Official Example App**: https://github.com/clerk/orgs
- **Clerk + Convex Integration**: https://clerk.com/docs/guides/development/integrations/databases/convex

### Common Pitfalls to Avoid

1. **Don't duplicate Clerk's data** - Use Clerk's API for user/org data
2. **Don't skip organization filtering** - Data leakage is critical
3. **Don't build custom team features** - Clerk Organizations handles it
4. **Don't allow members to access billing** - Admin-only
5. **Don't forget mobile optimization** - Most users are on mobile
6. **Don't forget to enable Organizations** in Clerk Dashboard first
7. **Don't use custom role names** - Stick with `org:admin` and `org:member` for MVP

---

**Last Updated**: October 11, 2025  
**Status**: Ready for Implementation  
**Next Steps**: Complete Phase 4 (Convex Database), then proceed with Phase 5

# Phase 5: User Management & Collaboration Plan

**Status**: 🔴 Not Started (0%)  
**Priority**: P1 - High Priority  
**Dependencies**: Phase 4 (Convex Database) Complete  
**Estimated Timeline**: 2-3 weeks  
**Last Updated**: September 30, 2025

---

## 📋 Overview

This phase implements comprehensive user management and collaboration features using Clerk for authentication. All implementations follow mobile-first best practices with touch-optimized auth flows, responsive layouts, and efficient data synchronization.

**Note**: Clerk authentication will be implemented by the user later. This plan provides the complete integration strategy and UI/UX implementation.

### Key Objectives

- Integrate Clerk authentication for user accounts
- Implement user profiles with customization
- Enable team collaboration and sharing
- Add role-based permissions system
- Enhance dashboard with user-specific features
- Implement cross-device synchronization

### Success Criteria

- [ ] Clerk authentication integrated and working
- [ ] User profiles functional with customization
- [ ] Team collaboration features working
- [ ] Role-based permissions implemented
- [ ] Dashboard enhanced with user data
- [ ] Cross-device sync functional
- [ ] Mobile-optimized auth flows
- [ ] Sharing and permissions working

---

## 🏗️ Implementation Phases

### Phase 1: Clerk Authentication Integration

**Timeline**: 4-5 days  
**Status**: ⬜ Not Started (User will implement)

#### Task 1.1: Clerk Setup & Configuration

**Requirements**:
- Install Clerk SDK and dependencies
- Configure Clerk application in dashboard
- Set up environment variables
- Integrate ClerkProvider into Next.js app

**Implementation**:

\`\`\`bash
# Install Clerk
npm install @clerk/nextjs
\`\`\`

\`\`\`typescript
// .env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
\`\`\`

\`\`\`typescript
// app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs"

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ConvexClientProvider>
            <DeviceProvider>
              {children}
            </DeviceProvider>
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
\`\`\`

**Files to Create/Modify**:
- `.env.local` - Clerk environment variables
- `app/layout.tsx` - Add ClerkProvider
- `middleware.ts` - Clerk middleware for route protection

**Mobile-First Considerations**:
- Touch-optimized sign-in/sign-up forms
- Mobile-friendly OAuth buttons
- Responsive auth modals
- Clear error messages on mobile

**Success Criteria**:
- [ ] Clerk SDK installed and configured
- [ ] Environment variables set up
- [ ] ClerkProvider integrated
- [ ] Middleware configured for route protection

---

#### Task 1.2: Authentication Pages

**Requirements**:
- Create sign-in and sign-up pages
- Implement OAuth providers (Google, GitHub)
- Add email/password authentication
- Create mobile-optimized auth flows

**Implementation**:

\`\`\`typescript
// app/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <SignIn
        appearance={{
          elements: {
            // Mobile-first styling
            rootBox: "w-full max-w-md",
            card: "shadow-lg rounded-lg",
            formButtonPrimary: "min-h-[48px]", // Touch-optimized
            socialButtonsBlockButton: "min-h-[48px]", // Touch-optimized
            formFieldInput: "min-h-[48px]", // Prevents iOS zoom
          },
        }}
      />
    </div>
  )
}
\`\`\`

\`\`\`typescript
// app/sign-up/[[...sign-up]]/page.tsx
import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <SignUp
        appearance={{
          elements: {
            // Mobile-first styling
            rootBox: "w-full max-w-md",
            card: "shadow-lg rounded-lg",
            formButtonPrimary: "min-h-[48px]",
            socialButtonsBlockButton: "min-h-[48px]",
            formFieldInput: "min-h-[48px]",
          },
        }}
      />
    </div>
  )
}
\`\`\`

\`\`\`typescript
// middleware.ts
import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  publicRoutes: ["/", "/sign-in", "/sign-up"],
  ignoredRoutes: ["/api/webhook"],
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
\`\`\`

**Files to Create**:
- `app/sign-in/[[...sign-in]]/page.tsx` - Sign-in page
- `app/sign-up/[[...sign-up]]/page.tsx` - Sign-up page
- `middleware.ts` - Route protection middleware

**Mobile-First Considerations**:
- 48px minimum input height (prevents iOS zoom)
- 48px minimum button height (touch-optimized)
- Clear error messages
- Responsive layout on all devices
- OAuth buttons optimized for mobile

**Success Criteria**:
- [ ] Sign-in page working
- [ ] Sign-up page working
- [ ] OAuth providers functional
- [ ] Route protection working
- [ ] Mobile-optimized auth flows

---

#### Task 1.3: User Context & Hooks

**Requirements**:
- Create user context for app-wide access
- Implement custom hooks for user data
- Add user loading states
- Handle authentication errors

**Implementation**:

\`\`\`typescript
// hooks/use-user.ts
import { useUser as useClerkUser } from "@clerk/nextjs"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

export function useUser() {
  const { user: clerkUser, isLoaded, isSignedIn } = useClerkUser()
  
  // Fetch user data from Convex
  const userData = useQuery(
    api.users.getUserByClerkId,
    clerkUser?.id ? { clerkId: clerkUser.id } : "skip"
  )
  
  return {
    user: userData,
    clerkUser,
    isLoaded,
    isSignedIn,
    isLoading: !isLoaded || (isSignedIn && !userData),
  }
}
\`\`\`

\`\`\`typescript
// hooks/use-require-auth.ts
import { useUser } from "./use-user"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function useRequireAuth() {
  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()
  
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in")
    }
  }, [isLoaded, isSignedIn, router])
  
  return { isSignedIn, isLoaded }
}
\`\`\`

**Files to Create**:
- `hooks/use-user.ts` - User data hook
- `hooks/use-require-auth.ts` - Auth requirement hook

**Mobile-First Considerations**:
- Efficient data fetching
- Loading states optimized for mobile
- Error handling with clear messages

**Success Criteria**:
- [ ] User hooks working
- [ ] User data fetching functional
- [ ] Loading states working
- [ ] Error handling comprehensive

---

### Phase 2: User Profiles & Preferences

**Timeline**: 3-4 days  
**Status**: ⬜ Not Started

#### Task 2.1: User Profile Schema

**Requirements**:
- Extend Convex schema with user profiles
- Add user preferences and settings
- Implement profile customization
- Add user avatar and bio

**Implementation**:

\`\`\`typescript
// convex/schema.ts (additions)
export default defineSchema({
  // ... existing tables ...
  
  users: defineTable({
    clerkId: v.string(), // Clerk user ID
    email: v.string(),
    name: v.string(),
    avatar: v.optional(v.string()),
    bio: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
    preferences: v.object({
      theme: v.union(v.literal("light"), v.literal("dark"), v.literal("system")),
      language: v.string(),
      notifications: v.object({
        email: v.boolean(),
        push: v.boolean(),
      }),
      defaultModel: v.optional(v.string()),
      autoSave: v.boolean(),
    }),
    metadata: v.object({
      sessionCount: v.number(),
      messageCount: v.number(),
      lastActive: v.number(),
    }),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"]),
})
\`\`\`

**Files to Modify**:
- `convex/schema.ts` - Add users table

**Mobile-First Considerations**:
- Efficient profile data loading
- Optimized avatar uploads
- Responsive profile layout

**Success Criteria**:
- [ ] User schema defined
- [ ] Profile data structure working
- [ ] Preferences system functional
- [ ] Avatar uploads working

---

#### Task 2.2: User Profile Functions

**Requirements**:
- Create queries for fetching user profiles
- Implement mutations for updating profiles
- Add profile search functionality
- Implement user statistics

**Implementation**:

\`\`\`typescript
// convex/users.ts
import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

// Query: Get user by Clerk ID
export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first()
  },
})

// Mutation: Create or update user (called from webhook)
export const upsertUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    avatar: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first()
    
    if (existing) {
      await ctx.db.patch(existing._id, {
        email: args.email,
        name: args.name,
        avatar: args.avatar,
        updatedAt: Date.now(),
      })
      return existing._id
    } else {
      return await ctx.db.insert("users", {
        clerkId: args.clerkId,
        email: args.email,
        name: args.name,
        avatar: args.avatar,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        preferences: {
          theme: "system",
          language: "en",
          notifications: {
            email: true,
            push: true,
          },
          autoSave: true,
        },
        metadata: {
          sessionCount: 0,
          messageCount: 0,
          lastActive: Date.now(),
        },
      })
    }
  },
})

// Mutation: Update user profile
export const updateProfile = mutation({
  args: {
    userId: v.id("users"),
    name: v.optional(v.string()),
    bio: v.optional(v.string()),
    avatar: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { userId, ...updates } = args
    
    await ctx.db.patch(userId, {
      ...updates,
      updatedAt: Date.now(),
    })
  },
})

// Mutation: Update user preferences
export const updatePreferences = mutation({
  args: {
    userId: v.id("users"),
    preferences: v.any(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      preferences: args.preferences,
      updatedAt: Date.now(),
    })
  },
})

// Query: Get user statistics
export const getUserStats = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId)
    if (!user) return null
    
    // Get session count
    const sessions = await ctx.db
      .query("sessions")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect()
    
    // Get message count
    let messageCount = 0
    for (const session of sessions) {
      const messages = await ctx.db
        .query("messages")
        .withIndex("by_session", (q) => q.eq("sessionId", session._id))
        .collect()
      messageCount += messages.length
    }
    
    return {
      sessionCount: sessions.length,
      messageCount,
      lastActive: user.metadata.lastActive,
    }
  },
})
\`\`\`

**Files to Create**:
- `convex/users.ts` - User queries and mutations

**Mobile-First Considerations**:
- Efficient profile queries
- Optimized statistics calculation
- Real-time profile updates

**Success Criteria**:
- [ ] User queries working
- [ ] User mutations working
- [ ] Profile updates functional
- [ ] Statistics calculation working

---

#### Task 2.3: Profile UI Components

**Requirements**:
- Create user profile page
- Implement profile editing interface
- Add avatar upload component
- Create preferences settings panel

**Implementation**:

\`\`\`typescript
// app/profile/page.tsx
"use client"

import { useUser } from "@/hooks/use-user"
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { ProfileHeader } from "@/components/profile/ProfileHeader"
import { ProfileEditor } from "@/components/profile/ProfileEditor"
import { PreferencesPanel } from "@/components/profile/PreferencesPanel"
import { UserStats } from "@/components/profile/UserStats"

export default function ProfilePage() {
  const { user, isLoading } = useUser()
  const stats = useQuery(api.users.getUserStats, user?._id ? { userId: user._id } : "skip")
  
  if (isLoading) {
    return <div>Loading...</div>
  }
  
  if (!user) {
    return <div>Please sign in</div>
  }
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      <ProfileHeader user={user} />
      <UserStats stats={stats} />
      <ProfileEditor user={user} />
      <PreferencesPanel user={user} />
    </div>
  )
}
\`\`\`

\`\`\`typescript
// components/profile/ProfileEditor.tsx
"use client"

import { useState } from "react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useDevice } from "@/contexts/DeviceProvider"

export function ProfileEditor({ user }) {
  const [name, setName] = useState(user.name)
  const [bio, setBio] = useState(user.bio || "")
  const updateProfile = useMutation(api.users.updateProfile)
  const { isMobile } = useDevice()
  
  const handleSave = async () => {
    await updateProfile({
      userId: user._id,
      name,
      bio,
    })
  }
  
  return (
    <div className={`
      space-y-4 p-4 rounded-lg border
      ${isMobile ? 'p-4' : 'p-6'}
    `}>
      <h2 className="text-xl font-semibold">Edit Profile</h2>
      
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium">Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="min-h-[48px]" // Mobile-optimized
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Bio</label>
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="min-h-[120px]"
            placeholder="Tell us about yourself..."
          />
        </div>
        
        <Button
          onClick={handleSave}
          className="min-h-[44px] min-w-[44px]" // Touch-optimized
        >
          Save Changes
        </Button>
      </div>
    </div>
  )
}
\`\`\`

**Files to Create**:
- `app/profile/page.tsx` - Profile page
- `components/profile/ProfileHeader.tsx` - Profile header
- `components/profile/ProfileEditor.tsx` - Profile editing
- `components/profile/PreferencesPanel.tsx` - Preferences settings
- `components/profile/UserStats.tsx` - User statistics
- `components/profile/AvatarUpload.tsx` - Avatar upload

**Mobile-First Considerations**:
- Touch-optimized form inputs (48px height)
- Touch-optimized buttons (44px minimum)
- Responsive layout on all devices
- Clear visual feedback on mobile
- Efficient avatar uploads

**Success Criteria**:
- [ ] Profile page working
- [ ] Profile editing functional
- [ ] Avatar upload working
- [ ] Preferences panel functional
- [ ] Mobile-optimized UI

---

### Phase 3: Team Collaboration & Sharing

**Timeline**: 5-6 days  
**Status**: ⬜ Not Started

#### Task 3.1: Team Schema & Permissions

**Requirements**:
- Extend Convex schema with teams and memberships
- Implement role-based permissions (owner, admin, member, viewer)
- Add team invitations system
- Implement sharing permissions for sessions

**Implementation**:

\`\`\`typescript
// convex/schema.ts (additions)
export default defineSchema({
  // ... existing tables ...
  
  teams: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    ownerId: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.number(),
    metadata: v.object({
      memberCount: v.number(),
      sessionCount: v.number(),
    }),
  })
    .index("by_owner", ["ownerId"]),
  
  teamMembers: defineTable({
    teamId: v.id("teams"),
    userId: v.id("users"),
    role: v.union(
      v.literal("owner"),
      v.literal("admin"),
      v.literal("member"),
      v.literal("viewer")
    ),
    joinedAt: v.number(),
    invitedBy: v.optional(v.id("users")),
  })
    .index("by_team", ["teamId"])
    .index("by_user", ["userId"])
    .index("by_team_and_user", ["teamId", "userId"]),
  
  teamInvitations: defineTable({
    teamId: v.id("teams"),
    email: v.string(),
    role: v.union(
      v.literal("admin"),
      v.literal("member"),
      v.literal("viewer")
    ),
    invitedBy: v.id("users"),
    createdAt: v.number(),
    expiresAt: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("accepted"),
      v.literal("declined"),
      v.literal("expired")
    ),
  })
    .index("by_team", ["teamId"])
    .index("by_email", ["email"])
    .index("by_status", ["status"]),
  
  sharedSessions: defineTable({
    sessionId: v.id("sessions"),
    teamId: v.optional(v.id("teams")),
    userId: v.optional(v.id("users")), // For individual sharing
    permission: v.union(
      v.literal("view"),
      v.literal("comment"),
      v.literal("edit")
    ),
    sharedBy: v.id("users"),
    sharedAt: v.number(),
  })
    .index("by_session", ["sessionId"])
    .index("by_team", ["teamId"])
    .index("by_user", ["userId"]),
})
\`\`\`

**Files to Modify**:
- `convex/schema.ts` - Add teams, teamMembers, teamInvitations, sharedSessions tables

**Mobile-First Considerations**:
- Efficient permission checks
- Optimized team data loading
- Real-time permission updates

**Success Criteria**:
- [ ] Team schema defined
- [ ] Permission system working
- [ ] Invitation system functional
- [ ] Sharing permissions working

---

#### Task 3.2: Team Management Functions

**Requirements**:
- Create queries for fetching teams and members
- Implement mutations for creating/updating teams
- Add invitation management functions
- Implement permission checking utilities

**Implementation**:

\`\`\`typescript
// convex/teams.ts
import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

// Query: Get user's teams
export const getUserTeams = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const memberships = await ctx.db
      .query("teamMembers")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect()
    
    const teams = await Promise.all(
      memberships.map(async (m) => {
        const team = await ctx.db.get(m.teamId)
        return { ...team, role: m.role }
      })
    )
    
    return teams
  },
})

// Mutation: Create team
export const createTeam = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    ownerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const now = Date.now()
    
    const teamId = await ctx.db.insert("teams", {
      name: args.name,
      description: args.description,
      ownerId: args.ownerId,
      createdAt: now,
      updatedAt: now,
      metadata: {
        memberCount: 1,
        sessionCount: 0,
      },
    })
    
    // Add owner as team member
    await ctx.db.insert("teamMembers", {
      teamId,
      userId: args.ownerId,
      role: "owner",
      joinedAt: now,
    })
    
    return teamId
  },
})

// Mutation: Invite user to team
export const inviteToTeam = mutation({
  args: {
    teamId: v.id("teams"),
    email: v.string(),
    role: v.union(v.literal("admin"), v.literal("member"), v.literal("viewer")),
    invitedBy: v.id("users"),
  },
  handler: async (ctx, args) => {
    const now = Date.now()
    const expiresAt = now + 7 * 24 * 60 * 60 * 1000 // 7 days
    
    return await ctx.db.insert("teamInvitations", {
      teamId: args.teamId,
      email: args.email,
      role: args.role,
      invitedBy: args.invitedBy,
      createdAt: now,
      expiresAt,
      status: "pending",
    })
  },
})

// Mutation: Accept team invitation
export const acceptInvitation = mutation({
  args: {
    invitationId: v.id("teamInvitations"),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const invitation = await ctx.db.get(args.invitationId)
    if (!invitation || invitation.status !== "pending") {
      throw new Error("Invalid invitation")
    }
    
    if (Date.now() > invitation.expiresAt) {
      await ctx.db.patch(args.invitationId, { status: "expired" })
      throw new Error("Invitation expired")
    }
    
    // Add user to team
    await ctx.db.insert("teamMembers", {
      teamId: invitation.teamId,
      userId: args.userId,
      role: invitation.role,
      joinedAt: Date.now(),
      invitedBy: invitation.invitedBy,
    })
    
    // Update invitation status
    await ctx.db.patch(args.invitationId, { status: "accepted" })
    
    // Update team member count
    const team = await ctx.db.get(invitation.teamId)
    if (team) {
      await ctx.db.patch(invitation.teamId, {
        metadata: {
          ...team.metadata,
          memberCount: team.metadata.memberCount + 1,
        },
      })
    }
  },
})

// Query: Check user permission for session
export const checkSessionPermission = query({
  args: {
    sessionId: v.id("sessions"),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // Check if user owns the session
    const session = await ctx.db.get(args.sessionId)
    if (session?.userId === args.userId) {
      return { hasAccess: true, permission: "edit" }
    }
    
    // Check if session is shared with user
    const sharedWithUser = await ctx.db
      .query("sharedSessions")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first()
    
    if (sharedWithUser) {
      return { hasAccess: true, permission: sharedWithUser.permission }
    }
    
    // Check if session is shared with user's team
    const userTeams = await ctx.db
      .query("teamMembers")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect()
    
    for (const membership of userTeams) {
      const sharedWithTeam = await ctx.db
        .query("sharedSessions")
        .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
        .filter((q) => q.eq(q.field("teamId"), membership.teamId))
        .first()
      
      if (sharedWithTeam) {
        return { hasAccess: true, permission: sharedWithTeam.permission }
      }
    }
    
    return { hasAccess: false, permission: null }
  },
})

// Mutation: Share session
export const shareSession = mutation({
  args: {
    sessionId: v.id("sessions"),
    teamId: v.optional(v.id("teams")),
    userId: v.optional(v.id("users")),
    permission: v.union(v.literal("view"), v.literal("comment"), v.literal("edit")),
    sharedBy: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("sharedSessions", {
      sessionId: args.sessionId,
      teamId: args.teamId,
      userId: args.userId,
      permission: args.permission,
      sharedBy: args.sharedBy,
      sharedAt: Date.now(),
    })
  },
})
\`\`\`

**Files to Create**:
- `convex/teams.ts` - Team queries and mutations

**Mobile-First Considerations**:
- Efficient permission checks
- Optimized team data loading
- Real-time updates for team changes

**Success Criteria**:
- [ ] Team queries working
- [ ] Team mutations working
- [ ] Invitation system functional
- [ ] Permission checks working
- [ ] Sharing system functional

---

#### Task 3.3: Team Collaboration UI

**Requirements**:
- Create team management page
- Implement team member list and roles
- Add invitation interface
- Create session sharing UI
- Implement permission indicators

**Implementation**:

\`\`\`typescript
// app/teams/page.tsx
"use client"

import { useUser } from "@/hooks/use-user"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { TeamList } from "@/components/teams/TeamList"
import { CreateTeamDialog } from "@/components/teams/CreateTeamDialog"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import { useState } from "react"

export default function TeamsPage() {
  const { user } = useUser()
  const teams = useQuery(api.teams.getUserTeams, user?._id ? { userId: user._id } : "skip")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Teams</h1>
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="min-h-[44px]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Team
        </Button>
      </div>
      
      <TeamList teams={teams} />
      
      <CreateTeamDialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  )
}
\`\`\`

\`\`\`typescript
// components/teams/ShareSessionDialog.tsx
"use client"

import { useState } from "react"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useUser } from "@/hooks/use-user"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton
} from "@/components/ui/select"
import { useDevice } from "@/contexts/DeviceProvider"

export function ShareSessionDialog({ sessionId, isOpen, onClose }) {
  const { user } = useUser()
  const { isMobile } = useDevice()
  const teams = useQuery(api.teams.getUserTeams, user?._id ? { userId: user._id } : "skip")
  const shareSession = useMutation(api.teams.shareSession)
  
  const [selectedTeam, setSelectedTeam] = useState("")
  const [permission, setPermission] = useState<"view" | "comment" | "edit">("view")
  
  const handleShare = async () => {
    if (!selectedTeam || !user) return
    
    await shareSession({
      sessionId,
      teamId: selectedTeam,
      permission,
      sharedBy: user._id,
    })
    
    onClose()
  }
  
  return (
    <AdaptiveModal
      isOpen={isOpen}
      onClose={onClose}
      title="Share Session"
      description="Share this debate session with your team"
    >
      <div className={`space-y-4 ${isMobile ? 'p-4' : 'p-6'}`}>
        <div>
          <label className="text-sm font-medium">Select Team</label>
          <Select
            value={selectedTeam}
            onValueChange={setSelectedTeam}
            className="min-h-[48px]"
          >
            {teams?.map((team) => (
              <option key={team._id} value={team._id}>
                {team.name}
              </option>
            ))}
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium">Permission</label>
          <Select
            value={permission}
            onValueChange={(v) => setPermission(v as any)}
            className="min-h-[48px]"
          >
            <option value="view">View Only</option>
            <option value="comment">Can Comment</option>
            <option value="edit">Can Edit</option>
          </Select>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 min-h-[44px] bg-transparent"
          >
            Cancel
          </Button>
          <Button
            onClick={handleShare}
            className="flex-1 min-h-[44px]"
          >
            Share
          </Button>
        </div>
      </div>
    </AdaptiveModal>
  )
}
\`\`\`

**Files to Create**:
- `app/teams/page.tsx` - Teams page
- `app/teams/[teamId]/page.tsx` - Team detail page
- `components/teams/TeamList.tsx` - Team list
- `components/teams/TeamCard.tsx` - Team card
- `components/teams/CreateTeamDialog.tsx` - Create team dialog
- `components/teams/TeamMemberList.tsx` - Team member list
- `components/teams/InviteMemberDialog.tsx` - Invite member dialog
- `components/teams/ShareSessionDialog.tsx` - Share session dialog
- `components/teams/PermissionBadge.tsx` - Permission indicator

**Mobile-First Considerations**:
- Touch-optimized team cards (80px minimum height)
- Touch-optimized buttons (44px minimum)
- Responsive team list layout
- Clear permission indicators on mobile
- Efficient team data loading

**Success Criteria**:
- [ ] Team management page working
- [ ] Team member list functional
- [ ] Invitation interface working
- [ ] Session sharing UI functional
- [ ] Permission indicators visible
- [ ] Mobile-optimized UI

---

### Phase 4: Enhanced Dashboard & Analytics

**Timeline**: 3-4 days  
**Status**: ⬜ Not Started

#### Task 4.1: User-Specific Dashboard

**Requirements**:
- Enhance dashboard with user-specific data
- Add recent activity timeline
- Implement session analytics
- Add team activity feed
- Create personalized quick actions

**Implementation**:

\`\`\`typescript
// app/dashboard/page.tsx
"use client"

import { useUser } from "@/hooks/use-user"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { UserStats } from "@/components/dashboard/UserStats"
import { RecentActivity } from "@/components/dashboard/RecentActivity"
import { TeamActivity } from "@/components/dashboard/TeamActivity"
import { QuickActions } from "@/components/dashboard/QuickActions"

export default function DashboardPage() {
  const { user } = useUser()
  const stats = useQuery(api.users.getUserStats, user?._id ? { userId: user._id } : "skip")
  const recentSessions = useQuery(
    api.sessions.getSessions,
    user?._id ? { userId: user._id, limit: 5 } : "skip"
  )
  const teams = useQuery(api.teams.getUserTeams, user?._id ? { userId: user._id } : "skip")
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      <DashboardHeader user={user} />
      <UserStats stats={stats} />
      <QuickActions />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity sessions={recentSessions} />
        <TeamActivity teams={teams} />
      </div>
    </div>
  )
}
\`\`\`

**Files to Create/Modify**:
- `app/dashboard/page.tsx` - Enhanced dashboard
- `components/dashboard/UserStats.tsx` - User statistics
- `components/dashboard/RecentActivity.tsx` - Recent activity timeline
- `components/dashboard/TeamActivity.tsx` - Team activity feed
- `components/dashboard/QuickActions.tsx` - Personalized quick actions

**Mobile-First Considerations**:
- Responsive dashboard layout
- Touch-optimized quick actions
- Efficient data loading
- Clear visual hierarchy on mobile

**Success Criteria**:
- [ ] Dashboard enhanced with user data
- [ ] Recent activity timeline working
- [ ] Session analytics functional
- [ ] Team activity feed working
- [ ] Quick actions personalized
- [ ] Mobile-optimized layout

---

#### Task 4.2: Cross-Device Synchronization

**Requirements**:
- Implement real-time sync across devices
- Add sync status indicators
- Handle sync conflicts
- Implement offline queue with sync

**Implementation**:

\`\`\`typescript
// hooks/use-cross-device-sync.ts
"use client"

import { useEffect, useState } from "react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useUser } from "./use-user"

export function useCrossDeviceSync() {
  const { user } = useUser()
  const [syncStatus, setSyncStatus] = useState<"synced" | "syncing" | "offline">("synced")
  
  // Subscribe to user's sessions for real-time updates
  const sessions = useQuery(
    api.sessions.getSessions,
    user?._id ? { userId: user._id } : "skip"
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

**Files to Create**:
- `hooks/use-cross-device-sync.ts` - Cross-device sync hook
- `components/ui/sync-indicator.tsx` - Sync status indicator

**Mobile-First Considerations**:
- Clear sync status on mobile
- Efficient real-time updates
- Handle offline scenarios gracefully

**Success Criteria**:
- [ ] Real-time sync working
- [ ] Sync status indicators visible
- [ ] Conflict resolution working
- [ ] Offline queue functional

---

## ✅ Success Criteria

### Overall Phase Success
- [ ] Clerk authentication fully integrated
- [ ] User profiles functional with customization
- [ ] Team collaboration features working
- [ ] Role-based permissions implemented
- [ ] Dashboard enhanced with user data
- [ ] Cross-device sync functional
- [ ] Mobile-optimized auth flows
- [ ] Sharing and permissions working

### Technical Requirements
- [ ] Clerk SDK integrated and configured
- [ ] User schema implemented
- [ ] Team schema implemented
- [ ] Permission system working
- [ ] Real-time updates functional
- [ ] Offline support working

### User Experience
- [ ] Seamless authentication flow
- [ ] Clear permission indicators
- [ ] Efficient team collaboration
- [ ] Personalized dashboard
- [ ] Cross-device sync transparent
- [ ] Mobile-optimized UI

---

## 🧪 Testing Checklist

### Authentication Testing
- [ ] Sign-up flow working
- [ ] Sign-in flow working
- [ ] OAuth providers functional
- [ ] Route protection working
- [ ] Sign-out working
- [ ] Mobile auth flows optimized

### Profile Testing
- [ ] Profile creation working
- [ ] Profile editing functional
- [ ] Avatar upload working
- [ ] Preferences saving
- [ ] Statistics calculation correct

### Team Testing
- [ ] Team creation working
- [ ] Member invitation functional
- [ ] Invitation acceptance working
- [ ] Permission checks correct
- [ ] Session sharing working
- [ ] Team activity feed accurate

### Dashboard Testing
- [ ] User stats accurate
- [ ] Recent activity correct
- [ ] Team activity accurate
- [ ] Quick actions functional
- [ ] Cross-device sync working

---

## 📱 Mobile-First Implementation Verification

### Touch Optimization
- [ ] All form inputs ≥ 48px height
- [ ] All buttons ≥ 44px touch targets
- [ ] Adequate spacing between elements
- [ ] Touch feedback on all interactions

### Performance
- [ ] Auth flows optimized for mobile
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
├── schema.ts                       # Extended with users, teams, etc.
├── users.ts                        # User queries and mutations
├── teams.ts                        # Team queries and mutations
└── permissions.ts                  # Permission utilities

app/
├── sign-in/[[...sign-in]]/page.tsx # Sign-in page
├── sign-up/[[...sign-up]]/page.tsx # Sign-up page
├── profile/page.tsx                # User profile page
├── teams/
│   ├── page.tsx                    # Teams list page
│   └── [teamId]/page.tsx           # Team detail page
└── dashboard/page.tsx              # Enhanced dashboard

components/
├── profile/
│   ├── ProfileHeader.tsx           # Profile header
│   ├── ProfileEditor.tsx           # Profile editing
│   ├── PreferencesPanel.tsx        # Preferences settings
│   ├── UserStats.tsx               # User statistics
│   └── AvatarUpload.tsx            # Avatar upload
├── teams/
│   ├── TeamList.tsx                # Team list
│   ├── TeamCard.tsx                # Team card
│   ├── CreateTeamDialog.tsx        # Create team dialog
│   ├── TeamMemberList.tsx          # Team member list
│   ├── InviteMemberDialog.tsx      # Invite member dialog
│   ├── ShareSessionDialog.tsx      # Share session dialog
│   └── PermissionBadge.tsx         # Permission indicator
└── dashboard/
    ├── UserStats.tsx               # User statistics
    ├── RecentActivity.tsx          # Recent activity timeline
    ├── TeamActivity.tsx            # Team activity feed
    └── QuickActions.tsx            # Personalized quick actions

hooks/
├── use-user.ts                     # User data hook
├── use-require-auth.ts             # Auth requirement hook
└── use-cross-device-sync.ts        # Cross-device sync hook

middleware.ts                       # Clerk middleware
\`\`\`

---

## 📝 Implementation Notes

### Key Decisions

1. **Clerk for authentication**: Best-in-class auth with excellent DX
2. **Role-based permissions**: Owner, Admin, Member, Viewer roles
3. **Team-based collaboration**: Share sessions with teams
4. **Real-time sync**: Convex subscriptions for cross-device sync
5. **Mobile-first auth**: Touch-optimized auth flows

### Best Practices

1. **Always check permissions** before allowing actions
2. **Use optimistic updates** for better UX
3. **Handle offline scenarios** gracefully
4. **Provide clear feedback** on auth status
5. **Optimize for mobile** with touch-friendly UI

### Common Pitfalls to Avoid

1. **Don't skip permission checks** - Security is critical
2. **Don't forget mobile optimization** - Most users are on mobile
3. **Don't ignore offline scenarios** - Users expect it to work
4. **Don't skip error handling** - Auth can fail
5. **Don't forget to sync** - Cross-device sync is expected

---

**Last Updated**: September 30, 2025  
**Status**: Ready for Implementation (User will implement Clerk)  
**Next Steps**: User implements Clerk authentication, then proceed with Phase 2

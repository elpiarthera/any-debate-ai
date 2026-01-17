# Sprint 3: Authentication Implementation Plan

**Status**: Ready to Execute  
**Priority**: P1 (Critical - Core Functionality)  
**Timeline**: 3-4 hours  
**Phase**: Phase 3 of 7 in MVP Sprint  
**Dependencies**: Sprint 1 (Environment)

---

## Overview

This sprint focuses on implementing the complete authentication system using Clerk and syncing user data to our Convex database. This is the critical bridge between the user's identity and their data (chats, agents, preferences).

**Key Deliverables:**
- Full sign-in/sign-up flow with Clerk
- Auth middleware protecting private routes
- Real-time user synchronization (Clerk -> Convex)
- User preferences system
- Organization switcher integration

---

## Time Breakdown

| Task | Duration | Priority |
|------|----------|----------|
| 3.1: Auth Config & Providers | 45 min | Critical |
| 3.2: Middleware & Pages | 45 min | Critical |
| 3.3: Webhook Synchronization | 60 min | Critical |
| 3.4: User Sync Mutation | 45 min | Critical |
| 3.5: UI Integration | 45 min | High |
| 3.6: Testing & Verification | 30 min | High |
| **TOTAL** | **4.5 hours** | - |

---

## Task 3.1: Auth Config & Providers (45 min)

### Goal
Configure the foundational authentication layer connecting Clerk, Convex, and Next.js.

### Files to Create/Update
1.  `convex/auth.config.ts`
2.  `components/providers.tsx`
3.  `app/layout.tsx`

### Implementation Steps

1.  **Convex Auth Config**
    - Create `convex/auth.config.ts`
    - Configure the Clerk JWT issuer domain (`process.env.CLERK_JWT_ISSUER_DOMAIN`)
    - Ensure this matches the Clerk Dashboard -> API Keys -> Issuer URL

2.  **Global Providers Component**
    - Create `components/providers.tsx` as a Client Component
    - Wrap with `ClerkProvider`
    - Wrap with `ConvexProviderWithClerk` (using `useAuth` from Clerk)
    - Move existing `DeviceProvider` and `DemoProvider` inside this wrapper

3.  **Update Root Layout**
    - Replace individual providers in `app/layout.tsx` with the new `<Providers>` component
    - Ensure hydration warnings are suppressed correctly

### Verification
- [ ] Application renders without errors
- [ ] `ConvexProviderWithClerk` successfully initializes
- [ ] Clerk environment variables are picked up

---

## Task 3.2: Middleware & Pages (45 min)

### Goal
Set up route protection and authentication pages using the latest Clerk middleware.

### Files to Create/Update
1.  `middleware.ts`
2.  `app/sign-in/[[...sign-in]]/page.tsx`
3.  `app/sign-up/[[...sign-up]]/page.tsx`

### Implementation Steps

1.  **Configure Middleware**
    - Use `clerkMiddleware` (standard for Next.js App Router)
    - Create route matchers with `createRouteMatcher`
    - Protect `/dashboard(.*)` and other private routes
    - Allow public access to `/`, `/sign-in`, `/sign-up`, `/api/clerk/webhook`

2.  **Create Auth Pages**
    - Use Clerk's `<SignIn />` and `<SignUp />` components
    - Style to match application theme (dark mode support)
    - Configure redirect URLs to `/dashboard`

### Verification
- [ ] Accessing `/dashboard` without login redirects to `/sign-in`
- [ ] Sign-in page renders correctly
- [ ] Sign-up page renders correctly

---

## Task 3.3: Webhook Synchronization (60 min)

### Goal
Create a secure webhook endpoint to receive user events from Clerk and trigger database synchronization.

### Files to Create/Update
1.  `app/api/clerk/webhook/route.ts`

### Implementation Steps

1.  **Setup Webhook Route**
    - Create POST handler at `/api/clerk/webhook`
    - Import `Webhook` from `svix` for signature verification
    - Validate `CLERK_WEBHOOK_SECRET` environment variable

2.  **Event Handling Logic**
    - Verify request headers (`svix-id`, `svix-timestamp`, `svix-signature`)
    - Parse the payload type (`user.created`, `user.updated`, `user.deleted`)
    - Extract user data (ID, email, name, avatar URL)
    - Call Convex mutation (`users:storeUser`, `users:deleteUser`)

### Verification
- [ ] Webhook signature verification works
- [ ] Can parse `user.created` payload
- [ ] Properly handles errors and returns 400/500 status codes

---

## Task 3.4: User Sync Mutation (45 min)

### Goal
Ensure the Convex `users` table is always in sync with Clerk identity data.

### Files to Create/Update
1.  `convex/users.ts` (Update existing file)

### Implementation Steps

1.  **Enhance `storeUser` Mutation**
    - Verify it accepts all Clerk user fields (`clerkId`, `email`, `name`, `imageUrl`)
    - Implement "upsert" logic (update if exists, create if new)
    - Update `lastLogin` timestamp on every sync
    - Initialize default usage limits for new users

2.  **Enhance `currentUser` Query**
    - Ensure it uses `ctx.auth.getUserIdentity()`
    - Return full user profile with usage stats
    - Handle edge case where Clerk user exists but Convex record is missing (self-healing)

### Verification
- [ ] `storeUser` correctly creates new records
- [ ] `storeUser` correctly updates existing records
- [ ] `currentUser` returns correct data for logged-in user

---

## Task 3.5: UI Integration (45 min)

### Goal
Integrate authentication UI elements into the application layout (Header, Sidebar).

### Files to Create/Update
1.  `components/layout/Header.tsx`
2.  `components/dashboard/DashboardSidebar.tsx`
3.  `contexts/AuthContext.tsx` (Optional wrapper if needed)

### Implementation Steps

1.  **Header Integration**
    - Add `<UserButton />` from Clerk
    - Add `<OrganizationSwitcher />` for multi-tenant support
    - Ensure consistent styling with Shadcn UI

2.  **Sidebar Logic**
    - Show user profile info at bottom of sidebar
    - Hide/show items based on auth state (if we have public pages)

### Verification
- [ ] User avatar appears in header
- [ ] clicking avatar shows menu (Profile, Sign out)
- [ ] Organization switcher allows creating/switching orgs

---

## Task 3.6: Testing & Verification (30 min)

### Goal
Verify the entire authentication flow from end-to-end.

### Checklist
- [ ] **Sign Up Flow**: Create new account -> Redirect to Dashboard -> User record created in Convex
- [ ] **Sign In Flow**: Log out -> Log in -> Redirect to Dashboard
- [ ] **Profile Update**: Change name in Clerk -> Webhook fires -> Convex record updated
- [ ] **Protection**: Try to access `/dashboard` while logged out -> Redirected
- [ ] **Data Access**: Verify `currentUser` query returns data matches the logged-in user

---

## Reference Documentation

- `docs/guides/environment-variables-setup.md` (Clerk section)
- `docs/implementation/ToDo/PHASE_5_USER_MANAGEMENT_PLAN.md`
- `docs/guides/convex-database-schema.md` (Users table definition)

---

## Next Steps
After completing Sprint 3, proceed to **Sprint 4: AI Integration**, where we will connect the Vercel AI SDK to our authenticated backend.

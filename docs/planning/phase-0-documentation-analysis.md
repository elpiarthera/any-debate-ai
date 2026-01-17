# Phase 0: Documentation Review & Analysis

**Status**: ✅ COMPLETED  
**Duration**: 2.5 hours  
**Date**: October 11, 2025

---

## Documentation References

This section contains all official documentation links organized by category. Use these as the primary source of truth when implementing features.

### Clerk Documentation

**Core Concepts:**
- [Organizations Overview](https://clerk.com/docs/guides/organizations/overview) - Multi-tenant SaaS architecture
- [Roles and Permissions](https://clerk.com/docs/guides/organizations/roles-and-permissions) - Admin/member roles
- [Multi-Tenancy Guide](https://clerk.com/glossary/multi-tenancy) - Multi-tenant patterns

**API Reference:**
- [Organization Object](https://clerk.com/docs/reference/javascript/organization) - Organization API methods
- [useOrganization Hook](https://clerk.com/docs/nextjs/reference/hooks/use-organization) - React hook for org management
- [Clerk Components](https://clerk.com/docs/nextjs/reference/components/overview) - Pre-built UI components

**Integration:**
- [Clerk + Convex Integration](https://clerk.com/docs/guides/development/integrations/databases/convex) - Official integration guide

### Convex Documentation

**Getting Started:**
- [Quickstart Guide](https://docs.convex.dev/quickstart) - Initial setup and concepts
- [Schemas](https://docs.convex.dev/database/schemas) - Defining table schemas
- [Indexes](https://docs.convex.dev/database/indexes) - Query optimization

**Authentication:**
- [Clerk Integration](https://docs.convex.dev/auth/clerk) - Step-by-step Clerk setup
- [JWT Templates](https://docs.convex.dev/auth/clerk#create-a-jwt-template) - Custom claims configuration

**Database:**
- [Queries](https://docs.convex.dev/functions/query-functions) - Reading data
- [Mutations](https://docs.convex.dev/functions/mutation-functions) - Writing data
- [File Storage](https://docs.convex.dev/file-storage) - Uploading and serving files

### Polar Documentation

**Core Concepts:**
- [Introduction](https://polar.sh/docs/introduction) - Merchant of Record overview
- [API Overview](https://polar.sh/docs/api) - Authentication and rate limits
- [Products](https://polar.sh/docs/products) - Creating and managing products
- [Subscriptions](https://polar.sh/docs/subscriptions) - Subscription management

**Integration:**
- [Webhooks](https://polar.sh/docs/webhooks) - Event handling (if available)
- [Customer Portal](https://polar.sh/docs/api#customer-portal-api) - Customer-facing API

---

## Executive Summary

This document captures the comprehensive analysis of Clerk Organizations, Clerk + Convex integration, and Polar payment system documentation. The findings inform our database schema design and implementation strategy for Phase 4.

---

## 1. Clerk Organizations (Multi-Tenancy)

### 1.1 Core Concepts

**Organizations** are Clerk's multi-tenant solution that allows:
- Multiple users to collaborate within isolated workspaces
- Simple role-based access control (admin vs member)
- Users can belong to multiple organizations (freelancer/consultant scenario)

### 1.2 Key Features (MVP Scope)

#### Organization Structure
- **Organization ID**: Unique identifier (`org_xxxxx`)
- **Name**: Display name for the organization
- **Slug**: Optional unique URL-friendly identifier
- **Logo**: Custom branding support
- **Metadata**: Public and private metadata storage

#### Membership Management
- **Invitations**: Email-based with role assignment (admin or member)
- **Multiple Organizations**: Users can create/join multiple orgs with different roles
  - Example: Freelancer can be admin in their own org, member in client orgs
  - Users switch between orgs using Clerk's organization switcher
- **Active Organization**: Current org context - the org the user is currently working in

#### Billing Model (Our Implementation)
- **Per-User Pricing**: Simple model
  - User added to org = org is charged for that user
  - No "active/inactive" tracking - if user exists in org, org pays
  - Billing tied to organization, not individual users

### 1.3 Roles & Permissions (MVP - Keep It Simple)

#### Default Roles (Out-of-the-Box)
1. **Admin (`org:admin`)**
   - Full access to organization resources
   - Can manage members and settings
   - Can view and manage billing
   - Can delete organization

2. **Member (`org:member`)**
   - Access to core features (debates, sessions, artifacts)
   - Can read member list
   - **CANNOT** view or manage billing
   - **CANNOT** manage organization settings or memberships

**No custom roles for MVP** - Clerk's default admin/member is sufficient.

### 1.4 Implementation Patterns

#### Organization Switching (Multi-Org Support)
\`\`\`typescript
const { organization, setActive } = useOrganization();

// Switch to different organization
await setActive({ organization: 'org_xxxxx' });
\`\`\`

#### Checking Permissions
\`\`\`typescript
const { membership } = useOrganization();

// Check if user is admin
const isAdmin = membership?.role === 'org:admin';

// Members cannot access billing
if (!isAdmin && accessingBillingPage) {
  redirect('/dashboard');
}
\`\`\`

### 1.5 Best Practices

1. **Data Isolation**: Always filter queries by `organizationId`
2. **Permission Checks**: Verify admin role server-side for sensitive operations
3. **Active Organization**: Always use the active organization context
4. **Billing Access**: Only admins can view/manage billing

---

## 2. Clerk + Convex Integration

### 2.1 Integration Architecture

The integration uses **JWT-based authentication** where:
1. Clerk issues JWTs with custom claims
2. Convex validates JWTs using Clerk's public keys
3. Auth state is available in all Convex functions via `ctx.auth`

### 2.2 Setup Requirements

#### Step 1: Create JWT Template in Clerk
- Navigate to JWT Templates in Clerk Dashboard
- Select "Convex" template
- Save the **Issuer URL** (Frontend API URL)
  - Dev: `https://verb-noun-00.clerk.accounts.dev`
  - Prod: `https://clerk.<your-domain>.com`

#### Step 2: Configure Custom Claims (Optional)
Default claims provided:
- `aud`: Convex application ID
- `sub`: User ID
- `name`: User's full name
- `email`: User's email

**Additional claims we should add**:
- `org_id`: Current organization ID
- `org_role`: User's role in the organization
- `org_slug`: Organization slug
- `org_permissions`: Array of permissions

#### Step 3: Configure Convex Auth
Create `convex/auth.config.js`:
\`\`\`javascript
export default {
  providers: [
    {
      domain: process.env.CLERK_FRONTEND_API_URL,
      applicationID: 'convex',
    },
  ],
};
\`\`\`

#### Step 4: Use ConvexProviderWithClerk
\`\`\`typescript
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ClerkProvider, useAuth } from '@clerk/nextjs';

<ClerkProvider>
  <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
    {children}
  </ConvexProviderWithClerk>
</ClerkProvider>
\`\`\`

### 2.3 Auth in Convex Functions

#### Accessing Auth State
\`\`\`typescript
import { query, mutation } from './_generated/server';

export const myQuery = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    
    if (!identity) {
      throw new Error('Unauthenticated');
    }
    
    const userId = identity.subject; // Clerk user ID
    const orgId = identity.org_id; // Custom claim
    const orgRole = identity.org_role; // Custom claim
    
    // Query with tenant isolation
    return await ctx.db
      .query('sessions')
      .withIndex('by_organization', (q) => q.eq('organizationId', orgId))
      .collect();
  },
});
\`\`\`

#### Permission Checks
\`\`\`typescript
export const deleteSession = mutation({
  args: { sessionId: v.id('sessions') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Unauthenticated');
    
    const session = await ctx.db.get(args.sessionId);
    if (!session) throw new Error('Session not found');
    
    // Check organization membership
    if (session.organizationId !== identity.org_id) {
      throw new Error('Unauthorized');
    }
    
    // Check permissions
    const permissions = identity.org_permissions || [];
    if (!permissions.includes('sessions:delete')) {
      throw new Error('Insufficient permissions');
    }
    
    await ctx.db.delete(args.sessionId);
  },
});
\`\`\`

### 2.4 Best Practices

1. **Always validate auth**: Check `ctx.auth.getUserIdentity()` in every function
2. **Use custom claims**: Add `org_id`, `org_role`, `org_permissions` to JWT
3. **Tenant isolation**: Filter all queries by `organizationId`
4. **Permission checks**: Verify permissions server-side in mutations
5. **Error handling**: Return clear error messages for auth failures
6. **Index optimization**: Create indexes on `organizationId` for performance

---

## 3. Polar Payment Integration

### 3.1 Overview

Polar is a **Merchant of Record (MoR)** billing platform that:
- Handles global tax compliance (VAT, GST, sales tax)
- Manages subscriptions
- Provides transparent pricing for developers

### 3.2 Our Pricing Model (MVP)

**Per-User Subscription**:
- Organization subscribes to a plan
- Price = base price + (number of users × per-user price)
- User added = org charged immediately
- User removed = credit applied at next billing cycle
- Simple, predictable pricing

#### Example Pricing Structure
\`\`\`
Starter Plan:
- $29/month base
- $10/user/month
- 3 users = $29 + (3 × $10) = $59/month

Pro Plan:
- $99/month base
- $15/user/month
- 5 users = $99 + (5 × $15) = $174/month
\`\`\`

### 3.3 Integration Architecture (Simplified)

#### Webhook Events (MVP Scope)
We only need to handle:
- `subscription.created` - New subscription started
- `subscription.updated` - Subscription modified (user count changed)
- `subscription.canceled` - Subscription ended

#### Data Flow
1. **Admin subscribes** → Polar Checkout
2. **Payment successful** → Polar webhook to our API
3. **Webhook handler** → Update Convex subscription record
4. **App checks subscription** → Grant/deny access based on active subscription

### 3.4 Database Schema Implications (Simplified)

We only need to track:
- **Subscriptions**: Link to organizations
- **Subscription status**: active/canceled/past_due

#### Subscription Schema (MVP)
\`\`\`typescript
{
  id: Id<'subscriptions'>,
  organizationId: string, // Clerk org ID
  polarSubscriptionId: string, // Polar subscription ID
  polarCustomerId: string, // Polar customer ID
  planId: string, // 'starter' | 'pro' | 'enterprise'
  status: 'active' | 'canceled' | 'past_due',
  userCount: number, // Number of users in org
  currentPeriodEnd: number,
  cancelAtPeriodEnd: boolean,
  createdAt: number,
  updatedAt: number,
}
\`\`\`

### 3.5 Implementation Strategy

#### Phase 1: Webhook Handler
\`\`\`typescript
// app/api/webhooks/polar/route.ts
export async function POST(req: Request) {
  const signature = req.headers.get('polar-signature');
  const payload = await req.text();
  
  // Verify webhook signature
  const isValid = verifyPolarSignature(payload, signature);
  if (!isValid) return new Response('Invalid signature', { status: 401 });
  
  const event = JSON.parse(payload);
  
  // Handle different event types
  switch (event.type) {
    case 'subscription.created':
      await handleSubscriptionCreated(event.data);
      break;
    case 'subscription.updated':
      await handleSubscriptionUpdated(event.data);
      break;
    case 'subscription.canceled':
      await handleSubscriptionCanceled(event.data);
      break;
    // ... other events
  }
  
  return new Response('OK', { status: 200 });
}
\`\`\`

#### Phase 2: Entitlement Checks
\`\`\`typescript
// convex/subscriptions.ts
export const checkFeatureAccess = query({
  args: { feature: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return false;
    
    const subscription = await ctx.db
      .query('subscriptions')
      .withIndex('by_organization', (q) => 
        q.eq('organizationId', identity.org_id)
      )
      .first();
    
    if (!subscription || subscription.status !== 'active') {
      return false;
    }
    
    return subscription.benefits.includes(args.feature);
  },
});
\`\`\`

### 3.6 Best Practices

1. **Webhook security**: Always verify signatures
2. **Idempotency**: Handle duplicate webhooks gracefully
3. **Async processing**: Process webhooks quickly, defer heavy work
4. **Audit trail**: Log all webhook events for debugging
5. **Grace periods**: Don't immediately revoke access on payment failure
6. **Clear messaging**: Show users their subscription status and benefits

---

## 4. Database Schema Design Principles

Based on the documentation review, our schema must follow these principles:

### 4.1 Multi-Tenancy (Organization Isolation)

**Every tenant-scoped table MUST include**:
\`\`\`typescript
{
  organizationId: v.string(), // Clerk organization ID
  // ... other fields
}
\`\`\`

**Index requirement**:
\`\`\`typescript
.index('by_organization', ['organizationId'])
.index('by_organization_and_user', ['organizationId', 'userId'])
\`\`\`

### 4.2 User-Organization Relationship

**Do NOT duplicate Clerk's membership data**. Instead:
- Use Clerk's API for membership queries
- Store only the `organizationId` reference
- Use JWT claims for role checks (admin vs member)

### 4.3 Subscription-Organization Relationship

**One subscription per organization**:
- Link subscriptions to `organizationId`, not `userId`
- All org members share the subscription
- Only org admins can manage subscriptions

### 4.4 Data Access Patterns

**Always filter by organization**:
\`\`\`typescript
// ✅ CORRECT
const sessions = await ctx.db
  .query('sessions')
  .withIndex('by_organization', (q) => q.eq('organizationId', orgId))
  .collect();

// ❌ WRONG - No tenant isolation
const sessions = await ctx.db
  .query('sessions')
  .collect();
\`\`\`

### 4.5 Permission Checks (Simplified)

**Server-side validation**:
\`\`\`typescript
// 1. Check authentication
const identity = await ctx.auth.getUserIdentity();
if (!identity) throw new Error('Unauthenticated');

// 2. Check organization membership
if (resource.organizationId !== identity.org_id) {
  throw new Error('Unauthorized');
}

// 3. Check admin role (only for sensitive operations like billing)
if (requiresAdmin && identity.org_role !== 'org:admin') {
  throw new Error('Admin access required');
}
\`\`\`

---

## 5. Key Findings & Recommendations

### 5.1 Critical Decisions (MVP Simplified)

1. **Multi-tenancy model**: Organization-based
2. **Auth provider**: Clerk with default admin/member roles
3. **Database**: Convex with organization-scoped indexes
4. **Payments**: Polar with per-user pricing
5. **Subscription scope**: Per-organization with user count tracking

### 5.2 Custom JWT Claims Required (Minimal)

Add to Clerk JWT template:
\`\`\`json
{
  "org_id": "{{org.id}}",
  "org_role": "{{org.role}}"
}
\`\`\`

### 5.3 Environment Variables Required

\`\`\`bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_xxx
CLERK_SECRET_KEY=sk_xxx
CLERK_FRONTEND_API_URL=https://xxx.clerk.accounts.dev
CLERK_WEBHOOK_SECRET=whsec_xxx

# Convex
NEXT_PUBLIC_CONVEX_URL=https://xxx.convex.cloud
CONVEX_DEPLOY_KEY=xxx

# Polar
POLAR_ACCESS_TOKEN=polar_xxx
POLAR_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_POLAR_ORGANIZATION_ID=org_xxx
\`\`\`

### 5.4 Implementation Order

1. **Phase 0**: ✅ Documentation review (DONE)
2. **Phase 1**: Convex setup + Clerk integration
3. **Phase 2**: Core queries/mutations with org isolation
4. **Phase 3**: Migration from localStorage
5. **Phase 4**: Polar integration + subscriptions
6. **Phase 5**: File storage + optimization

### 5.5 Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Data leakage between orgs | **CRITICAL** | Mandatory `organizationId` filtering, comprehensive testing |
| Permission bypass | **HIGH** | Server-side validation, JWT claim verification |
| Webhook replay attacks | **MEDIUM** | Signature verification, idempotency keys |
| Migration data loss | **HIGH** | Backup localStorage, gradual migration, rollback plan |
| Performance with large orgs | **MEDIUM** | Proper indexing, pagination, caching |

---

## 6. Next Steps

### Immediate Actions (Phase 1)

1. ✅ Create Clerk JWT template with custom claims
2. ✅ Set up environment variables
3. ✅ Initialize Convex project
4. ✅ Configure `convex/auth.config.js`
5. ✅ Update providers in `app/layout.tsx`

### Documentation to Create

1. **Database Schema Document**: Complete table definitions with indexes
2. **API Reference**: Convex queries/mutations documentation
3. **Migration Guide**: localStorage → Convex migration steps
4. **Testing Plan**: Multi-tenancy and permission testing scenarios

---

## 7. Conclusion

This documentation review has been **simplified to MVP essentials**:
- Clerk's out-of-the-box admin/member roles (no custom roles)
- Simple per-user pricing (user added = org charged)
- Multi-org support for freelancers/consultants
- Members do NOT access billing
- Focus on what we need NOW, not future complexity

**Status**: ✅ Task 0.1 COMPLETED  
**Time Spent**: 2.5 hours  
**Next Task**: 0.2 Database Schema Design (1-2 hours)

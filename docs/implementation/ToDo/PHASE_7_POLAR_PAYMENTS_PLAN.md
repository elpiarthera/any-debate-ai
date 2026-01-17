# Phase 7: Polar Payment Integration Plan

**Status**: ❌ NOT STARTED (0%)  
**Priority**: HIGH (Required for monetization)  
**Last Updated**: October 11, 2025  
**Estimated Duration**: 18-24 hours

---

## Table of Contents

1. [Overview](#overview)
2. [Official Documentation](#official-documentation)
3. [Prerequisites](#prerequisites)
4. [Implementation Phases](#implementation-phases)
5. [Database Schema](#database-schema)
6. [Testing Strategy](#testing-strategy)
7. [Deployment Checklist](#deployment-checklist)

---

## Overview

### Goals

Implement Polar.sh payment integration with **usage-based billing** (token credits) to enable:
- Organization-level subscriptions with per-user pricing
- **Token credit system** with meters for AI usage tracking
- **Credit packages** for one-time credit purchases
- Automated billing and tax compliance (Polar as Merchant of Record)
- Subscription management (upgrade, downgrade, cancel)
- Webhook handling for subscription and usage events
- Customer portal for self-service management
- Benefit/entitlement checks for feature access

### Key Features

1. **Token Credit System (Usage-Based Billing)**
   - Track AI token usage via Polar Meters
   - Subscription tiers include monthly token credits
   - Credits deducted automatically from usage
   - Overage billing for usage beyond credits
   - Real-time balance tracking

2. **Credit Packages (One-Time Purchases)**
   - Buy additional credits without subscription
   - Credits never expire
   - Stackable with subscription credits

3. **Subscription Tiers with Credits**
   - Free: 10,000 tokens/month, 1 user
   - Starter: 100,000 tokens/month + $29/month + $10/user
   - Pro: 500,000 tokens/month + $99/month + $15/user
   - Enterprise: Custom tokens + Custom pricing

4. **Admin-Only Billing Access**
   - Only organization admins can view/manage subscriptions
   - Members have no access to billing information

5. **Global Tax Compliance**
   - Polar handles VAT, GST, sales tax automatically (Merchant of Record)
   - No manual tax configuration needed

### Architecture

\`\`\`
┌─────────────────┐
│   Next.js App   │
│  (AnyDebateAI)  │
└────────┬────────┘
         │
         ├──────────────────────────────────────┐
         │                                      │
         ▼                                      ▼
┌─────────────────┐                   ┌─────────────────┐
│  Polar Checkout │                   │ Polar Webhooks  │
│   (Subscribe)   │                   │  (Events API)   │
└────────┬────────┘                   └────────┬────────┘
         │                                      │
         │                                      │
         ▼                                      ▼
┌──────────────────────────────────────────────────────┐
│              Convex Database                         │
│  (subscriptions, credits, usage_events tables)       │
└──────────────────────────────────────────────────────┘
         ▲
         │
         │ Ingest Events
         │
┌────────┴────────┐
│  AI Token Usage │
│   (App Logic)   │
└─────────────────┘
\`\`\`

---

## Official Documentation

### Polar Core Documentation

- **Introduction**: https://polar.sh/docs/introduction
- **Authentication (OAT)**: https://polar.sh/docs/integrate/authentication
- **Sandbox Environment**: https://polar.sh/docs/integrate/sandbox
- **Customer State**: https://polar.sh/docs/integrate/customer-state

### Polar SDK & Integration

- **TypeScript SDK**: https://polar.sh/docs/integrate/sdk/typescript
- **Next.js Adapter**: https://polar.sh/docs/integrate/sdk/adapters/nextjs
- **Next.js Guide**: https://polar.sh/docs/guides/nextjs

### Webhooks

- **Setup Webhooks**: https://polar.sh/docs/integrate/webhooks/endpoints
- **Handle Webhooks**: https://polar.sh/docs/integrate/webhooks/delivery
- **Webhook Events**: https://polar.sh/docs/integrate/webhooks/events

### Usage-Based Billing (Meters & Credits)

- **Introduction**: https://polar.sh/docs/features/usage-based-billing/introduction
- **Event Ingestion**: https://polar.sh/docs/features/usage-based-billing/event-ingestion
- **Meters**: https://polar.sh/docs/features/usage-based-billing/meters
- **Credits**: https://polar.sh/docs/features/usage-based-billing/credits
- **Billing**: https://polar.sh/docs/features/usage-based-billing/billing

### Benefits & Features

- **Benefits Introduction**: https://polar.sh/docs/features/benefits/introduction
- **Credits Benefit**: https://polar.sh/docs/features/benefits/credits
- **Products**: https://polar.sh/docs/features/products
- **Orders & Subscriptions**: https://polar.sh/docs/features/orders
- **Customer Portal**: https://polar.sh/docs/features/customer-portal

### API Reference

- **API Overview**: https://polar.sh/docs/api-reference/introduction
- **Events Ingestion API**: https://polar.sh/docs/api-reference/events/ingest
- **Customer Meters API**: https://polar.sh/docs/api-reference/customer-meters/list

---

## Prerequisites

### Required Before Starting

1. ✅ **Phase 4 Complete**: Convex database with organization support
2. ✅ **Phase 5 Complete**: Clerk Organizations with admin/member roles
3. ✅ **Polar Account**: Created at https://polar.sh
4. ✅ **Environment Variables**: Set up in Vercel/local

### Environment Variables

\`\`\`bash
# Polar Configuration
POLAR_ACCESS_TOKEN=polar_oat_xxxxxxxxxxxxx          # Organization Access Token
POLAR_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx            # Webhook signing secret
NEXT_PUBLIC_POLAR_ORGANIZATION_ID=org_xxxxxxxxxxxxx # Your Polar org ID

# Polar Environment (sandbox or production)
NEXT_PUBLIC_POLAR_ENVIRONMENT=sandbox # or 'production'

# App URL for redirects
NEXT_PUBLIC_APP_URL=https://yourdomain.com
\`\`\`

### Polar Dashboard Setup

#### 1. Create Usage Meter

Navigate to **Meters** in Polar Dashboard:

1. Click "Create Meter"
2. **Name**: `ai_token_usage`
3. **Description**: "AI token consumption across all models"
4. **Filter**:
   - Property: `name`
   - Operator: `Equals`
   - Value: `ai_usage`
5. **Aggregation**: `SUM`
6. **Field**: `total_tokens` (from event metadata)
7. Save meter

#### 2. Create Products with Credits Benefit

**Subscription Products:**

1. **Starter Plan**:
   - Base price: $29/month
   - Per-user price: $10/user/month
   - **Add Credits Benefit**:
     - Meter: `ai_token_usage`
     - Amount: 100,000 tokens
     - Period: Monthly (resets each billing cycle)
   - **Add Metered Price** (for overage):
     - Meter: `ai_token_usage`
     - Price: $0.01 per 1,000 tokens

2. **Pro Plan**:
   - Base price: $99/month
   - Per-user price: $15/user/month
   - **Add Credits Benefit**:
     - Meter: `ai_token_usage`
     - Amount: 500,000 tokens
     - Period: Monthly
   - **Add Metered Price** (for overage):
     - Meter: `ai_token_usage`
     - Price: $0.008 per 1,000 tokens

**One-Time Credit Packages:**

1. **Small Pack**: $10 for 50,000 tokens
   - **Add Credits Benefit**:
     - Meter: `ai_token_usage`
     - Amount: 50,000 tokens
     - Type: One-time (never expires)

2. **Medium Pack**: $25 for 150,000 tokens
3. **Large Pack**: $50 for 350,000 tokens

#### 3. Configure Webhook Endpoint

1. Navigate to **Settings → Webhooks**
2. Click "Add Endpoint"
3. **URL**: `https://yourdomain.com/api/webhooks/polar`
4. **Format**: Raw (JSON)
5. **Events**: Select all:
   - `subscription.*`
   - `order.*`
   - `checkout.*`
   - `benefit.*`
   - `customer.*`
6. **Generate Secret**: Copy to `POLAR_WEBHOOK_SECRET` env var

#### 4. Generate Access Token

1. Navigate to **Settings → API Tokens**
2. Click "Create Token"
3. **Type**: Organization Access Token (OAT)
4. **Name**: "AnyDebateAI Production"
5. **Permissions**: Full access
6. Copy token to `POLAR_ACCESS_TOKEN` env var

---

## Implementation Phases

### Phase 1: Database Schema & Convex Setup (3-4 hours)

#### Task 1.1: Create Subscription & Credits Schema

**File**: `convex/schema.ts`

\`\`\`typescript
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({

  subscriptions: defineTable({
    // Organization link
    organizationId: v.string(), // Clerk organization ID
    
    // Polar references
    polarSubscriptionId: v.string(), // Polar subscription ID
    polarCustomerId: v.string(), // Polar customer ID
    polarCheckoutId: v.optional(v.string()),
    
    // Plan details
    planId: v.string(), // 'free' | 'starter' | 'pro' | 'enterprise'
    planName: v.string(),
    
    // Pricing
    basePrice: v.number(), // Base price in cents
    perUserPrice: v.number(), // Per-user price in cents
    currency: v.string(),
    
    // User count
    userCount: v.number(),
    includedUsers: v.number(),
    
    // Token credits (monthly allocation)
    monthlyTokens: v.number(), // Tokens included per month
    
    // Status
    status: v.union(
      v.literal('active'),
      v.literal('canceled'),
      v.literal('past_due'),
      v.literal('unpaid'),
      v.literal('incomplete')
    ),
    
    // Billing cycle
    currentPeriodStart: v.number(),
    currentPeriodEnd: v.number(),
    cancelAtPeriodEnd: v.boolean(),
    canceledAt: v.optional(v.number()),
    
    // Metadata
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_organization', ['organizationId'])
    .index('by_polar_subscription', ['polarSubscriptionId'])
    .index('by_status', ['status']),

  credits: defineTable({
    organizationId: v.string(),
    polarCustomerId: v.string(),
    
    // Meter reference
    polarMeterId: v.string(), // ai_token_usage meter ID
    meterName: v.string(), // 'ai_token_usage'
    
    // Balance
    totalCredits: v.number(), // Total credits purchased/allocated
    usedCredits: v.number(), // Credits consumed
    remainingCredits: v.number(), // Available credits
    
    // Source
    source: v.union(
      v.literal('subscription'), // Monthly allocation
      v.literal('package'), // One-time purchase
      v.literal('bonus') // Promotional credits
    ),
    
    // Expiration (null = never expires)
    expiresAt: v.optional(v.number()),
    
    // Metadata
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_organization', ['organizationId'])
    .index('by_customer', ['polarCustomerId'])
    .index('by_meter', ['polarMeterId']),

  usage_events: defineTable({
    organizationId: v.string(),
    polarCustomerId: v.string(),
    
    // Event details
    eventName: v.string(), // 'ai_usage'
    
    // Token usage
    totalTokens: v.number(),
    requestTokens: v.number(),
    responseTokens: v.number(),
    
    // AI model details
    model: v.string(), // 'gpt-4', 'claude-3', etc.
    provider: v.string(), // 'openai', 'anthropic', etc.
    
    // Session context
    sessionId: v.optional(v.id('sessions')),
    messageId: v.optional(v.id('messages')),
    
    // Polar ingestion
    ingestedToPolar: v.boolean(),
    polarEventId: v.optional(v.string()),
    ingestionError: v.optional(v.string()),
    
    createdAt: v.number(),
  })
    .index('by_organization', ['organizationId'])
    .index('by_customer', ['polarCustomerId'])
    .index('by_ingestion', ['ingestedToPolar'])
    .index('by_session', ['sessionId']),

});
\`\`\`

#### Task 1.2: Create Polar SDK Wrapper

**File**: `lib/polar.ts`

\`\`\`typescript
import { Polar } from '@polar-sh/sdk';

export const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server:
    process.env.NEXT_PUBLIC_POLAR_ENVIRONMENT === 'production'
      ? 'production'
      : 'sandbox',
});

export const PLANS = {
  free: {
    id: 'free',
    name: 'Free',
    basePrice: 0,
    perUserPrice: 0,
    includedUsers: 1,
    monthlyTokens: 10000, // 10K tokens/month
    features: [
      'Compare Mode',
      '10,000 tokens/month',
      '1 user',
      'Basic export',
    ],
  },
  starter: {
    id: 'starter',
    name: 'Starter',
    basePrice: 2900, // $29.00
    perUserPrice: 1000, // $10.00
    includedUsers: 1,
    monthlyTokens: 100000, // 100K tokens/month
    overageRate: 0.01, // $0.01 per 1K tokens
    features: [
      'All 3 debate modes',
      '100,000 tokens/month',
      'Agent templates',
      'Advanced export',
      'Up to 5 users',
      '$0.01 per 1K tokens overage',
    ],
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    basePrice: 9900, // $99.00
    perUserPrice: 1500, // $15.00
    includedUsers: 1,
    monthlyTokens: 500000, // 500K tokens/month
    overageRate: 0.008, // $0.008 per 1K tokens
    features: [
      'Everything in Starter',
      '500,000 tokens/month',
      'Artifact canvas',
      'Unlimited sessions',
      'Priority support',
      'Unlimited users',
      '$0.008 per 1K tokens overage',
    ],
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    basePrice: 0, // Custom pricing
    perUserPrice: 0,
    includedUsers: 0,
    monthlyTokens: 0, // Custom allocation
    features: [
      'Everything in Pro',
      'Custom token allocation',
      'Custom AI models',
      'Dedicated support',
      'SLA guarantee',
      'Custom integrations',
    ],
  },
} as const;

export type PlanId = keyof typeof PLANS;

export const CREDIT_PACKAGES = {
  small: {
    id: 'small',
    name: 'Small Pack',
    price: 1000, // $10.00
    tokens: 50000, // 50K tokens
    pricePerToken: 0.0002, // $0.0002 per token
  },
  medium: {
    id: 'medium',
    name: 'Medium Pack',
    price: 2500, // $25.00
    tokens: 150000, // 150K tokens
    pricePerToken: 0.000167, // $0.000167 per token (17% discount)
  },
  large: {
    id: 'large',
    name: 'Large Pack',
    price: 5000, // $50.00
    tokens: 350000, // 350K tokens
    pricePerToken: 0.000143, // $0.000143 per token (29% discount)
  },
} as const;

export type CreditPackageId = keyof typeof CREDIT_PACKAGES;
\`\`\`

**Estimated Time**: 3-4 hours

---

### Phase 2: Usage Event Ingestion (4-5 hours)

#### Task 2.1: Create Usage Tracking Mutations

**File**: `convex/usage.ts`

\`\`\`typescript
import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const trackTokenUsage = mutation({
  args: {
    totalTokens: v.number(),
    requestTokens: v.number(),
    responseTokens: v.number(),
    model: v.string(),
    provider: v.string(),
    sessionId: v.optional(v.id('sessions')),
    messageId: v.optional(v.id('messages')),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Unauthorized');

    const orgId = identity.org_id;
    if (!orgId) throw new Error('No organization');

    // Get Polar customer ID from subscription
    const subscription = await ctx.db
      .query('subscriptions')
      .withIndex('by_organization', (q) => q.eq('organizationId', orgId))
      .first();

    if (!subscription) {
      // Free tier - still track but don't ingest to Polar
      await ctx.db.insert('usage_events', {
        organizationId: orgId,
        polarCustomerId: '',
        eventName: 'ai_usage',
        totalTokens: args.totalTokens,
        requestTokens: args.requestTokens,
        responseTokens: args.responseTokens,
        model: args.model,
        provider: args.provider,
        sessionId: args.sessionId,
        messageId: args.messageId,
        ingestedToPolar: false,
        createdAt: Date.now(),
      });
      return;
    }

    // Insert usage event
    const eventId = await ctx.db.insert('usage_events', {
      organizationId: orgId,
      polarCustomerId: subscription.polarCustomerId,
      eventName: 'ai_usage',
      totalTokens: args.totalTokens,
      requestTokens: args.requestTokens,
      responseTokens: args.responseTokens,
      model: args.model,
      provider: args.provider,
      sessionId: args.sessionId,
      messageId: args.messageId,
      ingestedToPolar: false,
      createdAt: Date.now(),
    });

    // Schedule Polar ingestion (async)
    await ctx.scheduler.runAfter(0, 'usage:ingestToPolar', { eventId });
  },
});

export const ingestToPolar = mutation({
  args: { eventId: v.id('usage_events') },
  handler: async (ctx, args) => {
    const event = await ctx.db.get(args.eventId);
    if (!event || event.ingestedToPolar) return;

    try {
      // Call Polar Events Ingestion API
      const response = await fetch(
        `https://api.polar.sh/v1/events/ingest`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.POLAR_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'ai_usage',
            external_customer_id: event.organizationId,
            metadata: {
              model: event.model,
              provider: event.provider,
              total_tokens: event.totalTokens,
              request_tokens: event.requestTokens,
              response_tokens: event.responseTokens,
              session_id: event.sessionId,
              message_id: event.messageId,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Polar API error: ${response.statusText}`);
      }

      const data = await response.json();

      // Mark as ingested
      await ctx.db.patch(args.eventId, {
        ingestedToPolar: true,
        polarEventId: data.id,
      });
    } catch (error) {
      console.error('[POLAR_INGESTION_ERROR]', error);
      await ctx.db.patch(args.eventId, {
        ingestionError: error.message,
      });
    }
  },
});

export const getTokenBalance = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const orgId = identity.org_id;
    if (!orgId) return null;

    // Get subscription
    const subscription = await ctx.db
      .query('subscriptions')
      .withIndex('by_organization', (q) => q.eq('organizationId', orgId))
      .filter((q) => q.eq(q.field('status'), 'active'))
      .first();

    if (!subscription) {
      // Free tier
      return {
        monthlyAllocation: 10000,
        used: 0,
        remaining: 10000,
        overage: 0,
        plan: 'free',
      };
    }

    // Get credits from Polar Customer State API
    // (This would be a server action in practice)
    const credits = await ctx.db
      .query('credits')
      .withIndex('by_organization', (q) => q.eq('organizationId', orgId))
      .first();

    if (!credits) {
      return {
        monthlyAllocation: subscription.monthlyTokens,
        used: 0,
        remaining: subscription.monthlyTokens,
        overage: 0,
        plan: subscription.planId,
      };
    }

    const overage = Math.max(0, credits.usedCredits - credits.totalCredits);

    return {
      monthlyAllocation: subscription.monthlyTokens,
      used: credits.usedCredits,
      remaining: credits.remainingCredits,
      overage,
      plan: subscription.planId,
    };
  },
});
\`\`\`

#### Task 2.2: Integrate Usage Tracking in AI Chat

**File**: `app/api/chat/route.ts`

\`\`\`typescript

export async function POST(req: Request) {

  const stream = streamText({
    model: selectedModel,
    messages,
    onFinish: async (result) => {
      await convex.mutation(api.usage.trackTokenUsage, {
        totalTokens: result.usage.totalTokens,
        requestTokens: result.usage.promptTokens,
        responseTokens: result.usage.completionTokens,
        model: selectedModel.modelId,
        provider: selectedModel.provider,
        sessionId: sessionId,
        messageId: messageId,
      });

    },
  });

}
\`\`\`

**Estimated Time**: 4-5 hours

---

### Phase 3: Checkout & Subscription Management (4-5 hours)

#### Task 3.1: Create Checkout Routes using Polar Next.js Adapter

**File**: `app/api/checkout/subscription/route.ts`

\`\`\`typescript
import { Checkout } from '@polar-sh/nextjs';

export const GET = Checkout({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?subscription=success`,
  server: process.env.NEXT_PUBLIC_POLAR_ENVIRONMENT as 'sandbox' | 'production',
});

// Query params: ?products=<product_id>&customerEmail=<email>&customerName=<name>
\`\`\`

**File**: `app/api/checkout/credits/route.ts`

\`\`\`typescript
import { Checkout } from '@polar-sh/nextjs';

export const GET = Checkout({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?credits=success`,
  server: process.env.NEXT_PUBLIC_POLAR_ENVIRONMENT as 'sandbox' | 'production',
});

// Query params: ?products=<credit_package_id>&customerEmail=<email>
\`\`\`

#### Task 3.2: Create Customer Portal Route

**File**: `app/api/portal/route.ts`

\`\`\`typescript
import { CustomerPortal } from '@polar-sh/nextjs';
import { auth } from '@clerk/nextjs/server';
import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';

export const GET = CustomerPortal({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  getCustomerId: async (req) => {
    const { orgId } = await auth();
    if (!orgId) throw new Error('No organization');

    // Get Polar customer ID from subscription
    const subscription = await fetchQuery(
      api.subscriptions.getOrganizationSubscription
    );

    if (!subscription) throw new Error('No subscription');

    return subscription.polarCustomerId;
  },
  server: process.env.NEXT_PUBLIC_POLAR_ENVIRONMENT as 'sandbox' | 'production',
});
\`\`\`

#### Task 3.3: Create Billing UI

**File**: `app/dashboard/billing/page.tsx`

\`\`\`typescript
'use client';

import { useOrganization } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PLANS, CREDIT_PACKAGES } from '@/lib/polar';
import Link from 'next/link';

export default function BillingPage() {
  const { membership } = useOrganization();
  const subscription = useQuery(api.subscriptions.getOrganizationSubscription);
  const tokenBalance = useQuery(api.usage.getTokenBalance);

  // Only admins can access billing
  if (membership?.role !== 'org:admin') {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="text-muted-foreground mt-2">
          Only organization admins can access billing information.
        </p>
      </div>
    );
  }

  const handleSubscribe = (planId: string) => {
    // Redirect to Polar checkout
    window.location.href = `/api/checkout/subscription?products=${planId}`;
  };

  const handleBuyCredits = (packageId: string) => {
    // Redirect to Polar checkout
    window.location.href = `/api/checkout/credits?products=${packageId}`;
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Billing & Subscription</h1>

      {/* Token Balance */}
      {tokenBalance && (
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Token Balance</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>Used: {tokenBalance.used.toLocaleString()}</span>
                <span>
                  Remaining: {tokenBalance.remaining.toLocaleString()}
                </span>
              </div>
              <Progress
                value={
                  (tokenBalance.used / tokenBalance.monthlyAllocation) * 100
                }
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Monthly allocation: {tokenBalance.monthlyAllocation.toLocaleString()} tokens
            </p>
            {tokenBalance.overage > 0 && (
              <p className="text-sm text-destructive">
                Overage: {tokenBalance.overage.toLocaleString()} tokens
              </p>
            )}
          </div>
        </Card>
      )}

      {/* Current Subscription */}
      {subscription && (
        <Card className="p-6 mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-semibold">Current Plan</h2>
              <p className="text-3xl font-bold mt-2">{subscription.planName}</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/api/portal">Manage Subscription</Link>
            </Button>
          </div>
          <div className="space-y-2">
            <p>
              <strong>Users:</strong> {subscription.userCount}
            </p>
            <p>
              <strong>Tokens:</strong> {subscription.monthlyTokens.toLocaleString()}/month
            </p>
            <p>
              <strong>Next billing:</strong>{' '}
              {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
            </p>
          </div>
        </Card>
      )}

      {/* Credit Packages */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Buy Additional Credits</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(CREDIT_PACKAGES).map(([id, pack]) => (
            <Card key={id} className="p-6">
              <h3 className="text-xl font-bold mb-2">{pack.name}</h3>
              <p className="text-3xl font-bold mb-2">
                ${(pack.price / 100).toFixed(0)}
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                {pack.tokens.toLocaleString()} tokens
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                ${(pack.pricePerToken * 1000).toFixed(3)} per 1K tokens
              </p>
              <Button onClick={() => handleBuyCredits(id)} className="w-full">
                Buy Now
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Subscription Plans */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Subscription Plans</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(PLANS)
            .filter(([id]) => id !== 'free')
            .map(([id, plan]) => (
              <Card key={id} className="p-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold mb-2">
                  ${(plan.basePrice / 100).toFixed(0)}
                  <span className="text-sm text-muted-foreground">/month</span>
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  + ${(plan.perUserPrice / 100).toFixed(0)}/user/month
                </p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="text-sm">
                      ✓ {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handleSubscribe(id)}
                  disabled={subscription?.planId === id}
                  className="w-full"
                >
                  {subscription?.planId === id ? 'Current Plan' : 'Subscribe'}
                </Button>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
\`\`\`

**Estimated Time**: 4-5 hours

---

### Phase 4: Webhook Handler (4-5 hours)

#### Task 4.1: Create Webhook Route using Polar Next.js Adapter

**File**: `app/api/webhooks/polar/route.ts`

\`\`\`typescript
import { Webhooks } from '@polar-sh/nextjs';
import { api } from '@/convex/_generated/api';
import { fetchMutation } from 'convex/nextjs';

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  
  // Handle all webhook events
  onPayload: async (payload) => {
    console.log('[POLAR_WEBHOOK] Received:', payload.type);
  },

  // Subscription events
  onSubscriptionCreated: async (subscription) => {
    await fetchMutation(api.subscriptions.createSubscription, {
      organizationId: subscription.metadata?.organizationId,
      polarSubscriptionId: subscription.id,
      polarCustomerId: subscription.customerId,
      planId: subscription.metadata?.planId,
      userCount: parseInt(subscription.metadata?.userCount || '1'),
      status: subscription.status,
      currentPeriodStart: new Date(subscription.currentPeriodStart).getTime(),
      currentPeriodEnd: new Date(subscription.currentPeriodEnd).getTime(),
    });
  },

  onSubscriptionUpdated: async (subscription) => {
    await fetchMutation(api.subscriptions.updateSubscription, {
      polarSubscriptionId: subscription.id,
      status: subscription.status,
      currentPeriodEnd: new Date(subscription.currentPeriodEnd).getTime(),
      cancelAtPeriodEnd: subscription.cancelAtPeriodEnd || false,
    });
  },

  onSubscriptionCanceled: async (subscription) => {
    await fetchMutation(api.subscriptions.cancelSubscription, {
      polarSubscriptionId: subscription.id,
      canceledAt: subscription.canceledAt
        ? new Date(subscription.canceledAt).getTime()
        : Date.now(),
    });
  },

  // Order events (for credit packages)
  onOrderCreated: async (order) => {
    // Check if this is a credit package purchase
    if (order.products.some(p => p.benefits.some(b => b.type === 'credits'))) {
      await fetchMutation(api.credits.addCreditsFromOrder, {
        organizationId: order.metadata?.organizationId,
        polarCustomerId: order.customerId,
        orderId: order.id,
        products: order.products,
      });
    }
  },

  // Benefit events (for credit allocation)
  onBenefitGranted: async (benefit) => {
    if (benefit.type === 'credits') {
      await fetchMutation(api.credits.grantBenefit, {
        organizationId: benefit.metadata?.organizationId,
        polarCustomerId: benefit.customerId,
        benefitId: benefit.id,
        meterId: benefit.properties.meterId,
        amount: benefit.properties.amount,
        source: benefit.subscriptionId ? 'subscription' : 'package',
      });
    }
  },

  onBenefitRevoked: async (benefit) => {
    if (benefit.type === 'credits') {
      await fetchMutation(api.credits.revokeBenefit, {
        benefitId: benefit.id,
      });
    }
  },

  // Customer state changed (for balance updates)
  onCustomerStateChanged: async (customerState) => {
    // Update credits balance from Polar's customer state
    for (const meter of customerState.meters) {
      await fetchMutation(api.credits.updateBalance, {
        organizationId: customerState.metadata?.organizationId,
        polarCustomerId: customerState.customerId,
        meterId: meter.id,
        balance: meter.balance,
        usage: meter.usage,
      });
    }
  },
});
\`\`\`

#### Task 4.2: Create Subscription & Credits Mutations

**File**: `convex/subscriptions.ts`

\`\`\`typescript
import { mutation } from './_generated/server';
import { v } from 'convex/values';
import { PLANS } from '@/lib/polar';


export const createSubscription = mutation({
  args: {
    organizationId: v.string(),
    polarSubscriptionId: v.string(),
    polarCustomerId: v.string(),
    planId: v.string(),
    userCount: v.number(),
    status: v.string(),
    currentPeriodStart: v.number(),
    currentPeriodEnd: v.number(),
  },
  handler: async (ctx, args) => {
    const plan = PLANS[args.planId as keyof typeof PLANS];
    if (!plan) throw new Error('Invalid plan');

    await ctx.db.insert('subscriptions', {
      organizationId: args.organizationId,
      polarSubscriptionId: args.polarSubscriptionId,
      polarCustomerId: args.polarCustomerId,
      planId: args.planId,
      planName: plan.name,
      basePrice: plan.basePrice,
      perUserPrice: plan.perUserPrice,
      currency: 'USD',
      userCount: args.userCount,
      includedUsers: plan.includedUsers,
      monthlyTokens: plan.monthlyTokens,
      status: args.status as any,
      currentPeriodStart: args.currentPeriodStart,
      currentPeriodEnd: args.currentPeriodEnd,
      cancelAtPeriodEnd: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

\`\`\`

**File**: `convex/credits.ts`

\`\`\`typescript
import { mutation } from './_generated/server';
import { v } from 'convex/values';

export const grantBenefit = mutation({
  args: {
    organizationId: v.string(),
    polarCustomerId: v.string(),
    benefitId: v.string(),
    meterId: v.string(),
    amount: v.number(),
    source: v.union(v.literal('subscription'), v.literal('package')),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('credits', {
      organizationId: args.organizationId,
      polarCustomerId: args.polarCustomerId,
      polarMeterId: args.meterId,
      meterName: 'ai_token_usage',
      totalCredits: args.amount,
      usedCredits: 0,
      remainingCredits: args.amount,
      source: args.source,
      expiresAt: args.source === 'subscription' ? undefined : undefined, // Packages never expire
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const updateBalance = mutation({
  args: {
    organizationId: v.string(),
    polarCustomerId: v.string(),
    meterId: v.string(),
    balance: v.number(),
    usage: v.number(),
  },
  handler: async (ctx, args) => {
    const credits = await ctx.db
      .query('credits')
      .withIndex('by_organization', (q) =>
        q.eq('organizationId', args.organizationId)
      )
      .filter((q) => q.eq(q.field('polarMeterId'), args.meterId))
      .first();

    if (!credits) return;

    await ctx.db.patch(credits._id, {
      usedCredits: args.usage,
      remainingCredits: args.balance,
      updatedAt: Date.now(),
    });
  },
});

\`\`\`

**Estimated Time**: 4-5 hours

---

### Phase 5: Feature Gating & Testing (3-4 hours)

#### Task 5.1: Create Token Balance Check Hook

**File**: `hooks/use-token-balance.ts`

\`\`\`typescript
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

export function useTokenBalance() {
  const balance = useQuery(api.usage.getTokenBalance);

  return {
    balance,
    hasTokens: balance ? balance.remaining > 0 : false,
    isLoading: balance === undefined,
  };
}
\`\`\`

#### Task 5.2: Add Token Balance Warning Component

**File**: `components/token-balance-warning.tsx`

\`\`\`typescript
'use client';

import { useTokenBalance } from '@/hooks/use-token-balance';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export function TokenBalanceWarning() {
  const { balance } = useTokenBalance();

  if (!balance || balance.remaining > 1000) return null;

  if (balance.remaining === 0) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>You've used all your tokens. Buy more to continue.</span>
          <Button asChild size="sm" variant="outline">
            <Link href="/dashboard/billing">Buy Credits</Link>
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert>
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span>
          Low token balance: {balance.remaining.toLocaleString()} remaining
        </span>
        <Button asChild size="sm" variant="outline">
          <Link href="/dashboard/billing">Buy Credits</Link>
        </Button>
      </AlertDescription>
    </Alert>
  );
}
\`\`\`

#### Task 5.3: Testing

1. **Test Subscription Flow**:
   - Create subscription via checkout
   - Verify webhook creates subscription in Convex
   - Verify credits are allocated
   - Test token usage tracking
   - Verify balance updates

2. **Test Credit Packages**:
   - Purchase credit package
   - Verify webhook grants credits
   - Verify credits are added to balance
   - Test credit consumption

3. **Test Overage Billing**:
   - Use tokens beyond monthly allocation
   - Verify overage is tracked
   - Verify metered billing at end of period

**Estimated Time**: 3-4 hours

---

## Database Schema

### Subscriptions Table

\`\`\`typescript
{
  _id: Id<'subscriptions'>,
  organizationId: string,
  polarSubscriptionId: string,
  polarCustomerId: string,
  planId: string,
  planName: string,
  basePrice: number,
  perUserPrice: number,
  currency: string,
  userCount: number,
  includedUsers: number,
  monthlyTokens: number, // NEW: Monthly token allocation
  status: 'active' | 'canceled' | 'past_due' | 'unpaid' | 'incomplete',
  currentPeriodStart: number,
  currentPeriodEnd: number,
  cancelAtPeriodEnd: boolean,
  canceledAt?: number,
  createdAt: number,
  updatedAt: number,
}
\`\`\`

### Credits Table (NEW)

\`\`\`typescript
{
  _id: Id<'credits'>,
  organizationId: string,
  polarCustomerId: string,
  polarMeterId: string, // ai_token_usage
  meterName: string,
  totalCredits: number,
  usedCredits: number,
  remainingCredits: number,
  source: 'subscription' | 'package' | 'bonus',
  expiresAt?: number,
  createdAt: number,
  updatedAt: number,
}
\`\`\`

### Usage Events Table (NEW)

\`\`\`typescript
{
  _id: Id<'usage_events'>,
  organizationId: string,
  polarCustomerId: string,
  eventName: string, // 'ai_usage'
  totalTokens: number,
  requestTokens: number,
  responseTokens: number,
  model: string,
  provider: string,
  sessionId?: Id<'sessions'>,
  messageId?: Id<'messages'>,
  ingestedToPolar: boolean,
  polarEventId?: string,
  ingestionError?: string,
  createdAt: number,
}
\`\`\`

---

## API Routes

### POST /api/checkout/create

Create Polar checkout session for subscription.

**Auth**: Required (Clerk)  
**Role**: Admin only

**Request**:
\`\`\`json
{
  "planId": "starter",
  "userCount": 3
}
\`\`\`

**Response**:
\`\`\`json
{
  "checkoutUrl": "https://polar.sh/checkout/...",
  "checkoutId": "checkout_xxxxx"
}
\`\`\`

### POST /api/webhooks/polar

Handle Polar webhook events.

**Auth**: Webhook signature verification

**Events**:
- `subscription.created`
- `subscription.updated`
- `subscription.canceled`
- `subscription.revoked`

---

## Testing Strategy

### Unit Tests

1. **Webhook verification**:
   - Valid signatures pass
   - Invalid signatures fail
   - Malformed payloads handled

2. **Feature access logic**:
   - Free tier features accessible without subscription
   - Paid features gated correctly
   - Plan upgrades grant access immediately

### Integration Tests

1. **Checkout flow**:
   - Admin can create checkout
   - Member cannot create checkout
   - Checkout redirects to Polar
   - Success callback updates database

2. **Webhook processing**:
   - Subscription created event creates record
   - Subscription updated event updates record
   - Subscription canceled event revokes access

### Manual Testing Checklist

- [ ] Create subscription as admin
- [ ] Verify subscription appears in billing page
- [ ] Verify feature access granted
- [ ] Add user to organization
- [ ] Verify billing amount updated
- [ ] Cancel subscription
- [ ] Verify access continues until period end
- [ ] Verify access revoked after period end
- [ ] Test as member (no billing access)
- [ ] Test webhook signature verification
- [ ] Test duplicate webhook handling

---

## Deployment Checklist

### Pre-Deployment

- [ ] Set up Polar account (production)
- [ ] Create products and pricing in Polar Dashboard
- [ ] Generate production access token
- [ ] Configure webhook endpoint in Polar
- [ ] Set all environment variables in Vercel
- [ ] Test webhook endpoint with Polar testing tool

### Deployment

- [ ] Deploy to production
- [ ] Verify webhook endpoint is accessible
- [ ] Test checkout flow end-to-end
- [ ] Monitor webhook logs for errors
- [ ] Test feature gating in production

### Post-Deployment

- [ ] Monitor subscription creation rate
- [ ] Check for webhook processing errors
- [ ] Verify billing amounts are correct
- [ ] Set up alerts for failed webhooks
- [ ] Document common issues and solutions

---

## Best Practices

### Security

1. **Always verify webhook signatures** - Never trust unverified webhooks
2. **Admin-only billing access** - Enforce server-side role checks
3. **Secure API tokens** - Never expose access tokens in client code
4. **Rate limiting** - Implement rate limits on checkout creation

### Performance

1. **Async webhook processing** - Return 200 immediately, process async
2. **Idempotent handlers** - Handle duplicate webhooks gracefully
3. **Database indexes** - Index by organizationId and polarSubscriptionId
4. **Cache subscription status** - Reduce database queries for feature checks

### User Experience

1. **Clear pricing** - Show exact amounts before checkout
2. **Grace periods** - Don't immediately revoke access on payment failure
3. **Prorated billing** - Explain prorated charges when adding users
4. **Cancel flow** - Make cancellation easy and transparent

### Monitoring

1. **Webhook logs** - Log all webhook events for debugging
2. **Failed payments** - Alert admins of failed payments
3. **Subscription metrics** - Track MRR, churn, user count
4. **Error tracking** - Monitor webhook processing errors

---

## Timeline Summary

| Phase | Tasks | Duration |
|-------|-------|----------|
| Phase 1 | Database schema & queries | 2-3 hours |
| Phase 2 | Checkout integration | 3-4 hours |
| Phase 3 | Webhook handler | 4-5 hours |
| Phase 4 | Feature gating | 2-3 hours |
| Phase 5 | Testing & polish | 1-2 hours |
| **Total** | | **12-17 hours** |

---

## Success Criteria

- [ ] Admins can subscribe to plans via Polar checkout
- [ ] Subscriptions are created in Convex via webhooks
- [ ] Feature access is gated based on subscription plan
- [ ] Members cannot access billing information
- [ ] Per-user pricing updates automatically when users added/removed
- [ ] Subscription cancellation works correctly
- [ ] All webhook events are processed successfully
- [ ] No data leakage between organizations
- [ ] Comprehensive error handling and logging

---

## Next Steps After Completion

1. **Analytics Integration**: Track subscription metrics (MRR, churn, LTV)
2. **Email Notifications**: Send emails for subscription events
3. **Usage-Based Billing**: Add metered billing for API calls
4. **Self-Service Portal**: Allow customers to manage subscriptions
5. **Dunning Management**: Handle failed payments gracefully

---

**Status**: ❌ NOT STARTED (0%)  
**Ready to Start**: After Phase 4 (Convex) and Phase 5 (Organizations) are complete

---

## Official Resources

- **Polar Documentation**: https://polar.sh/docs/introduction
- **TypeScript SDK**: https://github.com/polarsource/polar-js
- **Next.js Guide**: https://polar.sh/docs/guides/nextjs
- **Usage-Based Billing**: https://polar.sh/docs/features/usage-based-billing/introduction
- **Discord Support**: https://discord.gg/polar

---

**Status**: ❌ NOT STARTED (0%)  
**Ready to Start**: After Phase 4 (Convex) and Phase 5 (Organizations) are complete

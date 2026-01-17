# Sprint 1: Environment Setup Implementation Plan

**Status**: Ready to Execute  
**Priority**: P1 (Critical - Blocking all other phases)  
**Timeline**: 2 hours  
**Phase**: Phase 1 of 7 in MVP Sprint  
**Dependencies**: None (Sprint 0 UI Complete)

---

## Overview

This sprint focuses on setting up the complete development and production environment for the AnyDebateAI MVP. All infrastructure, authentication, database, and AI services must be properly configured before any backend implementation can begin.

**Key Deliverables:**
- Convex database initialized and configured
- Clerk authentication set up with webhooks
- Vercel AI Gateway configured for 100+ AI models
- Environment variables properly configured for all environments
- Local development environment verified and working

---

## Time Breakdown

| Task | Duration | Priority |
|------|----------|----------|
| Install Core Dependencies | 10 min | Critical |
| Initialize Convex Database | 20 min | Critical |
| Configure Clerk Authentication | 30 min | Critical |
| Set Up Environment Variables | 30 min | Critical |
| Verify Local Development Setup | 20 min | Critical |
| Configure Production Environment | 10 min | High |
| **TOTAL** | **2 hours** | - |

---

## Prerequisites

Before starting this sprint, ensure you have:

- [x] Node.js 18+ installed
- [x] npm or yarn package manager
- [x] Git repository initialized
- [x] Vercel account (for AI Gateway)
- [x] Clerk account (for authentication)
- [x] Convex account (for database)

---

## Task 1: Install Core Dependencies (10 minutes)

### Overview
Install all required npm packages for Convex, Clerk, and AI SDK integration.

### Commands

\`\`\`bash
# Install Convex (Database)
npm install convex

# Install Clerk (Authentication)
npm install @clerk/nextjs

# Install Vercel AI SDK (Already included in project, verify)
npm install ai @ai-sdk/react

# Install additional utilities (if not already present)
npm install zod date-fns
\`\`\`

### Verification

\`\`\`bash
# Check package.json contains:
# - convex
# - @clerk/nextjs  
# - ai
# - @ai-sdk/react
cat package.json | grep -E "(convex|@clerk/nextjs|\"ai\")"
\`\`\`

### Expected Output
\`\`\`json
{
  "dependencies": {
    "convex": "^1.x.x",
    "@clerk/nextjs": "^5.x.x",
    "ai": "^3.x.x",
    "@ai-sdk/react": "^3.x.x"
  }
}
\`\`\`

---

## Task 2: Initialize Convex Database (20 minutes)

### Overview
Set up Convex cloud database and configure local development sync.

### Step 2.1: Initialize Convex Project

\`\`\`bash
# Initialize Convex (will prompt for login)
npx convex dev
\`\`\`

**Follow the prompts:**
1. Login to Convex (browser will open)
2. Create a new project or select existing
3. Choose deployment name: `anydebate-dev` (for development)
4. Convex will automatically create `convex/` folder
5. `.env.local` will be created with deployment URL

### Step 2.2: Verify Convex Configuration

Check that the following files were created:

\`\`\`bash
# Check for convex folder
ls -la convex/

# Expected files:
# convex/_generated/
# convex/README.md
# convex/tsconfig.json
\`\`\`

### Step 2.3: Check Environment Variables

\`\`\`bash
# Verify .env.local was updated
cat .env.local | grep CONVEX
\`\`\`

**Expected output:**
\`\`\`bash
CONVEX_DEPLOYMENT=dev:anydebate-dev-123456
NEXT_PUBLIC_CONVEX_URL=https://happy-animal-123.convex.cloud
\`\`\`

### Step 2.4: Test Convex Connection

\`\`\`bash
# Open Convex dashboard
npx convex dashboard
\`\`\`

**Verification:**
- Dashboard opens in browser
- Project shows "Running" status
- No errors in terminal

---

## Task 3: Configure Clerk Authentication (30 minutes)

### Overview
Set up Clerk for user authentication, sign-in/sign-up flows, and webhook configuration.

### Step 3.1: Create Clerk Application

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Click "Add application"
3. Name: `AnyDebateAI Dev`
4. Enable authentication methods:
   - ✅ Email (with verification)
   - ✅ Google OAuth
   - ✅ GitHub OAuth (optional)
5. Click "Create application"

### Step 3.2: Copy API Keys

From the Clerk dashboard, copy:

1. **Publishable Key** (starts with `pk_test_`)
2. **Secret Key** (starts with `sk_test_`)

Add to `.env.local`:

\`\`\`bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
\`\`\`

### Step 3.3: Configure Clerk Middleware

The middleware is already set up in `middleware.ts`. Verify it exists:

\`\`\`bash
cat middleware.ts
\`\`\`

**Expected content (simplified):**
\`\`\`typescript
import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
\`\`\`

### Step 3.4: Configure Webhooks (Production)

For production, set up webhooks to sync user data with Convex:

1. In Clerk Dashboard → "Webhooks"
2. Add endpoint: `https://your-domain.com/api/clerk/webhook`
3. Select events:
   - `user.created`
   - `user.updated`
   - `user.deleted`
4. Copy **Signing Secret** (starts with `whsec_`)
5. Add to production environment:

\`\`\`bash
CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret_here
\`\`\`

**Note:** For local development, webhooks can be tested using Clerk's CLI or skipped until production deployment.

### Step 3.5: Test Clerk Integration

\`\`\`bash
# Start development server
npm run dev

# Open browser
open http://localhost:3000
\`\`\`

**Verification steps:**
1. Navigate to `/sign-in`
2. Clerk sign-in UI should appear
3. Create a test account
4. Should redirect to `/dashboard` after sign-in

---

## Task 4: Set Up Environment Variables (30 minutes)

### Overview
Configure all environment variables for development, preview, and production environments.

### Step 4.1: Create .env.local (Development)

Copy from `.env.example` and fill in values:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit `.env.local` with your actual keys:

\`\`\`bash
# ============================================
# AnyDebateAI Environment Variables - Development
# ============================================

# -----------------
# Core Application
# -----------------
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# -----------------
# AI Gateway (Required)
# -----------------
AI_GATEWAY_API_KEY=your_vercel_ai_gateway_key_here

# -----------------
# Database (Convex)
# -----------------
CONVEX_DEPLOYMENT=dev:anydebate-dev-123456
NEXT_PUBLIC_CONVEX_URL=https://happy-animal-123.convex.cloud

# -----------------
# Authentication (Clerk)
# -----------------
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_secret_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# -----------------
# Feature Flags (All enabled for development)
# -----------------
NEXT_PUBLIC_ENABLE_COMPARE_MODE=true
NEXT_PUBLIC_ENABLE_MEMORY=true
NEXT_PUBLIC_ENABLE_ARTIFACTS=true
NEXT_PUBLIC_ENABLE_BILLING=false
\`\`\`

### Step 4.2: Get Vercel AI Gateway Key

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to your project (or create one)
3. Go to "Settings" → "Environment Variables"
4. Create new variable: `AI_GATEWAY_API_KEY`
5. Copy the value to `.env.local`

**Note:** If you don't have Vercel AI Gateway yet, you can use `TOGETHER_API_KEY` as a fallback:

\`\`\`bash
# Alternative: Together AI (if no AI Gateway yet)
TOGETHER_API_KEY=your_together_api_key_here
\`\`\`

### Step 4.3: Validate Environment Variables

Create a validation script to check all required variables:

\`\`\`typescript
// scripts/validate-env.ts
const requiredEnvVars = [
  'NEXT_PUBLIC_CONVEX_URL',
  'CONVEX_DEPLOYMENT',
  'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
  'CLERK_SECRET_KEY',
  'AI_GATEWAY_API_KEY',
] as const

let missingVars: string[] = []

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    missingVars.push(envVar)
  }
})

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:')
  missingVars.forEach(v => console.error(`  - ${v}`))
  process.exit(1)
} else {
  console.log('✅ All required environment variables are set')
}
\`\`\`

Run validation:

\`\`\`bash
npx ts-node scripts/validate-env.ts
\`\`\`

### Step 4.4: Configure Production Environment

For Vercel deployment, add all environment variables in the Vercel Dashboard:

1. Go to Project Settings → Environment Variables
2. Add each variable for **Production** environment:

\`\`\`bash
# Production Environment Variables
NEXT_PUBLIC_APP_URL=https://anydebate.ai
NODE_ENV=production
AI_GATEWAY_API_KEY=your_production_key
CONVEX_DEPLOYMENT=prod:anydebate-prod
NEXT_PUBLIC_CONVEX_URL=https://production.convex.cloud
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
CLERK_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
\`\`\`

---

## Task 5: Verify Local Development Setup (20 minutes)

### Overview
Run comprehensive checks to ensure the entire development environment is working correctly.

### Step 5.1: Start Development Server

\`\`\`bash
# Start Next.js dev server and Convex in parallel
npm run dev
\`\`\`

**Expected output:**
\`\`\`
▲ Next.js 14.x.x
- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000

✓ Ready in 2.5s

Convex: Connected to deployment: dev:anydebate-dev-123456
Convex: Watching for file changes...
\`\`\`

### Step 5.2: Test Convex Connection

Open browser console at `http://localhost:3000` and check for errors:

\`\`\`javascript
// Should see no Convex connection errors
// Check Network tab for convex.cloud requests
\`\`\`

### Step 5.3: Test Clerk Authentication

Navigate to sign-in page and verify:

1. **Sign-in page loads**: `http://localhost:3000/sign-in`
2. **Clerk UI appears**: Email input, social login buttons
3. **Create test account**: Use your email
4. **Verify email**: Check inbox for verification email
5. **Redirects to dashboard**: Should redirect to `/dashboard` after sign-in

### Step 5.4: Test AI Gateway Connection

Create a test API route:

\`\`\`typescript
// app/api/test-ai/route.ts
import { generateText } from 'ai'

export async function GET() {
  try {
    const { text } = await generateText({
      model: 'openai/gpt-3.5-turbo',
      prompt: 'Say "Hello from AI Gateway"'
    })
    
    return Response.json({ success: true, text })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
\`\`\`

Test the route:

\`\`\`bash
curl http://localhost:3000/api/test-ai
\`\`\`

**Expected response:**
\`\`\`json
{
  "success": true,
  "text": "Hello from AI Gateway"
}
\`\`\`

### Step 5.5: Verification Checklist

Run through this checklist:

- [ ] Development server starts without errors
- [ ] Convex connection successful (no errors in console)
- [ ] Clerk sign-in page loads correctly
- [ ] Can create test user account
- [ ] Email verification works
- [ ] Redirects to dashboard after sign-in
- [ ] AI Gateway test endpoint returns successful response
- [ ] No console errors related to environment variables
- [ ] All feature flags working (check `/dashboard`)

---

## Task 6: Configure Production Environment (10 minutes)

### Overview
Set up production-ready configurations for deployment to Vercel.

### Step 6.1: Create Production Convex Deployment

\`\`\`bash
# Create production deployment
npx convex deploy --prod

# Follow prompts to create production deployment
# Name: anydebate-prod
\`\`\`

This will output:

\`\`\`bash
CONVEX_DEPLOYMENT=prod:anydebate-prod-789012
NEXT_PUBLIC_CONVEX_URL=https://production-animal-789.convex.cloud
\`\`\`

### Step 6.2: Create Production Clerk Application

1. In Clerk Dashboard, create a new application
2. Name: `AnyDebateAI Production`
3. Use same authentication methods as dev
4. Copy **live** keys (start with `pk_live_` and `sk_live_`)

### Step 6.3: Add Production Environment Variables to Vercel

1. Go to Vercel project dashboard
2. Settings → Environment Variables
3. Add all variables for **Production** scope
4. Redeploy to apply changes

### Step 6.4: Configure Webhooks for Production

1. Clerk Dashboard → Webhooks
2. Add endpoint: `https://anydebate.ai/api/clerk/webhook`
3. Copy webhook secret
4. Add to Vercel: `CLERK_WEBHOOK_SECRET`

---

## Troubleshooting Guide

### Issue 1: Convex Connection Fails

**Symptom:** "Failed to connect to Convex" error

**Solutions:**
1. Check `NEXT_PUBLIC_CONVEX_URL` is set correctly
2. Verify Convex deployment is running: `npx convex dashboard`
3. Restart dev server after changing env vars
4. Clear `.next` cache: `rm -rf .next`

### Issue 2: Clerk Authentication Not Working

**Symptom:** Sign-in page shows error or doesn't load

**Solutions:**
1. Verify both `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` are set
2. Check Clerk application is active in dashboard
3. Ensure Clerk URLs are configured correctly
4. Clear browser cookies and cache
5. Check `middleware.ts` is present and configured

### Issue 3: AI Gateway Returns 401 Unauthorized

**Symptom:** AI requests fail with authentication error

**Solutions:**
1. Verify `AI_GATEWAY_API_KEY` is correct
2. Check Vercel project has AI Gateway enabled
3. Try alternative provider (Together AI) if gateway unavailable
4. Check Vercel dashboard for API quota limits

### Issue 4: Environment Variables Not Updating

**Symptom:** Changes to `.env.local` not reflected

**Solutions:**
1. Restart dev server completely (Ctrl+C, then `npm run dev`)
2. Clear Next.js cache: `rm -rf .next`
3. For `NEXT_PUBLIC_` variables, hard refresh browser (Cmd+Shift+R)
4. Check variable name has correct prefix

### Issue 5: Webhook Verification Fails

**Symptom:** Clerk webhook returns 400 or 403 error

**Solutions:**
1. Verify `CLERK_WEBHOOK_SECRET` matches Clerk dashboard
2. Check webhook endpoint is accessible (not behind auth middleware)
3. Ensure webhook handler uses correct verification method
4. Check Clerk dashboard for webhook delivery logs

---

## Post-Sprint Verification

After completing all tasks, verify the following:

### Development Environment
- [ ] Can run `npm run dev` without errors
- [ ] Can sign in and create user account
- [ ] Can access dashboard after authentication
- [ ] Convex connection active in browser console
- [ ] Test AI endpoint returns successful response

### Production Environment
- [ ] All production env vars added to Vercel
- [ ] Production Convex deployment created
- [ ] Production Clerk application configured
- [ ] Webhooks configured and verified
- [ ] Can deploy to Vercel without errors

---

## Next Steps

Once this sprint is complete:

1. **Proceed to Sprint 2: Database Implementation**
   - Implement Convex schema
   - Create database functions
   - Set up real-time subscriptions
   - **Reference**: `docs/implementation/ToDo/MVP/SPRINT_2_DATABASE_IMPLEMENTATION_PLAN.md`

2. **Update Sprint Status**
   - Mark Phase 1 as "Complete" in `docs/MVP_SPRINTS.md`
   - Move to Phase 2 in project tracker

---

## Related Documentation

### Critical References
- **`docs/guides/environment-variables-setup.md`** - Complete env var reference
- **`docs/MVP_SPRINTS.md`** - Overall sprint plan
- **`docs/guides/convex-database-schema.md`** - Database schema for next sprint

### Setup Guides
- [Convex Documentation](https://docs.convex.dev)
- [Clerk Next.js Setup](https://clerk.com/docs/quickstarts/nextjs)
- [Vercel AI SDK Documentation](https://sdk.vercel.ai/docs)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

---

**Sprint 1 Status**: Ready to Execute  
**Estimated Completion**: 2 hours  
**Dependencies**: None (Sprint 0 Complete)  
**Blocks**: Sprint 2, 3, 4, 5, 6, 7 (All subsequent sprints require environment setup)

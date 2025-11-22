# Environment Variables Setup Guide

**Status**: Reference Document  
**Last Updated**: 2024-01-15  
**Purpose**: Complete reference for all environment variables needed for AnyDebateAI

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Required Variables](#required-variables)
3. [AI Integration Variables](#ai-integration-variables)
4. [Database Variables](#database-variables)
5. [Authentication Variables](#authentication-variables)
6. [Payment Variables](#payment-variables)
7. [Optional Variables](#optional-variables)
8. [Environment-Specific Configuration](#environment-specific-configuration)
9. [Security Best Practices](#security-best-practices)

---

## Quick Start

### Development Setup

1. Copy the template:
\`\`\`bash
cp .env.example .env.local
\`\`\`

2. Fill in required variables (marked with `REQUIRED`)
3. Start development: `npm run dev`

### Production Setup

1. Set all variables in Vercel dashboard or hosting platform
2. Never commit `.env` files to git
3. Use environment-specific values for each deployment

---

## Required Variables

These variables MUST be set for the application to function:

### Core Application

\`\`\`bash
# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000  # REQUIRED - Application base URL
NODE_ENV=development                        # REQUIRED - development | production | test

# Vercel AI Gateway (Replaces individual provider keys)
AI_GATEWAY_API_KEY=your_vercel_ai_gateway_key  # REQUIRED - Provides access to 100+ models
\`\`\`

### Database (Convex)

\`\`\`bash
# Convex Database
CONVEX_DEPLOYMENT=your_deployment_name      # REQUIRED - Convex deployment identifier
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud  # REQUIRED - Convex API URL
\`\`\`

### Authentication (Clerk)

\`\`\`bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...  # REQUIRED - Clerk public key
CLERK_SECRET_KEY=sk_test_...                    # REQUIRED - Clerk secret key (server-only)

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in         # REQUIRED
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up         # REQUIRED
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard # REQUIRED
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard # REQUIRED
\`\`\`

---

## AI Integration Variables

### Vercel AI Gateway (Primary - Provides 100+ Models)

The Vercel AI Gateway eliminates the need for individual provider API keys for most use cases.

\`\`\`bash
# Vercel AI Gateway
AI_GATEWAY_API_KEY=your_vercel_ai_gateway_key  # REQUIRED
\`\`\`

**Supported Providers via Gateway:**
- xAI (Grok models)
- OpenAI (GPT-4, GPT-3.5, etc.)
- Anthropic (Claude 3.5 Sonnet, Claude 3 Haiku, etc.)
- Google (Gemini models)
- Meta (Llama models)
- Cohere
- Mistral AI
- Perplexity
- And 90+ more models

**Model Usage Example:**
\`\`\`typescript
// No provider packages needed - just pass model string
const response = await generateText({
  model: "openai/gpt-4.1",           // OpenAI
  model: "anthropic/claude-3-5-sonnet", // Anthropic
  model: "xai/grok-2",             // xAI
  prompt: "Your prompt here"
});
\`\`\`

### Additional AI Providers (Optional)

Only needed if you want direct API access outside the gateway:

\`\`\`bash
# Together AI (Alternative provider)
TOGETHER_API_KEY=your_together_api_key  # OPTIONAL - Direct Together.ai access

# xAI (Grok) Direct Access
XAI_API_KEY=your_xai_api_key           # OPTIONAL - Direct xAI access

# OpenAI Direct Access
OPENAI_API_KEY=sk-...                  # OPTIONAL - Direct OpenAI access

# Anthropic Direct Access
ANTHROPIC_API_KEY=sk-ant-...           # OPTIONAL - Direct Anthropic access
\`\`\`

---

## Database Variables

### Convex (Primary Database)

\`\`\`bash
# Convex Configuration
CONVEX_DEPLOYMENT=prod:your-deployment-name     # REQUIRED - Deployment name
NEXT_PUBLIC_CONVEX_URL=https://....convex.cloud # REQUIRED - Public API URL
CONVEX_DEPLOY_KEY=your_deploy_key               # REQUIRED (CI/CD only) - For automated deployments
\`\`\`

**Convex Environments:**
- **Development**: `dev:your-deployment` (local development)
- **Preview**: `preview:your-deployment` (PR previews)
- **Production**: `prod:your-deployment` (production)

---

## Authentication Variables

### Clerk (Primary Auth Provider)

\`\`\`bash
# Public Keys (Client-side safe)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...  # REQUIRED

# Secret Keys (Server-only - NEVER expose to client)
CLERK_SECRET_KEY=sk_test_...                   # REQUIRED

# Webhook Secret (for Clerk webhooks)
CLERK_WEBHOOK_SECRET=whsec_...                 # REQUIRED (production)

# JWT Configuration (Required for Convex)
CLERK_JWT_ISSUER_DOMAIN=https://your-clerk-domain.clerk.accounts.dev # REQUIRED - From Clerk Dashboard -> API Keys -> Issuer URL

# Clerk URL Configuration
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Optional: Custom Clerk URLs
NEXT_PUBLIC_CLERK_DOMAIN=clerk.yourdomain.com  # OPTIONAL - Custom domain
\`\`\`

---

## Payment Variables

### Polar (Payment Processing)

\`\`\`bash
# Polar Configuration
POLAR_ACCESS_TOKEN=polar_at_...                # REQUIRED - Polar API access token
NEXT_PUBLIC_POLAR_ORGANIZATION_ID=org_...      # REQUIRED - Your Polar organization ID

# Polar Webhook
POLAR_WEBHOOK_SECRET=whsec_...                 # REQUIRED - For webhook verification

# Polar Environment
POLAR_ENVIRONMENT=sandbox                       # development: sandbox, production: live
\`\`\`

**Polar Plans & Products:**
- Free Plan: `prod_free_...`
- Pro Plan: `prod_pro_...`
- Enterprise Plan: `prod_enterprise_...`

---

## Optional Variables

### Analytics & Monitoring

\`\`\`bash
# Vercel Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id  # OPTIONAL

# PostHog (Product Analytics)
NEXT_PUBLIC_POSTHOG_KEY=phc_...                    # OPTIONAL
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com   # OPTIONAL

# Sentry (Error Tracking)
SENTRY_DSN=https://...@sentry.io/...               # OPTIONAL
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...   # OPTIONAL
\`\`\`

### Email Services

\`\`\`bash
# Resend (Email Service)
RESEND_API_KEY=re_...                              # OPTIONAL - For transactional emails
RESEND_FROM_EMAIL=noreply@yourdomain.com           # OPTIONAL
\`\`\`

### Storage

\`\`\`bash
# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=vercel_blob_...              # OPTIONAL - For file uploads
\`\`\`

### Feature Flags

\`\`\`bash
# Feature Flags
NEXT_PUBLIC_ENABLE_COMPARE_MODE=true               # OPTIONAL - Enable Compare Mode
NEXT_PUBLIC_ENABLE_MEMORY=true                     # OPTIONAL - Enable Memory feature
NEXT_PUBLIC_ENABLE_ARTIFACTS=true                  # OPTIONAL - Enable Artifacts
NEXT_PUBLIC_ENABLE_BILLING=true                    # OPTIONAL - Enable billing features
\`\`\`

---

## Environment-Specific Configuration

### Local Development (.env.local)

\`\`\`bash
# Minimal setup for local development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# AI Gateway (Required)
AI_GATEWAY_API_KEY=your_vercel_ai_gateway_key

# Convex (Development)
CONVEX_DEPLOYMENT=dev:your-deployment
NEXT_PUBLIC_CONVEX_URL=https://your-dev.convex.cloud

# Clerk (Test mode)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Polar (Sandbox)
POLAR_ACCESS_TOKEN=polar_at_sandbox...
NEXT_PUBLIC_POLAR_ORGANIZATION_ID=org_...
POLAR_ENVIRONMENT=sandbox

# Feature Flags (Enable all for development)
NEXT_PUBLIC_ENABLE_COMPARE_MODE=true
NEXT_PUBLIC_ENABLE_MEMORY=true
NEXT_PUBLIC_ENABLE_ARTIFACTS=true
NEXT_PUBLIC_ENABLE_BILLING=true
\`\`\`

### Preview/Staging (.env.preview)

\`\`\`bash
# Preview deployments (Vercel PRs)
NEXT_PUBLIC_APP_URL=https://your-pr-123.vercel.app
NODE_ENV=production

# Use production Convex but separate deployment
CONVEX_DEPLOYMENT=preview:your-deployment
NEXT_PUBLIC_CONVEX_URL=https://your-preview.convex.cloud

# Clerk test mode
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Polar sandbox
POLAR_ENVIRONMENT=sandbox
\`\`\`

### Production (.env.production)

\`\`\`bash
# Production configuration
NEXT_PUBLIC_APP_URL=https://anydebate.ai
NODE_ENV=production

# AI Gateway (Production)
AI_GATEWAY_API_KEY=your_production_ai_gateway_key

# Convex (Production)
CONVEX_DEPLOYMENT=prod:your-deployment
NEXT_PUBLIC_CONVEX_URL=https://your-prod.convex.cloud
CONVEX_DEPLOY_KEY=your_deploy_key

# Clerk (Production mode)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
CLERK_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Polar (Live)
POLAR_ACCESS_TOKEN=polar_at_live...
NEXT_PUBLIC_POLAR_ORGANIZATION_ID=org_...
POLAR_WEBHOOK_SECRET=whsec_...
POLAR_ENVIRONMENT=live

# Analytics (Production only)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id
SENTRY_DSN=https://...@sentry.io/...
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...

# Feature Flags
NEXT_PUBLIC_ENABLE_COMPARE_MODE=true
NEXT_PUBLIC_ENABLE_MEMORY=false  # Not ready yet
NEXT_PUBLIC_ENABLE_ARTIFACTS=true
NEXT_PUBLIC_ENABLE_BILLING=true
\`\`\`

---

## Security Best Practices

### 1. Never Commit Secrets

\`\`\`bash
# ✅ ALWAYS add to .gitignore
.env
.env.local
.env.production
.env.development
.env.test
\`\`\`

### 2. Use Environment-Specific Keys

- **Development**: Use test/sandbox keys
- **Production**: Use live keys with proper permissions

### 3. Prefix Client-Safe Variables

Only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser:

\`\`\`bash
# ✅ Safe for client
NEXT_PUBLIC_APP_URL=https://anydebate.ai

# ❌ NEVER expose server secrets
CLERK_SECRET_KEY=sk_...              # Server-only
AI_GATEWAY_API_KEY=...               # Server-only
POLAR_ACCESS_TOKEN=...               # Server-only
\`\`\`

### 4. Rotate Keys Regularly

- Rotate API keys every 90 days
- Immediately rotate if compromised
- Use key rotation tools when available

### 5. Validate Environment Variables on Startup

\`\`\`typescript
// lib/env.ts - Validate required variables
const requiredEnvVars = [
  'NEXT_PUBLIC_CONVEX_URL',
  'CONVEX_DEPLOYMENT',
  'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
  'CLERK_SECRET_KEY',
  'AI_GATEWAY_API_KEY',
] as const;

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});
\`\`\`

---

## Troubleshooting

### Common Issues

**1. "NEXT_PUBLIC_ variables not updating"**
- Restart dev server after changing `NEXT_PUBLIC_` variables
- Clear `.next` cache: `rm -rf .next`

**2. "Convex connection failed"**
- Verify `NEXT_PUBLIC_CONVEX_URL` is correct
- Check deployment status: `npx convex dev`

**3. "Clerk authentication not working"**
- Ensure all Clerk URLs are set
- Check webhook configuration in Clerk dashboard

**4. "AI Gateway rate limits"**
- Check your gateway quota in Vercel dashboard
- Consider implementing request queuing

**5. "Database writes failing"**
- Verify `CONVEX_DEPLOY_KEY` has write permissions
- Check Convex dashboard for errors

---

## References

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Convex Environment Variables](https://docs.convex.dev/production/hosting/environment-variables)
- [Clerk Environment Variables](https://clerk.com/docs/deployments/set-environment-variables)
- [Vercel AI SDK Documentation](https://sdk.vercel.ai/docs)

---

## Appendix: .env.example Template

\`\`\`bash
# ============================================
# AnyDebateAI Environment Variables
# ============================================

# -----------------
# Core Application
# -----------------
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# -----------------
# AI Gateway (Required)
# -----------------
AI_GATEWAY_API_KEY=your_vercel_ai_gateway_key

# -----------------
# Database (Convex)
# -----------------
CONVEX_DEPLOYMENT=dev:your-deployment
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud

# -----------------
# Authentication (Clerk)
# -----------------
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...
CLERK_JWT_ISSUER_DOMAIN=https://your-clerk-domain.clerk.accounts.dev
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# -----------------
# Payments (Polar)
# -----------------
POLAR_ACCESS_TOKEN=polar_at_...
NEXT_PUBLIC_POLAR_ORGANIZATION_ID=org_...
POLAR_ENVIRONMENT=sandbox

# -----------------
# Optional: Additional AI Providers
# -----------------
# TOGETHER_API_KEY=your_together_api_key
# XAI_API_KEY=your_xai_api_key
# OPENAI_API_KEY=sk-...
# ANTHROPIC_API_KEY=sk-ant-...

# -----------------
# Optional: Analytics & Monitoring
# -----------------
# NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id
# SENTRY_DSN=https://...@sentry.io/...
# NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...

# -----------------
# Optional: Email
# -----------------
# RESEND_API_KEY=re_...
# RESEND_FROM_EMAIL=noreply@yourdomain.com

# -----------------
# Optional: Storage
# -----------------
# BLOB_READ_WRITE_TOKEN=vercel_blob_...

# -----------------
# Feature Flags
# -----------------
NEXT_PUBLIC_ENABLE_COMPARE_MODE=true
NEXT_PUBLIC_ENABLE_MEMORY=true
NEXT_PUBLIC_ENABLE_ARTIFACTS=true
NEXT_PUBLIC_ENABLE_BILLING=true

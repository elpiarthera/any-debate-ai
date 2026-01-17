# AnyDebateAI - MVP Sprint Plan

**Status**: Ready to Execute  
**Focus**: Compare Mode MVP  
**Timeline**: 28-36 hours (Hackathon Sprint)  
**Current State**: UI/UX Complete, Backend Not Started

---

## Sprint List - Quick Reference

| Phase | Focus | Hours | Status | Critical Docs |
|-------|-------|-------|--------|---------------|
| **Phase 0** | UI Completion | 10-12h | **Complete** | `AGENT_BUILDER_FIX_REQUIRED.md`<br>`missing-ui-implementation-plan.md`<br>`UI_UX_SPRINT_PLAN.md` |
| **Phase 1** | Environment Setup | 2h | **In Progress** | `environment-variables-setup.md`<br>`COMPARE_MODE_MVP_PLAN.md` |
| **Phase 2** | Database Implementation | 4-6h | **Complete** | `MVP/SPRINT_2_DATABASE_IMPLEMENTATION_PLAN.md`<br>`convex-database-schema.md`<br>`database-administration.md` |
| **Phase 3** | Authentication | 3-4h | **Next Up** | `MVP/SPRINT_3_AUTHENTICATION_PLAN.md`<br>`PHASE_5_USER_MANAGEMENT_PLAN.md`<br>`environment-variables-setup.md` |
| **Phase 4** | AI Integration | 4-6h | Not Started | `MVP/SPRINT_4_AI_INTEGRATION_PLAN.md`<br>`convex-database-schema.md` (Lines 1600-1800) |
| **Phase 5** | State Management | 2-3h | Not Started | `COMPARE_MODE_MVP_PLAN.md` (Phase 5) |
| **Phase 6** | Integration & Testing | 3-4h | Not Started | `testing-strategy.md`<br>`testing-button-links-plan.md` |
| **Phase 7** | Polish & Deploy | 2-3h | Not Started | `environment-variables-setup.md`<br>`database-administration.md` |
| **TOTAL** | **Complete MVP** | **28-36h** | **0% Complete** | **25 documents referenced** |

---

## 3-Day Execution Plan

### Day 1: Foundation (10-12 hours)
**Goal**: Complete UI + Setup Environment + Database

| Time | Task | Duration | Reference Docs |
|------|------|----------|----------------|
| 8:00 AM | Read agent builder issues | 30min | `AGENT_BUILDER_FIX_REQUIRED.md` |
| 8:30 AM | Fix agent builder UX (model selector, inline creation) | 2-3h | `missing-ui-implementation-plan.md` |
| 11:00 AM | Build missing AI SDK components | 4-6h | `UI_UX_SPRINT_PLAN.md` (Lines 2330-2697) |
| 3:00 PM | Install & configure environment | 1h | `environment-variables-setup.md` |
| 4:00 PM | Implement Convex schema | 3-4h | `convex-database-schema.md`<br>`PHASE_4_SCHEMA_VERIFICATION.md` |
| 7:00 PM | End of Day 1 | - | - |

### Day 2: Backend Integration (10-14 hours)
**Goal**: Authentication + AI Integration + State Management

| Time | Task | Duration | Reference Docs |
|------|------|----------|----------------|
| 8:00 AM | Configure Clerk auth | 3-4h | `PHASE_5_USER_MANAGEMENT_PLAN.md` |
| 12:00 PM | Create AI chat API route | 4-6h | `AI_SDK_TOOLS_ALIGNMENT_PLAN.md` |
| 5:00 PM | Implement Zustand stores | 2-3h | `COMPARE_MODE_MVP_PLAN.md` (Phase 5) |
| 8:00 PM | End of Day 2 | - | - |

### Day 3: Testing & Deployment (8-10 hours)
**Goal**: Connect Everything + Test + Deploy

| Time | Task | Duration | Reference Docs |
|------|------|----------|----------------|
| 8:00 AM | Connect UI to backend | 2h | `COMPARE_MODE_MVP_PLAN.md` (Phase 6) |
| 10:00 AM | Comprehensive testing (ALL buttons/links) | 4h | `testing-button-links-plan.md`<br>`testing-strategy.md` |
| 2:00 PM | Bug fixes | 2h | - |
| 4:00 PM | Deploy to Vercel | 1h | `environment-variables-setup.md` |
| 5:00 PM | Production smoke test | 1h | `testing-strategy.md` |
| 6:00 PM | MVP Complete! | - | - |

---

## Sprint Overview

This document serves as the central reference for implementing the AnyDebateAI MVP. All UI/UX components are built and ready. The focus is now on connecting the backend infrastructure to bring Compare Mode to life.

---

## What's Already Done

### UI/UX Components (100% Complete)
- Landing page with three modes showcase
- Dashboard with sidebar navigation
- Agent management interface (roles, personas, frameworks)
- Template library and management
- Compare Mode UI with round-by-round display
- Artifact rendering system (documents, tables, checklists, charts)
- Settings and preferences
- Billing and subscription UI
- Memory dashboard
- Mobile-responsive design across all pages
- **Compare Mode Input & Agent Selector**
- **Enhanced Loading & Error States**
- **Agent Builder with Model Selection**

**Reference**: All React components in `/components` and `/app` directories

---

## What Needs Implementation

### Phase 0: UI Completion (10-12 hours)
**Status**: **Complete**  
**Priority**: Critical

**Completed UI Components**:
1. Prompt Input Component (ComparePromptInput.tsx)
2. Agent Selector UI (CompareAgentSelector.tsx)
3. Loading States & Skeletons (CompareRoundView.tsx)
4. Error Handling UI (CompareErrorState.tsx)
5. Empty State Improvements (CompareMode.tsx)

**Critical References**:
- **`docs/implementation/Ongoing/AGENT_BUILDER_FIX_REQUIRED.md`** - AGENT BUILDER UX ISSUES
  - Missing model selection UI (add LLM model selector)
  - Missing inline module creation (create custom roles/personas/frameworks in-flow)
  - Poor modular composition UX (needs two-button approach: Browse Library vs Create New)
  - Missing sidebar on /agents/new page (already fixed)
  - **Estimated**: 2-3 hours to fix these issues
  - **Critical for**: Agent selector component in Compare Mode

- **`docs/implementation/ToDo/missing-ui-implementation-plan.md`** - COMPLETE UI GAP ANALYSIS
  - Status: 40% complete (18/45 tasks)
  - Phase 1-3: Complete (organization, billing, memory, settings)
  - Phase 4: NOT STARTED (testing & verification - 2 hours)
  - Detailed component-by-component status
  - Specific handlers that need wiring

- **`docs/implementation/ToDo/UI_UX_SPRINT_PLAN.md`** - AI SDK COMPONENT REQUIREMENTS
  - Model selector UI for 100+ models (Lines 2330-2350)
  - Workflow pattern indicators (Lines 2680-2697)
  - Parallel response display components
  - Debate round indicators
  - Orchestrator decision display
  - Agent configuration panel enhancements

**Reference**: `docs/implementation/Ongoing/COMPARE_MODE_MVP_PLAN.md` (Lines 1-400)

---

### Phase 1: Environment Setup (2 hours)
**Status**: **In Progress**  
**Priority**: Critical - Must be completed first

**Tasks**:
- [ ] Install Convex (`npm install convex`)
- [ ] Install Clerk (`npm install @clerk/nextjs`)
- [ ] Configure Vercel AI Gateway credentials
- [ ] Set up environment variables (development & production)
- [ ] Initialize Convex project (`npx convex dev`)
- [ ] Configure Clerk webhooks

**Documentation References**:
- `docs/guides/environment-variables-setup.md` - Complete env var reference
- `docs/implementation/Ongoing/COMPARE_MODE_MVP_PLAN.md` (Phase 1: Lines 400-500)

**Key Environment Variables**:
\`\`\`bash
# Vercel AI Gateway (handles 100+ models)
AI_GATEWAY_API_KEY=your_key_here

# Convex
CONVEX_DEPLOYMENT=your_deployment_url
NEXT_PUBLIC_CONVEX_URL=your_public_url

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
CLERK_WEBHOOK_SECRET=whsec_xxx
\`\`\`

---

### Phase 2: Database Implementation (4-6 hours)
**Status**: **Complete**  
**Priority**: Critical

**Tasks**:
- [x] Implement Convex schema (copy from docs)
- [x] Create indexes for query optimization
- [x] Set up database functions (queries, mutations)
- [x] Data Seeding (Roles, Personas, Frameworks)
- [ ] Implement real-time subscriptions
- [ ] Test database operations

**Schema Tables for MVP**:
1. `users` - User profiles and preferences
2. `sessions` - Debate/compare sessions
3. `messages` - Chat messages with AI responses
4. `agents` - Custom agent configurations
5. `agentTeamPresets` - Quick-start team presets

**Documentation References**:
- `docs/guides/convex-database-schema.md` - Complete schema (2400+ lines, 99.2% accurate)
- `docs/guides/database-administration.md` - Backup, recovery, optimization, monitoring
- **`docs/implementation/ToDo/PHASE_4_SCHEMA_VERIFICATION.md`** - SCHEMA GAP ANALYSIS
  - Identifies missing tables in PHASE_4 plan vs actual schema
  - Critical for ensuring complete implementation
- `docs/implementation/Ongoing/COMPARE_MODE_MVP_PLAN.md` (Phase 2: Lines 500-800)

**Critical Schema Sections**:
- Lines 1-400: Core tables overview
- Lines 800-1200: Agent configuration tables
- Lines 400-800: Sessions and messages

---

### Phase 3: Authentication Integration (3-4 hours)
**Status**: **Next Up**  
**Priority**: Critical

**Tasks**:
- [ ] Install and configure Clerk
- [ ] Implement auth middleware
- [ ] Create user profile sync with Convex
- [ ] Set up webhook handlers for user events
- [ ] Protect API routes
- [ ] Add sign-in/sign-up UI integration

**Documentation References**:
- `docs/guides/environment-variables-setup.md` (Lines 100-200: Clerk section)
- `docs/implementation/ToDo/PHASE_5_USER_MANAGEMENT_PLAN.md` - Complete auth strategy
- `docs/implementation/Ongoing/COMPARE_MODE_MVP_PLAN.md` (Phase 3: Lines 800-1000)

**Files to Create**:
\`\`\`typescript
middleware.ts - Auth protection
app/sign-in/[[...sign-in]]/page.tsx
app/sign-up/[[...sign-up]]/page.tsx
lib/auth/clerk-webhook-handler.ts
\`\`\`

---

### Phase 4: AI Integration (4-6 hours)
**Status**: Not Started  
**Priority**: Critical

**Tasks**:
- [ ] Configure Vercel AI SDK with AI Gateway
- [ ] Create chat API route (`/api/chat/compare`)
- [ ] Implement streaming responses
- [ ] Add multi-agent orchestration
- [ ] Handle response aggregation
- [ ] Error handling and retry logic

**Vercel AI Gateway Benefits**:
- Access to 100+ models (OpenAI, Anthropic, xAI/Grok, Google, Meta, Mistral, etc.)
- No need for individual provider packages
- Unified API interface
- Automatic failover and load balancing

**Documentation References**:
- `docs/guides/convex-database-schema.md` (Lines 1600-1800: AI model configuration)
- `docs/implementation/ToDo/MVP/SPRINT_4_AI_INTEGRATION_PLAN.md` - Complete AI SDK guide
- `docs/implementation/Ongoing/COMPARE_MODE_MVP_PLAN.md` (Phase 4: Lines 1000-1400)
- `user_read_only_context/integration_examples/ai_sdk/**` - AI SDK examples

**Key Implementation**:
\`\`\`typescript
// app/api/chat/compare/route.ts
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { prompt, agents } = await req.json();
  
  // Use AI Gateway - no provider packages needed
  const responses = await Promise.all(
    agents.map(agent => 
      streamText({
        model: agent.modelId, // e.g., "openai/gpt-4", "anthropic/claude-3-sonnet"
        prompt: `${agent.systemPrompt}\n\n${prompt}`
      })
    )
  );
  
  return responses;
}
\`\`\`

---

### Phase 5: State Management (2-3 hours)
**Status**: Not Started  
**Priority**: High

**Tasks**:
- [ ] Create Zustand stores for chat state
- [ ] Implement optimistic updates
- [ ] Add real-time sync with Convex
- [ ] Handle session persistence
- [ ] Manage agent selection state

**Documentation References**:
- `docs/implementation/Ongoing/COMPARE_MODE_MVP_PLAN.md` (Phase 5: Lines 1400-1600)

**Store Structure**:
\`\`\`typescript
// lib/stores/compare-store.ts
interface CompareStore {
  activeSession: Session | null;
  selectedAgents: Agent[];
  messages: Message[];
  isStreaming: boolean;
}
\`\`\`

---

### Phase 6: Integration & Testing (3-4 hours)
**Status**: Not Started  
**Priority**: High

**Tasks**:
- [ ] Connect UI components to backend
- [ ] Implement error boundaries
- [ ] Add loading states
- [ ] Test complete user flow
- [ ] Fix integration bugs
- [ ] Performance optimization

**Documentation References**:
- `docs/guides/testing-strategy.md` - Complete testing guide
- **`docs/implementation/ToDo/testing-button-links-plan.md`** - COMPREHENSIVE TESTING CHECKLIST
  - 200+ interactive elements to test
  - Page-by-page testing guide
  - Component-by-component verification
  - Mobile and desktop testing
  - Complete navigation map
  - 4 hours estimated for full testing
- `docs/implementation/Ongoing/COMPARE_MODE_MVP_PLAN.md` (Phase 6: Lines 1600-1800)

**Testing Checklist**:
- [ ] User can sign in/sign up
- [ ] User can select 2-4 agents
- [ ] User can send a prompt
- [ ] AI responses stream correctly
- [ ] Responses display side-by-side
- [ ] Session persists across refreshes
- [ ] Mobile experience works
- [ ] **ALL buttons work (use testing-button-links-plan.md)**
- [ ] **ALL links work (use testing-button-links-plan.md)**
- [ ] **ALL forms work (use testing-button-links-plan.md)**

---

### Phase 7: Polish & Deploy (2-3 hours)
**Status**: Not Started  
**Priority**: Medium

**Tasks**:
- [ ] Add analytics tracking
- [ ] Implement error logging (Sentry)
- [ ] Performance monitoring
- [ ] SEO optimization
- [ ] Deploy to Vercel
- [ ] Set up production environment variables
- [ ] Smoke test production

**Documentation References**:
- `docs/guides/environment-variables-setup.md` (Lines 400-600: Production setup)
- `docs/guides/database-administration.md` (Lines 600-800: Monitoring)

---

## "Coming Soon" Features (Not in MVP)

All features below will show "Coming Soon" placeholder UI:

### Debate Mode
- Two-agent structured debates
- Judge agent evaluation
- Turn-based argumentation

**Reference**: `docs/implementation/Done/chat-features-implementation-plan.md`

### Auto-Debate Mode
- AI-driven autonomous debates
- Background processing
- Configurable termination

**Reference**: `docs/implementation/Done/chat-features-implementation-plan.md`

### Artifacts System
- Real-time collaboration
- Version control
- Export functionality

**Reference**: `docs/guides/convex-database-schema.md` (Lines 1200-1400)

### Memory System
- Document upload and indexing
- RAG integration
- Memory scopes (personal, workspace, chat)

**Reference**: `docs/implementation/ToDo/PHASE_8_MEMORY_IMPLEMENTATION.md`

### Marketplace
- Template sharing
- Agent discovery
- Community features

**Reference**: `docs/implementation/ToDo/remaining-features.md` (Lines 1-200)

### Organization & Team Features
- Multi-user workspaces
- Role-based permissions
- Team collaboration

**Reference**: `docs/implementation/ToDo/PHASE_5_USER_MANAGEMENT_PLAN.md` (Lines 800-1200)

### Billing & Subscriptions
- Stripe integration (or Polar)
- Token purchase
- Usage tracking

**Reference**: `docs/implementation/ToDo/PHASE_7_POLAR_PAYMENTS_PLAN.md`

### Advanced Features (Phase 6)
**Reference**: `docs/implementation/ToDo/PHASE_6_ADVANCED_FEATURES_PLAN.md`

Advanced polish features that are NOT part of the MVP but are fully documented for future implementation:

#### Cloud Storage Integration (via Composio)
- Google Drive, Dropbox, OneDrive export
- Scheduled exports
- Batch export system
- Custom export templates

#### Community Marketplace
- Template sharing and discovery
- Rating and review system
- Template versioning
- Analytics for template creators

#### Custom Agent Training
- Upload training data
- Agent fine-tuning
- Performance benchmarking
- Agent collaboration

#### Enhanced Auto-Debate
- Artifact generation during debates
- Advanced moderation system
- Debate scoring and judging
- Multi-round tournaments
- External platform integrations

**Implementation Time**: 35-50 hours (5-7 days) - AFTER MVP completion

---

## Critical Documentation Index

### Implementation Plans
1. **`docs/implementation/Ongoing/COMPARE_MODE_MVP_PLAN.md`**  
   Primary sprint plan with hour estimates and detailed tasks

2. **`docs/implementation/Ongoing/AGENT_BUILDER_FIX_REQUIRED.md`** ⭐ CRITICAL FOR PHASE 0
   Agent builder UX fixes - 4 critical issues affecting agent selection and composition

3. **`docs/implementation/Ongoing/convex-schema-verification-report.md`**  
   Schema accuracy verification (99.2% match with UI)

4. **`docs/implementation/Done/chat-features-implementation-plan.md`**  
   Reference for Compare/Debate/Auto-Debate modes

5. **`docs/implementation/Done/user-dashboard-implementation-plan.md`**  
   Dashboard and navigation implementation

6. **`docs/implementation/ToDo/missing-ui-implementation-plan.md`** ⭐ CRITICAL FOR PHASE 0
   Complete UI gap analysis - 18/45 tasks done, Phase 4 testing not started

7. **`docs/implementation/ToDo/UI_UX_SPRINT_PLAN.md`** ⭐ CRITICAL FOR PHASE 0
   AI SDK component requirements for Compare Mode integration

8. **`docs/implementation/ToDo/PHASE_4_SCHEMA_VERIFICATION.md`**
   Schema gap analysis between PHASE_4 plan and actual schema

9. **`docs/implementation/ToDo/testing-button-links-plan.md`** ⭐ CRITICAL FOR PHASE 6
   Comprehensive testing checklist for ALL 200+ interactive elements

10. **`docs/implementation/ToDo/PHASE_6_ADVANCED_FEATURES_PLAN.md`**
    Advanced features (cloud storage, marketplace, tournaments) - POST-MVP

### Technical Guides
11. **`docs/guides/convex-database-schema.md`** (2400+ lines)  
    Complete database schema - production ready

12. **`docs/guides/environment-variables-setup.md`**  
    Complete env var reference for all integrations

13. **`docs/guides/testing-strategy.md`**  
    Testing approach, conventions, and checklist

14. **`docs/guides/database-administration.md`**  
    Backup, recovery, optimization, monitoring

15. **`docs/guides/mobile-first-best-practices.md`**  
    Mobile design patterns and responsive guidelines

16. **`docs/implementation/ToDo/AI_SDK_TOOLS_ALIGNMENT_PLAN.md`**  
    Vercel AI SDK and AI Gateway integration guide

### Feature Plans (Post-MVP)
17. **`docs/implementation/ToDo/PHASE_4_CONVEX_DATABASE_PLAN.md`**  
    Database implementation details

18. **`docs/implementation/ToDo/PHASE_5_USER_MANAGEMENT_PLAN.md`**  
    Auth, users, organizations

19. **`docs/implementation/ToDo/PHASE_7_POLAR_PAYMENTS_PLAN.md`**  
    Billing and subscriptions

20. **`docs/implementation/ToDo/PHASE_8_MEMORY_IMPLEMENTATION.md`**  
    RAG and memory system

21. **`docs/implementation/ToDo/remaining-features.md`**  
    All other planned features

### Architecture & Understanding
22. **`docs/TECHNICAL_DOCUMENTATION.md`**  
    System architecture overview

23. **`docs/API_DOCUMENTATION.md`**  
    API routes and endpoints

24. **`docs/understanding/ANYDEBATE_UNDERSTANDING.md`**  
    Product vision and concepts

25. **`README.md`**  
    Project overview and setup

---

## Emergency Contacts & Resources

**Documentation Issues**: Check this file first, then reference specific .md files above

**Convex Help**: 
- Schema: `docs/guides/convex-database-schema.md`
- Admin: `docs/guides/database-administration.md`

**AI Integration Help**:
- `docs/implementation/ToDo/AI_SDK_TOOLS_ALIGNMENT_PLAN.md`
- `user_read_only_context/integration_examples/ai_sdk/**`

**Testing Help**:
- `docs/guides/testing-strategy.md`

**Environment Setup Help**:
- `docs/guides/environment-variables-setup.md`

---

**Last Updated**: 2025-01-15  
**Next Review**: After MVP completion  
**Owner**: Development Team

# Compare Mode MVP - Implementation Plan

**Document Version**: 2.0  
**Created**: January 2025  
**Status**: Sprint Ready - Hackathon Mode  
**Target**: Minimum Viable Product - Compare Mode Only  
**Timeline**: 28-36 hours total

---

## 🎯 Executive Summary

This document outlines the implementation plan for delivering a **Minimum Viable Product (MVP)** focused exclusively on **Compare Mode** - the core feature that allows users to send a single prompt to multiple AI models simultaneously and compare their responses side-by-side.

**All other features will display "Coming Soon" placeholders** until Compare Mode is fully operational with real AI integration, Clerk authentication, and Convex database persistence.

**This is a SPRINT - we think in HOURS, not days or weeks. Hackathon pace.**

---

## 📊 Current Status - The Good News

### ✅ What's Already Complete (70-75%)

Based on reviewing the actual codebase, here's what exists:

**Frontend UI/UX (70% COMPLETE)**
- ✅ Compare Mode display (`components/chat/compare/CompareMode.tsx`) - 65 lines
  - ✅ Round management logic
  - ✅ Basic structure with ScrollArea
  - ❌ NO prompt input UI built-in
  - ❌ NO agent selector UI built-in
- ✅ Round-based comparison view (`components/chat/compare/CompareRoundView.tsx`) - 142 lines
  - ✅ Response cards with grid layout
  - ✅ Copy and reaction buttons
  - ✅ Streaming indicators
  - ✅ Responsive grid (1-4 agents)
- ✅ Type system and data structures (`lib/chat/modes.ts`) - 194 lines
- ✅ Mode selector component (`components/chat/ModeSelector.tsx`) - 77 lines
- ❌ Missing dedicated prompt input component
- ❌ Missing agent selection component for Compare Mode
- ❌ Missing proper loading states
- ❌ Missing error handling UI

**Landing Pages & Marketing (100% COMPLETE)**
- ✅ Public landing page (`app/page.tsx`)
- ✅ Pricing page (`app/pricing/page.tsx`)
- ✅ Feature showcase
- ✅ Mode descriptions (Compare, Debate, Auto-Debate)

**Advanced Features (100% COMPLETE but need to disable for MVP)**
- ✅ Message search (`components/chat/search/`)
- ✅ Reactions (`components/chat/reactions/`)
- ✅ Threading (`components/chat/threading/`)
- ✅ Bookmarks (`components/chat/bookmarks/`)
- ✅ Export functionality (`components/export/`)
- ✅ Comparison tools (`components/chat/comparison/`)

### ❌ What's Missing (25-30%)

**Frontend UI Components (10-12 hours)**
- ❌ Prompt input component with send button
- ❌ Agent selector for Compare Mode
- ❌ Proper loading states during streaming
- ❌ Error state UI and retry mechanisms
- ❌ Empty state improvements with sample prompts

**Backend Integration (4-5 hours)**
- ❌ Real AI API calls (currently simulated with setTimeout)
- ❌ Streaming response handling
- ❌ Error handling and retry logic
- ❌ Rate limiting and queue management

**Authentication (2-3 hours)**
- ❌ Clerk authentication setup
- ❌ User session management
- ❌ Protected routes
- ❌ User profile integration

**Database Persistence (3-4 hours)**
- ❌ Convex setup and configuration
- ❌ Sessions table and queries
- ❌ Messages table and queries
- ❌ Real-time subscriptions
- ❌ User-specific data isolation

**State Management (2-3 hours)**
- ❌ Centralized state store (Zustand)
- ❌ Session persistence
- ❌ Optimistic updates
- ❌ Cross-component state sharing

---

## 🏗️ MVP Scope Definition

### In Scope: Compare Mode Only

**Core User Flow**
1. User signs up/login via Clerk
2. User lands on `/debates` page in Compare Mode
3. User selects 2-4 AI models from model selector dropdown
4. User enters a prompt in input field at bottom
5. User clicks send button
6. System sends prompt to all selected models via Vercel AI Gateway
7. Responses stream back in real-time to UI
8. Responses display side-by-side in a "round"
9. User can copy individual responses
10. User can add reactions (like/dislike)
11. Session auto-saves to Convex database
12. User can view their session history in sidebar
13. User can click on a past session to restore it

**Supported AI Models (via Vercel AI Gateway)**

AnyDebateAI uses **Vercel AI Gateway** which provides access to **100+ models** from multiple providers. No individual provider packages needed - just pass the model string.

**Available Providers:**

**xAI (Grok):**
- `xai/grok-beta` - Latest Grok
- `xai/grok-vision-beta` - Vision support

**OpenAI:**
- `openai/gpt-4o` - Latest GPT-4 Omni
- `openai/gpt-4o-mini` - Faster, cheaper
- `openai/o1` - Reasoning model
- `openai/o1-mini` - Reasoning model (mini)

**Anthropic:**
- `anthropic/claude-3-5-sonnet-latest` - Latest Claude
- `anthropic/claude-3-5-haiku-latest` - Fastest
- `anthropic/claude-3-opus-latest` - Most capable

**Google:**
- `google/gemini-2.0-flash-exp` - Latest Gemini
- `google/gemini-1.5-pro-latest` - Pro version

**Meta:**
- `meta-llama/llama-3.3-70b-instruct` - Latest Llama

**Reference:**
- Full model list: `docs/implementation/ToDo/AI_SDK_TOOLS_ALIGNMENT_PLAN.md`
- Database schema: `docs/guides/convex-database-schema.md`

### Out of Scope: Coming Soon Features

**Other Modes**
- Debate Mode → "Coming Soon"
- Auto-Debate Mode → "Coming Soon"

**Advanced Features** (keep existing UI, just disable interaction)
- Message search → Show but mark "Coming Soon in full version"
- Bookmarks → Disable for MVP
- Export → Disable for MVP
- Session comparison → Disable for MVP

**Agent Management**
- Custom agent builder → "Coming Soon"
- Agent templates → "Coming Soon"
- Roles, Personas, Frameworks → "Coming Soon"

**Workspace Features**
- Organizations → Personal workspace only
- Team collaboration → "Coming Soon"
- Sharing → "Coming Soon"

**Memory System**
- Document uploads → "Coming Soon"
- Knowledge base → "Coming Soon"

---

## 🔧 Technical Implementation - Sprint Plan

### Phase 0: Complete Compare Mode UI (10-12 hours)

**Status**: Not started  
**Priority**: P0 - Blocking everything else  
**Effort**: 10-12 hours

We must finish the Compare Mode UI before backend integration.

#### Tasks

**0.1 Create Prompt Input Component (3-4 hours)**

File to create: `components/chat/compare/ComparePromptInput.tsx`

**Requirements:**
- Multi-line textarea with auto-resize
- Send button (disabled when empty or no agents selected)
- Character count display (max 2000 chars)
- Loading state during submission
- Mobile-optimized keyboard handling
- Submit on Cmd/Ctrl+Enter
- Clear button
- Placeholder text with hints

**UI Design:**
- Fixed to bottom of viewport (sticky)
- White background with shadow
- Rounded corners
- Send button with icon
- Character count in muted text
- Error message area below input

**Tasks:**
- [ ] Create component with textarea (1.5h)
- [ ] Add character validation and limit (0.5h)
- [ ] Add keyboard shortcuts (0.5h)
- [ ] Style for mobile and desktop (1h)
- [ ] Add loading and disabled states (0.5h)

**0.2 Create Agent Selector Component (3-4 hours)**

File to create: `components/chat/compare/CompareAgentSelector.tsx`

**Requirements:**
- Dropdown or modal to select AI models
- Support selecting 2-4 models (validation)
- Show model names with icons
- Group by provider (OpenAI, Anthropic, etc.)
- Show selected models as chips/badges
- Clear all button
- Model search/filter

**UI Design:**
- Chips showing selected models above input
- Click chip to remove model
- "Add model" button opens selector
- Selector shows all available models grouped
- Checkbox or toggle for each model
- Min 2, max 4 validation with message

**Tasks:**
- [ ] Create dropdown/modal UI (1.5h)
- [ ] Add model list with grouping (1h)
- [ ] Add selection logic with validation (1h)
- [ ] Style chips/badges (0.5h)
- [ ] Mobile optimization (1h)

**0.3 Add Loading States (1-2 hours)**

Files to modify:
- `components/chat/compare/CompareRoundView.tsx`

**Requirements:**
- Skeleton loaders for response cards while waiting
- Progressive reveal as responses arrive
- Better streaming indicators (animated dots)
- Loading state for entire round

**Tasks:**
- [ ] Create skeleton card component (0.5h)
- [ ] Add to CompareRoundView (0.5h)
- [ ] Improve streaming indicators (0.5h)
- [ ] Test animations (0.5h)

**0.4 Add Error Handling UI (2-3 hours)**

File to create: `components/chat/compare/CompareErrorState.tsx`

Files to modify:
- `components/chat/compare/CompareRoundView.tsx`
- `components/chat/compare/CompareMode.tsx`

**Requirements:**
- Error card when model fails
- Retry button
- Error message display
- Failed model indication
- Network error banner
- Rate limit error with retry timer

**UI Design:**
- Error card replaces response card
- Red border or background
- Error icon
- Error message
- "Retry" button
- "Remove model" button

**Tasks:**
- [ ] Create error state component (1h)
- [ ] Add to round view (0.5h)
- [ ] Add retry logic (1h)
- [ ] Add error banners (0.5h)

**0.5 Improve Empty State (1 hour)**

File to modify: `components/chat/compare/CompareMode.tsx`

**Requirements:**
- Better onboarding instructions
- Sample prompts user can click
- Visual guide to select agents
- Call-to-action buttons

**Tasks:**
- [ ] Design better empty state (0.5h)
- [ ] Add sample prompts (0.5h)

**0.6 Integration Testing (1 hour)**

Connect all UI pieces together:
- [ ] CompareMode imports and uses ComparePromptInput
- [ ] CompareMode imports and uses CompareAgentSelector
- [ ] Test user can select agents
- [ ] Test user can type prompt
- [ ] Test send button enables/disables
- [ ] Test character limit
- [ ] Test mobile layout
- [ ] Test loading states
- [ ] Test error states

**Success Criteria:**
- ✅ User can select 2-4 models from UI
- ✅ User can type prompt in input field
- ✅ Send button enables when valid
- ✅ Character limit enforced
- ✅ Loading states show during "streaming"
- ✅ Error states display properly
- ✅ Mobile responsive
- ✅ All UI polish complete

---

### Phase 1: Authentication with Clerk (2-3 hours)

**Status**: Not started  
**Priority**: P0 - Blocking  
**Effort**: 2-3 hours

#### Tasks

**1.1 Install Clerk (15 min)**
\`\`\`bash
npm install @clerk/nextjs
\`\`\`

**1.2 Configure Environment (15 min)**
- Create Clerk account at clerk.com
- Create new application
- Copy keys to `.env.local`:
\`\`\`
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/debates
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/debates
\`\`\`

**1.3 Add Clerk Provider (30 min)**

Files to modify:
- `app/layout.tsx` - Wrap with ClerkProvider
- `middleware.ts` - Create auth middleware

**1.4 Create Auth Pages (45 min)**

Files to create:
- `app/sign-in/[[...sign-in]]/page.tsx`
- `app/sign-up/[[...sign-up]]/page.tsx`

**1.5 Update Navbar (30 min)**
- Add `UserButton` component
- Show user profile
- Add sign-out

**Success Criteria:**
- ✅ Users can sign up with email
- ✅ Protected routes redirect to /sign-in
- ✅ User profile shows in navbar
- ✅ Sign out works

---

### Phase 2: Database Setup with Convex (3-4 hours)

**Status**: Not started  
**Priority**: P0 - Blocking  
**Effort**: 3-4 hours

#### Tasks

**2.1 Install Convex (15 min)**
\`\`\`bash
npm install convex
npx convex dev
\`\`\`

**2.2 Configure Convex (30 min)**
- Create account at convex.dev
- Initialize project
- Copy deployment URL to `.env.local`:
\`\`\`
NEXT_PUBLIC_CONVEX_URL=https://...convex.cloud
CONVEX_DEPLOYMENT=...
\`\`\`

**2.3 Define Schema (60 min)**

File to create: `convex/schema.ts`

Refer to `docs/guides/convex-database-schema.md` for full schema.

Key tables:
- `sessions` - Chat sessions with mode, agents, status
- `messages` - Individual messages with role, content, metadata
- `users` - User profiles (synced from Clerk)

**2.4 Create Convex Functions (90 min)**

Files to create:
- `convex/sessions.ts` - CRUD for sessions
- `convex/messages.ts` - CRUD for messages  
- `convex/users.ts` - User sync from Clerk

Key functions:
- `sessions.create()`
- `sessions.getUserSessions()`
- `sessions.getById()`
- `messages.create()`
- `messages.getSessionMessages()`
- `messages.update()` (for reactions)

**2.5 Add Convex Provider (30 min)**

File to modify: `app/layout.tsx`

Add `ConvexClientProvider` wrapping children.

**Success Criteria:**
- ✅ Convex dev server runs
- ✅ Schema deployed successfully
- ✅ Can create session from Convex dashboard
- ✅ Real-time subscriptions work

---

### Phase 3: AI Integration with Vercel AI Gateway (4-5 hours)

**Status**: Not started  
**Priority**: P0 - Blocking  
**Effort**: 4-5 hours

This is the CORE of the MVP.

#### Tasks

**3.1 Install AI SDK (10 min)**
\`\`\`bash
npm install ai
\`\`\`

Environment already has:
- `AI_GATEWAY_API_KEY` ✅

**3.2 Create Compare API Route (120 min)**

File to create: `app/api/chat/compare/route.ts`

This route:
- Accepts prompt + array of model IDs
- Authenticates via Clerk
- Sends prompt to all models in parallel via AI Gateway
- Streams responses back
- Returns SSE stream

**3.3 Create Streaming Utility (90 min)**

File to create: `lib/ai/streaming.ts`

Functions:
- `createCompareStream()` - Handle single model stream
- `mergeStreams()` - Combine multiple model streams
- `handleStreamError()` - Error recovery

**3.4 Update CompareMode Component (60 min)**

File to modify: `components/chat/compare/CompareMode.tsx`

Changes:
- Remove `setTimeout` simulation
- Connect ComparePromptInput to real API
- Call API route: `POST /api/chat/compare`
- Handle SSE stream from server
- Update CompareRoundView as chunks arrive
- Handle errors gracefully
- Show loading states
- Show error states

**3.5 Test with Real Models (30 min)**

Test matrix:
- 2 models simultaneously
- 4 models simultaneously  
- Long responses (streaming)
- Error handling (invalid model, rate limit)
- Mobile + desktop

**Success Criteria:**
- ✅ Prompt sent to multiple models
- ✅ Responses stream in real-time
- ✅ Each model's response updates independently
- ✅ Errors handled gracefully
- ✅ No memory leaks with streams

---

### Phase 4: State Management with Zustand (2-3 hours)

**Status**: Not started  
**Priority**: P1 - Important  
**Effort**: 2-3 hours

#### Tasks

**4.1 Install Zustand (5 min)**
\`\`\`bash
npm install zustand
\`\`\`

**4.2 Create Chat Store (90 min)**

File to create: `lib/stores/chat-store.ts`

State structure:
\`\`\`typescript
{
  currentSessionId: string | null
  currentRound: number
  rounds: CompareRound[]
  selectedModels: string[]
  isStreaming: boolean
}
\`\`\`

Actions:
- `setCurrentSession()`
- `addRound()`
- `updateRoundResponse()` (for streaming chunks)
- `setSelectedModels()`
- `resetSession()`

Add persistence with `persist` middleware.

**4.3 Connect Components to Store (60 min)**

Files to modify:
- `app/debates/page.tsx` - Use store instead of local state
- `components/chat/compare/CompareMode.tsx` - Read from store
- `components/chat/compare/CompareRoundView.tsx` - Read from store

**4.4 Integrate with Convex (30 min)**

When round completes:
- Save user message to Convex
- Save all AI responses to Convex
- Update session metadata (message count, tokens)

**Success Criteria:**
- ✅ State persists across page refresh
- ✅ Multiple components share state
- ✅ No prop drilling
- ✅ Sessions save to database automatically

---

### Phase 5: Frontend Integration (3-4 hours)

**Status**: Not started  
**Priority**: P1 - Important  
**Effort**: 3-4 hours

Connect all the pieces.

#### Tasks

**5.1 Update Main Debates Page (120 min)**

File to modify: `app/debates/page.tsx`

Changes:
- Add Clerk auth check
- Load user sessions from Convex
- Display session history in sidebar
- Handle session selection
- Wire up message sending: UI → API → Convex → Zustand
- Show loading states
- Show error states

**5.2 Wire Copy & Reactions (60 min)**

Files to modify:
- `components/chat/compare/CompareRoundView.tsx`

Changes:
- Copy button saves to clipboard + shows toast
- Reaction buttons call Convex mutation to update message
- Reaction counts update in real-time via subscription

**5.3 Session History Sidebar (60 min)**

Either create new component or modify:
- `components/chat/ChatSidebar.tsx`

Features:
- List user's past sessions
- Show title + date + message count
- Click to load session
- Show current session highlighted
- "New chat" button

**5.4 Responsive Polish (30 min)**

- Test on iPhone SE, iPhone Pro Max, iPad, Desktop
- Fix any layout issues
- Ensure touch targets are 44px minimum
- Test streaming on slow 3G

**Success Criteria:**
- ✅ Complete user flow works end-to-end
- ✅ Sessions load from database
- ✅ New messages save automatically
- ✅ Copy and reactions work
- ✅ Mobile experience is smooth

---

### Phase 6: "Coming Soon" Placeholders (1-2 hours)

**Status**: Not started  
**Priority**: P2 - Nice to have  
**Effort**: 1-2 hours

#### Tasks

**6.1 Create ComingSoon Component (30 min)**

File to create: `components/ui/coming-soon.tsx`

Reusable component with:
- Lock icon
- Feature name
- Description
- "Coming Soon" badge
- Optional estimated date

**6.2 Update Mode Selector (15 min)**

File to modify: `components/chat/ModeSelector.tsx`

Changes:
- Keep visual design
- Add `disabled` prop to Debate and Auto-Debate
- Add "Coming Soon" tooltip
- Prevent clicking

**6.3 Add Placeholders to Disabled Pages (45 min)**

Files to modify:
- `app/agents/page.tsx`
- `app/agents/roles/page.tsx`
- `app/agents/personas/page.tsx`
- `app/agents/frameworks/page.tsx`
- `app/templates/page.tsx`
- `app/dashboard/memory/page.tsx`

Replace content with `<ComingSoon />` component.

**6.4 Disable Advanced Features (30 min)**

In Compare Mode UI, hide or disable:
- Export button → Show tooltip "Coming in full version"
- Bookmark button → Show tooltip "Coming in full version"  
- Search → Keep visible but add banner "Full search coming soon"

**Success Criteria:**
- ✅ Users understand what's available vs coming
- ✅ No confusion about disabled features
- ✅ Professional appearance
- ✅ Clear call-to-action for feedback

---

### Phase 7: Testing & Polish (2-3 hours)

**Status**: Not started  
**Priority**: P0 - Blocking launch  
**Effort**: 2-3 hours

#### Tasks

**7.1 End-to-End Testing (90 min)**

Test scenarios:
- [ ] New user signup flow
- [ ] Select 2 models, send prompt, see responses
- [ ] Select 4 models, send prompt, see responses
- [ ] Send multiple prompts in same session
- [ ] Copy a response
- [ ] Add reaction to response
- [ ] Close browser, reopen, session still there
- [ ] Sign out, sign in, sessions still there
- [ ] Click on past session, loads correctly
- [ ] Start new session
- [ ] Long response (>1000 tokens) streams correctly
- [ ] Error handling: invalid model
- [ ] Error handling: network failure
- [ ] Error handling: rate limit exceeded

**7.2 Performance Optimization (45 min)**

Check:
- [ ] Time to first byte < 200ms
- [ ] Streaming starts within 1 second
- [ ] No layout shift during streaming
- [ ] No memory leaks (test with 10+ messages)
- [ ] Database queries are fast (< 100ms)
- [ ] No unnecessary re-renders

**7.3 UI Polish (45 min)**

Fix:
- [ ] Alignment issues
- [ ] Spacing inconsistencies
- [ ] Color contrast (WCAG AA)
- [ ] Loading states
- [ ] Empty states
- [ ] Error messages
- [ ] Button hover states
- [ ] Focus indicators for accessibility

**Success Criteria:**
- ✅ Zero critical bugs
- ✅ All core flows work perfectly
- ✅ Performance is smooth
- ✅ UI is polished
- ✅ Ready to show users

---

### Phase 8: Deployment (1 hour)

**Status**: Not started  
**Priority**: P0 - Launch  
**Effort**: 1 hour

#### Tasks

**8.1 Production Environment Setup (20 min)**

- Create production Clerk app
- Create production Convex deployment
- Add production API keys to Vercel
- Configure domains

**8.2 Deploy to Vercel (20 min)**

\`\`\`bash
git push origin main
# Vercel auto-deploys
\`\`\`

Or manual:
\`\`\`bash
vercel --prod
\`\`\`

**8.3 Smoke Test Production (15 min)**

- [ ] Visit production URL
- [ ] Sign up with new account
- [ ] Send test prompt
- [ ] Verify responses stream
- [ ] Check Convex dashboard for data
- [ ] Test on real mobile device

**8.4 Monitor for Errors (5 min)**

- Set up Vercel Analytics
- Set up Sentry (optional)
- Watch for console errors
- Monitor Convex logs

**Success Criteria:**
- ✅ App is live on custom domain
- ✅ All features work in production
- ✅ No errors in logs
- ✅ Performance is good

---

## 📋 Implementation Checklist

### Phase 0: Complete Compare Mode UI (10-12 hours) ✅

- [ ] Create ComparePromptInput.tsx (3-4h)
  - [ ] Textarea with auto-resize
  - [ ] Character limit validation
  - [ ] Send button with states
  - [ ] Keyboard shortcuts
  - [ ] Mobile optimization
- [ ] Create CompareAgentSelector.tsx (3-4h)
  - [ ] Model dropdown/modal
  - [ ] Selection validation (2-4 models)
  - [ ] Selected model chips
  - [ ] Provider grouping
  - [ ] Search/filter
- [ ] Add loading states (1-2h)
  - [ ] Skeleton loaders
  - [ ] Streaming indicators
- [ ] Add error handling UI (2-3h)
  - [ ] Error state component
  - [ ] Retry buttons
  - [ ] Error messages
- [ ] Improve empty state (1h)
  - [ ] Better onboarding
  - [ ] Sample prompts
- [ ] Integration testing (1h)
  - [ ] All UI pieces connect
  - [ ] Mobile testing

### Phase 1: Authentication (2-3 hours) ✅

- [ ] Install @clerk/nextjs
- [ ] Create Clerk app and copy keys
- [ ] Add env vars to .env.local
- [ ] Create middleware.ts
- [ ] Add ClerkProvider to app/layout.tsx
- [ ] Create app/sign-in/[[...sign-in]]/page.tsx
- [ ] Create app/sign-up/[[...sign-up]]/page.tsx
- [ ] Update navbar with UserButton
- [ ] Test auth flow

### Phase 2: Database (3-4 hours) ✅

- [ ] Install convex
- [ ] Run npx convex dev
- [ ] Create convex/schema.ts
- [ ] Create convex/sessions.ts
- [ ] Create convex/messages.ts
- [ ] Add ConvexClientProvider
- [ ] Test queries in dashboard
- [ ] Verify real-time subscriptions

### Phase 3: AI Integration (4-5 hours) ✅

- [ ] Install ai package
- [ ] Create app/api/chat/compare/route.ts
- [ ] Create lib/ai/streaming.ts
- [ ] Update CompareMode.tsx with real API calls
- [ ] Remove setTimeout mocks
- [ ] Handle streaming responses
- [ ] Add error handling
- [ ] Test with 2 models
- [ ] Test with 4 models
- [ ] Test error scenarios

### Phase 4: State Management (2-3 hours) ✅

- [ ] Install zustand
- [ ] Create lib/stores/chat-store.ts
- [ ] Define state structure
- [ ] Add persistence
- [ ] Connect app/debates/page.tsx
- [ ] Connect CompareMode.tsx
- [ ] Test state persistence
- [ ] Integrate with Convex saves

### Phase 5: Frontend Integration (3-4 hours) ✅

- [ ] Update app/debates/page.tsx with full flow
- [ ] Ensure CompareMode has ComparePromptInput
- [ ] Ensure CompareAgentSelector is visible
- [ ] Add Clerk auth check
- [ ] Load user sessions from Convex
- [ ] Display session history in sidebar
- [ ] Handle session selection
- [ ] Wire up message sending: UI → API → Convex → Zustand
- [ ] Show loading states
- [ ] Show error states

### Phase 6: Coming Soon Placeholders (1-2 hours) ✅

- [ ] Create components/ui/coming-soon.tsx
- [ ] Disable Debate mode in selector
- [ ] Disable Auto-Debate mode in selector
- [ ] Add placeholder to /agents
- [ ] Add placeholder to /templates
- [ ] Add placeholder to /dashboard/memory
- [ ] Disable export in CompareMode
- [ ] Disable bookmarks in CompareMode

### Phase 7: Testing (2-3 hours) ✅

- [ ] Run full E2E test suite
- [ ] Fix all bugs found
- [ ] Test performance
- [ ] Optimize slow queries
- [ ] Polish UI issues
- [ ] Test accessibility
- [ ] Test on real mobile devices

### Phase 8: Deploy (1 hour) ✅

- [ ] Create production Clerk app
- [ ] Create production Convex deployment
- [ ] Add prod env vars to Vercel
- [ ] Deploy to production
- [ ] Smoke test production
- [ ] Monitor for errors

---

## 📅 Timeline - HACKATHON SPRINT

**Total Time: 28-36 hours** (updated from 18-24)

This is a SPRINT. We move FAST.

| Phase | Hours | When |
|-------|-------|------|
| 0. Complete Compare UI | 10-12h | Hour 0-12 |
| 1. Authentication (Clerk) | 2-3h | Hour 12-15 |
| 2. Database (Convex) | 3-4h | Hour 15-19 |
| 3. AI Integration | 4-5h | Hour 19-24 |
| 4. State Management | 2-3h | Hour 24-27 |
| 5. Frontend Integration | 3-4h | Hour 27-31 |
| 6. Coming Soon Placeholders | 1-2h | Hour 31-33 |
| 7. Testing & Polish | 2-3h | Hour 33-36 |
| 8. Deployment | 1h | Hour 36 |

**Recommended Schedule:**

**Day 1 (12 hours) - UI COMPLETION**
- 9am-12pm: Phase 0.1-0.2 (Input + Agent Selector)
- 12pm-1pm: Lunch
- 1pm-4pm: Phase 0.3-0.5 (Loading, Errors, Empty State)
- 4pm-5pm: Phase 0.6 (Integration Testing)
- 5pm-9pm: Phase 1 (Auth) + Phase 2 (Database)

**Day 2 (12 hours) - BACKEND INTEGRATION**
- 9am-2pm: Phase 3 (AI Integration)
- 2pm-3pm: Lunch
- 3pm-6pm: Phase 4 (State Management)
- 6pm-9pm: Phase 5 (Frontend Integration)

**Day 3 (12 hours) - POLISH & LAUNCH**
- 9am-11am: Phase 6 (Coming Soon)
- 11am-2pm: Phase 7 (Testing)
- 2pm-3pm: Lunch
- 3pm-4pm: Phase 8 (Deploy)
- 4pm: LAUNCH 🚀

---

## 🎯 Post-MVP Roadmap

**Not in this sprint, but next:**

### Week 2: Debate Mode (24-32 hours)
- Enable Debate Mode
- Real @mentions with AI
- Threading
- "Ask another agent"

### Week 3: Auto-Debate Mode (16-24 hours)
- Enable Auto-Debate Mode
- Round-based execution
- Autonomous turns

### Week 4: Agent Management (24-32 hours)
- Custom agent builder
- Agent templates
- Roles, personas, frameworks

### Week 5: Advanced Features (16-24 hours)
- Full text search
- Bookmarks
- Export (PDF, Markdown)
- Session comparison

### Week 6: Collaboration (24-32 hours)
- Organizations
- Team sharing
- Permissions

---

## 📞 Resources

**Documentation:**
- Clerk: https://clerk.com/docs
- Convex: https://docs.convex.dev  
- Vercel AI SDK: https://sdk.vercel.ai/docs
- Vercel AI Gateway: https://vercel.com/docs/ai-gateway

**Internal Docs:**
- `docs/guides/convex-database-schema.md` - Full DB schema
- `docs/implementation/Done/chat-features-implementation-plan.md` - What's built
- `docs/implementation/ToDo/AI_SDK_TOOLS_ALIGNMENT_PLAN.md` - AI model list

**API Keys Needed:**
- Clerk (free tier)
- Convex (free tier)
- Vercel AI Gateway (already configured: `AI_GATEWAY_API_KEY`)

---

**Status: READY TO SPRINT - START WITH UI COMPLETION**  
**Next Step: Phase 0 - Complete Compare Mode UI (10-12 hours)**  
**Then: Backend Integration**  
**Let's ship this! 🚀**

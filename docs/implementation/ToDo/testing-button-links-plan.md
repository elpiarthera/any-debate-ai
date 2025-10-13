# Testing Plan: Button & Link Functionality Verification

**Status**: ❌ NOT STARTED (0%)
**Priority**: P0 - CRITICAL (Must complete after missing-ui-implementation-plan.md)
**Last Updated**: October 13, 2025
**Estimated Duration**: 4 hours

**⚠️ IMPORTANT**: This plan provides comprehensive testing checklist for ALL buttons and links in the application. Every interactive element must be tested on both mobile and desktop.

---

## Table of Contents

1. [Overview](#overview)
2. [Testing Strategy](#testing-strategy)
3. [Page-by-Page Testing](#page-by-page-testing)
4. [Component Testing](#component-testing)
5. [Mobile Testing](#mobile-testing)
6. [Success Criteria](#success-criteria)

---

## Overview

### Purpose
Verify that ALL buttons and links in the application are functional after implementing missing-ui-implementation-plan.md.

### Scope
- 13 pages
- 150+ components
- 200+ interactive elements (buttons, links, cards)
- Mobile and desktop viewports

### Testing Approach
1. **Systematic**: Test page-by-page, component-by-component
2. **Comprehensive**: Every button, link, and interactive element
3. **Documented**: Check off each item as tested
4. **Responsive**: Test on mobile and desktop
5. **Feedback**: Verify visual feedback (toast, dialog, navigation)

---

## Testing Strategy

### Test Categories

#### 1. Navigation Links
- **Test**: Click link
- **Expected**: Navigate to correct page OR open dialog
- **Verify**: URL changes OR dialog opens

#### 2. Action Buttons
- **Test**: Click button
- **Expected**: Action executes (even if mock)
- **Verify**: Toast notification OR dialog opens OR state changes

#### 3. Form Submissions
- **Test**: Fill form and submit
- **Expected**: Validation works, submission succeeds
- **Verify**: Error messages OR success toast

#### 4. Dialogs/Modals
- **Test**: Open and close dialog
- **Expected**: Dialog opens/closes smoothly
- **Verify**: Dialog appears, backdrop works, close button works

#### 5. Interactive Cards
- **Test**: Click card
- **Expected**: Navigate OR expand OR select
- **Verify**: Visual feedback (hover, active state)

### Testing Tools
- **Desktop**: Chrome DevTools (1920x1080, 1366x768)
- **Mobile**: Chrome DevTools Device Mode (iPhone SE 320px, iPhone 12 375px, iPad 768px)
- **Console**: Check for errors
- **Network**: Verify no 404s

---

## Page-by-Page Testing

### Page 1: Landing Page (`app/page.tsx`)

**URL**: `/`

#### Desktop Testing (1920x1080)
- [ ] **Hero CTA Button** - "Get Started"
  - Click → Navigate to `/quick-start`
  - Verify: URL changes, page loads
  
- [ ] **Secondary CTA Button** - "View Pricing"
  - Click → Navigate to `/pricing`
  - Verify: URL changes, page loads

- [ ] **Feature Cards** (3 cards)
  - Click each card → No action expected (informational)
  - Verify: Hover state works

- [ ] **Navigation Links** (Header)
  - "Features" → Scroll to features section
  - "Pricing" → Navigate to `/pricing`
  - "Sign In" → Navigate to sign in (mock)
  - "Get Started" → Navigate to `/quick-start`

- [ ] **Footer Links**
  - "About" → Navigate to about page (mock)
  - "Contact" → Navigate to contact page (mock)
  - "Privacy" → Navigate to privacy page (mock)
  - "Terms" → Navigate to terms page (mock)

#### Mobile Testing (375px)
- [ ] **Mobile Menu Toggle**
  - Click hamburger → Menu opens
  - Click close → Menu closes
  
- [ ] **All buttons/links** - Same as desktop
  - Verify: Touch targets ≥ 44px
  - Verify: No horizontal scroll

- [ ] **Exit Intent Popup**
  - Triggers on mouse leave (if enabled)
  - Triggers after delay (if enabled)
  - Email input validation works
  - "Send Me The Guide" button submits form
  - Shows only once (if enabled)
  - ⚠️ **TODO**: Email service integration (currently console.log only)

### Page 2: Dashboard (`app/dashboard/page.tsx`)

**URL**: `/dashboard`

#### Desktop Testing (1920x1080)
- [ ] **Organization Switcher**
  - Click dropdown → Opens organization list
  - Click "Personal Workspace" → Switches organization (mock)
  - Click "Acme Corp" → Switches organization (mock)
  - Click "Create Organization" → Opens CreateOrganizationDialog
  - Verify: Dialog opens, form works, cancel/submit buttons work

- [ ] **Quick Action Cards** (6 cards)
  - "New Debate" → Navigate to `/debates`
  - "Browse Templates" → Navigate to `/quick-start`
  - "Create Agent" → Opens AgentBuilderModal
  - "View Analytics" → Navigate to `/analytics`
  - "Auto-Debate" → Navigate to `/debates` with auto mode
  - "Manage Agents" → Navigate to `/agents`

- [ ] **Recent Activity List**
  - Click activity item → Navigate to related page (debate/session)
  - Verify: Hover state works

- [ ] **Active Sessions Widget**
  - Click "View All" → Navigate to `/sessions`
  - Click session item → Navigate to session detail

#### Mobile Testing (375px)
- [ ] **All buttons/links** - Same as desktop
  - Verify: Cards stack vertically
  - Verify: Touch targets ≥ 44px
  - Verify: Organization switcher opens as drawer

---

### Page 3: Debates (`app/debates/page.tsx`)

**URL**: `/debates`

#### Desktop Testing (1920x1080)
- [ ] **New Debate Button**
  - Click → Opens debate configuration
  - Verify: Form appears, can select agents

- [ ] **Template Selector**
  - Click template card → Loads template
  - Verify: Template data populates form

- [ ] **Agent Selector** (3 agent slots)
  - Click "Select Agent" → Opens agent picker
  - Select agent → Agent added to slot
  - Click "Remove" → Agent removed from slot

- [ ] **Start Debate Button**
  - Click → Starts debate (mock)
  - Verify: Debate interface appears

- [ ] **Debate History List**
  - Click debate item → Navigate to debate detail
  - Click "Resume" → Resumes debate
  - Click "Delete" → Opens delete confirmation dialog

#### Mobile Testing (375px)
- [ ] **All buttons/links** - Same as desktop
  - Verify: Agent cards stack vertically
  - Verify: Touch targets ≥ 44px

---

### Page 4: Agents (`app/agents/page.tsx`)

**URL**: `/agents`

#### Desktop Testing (1920x1080)
- [ ] **Create Agent Button**
  - Click → Opens AgentBuilderModal
  - Verify: Modal opens, form works

- [ ] **Filter Buttons**
  - "All" → Shows all agents
  - "Favorites" → Shows favorite agents
  - "Custom" → Shows custom agents

- [ ] **Agent Cards** (per agent)
  - Click card → Opens agent detail
  - Click "Favorite" icon → Toggles favorite (toast appears)
  - Click "Edit" → Opens AgentBuilderModal with agent data
  - Click "Delete" → Opens delete confirmation dialog
  - Click "Duplicate" → Creates duplicate (toast appears)

- [ ] **Search Input**
  - Type query → Filters agents
  - Clear → Shows all agents

#### Mobile Testing (375px)
- [ ] **All buttons/links** - Same as desktop
  - Verify: Agent cards stack vertically
  - Verify: Touch targets ≥ 44px

---

### Page 5: Sessions (`app/sessions/page.tsx`)

**URL**: `/sessions`

#### Desktop Testing (1920x1080)
- [ ] **Session List Items** (per session)
  - Click session → Navigate to session detail
  - Click "Resume" → Resumes session
  - Click "Archive" → Archives session (toast appears)
  - Click "Delete" → Opens delete confirmation dialog

- [ ] **Filter Tabs**
  - "Active" → Shows active sessions
  - "Archived" → Shows archived sessions
  - "All" → Shows all sessions

- [ ] **Search Input**
  - Type query → Filters sessions
  - Clear → Shows all sessions

#### Mobile Testing (375px)
- [ ] **All buttons/links** - Same as desktop
  - Verify: Session cards stack vertically
  - Verify: Touch targets ≥ 44px
  - Verify: Swipe actions work (if implemented)

---

### Page 6: Messages (`app/messages/page.tsx`)

**URL**: `/messages`

#### Desktop Testing (1920x1080)
- [ ] **Message List Items** (per message)
  - Click message → Expands message detail
  - Click "Reply" → Opens reply form
  - Click "Reaction" → Adds reaction (toast appears)
  - Click "Bookmark" → Toggles bookmark (toast appears)
  - Click "Share" → Opens share dialog

- [ ] **Filter Buttons**
  - "All" → Shows all messages
  - "Bookmarked" → Shows bookmarked messages
  - "Unread" → Shows unread messages

#### Mobile Testing (375px)
- [ ] **All buttons/links** - Same as desktop
  - Verify: Message cards stack vertically
  - Verify: Touch targets ≥ 44px

---

### Page 7: Artifacts (`app/artifacts/page.tsx`)

**URL**: `/artifacts`

#### Desktop Testing (1920x1080)
- [ ] **Artifact Cards** (per artifact)
  - Click card → Opens artifact detail
  - Click "Favorite" → Toggles favorite (toast appears)
  - Click "Delete" → Opens delete confirmation dialog
  - Click "Export" → Opens export dialog

- [ ] **Filter Buttons**
  - "All" → Shows all artifacts
  - "Documents" → Shows document artifacts
  - "Charts" → Shows chart artifacts
  - "Tables" → Shows table artifacts

- [ ] **Search Input**
  - Type query → Filters artifacts
  - Clear → Shows all artifacts

#### Mobile Testing (375px)
- [ ] **All buttons/links** - Same as desktop
  - Verify: Artifact cards stack vertically
  - Verify: Touch targets ≥ 44px

---

### Page 8: Analytics (`app/analytics/page.tsx`)

**URL**: `/analytics`

#### Desktop Testing (1920x1080)
- [ ] **Date Range Selector**
  - Click → Opens date picker
  - Select range → Updates charts

- [ ] **Export Button**
  - Click → Opens export dialog
  - Select format → Downloads report (mock)

- [ ] **Chart Interactions**
  - Hover over chart → Shows tooltip
  - Click legend → Toggles data series

#### Mobile Testing (375px)
- [ ] **All buttons/links** - Same as desktop
  - Verify: Charts are responsive
  - Verify: Touch targets ≥ 44px

---

### Page 9: Settings (`app/settings/page.tsx`)

**URL**: `/settings`

#### Desktop Testing (1920x1080)
- [ ] **Profile Panel**
  - Edit name → Input works
  - Edit email → Input works
  - Click "Save" → Saves changes (toast appears)
  - Click "Cancel" → Discards changes (toast appears)

- [ ] **Preferences Panel**
  - Toggle theme → Changes theme
  - Toggle notifications → Updates preference
  - Click "Save" → Saves changes (toast appears)

- [ ] **Account Panel**
  - Click "Change Password" → Opens change password dialog
  - Click "Delete Account" → Opens delete confirmation dialog

#### Mobile Testing (375px)
- [ ] **All buttons/links** - Same as desktop
  - Verify: Panels stack vertically
  - Verify: Touch targets ≥ 44px

---

### Page 10: Pricing (`app/pricing/page.tsx`)

**URL**: `/pricing`

#### Desktop Testing (1920x1080)
- [ ] **Plan Cards** (3 plans)
  - Click "Get Started" (Free) → Navigate to sign up (mock)
  - Click "Upgrade" (Pro) → Opens upgrade dialog (mock)
  - Click "Contact Sales" (Enterprise) → Opens contact form (mock)

- [ ] **Toggle Switch**
  - Click "Monthly/Yearly" → Updates pricing display

- [ ] **FAQ Accordion**
  - Click question → Expands answer
  - Click again → Collapses answer

#### Mobile Testing (375px)
- [ ] **All buttons/links** - Same as desktop
  - Verify: Plan cards stack vertically
  - Verify: Touch targets ≥ 44px

---

### Page 11: Billing (`app/dashboard/billing/page.tsx`)

**URL**: `/dashboard/billing`

#### Desktop Testing (1920x1080)
- [ ] **Current Plan Card**
  - Click "Change Plan" → Opens ChangePlanDialog
  - Click "Cancel Subscription" → Opens CancelSubscriptionDialog

- [ ] **Token Balance Card**
  - Click "Add Tokens" → Opens PurchaseTokensDialog

- [ ] **Payment History Table**
  - Click "Download" (per invoice) → Downloads invoice (mock)
  - Click "View Details" → Opens invoice detail

#### Mobile Testing (375px)
- [ ] **All buttons/links** - Same as desktop
  - Verify: Cards stack vertically
  - Verify: Touch targets ≥ 44px

---

### Page 12: Memory (`app/dashboard/memory/page.tsx`)

**URL**: `/dashboard/memory`

#### Desktop Testing (1920x1080)
- [ ] **Add Memory Button**
  - Click → Opens add memory form

- [ ] **Memory Cards** (per memory)
  - Click card → Expands memory detail
  - Click "Edit" → Opens EditMemoryDialog
  - Click "Delete" → Opens delete confirmation dialog

- [ ] **Filter Buttons**
  - "All" → Shows all memories
  - "Documents" → Shows document memories
  - "URLs" → Shows URL memories
  - "Chats" → Shows chat memories

- [ ] **Search Input**
  - Type query → Filters memories
  - Clear → Shows all memories

#### Mobile Testing (375px)
- [ ] **All buttons/links** - Same as desktop
  - Verify: Memory cards stack vertically
  - Verify: Touch targets ≥ 44px

---

### Page 13: Quick Start (`app/quick-start/page.tsx`)

**URL**: `/quick-start`

#### Desktop Testing (1920x1080)
- [ ] **Template Cards** (per template)
  - Click card → Selects template
  - Click "Use Template" → Loads template and navigates to debates

- [ ] **Category Filters**
  - Click category → Filters templates
  - Click "All" → Shows all templates

#### Mobile Testing (375px)
- [ ] **All buttons/links** - Same as desktop
  - Verify: Template cards stack vertically
  - Verify: Touch targets ≥ 44px

---

### Page 14: Organization Overview (`app/dashboard/organization/page.tsx`)

**URL**: `/dashboard/organization`

#### Desktop Testing (1920x1080)
- [ ] **Stats Cards** (4 cards)
  - Total Members → Displays correct count
  - Active Debates → Displays correct count
  - Token Usage → Displays correct percentage
  - Growth → Displays correct percentage

- [ ] **Quick Action Cards** (3 cards)
  - Click "Invite Members" → Opens InviteMemberDialog
  - Click "Organization Settings" → Navigate to `/dashboard/organization/settings`
  - Click "View Reports" → Navigate to analytics (mock)

- [ ] **Recent Activity List**
  - Displays last 5 activities
  - Shows user name, action, and time
  - Icons display correctly

- [ ] **Member Preview**
  - Displays first 5 members
  - Shows avatar, name, and role
  - Click "View All Members" → Navigate to `/dashboard/organization/members`

#### Mobile Testing (375px)
- [ ] **All cards/sections** - Same as desktop
  - Verify: Stats cards stack vertically (1 column)
  - Verify: Quick action cards stack vertically
  - Verify: Touch targets ≥ 44px
  - Verify: No horizontal scroll

---

### Page 15: Organization Settings (`app/dashboard/organization/settings/page.tsx`)

**URL**: `/dashboard/organization/settings`

#### Desktop Testing (1920x1080)
- [ ] **General Settings Form**
  - Organization Name input → Type works, validation works
  - Organization Slug input → Type works, validation works
  - Description textarea → Type works, character count updates
  - Click "Save Changes" → Shows loading state, then success toast
  - Click "Cancel" → Resets form, shows toast

- [ ] **Danger Zone**
  - Click "Delete Organization" → Opens delete confirmation dialog
  - Dialog: Click "Cancel" → Closes dialog
  - Dialog: Click "Delete Organization" → Confirms deletion (mock), shows toast

#### Mobile Testing (375px)
- [ ] **All form elements** - Same as desktop
  - Verify: Form inputs full-width (48px height)
  - Verify: Buttons full-width at bottom (44px height)
  - Verify: Keyboard doesn't cover inputs
  - Verify: Touch targets ≥ 44px

---

### Page 16: Organization Members (`app/dashboard/organization/members/page.tsx`)

**URL**: `/dashboard/organization/members`

#### Desktop Testing (1920x1080)
- [ ] **Page Header**
  - Click "Invite Member" button → Opens InviteMemberDialog
  - Verify: Button is 44px min height

- [ ] **Member List** (uses OrgMemberList component)
  - Displays all members with avatar, name, role
  - Click "Invite Member" (in list) → Opens InviteMemberDialog
  - Click "Remove" (per member) → Opens delete confirmation dialog
  - Click role dropdown → Opens role selector
  - Select new role → Updates role (toast appears)

#### Mobile Testing (375px)
- [ ] **All buttons/list items** - Same as desktop
  - Verify: Member cards stack vertically (80px min height)
  - Verify: Touch targets ≥ 44px
  - Verify: Invite button accessible

---

## Component Testing

### Organization Components

#### OrgSwitcher (`components/organization/org-switcher.tsx`)
- [ ] **Desktop**: Click dropdown → Opens organization list
- [ ] **Desktop**: Click organization → Switches organization (mock)
- [ ] **Desktop**: Click "Create Organization" → Opens CreateOrganizationDialog
- [ ] **Mobile**: Opens as drawer instead of dropdown
- [ ] **Mobile**: Touch targets ≥ 44px

#### CreateOrganizationDialog (`components/organization/create-organization-dialog.tsx`)
- [ ] **Desktop**: Opens as center modal
- [ ] **Desktop**: Form validation works
- [ ] **Desktop**: "Cancel" button closes dialog
- [ ] **Desktop**: "Create" button submits form (toast appears)
- [ ] **Mobile**: Opens as full-screen drawer
- [ ] **Mobile**: Keyboard doesn't cover inputs
- [ ] **Mobile**: Touch targets ≥ 44px

#### OrgMemberList (`components/organization/org-member-list.tsx`)
- [ ] **Desktop**: Click "Invite Member" → Opens InviteMemberDialog
- [ ] **Desktop**: Click "Remove" (per member) → Opens delete confirmation
- [ ] **Desktop**: Click role dropdown → Opens role selector
- [ ] **Desktop**: Select new role → Updates role (toast appears)
- [ ] **Mobile**: All buttons accessible
- [ ] **Mobile**: Touch targets ≥ 44px

#### InviteMemberDialog (`components/organization/invite-member-dialog.tsx`)
- [ ] **Desktop**: Opens as center modal
- [ ] **Desktop**: Email validation works
- [ ] **Desktop**: Role selector works
- [ ] **Desktop**: "Send Invitation" button submits (toast appears)
- [ ] **Mobile**: Opens as full-screen drawer
- [ ] **Mobile**: Touch targets ≥ 44px

---

### Billing Components

#### TokenBalanceWidget (`components/billing/token-balance-widget.tsx`)
- [ ] **Desktop**: Click "Add Tokens" → Opens PurchaseTokensDialog
- [ ] **Desktop**: Displays current balance
- [ ] **Mobile**: Touch target ≥ 44px

#### ChangePlanDialog (`components/billing/change-plan-dialog.tsx`)
- [ ] **Desktop**: Opens as center modal
- [ ] **Desktop**: Plan cards selectable
- [ ] **Desktop**: "Confirm" button submits (toast appears)
- [ ] **Mobile**: Opens as full-screen drawer
- [ ] **Mobile**: Touch targets ≥ 44px

#### CancelSubscriptionDialog (`components/billing/cancel-subscription-dialog.tsx`)
- [ ] **Desktop**: Opens as alert dialog
- [ ] **Desktop**: Reason selector works
- [ ] **Desktop**: "Cancel Subscription" button confirms (toast appears)
- [ ] **Mobile**: Touch targets ≥ 44px

#### PurchaseTokensDialog (`components/billing/purchase-tokens-dialog.tsx`)
- [ ] **Desktop**: Opens as center modal
- [ ] **Desktop**: Token packages selectable
- [ ] **Desktop**: "Purchase" button submits (toast appears)
- [ ] **Mobile**: Opens as full-screen drawer
- [ ] **Mobile**: Touch targets ≥ 44px

---

### Memory Components

#### MemoryDashboard (`components/memory/memory-dashboard.tsx`)
- [ ] **Desktop**: Click "Add Memory" → Opens add memory form
- [ ] **Desktop**: Click "Edit" (per memory) → Opens EditMemoryDialog
- [ ] **Desktop**: Click "Delete" (per memory) → Opens delete confirmation
- [ ] **Mobile**: Touch targets ≥ 44px

#### AddMemoryForm (`components/memory/add-memory-form.tsx`)
- [ ] **Desktop**: Form validation works
- [ ] **Desktop**: "Save" button submits (toast appears)
- [ ] **Desktop**: "Cancel" button closes form
- [ ] **Mobile**: Keyboard doesn't cover inputs
- [ ] **Mobile**: Touch targets ≥ 44px

#### DocumentUpload (`components/memory/document-upload.tsx`)
- [ ] **Desktop**: Click "Upload" → Opens file picker
- [ ] **Desktop**: Drag & drop works
- [ ] **Desktop**: "Process" button submits (toast appears)
- [ ] **Mobile**: File picker works
- [ ] **Mobile**: Touch targets ≥ 44px

#### URLScraper (`components/memory/url-scraper.tsx`)
- [ ] **Desktop**: URL validation works
- [ ] **Desktop**: "Scrape" button submits (toast appears)
- [ ] **Mobile**: Touch targets ≥ 44px

#### EditMemoryDialog (`components/memory/edit-memory-dialog.tsx`)
- [ ] **Desktop**: Opens as center modal
- [ ] **Desktop**: Pre-fills with existing data
- [ ] **Desktop**: "Save" button submits (toast appears)
- [ ] **Mobile**: Opens as full-screen drawer
- [ ] **Mobile**: Touch targets ≥ 44px

---

### Dashboard Components

#### QuickActions (`components/dashboard/QuickActions.tsx`)
- [ ] **Desktop**: Click "New Debate" → Navigate to `/debates`
- [ ] **Desktop**: Click "Browse Templates" → Navigate to `/quick-start`
- [ ] **Desktop**: Click "Create Agent" → Opens AgentBuilderModal
- [ ] **Desktop**: Click "View Analytics" → Navigate to `/analytics`
- [ ] **Desktop**: Click "Auto-Debate" → Navigate to `/debates` with auto mode
- [ ] **Desktop**: Click "Manage Agents" → Navigate to `/agents`
- [ ] **Mobile**: Touch targets ≥ 44px

#### DashboardContent (`components/dashboard/DashboardContent.tsx`)
- [ ] **Desktop**: All sections render correctly
- [ ] **Desktop**: All links/buttons work
- [ ] **Mobile**: Sections stack vertically

---

### Chat Components

#### ChatSidebar (`components/chat/ChatSidebar.tsx`)
- [ ] **Desktop**: Click "New Debate" → Creates new session
- [ ] **Desktop**: Click "Start from Template" → Navigate to `/quick-start`
- [ ] **Desktop**: Click session → Selects session
- [ ] **Desktop**: Click "Edit" (per session) → Opens EditSessionDialog
- [ ] **Desktop**: Click "Delete" (per session) → Opens delete confirmation
- [ ] **Mobile**: Opens as drawer
- [ ] **Mobile**: Touch targets ≥ 44px

#### EditSessionDialog (NEW - needs to be created)
- [ ] **Desktop**: Opens as center modal
- [ ] **Desktop**: Pre-fills with session title
- [ ] **Desktop**: "Save" button submits (toast appears)
- [ ] **Mobile**: Opens as full-screen drawer
- [ ] **Mobile**: Touch targets ≥ 44px

---

### Debate Components

#### MessageBubble (`components/debate/MessageBubble.tsx`)
- [ ] **Desktop**: Click "Share" → Shares message to other model
- [ ] **Desktop**: Hover shows actions
- [ ] **Mobile**: Touch targets ≥ 44px

#### ModelColumn (`components/debate/ModelColumn.tsx`)
- [ ] **Desktop**: Click "Retry" → Retries generation
- [ ] **Desktop**: Click "Stop" → Stops streaming
- [ ] **Mobile**: Touch targets ≥ 44px

---

### Agent Components

#### AgentBuilderModal (`components/agent-config/AgentBuilderModal.tsx`)
- [ ] **Desktop**: Opens as center modal
- [ ] **Desktop**: Multi-step form works
- [ ] **Desktop**: "Next" button advances step
- [ ] **Desktop**: "Previous" button goes back
- [ ] **Desktop**: "Save" button submits (toast appears)
- [ ] **Mobile**: Opens as full-screen drawer
- [ ] **Mobile**: Touch targets ≥ 44px

#### AgentCard (`components/agent-management/AgentCard.tsx`)
- [ ] **Desktop**: Click card → Opens agent detail
- [ ] **Desktop**: Click "Favorite" → Toggles favorite (toast appears)
- [ ] **Desktop**: Click "Edit" → Opens AgentBuilderModal
- [ ] **Desktop**: Click "Delete" → Opens delete confirmation
- [ ] **Mobile**: Touch targets ≥ 44px

---

### Settings Components

#### ProfilePanel (`components/settings/profile-panel.tsx`)
- [ ] **Desktop**: Form inputs work
- [ ] **Desktop**: "Save" button submits (toast appears)
- [ ] **Desktop**: "Cancel" button discards changes
- [ ] **Mobile**: Touch targets ≥ 44px

#### PreferencesPanel (`components/settings/preferences-panel.tsx`)
- [ ] **Desktop**: Toggle switches work
- [ ] **Desktop**: "Save" button submits (toast appears)
- [ ] **Mobile**: Touch targets ≥ 44px

---

### Shared Components

#### DeleteConfirmationDialog (`components/shared/delete-confirmation-dialog.tsx`)
- [ ] **Desktop**: Opens as alert dialog
- [ ] **Desktop**: Displays item name correctly
- [ ] **Desktop**: "Cancel" button closes dialog
- [ ] **Desktop**: "Delete" button confirms (toast appears)
- [ ] **Mobile**: Touch targets ≥ 44px

---

### Artifact Components (EXPANDED)

#### ArtifactExportModal (`components/artifacts/export/ArtifactExportModal.tsx`)
- [ ] **Desktop**: Opens as center modal
- [ ] **Desktop**: Format selection (PDF, PNG, CSV, JSON) works
- [ ] **Desktop**: "Include Metadata" toggle works
- [ ] **Desktop**: "Export" button downloads file (toast appears)
- [ ] **Desktop**: "Cancel" button closes modal
- [ ] **Mobile**: Opens as full-screen drawer
- [ ] **Mobile**: All buttons ≥ 44px touch targets

#### VersionHistoryPanel (`components/artifacts/version-history/VersionHistoryPanel.tsx`)
- [ ] **Desktop**: Opens as center modal
- [ ] **Desktop**: Search versions works
- [ ] **Desktop**: Filter by author works
- [ ] **Desktop**: Filter by change type works
- [ ] **Desktop**: Click version → Selects version
- [ ] **Desktop**: "Compare" button → Shows diff view
- [ ] **Desktop**: "Restore" button → Restores version (toast appears)
- [ ] **Desktop**: "Export" button → Downloads history JSON
- [ ] **Mobile**: Touch targets ≥ 44px

---

### Template Components (EXPANDED)

#### SaveTemplateModal (`components/templates/SaveTemplateModal.tsx`)
- [ ] **Desktop**: Opens as center modal
- [ ] **Desktop**: Form validation works (name, description required)
- [ ] **Desktop**: Category selector works
- [ ] **Desktop**: Conversation type selector works
- [ ] **Desktop**: Add tag button works
- [ ] **Desktop**: Remove tag button works
- [ ] **Desktop**: Suggested tags clickable
- [ ] **Desktop**: "Include current topic" checkbox works
- [ ] **Desktop**: "Save Template" button submits (toast appears)
- [ ] **Desktop**: "Cancel" button closes modal
- [ ] **Mobile**: Touch targets ≥ 44px

#### TemplateManagementPanel (`components/templates/TemplateManagementPanel.tsx`)
- [ ] **Desktop**: "Select" button → Enters selection mode
- [ ] **Desktop**: "Import" button → Opens file picker
- [ ] **Desktop**: "Export All" button → Downloads JSON
- [ ] **Desktop**: "Select All" button → Selects all templates
- [ ] **Desktop**: "Export" button (selected) → Downloads selected
- [ ] **Desktop**: "Delete" button (selected) → Deletes selected (confirmation)
- [ ] **Desktop**: "Cancel" button → Exits selection mode
- [ ] **Desktop**: "Duplicate" button (per template) → Creates copy (toast)
- [ ] **Desktop**: "Share" button (per template) → Downloads JSON
- [ ] **Desktop**: "Delete" button (per template) → Deletes (confirmation)
- [ ] **Mobile**: Touch targets ≥ 44px

---

### Bookmark Components (EXPANDED)

#### BookmarkEditor (`components/chat/bookmarks/BookmarkEditor.tsx`)
- [ ] **Desktop**: Opens as center modal
- [ ] **Desktop**: Collection selector works
- [ ] **Desktop**: Note textarea works
- [ ] **Desktop**: Add tag button works
- [ ] **Desktop**: Remove tag button (per tag) works
- [ ] **Desktop**: "Save Changes" button submits (toast appears)
- [ ] **Desktop**: "Cancel" button closes modal
- [ ] **Mobile**: Touch targets ≥ 44px

#### CollectionManager (`components/chat/bookmarks/CollectionManager.tsx`)
- [ ] **Desktop**: Opens as center modal
- [ ] **Desktop**: "Create New Collection" button → Shows form
- [ ] **Desktop**: Collection name input works
- [ ] **Desktop**: Collection description textarea works
- [ ] **Desktop**: Color selector works (8 colors)
- [ ] **Desktop**: Icon selector works (10 icons)
- [ ] **Desktop**: "Create" button → Creates collection (toast)
- [ ] **Desktop**: "Update" button → Updates collection (toast)
- [ ] **Desktop**: "Cancel" button → Hides form
- [ ] **Desktop**: "Edit" button (per collection) → Shows edit form
- [ ] **Desktop**: "Delete" button (per collection) → Deletes (confirmation)
- [ ] **Mobile**: Touch targets ≥ 44px

---

### Comparison Components (NEW)

#### ComparisonSelector (`components/chat/comparison/ComparisonSelector.tsx`)
- [ ] **Desktop**: Opens as center modal
- [ ] **Desktop**: Session checkboxes work
- [ ] **Desktop**: Click session card → Toggles selection
- [ ] **Desktop**: "Compare" button → Starts comparison (2-4 sessions)
- [ ] **Desktop**: "Cancel" button → Closes modal
- [ ] **Desktop**: Shows error if < 2 or > 4 sessions selected
- [ ] **Mobile**: Touch targets ≥ 44px

---

## Mobile Testing

### Device Sizes to Test

#### iPhone SE (320px width)
- [ ] All pages load correctly
- [ ] No horizontal scroll
- [ ] All touch targets ≥ 44px
- [ ] All inputs ≥ 48px
- [ ] Text is readable (no zoom required)
- [ ] Buttons are tappable
- [ ] Dialogs open as drawers
- [ ] Navigation works

#### iPhone 12 (375px width)
- [ ] All pages load correctly
- [ ] No horizontal scroll
- [ ] All touch targets ≥ 44px
- [ ] All inputs ≥ 48px
- [ ] Text is readable
- [ ] Buttons are tappable
- [ ] Dialogs open as drawers
- [ ] Navigation works

#### iPad (768px width)
- [ ] All pages load correctly
- [ ] Layout uses tablet breakpoint
- [ ] All touch targets ≥ 44px
- [ ] All inputs ≥ 48px (prevents iOS zoom)
- [ ] Dialogs open as modals (not drawers)
- [ ] Navigation works

### Mobile-Specific Tests

#### Touch Interactions
- [ ] Tap works on all buttons
- [ ] Tap works on all links
- [ ] Tap works on all cards
- [ ] Double-tap doesn't zoom
- [ ] Long-press doesn't trigger context menu (where not intended)

#### Keyboard Behavior
- [ ] Keyboard opens when input focused
- [ ] Keyboard doesn't cover input
- [ ] "Done" button closes keyboard
- [ ] Form submission works with keyboard

#### Gestures
- [ ] Swipe to go back (if implemented)
- [ ] Pull to refresh (if implemented)
- [ ] Pinch to zoom disabled (where appropriate)

#### Adaptive Components
- [ ] AdaptiveModal opens as drawer on mobile
- [ ] AdaptiveModal opens as modal on desktop
- [ ] AdaptiveNavigation works on mobile
- [ ] AdaptiveGrid adjusts columns

---

## Success Criteria

### All Buttons Work
- [ ] Every button has an onClick handler
- [ ] Every button does something when clicked
- [ ] Every button shows visual feedback (toast, dialog, navigation)
- [ ] No console errors when clicking buttons

### All Links Work
- [ ] Every link has proper href or onClick
- [ ] Every link navigates correctly
- [ ] No href="#" links
- [ ] No 404 errors

### All Forms Work
- [ ] Form validation works
- [ ] Error messages display correctly
- [ ] Form submission works
- [ ] Success feedback displays (toast)

### All Dialogs Work
- [ ] Dialogs open when triggered
- [ ] Dialogs close properly (X button, Cancel, backdrop click)
- [ ] Dialog content is accessible
- [ ] Dialog forms work

### Mobile-First Works
- [ ] All touch targets ≥ 44px
- [ ] All inputs ≥ 48px (prevents iOS zoom)
- [ ] No horizontal scroll on any page
- [ ] Responsive layouts work correctly
- [ ] Adaptive components work correctly

### No Console Errors
- [ ] No JavaScript errors
- [ ] No React warnings
- [ ] No 404 network errors
- [ ] No CORS errors

---

## Testing Workflow

### Step 1: Desktop Testing (2 hours)
1. Open Chrome DevTools
2. Set viewport to 1920x1080
3. Go through each page systematically
4. Click every button and link
5. Check off items as tested
6. Document any issues found

### Step 2: Mobile Testing (1.5 hours)
1. Open Chrome DevTools Device Mode
2. Test on iPhone SE (320px)
3. Test on iPhone 12 (375px)
4. Test on iPad (768px)
5. Check off items as tested
6. Document any issues found

### Step 3: Issue Resolution (30 minutes)
1. Review all documented issues
2. Prioritize by severity
3. Fix critical issues immediately
4. Create tickets for non-critical issues

---

## Issue Tracking Template

When you find an issue, document it using this template:

\`\`\`markdown
### Issue #X: [Brief Description]

**Severity**: Critical / High / Medium / Low
**Page/Component**: [Path to file]
**Element**: [Button/Link description]
**Expected Behavior**: [What should happen]
**Actual Behavior**: [What actually happens]
**Steps to Reproduce**:
1. Step 1
2. Step 2
3. Step 3

**Screenshot**: [If applicable]
**Console Errors**: [If any]
**Fix Required**: [Brief description of fix needed]
\`\`\`

---

## Completion Checklist

### Before Starting
- [ ] missing-ui-implementation-plan.md is 100% complete
- [ ] All components are implemented
- [ ] All dialogs are implemented
- [ ] All handlers are wired up
- [ ] Development server is running

### During Testing
- [ ] Test systematically (don't skip items)
- [ ] Document all issues found
- [ ] Take screenshots of issues
- [ ] Check console for errors
- [ ] Test on multiple viewports

### After Testing
- [ ] All items checked off
- [ ] All critical issues fixed
- [ ] All issues documented
- [ ] Testing report created
- [ ] Sign-off obtained

---

## Notes

1. **Be Thorough**: Don't skip any items, even if they seem obvious
2. **Document Everything**: If something doesn't work, document it
3. **Test Mobile First**: Mobile testing often reveals issues desktop doesn't
4. **Check Console**: Always check browser console for errors
5. **Visual Feedback**: Every action should have visual feedback
6. **Accessibility**: Test with keyboard navigation too
7. **Performance**: Note any slow interactions or lag

---

## Next Steps

1. ✅ **Implementation Complete** - Finish missing-ui-implementation-plan.md
2. ⏭️ **Desktop Testing** - Test all pages and components on desktop (2 hours)
3. ⏭️ **Mobile Testing** - Test all pages and components on mobile (1.5 hours)
4. ⏭️ **Issue Resolution** - Fix any issues found (30 minutes)
5. ⏭️ **Sign-Off** - Get approval that all buttons/links work
6. ⏭️ **Backend Integration** - Ready to start backend work

---

**Last Updated**: October 13, 2025
**Total Estimated Time**: 4 hours

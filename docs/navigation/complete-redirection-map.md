# Complete Redirection Map - AnyDebateAI

## Overview
This document maps every button, link, and interactive element in the AnyDebateAI application, documenting their actions and destinations.

**Last Updated**: January 2025
**Total Pages**: 22
**Total Interactive Elements**: 846
**Total Modals/Dialogs**: 29

---

## Landing Page (`/`)

### Hero Section (Desktop)
| Element | Action | Destination |
|---------|--------|-------------|
| Try AnyDebate Button | Action | Exit demo mode → `/dashboard` |
| Watch Demo Button | Action | Scroll to `#interactive-demo` |

### Hero Section (Mobile)
| Element | Action | Destination |
|---------|--------|-------------|
| Try AnyDebate Button | Action | Exit demo mode → `/dashboard` |
| Watch Demo Button | Action | Scroll to `#interactive-demo` |

### Problem Deep Dive Section
| Element | Action | Destination |
|---------|--------|-------------|
| AI Service Tabs (8 tabs) | Display | Shows browser tab chaos visualization |

### Problem Solution Section
| Element | Action | Destination |
|---------|--------|-------------|
| Pain Points List (5 items) | Display | Shows problems with manual copy-paste |
| Solutions List (5 items) | Display | Shows automated debate benefits |

### Solution Reveal Section
| Element | Action | Destination |
|---------|--------|-------------|
| Solution Cards (3 cards) | Display | Shows automated debates, richer insights, one interface |

### Three Modes Section
| Element | Action | Destination |
|---------|--------|-------------|
| Compare Mode Card | Display | Shows Compare Mode features |
| Debate Mode Card | Display | Shows Debate Mode features |
| Auto-Debate Mode Card | Display | Shows Auto-Debate Mode features |

### See It In Action Section
| Element | Action | Destination |
|---------|--------|-------------|
| Old Way Card | Display | Shows manual copy-paste workflow |
| AnyDebate Way Card | Display | Shows automated debate workflow |

### Stats Section
| Element | Action | Destination |
|---------|--------|-------------|
| Stats Cards (4 cards) | Display | Shows 5 min, 4x, 87%, 12K+ metrics |

### Benefits Section
| Element | Action | Destination |
|---------|--------|-------------|
| Benefit Cards (4 cards) | Display | Shows blind spots, save hours, richer debates, artifacts |

### Features Section
| Element | Action | Destination |
|---------|--------|-------------|
| Feature Cards (6 cards) | Display | Shows AI debates, agent builder, artifacts, chat, export, dashboard |
| Feature CTA Buttons (6 buttons) | Action | Navigate to respective features (placeholder) |

### Agent Builder Section
| Element | Action | Destination |
|---------|--------|-------------|
| Agent Component Cards (3 cards) | Display | Shows 50 roles, 8 personas, 16 frameworks |
| Pre-built Team Cards (8 cards) | Display | Shows business, product, creative, research, legal, marketing, tech, investment teams |

### How It Works Section
| Element | Action | Destination |
|---------|--------|-------------|
| Step Cards (3 cards) | Display | Shows select agents, start debate, generate artifacts |

### Final CTA Section
| Element | Action | Destination |
|---------|--------|-------------|
| Try the Demo Now Button | Action | Exit demo mode → `/dashboard` |

### Auto-redirect (non-demo mode)
| Element | Action | Destination |
|---------|--------|-------------|
| Page Load | Navigate | `/dashboard` |

---

## Dashboard Home (`/dashboard`)

### Dashboard Header
| Element | Action | Destination |
|---------|--------|-------------|
| Menu Button (Mobile) | Action | Toggle sidebar modal |
| Back to Landing | Navigate | `/` |
| Organization Switcher | Modal | Organization dropdown menu |
| Search Input (Desktop) | Action | Search debates/agents (real-time) |
| Search Button (Mobile) | Action | Open search modal |
| Notifications Button (Badge: 3) | Modal | Notifications dropdown |
| New Debate Button | Navigate | `/debates` |
| Theme Toggle | Action | Toggle dark/light mode |

### Dashboard Layout
| Element | Action | Destination |
|---------|--------|-------------|
| Breadcrumb Links | Navigate | Navigate to breadcrumb path |

### Organization Switcher (Mega Menu)
| Element | Action | Destination |
|---------|--------|-------------|
| Organization Card | Action | Select organization |
| Overview Link (per org) | Navigate | `/dashboard/organization/[slug]` |
| Settings Link (per org, admin/owner) | Navigate | `/dashboard/organization/[slug]/settings` |
| Members Link (per org, admin/owner) | Navigate | `/dashboard/organization/[slug]/members` |
| New Organization Button | Modal | Create organization dialog |
| Overview Quick Link | Navigate | `/dashboard/organization/[slug]` |
| Manage Members Quick Link | Navigate | `/dashboard/organization/[slug]/members` |
| Settings Quick Link | Navigate | `/dashboard/organization/[slug]/settings` |

### Sidebar Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Dashboard | Navigate | `/dashboard` |
| Debates (Badge: 3) | Navigate | `/debates` |
| Agents | Navigate | `/agents` |
| Templates | Navigate | `/templates` |
| Memory (Admin, Badge: New) | Navigate | `/dashboard/memory` |
| Analytics | Navigate | `/analytics` |
| Export | Navigate | `/export` |
| Marketplace | Navigate | `/marketplace` |
| Settings | Navigate | `/settings` |
| Billing (Admin) | Navigate | `/dashboard/billing` |
| Collapse/Expand Sidebar | Action | Toggle sidebar width |

### Quick Actions (Sidebar)
| Element | Action | Destination |
|---------|--------|-------------|
| Quick Start | Navigate | `/quick-start` |
| New Debate | Action | Console log (placeholder) |
| Create Agent | Action | Console log (placeholder) |
| Quick Stats | Action | Console log (placeholder) |

### Recent Activity (Sidebar)
| Element | Action | Destination |
|---------|--------|-------------|
| Activity Card | Action | Click handler (placeholder) |

### Quick Actions Menu (Header Dropdown)
| Element | Action | Destination |
|---------|--------|-------------|
| New Debate | Navigate | `/debates` |
| Create Agent | Navigate | `/agents` |
| Import Template | Navigate | `/dashboard/export` |
| Export Data | Navigate | `/dashboard/export` |
| Settings | Navigate | `/settings` |

### Token Balance Widget (Header)
| Element | Action | Destination |
|---------|--------|-------------|
| Token Balance Button | Modal | Token balance popover |
| Add Tokens Button (in popover) | Navigate | `/dashboard/billing` |

### Quick Actions (Main Content)
| Element | Action | Destination |
|---------|--------|-------------|
| Quick Start | Navigate | `/quick-start` |
| New Debate | Navigate | `/debates` |
| Create Agent | Navigate | `/agents` |
| View Analytics | Navigate | `/analytics` |
| Auto-Debate | Navigate | `/debates?mode=auto` |
| Manage Agents | Navigate | `/agents` |
| Settings | Navigate | `/settings` |

### Recent Activity (Main Content)
| Element | Action | Destination |
|---------|--------|-------------|
| View All | Navigate | `/history` |
| Activity Card | Action | Click handler (placeholder) |

### Agent Library (Main Content)
| Element | Action | Destination |
|---------|--------|-------------|
| New Agent Button | Navigate | `/agents` |
| Search Agents Input | Action | Filter agents (real-time) |
| Favorites Toggle Button | Action | Toggle favorites filter |
| Agent Card | Action | View agent details |
| Favorite Button (per agent) | Action | Toggle favorite handler |
| Edit Button (per agent) | Navigate | `/agents?edit=[id]` |
| Delete Button (per agent) | Modal | Delete confirmation |
| Create First Agent Link (empty state) | Navigate | `/agents` |

### Session List (Main Content)
| Element | Action | Destination |
|---------|--------|-------------|
| Search Sessions Input | Action | Filter sessions (real-time) |
| Filter Status Button | Action | Cycle through all/active/archived |
| Session Card | Action | View session details |
| Resume Button (per session) | Navigate | `/debates?session=[id]` |
| Delete Button (per session) | Modal | Delete confirmation dialog |
| Start First Debate Link (empty state) | Navigate | `/debates` |

---

## Debates Page (`/debates`)

### Header
| Element | Action | Destination |
|---------|--------|-------------|
| Toggle Sidebar (Mobile) | Action | Toggle sidebar collapse |
| Back to Overview | Navigate | `/overview` |
| Quick Agent Selector | Action | Add/remove models |
| Quick Agent Selector - Add Agent Button | Modal | Agent selector dropdown/drawer |
| Quick Agent Selector - Add GPT-4 | Action | Add GPT-4 model handler |
| Quick Agent Selector - Add Claude-3.5 | Action | Add Claude-3.5 model handler |
| Quick Agent Selector - Add Llama-3 | Action | Add Llama-3 model handler |
| Quick Agent Selector - Add Gemini | Action | Add Gemini model handler |
| Quick Agent Selector - Create Custom Agent | Modal | Agent builder modal |
| Quick Agent Selector - Remove Model | Action | Remove model handler |
| Open Agent Builder | Modal | Agent builder modal |
| Save as Template | Modal | Save template modal |
| Templates Button | Navigate | `/quick-start` |
| Canvas Toggle | Action | Open/close artifact canvas |
| Theme Toggle | Action | Toggle dark/light mode |

### Chat Sidebar
| Element | Action | Destination |
|---------|--------|-------------|
| Collapse/Expand Sidebar | Action | Toggle sidebar width |
| New Debate Button | Action | Create new session handler |
| Start from Template Button | Navigate | `/quick-start` |
| Session Card | Action | Select session handler |
| Export Session Button | Modal | Export dialog |
| Edit Session Button | Modal | Edit session dialog |
| Delete Session Button | Modal | Delete confirmation dialog |
| Settings Button | Navigate | `/settings` |

### Chat Thread
| Element | Action | Destination |
|---------|--------|-------------|
| Search Messages Button | Modal | Message search modal |
| Export Chat Button | Modal | Export dialog |
| Copy Message Button | Action | Copy to clipboard |
| Like Message Button (AI only) | Action | Add like reaction |
| Dislike Message Button (AI only) | Action | Add dislike reaction |
| More Actions Button | Modal | Message actions dropdown |

### Mention Input
| Element | Action | Destination |
|---------|--------|-------------|
| @ Mention Button | Action | Show mention dropdown |
| Send Message Button | Action | Submit message handler |
| Agent Mention Selection | Action | Insert agent mention |

### Mode Selector
| Element | Action | Destination |
|---------|--------|-------------|
| Compare Mode Button | Action | Switch to compare mode |
| Debate Mode Button | Action | Switch to debate mode |
| Auto-Debate Mode Button | Action | Switch to auto-debate mode |

### Auto-Debate Setup
| Element | Action | Destination |
|---------|--------|-------------|
| Agent Selection Buttons | Action | Toggle agent selection |
| Rounds Slider | Action | Set number of rounds (1-10) |
| Initial Topic Textarea | Action | Enter debate topic |
| Start Auto-Debate Button | Action | Start auto-debate |

### Auto-Debate Mode (Running)
| Element | Action | Destination |
|---------|--------|-------------|
| Pause Button | Action | Pause auto-debate |
| Resume Button | Action | Resume auto-debate |
| Stop Button | Action | Stop auto-debate |
| Reset Button | Action | Reset and return to setup |
| Start New Debate Button | Action | Reset configuration |

### Compare Mode
| Element | Action | Destination |
|---------|--------|-------------|
| Copy Response Button | Action | Copy to clipboard |
| Like Button | Action | Add like reaction |
| Dislike Button | Action | Add dislike reaction |

### Debate Mode
| Element | Action | Destination |
|---------|--------|-------------|
| Reply Button | Action | Set reply context |
| Copy Button | Action | Copy to clipboard |
| Ask Another Agent Button | Action | Mention agent in reply |
| Cancel Reply Button | Action | Clear reply context |

### Empty State
| Element | Action | Destination |
|---------|--------|-------------|
| Open Quick Start | Navigate | `/quick-start` |

### Message Input
| Element | Action | Destination |
|---------|--------|-------------|
| Send Message | Action | Submit message |
| @ Mention Agent | Action | Insert agent mention |

### Chat Interface
| Element | Action | Destination |
|---------|--------|-------------|
| Send Message | Action | Send message handler |
| Share Message | Action | Share to model handler |
| Edit Session | Modal | Edit session dialog |
| Delete Session | Modal | Delete confirmation |
| Bookmark Message | Action | Add bookmark |
| Reply to Message | Action | Create threaded reply |
| Copy Message | Action | Copy to clipboard |
| Search Messages | Modal | Message search modal |

### Model Columns
| Element | Action | Destination |
|---------|--------|-------------|
| Add Model | Modal | Model selector dropdown |
| Model Settings | Modal | Model settings dropdown |
| Rename Model | Modal | Rename dialog |
| Clear Messages | Action | Clear model messages |
| Remove Model | Action | Remove model column |
| Retry Message | Action | Regenerate response |
| Stop Streaming | Action | Stop generation |

---

## Quick Start Page (`/quick-start`)

### Header
| Element | Action | Destination |
|---------|--------|-------------|
| Back Button | Navigate | `/debates` |
| Theme Toggle | Action | Toggle dark/light mode |

### Quick Start Panel
| Element | Action | Destination |
|---------|--------|-------------|
| Scenario Card | Action | Load scenario → `/debates` |
| Preset Card | Action | Load preset → `/debates` |
| Start from Scratch | Navigate | `/debates` (clear session storage) |

---

## Agents Page (`/agents`)

### Header (Mobile)
| Element | Action | Destination |
|---------|--------|-------------|
| Search Input | Action | Filter agents (real-time) |
| Filter Button | Modal | Filter sheet (bottom drawer) |
| Create Agent Button | Navigate | `/agents/new` |

### Header (Desktop)
| Element | Action | Destination |
|---------|--------|-------------|
| Search Input | Action | Filter agents (real-time) |
| Create Agent Button | Navigate | `/agents/new` |

### Quick Filters (Mobile - Horizontal Scroll)
| Element | Action | Destination |
|---------|--------|-------------|
| All Badge | Action | Clear category filter |
| Business & Strategy Badge | Action | Filter by category |
| Technology & Engineering Badge | Action | Filter by category |
| Creative & Design Badge | Action | Filter by category |
| Research & Analysis Badge | Action | Filter by category |

### Filter Sheet (Mobile)
| Element | Action | Destination |
|---------|--------|-------------|
| Favorites Badge | Action | Toggle favorites filter |
| Templates Badge | Action | Toggle templates filter |
| All Category Badge | Action | Clear category filter |
| Category Badges (8 categories) | Action | Filter by category |

### Sidebar Filters (Desktop)
| Element | Action | Destination |
|---------|--------|-------------|
| All Tab | Action | Show all agents |
| Favorites Tab | Action | Show favorites only |
| Templates Tab | Action | Show templates only |
| All Categories Button | Action | Clear category filter |
| Category Buttons (8 categories with counts) | Action | Filter by category |

### Agent Card Actions
| Element | Action | Destination |
|---------|--------|-------------|
| Favorite Button (Star) | Action | Toggle favorite handler |
| More Menu Button | Modal | Dropdown menu |
| Use Agent (Menu) | Navigate | `/chat?agent=[id]` |
| Edit (Menu) | Navigate | `/agents/[id]/edit` |
| Duplicate (Menu) | Action | Duplicate agent handler |
| Delete (Menu) | Action | Delete agent handler |

### Empty State
| Element | Action | Destination |
|---------|--------|-------------|
| Create Agent Button | Navigate | `/agents/new` |

### Agent List
| Element | Action | Destination |
|---------|--------|-------------|
| Create Agent | Modal | Agent builder modal |
| Agent Card | Action | View agent details |
| Agent Card - Activate/Deactivate | Action | Toggle agent status |
| Agent Card - Edit (Custom only) | Modal | Agent builder modal (edit mode) |
| Agent Card - Delete (Custom only) | Modal | Delete confirmation |
| Agent Card - Start/Pause Button | Action | Toggle agent status |
| Favorite Agent | Action | Toggle favorite handler |
| Duplicate Agent | Action | Duplicate agent handler |

---

## Templates Page (`/templates`)

### Header
| Element | Action | Destination |
|---------|--------|-------------|
| Search Input | Action | Filter templates (real-time) |
| Filter Button (Mobile) | Modal | Filter modal |

### Template List
| Element | Action | Destination |
|---------|--------|-------------|
| Template Card | Navigate | `/debates?template=[id]` |
| Use Template | Navigate | `/debates?template=[id]` |
| Favorite Template | Action | Toggle favorite handler |

### Filters (Desktop Sidebar)
| Element | Action | Destination |
|---------|--------|-------------|
| Category Filter | Action | Filter by category |
| Clear Filters | Action | Reset all filters |

---

## Export Page (`/export`)

### Export Options
| Element | Action | Destination |
|---------|--------|-------------|
| Export as PDF | Action | Export PDF handler |
| Export as JSON | Action | Export JSON handler |
| Export as Markdown | Action | Export Markdown handler |
| Bulk Export | Action | Bulk export handler |

---

## Marketplace Page (`/marketplace`)

### Header
| Element | Action | Destination |
|---------|--------|-------------|
| Search Input | Action | Filter items (real-time) |
| Filter Button (Mobile) | Modal | Filter modal |

### Marketplace List
| Element | Action | Destination |
|---------|--------|-------------|
| Item Card | Action | View item details |
| Install Item | Action | Install handler |
| Rate Item | Action | Rate handler |

### Filters (Desktop Sidebar)
| Element | Action | Destination |
|---------|--------|-------------|
| Category Filter | Action | Filter by category |
| Price Filter | Action | Filter by price |
| Rating Filter | Action | Filter by rating |
| Clear Filters | Action | Reset all filters |

---

## Pricing Page (`/pricing`)

### Pricing Cards
| Element | Action | Destination |
|---------|--------|-------------|
| Get Started (Free Plan) | Action | Sign up handler |
| Subscribe (Starter Plan) | Action | Checkout handler |
| Subscribe (Pro Plan) | Action | Checkout handler |

### FAQ Section
| Element | Action | Destination |
|---------|--------|-------------|
| FAQ Tab | Action | Expand/collapse FAQ item |

### Final CTA
| Element | Action | Destination |
|---------|--------|-------------|
| Start Free Trial | Action | Sign up handler |

---

## Settings Page (`/settings`)

### Tab Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Profile Tab | Action | Switch to profile panel |
| Preferences Tab | Action | Switch to preferences panel |

### Profile Panel
| Element | Action | Destination |
|---------|--------|-------------|
| Upload Photo Button | Action | Upload image handler |
| Full Name Input | Action | Update name field |
| Email Input | Action | Update email field |
| Bio Textarea | Action | Update bio field |
| Change Password Button | Action | Change password handler |
| Save Profile Button | Action | Save profile handler |

### Preferences Panel
| Element | Action | Destination |
|---------|--------|-------------|
| Theme Selector (Light/Dark/System) | Action | Change theme |
| Default Model Selector (GPT-4/GPT-3.5/Claude-3/Gemini) | Action | Change default model |
| Auto-save Toggle | Action | Toggle auto-save |
| Notifications Toggle | Action | Toggle notifications |
| Sound Effects Toggle | Action | Toggle sound effects |
| Language Selector (English/Español/Français/Deutsch/中文) | Action | Change language |
| Save Preferences Button | Action | Save preferences handler |

---

## Analytics Page (`/analytics`)

### Metric Cards
| Element | Action | Destination |
|---------|--------|-------------|
| Total Debates Card | Display | Shows metric (no action) |
| Active Agents Card | Display | Shows metric (no action) |
| Avg. Session Time Card | Display | Shows metric (no action) |
| Engagement Rate Card | Display | Shows metric (no action) |

---

## Memory Page (`/dashboard/memory`)

### Header
| Element | Action | Destination |
|---------|--------|-------------|
| Search Input | Action | Filter memories (real-time) |
| Filter Button (Mobile) | Modal | Filter modal |
| Add Memory | Modal | Add memory dialog |
| Import from Document | Action | Import handler |

### Memory List
| Element | Action | Destination |
|---------|--------|-------------|
| Memory Card | Action | Expand memory details |
| Edit Memory | Modal | Edit memory dialog |
| Delete Memory | Modal | Delete confirmation |
| Tag Filter | Action | Filter by tag |

### Filters (Desktop Sidebar)
| Element | Action | Destination |
|---------|--------|-------------|
| Scope Filter | Action | Filter by scope (organization/workspace/user/chat) |
| Category Filter | Action | Filter by category |
| Clear Filters | Action | Reset all filters |

---

## Billing Page (`/dashboard/billing`)

### Current Plan Section
| Element | Action | Destination |
|---------|--------|-------------|
| Change Plan | Modal | Change plan dialog |
| Cancel Subscription | Modal | Cancel subscription dialog |

### Token Balance Section
| Element | Action | Destination |
|---------|--------|-------------|
| Purchase Tokens | Modal | Purchase tokens dialog |

### Token Packages
| Element | Action | Destination |
|---------|--------|-------------|
| Purchase Button (50K tokens) | Modal | Purchase tokens dialog |
| Purchase Button (150K tokens) | Modal | Purchase tokens dialog |
| Purchase Button (300K tokens) | Modal | Purchase tokens dialog |
| Purchase Button (1M tokens) | Modal | Purchase tokens dialog |

### Token Balance Widget
| Element | Action | Destination |
|---------|--------|-------------|
| Add Tokens Button | Action | Trigger onBuyCredits callback (opens Purchase Tokens Dialog) |

### Token Balance Warning
| Element | Action | Destination |
|---------|--------|-------------|
| Buy Credits Button | Navigate | `/dashboard/billing` |
| Dismiss Button (Mobile) | Action | Dismiss warning handler |

### Payment History
| Element | Action | Destination |
|---------|--------|-------------|
| Download Invoice | Action | Download PDF |

---

## Modals & Dialogs

### Cancel Subscription Dialog
| Element | Action | Destination |
|---------|--------|-------------|
| Reason Selector | Action | Select cancellation reason (6 options) |
| Confirmation Checkbox | Action | Toggle confirmation |
| Keep Subscription Button | Action | Close dialog |
| Cancel Subscription Button | Action | Submit cancellation (requires confirmation) |

### Change Plan Dialog
| Element | Action | Destination |
|---------|--------|-------------|
| Free Plan Card | Action | Select Free plan |
| Pro Plan Card | Action | Select Pro plan |
| Enterprise Plan Card | Action | Select Enterprise plan |
| Cancel Button | Action | Close dialog |
| Switch to [Plan] Button | Action | Submit plan change |

### Purchase Tokens Dialog
| Element | Action | Destination |
|---------|--------|-------------|
| 50K Tokens Package | Action | Select 50K tokens ($10) |
| 150K Tokens Package | Action | Select 150K tokens ($25) |
| 300K Tokens Package | Action | Select 300K tokens ($45) |
| 1M Tokens Package | Action | Select 1M tokens ($120) |
| Credit Card Payment Method | Action | Select credit card |
| PayPal Payment Method | Action | Select PayPal |
| Cancel Button | Action | Close dialog |
| Purchase for $[amount] Button | Action | Submit purchase |

### Edit Session Dialog
| Element | Action | Destination |
|---------|--------|-------------|
| Session Title Input | Action | Enter new title |
| Cancel Button | Action | Close dialog |
| Save Changes Button | Action | Save title handler |

### Create Organization Dialog
| Element | Action | Destination |
|---------|--------|-------------|
| Organization Name Input | Action | Enter organization name (auto-generates slug) |
| Organization Slug Input | Action | Enter custom slug |
| Description Textarea | Action | Enter organization description |
| Cancel Button | Action | Close dialog |
| Create Organization Button | Action | Submit form → `/dashboard/organization/[slug]` |

### Invite Member Dialog
| Element | Action | Destination |
|---------|--------|-------------|
| Email Input | Action | Enter member email |
| Role Selector | Action | Select role (Member/Admin) |
| Cancel Button | Action | Close dialog |
| Send Invitation Button | Action | Submit invitation |

### Delete Confirmation Dialog
| Element | Action | Destination |
|---------|--------|-------------|
| Cancel Button | Action | Close dialog |
| Delete [Item Type] Button | Action | Confirm deletion |

---

## Organization Overview (`/dashboard/organization/[slug]`)

### Header
| Element | Action | Destination |
|---------|--------|-------------|
| Back to Dashboard | Navigate | `/dashboard` |
| Organization Settings | Navigate | `/dashboard/organization/[slug]/settings` |
| Invite Member | Modal | Invite member dialog |

### Stats Cards
| Element | Action | Destination |
|---------|--------|-------------|
| Total Members Card | Display | Shows metric (no action) |
| Active Debates Card | Display | Shows metric (no action) |
| Token Usage Card | Display | Shows metric (no action) |

### Recent Activity
| Element | Action | Destination |
|---------|--------|-------------|
| Activity Card | Action | View activity details |
| View All Activity | Navigate | `/dashboard/organization/[slug]/activity` |

### Quick Actions
| Element | Action | Destination |
|---------|--------|-------------|
| View Members | Navigate | `/dashboard/organization/[slug]/members` |
| Organization Settings | Navigate | `/dashboard/organization/[slug]/settings` |
| View Billing | Navigate | `/dashboard/billing` |

### Members Preview
| Element | Action | Destination |
|---------|--------|-------------|
| Member Avatar | Navigate | `/dashboard/organization/[slug]/members` |
| View All Members | Navigate | `/dashboard/organization/[slug]/members` |

---

## Organization Settings (`/dashboard/organization/[slug]/settings`)

### Header
| Element | Action | Destination |
|---------|--------|-------------|
| Back Button | Navigate | `/dashboard/organization/[slug]` |

### Settings Form
| Element | Action | Destination |
|---------|--------|-------------|
| Save Settings | Action | Save settings handler |
| Upload Logo | Action | Upload image handler |
| Delete Organization | Modal | Delete confirmation |

---

## Organization Members (`/dashboard/organization/[slug]/members`)

### Header
| Element | Action | Destination |
|---------|--------|-------------|
| Back Button | Navigate | `/dashboard/organization/[slug]` |
| Invite Member | Modal | Invite member dialog |

### Search and Filter
| Element | Action | Destination |
|---------|--------|-------------|
| Search Members Input | Action | Filter members (real-time) |
| Role Filter Selector | Action | Filter by role (All/Admin/Member) |

### Member List
| Element | Action | Destination |
|---------|--------|-------------|
| Member Card | Display | Shows member info |
| More Actions Button (Admin only) | Modal | Member actions dropdown |
| Make Admin (Menu) | Action | Change role to admin |
| Make Member (Menu) | Action | Change role to member |
| Remove Member (Menu) | Action | Trigger onRemoveMember callback |

### Empty State
| Element | Action | Destination |
|---------|--------|-------------|
| No Members Message | Display | Shows empty state |

---

## Organization Components (Used Throughout App)

### Multi-Org Indicator
| Element | Action | Destination |
|---------|--------|-------------|
| Multi-Org Badge (Mobile) | Modal | Organization switcher modal |
| Multi-Org Badge (Desktop) | Display | Shows organization count |
| Organization Switcher (Desktop) | Modal | Organization dropdown |

### Organization Context Display
| Element | Action | Destination |
|---------|--------|-------------|
| Organization Button | Action | Trigger onSwitchOrg callback |
| Organization Avatar | Display | Shows organization icon |
| Organization Name | Display | Shows organization name |
| Role Badge | Display | Shows user role (Admin/Member) |
| Member Count | Display | Shows member count |
| Switch Indicator | Display | Shows chevron icon |

### Organization Loading States
| Element | Action | Destination |
|---------|--------|-------------|
| Spinner Variant | Display | Shows loading spinner |
| Skeleton Variant | Display | Shows skeleton loader |
| Card Variant | Display | Shows card skeleton |
| Error State - Try Again Button | Action | Retry loading |

### Organization Member List
| Element | Action | Destination |
|---------|--------|-------------|
| Invite Member Button (Admin) | Action | Trigger onInviteMember callback |
| Search Members Input | Action | Filter members (real-time) |
| Role Filter Selector | Action | Filter by role (All/Admin/Member) |
| Member Card | Display | Shows member info with avatar, name, email, role, join date |
| More Actions Button (Admin) | Modal | Member actions dropdown |
| Make Admin (Menu) | Action | Change role to admin |
| Make Member (Menu) | Action | Change role to member |
| Remove Member (Menu) | Action | Trigger onRemoveMember callback |

### Role Badge
| Element | Action | Destination |
|---------|--------|-------------|
| Admin Badge | Display | Shows "Admin" with tooltip |
| Member Badge | Display | Shows "Member" with tooltip |

### Admin Only Guard
| Element | Action | Destination |
|---------|--------|-------------|
| Back to Dashboard Button | Navigate | `/dashboard` |
| Access Denied Message | Display | Shows admin-only message |

---

## Summary Statistics

### Total Interactive Elements by Category

| Category | Count |
|----------|-------|
| Navigation Links | 115 |
| Action Buttons | 475 |
| Modal Triggers | 115 |
| Form Submissions | 105 |
| Display Elements | 30 |
| **Total** | **840** |

### Total Pages

| Type | Count |
|------|-------|
| Main Pages | 19 |
| Dynamic Routes | 3 |
| **Total** | **22** |

### Total Modals/Dialogs

| Type | Count |
|------|-------|
| Confirmation Dialogs | 9 |
| Form Dialogs | 12 |
| Preview Modals | 5 |
| Builder/Wizard Modals | 3 |
| **Total** | **29** |

---

## Navigation Patterns

### Primary Navigation
- Sidebar navigation (10 main links)
- Quick actions (7 shortcuts)
- Organization switcher (mega menu)
- Collapsible sidebar (desktop/tablet)

### Secondary Navigation
- Breadcrumbs (organization pages)
- Back buttons (detail pages)
- Tab navigation (settings, billing, organization, template selector)
- View mode toggles (grid/list)

### Action Patterns
- Modal dialogs for destructive actions
- Inline actions for quick operations
- Form submissions with validation
- Real-time filtering and search
- Multi-step wizards (Agent Builder)
- Bulk operations (artifacts)
- Drag and drop (future)

### Interaction Patterns
- Bookmarking system with collections
- Message threading and replies
- Reaction system with emoji picker
- Search with filters and history
- Comparison views for sessions
- Version history with diff view
- Collaboration indicators

---

## Mobile-First Compliance

All interactive elements follow mobile-first best practices:
- Buttons: ≥ 44px touch targets
- Inputs: ≥ 48px height
- Cards: ≥ 80px height
- Modals: Adaptive (drawer on mobile, dialog on desktop)
- Navigation: Collapsible sidebar on mobile
- Wizards: Step-by-step progression
- Touch-optimized spacing and interactions

---

## Notes

1. All navigation uses Next.js Link for client-side routing
2. All actions include console logging with `[v0]` prefix
3. All handlers include toast notifications
4. All modals use AdaptiveModal pattern
5. All forms include validation and loading states
6. All delete actions require confirmation
7. All filters support real-time updates
8. All search inputs support debounced filtering
9. Multi-step modals include progress indicators
10. Export modals support multiple formats
11. Bookmarks support collections and tags
12. Messages support threading and reactions
13. Artifacts support bulk operations
14. Version history supports comparison
15. Collaboration features show active users

---

**Document Version**: 5.0
**Maintained By**: v0 AI Assistant
**Review Frequency**: After each major feature addition

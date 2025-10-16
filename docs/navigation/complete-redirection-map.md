# Complete Redirection Map - AnyDebateAI

## Overview
This document maps every button, link, and interactive element in the AnyDebateAI application, documenting their actions and destinations.

**Last Updated**: January 2025
**Total Pages**: 22
**Total Interactive Elements**: 600+
**Total Modals/Dialogs**: 26

---

## Landing Page (`/`)

| Element | Action | Destination |
|---------|--------|-------------|
| Auto-redirect (non-demo mode) | Navigate | `/dashboard` |
| Try AnyDebate Button (Hero Mobile) | Action | Exit demo mode → `/dashboard` |
| Watch Demo Button (Hero Mobile) | Action | Scroll to `#interactive-demo` |
| Try AnyDebate Button (Hero Desktop) | Action | Exit demo mode → `/dashboard` |
| Watch Demo Button (Hero Desktop) | Action | Scroll to `#interactive-demo` |
| Try the Demo Now Button (Final CTA) | Action | Exit demo mode → `/dashboard` |

---

## Dashboard Home (`/dashboard`)

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
| Create Agent | Navigate | `/agents` |
| Agent Card | Navigate | `/agents?edit=[id]` |
| Favorite Button | Action | Toggle favorite handler |
| Delete Button | Modal | Delete confirmation |
| Show Favorites Only Toggle | Action | Filter favorites |

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

### Mode Selector
| Element | Action | Destination |
|---------|--------|-------------|
| Compare Mode | Action | Switch to compare mode |
| Debate Mode | Action | Switch to debate mode |
| Auto-Debate Mode | Action | Switch to auto-debate mode |

### Compare Mode
| Element | Action | Destination |
|---------|--------|-------------|
| Copy Response | Action | Copy to clipboard |
| Like Response | Action | Add like reaction |
| Dislike Response | Action | Add dislike reaction |

### Debate Mode
| Element | Action | Destination |
|---------|--------|-------------|
| Reply to Message | Action | Set reply context |
| Copy Message | Action | Copy to clipboard |
| Ask Another Agent | Action | Mention agent in reply |
| Cancel Reply | Action | Clear reply context |

### Auto-Debate Mode
| Element | Action | Destination |
|---------|--------|-------------|
| Pause Debate | Action | Pause auto-debate |
| Resume Debate | Action | Resume auto-debate |
| Stop Debate | Action | Stop auto-debate |
| Reset Debate | Action | Reset and start new |
| Start New Debate | Action | Reset configuration |

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
| Save Profile | Action | Save profile handler |
| Upload Avatar | Action | Upload image handler |
| Change Password | Action | Change password handler |

### Preferences Panel
| Element | Action | Destination |
|---------|--------|-------------|
| Save Preferences | Action | Save preferences handler |
| Theme Toggle | Action | Toggle dark/light mode |
| Language Selector | Action | Change language |
| Notification Settings | Action | Update notification preferences |

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

### Payment History
| Element | Action | Destination |
|---------|--------|-------------|
| Download Invoice | Action | Download PDF |

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
| Search Members | Action | Filter members (real-time) |

### Member List
| Element | Action | Destination |
|---------|--------|-------------|
| Member Card | Action | View member details |
| Change Role | Action | Change role handler |
| Remove Member | Modal | Remove confirmation |
| Resend Invitation | Action | Resend invite handler |

---

## Sessions Page (`/sessions`)

### Header
| Element | Action | Destination |
|---------|--------|-------------|
| Search Sessions | Action | Filter sessions (real-time) |
| Create New Session | Navigate | `/chat/new` |

### Session List
| Element | Action | Destination |
|---------|--------|-------------|
| Session Card | Navigate | `/chat?session=[id]` |
| Resume Session | Navigate | `/chat?session=[id]` |
| Archive Session | Action | Toggle archive status |
| Delete Session | Modal | Delete confirmation |

---

## Messages Page (`/messages`)

### Header
| Element | Action | Destination |
|---------|--------|-------------|
| Search Messages | Action | Filter messages (real-time) |

### Message List
| Element | Action | Destination |
|---------|--------|-------------|
| Message Card | Action | Expand message details |
| Reply to Message | Action | Reply handler |
| Like Message | Action | Add like reaction |
| Dislike Message | Action | Add dislike reaction |
| Bookmark Message | Action | Toggle bookmark |
| Load More | Action | Load more messages |

---

## Artifacts Page (`/artifacts`)

### Header
| Element | Action | Destination |
|---------|--------|-------------|
| Search Artifacts | Action | Filter artifacts (real-time) |
| Grid View | Action | Switch to grid view |
| List View | Action | Switch to list view |

### Filters
| Element | Action | Destination |
|---------|--------|-------------|
| All Types Tab | Action | Show all artifacts |
| Documents Tab | Action | Filter by documents |
| Tables Tab | Action | Filter by data tables |
| Lists Tab | Action | Filter by checklists |
| Charts Tab | Action | Filter by charts |
| Folder Selector | Action | Filter by folder |
| Sort By Selector | Action | Change sort order |
| Favorites Toggle | Action | Show favorites only |

### Artifact List
| Element | Action | Destination |
|---------|--------|-------------|
| Artifact Card | Action | Select artifact |
| Toggle Favorite | Action | Add/remove favorite |
| Edit Artifact | Modal | Edit artifact dialog |
| Move to Folder | Modal | Folder selector dropdown |
| Delete Artifact | Modal | Delete confirmation |

### Bulk Actions
| Element | Action | Destination |
|---------|--------|-------------|
| Move to Folder | Modal | Folder selector dropdown |
| Add Tag | Modal | Tag selector dropdown |
| Cancel Selection | Action | Clear selection |

---

## Agent Builder Modal

### Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Previous Button | Action | Go to previous step |
| Next Button | Action | Go to next step |
| Create Agent Button | Action | Save agent configuration |
| Close Modal | Action | Close modal |

### Step 1: Role Selector
| Element | Action | Destination |
|---------|--------|-------------|
| Search Roles Input | Action | Filter roles (real-time) |
| All Categories Button | Action | Show all roles |
| Business & Strategy Button | Action | Filter by category |
| Technology & Engineering Button | Action | Filter by category |
| Creative & Design Button | Action | Filter by category |
| Research & Analysis Button | Action | Filter by category |
| Communication & Media Button | Action | Filter by category |
| Education & Training Button | Action | Filter by category |
| Healthcare & Science Button | Action | Filter by category |
| Legal & Compliance Button | Action | Filter by category |
| Role Card | Action | Select role |

### Step 2: Persona Selector
| Element | Action | Destination |
|---------|--------|-------------|
| Search Personas Input | Action | Filter personas (real-time) |
| Persona Card | Action | Select persona |

### Step 3: Framework Selector
| Element | Action | Destination |
|---------|--------|-------------|
| Search Frameworks Input | Action | Filter frameworks (real-time) |
| All Tab | Action | Show all frameworks |
| Analysis Tab | Action | Filter by analysis frameworks |
| Creative Tab | Action | Filter by creative frameworks |
| Strategic Tab | Action | Filter by strategic frameworks |
| Framework Card | Action | Select framework |

### Step 4: Agent Preview
| Element | Action | Destination |
|---------|--------|-------------|
| Agent Name Input | Action | Set agent name |
| Custom Instructions Textarea | Action | Set custom instructions |

---

## Summary Statistics

### Total Interactive Elements by Category

| Category | Count |
|----------|-------|
| Navigation Links | 110 |
| Action Buttons | 320 |
| Modal Triggers | 85 |
| Form Submissions | 65 |
| Display Elements | 20 |
| **Total** | **600** |

### Total Pages

| Type | Count |
|------|-------|
| Main Pages | 19 |
| Dynamic Routes | 3 |
| **Total** | **22** |

### Total Modals/Dialogs

| Type | Count |
|------|-------|
| Confirmation Dialogs | 8 |
| Form Dialogs | 10 |
| Preview Modals | 5 |
| Builder/Wizard Modals | 3 |
| **Total** | **26** |

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

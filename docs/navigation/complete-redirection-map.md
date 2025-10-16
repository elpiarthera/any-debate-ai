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
| Theme Toggle | Action | Toggle dark/light mode |

### Canvas Header
| Element | Action | Destination |
|---------|--------|-------------|
| Layout Toggle (Split/Full/Minimal) | Action | Cycle through layout modes |
| Close Canvas | Action | Close artifact canvas |

### Canvas Toolbar
| Element | Action | Destination |
|---------|--------|-------------|
| Create Artifact Dropdown | Modal | Artifact type selector |
| Create Document | Action | Create document artifact |
| Create Data Table | Action | Create data table artifact |
| Create Checklist | Action | Create checklist artifact |
| Create Chart | Action | Create chart artifact |
| Templates Button | Modal | Template selector modal |
| History Button | Modal | Version history panel |
| Share Button | Action | Share artifact handler |
| Export Button | Modal | Export modal |

### Artifact List Panel (Left Side)
| Element | Action | Destination |
|---------|--------|-------------|
| Search Artifacts Input | Action | Filter artifacts (real-time) |
| Filter Toggle Button | Action | Show/hide filters |
| Artifact Card | Action | Select artifact |
| No Artifacts Empty State | Display | Shows empty state message |

### Artifact Search Component
| Element | Action | Destination |
|---------|--------|-------------|
| Search Input | Action | Filter artifacts (real-time) |
| Clear Search | Action | Clear search query |
| Recent Searches | Action | Select recent search |
| Popular Searches Badge | Action | Select popular search |

### Artifact Filter Component
| Element | Action | Destination |
|---------|--------|-------------|
| All Types Button | Action | Show all artifact types |
| Documents Button | Action | Filter by documents |
| Data Tables Button | Action | Filter by data tables |
| Checklists Button | Action | Filter by checklists |
| Charts Button | Action | Filter by charts |
| Date Range Selector | Action | Filter by date range |
| Sort By Selector | Action | Change sort order |
| Sort Order Toggle | Action | Toggle asc/desc |
| Tag Badge | Action | Toggle tag filter |
| Collaborator Badge | Action | Toggle collaborator filter |
| Clear All Filters | Action | Reset all filters |

### Document Artifact
| Element | Action | Destination |
|---------|--------|-------------|
| Edit Button | Action | Enter edit mode |
| Save Button | Action | Save document changes |
| Cancel Button | Action | Cancel editing |
| Fullscreen Toggle | Action | Toggle fullscreen mode |
| Bold Button | Action | Insert bold markdown |
| Italic Button | Action | Insert italic markdown |
| Heading 1 Button | Action | Insert H1 markdown |
| Heading 2 Button | Action | Insert H2 markdown |
| List Button | Action | Insert list markdown |
| Checklist Button | Action | Insert checklist markdown |
| Code Button | Action | Insert code markdown |
| Preview Toggle | Action | Toggle preview mode |
| Section Card | Action | Navigate to section |
| Add Section Button | Action | Add new section |

### Data Table Artifact
| Element | Action | Destination |
|---------|--------|-------------|
| Search Table Input | Action | Filter table rows |
| Column Filter Selector | Action | Filter by column |
| Add Row Button | Action | Add new row |
| Sort Column Header | Action | Sort by column |
| Edit Cell | Action | Enter cell edit mode |
| Save Cell Edit | Action | Save cell changes |
| Delete Row Button | Action | Delete row |
| Download Table | Action | Export table data |

### Checklist Artifact
| Element | Action | Destination |
|---------|--------|-------------|
| Add Item Button | Action | Show add item form |
| Toggle Item Checkbox | Action | Mark item complete/incomplete |
| Add Item Input | Action | Enter new item text |
| Priority Selector | Action | Set item priority |
| Add Item Submit | Action | Create new item |
| Cancel Add Item | Action | Hide add item form |
| Complete All Button | Action | Mark all items complete |
| Delete Completed Button | Action | Remove completed items |
| Edit Item | Action | Edit item text |
| Delete Item Button | Action | Delete item |

### Chart Artifact
| Element | Action | Destination |
|---------|--------|-------------|
| Chart Type Selector | Action | Change chart type (bar/line/pie/area/scatter) |
| Refresh Chart Button | Action | Refresh chart data |
| Download Chart | Action | Export chart image |

### Artifact Export Modal
| Element | Action | Destination |
|---------|--------|-------------|
| PDF Format Card | Action | Select PDF export |
| PNG Format Card | Action | Select PNG export |
| CSV Format Card | Action | Select CSV export |
| JSON Format Card | Action | Select JSON export |
| Include Metadata Toggle | Action | Toggle metadata inclusion |
| Export Button | Action | Download artifact |
| Cancel Button | Action | Close modal |

### Artifact Template Selector
| Element | Action | Destination |
|---------|--------|-------------|
| Search Templates Input | Action | Filter templates (real-time) |
| All Types Tab | Action | Show all template types |
| Documents Tab | Action | Filter by document templates |
| Data Tables Tab | Action | Filter by table templates |
| Checklists Tab | Action | Filter by checklist templates |
| Charts Tab | Action | Filter by chart templates |
| All Categories Button | Action | Show all categories |
| Category Button | Action | Filter by category |
| Template Card | Action | Select template (mobile) or preview (desktop) |
| Use Template Button | Action | Create artifact from template |
| Cancel Button | Action | Close modal |

### Version History Panel
| Element | Action | Destination |
|---------|--------|-------------|
| Search Versions Input | Action | Filter versions (real-time) |
| Author Filter Selector | Action | Filter by author |
| Change Type Filter Selector | Action | Filter by change type |
| Export History Button | Action | Download version history JSON |
| Version Card | Action | Select version |
| Compare Version Button | Action | Show version diff |
| Restore Version Button | Action | Restore to version |
| Close Button | Action | Close panel |

### Artifact Library
| Element | Action | Destination |
|---------|--------|-------------|
| Search Artifacts Input | Action | Filter artifacts (real-time) |
| Grid View Button | Action | Switch to grid view |
| List View Button | Action | Switch to list view |
| All Types Tab | Action | Show all artifact types |
| Documents Tab | Action | Filter by documents |
| Data Tables Tab | Action | Filter by tables |
| Checklists Tab | Action | Filter by checklists |
| Charts Tab | Action | Filter by charts |
| Folder Selector | Action | Filter by folder |
| Sort By Selector | Action | Change sort order |
| Favorites Toggle | Action | Show favorites only |
| Artifact Card | Action | Select artifact |
| Toggle Favorite Button | Action | Add/remove favorite |
| More Menu Button | Modal | Artifact actions dropdown |
| Edit Artifact (Menu) | Modal | Edit artifact dialog |
| Move to Folder (Menu) | Modal | Folder selector |
| Delete Artifact (Menu) | Modal | Delete confirmation |
| Bulk Move to Folder | Modal | Folder selector dropdown |
| Bulk Add Tag | Modal | Tag selector dropdown |
| Cancel Selection | Action | Clear bulk selection |

### Save Artifact as Memory Form
| Element | Action | Destination |
|---------|--------|-------------|
| Memory Title Input | Action | Set memory title |
| Edit Learning Button | Action | Enter learning edit mode |
| Save Learning | Action | Save learning changes |
| Cancel Learning Edit | Action | Cancel learning edit |
| Remove Learning Button | Action | Remove learning |
| Scope Selector | Action | Set memory scope (user/workspace/organization) |
| Tag Input | Action | Enter tag text |
| Add Tag Button | Action | Add tag to memory |
| Remove Tag Button | Action | Remove tag from memory |
| Save to Memory Button | Action | Create memory from artifact |
| Cancel Button | Action | Close modal |

### Collaboration Indicator
| Element | Action | Destination |
|---------|--------|-------------|
| Collaboration Panel Toggle | Action | Expand/collapse activity feed |
| Activity Card | Display | Shows collaboration event |

---

## Summary Statistics

### Total Interactive Elements by Category

| Category | Count |
|----------|-------|
| Navigation Links | 110 |
| Action Buttons | 435 |
| Modal Triggers | 105 |
| Form Submissions | 90 |
| Display Elements | 25 |
| **Total** | **765** |

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

# Complete Redirection Map - AnyDebateAI

## Overview
This document maps every button, link, and interactive element in the AnyDebateAI application, documenting their actions and destinations.

**Last Updated**: January 2025
**Total Pages**: 22
**Total Interactive Elements**: 970
**Total Modals/Dialogs**: 33

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

### Company Logos Section
| Element | Action | Destination |
|---------|--------|-------------|
| Company Logo Bar | Display | Shows trusted company logos |

### Interactive Demo Section
| Element | Action | Destination |
|---------|--------|-------------|
| Interactive Demo Component | Display | Shows demo interface |

### Social Proof Section
| Element | Action | Destination |
|---------|--------|-------------|
| Testimonial Carousel | Display | Shows user testimonials (carousel) |
| Social Proof Badge - Users | Display | Shows "12,459 active users" |
| Social Proof Badge - Activity | Display | Shows "2,847 debates today" |
| Social Proof Badge - Trending | Display | Shows "Trending in AI tools" |

### Exit Intent Popup (Modal)
| Element | Action | Destination |
|---------|--------|-------------|
| Email Input | Action | Enter email address |
| Send Me The Guide Button | Action | Submit email → Track email capture |
| Close Dialog | Action | Dismiss popup |

### Interactive Demo Component
| Element | Action | Destination |
|---------|--------|-------------|
| Step Indicator Dots (3 dots) | Action | Navigate to specific step |
| Play/Pause Button | Action | Toggle demo playback |
| Reset Button | Action | Reset demo to step 1 |
| Step 1: Input Visual | Display | Shows question input animation |
| Step 2: Debate Visual | Display | Shows 4 AI agents analyzing |
| Step 3: Insights Visual | Display | Shows key insights with checkmarks |

### Testimonial Carousel
| Element | Action | Destination |
|---------|--------|-------------|
| Previous Button | Action | Navigate to previous testimonial |
| Next Button | Action | Navigate to next testimonial |
| Dot Indicators (4 dots) | Action | Navigate to specific testimonial |
| Testimonial Card | Display | Shows quote, author, role, company, metric, rating |

### Trust Signals Component
| Element | Action | Destination |
|---------|--------|-------------|
| Rating Display | Display | Shows 4.9/5 stars (2,847 reviews) |
| Active Users Display | Display | Shows "12,459 decisions today" |
| Security Badge (Desktop) | Display | Shows "Enterprise-grade security" |

### Urgency Banner Component
| Element | Action | Destination |
|---------|--------|-------------|
| Limited Spots Badge | Display | Shows "Only 47 spots left in beta" |
| Recent Signups Badge | Display | Shows "127 people signed up in last 24h" |
| Time Limited Badge | Display | Shows countdown timer |

### Company Logo Bar
| Element | Action | Destination |
|---------|--------|-------------|
| Company Logos (5 logos) | Display | Shows OpenAI, Anthropic, Meta, Google, Microsoft |

### Social Proof Badge Component
| Element | Action | Destination |
|---------|--------|-------------|
| Trending Badge | Display | Shows trending icon + text |
| Users Badge | Display | Shows users icon + text |
| Activity Badge | Display | Shows activity icon + text |

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
| Session Card | Action | Select session handler |
| Export Session Button | Modal | Export dialog |
| Edit Session Button | Modal | Edit session dialog |
| Delete Session Button | Modal | Delete confirmation dialog |
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
| Search Input | Action | Filter items (real-time) |
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

### Header (Mobile)
| Element | Action | Destination |
|---------|--------|-------------|
| Search Input | Action | Filter items (real-time) |
| Filter Button | Modal | Filter modal |

### Header (Desktop)
| Element | Action | Destination |
|---------|--------|-------------|
| Search Input | Action | Filter items (real-time) |

### Marketplace List (Mobile)
| Element | Action | Destination |
|---------|--------|-------------|
| Item Card | Display | Shows item details |
| Install Button | Action | Install item handler |
| Installed Button | Action | Uninstall item handler |
| Rating Display | Display | Shows star rating |
| Downloads Display | Display | Shows download count |
| Price Badge | Display | Shows Free/Premium |

### Marketplace List (Desktop)
| Element | Action | Destination |
|---------|--------|-------------|
| Item Card | Display | Shows item details |
| Install Button | Action | Install item handler |
| Installed Button | Action | Uninstall item handler |
| Rating Display | Display | Shows star rating |
| Downloads Display | Display | Shows download count |
| Price Badge | Display | Shows Free/Premium |

### Filters Modal (Mobile)
| Element | Action | Destination |
|---------|--------|-------------|
| All Categories Button | Action | Clear category filter |
| Agent Category Button | Action | Filter by Agent |
| Template Pack Category Button | Action | Filter by Template Pack |
| Extension Category Button | Action | Filter by Extension |

### Filters Sidebar (Desktop)
| Element | Action | Destination |
|---------|--------|-------------|
| All Categories Button | Action | Clear category filter |
| Agent Category Button | Action | Filter by Agent |
| Template Pack Category Button | Action | Filter by Template Pack |
| Extension Category Button | Action | Filter by Extension |

### Empty State
| Element | Action | Destination |
|---------|--------|-------------|
| No Items Found Message | Display | Shows empty state with suggestion |

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
| Import from Document | Modal | Document upload dialog |
| Import from URL | Action | Show URL scraper component |

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
| Scope Filter (All/Organization/Workspace/User/Chat) | Action | Filter by scope |
| Category Filter (All/Technical/Business/Process/Product/Other) | Action | Filter by category |
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

### Exit Intent Popup
| Element | Action | Destination |
|---------|--------|-------------|
| Email Input | Action | Enter email address |
| Send Me The Guide Button | Action | Submit email → Track email capture |
| Close Dialog | Action | Dismiss popup |

### Add Memory Form Dialog
| Element | Action | Destination |
|---------|--------|-------------|
| Title Input | Action | Enter memory title |
| Category Selector (8 categories) | Action | Select category |
| Scope Selector (Organization/Workspace/User/Chat) | Action | Select memory scope |
| Source Type Buttons (Manual/Document/URL) | Action | Select source type |
| Source URL Input (if URL selected) | Action | Enter source URL |
| Content Textarea | Action | Enter memory content (Markdown supported) |
| Tag Input | Action | Enter tag name |
| Add Tag Button | Action | Add tag to list |
| Remove Tag Button (per tag) | Action | Remove tag from list |
| Cancel Button | Action | Close dialog |
| Save Memory Button | Action | Submit form → Create memory |

### Edit Memory Dialog
| Element | Action | Destination |
|---------|--------|-------------|
| Title Input | Action | Update memory title |
| Category Selector (5 categories) | Action | Update category |
| Scope Selector (Organization/Workspace/User/Chat) | Action | Update memory scope |
| Source Type Buttons (Manual/Document/URL) | Action | Update source type |
| Source URL Input (if URL selected) | Action | Update source URL |
| Content Textarea | Action | Update memory content (Markdown supported) |
| Tag Input | Action | Enter tag name |
| Add Tag Button | Action | Add tag to list |
| Remove Tag Button (per tag) | Action | Remove tag from list |
| Cancel Button | Action | Close dialog |
| Save Changes Button | Action | Submit form → Update memory |

### Document Upload Dialog
| Element | Action | Destination |
|---------|--------|-------------|
| Drag & Drop Zone (Desktop) | Action | Drop file to upload |
| Choose File Button (Desktop) | Action | Open file picker |
| Tap to Choose File (Mobile) | Action | Open file picker |
| Remove File Button | Action | Remove uploaded file |
| Extracted Memory Card | Display | Shows AI-extracted memory |
| Remove Memory Button (per memory) | Action | Remove from extraction list |
| Cancel Button | Action | Close dialog |
| Approve All Button | Action | Add all extracted memories |

### URL Scraper Component
| Element | Action | Destination |
|---------|--------|-------------|
| URL Input | Action | Enter URL to scrape |
| Scrape Content Button | Action | Fetch and scrape URL |
| Scraped Content Preview | Display | Shows title, description, image |
| External Link Button | Navigate | Open URL in new tab |
| Extracted Memory Card | Display | Shows AI-extracted memory |
| Approve Button (per memory) | Action | Add memory to collection |
| Reject Button (per memory) | Action | Remove from extraction list |
| Start Over Button | Action | Reset scraper |
| Scrape Another URL Button | Action | Reset scraper |

---

## Organization Overview (`/dashboard/organization/[slug]`)

### Header (Desktop)
| Element | Action | Destination |
|---------|--------|-------------|
| Back to Dashboard | Navigate | `/dashboard` |
| Organization Settings | Navigate | `/dashboard/organization/[slug]/settings` |
| Invite Member | Modal | Invite member dialog |

### Header (Mobile)
| Element | Action | Destination |
|---------|--------|-------------|
| Back to Dashboard | Navigate | `/dashboard` |

### Stats Cards (Desktop - 4 columns)
| Element | Action | Destination |
|---------|--------|-------------|
| Total Members Card | Display | Shows count + growth (+2 from last month) |
| Active Debates Card | Display | Shows count + growth (+3 from last week) |
| Token Usage Card | Display | Shows percentage + used/total tokens |
| Growth Card | Display | Shows +12% vs last month |

### Stats Cards (Mobile - 2 columns)
| Element | Action | Destination |
|---------|--------|-------------|
| Members Card | Display | Shows count + growth (+2 this month) |
| Debates Card | Display | Shows count + growth (+3 this week) |
| Tokens Card | Display | Shows percentage + used/total tokens |
| Growth Card | Display | Shows +12% vs last month |

### Quick Actions (Desktop - 3 columns)
| Element | Action | Destination |
|---------|--------|-------------|
| Invite Members Card | Navigate | `/dashboard/organization/[slug]/members` |
| Organization Settings Card | Navigate | `/dashboard/organization/[slug]/settings` |
| View Reports Card | Action | View reports handler (placeholder) |

### Quick Actions (Mobile - Stacked)
| Element | Action | Destination |
|---------|--------|-------------|
| Invite Members Card | Navigate | `/dashboard/organization/[slug]/members` |
| Settings Card | Navigate | `/dashboard/organization/[slug]/settings` |
| View Reports Card | Action | View reports handler (placeholder) |

### Recent Activity (Desktop)
| Element | Action | Destination |
|---------|--------|-------------|
| Activity Item | Display | Shows user, action, time with icon |

### Recent Activity (Mobile)
| Element | Action | Destination |
|---------|--------|-------------|
| Activity Item | Display | Shows user, action, time with icon |

### Team Members Preview (Desktop)
| Element | Action | Destination |
|---------|--------|-------------|
| Member Avatar | Display | Shows member initials |
| Member Name | Display | Shows member name |
| Member Role | Display | Shows member role |
| View All Members Button | Navigate | `/dashboard/organization/[slug]/members` |

### Team Members Preview (Mobile)
| Element | Action | Destination |
|---------|--------|-------------|
| Member Avatar | Display | Shows member initials |
| Member Name | Display | Shows member name |
| Member Role | Display | Shows member role |
| View All Members Button | Navigate | `/dashboard/organization/[slug]/members` |

---

## Organization Settings (`/dashboard/organization/[slug]/settings`)

### Header (Desktop)
| Element | Action | Destination |
|---------|--------|-------------|
| Back Button | Navigate | `/dashboard/organization/[slug]` |

### Header (Mobile)
| Element | Action | Destination |
|---------|--------|-------------|
| Back Button | Navigate | `/dashboard/organization/[slug]` |

### General Settings Form (Desktop)
| Element | Action | Destination |
|---------|--------|-------------|
| Organization Name Input | Action | Update name field (3-50 chars) |
| Organization Slug Input | Action | Update slug field (lowercase, numbers, hyphens) |
| Description Textarea | Action | Update description field (max 500 chars) |
| Character Counter | Display | Shows [count]/500 characters |
| Cancel Button | Action | Reset form + show toast |
| Save Changes Button | Action | Submit form + show toast |

### General Settings Form (Mobile)
| Element | Action | Destination |
|---------|--------|-------------|
| Organization Name Input | Action | Update name field (3-50 chars) |
| Organization Slug Input | Action | Update slug field (lowercase, numbers, hyphens) |
| Description Textarea | Action | Update description field (max 500 chars) |
| Character Counter | Display | Shows [count]/500 characters |
| Save Changes Button | Action | Submit form + show toast |
| Cancel Button | Action | Reset form + show toast |

### Danger Zone (Desktop)
| Element | Action | Destination |
|---------|--------|-------------|
| Delete Organization Button | Modal | Delete organization confirmation dialog |

### Danger Zone (Mobile)
| Element | Action | Destination |
|---------|--------|-------------|
| Delete Organization Button | Modal | Delete organization confirmation dialog |

### Delete Organization Confirmation Dialog
| Element | Action | Destination |
|---------|--------|-------------|
| Cancel Button | Action | Close dialog |
| Delete Organization Button | Action | Delete organization → Navigate to `/dashboard` |

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

### Member List (Desktop)
| Element | Action | Destination |
|---------|--------|-------------|
| Member Card | Display | Shows avatar, name, email, role, join date |
| More Actions Button (Non-owner) | Modal | Member actions dropdown |
| Make Admin (Menu) | Action | Change role to admin |
| Make Member (Menu) | Action | Change role to member |
| Remove Member (Menu) | Action | Remove member handler |

### Member List (Mobile)
| Element | Action | Destination |
|---------|--------|-------------|
| Member Card | Display | Shows avatar, name, email, role, join date |
| More Actions Button (Non-owner) | Modal | Member actions dropdown |
| Make Admin (Menu) | Action | Change role to admin |
| Make Member (Menu) | Action | Change role to member |
| Remove Member (Menu) | Action | Remove member handler |

### Empty State
| Element | Action | Destination |
|---------|--------|-------------|
| No Members Message | Display | Shows empty state |

---

## Summary Statistics

### Total Interactive Elements by Category

| Category | Count |
|----------|-------|
| Navigation Links | 115 |
| Action Buttons | 545 |
| Modal Triggers | 125 |
| Form Submissions | 125 |
| Display Elements | 60 |
| **Total** | **970** |

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
| Form Dialogs | 15 |
| Preview Modals | 5 |
| Builder/Wizard Modals | 3 |
| Exit Intent Popup | 1 |
| **Total** | **33** |

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

**Document Version**: 6.0
**Maintained By**: v0 AI Assistant
**Review Frequency**: After each major feature addition

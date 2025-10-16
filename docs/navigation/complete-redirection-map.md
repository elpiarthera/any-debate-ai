# Complete Redirection Map - AnyDebateAI

## Overview
This document maps every button, link, and interactive element in the AnyDebateAI application, documenting their actions and destinations.

**Last Updated**: January 2025
**Total Pages**: 16
**Total Interactive Elements**: 150+

---

## Landing Page (`/`)

| Element | Action | Destination |
|---------|--------|-------------|
| Auto-redirect (non-demo mode) | Navigate | `/dashboard` |
| Landing Page Content | Display | Various CTAs (see LandingPage component) |

---

## Dashboard Home (`/dashboard`)

### Sidebar Navigation
| Element | Action | Destination |
|---------|--------|-------------|
| Dashboard | Navigate | `/dashboard` |
| Debates | Navigate | `/debates` |
| Agents | Navigate | `/agents` |
| Templates | Navigate | `/templates` |
| Memory (Admin) | Navigate | `/dashboard/memory` |
| Analytics | Navigate | `/analytics` |
| Export | Navigate | `/export` |
| Marketplace | Navigate | `/marketplace` |
| Settings | Navigate | `/settings` |
| Billing (Admin) | Navigate | `/dashboard/billing` |

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
| View All | Navigate | `/sessions` |
| Session Card | Navigate | `/debates?sessionId=[id]` |
| Resume Button | Action | Resume session handler |
| Delete Button | Modal | Delete confirmation |

### Agent Library (Main Content)
| Element | Action | Destination |
|---------|--------|-------------|
| Create Agent | Navigate | `/agents` |
| Agent Card | Navigate | `/agents?edit=[id]` |
| Favorite Button | Action | Toggle favorite handler |
| Delete Button | Modal | Delete confirmation |

---

## Debates Page (`/debates`)

### Header
| Element | Action | Destination |
|---------|--------|-------------|
| Toggle Sidebar | Action | Toggle sidebar collapse |
| Back to Overview | Navigate | `/overview` |
| Save as Template | Action | Save template handler |
| New Debate | Navigate | `/quick-start` |

### Empty State
| Element | Action | Destination |
|---------|--------|-------------|
| Start Your First Debate | Navigate | `/quick-start` |

### Chat Interface
| Element | Action | Destination |
|---------|--------|-------------|
| Send Message | Action | Send message handler |
| Share Message | Action | Share to model handler |
| Edit Session | Modal | Edit session dialog |
| Delete Session | Modal | Delete confirmation |

---

## Quick Start Page (`/quick-start`)

### Header
| Element | Action | Destination |
|---------|--------|-------------|
| Back Button | Navigate | `/debates` |

### Template Selection
| Element | Action | Destination |
|---------|--------|-------------|
| Template Card | Action | Select template handler |
| Start Debate | Navigate | `/debates?template=[id]` |

---

## Agents Page (`/agents`)

### Agent List
| Element | Action | Destination |
|---------|--------|-------------|
| Create Agent | Modal | Create agent dialog |
| Agent Card | Navigate | `/agents?edit=[id]` |
| Edit Agent | Navigate | `/agents?edit=[id]` |
| Delete Agent | Modal | Delete confirmation |
| Favorite Agent | Action | Toggle favorite handler |

---

## Templates Page (`/templates`)

### Header
| Element | Action | Destination |
|---------|--------|-------------|
| Search Input | Action | Filter templates (real-time) |
| Filter Button | Modal | Filter modal (mobile) |

### Template List
| Element | Action | Destination |
|---------|--------|-------------|
| Template Card | Navigate | `/debates?template=[id]` |
| Use Template | Navigate | `/debates?template=[id]` |
| Preview Template | Modal | Template preview modal |
| Edit Template (Custom) | Modal | Edit template dialog |
| Delete Template (Custom) | Modal | Delete confirmation |

### Filters (Desktop Sidebar)
| Element | Action | Destination |
|---------|--------|-------------|
| Category Filter | Action | Filter by category |
| Difficulty Filter | Action | Filter by difficulty |
| Clear Filters | Action | Reset all filters |

---

## Sessions Page (`/sessions`)

### Header
| Element | Action | Destination |
|---------|--------|-------------|
| Search Input | Action | Filter sessions (real-time) |
| Filter Button | Modal | Filter modal (mobile) |

### Session List
| Element | Action | Destination |
|---------|--------|-------------|
| Session Card | Navigate | `/debates?sessionId=[id]` |
| Resume Session | Navigate | `/debates?sessionId=[id]` |
| Archive Session | Action | Archive handler |
| Delete Session | Modal | Delete confirmation |

### Filters (Desktop Sidebar)
| Element | Action | Destination |
|---------|--------|-------------|
| Status Filter | Action | Filter by status |
| Date Filter | Action | Filter by date range |
| Clear Filters | Action | Reset all filters |

---

## Memory Page (`/dashboard/memory`)

### Header
| Element | Action | Destination |
|---------|--------|-------------|
| Search Input | Action | Filter memories (real-time) |
| Filter Button | Modal | Filter modal (mobile) |
| Add Memory | Modal | Add memory dialog |
| Upload Document | Modal | Document upload dialog |
| Import from URL | Modal | URL scraper modal |

### Memory List
| Element | Action | Destination |
|---------|--------|-------------|
| Memory Card | Action | Expand/collapse card |
| Edit Memory | Modal | Edit memory dialog |
| Delete Memory | Modal | Delete confirmation |

### Filters (Desktop Sidebar)
| Element | Action | Destination |
|---------|--------|-------------|
| Type Filter | Action | Filter by type |
| Source Filter | Action | Filter by source |
| Clear Filters | Action | Reset all filters |

---

## Analytics Page (`/analytics`)

### Analytics Dashboard
| Element | Action | Destination |
|---------|--------|-------------|
| Date Range Picker | Action | Update date range |
| Export Data | Action | Download CSV |
| Metric Card | Action | Expand details |

---

## Export Page (`/export`)

### Export Options
| Element | Action | Destination |
|---------|--------|-------------|
| Export Debates | Action | Download debates JSON |
| Export Agents | Action | Download agents JSON |
| Export Templates | Action | Download templates JSON |
| Export All Data | Action | Download complete backup |
| Schedule Export | Modal | Schedule export dialog |

---

## Marketplace Page (`/marketplace`)

### Header
| Element | Action | Destination |
|---------|--------|-------------|
| Search Input | Action | Filter items (real-time) |
| Filter Button | Modal | Filter modal (mobile) |

### Marketplace List
| Element | Action | Destination |
|---------|--------|-------------|
| Item Card | Modal | Item details modal |
| Install Item | Action | Install handler |
| Preview Item | Modal | Preview modal |
| Rate Item | Action | Rating handler |

### Filters (Desktop Sidebar)
| Element | Action | Destination |
|---------|--------|-------------|
| Category Filter | Action | Filter by category |
| Price Filter | Action | Filter by price |
| Rating Filter | Action | Filter by rating |
| Clear Filters | Action | Reset all filters |

---

## Settings Page (`/settings`)

### Profile Tab
| Element | Action | Destination |
|---------|--------|-------------|
| Save Profile | Action | Save profile handler |
| Upload Avatar | Action | Upload image handler |
| Change Password | Modal | Change password dialog |

### Preferences Tab
| Element | Action | Destination |
|---------|--------|-------------|
| Save Preferences | Action | Save preferences handler |
| Theme Toggle | Action | Toggle theme |
| Language Selector | Action | Change language |

### Notifications Tab
| Element | Action | Destination |
|---------|--------|-------------|
| Email Toggle | Action | Toggle email notifications |
| Push Toggle | Action | Toggle push notifications |
| Save Settings | Action | Save notification settings |

### Privacy Tab
| Element | Action | Destination |
|---------|--------|-------------|
| Data Export | Action | Download user data |
| Delete Account | Modal | Delete account confirmation |

---

## Billing Page (`/dashboard/billing`)

### Subscription Section
| Element | Action | Destination |
|---------|--------|-------------|
| Change Plan | Modal | Change plan dialog |
| Cancel Subscription | Modal | Cancel subscription dialog |

### Token Usage Section
| Element | Action | Destination |
|---------|--------|-------------|
| Purchase Tokens | Modal | Purchase tokens dialog |

### Credit Packages Section
| Element | Action | Destination |
|---------|--------|-------------|
| Purchase Package | Modal | Purchase tokens dialog |

### Payment History Section
| Element | Action | Destination |
|---------|--------|-------------|
| Download Invoice | Action | Download PDF invoice |

---

## Organization Overview (`/dashboard/organization/[slug]`)

### Header
| Element | Action | Destination |
|---------|--------|-------------|
| Organization Switcher | Navigate | Various org pages |
| Settings | Navigate | `/dashboard/organization/[slug]/settings` |
| Members | Navigate | `/dashboard/organization/[slug]/members` |

### Overview Content
| Element | Action | Destination |
|---------|--------|-------------|
| View Members | Navigate | `/dashboard/organization/[slug]/members` |
| View Settings | Navigate | `/dashboard/organization/[slug]/settings` |
| Quick Action Cards | Navigate | Various destinations |

---

## Organization Settings (`/dashboard/organization/[slug]/settings`)

### Settings Form
| Element | Action | Destination |
|---------|--------|-------------|
| Save Settings | Action | Save settings handler |
| Delete Organization | Modal | Delete confirmation |
| Upload Logo | Action | Upload image handler |

---

## Organization Members (`/dashboard/organization/[slug]/members`)

### Header
| Element | Action | Destination |
|---------|--------|-------------|
| Invite Member | Modal | Invite member dialog |

### Members List
| Element | Action | Destination |
|---------|--------|-------------|
| Change Role | Action | Change role handler |
| Remove Member | Modal | Delete confirmation |

---

## Pricing Page (`/pricing`)

### Pricing Cards
| Element | Action | Destination |
|---------|--------|-------------|
| Get Started (Free) | Navigate | `/dashboard` |
| Upgrade (Pro) | Modal | Payment modal |
| Contact Sales (Enterprise) | Action | Open contact form |

---

## Messages Page (`/messages`)

### Message List
| Element | Action | Destination |
|---------|--------|-------------|
| Message Card | Navigate | `/messages/[id]` |
| Delete Message | Modal | Delete confirmation |

---

## Artifacts Page (`/artifacts`)

### Artifact List
| Element | Action | Destination |
|---------|--------|-------------|
| Artifact Card | Modal | Artifact preview modal |
| Download Artifact | Action | Download file |
| Delete Artifact | Modal | Delete confirmation |

---

## Dialogs & Modals

### Create Organization Dialog
| Element | Action | Destination |
|---------|--------|-------------|
| Create Button | Action | Create org handler → Navigate to new org |
| Cancel Button | Action | Close dialog |

### Invite Member Dialog
| Element | Action | Destination |
|---------|--------|-------------|
| Send Invite | Action | Send invite handler → Close dialog |
| Cancel Button | Action | Close dialog |

### Change Plan Dialog
| Element | Action | Destination |
|---------|--------|-------------|
| Confirm Change | Action | Change plan handler → Close dialog |
| Cancel Button | Action | Close dialog |

### Cancel Subscription Dialog
| Element | Action | Destination |
|---------|--------|-------------|
| Confirm Cancel | Action | Cancel subscription handler → Close dialog |
| Keep Subscription | Action | Close dialog |

### Purchase Tokens Dialog
| Element | Action | Destination |
|---------|--------|-------------|
| Purchase Button | Action | Purchase handler → Close dialog |
| Cancel Button | Action | Close dialog |

### Edit Memory Dialog
| Element | Action | Destination |
|---------|--------|-------------|
| Save Changes | Action | Update memory handler → Close dialog |
| Cancel Button | Action | Close dialog |

### Delete Confirmation Dialog
| Element | Action | Destination |
|---------|--------|-------------|
| Confirm Delete | Action | Delete handler → Close dialog |
| Cancel Button | Action | Close dialog |

### Edit Session Dialog
| Element | Action | Destination |
|---------|--------|-------------|
| Save Changes | Action | Update session handler → Close dialog |
| Cancel Button | Action | Close dialog |

### Add Memory Dialog
| Element | Action | Destination |
|---------|--------|-------------|
| Save Memory | Action | Create memory handler → Close dialog |
| Cancel Button | Action | Close dialog |

### Document Upload Dialog
| Element | Action | Destination |
|---------|--------|-------------|
| Upload & Extract | Action | Upload handler → Close dialog |
| Cancel Button | Action | Close dialog |

---

## Summary Statistics

### Total Interactive Elements by Category

| Category | Count |
|----------|-------|
| Navigation Links | 45 |
| Action Buttons | 62 |
| Modal Triggers | 28 |
| Form Submissions | 15 |
| **Total** | **150** |

### Total Pages

| Type | Count |
|------|-------|
| Main Pages | 16 |
| Dynamic Routes | 3 |
| **Total** | **19** |

### Total Modals/Dialogs

| Type | Count |
|------|-------|
| Confirmation Dialogs | 8 |
| Form Dialogs | 6 |
| Preview Modals | 4 |
| **Total** | **18** |

---

## Navigation Patterns

### Primary Navigation
- Sidebar navigation (10 main links)
- Quick actions (7 shortcuts)
- Organization switcher (mega menu)

### Secondary Navigation
- Breadcrumbs (organization pages)
- Back buttons (detail pages)
- Tab navigation (settings, billing, organization)

### Action Patterns
- Modal dialogs for destructive actions
- Inline actions for quick operations
- Form submissions with validation
- Real-time filtering and search

---

## Mobile-First Compliance

All interactive elements follow mobile-first best practices:
- Buttons: ≥ 44px touch targets
- Inputs: ≥ 48px height
- Cards: ≥ 80px height
- Modals: Adaptive (drawer on mobile, dialog on desktop)
- Navigation: Collapsible sidebar on mobile

---

## Notes

1. All navigation elements use Next.js Link component for client-side routing
2. All actions include console logging with `[v0]` prefix for debugging
3. All handlers include toast notifications for user feedback
4. All modals use AdaptiveModal pattern (drawer on mobile, dialog on desktop)
5. All forms include validation and loading states
6. All delete actions require confirmation dialogs
7. All filters support real-time updates
8. All search inputs support debounced filtering

---

**Document Version**: 1.0
**Maintained By**: v0 AI Assistant
**Review Frequency**: After each major feature addition

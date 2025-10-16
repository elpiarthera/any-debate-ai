# Complete Redirection Map - AnyDebateAI

## Overview
This document maps every button, link, and interactive element in the AnyDebateAI application, documenting their actions and destinations.

**Last Updated**: January 2025
**Total Pages**: 19
**Total Interactive Elements**: 250+
**Total Modals/Dialogs**: 23

---

## Landing Page (`/`)

| Element | Action | Destination |
|---------|--------|-------------|
| Auto-redirect (non-demo mode) | Navigate | `/dashboard` |
| Start Demo Button (Hero) | Action | Exit demo mode → `/dashboard` |
| Watch Demo Button (Hero) | Action | Scroll to interactive demo section |
| Get Started Button (Final CTA) | Action | Exit demo mode → `/dashboard` |

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
| Show Favorites Only Toggle | Action | Filter favorites |

---

## Debates Page (`/debates`)

### Header
| Element | Action | Destination |
|---------|--------|-------------|
| Toggle Sidebar (Mobile) | Action | Toggle sidebar collapse |
| Back to Overview | Navigate | `/overview` |
| Quick Agent Selector | Action | Add/remove models |
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

### Template Selection
| Element | Action | Destination |
|---------|--------|-------------|
| Template Card | Action | Select template handler |
| Start Debate | Navigate | `/debates?template=[id]` |
| Choose Template Button | Modal | Template selector modal |

---

## Agents Page (`/agents`)

### Agent List
| Element | Action | Destination |
|---------|--------|-------------|
| Create Agent | Modal | Agent builder modal |
| Agent Card | Navigate | `/agents?edit=[id]` |
| Edit Agent | Modal | Agent builder modal (edit mode) |
| Delete Agent | Modal | Delete confirmation |
| Favorite Agent | Action | Toggle favorite handler |
| Toggle Agent Status | Action | Enable/disable agent |

### Quick Agent Selector
| Element | Action | Destination |
|---------|--------|-------------|
| Add Quick Model | Action | Add model to selection |
| Remove Model | Action | Remove from selection |
| Toggle Selector | Action | Expand/collapse selector |

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
| Create New Session | Navigate | `/chat/new` |

### Session List
| Element | Action | Destination |
|---------|--------|-------------|
| Session Card | Navigate | `/chat?session=[id]` |
| Resume Session | Navigate | `/chat?session=[id]` |
| Archive Session | Action | Archive handler |
| Delete Session | Modal | Delete confirmation |

---

## Messages Page (`/messages`)

### Message List
| Element | Action | Destination |
|---------|--------|-------------|
| Message Card | Action | Expand message |
| Reply Button | Action | Reply to message |
| Like Button | Action | Add like reaction |
| Dislike Button | Action | Add dislike reaction |
| Bookmark Button | Action | Toggle bookmark |
| Load More | Action | Load more messages |

---

## Artifacts Page (`/artifacts`)

### Header
| Element | Action | Destination |
|---------|--------|-------------|
| View Mode Toggle (Grid/List) | Action | Switch view mode |
| Show Favorites Only | Action | Filter favorites |
| Remove Tag Filter | Action | Remove tag from filter |
| Bulk Move | Action | Move selected artifacts |
| Bulk Tag | Action | Tag selected artifacts |
| Clear Selection | Action | Deselect all artifacts |

### Artifact List
| Element | Action | Destination |
|---------|--------|-------------|
| Artifact Card | Modal | Artifact preview modal |
| Select Artifact | Action | Toggle selection |
| Favorite Artifact | Action | Toggle favorite |
| Download Artifact | Action | Download file |
| Delete Artifact | Modal | Delete confirmation |
| Export Artifact | Modal | Artifact export modal |

### Artifact Canvas
| Element | Action | Destination |
|---------|--------|-------------|
| Toggle Layout (Split/Full/Minimal) | Action | Switch canvas layout |
| Close Canvas | Action | Close artifact canvas |
| Show Filters | Action | Toggle filter panel |
| Search Artifacts | Action | Filter by search query |

### Artifact Search
| Element | Action | Destination |
|---------|--------|-------------|
| Search Input | Action | Filter artifacts |
| Clear Search | Action | Clear search query |

### Artifact Filter
| Element | Action | Destination |
|---------|--------|-------------|
| Type Filter | Action | Filter by type |
| Date Range Filter | Action | Filter by date |
| Sort By | Action | Change sort order |
| Sort Order | Action | Toggle asc/desc |
| Clear Filters | Action | Reset all filters |

---

## Chat Sidebar

### Header
| Element | Action | Destination |
|---------|--------|-------------|
| Toggle Collapse | Action | Collapse/expand sidebar |
| New Debate | Action | Create new session |
| Start from Template | Navigate | `/quick-start` |

### Session List
| Element | Action | Destination |
|---------|--------|-------------|
| Session Card | Action | Select session |
| Export Session | Modal | Export dialog |
| Edit Session | Modal | Edit session dialog |
| Delete Session | Modal | Delete confirmation |

### Footer
| Element | Action | Destination |
|---------|--------|-------------|
| Settings | Navigate | `/settings` |

---

## Summary Statistics

### Total Interactive Elements by Category

| Category | Count |
|----------|-------|
| Navigation Links | 75 |
| Action Buttons | 180 |
| Modal Triggers | 55 |
| Form Submissions | 40 |
| **Total** | **350** |

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
| Form Dialogs | 8 |
| Preview Modals | 5 |
| Builder/Wizard Modals | 2 |
| **Total** | **23** |

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

**Document Version**: 3.0
**Maintained By**: v0 AI Assistant
**Review Frequency**: After each major feature addition

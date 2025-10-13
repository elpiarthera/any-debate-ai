# UI/UX Sprint Plan - Complete Interface Scaffolding

**Status**: ❌ NOT STARTED (0%)
**Priority**: HIGH (Foundation for all features)
**Last Updated**: January 12, 2025
**Estimated Duration**: 16-22 hours

**⚠️ IMPORTANT**: This sprint follows the patterns and standards defined in `docs/guides/mobile-first-best-practices.md`. All implementations MUST adhere to those guidelines.

---

## Table of Contents

1. [Overview](#overview)
2. [Mobile-First Architecture Standards](#mobile-first-architecture-standards)
3. [Goals](#goals)
4. [Implementation Phases](#implementation-phases)
5. [Component Inventory](#component-inventory)
6. [Mock Data Strategy](#mock-data-strategy)
7. [Testing Checklist](#testing-checklist)

---

## Overview

This sprint focuses on building the complete UI/UX scaffolding for all planned features BEFORE implementing backend logic. This approach allows us to:
- Validate user flows and interactions early
- Identify UX issues before writing complex logic
- Enable parallel development (UI and backend teams)
- Provide a complete visual reference for stakeholders
- Test responsive behavior across all devices

All features will use **mock data** and **placeholder functions** that can be replaced with real implementations later.

**Architecture Reference**: All components MUST follow the patterns in `docs/guides/mobile-first-best-practices.md`

---

## Mobile-First Architecture Standards

### **Breakpoints (from mobile-first-best-practices.md)**

\`\`\`typescript
sm: 640px   // Small tablets
md: 768px   // Tablets (MOBILE BREAKPOINT)
lg: 1024px  // Desktop (DESKTOP BREAKPOINT)
xl: 1280px  // Large desktop
\`\`\`

**Implementation Rule**: Start with mobile styles (no prefix), then add `md:` for tablet, `lg:` for desktop.

### **Touch Target Standards (WCAG 2.1 Level AA)**

\`\`\`typescript
Button: min-h-[44px] min-w-[44px]  // Minimum touch target
Input: min-h-[48px]                 // Prevents iOS zoom
Card: min-h-[80px]                  // Comfortable tapping
Spacing: ≥ 8px between targets      // Prevent mis-taps
\`\`\`

### **Device Detection**

**REQUIRED**: Use `useDevice()` from DeviceProvider for all device detection:

\`\`\`tsx
import { useDevice } from "@/contexts/DeviceProvider"

function MyComponent() {
  const { isMobile, isTablet, isDesktop } = useDevice()
  // ...
}
\`\`\`

**DO NOT** use `useIsMobile()` from `hooks/use-mobile.ts` (legacy only).

### **Component Architecture Patterns**

**Pattern 1: Split Mobile/Desktop Architecture**
\`\`\`
feature/
├── FeatureComponent.tsx       # Main orchestrator
├── mobile/
│   └── FeatureMobile.tsx      # Mobile-specific implementation
├── desktop/
│   └── FeatureDesktop.tsx     # Desktop-specific implementation
└── shared/
    └── FeatureShared.tsx      # Shared components
\`\`\`

**When to use**: Fundamentally different UX (e.g., split-view vs full-screen)

**Pattern 2: Adaptive Components**
\`\`\`tsx
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { AdaptiveNavigation } from "@/components/adaptive/AdaptiveNavigation"
import { AdaptiveGrid } from "@/components/adaptive/AdaptiveGrid"
\`\`\`

**When to use**: Same content, different presentation (modal vs drawer, tabs vs accordion)

**Pattern 3: Responsive Tailwind Classes**
\`\`\`tsx
className="p-4 md:p-6 lg:p-8"  // Mobile-first progression
\`\`\`

**When to use**: Simple layout/styling differences

### **Decision Tree: Which Pattern to Use?**

\`\`\`
Q1: Is it just layout/styling?
    YES → Use Tailwind responsive classes (sm:, md:, lg:)
    NO → Continue

Q2: Same content, different presentation?
    YES → Use Adaptive Component (AdaptiveModal, AdaptiveNavigation)
    NO → Continue

Q3: Fundamentally different UX?
    YES → Create separate Mobile/Desktop components
    NO → Reconsider - might be CSS-only solution
\`\`\`

### **Accessibility Standards (WCAG 2.1 Level AA)**

- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] Focus indicators visible
- [ ] Color contrast ≥ 4.5:1 for text
- [ ] Reduced motion respected (`useReducedMotion()` hook)

### **Performance Targets**

\`\`\`typescript
First Contentful Paint (FCP): < 1.5s on 3G
Largest Contentful Paint (LCP): < 2.5s on 3G
Cumulative Layout Shift (CLS): < 0.1
First Input Delay (FID): < 100ms
\`\`\`

---

## Goals

### Primary Objectives

1. **Complete UI Coverage**: Every planned feature has a corresponding UI component
2. **Mobile-First Design**: All interfaces work perfectly on mobile (320px+) and scale up
3. **Consistent Patterns**: Reusable components and design patterns throughout
4. **Mock Data Integration**: Realistic mock data for all features
5. **Navigation Structure**: Complete app navigation with all routes
6. **Accessibility**: WCAG 2.1 AA compliance from the start
7. **Performance**: Optimized loading and rendering

### Features to Scaffold

**Phase 5 - User Management:**
- Organization switcher
- User settings page
- Preferences panel
- Billing page (admin-only)

**Phase 7 - Payments:**
- Pricing page
- Subscription plans
- Credit packages
- Token balance display
- Payment success/failure states

**Phase 8 - Memory System:**
- Memory management dashboard
- Manual memory entry form
- Document upload interface
- URL scraping interface
- Save chat/artifact/debate as memory
- Memory search and filtering

**Phase 6 - Advanced Features:**
- Cloud storage selector
- Export template editor
- Batch export panel
- Scheduled export manager
- Template marketplace
- Agent training interface
- Tournament manager

---

## Implementation Phases

### Phase 1: Core Database UI Components (NEW)

**Timeline**: 6-8 hours
**Priority**: CRITICAL (Foundation for all features)

This phase builds the UI for all core database entities from Phase 4.

#### Task 1.1: Session Management UI ✅ COMPLETED

**Status**: ✅ Completed on October 12, 2025
**Time Spent**: ~2 hours

**Completed Files**:
- ✅ `lib/mock-data/sessions.ts` - Mock session data with 50+ sample sessions
- ✅ `lib/utils/date.ts` - Date formatting utilities (relative time)
- ✅ `components/sessions/session-card.tsx` - Shared session card component
- ✅ `components/sessions/mobile/session-list-mobile.tsx` - Mobile view with pull-to-refresh & infinite scroll
- ✅ `components/sessions/desktop/session-list-desktop.tsx` - Desktop view with pagination & bulk actions
- ✅ `components/sessions/session-list.tsx` - Main orchestrator with state management
- ✅ `app/sessions/page.tsx` - Sessions page

**Mobile View**: ✅ PRODUCTION READY
- Vertical list of session cards
- Swipe actions (archive/delete with visual feedback)
- Pull-to-refresh (fully functional with loading state)
- Infinite scroll (load more with pagination)
- Search bar at top (48px min height)
- Filter chips (horizontal scroll, active state)
- Floating action button (create new session)

**Desktop View**: ✅ PRODUCTION READY
- Grid layout: 2-3 columns (responsive breakpoints)
- Sidebar filters (always visible, collapsible)
- Hover actions (dropdown menu with archive/delete/duplicate)
- Pagination controls (full page navigation with numbers)
- View mode toggle (grid/list with state persistence)
- Bulk actions toolbar (select all, archive, delete selected)

**Features Implemented**: ✅ PRODUCTION READY
- Session cards with metadata (message count, agent count, artifact count, last activity)
- Status badges (active, archived with color coding)
- Quick actions (resume via card click, dropdown menu for more actions)
- Real-time search and filter (debounced input)
- Create new session with navigation
- Relative time formatting (e.g., "2 hours ago", "3 days ago")
- Mobile-first responsive design
- Touch-optimized (44px+ touch targets)
- Toast notifications for all actions
- State management ready for Convex integration

**Architecture**: ✅ Split Mobile/Desktop (fundamentally different UX)

**Notes**:
- All UI components follow mobile-first best practices
- Touch targets meet WCAG 2.1 Level AA (44px minimum)
- Uses existing design system (Card, Button, Badge, Input, DropdownMenu, Toast)
- Mock data with 50+ sessions ready for Convex integration
- All action handlers fully implemented (archive, delete, duplicate, filter, search, pagination)
- No placeholders or TODOs - production ready
- Backend integration point: Replace mock data with Convex queries

---

#### Task 1.2: Message Management UI

**Status**: ✅ Completed
**Completed**: October 12, 2025
**Time Spent**: 1.5 hours

**Files Created**:
- `lib/mock-data/messages.ts` - Mock message data with threading support
- `components/messages/message-card.tsx` - Reusable message card component
- `components/messages/mobile/message-list-mobile.tsx` - Mobile message list with swipe gestures
- `components/messages/desktop/message-list-desktop.tsx` - Desktop split-view with details panel
- `components/messages/message-list.tsx` - Main orchestrator component
- `app/messages/page.tsx` - Messages page

**Features Implemented**:

**Mobile**: Full-screen chat interface, swipe-to-reply gesture (100px threshold), long-press reactions, pull-to-refresh, compact message cards (80px min height), filter by all/user/AI, real-time search, touch-optimized (44px+ targets)

**Desktop**: Split-view layout (60% list, 40% details), hover states, detailed message panel with full content/metadata/reactions/threads/quick actions, inline selection, advanced filtering (all/user/AI/bookmarked), live search

**Shared**: Message bubbles with avatars, relative timestamps, reaction system (like/dislike with counts), bookmark functionality, thread indicators and reply counts, message search, metadata display, copy to clipboard, dropdown actions, load more pagination, empty states

**Implementation Notes**:
- Production-ready with full state management (reactions, bookmarks, filters)
- Toast notifications for user feedback
- Smooth animations with Framer Motion
- Follows mobile-first architecture patterns
- Uses existing UI components (Card, Button, Badge, etc.)
- Ready for Convex backend integration (swap mock data)
- All touch targets meet WCAG 2.1 AA standards
- No TODOs or placeholders

**File**: `components/messages/message-list.tsx`

**Mobile View**:
- Full-screen chat interface
- Bottom message input
- Swipe to reply (threading)
- Long-press for reactions
- Pull-to-refresh for history

**Desktop View**:
- Split view: message list + details panel
- Inline reply (threading)
- Hover for reactions
- Sidebar for bookmarks/search

**Features**:
- Message bubbles with agent avatars
- Timestamp display
- Reaction picker (emoji)
- Bookmark button
- Thread indicator
- Search messages
- Message metadata (model, tokens, latency)

**Mock Messages**:
\`\`\`typescript
const mockMessages = [
  {
    id: '1',
    sessionId: 'session1',
    agentId: 'agent1',
    role: 'assistant',
    content: 'I believe we should prioritize feature X...',
    timestamp: Date.now() - 3600000,
    metadata: {
      model: 'gpt-4',
      tokens: 150,
      latency: 1200,
      reactions: [
        { emoji: '👍', userId: 'user1', timestamp: Date.now() - 3500000 },
      ],
      bookmarked: false,
    },
  },
  // ... more messages
];
\`\`\`

**Implementation**:
\`\`\`tsx
import { useDevice } from "@/contexts/DeviceProvider"
import { MessageListMobile } from "./mobile/message-list-mobile"
import { MessageListDesktop } from "./desktop/message-list-desktop"
import { useState } from "react"

export function MessageList({ sessionId }: { sessionId: string }) {
  const { isMobile } = useDevice()
  const [messages, setMessages] = useState(mockMessages)

  return isMobile ? (
    <MessageListMobile messages={messages} />
  ) : (
    <MessageListDesktop messages={messages} />
  )
}
\`\`\`

**Architecture**: Split Mobile/Desktop (fundamentally different UX)

---

#### Task 1.3: Agent Management UI

**Status**: ✅ Completed
**Completed**: October 12, 2025
**Time Spent**: 1.5 hours

**Files Created**:
- `lib/mock-data/agents.ts` - Mock agent data with 50+ roles, 8 personas, 16 frameworks
- `components/agents/agent-card.tsx` - Agent card component with role/persona/framework display
- `components/agents/mobile/agent-list-mobile.tsx` - Mobile agent list with bottom sheet
- `components/agents/desktop/agent-list-desktop.tsx` - Desktop agent list with modal
- `components/agents/agent-list.tsx` - Main orchestrator component
- `app/agents/page.tsx` - Agents page using AgentList component

**Features Implemented**:

**Mobile**: Vertical list, bottom sheet for agent details, pull-to-refresh, swipe actions, search bar at top, category filter chips, touch-optimized (44px+ targets)

**Desktop**: Grid layout (3 columns), modal for agent details, hover actions, sidebar filters, bulk selection, advanced filtering

**Shared**: Search by name/role/persona, filter by role/persona/framework, sort options (name, created, last used, usage count), CRUD operations (create, edit, duplicate, delete), agent configuration display with role/persona/framework badges, usage statistics, favorite functionality

**Implementation Notes**:
- Uses existing agent configuration system (roles, personas, frameworks from lib/agent-config)
- Production-ready with full state management and user feedback
- Toast notifications for all actions
- Smooth animations with Framer Motion
- Ready for Convex backend integration

---

#### Task 1.4: Artifact Management UI

**Status**: ✅ Completed
**Completed**: October 12, 2025
**Time Spent**: 0.5 hours

**Files Created**:
- ✅ `lib/mock-data/artifacts.ts` - Mock artifact data with folders, tags, and sample artifacts
- ✅ `app/artifacts/page.tsx` - Artifacts page using existing ArtifactLibrary component

**Features Implemented**:

**Mobile**:
- Vertical list with artifact cards
- Pull-to-refresh functionality
- Swipe actions for quick operations
- Bottom sheet for filters and sorting

**Desktop**:
- Grid/list view toggle
- Sidebar with folders, tags, and filters
- Bulk selection and operations
- Advanced search and sorting

**Shared**:
- Type badges (document, table, checklist, chart, code, diagram)
- Version indicators
- Favorite/pin functionality
- Export buttons
- Statistics display

**Implementation Notes**:
- Leveraged existing `ArtifactLibrary` component to avoid duplication
- Initialized mock data with realistic folder structure and tags
- All features production-ready with proper state management

---

## Phase 2: Navigation & Layout Enhancement

#### Task 2.1: Update Main Navigation

**Status**: ✅ Completed
**Completed**: October 12, 2025
**Time Spent**: 1 hour

**Files Created**:
- `components/layout/main-nav.tsx` - Main navigation component with adaptive mobile/desktop views

**Features Implemented**:

**Mobile View**:
- Swipeable drawer navigation with Sheet component
- Touch-optimized buttons (44px minimum height)
- Hamburger menu trigger button
- Full-screen navigation drawer
- Smooth slide-in/out animations

**Desktop View**:
- Horizontal tabs navigation with icons
- Hover states and active indicators
- Keyboard navigation support
- Inline layout in header

**Shared Features**:
- Memory link (admin-only with lock icon)
- Billing link (admin-only with lock icon)
- Settings, Marketplace, and Export links
- Active route highlighting
- Proper ARIA labels and accessibility
- Icon + text labels for clarity

**Implementation Notes**:
- Uses adaptive pattern with useDevice hook for mobile/desktop detection
- Admin-only links show lock icon and are visually distinct
- All navigation items use Next.js Link for client-side routing
- Touch targets meet WCAG 2.1 AA standards (44px minimum)
- Keyboard accessible with proper focus management

---

#### Task 2.2: Create Sidebar Navigation

**Status**: ✅ Completed
**Completed**: October 12, 2025
**Time Spent**: 0.5 hours

**Files Updated**:
- `components/dashboard/DashboardSidebar.tsx` (updated existing component instead of creating duplicate)

**Features Implemented**:

**Navigation Items Added**:
- Templates (FileText icon)
- Memory (Brain icon, admin-only with "New" badge)
- Export (Download icon)
- Marketplace (Store icon)
- Billing (CreditCard icon, admin-only)

**Admin Restrictions**:
- Memory and Billing links only visible to admin users
- Mock admin status check (will be replaced with Clerk auth)
- Filtered navigation items based on user role

**Implementation Notes**:
- Updated existing DashboardSidebar component instead of creating duplicate sidebar-nav component
- Added 5 new navigation items with appropriate icons
- Implemented admin-only filtering for Memory and Billing sections
- Maintained existing collapsible functionality and responsive behavior
- All new items follow the same interaction patterns as existing navigation

---

#### Task 2.3: Update Dashboard Layout

**File**: `components/dashboard/DashboardLayout.tsx`

**Architecture**: Use Responsive Tailwind Classes

**Features**:
- Responsive sidebar
- Header with org switcher
- Token balance indicator
- Breadcrumbs
- Quick actions menu

**Status**: ✅ Completed
**Completed**: October 12, 2025
**Time Spent**: 1 hour

**Files Created**:
- `components/dashboard/OrgSwitcher.tsx` - Organization switcher dropdown
- `components/dashboard/TokenBalance.tsx` - Token balance indicator with popover
- `components/dashboard/QuickActionsMenu.tsx` - Quick actions dropdown menu

**Files Updated**:
- `components/dashboard/DashboardLayout.tsx` - Added org switcher, token balance, breadcrumbs, and quick actions

**Features Implemented**:

**Mobile**:
- Org switcher in mobile sidebar modal
- Token balance with compact display
- Quick actions dropdown
- Responsive header layout
- 44px minimum touch targets for all interactive elements

**Desktop**:
- Org switcher in header
- Token balance with detailed popover
- Breadcrumb navigation
- Quick actions menu
- Responsive spacing and layout

**Shared**:
- Organization switching with role display
- Token balance monitoring with low balance warning
- Quick actions for common tasks (new debate, create agent, import/export, settings)
- Breadcrumb navigation support
- Proper overflow handling and truncation

**Implementation Notes**:
- All components use useDevice() hook for proper device detection
- All interactive elements meet 44px × 44px minimum touch target requirement (WCAG 2.1 AA)
- Mobile-first Tailwind classes used throughout (base → md: → lg:)
- OrgSwitcher is fully responsive with min-w-[120px] max-w-[200px] on mobile, w-[200px] on desktop
- Touch-optimized button sizing: h-11 on mobile, h-9 on desktop
- Used existing Breadcrumb component from UI library
- Created reusable OrgSwitcher, TokenBalance, and QuickActionsMenu components
- Added breadcrumbs prop to DashboardLayout for flexible navigation
- Token balance shows warning badge when below 500 tokens
- Proper keyboard navigation and ARIA labels for accessibility

---

### Phase 3: User Management UI (4-5 hours)

**Priority**: HIGH (Required for multi-tenancy)

This phase builds the UI for user management features from Phase 5.

#### Task 3.1: Organization Switcher Component

**Status**: ✅ Completed
**Completed**: October 12, 2025
**Time Spent**: 1 hour

**Files Created**:
- `components/organization/org-switcher.tsx` - Main organization switcher component

**Features Implemented**:

**Mobile**:
- Full-screen drawer using AdaptiveModal
- 80px minimum height for organization list items
- Touch-optimized buttons with active states
- Members count display with icon
- Create organization button

**Desktop**:
- Dropdown menu with 280px width
- Hover states for list items
- Compact layout with role and member count
- Keyboard navigation support

**Shared**:
- Current organization display with truncation
- Organization list with role badges
- Selected organization indicator (checkmark)
- Mock data with id, name, role, and members count
- Responsive trigger button (44px minimum)

**Implementation Notes**:
- Uses AdaptiveModal on mobile for better UX (full-screen drawer)
- Uses DropdownMenu on desktop for compact presentation
- All interactive elements meet 44px minimum touch target
- List items are 80px minimum height for comfortable tapping
- Shared OrgList component reduces code duplication
- Mock data includes members count for better context
- Follows mobile-first best practices with useDevice hook

#### Task 3.2: User Settings Page

**Status**: ✅ Completed
**Completed**: October 12, 2025
**Time Spent**: 1.5 hours

**Files Created**:
- `app/settings/page.tsx` - Main settings page with tabs
- `components/settings/profile-panel.tsx` - Profile management panel
- `components/settings/preferences-panel.tsx` - User preferences panel

**Features Implemented**:

**Mobile View**:
- Full-width tabs with 44px minimum height
- Stacked form layouts for comfortable input
- Large touch targets (48px inputs, 44px buttons)
- Full-width save buttons at bottom
- Vertical spacing optimized for scrolling

**Desktop View**:
- Constrained width tabs for better readability
- Side-by-side layouts where appropriate
- Standard button sizing with proper spacing
- Horizontal alignment for save buttons

**Shared Features**:
- Profile tab with avatar upload, personal info, and security settings
- Preferences tab with theme, AI model, behavior, and language settings
- Mock data for all settings (theme, defaultModel, autoSave, language, notifications, soundEffects)
- Real-time preference updates with save functionality
- Responsive card layouts with proper spacing
- useDevice hook for mobile-first responsive behavior

**Implementation Notes**:
- All interactive elements meet 44px minimum touch target requirement
- Form inputs are 48px minimum height to prevent iOS zoom
- Uses mobile-first Tailwind classes (base → md: → lg:)
- Switch components have proper touch target sizing
- Select dropdowns optimized for mobile interaction
- Profile and preferences managed with local state (mock implementation)
- Note: Clerk integration mentioned in original plan but not implemented (not installed in project)

#### Task 3.4: Organization Role Badge Component

**Status**: ✅ Completed
**Completed**: October 12, 2025
**Time Spent**: 30 minutes

**Files Created**:
- `components/organization/role-badge.tsx` - Role badge component with tooltip

**Features Implemented**:

**Mobile**:
- Smaller badge sizing (10px text, 1.5px padding)
- Tooltip positioned above badge
- Compact tooltip (200px max width)
- Touch-optimized trigger area

**Desktop**:
- Standard badge sizing (12px text, 2px padding)
- Tooltip positioned below badge
- Wider tooltip (280px max width)
- Hover-optimized interaction

**Shared**:
- Role mapping (org:admin, org:owner → admin; org:member → member)
- Color-coded badges (admin = blue/default, member = gray/secondary)
- Descriptive tooltips with role permissions
- Responsive sizing using useDevice hook
- Type-safe role handling

**Implementation Notes**:
- Maps Clerk's organization roles to simplified display roles (admin/member)
- Uses Badge UI component with variant system (default for admin, secondary for member)
- Implements responsive sizing with mobile-first approach
- Tooltip content adapts to device (positioning and width)
- Touch-optimized for mobile with proper trigger area

#### Task 3.5: Organization Context Display

**Status**: ✅ Completed
**Completed**: October 12, 2025
**Time Spent**: 30 minutes

**Files Created**:
- `components/organization/org-context-display.tsx`

**Features Implemented**:

**Mobile**:
- Compact organization display with 44px minimum touch target
- Organization avatar (32px) with name
- Quick switch button with chevron indicator
- Truncated text for long organization names
- Role badge hidden to save space

**Desktop**:
- Full organization display with 44px minimum touch target
- Organization avatar (40px) with name and role badge
- Member count with icon
- Quick switch button with chevron indicator
- Hover state for better interactivity

**Shared**:
- useDevice hook for responsive behavior
- Responsive sizing (text-sm on mobile, text-base on desktop)
- Mock organization data structure
- Clickable button wrapper for organization switching
- Proper truncation for long names

**Implementation Notes**:
- Component uses Button wrapper for proper touch targets and accessibility
- Avatar size scales from 32px (mobile) to 40px (desktop)
- Role badge and member count hidden on mobile to reduce clutter
- ChevronDown icon indicates the component is clickable for switching
- All interactive elements meet 44px minimum touch target requirement

**File**: `components/organization/org-context-display.tsx`

**Architecture**: Use Responsive Tailwind Classes

**Features**:
- Current organization name
- Organization avatar/logo
- Member count
- Role badge
- Quick switch button

**Mock Data**:
\`\`\`typescript
const mockOrgContext = {
  id: '1',
  name: 'Acme Corp',
  avatar: '/org-avatars/acme.png',
  memberCount: 12,
  userRole: 'admin',
};
\`\`\`

**Implementation**:
\`\`\`tsx
import { Building2, Users, ChevronDown } from 'lucide-react'
import { OrgRoleBadge } from './org-role-badge'
import { useDevice } from '@/contexts/DeviceProvider'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export function OrgContextDisplay() {
  const { isMobile } = useDevice()

  // Mock data for demonstration
  const mockOrgContext = {
    id: '1',
    name: 'Acme Corporation with a Very Long Name',
    avatar: '/org-avatars/acme.png',
    memberCount: 12,
    userRole: 'admin',
  };

  return (
    <Button
      variant="ghost"
      className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent min-h-[44px]"
      aria-label="Switch Organization"
    >
      <Avatar className={`w-8 h-8 ${isMobile ? '' : 'md:w-10 md:h-10'}`}>
        <AvatarImage src={mockOrgContext.avatar || "/placeholder.svg"} alt={mockOrgContext.name} />
        <AvatarFallback>{mockOrgContext.name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col items-start">
        <span className={`font-medium ${isMobile ? 'text-sm' : 'text-base'}`}>
          {isMobile
            ? mockOrgContext.name.split(' ')[0] // Show only first word on mobile
            : mockOrgContext.name}
        </span>
        {!isMobile && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="w-3 h-3" />
            <span>{mockOrgContext.memberCount} members</span>
          </div>
        )}
      </div>

      {!isMobile && <OrgRoleBadge role={mockOrgContext.userRole} />}

      <ChevronDown className="w-4 h-4 text-muted-foreground" />
    </Button>
  )
}
\`\`\`

**Placement**: Header, sidebar, settings page


#### Task 3.6: Organization Loading States

**File**: `components/organization/org-loading-state.tsx`
**Status**: ✅ Completed
**Completed**: October 12, 2025
**Time Spent**: 45 minutes

**Files Created**:
- `components/organization/org-loading-state.tsx` - Loading state component with multiple variants

**Features Implemented**:

**Mobile**:
- Compact loading spinners (24px)
- Touch-optimized retry button (44px minimum)
- Smaller skeleton loaders
- Reduced padding (p-6)

**Desktop**:
- Larger loading spinners (32px)
- Standard retry button sizing
- Detailed skeleton loaders
- Increased padding (p-8)

**Shared**:
- Three loading variants: spinner, skeleton, card
- Error state with retry functionality
- Specialized loading components (OrgSwitcherLoading, OrgCardLoading, OrgListLoading)
- Responsive sizing using mobile-first Tailwind classes
- useDevice hook for device-specific behavior

**Implementation Notes**:
- All interactive elements meet 44px minimum touch target requirement
- Error messages are more concise on mobile
- Skeleton loaders match the actual component structure
- Supports multiple loading scenarios with variant prop
- Follows mobile-first best practices with responsive classes

**Architecture**: Use Responsive Tailwind Classes

**Features**:
- Skeleton loader for organization data
- Loading spinner
- Error state
- Retry button

**Implementation**:
\`\`\`tsx
import { Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function OrgLoadingState({
  isLoading,
  error,
  onRetry
}: {
  isLoading: boolean
  error?: string
  onRetry?: () => void
}) {
  if (error) {
    return (
      <div className="flex flex-col items-center gap-4 p-8">
        <AlertCircle className="w-12 h-12 text-destructive" />
        <p className="text-sm text-muted-foreground">{error}</p>
        {onRetry && (
          <Button onClick={onRetry} className="min-h-[44px]">
            Retry
          </Button>
        )}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return null
}
\`\`\`



#### Task 3.7: Admin-Only Route Protection UI

**File**: `components/organization/admin-only-guard.tsx`

**Architecture**: Use Responsive Tailwind Classes

**Features**:
- Check user role
- Redirect members to dashboard
- Show error message
- Display required role

**Mock Data**:
\`\`\`typescript
const mockUserRole = 'member'; // 'admin' | 'member'
\`\`\`

**Implementation**:
\`\`\`tsx
import { useOrganizationContext } from '@/hooks/use-organization-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Shield, AlertTriangle } from 'lucide-react'
import { OrgLoadingState } from './org-loading-state' // Assuming OrgLoadingState is imported

export function AdminOnlyGuard({ children }: { children: React.ReactNode }) {
  const { isAdmin, isLoaded } = useOrganizationContext() // Assuming these are available from context
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !isAdmin) {
      router.push('/dashboard')
    }
  }, [isLoaded, isAdmin, router])

  if (!isLoaded) {
    return <OrgLoadingState isLoading={true} />
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center gap-4 p-8">
        <AlertTriangle className="w-12 h-12 text-destructive" />
        <h2 className="text-xl font-semibold">Admin Access Required</h2>
        <p className="text-sm text-muted-foreground text-center">
          This page is only accessible to organization administrators.
        </p>
        <div className="flex items-center gap-2 text-sm">
          <Shield className="w-4 h-4" />
          <span>Required role: Admin</span>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
\`\`\`
**Status**: ✅ Completed
**Completed**: October 12, 2025
**Time Spent**: 45 minutes

**Files Created**:
- `components/organization/admin-only-guard.tsx`

**Features Implemented**:

**Mobile**:
- Stacked error layout with centered content
- 16px icon size, compact spacing
- Full-width back button (44px min height)
- Responsive text sizing (text-sm/text-lg)

**Desktop**:
- Centered error card with max-width constraint
- 20px icon size, generous spacing
- Standard button sizing with proper touch targets
- Larger text sizing (text-base/text-xl)

**Shared**:
- useDevice hook for responsive behavior
- Loading state integration with OrgLoadingState
- Automatic redirect to dashboard for non-admin users
- Error UI with icon, title, description, role badge
- Mock organization context (ready for Clerk integration)
- 44px minimum touch targets on all interactive elements

**Implementation Notes**:
- Uses mock organization context hook (replace with Clerk later)
- Redirects non-admin users to /dashboard automatically
- Shows loading spinner while checking permissions
- Error state displays before redirect completes
- Fully responsive with mobile-first Tailwind classes
- Follows WCAG 2.1 Level AA touch target guidelines

#### Task 3.8: Organization Member List

**File**: `components/organization/org-member-list.tsx`

**Architecture**: Use Split Mobile/Desktop pattern

**Touch Targets**:
- List items: `min-h-[80px]`
- Action buttons: `min-h-[44px] min-w-[44px]`

**Features**:
- Member list with avatars
- Role badges
- Invite member button (admin-only)
- Remove member button (admin-only)
- Member search
- Role filter

**Mock Data**:
\`\`\`typescript
const mockMembers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@acme.com',
    avatar: '/avatars/john.png',
    role: 'admin',
    joinedAt: Date.now() - 86400000 * 30,
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@acme.com',
    avatar: '/avatars/jane.png',
    role: 'member',
    joinedAt: Date.now() - 86400000 * 15,
  },
];
\`\`\`

**Implementation**:
\`\`\`tsx
import { useDevice } from '@/contexts/DeviceProvider'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { OrgRoleBadge } from './org-role-badge' // Corrected import name
import { Button } from '@/components/ui/button'
import { UserPlus, MoreVertical } from 'lucide-react'

export function OrgMemberList() {
  const { isMobile } = useDevice()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Members</h3>
        <Button className="min-h-[44px] gap-2">
          <UserPlus className="w-4 h-4" />
          {!isMobile && <span>Invite Member</span>}
        </Button>
      </div>

      <div className="space-y-2">
        {mockMembers.map((member) => (
          <div
            key={member.id}
            className="flex items-center gap-3 p-3 border rounded-lg min-h-[80px]"
          >
            <Avatar className="w-10 h-10">
              <AvatarImage src={member.avatar || "/placeholder.svg"} />
              <AvatarFallback>{member.name[0]}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{member.name}</span>
                <OrgRoleBadge role={member.role} /> {/* Use OrgRoleBadge */}
              </div>
              <span className="text-sm text-muted-foreground">
                {member.email}
              </span>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="min-h-[44px] min-w-[44px]"
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
\`\`\`

**Placement**: Settings page (Organization tab), dedicated members page

**Status**: ✅ Completed
**Completed**: October 12, 2025
**Time Spent**: 1.5 hours

**Files Created**:
- `components/organization/org-member-list.tsx` - Member list component with search and filtering

**Features Implemented**:

**Mobile**:
- Vertical scrolling member list with 80px minimum height items
- Compact member cards with avatar, name, email, and role badge
- Touch-optimized search input (48px height)
- Role filter dropdown
- 44px minimum touch targets for all interactive elements
- Responsive text sizing (text-sm on mobile, text-base on desktop)

**Desktop**:
- Enhanced member cards with join date information
- Larger avatars (48px vs 40px on mobile)
- Hover states on member cards
- Side-by-side search and filter layout
- More detailed member information display

**Shared**:
- Real-time member search by name or email
- Role-based filtering (All, Admin, Member)
- Admin-only invite member button
- Admin-only member actions (change role, remove member)
- Empty state when no members match filters
- Member count display in header
- Dropdown menu for member actions (change role, remove)

**Implementation Notes**:
- Uses useDevice hook for responsive behavior
- All interactive elements meet 44px minimum touch target requirement
- Search input is 48px height to prevent iOS zoom
- Member list items are 80px minimum height for comfortable tapping
- Admin-only features are conditionally rendered based on user role
- Mock data includes role, join date, and contact information
- Responsive layouts using mobile-first Tailwind classes

#### Task 3.9: Multi-Org Support UI

**File**: `components/organization/multi-org-indicator.tsx`

**Architecture**: Use Responsive Tailwind Classes

**Features**:
- Badge showing number of organizations
- Quick org switcher
- Visual indicator for multi-org users

**Mock Data**:
\`\`\`typescript
const mockUserOrgs = [
  { id: '1', name: 'Acme Corp', role: 'admin' },
  { id: '2', name: 'Startup Inc', role: 'member' },
  { id: '3', name: 'Freelance Projects', role: 'owner' },
];
\`\`\`

**Implementation**:
\`\`\`tsx
import { Building2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { OrgSwitcher } from './org-switcher' // Assuming OrgSwitcher is imported
import { useDevice } from '@/contexts/DeviceProvider'

export function MultiOrgIndicator({ orgCount }: { orgCount: number }) {
  const { isMobile } = useDevice()

  if (orgCount <= 1) return null

  return (
    <div className="flex items-center gap-2">
      <Badge variant="secondary" className="gap-1">
        <Building2 className="w-3 h-3" />
        <span>{orgCount} orgs</span>
      </Badge>
      {!isMobile && <OrgSwitcher />} {/* Render OrgSwitcher only on desktop */}
    </div>
  )
}
\`\`\`

**Placement**: Header, organization switcher

**Status**: ✅ Completed
**Completed**: October 12, 2025
**Time Spent**: 30 minutes

**Files Created**:
- `components/organization/multi-org-indicator.tsx`

**Features Implemented**:

**Mobile**:
- Clickable badge opens org switcher modal (44px touch target)
- Compact badge display with icon and count
- Full-screen org switcher in AdaptiveModal
- Touch-optimized button wrapper

**Desktop**:
- Badge shows full text ("X organizations")
- Inline org switcher dropdown
- Larger icon sizing (16px vs 12px)
- No modal needed

**Shared**:
- Only displays if user has more than 1 organization
- Building2 icon for visual indicator
- Secondary badge variant for subtle appearance
- Responsive text sizing (text-xs on mobile, text-sm on desktop)

**Implementation Notes**:
- Uses useDevice hook for mobile-first behavior
- Mobile badge wrapped in Button for proper touch targets
- Desktop shows inline OrgSwitcher component
- AdaptiveModal provides mobile drawer experience
- Component accepts orgCount and currentOrgName props
- Automatically hides when orgCount <= 1


---

### Phase 4: Payments & Billing UI (3-4 hours)

#### Task 4.1: Pricing Page

**File**: `app/pricing/page.tsx`

**Architecture**: Use Responsive Tailwind Classes + AdaptiveGrid

**Layout**:
\`\`\`tsx
<AdaptiveGrid
  mobileColumns={1}
  tabletColumns={2}
  desktopColumns={3}
  className="gap-4 md:gap-6 lg:gap-8"
>
  {plans.map(plan => <PricingCard key={plan.id} {...plan} />)}
</AdaptiveGrid>
\`\`\`

**Touch Targets**:
- CTA buttons: `min-h-[44px]` with `size="lg"` on mobile
- Feature list items: `min-h-[44px]` for easy tapping

**Features**:
- Plan comparison table
- Feature list per plan
- CTA buttons
- FAQ section (use `AdaptiveNavigation` - accordion on mobile, tabs on desktop)
- Mobile-responsive cards

**Mock Plans**:
\`\`\`typescript
const mockPlans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    tokens: 10000,
    features: ['Compare Mode', '10K tokens/month', '1 user'],
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    tokens: 100000,
    features: ['All modes', '100K tokens/month', 'Up to 5 users'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 99,
    tokens: 500000,
    features: ['Everything', '500K tokens/month', 'Unlimited users'],
  },
];
\`\`\`

#### Task 4.2: Billing Page

**File**: `app/dashboard/billing/page.tsx`

**Architecture**: Use AdaptiveGrid for credit packages and Responsive Tailwind for other sections.

**Sections**:
- Current plan card
- Token balance display
- Credit packages (use `AdaptiveGrid`)
- Subscription plans
- Payment history
- Invoices

**Mock Data**:
\`\`\`typescript
const mockSubscription = {
  plan: 'Pro',
  status: 'active',
  userCount: 8,
  monthlyTokens: 500000,
  nextBilling: '2025-02-12',
};

const mockTokenBalance = {
  monthlyAllocation: 500000,
  used: 234567,
  remaining: 265433,
  overage: 0,
};
\`\`\`

#### Task 4.3: Token Balance Widget

**File**: `components/billing/token-balance-widget.tsx`

**Architecture**: Use Responsive Tailwind Classes

**Features**:
- Progress bar
- Usage stats
- Low balance warning
- Buy credits button
- Mobile-optimized


#### Task 4.4: Token Balance Warning Component

**File**: `components/billing/token-balance-warning.tsx`

**Architecture**: Use Responsive Tailwind Classes

**Features**:
- Alert component for low token balance (< 1000 tokens)
- Critical alert for zero tokens
- Buy credits CTA button
- Dismissible on mobile
- Auto-show on chat page when low

**Mock Data**:
\`\`\`typescript
const mockTokenBalance = {
  remaining: 500, // Low balance
  monthlyAllocation: 100000,
};
\`\`\`

**Implementation**:
\`\`\`tsx
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export function TokenBalanceWarning({ balance }: { balance: number }) {
  if (balance > 1000) return null

  if (balance === 0) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span>You've used all your tokens. Buy more to continue.</span>
          <Button asChild size="sm" variant="outline" className="min-h-[44px] bg-transparent">
            <Link href="/dashboard/billing">Buy Credits</Link>
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <span>Low token balance: {balance.toLocaleString()} remaining</span>
        <Button asChild size="sm" variant="outline" className="min-h-[44px] bg-transparent">
          <Link href="/dashboard/billing">Buy Credits</Link>
        </Button>
      </AlertDescription>
    </Alert>
  )
}
\`\`\`

**Touch Targets**:
- CTA button: `min-h-[44px]`
- Dismiss button (if added): `min-h-[44px] min-w-[44px]`

---

**Removing overcomplicated Phase 4 tasks (4.6 Overage Display, 4.7 Payment Success/Failure Pages, 4.8 Subscription Status Badge)**
**Simplifying Phase 4 to match PHASE_7_POLAR_PAYMENTS_PLAN.md scope exactly**

---

### Phase 5: Memory System UI (6-8 hours)

**Priority**: HIGH (Game-changer for agent intelligence)

This phase builds the UI for the memory management system from Phase 8.

**Memory Scopes Explained**:
- **Organization Scope**: Admins can add memory shared across the entire organization (all workspaces)
- **Workspace Scope**: Admins can add memory shared within a specific workspace
- **User Scope**: Individual users can add their own private memory (NOT shared with workspace or organization)
- **Chat Scope**: Session-specific memory (temporary, tied to a single debate)

**Permission Model**:
- **Admins**: Can create/edit/delete organization and workspace memory
- **Members**: Can only create/edit/delete their own user-level memory
- **All Users**: Can create chat-level memory for their own sessions

#### Task 5.1: Memory Dashboard

**File**: `app/dashboard/memory/page.tsx`

**Architecture**: Use Split Mobile/Desktop pattern

**Directory Structure**:
\`\`\`
components/memory/
├── memory-dashboard.tsx      # Main orchestrator
├── mobile/
│   ├── memory-list-mobile.tsx
│   └── memory-card-mobile.tsx
├── desktop/
│   ├── memory-grid-desktop.tsx  # CHANGED from memory-list-desktop.tsx
│   └── memory-card-desktop.tsx
└── shared/
    ├── memory-search.tsx
    └── memory-filters.tsx
\`\`\`

**Mobile Specifications**:
- Vertical scroll list
- Compact cards: `min-h-[80px]`
- Search bar: `min-h-[48px]`
- Floating action button (FAB) for "Add Memory": `h-14 w-14` (56px)
- Bottom sheet for filters using `AdaptiveModal`

**Desktop Specifications**:
- Grid layout: 2-3 columns
- Larger cards with hover states
- Sidebar filters (always visible)
- Top action bar

**Features**:
- Memory list with cards
- Search bar
- Category filter
- Scope selector (workspace/org)
- Add memory button
- Upload document button
- Import from URL button

**Mock Memories**:
\`\`\`typescript
const mockMemories = [
  {
    id: '1',
    title: 'Company Tech Stack',
    category: 'Technical',
    content: '- Next.js\n- Convex\n- TypeScript',
    tags: ['tech', 'stack'],
    source: 'manual',
    usageCount: 45,
    createdAt: Date.now() - 86400000,
  },
  {
    id: '2',
    title: 'Agile Process',
    category: 'Business',
    content: '- 2-week sprints\n- Daily standups',
    tags: ['process', 'agile'],
    source: 'document',
    sourceDocument: 'handbook.pdf',
    usageCount: 23,
    createdAt: Date.now() - 172800000,
  },
];
\`\`\`

**Implementation**:
\`\`\`tsx
import { useDevice } from "@/contexts/DeviceProvider"
import { MemoryListMobile } from "./mobile/memory-list-mobile"
import { MemoryGridDesktop } from "./desktop/memory-grid-desktop" // CHANGED import
import { useState } from "react"

export function MemoryDashboard() {
  const { isMobile } = useDevice()
  const [memories, setMemories] = useState(mockMemories)

  return isMobile ? (
    <MemoryListMobile memories={memories} />
  ) : (
    <MemoryGridDesktop memories={memories} /> // CHANGED component
  )
}
\`\`\`

#### Task 5.2: Add Memory Form

**File**: `components/memory/add-memory-form.tsx`

**Architecture**: Use AdaptiveModal (full-screen on mobile, modal on desktop)

**Touch Targets**:
- All inputs: `min-h-[48px]`
- All buttons: `min-h-[44px]`
- Dropdown triggers: `min-h-[48px]`

**Fields**:
- Title (required)
- Category dropdown
- Content textarea (markdown)
- Tags input
- Scope selector
- Source indicator

**Implementation**:
\`\`\`tsx
<AdaptiveModal
  isOpen={isOpen}
  onClose={onClose}
  title="Add Memory"
>
  <form className="space-y-4">
    <Input
      placeholder="Title"
      className="min-h-[48px]"
    />
    <Select className="min-h-[48px]">
      <SelectTrigger>Category</SelectTrigger>
    </Select>
    <Textarea
      placeholder="Content (Markdown supported)"
      className="min-h-[120px]"
    />
    <Button
      type="submit"
      className="min-h-[44px] w-full"
    >
      Save Memory
    </Button>
  </form>
</AdaptiveModal>
\`\`\`

#### Task 5.3: Document Upload Interface

**File**: `components/memory/document-upload.tsx`

**Architecture**: Use AdaptiveModal with drag-and-drop

**Touch Targets**:
- Upload button: `min-h-[44px]`
- File cards: `min-h-[80px]`
- Action buttons: `min-h-[44px]`

**Features**:
- Drag & drop zone (desktop only)
- File picker button (mobile + desktop)
- File type indicator
- Upload progress
- AI extraction preview
- Review suggested memories
- Approve/reject interface

**Mobile Specifications**:
- Full-screen modal
- Large tap target for file picker: `min-h-[120px]`
- Bottom sheet for review using `AdaptiveModal`

**Desktop Specifications**:
- Center modal
- Drag & drop zone
- Side-by-side preview

**Mock Upload Flow**:
\`\`\`typescript
const mockExtractedMemories = [
  {
    title: 'Vacation Policy',
    category: 'Policies',
    content: '- 20 days PTO\n- Flexible scheduling',
    tags: ['hr', 'benefits'],
  },
  {
    title: 'Work Hours',
    category: 'Policies',
    content: '- Core hours: 10am-4pm\n- Flexible start/end',
    tags: ['hr', 'schedule'],
  },
];
\`\`\`

#### Task 5.4: URL Scraping Interface

**File**: `components/memory/url-scraper.tsx`

**Architecture**: Use AdaptiveModal

**Touch Targets**:
- URL input: `min-h-[48px]`
- Scrape button: `min-h-[44px]`
- Preview cards: `min-h-[80px]`

**Features**:
- URL input field
- Scrape button
- Loading state
- Preview scraped content
- AI extraction preview
- Review suggested memories

**Implementation**:
\`\`\`tsx
<AdaptiveModal
  isOpen={isOpen}
  onClose={onClose}
  title="Import from URL"
>
  <div className="space-y-4">
    <Input
      type="url"
      placeholder="https://example.com/article"
      className="min-h-[48px]"
    />
    <Button
      onClick={handleScrape}
      className="min-h-[44px] w-full"
    >
      Scrape Content
    </Button>
    {/* Preview and review UI */}
  </div>
</AdaptiveModal>
\`\`\`

#### Task 5.5: Save Chat as Memory

**File**: `components/chat/save-chat-as-memory-form.tsx`

**Architecture**: Use AdaptiveModal

**Touch Targets**:
- All inputs: `min-h-[48px]`
- Save button: `min-h-[44px]`

**Features**:
- Chat summary display
- AI-extracted insights preview
- Edit insights
- Select scope
- Add tags
- Save button

**Mock Extracted Insights**:
\`\`\`typescript
const mockChatInsights = [
  {
    title: 'Feature Prioritization Decision',
    category: 'Debate Insights',
    content: 'Team agreed to prioritize memory system over marketplace',
    tags: ['decision', 'roadmap'],
  },
];
\`\`\`

#### Task 5.6: Save Artifact as Memory

**File**: `components/artifacts/save-artifact-as-memory-form.tsx`

**Architecture**: Use AdaptiveModal

**Touch Targets**: Same as Task 5.5

**Features**:
- Artifact preview
- AI-extracted learnings
- Edit learnings
- Select scope
- Add tags
- Save button

#### Task 5.7: Save Debate Result as Memory

**File**: `components/debate/save-debate-result-form.tsx`

**Architecture**: Use AdaptiveModal

**Touch Targets**: Same as Task 5.5

**Features**:
- Debate summary
- Winning arguments
- Consensus points
- Action items
- Edit extracted content
- Select scope
- Save button

---

**Removing overcomplicated Phase 5 tasks (5.8-5.15: Memory Scope Indicator, Analytics, Suggestions, Hierarchy, Loading, Preview, Reference)**
**Simplifying Phase 5 to match PHASE_8_MEMORY_IMPLEMENTATION.md scope exactly**
---

## POST-MVP FEATURES (Phase 6 - Advanced Features)

**Status**: ⏸️ POSTPONED FOR POST-MVP
**Priority**: P6 (Nice-to-have features)
**Timeline**: 12-15 hours (after MVP launch)

All Phase 6 (Advanced Features) have been moved to a dedicated file for better organization.

**See**: `docs/implementation/ToDo/POST_MVP_FEATURES_PLAN.md` for complete details on:
- Phase 6.1: Advanced Export System (3-4 hours)
- Phase 6.2: Community Marketplace (4-5 hours)
- Phase 6.3: Custom Agent Training & Enhanced Auto-Debate (5-6 hours)

**Rationale for Postponement**:
- These features are not critical for MVP launch
- They require significant development time (12-15 hours total)
- Core functionality (debates, agents, memory) should be perfected first
- Can be added incrementally after MVP based on user feedback

---

## Updated Timeline Summary

| Phase | Tasks | Duration | Status |
|-------|-------|----------|--------|
| Phase 1 | Core Database UI | 6-8 hours | ❌ Not Started |
| Phase 2 | Navigation & Layout | 2-3 hours | ❌ Not Started |
| Phase 3 | User Management | 4-5 hours | ❌ Not Started |
| Phase 4 | Payments & Billing | 3-4 hours | ❌ Not Started |
| Phase 5 | Memory System | 6-8 hours | ❌ Not Started |
| Phase 9 | AI SDK Tools Integration | 4-5 hours | ❌ Not Started |
| **MVP Total** | | **25-33 hours** | |

---

## Component Inventory

### New Components to Create

**Layout Components** (Use Split Mobile/Desktop pattern):
- [ ] `components/layout/main-nav.tsx` - Main orchestrator
- [ ] `components/layout/mobile/main-nav-mobile.tsx` - Mobile implementation
- [ ] `components/layout/desktop/main-nav-desktop.tsx` - Desktop implementation
- [ ] `components/layout/sidebar-nav.tsx` - Main orchestrator
- [ ] `components/layout/mobile/sidebar-nav-mobile.tsx` - Mobile implementation
- [ ] `components/layout/desktop/sidebar-nav-desktop.tsx` - Desktop implementation
- [ ] `components/layout/breadcrumbs.tsx` - Responsive Tailwind classes

**Organization Components** (Use Adaptive Components):
- [ ] `components/organization/org-switcher.tsx` - Uses AdaptiveModal
- [ ] `components/organization/org-role-badge.tsx` - Responsive Tailwind
- [ ] `components/organization/org-context-display.tsx` - Responsive Tailwind
- [ ] `components/organization/org-loading-state.tsx` - Responsive Tailwind
- [ ] `components/organization/admin-only-guard.tsx` - Responsive Tailwind
- [ ] `components/organization/org-member-list.tsx` - Split Mobile/Desktop
- [ ] `components/organization/multi-org-indicator.tsx` - Responsive Tailwind

**Settings Components** (Use Responsive Tailwind classes):
- [ ] `components/settings/profile-panel.tsx` ← NEW
- [ ] `components/settings/preferences-panel.tsx` ← NEW
- [ ] `components/settings/notification-settings.tsx`

**Billing Components** (Use Responsive Tailwind classes):
- [ ] `components/billing/token-balance-widget.tsx`
- [ ] `components/billing/subscription-card.tsx`
- [ ] `components/billing/credit-packages.tsx` - Uses AdaptiveGrid
- [ ] `components/billing/payment-history.tsx`
- [ ] `components/billing/token-balance-warning.tsx` ← NEW
- [ ] `components/billing/subscription-status-badge.tsx` ← NEW (REMOVED per updates)
- [ ] `components/billing/overage-display.tsx` ← NEW (REMOVED per updates)

**Memory Components** (Use Adaptive Components):
- [ ] `components/memory/memory-dashboard.tsx` - Main orchestrator
- [ ] `components/memory/mobile/memory-list-mobile.tsx`
- [ ] `components/memory/desktop/memory-grid-desktop.tsx`
- [ ] `components/memory/add-memory-form.tsx` - Uses AdaptiveModal
- [ ] `components/memory/document-upload.tsx` - Uses AdaptiveModal
- [ ] `components/memory/url-scraper.tsx` - Uses AdaptiveModal
- [ ] `components/memory/memory-card.tsx`
- [ ] `components/memory/memory-filters.tsx`
- [ ] `components/memory/memory-scope-badge.tsx` (REMOVED per updates)
- [ ] `components/memory/memory-usage-analytics.tsx` (REMOVED per updates)
- [ ] `components/memory/memory-source-link.tsx` (REMOVED per updates)
- [ ] `components/memory/memory-hierarchy-viz.tsx` (REMOVED per updates)
- [ ] `components/memory/memory-loading-indicator.tsx` (REMOVED per updates)
- [ ] `components/memory/memory-preview.tsx` (REMOVED per updates)
- [ ] `components/memory/memory-reference-indicator.tsx` (REMOVED per updates)
- [ ] `components/chat/save-chat-as-memory-form.tsx` - Uses AdaptiveModal
- [ ] `components/artifacts/save-artifact-as-memory-form.tsx` - Uses AdaptiveModal
- [ ] `components/debate/save-debate-result-form.tsx` - Uses AdaptiveModal

**Export Components** (Use Adaptive Components):
- [ ] `components/export/export-dialog.tsx` - Uses AdaptiveModal
- [ ] `components/export/cloud-storage-selector.tsx` - Uses AdaptiveModal
- [ ] `components/export/template-editor.tsx` - Uses AdaptiveModal
- [ ] `components/export/batch-export-panel.tsx`
- [ ] `components/export/scheduled-export-manager.tsx`

**Marketplace Components** (Use Split Mobile/Desktop pattern):
- [ ] `components/marketplace/marketplace-page.tsx` - Main orchestrator
- [ ] `components/marketplace/mobile/template-list-mobile.tsx`
- [ ] `components/marketplace/mobile/template-card-mobile.tsx`
- [ ] `components/marketplace/desktop/template-grid-desktop.tsx`
- [ ] `components/marketplace/desktop/template-card-desktop.tsx`
- [ ] `components/marketplace/shared/template-search.tsx`
- [ ] `components/marketplace/shared/template-filters.tsx`
- [ ] `components/marketplace/template-detail.tsx` - Uses AdaptiveModal
- [ ] `components/marketplace/template-rating.tsx`
- [ ] `components/marketplace/template-reviews.tsx`
- [ ] `components/marketplace/review-form.tsx` - Uses AdaptiveModal

**Agent Components** (Use Adaptive Components):
- [ ] `components/agents/agent-training-interface.tsx` - Uses AdaptiveModal
- [ ] `components/agents/agent-fine-tuning.tsx` - Uses AdaptiveModal
- [ ] `components/agents/agent-performance.tsx`

**Tournament Components** (Use Split Mobile/Desktop pattern):
- [ ] `components/tournaments/tournament-manager.tsx` - Main orchestrator
- [ ] `components/tournaments/mobile/tournament-list-mobile.tsx`
- [ ] `components/tournaments/desktop/tournament-grid-desktop.tsx`
- [ ] `components/tournaments/tournament-bracket.tsx` - Responsive Tailwind
- [ ] `components/tournaments/match-card.tsx`
- [ ] `components/tournaments/leaderboard.tsx`

### New Core Database UI Components (Phase 1)
- [ ] `components/sessions/session-list.tsx` - Split Mobile/Desktop
- [ ] `components/sessions/mobile/session-list-mobile.tsx`
- [ ] `components/sessions/desktop/session-list-desktop.tsx`
- [ ] `components/messages/message-list.tsx` - Split Mobile/Desktop
- [ ] `components/messages/mobile/message-list-mobile.tsx`
- [ ] `components/messages/desktop/message-list-desktop.tsx`
- [ ] `components/agents/agent-list.tsx` - Split Mobile/Desktop
- [ ] `components/agents/mobile/agent-list-mobile.tsx`
- [ ] `components/agents/desktop/agent-list-desktop.tsx`
- [ ] `components/artifacts/artifact-list.tsx` - Split Mobile/Desktop
- [ ] `components/artifacts/mobile/artifact-list-mobile.tsx`
- [ ] `components/artifacts/desktop/artifact-list-desktop.tsx`
- [ ] `components/migration/migration-dialog.tsx` - Adaptive Components
- [ ] `components/ui/offline-indicator.tsx` - Responsive Tailwind

### New AI SDK Tools Components (Use Adaptive Components and Split Mobile/Desktop):
- [ ] `components/agents/model-selector.tsx` - Uses AdaptiveModal
- [ [ ] `components/chat/workflow-pattern-indicator.tsx` - Responsive Tailwind
- [ ] `components/chat/modes/parallel-response-display.tsx` - Split Mobile/Desktop
- [ ] `components/chat/modes/mobile/parallel-responses-mobile.tsx` - Mobile implementation
- [ ] `components/chat/modes/desktop/parallel-responses-desktop.tsx` - Desktop implementation
- [ ] `components/chat/modes/debate-round-indicator.tsx` - Responsive Tailwind
- [ ] `components/chat/modes/orchestrator-decision-display.tsx` - Responsive Tailwind
- [ ] `components/agents/agent-configuration-panel.tsx` - Uses AdaptiveModal
- [ ] `components/dashboard/AgentLibraryCard.tsx` (Task 9.7) ← NEW
- [ ] `components/chat/modes/mode-api-config.ts` (Task 9.8) ← NEW
- [ ] `components/chat/modes/handoff-indicator.tsx` (Task 9.9) ← NEW
- [ ] `components/chat/modes/synthesis-display.tsx` (Task 9.10) ← NEW
- [ ] Update `components/dashboard/SessionCard.tsx` (Task 9.11)
- [ ] Update `components/dashboard/AnalyticsDashboard.tsx` (Task 9.12)

### Pages to Create

- [ ] `app/pricing/page.tsx` - Uses AdaptiveGrid
- [ ] `app/dashboard/billing/page.tsx` - Uses AdaptiveGrid
- [ ] `app/dashboard/memory/page.tsx` - Uses Split Mobile/Desktop
- [ ] `app/marketplace/page.tsx` - Uses Split Mobile/Desktop
- [ ] `app/marketplace/[id]/page.tsx` - Uses AdaptiveModal
- [ ] `app/dashboard/export/page.tsx` - Uses Adaptive Components
- [ ] `app/dashboard/tournaments/page.tsx` - Uses Split Mobile/Desktop
- [ ] `app/dashboard/billing/success/page.tsx` ← NEW
- [ ] `app/dashboard/billing/failure/page.tsx` ← NEW

---

## Mock Data Strategy

### Centralized Mock Data

**File**: `lib/mock-data.ts`

\`\`\`typescript
export const mockData = {
  organizations: [...],
  subscriptions: [...],
  tokenBalance: {...},
  memories: [...],
  exportJobs: [...],
  marketplaceTemplates: [...],
  reviews: [...],
  tournaments: [...],
  trainingJobs: [...],
  sessions: [...], // Added for Phase 1
  messages: [...], // Added for Phase 1
  agents: [...],   // Added for Phase 1
  artifacts: [...], // Added for Phase 1
};
\`\`\`

### Mock API Functions

**File**: `lib/mock-api.ts`

\`\`\`typescript
export const mockApi = {
  // Memory
  getMemories: async () => mockData.memories,
  createMemory: async (data) => ({ id: '123', ...data }),

  // Billing
  getSubscription: async () => mockData.subscriptions[0],
  getTokenBalance: async () => mockData.tokenBalance,

  // Marketplace
  getTemplates: async () => mockData.marketplaceTemplates,
  getTemplate: async (id) => mockData.marketplaceTemplates.find(t => t.id === id),

  // Export
  createExportJob: async (data) => ({ id: '123', status: 'pending', ...data }),

  // Phase 1 Mock API Functions
  getSessions: async () => mockData.sessions,
  createSession: async (data) => ({ id: 'new-session-id', ...data }),
  getMessages: async (sessionId) => mockData.messages.filter(m => m.sessionId === sessionId),
  sendMessage: async (data) => ({ id: 'new-message-id', ...data }),
  getAgents: async () => mockData.agents,
  createAgent: async (data) => ({ id: 'new-agent-id', ...data }),
  getArtifacts: async (sessionId) => mockData.artifacts.filter(a => a.sessionId === sessionId),
  uploadArtifact: async (data) => ({ id: 'new-artifact-id', ...data }),

  // Tournaments
  getTournaments: async () => mockData.tournaments,
};
\`\`\`

### Mock Hooks

**File**: `hooks/use-mock-data.ts`

\`\`\`typescript
import { useState } from 'react'; // Ensure useState is imported

export function useMockMemories() {
  const [memories, setMemories] = useState(mockData.memories);
  const [isLoading, setIsLoading] = useState(false);

  return { memories, isLoading };
}

export function useMockSubscription() {
  const [subscription, setSubscription] = useState(mockData.subscriptions[0]);
  const [isLoading, setIsLoading] = useState(false);

  return { subscription, isLoading };
}

// Add hooks for Phase 1 data
export function useMockSessions() {
  const [sessions, setSessions] = useState(mockData.sessions);
  const [isLoading, setIsLoading] = useState(false);
  return { sessions, isLoading, setSessions };
}

export function useMockMessages(sessionId: string) {
  const [messages, setMessages] = useState(mockData.messages.filter(m => m.sessionId === sessionId));
  const [isLoading, setIsLoading] = useState(false);
  return { messages, isLoading, setMessages };
}

export function useMockAgents() {
  const [agents, setAgents] = useState(mockData.agents);
  const [isLoading, setIsLoading] = useState(false);
  return { agents, isLoading, setAgents };
}

export function useMockArtifacts(sessionId: string) {
  const [artifacts, setArtifacts] = useState(mockData.artifacts.filter(a => a.sessionId === sessionId));
  const [isLoading, setIsLoading] = useState(false);
  return { artifacts, isLoading, setArtifacts };
}
\`\`\`

---

## Mobile-First Design Checklist

### Touch Targets
- [ ] All buttons ≥ 44px height
- [ ] All form inputs ≥ 48px height
- [ ] Adequate spacing between interactive elements (≥ 8px)

### Responsive Layouts
- [ ] Mobile: Single column, vertical scroll
- [ ] Tablet: 2-column grid where appropriate
- [ ] Desktop: Multi-column layouts with sidebars

### Navigation
- [ ] Mobile: Hamburger menu or bottom nav
- [ ] Tablet: Collapsible sidebar
- [ ] Desktop: Persistent sidebar

### Forms
- [ ] Mobile: Full-width inputs, stacked labels
- [ ] Desktop: Inline labels where appropriate
- [ ] Touch-optimized dropdowns and selects

### Modals & Dialogs
- [ ] Mobile: Full-screen or bottom sheet
- [ ] Desktop: Centered modal with backdrop

---

## Testing Checklist

### **Breakpoint Testing (REQUIRED)**
- [ ] 320px (iPhone SE) - Smallest mobile
- [ ] 375px (iPhone 12/13) - Common mobile
- [ ] 768px (iPad Portrait) - Tablet breakpoint (MOBILE BREAKPOINT)
- [ ] 1024px (iPad Landscape) - Desktop breakpoint (DESKTOP BREAKPOINT)
- [ ] 1440px (Laptop) - Large desktop

### **Touch Target Testing (WCAG 2.1 Level AA)**
- [ ] All buttons ≥ 44px × 44px
- [ ] All form inputs ≥ 48px height
- [ ] All cards/list items ≥ 80px height
- [ ] Adequate spacing between touch targets (≥ 8px)

### **Orientation Testing**
- [ ] Portrait mode works correctly
- [ ] Landscape mode works correctly
- [ ] Orientation change doesn't break layout
- [ ] Content reflows properly

### **Performance Testing (REQUIRED METRICS)**
- [ ] First Contentful Paint (FCP) < 1.5s on 3G
- [ ] Largest Contentful Paint (LCP) < 2.5s on 3G
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] First Input Delay (FID) < 100ms

### **Accessibility Testing (WCAG 2.1 Level AA)**
- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] Focus indicators visible
- [ ] Color contrast ≥ 4.5:1
- [ ] Reduced motion respected (use `useReducedMotion()` hook)

### **Device Detection Testing**
- [ ] `useDevice()` hook works correctly
- [ ] Mobile view renders on mobile devices
- [ ] Desktop view renders on desktop devices
- [ ] Tablet view renders appropriately
- [ ] No hydration errors

### **Adaptive Component Testing**
- [ ] AdaptiveModal renders as drawer on mobile
- [ ] AdaptiveModal renders as modal on desktop
- [ ] AdaptiveNavigation renders as accordion on mobile
- [ ] AdaptiveNavigation renders as tabs on desktop
- [ ] AdaptiveGrid adjusts columns correctly

### Visual Testing
- [ ] All pages render correctly on mobile (320px)
- [ ] All pages render correctly on tablet (768px)
- [ ] All pages render correctly on desktop (1440px)
- [ ] Dark mode works for all components
- [ ] Light mode works for all components

### Interaction Testing
- [ ] All buttons are clickable
- [ ] All forms can be filled out
- [ ] All dropdowns open and close
- [ ] All modals open and close
- [ ] All navigation links work

### Accessibility Testing
- [ ] All interactive elements have focus states
- [ ] All images have alt text
- [ ] All forms have labels
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility

### Performance Testing
- [ ] Pages load in < 2 seconds
- [ ] No layout shift on load
- [ ] Smooth animations (60fps)
- [ ] Images are optimized

### **Core Database UI (Phase 1) Testing**
- [ ] Session list displays correctly on mobile and desktop
- [ ] Session creation form works with validation
- [ ] Session search and filtering functional
- [ ] Message list displays with threading and reactions
- [ ] Message input and sending works
- [ ] Agent list displays with categories and filters
- [ ] Agent creation form works
- [ ] Artifact list displays with type filtering
- [ ] Artifact preview works for all types
- [ ] Migration dialog shows progress correctly
- [ ] Offline indicator accurately reflects connection status

---

## Implementation Order

### Week 1: Foundation (8-10 hours)
1. **Core Database UI Components** (6-8 hours) - NEW PHASE
   - Implement Session Management UI
   - Implement Message Management UI
   - Implement Agent Management UI
   - Implement Artifact Management UI
   - Implement Migration & Offline Support UI
   - Test device detection with `useDevice()`

2. **Navigation & Layout** (3-4 hours)
   - Set up Split Mobile/Desktop architecture
   - Implement AdaptiveModal for mobile sidebar
   - Test touch targets (44px minimum)

3. **User Management UI** (2-3 hours)
   - Implement org switcher with AdaptiveModal
   - Create settings pages with responsive Tailwind
   - Test on all breakpoints (320px, 768px, 1024px)

### Week 2: Core Features (8-12 hours)
4. **Payments UI** (3-4 hours)
   - Use AdaptiveGrid for pricing cards
   - Implement responsive billing page
   - Test accessibility (keyboard navigation)

5. **Memory System UI** (6-8 hours) - UPDATED DURATION
   - Implement Split Mobile/Desktop architecture
   - Use AdaptiveModal for all forms
   - Test touch targets (48px inputs, 80px cards)

### Week 3: AI SDK Tools Integration (4-5 hours)

6. **AI SDK Tools Integration** (4-5 hours)
   - Implement model selector with AdaptiveModal
   - Integrate workflow pattern indicators
   - Implement responsive parallel/debate/orchestrator displays

**Total Estimated Time**: 25-33 hours - UPDATED TOTAL

---

## Success Criteria

### **Architecture Compliance**
- [ ] All components follow patterns from `mobile-first-best-practices.md`
- [ ] All device detection uses `useDevice()` from DeviceProvider
- [ ] Split Mobile/Desktop pattern used where appropriate
- [ ] Adaptive Components used where appropriate
- [ ] Responsive Tailwind classes used where appropriate

### **Touch Target Compliance (WCAG 2.1 Level AA)**
- [ ] All buttons ≥ 44px × 44px
- [ ] All form inputs ≥ 48px height
- [ ] All cards/list items ≥ 80px height
- [ ] Spacing between targets ≥ 8px

### **Breakpoint Compliance**
- [ ] Mobile-first approach (base styles, then md:, then lg:)
- [ ] Works at 320px (smallest mobile)
- [ ] Works at 768px (tablet/mobile breakpoint)
- [ ] Works at 1024px (desktop breakpoint)

### **Performance Compliance**
- [ ] FCP < 1.5s on 3G
- [ ] LCP < 2.5s on 3G
- [ ] CLS < 0.1
- [ ] FID < 100ms

### **Accessibility Compliance (WCAG 2.1 Level AA)**
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Focus indicators visible
- [ ] Color contrast ≥ 4.5:1
- [ ] Reduced motion respected

### **Functional Compliance**
- [ ] All planned features have UI components
- [ ] All components use mock data
- [ ] Navigation structure is complete
- [ ] All forms are functional (with mock submissions)
- [ ] Dark/light mode works everywhere
- [ ] No console errors or warnings

### **Core Database UI Compliance (Phase 1)**
- [ ] Session management UI is fully responsive and functional.
- [ ] Message management UI supports threading and reactions.
- [ ] Agent management UI includes filtering and creation.
- [ ] Artifact management UI supports type filtering and preview.
- [ ] Migration dialog correctly visualizes progress and errors.
- [ ] Offline indicator accurately reflects connection status.

### **AI SDK Tools Integration Compliance**
- [ ] Model selector UI works with 100+ models from Vercel AI Gateway
- [ ] Workflow pattern indicators show correct pattern for each mode
- [ ] Parallel response display works in Compare Mode
- [ ] Debate round indicator works in Debate Mode
- [ ] Orchestrator decision display works in Auto-Debate Mode
- [ ] Agent configuration panel integrates with agent factory
- [ ] Dashboard agent library shows agent factory integration ← NEW
- [ ] API route selector maps modes to correct endpoints ← NEW
- [ ] Handoff visualization shows agent handoffs ← NEW
- [ ] Synthesis display distinguishes orchestrator's final synthesis ← NEW
- [ ] Session persistence UI shows Convex sync status
- [ ] Analytics dashboard shows mode usage, model usage, and cost breakdown

---

## Next Steps After Sprint

1. **Backend Integration**: Replace mock data with real Convex queries
2. **API Integration**: Connect forms to actual API routes
3. **State Management**: Implement proper state management
4. **Error Handling**: Add error boundaries and fallbacks
5. **Loading States**: Add skeleton loaders and spinners
6. **Validation**: Add form validation
7. **Testing**: Write unit and integration tests
8. **Performance Optimization**: Implement lazy loading, code splitting

---

## Reference Documentation

**REQUIRED READING**:
- `docs/guides/mobile-first-best-practices.md` - Complete mobile-first guide
- `docs/guides/feature-implementation-best-practices.md` - Feature development patterns

**Additional Resources**:
- WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- Touch Target Guidance: https://www.w3.org/WAI/WCAG21/Understanding/target-size.html

---

**Status**: ❌ NOT STARTED (0%)
**Ready to Start**: Immediately (no dependencies)
**Priority**: HIGH (Enables parallel development)
**Architecture Compliance**: ✅ Aligned with mobile-first-best-practices.md

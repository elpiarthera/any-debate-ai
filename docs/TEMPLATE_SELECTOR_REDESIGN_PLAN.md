# Template Selector UI Redesign Plan (Mobile-First)

## Overview
Comprehensive plan to redesign the template selector UI for both mobile and desktop, following mobile-first principles and leveraging the existing responsive architecture.

## Current Architecture Analysis

### Existing Responsive System
- **DeviceProvider Context**: Provides `isMobile`, `isTablet`, `isDesktop`, breakpoint checks
- **Breakpoints**: 
  - Mobile: < 768px
  - Tablet: 768-1023px
  - Desktop: ≥ 1024px
- **Adaptive Components**:
  - `AdaptiveModal`: Auto-switches between Dialog (desktop) and Drawer (mobile)
  - `AdaptiveGrid`: Responsive grid with device-specific columns
  - `AdaptiveNavigation`: Device-specific navigation patterns
- **Hooks**: `useBreakpoint`, `useViewport`, `useOrientation`, `useDevice`

### Current Template Selector Issues

#### Mobile Problems
1. Template list view has poor information density
2. Category chips overflow without clear scrollability
3. Template detail view requires excessive scrolling
4. "Back to templates" link is redundant with back arrow
5. Agent list is cut off - unclear how many agents exist
6. "15" count is confusing without context
7. No sticky CTA button positioning
8. Poor touch target sizes in some areas

#### Desktop Problems
1. No split-view preview (should show template details alongside list)
2. Modal doesn't properly overlay content (no backdrop)
3. Modal width is awkward - doesn't utilize space efficiently
4. Category chips overflow horizontally
5. Template cards could display more information in grid
6. No keyboard navigation support
7. Missing proper focus management

---

## Proposed Solution Architecture

### 1. Mobile Experience (< 768px)

#### Template List View
\`\`\`
┌─────────────────────────────┐
│ ← Choose a Template      ✕  │ ← Header (sticky)
│ Start with a pre-config...  │ ← Subtitle
├─────────────────────────────┤
│ 🔍 Search templates...      │ ← Search (sticky)
├─────────────────────────────┤
│ [All] General  Business →   │ ← Horizontal scroll chips
│ ⭐ Show Custom (15 total)   │ ← Filter toggle with count
├─────────────────────────────┤
│ ┌─────────────────────────┐ │
│ │ 👥 Business Strategy    →│ │ ← Compact card
│ │ Strategic planning...    │ │
│ │ Business • 3 agents      │ │
│ │ #business #strategy      │ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ 🚀 Startup Launch       →│ │
│ │ Planning and executing...│ │
│ │ Collaboration • 4 agents │ │
│ │ #startup #launch         │ │
│ └─────────────────────────┘ │
│                             │
└─────────────────────────────┘
\`\`\`

**Key Features:**
- Sticky header with back button and close
- Sticky search bar (48px min height for touch)
- Horizontal scrollable category chips with scroll indicators
- Filter toggle with clear count display ("15 templates")
- Compact cards (min 56px touch target)
- Tap card → navigate to full-screen detail view
- Smooth transitions between views

#### Template Detail View (Full Screen)
\`\`\`
┌─────────────────────────────┐
│ ← Business Strategy Team  ✕ │ ← Header (sticky)
├─────────────────────────────┤
│ 👥 Business Strategy Team   │
│ Strategic planning and      │
│ business development        │
│                             │
│ Business Strategy • Collab  │
│ 3 agents                    │
├─────────────────────────────┤
│ Agent Team                  │
│ ┌─────────────────────────┐ │
│ │ 👤 CEO                   │ │
│ │ Strategic leadership     │ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ 👤 CFO                   │ │
│ │ Financial planning       │ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ 👤 CTO                   │ │
│ │ Technology strategy      │ │
│ └─────────────────────────┘ │
│                             │
│ (scroll for more)           │
├─────────────────────────────┤
│ [Use This Template]         │ ← Sticky CTA
└─────────────────────────────┘
\`\`\`

**Key Features:**
- Full-screen view with sticky header
- Back button returns to list
- Scrollable content area
- All agent cards visible (no truncation)
- Sticky CTA button at bottom (56px height)
- Swipe gestures for navigation

### 2. Desktop Experience (≥ 1024px)

#### Split View with Live Preview
\`\`\`
┌───────────────────────────────────────────────────────────┐
│ Choose a Template                                      ✕  │
│ Start with a pre-configured agent team                    │
├───────────────────────────────────────────────────────────┤
│ 🔍 Search templates by name, description, or tags...     │
├───────────────────────────────────────────────────────────┤
│ [All] [General Purpose] [Business] [Product] [Tech] ...  │
│ ⭐ Show Custom Only                    15 templates       │
├──────────────────────────┬────────────────────────────────┤
│ Template List (40%)      │ Preview Pane (60%)             │
├──────────────────────────┼────────────────────────────────┤
│ ┌──────────────────────┐ │ 👥 Business Strategy Team      │
│ │👥 Business Strategy →│ │                                │
│ │Strategic planning... │ │ Strategic planning and         │
│ │Business • 3 agents   │ │ business development for       │
│ │#business #strategy   │ │ growing companies              │
│ └──────────────────────┘ │                                │
│ ┌──────────────────────┐ │ Business Strategy • Collab     │
│ │🚀 Startup Launch    →│ │ 3 agents                       │
│ │Planning and exec...  │ │                                │
│ │Collab • 4 agents     │ │ ┌────────────────────────────┐ │
│ │#startup #launch      │ │ │ Agent Team                 │ │
│ └──────────────────────┘ │ │                            │ │
│ ┌──────────────────────┐ │ │ 👤 CEO                     │ │
│ │🎨 Product Design    →│ │ │ Strategic leadership and   │ │
│ │Designing user-cen... │ │ │ decision making            │ │
│ │Collab • 3 agents     │ │ │                            │ │
│ │#product #design      │ │ │ 👤 CFO                     │ │
│ └──────────────────────┘ │ │ Financial planning and     │ │
│                          │ │ budget management          │ │
│ (scroll for more)        │ │                            │ │
│                          │ │ 👤 CTO                     │ │
│                          │ │ Technology strategy and    │ │
│                          │ │ implementation             │ │
│                          │ └────────────────────────────┘ │
│                          │                                │
│                          │ [Use This Template]            │
└──────────────────────────┴────────────────────────────────┘
\`\`\`

**Key Features:**
- Proper modal with backdrop overlay
- 40/60 split (list/preview)
- Click card → instant preview update (no navigation)
- Keyboard navigation (arrow keys, enter, escape)
- Focus management
- Hover states
- Resizable split pane (optional enhancement)

---

## Implementation Plan

### Phase 1: Component Architecture Setup

Create new specialized components following best practices:

1. **`TemplateListMobile.tsx`** - Mobile-optimized list view
2. **`TemplateListDesktop.tsx`** - Desktop split-view
3. **`TemplateDetailMobile.tsx`** - Full-screen mobile detail
4. **`TemplatePreviewDesktop.tsx`** - Desktop preview pane
5. **`TemplateSearchBar.tsx`** - Reusable search component
6. **`TemplateCategoryChips.tsx`** - Horizontal scrollable chips
7. **`TemplateCardCompact.tsx`** - Mobile-optimized card
8. **`TemplateCardDesktop.tsx`** - Desktop card with more info

### Phase 2: Mobile-First Implementation

#### Mobile Template List
- Sticky header with back button and close
- Sticky search bar (48px min height for touch)
- Horizontal scrollable category chips with scroll indicators
- Filter toggle with clear count display ("15 templates")
- Compact cards (min 56px touch target)
- Tap card → navigate to full-screen detail view
- Smooth transitions between views

#### Mobile Template Detail
- Full-screen view with sticky header
- Back button returns to list
- Scrollable content area
- All agent cards visible (no truncation)
- Sticky CTA button at bottom (56px height)
- Swipe gestures for navigation

### Phase 3: Desktop Enhancement

#### Desktop Split View
- Proper modal with backdrop overlay
- 40/60 split (list/preview)
- Click card → instant preview update (no navigation)
- Keyboard navigation (arrow keys, enter, escape)
- Focus management
- Hover states
- Resizable split pane (optional enhancement)

#### Desktop Preview Pane
- Full template details visible
- All agents displayed
- Scrollable if content exceeds height
- CTA button at bottom of preview
- Empty state when no template selected

### Phase 4: Shared Components

#### Search & Filter
- Debounced search (300ms)
- Search across name, description, tags
- Real-time results update
- Clear button when text entered

#### Category Chips
- Horizontal scroll on mobile
- Wrap on desktop if space allows
- Active state styling
- Smooth scroll behavior
- Scroll indicators (fade edges)

#### Template Cards
- Consistent information hierarchy
- Icon + Title + Description
- Category badge + Agent count
- Tags (max 2 visible, +N more)
- Proper touch targets (48px min)
- Hover/active states

### Phase 5: Accessibility & Polish

#### Accessibility
- Proper ARIA labels
- Keyboard navigation
- Focus management
- Screen reader support
- Reduced motion support

#### Performance
- Virtualized lists for 100+ templates
- Lazy load template details
- Optimized re-renders
- Smooth animations (60fps)

#### Polish
- Loading states
- Empty states
- Error states
- Smooth transitions
- Haptic feedback on mobile (if supported)

---

## Technical Specifications

### Touch Targets (Mobile)
- **Minimum**: 48px × 48px
- **Recommended**: 56px × 56px for primary actions
- **Spacing**: 8px minimum between targets

### Typography
- **Mobile**: 14px body, 16px-20px headings
- **Desktop**: 14px-16px body, 18px-24px headings
- **Line height**: 1.5 for readability

### Spacing
- **Mobile**: 12px-16px padding, 8px-12px gaps
- **Desktop**: 16px-24px padding, 12px-16px gaps

### Animations
- **Duration**: 200-300ms for UI transitions
- **Easing**: ease-in-out for natural feel
- **Respect**: prefers-reduced-motion

### Colors
- Use existing design tokens
- Ensure 4.5:1 contrast ratio minimum
- Clear active/hover states

---

## Success Criteria

### Mobile
- ✅ Can browse templates with one hand
- ✅ All information visible without horizontal scroll
- ✅ Clear navigation between list and detail
- ✅ Sticky CTA always accessible
- ✅ Smooth 60fps scrolling
- ✅ Touch targets meet 48px minimum

### Desktop
- ✅ Split view shows list + preview simultaneously
- ✅ No need to navigate away to see details
- ✅ Keyboard navigation works throughout
- ✅ Proper modal overlay with backdrop
- ✅ Efficient use of screen space
- ✅ Hover states provide clear feedback

### Both
- ✅ Search works instantly and accurately
- ✅ Category filtering is intuitive
- ✅ Loading states prevent confusion
- ✅ Accessible to screen readers
- ✅ Works with keyboard only
- ✅ Respects user motion preferences

---

## Implementation Notes

### Using Existing Architecture
- Leverage `AdaptiveModal` for automatic mobile/desktop switching
- Use `useDevice()` hook for device-specific logic
- Follow existing breakpoint system (mobile < 768px, desktop ≥ 1024px)
- Utilize `AdaptiveGrid` for responsive layouts

### Component Organization
\`\`\`
components/templates/
├── TemplateSelector.tsx          (Main orchestrator)
├── mobile/
│   ├── TemplateListMobile.tsx
│   ├── TemplateDetailMobile.tsx
│   └── TemplateCardCompact.tsx
├── desktop/
│   ├── TemplateListDesktop.tsx
│   ├── TemplatePreviewDesktop.tsx
│   └── TemplateCardDesktop.tsx
└── shared/
    ├── TemplateSearchBar.tsx
    ├── TemplateCategoryChips.tsx
    └── TemplateAgentCard.tsx
\`\`\`

### State Management
- Use local state for UI (search, filters, selected template)
- Lift shared state to `TemplateSelector` parent
- Consider using context if state becomes complex
- Debounce search input to prevent excessive re-renders

---

## Next Steps

1. Review and approve this plan
2. Begin Phase 1: Component Architecture Setup
3. Implement Phase 2: Mobile-First Implementation
4. Test mobile experience thoroughly
5. Implement Phase 3: Desktop Enhancement
6. Complete Phases 4-5: Shared Components & Polish
7. Final testing and accessibility audit

# 📱 Mobile-First Architecture & Best Practices

*Complete reference guide for mobile-first development in AnyDebate AI*

**Last Updated**: September 30, 2025  
**Implementation Status**: ✅ Production-Ready - All patterns tested and documented  
**Target Audience**: Developers implementing new features or maintaining existing code

---

## 📋 Table of Contents

1. [Project Directory Structure](#project-directory-structure)
2. [Architecture Overview](#architecture-overview)
3. [Complete File Inventory](#complete-file-inventory)
4. [Core Systems](#core-systems)
5. [Implementation Patterns](#implementation-patterns)
6. [Decision Trees](#decision-trees)
7. [Code Examples](#code-examples)
8. [Testing & Validation](#testing--validation)

---

## 📂 Project Directory Structure

### **Complete Mobile-First File Tree**

\`\`\`
AnyDebate-AI/
│
├── 📱 MOBILE-FIRST CORE SYSTEM
│   ├── config/
│   │   ├── responsive.ts              # Breakpoint definitions (320px, 768px, 1024px)
│   │   └── features.ts                # Feature flags for responsive architecture
│   │
│   ├── contexts/
│   │   └── DeviceProvider.tsx         # ⭐ Central device detection context
│   │
│   └── hooks/
│       ├── responsive/
│       │   ├── useBreakpoint.ts       # Media query detection + convenience hooks
│       │   ├── useOrientation.ts      # Portrait/landscape detection
│       │   └── useViewport.ts         # Viewport dimensions with debouncing
│       ├── use-mobile.ts              # Legacy mobile detection wrapper
│       └── use-reduced-motion.ts      # Accessibility: motion preference
│
├── 🎨 ADAPTIVE COMPONENTS (Same content, different UI)
│   └── components/adaptive/
│       ├── AdaptiveModal.tsx          # Modal (desktop) / Drawer (mobile)
│       ├── AdaptiveNavigation.tsx     # Tabs (desktop) / Accordion (mobile)
│       └── AdaptiveGrid.tsx           # Responsive grid layout
│
├── 📋 TEMPLATE SYSTEM (Mobile-first split architecture)
│   └── components/templates/
│       ├── TemplateSelectorModal.tsx  # ⭐ Main orchestrator
│       │
│       ├── mobile/                    # Mobile-specific implementations
│       │   ├── TemplateListMobile.tsx        # Vertical scroll list
│       │   ├── TemplateCardCompact.tsx       # 80px min height cards
│       │   └── TemplateDetailMobile.tsx      # Full-screen detail view
│       │
│       ├── desktop/                   # Desktop-specific implementations
│       │   ├── TemplateListDesktop.tsx       # Split-view list (40% width)
│       │   ├── TemplateCardDesktop.tsx       # Hover-enabled cards
│       │   └── TemplatePreviewDesktop.tsx    # Live preview pane (60% width)
│       │
│       └── shared/                    # Shared across devices
│           ├── TemplateSearchBar.tsx         # 48px min height, keyboard-optimized
│           ├── TemplateCategoryChips.tsx     # Horizontal scroll (mobile) / wrap (desktop)
│           └── TemplateAgentCard.tsx         # Compact (mobile) / detailed (desktop)
│
├── 📊 DASHBOARD (Mobile-first with sidebar adaptation)
│   └── components/dashboard/
│       ├── DashboardLayout.tsx        # ⭐ Main layout orchestrator
│       ├── DashboardHeader.tsx        # Compact (mobile) / full nav (desktop)
│       ├── DashboardSidebar.tsx       # Modal (mobile) / always visible (desktop)
│       ├── DashboardContent.tsx       # Full-width (mobile) / constrained (desktop)
│       ├── QuickActions.tsx           # 2 cols (mobile) / 3 cols (desktop)
│       ├── MetricCard.tsx             # Stacked (mobile) / side-by-side (desktop)
│       └── RecentActivity.tsx         # Compact cards (mobile) / detailed list (desktop)
│
├── 💬 CHAT SYSTEM (Touch-optimized)
│   └── components/chat/
│       ├── ChatThread.tsx             # 24px avatars (mobile), touch actions
│       ├── ChatSidebar.tsx            # Modal overlay (mobile) / always visible (desktop)
│       └── MentionInput.tsx           # 48px min height, touch-optimized dropdown
│
├── 🎯 ARTIFACTS (Collaborative canvas)
│   └── components/artifacts/
│       ├── ArtifactCanvas.tsx         # Responsive canvas layout
│       ├── ArtifactRenderer.tsx       # Artifact type renderer
│       ├── ArtifactToolbar.tsx        # Compact (mobile) / full (desktop)
│       ├── DocumentArtifact.tsx       # Text documents
│       ├── ChartArtifact.tsx          # Data visualizations
│       ├── DataTableArtifact.tsx      # Tabular data
│       └── ChecklistArtifact.tsx      # Task lists
│
├── 🤖 AGENT SYSTEM (Touch-optimized builder)
│   └── components/agent-config/
│       ├── AgentBuilderModal.tsx      # Full-screen (mobile) / modal (desktop)
│       ├── RoleSelector.tsx           # Touch-optimized selection
│       ├── PersonaSelector.tsx        # Touch-optimized selection
│       └── FrameworkSelector.tsx      # Touch-optimized selection
│
├── 🎨 UI COMPONENTS (Mobile-aware)
│   └── components/ui/
│       ├── drawer.tsx                 # Bottom sheet with gestures (vaul)
│       ├── sheet.tsx                  # Side sheet with slide animation
│       ├── dialog.tsx                 # Center modal with backdrop
│       ├── button.tsx                 # 44px min touch target
│       ├── input.tsx                  # 48px min height (prevents iOS zoom)
│       └── use-mobile.tsx             # Legacy mobile hook (768px breakpoint)
│
├── 📄 PAGES (Mobile-first routing)
│   └── app/
│       ├── page.tsx                   # Landing page (mobile-first)
│       ├── debates/page.tsx           # Debate interface (responsive)
│       ├── agents/page.tsx            # Agent management (responsive)
│       ├── dashboard/page.tsx         # User dashboard (mobile-first)
│       └── layout.tsx                 # Root layout with DeviceProvider
│
├── 🛠️ UTILITIES & MONITORING
│   └── lib/
│       ├── utils.ts                   # cn() - conditional className merging
│       └── monitoring/
│           └── analytics.ts           # debugResponsive(), debugDevice()
│
└── 📚 DOCUMENTATION
    ├── mobile-first-best-practices.md          # ⭐ This file
    ├── feature-implementation-best-practices.md # Feature development patterns
    ├── implementation-report.md                 # Implementation status
    └── docs/
        ├── TEMPLATE_SELECTOR_REDESIGN_PLAN.md   # Template system design
        ├── TEMPLATE_SELECTOR_REDESIGN_REPORT.md # Template system progress
        ├── OPTION_3_AGENT_TEMPLATES_PLAN.md     # Agent templates plan
        ├── OPTION_4_ARTIFACT_FEATURES_PLAN.md   # Artifact features plan
        └── OPTION_5_CHAT_FEATURES_PLAN.md       # Chat features plan
\`\`\`

### **Key Directory Patterns**

#### **Pattern 1: Split Mobile/Desktop Architecture**
\`\`\`
feature/
├── FeatureComponent.tsx       # Main orchestrator
├── mobile/
│   ├── FeatureMobile.tsx      # Mobile-specific implementation
│   └── FeatureCardMobile.tsx  # Mobile-specific sub-components
├── desktop/
│   ├── FeatureDesktop.tsx     # Desktop-specific implementation
│   └── FeatureCardDesktop.tsx # Desktop-specific sub-components
└── shared/
    └── FeatureShared.tsx      # Shared components
\`\`\`

**When to use**: Fundamentally different UX between mobile and desktop

**Examples in codebase**:
- `components/templates/` - Template selector system
- `components/dashboard/` - Dashboard layout system

---

#### **Pattern 2: Adaptive Component Architecture**
\`\`\`
components/adaptive/
├── AdaptiveModal.tsx          # Single component, device-aware
├── AdaptiveNavigation.tsx     # Single component, device-aware
└── AdaptiveGrid.tsx           # Single component, device-aware
\`\`\`

**When to use**: Same content, different presentation

**Examples in codebase**:
- `AdaptiveModal` - Modal on desktop, drawer on mobile
- `AdaptiveNavigation` - Tabs on desktop, accordion on mobile

---

#### **Pattern 3: Responsive Hooks Architecture**
\`\`\`
hooks/
├── responsive/
│   ├── useBreakpoint.ts       # Core media query detection
│   ├── useOrientation.ts      # Orientation detection
│   └── useViewport.ts         # Viewport dimensions
└── use-mobile.ts              # Legacy wrapper
\`\`\`

**When to use**: Need device detection in component logic

**Examples in codebase**:
- All mobile-first components use `useDevice()` from DeviceProvider
- Legacy components use `useIsMobile()` from use-mobile.ts

---

## 🏗️ Architecture Overview

### **Design Philosophy**

AnyDebate AI follows a **mobile-first, progressive enhancement** architecture:

1. **Base Layer**: Mobile experience (320px - 767px)
2. **Enhanced Layer**: Tablet experience (768px - 1023px)
3. **Optimal Layer**: Desktop experience (1024px+)

### **Key Architectural Principles**

- **Single Source of Truth**: Device context via React Context API
- **Modular Components**: Separate mobile/desktop implementations when needed
- **Adaptive Components**: Same component, different UI based on device
- **Conditional Rendering**: Load only what's needed for each device
- **Touch-First Design**: 44px minimum touch targets (WCAG 2.1 Level AA)
- **Performance-Optimized**: Lazy loading, memoization, reduced motion support

---

## 📁 Complete File Inventory

### **1. Configuration & Setup**

| File | Purpose | Key Exports |
|------|---------|-------------|
| `config/responsive.ts` | Breakpoint definitions and device types | `BREAKPOINTS`, `DEVICE_BREAKPOINTS`, `Breakpoint`, `DeviceType` |
| `config/features.ts` | Feature flags for responsive architecture | `FEATURES.useNewArchitecture`, `FEATURES.enableAdaptiveComponents` |

### **2. Context & Providers**

| File | Purpose | Key Exports |
|------|---------|-------------|
| `contexts/DeviceProvider.tsx` | Central device detection context | `DeviceProvider`, `useDevice()`, `DeviceContextValue` |

### **3. Responsive Hooks**

| File | Purpose | Key Exports |
|------|---------|-------------|
| `hooks/responsive/useBreakpoint.ts` | Media query hook with convenience functions | `useBreakpoint()`, `useIsMobile()`, `useIsTablet()`, `useIsDesktop()` |
| `hooks/responsive/useOrientation.ts` | Portrait/landscape detection | `useOrientation()` |
| `hooks/responsive/useViewport.ts` | Viewport dimensions with debouncing | `useViewport()` |
| `hooks/use-mobile.ts` | Legacy mobile detection wrapper | `useIsMobile()` |
| `hooks/use-reduced-motion.ts` | Accessibility: motion preference detection | `useReducedMotion()` |

### **4. Adaptive Components**

| File | Purpose | Mobile Behavior | Desktop Behavior |
|------|---------|-----------------|------------------|
| `components/adaptive/AdaptiveGrid.tsx` | Responsive grid layout | 1 column | 2-3 columns |
| `components/adaptive/AdaptiveModal.tsx` | Modal/drawer system | Bottom drawer | Center modal |
| `components/adaptive/AdaptiveNavigation.tsx` | Navigation UI | Expandable accordion | Horizontal tabs |

### **5. Template System (Mobile-First)**

#### **Mobile Components**
| File | Purpose | Specifications |
|------|---------|----------------|
| `components/templates/mobile/TemplateListMobile.tsx` | Mobile template list | Vertical scroll, compact cards |
| `components/templates/mobile/TemplateCardCompact.tsx` | Compact template card | 80px min height, touch-optimized |
| `components/templates/mobile/TemplateDetailMobile.tsx` | Full-screen template details | Sticky header/footer, scrollable content |

#### **Desktop Components**
| File | Purpose | Specifications |
|------|---------|----------------|
| `components/templates/desktop/TemplateListDesktop.tsx` | Split-view template browser | 40% list, 60% preview |
| `components/templates/desktop/TemplateCardDesktop.tsx` | Desktop template card | Hover states, larger touch targets |
| `components/templates/desktop/TemplatePreviewDesktop.tsx` | Live preview pane | Real-time preview, detailed info |

#### **Shared Components**
| File | Purpose | Responsive Features |
|------|---------|---------------------|
| `components/templates/shared/TemplateSearchBar.tsx` | Search input | 48px min height, mobile keyboard optimization |
| `components/templates/shared/TemplateCategoryChips.tsx` | Category filters | Horizontal scroll on mobile, wrap on desktop |
| `components/templates/shared/TemplateAgentCard.tsx` | Agent display | Compact on mobile, detailed on desktop |
| `components/templates/TemplateSelectorModal.tsx` | Main template selector | Orchestrates mobile/desktop views |

### **6. Dashboard Components (Mobile-First)**

| File | Purpose | Mobile Behavior | Desktop Behavior |
|------|---------|-----------------|------------------|
| `components/dashboard/DashboardLayout.tsx` | Main layout wrapper | Sidebar as modal | Sidebar always visible |
| `components/dashboard/DashboardHeader.tsx` | Header with navigation | Compact, hamburger menu | Full navigation |
| `components/dashboard/DashboardSidebar.tsx` | Navigation sidebar | Full-screen modal | Collapsible sidebar |
| `components/dashboard/DashboardContent.tsx` | Main content area | Full-width | Constrained width |
| `components/dashboard/QuickActions.tsx` | Action grid | 2 columns | 3 columns |
| `components/dashboard/MetricCard.tsx` | Metric display | Stacked layout | Side-by-side |
| `components/dashboard/RecentActivity.tsx` | Activity list | Compact cards | Detailed list |

### **7. Chat Components (Mobile-Optimized)**

| File | Purpose | Mobile Optimizations |
|------|---------|---------------------|
| `components/chat/ChatThread.tsx` | Message thread | Compact avatars (24px), touch actions |
| `components/chat/ChatSidebar.tsx` | Chat history sidebar | Modal overlay | Always visible |
| `components/chat/MentionInput.tsx` | @mention input | Touch-optimized dropdown, 48px min height |

### **8. UI Components (Mobile Support)**

| File | Purpose | Mobile Features |
|------|---------|-----------------|
| `components/ui/drawer.tsx` | Bottom sheet (vaul) | Gesture-based, safe area support |
| `components/ui/sheet.tsx` | Side sheet | Slide-in animation, backdrop |
| `components/ui/dialog.tsx` | Modal dialog | Center modal, backdrop blur |
| `components/ui/use-mobile.tsx` | Legacy mobile hook | 768px breakpoint detection |

### **9. Utilities & Monitoring**

| File | Purpose | Key Functions |
|------|---------|---------------|
| `lib/utils.ts` | Utility functions | `cn()` - conditional className merging |
| `lib/monitoring/analytics.ts` | Debug utilities | `debugResponsive()`, `debugDevice()` |

### **10. Documentation**

| File | Purpose |
|------|---------|
| `mobile-first-best-practices.md` | This file - comprehensive guide |
| `feature-implementation-best-practices.md` | Feature development patterns |
| `implementation-report.md` | Implementation status tracking |
| `docs/TEMPLATE_SELECTOR_REDESIGN_PLAN.md` | Template system design plan |
| `docs/TEMPLATE_SELECTOR_REDESIGN_REPORT.md` | Template system progress report |
| `docs/OPTION_3_AGENT_TEMPLATES_PLAN.md` | Agent templates plan |
| `docs/OPTION_4_ARTIFACT_FEATURES_PLAN.md` | Artifact features plan |
| `docs/OPTION_5_CHAT_FEATURES_PLAN.md` | Chat features plan |

---

## 🎯 Core Systems

### **System 1: Device Detection**

**Architecture**: React Context + Custom Hooks

\`\`\`
DeviceProvider (Context)
    ↓
useDevice() hook
    ↓
Component receives: { isMobile, isTablet, isDesktop, viewport, orientation }
\`\`\`

**Implementation Files**:
- `contexts/DeviceProvider.tsx` - Context provider
- `hooks/responsive/useBreakpoint.ts` - Media query detection
- `hooks/responsive/useOrientation.ts` - Orientation detection
- `hooks/responsive/useViewport.ts` - Viewport dimensions

**Usage Pattern**:
\`\`\`tsx
import { useDevice } from "@/contexts/DeviceProvider"

function MyComponent() {
  const { isMobile, isTablet, isDesktop } = useDevice()
  
  return (
    <div>
      {isMobile && <MobileView />}
      {isDesktop && <DesktopView />}
    </div>
  )
}
\`\`\`

**When to Use**:
- ✅ Need device type in component logic
- ✅ Conditional rendering based on screen size
- ✅ Different layouts for mobile/desktop
- ❌ Simple CSS-only responsive design (use Tailwind classes instead)

---

### **System 2: Adaptive Components**

**Architecture**: Single component, multiple UI implementations

\`\`\`
AdaptiveComponent
    ↓
useDevice() to detect device
    ↓
if (isMobile) → Mobile UI
if (isDesktop) → Desktop UI
\`\`\`

**Implementation Files**:
- `components/adaptive/AdaptiveModal.tsx` - Modal/Drawer
- `components/adaptive/AdaptiveNavigation.tsx` - Tabs/Accordion
- `components/adaptive/AdaptiveGrid.tsx` - Responsive grid

**Usage Pattern**:
\`\`\`tsx
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"

function MyFeature() {
  return (
    <AdaptiveModal
      isOpen={isOpen}
      onClose={onClose}
      title="Settings"
    >
      {/* Same content, different presentation */}
      <SettingsForm />
    </AdaptiveModal>
  )
}
\`\`\`

**When to Use**:
- ✅ Same content, different presentation
- ✅ Modal on desktop, drawer on mobile
- ✅ Tabs on desktop, accordion on mobile
- ❌ Completely different features per device

---

### **System 3: Separate Mobile/Desktop Components**

**Architecture**: Distinct components for each device type

\`\`\`
FeatureComponent
    ↓
useDevice() to detect device
    ↓
if (isMobile) → <MobileFeature />
if (isDesktop) → <DesktopFeature />
\`\`\`

**Implementation Files**:
- `components/templates/mobile/*` - Mobile-specific
- `components/templates/desktop/*` - Desktop-specific
- `components/templates/shared/*` - Shared components

**Usage Pattern**:
\`\`\`tsx
import { useDevice } from "@/contexts/DeviceProvider"
import { TemplateListMobile } from "./mobile/TemplateListMobile"
import { TemplateListDesktop } from "./desktop/TemplateListDesktop"

function TemplateSelector() {
  const { isMobile } = useDevice()
  
  return isMobile ? (
    <TemplateListMobile {...props} />
  ) : (
    <TemplateListDesktop {...props} />
  )
}
\`\`\`

**When to Use**:
- ✅ Fundamentally different UX (e.g., split-view vs full-screen)
- ✅ Different interaction patterns (e.g., tap to expand vs hover preview)
- ✅ Performance optimization (load only what's needed)
- ❌ Minor layout differences (use Tailwind responsive classes)

---

### **System 4: Conditional Rendering**

**Architecture**: Render components only when needed

\`\`\`tsx
{!isMobile && <DesktopOnlyFeature />}
{isMobile && <MobileOnlyFeature />}
\`\`\`

**Usage Pattern**:
\`\`\`tsx
function Layout() {
  const { isMobile } = useDevice()
  
  return (
    <div>
      {/* Desktop: Always visible sidebar */}
      {!isMobile && <Sidebar />}
      
      {/* Mobile: Modal sidebar */}
      {isMobile && (
        <AdaptiveModal isOpen={isOpen}>
          <Sidebar />
        </AdaptiveModal>
      )}
      
      <MainContent />
    </div>
  )
}
\`\`\`

**When to Use**:
- ✅ Desktop-only features (e.g., keyboard shortcuts panel)
- ✅ Mobile-only features (e.g., pull-to-refresh)
- ✅ Performance optimization
- ❌ Core functionality (should work on all devices)

---

## 🧭 Decision Trees

### **Decision Tree 1: Which Responsive Approach?**

\`\`\`
START: Need responsive behavior?
    ↓
Q1: Is it just layout/styling?
    YES → Use Tailwind responsive classes (sm:, md:, lg:)
    NO → Continue
    ↓
Q2: Same content, different presentation?
    YES → Use Adaptive Component (AdaptiveModal, AdaptiveNavigation)
    NO → Continue
    ↓
Q3: Fundamentally different UX?
    YES → Create separate Mobile/Desktop components
    NO → Continue
    ↓
Q4: Feature only makes sense on one device type?
    YES → Use conditional rendering {!isMobile && <Feature />}
    NO → Reconsider - might be CSS-only solution
\`\`\`

### **Decision Tree 2: Touch Target Sizing**

\`\`\`
START: Interactive element?
    ↓
Q1: Is it a button, link, or clickable element?
    YES → Minimum 44px × 44px (WCAG 2.1 Level AA)
    NO → Continue
    ↓
Q2: Is it a form input?
    YES → Minimum 48px height (prevents iOS zoom)
    NO → Continue
    ↓
Q3: Is it a card or list item?
    YES → Minimum 80px height for comfortable tapping
    NO → Standard sizing OK
\`\`\`

### **Decision Tree 3: Modal vs Drawer**

\`\`\`
START: Need to show overlay content?
    ↓
Q1: Is content form-based or requires input?
    YES → Use AdaptiveModal (drawer on mobile for keyboard)
    NO → Continue
    ↓
Q2: Is content tall/scrollable?
    YES → Use AdaptiveModal (drawer on mobile for better scrolling)
    NO → Continue
    ↓
Q3: Is content simple/quick action?
    YES → Use Dialog on all devices
    NO → Use AdaptiveModal (best of both worlds)
\`\`\`

---

## 💻 Implementation Patterns

### **Pattern 1: Mobile-First Component**

\`\`\`tsx
"use client"

import { useDevice } from "@/contexts/DeviceProvider"
import { Button } from "@/components/ui/button"

export function MyComponent() {
  const { isMobile } = useDevice()
  
  return (
    <div className={`
      // Mobile-first base styles
      p-4 space-y-3
      // Tablet enhancements
      md:p-6 md:space-y-4
      // Desktop enhancements
      lg:p-8 lg:space-y-6
    `}>
      <h2 className="text-lg md:text-xl lg:text-2xl">
        Title
      </h2>
      
      <Button 
        size={isMobile ? "lg" : "default"}
        className="min-h-[44px] min-w-[44px]"
      >
        Action
      </Button>
    </div>
  )
}
\`\`\`

**Key Points**:
- Start with mobile styles (no prefix)
- Add tablet styles with `md:` prefix
- Add desktop styles with `lg:` prefix
- Use `useDevice()` for logic, Tailwind for styling

---

### **Pattern 2: Adaptive Modal Implementation**

\`\`\`tsx
"use client"

import { useState } from "react"
import { useDevice } from "@/contexts/DeviceProvider"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { Button } from "@/components/ui/button"

export function MyFeature() {
  const [isOpen, setIsOpen] = useState(false)
  const { isMobile } = useDevice()
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Settings
      </Button>
      
      <AdaptiveModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Settings"
        description="Configure your preferences"
      >
        {/* Mobile: Bottom drawer with gesture support */}
        {/* Desktop: Center modal with backdrop */}
        <SettingsForm />
      </AdaptiveModal>
    </>
  )
}
\`\`\`

**Key Points**:
- AdaptiveModal handles device detection internally
- Same content, different presentation
- Automatic gesture support on mobile
- Backdrop blur on both devices

---

### **Pattern 3: Separate Mobile/Desktop Views**

\`\`\`tsx
"use client"

import { useDevice } from "@/contexts/DeviceProvider"
import { FeatureMobile } from "./mobile/FeatureMobile"
import { FeatureDesktop } from "./desktop/FeatureDesktop"

export function Feature() {
  const { isMobile } = useDevice()
  
  // Shared state and logic
  const [data, setData] = useState([])
  const handleAction = () => { /* ... */ }
  
  // Pass same props to both views
  const sharedProps = {
    data,
    onAction: handleAction,
  }
  
  return isMobile ? (
    <FeatureMobile {...sharedProps} />
  ) : (
    <FeatureDesktop {...sharedProps} />
  )
}
\`\`\`

**Key Points**:
- Share state and logic in parent
- Pass same props to both views
- Each view implements its own UX
- Performance: only one view renders

---

### **Pattern 4: Touch-Optimized Interactive Elements**

\`\`\`tsx
"use client"

import { useDevice } from "@/contexts/DeviceProvider"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function InteractiveCard({ onClick }) {
  const { isMobile } = useDevice()
  
  return (
    <Card
      onClick={onClick}
      className={`
        cursor-pointer transition-all
        // Mobile: Larger touch target, no hover
        ${isMobile ? 'min-h-[80px] active:scale-98' : 'hover:shadow-lg'}
      `}
    >
      <div className="p-4 flex items-center gap-3">
        <Button
          size={isMobile ? "lg" : "default"}
          className="min-h-[44px] min-w-[44px]"
        >
          Action
        </Button>
      </div>
    </Card>
  )
}
\`\`\`

**Key Points**:
- Minimum 44px × 44px touch targets
- Use `active:` instead of `hover:` on mobile
- Larger spacing on mobile (easier tapping)
- No hover states on touch devices

---

### **Pattern 5: Responsive Grid Layout**

\`\`\`tsx
"use client"

import { AdaptiveGrid } from "@/components/adaptive/AdaptiveGrid"

export function Gallery() {
  return (
    <AdaptiveGrid
      mobileColumns={1}
      tabletColumns={2}
      desktopColumns={3}
      className="gap-4"
    >
      {items.map(item => (
        <GalleryItem key={item.id} {...item} />
      ))}
    </AdaptiveGrid>
  )
}
\`\`\`

**Key Points**:
- Use AdaptiveGrid for automatic responsive columns
- Or use Tailwind: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Consistent gap spacing across breakpoints
- Automatic reflow on resize

---

### **Pattern 6: Sidebar Adaptation**

\`\`\`tsx
"use client"

import { useState } from "react"
import { useDevice } from "@/contexts/DeviceProvider"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { Sidebar } from "./Sidebar"

export function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { isMobile } = useDevice()
  
  return (
    <div className="flex h-screen">
      {/* Desktop: Always visible sidebar */}
      {!isMobile && (
        <Sidebar
          isCollapsed={!isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      )}
      
      {/* Mobile: Modal sidebar */}
      {isMobile && (
        <AdaptiveModal
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          title="Menu"
        >
          <Sidebar />
        </AdaptiveModal>
      )}
      
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
\`\`\`

**Key Points**:
- Desktop: Sidebar always in DOM, collapsible
- Mobile: Sidebar in modal, full-screen
- Same Sidebar component, different container
- Optimized screen real estate per device

---

### **Pattern 7: Performance Optimization**

\`\`\`tsx
"use client"

import { memo, useMemo, useCallback } from "react"
import { useDevice } from "@/contexts/DeviceProvider"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

// Memoize component to prevent unnecessary re-renders
export const OptimizedComponent = memo(function OptimizedComponent({ 
  data, 
  onAction 
}) {
  const { isMobile } = useDevice()
  const prefersReducedMotion = useReducedMotion()
  
  // Memoize expensive computations
  const filteredData = useMemo(() => {
    return data.filter(item => item.isActive)
  }, [data])
  
  // Memoize callbacks
  const handleClick = useCallback((id: string) => {
    onAction(id)
  }, [onAction])
  
  return (
    <motion.div
      // Respect reduced motion preference
      animate={prefersReducedMotion ? undefined : { opacity: 1 }}
      transition={prefersReducedMotion ? { duration: 0 } : undefined}
    >
      {filteredData.map(item => (
        <Item 
          key={item.id} 
          {...item} 
          onClick={handleClick}
        />
      ))}
    </motion.div>
  )
})
\`\`\`

**Key Points**:
- Use `React.memo` for expensive components
- Use `useMemo` for expensive computations
- Use `useCallback` for stable function references
- Respect `prefers-reduced-motion` for accessibility

---

## ✅ Testing & Validation

### **Testing Checklist**

#### **Breakpoint Testing**
- [ ] 320px (iPhone SE) - Smallest mobile
- [ ] 375px (iPhone 12/13) - Common mobile
- [ ] 768px (iPad Portrait) - Tablet breakpoint
- [ ] 1024px (iPad Landscape) - Desktop breakpoint
- [ ] 1440px (Laptop) - Large desktop

#### **Touch Target Testing**
- [ ] All buttons ≥ 44px × 44px
- [ ] All form inputs ≥ 48px height
- [ ] All cards/list items ≥ 80px height
- [ ] Adequate spacing between touch targets (≥ 8px)

#### **Orientation Testing**
- [ ] Portrait mode works correctly
- [ ] Landscape mode works correctly
- [ ] Orientation change doesn't break layout
- [ ] Content reflows properly

#### **Performance Testing**
- [ ] First Contentful Paint < 1.5s on 3G
- [ ] Largest Contentful Paint < 2.5s on 3G
- [ ] Cumulative Layout Shift < 0.1
- [ ] First Input Delay < 100ms

#### **Accessibility Testing**
- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA
- [ ] Reduced motion respected

---

## 🎯 Quick Reference

### **Breakpoints**
\`\`\`typescript
sm: 640px   // Small tablets
md: 768px   // Tablets (mobile breakpoint)
lg: 1024px  // Desktop (desktop breakpoint)
xl: 1280px  // Large desktop
\`\`\`

### **Touch Targets**
\`\`\`typescript
Button: min-h-[44px] min-w-[44px]  // WCAG 2.1 Level AA
Input: min-h-[48px]                 // Prevents iOS zoom
Card: min-h-[80px]                  // Comfortable tapping
\`\`\`

### **Common Patterns**
\`\`\`tsx
// Device detection
const { isMobile, isTablet, isDesktop } = useDevice()

// Conditional rendering
{isMobile && <MobileView />}
{!isMobile && <DesktopView />}

// Responsive classes
className="p-4 md:p-6 lg:p-8"

// Touch-optimized
className={isMobile ? 'active:scale-98' : 'hover:scale-105'}
\`\`\`

---

## 📚 Additional Resources

- **Implementation Report**: `implementation-report.md`
- **Feature Best Practices**: `feature-implementation-best-practices.md`
- **Template System Design**: `docs/TEMPLATE_SELECTOR_REDESIGN_PLAN.md`
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
- **Touch Target Guidance**: https://www.w3.org/WAI/WCAG21/Understanding/target-size.html

---

*Last updated: September 30, 2025 - This document is the definitive guide for mobile-first development in AnyDebate AI. All patterns are production-tested and actively used across the application.*

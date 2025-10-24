# Agent Builder UX Redesign Plan

## Current Problems

### Mobile Issues
- Modal/drawer doesn't fill screen properly - huge empty space at bottom
- Wasted vertical space on small screens
- Multi-step flow requires excessive navigation
- Can't see full context of what's being created
- Poor touch target optimization in cramped modal space

### Desktop Issues
- Modal constrains available space unnecessarily
- Can't utilize full screen width effectively
- Multi-step wizard hides information
- No live preview of agent being created
- Category filters wrap awkwardly
- Role cards don't use available space well

### General UX Problems
- **Linear 4-step flow is inefficient**: Forces sequential navigation
- **Cognitive load**: Can't see all selections at once
- **Navigation friction**: Constant Next/Previous clicking
- **No overview**: Users lose context between steps
- **Modal constraints**: Limited by dialog dimensions
- **Poor space utilization**: Especially evident on mobile

---

## Proposed Solution: Full-Page Flow

Replace the modal-based multi-step wizard with a **dedicated full-page experience** at `/agents/new`.

### Core Principles
1. **Single-page form** - All sections visible, no steps
2. **Progressive disclosure** - Advanced options collapsed by default
3. **Live preview** - See agent configuration in real-time
4. **Mobile-first** - Optimized for touch and small screens
5. **Smart defaults** - Reduce friction with intelligent presets

---

## New Architecture

### Page Structure: `/agents/new`

\`\`\`
┌─────────────────────────────────────────┐
│ Header: "Create New Agent" + Actions    │
│ Progress: 60% Complete                   │
├─────────────────────────────────────────┤
│                                          │
│ [Mobile: Vertical Stack]                 │
│ [Desktop: Two-Column Layout]             │
│                                          │
│ LEFT/TOP: Form Sections (Scrollable)    │
│ ├─ 1. Quick Start (Templates)           │
│ ├─ 2. Role Selection                    │
│ ├─ 3. Persona Configuration             │
│ ├─ 4. Framework Selection                │
│ └─ 5. Advanced Settings (Collapsed)     │
│                                          │
│ RIGHT/BOTTOM: Live Preview (Sticky)      │
│ └─ Agent Card Preview                   │
│                                          │
├─────────────────────────────────────────┤
│ Footer: Cancel + Save Draft + Create    │
└─────────────────────────────────────────┘
\`\`\`

---

## Detailed Section Breakdown

### 1. Quick Start Section (NEW)
**Purpose**: Reduce friction with pre-configured templates

**Mobile Layout**:
\`\`\`
┌─────────────────────────────────┐
│ 🚀 Quick Start                  │
│ Choose a template or start from │
│ scratch                          │
├─────────────────────────────────┤
│ [Start from Scratch] (Default)  │
│                                  │
│ Popular Templates:               │
│ ┌─────────┐ ┌─────────┐        │
│ │ 💼 CEO  │ │ 🔬 Res. │        │
│ │ Business│ │ Analyst │        │
│ └─────────┘ └─────────┘        │
│ ┌─────────┐ ┌─────────┐        │
│ │ 💻 Dev  │ │ 🎨 Des. │        │
│ │ Engineer│ │ Creative│        │
│ └─────────┘ └─────────┘        │
│                                  │
│ [View All Templates →]           │
└─────────────────────────────────┘
\`\`\`

**Desktop Layout**: Horizontal carousel of template cards

**Benefits**:
- Instant agent creation for common use cases
- Reduces decision fatigue
- Users can customize template after selection

---

### 2. Role Selection Section
**Purpose**: Choose professional expertise

**Mobile Layout**:
\`\`\`
┌─────────────────────────────────┐
│ 1. Professional Role            │
│ Select expertise area           │
├─────────────────────────────────┤
│ 🔍 Search roles...              │
├─────────────────────────────────┤
│ Categories (Horizontal Scroll): │
│ [All] [Business] [Tech] [Cre...│
├─────────────────────────────────┤
│ ┌─────────────────────────────┐│
│ │ 💼 CEO                      ││
│ │ Strategic visionary...      ││
│ │ #Strategic #Leadership      ││
│ │         [Selected ✓]        ││
│ └─────────────────────────────┘│
│ ┌─────────────────────────────┐│
│ │ 🔬 Market Researcher        ││
│ │ Data-driven insights...     ││
│ │ #Analytical #Research       ││
│ │         [Select]            ││
│ └─────────────────────────────┘│
└─────────────────────────────────┘
\`\`\`

**Desktop Layout**: 
- 3-column grid of role cards
- Sidebar filters (categories, tags)
- Search bar at top

**Improvements**:
- Cards are 80px+ height (mobile-first compliant)
- Full-width cards on mobile (no wasted space)
- Infinite scroll or "Load More" for performance
- Selected role highlighted with checkmark

---

### 3. Persona Configuration Section
**Purpose**: Define personality and communication style

**Mobile Layout**:
\`\`\`
┌─────────────────────────────────┐
│ 2. Persona & Style              │
│ Define personality traits       │
├─────────────────────────────────┤
│ Communication Style:            │
│ ○ Formal      ● Balanced        │
│ ○ Casual                        │
├─────────────────────────────────┤
│ Personality Traits:             │
│ [Analytical] [Empathetic]       │
│ [Creative] [Skeptical]          │
│ [Diplomatic] [Direct]           │
├─────────────────────────────────┤
│ Tone:                           │
│ ○ Professional ● Friendly       │
│ ○ Authoritative                 │
├─────────────────────────────────┤
│ Custom Instructions (Optional): │
│ ┌─────────────────────────────┐│
│ │ Add specific behaviors...   ││
│ │                             ││
│ └─────────────────────────────┘│
└─────────────────────────────────┘
\`\`\`

**Desktop Layout**: Same but with better spacing

**Improvements**:
- Visual trait selector (not dropdown)
- Multi-select badges for traits
- Radio buttons for single-choice options
- All options visible at once (no hidden steps)

---

### 4. Framework Selection Section
**Purpose**: Choose thinking framework

**Mobile Layout**:
\`\`\`
┌─────────────────────────────────┐
│ 3. Thinking Framework           │
│ Optional: Add structured method │
├─────────────────────────────────┤
│ ○ None (Default)                │
│ ○ First Principles              │
│ ○ SCAMPER                       │
│ ○ Design Thinking               │
│ ○ Root Cause Analysis           │
│ ○ SWOT Analysis                 │
├─────────────────────────────────┤
│ ℹ️ First Principles              │
│ Break down complex problems...  │
└─────────────────────────────────┘
\`\`\`

**Desktop Layout**: Same with description sidebar

**Improvements**:
- Simple radio group (not separate step)
- Inline descriptions on selection
- "None" as default option
- Collapsible section if not needed

---

### 5. Advanced Settings Section (Collapsed by Default)
**Purpose**: Fine-tune configuration for power users

**Mobile Layout**:
\`\`\`
┌─────────────────────────────────┐
│ ⚙️ Advanced Settings [Expand ▼] │
└─────────────────────────────────┘

[When expanded:]
┌─────────────────────────────────┐
│ ⚙️ Advanced Settings [Collapse ▲]│
├─────────────────────────────────┤
│ Agent Name:                     │
│ ┌─────────────────────────────┐│
│ │ CEO Agent                   ││
│ └─────────────────────────────┘│
├─────────────────────────────────┤
│ Description:                    │
│ ┌─────────────────────────────┐│
│ │ Strategic business advisor  ││
│ └─────────────────────────────┘│
├─────────────────────────────────┤
│ Tags:                           │
│ [Business] [Strategy] [+Add]    │
├─────────────────────────────────┤
│ Visibility:                     │
│ ○ Private  ● Team  ○ Public     │
└─────────────────────────────────┘
\`\`\`

**Benefits**:
- Reduces initial cognitive load
- Power users can access when needed
- Smart defaults mean most users skip this

---

## Live Preview Component

### Mobile: Sticky Bottom Preview
\`\`\`
┌─────────────────────────────────┐
│ [Sticky at bottom of screen]    │
├─────────────────────────────────┤
│ 👁️ Preview [Expand ▲]            │
└─────────────────────────────────┘

[When expanded - slides up as drawer:]
┌─────────────────────────────────┐
│ Agent Preview      [Close ✕]    │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐│
│ │ 💼 CEO Agent                ││
│ │ Strategic Business Advisor  ││
│ │                             ││
│ │ #Analytical #Leadership     ││
│ │ #FirstPrinciples            ││
│ │                             ││
│ │ Communication: Balanced     ││
│ │ Tone: Professional          ││
│ └─────────────────────────────┘│
└─────────────────────────────────┘
\`\`\`

### Desktop: Sticky Right Sidebar
\`\`\`
┌─────────────────────┐
│ 👁️ Live Preview      │
├─────────────────────┤
│ ┌─────────────────┐ │
│ │ 💼 CEO Agent    │ │
│ │ Strategic...    │ │
│ │                 │ │
│ │ #Analytical     │ │
│ │ #Leadership     │ │
│ │                 │ │
│ │ Style: Balanced │ │
│ │ Tone: Pro       │ │
│ └─────────────────┘ │
│                     │
│ Configuration:      │
│ ✓ Role Selected     │
│ ✓ Persona Set       │
│ ○ Framework         │
│                     │
│ [Create Agent]      │
└─────────────────────┘
\`\`\`

**Benefits**:
- Real-time feedback on selections
- See complete agent configuration
- Progress indicator shows completion
- Primary CTA always visible

---

## Mobile-First Implementation Details

### Header (Sticky)
\`\`\`tsx
<header className="sticky top-0 z-50 bg-background border-b">
  <div className="flex items-center justify-between p-4 min-h-[56px]">
    <Button variant="ghost" size="icon" className="min-h-[44px] min-w-[44px]">
      <ArrowLeft /> {/* Back to /agents */}
    </Button>
    <h1 className="text-lg font-semibold">Create Agent</h1>
    <Button variant="ghost" size="icon" className="min-h-[44px] min-w-[44px]">
      <X /> {/* Cancel */}
    </Button>
  </div>
  <div className="px-4 pb-2">
    <Progress value={60} className="h-2" />
    <p className="text-xs text-muted-foreground mt-1">60% Complete</p>
  </div>
</header>
\`\`\`

### Footer (Sticky)
\`\`\`tsx
<footer className="sticky bottom-0 z-50 bg-background border-t p-4">
  <div className="flex gap-2">
    <Button 
      variant="outline" 
      className="flex-1 min-h-[48px] bg-transparent"
    >
      Save Draft
    </Button>
    <Button 
      className="flex-1 min-h-[48px]"
      disabled={!isValid}
    >
      Create Agent
    </Button>
  </div>
</footer>
\`\`\`

### Form Sections (Scrollable)
\`\`\`tsx
<main className="flex-1 overflow-y-auto pb-24">
  {/* pb-24 to account for sticky footer */}
  <div className="max-w-4xl mx-auto p-4 space-y-6">
    <QuickStartSection />
    <RoleSelectionSection />
    <PersonaConfigSection />
    <FrameworkSelectionSection />
    <AdvancedSettingsSection />
  </div>
</main>
\`\`\`

---

## Desktop Layout

### Two-Column Grid
\`\`\`tsx
<div className="grid md:grid-cols-[1fr_400px] gap-6 p-6">
  {/* Left: Form */}
  <div className="space-y-6 overflow-y-auto">
    <QuickStartSection />
    <RoleSelectionSection />
    <PersonaConfigSection />
    <FrameworkSelectionSection />
    <AdvancedSettingsSection />
  </div>
  
  {/* Right: Sticky Preview */}
  <div className="sticky top-6 h-fit">
    <AgentPreviewCard />
  </div>
</div>
\`\`\`

---

## Touch Target Compliance

All interactive elements meet mobile-first requirements:

- **Buttons**: `min-h-[44px] min-w-[44px]`
- **Form inputs**: `min-h-[48px]`
- **Role cards**: `min-h-[80px]`
- **Template cards**: `min-h-[80px]`
- **Radio buttons**: `h-5 w-5` with `p-3` parent (44px total)
- **Checkboxes**: `h-5 w-5` with `p-3` parent (44px total)
- **Badges (selectable)**: `min-h-[36px] px-4` (acceptable for secondary actions)
- **Spacing**: `gap-2` (8px) minimum between touch targets

---

## Progressive Enhancement Features

### Auto-save Draft
- Save to localStorage every 30 seconds
- Restore draft on return to `/agents/new`
- Show "Draft restored" toast notification

### Smart Defaults
- Pre-select "Balanced" communication style
- Default to "None" for framework
- Auto-generate agent name from role selection
- Suggest relevant tags based on role

### Validation & Feedback
- Real-time validation (not on submit)
- Inline error messages
- Progress indicator updates as sections complete
- Disable "Create" button until minimum requirements met

### Keyboard Navigation
- Tab through all form fields
- Enter to submit when valid
- Escape to cancel/close
- Arrow keys for radio/checkbox groups

---

## Migration Strategy

### Phase 1: Create New Page Component
- Build `/app/agents/new/page.tsx` with new layout
- Create section components (QuickStart, RoleSelection, etc.)
- Implement live preview component
- Add mobile-first responsive styles

### Phase 2: Extract & Refactor Logic
- Move role data from `RoleSelector` to new component
- Move persona logic from `PersonaSelector`
- Move framework logic from `FrameworkSelector`
- Consolidate into single form state

### Phase 3: Replace Modal Usage
- Update "Create Agent" buttons to navigate to `/agents/new`
- Remove `AgentBuilderModal` from other pages
- Keep modal component for potential future use (editing?)

### Phase 4: Add Enhancements
- Implement auto-save draft
- Add template quick-start
- Add keyboard shortcuts
- Add analytics tracking

### Phase 5: Deprecate Old Modal
- Remove `AgentBuilderModal.tsx` if no longer needed
- Clean up unused step-based components
- Update documentation

---

## Success Metrics

### UX Improvements
- ✅ No wasted screen space (mobile or desktop)
- ✅ All information visible without navigation
- ✅ Live preview provides instant feedback
- ✅ Reduced clicks to create agent (from 4+ to 1)
- ✅ Mobile-first touch targets (100% compliant)

### Performance
- ✅ Faster time-to-create (fewer steps)
- ✅ Lower bounce rate on agent creation
- ✅ Higher completion rate
- ✅ Reduced support tickets about "confusing flow"

### Accessibility
- ✅ WCAG 2.1 Level AA compliant
- ✅ Keyboard navigable
- ✅ Screen reader friendly
- ✅ Touch target compliant

---

## Technical Requirements

### Dependencies
- Existing UI components (Button, Input, Card, etc.)
- `useDevice()` hook for responsive behavior
- Form state management (React Hook Form or similar)
- Auto-save with debounce (lodash or custom)

### New Components to Create
1. `app/agents/new/page.tsx` - Main page
2. `components/agent-builder/QuickStartSection.tsx`
3. `components/agent-builder/RoleSelectionSection.tsx`
4. `components/agent-builder/PersonaConfigSection.tsx`
5. `components/agent-builder/FrameworkSelectionSection.tsx`
6. `components/agent-builder/AdvancedSettingsSection.tsx`
7. `components/agent-builder/AgentPreviewCard.tsx`
8. `components/agent-builder/TemplateCard.tsx`
9. `hooks/useAgentBuilder.ts` - Form state management
10. `hooks/useAgentDraft.ts` - Auto-save logic

### Files to Refactor
- Extract role data from `components/agent-config/RoleSelector.tsx`
- Extract persona logic from `components/agent-config/PersonaSelector.tsx`
- Extract framework logic from `components/agent-config/FrameworkSelector.tsx`
- Update navigation in `components/agents/mobile/agent-list-mobile.tsx`

---

## Timeline Estimate

- **Phase 1**: 2-3 days (new page structure)
- **Phase 2**: 2-3 days (extract & refactor logic)
- **Phase 3**: 1 day (replace modal usage)
- **Phase 4**: 2-3 days (enhancements)
- **Phase 5**: 1 day (cleanup)

**Total**: 8-11 days

---

## Open Questions

1. Should we keep the modal for **editing** existing agents?
2. Do we need template management (create/save custom templates)?
3. Should advanced settings include model selection (GPT-4, Claude, etc.)?
4. Do we want A/B testing between old modal and new page?
5. Should we add agent duplication feature?

---

## Next Steps

1. ✅ Review this plan with team
2. ⏳ Get design approval for new layout
3. ⏳ Create wireframes/mockups for visual reference
4. ⏳ Begin Phase 1 implementation
5. ⏳ User testing with prototype

---

## Conclusion

The new full-page flow approach will:
- **Eliminate wasted space** on mobile and desktop
- **Reduce cognitive load** by showing all options at once
- **Improve completion rates** with fewer steps
- **Provide better UX** with live preview and smart defaults
- **Meet mobile-first standards** with proper touch targets
- **Enhance accessibility** with keyboard navigation

This is a significant improvement over the current modal-based multi-step wizard.

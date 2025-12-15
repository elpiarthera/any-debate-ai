# Tooltip Settings Implementation Plan

**Priority**: Medium  
**Estimated Time**: 3-4 hours  
**Status**: COMPLETED ✅

---

## Overview

Enable users to control sidebar tooltip behavior through the Settings page. This improves accessibility and user experience by allowing users to customize or disable tooltips based on their preferences.

---

## Goals

1. Add user-configurable tooltip settings (enable/disable, delay duration)
2. Store preferences in Convex database for persistence across devices
3. Integrate with existing preferences system in `/settings`
4. Update both DashboardSidebar and ChatSidebar to respect user preferences
5. Maintain backward compatibility (tooltips enabled by default)

---

## Technical Architecture

### Database Schema Changes
- **Table**: `users`
- **Field**: `preferences.tooltips`
  - `enabled: boolean` (default: `true`)
  - `delayDuration: number` (default: `300` ms)

### Data Flow
1. User adjusts tooltip settings in `/settings`
2. Settings saved to Convex via mutation
3. PreferencesContext provides tooltip state to components
4. Sidebars conditionally render tooltips based on context

---

## Implementation Tasks

### Task 1: Update Database Schema (30min) ✅ COMPLETED
**Goal**: Add tooltip preference fields to user schema.

- **Files**: `convex/schema.ts`, `convex/users.ts`
- **Status**: COMPLETED
- **Changes Made**:
  1. ✅ Added `tooltips` object to preferences in `convex/schema.ts`:
     \`\`\`typescript
     tooltips: v.optional(v.object({
       enabled: v.boolean(),
       delayDuration: v.number(),
     })),
     \`\`\`
  2. ✅ Updated `storeUser` mutation in `convex/users.ts` to include default tooltip preferences
  3. ✅ Added `updateTooltipPreferences` mutation for updating tooltip settings

### Task 2: Create Preferences Context (45min) ✅ COMPLETED
**Goal**: Provide global access to tooltip preferences throughout the app.

- **Files**: `contexts/TooltipPreferencesContext.tsx`, `app/layout.tsx`
- **Status**: COMPLETED
- **Changes Made**:
  1. ✅ Created `TooltipPreferencesContext` that syncs with Convex and localStorage
  2. ✅ Exposed `tooltipsEnabled`, `tooltipDelay`, and `updateTooltipPreferences` methods
  3. ✅ Wrapped app in `TooltipPreferencesProvider` in root layout
  4. ✅ Handles loading states and default values for unauthenticated users

### Task 3: Add Settings UI Controls (1h) ✅ COMPLETED
**Goal**: Create intuitive UI for users to configure tooltip behavior.

- **Files**: `components/settings/preferences-panel.tsx`
- **Status**: COMPLETED
- **Changes Made**:
  1. ✅ Added "Interface" section to preferences panel with tooltip settings
  2. ✅ Created toggle switch for "Show Sidebar Tooltips"
  3. ✅ Added select dropdown for "Tooltip Delay" with 5 preset options:
     - Instant (0ms)
     - Fast (150ms)
     - Normal (300ms)
     - Slow (500ms)
     - Very Slow (800ms)
  4. ✅ Wired up to Convex mutation via TooltipPreferencesContext
  5. ✅ Optimistic updates for instant feedback

**UI Design**:
\`\`\`
┌─────────────────────────────────────┐
│ Interface Preferences               │
├─────────────────────────────────────┤
│ Sidebar Tooltips                    │
│ Show tooltip labels when hovering   │
│ collapsed sidebar icons             │
│                            [ON] ○   │
│                                     │
│ Tooltip Delay                       │
│ ●────────○─────────────────── 300ms │
│ 0ms                          1000ms │
└─────────────────────────────────────┘
\`\`\`

### Task 4: Update DashboardSidebar (45min) ✅ COMPLETED
**Goal**: Make tooltip rendering conditional based on user preferences.

- **Files**: `components/dashboard/DashboardSidebar.tsx`
- **Status**: COMPLETED
- **Changes Made**:
  1. ✅ Imported `useTooltipPreferences` hook from TooltipPreferencesContext
  2. ✅ Destructured `tooltipsEnabled` and `tooltipDelay`
  3. ✅ Updated tooltip conditional logic to only render when collapsed AND enabled
  4. ✅ Applied dynamic `delayDuration` from user preferences

### Task 5: Update ChatSidebar (45min) ✅ COMPLETED
**Goal**: Apply same tooltip preference logic to chat history sidebar.

- **Files**: `components/chat/ChatSidebar.tsx`
- **Status**: COMPLETED
- **Changes Made**:
  1. ✅ Imported `useTooltipPreferences` hook
  2. ✅ Applied conditional tooltip rendering (same pattern as DashboardSidebar)
  3. ✅ Ensured session list items respect tooltip preferences
  4. ✅ Tooltip shows full session title when truncated

### Task 6: Testing & Polish (30min) ⏳ PENDING
**Goal**: Verify tooltip system works across all scenarios.

- **Test Cases**:
  - ⏳ Tooltips enabled with default delay (300ms)
  - ⏳ Tooltips enabled with custom delay (0ms, 150ms, 300ms, 500ms, 800ms)
  - ⏳ Tooltips disabled (no hover UI appears)
  - ⏳ Settings persist after page refresh
  - ⏳ Settings sync across tabs/devices (Convex reactivity)
  - ⏳ Unauthenticated users see default behavior (tooltips enabled)
  - ⏳ Smooth transitions when toggling tooltips on/off

**Note**: Testing requires Convex development server to be running (`npx convex dev`) for the `convex/_generated/api` types to be generated.

---

## Files to Modify

1. **Schema & Backend**:
   - `convex/schema.ts` - Add tooltips to preferences validator
   - `convex/users.ts` - Set default tooltip preferences

2. **Context & State**:
   - `contexts/TooltipPreferencesContext.tsx` - New file for preferences management
   - `app/layout.tsx` - Wrap app in TooltipPreferencesProvider

3. **UI Components**:
   - `components/settings/preferences-panel.tsx` - Add tooltip settings controls
   - `components/dashboard/DashboardSidebar.tsx` - Conditional tooltip rendering
   - `components/chat/ChatSidebar.tsx` - Conditional tooltip rendering

---

## Dependencies

- Existing: `@radix-ui/react-tooltip`, Convex, React Context
- No new dependencies required

---

## Success Criteria

- [x] Users can toggle tooltips on/off in `/settings`
- [x] Tooltip delay is adjustable (5 preset options: 0ms, 150ms, 300ms, 500ms, 800ms)
- [x] Settings persist in Convex database
- [x] Settings stored in localStorage for instant loading
- [x] Both sidebars respect tooltip preferences
- [x] Default behavior (tooltips enabled) maintained for new users
- [ ] No visual glitches when toggling preferences (pending testing)

---

## Future Enhancements (Post-Implementation)

- Add tooltip position preference (left/right/top/bottom)
- Per-sidebar tooltip settings (separate for nav vs chat)
- Keyboard shortcut to temporarily disable tooltips (e.g., `Alt` key)
- Analytics tracking for tooltip usage patterns

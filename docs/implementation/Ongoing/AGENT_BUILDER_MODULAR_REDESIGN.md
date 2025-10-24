# Agent Builder Modular Redesign - Implementation Plan

## Overview

Transform the agent creation from a static wizard into a modular component system where agents are composed of independent, reusable modules (Role + Persona + Framework).

**Key Principles:**
- Agents = Role + Persona + Framework (composable modules)
- Each module type has its own library for CRUD operations
- Modules are reusable across multiple agents
- Edit modules independently without recreating agents
- Mobile-first design with proper touch targets
- Use semantic design tokens from globals.css

---

## Progress Tracking

### Phase 1: Module Libraries - COMPLETED ✅ (< 1 hour)

- [x] Create module data models (Convex schema)
- [x] Build RoleLibrary with mobile/desktop split
- [x] Build PersonaLibrary with mobile/desktop split  
- [x] Build FrameworkLibrary with mobile/desktop split
- [x] Implement CRUD operations with localStorage
- [x] Add AdaptiveModal for editing
- [x] Connect to actual data sources

**Files Created:**
- `components/module-libraries/RoleLibrary.tsx` + mobile/desktop variants
- `components/module-libraries/PersonaLibrary.tsx` + mobile/desktop variants
- `components/module-libraries/FrameworkLibrary.tsx` + mobile/desktop variants
- `hooks/useRoleManager.ts`
- `components/module-libraries/RoleEditorModal.tsx`
- `app/agents/roles/page.tsx`
- `app/agents/personas/page.tsx`
- `app/agents/frameworks/page.tsx`

---

### Phase 2: Agent Composer - COMPLETED ✅ (< 1 hour)

**Tasks:**
- [x] Build new `/agents/new` page with modular composer
- [x] Implement `AgentComposerMobile` with sticky header/footer
- [x] Implement `AgentComposerDesktop` with side-by-side layout
- [x] Build `ModuleSelector` with AdaptiveModal
- [x] Build live preview component
- [x] Add module card components (80px min-h)
- [x] Implement agent creation with module references

**Files Created:**
- `components/agent-composer/AgentComposer.tsx`
- `components/agent-composer/AgentComposerMobile.tsx`
- `components/agent-composer/AgentComposerDesktop.tsx`
- `components/agent-composer/ModuleSelector.tsx`
- `components/agent-composer/ModuleCard.tsx`
- `hooks/useRoleManager.ts`
- `hooks/usePersonaManager.ts`
- `hooks/useFrameworkManager.ts`
- Updated `app/agents/new/page.tsx`

**Component Structure:**
\`\`\`
components/agent-composer/
├── AgentComposer.tsx              # Main orchestrator
├── AgentComposerMobile.tsx        # Mobile layout
├── AgentComposerDesktop.tsx       # Desktop layout
├── ModuleSelector.tsx             # Module selection with AdaptiveModal
├── ModuleCard.tsx                 # Module display card (80px min-h)
└── AgentPreviewCard.tsx           # Live preview
\`\`\`

**Mobile Layout (Vertical Stack):**
\`\`\`
┌─────────────────────────────────────┐
│ ← Create Agent              [Save]  │ ← Sticky header, 56px
├─────────────────────────────────────┤
│ Agent Preview                       │
│ ┌─────────────────────────────────┐│
│ │ 💼 CEO + 🎯 Analytical          ││
│ │ First Principles Framework      ││
│ │ "Strategic business leader..."  ││
│ └─────────────────────────────────┘│
├─────────────────────────────────────┤
│ Select Modules                      │
│ ┌─────────────────────────────────┐│
│ │ Role: CEO                 [Edit]││ ← 80px min-h
│ │ Strategic business leader       ││
│ └─────────────────────────────────┘│
│ ┌─────────────────────────────────┐│
│ │ Persona: Analytical       [Edit]││
│ │ Data-driven, logical            ││
│ └─────────────────────────────────┘│
│ ┌─────────────────────────────────┐│
│ │ Framework: First Principles     ││
│ │ Break down complex problems     ││
│ └─────────────────────────────────┘│
├─────────────────────────────────────┤
│ Configuration                       │
│ Name: [Strategic Advisor]           │ ← 48px min-h
│ Tags: [Business] [Strategy]         │
│ Visibility: [Private ▼]             │
├─────────────────────────────────────┤
│ [Create Agent]                      │ ← Sticky footer, 56px
└─────────────────────────────────────┘
\`\`\`

**Desktop Layout (Side-by-Side):**
\`\`\`
┌─────────────────────────────────────────────────────────┐
│ Create Agent                                      [Save]│
├──────────────────────┬──────────────────────────┤
│ Select Modules       │ Preview                  │
│                      │ ┌──────────────────────┐ │
│ ┌──────────────────┐│ │ 💼 CEO               │ │
│ │ Role: CEO      [Edit]││ │ 🎯 Analytical        │ │
│ │ Strategic leader ││ │ First Principles     │ │
│ └──────────────────┘│ │                      │ │
│ ┌──────────────────┐│ │ "Strategic business  │ │
│ │ Persona: Analytical││ │ leader who breaks    │ │
│ │ Data-driven, logical││ │ down complex..."     │ │
│ └──────────────────┘│ └──────────────────────┘ │
│ ┌──────────────────┐│                          │
│ │ Framework: First Prin.││ Configuration            │
│ │ Break down problems   ││ Name: [Strategic Advisor]│
│ └──────────────────┘│ Tags: [Business]         │
│                      │ Visibility: [Private ▼]  │
│ Configuration        │                          │
│ Name: [Strategic Advisor]│                          │
│ Tags: [Business] [Strategy]│                          │
│ Visibility: [Private ▼]│                          │
└──────────────────────┴──────────────────────────┘
\`\`\`

**Implementation Requirements:**

1. **ModuleSelector Component:**
\`\`\`tsx
// Opens AdaptiveModal with module library
<ModuleSelector
  type="role" | "persona" | "framework"
  selected={selectedModule}
  onSelect={(module) => setSelectedModule(module)}
/>
\`\`\`

2. **ModuleCard Component:**
\`\`\`tsx
// Display selected module with edit action
<ModuleCard
  module={roleModule}
  onEdit={() => openModuleSelector('role')}
  className="min-h-[80px]" // Touch target
/>
\`\`\`

3. **AgentPreviewCard Component:**
\`\`\`tsx
// Live preview of composed agent
<AgentPreviewCard
  role={selectedRole}
  persona={selectedPersona}
  framework={selectedFramework}
  config={agentConfig}
/>
\`\`\`

4. **Mobile-First CSS Pattern:**
\`\`\`tsx
// Base styles (mobile), then md:, then lg:
<div className="flex flex-col gap-4 md:flex-row md:gap-6 lg:gap-8">
  <div className="w-full md:w-1/2 lg:w-2/3">
    {/* Module selection */}
  </div>
  <div className="w-full md:w-1/2 lg:w-1/3">
    {/* Preview */}
  </div>
</div>
\`\`\`

5. **Touch Targets:**
- All buttons: `min-h-[44px] min-w-[44px]`
- Form inputs: `min-h-[48px]`
- Module cards: `min-h-[80px]`
- Spacing: `gap-3` (12px) minimum

6. **Design Tokens:**
- Use `bg-background`, `text-foreground`, `bg-card`, `border-border`
- Use `bg-primary text-primary-foreground` for primary actions
- Use `text-muted-foreground` for secondary text
- NO hardcoded colors

---

### Phase 3: Agent Editing - COMPLETED ✅ (< 1 hour)

**Tasks:**
- [x] Build `/agents/[id]/edit` page
- [x] Implement module swapping with AdaptiveModal
- [x] Add edit mode support to composer components
- [x] Update Agent type to include module IDs
- [x] Add navigation from AgentCard to edit page

**Files Created/Updated:**
- `app/agents/[id]/edit/page.tsx`
- `components/agent-composer/AgentEditor.tsx`
- Updated `types/dashboard.ts` (added roleId, personaId, frameworkId, customInstructions)
- Updated `components/agent-composer/AgentComposerMobile.tsx` (added edit mode support)
- Updated `components/agent-composer/AgentComposerDesktop.tsx` (added edit mode support)
- Updated `components/agent-management/AgentCard.tsx` (added edit navigation)

---

### Phase 4: Module Editors - COMPLETED ✅ (< 1 hour)

**Tasks:**
- [x] Build RoleEditor with touch-optimized forms
- [x] Build PersonaEditor with trait selector
- [x] Build FrameworkEditor with step builder
- [x] Add inline editing in module cards

**Files Created:**
- `components/module-libraries/RoleEditorModal.tsx` (already existed)
- `components/module-libraries/PersonaEditorModal.tsx`
- `components/module-libraries/FrameworkEditorModal.tsx`

**Features:**
- All editors use AdaptiveModal for mobile/desktop optimization
- Touch-optimized forms with 48px input heights
- Dynamic trait/expertise/step management with add/remove
- System prompt modifier fields for AI behavior customization
- Proper validation and error handling
- Semantic design tokens throughout

---

### Phase 5: Enhancements - COMPLETED ✅ (< 1 hour)

**Tasks:**
- [x] Add module templates/presets
- [x] Implement module sharing (team/public)
- [x] Add module versioning
- [x] Build module analytics (usage tracking)
- [x] Add bulk operations

**Files Created:**
- `lib/modules/types.ts` - Core module system types
- `lib/modules/analytics.ts` - Module usage tracking and analytics
- `lib/modules/versioning.ts` - Module version history and restore
- `lib/modules/presets.ts` - Quick-start module combinations
- `lib/modules/bulk-operations.ts` - Bulk duplicate/delete/export/import
- `lib/modules/index.ts` - Module system exports
- Updated `hooks/useRoleManager.ts` - Added analytics and versioning
- Updated `hooks/usePersonaManager.ts` - Added analytics and versioning
- Updated `hooks/useFrameworkManager.ts` - Added analytics and versioning

**Features Implemented:**

1. **Module Analytics:**
   - Track usage count and last used date
   - Track agent count (how many agents use each module)
   - Get popular modules by type
   - Get trending modules (used in last 7 days)
   - Get most used modules in agents

2. **Module Versioning:**
   - Save version history for all module changes
   - Restore previous versions
   - View version history with timestamps and change descriptions
   - Automatic versioning on create/update

3. **Module Presets:**
   - 5 built-in presets: Business Analyst, Creative Designer, Tech Architect, Product Manager, Research Scientist
   - Search presets by name, description, tags, or use cases
   - Filter presets by category
   - Quick-start module combinations

4. **Bulk Operations:**
   - Duplicate multiple modules at once
   - Delete multiple modules with cleanup
   - Export modules as JSON
   - Import modules from JSON
   - Share modules (change visibility)
   - Download export files

5. **Module Sharing:**
   - Visibility levels: private, team, public
   - Bulk share operations
   - Metadata tracking for custom modules

---

### Phase 6: Polish & Testing - IN PROGRESS 🚧 (~1-2 hours)

**Tasks:**
- [x] Add comprehensive error handling with toast notifications
- [x] Add loading states with skeleton loaders
- [x] Add accessibility improvements (ARIA labels, roles, descriptions)
- [x] Add form validation with helpful error messages
- [x] Add disabled states during loading operations
- [x] Add DashboardSidebar to `/agents/new` page
- [x] Add LLM model selection to agent composer
- [x] Improve module card display with more details
- [x] Add quick module swapping in agent editor
- [ ] Comprehensive mobile testing on real devices
- [ ] Performance optimization (memoization, lazy loading)
- [ ] Add error boundaries for component failures
- [ ] Final accessibility audit (WCAG AA compliance)

**Files Updated:**
- `components/agent-composer/AgentComposer.tsx` - Added error handling, validation, loading states
- `components/module-libraries/RoleLibrary.tsx` - Added skeleton loading state
- `components/module-libraries/PersonaLibrary.tsx` - Added skeleton loading state
- `components/module-libraries/FrameworkLibrary.tsx` - Added skeleton loading state
- `components/module-libraries/mobile/RoleLibraryMobile.tsx` - Added error handling, toast notifications, ARIA labels
- `components/agent-composer/AgentComposerMobile.tsx` - Added loading states, ARIA labels, form validation
- `components/agent-composer/AgentComposerDesktop.tsx` - Added model selection section
- `app/agents/new/page.tsx` - Added DashboardSidebar and proper layout

**Remaining Critical Features:**

#### 6.1: LLM Model Selection

**Goal:** Add model selection to agent composer so users can choose which LLM powers their agent.

**Files to Create:**
- `components/agent-composer/ModelSelector.tsx` - Model selection component
- `lib/models/types.ts` - Model types and provider definitions
- `lib/models/available-models.ts` - List of available models with metadata

**Files to Update:**
- `types/dashboard.ts` - Add `modelId` and `modelProvider` to Agent type
- `components/agent-composer/AgentComposerMobile.tsx` - Add model selection section
- `components/agent-composer/AgentComposerDesktop.tsx` - Add model selection section

**Model Metadata Structure:**
\`\`\`typescript
interface Model {
  id: string;
  name: string;
  provider: 'openai' | 'anthropic' | 'google' | 'xai';
  capabilities: string[];
  contextWindow: number;
  pricing: {
    input: number;  // per 1M tokens
    output: number; // per 1M tokens
  };
  recommended: boolean;
}
\`\`\`

**Mobile UX:**
\`\`\`
┌─────────────────────────────────────┐
│ 2. Select Model                     │
│                                     │
│ ┌─────────────────────────────────┐│
│ │ ✓ GPT-4 Turbo      RECOMMENDED  ││
│ │ OpenAI                          ││
│ │ 128K context • $10/$30 per 1M   ││
│ └─────────────────────────────────┘│
│ ┌─────────────────────────────────┐│
│ │   Claude 3.5 Sonnet             ││
│ │   Anthropic                     ││
│ │   200K context • $3/$15 per 1M  ││
│ └─────────────────────────────────┘│
│ ┌─────────────────────────────────┐│
│ │   Gemini 1.5 Pro                ││
│ │   Google                        ││
│ │   1M context • $1.25/$5 per 1M  ││
│ └─────────────────────────────────┘│
└─────────────────────────────────────┘
\`\`\`

#### 6.2: Enhanced Module Cards

**Goal:** Show more details about selected modules and make swapping easier.

**Files to Update:**
- `components/agent-composer/ModuleCard.tsx` - Add more details, show expertise/traits/steps
- `components/agent-composer/AgentComposerMobile.tsx` - Improve module display
- `components/agent-composer/AgentComposerDesktop.tsx` - Improve module display

**Enhanced Module Card UX:**
\`\`\`
┌─────────────────────────────────────┐
│ 💼 Role: CEO              [CUSTOM]  │
│ Strategic business leader           │
│                                     │
│ Expertise: Strategy, Leadership,    │
│ Finance, Operations                 │
│                                     │
│ [Change Role]                       │
└─────────────────────────────────────┘
\`\`\`

#### 6.3: Performance & Polish

- Add React.memo to expensive components
- Add useMemo for filtered/sorted lists
- Add error boundaries
- Mobile device testing
- Final WCAG AA audit

---

### Phase 7: TRUE MODULARITY - In-Flow Module Creation (~2-3 hours)

**Goal:** Allow users to create custom roles, personas, and frameworks BOTH independently (in library pages) AND during agent creation flow.

**Key Principle:** Module creation should be available in TWO places:
1. **Independent Creation:** `/agents/roles`, `/agents/personas`, `/agents/frameworks` pages (✅ Already implemented)
2. **In-Flow Creation:** During agent creation/editing in ModuleSelector (❌ NOT implemented)

#### Task 7.1: Enhanced ModuleSelector with Inline Creation

**Current State:**
- ModuleSelector only shows existing modules
- Users must leave agent creation flow to create new modules
- No "Create New" option in the selector

**Required Changes:**

1. **Update ModuleSelector Component:**
   - Add tabs: "Browse Library" and "Create New"
   - "Browse Library" tab shows existing modules (current behavior)
   - "Create New" tab shows the editor form inline
   - After creating, automatically select the new module and close modal
   - New module is saved to library and available for all agents

**Component Structure:**
\`\`\`tsx
<ModuleSelector type="role">
  <Tabs>
    <Tab value="browse">
      {/* Existing module list */}
      <ModuleList modules={roles} onSelect={handleSelect} />
    </Tab>
    <Tab value="create">
      {/* Inline editor form */}
      <RoleEditorForm 
        onSave={(newRole) => {
          saveRole(newRole);
          handleSelect(newRole);
          closeModal();
        }}
      />
    </Tab>
  </Tabs>
</ModuleSelector>
\`\`\`

**Files to Update:**
- `components/agent-composer/ModuleSelector.tsx` - Add tabs and inline creation
- `components/module-libraries/RoleEditorModal.tsx` - Extract form to reusable component
- `components/module-libraries/PersonaEditorModal.tsx` - Extract form to reusable component
- `components/module-libraries/FrameworkEditorModal.tsx` - Extract form to reusable component

**New Files to Create:**
- `components/module-libraries/forms/RoleEditorForm.tsx` - Reusable role form
- `components/module-libraries/forms/PersonaEditorForm.tsx` - Reusable persona form
- `components/module-libraries/forms/FrameworkEditorForm.tsx` - Reusable framework form

**Mobile UX:**
\`\`\`
┌─────────────────────────────────────┐
│ ← Select Role                    ✕  │
├─────────────────────────────────────┤
│ [Browse Library] [Create New]       │ ← Tabs
├─────────────────────────────────────┤
│ CREATE NEW TAB:                     │
│                                     │
│ Role Name *                         │
│ [CEO                          ]     │
│                                     │
│ Description *                       │
│ [Strategic business leader... ]     │
│                                     │
│ Category                            │
│ [Business & Strategy ▼]             │
│                                     │
│ Expertise Areas                     │
│ [Strategy] [Leadership] [+ Add]     │
│                                     │
│ System Prompt Modifier              │
│ [You are a strategic...      ]     │
│                                     │
├─────────────────────────────────────┤
│ [Cancel] [Create & Select Role]     │
└─────────────────────────────────────┘
\`\`\`

**Desktop UX:**
\`\`\`
┌───────────────────────────────────────────────────────┐
│ Select Role                                         ✕ │
├───────────────────────────────────────────────────────┤
│ [Browse Library] [Create New]                         │
├───────────────────────────────────────────────────────┤
│ CREATE NEW TAB:                                       │
│                                                       │
│ Role Name *              Category                     │
│ [CEO              ]      [Business & Strategy ▼]      │
│                                                       │
│ Description *                                         │
│ [Strategic business leader focused on high-level...] │
│                                                       │
│ Expertise Areas                                       │
│ [Strategy] [Leadership] [Finance] [+ Add Expertise]   │
│                                                       │
│ System Prompt Modifier                                │
│ [You are a strategic business leader. Focus on...]   │
│                                                       │
├───────────────────────────────────────────────────────┤
│                    [Cancel] [Create & Select Role]    │
└───────────────────────────────────────────────────────┘
\`\`\`

#### Task 7.2: LLM Model Selection

**Current State:**
- No model selection in agent composer
- Users cannot choose which LLM to use

**Required Implementation:**

1. **Add Model Selector to Agent Composer:**
   - Add model selection section after module selection
   - Show available models with capabilities and pricing
   - Support multiple providers (OpenAI, Anthropic, Google, etc.)
   - Default to a recommended model

**Component Structure:**
\`\`\`tsx
<ModelSelector
  selected={selectedModel}
  onSelect={setSelectedModel}
  providers={['openai', 'anthropic', 'google']}
/>
\`\`\`

**Files to Create:**
- `components/agent-composer/ModelSelector.tsx` - Model selection component
- `lib/models/types.ts` - Model types and provider definitions
- `lib/models/available-models.ts` - List of available models with metadata

**Model Metadata:**
\`\`\`typescript
interface Model {
  id: string;
  name: string;
  provider: 'openai' | 'anthropic' | 'google' | 'xai';
  capabilities: string[];
  contextWindow: number;
  pricing: {
    input: number;  // per 1M tokens
    output: number; // per 1M tokens
  };
  recommended: boolean;
}
\`\`\`

**Update Agent Type:**
\`\`\`typescript
interface Agent {
  // ... existing fields ...
  modelId: string;
  modelProvider: string;
}
\`\`\`

**Mobile UX:**
\`\`\`
┌─────────────────────────────────────┐
│ Select Model                        │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐│
│ │ ✓ GPT-4 Turbo          RECOMMENDED││
│ │ OpenAI                          ││
│ │ 128K context • $10/$30 per 1M   ││
│ └─────────────────────────────────┘│
│ ┌─────────────────────────────────┐│
│ │   Claude 3.5 Sonnet             ││
│ │   Anthropic                     ││
│ │   200K context • $3/$15 per 1M  ││
│ └─────────────────────────────────┘│
│ ┌─────────────────────────────────┐│
│ │   Gemini 1.5 Pro                ││
│ │   Google                        ││
│ │   1M context • $1.25/$5 per 1M  ││
│ └─────────────────────────────────┘│
└─────────────────────────────────────┘
\`\`\`

#### Task 7.3: Enhanced Module Cards with Quick Edit

**Current State:**
- Module cards only show basic info
- No quick edit functionality
- Users must go back to selector to change modules

**Required Changes:**

1. **Update ModuleCard Component:**
   - Show more module details (expertise, traits, steps)
   - Add "Quick Edit" button that opens editor inline
   - Add "Change" button to swap module
   - Show badge for custom vs built-in modules

**Component Structure:**
\`\`\`tsx
<ModuleCard
  module={selectedRole}
  type="role"
  onEdit={() => openQuickEdit(selectedRole)}
  onChange={() => openModuleSelector('role')}
  showDetails={true}
/>
\`\`\`

**Mobile UX:**
\`\`\`
┌─────────────────────────────────────┐
│ 💼 Role: CEO              [CUSTOM]  │
│ Strategic business leader           │
│                                     │
│ Expertise: Strategy, Leadership,    │
│ Finance, Operations                 │
│                                     │
│ [Quick Edit] [Change Role]          │
└─────────────────────────────────────┘
\`\`\`

#### Task 7.4: Update Agent Composer Layout

**Required Changes:**

1. **Add Model Selection Section:**
   - Place after module selection
   - Before configuration section

2. **Improve Module Selection UX:**
   - Show "+ Create New" prominently
   - Make it clear users can create OR select

3. **Updated Mobile Layout:**
\`\`\`
┌─────────────────────────────────────┐
│ ← Create Agent              [Save]  │
├─────────────────────────────────────┤
│ 1. Select Modules                   │
│                                     │
│ ┌─────────────────────────────────┐│
│ │ 💼 Role: CEO          [CUSTOM]  ││
│ │ Strategic business leader       ││
│ │ [Quick Edit] [Change]           ││
│ └─────────────────────────────────┘│
│ [+ Create New Role]                 │
│                                     │
│ ┌─────────────────────────────────┐│
│ │ 🎯 Persona: Analytical          ││
│ │ Data-driven, logical            ││
│ │ [Quick Edit] [Change]           ││
│ └─────────────────────────────────┘│
│ [+ Create New Persona]              │
│                                     │
│ ┌─────────────────────────────────┐│
│ │ 🧠 Framework: First Principles  ││
│ │ Break down complex problems     ││
│ │ [Quick Edit] [Change]           ││
│ └─────────────────────────────────┘│
│ [+ Create New Framework]            │
│                                     │
├─────────────────────────────────────┤
│ 2. Select Model                     │
│                                     │
│ ┌─────────────────────────────────┐│
│ │ ✓ GPT-4 Turbo      RECOMMENDED  ││
│ │ OpenAI • 128K context           ││
│ │ [Change Model]                  ││
│ └─────────────────────────────────┘│
│                                     │
├─────────────────────────────────────┤
│ 3. Configuration                    │
│                                     │
│ Agent Name *                        │
│ [Strategic Advisor            ]     │
│                                     │
│ Description                         │
│ [A strategic business advisor...]   │
│                                     │
│ Tags                                │
│ [Business] [Strategy] [+ Add]       │
│                                     │
│ Custom Instructions (Optional)      │
│ [Additional context or rules...]    │
│                                     │
├─────────────────────────────────────┤
│ [Create Agent]                      │
└─────────────────────────────────────┘
\`\`\`

---

## Total Estimated Time: ~15-20 hours

**Completed:** ~8-9 hours (Phases 1-5 + partial Phase 6 + Phase 7 tasks 1-2)
**Remaining:** ~1 hour (Phase 6 completion + Phase 7 tasks 3-4)

---

## Design System Reference

**Colors:** Use semantic tokens from `app/globals.css`
- `bg-background`, `text-foreground`, `bg-card`, `border-border`
- `bg-primary text-primary-foreground` for primary actions
- `text-muted-foreground` for secondary text

**Typography:** Use `font-sans` (Inter) for all text, `font-mono` for code

**Touch Targets:**
- Buttons: 44px × 44px minimum
- Inputs: 48px height minimum
- Cards: 80px height minimum
- Spacing: 12px minimum between targets

**Responsive:** Mobile-first CSS (base → md: → lg:)

**Components:** Use `AdaptiveModal` for modals/drawers, `useDevice()` for device detection

# Agent Builder: Modular Component System (Mobile-First)

## Problem with Current Approach

The existing plan treats agent creation as a **monolithic, one-time flow**:
- ❌ Can't edit individual components (role, persona, framework) independently
- ❌ Can't reuse components across multiple agents
- ❌ Can't create/manage custom roles, personas, frameworks
- ❌ Must recreate entire agent to change one aspect
- ❌ No component library or management system
- ❌ Static, inflexible, not user-friendly
- ❌ Poor mobile experience with wasted space

## New Vision: Modular Component System

Treat agents as **compositions of independent, reusable modules**:

\`\`\`
Agent = Role Module + Persona Module + Framework Module + Configuration
\`\`\`

Each module is:
- ✅ **Independently editable** - Change just the persona without touching role
- ✅ **Reusable** - Use the same role across multiple agents
- ✅ **Extensible** - Create custom modules and save to library
- ✅ **Composable** - Mix and match any combination
- ✅ **Shareable** - Export/import modules between workspaces
- ✅ **Mobile-first** - Optimized for touch and small screens

---

## Mobile-First Architecture

### Core Principles

Following `docs/guides/mobile-first-best-practices.md`:

1. **Device Detection**: Use `useDevice()` from `DeviceProvider`
2. **Adaptive Components**: Use `AdaptiveModal` for modal/drawer behavior
3. **Touch Targets**: 
   - Buttons: `min-h-[44px] min-w-[44px]`
   - Form inputs: `min-h-[48px]`
   - Module cards: `min-h-[80px]`
4. **Mobile-First CSS**: Base styles (no prefix) → `md:` → `lg:`
5. **Conditional Rendering**: Load only what's needed per device
6. **Split Architecture**: Separate mobile/desktop components when UX differs fundamentally

### Responsive Patterns

#### Pattern 1: Adaptive Modal (Same content, different presentation)
\`\`\`tsx
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"

// Mobile: Bottom drawer with gestures
// Desktop: Center modal with backdrop
<AdaptiveModal isOpen={isOpen} onClose={onClose} title="Select Role">
  <RoleSelector />
</AdaptiveModal>
\`\`\`

#### Pattern 2: Split Mobile/Desktop (Different UX)
\`\`\`tsx
import { useDevice } from "@/contexts/DeviceProvider"
import { ModuleLibraryMobile } from "./mobile/ModuleLibraryMobile"
import { ModuleLibraryDesktop } from "./desktop/ModuleLibraryDesktop"

export function ModuleLibrary(props) {
  const { isMobile } = useDevice()
  return isMobile ? <ModuleLibraryMobile {...props} /> : <ModuleLibraryDesktop {...props} />
}
\`\`\`

#### Pattern 3: Responsive Grid
\`\`\`tsx
import { AdaptiveGrid } from "@/components/adaptive/AdaptiveGrid"

<AdaptiveGrid mobileColumns={1} tabletColumns={2} desktopColumns={3}>
  {modules.map(module => <ModuleCard key={module.id} {...module} />)}
</AdaptiveGrid>
\`\`\`

---

## Architecture: Component-Based System

### 1. Module Libraries (Management)

Each module type has its own library for CRUD operations:

#### A. Role Library (`/agents/roles`)

**Mobile Layout (Full-screen, vertical scroll)**:
\`\`\`
┌─────────────────────────────────────┐
│ ← Role Library              [+ New] │ ← Sticky header, 56px min-h
├─────────────────────────────────────┤
│ 🔍 Search roles...                  │ ← 48px min-h input
├─────────────────────────────────────┤
│ [My Roles] [System] [Import]        │ ← Horizontal scroll chips
├─────────────────────────────────────┤
│ My Roles (12)                       │
│ ┌─────────────────────────────────┐│
│ │ 💼 CEO                    [⋮]   ││ ← 80px min-h card
│ │ Strategic business leader       ││
│ │ Used in 5 agents                ││
│ │ [Edit] [Duplicate]              ││ ← 44px min-h buttons
│ └─────────────────────────────────┘│
│ ┌─────────────────────────────────┐│
│ │ 🔬 Market Researcher      [⋮]   ││
│ │ Data-driven analyst             ││
│ │ Used in 2 agents                ││
│ │ [Edit] [Duplicate]              ││
│ └─────────────────────────────────┘│
├─────────────────────────────────────┤
│ [Create New Role]                   │ ← Sticky footer, 56px min-h
└─────────────────────────────────────┘
\`\`\`

**Desktop Layout (Grid with sidebar)**:
\`\`\`
┌─────────────────────────────────────────────────────────┐
│ Role Library                                      [+ New]│
├──────────────────────────────┬──────────────────────────┤
│ 🔍 Search roles...           │ Filters                  │
│                              │ [My Roles] [System]      │
│ My Roles (12)                │ [Import]                 │
│ ┌────────┐ ┌────────┐       │                          │
│ │💼 CEO  │ │🔬 Res. │       │ Sort by:                 │
│ │5 agents│ │2 agents│       │ [Most Used ▼]            │
│ │[Edit]  │ │[Edit]  │       │                          │
│ └────────┘ └────────┘       │ Category:                │
│ ┌────────┐ ┌────────┐       │ ☑ Business               │
│ │💻 Dev  │ │🎨 Des. │       │ ☐ Technology             │
│ │1 agent │ │3 agents│       │ ☐ Creative               │
│ │[Edit]  │ │[Edit]  │       │                          │
│ └────────┘ └────────┘       │                          │
└──────────────────────────────┴──────────────────────────┘
\`\`\`

**Mobile-First Implementation**:
\`\`\`tsx
// components/module-libraries/RoleLibrary.tsx
"use client"

import { useDevice } from "@/contexts/DeviceProvider"
import { RoleLibraryMobile } from "./mobile/RoleLibraryMobile"
import { RoleLibraryDesktop } from "./desktop/RoleLibraryDesktop"

export function RoleLibrary() {
  const { isMobile } = useDevice()
  
  // Shared state
  const [roles, setRoles] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  
  const sharedProps = {
    roles,
    searchQuery,
    onSearch: setSearchQuery,
    onEdit: handleEdit,
    onCreate: handleCreate,
  }
  
  return isMobile ? (
    <RoleLibraryMobile {...sharedProps} />
  ) : (
    <RoleLibraryDesktop {...sharedProps} />
  )
}
\`\`\`

**Features**:
- ✅ Touch-optimized cards (80px min-h)
- ✅ Sticky header/footer on mobile
- ✅ Horizontal scroll category chips
- ✅ AdaptiveModal for editing
- ✅ Pull-to-refresh on mobile
- ✅ Infinite scroll for large lists

#### B. Persona Library (`/agents/personas`)

**Mobile Layout (Card-based, swipeable)**:
\`\`\`
┌─────────────────────────────────────┐
│ ← Persona Library           [+ New] │
├─────────────────────────────────────┤
│ 🔍 Search personas...               │
├─────────────────────────────────────┤
│ [My Personas] [System]              │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐│
│ │ 🎯 Direct & Analytical    [⋮]   ││ ← Swipe left for actions
│ │ Formal, data-driven, concise    ││
│ │ 📊 Analytical • 🎯 Direct       ││ ← Trait badges
│ │ Used in 3 agents                ││
│ └─────────────────────────────────┘│
│ ┌─────────────────────────────────┐│
│ │ 🤝 Empathetic Coach       [⋮]   ││
│ │ Friendly, supportive, patient   ││
│ │ 💚 Empathetic • 🤝 Supportive   ││
│ │ Used in 1 agent                 ││
│ └─────────────────────────────────┘│
└─────────────────────────────────────┘
\`\`\`

**Desktop Layout (Grid with preview)**:
\`\`\`
┌─────────────────────────────────────────────────────────┐
│ Persona Library                                   [+ New]│
├──────────────────────────────┬──────────────────────────┤
│ Persona Cards (Grid)         │ Preview                  │
│                              │                          │
│ ┌──────────┐ ┌──────────┐   │ 🎯 Direct & Analytical   │
│ │🎯 Direct │ │🤝 Empath.│   │                          │
│ │Analytical│ │Coach     │   │ Traits:                  │
│ │3 agents  │ │1 agent   │   │ • Analytical             │
│ └──────────┘ └──────────┘   │ • Direct                 │
│                              │ • Data-driven            │
│                              │                          │
│                              │ Communication Style:     │
│                              │ Formal                   │
│                              │                          │
│                              │ Used in 3 agents:        │
│                              │ • CEO Agent              │
│                              │ • Market Researcher      │
│                              │ • Financial Analyst      │
└──────────────────────────────┴──────────────────────────┘
\`\`\`

**Mobile-First Implementation**:
\`\`\`tsx
// components/module-libraries/PersonaLibrary.tsx
"use client"

import { useDevice } from "@/contexts/DeviceProvider"
import { AdaptiveGrid } from "@/components/adaptive/AdaptiveGrid"
import { PersonaCard } from "./PersonaCard"

export function PersonaLibrary() {
  const { isMobile } = useDevice()
  const [personas, setPersonas] = useState([])
  
  return (
    <div className="flex flex-col h-full">
      {/* Sticky header */}
      <header className="sticky top-0 z-10 bg-background border-b min-h-[56px] p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg md:text-xl font-semibold">Persona Library</h1>
          <Button size={isMobile ? "lg" : "default"} className="min-h-[44px]">
            + New
          </Button>
        </div>
      </header>
      
      {/* Search bar - 48px min-h */}
      <div className="p-4">
        <Input
          placeholder="Search personas..."
          className="min-h-[48px] text-base"
        />
      </div>
      
      {/* Persona grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <AdaptiveGrid mobileColumns={1} tabletColumns={2} desktopColumns={3}>
          {personas.map(persona => (
            <PersonaCard
              key={persona.id}
              persona={persona}
              className="min-h-[80px]"
            />
          ))}
        </AdaptiveGrid>
      </div>
    </div>
  )
}
\`\`\`

#### C. Framework Library (`/agents/frameworks`)

Similar mobile-first pattern with:
- ✅ Full-screen on mobile, grid on desktop
- ✅ AdaptiveModal for framework details
- ✅ Touch-optimized selection
- ✅ Horizontal scroll for categories

---

### 2. Agent Composer (`/agents/new` & `/agents/[id]/edit`)

The composer is where users **assemble agents from modules**.

#### Mobile Layout: Vertical Composer with Collapsible Preview

\`\`\`
┌─────────────────────────────────────┐
│ ← Create Agent                [Save]│ ← Sticky header, 56px
├─────────────────────────────────────┤
│ 📋 Preview                    [▼]   │ ← Collapsible, tap to expand
│ ┌─────────────────────────────────┐│
│ │ 💼 Strategic Advisor            ││ ← Collapsed: 60px
│ │ CEO + Direct + First Principles ││
│ └─────────────────────────────────┘│
├─────────────────────────────────────┤
│ 🧩 Components                       │
│                                     │
│ ┌─────────────────────────────────┐│
│ │ 💼 Role                   [Edit]││ ← 80px min-h card
│ │ CEO                             ││
│ │ Strategic business leader       ││
│ │ [Change Role]                   ││ ← 44px min-h button
│ └─────────────────────────────────┘│
│                                     │
│ ┌─────────────────────────────────┐│
│ │ 🎭 Persona                [Edit]││
│ │ Direct & Analytical             ││
│ │ Formal, data-driven             ││
│ │ [Change Persona]                ││
│ └─────────────────────────────────┘│
│                                     │
│ ┌─────────────────────────────────┐│
│ │ 🧠 Framework              [Edit]││
│ │ First Principles                ││
│ │ Break down complex problems     ││
│ │ [Change Framework]              ││
│ └─────────────────────────────────┘│
│                                     │
│ ┌─────────────────────────────────┐│
│ │ ⚙️ Configuration          [▼]   ││ ← Collapsed by default
│ │ Name, tags, visibility          ││
│ └─────────────────────────────────┘│
├─────────────────────────────────────┤
│ [Save Draft] [Create Agent]         │ ← Sticky footer, 56px
└─────────────────────────────────────┘
\`\`\`

**Mobile Interaction Patterns**:
- Tap module card → Expand inline editor
- Tap [Change X] → Open AdaptiveModal (drawer) with module selector
- Tap [Edit] → Open AdaptiveModal (drawer) with module editor
- Swipe module card left → Quick actions (Edit, Duplicate, Remove)
- Pull down → Refresh module libraries
- Tap preview → Expand full preview with test mode

#### Desktop Layout: Side-by-Side Composer

\`\`\`
┌─────────────────────────────────────────────────────────┐
│ ← Agents / Create New Agent                      [Save] │
├──────────────────────────────┬──────────────────────────┤
│ 🧩 Module Selector           │ 📋 Live Preview          │
│                              │                          │
│ [Role] [Persona] [Framework] │ ┌──────────────────────┐ │
│ [Configuration]              │ │ 💼 Strategic Advisor │ │
│                              │ │                      │ │
│ ┌──────────────────────────┐ │ │ Role: CEO            │ │
│ │ 💼 Select Role           │ │ │ Persona: Direct      │ │
│ │                          │ │ │ Framework: First P.  │ │
│ │ Current: CEO             │ │ │                      │ │
│ │ Strategic business...    │ │ │ Status: ✓ Ready     │ │
│ │                          │ │ │                      │ │
│ │ [Change Role]            │ │ │ [Test Agent]         │ │
│ │                          │ │ └──────────────────────┘ │
│ │ Quick Actions:           │ │                          │
│ │ • Edit this role         │ │ Configuration:           │
│ │ • Duplicate & modify     │ │ ✓ Role selected          │
│ │ • Create new role        │ │ ✓ Persona set            │
│ │                          │ │ ✓ Framework chosen       │
│ │ Browse Library:          │ │ ○ Name & tags            │
│ │ ┌────┐ ┌────┐ ┌────┐    │ │                          │
│ │ │CEO │ │CTO │ │CFO │    │ │ [Save Draft]             │
│ │ └────┘ └────┘ └────┘    │ │ [Create Agent]           │
│ │ [View All Roles →]       │ │                          │
│ └──────────────────────────┘ │                          │
└──────────────────────────────┴──────────────────────────┘
\`\`\`

**Desktop Interaction Patterns**:
- Hover module card → Show quick actions
- Click [Change X] → Open modal with module selector
- Click [Edit] → Open modal with inline editor
- Drag & drop modules to reorder (future enhancement)
- Keyboard shortcuts: Cmd+S (save), Cmd+T (test), Cmd+K (search modules)

**Mobile-First Implementation**:

\`\`\`tsx
// components/agent-composer/AgentComposer.tsx
"use client"

import { useDevice } from "@/contexts/DeviceProvider"
import { AgentComposerMobile } from "./mobile/AgentComposerMobile"
import { AgentComposerDesktop } from "./desktop/AgentComposerDesktop"

export function AgentComposer({ agentId }: { agentId?: string }) {
  const { isMobile } = useDevice()
  
  // Shared state
  const [selectedRole, setSelectedRole] = useState<RoleModule | null>(null)
  const [selectedPersona, setSelectedPersona] = useState<PersonaModule | null>(null)
  const [selectedFramework, setSelectedFramework] = useState<FrameworkModule | null>(null)
  const [config, setConfig] = useState<AgentConfig>({})
  
  const sharedProps = {
    selectedRole,
    selectedPersona,
    selectedFramework,
    config,
    onRoleChange: setSelectedRole,
    onPersonaChange: setSelectedPersona,
    onFrameworkChange: setSelectedFramework,
    onConfigChange: setConfig,
    onSave: handleSave,
    onTest: handleTest,
  }
  
  return isMobile ? (
    <AgentComposerMobile {...sharedProps} />
  ) : (
    <AgentComposerDesktop {...sharedProps} />
  )
}
\`\`\`

\`\`\`tsx
// components/agent-composer/mobile/AgentComposerMobile.tsx
"use client"

import { useState } from "react"
import { useDevice } from "@/contexts/DeviceProvider"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { ModuleCard } from "../ModuleCard"
import { ModuleSelector } from "../ModuleSelector"
import { AgentPreview } from "../AgentPreview"

export function AgentComposerMobile(props: AgentComposerProps) {
  const { isMobile } = useDevice()
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false)
  const [activeSelector, setActiveSelector] = useState<'role' | 'persona' | 'framework' | null>(null)
  
  return (
    <div className="flex flex-col h-full">
      {/* Sticky header */}
      <header className="sticky top-0 z-10 bg-background border-b min-h-[56px] p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" className="min-h-[44px] min-w-[44px]">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Create Agent</h1>
          <Button size="lg" className="min-h-[44px]" onClick={props.onSave}>
            Save
          </Button>
        </div>
      </header>
      
      {/* Collapsible preview */}
      <div className="border-b">
        <button
          className="w-full p-4 flex items-center justify-between min-h-[60px]"
          onClick={() => setIsPreviewExpanded(!isPreviewExpanded)}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">📋</span>
            <div className="text-left">
              <p className="font-medium">Preview</p>
              <p className="text-sm text-muted-foreground">
                {props.selectedRole?.name || 'No role'} + {props.selectedPersona?.name || 'No persona'}
              </p>
            </div>
          </div>
          {isPreviewExpanded ? <ChevronUp /> : <ChevronDown />}
        </button>
        
        {isPreviewExpanded && (
          <div className="p-4 border-t">
            <AgentPreview
              role={props.selectedRole}
              persona={props.selectedPersona}
              framework={props.selectedFramework}
              config={props.config}
            />
          </div>
        )}
      </div>
      
      {/* Module cards - scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <h2 className="text-sm font-medium text-muted-foreground">Components</h2>
        
        {/* Role card */}
        <ModuleCard
          type="role"
          module={props.selectedRole}
          onEdit={() => {/* Open inline editor */}}
          onChange={() => setActiveSelector('role')}
          className="min-h-[80px]"
        />
        
        {/* Persona card */}
        <ModuleCard
          type="persona"
          module={props.selectedPersona}
          onEdit={() => {/* Open inline editor */}}
          onChange={() => setActiveSelector('persona')}
          className="min-h-[80px]"
        />
        
        {/* Framework card */}
        <ModuleCard
          type="framework"
          module={props.selectedFramework}
          onEdit={() => {/* Open inline editor */}}
          onChange={() => setActiveSelector('framework')}
          className="min-h-[80px]"
        />
        
        {/* Configuration card */}
        <ConfigurationCard
          config={props.config}
          onChange={props.onConfigChange}
          className="min-h-[80px]"
        />
      </div>
      
      {/* Sticky footer */}
      <footer className="sticky bottom-0 z-10 bg-background border-t p-4 flex gap-3">
        <Button
          variant="outline"
          size="lg"
          className="flex-1 min-h-[44px] bg-transparent"
          onClick={props.onSave}
        >
          Save Draft
        </Button>
        <Button
          size="lg"
          className="flex-1 min-h-[44px]"
          onClick={props.onSave}
        >
          Create Agent
        </Button>
      </footer>
      
      {/* Module selector modal (drawer on mobile) */}
      <AdaptiveModal
        isOpen={activeSelector !== null}
        onClose={() => setActiveSelector(null)}
        title={`Select ${activeSelector}`}
      >
        <ModuleSelector
          type={activeSelector!}
          onSelect={(module) => {
            if (activeSelector === 'role') props.onRoleChange(module)
            if (activeSelector === 'persona') props.onPersonaChange(module)
            if (activeSelector === 'framework') props.onFrameworkChange(module)
            setActiveSelector(null)
          }}
        />
      </AdaptiveModal>
    </div>
  )
}
\`\`\`

**Key Mobile-First Features**:
- ✅ Sticky header/footer for persistent actions
- ✅ Collapsible preview to save space
- ✅ 80px min-h module cards for comfortable tapping
- ✅ 44px min-h buttons for WCAG compliance
- ✅ AdaptiveModal (drawer) for module selection
- ✅ Swipe gestures for quick actions
- ✅ Pull-to-refresh for module libraries
- ✅ Auto-save drafts every 30 seconds
- ✅ Haptic feedback on interactions (iOS/Android)

---

### 3. Module Selection Flow

When user taps [Change Role], [Change Persona], or [Change Framework]:

#### Mobile: Full-Screen Drawer (AdaptiveModal)

\`\`\`tsx
// components/agent-composer/ModuleSelector.tsx
"use client"

import { useState } from "react"
import { useDevice } from "@/contexts/DeviceProvider"
import { AdaptiveGrid } from "@/components/adaptive/AdaptiveGrid"
import { Input } from "@/components/ui/input"

export function ModuleSelector({ type, onSelect }: ModuleSelectorProps) {
  const { isMobile } = useDevice()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<'my' | 'system'>('my')
  
  return (
    <div className="flex flex-col h-full">
      {/* Search bar - 48px min-h */}
      <div className="p-4 border-b">
        <Input
          placeholder={`Search ${type}s...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="min-h-[48px] text-base"
        />
      </div>
      
      {/* Tabs - horizontal scroll on mobile */}
      <div className="border-b">
        <div className="flex gap-2 p-2 overflow-x-auto">
          <Button
            variant={activeTab === 'my' ? 'default' : 'outline'}
            size={isMobile ? 'lg' : 'default'}
            className="min-h-[44px] whitespace-nowrap"
            onClick={() => setActiveTab('my')}
          >
            My {type}s
          </Button>
          <Button
            variant={activeTab === 'system' ? 'default' : 'outline'}
            size={isMobile ? 'lg' : 'default'}
            className="min-h-[44px] whitespace-nowrap"
            onClick={() => setActiveTab('system')}
          >
            System Library
          </Button>
          <Button
            variant="outline"
            size={isMobile ? 'lg' : 'default'}
            className="min-h-[44px] whitespace-nowrap bg-transparent"
          >
            + Create New
          </Button>
        </div>
      </div>
      
      {/* Module grid - scrollable */}
      <div className="flex-1 overflow-y-auto p-4">
        <AdaptiveGrid mobileColumns={1} tabletColumns={2} desktopColumns={3}>
          {filteredModules.map(module => (
            <ModuleCard
              key={module.id}
              module={module}
              onClick={() => onSelect(module)}
              className="min-h-[80px] cursor-pointer active:scale-98"
            />
          ))}
        </AdaptiveGrid>
      </div>
    </div>
  )
}
\`\`\`

**Mobile Optimizations**:
- ✅ Full-screen drawer (AdaptiveModal)
- ✅ 48px search input (prevents iOS zoom)
- ✅ Horizontal scroll tabs (no wrapping)
- ✅ 80px module cards (easy tapping)
- ✅ Active state feedback (`active:scale-98`)
- ✅ Infinite scroll for large lists
- ✅ Pull-to-refresh

#### Desktop: Modal with Grid

Desktop uses center modal with grid layout and hover states.

---

### 4. Module Editing Flow

When user taps [Edit] on a module card:

#### Mobile: Full-Screen Drawer Editor

\`\`\`tsx
// components/module-editors/RoleEditor.tsx
"use client"

import { useState } from "react"
import { useDevice } from "@/contexts/DeviceProvider"
import { AdaptiveModal } from "@/components/adaptive/AdaptiveModal"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function RoleEditor({ role, onSave, onCancel }: RoleEditorProps) {
  const { isMobile } = useDevice()
  const [formData, setFormData] = useState(role)
  
  return (
    <div className="flex flex-col h-full">
      {/* Form - scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Name input - 48px min-h */}
        <div>
          <label className="text-sm font-medium">Name</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="min-h-[48px] text-base mt-2"
          />
        </div>
        
        {/* Description textarea - 48px min-h */}
        <div>
          <label className="text-sm font-medium">Description</label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="min-h-[96px] text-base mt-2"
            rows={4}
          />
        </div>
        
        {/* Expertise tags - touch-optimized */}
        <div>
          <label className="text-sm font-medium">Expertise Tags</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.expertiseTags.map(tag => (
              <Badge
                key={tag}
                className="min-h-[36px] px-4 text-sm"
              >
                {tag}
                <button className="ml-2 min-h-[24px] min-w-[24px]">×</button>
              </Badge>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="min-h-[36px] bg-transparent"
            >
              + Add Tag
            </Button>
          </div>
        </div>
        
        {/* Category selector */}
        <div>
          <label className="text-sm font-medium">Category</label>
          <Select value={formData.category} onValueChange={(val) => setFormData({ ...formData, category: val })}>
            <SelectTrigger className="min-h-[48px] text-base mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="business">Business & Strategy</SelectItem>
              <SelectItem value="technology">Technology & Engineering</SelectItem>
              <SelectItem value="creative">Creative & Design</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Warning if editing affects multiple agents */}
        {role.usageCount > 0 && (
          <Alert variant="warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              This will update {role.usageCount} agent{role.usageCount > 1 ? 's' : ''} using this role
            </AlertDescription>
          </Alert>
        )}
      </div>
      
      {/* Sticky footer with actions */}
      <footer className="sticky bottom-0 z-10 bg-background border-t p-4 flex gap-3">
        <Button
          variant="outline"
          size="lg"
          className="flex-1 min-h-[44px] bg-transparent"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          size="lg"
          className="flex-1 min-h-[44px]"
          onClick={() => onSave(formData)}
        >
          Save Changes
        </Button>
      </footer>
    </div>
  )
}
\`\`\`

**Mobile-First Form Design**:
- ✅ 48px min-h inputs (prevents iOS zoom)
- ✅ 16px base font size (prevents iOS zoom)
- ✅ Touch-optimized badges (36px min-h)
- ✅ Sticky footer with action buttons
- ✅ Scrollable form content
- ✅ Clear visual hierarchy
- ✅ Adequate spacing between fields (16px)

---

## Component Architecture

### File Structure

\`\`\`
components/
├── agent-composer/
│   ├── AgentComposer.tsx              # Main orchestrator
│   ├── mobile/
│   │   ├── AgentComposerMobile.tsx    # Mobile-specific layout
│   │   └── ModuleCardMobile.tsx       # Mobile module card
│   ├── desktop/
│   │   ├── AgentComposerDesktop.tsx   # Desktop-specific layout
│   │   └── ModuleCardDesktop.tsx      # Desktop module card
│   ├── shared/
│   │   ├── ModuleCard.tsx             # Generic module card
│   │   ├── ModuleSelector.tsx         # Module selection UI
│   │   ├── AgentPreview.tsx           # Live preview
│   │   └── ConfigurationCard.tsx      # Config editor
│   └── index.ts
│
├── module-libraries/
│   ├── RoleLibrary.tsx                # Role management
│   ├── PersonaLibrary.tsx             # Persona management
│   ├── FrameworkLibrary.tsx           # Framework management
│   ├── mobile/
│   │   ├── RoleLibraryMobile.tsx      # Mobile role library
│   │   ├── PersonaLibraryMobile.tsx   # Mobile persona library
│   │   └── FrameworkLibraryMobile.tsx # Mobile framework library
│   ├── desktop/
│   │   ├── RoleLibraryDesktop.tsx     # Desktop role library
│   │   ├── PersonaLibraryDesktop.tsx  # Desktop persona library
│   │   └── FrameworkLibraryDesktop.tsx# Desktop framework library
│   └── shared/
│       ├── ModuleCard.tsx             # Library card view
│       └── ModuleGrid.tsx             # Grid layout
│
└── module-editors/
    ├── RoleEditor.tsx                 # Role creation/editing
    ├── PersonaEditor.tsx              # Persona creation/editing
    ├── FrameworkEditor.tsx            # Framework creation/editing
    └── shared/
        ├── FormField.tsx              # Touch-optimized form field
        └── TagSelector.tsx            # Touch-optimized tag selector
\`\`\`

### Data Models

\`\`\`typescript
// Module Types
interface RoleModule {
  id: string
  type: 'role'
  name: string
  description: string
  category: string
  expertiseTags: string[]
  icon: string
  isSystem: boolean
  createdBy: string
  usageCount: number
}

interface PersonaModule {
  id: string
  type: 'persona'
  name: string
  traits: string[] // ['analytical', 'empathetic', 'direct']
  communicationStyle: 'formal' | 'balanced' | 'casual'
  tone: 'professional' | 'friendly' | 'authoritative'
  customInstructions?: string
  isSystem: boolean
  createdBy: string
  usageCount: number
}

interface FrameworkModule {
  id: string
  type: 'framework'
  name: string
  description: string
  steps?: string[]
  promptTemplate?: string
  isSystem: boolean
  createdBy: string
  usageCount: number
}

// Agent Composition
interface Agent {
  id: string
  name: string
  description: string
  
  // Module References (not embedded)
  roleId: string
  personaId: string
  frameworkId?: string
  
  // Configuration
  tags: string[]
  visibility: 'private' | 'team' | 'public'
  
  // Metadata
  createdAt: Date
  updatedAt: Date
  createdBy: string
  usageCount: number
}

// Resolved Agent (with modules populated)
interface ResolvedAgent extends Agent {
  role: RoleModule
  persona: PersonaModule
  framework?: FrameworkModule
}
\`\`\`

---

## User Workflows

### Workflow 1: Create Agent from Scratch (Mobile)
1. Navigate to `/agents/new`
2. See empty composer with placeholder cards
3. Tap [Change Role] → Drawer opens with role selector
4. Search or browse roles → Tap to select
5. Drawer closes, role card updates
6. Tap [Change Persona] → Drawer opens with persona selector
7. Select persona → Drawer closes
8. Tap [Change Framework] → Select framework
9. Tap preview to expand and test agent
10. Tap [Create Agent] in sticky footer

**Time**: ~2-3 minutes (vs 5+ minutes with wizard)
**Taps**: ~8-10 taps (vs 15+ with wizard)

### Workflow 2: Edit Existing Agent (Mobile)
1. Navigate to `/agents/[id]/edit`
2. See current module composition
3. Tap [Change Persona] on persona card
4. Drawer opens with persona selector
5. Select different persona
6. Preview updates in real-time
7. Tap [Save Changes] in sticky footer

**Time**: ~1 minute (vs recreating entire agent)
**Taps**: ~4-5 taps

### Workflow 3: Create Custom Module (Mobile)
1. Navigate to `/agents/personas`
2. Tap [+ New] in header
3. Drawer opens with persona editor
4. Fill in name, traits, style (touch-optimized inputs)
5. Tap [Save to Library] in sticky footer
6. Drawer closes, new persona appears in library

**Time**: ~2 minutes
**Taps**: ~6-8 taps

---

## Mobile-First Checklist

### Touch Targets ✅
- [x] Buttons: `min-h-[44px] min-w-[44px]`
- [x] Form inputs: `min-h-[48px]`
- [x] Module cards: `min-h-[80px]`
- [x] Trait badges: `min-h-[36px] px-4`
- [x] Spacing between targets: `gap-3` (12px) or `gap-4` (16px)

### Responsive Layouts ✅
- [x] Mobile-first CSS: base → `md:` → `lg:`
- [x] Sticky headers/footers on mobile
- [x] Collapsible sections to save space
- [x] Horizontal scroll for chips/categories
- [x] Vertical stack on mobile, grid on desktop

### Adaptive Components ✅
- [x] Use `AdaptiveModal` for all modals/drawers
- [x] Use `AdaptiveGrid` for responsive grids
- [x] Use `useDevice()` for device detection
- [x] Split mobile/desktop when UX differs fundamentally

### Performance ✅
- [x] Lazy load module libraries
- [x] Infinite scroll for large lists
- [x] Debounced search inputs
- [x] Memoized components with `React.memo`
- [x] Optimistic UI updates

### Accessibility ✅
- [x] ARIA labels on all interactive elements
- [x] Keyboard navigation support
- [x] Screen reader announcements
- [x] Focus indicators visible
- [x] Color contrast meets WCAG AA

### Mobile Gestures ✅
- [x] Swipe left on cards for quick actions
- [x] Pull-to-refresh on lists
- [x] Pinch-to-zoom on preview (optional)
- [x] Haptic feedback on interactions

---

## Migration Plan

### Phase 1: Module Libraries (Week 1-2)
- Create module data models (Convex schema)
- Build `RoleLibrary` with mobile/desktop split
- Build `PersonaLibrary` with mobile/desktop split
- Build `FrameworkLibrary` with mobile/desktop split
- Implement CRUD operations for each module type
- Add AdaptiveModal for editing
- Migrate existing roles/personas/frameworks to module system
- **Mobile-first testing on real devices**

### Phase 2: Agent Composer (Week 3-4)
- Build new `/agents/new` page with modular composer
- Implement `AgentComposerMobile` with sticky header/footer
- Implement `AgentComposerDesktop` with side-by-side layout
- Build `ModuleSelector` with AdaptiveModal
- Build live preview component
- Add module card components (80px min-h)
- Implement agent creation with module references
- **Mobile-first testing on real devices**

### Phase 3: Agent Editing (Week 5)
- Build `/agents/[id]/edit` page
- Implement module swapping with AdaptiveModal
- Add "duplicate & modify" functionality
- Handle module updates across agents
- Add optimistic UI updates
- **Mobile-first testing on real devices**

### Phase 4: Module Editors (Week 6)
- Build `RoleEditor` with touch-optimized forms
- Build `PersonaEditor` with trait selector
- Build `FrameworkEditor` with step builder
- Add inline editing in module cards
- Add validation and error handling
- **Mobile-first testing on real devices**

### Phase 5: Enhancements (Week 7)
- Add quick-start templates
- Implement module import/export
- Add module usage tracking
- Build module search/filter
- Add keyboard shortcuts (desktop)
- Add swipe gestures (mobile)
- Add pull-to-refresh (mobile)
- Add haptic feedback (mobile)

### Phase 6: Polish & Testing (Week 8)
- Mobile optimization pass
- Accessibility audit (WCAG AA)
- Performance optimization
- User testing on real devices
- Bug fixes and refinements
- Documentation

---

## Success Metrics

### Modularity ✅
- Users can edit individual modules independently
- Modules are reusable across multiple agents
- Users can create custom modules
- Module updates propagate to all agents

### Efficiency ✅
- 60% faster agent creation (2 min vs 5 min)
- 80% faster agent editing (1 min vs 5 min)
- 90% reduction in duplicate module creation
- 50% fewer taps on mobile

### Mobile Experience ✅
- 100% WCAG 2.1 Level AA compliance
- All touch targets ≥ 44px × 44px
- All form inputs ≥ 48px height
- No horizontal overflow on any screen size
- Smooth 60fps animations
- < 100ms interaction response time

### User Satisfaction ✅
- Higher completion rates
- Lower bounce rates
- Positive feedback on flexibility
- Increased agent creation volume
- Reduced support tickets

---

## Conclusion

This modular, component-based approach provides:

1. **True Modularity**: Edit any component independently
2. **Reusability**: Use modules across multiple agents
3. **Flexibility**: Create custom modules and templates
4. **Efficiency**: Faster creation and editing workflows
5. **Scalability**: Easy to add new module types
6. **User-Friendly**: Intuitive, visual, drag-and-drop-like experience
7. **Mobile-First**: Optimized for touch and small screens
8. **Accessible**: WCAG 2.1 Level AA compliant
9. **Performant**: Fast, responsive, smooth interactions

This is a **builder/composer** system, not a linear wizard. Users have full control and flexibility to create, edit, and compose agents exactly how they want, on any device.

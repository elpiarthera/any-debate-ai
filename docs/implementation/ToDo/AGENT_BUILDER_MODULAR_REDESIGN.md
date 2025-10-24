# Agent Builder: Modular Component System

## Problem with Current Approach

The existing plan treats agent creation as a **monolithic, one-time flow**:
- ❌ Can't edit individual components (role, persona, framework) independently
- ❌ Can't reuse components across multiple agents
- ❌ Can't create/manage custom roles, personas, frameworks
- ❌ Must recreate entire agent to change one aspect
- ❌ No component library or management system
- ❌ Static, inflexible, not user-friendly

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

---

## Architecture: Component-Based System

### 1. Module Libraries (Management)

Each module type has its own library for CRUD operations:

#### A. Role Library (`/agents/roles`)
\`\`\`
┌─────────────────────────────────────┐
│ 💼 Role Library                     │
│ Manage professional expertise       │
├─────────────────────────────────────┤
│ [+ Create Role] [Import] [Filter]  │
├─────────────────────────────────────┤
│ My Roles (12)                       │
│ ┌─────────────────────────────────┐│
│ │ 💼 CEO                    [Edit]││
│ │ Strategic business leader       ││
│ │ Used in 5 agents                ││
│ │ [Duplicate] [Delete]            ││
│ └─────────────────────────────────┘│
│ ┌─────────────────────────────────┐│
│ │ 🔬 Market Researcher      [Edit]││
│ │ Data-driven analyst             ││
│ │ Used in 2 agents                ││
│ │ [Duplicate] [Delete]            ││
│ └─────────────────────────────────┘│
│                                     │
│ System Roles (50+)                  │
│ [Browse System Library →]           │
└─────────────────────────────────────┘
\`\`\`

**Features**:
- Create custom roles with name, description, expertise tags
- Edit existing roles (updates all agents using it)
- Duplicate roles to create variations
- See which agents use each role
- Import/export roles as JSON
- Browse system-provided role templates

#### B. Persona Library (`/agents/personas`)
\`\`\`
┌─────────────────────────────────────┐
│ 🎭 Persona Library                  │
│ Manage personality & communication  │
├─────────────────────────────────────┤
│ [+ Create Persona] [Import]        │
├─────────────────────────────────────┤
│ My Personas (8)                     │
│ ┌─────────────────────────────────┐│
│ │ 🎯 Direct & Analytical    [Edit]││
│ │ Formal, data-driven, concise    ││
│ │ Used in 3 agents                ││
│ │ [Duplicate] [Delete]            ││
│ └─────────────────────────────────┘│
│ ┌─────────────────────────────────┐│
│ │ 🤝 Empathetic Coach       [Edit]││
│ │ Friendly, supportive, patient   ││
│ │ Used in 1 agent                 ││
│ │ [Duplicate] [Delete]            ││
│ └─────────────────────────────────┘│
│                                     │
│ System Personas (20+)               │
│ [Browse System Library →]           │
└─────────────────────────────────────┘
\`\`\`

**Features**:
- Create personas with traits, tone, style
- Visual trait selector (Analytical, Empathetic, Creative, etc.)
- Communication style presets
- Custom instruction templates
- See usage across agents

#### C. Framework Library (`/agents/frameworks`)
\`\`\`
┌─────────────────────────────────────┐
│ 🧠 Framework Library                │
│ Manage thinking methodologies       │
├─────────────────────────────────────┤
│ [+ Create Framework] [Import]      │
├─────────────────────────────────────┤
│ My Frameworks (3)                   │
│ ┌─────────────────────────────────┐│
│ │ 🔍 Custom SWOT+           [Edit]││
│ │ Enhanced SWOT with timeline     ││
│ │ Used in 2 agents                ││
│ │ [Duplicate] [Delete]            ││
│ └─────────────────────────────────┘│
│                                     │
│ System Frameworks (15+)             │
│ ┌─────────────────────────────────┐│
│ │ First Principles                ││
│ │ SCAMPER                         ││
│ │ Design Thinking                 ││
│ │ Root Cause Analysis             ││
│ │ [View All →]                    ││
│ └─────────────────────────────────┘│
└─────────────────────────────────────┘
\`\`\`

**Features**:
- Use system frameworks or create custom
- Define framework steps/prompts
- Template variables for customization
- Import frameworks from community

---

### 2. Agent Composer (`/agents/new` & `/agents/[id]/edit`)

The composer is where users **assemble agents from modules**:

#### Mobile Layout: Modular Cards
\`\`\`
┌─────────────────────────────────────┐
│ ← Create New Agent            [Save]│
├─────────────────────────────────────┤
│ 📋 Agent Preview (Collapsible)      │
│ ┌─────────────────────────────────┐│
│ │ 💼 Strategic Advisor            ││
│ │ CEO + Direct & Analytical       ││
│ │ First Principles                ││
│ │ [Test Agent →]                  ││
│ └─────────────────────────────────┘│
├─────────────────────────────────────┤
│ 🧩 Components                       │
│                                     │
│ ┌─────────────────────────────────┐│
│ │ 💼 Role                   [Edit]││
│ │ CEO                             ││
│ │ Strategic business leader       ││
│ │ [Change Role]                   ││
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
│ │ ⚙️ Configuration          [Edit]││
│ │ Name, tags, visibility          ││
│ │ [Expand]                        ││
│ └─────────────────────────────────┘│
├─────────────────────────────────────┤
│ [Save Draft] [Create Agent]         │
└─────────────────────────────────────┘
\`\`\`

#### Desktop Layout: Side-by-Side Composer
\`\`\`
┌─────────────────────────────────────────────────────────┐
│ ← Agents / Create New Agent                      [Save] │
├──────────────────────────────┬──────────────────────────┤
│ 🧩 Component Selector        │ 📋 Live Preview          │
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

**Key Features**:

1. **Module Cards**: Each component (Role, Persona, Framework) is a card
2. **Independent Editing**: Click [Edit] to modify just that module
3. **Quick Swap**: Click [Change X] to select different module from library
4. **Live Preview**: See agent composition in real-time
5. **Test Mode**: Test agent before saving
6. **Draft Auto-save**: Never lose work

---

### 3. Module Selection Flow

When user clicks [Change Role], [Change Persona], or [Change Framework]:

#### Mobile: Full-Screen Drawer
\`\`\`
┌─────────────────────────────────────┐
│ ← Select Role                 [Done]│
├─────────────────────────────────────┤
│ 🔍 Search roles...                  │
├─────────────────────────────────────┤
│ [My Roles] [System] [Create New]    │
├─────────────────────────────────────┤
│ My Roles (12)                       │
│ ┌─────────────────────────────────┐│
│ │ ✓ CEO (Currently selected)      ││
│ │ Strategic business leader       ││
│ └─────────────────────────────────┘│
│ ┌─────────────────────────────────┐│
│ │ 🔬 Market Researcher            ││
│ │ Data-driven analyst             ││
│ │ [Select]                        ││
│ └─────────────────────────────────┘│
│                                     │
│ System Roles (50+)                  │
│ ┌─────────────────────────────────┐│
│ │ 💻 Software Engineer            ││
│ │ Technical problem solver        ││
│ │ [Select]                        ││
│ └─────────────────────────────────┘│
│                                     │
│ [+ Create New Role]                 │
└─────────────────────────────────────┘
\`\`\`

#### Desktop: Modal with Tabs
\`\`\`
┌─────────────────────────────────────────┐
│ Select Role                       [✕]   │
├─────────────────────────────────────────┤
│ [My Roles] [System Library] [Create]    │
├─────────────────────────────────────────┤
│ 🔍 Search roles...                      │
├─────────────────────────────────────────┤
│ ┌─────────┐ ┌─────────┐ ┌─────────┐    │
│ │ ✓ CEO   │ │ 🔬 Res. │ │ 💻 Dev  │    │
│ │ Current │ │ Analyst │ │ Engineer│    │
│ └─────────┘ └─────────┘ └─────────┘    │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐    │
│ │ 🎨 Des. │ │ 📊 Data │ │ 🎯 PM   │    │
│ │ Creative│ │ Scientist│ │ Manager │    │
│ └─────────┘ └─────────┘ └─────────┘    │
│                                         │
│ [Cancel] [Select]                       │
└─────────────────────────────────────────┘
\`\`\`

**Benefits**:
- Browse personal library or system templates
- Create new module on-the-fly
- Preview module details before selecting
- Quick search/filter

---

### 4. Module Editing Flow

When user clicks [Edit] on a module card:

#### Inline Editing (Preferred)
\`\`\`
┌─────────────────────────────────────┐
│ 💼 Role                       [Save]│
│                                     │
│ Name:                               │
│ ┌─────────────────────────────────┐│
│ │ CEO                             ││
│ └─────────────────────────────────┘│
│                                     │
│ Description:                        │
│ ┌─────────────────────────────────┐│
│ │ Strategic business leader...    ││
│ │                                 ││
│ └─────────────────────────────────┘│
│                                     │
│ Expertise Tags:                     │
│ [Strategic] [Leadership] [+Add]     │
│                                     │
│ Category:                           │
│ [Business & Strategy ▼]             │
│                                     │
│ ⚠️ This will update all agents      │
│    using this role (5 agents)       │
│                                     │
│ [Cancel] [Save Changes]             │
└─────────────────────────────────────┘
\`\`\`

**Options**:
1. **Edit in place** - Updates all agents using this module
2. **Duplicate & edit** - Creates new module, doesn't affect others
3. **Create variation** - Fork module with changes

---

## User Workflows

### Workflow 1: Create Agent from Scratch
1. Navigate to `/agents/new`
2. See empty composer with placeholder cards
3. Click [Change Role] → Select from library or create new
4. Click [Change Persona] → Select from library or create new
5. Click [Change Framework] → Select from library or create new
6. Configure name, tags, visibility
7. Preview agent in real-time
8. Click [Create Agent]

**Time**: ~2-3 minutes (vs 5+ minutes with wizard)

### Workflow 2: Create Agent from Template
1. Navigate to `/agents/new`
2. Click "Quick Start" at top
3. Select template (e.g., "CEO Agent")
4. All modules pre-selected
5. Optionally customize any module
6. Click [Create Agent]

**Time**: ~30 seconds

### Workflow 3: Edit Existing Agent
1. Navigate to `/agents/[id]/edit`
2. See current module composition
3. Click [Change Persona] to swap just the persona
4. Select different persona from library
5. Preview changes
6. Click [Save Changes]

**Time**: ~1 minute (vs recreating entire agent)

### Workflow 4: Update Module Across All Agents
1. Navigate to `/agents/roles`
2. Find role used in multiple agents
3. Click [Edit]
4. Update description or tags
5. Warning: "This will update 5 agents"
6. Click [Save Changes]
7. All agents using this role are updated

**Time**: ~1 minute (vs editing each agent individually)

### Workflow 5: Create Custom Module
1. Navigate to `/agents/personas` (or roles/frameworks)
2. Click [+ Create Persona]
3. Fill in name, traits, style
4. Click [Save to Library]
5. Now available for use in any agent

**Time**: ~2 minutes

---

## Technical Architecture

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

### Storage Strategy

\`\`\`typescript
// Module Libraries (Convex collections)
modules_roles: RoleModule[]
modules_personas: PersonaModule[]
modules_frameworks: FrameworkModule[]

// Agents (references to modules)
agents: Agent[]

// Benefits:
// 1. Update module once, affects all agents
// 2. Reuse modules across agents
// 3. Track module usage
// 4. Easy to add new module types
\`\`\`

### Component Structure

\`\`\`
components/
├── agent-composer/
│   ├── AgentComposer.tsx          # Main composer page
│   ├── ModuleCard.tsx              # Generic module card
│   ├── RoleCard.tsx                # Role-specific card
│   ├── PersonaCard.tsx             # Persona-specific card
│   ├── FrameworkCard.tsx           # Framework-specific card
│   ├── AgentPreview.tsx            # Live preview
│   └── ModuleSelector.tsx          # Module selection modal
│
├── module-libraries/
│   ├── RoleLibrary.tsx             # Role management
│   ├── PersonaLibrary.tsx          # Persona management
│   ├── FrameworkLibrary.tsx        # Framework management
│   ├── ModuleEditor.tsx            # Generic editor
│   └── ModuleCard.tsx              # Library card view
│
└── module-editors/
    ├── RoleEditor.tsx              # Role creation/editing
    ├── PersonaEditor.tsx           # Persona creation/editing
    └── FrameworkEditor.tsx         # Framework creation/editing
\`\`\`

---

## Mobile-First Implementation

### Touch Targets
- Module cards: `min-h-[80px]`
- Action buttons: `min-h-[44px] min-w-[44px]`
- Form inputs: `min-h-[48px]`
- Trait badges (selectable): `min-h-[36px] px-4`

### Responsive Layouts
\`\`\`tsx
// Mobile: Vertical stack
<div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-[1fr_400px]">
  <ModuleCards />
  <AgentPreview />
</div>
\`\`\`

### Adaptive Components
- Use `AdaptiveModal` for module selection
- Use `AdaptiveDrawer` for module editing
- Use `useDevice()` for device-aware behavior

---

## Migration Plan

### Phase 1: Module Libraries (Week 1-2)
- Create module data models
- Build Role Library page (`/agents/roles`)
- Build Persona Library page (`/agents/personas`)
- Build Framework Library page (`/agents/frameworks`)
- Implement CRUD operations for each module type
- Migrate existing roles/personas/frameworks to module system

### Phase 2: Agent Composer (Week 3-4)
- Build new `/agents/new` page with modular composer
- Implement module selection flow
- Build live preview component
- Add module card components
- Implement agent creation with module references

### Phase 3: Agent Editing (Week 5)
- Build `/agents/[id]/edit` page
- Implement module swapping
- Add "duplicate & modify" functionality
- Handle module updates across agents

### Phase 4: Enhancements (Week 6)
- Add quick-start templates
- Implement module import/export
- Add module usage tracking
- Build module search/filter
- Add keyboard shortcuts

### Phase 5: Polish & Testing (Week 7)
- Mobile optimization
- Accessibility audit
- Performance optimization
- User testing
- Documentation

---

## Success Metrics

### Modularity
- ✅ Users can edit individual modules independently
- ✅ Modules are reusable across multiple agents
- ✅ Users can create custom modules
- ✅ Module updates propagate to all agents

### Efficiency
- ✅ 60% faster agent creation (2 min vs 5 min)
- ✅ 80% faster agent editing (1 min vs 5 min)
- ✅ 90% reduction in duplicate module creation

### User Satisfaction
- ✅ Higher completion rates
- ✅ Lower bounce rates
- ✅ Positive feedback on flexibility
- ✅ Increased agent creation volume

---

## Conclusion

This modular, component-based approach provides:

1. **True Modularity**: Edit any component independently
2. **Reusability**: Use modules across multiple agents
3. **Flexibility**: Create custom modules and templates
4. **Efficiency**: Faster creation and editing workflows
5. **Scalability**: Easy to add new module types
6. **User-Friendly**: Intuitive, visual, drag-and-drop-like experience

This is a **builder/composer** system, not a linear wizard. Users have full control and flexibility to create, edit, and compose agents exactly how they want.

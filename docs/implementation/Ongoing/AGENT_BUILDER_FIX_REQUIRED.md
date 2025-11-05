# Agent Builder Modular System - Critical Fixes Required

## Issues Identified

### 1. Missing Core Modularity Feature
**Problem:** Users cannot create custom modules inline during agent composition.

**Current State:**
- ModuleSelector only shows existing modules
- No "Create New" button or option
- Users must leave the composer to create custom modules

**Required State:**
- ModuleSelector should have prominent "Create New Custom [Role/Persona/Framework]" button
- Clicking "Create New" opens the respective editor modal (RoleEditorModal, PersonaEditorModal, FrameworkEditorModal)
- After creating a custom module, it's automatically selected in the composer
- Visual distinction between built-in and custom modules (badge/icon)

### 2. Missing LLM Model Selection
**Problem:** Agent type doesn't include model selection, but the app uses models throughout.

**Current State:**
- Agent type has no `model` field
- Models are hardcoded in various components (GPT-4, Claude-3.5, Llama-3, Gemini)
- No way to select which LLM powers the agent

**Required State:**
- Add `model` field to Agent type
- Add model selector in AgentComposer
- Support models: GPT-4, Claude-3.5, Llama-3, Gemini, Custom
- Model selector should be prominent in the composer UI

### 3. Poor UX Flow
**Problem:** The composer doesn't clearly communicate the modular approach.

**Current State:**
- Just "Select Role" buttons that open a list
- No indication that users can create custom modules
- No visual hierarchy showing modularity

**Required State:**
- Each module section should have TWO clear options:
  1. "Browse Library" - Opens ModuleSelector with existing modules
  2. "Create New Custom" - Opens editor modal directly
- Visual cards showing selected modules with edit/swap actions
- Clear indication of custom vs built-in modules

### 4. Missing Sidebar
**Problem:** /agents/new page doesn't follow the app's layout pattern.

**Current State:**
- No DashboardSidebar
- Doesn't match /agents, /templates, /dashboard pages

**Required State:**
- Include DashboardSidebar on desktop
- Mobile header with hamburger menu
- Sidebar in AdaptiveModal for mobile
- Match existing page layouts exactly

## Implementation Plan

### Step 1: Add Model Selection to Agent Type
\`\`\`typescript
// types/dashboard.ts
export interface Agent {
  id: string
  name: string
  role: string
  persona: string
  framework: string
  model: "GPT-4" | "Claude-3.5" | "Llama-3" | "Gemini" | "Custom" // ADD THIS
  roleId?: string
  personaId?: string
  frameworkId?: string
  customInstructions?: string
  isFavorite: boolean
  usageCount: number
  createdAt: Date
}
\`\`\`

### Step 2: Enhance ModuleSelector with "Create New" Option
\`\`\`tsx
// components/agent-composer/ModuleSelector.tsx
<AdaptiveModal>
  <div className="flex gap-2 mb-4">
    <Button 
      variant="default" 
      onClick={onCreateNew}
      className="flex-1"
    >
      <Plus className="h-4 w-4 mr-2" />
      Create New Custom {type}
    </Button>
  </div>
  
  <Separator className="my-4" />
  
  <div className="text-sm text-muted-foreground mb-2">
    Or select from library:
  </div>
  
  {/* Existing module list */}
</AdaptiveModal>
\`\`\`

### Step 3: Add Model Selector to AgentComposer
\`\`\`tsx
// components/agent-composer/AgentComposerMobile.tsx
<div className="space-y-4">
  {/* Agent Name */}
  <Input placeholder="Agent name..." />
  
  {/* MODEL SELECTOR - ADD THIS */}
  <div>
    <label className="text-sm font-medium">LLM Model</label>
    <Select value={model} onValueChange={setModel}>
      <SelectTrigger className="min-h-[48px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="GPT-4">GPT-4</SelectItem>
        <SelectItem value="Claude-3.5">Claude 3.5</SelectItem>
        <SelectItem value="Llama-3">Llama 3</SelectItem>
        <SelectItem value="Gemini">Gemini</SelectItem>
      </SelectContent>
    </Select>
  </div>
  
  {/* Role Module */}
  <ModuleSection
    type="role"
    selected={selectedRole}
    onBrowse={() => openModuleSelector('role')}
    onCreateNew={() => openModuleEditor('role')}
  />
  
  {/* Persona Module */}
  <ModuleSection
    type="persona"
    selected={selectedPersona}
    onBrowse={() => openModuleSelector('persona')}
    onCreateNew={() => openModuleEditor('persona')}
  />
  
  {/* Framework Module */}
  <ModuleSection
    type="framework"
    selected={selectedFramework}
    onBrowse={() => openModuleSelector('framework')}
    onCreateNew={() => openModuleEditor('framework')}
  />
</div>
\`\`\`

### Step 4: Create ModuleSection Component
\`\`\`tsx
// components/agent-composer/ModuleSection.tsx
interface ModuleSectionProps {
  type: 'role' | 'persona' | 'framework'
  selected?: Module
  onBrowse: () => void
  onCreateNew: () => void
}

export function ModuleSection({ type, selected, onBrowse, onCreateNew }: ModuleSectionProps) {
  if (selected) {
    return (
      <ModuleCard
        module={selected}
        onEdit={onBrowse}
        onSwap={onBrowse}
      />
    )
  }
  
  return (
    <div className="border-2 border-dashed border-border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="h-5 w-5 text-muted-foreground" />
        <h3 className="font-medium capitalize">{type}</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          onClick={onBrowse}
          className="min-h-[44px] bg-transparent"
        >
          <Library className="h-4 w-4 mr-2" />
          Browse Library
        </Button>
        
        <Button
          variant="default"
          onClick={onCreateNew}
          className="min-h-[44px]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New
        </Button>
      </div>
    </div>
  )
}
\`\`\`

### Step 5: Wire Up Module Editors
\`\`\`tsx
// components/agent-composer/AgentComposer.tsx
const [isRoleEditorOpen, setIsRoleEditorOpen] = useState(false)
const [isPersonaEditorOpen, setIsPersonaEditorOpen] = useState(false)
const [isFrameworkEditorOpen, setIsFrameworkEditorOpen] = useState(false)

const handleRoleCreated = (newRole: Role) => {
  setSelectedRole(newRole)
  setIsRoleEditorOpen(false)
  toast.success(`Custom role "${newRole.name}" created!`)
}

return (
  <>
    <AgentComposerMobile
      onCreateNewRole={() => setIsRoleEditorOpen(true)}
      onCreateNewPersona={() => setIsPersonaEditorOpen(true)}
      onCreateNewFramework={() => setIsFrameworkEditorOpen(true)}
    />
    
    <RoleEditorModal
      isOpen={isRoleEditorOpen}
      onClose={() => setIsRoleEditorOpen(false)}
      onSave={handleRoleCreated}
    />
    
    <PersonaEditorModal
      isOpen={isPersonaEditorOpen}
      onClose={() => setIsPersonaEditorOpen(false)}
      onSave={handlePersonaCreated}
    />
    
    <FrameworkEditorModal
      isOpen={isFrameworkEditorOpen}
      onClose={() => setIsFrameworkEditorOpen(false)}
      onSave={handleFrameworkCreated}
    />
  </>
)
\`\`\`

## Visual Design

### Module Section (Empty State)
\`\`\`
┌─────────────────────────────────────┐
│ 💼 Role                             │
│ Professional expertise and domain   │
│                                     │
│ ┌────────────┐ ┌─────────────────┐│
│ │📚 Browse   │ │➕ Create New    ││
│ │  Library   │ │   Custom        ││
│ └────────────┘ └─────────────────┘│
└─────────────────────────────────────┘
\`\`\`

### Module Section (Selected State)
\`\`\`
┌─────────────────────────────────────┐
│ 💼 CEO                        [Edit]│
│ Strategic business leader           │
│ 🏷️ Custom                           │
│                                     │
│ Business & Strategy                 │
└─────────────────────────────────────┘
\`\`\`

### Model Selector
\`\`\`
┌─────────────────────────────────────┐
│ LLM Model                           │
│ ┌─────────────────────────────────┐│
│ │ GPT-4                      ▼    ││
│ └─────────────────────────────────┘│
└─────────────────────────────────────┘
\`\`\`

## Success Criteria

1. Users can create custom roles, personas, and frameworks inline during agent composition
2. Users can select which LLM model powers their agent
3. Clear visual distinction between built-in and custom modules
4. Seamless flow: Browse library OR Create new custom
5. /agents/new page has proper sidebar matching other pages
6. Mobile-first design with proper touch targets throughout
7. All components use semantic design tokens
8. Toast notifications for all CRUD operations

## Files to Update

1. `types/dashboard.ts` - Add model field to Agent
2. `components/agent-composer/AgentComposer.tsx` - Wire up editors, add model state
3. `components/agent-composer/AgentComposerMobile.tsx` - Add model selector, module sections
4. `components/agent-composer/AgentComposerDesktop.tsx` - Add model selector, module sections
5. `components/agent-composer/ModuleSelector.tsx` - Add "Create New" button
6. `components/agent-composer/ModuleSection.tsx` - NEW: Empty/selected module states
7. `components/agent-composer/ModuleCard.tsx` - Add custom badge, edit/swap actions
8. `app/agents/new/page.tsx` - Already fixed with sidebar
9. `hooks/useRoleManager.ts` - Ensure analytics tracks custom modules
10. `hooks/usePersonaManager.ts` - Ensure analytics tracks custom modules
11. `hooks/useFrameworkManager.ts` - Ensure analytics tracks custom modules

## Estimated Time: 2-3 hours

This is a critical fix to make the modular agent builder actually modular and user-friendly.

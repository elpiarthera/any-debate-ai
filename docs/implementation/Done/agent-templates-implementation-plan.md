# 👥 Advanced Agent Templates - Implementation Plan

**Feature**: Advanced Agent Templates  
**Priority**: High  
**Complexity**: Medium  
**Estimated Time**: 2-3 days  
**Status**: 0% - Planning Phase

---

## 📋 Table of Contents

1. [Feature Overview](#feature-overview)
2. [Technical Requirements](#technical-requirements)
3. [File Structure](#file-structure)
4. [Component Breakdown](#component-breakdown)
5. [Template Data Structure](#template-data-structure)
6. [Implementation Steps](#implementation-steps)
7. [Mobile-First Design](#mobile-first-design)
8. [Integration Points](#integration-points)
9. [Testing Requirements](#testing-requirements)
10. [Success Criteria](#success-criteria)

---

## 🎯 Feature Overview

### **Purpose**
Dramatically improve user experience with ready-to-use agent configurations and pre-built teams for common scenarios, reducing friction in agent creation and improving onboarding.

### **Core Functionality**
- Pre-built agent teams for common use cases
- Scenario templates with agent configurations
- Quick start workflows for rapid setup
- Local template storage for custom templates
- Template import/export functionality
- Template search and filtering
- Mobile-optimized template selection

### **User Stories**
1. As a user, I want to quickly start a debate with pre-configured agent teams so I don't have to set up agents manually
2. As a user, I want scenario templates that guide me through common debate types
3. As a user, I want to save my custom agent teams as templates for reuse
4. As a user, I want to share templates with others via export/import
5. As a user, I want to search and filter templates to find what I need quickly

---

## 🔧 Technical Requirements

### **Dependencies**
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui components
- DeviceProvider context
- Local Storage API
- JSON import/export

### **Browser Support**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

### **Performance Targets**
- Template load time: < 500ms
- Search response: < 100ms
- Template selection: < 200ms

---

## 📁 File Structure

### **Route Structure**
\`\`\`
app/
└── (NO standalone templates route - templates accessed via modal only)
\`\`\`

### **Component Structure**
\`\`\`
components/
└── templates/
    ├── mobile/
    │   ├── TemplateListMobile.tsx      # Mobile vertical list
    │   ├── TemplateCardCompact.tsx     # Compact card (80px min)
    │   └── TemplateDetailMobile.tsx    # Full-screen detail view
    │
    ├── desktop/
    │   ├── TemplateListDesktop.tsx     # Split-view layout
    │   ├── TemplateCardDesktop.tsx     # Hover-enabled card
    │   └── TemplatePreviewDesktop.tsx  # Live preview pane
    │
    ├── shared/
    │   ├── TemplateSearchBar.tsx       # Search input (48px min)
    │   ├── TemplateCategoryChips.tsx   # Category filters
    │   ├── TemplateAgentCard.tsx       # Agent display card
    │   └── TemplateExportImport.tsx    # Export/import UI
    │
    └── TemplateSelectorModal.tsx       # Main orchestrator (modal only)
\`\`\`

### **Data Structure**
\`\`\`
data/
└── templates/
    ├── agent-teams.ts              # Pre-built team definitions
    ├── scenarios.ts                # Scenario templates
    └── workflows.ts                # Quick start workflows
\`\`\`

### **Hook Structure**
\`\`\`
hooks/
└── templates/
    ├── useTemplateLibrary.ts       # Template management
    ├── useTemplateSearch.ts        # Search and filter
    └── useTemplateStorage.ts       # Local storage operations
\`\`\`

### **Type Structure**
\`\`\`
types/
└── templates.ts                    # All template types
\`\`\`

---

## 🧩 Component Breakdown

### **1. TemplateSelectorModal.tsx**
**Responsibility**: Main orchestrator for template selection

**Props**:
\`\`\`typescript
interface TemplateSelectorModalProps {
  isOpen: boolean
  onClose: () => void
  onTemplateSelect: (template: AgentTeamTemplate | ScenarioTemplate) => void
  type?: 'team' | 'scenario' | 'all'
}
\`\`\`

**Structure**:
\`\`\`tsx
<Modal isOpen={isOpen} onClose={onClose}>
  <TemplateSearchBar />
  <TemplateCategoryChips />
  {isMobile ? (
    <TemplateListMobile templates={filteredTemplates} />
  ) : (
    <TemplateListDesktop templates={filteredTemplates} />
  )}
</Modal>
\`\`\`

**Responsive Behavior**:
- **Mobile**: Full-screen modal, vertical list
- **Desktop**: Large modal, split-view layout

---

### **2. TemplateListMobile.tsx**
**Responsibility**: Mobile vertical list of templates

**Props**:
\`\`\`typescript
interface TemplateListMobileProps {
  templates: Template[]
  onTemplateClick: (template: Template) => void
  selectedId?: string
}
\`\`\`

**Features**:
- Vertical scroll list
- Compact cards (80px min height)
- Pull-to-refresh (optional)
- Infinite scroll (if many templates)
- Touch-optimized interactions

**Layout**:
\`\`\`tsx
<div className="flex flex-col gap-2 overflow-y-auto">
  {templates.map(template => (
    <TemplateCardCompact
      key={template.id}
      template={template}
      onClick={() => onTemplateClick(template)}
    />
  ))}
</div>
\`\`\`

---

### **3. TemplateCardCompact.tsx**
**Responsibility**: Compact template card for mobile

**Props**:
\`\`\`typescript
interface TemplateCardCompactProps {
  template: Template
  onClick: () => void
  isSelected?: boolean
}
\`\`\`

**Features**:
- 80px minimum height
- Template name and category
- Agent count indicator
- Quick preview icon
- Touch-optimized (44px touch targets)

**Layout**:
\`\`\`tsx
<button
  onClick={onClick}
  className="min-h-[80px] w-full rounded-lg border p-4 text-left"
>
  <div className="flex items-center justify-between">
    <div>
      <h3 className="font-semibold">{template.name}</h3>
      <p className="text-sm text-muted-foreground">{template.category}</p>
    </div>
    <div className="flex items-center gap-2">
      <Badge>{template.agents.length} agents</Badge>
      <ChevronRightIcon />
    </div>
  </div>
</button>
\`\`\`

---

### **4. TemplateDetailMobile.tsx**
**Responsibility**: Full-screen template detail view

**Props**:
\`\`\`typescript
interface TemplateDetailMobileProps {
  template: Template
  onBack: () => void
  onSelect: () => void
}
\`\`\`

**Features**:
- Full-screen overlay
- Template description
- Agent list with details
- Scenario context (if applicable)
- Select button (sticky footer)

**Layout**:
\`\`\`tsx
<div className="fixed inset-0 z-50 bg-background">
  <header className="sticky top-0 flex items-center gap-4 border-b p-4">
    <Button onClick={onBack} variant="ghost" size="icon">
      <ArrowLeftIcon />
    </Button>
    <h2>{template.name}</h2>
  </header>
  
  <div className="overflow-y-auto p-4">
    <p className="text-muted-foreground">{template.description}</p>
    
    <div className="mt-6">
      <h3 className="font-semibold">Agents ({template.agents.length})</h3>
      <div className="mt-2 space-y-2">
        {template.agents.map(agent => (
          <TemplateAgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  </div>
  
  <footer className="sticky bottom-0 border-t bg-background p-4">
    <Button onClick={onSelect} className="w-full">
      Use This Template
    </Button>
  </footer>
</div>
\`\`\`

---

### **5. TemplateListDesktop.tsx**
**Responsibility**: Desktop split-view layout

**Props**:
\`\`\`typescript
interface TemplateListDesktopProps {
  templates: Template[]
  selectedTemplate?: Template
  onTemplateSelect: (template: Template) => void
}
\`\`\`

**Features**:
- Split-view layout (40% list, 60% preview)
- Hover states on cards
- Live preview pane
- Keyboard navigation

**Layout**:
\`\`\`tsx
<div className="flex h-full gap-4">
  <div className="w-2/5 overflow-y-auto">
    {templates.map(template => (
      <TemplateCardDesktop
        key={template.id}
        template={template}
        isSelected={selectedTemplate?.id === template.id}
        onClick={() => onTemplateSelect(template)}
      />
    ))}
  </div>
  
  <div className="w-3/5 overflow-y-auto">
    {selectedTemplate && (
      <TemplatePreviewDesktop template={selectedTemplate} />
    )}
  </div>
</div>
\`\`\`

---

### **6. TemplateCardDesktop.tsx**
**Responsibility**: Desktop template card with hover

**Props**:
\`\`\`typescript
interface TemplateCardDesktopProps {
  template: Template
  onClick: () => void
  isSelected?: boolean
}
\`\`\`

**Features**:
- Hover effects
- More detailed information
- Category badge
- Agent count
- Quick actions on hover

**Layout**:
\`\`\`tsx
<button
  onClick={onClick}
  className={cn(
    "w-full rounded-lg border p-4 text-left transition-all",
    "hover:border-primary hover:shadow-md",
    isSelected && "border-primary bg-accent"
  )}
>
  <div className="flex items-start justify-between">
    <div>
      <h3 className="font-semibold">{template.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {template.description}
      </p>
      <div className="mt-2 flex items-center gap-2">
        <Badge variant="secondary">{template.category}</Badge>
        <span className="text-xs text-muted-foreground">
          {template.agents.length} agents
        </span>
      </div>
    </div>
    <ChevronRightIcon className="text-muted-foreground" />
  </div>
</button>
\`\`\`

---

### **7. TemplatePreviewDesktop.tsx**
**Responsibility**: Live preview pane for desktop

**Props**:
\`\`\`typescript
interface TemplatePreviewDesktopProps {
  template: Template
  onSelect: () => void
}
\`\`\`

**Features**:
- Full template details
- Agent list with configurations
- Scenario context (if applicable)
- Select button
- Export button

**Layout**:
\`\`\`tsx
<div className="rounded-lg border p-6">
  <div className="flex items-start justify-between">
    <div>
      <h2 className="text-2xl font-bold">{template.name}</h2>
      <Badge className="mt-2">{template.category}</Badge>
    </div>
    <div className="flex gap-2">
      <Button variant="outline" size="sm">
        <DownloadIcon className="mr-2 h-4 w-4" />
        Export
      </Button>
      <Button onClick={onSelect} size="sm">
        Use Template
      </Button>
    </div>
  </div>
  
  <p className="mt-4 text-muted-foreground">{template.description}</p>
  
  <div className="mt-6">
    <h3 className="font-semibold">Agents ({template.agents.length})</h3>
    <div className="mt-4 space-y-3">
      {template.agents.map(agent => (
        <TemplateAgentCard key={agent.id} agent={agent} detailed />
      ))}
    </div>
  </div>
  
  {template.type === 'scenario' && (
    <div className="mt-6">
      <h3 className="font-semibold">Scenario Context</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        {template.context}
      </p>
    </div>
  )}
</div>
\`\`\`

---

### **8. TemplateSearchBar.tsx**
**Responsibility**: Search input for templates

**Props**:
\`\`\`typescript
interface TemplateSearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}
\`\`\`

**Features**:
- 48px minimum height (prevents iOS zoom)
- Search icon
- Clear button
- Debounced search
- Keyboard-optimized

**Layout**:
\`\`\`tsx
<div className="relative">
  <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
  <Input
    type="search"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder || "Search templates..."}
    className="min-h-[48px] pl-10 pr-10"
  />
  {value && (
    <Button
      variant="ghost"
      size="icon"
      className="absolute right-1 top-1/2 -translate-y-1/2"
      onClick={() => onChange('')}
    >
      <XIcon className="h-4 w-4" />
    </Button>
  )}
</div>
\`\`\`

---

### **9. TemplateCategoryChips.tsx**
**Responsibility**: Category filter chips

**Props**:
\`\`\`typescript
interface TemplateCategoryChipsProps {
  categories: string[]
  selectedCategory?: string
  onCategorySelect: (category: string | undefined) => void
}
\`\`\`

**Features**:
- Horizontal scroll on mobile
- Wrap on desktop
- Active state
- "All" option

**Layout**:
\`\`\`tsx
<div className="flex gap-2 overflow-x-auto pb-2 md:flex-wrap">
  <Button
    variant={!selectedCategory ? "default" : "outline"}
    size="sm"
    onClick={() => onCategorySelect(undefined)}
  >
    All
  </Button>
  {categories.map(category => (
    <Button
      key={category}
      variant={selectedCategory === category ? "default" : "outline"}
      size="sm"
      onClick={() => onCategorySelect(category)}
    >
      {category}
    </Button>
  ))}
</div>
\`\`\`

---

### **10. TemplateAgentCard.tsx**
**Responsibility**: Display agent in template

**Props**:
\`\`\`typescript
interface TemplateAgentCardProps {
  agent: TemplateAgent
  detailed?: boolean
}

interface TemplateAgent {
  id: string
  name: string
  role: string
  persona: string
  framework: string
  model?: string
}
\`\`\`

**Features**:
- Compact mode (mobile)
- Detailed mode (desktop)
- Agent avatar/icon
- Role and persona display

**Layout**:
\`\`\`tsx
<div className={cn(
  "rounded-lg border p-3",
  detailed && "p-4"
)}>
  <div className="flex items-start gap-3">
    <Avatar className="h-10 w-10">
      <AvatarFallback>{agent.name[0]}</AvatarFallback>
    </Avatar>
    <div className="flex-1">
      <h4 className="font-semibold">{agent.name}</h4>
      <p className="text-sm text-muted-foreground">{agent.role}</p>
      {detailed && (
        <>
          <p className="mt-2 text-sm">{agent.persona}</p>
          <div className="mt-2 flex gap-2">
            <Badge variant="secondary">{agent.framework}</Badge>
            {agent.model && (
              <Badge variant="outline">{agent.model}</Badge>
            )}
          </div>
        </>
      )}
    </div>
  </div>
</div>
\`\`\`

---

### **11. TemplateExportImport.tsx**
**Responsibility**: Export/import template functionality

**Props**:
\`\`\`typescript
interface TemplateExportImportProps {
  onExport: (template: Template) => void
  onImport: (template: Template) => void
}
\`\`\`

**Features**:
- Export template as JSON
- Import template from JSON
- File picker
- Validation

**Layout**:
\`\`\`tsx
<div className="space-y-4">
  <div>
    <h3 className="font-semibold">Export Template</h3>
    <p className="text-sm text-muted-foreground">
      Download template as JSON file
    </p>
    <Button onClick={handleExport} className="mt-2">
      <DownloadIcon className="mr-2 h-4 w-4" />
      Export Template
    </Button>
  </div>
  
  <div>
    <h3 className="font-semibold">Import Template</h3>
    <p className="text-sm text-muted-foreground">
      Upload a template JSON file
    </p>
    <Input
      type="file"
      accept=".json"
      onChange={handleImport}
      className="mt-2"
    />
  </div>
</div>
\`\`\`

---

## 📊 Template Data Structure

### **AgentTeamTemplate**
\`\`\`typescript
interface AgentTeamTemplate {
  id: string
  type: 'team'
  name: string
  description: string
  category: 'business' | 'product' | 'content' | 'technical' | 'custom'
  agents: TemplateAgent[]
  tags: string[]
  createdAt: Date
  isCustom: boolean
}
\`\`\`

### **ScenarioTemplate**
\`\`\`typescript
interface ScenarioTemplate {
  id: string
  type: 'scenario'
  name: string
  description: string
  category: 'strategy' | 'brainstorm' | 'review' | 'analysis' | 'custom'
  agents: TemplateAgent[]
  context: string
  initialPrompt?: string
  suggestedFlow?: string[]
  expectedOutcomes?: string[]
  tags: string[]
  createdAt: Date
  isCustom: boolean
}
\`\`\`

### **QuickStartWorkflow**
\`\`\`typescript
interface QuickStartWorkflow {
  id: string
  type: 'workflow'
  name: string
  description: string
  steps: WorkflowStep[]
  defaultTemplate: AgentTeamTemplate | ScenarioTemplate
}

interface WorkflowStep {
  title: string
  description: string
  action: 'select-template' | 'configure-agents' | 'set-context' | 'start-debate'
}
\`\`\`

---

## 🚀 Implementation Steps

### **Step 0: Architecture Validation** (30 minutes)

**CRITICAL**: Before starting implementation, confirm:
- [ ] NO standalone `/templates` route will be created
- [ ] Templates ONLY accessible via modal
- [ ] Modal can be opened from chat, dashboard, and agent config
- [ ] Template selection applies to current context (chat/agents)


### **Step 1: Create Template Data** (2-3 hours)

**Tasks**:
1. Create `data/templates/agent-teams.ts`
2. Define pre-built team templates
3. Create `data/templates/scenarios.ts`
4. Define scenario templates
5. Create `data/templates/workflows.ts`

**Pre-built Teams to Create**:
- Business Strategy Team (CEO, CFO, Marketing Director, Operations Manager)
- Product Design Team (Product Manager, UX Designer, Engineer, User Researcher)
- Content Creation Team (Writer, Editor, SEO Specialist, Social Media Manager)
- Technical Review Team (Senior Engineer, Security Expert, QA Lead, DevOps Engineer)
- Marketing Campaign Team (Brand Manager, Copywriter, Designer, Analytics Expert)
- Crisis Management Team (PR Director, Legal Counsel, Operations Lead, Communications Manager)

**Code Example**:
\`\`\`typescript
// data/templates/agent-teams.ts
export const businessStrategyTeam: AgentTeamTemplate = {
  id: 'business-strategy-team',
  type: 'team',
  name: 'Business Strategy Team',
  description: 'Executive team for strategic planning and decision-making',
  category: 'business',
  agents: [
    {
      id: 'ceo',
      name: 'CEO',
      role: 'Chief Executive Officer',
      persona: 'Visionary leader focused on long-term growth and company direction',
      framework: 'Strategic thinking, market analysis, stakeholder management',
      model: 'gpt-4'
    },
    {
      id: 'cfo',
      name: 'CFO',
      role: 'Chief Financial Officer',
      persona: 'Financial expert focused on profitability and risk management',
      framework: 'Financial analysis, budgeting, ROI calculation',
      model: 'gpt-4'
    },
    // More agents...
  ],
  tags: ['business', 'strategy', 'executive', 'planning'],
  createdAt: new Date(),
  isCustom: false
}
\`\`\`

**Validation**:
- [ ] All team templates defined
- [ ] All scenario templates defined
- [ ] Data structure matches TypeScript types
- [ ] No duplicate IDs

---

### **Step 2: Create Type Definitions** (30 minutes)

**Tasks**:
1. Create `types/templates.ts`
2. Define all template types
3. Export types

**Code**:
\`\`\`typescript
// types/templates.ts
export interface TemplateAgent {
  id: string
  name: string
  role: string
  persona: string
  framework: string
  model?: string
}

export interface AgentTeamTemplate {
  id: string
  type: 'team'
  name: string
  description: string
  category: 'business' | 'product' | 'content' | 'technical' | 'custom'
  agents: TemplateAgent[]
  tags: string[]
  createdAt: Date
  isCustom: boolean
}

export interface ScenarioTemplate {
  id: string
  type: 'scenario'
  name: string
  description: string
  category: 'strategy' | 'brainstorm' | 'review' | 'analysis' | 'custom'
  agents: TemplateAgent[]
  context: string
  initialPrompt?: string
  suggestedFlow?: string[]
  expectedOutcomes?: string[]
  tags: string[]
  createdAt: Date
  isCustom: boolean
}

export type Template = AgentTeamTemplate | ScenarioTemplate
\`\`\`

**Validation**:
- [ ] Types compile without errors
- [ ] All properties defined
- [ ] Union types work correctly

---

### **Step 3: Create Template Hooks** (2-3 hours)

**Tasks**:
1. Create `hooks/templates/useTemplateLibrary.ts`
2. Create `hooks/templates/useTemplateSearch.ts`
3. Create `hooks/templates/useTemplateStorage.ts`
4. Implement local storage operations

**Code**:
\`\`\`typescript
// hooks/templates/useTemplateLibrary.ts
export function useTemplateLibrary() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [customTemplates, setCustomTemplates] = useState<Template[]>([])
  
  useEffect(() => {
    // Load pre-built templates
    const preBuilt = [...agentTeams, ...scenarios]
    
    // Load custom templates from local storage
    const stored = localStorage.getItem('custom-templates')
    const custom = stored ? JSON.parse(stored) : []
    
    setTemplates([...preBuilt, ...custom])
    setCustomTemplates(custom)
  }, [])
  
  const saveCustomTemplate = (template: Template) => {
    const updated = [...customTemplates, { ...template, isCustom: true }]
    setCustomTemplates(updated)
    localStorage.setItem('custom-templates', JSON.stringify(updated))
    setTemplates([...templates, template])
  }
  
  const deleteCustomTemplate = (templateId: string) => {
    const updated = customTemplates.filter(t => t.id !== templateId)
    setCustomTemplates(updated)
    localStorage.setItem('custom-templates', JSON.stringify(updated))
    setTemplates(templates.filter(t => t.id !== templateId))
  }
  
  return {
    templates,
    customTemplates,
    saveCustomTemplate,
    deleteCustomTemplate
  }
}
\`\`\`

**Validation**:
- [ ] Templates load correctly
- [ ] Custom templates save to local storage
- [ ] Delete works
- [ ] State updates properly

---

### **Step 4: Implement Search and Filter** (1-2 hours)

**Tasks**:
1. Create search hook
2. Implement fuzzy matching
3. Add category filtering
4. Add tag filtering

**Code**:
\`\`\`typescript
// hooks/templates/useTemplateSearch.ts
export function useTemplateSearch(templates: Template[]) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>()
  
  const filteredTemplates = useMemo(() => {
    let filtered = templates
    
    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(t => t.category === selectedCategory)
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(t =>
        t.name.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }
    
    return filtered
  }, [templates, searchQuery, selectedCategory])
  
  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredTemplates
  }
}
\`\`\`

**Validation**:
- [ ] Search works correctly
- [ ] Category filter works
- [ ] Multiple filters combine properly
- [ ] Performance is good (< 100ms)

---

### **Step 5: Build Shared Components** (2-3 hours)

**Tasks**:
1. Create `TemplateSearchBar.tsx`
2. Create `TemplateCategoryChips.tsx`
3. Create `TemplateAgentCard.tsx`
4. Create `TemplateExportImport.tsx`

**Validation**:
- [ ] All components render correctly
- [ ] Touch targets meet 44px minimum
- [ ] Keyboard navigation works
- [ ] Responsive on all devices

---

### **Step 6: Build Mobile Components** (3-4 hours)

**Tasks**:
1. Create `TemplateListMobile.tsx`
2. Create `TemplateCardCompact.tsx`
3. Create `TemplateDetailMobile.tsx`
4. Implement touch interactions

**Validation**:
- [ ] Vertical scroll works smoothly
- [ ] Cards meet 80px minimum height
- [ ] Detail view transitions smoothly
- [ ] Touch interactions feel natural

---

### **Step 7: Build Desktop Components** (3-4 hours)

**Tasks**:
1. Create `TemplateListDesktop.tsx`
2. Create `TemplateCardDesktop.tsx`
3. Create `TemplatePreviewDesktop.tsx`
4. Implement split-view layout

**Validation**:
- [ ] Split-view layout works
- [ ] Hover states work
- [ ] Preview updates on selection
- [ ] Keyboard navigation works

---

### **Step 8: Create Main Orchestrator** (2-3 hours)

**Tasks**:
1. Create `TemplateSelectorModal.tsx`
2. Integrate mobile/desktop views
3. Add device detection
4. Implement template selection

**Code**:
\`\`\`typescript
// components/templates/TemplateSelectorModal.tsx
export function TemplateSelectorModal({
  isOpen,
  onClose,
  onTemplateSelect,
  type = 'all'
}: TemplateSelectorModalProps) {
  const { isMobile } = useDevice()
  const { templates } = useTemplateLibrary()
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredTemplates
  } = useTemplateSearch(templates)
  
  const [selectedTemplate, setSelectedTemplate] = useState<Template>()
  
  const handleTemplateClick = (template: Template) => {
    if (isMobile) {
      // Show detail view on mobile
      setSelectedTemplate(template)
    } else {
      // Update preview on desktop
      setSelectedTemplate(template)
    }
  }
  
  const handleTemplateSelect = () => {
    if (selectedTemplate) {
      onTemplateSelect(selectedTemplate)
      onClose()
    }
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn(
        isMobile ? "h-full max-w-full" : "max-w-4xl h-[80vh]"
      )}>
        <DialogHeader>
          <DialogTitle>Select Template</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <TemplateSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
          />
          
          <TemplateCategoryChips
            categories={['business', 'product', 'content', 'technical']}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
          
          {isMobile ? (
            selectedTemplate ? (
              <TemplateDetailMobile
                template={selectedTemplate}
                onBack={() => setSelectedTemplate(undefined)}
                onSelect={handleTemplateSelect}
              />
            ) : (
              <TemplateListMobile
                templates={filteredTemplates}
                onTemplateClick={handleTemplateClick}
              />
            )
          ) : (
            <TemplateListDesktop
              templates={filteredTemplates}
              selectedTemplate={selectedTemplate}
              onTemplateSelect={handleTemplateClick}
            />
          )}
        </div>
        
        {!isMobile && selectedTemplate && (
          <DialogFooter>
            <Button onClick={handleTemplateSelect}>
              Use This Template
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
\`\`\`

**Validation**:
- [ ] Modal opens/closes correctly
- [ ] Device detection works
- [ ] Template selection works
- [ ] Responsive on all devices

---

### **Step 9: Integrate with Chat System** (2-3 hours)

**Tasks**:
1. Add "Use Template" button to chat interface header
2. Add template selector modal to chat component
3. Implement template application logic
4. Handle agent replacement confirmation
5. Set initial context for scenarios
6. Add success/error messages

**Code**:
\`\`\`typescript
// In chat component (e.g., app/chat/page.tsx)
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { TemplateSelectorModal } from '@/components/templates/TemplateSelectorModal'
import { ReplaceIcon as TemplateIcon } from 'lucide-react'
import { toast } from 'sonner'
import type { Template } from '@/types/templates'

export default function ChatPage() {
  const [templateModalOpen, setTemplateModalOpen] = useState(false)
  const [agents, setAgents] = useState([])
  
  const handleTemplateSelect = (template: Template) => {
    // Confirm if agents already exist
    if (agents.length > 0) {
      if (!confirm('Replace existing agents with template?')) {
        return
      }
    }
    
    // Create agents from template
    const newAgents = template.agents.map(agent => ({
      id: generateId(),
      name: agent.name,
      role: agent.role,
      persona: agent.persona,
      framework: agent.framework,
      model: agent.model || 'gpt-4',
      color: generateColor()
    }))
    
    setAgents(newAgents)
    
    // Set initial context for scenarios
    if (template.type === 'scenario') {
      if (template.initialPrompt) {
        setInitialMessage(template.initialPrompt)
      }
      if (template.context) {
        setDebateContext(template.context)
      }
    }
    
    // Close template selector
    setTemplateModalOpen(false)
    
    // Show success message
    toast.success(`Template "${template.name}" applied!`)
  }
  
  return (
    <div>
      {/* Chat header with template button */}
      <header className="flex items-center justify-between p-4 border-b">
        <h1>Chat</h1>
        <Button
          variant="outline"
          onClick={() => setTemplateModalOpen(true)}
          className="gap-2"
        >
          <TemplateIcon className="h-4 w-4" />
          Use Template
        </Button>
      </header>
      
      {/* Chat content */}
      {/* ... existing chat UI ... */}
      
      {/* Template selector modal */}
      <TemplateSelectorModal
        isOpen={templateModalOpen}
        onClose={() => setTemplateModalOpen(false)}
        onTemplateSelect={handleTemplateSelect}
      />
    </div>
  )
}
\`\`\`

**Validation**:
- [ ] Template button visible in chat header
- [ ] Modal opens/closes correctly
- [ ] Template selection replaces agents
- [ ] Confirmation shown if agents exist
- [ ] Success message displayed
- [ ] Initial context set for scenarios

---

### **Step 9.5: Integrate with Dashboard** (1-2 hours)

**Tasks**:
1. Add template quick action card to dashboard
2. Add template selector modal to dashboard
3. Implement navigation to chat with template
4. Add recent templates section (optional)

**Code**:
\`\`\`typescript
// In dashboard component (e.g., app/dashboard/page.tsx)
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { TemplateSelectorModal } from '@/components/templates/TemplateSelectorModal'
import { ReplaceIcon as TemplateIcon } from 'lucide-react'
import type { Template } from '@/types/templates'

export default function DashboardPage() {
  const router = useRouter()
  const [templateModalOpen, setTemplateModalOpen] = useState(false)
  
  const handleTemplateSelect = (template: Template) => {
    // Store template selection
    sessionStorage.setItem('selected-template', JSON.stringify(template))
    
    // Navigate to chat
    router.push('/chat')
    
    // Close modal
    setTemplateModalOpen(false)
  }
  
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Template quick action */}
        <Card
          className="cursor-pointer transition-colors hover:bg-accent"
          onClick={() => setTemplateModalOpen(true)}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TemplateIcon className="h-5 w-5" />
              Browse Templates
            </CardTitle>
            <CardDescription>
              Start with pre-built agent teams
            </CardDescription>
          </CardHeader>
        </Card>
        
        {/* Other dashboard cards */}
        {/* ... existing dashboard content ... */}
      </div>
      
      {/* Template selector modal */}
      <TemplateSelectorModal
        isOpen={templateModalOpen}
        onClose={() => setTemplateModalOpen(false)}
        onTemplateSelect={handleTemplateSelect}
      />
    </div>
  )
}
\`\`\`

**Validation**:
- [ ] Template card visible on dashboard
- [ ] Modal opens on card click
- [ ] Template selection navigates to chat
- [ ] Template applied in chat after navigation

---

### **Step 9.6: Integrate with Agent Configuration** (1-2 hours)

**Tasks**:
1. Add "Load Template" button to agent config
2. Add "Save as Template" button to agent config
3. Create SaveAsTemplateDialog component
4. Implement save custom template logic

**Code**:
\`\`\`typescript
// In agent configuration component
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { TemplateSelectorModal } from '@/components/templates/TemplateSelectorModal'
import { SaveAsTemplateDialog } from '@/components/templates/SaveAsTemplateDialog'
import { useTemplateLibrary } from '@/hooks/templates/useTemplateLibrary'
import { toast } from 'sonner'

export function AgentConfiguration() {
  const [agents, setAgents] = useState([])
  const [templateModalOpen, setTemplateModalOpen] = useState(false)
  const [saveAsTemplateOpen, setSaveAsTemplateOpen] = useState(false)
  const { saveCustomTemplate } = useTemplateLibrary()
  
  const handleTemplateSelect = (template: Template) => {
    // Confirm if agents already exist
    if (agents.length > 0) {
      if (!confirm('Replace existing agents with template?')) {
        return
      }
    }
    
    // Apply template
    const newAgents = template.agents.map(agent => ({
      id: generateId(),
      name: agent.name,
      role: agent.role,
      persona: agent.persona,
      framework: agent.framework,
      model: agent.model || 'gpt-4'
    }))
    
    setAgents(newAgents)
    setTemplateModalOpen(false)
    toast.success('Template loaded!')
  }
  
  const handleSaveAsTemplate = (templateData: {
    name: string
    description: string
    category: string
    tags: string[]
  }) => {
    const template: AgentTeamTemplate = {
      id: generateId(),
      type: 'team',
      name: templateData.name,
      description: templateData.description,
      category: templateData.category as any,
      agents: agents.map(agent => ({
        id: agent.id,
        name: agent.name,
        role: agent.role,
        persona: agent.persona,
        framework: agent.framework,
        model: agent.model
      })),
      tags: templateData.tags,
      createdAt: new Date(),
      isCustom: true
    }
    
    saveCustomTemplate(template)
    setSaveAsTemplateOpen(false)
    toast.success('Template saved!')
  }
  
  return (
    <div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => setTemplateModalOpen(true)}
        >
          Load Template
        </Button>
        
        <Button
          variant="outline"
          onClick={() => setSaveAsTemplateOpen(true)}
          disabled={agents.length === 0}
        >
          Save as Template
        </Button>
      </div>
      
      {/* Agent configuration UI */}
      {/* ... existing agent config ... */}
      
      {/* Modals */}
      <TemplateSelectorModal
        isOpen={templateModalOpen}
        onClose={() => setTemplateModalOpen(false)}
        onTemplateSelect={handleTemplateSelect}
      />
      
      <SaveAsTemplateDialog
        isOpen={saveAsTemplateOpen}
        onClose={() => setSaveAsTemplateOpen(false)}
        agents={agents}
        onSave={handleSaveAsTemplate}
      />
    </div>
  )
}
\`\`\`

**Validation**:
- [ ] Load Template button works
- [ ] Save as Template button works
- [ ] Save as Template disabled when no agents
- [ ] Custom template saved to local storage
- [ ] Success messages shown


## ✅ Success Criteria

### **Functional Requirements**
- [ ] Pre-built templates available
- [ ] Template selector accessible from chat, dashboard, and agent config
- [ ] **NO standalone templates route exists**
- [ ] Search and filter functional
- [ ] Template application works
- [ ] Custom templates save/load
- [ ] Export/import works
- [ ] Mobile and desktop views work

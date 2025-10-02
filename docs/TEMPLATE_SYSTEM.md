# 🎯 Agent Templates & Presets System

*Complete guide for using and developing the pre-built agent templates feature*

## 📋 Table of Contents

1. [User Guide](#user-guide)
2. [Technical Documentation](#technical-documentation)
3. [Database Integration Plan](#database-integration-plan)

---

# 👥 User Guide

## What Are Agent Templates?

Agent Templates are pre-configured teams of AI agents designed for specific use cases. Instead of manually building agents from scratch, you can instantly start debates with expert teams optimized for common scenarios like business strategy, product design, technical architecture, and more.

### Key Benefits

- **Instant Start**: Launch debates in seconds with pre-configured agent teams
- **Expert Combinations**: Carefully curated role, persona, and framework combinations
- **Guided Questions**: Suggested topics to help you get started
- **Custom Templates**: Save your own agent configurations for reuse
- **15+ Built-in Templates**: Covering 8 major categories

---

## Getting Started with Templates

### Quick Start (30 Seconds)

1. **Open Debates Page** - Navigate to the debates section
2. **Click "Start from Template"** - Find the button in the header
3. **Browse Templates** - Explore categories or search for specific use cases
4. **Select Template** - Click on any template card to see details
5. **Apply Template** - Click "Use This Template" to start your debate

### Template Categories

#### 🏢 Business Strategy
- **Business Strategy Team**: Strategic planning and competitive analysis
- **Startup Launch Team**: Product-market fit and go-to-market strategy

#### 🎨 Product Development
- **Product Design Team**: User experience and feature design
- **Feature Prioritization Team**: Roadmap planning and prioritization

#### 💻 Technology & Engineering
- **Technical Architecture Team**: System design and technology decisions
- **Code Review Team**: Code quality and best practices

#### 🎭 Creative & Design
- **Brand Identity Team**: Brand strategy and visual identity
- **Content Creation Team**: Content strategy and storytelling

#### 🔬 Research & Analysis
- **Market Analysis Team**: Market research and competitive intelligence
- **Problem Solving Team**: Complex problem analysis and solutions

#### 📚 Education & Training
- **Curriculum Design Team**: Educational content and learning experiences

#### 🏥 Healthcare & Science
- **Medical Research Team**: Clinical research and evidence-based medicine

#### 🌟 General Purpose
- **Brainstorming Team**: Creative ideation and innovation
- **Decision Making Team**: Structured decision analysis
- **Crisis Management Team**: Emergency response and risk mitigation

---

## Using Templates Effectively

### Selecting the Right Template

**Match Your Goal:**
- **Strategic Planning** → Business Strategy Team
- **Product Decisions** → Product Design Team or Feature Prioritization Team
- **Technical Choices** → Technical Architecture Team
- **Creative Work** → Brand Identity Team or Content Creation Team
- **Problem Solving** → Problem Solving Team or Decision Making Team

**Consider Complexity:**
- **Simple Questions** → General Purpose templates (Brainstorming, Decision Making)
- **Domain-Specific** → Specialized templates (Medical Research, Technical Architecture)
- **Multi-Faceted** → Comprehensive teams (Business Strategy, Product Design)

### Template Preview

Before applying a template, review:

1. **Agent Configurations**: See all agents in the team
   - Role and expertise
   - Communication persona
   - Thinking framework
   
2. **Suggested Questions**: Example topics to explore
   - Click any question to use it immediately
   - Customize questions for your specific needs

3. **Use Case Description**: Understand when to use this template

### Applying Templates

**Two Ways to Apply:**

1. **New Debate**
   - Click "Start from Template"
   - Select template
   - Agents are automatically added
   - Start chatting immediately

2. **Existing Debate**
   - Open template selector from sidebar
   - Choose template
   - Agents are added to current session
   - Continue your conversation with new perspectives

---

## Creating Custom Templates

### Save Your Agent Configuration

When you've created a great agent team, save it for future use:

1. **Configure Your Agents** - Build your ideal team
2. **Click "Save as Template"** - Find button in debates header
3. **Fill Template Details**:
   - **Name**: Descriptive name (e.g., "My Marketing Team")
   - **Description**: What this template is for
   - **Category**: Choose appropriate category
   - **Tags**: Add searchable keywords
   - **Suggested Questions**: Add example topics (optional)

4. **Save Template** - Your template is now available in "My Templates"

### Template Management

**View Your Templates:**
- Open template selector
- Switch to "My Templates" tab
- See all your custom templates

**Edit Templates:**
- Currently, edit by creating a new template
- Delete old template if needed

**Share Templates:**
- Export template as JSON
- Share file with team members
- Import on other devices

---

## Best Practices

### Template Selection

✅ **Do:**
- Choose templates that match your domain
- Review agent configurations before applying
- Use suggested questions as starting points
- Combine templates for complex topics

❌ **Don't:**
- Apply templates without reviewing agents
- Use technical templates for non-technical topics
- Ignore suggested questions (they're optimized)
- Apply multiple templates without clear purpose

### Custom Template Creation

✅ **Do:**
- Give descriptive, specific names
- Write clear descriptions of use cases
- Add relevant tags for searchability
- Include 3-5 suggested questions
- Test your template before saving

❌ **Don't:**
- Use generic names like "Team 1"
- Leave description empty
- Skip tags (makes templates hard to find)
- Save templates without testing them

### Template Organization

**Naming Conventions:**
- Use clear, descriptive names
- Include domain/purpose: "Marketing Strategy Team"
- Avoid abbreviations unless common

**Tagging Strategy:**
- Add domain tags: "marketing", "technical", "creative"
- Add use case tags: "strategy", "analysis", "design"
- Add complexity tags: "beginner", "advanced"

---

## Troubleshooting

### "Template Not Loading"

**Solutions:**
- Refresh the page
- Check browser console for errors
- Clear browser cache
- Try different template

### "Agents Not Applying Correctly"

**Solutions:**
- Verify template has valid agent configurations
- Check that all required fields are present
- Try applying template to new debate
- Re-save template if custom

### "Can't Find My Custom Template"

**Solutions:**
- Check "My Templates" tab (not "Built-in")
- Use search to find by name or tag
- Verify template was saved successfully
- Check browser local storage

### "Template Suggestions Not Relevant"

**Solutions:**
- Customize suggested questions for your needs
- Create your own template with better questions
- Use template as starting point, modify agents
- Provide feedback for built-in templates

---

## Example Workflows

### Workflow 1: Product Launch Decision

**Goal**: Decide on pricing strategy for new product

1. **Select Template**: "Product Design Team"
2. **Review Agents**:
   - Product Manager (user focus)
   - Marketing Director (market positioning)
   - Financial Advisor (revenue optimization)
3. **Start with Suggested Question**: "What pricing model should we use?"
4. **Follow Up**: Ask about specific pricing tiers, competitor analysis
5. **Save Results**: Export conversation for team review

### Workflow 2: Technical Architecture Review

**Goal**: Evaluate microservices vs monolithic architecture

1. **Select Template**: "Technical Architecture Team"
2. **Review Agents**:
   - Software Engineer (implementation)
   - DevOps Engineer (operations)
   - CTO (strategy)
3. **Custom Question**: "Should we migrate to microservices for our e-commerce platform?"
4. **Deep Dive**: Ask about specific concerns (scalability, complexity, cost)
5. **Save Template**: Save this configuration as "E-commerce Architecture Team"

### Workflow 3: Content Strategy Planning

**Goal**: Develop content strategy for new blog

1. **Select Template**: "Content Creation Team"
2. **Add Custom Agent**: Add SEO Specialist for search optimization
3. **Use Suggested Questions**: Start with content pillar questions
4. **Iterate**: Refine strategy based on agent feedback
5. **Save Custom Template**: "Blog Content Strategy Team" for future use

---

# 🔧 Technical Documentation

## Architecture Overview

### System Components

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    Template System                          │
├─────────────────────────────────────────────────────────────┤
│  Components/              │  Library/                       │
│  - TemplateSelectorModal  │  - types.ts                     │
│  - TemplateCard           │  - storage.ts                   │
│  - TemplatePreview        │  - utils.ts                     │
│  - SaveTemplateModal      │  - built-in/                    │
│                           │    - business/                  │
│                           │    - product/                   │
│                           │    - technology/                │
│                           │    - creative/                  │
│                           │    - research/                  │
│                           │    - education/                 │
│                           │    - healthcare/                │
│                           │    - general/                   │
├─────────────────────────────────────────────────────────────┤
│                    Storage Layer                            │
├─────────────────────────────────────────────────────────────┤
│  Local Storage (Current)  │  Future: Convex Database        │
│  - Custom templates       │  - User templates               │
│  - Usage tracking         │  - Shared templates             │
│  - Template metadata      │  - Analytics                    │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Data Flow

1. **Template Selection** → Load from built-in or storage → Preview
2. **Template Application** → Parse agents → Apply to debate → Start conversation
3. **Template Creation** → Capture config → Validate → Save to storage
4. **Template Management** → List/Search → Filter/Sort → CRUD operations

---

## Core Types

### Template Interface

\`\`\`typescript
// lib/templates/types.ts

export interface DebateTemplate {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  tags: string[];
  agents: AgentConfig[];
  suggestedQuestions?: string[];
  isBuiltIn: boolean;
  createdAt: Date;
  updatedAt: Date;
  usageCount: number;
  author?: string;
}

export type TemplateCategory =
  | 'business'
  | 'product'
  | 'technology'
  | 'creative'
  | 'research'
  | 'education'
  | 'healthcare'
  | 'general';

export interface TemplateMetadata {
  totalTemplates: number;
  categories: Record<TemplateCategory, number>;
  mostUsed: string[];
  recentlyUsed: string[];
}
\`\`\`

### Agent Configuration

\`\`\`typescript
// Templates use existing AgentConfig type
export interface AgentConfig {
  id: string;
  name: string;
  role: RoleType;
  persona: PersonaType;
  framework: FrameworkType;
  temperature: number;
  maxTokens: number;
  model?: string;
}
\`\`\`

---

## Storage System

### Local Storage Manager

\`\`\`typescript
// lib/templates/storage.ts

export class TemplateStorage {
  private static readonly STORAGE_KEY = 'anydebate_templates';
  private static readonly METADATA_KEY = 'anydebate_templates_metadata';

  // Save custom template
  static saveTemplate(template: Omit<DebateTemplate, 'id' | 'createdAt' | 'updatedAt'>): DebateTemplate {
    const templates = this.getAllCustomTemplates();
    
    const newTemplate: DebateTemplate = {
      ...template,
      id: generateId(),
      isBuiltIn: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      usageCount: 0
    };
    
    templates.push(newTemplate);
    this.saveToStorage(templates);
    
    return newTemplate;
  }

  // Get all templates (built-in + custom)
  static getAllTemplates(): DebateTemplate[] {
    const builtIn = BUILT_IN_TEMPLATES;
    const custom = this.getAllCustomTemplates();
    return [...builtIn, ...custom];
  }

  // Get custom templates only
  static getAllCustomTemplates(): DebateTemplate[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return [];
    
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Failed to parse templates:', error);
      return [];
    }
  }

  // Update template
  static updateTemplate(id: string, updates: Partial<DebateTemplate>): DebateTemplate | null {
    const templates = this.getAllCustomTemplates();
    const index = templates.findIndex(t => t.id === id);
    
    if (index === -1) return null;
    
    templates[index] = {
      ...templates[index],
      ...updates,
      updatedAt: new Date()
    };
    
    this.saveToStorage(templates);
    return templates[index];
  }

  // Delete template
  static deleteTemplate(id: string): boolean {
    const templates = this.getAllCustomTemplates();
    const filtered = templates.filter(t => t.id !== id);
    
    if (filtered.length === templates.length) return false;
    
    this.saveToStorage(filtered);
    return true;
  }

  // Track usage
  static incrementUsageCount(id: string): void {
    const template = this.getTemplateById(id);
    if (!template || template.isBuiltIn) return;
    
    this.updateTemplate(id, {
      usageCount: template.usageCount + 1
    });
    
    this.updateRecentlyUsed(id);
  }

  // Get metadata
  static getMetadata(): TemplateMetadata {
    const templates = this.getAllTemplates();
    
    const categories = templates.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + 1;
      return acc;
    }, {} as Record<TemplateCategory, number>);
    
    const mostUsed = templates
      .sort((a, b) => b.usageCount - a.usageCount)
      .slice(0, 5)
      .map(t => t.id);
    
    const recentlyUsed = this.getRecentlyUsed();
    
    return {
      totalTemplates: templates.length,
      categories,
      mostUsed,
      recentlyUsed
    };
  }

  // Export/Import
  static exportTemplate(id: string): string | null {
    const template = this.getTemplateById(id);
    if (!template) return null;
    
    return JSON.stringify(template, null, 2);
  }

  static importTemplate(jsonString: string): DebateTemplate | null {
    try {
      const template = JSON.parse(jsonString);
      
      // Validate template structure
      if (!this.validateTemplate(template)) {
        throw new Error('Invalid template structure');
      }
      
      // Remove ID to create new template
      const { id, ...templateData } = template;
      
      return this.saveTemplate(templateData);
    } catch (error) {
      console.error('Failed to import template:', error);
      return null;
    }
  }

  // Private helpers
  private static saveToStorage(templates: DebateTemplate[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(templates));
  }

  private static updateRecentlyUsed(id: string): void {
    const recent = this.getRecentlyUsed();
    const filtered = recent.filter(rid => rid !== id);
    const updated = [id, ...filtered].slice(0, 10);
    
    localStorage.setItem('anydebate_recently_used_templates', JSON.stringify(updated));
  }

  private static getRecentlyUsed(): string[] {
    const stored = localStorage.getItem('anydebate_recently_used_templates');
    return stored ? JSON.parse(stored) : [];
  }

  private static validateTemplate(template: any): boolean {
    return (
      typeof template.name === 'string' &&
      typeof template.description === 'string' &&
      typeof template.category === 'string' &&
      Array.isArray(template.agents) &&
      template.agents.length > 0
    );
  }
}
\`\`\`

---

## Template Utilities

### Filtering and Sorting

\`\`\`typescript
// lib/templates/utils.ts

export function filterTemplates(
  templates: DebateTemplate[],
  filters: TemplateFilters
): DebateTemplate[] {
  let filtered = templates;

  // Category filter
  if (filters.category) {
    filtered = filtered.filter(t => t.category === filters.category);
  }

  // Search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(t =>
      t.name.toLowerCase().includes(searchLower) ||
      t.description.toLowerCase().includes(searchLower) ||
      t.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  // Tag filter
  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter(t =>
      filters.tags!.some(tag => t.tags.includes(tag))
    );
  }

  // Built-in filter
  if (filters.showBuiltIn !== undefined) {
    filtered = filtered.filter(t => t.isBuiltIn === filters.showBuiltIn);
  }

  return filtered;
}

export function sortTemplates(
  templates: DebateTemplate[],
  sortBy: TemplateSortOption
): DebateTemplate[] {
  const sorted = [...templates];

  switch (sortBy) {
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    
    case 'recent':
      return sorted.sort((a, b) => 
        b.updatedAt.getTime() - a.updatedAt.getTime()
      );
    
    case 'popular':
      return sorted.sort((a, b) => b.usageCount - a.usageCount);
    
    case 'category':
      return sorted.sort((a, b) => a.category.localeCompare(b.category));
    
    default:
      return sorted;
  }
}

export function applyTemplateToDebate(
  template: DebateTemplate,
  currentAgents: AgentConfig[]
): AgentConfig[] {
  // Create new agent instances from template
  const newAgents = template.agents.map(agent => ({
    ...agent,
    id: generateId() // Generate new IDs to avoid conflicts
  }));

  // Combine with existing agents
  return [...currentAgents, ...newAgents];
}

export function validateTemplateBeforeSave(
  template: Partial<DebateTemplate>
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields
  if (!template.name || template.name.trim().length === 0) {
    errors.push('Template name is required');
  }

  if (!template.description || template.description.trim().length === 0) {
    errors.push('Template description is required');
  }

  if (!template.category) {
    errors.push('Template category is required');
  }

  if (!template.agents || template.agents.length === 0) {
    errors.push('Template must have at least one agent');
  }

  // Warnings
  if (template.agents && template.agents.length > 5) {
    warnings.push('Templates with more than 5 agents may be overwhelming');
  }

  if (!template.tags || template.tags.length === 0) {
    warnings.push('Adding tags helps with template discovery');
  }

  if (!template.suggestedQuestions || template.suggestedQuestions.length === 0) {
    warnings.push('Suggested questions help users get started');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}
\`\`\`

---

## Built-in Templates Structure

### Modular Organization

\`\`\`
lib/templates/built-in/
├── index.ts                 # Main export aggregator
├── business/
│   ├── index.ts            # Category export
│   ├── business-strategy-team.ts
│   └── startup-launch-team.ts
├── product/
│   ├── index.ts
│   ├── product-design-team.ts
│   └── feature-prioritization-team.ts
├── technology/
│   ├── index.ts
│   ├── technical-architecture-team.ts
│   └── code-review-team.ts
├── creative/
│   ├── index.ts
│   ├── brand-identity-team.ts
│   └── content-creation-team.ts
├── research/
│   ├── index.ts
│   ├── market-analysis-team.ts
│   └── problem-solving-team.ts
├── education/
│   ├── index.ts
│   └── curriculum-design-team.ts
├── healthcare/
│   ├── index.ts
│   └── medical-research-team.ts
└── general/
    ├── index.ts
    ├── brainstorming-team.ts
    ├── decision-making-team.ts
    └── crisis-management-team.ts
\`\`\`

### Template Definition Pattern

\`\`\`typescript
// Example: lib/templates/built-in/business/business-strategy-team.ts

import { DebateTemplate } from '../../types';

export const businessStrategyTeam: DebateTemplate = {
  id: 'business-strategy-team',
  name: 'Business Strategy Team',
  description: 'Expert team for strategic planning, competitive analysis, and business decision-making',
  category: 'business',
  tags: ['strategy', 'business', 'planning', 'competitive-analysis'],
  isBuiltIn: true,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
  usageCount: 0,
  agents: [
    {
      id: 'strategic-consultant',
      name: 'Strategic Consultant',
      role: 'strategic-consultant',
      persona: 'analytical',
      framework: 'strategic-thinking',
      temperature: 0.7,
      maxTokens: 1000
    },
    {
      id: 'financial-advisor',
      name: 'Financial Advisor',
      role: 'financial-advisor',
      persona: 'pragmatic',
      framework: 'cost-benefit-analysis',
      temperature: 0.6,
      maxTokens: 1000
    },
    {
      id: 'market-analyst',
      name: 'Market Analyst',
      role: 'business-analyst',
      persona: 'analytical',
      framework: 'data-driven-analysis',
      temperature: 0.5,
      maxTokens: 1000
    }
  ],
  suggestedQuestions: [
    'Should we expand into international markets?',
    'How can we differentiate from our main competitor?',
    'What pricing strategy will maximize our market share?',
    'Should we pivot our business model?'
  ]
};
\`\`\`

---

## UI Components

### TemplateSelectorModal

**Purpose**: Main interface for browsing and selecting templates

**Features**:
- Category filtering
- Search functionality
- Built-in vs custom tabs
- Template preview
- Mobile-responsive design

**Key Props**:
\`\`\`typescript
interface TemplateSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: DebateTemplate) => void;
  currentAgents?: AgentConfig[];
}
\`\`\`

**Usage**:
\`\`\`typescript
<TemplateSelectorModal
  isOpen={showTemplates}
  onClose={() => setShowTemplates(false)}
  onSelectTemplate={handleTemplateSelect}
  currentAgents={agents}
/>
\`\`\`

### TemplateCard

**Purpose**: Display individual template in grid/list view

**Features**:
- Template metadata display
- Agent count indicator
- Category badge
- Usage statistics
- Hover effects

**Key Props**:
\`\`\`typescript
interface TemplateCardProps {
  template: DebateTemplate;
  onClick: () => void;
  isSelected?: boolean;
}
\`\`\`

### TemplatePreview

**Purpose**: Detailed view of template before application

**Features**:
- Full description
- Agent configuration list
- Suggested questions
- Apply button
- Edit/delete for custom templates

**Key Props**:
\`\`\`typescript
interface TemplatePreviewProps {
  template: DebateTemplate;
  onApply: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}
\`\`\`

### SaveTemplateModal

**Purpose**: Create custom templates from current configuration

**Features**:
- Form validation
- Category selection
- Tag management
- Suggested questions input
- Preview before save

**Key Props**:
\`\`\`typescript
interface SaveTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAgents: AgentConfig[];
  onSave: (template: DebateTemplate) => void;
}
\`\`\`

---

## Integration Points

### Debates Page Integration

\`\`\`typescript
// app/debates/page.tsx

// Template selector state
const [showTemplateSelector, setShowTemplateSelector] = useState(false);

// Apply template handler
const handleTemplateSelect = (template: DebateTemplate) => {
  // Add template agents to current agents
  const newAgents = applyTemplateToDebate(template, agents);
  setAgents(newAgents);
  
  // Track usage
  TemplateStorage.incrementUsageCount(template.id);
  
  // Close selector
  setShowTemplateSelector(false);
  
  // Optional: Auto-fill first suggested question
  if (template.suggestedQuestions && template.suggestedQuestions.length > 0) {
    setInputValue(template.suggestedQuestions[0]);
  }
  
  toast.success(`Applied template: ${template.name}`);
};

// Save template handler
const handleSaveTemplate = () => {
  if (agents.length === 0) {
    toast.error('Add agents before saving template');
    return;
  }
  
  setShowSaveTemplate(true);
};
\`\`\`

### Chat Sidebar Integration

\`\`\`typescript
// components/chat/ChatSidebar.tsx

// Quick template access
<Button
  variant="outline"
  size="sm"
  onClick={() => setShowTemplates(true)}
>
  <Sparkles className="h-4 w-4 mr-2" />
  Templates
</Button>
\`\`\`

---

## Performance Considerations

### Optimization Strategies

1. **Lazy Loading**
\`\`\`typescript
// Load templates on demand
const templates = useMemo(() => {
  return TemplateStorage.getAllTemplates();
}, [showTemplateSelector]);
\`\`\`

2. **Search Debouncing**
\`\`\`typescript
// Debounce search input
const debouncedSearch = useMemo(
  () => debounce((value: string) => setSearchQuery(value), 300),
  []
);
\`\`\`

3. **Virtual Scrolling**
\`\`\`typescript
// For large template lists
import { useVirtualizer } from '@tanstack/react-virtual';

const virtualizer = useVirtualizer({
  count: filteredTemplates.length,
  getScrollElement: () => scrollRef.current,
  estimateSize: () => 120
});
\`\`\`

4. **Memoization**
\`\`\`typescript
// Memoize filtered/sorted results
const displayTemplates = useMemo(() => {
  let result = filterTemplates(allTemplates, filters);
  result = sortTemplates(result, sortBy);
  return result;
}, [allTemplates, filters, sortBy]);
\`\`\`

---

## Testing

### Unit Tests

\`\`\`typescript
// __tests__/templates/storage.test.ts

describe('TemplateStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('saves custom template', () => {
    const template = {
      name: 'Test Template',
      description: 'Test description',
      category: 'general' as const,
      tags: ['test'],
      agents: [mockAgent]
    };

    const saved = TemplateStorage.saveTemplate(template);
    
    expect(saved.id).toBeDefined();
    expect(saved.name).toBe('Test Template');
    expect(saved.isBuiltIn).toBe(false);
  });

  test('retrieves all templates', () => {
    const templates = TemplateStorage.getAllTemplates();
    
    expect(templates.length).toBeGreaterThan(0);
    expect(templates.some(t => t.isBuiltIn)).toBe(true);
  });

  test('increments usage count', () => {
    const template = TemplateStorage.saveTemplate(mockTemplate);
    
    TemplateStorage.incrementUsageCount(template.id);
    
    const updated = TemplateStorage.getTemplateById(template.id);
    expect(updated?.usageCount).toBe(1);
  });
});
\`\`\`

### Integration Tests

\`\`\`typescript
// __tests__/templates/integration.test.tsx

describe('Template System Integration', () => {
  test('applies template to debate', () => {
    render(<DebatesPage />);
    
    // Open template selector
    fireEvent.click(screen.getByText('Start from Template'));
    
    // Select template
    fireEvent.click(screen.getByText('Business Strategy Team'));
    
    // Apply template
    fireEvent.click(screen.getByText('Use This Template'));
    
    // Verify agents added
    expect(screen.getByText('Strategic Consultant')).toBeInTheDocument();
    expect(screen.getByText('Financial Advisor')).toBeInTheDocument();
  });

  test('saves custom template', () => {
    render(<DebatesPage />);
    
    // Add agents
    // ... add agent logic
    
    // Open save modal
    fireEvent.click(screen.getByText('Save as Template'));
    
    // Fill form
    fireEvent.change(screen.getByLabelText('Template Name'), {
      target: { value: 'My Custom Team' }
    });
    
    // Save
    fireEvent.click(screen.getByText('Save Template'));
    
    // Verify saved
    expect(screen.getByText('Template saved successfully')).toBeInTheDocument();
  });
});
\`\`\`

---

# 🗄️ Database Integration Plan (Convex)

## Overview

When integrating Convex database, the template system will transition from local storage to cloud-based persistence, enabling:

- **User Accounts**: Templates tied to user profiles
- **Cloud Sync**: Access templates across devices
- **Sharing**: Share templates with team members
- **Analytics**: Track template usage and effectiveness
- **Collaboration**: Team template libraries
- **Versioning**: Template history and rollback

---

## Schema Design

### Templates Table

\`\`\`typescript
// convex/schema.ts

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  templates: defineTable({
    // Core fields
    name: v.string(),
    description: v.string(),
    category: v.string(),
    tags: v.array(v.string()),
    
    // Agent configuration
    agents: v.array(v.object({
      id: v.string(),
      name: v.string(),
      role: v.string(),
      persona: v.string(),
      framework: v.string(),
      temperature: v.number(),
      maxTokens: v.number(),
      model: v.optional(v.string())
    })),
    
    // Metadata
    suggestedQuestions: v.optional(v.array(v.string())),
    isBuiltIn: v.boolean(),
    isPublic: v.boolean(),
    
    // Ownership
    userId: v.id("users"),
    teamId: v.optional(v.id("teams")),
    
    // Analytics
    usageCount: v.number(),
    lastUsedAt: v.optional(v.number()),
    
    // Versioning
    version: v.number(),
    parentTemplateId: v.optional(v.id("templates")),
    
    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number()
  })
    .index("by_user", ["userId"])
    .index("by_team", ["teamId"])
    .index("by_category", ["category"])
    .index("by_public", ["isPublic"])
    .searchIndex("search_templates", {
      searchField: "name",
      filterFields: ["category", "isPublic", "userId"]
    }),

  templateShares: defineTable({
    templateId: v.id("templates"),
    sharedWithUserId: v.id("users"),
    sharedByUserId: v.id("users"),
    permission: v.union(v.literal("view"), v.literal("edit")),
    createdAt: v.number()
  })
    .index("by_template", ["templateId"])
    .index("by_user", ["sharedWithUserId"]),

  templateUsage: defineTable({
    templateId: v.id("templates"),
    userId: v.id("users"),
    debateId: v.optional(v.id("debates")),
    usedAt: v.number(),
    rating: v.optional(v.number()),
    feedback: v.optional(v.string())
  })
    .index("by_template", ["templateId"])
    .index("by_user", ["userId"])
});
\`\`\`

---

## Convex Functions

### Queries

\`\`\`typescript
// convex/templates.ts

import { query } from "./_generated/server";
import { v } from "convex/values";

// Get all templates for user
export const getUserTemplates = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();

    if (!user) throw new Error("User not found");

    // Get user's own templates
    const ownTemplates = await ctx.db
      .query("templates")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    // Get shared templates
    const shares = await ctx.db
      .query("templateShares")
      .withIndex("by_user", (q) => q.eq("sharedWithUserId", user._id))
      .collect();

    const sharedTemplates = await Promise.all(
      shares.map(share => ctx.db.get(share.templateId))
    );

    // Get public templates
    const publicTemplates = await ctx.db
      .query("templates")
      .withIndex("by_public", (q) => q.eq("isPublic", true))
      .collect();

    return {
      own: ownTemplates,
      shared: sharedTemplates.filter(Boolean),
      public: publicTemplates
    };
  }
});

// Search templates
export const searchTemplates = query({
  args: {
    query: v.string(),
    category: v.optional(v.string()),
    includePublic: v.boolean()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();

    if (!user) throw new Error("User not found");

    // Use search index
    let results = await ctx.db
      .query("templates")
      .withSearchIndex("search_templates", (q) => {
        let search = q.search("name", args.query);
        
        if (args.category) {
          search = search.eq("category", args.category);
        }
        
        if (args.includePublic) {
          search = search.eq("isPublic", true);
        } else {
          search = search.eq("userId", user._id);
        }
        
        return search;
      })
      .collect();

    return results;
  }
});

// Get template by ID
export const getTemplate = query({
  args: { templateId: v.id("templates") },
  handler: async (ctx, args) => {
    const template = await ctx.db.get(args.templateId);
    
    if (!template) return null;
    
    // Check access permissions
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();

    if (!user) throw new Error("User not found");

    // Allow if: owner, public, or shared
    const isOwner = template.userId === user._id;
    const isPublic = template.isPublic;
    const isShared = await ctx.db
      .query("templateShares")
      .withIndex("by_template", (q) => q.eq("templateId", args.templateId))
      .filter((q) => q.eq(q.field("sharedWithUserId"), user._id))
      .first();

    if (!isOwner && !isPublic && !isShared) {
      throw new Error("Access denied");
    }

    return template;
  }
});

// Get template analytics
export const getTemplateAnalytics = query({
  args: { templateId: v.id("templates") },
  handler: async (ctx, args) => {
    const template = await ctx.db.get(args.templateId);
    if (!template) throw new Error("Template not found");

    const usage = await ctx.db
      .query("templateUsage")
      .withIndex("by_template", (q) => q.eq("templateId", args.templateId))
      .collect();

    const totalUses = usage.length;
    const uniqueUsers = new Set(usage.map(u => u.userId)).size;
    const averageRating = usage
      .filter(u => u.rating)
      .reduce((sum, u) => sum + (u.rating || 0), 0) / usage.filter(u => u.rating).length;

    const usageByDay = usage.reduce((acc, u) => {
      const day = new Date(u.usedAt).toISOString().split('T')[0];
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalUses,
      uniqueUsers,
      averageRating: averageRating || 0,
      usageByDay,
      recentFeedback: usage
        .filter(u => u.feedback)
        .slice(-10)
        .map(u => ({ feedback: u.feedback, rating: u.rating, date: u.usedAt }))
    };
  }
});
\`\`\`

### Mutations

\`\`\`typescript
// convex/templates.ts

import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Create template
export const createTemplate = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    category: v.string(),
    tags: v.array(v.string()),
    agents: v.array(v.object({
      id: v.string(),
      name: v.string(),
      role: v.string(),
      persona: v.string(),
      framework: v.string(),
      temperature: v.number(),
      maxTokens: v.number(),
      model: v.optional(v.string())
    })),
    suggestedQuestions: v.optional(v.array(v.string())),
    isPublic: v.boolean()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();

    if (!user) throw new Error("User not found");

    const templateId = await ctx.db.insert("templates", {
      ...args,
      userId: user._id,
      isBuiltIn: false,
      usageCount: 0,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });

    return templateId;
  }
});

// Update template
export const updateTemplate = mutation({
  args: {
    templateId: v.id("templates"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    agents: v.optional(v.array(v.object({
      id: v.string(),
      name: v.string(),
      role: v.string(),
      persona: v.string(),
      framework: v.string(),
      temperature: v.number(),
      maxTokens: v.number(),
      model: v.optional(v.string())
    }))),
    suggestedQuestions: v.optional(v.array(v.string())),
    isPublic: v.optional(v.boolean())
  },
  handler: async (ctx, args) => {
    const { templateId, ...updates } = args;
    
    const template = await ctx.db.get(templateId);
    if (!template) throw new Error("Template not found");

    // Check ownership
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();

    if (!user) throw new Error("User not found");

    if (template.userId !== user._id) {
      throw new Error("Not authorized to update this template");
    }

    await ctx.db.patch(templateId, {
      ...updates,
      version: template.version + 1,
      updatedAt: Date.now()
    });

    return templateId;
  }
});

// Delete template
export const deleteTemplate = mutation({
  args: { templateId: v.id("templates") },
  handler: async (ctx, args) => {
    const template = await ctx.db.get(args.templateId);
    if (!template) throw new Error("Template not found");

    // Check ownership
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();

    if (!user) throw new Error("User not found");

    if (template.userId !== user._id) {
      throw new Error("Not authorized to delete this template");
    }

    // Delete template and related data
    await ctx.db.delete(args.templateId);

    // Delete shares
    const shares = await ctx.db
      .query("templateShares")
      .withIndex("by_template", (q) => q.eq("templateId", args.templateId))
      .collect();

    for (const share of shares) {
      await ctx.db.delete(share._id);
    }

    return { success: true };
  }
});

// Share template
export const shareTemplate = mutation({
  args: {
    templateId: v.id("templates"),
    shareWithEmail: v.string(),
    permission: v.union(v.literal("view"), v.literal("edit"))
  },
  handler: async (ctx, args) => {
    const template = await ctx.db.get(args.templateId);
    if (!template) throw new Error("Template not found");

    // Check ownership
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();

    if (!user) throw new Error("User not found");

    if (template.userId !== user._id) {
      throw new Error("Not authorized to share this template");
    }

    // Find user to share with
    const shareWithUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.shareWithEmail))
      .unique();

    if (!shareWithUser) throw new Error("User not found");

    // Create share
    const shareId = await ctx.db.insert("templateShares", {
      templateId: args.templateId,
      sharedWithUserId: shareWithUser._id,
      sharedByUserId: user._id,
      permission: args.permission,
      createdAt: Date.now()
    });

    return shareId;
  }
});

// Track template usage
export const trackTemplateUsage = mutation({
  args: {
    templateId: v.id("templates"),
    debateId: v.optional(v.id("debates"))
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();

    if (!user) throw new Error("User not found");

    // Record usage
    await ctx.db.insert("templateUsage", {
      templateId: args.templateId,
      userId: user._id,
      debateId: args.debateId,
      usedAt: Date.now()
    });

    // Increment usage count
    const template = await ctx.db.get(args.templateId);
    if (template) {
      await ctx.db.patch(args.templateId, {
        usageCount: template.usageCount + 1,
        lastUsedAt: Date.now()
      });
    }

    return { success: true };
  }
});

// Rate template
export const rateTemplate = mutation({
  args: {
    templateId: v.id("templates"),
    rating: v.number(),
    feedback: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();

    if (!user) throw new Error("User not found");

    // Find most recent usage
    const usage = await ctx.db
      .query("templateUsage")
      .withIndex("by_template", (q) => q.eq("templateId", args.templateId))
      .filter((q) => q.eq(q.field("userId"), user._id))
      .order("desc")
      .first();

    if (!usage) throw new Error("No usage record found");

    // Update with rating
    await ctx.db.patch(usage._id, {
      rating: args.rating,
      feedback: args.feedback
    });

    return { success: true };
  }
});
\`\`\`

---

## Migration Strategy

### Phase 1: Dual Storage (Transition Period)

\`\`\`typescript
// lib/templates/storage-adapter.ts

export class TemplateStorageAdapter {
  private useConvex: boolean;

  constructor() {
    // Check if Convex is available
    this.useConvex = !!process.env.NEXT_PUBLIC_CONVEX_URL;
  }

  async getAllTemplates(): Promise<DebateTemplate[]> {
    if (this.useConvex) {
      return await this.getFromConvex();
    } else {
      return TemplateStorage.getAllTemplates();
    }
  }

  async saveTemplate(template: Omit<DebateTemplate, 'id'>): Promise<DebateTemplate> {
    if (this.useConvex) {
      return await this.saveToConvex(template);
    } else {
      return TemplateStorage.saveTemplate(template);
    }
  }

  // ... other methods with dual implementation
}
\`\`\`

### Phase 2: Data Migration

\`\`\`typescript
// scripts/migrate-templates-to-convex.ts

import { TemplateStorage } from '../lib/templates/storage';
import { ConvexClient } from 'convex/browser';

async function migrateTemplates() {
  const client = new ConvexClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  
  // Get all local templates
  const localTemplates = TemplateStorage.getAllCustomTemplates();
  
  console.log(`Migrating ${localTemplates.length} templates...`);
  
  for (const template of localTemplates) {
    try {
      await client.mutation('templates:createTemplate', {
        name: template.name,
        description: template.description,
        category: template.category,
        tags: template.tags,
        agents: template.agents,
        suggestedQuestions: template.suggestedQuestions,
        isPublic: false
      });
      
      console.log(`✓ Migrated: ${template.name}`);
    } catch (error) {
      console.error(`✗ Failed to migrate ${template.name}:`, error);
    }
  }
  
  console.log('Migration complete!');
}

migrateTemplates();
\`\`\`

### Phase 3: Cleanup

\`\`\`typescript
// Remove local storage after successful migration
export function cleanupLocalStorage() {
  const confirmed = confirm(
    'Your templates have been migrated to the cloud. ' +
    'Would you like to remove local copies?'
  );
  
  if (confirmed) {
    localStorage.removeItem('anydebate_templates');
    localStorage.removeItem('anydebate_templates_metadata');
    localStorage.removeItem('anydebate_recently_used_templates');
    
    console.log('Local storage cleaned up');
  }
}
\`\`\`

---

## New Features with Convex

### 1. Team Template Libraries

\`\`\`typescript
// Share templates with team
export const createTeamTemplate = mutation({
  args: {
    teamId: v.id("teams"),
    templateData: v.object({
      name: v.string(),
      description: v.string(),
      // ... other fields
    })
  },
  handler: async (ctx, args) => {
    // Verify team membership
    // Create template with teamId
    // All team members can access
  }
});
\`\`\`

### 2. Template Marketplace

\`\`\`typescript
// Browse public templates from community
export const getMarketplaceTemplates = query({
  args: {
    category: v.optional(v.string()),
    sortBy: v.union(v.literal("popular"), v.literal("recent"), v.literal("rated"))
  },
  handler: async (ctx, args) => {
    // Get public templates
    // Sort by criteria
    // Include ratings and usage stats
  }
});
\`\`\`

### 3. Template Versioning

\`\`\`typescript
// Create new version of template
export const createTemplateVersion = mutation({
  args: {
    parentTemplateId: v.id("templates"),
    changes: v.object({
      // ... template fields
    })
  },
  handler: async (ctx, args) => {
    // Create new template with parentTemplateId
    // Increment version number
    // Maintain version history
  }
});

// Rollback to previous version
export const rollbackTemplate = mutation({
  args: {
    templateId: v.id("templates"),
    targetVersion: v.number()
  },
  handler: async (ctx, args) => {
    // Find version
    // Restore template state
  }
});
\`\`\`

### 4. Advanced Analytics

\`\`\`typescript
// Get comprehensive analytics
export const getTemplateInsights = query({
  args: { templateId: v.id("templates") },
  handler: async (ctx, args) => {
    // Usage trends over time
    // User engagement metrics
    // Success rate (based on ratings)
    // Popular modifications
    // Conversion rate (views to uses)
  }
});
\`\`\`

---

## Implementation Checklist

### Pre-Migration
- [ ] Set up Convex project
- [ ] Define schema
- [ ] Implement Convex functions
- [ ] Create storage adapter
- [ ] Test dual storage mode

### Migration
- [ ] Deploy Convex backend
- [ ] Enable dual storage in production
- [ ] Run migration script for existing users
- [ ] Monitor migration success rate
- [ ] Handle migration errors

### Post-Migration
- [ ] Switch to Convex-only mode
- [ ] Remove local storage code
- [ ] Enable new features (sharing, analytics)
- [ ] Update documentation
- [ ] Train users on new features

### New Features
- [ ] Implement team templates
- [ ] Build template marketplace
- [ ] Add version control
- [ ] Create analytics dashboard
- [ ] Add template recommendations

---

## Performance Optimization

### Caching Strategy

\`\`\`typescript
// Client-side caching with React Query
import { useQuery } from '@tanstack/react-query';

export function useTemplates() {
  return useQuery({
    queryKey: ['templates'],
    queryFn: async () => {
      const templates = await convex.query('templates:getUserTemplates');
      return templates;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000 // 10 minutes
  });
}
\`\`\`

### Pagination

\`\`\`typescript
// Paginated template loading
export const getTemplatesPaginated = query({
  args: {
    page: v.number(),
    pageSize: v.number(),
    category: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const skip = args.page * args.pageSize;
    
    let query = ctx.db.query("templates");
    
    if (args.category) {
      query = query.withIndex("by_category", (q) => 
        q.eq("category", args.category)
      );
    }
    
    const templates = await query
      .order("desc")
      .skip(skip)
      .take(args.pageSize)
      .collect();
    
    const total = await ctx.db
      .query("templates")
      .collect()
      .then(t => t.length);
    
    return {
      templates,
      total,
      page: args.page,
      pageSize: args.pageSize,
      totalPages: Math.ceil(total / args.pageSize)
    };
  }
});
\`\`\`

---

## Security Considerations

### Access Control

\`\`\`typescript
// Verify template access
async function verifyTemplateAccess(
  ctx: QueryCtx | MutationCtx,
  templateId: Id<"templates">,
  requiredPermission: "view" | "edit"
): Promise<boolean> {
  const template = await ctx.db.get(templateId);
  if (!template) return false;

  const identity = await ctx.auth.getUserIdentity();
  if (!identity) return false;

  const user = await getUserByIdentity(ctx, identity);
  if (!user) return false;

  // Owner has all permissions
  if (template.userId === user._id) return true;

  // Public templates can be viewed
  if (template.isPublic && requiredPermission === "view") return true;

  // Check shares
  const share = await ctx.db
    .query("templateShares")
    .withIndex("by_template", (q) => q.eq("templateId", templateId))
    .filter((q) => q.eq(q.field("sharedWithUserId"), user._id))
    .first();

  if (!share) return false;

  // Check permission level
  if (requiredPermission === "edit") {
    return share.permission === "edit";
  }

  return true;
}
\`\`\`

### Data Validation

\`\`\`typescript
// Validate template data
function validateTemplateData(data: any): boolean {
  // Validate required fields
  if (!data.name || typeof data.name !== 'string') return false;
  if (!data.description || typeof data.description !== 'string') return false;
  if (!data.category || typeof data.category !== 'string') return false;
  
  // Validate agents array
  if (!Array.isArray(data.agents) || data.agents.length === 0) return false;
  
  // Validate each agent
  for (const agent of data.agents) {
    if (!agent.role || !agent.persona || !agent.framework) return false;
    if (typeof agent.temperature !== 'number') return false;
    if (typeof agent.maxTokens !== 'number') return false;
  }
  
  return true;
}
\`\`\`

---

*This comprehensive documentation covers all aspects of the Agent Templates & Presets system from both user and developer perspectives, including detailed plans for future database integration with Convex.*

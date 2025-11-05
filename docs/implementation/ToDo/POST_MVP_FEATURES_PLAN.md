# POST-MVP FEATURES PLAN

**Status**: ⏸️ POSTPONED FOR POST-MVP
**Priority**: P6 (Nice-to-have features)
**Timeline**: 12-15 hours (after MVP launch)
**Dependencies**: MVP must be complete and stable

---

## Overview

This document contains all advanced features from Phase 6 (Advanced Features Plan) that are postponed for post-MVP. These features are not critical for initial launch but provide significant value for power users and enterprise customers.

**Rationale for Postponement**:
- These features are not critical for MVP launch
- They require significant development time (12-15 hours total)
- Core functionality (debates, agents, memory) should be perfected first
- Can be added incrementally after MVP based on user feedback
- Allows faster time-to-market for core product

---

## Phase 6.1: Advanced Export System

**Timeline**: 3-4 hours
**Status**: ⏸️ POSTPONED
**Priority**: P6
**Dependencies**: Core export functionality must exist

### Overview

Advanced export capabilities including cloud storage integration, custom templates, batch processing, and scheduled exports.

### Task 6.1.1: Export Dialog

**File**: `components/export/export-dialog.tsx`
**Pattern**: Adaptive Components (AdaptiveModal)
**Duration**: 30-45 minutes

**Features**:
- Format selection (PDF, Markdown, JSON, HTML)
- Destination selection (local, cloud storage)
- Template selection
- Export options (include artifacts, include metadata)
- Preview before export

**Implementation**:
\`\`\`typescript
// Uses AdaptiveModal pattern
export function ExportDialog({ sessionId, onClose }: ExportDialogProps) {
  const { isMobile } = useDevice()
  
  return (
    <AdaptiveModal
      open={true}
      onOpenChange={onClose}
      title="Export Session"
    >
      {/* Export form */}
    </AdaptiveModal>
  )
}
\`\`\`

### Task 6.1.2: Cloud Storage Selector

**File**: `components/export/cloud-storage-selector.tsx`
**Pattern**: Adaptive Components (AdaptiveModal)
**Duration**: 45-60 minutes

**Features**:
- Provider selection (Google Drive, Dropbox, OneDrive, S3)
- Composio authentication flow
- Folder selection
- Permission management

**Cloud Providers**:
- Google Drive (via Composio)
- Dropbox (via Composio)
- OneDrive (via Composio)
- AWS S3 (via Composio)

### Task 6.1.3: Export Template Editor

**File**: `components/export/template-editor.tsx`
**Pattern**: Adaptive Components (AdaptiveModal)
**Duration**: 60-90 minutes

**Features**:
- Visual template builder
- jsPDF configuration
- Custom headers/footers
- Styling options (fonts, colors, spacing)
- Template preview
- Save custom templates

### Task 6.1.4: Batch Export Panel

**File**: `components/export/batch-export-panel.tsx`
**Pattern**: Responsive Tailwind classes
**Duration**: 30-45 minutes

**Features**:
- Select multiple sessions
- Bulk export options
- Progress tracking
- Error handling
- Download as ZIP

### Task 6.1.5: Scheduled Export Manager

**File**: `components/export/scheduled-export-manager.tsx`
**Pattern**: Responsive Tailwind classes
**Duration**: 45-60 minutes

**Features**:
- Create scheduled exports
- Frequency selection (daily, weekly, monthly)
- Destination configuration
- Email notifications
- Export history

---

## Phase 6.2: Community Marketplace

**Timeline**: 4-5 hours
**Status**: ⏸️ POSTPONED
**Priority**: P6
**Dependencies**: Template system must exist

### Overview

Community-driven marketplace for sharing and discovering debate templates, agent configurations, and custom workflows.

### Task 6.2.1: Template Marketplace Page

**File**: `app/marketplace/page.tsx`
**Pattern**: Split Mobile/Desktop
**Duration**: 60-90 minutes

**Features**:
- Template grid/list view
- Search and filtering
- Category browsing
- Sorting (popular, recent, top-rated)
- Featured templates section

**Mobile Implementation**:
\`\`\`typescript
// components/marketplace/mobile/template-list-mobile.tsx
export function TemplateListMobile({ templates }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {templates.map(template => (
        <TemplateCardMobile key={template.id} template={template} />
      ))}
    </div>
  )
}
\`\`\`

**Desktop Implementation**:
\`\`\`typescript
// components/marketplace/desktop/template-grid-desktop.tsx
export function TemplateGridDesktop({ templates }: Props) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {templates.map(template => (
        <TemplateCardDesktop key={template.id} template={template} />
      ))}
    </div>
  )
}
\`\`\`

### Task 6.2.2: Template Detail Page

**File**: `app/marketplace/[id]/page.tsx`
**Pattern**: Adaptive Components (AdaptiveModal on mobile)
**Duration**: 60-90 minutes

**Features**:
- Template preview
- Description and usage instructions
- Author information
- Ratings and reviews
- Download/install button
- Version history
- Usage statistics

### Task 6.2.3: Template Rating Component

**File**: `components/marketplace/template-rating.tsx`
**Pattern**: Responsive Tailwind classes
**Duration**: 30-45 minutes

**Features**:
- Star rating display
- Average rating calculation
- Rating distribution chart
- User's own rating (if applicable)

### Task 6.2.4: Template Reviews

**File**: `components/marketplace/template-reviews.tsx`
**Pattern**: Responsive Tailwind classes
**Duration**: 45-60 minutes

**Features**:
- Review list with pagination
- Sort by (helpful, recent, rating)
- Write review form
- Helpful/not helpful voting
- Report inappropriate reviews

### Task 6.2.5: Template Version History

**File**: `components/marketplace/template-versions.tsx`
**Pattern**: Responsive Tailwind classes
**Duration**: 30-45 minutes

**Features**:
- Version list with changelog
- Download specific version
- Compare versions
- Rollback functionality

### Task 6.2.6: Template Analytics Dashboard

**File**: `components/marketplace/template-analytics.tsx`
**Pattern**: Responsive Tailwind classes
**Duration**: 45-60 minutes

**Features**:
- Download count over time
- Rating trends
- User demographics
- Popular use cases
- Revenue (if paid template)

---

## Phase 6.3: Custom Agent Training & Enhanced Auto-Debate

**Timeline**: 5-6 hours
**Status**: ⏸️ POSTPONED
**Priority**: P6
**Dependencies**: Agent system and Auto-Debate mode must exist

### Overview

Advanced agent customization including fine-tuning, performance tracking, collaboration features, and enhanced debate automation with tournaments.

### Task 6.3.1: Agent Training Interface

**File**: `components/agents/agent-training-interface.tsx`
**Pattern**: Adaptive Components (AdaptiveModal)
**Duration**: 60-90 minutes

**Features**:
- Training data upload
- Training configuration
- Model selection for fine-tuning
- Training progress tracking
- Cost estimation
- Training history

### Task 6.3.2: Agent Fine-Tuning Panel

**File**: `components/agents/agent-fine-tuning.tsx`
**Pattern**: Adaptive Components (AdaptiveModal)
**Duration**: 60-90 minutes

**Features**:
- Hyperparameter configuration
- Training dataset management
- Validation dataset upload
- Fine-tuning job monitoring
- Model comparison
- Deploy fine-tuned model

### Task 6.3.3: Agent Performance Dashboard

**File**: `components/agents/agent-performance.tsx`
**Pattern**: Responsive Tailwind classes
**Duration**: 45-60 minutes

**Features**:
- Win/loss ratio
- Average debate score
- Response time metrics
- Token usage statistics
- Performance trends over time
- Comparison with other agents

### Task 6.3.4: Agent Collaboration Interface

**File**: `components/agents/agent-collaboration.tsx`
**Pattern**: Responsive Tailwind classes
**Duration**: 45-60 minutes

**Features**:
- Real-time collaboration indicators
- Agent presence display
- Handoff visualization
- Collaboration history
- Team performance metrics

### Task 6.3.5: Tournament Manager

**File**: `components/tournaments/tournament-manager.tsx`
**Pattern**: Split Mobile/Desktop
**Duration**: 60-90 minutes

**Features**:
- Create tournament
- Tournament configuration (bracket type, rules)
- Participant selection
- Schedule management
- Tournament status tracking
- Results display

### Task 6.3.6: Tournament Bracket Visualization

**File**: `components/tournaments/tournament-bracket.tsx`
**Pattern**: Responsive Tailwind classes with horizontal scroll on mobile
**Duration**: 60-90 minutes

**Features**:
- Interactive bracket display
- Match status indicators
- Click to view match details
- Advance winners
- Highlight current matches
- Mobile: Horizontal scroll with pinch-to-zoom
- Desktop: Full bracket view with zoom controls

**Mobile Implementation**:
\`\`\`typescript
export function TournamentBracket({ tournament }: Props) {
  const { isMobile } = useDevice()
  
  if (isMobile) {
    return (
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Bracket visualization */}
        </div>
      </div>
    )
  }
  
  return (
    <div className="w-full">
      {/* Full bracket view */}
    </div>
  )
}
\`\`\`

### Task 6.3.7: Debate Moderation Interface

**File**: `components/debate/debate-moderator.tsx`
**Pattern**: Responsive Tailwind classes
**Duration**: 45-60 minutes

**Features**:
- Moderation rules configuration
- Real-time rule violation detection
- Warning system
- Disqualification controls
- Moderation log
- Appeal system

### Task 6.3.8: Debate Scoring Display

**File**: `components/debate/debate-scoring.tsx`
**Pattern**: Responsive Tailwind classes
**Duration**: 30-45 minutes

**Features**:
- Scoring criteria display
- Real-time score updates
- Score breakdown by criteria
- Judge comments
- Score history
- Winner announcement

### Task 6.3.9: Enhanced Auto-Debate Controls

**File**: `components/debate/enhanced-auto-debate.tsx`
**Pattern**: Responsive Tailwind classes
**Duration**: 45-60 minutes

**Features**:
- Advanced orchestrator configuration
- Artifact generation controls
- Debate flow customization
- Stopping conditions
- Quality thresholds
- Consensus detection settings

---

## Phase 6.4: Advanced Payment Features

**Timeline**: 2-3 hours
**Status**: ⏸️ POSTPONED
**Priority**: P6
**Dependencies**: Basic billing system must exist (Phase 7)

### Overview

Advanced payment features including overage tracking, subscription status indicators, and payment callback pages for enhanced billing transparency.

### Task 6.4.1: Overage Display Component

**File**: `components/billing/overage-display.tsx`
**Pattern**: Responsive Tailwind classes
**Duration**: 30-45 minutes

**Features**:
- Display usage beyond monthly allocation
- Calculate overage cost in real-time
- Show overage rate per token
- Warning when approaching overage
- Historical overage trends

**Implementation**:
\`\`\`typescript
export function OverageDisplay({ subscription, usage }: Props) {
  const overage = Math.max(0, usage.tokensUsed - subscription.monthlyAllocation)
  const overageCost = overage * subscription.overageRate
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage Overage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Tokens over limit:</span>
            <span className="font-semibold">{overage.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Overage cost:</span>
            <span className="font-semibold text-orange-600">${overageCost.toFixed(2)}</span>
          </div>
          <Progress value={(usage.tokensUsed / subscription.monthlyAllocation) * 100} />
        </div>
      </CardContent>
    </Card>
  )
}
\`\`\`

### Task 6.4.2: Subscription Status Badge

**File**: `components/billing/subscription-status-badge.tsx`
**Pattern**: Responsive Tailwind classes
**Duration**: 20-30 minutes

**Features**:
- Color-coded status indicators (active, past_due, canceled, trialing)
- Tooltip with status details
- Action buttons based on status
- Status change history

**Implementation**:
\`\`\`typescript
export function SubscriptionStatusBadge({ status }: Props) {
  const statusConfig = {
    active: { color: 'bg-green-500', label: 'Active' },
    past_due: { color: 'bg-orange-500', label: 'Past Due' },
    canceled: { color: 'bg-red-500', label: 'Canceled' },
    trialing: { color: 'bg-blue-500', label: 'Trial' },
  }
  
  const config = statusConfig[status]
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge className={config.color}>
            {config.label}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>Subscription status: {config.label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
\`\`\`

### Task 6.4.3: Payment Success/Failure Pages

**Files**: 
- `app/payment/success/page.tsx`
- `app/payment/failure/page.tsx`

**Pattern**: Responsive Tailwind classes
**Duration**: 45-60 minutes

**Features**:
- Success page with order confirmation
- Failure page with error details and retry button
- Auto-redirect to billing page after 5 seconds
- Email confirmation sent notification
- Transaction details display

**Success Page Implementation**:
\`\`\`typescript
export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard/billing')
    }, 5000)
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="max-w-md">
        <CardHeader>
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
          <CardTitle className="text-center">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Your payment has been processed successfully.
          </p>
          <p className="text-center text-sm mt-4">
            Redirecting to billing page in 5 seconds...
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
\`\`\`

---

## Phase 6.5: Advanced Memory Features

**Timeline**: 3-4 hours
**Status**: ⏸️ POSTPONED
**Priority**: P6
**Dependencies**: Basic memory system must exist (Phase 8)

### Overview

Advanced memory features including scope indicators, usage analytics, hierarchy visualization, AI suggestions, and real-time memory loading indicators for enhanced memory management.

### Task 6.5.1: Memory Scope Indicator

**File**: `components/memory/memory-scope-badge.tsx`
**Pattern**: Responsive Tailwind classes
**Duration**: 20-30 minutes

**Features**:
- Color-coded scope badges (chat, user, workspace, organization)
- Tooltip explaining scope hierarchy
- Icon indicators for each scope
- Responsive sizing

**Implementation**:
\`\`\`typescript
export function MemoryScopeBadge({ scope }: Props) {
  const scopeConfig = {
    chat: { color: 'bg-purple-500', icon: MessageSquare, label: 'Chat' },
    user: { color: 'bg-blue-500', icon: User, label: 'Personal' },
    workspace: { color: 'bg-green-500', icon: Users, label: 'Workspace' },
    organization: { color: 'bg-orange-500', icon: Building, label: 'Organization' },
  }
  
  const config = scopeConfig[scope]
  const Icon = config.icon
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge className={config.color}>
            <Icon className="h-3 w-3 mr-1" />
            {config.label}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>Accessible at {config.label} level</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
\`\`\`

### Task 6.5.2: Memory Usage Analytics Dashboard

**File**: `components/memory/memory-analytics.tsx`
**Pattern**: Responsive Tailwind classes
**Duration**: 60-90 minutes

**Features**:
- Top 10 most-referenced memories
- Usage trends over time (chart)
- Memory effectiveness score
- Agent preference analysis
- Category breakdown

**Implementation**:
\`\`\`typescript
export function MemoryAnalytics({ organizationId }: Props) {
  const analytics = useMockMemoryAnalytics(organizationId)
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Top Memories</CardTitle>
        </CardHeader>
        <CardContent>
          {analytics.topMemories.map(memory => (
            <div key={memory.id} className="flex justify-between py-2">
              <span>{memory.content.slice(0, 50)}...</span>
              <span className="text-muted-foreground">{memory.usageCount} uses</span>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Usage Trends</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Chart showing memory usage over time */}
        </CardContent>
      </Card>
    </div>
  )
}
\`\`\`

### Task 6.5.3: Memory Source Links

**File**: `components/memory/memory-source-link.tsx`
**Pattern**: Responsive Tailwind classes
**Duration**: 30-45 minutes

**Features**:
- Clickable link back to original source
- Source type indicator (chat, artifact, debate)
- Preview on hover
- Handle deleted sources gracefully

**Implementation**:
\`\`\`typescript
export function MemorySourceLink({ memory }: Props) {
  const getSourceUrl = () => {
    if (memory.sourceChatId) return `/chat/${memory.sourceChatId}`
    if (memory.sourceArtifactId) return `/artifacts/${memory.sourceArtifactId}`
    if (memory.sourceDebateId) return `/debates/${memory.sourceDebateId}`
    return null
  }
  
  const sourceUrl = getSourceUrl()
  if (!sourceUrl) return null
  
  return (
    <Link href={sourceUrl} className="text-sm text-blue-600 hover:underline flex items-center gap-1">
      <ExternalLink className="h-3 w-3" />
      View original {memory.source}
    </Link>
  )
}
\`\`\`

### Task 6.5.4: Memory Hierarchy Visualization

**File**: `components/memory/memory-hierarchy.tsx`
**Pattern**: Responsive Tailwind classes
**Duration**: 45-60 minutes

**Features**:
- Visual tree showing org → workspace → user → chat hierarchy
- Highlight current scope
- Show memory count at each level
- Expandable/collapsible sections
- Mobile: Vertical list, Desktop: Tree diagram

**Implementation**:
\`\`\`typescript
export function MemoryHierarchy({ currentScope }: Props) {
  const { isMobile } = useDevice()
  
  const hierarchy = [
    { scope: 'organization', count: 50, label: 'Organization' },
    { scope: 'workspace', count: 30, label: 'Workspace' },
    { scope: 'user', count: 15, label: 'Personal' },
    { scope: 'chat', count: 5, label: 'Current Chat' },
  ]
  
  if (isMobile) {
    return (
      <div className="space-y-2">
        {hierarchy.map(level => (
          <div 
            key={level.scope}
            className={cn(
              "p-3 rounded-lg border",
              currentScope === level.scope && "bg-primary/10 border-primary"
            )}
          >
            <div className="flex justify-between">
              <span className="font-medium">{level.label}</span>
              <Badge>{level.count} memories</Badge>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  return (
    <div className="flex items-center gap-4">
      {hierarchy.map((level, index) => (
        <React.Fragment key={level.scope}>
          <div className={cn(
            "p-4 rounded-lg border text-center",
            currentScope === level.scope && "bg-primary/10 border-primary"
          )}>
            <div className="font-medium">{level.label}</div>
            <Badge className="mt-2">{level.count}</Badge>
          </div>
          {index < hierarchy.length - 1 && (
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
\`\`\`

### Task 6.5.5: Memory Suggestions UI

**File**: `components/memory/memory-suggestions.tsx`
**Pattern**: Responsive Tailwind classes
**Duration**: 30-45 minutes

**Features**:
- Floating card during debates suggesting memory creation
- AI-generated memory suggestions
- One-click save suggested memory
- Dismiss suggestions
- Show suggestion reasoning

**Implementation**:
\`\`\`typescript
export function MemorySuggestions({ debateId }: Props) {
  const suggestions = useMockMemorySuggestions(debateId)
  
  if (suggestions.length === 0) return null
  
  return (
    <Card className="fixed bottom-4 right-4 max-w-sm shadow-lg">
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Lightbulb className="h-4 w-4" />
          Memory Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {suggestions.map(suggestion => (
          <div key={suggestion.id} className="p-3 bg-muted rounded-lg">
            <p className="text-sm">{suggestion.content}</p>
            <div className="flex gap-2 mt-2">
              <Button size="sm" onClick={() => saveSuggestion(suggestion)}>
                Save
              </Button>
              <Button size="sm" variant="ghost" onClick={() => dismissSuggestion(suggestion.id)}>
                Dismiss
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
\`\`\`

### Task 6.5.6: Memory Loading Indicator

**File**: `components/memory/memory-loading-indicator.tsx`
**Pattern**: Responsive Tailwind classes
**Duration**: 20-30 minutes

**Features**:
- Show when memories are being loaded for agents
- Display count of memories loaded
- Loading animation
- Success/error states

**Implementation**:
\`\`\`typescript
export function MemoryLoadingIndicator({ isLoading, memoryCount }: Props) {
  if (!isLoading && memoryCount === 0) return null
  
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Loading memories...</span>
        </>
      ) : (
        <>
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span>{memoryCount} memories loaded</span>
        </>
      )}
    </div>
  )
}
\`\`\`

### Task 6.5.7: Memory Preview in Chat

**File**: `components/chat/memory-preview.tsx`
**Pattern**: Responsive Tailwind classes
**Duration**: 30-45 minutes

**Features**:
- Show available memories in chat sidebar
- Filter by scope
- Search memories
- Click to view full memory
- Indicate which memories agent can access

**Implementation**:
\`\`\`typescript
export function MemoryPreview({ chatId }: Props) {
  const memories = useMockMemoriesForChat(chatId)
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Available Memories</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {memories.map(memory => (
          <div key={memory.id} className="p-2 bg-muted rounded text-sm">
            <div className="flex items-start gap-2">
              <MemoryScopeBadge scope={memory.scope} />
              <p className="flex-1 line-clamp-2">{memory.content}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
\`\`\`

### Task 6.5.8: Memory Reference Indicator

**File**: `components/chat/memory-reference-indicator.tsx`
**Pattern**: Responsive Tailwind classes
**Duration**: 30-45 minutes

**Features**:
- Highlight when agent references a specific memory
- Show which memory was used
- Link to memory details
- Tooltip with memory content preview

**Implementation**:
\`\`\`typescript
export function MemoryReferenceIndicator({ messageId, referencedMemories }: Props) {
  if (referencedMemories.length === 0) return null
  
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {referencedMemories.map(memory => (
        <TooltipProvider key={memory.id}>
          <Tooltip>
            <TooltipTrigger>
              <Badge variant="outline" className="text-xs">
                <Brain className="h-3 w-3 mr-1" />
                Referenced memory
              </Badge>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p className="text-sm">{memory.content}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  )
}
\`\`\`

---

## Component Inventory (Post-MVP)

### Export Components
- [ ] `components/export/export-dialog.tsx` - Uses AdaptiveModal
- [ ] `components/export/cloud-storage-selector.tsx` - Uses AdaptiveModal
- [ ] `components/export/template-editor.tsx` - Uses AdaptiveModal
- [ ] `components/export/batch-export-panel.tsx` - Responsive Tailwind
- [ ] `components/export/scheduled-export-manager.tsx` - Responsive Tailwind

### Marketplace Components
- [ ] `components/marketplace/marketplace-page.tsx` - Main orchestrator
- [ ] `components/marketplace/mobile/template-list-mobile.tsx` - Mobile implementation
- [ ] `components/marketplace/mobile/template-card-mobile.tsx` - Mobile implementation
- [ ] `components/marketplace/desktop/template-grid-desktop.tsx` - Desktop implementation
- [ ] `components/marketplace/desktop/template-card-desktop.tsx` - Desktop implementation
- [ ] `components/marketplace/shared/template-search.tsx` - Shared component
- [ ] `components/marketplace/shared/template-filters.tsx` - Shared component
- [ ] `components/marketplace/template-detail.tsx` - Uses AdaptiveModal
- [ ] `components/marketplace/template-rating.tsx` - Responsive Tailwind
- [ ] `components/marketplace/template-reviews.tsx` - Responsive Tailwind
- [ ] `components/marketplace/review-form.tsx` - Uses AdaptiveModal
- [ ] `components/marketplace/template-versions.tsx` - Responsive Tailwind
- [ ] `components/marketplace/template-analytics.tsx` - Responsive Tailwind

### Agent Training Components
- [ ] `components/agents/agent-training-interface.tsx` - Uses AdaptiveModal
- [ ] `components/agents/agent-fine-tuning.tsx` - Uses AdaptiveModal
- [ ] `components/agents/agent-performance.tsx` - Responsive Tailwind
- [ ] `components/agents/agent-collaboration.tsx` - Responsive Tailwind

### Tournament Components
- [ ] `components/tournaments/tournament-manager.tsx` - Main orchestrator
- [ ] `components/tournaments/mobile/tournament-list-mobile.tsx` - Mobile implementation
- [ ] `components/tournaments/desktop/tournament-grid-desktop.tsx` - Desktop implementation
- [ ] `components/tournaments/tournament-bracket.tsx` - Responsive Tailwind with horizontal scroll
- [ ] `components/tournaments/match-card.tsx` - Responsive Tailwind
- [ ] `components/tournaments/leaderboard.tsx` - Responsive Tailwind

### Debate Enhancement Components
- [ ] `components/debate/debate-moderator.tsx` - Responsive Tailwind
- [ ] `components/debate/debate-scoring.tsx` - Responsive Tailwind
- [ ] `components/debate/enhanced-auto-debate.tsx` - Responsive Tailwind

### Billing Components
- [ ] `components/billing/overage-display.tsx` - Responsive Tailwind
- [ ] `components/billing/subscription-status-badge.tsx` - Responsive Tailwind

### Memory Components
- [ ] `components/memory/memory-scope-badge.tsx` - Responsive Tailwind
- [ ] `components/memory/memory-analytics.tsx` - Responsive Tailwind
- [ ] `components/memory/memory-source-link.tsx` - Responsive Tailwind
- [ ] `components/memory/memory-hierarchy.tsx` - Responsive Tailwind
- [ ] `components/memory/memory-suggestions.tsx` - Responsive Tailwind
- [ ] `components/memory/memory-loading-indicator.tsx` - Responsive Tailwind

### Pages (Post-MVP)
- [ ] `app/marketplace/page.tsx` - Uses Split Mobile/Desktop
- [ ] `app/marketplace/[id]/page.tsx` - Uses AdaptiveModal
- [ ] `app/dashboard/export/page.tsx` - Uses Adaptive Components
- [ ] `app/dashboard/tournaments/page.tsx` - Uses Split Mobile/Desktop
- [ ] `app/payment/success/page.tsx` - Uses Responsive Tailwind
- [ ] `app/payment/failure/page.tsx` - Uses Responsive Tailwind

---

## Mock Data (Post-MVP)

### Export Mock Data
\`\`\`typescript
export const mockExportJobs = [
  {
    id: '1',
    sessionId: 'session-1',
    format: 'pdf',
    destination: 'google-drive',
    status: 'completed',
    createdAt: new Date('2025-01-10'),
    completedAt: new Date('2025-01-10'),
  },
  // ... more export jobs
]
\`\`\`

### Marketplace Mock Data
\`\`\`typescript
export const mockMarketplaceTemplates = [
  {
    id: '1',
    name: 'Socratic Debate Template',
    description: 'Classic Socratic method for philosophical debates',
    author: 'John Doe',
    authorId: 'user-1',
    category: 'Philosophy',
    rating: 4.8,
    downloads: 1250,
    price: 0, // Free
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date('2025-01-05'),
    version: '1.2.0',
  },
  // ... more templates
]

export const mockTemplateReviews = [
  {
    id: '1',
    templateId: '1',
    userId: 'user-2',
    userName: 'Jane Smith',
    rating: 5,
    comment: 'Excellent template! Very well structured.',
    helpful: 15,
    notHelpful: 2,
    createdAt: new Date('2025-01-08'),
  },
  // ... more reviews
]
\`\`\`

### Tournament Mock Data
\`\`\`typescript
export const mockTournaments = [
  {
    id: '1',
    name: 'AI Debate Championship 2025',
    description: 'Annual tournament for the best AI debaters',
    organizerId: 'user-1',
    status: 'in-progress',
    bracketType: 'single-elimination',
    participants: ['agent-1', 'agent-2', 'agent-3', 'agent-4'],
    matches: [
      {
        id: 'match-1',
        round: 1,
        participant1: 'agent-1',
        participant2: 'agent-2',
        winner: 'agent-1',
        score: { agent1: 85, agent2: 72 },
        completedAt: new Date('2025-01-09'),
      },
      // ... more matches
    ],
    startDate: new Date('2025-01-08'),
    endDate: new Date('2025-01-15'),
  },
  // ... more tournaments
]
\`\`\`

### Training Mock Data
\`\`\`typescript
export const mockTrainingJobs = [
  {
    id: '1',
    agentId: 'agent-1',
    status: 'completed',
    progress: 100,
    trainingDataSize: 1000,
    epochs: 3,
    cost: 25.50,
    startedAt: new Date('2025-01-05'),
    completedAt: new Date('2025-01-06'),
  },
  // ... more training jobs
]
\`\`\`

### Billing Mock Data
\`\`\`typescript
export const mockSubscriptions = [
  {
    id: '1',
    userId: 'user-1',
    status: 'active',
    monthlyAllocation: 10000,
    overageRate: 0.05,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  },
  // ... more subscriptions
]

export const mockUsageData = [
  {
    userId: 'user-1',
    tokensUsed: 10200,
    date: new Date('2025-01-01'),
  },
  // ... more usage data
]
\`\`\`

### Memory Mock Data
\`\`\`typescript
export const mockMemories = [
  {
    id: '1',
    content: 'The quick brown fox jumps over the lazy dog',
    scope: 'chat',
    sourceChatId: 'chat-1',
    usageCount: 5,
  },
  // ... more memories
]

export const mockMemorySuggestions = [
  {
    id: '1',
    debateId: 'debate-1',
    content: 'Suggested memory for debate',
    reasoning: 'Based on previous debates',
  },
  // ... more suggestions
]
\`\`\`

---

## Testing Checklist (Post-MVP)

### Export System Testing
- [ ] Export dialog opens and closes correctly
- [ ] All export formats work (PDF, Markdown, JSON, HTML)
- [ ] Cloud storage authentication works
- [ ] Batch export processes multiple sessions
- [ ] Scheduled exports trigger correctly
- [ ] Export templates save and load correctly

### Marketplace Testing
- [ ] Template search and filtering works
- [ ] Template detail page displays correctly
- [ ] Rating and review system works
- [ ] Template download/install works
- [ ] Version history displays correctly
- [ ] Analytics dashboard shows accurate data

### Agent Training Testing
- [ ] Training data upload works
- [ ] Fine-tuning job starts and completes
- [ ] Performance metrics display correctly
- [ ] Agent collaboration indicators work
- [ ] Training costs are transparent

### Tournament Testing
- [ ] Tournament creation works
- [ ] Bracket visualization displays correctly
- [ ] Match progression works
- [ ] Scoring system calculates correctly
- [ ] Moderation prevents rule violations
- [ ] Leaderboard updates in real-time

### Billing Testing
- [ ] Overage display shows correct data
- [ ] Subscription status badge displays correctly
- [ ] Payment success/failure pages redirect and display correctly

### Memory Testing
- [ ] Memory scope badges display correctly
- [ ] Memory usage analytics dashboard shows accurate data
- [ ] Memory source links work correctly
- [ ] Memory hierarchy visualization displays correctly
- [ ] Memory suggestions UI displays and works correctly
- [ ] Memory loading indicator shows correct states

---

## Implementation Priority (Post-MVP)

After MVP launch, implement in this order based on user feedback:

1. **Phase 6.2: Community Marketplace** (4-5 hours)
   - Highest user value
   - Enables community growth
   - Revenue opportunity (paid templates)

2. **Phase 6.1: Advanced Export System** (3-4 hours)
   - Frequently requested feature
   - Enterprise requirement
   - Competitive advantage

3. **Phase 6.3: Custom Agent Training & Tournaments** (5-6 hours)
   - Power user feature
   - Gamification element
   - Community engagement

4. **Phase 6.4: Advanced Payment Features** (2-3 hours)
   - Ensures billing transparency
   - Prevents overage surprises
   - Revenue generation

5. **Phase 6.5: Advanced Memory Features** (3-4 hours)
   - Enhances memory management
   - Improves agent performance
   - Provides valuable insights

---

## Success Criteria (Post-MVP)

### Export System
- [ ] Users can export to all major cloud storage providers
- [ ] Custom templates save and load correctly
- [ ] Batch export processes 10+ sessions without errors
- [ ] Scheduled exports run reliably

### Marketplace
- [ ] 50+ templates available at launch
- [ ] Search returns relevant results in < 500ms
- [ ] Rating system prevents spam/abuse
- [ ] Template installation is one-click

### Agent Training
- [ ] Fine-tuning jobs complete successfully
- [ ] Performance metrics are accurate
- [ ] Training costs are transparent
- [ ] Collaboration features work in real-time

### Tournaments
- [ ] Bracket visualization works for 8, 16, 32 participants
- [ ] Scoring system is fair and transparent
- [ ] Moderation prevents rule violations
- [ ] Leaderboard updates in real-time

### Billing
- [ ] Overage display shows correct data
- [ ] Subscription status badge displays correctly
- [ ] Payment success/failure pages redirect and display correctly

### Memory
- [ ] Memory scope badges display correctly
- [ ] Memory usage analytics dashboard shows accurate data
- [ ] Memory source links work correctly
- [ ] Memory hierarchy visualization displays correctly
- [ ] Memory suggestions UI displays and works correctly
- [ ] Memory loading indicator shows correct states

---

## Next Steps

1. **Complete MVP first** - Focus on core functionality
2. **Gather user feedback** - Understand which post-MVP features are most valuable
3. **Prioritize based on demand** - Implement features users actually want
4. **Iterate quickly** - Release post-MVP features incrementally
5. **Monitor usage** - Track which features get adopted

---

**Status**: ⏸️ POSTPONED FOR POST-MVP
**Ready to Start**: After MVP launch and user feedback
**Priority**: P6 (Nice-to-have features)
**Estimated Timeline**: 12-15 hours total

# Phase 6: Advanced Features & Polish - Implementation Plan

**Last Updated**: October 11, 2025

## Overview
Final polish layer with advanced export capabilities, community marketplace features, and enhanced auto-debate automation. This phase transforms AnyDebate AI into a production-ready platform with professional-grade features.

**Priority**: Low | **Status**: 0% | **Requires**: Phase 4 (Convex Database) + Phase 5 (User Management) + Phase 7 (Polar Payments)

**Total Estimated Time**: 35-50 hours (5-7 focused days)

---

## Goals
- [ ] Advanced export system with cloud storage integration
- [ ] Community template marketplace with sharing
- [ ] Custom agent training and fine-tuning
- [ ] Enhanced auto-debate with artifact generation
- [ ] Debate moderation and scoring system
- [ ] Multi-round debate tournaments
- [ ] Advanced analytics and insights
- [ ] Production-ready polish and optimization

---

## Dependencies

### Required Before Starting
1. **Phase 4: Database & Persistence Layer (Convex)** - For storing templates, analytics, user data
2. **Phase 5: Advanced User Management** - For community features, sharing, collaboration
3. **All Options (1-5) Complete** - Foundation features must be stable

### External Services Required
- Cloud storage providers (Google Drive, Dropbox, OneDrive APIs)
- Payment processing (for premium features/marketplace)
- CDN for template assets
- Email service for notifications
- Analytics service for tracking

---

## Official Documentation References

### Composio Integration Platform
- **Composio Main Docs**: https://docs.composio.dev/
- **Composio Quickstart**: https://docs.composio.dev/docs/quickstart.mdx
- **Composio Tools Catalog**: https://composio.dev/tools
- **Composio Vercel Provider**: https://docs.composio.dev/providers/vercel.mdx
- **Authenticating Tools**: https://docs.composio.dev/docs/authenticating-tools.mdx
- **Executing Tools**: https://docs.composio.dev/docs/executing-tools.mdx
- **Fetching and Filtering Tools**: https://docs.composio.dev/docs/fetching-tools.mdx
- **Using Triggers**: https://docs.composio.dev/docs/using-triggers.mdx
- **Custom Tools**: https://docs.composio.dev/docs/custom-tools.mdx

**Why Composio?**
- Access 3000+ tools out of the box (Google Drive, Dropbox, OneDrive, Gmail, Slack, etc.)
- Handles authentication flows automatically
- No need to write individual API integrations
- Built-in support for Vercel AI SDK
- Fine-grained permissions and access controls
- Automatic tool call optimization

### Cloud Storage via Composio
- **Google Drive**: https://composio.dev/googledrive
- **Dropbox**: https://composio.dev/dropbox
- **OneDrive**: https://composio.dev/onedrive

### PDF Generation
- **jsPDF**: https://github.com/parallax/jsPDF
- **Puppeteer**: https://pptr.dev/
- **React-PDF**: https://react-pdf.org/

### File Upload
- **Vercel Blob**: https://vercel.com/docs/storage/vercel-blob
- **Uploadthing**: https://uploadthing.com/

---

## Architecture

### File Structure
\`\`\`
lib/export/
├── types.ts
├── cloud-storage.ts          # Cloud provider integrations
├── custom-templates.ts       # Custom export templates
├── batch-export.ts           # Batch export functionality
└── scheduled-export.ts       # Automated backups

lib/marketplace/
├── types.ts
├── template-store.ts         # Template marketplace logic
├── ratings.ts                # Rating and review system
├── versioning.ts             # Template version control
└── analytics.ts              # Template performance tracking

lib/agents/
├── custom-training.ts        # Custom agent training
├── fine-tuning.ts            # Agent fine-tuning
├── performance.ts            # Agent performance analytics
└── collaboration.ts          # Real-time collaboration

lib/auto-debate/
├── enhanced-automation.ts    # Advanced automation
├── moderation.ts             # Debate moderation
├── scoring.ts                # Debate scoring system
├── tournaments.ts            # Multi-round tournaments
└── integrations.ts           # External platform integrations

components/export/
├── CloudStorageSelector.tsx  # Cloud provider selection
├── ExportTemplateEditor.tsx  # Custom template editor
├── BatchExportPanel.tsx      # Batch export UI
├── ScheduledExportManager.tsx # Scheduled export settings
└── ExportPreview.tsx         # Export preview

components/marketplace/
├── TemplateMarketplace.tsx   # Main marketplace view
├── mobile/
│   ├── MarketplaceListMobile.tsx
│   ├── TemplateCardMobile.tsx
│   └── TemplateDetailMobile.tsx
├── desktop/
│   ├── MarketplaceGridDesktop.tsx
│   ├── TemplateCardDesktop.tsx
│   └── TemplatePreviewDesktop.tsx
├── shared/
│   ├── TemplateRating.tsx    # Rating component
│   ├── TemplateReviews.tsx   # Review list
│   ├── TemplateVersions.tsx  # Version history
│   └── TemplateAnalytics.tsx # Performance metrics

components/agents/
├── CustomAgentTrainer.tsx    # Agent training UI
├── AgentFineTuner.tsx        # Fine-tuning interface
├── AgentPerformance.tsx      # Performance dashboard
└── AgentCollaboration.tsx    # Real-time collaboration

components/auto-debate/
├── EnhancedAutoDebate.tsx    # Enhanced automation
├── DebateModerator.tsx       # Moderation interface
├── DebateScoring.tsx         # Scoring display
├── TournamentManager.tsx     # Tournament management
└── PlatformIntegrations.tsx  # External integrations

convex/
├── exports.ts                # Export data management
├── marketplace.ts            # Marketplace data
├── agents.ts                 # Agent data
├── tournaments.ts            # Tournament data
└── analytics.ts              # Analytics data
\`\`\`

---

## Phase 1: Advanced Export System (8-12 hours)

### Task 1.1: Cloud Storage Integration with Composio (2-3 hours)
**File**: `lib/export/cloud-storage.ts`

**Using Composio for Cloud Storage**:
Composio provides out-of-the-box integrations with Google Drive, Dropbox, and OneDrive. No need to implement OAuth flows or API clients manually.

**Installation**:
\`\`\`bash
npm install composio-core
\`\`\`

**Implementation**:
\`\`\`typescript
import { Composio } from 'composio-core'

export interface CloudProvider {
  id: string
  name: string
  icon: string
  isConnected: boolean
  composioAppName: string // e.g., "googledrive", "dropbox", "onedrive"
}

export interface CloudUploadOptions {
  provider: "googledrive" | "dropbox" | "onedrive"
  fileName: string
  fileContent: Blob
  folder?: string
  overwrite?: boolean
}

export interface CloudUploadResult {
  success: boolean
  fileId: string
  fileUrl: string
  provider: string
  uploadedAt: Date
}

export class CloudStorageManager {
  private composio: Composio
  
  constructor() {
    // Initialize Composio with API key
    this.composio = new Composio({
      apiKey: process.env.COMPOSIO_API_KEY
    })
  }
  
  // Provider authentication (handled by Composio)
  async connectProvider(provider: string, userId: string): Promise<string> {
    // Get auth URL from Composio
    const entity = await this.composio.getEntity(userId)
    const connection = await entity.initiateConnection(provider)
    return connection.redirectUrl
  }
  
  async disconnectProvider(provider: string, userId: string): Promise<void> {
    const entity = await this.composio.getEntity(userId)
    await entity.deleteConnection(provider)
  }
  
  async isProviderConnected(provider: string, userId: string): Promise<boolean> {
    const entity = await this.composio.getEntity(userId)
    const connections = await entity.getConnections()
    return connections.some(conn => conn.appName === provider && conn.status === 'ACTIVE')
  }
  
  // File operations (using Composio tools)
  async uploadFile(options: CloudUploadOptions, userId: string): Promise<CloudUploadResult> {
    const entity = await this.composio.getEntity(userId)
    
    // Get the appropriate tool based on provider
    const toolName = this.getUploadToolName(options.provider)
    
    // Execute the upload tool
    const result = await entity.execute(toolName, {
      file_name: options.fileName,
      file_content: await this.blobToBase64(options.fileContent),
      folder_path: options.folder,
      overwrite: options.overwrite
    })
    
    return {
      success: result.success,
      fileId: result.data.file_id,
      fileUrl: result.data.file_url,
      provider: options.provider,
      uploadedAt: new Date()
    }
  }
  
  async listFiles(provider: string, userId: string, folder?: string): Promise<CloudFile[]> {
    const entity = await this.composio.getEntity(userId)
    const toolName = this.getListFilesToolName(provider)
    
    const result = await entity.execute(toolName, {
      folder_path: folder
    })
    
    return result.data.files
  }
  
  async deleteFile(provider: string, userId: string, fileId: string): Promise<void> {
    const entity = await this.composio.getEntity(userId)
    const toolName = this.getDeleteToolName(provider)
    
    await entity.execute(toolName, {
      file_id: fileId
    })
  }
  
  // Folder operations (using Composio tools)
  async createFolder(provider: string, userId: string, name: string): Promise<string> {
    const entity = await this.composio.getEntity(userId)
    const toolName = this.getCreateFolderToolName(provider)
    
    const result = await entity.execute(toolName, {
      folder_name: name
    })
    
    return result.data.folder_id
  }
  
  async listFolders(provider: string, userId: string): Promise<CloudFolder[]> {
    const entity = await this.composio.getEntity(userId)
    const toolName = this.getListFoldersToolName(provider)
    
    const result = await entity.execute(toolName, {})
    
    return result.data.folders
  }
  
  // Helper methods
  private getUploadToolName(provider: string): string {
    const toolMap = {
      googledrive: 'GOOGLEDRIVE_UPLOAD_FILE',
      dropbox: 'DROPBOX_UPLOAD_FILE',
      onedrive: 'ONEDRIVE_UPLOAD_FILE'
    }
    return toolMap[provider]
  }
  
  private getListFilesToolName(provider: string): string {
    const toolMap = {
      googledrive: 'GOOGLEDRIVE_LIST_FILES',
      dropbox: 'DROPBOX_LIST_FILES',
      onedrive: 'ONEDRIVE_LIST_FILES'
    }
    return toolMap[provider]
  }
  
  private getDeleteToolName(provider: string): string {
    const toolMap = {
      googledrive: 'GOOGLEDRIVE_DELETE_FILE',
      dropbox: 'DROPBOX_DELETE_FILE',
      onedrive: 'ONEDRIVE_DELETE_FILE'
    }
    return toolMap[provider]
  }
  
  private getCreateFolderToolName(provider: string): string {
    const toolMap = {
      googledrive: 'GOOGLEDRIVE_CREATE_FOLDER',
      dropbox: 'DROPBOX_CREATE_FOLDER',
      onedrive: 'ONEDRIVE_CREATE_FOLDER'
    }
    return toolMap[provider]
  }
  
  private getListFoldersToolName(provider: string): string {
    const toolMap = {
      googledrive: 'GOOGLEDRIVE_LIST_FOLDERS',
      dropbox: 'DROPBOX_LIST_FOLDERS',
      onedrive: 'ONEDRIVE_LIST_FOLDERS'
    }
    return toolMap[provider]
  }
  
  private async blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  }
}
\`\`\`

**Best Practices with Composio**:
- Use Composio entities to manage user-specific connections
- Store Composio API key in environment variables
- Let Composio handle OAuth flows automatically
- Use Composio's built-in error handling
- Leverage Composio's tool catalog for consistent API calls
- No need to implement retry logic - Composio handles it

**Benefits of Using Composio**:
1. **No OAuth Implementation**: Composio handles all authentication flows
2. **Unified API**: Same interface for all cloud providers
3. **Automatic Updates**: Composio maintains API integrations
4. **Built-in Error Handling**: Robust error handling out of the box
5. **Fine-grained Permissions**: Control what each user can access
6. **Faster Development**: 2-3 hours instead of 3-4 hours per provider

**Mobile-First Considerations**:
- OAuth flow optimized for mobile browsers (handled by Composio)
- Progress indicators for slow connections
- Offline queue for failed uploads (implement on top of Composio)
- Touch-optimized provider selection

**Environment Variables Required**:
\`\`\`env
COMPOSIO_API_KEY=your_composio_api_key
\`\`\`

---

### Task 1.2: Custom Export Template System (2-3 hours)
**File**: `lib/export/custom-templates.ts`

**Libraries to Use**:
- **jsPDF**: For PDF generation (https://github.com/parallax/jsPDF)
- **React-PDF**: For React-based PDF templates (https://react-pdf.org/)

**Implementation**:
\`\`\`typescript
import jsPDF from 'jspdf'

export interface ExportTemplate {
  id: string
  name: string
  description: string
  type: "pdf" | "html" | "markdown"
  branding: {
    logo?: string
    primaryColor: string
    secondaryColor: string
    fontFamily: string
  }
  layout: {
    pageSize: "A4" | "Letter" | "Legal"
    orientation: "portrait" | "landscape"
    margins: { top: number; right: number; bottom: number; left: number }
  }
  header?: {
    enabled: boolean
    content: string
    height: number
  }
  footer?: {
    enabled: boolean
    content: string
    height: number
  }
  sections: TemplateSection[]
  createdAt: Date
  updatedAt: Date
}

export interface TemplateSection {
  id: string
  type: "title" | "metadata" | "messages" | "artifacts" | "custom"
  enabled: boolean
  order: number
  config: Record<string, any>
}

export class ExportTemplateManager {
  // Template CRUD
  async createTemplate(template: Partial<ExportTemplate>): Promise<ExportTemplate>
  async updateTemplate(id: string, updates: Partial<ExportTemplate>): Promise<ExportTemplate>
  async deleteTemplate(id: string): Promise<void>
  async getTemplate(id: string): Promise<ExportTemplate>
  async listTemplates(): Promise<ExportTemplate[]>
  
  // Template application (using jsPDF)
  async applyTemplate(sessionId: string, templateId: string): Promise<Blob>
  async previewTemplate(templateId: string, sampleData: any): Promise<string>
}
\`\`\`

**Best Practices**:
- Use jsPDF for simple PDFs
- Use React-PDF for complex layouts
- Cache generated PDFs
- Optimize images before embedding
- Use web fonts for consistent rendering

**Mobile-First Considerations**:
- Template editor with mobile-friendly controls
- Live preview with responsive scaling
- Touch-optimized color picker
- Simplified mobile template editor

---

### Task 1.3: Batch Export System (2-3 hours)
**File**: `lib/export/batch-export.ts`

**Implementation**:
\`\`\`typescript
export interface BatchExportJob {
  id: string
  sessionIds: string[]
  format: "pdf" | "json" | "markdown" | "html"
  templateId?: string
  cloudProvider?: string
  status: "pending" | "processing" | "completed" | "failed"
  progress: number
  totalItems: number
  completedItems: number
  failedItems: number
  startedAt?: Date
  completedAt?: Date
  error?: string
}

export interface BatchExportOptions {
  sessionIds: string[]
  format: "pdf" | "json" | "markdown" | "html"
  templateId?: string
  cloudProvider?: string
  combineIntoSingle?: boolean
  fileName?: string
}

export class BatchExportManager {
  // Job management (stored in Convex)
  async createJob(options: BatchExportOptions): Promise<BatchExportJob>
  async getJob(jobId: string): Promise<BatchExportJob>
  async cancelJob(jobId: string): Promise<void>
  async pauseJob(jobId: string): Promise<void>
  async resumeJob(jobId: string): Promise<void>
  
  // Export execution (using Convex actions for background processing)
  async processJob(jobId: string): Promise<void>
  async getJobProgress(jobId: string): Promise<number>
  async getJobResults(jobId: string): Promise<ExportResult[]>
  
  // History (stored in Convex)
  async getJobHistory(): Promise<BatchExportJob[]>
  async clearJobHistory(): Promise<void>
}
\`\`\`

**Best Practices**:
- Use Convex actions for background processing
- Store job state in Convex database
- Implement progress tracking
- Handle failures gracefully
- Provide clear error messages

**Mobile-First Considerations**:
- Background processing with notifications
- Progress indicators optimized for mobile
- Pause/resume for interrupted connections
- Mobile-friendly job history view

---

### Task 1.4: Scheduled Export System (1-2 hours)
**File**: `lib/export/scheduled-export.ts`

**Implementation**:
\`\`\`typescript
export interface ScheduledExport {
  id: string
  name: string
  description: string
  schedule: {
    frequency: "daily" | "weekly" | "monthly"
    time: string // HH:MM format
    dayOfWeek?: number // 0-6 for weekly
    dayOfMonth?: number // 1-31 for monthly
  }
  exportOptions: {
    format: "pdf" | "json" | "markdown"
    templateId?: string
    cloudProvider?: string
    includeArtifacts: boolean
  }
  filters: {
    sessionIds?: string[]
    dateFrom?: Date
    dateTo?: Date
    tags?: string[]
  }
  notifications: {
    email: boolean
    emailAddress?: string
    onSuccess: boolean
    onFailure: boolean
  }
  enabled: boolean
  lastRun?: Date
  nextRun?: Date
  createdAt: Date
}

export class ScheduledExportManager {
  // Schedule CRUD (stored in Convex)
  async createSchedule(schedule: Partial<ScheduledExport>): Promise<ScheduledExport>
  async updateSchedule(id: string, updates: Partial<ScheduledExport>): Promise<ScheduledExport>
  async deleteSchedule(id: string): Promise<void>
  async getSchedule(id: string): Promise<ScheduledExport>
  async listSchedules(): Promise<ScheduledExport[]>
  
  // Schedule execution (using Convex cron jobs)
  async enableSchedule(id: string): Promise<void>
  async disableSchedule(id: string): Promise<void>
  async runScheduleNow(id: string): Promise<void>
  async getScheduleHistory(id: string): Promise<ScheduleRun[]>
}
\`\`\`

**Best Practices**:
- Use Convex scheduled functions (cron jobs)
- Store schedules in Convex database
- Send email notifications via Resend or similar
- Log all scheduled runs
- Handle timezone conversions properly

**Mobile-First Considerations**:
- Mobile-friendly schedule picker
- Push notifications for export completion
- Simplified schedule management on mobile
- Quick enable/disable toggles

---

### Task 1.5: Create Export UI Components
**Files**: `components/export/*`

**Components to Create**:
1. **CloudStorageSelector.tsx**
   - [ ] Provider cards with connection status
   - [ ] Connect/disconnect buttons using Composio auth URLs
   - [ ] OAuth callback handling (Composio redirects)
   - [ ] Mobile: Bottom sheet, Desktop: Modal

2. **ExportTemplateEditor.tsx**
   - [ ] Template configuration form
   - [ ] Live preview pane
   - [ ] Branding customization
   - [ ] Layout options
   - [ ] Mobile: Full-screen, Desktop: Split-view

3. **BatchExportPanel.tsx**
   - [ ] Session selection with checkboxes
   - [ ] Export options form
   - [ ] Progress tracking
   - [ ] Job history list
   - [ ] Mobile: Drawer, Desktop: Sidebar

4. **ScheduledExportManager.tsx**
   - [ ] Schedule list with cards
   - [ ] Create/edit schedule form
   - [ ] Enable/disable toggles
   - [ ] Run history
   - [ ] Mobile: Full-screen, Desktop: Modal

**Mobile-First Considerations**:
- 44px minimum touch targets
- 48px input heights
- Adaptive layouts (drawer/modal)
- Touch-optimized controls
- Responsive typography

---

## Phase 2: Community Marketplace (12-18 hours)

### Task 2.1: Template Marketplace System (4-5 hours)
**File**: `lib/marketplace/template-store.ts`

**Optional: Use Composio for Email Notifications**
Instead of implementing email notifications manually, you can use Composio's Gmail integration:
- Send template update notifications via Gmail
- Send review notifications to template authors
- Send marketplace announcements

\`\`\`typescript
// Example: Send email notification via Composio
async sendTemplateUpdateNotification(userId: string, templateName: string) {
  const entity = await this.composio.getEntity(userId)
  await entity.execute('GMAIL_SEND_EMAIL', {
    to: 'user@example.com',
    subject: `Update available for ${templateName}`,
    body: 'A new version of your template is available...'
  })
}
\`\`\`

**Implementation**:
\`\`\`typescript
export interface MarketplaceTemplate {
  id: string
  name: string
  description: string
  author: {
    id: string
    name: string
    avatar: string
    verified: boolean
  }
  category: string
  tags: string[]
  preview: {
    images: string[]
    video?: string
  }
  stats: {
    downloads: number
    rating: number
    reviews: number
    favorites: number
  }
  version: string
  compatibility: string[]
  price: number // 0 for free
  isPremium: boolean
  createdAt: Date
  updatedAt: Date
}

export interface TemplateFilter {
  category?: string
  tags?: string[]
  priceRange?: { min: number; max: number }
  rating?: number
  sortBy?: "popular" | "recent" | "rating" | "downloads"
}

export class TemplateMarketplace {
  // Browse and search (using Convex queries with indexes)
  async searchTemplates(query: string, filters?: TemplateFilter): Promise<MarketplaceTemplate[]>
  async getTemplate(id: string): Promise<MarketplaceTemplate>
  async getFeaturedTemplates(): Promise<MarketplaceTemplate[]>
  async getPopularTemplates(): Promise<MarketplaceTemplate[]>
  async getRecentTemplates(): Promise<MarketplaceTemplate[]>
  
  // Installation (stored in Convex)
  async installTemplate(id: string): Promise<void>
  async uninstallTemplate(id: string): Promise<void>
  async updateTemplate(id: string): Promise<void>
  async getInstalledTemplates(): Promise<MarketplaceTemplate[]>
  
  // Publishing (for creators, requires admin role)
  async publishTemplate(template: Partial<MarketplaceTemplate>): Promise<MarketplaceTemplate>
  async updatePublishedTemplate(id: string, updates: Partial<MarketplaceTemplate>): Promise<void>
  async unpublishTemplate(id: string): Promise<void>
}
\`\`\`

**Best Practices**:
- Store templates in Convex database
- Use Convex indexes for fast search
- Store template files in Vercel Blob
- Implement pagination for large lists
- Cache popular templates

**Mobile-First Considerations**:
- Vertical scroll list on mobile
- Grid view on desktop
- Touch-optimized cards
- Lazy loading for performance
- Image optimization

---

### Task 2.2: Create Rating and Review System
**File**: `lib/marketplace/ratings.ts`

**Implementation**:
\`\`\`typescript
export interface TemplateReview {
  id: string
  templateId: string
  userId: string
  userName: string
  userAvatar: string
  rating: number // 1-5
  title: string
  content: string
  helpful: number
  notHelpful: number
  verified: boolean // User has installed template
  authorReply?: {
    content: string
    createdAt: Date
  }
  createdAt: Date
  updatedAt: Date
}

export interface RatingSummary {
  averageRating: number
  totalReviews: number
  distribution: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
}

export class ReviewManager {
  // Review CRUD (stored in Convex)
  async createReview(review: Partial<TemplateReview>): Promise<TemplateReview>
  async updateReview(id: string, updates: Partial<TemplateReview>): Promise<TemplateReview>
  async deleteReview(id: string): Promise<void>
  async getReview(id: string): Promise<TemplateReview>
  
  // Review queries (using Convex queries with indexes)
  async getTemplateReviews(templateId: string, sortBy?: "recent" | "helpful" | "rating"): Promise<TemplateReview[]>
  async getRatingSummary(templateId: string): Promise<RatingSummary>
  
  // Review interactions (stored in Convex)
  async markHelpful(reviewId: string): Promise<void>
  async markNotHelpful(reviewId: string): Promise<void>
  async replyToReview(reviewId: string, content: string): Promise<void>
}
\`\`\`

**Best Practices**:
- Store reviews in Convex database
- Use Convex aggregation for rating summaries
- Implement spam detection
- Allow only verified users to review
- Moderate reviews for inappropriate content

**Mobile-First Considerations**:
- Compact review cards on mobile
- Touch-optimized rating input
- Expandable review content
- Mobile-friendly review form

---

### Task 2.3: Create Template Versioning System
**File**: `lib/marketplace/versioning.ts`

**Implementation**:
\`\`\`typescript
export interface TemplateVersion {
  id: string
  templateId: string
  version: string // e.g., "1.2.3"
  changelog: string
  breaking: boolean
  compatibility: string[]
  downloadUrl: string
  fileSize: number
  createdAt: Date
}

export interface VersionUpdate {
  templateId: string
  currentVersion: string
  latestVersion: string
  hasUpdate: boolean
  breaking: boolean
  changelog: string
}

export class VersionManager {
  // Version management (stored in Convex)
  async createVersion(version: Partial<TemplateVersion>): Promise<TemplateVersion>
  async getVersion(templateId: string, version: string): Promise<TemplateVersion>
  async getVersionHistory(templateId: string): Promise<TemplateVersion[]>
  async getLatestVersion(templateId: string): Promise<TemplateVersion>
  
  // Update checking (using Convex queries)
  async checkForUpdates(templateId: string): Promise<VersionUpdate>
  async checkAllUpdates(): Promise<VersionUpdate[]>
  
  // Version operations
  async installVersion(templateId: string, version: string): Promise<void>
  async rollbackVersion(templateId: string, version: string): Promise<void>
}
\`\`\`

**Best Practices**:
- Follow semantic versioning (semver)
- Store versions in Convex database
- Store version files in Vercel Blob
- Notify users of breaking changes
- Allow rollback to previous versions

**Mobile-First Considerations**:
- Compact version history list
- Clear update indicators
- Mobile-friendly changelog display
- Quick update actions

---

### Task 2.4: Create Template Analytics System
**File**: `lib/marketplace/analytics.ts`

**Implementation**:
\`\`\`typescript
export interface TemplateAnalytics {
  templateId: string
  period: "day" | "week" | "month" | "year"
  metrics: {
    downloads: number
    activeUsers: number
    averageRating: number
    revenue: number
    favorites: number
  }
  trends: {
    downloads: TrendData[]
    ratings: TrendData[]
    revenue: TrendData[]
  }
  demographics: {
    countries: Record<string, number>
    devices: Record<string, number>
  }
}

export interface TrendData {
  date: Date
  value: number
}

export class TemplateAnalyticsManager {
  // Analytics queries (using Convex aggregation)
  async getAnalytics(templateId: string, period: string): Promise<TemplateAnalytics>
  async getDownloadTrend(templateId: string, days: number): Promise<TrendData[]>
  async getRevenueTrend(templateId: string, days: number): Promise<TrendData[]>
  
  // Tracking (stored in Convex)
  async trackDownload(templateId: string): Promise<void>
  async trackUsage(templateId: string): Promise<void>
  async trackFavorite(templateId: string): Promise<void>
}
\`\`\`

**Best Practices**:
- Store analytics events in Convex
- Use Convex aggregation for metrics
- Implement data retention policies
- Respect user privacy
- Provide opt-out options

**Mobile-First Considerations**:
- Responsive charts and graphs
- Touch-optimized data visualization
- Simplified metrics on mobile
- Swipeable trend views

---

### Task 2.5: Create Marketplace UI Components
**Files**: `components/marketplace/*`

**Components to Create**:

1. **Mobile Components** (`mobile/`)
   - [ ] MarketplaceListMobile.tsx - Vertical scroll list
   - [ ] TemplateCardMobile.tsx - Compact card (80px min height)
   - [ ] TemplateDetailMobile.tsx - Full-screen detail view

2. **Desktop Components** (`desktop/`)
   - [ ] MarketplaceGridDesktop.tsx - Grid layout (3-4 columns)
   - [ ] TemplateCardDesktop.tsx - Detailed card with hover
   - [ ] TemplatePreviewDesktop.tsx - Split-view preview

3. **Shared Components** (`shared/`)
   - [ ] TemplateRating.tsx - Star rating display
   - [ ] TemplateReviews.tsx - Review list with sorting
   - [ ] TemplateVersions.tsx - Version history
   - [ ] TemplateAnalytics.tsx - Analytics dashboard

**Mobile-First Considerations**:
- Separate mobile/desktop implementations
- Touch-optimized interactions
- Adaptive layouts
- Performance optimization
- Image lazy loading

---

## Phase 3: Custom Agent Training & Enhanced Auto-Debate (15-20 hours)

### Task 3.1: Create Custom Agent Training System
**File**: `lib/agents/custom-training.ts`

**Features to Implement**:
- [ ] Upload training data (documents, conversations)
- [ ] Define agent specialization
- [ ] Training progress tracking
- [ ] Model fine-tuning
- [ ] Agent testing and validation
- [ ] Performance benchmarking
- [ ] Agent deployment

**Implementation**:
\`\`\`typescript
export interface TrainingData {
  id: string
  type: "document" | "conversation" | "qa-pairs"
  content: string
  metadata: Record<string, any>
}

export interface AgentTrainingJob {
  id: string
  agentId: string
  name: string
  specialization: string
  trainingData: TrainingData[]
  status: "pending" | "training" | "completed" | "failed"
  progress: number
  metrics: {
    accuracy: number
    loss: number
    epochs: number
  }
  startedAt?: Date
  completedAt?: Date
  error?: string
}

export class AgentTrainer {
  // Training job management
  async createTrainingJob(job: Partial<AgentTrainingJob>): Promise<AgentTrainingJob>
  async getTrainingJob(jobId: string): Promise<AgentTrainingJob>
  async cancelTrainingJob(jobId: string): Promise<void>
  
  // Training data management
  async uploadTrainingData(data: TrainingData[]): Promise<void>
  async validateTrainingData(data: TrainingData[]): Promise<ValidationResult>
  
  // Training execution
  async startTraining(jobId: string): Promise<void>
  async getTrainingProgress(jobId: string): Promise<number>
  async getTrainingMetrics(jobId: string): Promise<TrainingMetrics>
  
  // Agent deployment
  async deployAgent(jobId: string): Promise<string>
  async testAgent(agentId: string, testData: any): Promise<TestResult>
}
\`\`\`

**Mobile-First Considerations**:
- Mobile-friendly file upload
- Progress indicators
- Simplified training UI on mobile
- Background processing

---

### Task 3.2: Create Agent Fine-Tuning System
**File**: `lib/agents/fine-tuning.ts`

**Features to Implement**:
- [ ] Adjust agent parameters
- [ ] Personality customization
- [ ] Response style tuning
- [ ] Knowledge base updates
- [ ] Behavior modification
- [ ] A/B testing different configurations
- [ ] Performance comparison

**Implementation**:
\`\`\`typescript
export interface AgentConfiguration {
  id: string
  agentId: string
  parameters: {
    temperature: number
    topP: number
    frequencyPenalty: number
    presencePenalty: number
    maxTokens: number
  }
  personality: {
    tone: "formal" | "casual" | "friendly" | "professional"
    verbosity: "concise" | "balanced" | "detailed"
    creativity: number // 0-1
  }
  knowledge: {
    domains: string[]
    sources: string[]
    lastUpdated: Date
  }
  behavior: {
    responseTime: "fast" | "balanced" | "thorough"
    citeSources: boolean
    askClarifyingQuestions: boolean
  }
}

export class AgentFineTuner {
  // Configuration management
  async getConfiguration(agentId: string): Promise<AgentConfiguration>
  async updateConfiguration(agentId: string, config: Partial<AgentConfiguration>): Promise<void>
  async resetConfiguration(agentId: string): Promise<void>
  
  // Testing and comparison
  async testConfiguration(agentId: string, testPrompts: string[]): Promise<TestResult[]>
  async compareConfigurations(configIds: string[]): Promise<ComparisonResult>
  
  // Knowledge base
  async updateKnowledge(agentId: string, sources: string[]): Promise<void>
  async getKnowledgeSources(agentId: string): Promise<string[]>
}
\`\`\`

**Mobile-First Considerations**:
- Touch-optimized sliders
- Mobile-friendly parameter controls
- Simplified configuration on mobile
- Quick presets for common configurations

---

### Task 3.3: Create Agent Performance Analytics
**File**: `lib/agents/performance.ts`

**Features to Implement**:
- [ ] Response quality metrics
- [ ] Response time tracking
- [ ] User satisfaction ratings
- [ ] Accuracy measurements
- [ ] Cost tracking
- [ ] Usage patterns
- [ ] Performance trends

**Implementation**:
\`\`\`typescript
export interface AgentPerformanceMetrics {
  agentId: string
  period: "day" | "week" | "month"
  metrics: {
    totalResponses: number
    averageResponseTime: number
    averageQuality: number
    userSatisfaction: number
    accuracy: number
    cost: number
  }
  trends: {
    responseTime: TrendData[]
    quality: TrendData[]
    satisfaction: TrendData[]
  }
  topPerformingAreas: string[]
  improvementAreas: string[]
}

export class AgentPerformanceTracker {
  // Metrics collection
  async trackResponse(agentId: string, response: any, metrics: any): Promise<void>
  async trackUserFeedback(agentId: string, responseId: string, rating: number): Promise<void>
  
  // Analytics queries
  async getPerformanceMetrics(agentId: string, period: string): Promise<AgentPerformanceMetrics>
  async compareAgents(agentIds: string[]): Promise<ComparisonResult>
  async getPerformanceTrend(agentId: string, days: number): Promise<TrendData[]>
  
  // Insights
  async getInsights(agentId: string): Promise<PerformanceInsight[]>
  async getRecommendations(agentId: string): Promise<string[]>
}
\`\`\`

**Mobile-First Considerations**:
- Responsive charts
- Touch-optimized data visualization
- Simplified metrics on mobile
- Swipeable metric cards

---

### Task 3.4: Create Enhanced Auto-Debate System
**File**: `lib/auto-debate/enhanced-automation.ts`

**Implementation**:
\`\`\`typescript
export interface EnhancedAutoDebateConfig {
  id: string
  topic: string
  agents: string[]
  rounds: number
  artifactGeneration: {
    enabled: boolean
    types: ("document" | "chart" | "table" | "checklist")[]
    frequency: "per-round" | "on-demand" | "end"
  }
  moderation: {
    enabled: boolean
    factCheck: boolean
    citeSources: boolean
    timeLimit?: number
  }
  scoring: {
    enabled: boolean
    criteria: string[]
    weights: Record<string, number>
  }
}

export interface DebateArtifact {
  id: string
  debateId: string
  type: "document" | "chart" | "table" | "checklist"
  title: string
  content: any
  generatedBy: string
  round: number
  createdAt: Date
}

export class EnhancedAutoDebate {
  // Debate management (stored in Convex)
  async startDebate(config: EnhancedAutoDebateConfig): Promise<string>
  async pauseDebate(debateId: string): Promise<void>
  async resumeDebate(debateId: string): Promise<void>
  async endDebate(debateId: string): Promise<DebateSummary>
  
  // Artifact generation (using AI SDK with structured output)
  async generateArtifact(debateId: string, type: string): Promise<DebateArtifact>
  async getDebateArtifacts(debateId: string): Promise<DebateArtifact[]>
  
  // Moderation (using AI SDK)
  async factCheck(statement: string): Promise<FactCheckResult>
  async citeSources(statement: string): Promise<Source[]>
  
  // Scoring (using AI SDK)
  async scoreRound(debateId: string, round: number): Promise<RoundScore>
  async getFinalScore(debateId: string): Promise<FinalScore>
}
\`\`\`

**Best Practices**:
- Use AI SDK for artifact generation
- Store debates in Convex database
- Use structured output for consistent artifacts
- Implement real-time updates
- Handle errors gracefully

**Mobile-First Considerations**:
- Mobile-friendly debate controls
- Touch-optimized artifact viewer
- Simplified scoring display
- Real-time updates optimized for mobile

---

### Task 3.5: Create Debate Moderation System
**File**: `lib/auto-debate/moderation.ts`

**Implementation**:
\`\`\`typescript
export interface ModerationRule {
  id: string
  name: string
  description: string
  type: "fact-check" | "fallacy" | "bias" | "tone" | "custom"
  severity: "low" | "medium" | "high"
  action: "warn" | "flag" | "block"
  enabled: boolean
}

export interface ModerationEvent {
  id: string
  debateId: string
  messageId: string
  rule: ModerationRule
  details: string
  action: string
  timestamp: Date
}

export class DebateModerator {
  // Rule management (stored in Convex)
  async getRules(): Promise<ModerationRule[]>
  async updateRule(ruleId: string, updates: Partial<ModerationRule>): Promise<void>
  async enableRule(ruleId: string): Promise<void>
  async disableRule(ruleId: string): Promise<void>
  
  // Moderation (using AI SDK)
  async moderateMessage(message: string): Promise<ModerationResult>
  async factCheck(statement: string): Promise<FactCheckResult>
  async detectFallacies(argument: string): Promise<Fallacy[]>
  async detectBias(text: string): Promise<BiasAnalysis>
  async analyzeTone(text: string): Promise<ToneAnalysis>
  
  // Events (stored in Convex)
  async getModerationEvents(debateId: string): Promise<ModerationEvent[]>
  async handleViolation(event: ModerationEvent): Promise<void>
}
\`\`\`

**Best Practices**:
- Use AI SDK for moderation
- Store rules in Convex database
- Log all moderation events
- Provide clear explanations
- Allow rule customization

**Mobile-First Considerations**:
- Mobile-friendly moderation alerts
- Touch-optimized rule toggles
- Simplified event display
- Quick action buttons

---

### Task 3.6: Create Tournament System
**File**: `lib/auto-debate/tournaments.ts`

**Optional: Use Composio for External Integrations**
Composio can help integrate tournaments with external platforms:
- **Slack**: Post tournament updates to Slack channels
- **Discord**: Send tournament notifications to Discord servers
- **Calendar**: Create tournament events in Google Calendar
- **Notion**: Document tournament results in Notion

\`\`\`typescript
// Example: Post tournament update to Slack via Composio
async postTournamentUpdate(userId: string, tournamentId: string, message: string) {
  const entity = await this.composio.getEntity(userId)
  await entity.execute('SLACK_SEND_MESSAGE', {
    channel: '#tournaments',
    text: message
  })
}
\`\`\`

**Implementation**:
\`\`\`typescript
export interface Tournament {
  id: string
  name: string
  description: string
  format: "single-elimination" | "double-elimination" | "round-robin"
  participants: TournamentParticipant[]
  rounds: TournamentRound[]
  status: "upcoming" | "in-progress" | "completed"
  startDate: Date
  endDate?: Date
  winner?: string
}

export interface TournamentParticipant {
  id: string
  type: "user" | "agent"
  name: string
  seed: number
  wins: number
  losses: number
  score: number
}

export interface TournamentRound {
  id: string
  roundNumber: number
  matches: TournamentMatch[]
  status: "pending" | "in-progress" | "completed"
}

export interface TournamentMatch {
  id: string
  participant1: string
  participant2: string
  winner?: string
  score?: { p1: number; p2: number }
  debateId?: string
  status: "pending" | "in-progress" | "completed"
}

export class TournamentManager {
  // Tournament CRUD (stored in Convex)
  async createTournament(tournament: Partial<Tournament>): Promise<Tournament>
  async getTournament(id: string): Promise<Tournament>
  async updateTournament(id: string, updates: Partial<Tournament>): Promise<void>
  async deleteTournament(id: string): Promise<void>
  
  // Tournament execution (using Convex actions)
  async startTournament(id: string): Promise<void>
  async advanceRound(id: string): Promise<void>
  async completeTournament(id: string): Promise<void>
  
  // Match management (stored in Convex)
  async createMatch(roundId: string, p1: string, p2: string): Promise<TournamentMatch>
  async startMatch(matchId: string): Promise<void>
  async completeMatch(matchId: string, winner: string, score: any): Promise<void>
  
  // Leaderboard (using Convex queries)
  async getLeaderboard(tournamentId: string): Promise<TournamentParticipant[]>
  async getParticipantStats(participantId: string): Promise<ParticipantStats>
}
\`\`\`

**Best Practices**:
- Store tournaments in Convex database
- Use Convex actions for automation
- Implement bracket generation algorithms
- Handle edge cases (ties, forfeits)
- Provide real-time updates

**Mobile-First Considerations**:
- Mobile-friendly bracket view
- Touch-optimized match cards
- Swipeable rounds
- Simplified leaderboard

---

### Task 3.7: Create Advanced UI Components
**Files**: `components/agents/*`, `components/auto-debate/*`

**Components to Create**:

1. **Agent Components**
   - [ ] CustomAgentTrainer.tsx - Training interface
   - [ ] AgentFineTuner.tsx - Fine-tuning controls
   - [ ] AgentPerformance.tsx - Performance dashboard
   - [ ] AgentCollaboration.tsx - Real-time collaboration

2. **Auto-Debate Components**
   - [ ] EnhancedAutoDebate.tsx - Enhanced automation UI
   - [ ] DebateModerator.tsx - Moderation interface
   - [ ] DebateScoring.tsx - Scoring display
   - [ ] TournamentManager.tsx - Tournament management
   - [ ] TournamentBracket.tsx - Bracket visualization

**Mobile-First Considerations**:
- Full-screen on mobile, split-view on desktop
- Touch-optimized controls
- Responsive layouts
- Performance optimization
- Real-time updates

---

## Success Criteria

### Advanced Export System
- [ ] Cloud storage integration works for Google Drive, Dropbox, OneDrive (via Composio)
- [ ] Custom templates can be created and applied using jsPDF
- [ ] Batch export processes multiple sessions using Convex actions
- [ ] Scheduled exports run automatically using Convex cron jobs
- [ ] Export quality is production-ready

### Community Marketplace
- [ ] Templates can be browsed and searched using Convex queries
- [ ] Rating and review system works with Convex storage
- [ ] Template versioning is tracked in Convex
- [ ] Analytics provide useful insights using Convex aggregation
- [ ] Marketplace is performant and responsive

### Custom Agent Training
- [ ] Agents can be trained on custom data
- [ ] Fine-tuning improves agent performance
- [ ] Performance analytics are accurate
- [ ] Training process is user-friendly

### Enhanced Auto-Debate
- [ ] Artifacts are generated automatically using AI SDK
- [ ] Moderation catches violations using AI SDK
- [ ] Scoring is fair and accurate using AI SDK
- [ ] Tournaments run smoothly using Convex
- [ ] All features work on mobile and desktop

---

## Testing Checklist

### Export System
- [ ] Google Drive connection and upload via Composio
- [ ] Dropbox connection and upload via Composio
- [ ] OneDrive connection and upload via Composio
- [ ] Custom template creation with jsPDF
- [ ] Batch export (5+ sessions)
- [ ] Scheduled export execution
- [ ] Export quality validation

### Marketplace
- [ ] Template search and filter
- [ ] Template installation
- [ ] Rating submission
- [ ] Review submission
- [ ] Version updates
- [ ] Analytics accuracy
- [ ] Mobile responsiveness

### Agent Training
- [ ] Training data upload
- [ ] Training job execution
- [ ] Fine-tuning parameters
- [ ] Performance tracking
- [ ] Agent deployment
- [ ] Testing and validation

### Auto-Debate
- [ ] Enhanced automation
- [ ] Artifact generation
- [ ] Fact-checking
- [ ] Moderation rules
- [ ] Scoring system
- [ ] Tournament creation
- [ ] Tournament execution

---

## Mobile-First Implementation

All components follow mobile-first best practices:

### Touch Targets
- [ ] All interactive elements are 44px minimum
- [ ] Form inputs are 48px minimum height
- [ ] Adequate spacing between touch targets

### Adaptive UI Patterns
- [ ] Cloud Storage: Bottom sheet on mobile, modal on desktop
- [ ] Template Editor: Full-screen on mobile, split-view on desktop
- [ ] Marketplace: Vertical list on mobile, grid on desktop
- [ ] Training UI: Full-screen on mobile, sidebar on desktop
- [ ] Tournament Bracket: Swipeable on mobile, full view on desktop

### Responsive Design
- [ ] All layouts use flexbox with proper wrapping
- [ ] Grid layouts adapt to screen size
- [ ] Typography scales appropriately
- [ ] Spacing uses responsive Tailwind classes

### Performance
- [ ] Lazy loading for images and components
- [ ] Optimized re-renders with React hooks
- [ ] Background processing for long operations
- [ ] Smooth animations with Tailwind transitions

---

## Implementation Order

1. **Phase 1: Advanced Export System** (8-12 hours)
   - Task 1.1: Cloud storage integration with Composio (2-3 hours)
   - Task 1.2: Custom templates (2-3 hours)
   - Task 1.3: Batch export (2-3 hours)
   - Task 1.4: Scheduled exports (1-2 hours)

2. **Phase 2: Community Marketplace** (12-18 hours)
   - Task 2.1: Marketplace system (4-5 hours)
   - Task 2.2: Rating and reviews (3-4 hours)
   - Task 2.3: Versioning (2-3 hours)
   - Task 2.4: Analytics (3-4 hours)

3. **Phase 3: Enhanced Auto-Debate** (15-20 hours)
   - Task 3.1: Enhanced automation (5-6 hours)
   - Task 3.2: Moderation (4-5 hours)
   - Task 3.3: Scoring (3-4 hours)
   - Task 3.4: Tournaments (3-5 hours)

**Total Estimated Time**: 35-50 hours (5-7 focused days)

---

## Dependencies and Prerequisites

### Technical Requirements
- [ ] Convex database fully implemented (Phase 4)
- [ ] User authentication system (Phase 5)
- [ ] Polar payment integration (Phase 7) - for marketplace
- [ ] Composio API key (for cloud storage and other integrations)
- [ ] Email service for notifications (optional - can use Composio's Gmail integration)
- [ ] Vercel Blob for template storage

### External Services
- [ ] Composio account and API key
- [ ] Polar for payments
- [ ] Vercel Blob for storage
- [ ] (Optional) Resend for emails if not using Composio

### NPM Packages
- [ ] `composio-core` - Composio SDK (handles all cloud storage integrations)
- [ ] `jspdf` - PDF generation
- [ ] `react-pdf` - React PDF templates (optional)

---

## Risk Assessment

### High Risk
- **Cloud storage integration complexity** - Multiple OAuth flows, API differences
  - Mitigation: Use Composio to handle OAuth flows and API differences.
- **Marketplace moderation** - User-generated content risks
  - Mitigation: Implement automated moderation using AI SDK, manual review

### Medium Risk
- **Custom template complexity** - PDF generation can be tricky
  - Mitigation: Use proven libraries (jsPDF), start with simple templates
- **Tournament system complexity** - Many edge cases
  - Mitigation: Start with simple format (single-elimination), add complexity later
- **Performance at scale** - Large datasets may slow down
  - Mitigation: Implement pagination, caching, Convex indexes

### Low Risk
- **UI implementation** - Well-defined patterns exist
- **Rating system** - Standard implementation using Convex
- **Analytics** - Straightforward data aggregation using Convex

---

## Future Enhancements

Potential improvements for future iterations:

1. **Export System**
   - [ ] More cloud providers (Box, iCloud)
   - [ ] Video export of debates
   - [ ] Interactive HTML exports
   - [ ] API for programmatic export

2. **Marketplace**
   - [ ] Template bundles and collections
   - [ ] Subscription-based templates
   - [ ] Template customization service
   - [ ] Template marketplace API

3. **Agent Training**
   - [ ] Multi-modal training (text + images)
   - [ ] Federated learning
   - [ ] Agent marketplace
   - [ ] Agent collaboration features

4. **Auto-Debate**
   - [ ] Live audience participation
   - [ ] Real-time voting
   - [ ] Debate streaming
   - [ ] Integration with debate platforms

---

## Notes

- All features require Convex database (Phase 4)
- All features require user authentication (Phase 5)
- Marketplace requires Polar payment integration (Phase 7)
- Cloud storage uses Composio (no direct API integration needed)
- Composio handles OAuth flows automatically
- Use Composio for other integrations (Gmail, Slack, etc.) to simplify development
- Focus on production-ready quality
- Mobile-first design throughout
- Performance and security are critical

---

## Conclusion

Phase 6 represents the final polish layer that transforms AnyDebate AI into a production-ready platform with professional-grade features. The advanced export system enables seamless integration with existing workflows using Composio for cloud storage, the community marketplace fosters collaboration using Convex for data storage, and the enhanced auto-debate features provide sophisticated automation using the AI SDK.

This phase requires 35-50 hours of focused development and external service integrations, but the result is a comprehensive platform that can compete with commercial debate and collaboration tools. The mobile-first approach ensures that all features work seamlessly across devices, and the focus on using Composio and official SDKs ensures maintainability and reliability.

**Status**: Ready for implementation after Phase 4, Phase 5, and Phase 7 are complete.

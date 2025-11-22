# Database Administration Guide

**Status**: Reference Document  
**Last Updated**: 2024-01-15  
**Purpose**: Database management, backup, monitoring, and optimization for Convex

---

## Table of Contents

1. [Overview](#overview)
2. [Database Architecture](#database-architecture)
3. [Backup & Recovery](#backup--recovery)
4. [Data Migration](#data-migration)
5. [Query Optimization](#query-optimization)
6. [Monitoring & Alerting](#monitoring--alerting)
7. [Security & Access Control](#security--access-control)
8. [Disaster Recovery](#disaster-recovery)
9. [Performance Tuning](#performance-tuning)
10. [Operational Procedures](#operational-procedures)

---

## Overview

AnyDebateAI uses **Convex** as its primary database and backend infrastructure. Convex provides:

- **Automatic scaling**: No manual capacity management
- **Real-time subscriptions**: Live data updates via WebSockets
- **Built-in backups**: Point-in-time recovery
- **TypeScript-first**: Type-safe queries and mutations
- **Edge deployment**: Low-latency globally

---

## Database Architecture

### Deployment Environments

\`\`\`
Production (prod:anydebate-ai)
├── Live user data
├── Automatic daily backups
├── 99.9% uptime SLA
└── Multi-region replication

Preview (preview:anydebate-ai)
├── PR review environments
├── Isolated data per preview
├── Auto-cleanup after 7 days
└── Same schema as production

Development (dev:anydebate-ai)
├── Local development data
├── Schema experimentation
├── No backups required
└── Reset frequently
\`\`\`

### Data Storage Structure

\`\`\`
Convex Database
├── Core Tables (25 tables)
│   ├── users (Auth & profiles)
│   ├── organizations (Multi-tenancy)
│   ├── workspaces (Data isolation)
│   ├── sessions (Debate sessions)
│   ├── messages (Chat history)
│   ├── agents (AI configurations)
│   ├── artifacts (Generated content)
│   └── ... (22 more tables)
│
├── Indexes (Auto-optimized by Convex)
│   ├── Primary indexes (all tables)
│   ├── Secondary indexes (defined in schema)
│   └── Composite indexes (multi-field queries)
│
└── Files (Convex File Storage)
    ├── User uploads
    ├── Artifact exports
    └── Profile pictures
\`\`\`

---

## Backup & Recovery

### Automatic Backups

Convex provides **automatic continuous backups** with point-in-time recovery.

**Backup Schedule:**
- **Frequency**: Continuous (every write is backed up)
- **Retention**: 30 days for production
- **Recovery Point Objective (RPO)**: < 1 minute
- **Recovery Time Objective (RTO)**: < 5 minutes

### Manual Backup Creation

\`\`\`bash
# Export current database state
npx convex export --deployment prod:anydebate-ai --output backup-$(date +%Y%m%d).zip

# Backup specific tables
npx convex export --tables sessions,messages,artifacts --output critical-data.zip
\`\`\`

### Point-in-Time Recovery

\`\`\`bash
# Restore database to specific timestamp
npx convex restore \
  --deployment prod:anydebate-ai \
  --timestamp "2024-01-15T14:30:00Z"

# Verify restoration
npx convex query sessions:list --deployment prod:anydebate-ai
\`\`\`

### Recovery Procedures

#### Scenario 1: Accidental Data Deletion

\`\`\`bash
# 1. Identify the deletion timestamp
# Check Convex dashboard audit logs

# 2. Create a new deployment for recovery
npx convex deploy --create recovery-$(date +%s)

# 3. Restore to timestamp before deletion
npx convex restore \
  --deployment recovery-xxxxx \
  --timestamp "2024-01-15T14:00:00Z"

# 4. Export recovered data
npx convex export --deployment recovery-xxxxx --output recovered-data.zip

# 5. Import specific tables to production
npx convex import recovered-data.zip \
  --deployment prod:anydebate-ai \
  --tables sessions,messages
\`\`\`

#### Scenario 2: Corrupted Data

\`\`\`bash
# 1. Identify affected tables and time range
# 2. Export clean data from before corruption
npx convex export \
  --deployment prod:anydebate-ai \
  --timestamp "2024-01-15T12:00:00Z" \
  --tables sessions,messages \
  --output clean-data.zip

# 3. Delete corrupted data
npx convex run cleanup:deleteCorruptedData \
  --deployment prod:anydebate-ai \
  --args '{"startTime": "2024-01-15T12:00:00Z"}'

# 4. Import clean data
npx convex import clean-data.zip --deployment prod:anydebate-ai
\`\`\`

#### Scenario 3: Complete Database Failure

\`\`\`bash
# Convex handles infrastructure failures automatically
# No manual intervention required for hardware/network failures

# For application-level issues:
# 1. Check Convex status page: status.convex.dev
# 2. Review deployment logs in dashboard
# 3. Contact Convex support if unresolved
\`\`\`

---

## Data Migration

### Schema Evolution

Convex supports **zero-downtime schema migrations** through its schema evolution system.

#### Adding a New Field

\`\`\`typescript
// convex/schema.ts - Before
export default defineSchema({
  sessions: defineTable({
    userId: v.id("users"),
    mode: v.string(),
    status: v.string()
  })
})

// After - Add optional field first
export default defineSchema({
  sessions: defineTable({
    userId: v.id("users"),
    mode: v.string(),
    status: v.string(),
    metadata: v.optional(v.object({
      tags: v.array(v.string()),
      notes: v.string()
    }))
  })
})

// Deploy migration
npx convex deploy --deployment prod:anydebate-ai
\`\`\`

#### Backfilling Data

\`\`\`typescript
// convex/migrations/backfill-session-metadata.ts
import { internalMutation } from "./_generated/server"
import { v } from "convex/values"

export const backfillSessionMetadata = internalMutation({
  args: {},
  handler: async (ctx) => {
    const sessions = await ctx.db.query("sessions").collect()
    
    for (const session of sessions) {
      if (!session.metadata) {
        await ctx.db.patch(session._id, {
          metadata: {
            tags: [],
            notes: ""
          }
        })
      }
    }
    
    return { updated: sessions.length }
  }
})
\`\`\`

\`\`\`bash
# Run backfill migration
npx convex run migrations:backfillSessionMetadata --deployment prod:anydebate-ai
\`\`\`

#### Renaming a Field

\`\`\`typescript
// Step 1: Add new field, keep old field
export default defineSchema({
  sessions: defineTable({
    userId: v.id("users"),
    sessionMode: v.string(),  // NEW
    mode: v.string()          // OLD - keep for compatibility
  })
})

// Step 2: Deploy and backfill new field
// convex/migrations/copy-mode-to-session-mode.ts
export const copyModeField = internalMutation({
  handler: async (ctx) => {
    const sessions = await ctx.db.query("sessions").collect()
    for (const session of sessions) {
      await ctx.db.patch(session._id, {
        sessionMode: session.mode
      })
    }
  }
})

// Step 3: Update all application code to use sessionMode

// Step 4: Remove old field from schema
export default defineSchema({
  sessions: defineTable({
    userId: v.id("users"),
    sessionMode: v.string()  // Only new field remains
  })
})
\`\`\`

### Data Migration Rollback

\`\`\`typescript
// Always create rollback migrations alongside forward migrations

// convex/migrations/add-session-metadata.ts
export const up = internalMutation({
  handler: async (ctx) => {
    // Add metadata field...
  }
})

export const down = internalMutation({
  handler: async (ctx) => {
    const sessions = await ctx.db.query("sessions").collect()
    for (const session of sessions) {
      await ctx.db.patch(session._id, {
        metadata: undefined  // Remove field
      })
    }
  }
})
\`\`\`

---

## Query Optimization

### Index Strategy

Convex automatically optimizes queries, but defining proper indexes improves performance.

\`\`\`typescript
// convex/schema.ts
export default defineSchema({
  sessions: defineTable({
    userId: v.id("users"),
    organizationId: v.id("organizations"),
    workspaceId: v.id("workspaces"),
    status: v.string(),
    createdAt: v.number()
  })
    .index("by_user", ["userId"])  // User's sessions
    .index("by_workspace", ["workspaceId"])  // Workspace sessions
    .index("by_organization", ["organizationId"])  // Org sessions
    .index("by_status", ["status"])  // Filter by status
    .index("by_user_and_status", ["userId", "status"])  // Compound index
    .index("by_workspace_and_created", ["workspaceId", "createdAt"])  // Sorted
})
\`\`\`

### Query Performance Patterns

#### ✅ Good: Use indexes

\`\`\`typescript
// Fast - uses "by_user" index
const userSessions = await ctx.db
  .query("sessions")
  .withIndex("by_user", q => q.eq("userId", userId))
  .collect()
\`\`\`

#### ❌ Bad: Full table scan

\`\`\`typescript
// Slow - no index on 'mode'
const compareSessions = await ctx.db
  .query("sessions")
  .filter(q => q.eq(q.field("mode"), "compare"))
  .collect()
\`\`\`

#### ✅ Good: Add index for frequent filters

\`\`\`typescript
// schema.ts
sessions: defineTable({...})
  .index("by_mode", ["mode"])  // Add this index

// Now fast
const compareSessions = await ctx.db
  .query("sessions")
  .withIndex("by_mode", q => q.eq("mode", "compare"))
  .collect()
\`\`\`

### Pagination for Large Datasets

\`\`\`typescript
// Good - paginated query
export const listSessionsPaginated = query({
  args: {
    paginationOpts: paginationOptsValidator,
    userId: v.id("users")
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sessions")
      .withIndex("by_user", q => q.eq("userId", args.userId))
      .order("desc")  // Newest first
      .paginate(args.paginationOpts)
  }
})
\`\`\`

### Query Performance Monitoring

\`\`\`typescript
// Add performance logging to slow queries
export const slowQuery = query({
  handler: async (ctx) => {
    const start = Date.now()
    
    const result = await ctx.db.query("sessions").collect()
    
    const duration = Date.now() - start
    if (duration > 1000) {
      console.warn(`[SLOW QUERY] Query took ${duration}ms`)
    }
    
    return result
  }
})
\`\`\`

---

## Monitoring & Alerting

### Convex Dashboard Metrics

**Key Metrics to Monitor:**

1. **Query Performance**
   - P50, P95, P99 latencies
   - Queries per second
   - Failed queries

2. **Database Size**
   - Total documents
   - Storage usage (MB/GB)
   - Growth rate

3. **Function Execution**
   - Mutation success rate
   - Query cache hit rate
   - Function errors

4. **Real-time Connections**
   - Active WebSocket connections
   - Subscription count
   - Connection errors

### Custom Monitoring

\`\`\`typescript
// convex/monitoring/metrics.ts
import { internalQuery } from "../_generated/server"

export const getDatabaseMetrics = internalQuery({
  handler: async (ctx) => {
    const [
      totalSessions,
      totalMessages,
      totalArtifacts,
      activeUsers
    ] = await Promise.all([
      ctx.db.query("sessions").collect().then(r => r.length),
      ctx.db.query("messages").collect().then(r => r.length),
      ctx.db.query("artifacts").collect().then(r => r.length),
      ctx.db.query("users")
        .filter(q => q.gt(q.field("lastActiveAt"), Date.now() - 86400000))
        .collect().then(r => r.length)
    ])
    
    return {
      totalSessions,
      totalMessages,
      totalArtifacts,
      activeUsers,
      timestamp: Date.now()
    }
  }
})
\`\`\`

### Alerting Rules

**Critical Alerts (Page on-call):**
- Database unavailable
- Query latency P95 > 5s
- Error rate > 5%
- Storage > 90% of limit

**Warning Alerts (Slack notification):**
- Query latency P95 > 2s
- Error rate > 1%
- Storage > 75% of limit
- Unusual query patterns

### Integration with Monitoring Tools

\`\`\`bash
# Send metrics to external monitoring (e.g., Datadog, New Relic)
# Run via cron job every 5 minutes

npx convex run monitoring:getDatabaseMetrics --deployment prod:anydebate-ai \
  | curl -X POST https://api.datadoghq.com/api/v1/series \
    -H "DD-API-KEY: ${DATADOG_API_KEY}" \
    -d @-
\`\`\`

---

## Security & Access Control

### Access Levels

\`\`\`typescript
// convex/auth.ts
export const requireAuth = async (ctx: QueryCtx | MutationCtx) => {
  const identity = await ctx.auth.getUserIdentity()
  if (!identity) {
    throw new Error("Unauthenticated")
  }
  return identity
}

export const requireOrganizationAccess = async (
  ctx: QueryCtx | MutationCtx,
  organizationId: Id<"organizations">
) => {
  const identity = await requireAuth(ctx)
  
  const membership = await ctx.db
    .query("organizationMemberships")
    .withIndex("by_user_and_org", q => 
      q.eq("userId", identity.subject).eq("organizationId", organizationId)
    )
    .first()
  
  if (!membership) {
    throw new Error("Access denied")
  }
  
  return { identity, membership }
}
\`\`\`

### Row-Level Security

\`\`\`typescript
// All queries automatically filter by user access
export const listSessions = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, args) => {
    // Verify user has access to workspace
    await requireWorkspaceAccess(ctx, args.workspaceId)
    
    // Only return sessions user has access to
    return await ctx.db
      .query("sessions")
      .withIndex("by_workspace", q => q.eq("workspaceId", args.workspaceId))
      .collect()
  }
})
\`\`\`

### Audit Logging

\`\`\`typescript
// convex/audit/log.ts
export const logAction = internalMutation({
  args: {
    userId: v.id("users"),
    action: v.string(),
    resourceType: v.string(),
    resourceId: v.string(),
    metadata: v.optional(v.any())
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("auditLogs", {
      ...args,
      timestamp: Date.now(),
      ipAddress: null,  // Add from request context if available
    })
  }
})
\`\`\`

---

## Disaster Recovery

### Recovery Time Objectives (RTO/RPO)

| Scenario | RTO | RPO | Procedure |
|----------|-----|-----|-----------|
| Hardware failure | 0s (automatic) | 0s | Convex auto-failover |
| Data corruption | 5 minutes | 1 minute | Point-in-time restore |
| Accidental deletion | 10 minutes | 1 minute | Selective restore |
| Region outage | 30 seconds | 0s | Multi-region failover |
| Complete service loss | Contact support | 1 minute | Convex team recovery |

### Disaster Recovery Plan

**Phase 1: Detection (0-2 minutes)**
1. Automated monitoring detects issue
2. Alert sent to on-call engineer
3. Verify issue via Convex dashboard

**Phase 2: Assessment (2-5 minutes)**
1. Determine scope of impact
2. Identify root cause
3. Decide recovery approach

**Phase 3: Recovery (5-15 minutes)**
1. Execute recovery procedure (see Backup & Recovery)
2. Verify data integrity
3. Test critical functionality

**Phase 4: Validation (15-30 minutes)**
1. Run smoke tests
2. Monitor error rates
3. Verify user access

**Phase 5: Post-Mortem (within 24 hours)**
1. Document incident timeline
2. Identify preventive measures
3. Update runbooks

---

## Performance Tuning

### Database Optimization Checklist

- [ ] **Indexes**: All frequently queried fields indexed
- [ ] **Pagination**: Large result sets paginated
- [ ] **Caching**: Query results cached where appropriate
- [ ] **Batch Operations**: Multiple writes batched into transactions
- [ ] **Denormalization**: Hot-path queries optimized with redundant data

### Query Caching Strategy

\`\`\`typescript
// Cache expensive computations
export const getCachedSessionStats = query({
  args: { sessionId: v.id("sessions") },
  handler: async (ctx, args) => {
    // Check cache first
    const cached = await ctx.db
      .query("sessionStatsCache")
      .withIndex("by_session", q => q.eq("sessionId", args.sessionId))
      .first()
    
    if (cached && Date.now() - cached.computedAt < 300000) {  // 5 min TTL
      return cached.stats
    }
    
    // Compute if not cached
    const stats = await computeSessionStats(ctx, args.sessionId)
    
    // Update cache
    await ctx.db.insert("sessionStatsCache", {
      sessionId: args.sessionId,
      stats,
      computedAt: Date.now()
    })
    
    return stats
  }
})
\`\`\`

### Batch Operations

\`\`\`typescript
// Good - batch inserts
export const createMultipleMessages = mutation({
  args: { messages: v.array(v.object({...})) },
  handler: async (ctx, args) => {
    await Promise.all(
      args.messages.map(msg => ctx.db.insert("messages", msg))
    )
  }
})
\`\`\`

---

## Operational Procedures

### Daily Operations

**Morning Checks (9:00 AM):**
- [ ] Review overnight error logs
- [ ] Check database size metrics
- [ ] Verify backup completion
- [ ] Review performance dashboards

**Weekly Tasks:**
- [ ] Review slow query report
- [ ] Analyze storage growth trends
- [ ] Update capacity projections
- [ ] Review security audit logs

**Monthly Tasks:**
- [ ] Full backup integrity test
- [ ] Disaster recovery drill
- [ ] Performance optimization review
- [ ] Schema optimization assessment

### Runbooks

**Runbook: High Database Latency**

1. Check Convex dashboard for spikes
2. Identify slow queries in logs
3. Review recent deployments for schema changes
4. Add missing indexes if needed
5. Contact Convex support if unresolved

**Runbook: Storage Limit Approaching**

1. Analyze table sizes in dashboard
2. Identify large tables (likely `messages`, `artifacts`)
3. Archive old data to separate deployment
4. Implement data retention policy
5. Request storage limit increase if needed

---

## References

- [Convex Documentation](https://docs.convex.dev/)
- [Convex Dashboard](https://dashboard.convex.dev/)
- [Convex Status Page](https://status.convex.dev/)
- [Convex Community Slack](https://convex.dev/community)

---

**Emergency Contacts:**
- On-call Engineer: [Insert contact]
- Convex Support: support@convex.dev
- Escalation Path: [Insert escalation procedure]

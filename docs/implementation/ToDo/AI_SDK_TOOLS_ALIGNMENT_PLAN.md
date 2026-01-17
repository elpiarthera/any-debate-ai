# AI SDK Tools Alignment Plan (ACCURATE)

## Overview

This document outlines the ACTUAL work needed based on verified codebase analysis. AnyDebate already has significant AI SDK integration but needs to migrate from `@ai-sdk/react` to `@ai-sdk-tools/store` and add `@ai-sdk-tools/agents` for orchestration.

**Philosophy**: We do not recreate the wheel but use modern, easy-to-use, out-of-the-box frameworks/SDKs to build AnyDebate. We leverage Vercel AI Gateway for seamless access to 100+ models from multiple providers without installing individual provider packages.

## Current State (VERIFIED)

### ✅ Already Implemented
- **AI SDK Integration**: `streamText` working in `app/api/chat/route.ts`
- **Artifacts**: Using `@ai-sdk-tools/artifacts` in `lib/ai-tools/artifact-tools.ts`
- **State Management**: Using `@ai-sdk/react`'s `useChat` in `hooks/useAIChat.ts`
- **Agent Configuration**: Complete system with roles, personas, frameworks
- **Agent Templates**: 100% complete with 8 presets + 9 scenarios
- **UI/UX**: All three modes fully implemented
- **Tools**: 4 artifact creation tools (document, table, checklist, chart)
- **Vercel AI Gateway**: Access to 100+ models out of the box
- **User Dashboard**: 100% complete at `/overview` and `/dashboard` routes
  - Session management with localStorage persistence
  - Agent library with favorites
  - Quick actions for common tasks
  - Local analytics tracking
  - Recent activity timeline
  - Mobile-first responsive design

### ❌ What's Missing
- **@ai-sdk-tools/store**: Installed but NOT being used (still using @ai-sdk/react)
- **@ai-sdk-tools/agents**: NOT installed, NOT implemented
- **Workflow Patterns**: No Parallelization, Evaluator-Optimizer, or Orchestrator-Workers
- **Agent Instances**: Templates don't create real AI SDK Agent instances
- **Provider Wrapper**: No @ai-sdk-tools/store Provider in layout.tsx

### 📦 Packages Status

**Installed & Working:**
\`\`\`json
"@ai-sdk-tools/artifacts": "latest",  // ✅ BEING USED
"@ai-sdk-tools/store": "^0.1.0",      // ✅ INSTALLED, ❌ NOT USED
"@ai-sdk/openai": "2.0.38",           // ✅ BEING USED (for Vercel AI Gateway)
"@ai-sdk/react": "latest",            // ✅ BEING USED (needs replacement)
"@ai-sdk/togetherai": "latest",       // ✅ INSTALLED
"ai": "latest"                        // ✅ BEING USED
\`\`\`

**Need to Install:**
\`\`\`bash
npm install @ai-sdk-tools/agents
\`\`\`

**NOT Installing (Using Vercel AI Gateway Instead):**
- ❌ @ai-sdk/anthropic - Not needed, use "anthropic/claude-3-5-sonnet" via AI Gateway
- ❌ @ai-sdk/google - Not needed, use "google/gemini-pro" via AI Gateway
- ❌ Other provider packages - All accessible via AI Gateway with model strings

### 🌐 Vercel AI Gateway Models

**Available Models (100+ models from multiple providers):**

**xAI (Grok):**
- `xai/grok-3-mini-fast` - 131K context, $0.60/M input, $4.00/M output
- `xai/grok-2-1212` - 131K context
- `xai/grok-vision-beta` - Vision support

**OpenAI:**
- `openai/gpt-4o` - Latest GPT-4 Omni
- `openai/gpt-4o-mini` - Faster, cheaper
- `openai/o1` - Reasoning model
- `openai/o1-mini` - Reasoning model (mini)

**Anthropic (via AI Gateway):**
- `anthropic/claude-3-5-sonnet` - Latest Claude
- `anthropic/claude-3-opus` - Most capable
- `anthropic/claude-3-haiku` - Fastest

**Google (via AI Gateway):**
- `google/gemini-2.0-flash-exp` - Latest Gemini
- `google/gemini-1.5-pro` - Pro version

**Meta (via AI Gateway):**
- `meta/llama-3.3-70b-instruct` - Latest Llama

**Usage**: Simply pass model string to AI SDK, no provider package needed!

\`\`\`typescript
// No need to import provider packages!
const result = await streamText({
  model: "anthropic/claude-3-5-sonnet",  // Works out of the box
  prompt: "Hello"
})
\`\`\`

---

## Implementation Phases

---

## Phase 1: Migrate to @ai-sdk-tools/store (4-5 hours)

### Task 1.1: Install Missing Package
**Priority**: P0 (Blocking)  
**Time**: 5 minutes

**Actions:**
\`\`\`bash
npm install @ai-sdk-tools/agents
\`\`\`

**Success Criteria:**
- Package installed without conflicts
- TypeScript types available

---

### Task 1.2: Add Provider to Layout
**Priority**: P0 (Blocking)  
**Time**: 30 minutes

**Current State:**
- No Provider wrapper in `app/layout.tsx`
- Using @ai-sdk/react directly

**Actions:**
1. Import Provider from @ai-sdk-tools/store
2. Wrap app with Provider
3. Configure initial state

**Files to Update:**
- `app/layout.tsx` - Add Provider wrapper

**Code Example:**
\`\`\`tsx
// app/layout.tsx
import { Provider } from '@ai-sdk-tools/store'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider initialMessages={[]}>
          {children}
        </Provider>
      </body>
    </html>
  )
}
\`\`\`

**Success Criteria:**
- Provider wraps entire app
- No errors in console
- Store accessible from components

---

### Task 1.3: Migrate useAIChat Hook
**Priority**: P0 (Blocking)  
**Time**: 2-3 hours

**Current State:**
- `hooks/useAIChat.ts` uses `@ai-sdk/react`'s useChat
- Custom error handling and retry logic
- Connection status management

**Actions:**
1. Replace `import { useChat } from "@ai-sdk/react"` with `import { useChat } from "@ai-sdk-tools/store"`
2. Update to use DefaultChatTransport
3. Keep existing error handling and retry logic
4. Test all functionality

**Files to Update:**
- `hooks/useAIChat.ts` - Replace useChat import and usage

**Code Example:**
\`\`\`typescript
// hooks/useAIChat.ts
import { useChat } from "@ai-sdk-tools/store"  // Replace @ai-sdk/react
import { DefaultChatTransport } from "ai"

export function useAIChat(options: UseAIChatOptions) {
  
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: originalHandleSubmit,
    isLoading,
    error,
    setInput,
    reload,
    stop,
  } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),  // Add transport
    body: {
      model,  // Model string like "anthropic/claude-3-5-sonnet"
      agentConfig,
      conversationContext,
    },
    // ... existing callbacks ...
  })
  
}
\`\`\`

**Success Criteria:**
- useAIChat works with @ai-sdk-tools/store
- All existing functionality preserved
- Error handling still works
- Retry logic still works
- Performance improved (3-5x faster)

---

### Task 1.4: Update Mode Components
**Priority**: P0 (Blocking)  
**Time**: 1-2 hours

**Current State:**
- Mode components use useAIChat hook
- Should work automatically after hook migration

**Actions:**
1. Test Compare Mode with new store
2. Test Debate Mode with new store
3. Test Auto-Debate Mode with new store
4. Fix any issues

**Files to Test:**
- `components/chat/modes/CompareMode.tsx`
- `components/chat/modes/DebateMode.tsx`
- `components/chat/modes/AutoDebateMode.tsx`

**Success Criteria:**
- All modes work with @ai-sdk-tools/store
- No regressions
- Performance improved

---

## Phase 2: Implement @ai-sdk-tools/agents (9-13 hours)

### Task 2.1: Create Agent Factory
**Priority**: P0 (Critical)  
**Time**: 2-3 hours

**Current State:**
- Agent templates exist but don't create Agent instances
- No integration with @ai-sdk-tools/agents

**Actions:**
1. Create agent factory that converts templates to Agent instances
2. Map role/persona/framework to dynamic instructions
3. Add model selection based on agent config

**Files to Create:**
- `lib/ai/agents/agent-factory.ts` - Factory to create Agent instances

**Code Example:**
\`\`\`typescript
// lib/ai/agents/agent-factory.ts
import { Agent } from '@ai-sdk-tools/agents'
import { generateSystemPrompt } from '@/lib/ai-utils'
import type { AgentConfig } from '@/lib/agent-config/types'

export function createAgentFromConfig(config: AgentConfig): Agent {
  const modelString = config.model // e.g., "anthropic/claude-3-5-sonnet"
  
  return new Agent({
    name: config.name,
    model: modelString,  // Just pass the string!
    instructions: (context) => {
      // Use existing generateSystemPrompt function
      return generateSystemPrompt(config)
    },
    temperature: config.temperature ?? 0.7,
    maxTokens: config.maxTokens ?? 1000,
  })
}
\`\`\`

**Success Criteria:**
- Agent factory creates real Agent instances
- Dynamic instructions work
- Model selection works via AI Gateway
- Temperature and max tokens applied
- **Agent factory integrates with dashboard's agent library**
- **Agents created from dashboard's agent templates work correctly**

---

### Task 2.2: Integrate Agent Factory with Dashboard Agent Library
**Priority**: P0 (Critical)  
**Time**: 1-2 hours

**Current State:**
- Dashboard has complete agent library at `/overview` and `/dashboard`
- Agent library uses `useAgentLibrary` hook
- Agents stored in localStorage
- Agent templates system is 100% complete

**Actions:**
1. Update agent library to use agent factory when creating agents
2. Ensure agent selection from dashboard creates proper Agent instances
3. Test "Quick Select" functionality from dashboard
4. Verify favorites system works with new agent factory

**Files to Update:**
- `hooks/dashboard/useAgentLibrary.ts` - Integrate with agent factory
- `components/dashboard/AgentLibrary.tsx` - Update agent selection
- `components/dashboard/QuickActions.tsx` - Update "New Debate" action

**Code Example:**
\`\`\`typescript
// hooks/dashboard/useAgentLibrary.ts
import { createAgentFromConfig } from '@/lib/ai/agents/agent-factory'

export function useAgentLibrary() {
  const [agents, setAgents] = useState<Agent[]>([])
  
  // Load agents from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('agent-library')
    if (stored) {
      setAgents(JSON.parse(stored))
    }
  }, [])
  
  // Create Agent instance from library agent
  const createAgentInstance = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId)
    if (!agent) return null
    
    // Use agent factory to create real Agent instance
    return createAgentFromConfig(agent)
  }
  
  return { agents, createAgentInstance, /* ... other methods */ }
}
\`\`\`

**Success Criteria:**
- Agent library integrates with agent factory
- Agent selection creates proper Agent instances
- Quick actions work with new API routes
- Favorites system preserved
- No regressions in dashboard functionality

---

### Task 2.3: Model Selection UI
**Priority**: P1 (Important)  
**Time**: 1-2 hours


---

### Task 2.4: Integrate Artifacts with Agent Workflows
**Priority**: P0 (Critical)  
**Time**: 1 hour


---

## Phase 3: Implement Workflow Patterns (9-13 hours)

### Task 3.1: Create Separate API Routes for Each Mode
**Priority**: P0 (Critical)  
**Time**: 2-3 hours

**Current State:**
- Only one API route exists: `app/api/chat/route.ts`
- All three modes use the same endpoint
- Need separate routes for different workflow patterns

**Why Separate Routes:**
- ✅ Clear separation of concerns - Each mode has its own logic
- ✅ Easier debugging - Know exactly which route is failing
- ✅ Independent optimization - Can tune each mode separately
- ✅ No mode switching logic - No complex if/else based on mode parameter
- ✅ Better code organization - Each file is focused on one pattern
- ✅ Easier testing - Test each mode in isolation

**Actions:**
1. Create `app/api/chat/compare/route.ts` for Compare Mode (Parallelization)
2. Create `app/api/chat/debate/route.ts` for Debate Mode (Evaluator-Optimizer)
3. Create `app/api/chat/auto-debate/route.ts` for Auto-Debate Mode (Orchestrator-Workers)
4. Update frontend to call correct endpoint based on mode
5. Keep existing route as fallback for backward compatibility

**Files to Create:**

#### 1. `app/api/chat/compare/route.ts` - Parallelization Pattern

**Purpose**: Multiple AI models respond to the same prompt simultaneously

**Implementation Details:**
- Accept array of agent configurations
- Create Agent instance for each configuration using agent factory
- Execute all agents in parallel with `Promise.all()`
- Stream all responses simultaneously
- Include artifact tools in all agents

**Request Body:**
\`\`\`typescript
{
  messages: Message[],
  agentConfigs: AgentConfig[],  // Array of 2-4 agents
  conversationContext?: ConversationContext
}
\`\`\`

**Response:**
- Multiple streams, one per agent
- Each stream includes agent metadata (name, model, role)
- Artifact creation events from any agent

**Code Structure:**
\`\`\`typescript
// app/api/chat/compare/route.ts
import { createAgentFromConfig } from '@/lib/ai/agents/agent-factory'
import { artifactTools } from '@/lib/ai-tools/artifact-tools'

export async function POST(req: Request) {
  const { messages, agentConfigs } = await req.json()
  
  // Create agents from configs (each with different model)
  const agents = agentConfigs.map(config => 
    createAgentFromConfig({
      ...config,
      tools: artifactTools  // All agents can create artifacts
    })
  )
  
  // Execute in parallel - Parallelization pattern
  const streams = await Promise.all(
    agents.map(agent => agent.stream({ messages }))
  )
  
  // Return combined stream with agent metadata
  return new Response(
    combineStreams(streams, agentConfigs),
    { headers: { 'Content-Type': 'text/event-stream' } }
  )
}
\`\`\`

**Success Criteria:**
- 2-4 agents respond simultaneously
- Different models work (e.g., GPT-4, Claude, Gemini)
- Streaming works for all agents
- Artifact creation works from any agent
- No blocking between agents

---

#### 2. `app/api/chat/debate/route.ts` - Evaluator-Optimizer Pattern

**Purpose**: Two agents critique each other's responses in a back-and-forth debate

**Implementation Details:**
- Accept two agent configurations (Agent A and Agent B)
- Agent A responds first
- Agent B critiques Agent A's response
- Agent A refines based on critique (optional)
- Use handoff system from @ai-sdk-tools/agents
- Stream each turn sequentially

**Request Body:**
\`\`\`typescript
{
  messages: Message[],
  agentA: AgentConfig,  // First responder
  agentB: AgentConfig,  // Critic
  rounds?: number,      // Number of debate rounds (default: 1)
  conversationContext?: ConversationContext
}
\`\`\`

**Response:**
- Sequential stream with turn indicators
- Each turn includes agent metadata
- Critique metadata (what was critiqued, why)
- Artifact creation events

**Code Structure:**
\`\`\`typescript
// app/api/chat/debate/route.ts
import { Agent } from '@ai-sdk-tools/agents'
import { createAgentFromConfig } from '@/lib/ai/agents/agent-factory'
import { artifactTools } from '@/lib/ai-tools/artifact-tools'

export async function POST(req: Request) {
  const { messages, agentA, agentB, rounds = 1 } = await req.json()
  
  // Create agents with handoff capability
  const agentAInstance = createAgentFromConfig({
    ...agentA,
    tools: artifactTools,
    handoffs: ['agentB']  // Can hand off to Agent B
  })
  
  const agentBInstance = createAgentFromConfig({
    ...agentB,
    tools: artifactTools,
    handoffs: ['agentA']  // Can hand off back to Agent A
  })
  
  // Evaluator-Optimizer pattern
  let currentMessages = messages
  const stream = new TransformStream()
  const writer = stream.writable.getWriter()
  
  for (let round = 0; round < rounds; round++) {
    // Agent A responds
    const responseA = await agentAInstance.stream({ 
      messages: currentMessages 
    })
    await writeToStream(writer, responseA, 'agentA', round)
    
    // Agent B critiques
    const critiquePrompt = buildCritiquePrompt(responseA)
    const responseB = await agentBInstance.stream({ 
      messages: [...currentMessages, critiquePrompt] 
    })
    await writeToStream(writer, responseB, 'agentB', round)
    
    currentMessages = [...currentMessages, responseA, responseB]
  }
  
  writer.close()
  return new Response(stream.readable, {
    headers: { 'Content-Type': 'text/event-stream' }
  })
}
\`\`\`

**Success Criteria:**
- Agents take turns responding
- Critiques reference previous responses
- Handoff system works correctly
- Multiple rounds supported
- Artifact creation works in both agents
- Streaming shows turn-by-turn progress

---

#### 3. `app/api/chat/auto-debate/route.ts` - Orchestrator-Workers Pattern

**Purpose**: Orchestrator agent manages debate flow between multiple specialist agents

**Implementation Details:**
- Accept orchestrator config + array of worker agent configs
- Orchestrator decides which agent speaks next
- Workers respond based on their role/persona/framework
- Orchestrator synthesizes final response
- Use programmatic routing from @ai-sdk-tools/agents
- Stream orchestrator decisions and worker responses

**Request Body:**
\`\`\`typescript
{
  messages: Message[],
  orchestrator: AgentConfig,     // Manages debate flow
  workers: AgentConfig[],        // 2-6 specialist agents
  rounds?: number,               // Number of debate rounds
  synthesize?: boolean,          // Orchestrator synthesizes at end
  conversationContext?: ConversationContext
}
\`\`\`

**Response:**
- Stream with orchestrator decisions
- Worker responses with metadata
- Final synthesis (if enabled)
- Artifact creation events

**Code Structure:**
\`\`\`typescript
// app/api/chat/auto-debate/route.ts
import { Agent } from '@ai-sdk-tools/agents'
import { createAgentFromConfig } from '@/lib/ai/agents/agent-factory'
import { artifactTools } from '@/lib/ai-tools/artifact-tools'

export async function POST(req: Request) {
  const { 
    messages, 
    orchestrator, 
    workers, 
    rounds = 3,
    synthesize = true 
  } = await req.json()
  
  // Create orchestrator with handoffs to all workers
  const orchestratorAgent = createAgentFromConfig({
    ...orchestrator,
    tools: artifactTools,
    handoffs: workers.map(w => w.id),  // Can hand off to any worker
    instructions: (context) => `
      You are the debate orchestrator. Your role is to:
      1. Decide which agent should speak next based on the topic
      2. Ensure all perspectives are heard
      3. Keep the debate focused and productive
      4. Synthesize the final conclusion
      
      Available agents: ${workers.map(w => `${w.name} (${w.role})`).join(', ')}
    `
  })
  
  // Create worker agents
  const workerAgents = workers.map(config =>
    createAgentFromConfig({
      ...config,
      tools: artifactTools
    })
  )
  
  // Orchestrator-Workers pattern
  const stream = new TransformStream()
  const writer = stream.writable.getWriter()
  
  let currentMessages = messages
  
  for (let round = 0; round < rounds; round++) {
    // Orchestrator decides next speaker
    const decision = await orchestratorAgent.decide({ 
      messages: currentMessages,
      availableAgents: workers
    })
    
    await writeDecision(writer, decision, round)
    
    // Selected worker responds
    const selectedWorker = workerAgents.find(a => a.id === decision.agentId)
    const response = await selectedWorker.stream({ 
      messages: currentMessages 
    })
    
    await writeToStream(writer, response, decision.agentId, round)
    currentMessages = [...currentMessages, response]
  }
  
  // Orchestrator synthesizes final response
  if (synthesize) {
    const synthesis = await orchestratorAgent.stream({
      messages: [
        ...currentMessages,
        { role: 'user', content: 'Synthesize the debate into a final conclusion.' }
      ]
    })
    await writeToStream(writer, synthesis, 'orchestrator', 'synthesis')
  }
  
  writer.close()
  return new Response(stream.readable, {
    headers: { 'Content-Type': 'text/event-stream' }
  })
}
\`\`\`

**Success Criteria:**
- Orchestrator makes intelligent routing decisions
- Workers respond based on their specialization
- All agents get opportunity to contribute
- Final synthesis captures key points
- Artifact creation works from any agent
- Streaming shows orchestrator decisions and worker responses

---

#### 4. Task 3.2: Integrate Session Persistence with Convex Database
**Priority**: P0 (Critical)  
**Time**: 2-3 hours


**Current State:**
- Dashboard has session management with localStorage (temporary)
- Convex database schema has `sessions` and `messages` tables
- No integration with AI SDK workflows yet
- Need to persist sessions to Convex for multi-device sync and data integrity

**Convex Schema Reference:**
\`\`\`typescript
// sessions table
{
  organizationId: string,
  workspaceId: string,
  userId: string,
  title: string,
  mode: "compare" | "debate" | "auto-debate",
  status: "active" | "completed" | "archived",
  config: { rounds, currentRound, speakingOrder, autoDebateStatus },
  metadata: { tags, description, visibility },
  messageCount: number,
  tokensUsed: number,
  duration: number,
  lastActivityAt: number,
  createdAt: number,
  updatedAt: number
}
\`\`\`

**Actions:**
1. Create Convex mutations for session management
2. Create Convex queries for session retrieval
3. Update API routes to save sessions to Convex
4. Update dashboard to load sessions from Convex
5. Migrate existing localStorage sessions to Convex (one-time)
6. Track session duration and message count in Convex

**Files to Create:**
- `convex/sessions.ts` - Mutations and queries for sessions
- `convex/messages.ts` - Mutations and queries for messages

**Files to Update:**
- `app/api/chat/compare/route.ts` - Save session to Convex
- `app/api/chat/debate/route.ts` - Save session to Convex
- `app/api/chat/auto-debate/route.ts` - Save session to Convex
- `hooks/dashboard/useSessionManagement.ts` - Load from Convex
- `hooks/useAIChat.ts` - Integrate with Convex mutations

**Code Example:**
\`\`\`typescript
// convex/sessions.ts
import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

export const createSession = mutation({
  args: {
    organizationId: v.string(),
    workspaceId: v.id("workspaces"),
    userId: v.string(),
    title: v.string(),
    mode: v.union(v.literal("compare"), v.literal("debate"), v.literal("auto-debate")),
    config: v.object({
      rounds: v.optional(v.number()),
      currentRound: v.optional(v.number()),
      speakingOrder: v.optional(v.array(v.string())),
    }),
  },
  handler: async (ctx, args) => {
    const sessionId = await ctx.db.insert("sessions", {
      ...args,
      status: "active",
      metadata: { tags: [], visibility: "private" },
      messageCount: 0,
      tokensUsed: 0,
      duration: 0,
      lastActivityAt: Date.now(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
    return sessionId
  },
})

export const updateSession = mutation({
  args: {
    sessionId: v.id("sessions"),
    messageCount: v.optional(v.number()),
    tokensUsed: v.optional(v.number()),
    duration: v.optional(v.number()),
    status: v.optional(v.union(v.literal("active"), v.literal("completed"), v.literal("archived"))),
  },
  handler: async (ctx, args) => {
    const { sessionId, ...updates } = args
    await ctx.db.patch(sessionId, {
      ...updates,
      lastActivityAt: Date.now(),
      updatedAt: Date.now(),
    })
  },
})

export const getSessions = query({
  args: {
    organizationId: v.string(),
    workspaceId: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sessions")
      .withIndex("by_organization_and_workspace", (q) =>
        q.eq("organizationId", args.organizationId).eq("workspaceId", args.workspaceId)
      )
      .order("desc")
      .collect()
  },
})
\`\`\`

\`\`\`typescript
// hooks/useAIChat.ts
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"

export function useAIChat(options: UseAIChatOptions) {
  const createSession = useMutation(api.sessions.createSession)
  const updateSession = useMutation(api.sessions.updateSession)
  
  const [sessionId, setSessionId] = useState<Id<"sessions"> | null>(null)
  const startTime = useRef(Date.now())
  
  const { messages, /* ... */ } = useChat({
    // ... existing config
    onFinish: async (message) => {
      // Create or update session in Convex
      if (!sessionId) {
        const newSessionId = await createSession({
          organizationId: options.organizationId,
          workspaceId: options.workspaceId,
          userId: options.userId,
          title: extractTitle(messages),
          mode: options.mode,
          config: {
            rounds: options.rounds,
            speakingOrder: options.agentConfig.map(a => a.id),
          },
        })
        setSessionId(newSessionId)
      } else {
        await updateSession({
          sessionId,
          messageCount: messages.length,
          tokensUsed: calculateTokens(messages),
          duration: Math.floor((Date.now() - startTime.current) / 1000),
          status: "completed",
        })
      }
      
      options.onFinish?.(message)
    }
  })
  
  return { messages, sessionId, /* ... */ }
}
\`\`\`

\`\`\`typescript
// hooks/dashboard/useSessionManagement.ts
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

export function useSessionManagement() {
  const { organizationId, workspaceId } = useAuth()
  
  // Load sessions from Convex (real-time updates)
  const sessions = useQuery(api.sessions.getSessions, {
    organizationId,
    workspaceId,
  })
  
  return { sessions: sessions ?? [] }
}
\`\`\`

**Success Criteria:**
- Sessions saved to Convex after each debate
- Sessions load from Convex in dashboard
- Real-time updates via Convex subscriptions
- Multi-device sync works
- Session metadata includes mode, model, agents
- Resume session works with new API routes
- Session duration tracked accurately
- Message count accurate
- localStorage migration completed

---

#### 5. Task 3.3: Integrate Analytics Tracking with Convex
**Priority**: P1 (Important)  
**Time**: 1-2 hours


**Current State:**
- Dashboard has local analytics via `useLocalAnalytics` hook
- Tracks total debates, messages, time, averages
- No integration with AI SDK usage yet
- Need to persist analytics to Convex for historical tracking

**Actions:**
1. Create Convex queries for analytics aggregation
2. Track AI SDK calls in Convex
3. Track model usage (which models used most)
4. Track mode usage (Compare vs Debate vs Auto-Debate)
5. Track artifact creation
6. Update dashboard metrics to use Convex data

**Files to Create:**
- `convex/analytics.ts` - Queries for analytics aggregation

**Files to Update:**
- `hooks/dashboard/useLocalAnalytics.ts` - Load from Convex
- `components/dashboard/MetricCard.tsx` - Display Convex metrics

**Code Example:**
\`\`\`typescript
// convex/analytics.ts
import { query } from "./_generated/server"
import { v } from "convex/values"

export const getAnalytics = query({
  args: {
    organizationId: v.string(),
    workspaceId: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    const sessions = await ctx.db
      .query("sessions")
      .withIndex("by_organization_and_workspace", (q) =>
        q.eq("organizationId", args.organizationId).eq("workspaceId", args.workspaceId)
      )
      .collect()
    
    const totalDebates = sessions.length
    const totalMessages = sessions.reduce((sum, s) => sum + s.messageCount, 0)
    const totalTime = sessions.reduce((sum, s) => sum + s.duration, 0)
    const avgMessagesPerDebate = totalDebates > 0 ? totalMessages / totalDebates : 0
    
    const modeUsage = {
      compare: sessions.filter(s => s.mode === "compare").length,
      debate: sessions.filter(s => s.mode === "debate").length,
      autoDebate: sessions.filter(s => s.mode === "auto-debate").length,
    }
    
    // Get artifacts created
    const artifacts = await ctx.db
      .query("artifacts")
      .withIndex("by_workspace", (q) => q.eq("workspaceId", args.workspaceId))
      .collect()
    
    return {
      totalDebates,
      totalMessages,
      totalTime,
      avgMessagesPerDebate,
      modeUsage,
      artifactsCreated: artifacts.length,
      artifactsByType: {
        document: artifacts.filter(a => a.type === "document").length,
        table: artifacts.filter(a => a.type === "data-table").length,
        checklist: artifacts.filter(a => a.type === "checklist").length,
        chart: artifacts.filter(a => a.type === "chart").length,
      },
    }
  },
})
\`\`\`

\`\`\`typescript
// hooks/dashboard/useLocalAnalytics.ts
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

export function useLocalAnalytics() {
  const { organizationId, workspaceId } = useAuth()
  
  // Load analytics from Convex (real-time updates)
  const metrics = useQuery(api.analytics.getAnalytics, {
    organizationId,
    workspaceId,
  })
  
  return metrics ?? {
    totalDebates: 0,
    totalMessages: 0,
    totalTime: 0,
    avgMessagesPerDebate: 0,
    modeUsage: { compare: 0, debate: 0, autoDebate: 0 },
    artifactsCreated: 0,
    artifactsByType: { document: 0, table: 0, checklist: 0, chart: 0 },
  }
}
\`\`\`

**Success Criteria:**
- Analytics load from Convex in real-time
- Mode usage tracked accurately
- Artifact creation tracked by type
- Historical data preserved
- Dashboard metrics update automatically
- Multi-device sync works

---

## Phase 4: Testing & Documentation (3-4 hours)

### Task 4.1: Manual Testing
**Priority**: P0 (Critical)  
**Time**: 2-3 hours

**Current State:**
- No automated tests exist
- Need manual testing of all features
- **Dashboard is 100% complete and needs integration testing**

**Actions:**
1. Test all three modes with new workflows
2. Test artifact creation in each mode
3. Test all 4 artifact types (document, table, checklist, chart)
4. Test export functionality (PDF, PNG, CSV, JSON)
5. Test templates (30+ templates)
6. Test version history
7. Test search and filtering
8. Test mobile-first design (44px touch targets)
9. **Test dashboard session management with new API routes**
10. **Test dashboard agent library integration**
11. **Test dashboard quick actions with new workflows**
12. **Test dashboard analytics tracking**
13. **Test session resume from dashboard**
14. **Test agent selection from dashboard**

**Test Matrix:**

| Feature | Compare Mode | Debate Mode | Auto-Debate Mode |
|---------|--------------|-------------|------------------|
| Basic chat | ✅ | ✅ | ✅ |
| Create Document | ✅ | ✅ | ✅ |
| Create Table | ✅ | ✅ | ✅ |
| Create Checklist | ✅ | ✅ | ✅ |
| Create Chart | ✅ | ✅ | ✅ |
| Export PDF | ✅ | ✅ | ✅ |
| Export PNG | ✅ | ✅ | ✅ |
| Export CSV | ✅ | ✅ | ✅ |
| Export JSON | ✅ | ✅ | ✅ |
| Use Template | ✅ | ✅ | ✅ |
| Version History | ✅ | ✅ | ✅ |
| Search/Filter | ✅ | ✅ | ✅ |
| Mobile Design | ✅ | ✅ | ✅ |
| **Dashboard: Save Session** | ✅ | ✅ | ✅ |
| **Dashboard: Resume Session** | ✅ | ✅ | ✅ |
| **Dashboard: Agent Selection** | ✅ | ✅ | ✅ |
| **Dashboard: Quick Actions** | ✅ | ✅ | ✅ |
| **Dashboard: Analytics** | ✅ | ✅ | ✅ |

**Success Criteria:**
- All features work in all modes
- No regressions from previous implementation
- Export quality maintained
- Templates load correctly
- Version history preserved
- Search/filter works accurately
- Mobile-first design preserved
- **Dashboard session management works with new API routes**
- **Dashboard agent library integrates with agent factory**
- **Dashboard analytics track AI SDK usage**
- **Dashboard quick actions work with new workflows**
- **Session resume works correctly**

---

### Task 4.2: Update Documentation
**Priority**: P1 (Important)  
**Time**: 1 hour

**Actions:**
1. Document new API routes
2. Document workflow patterns
3. Document agent factory usage
4. Update README with new architecture
5. **Document dashboard integration with AI SDK**
6. **Document session persistence flow**
7. **Document analytics tracking**

**Files to Update:**
- `README.md` - Update architecture section
- `docs/guides/ai-workflows-implementation-strategy.md` - Add implementation notes
- `docs/implementation/Done/user-dashboard-implementation-plan.md` - Add AI SDK integration notes

**Success Criteria:**
- Documentation reflects actual implementation
- Clear examples for each workflow pattern
- Architecture diagram updated
- **Dashboard integration documented**
- **Session persistence flow documented**
- **Analytics tracking documented**

---

## Timeline Summary

| Phase | Tasks | Time Estimate |
|-------|-------|---------------|
| Phase 1: Migrate to @ai-sdk-tools/store | 4 tasks | 4-5 hours |
| Phase 2: Implement @ai-sdk-tools/agents | 5 tasks | 9-13 hours |
| Phase 3: Implement Workflow Patterns | 6 tasks | 9-13 hours |
| Phase 4: Testing & Documentation | 2 tasks | 3-4 hours |
| **TOTAL** | **17 tasks** | **25-35 hours** |

**Estimated Calendar Time**: 4-5 days (with 1 developer working full-time)

---

## Success Criteria (Overall)

✅ @ai-sdk-tools/store replaces @ai-sdk/react  
✅ @ai-sdk-tools/agents installed and working  
✅ Agent templates create real Agent instances  
✅ Compare Mode uses Parallelization pattern  
✅ Debate Mode uses Evaluator-Optimizer pattern  
✅ Auto-Debate Mode uses Orchestrator-Workers pattern  
✅ **Artifact tools ALREADY integrated and working**  
✅ **Artifact creation works in all three modes**  
✅ **All artifact features preserved (export, templates, version history, search)**  
✅ **Mobile-first design preserved (44px touch targets)**  
✅ **Dashboard session management integrates with AI SDK**  
✅ **Dashboard agent library works with agent factory**  
✅ **Dashboard analytics track AI SDK usage**  
✅ **Dashboard quick actions work with new workflows**  
✅ **Session persistence works correctly**  
✅ Performance improved 3-5x  
✅ All existing functionality preserved  
✅ No regressions  
✅ Vercel AI Gateway provides access to 100+ models out of the box  

---

## Key Benefits

1. **3-5x Performance Improvement** - @ai-sdk-tools/store is significantly faster
2. **Better Orchestration** - @ai-sdk-tools/agents provides built-in patterns
3. **100+ Models Out of the Box** - Vercel AI Gateway eliminates provider package management
4. **Less Code** - Use library features instead of custom implementation
5. **Production-Ready** - Battle-tested libraries with proper error handling
6. **Maintainable** - Standard patterns, easier to onboard new developers
7. **Cost Efficient** - Easy to compare and switch between models
8. **Artifact Features Preserved** - All 100% complete artifact features maintained
9. **Dashboard Integration** - Seamless integration with existing 100% complete dashboard
10. **Session Persistence** - Automatic session saving and resume functionality
11. **Analytics Tracking** - Comprehensive usage analytics and insights

---

## References

- [Vercel AI Gateway Documentation](https://vercel.com/docs/ai-gateway)
- `docs/guides/ai-workflows-implementation-strategy.md` - Workflow patterns
- `docs/guides/store-library-for-artifacts.md` - Store migration guide
- `docs/guides/ai-agent-workflows.md` - Workflow concepts
- `docs/implementation/Done/OPTION_3_AGENT_TEMPLATES_PLAN.md` - Template system
- `docs/implementation/Done/OPTION_4_ARTIFACT_FEATURES_PLAN.md` - Artifact features (100% complete)
- `docs/implementation/Done/user-dashboard-implementation-plan.md` - User dashboard (100% complete)
- `hooks/useAIChat.ts` - Current implementation
- `app/api/chat/route.ts` - Current API route
- `lib/ai-tools/artifact-tools.ts` - Current artifact tools

---

*This plan is based on VERIFIED codebase analysis and leverages modern, out-of-the-box tools to build AnyDebate efficiently.*

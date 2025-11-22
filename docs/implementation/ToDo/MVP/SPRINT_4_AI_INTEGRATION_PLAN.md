... Content omitted to save tokens. You MUST use ReadFile to get the full and current version before editing ...

### Task 4.6: Performance & Caching (2h)
- [ ] **Verify Observability**: Check Vercel dashboard for AI request logs.

### Task 4.7: Automated Testing Suite (3h)
**Goal**: Ensure reliability of the AI system through comprehensive automated tests.
- **Files**: `__tests__/lib/ai/prompts.test.ts`, `__tests__/convex/chat.test.ts`
- **Steps**:
    1.  **Prompt Logic Unit Tests**:
        - Create unit tests for `lib/ai/prompts/index.ts` to verify that Identity, Framework, and Context are correctly composed.
        - Test distinct scenarios: "Debate Mode with Pro Agent" vs "Collaboration Mode with Developer Persona".
    2.  **Agent Integration Tests (Mocked)**:
        - Implement tests for `AgentFactory` using `MockLanguageModelV1` (from AI SDK Core).
        - Verify that tool calls are correctly generated and parsed without making real API requests.
    3.  **State Management Tests**:
        - Test `ConvexMemoryProvider` to ensure it correctly stores and retrieves messages.
        - Verify `useChat` state updates correctly when receiving Data Parts.

### Task 4.8: Production Readiness (2h)
**Goal**: Prepare the AI system for real-world usage with limits and safeguards.
- **Files**: `middleware.ts`, `app/api/chat/route.ts`
- **Steps**:
    1.  **Rate Limiting**:
        - Implement per-user rate limiting (using Vercel KV or Convex mutation limits) to prevent abuse.
    2.  **Error Boundaries**:
        - Implement graceful error handling in the UI for AI timeouts or provider failures.
        - Ensure "Retry" logic preserves the current context.
    3.  **Cost Controls**:
        - Verify `maxSteps` and `maxTokens` settings in `AgentFactory` to prevent runaway loops.

... Content omitted to save tokens. You MUST use ReadFile to get the full and current version before editing ...

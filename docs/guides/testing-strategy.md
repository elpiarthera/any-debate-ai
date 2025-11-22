# Testing Strategy

**Status**: Reference Document  
**Last Updated**: 2024-01-15  
**Purpose**: Comprehensive testing approach for AnyDebateAI MVP and beyond

---

## Table of Contents

1. [Testing Philosophy](#testing-philosophy)
2. [Test Types & Coverage Goals](#test-types--coverage-goals)
3. [Test File Structure](#test-file-structure)
4. [Unit Testing](#unit-testing)
5. [Integration Testing](#integration-testing)
6. [End-to-End Testing](#end-to-end-testing)
7. [Testing Conventions](#testing-conventions)
8. [Mocking Strategies](#mocking-strategies)
9. [Load Testing](#load-testing)
10. [Testing Checklist](#testing-checklist)

---

## Testing Philosophy

### Core Principles

1. **Test User Behavior, Not Implementation**: Focus on what users experience
2. **Fast Feedback Loop**: Unit tests run in <1 second, integration <5 seconds
3. **Test Pyramid**: Many unit tests, some integration tests, few E2E tests
4. **MVP Pragmatism**: Cover critical paths first, expand coverage iteratively
5. **Real Environment Testing**: Use actual Convex/Clerk in integration tests when possible

### MVP Testing Priorities

For MVP launch, focus on:
1. ✅ **Compare Mode Core Flow** (Critical - Main feature)
2. ✅ **Authentication Flow** (Critical - Required for access)
3. ✅ **AI Model Integration** (Critical - Core functionality)
4. ⚠️ **Dashboard & Navigation** (Important - User experience)
5. ⚠️ **Agent Configuration** (Important - Feature foundation)
6. 🔜 **Billing & Payments** (Future - Post-MVP)

---

## Test Types & Coverage Goals

### Test Pyramid Distribution

\`\`\`
           E2E (5%)
        ↗ ↑ ↖
       /   |   \
      /    |    \
     / Integration \
    /    (25%)     \
   / ↗   ↑   ↖    \
  /  Unit Tests  \
 /     (70%)      \
\`\`\`

### Coverage Goals

| Type | Target | MVP Target | Tools |
|------|--------|------------|-------|
| Unit Tests | 80% | 60% | Vitest, Testing Library |
| Integration Tests | 60% | 40% | Vitest, MSW, Convex Test Env |
| E2E Tests | Critical paths | Compare Mode only | Playwright |
| Total Coverage | 75% | 50% | - |

---

## Test File Structure

### Directory Organization

\`\`\`
AnyDebateAI/
├── __tests__/                    # Global test utilities
│   ├── setup.ts                  # Test environment setup
│   ├── utils/                    # Test helpers
│   │   ├── mock-data.ts         # Shared mock data
│   │   ├── test-providers.tsx   # Provider wrappers for tests
│   │   └── assertions.ts        # Custom assertions
│   └── fixtures/                # Test fixtures
│       ├── agents.ts
│       ├── debates.ts
│       └── users.ts
│
├── app/                          # Route tests
│   └── __tests__/
│       ├── page.test.tsx         # Landing page tests
│       └── layout.test.tsx       # Root layout tests
│
├── components/                   # Component tests
│   ├── chat/
│   │   ├── compare/
│   │   │   ├── CompareMode.tsx
│   │   │   └── CompareMode.test.tsx   # Co-located with component
│   │   └── __tests__/
│   │       └── ChatInput.test.tsx
│   └── ui/
│       └── __tests__/
│           └── button.test.tsx
│
├── lib/                          # Logic & utility tests
│   ├── ai-config.ts
│   ├── ai-config.test.ts         # Co-located with module
│   └── utils.test.ts
│
├── convex/                       # Convex function tests
│   ├── sessions.ts
│   ├── sessions.test.ts          # Co-located with Convex function
│   └── __tests__/
│       └── test-helpers.ts
│
└── e2e/                          # End-to-end tests
    ├── compare-mode.spec.ts
    ├── auth-flow.spec.ts
    └── fixtures/
        └── test-users.json
\`\`\`

### Naming Conventions

**Unit/Integration Tests:**
- Component tests: `ComponentName.test.tsx`
- Module tests: `module-name.test.ts`
- Hook tests: `useHookName.test.ts`

**E2E Tests:**
- Feature tests: `feature-name.spec.ts`
- User flow tests: `user-flow-name.spec.ts`

---

## Unit Testing

### Tools & Setup

**Testing Stack:**
- **Test Runner**: Vitest (faster than Jest, native ESM support)
- **React Testing**: @testing-library/react
- **Assertions**: Vitest assertions + @testing-library/jest-dom
- **Mocking**: Vitest mocks + MSW for API mocking

### Component Testing Pattern

\`\`\`typescript
// components/chat/compare/CompareMode.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CompareMode } from './CompareMode'
import { TestProviders } from '@/__tests__/utils/test-providers'

describe('CompareMode', () => {
  const mockProps = {
    activeAgents: [
      { id: 'agent-1', name: 'Agent A', role: 'analyst' },
      { id: 'agent-2', name: 'Agent B', role: 'creative' }
    ],
    onSendMessage: vi.fn(),
    sessionId: 'session-123'
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders agent cards for all active agents', () => {
    render(
      <TestProviders>
        <CompareMode {...mockProps} />
      </TestProviders>
    )

    expect(screen.getByText('Agent A')).toBeInTheDocument()
    expect(screen.getByText('Agent B')).toBeInTheDocument()
  })

  it('sends message when user submits prompt', async () => {
    const user = userEvent.setup()
    
    render(
      <TestProviders>
        <CompareMode {...mockProps} />
      </TestProviders>
    )

    const input = screen.getByPlaceholderText(/type your prompt/i)
    const sendButton = screen.getByRole('button', { name: /send/i })

    await user.type(input, 'Test prompt')
    await user.click(sendButton)

    await waitFor(() => {
      expect(mockProps.onSendMessage).toHaveBeenCalledWith('Test prompt')
    })
  })

  it('displays loading state while AI generates responses', async () => {
    render(
      <TestProviders>
        <CompareMode {...mockProps} isLoading={true} />
      </TestProviders>
    )

    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument()
  })
})
\`\`\`

### Utility Function Testing

\`\`\`typescript
// lib/ai-config.test.ts
import { describe, it, expect } from 'vitest'
import { getModelConfig, formatModelName } from './ai-config'

describe('ai-config utilities', () => {
  describe('getModelConfig', () => {
    it('returns correct config for OpenAI models', () => {
      const config = getModelConfig('openai/gpt-4')
      
      expect(config).toMatchObject({
        provider: 'openai',
        model: 'gpt-4',
        maxTokens: 4096
      })
    })

    it('throws error for unsupported models', () => {
      expect(() => getModelConfig('invalid/model')).toThrow('Unsupported model')
    })
  })

  describe('formatModelName', () => {
    it('formats model names correctly', () => {
      expect(formatModelName('openai/gpt-4')).toBe('GPT-4')
      expect(formatModelName('anthropic/claude-3-5-sonnet')).toBe('Claude 3.5 Sonnet')
    })
  })
})
\`\`\`

### Hook Testing

\`\`\`typescript
// hooks/use-compare-mode.test.ts
import { describe, it, expect } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useCompareMode } from './use-compare-mode'
import { TestProviders } from '@/__tests__/utils/test-providers'

describe('useCompareMode', () => {
  it('initializes with empty responses', () => {
    const { result } = renderHook(() => useCompareMode(), {
      wrapper: TestProviders
    })

    expect(result.current.responses).toEqual({})
    expect(result.current.isLoading).toBe(false)
  })

  it('generates responses for all agents', async () => {
    const { result } = renderHook(() => useCompareMode(), {
      wrapper: TestProviders
    })

    act(() => {
      result.current.generateResponses('What is AI?', ['agent-1', 'agent-2'])
    })

    await waitFor(() => {
      expect(result.current.responses).toHaveProperty('agent-1')
      expect(result.current.responses).toHaveProperty('agent-2')
    })
  })
})
\`\`\`

---

## Integration Testing

### Testing with Convex

\`\`\`typescript
// convex/sessions.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { convexTest } from 'convex-test'
import schema from './schema'
import { api } from './_generated/api'

describe('sessions mutations', () => {
  let t: ConvexTest

  beforeEach(() => {
    t = convexTest(schema)
  })

  it('creates a new compare mode session', async () => {
    const userId = await t.run(async (ctx) => {
      return ctx.db.insert('users', {
        clerkId: 'user_123',
        email: 'test@example.com',
        name: 'Test User'
      })
    })

    const sessionId = await t.mutation(api.sessions.create, {
      userId,
      mode: 'compare',
      agentIds: ['agent-1', 'agent-2'],
      config: { model: 'openai/gpt-4.1' }
    })

    expect(sessionId).toBeDefined()

    const session = await t.run(async (ctx) => {
      return ctx.db.get(sessionId)
    })

    expect(session).toMatchObject({
      userId,
      mode: 'compare',
      status: 'active',
      agentIds: ['agent-1', 'agent-2']
    })
  })

  it('adds message to session and updates round', async () => {
    // Setup: Create user and session
    const { userId, sessionId } = await setupTestSession(t)

    // Test: Add message
    const messageId = await t.mutation(api.messages.send, {
      sessionId,
      userId,
      content: 'Test message',
      role: 'user'
    })

    // Verify: Message created and session updated
    const message = await t.run(async (ctx) => ctx.db.get(messageId))
    expect(message?.content).toBe('Test message')

    const session = await t.run(async (ctx) => ctx.db.get(sessionId))
    expect(session?.currentRound).toBe(1)
  })
})
\`\`\`

### Testing with Clerk (Mocked)

\`\`\`typescript
// components/auth/SignInButton.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SignInButton } from './SignInButton'
import { useAuth } from '@clerk/nextjs'

vi.mock('@clerk/nextjs', () => ({
  useAuth: vi.fn()
}))

describe('SignInButton', () => {
  it('shows sign in button when not authenticated', () => {
    vi.mocked(useAuth).mockReturnValue({
      isSignedIn: false,
      userId: null
    } as any)

    render(<SignInButton />)
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('shows user menu when authenticated', () => {
    vi.mocked(useAuth).mockReturnValue({
      isSignedIn: true,
      userId: 'user_123'
    } as any)

    render(<SignInButton />)
    expect(screen.getByTestId('user-menu')).toBeInTheDocument()
  })
})
\`\`\`

### API Route Testing

\`\`\`typescript
// app/api/chat/route.test.ts
import { describe, it, expect } from 'vitest'
import { POST } from './route'

describe('/api/chat', () => {
  it('generates AI response for valid request', async () => {
    const request = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Hello' }],
        model: 'openai/gpt-4.1'
      })
    })

    const response = await POST(request)
    expect(response.status).toBe(200)

    const data = await response.json()
    expect(data).toHaveProperty('text')
  })

  it('returns 400 for missing model', async () => {
    const request = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Hello' }]
      })
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
  })
})
\`\`\`

---

## End-to-End Testing

### Playwright Setup

\`\`\`typescript
// e2e/compare-mode.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Compare Mode Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/sign-in')
    await page.fill('input[name="identifier"]', 'test@example.com')
    await page.fill('input[name="password"]', 'testpassword123')
    await page.click('button[type="submit"]')
    await expect(page).toHaveURL('/dashboard')
  })

  test('user can create compare mode session and get responses', async ({ page }) => {
    // Navigate to compare mode
    await page.click('text=New Debate')
    await page.click('text=Compare Mode')

    // Select agents
    await page.click('text=Select Agents')
    await page.click('[data-agent-id="agent-1"]')
    await page.click('[data-agent-id="agent-2"]')
    await page.click('text=Continue')

    // Send prompt
    await page.fill('[data-testid="chat-input"]', 'What is artificial intelligence?')
    await page.click('[data-testid="send-button"]')

    // Wait for responses
    await expect(page.locator('[data-testid="agent-response"]')).toHaveCount(2, {
      timeout: 30000
    })

    // Verify responses are different
    const responses = await page.locator('[data-testid="agent-response"]').allTextContents()
    expect(responses[0]).not.toBe(responses[1])
  })

  test('user can switch models mid-session', async ({ page }) => {
    // ... setup session ...

    await page.click('[data-testid="model-selector"]')
    await page.click('text=Claude 3.5 Sonnet')

    await expect(page.locator('[data-testid="current-model"]')).toHaveText('Claude 3.5 Sonnet')
  })
})
\`\`\`

### Critical Path E2E Tests

\`\`\`typescript
// e2e/auth-flow.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test('new user can sign up and access dashboard', async ({ page }) => {
    await page.goto('/sign-up')

    // Fill signup form
    await page.fill('input[name="emailAddress"]', `test-${Date.now()}@example.com`)
    await page.fill('input[name="password"]', 'SecurePassword123!')
    await page.click('button[type="submit"]')

    // Verify email (in test environment, auto-verify)
    await expect(page).toHaveURL('/dashboard', { timeout: 10000 })

    // Verify dashboard loads
    await expect(page.locator('h1')).toContainText('Dashboard')
  })

  test('existing user can sign in', async ({ page }) => {
    await page.goto('/sign-in')

    await page.fill('input[name="identifier"]', 'test@example.com')
    await page.fill('input[name="password"]', 'testpassword123')
    await page.click('button[type="submit"]')

    await expect(page).toHaveURL('/dashboard')
  })
})
\`\`\`

---

## Testing Conventions

### File Naming

\`\`\`bash
# Unit/Integration Tests
ComponentName.test.tsx    # Component tests
moduleName.test.ts        # Module/utility tests
useHookName.test.ts       # Hook tests

# E2E Tests
feature-name.spec.ts      # Feature tests
user-flow.spec.ts         # User journey tests
\`\`\`

### Test Structure (AAA Pattern)

\`\`\`typescript
it('should do something when condition is met', () => {
  // Arrange - Setup test data and environment
  const mockData = { ... }
  const mockCallback = vi.fn()

  // Act - Execute the behavior being tested
  const result = performAction(mockData, mockCallback)

  // Assert - Verify the outcome
  expect(result).toBe(expectedValue)
  expect(mockCallback).toHaveBeenCalledWith(expectedValue)
})
\`\`\`

### Test Descriptions

**Good:**
\`\`\`typescript
it('sends message when user presses Enter key')
it('displays error when API request fails')
it('disables submit button when form is invalid')
\`\`\`

**Bad:**
\`\`\`typescript
it('works correctly')  // Too vague
it('test the submit function')  // Not descriptive
it('should work')  // Unclear expectation
\`\`\`

---

## Mocking Strategies

### Mock Data Factory

\`\`\`typescript
// __tests__/utils/mock-data.ts
import { faker } from '@faker-js/faker'

export const mockAgent = (overrides = {}) => ({
  id: faker.string.uuid(),
  name: faker.person.firstName(),
  role: 'analyst',
  persona: 'analytical',
  framework: 'first-principles',
  isActive: true,
  ...overrides
})

export const mockSession = (overrides = {}) => ({
  id: faker.string.uuid(),
  userId: faker.string.uuid(),
  mode: 'compare',
  status: 'active',
  agentIds: [mockAgent().id, mockAgent().id],
  createdAt: faker.date.recent().toISOString(),
  ...overrides
})

export const mockMessage = (overrides = {}) => ({
  id: faker.string.uuid(),
  sessionId: faker.string.uuid(),
  userId: faker.string.uuid(),
  content: faker.lorem.sentence(),
  role: 'user',
  timestamp: faker.date.recent().toISOString(),
  ...overrides
})
\`\`\`

### API Mocking with MSW

\`\`\`typescript
// __tests__/setup.ts
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post('/api/chat', async ({ request }) => {
    const body = await request.json()
    
    return HttpResponse.json({
      text: 'Mock AI response',
      model: body.model
    })
  })
]

export const server = setupServer(...handlers)

// Setup
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
\`\`\`

### Convex Mocking

\`\`\`typescript
// __tests__/utils/mock-convex.ts
import { vi } from 'vitest'

export const mockConvexQuery = (data: any) => {
  return vi.fn().mockResolvedValue(data)
}

export const mockConvexMutation = (returnValue: any) => {
  return vi.fn().mockResolvedValue(returnValue)
}

// Usage
const mockSessions = mockConvexQuery([mockSession(), mockSession()])
\`\`\`

---

## Load Testing

### Tools

- **Artillery**: HTTP load testing
- **k6**: Advanced load testing and monitoring
- **Locust**: Python-based load testing

### Load Test Scenarios

\`\`\`yaml
# artillery/compare-mode-load.yml
config:
  target: 'https://anydebate.ai'
  phases:
    - duration: 60
      arrivalRate: 10  # 10 users/second
      name: "Warm up"
    - duration: 300
      arrivalRate: 50  # 50 users/second
      name: "Peak load"
    - duration: 60
      arrivalRate: 10  # Cool down
      name: "Cool down"

scenarios:
  - name: "Compare Mode Session"
    flow:
      - post:
          url: "/api/auth/session"
          json:
            email: "{{ $randomEmail() }}"
      - post:
          url: "/api/sessions"
          json:
            mode: "compare"
            agentIds: ["agent-1", "agent-2"]
      - post:
          url: "/api/chat"
          json:
            messages: [{ role: "user", content: "What is AI?" }]
            model: "openai/gpt-4.1"
          think: 2
\`\`\`

### Performance Benchmarks

| Endpoint | Target Response Time | Max RPS | P95 Latency |
|----------|---------------------|---------|-------------|
| /api/chat | < 3s | 100 | < 5s |
| /api/sessions | < 200ms | 500 | < 500ms |
| /api/messages | < 100ms | 1000 | < 300ms |

---

## Testing Checklist

### Pre-MVP Launch Checklist

#### Unit Tests
- [ ] All utility functions tested (lib/)
- [ ] Core hooks tested (useCompareMode, useAgents)
- [ ] UI components tested (Button, Input, Card)
- [ ] Chat components tested (CompareMode, ChatInput)

#### Integration Tests
- [ ] Convex mutations tested (sessions, messages)
- [ ] Convex queries tested (getSessions, getMessages)
- [ ] Auth flow tested (sign in, sign up, sign out)
- [ ] API routes tested (/api/chat, /api/sessions)

#### E2E Tests
- [ ] Compare Mode complete flow
- [ ] Sign up → Compare Mode → Get responses
- [ ] Sign in → Dashboard → Create session
- [ ] Agent selection and configuration

#### Performance Tests
- [ ] Load test with 50 concurrent users
- [ ] Response time < 3s for AI generation
- [ ] No memory leaks in long sessions

#### Security Tests
- [ ] Authentication required for protected routes
- [ ] API routes validate authentication
- [ ] SQL injection prevention (N/A for Convex)
- [ ] XSS prevention in rendered content

---

## Continuous Integration

### GitHub Actions Workflow

\`\`\`yaml
# .github/workflows/test.yml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm run test:unit
      
      - name: Run integration tests
        run: npm run test:integration
        env:
          CONVEX_DEPLOYMENT: ${{ secrets.CONVEX_TEST_DEPLOYMENT }}
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json

  e2e:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright
        run: npx playwright install --with-deps
      
      - name: Run E2E tests
        run: npm run test:e2e
        env:
          BASE_URL: ${{ secrets.PREVIEW_URL }}
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
\`\`\`

---

## References

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Playwright Documentation](https://playwright.dev/)
- [MSW Documentation](https://mswjs.io/)
- [Convex Testing Guide](https://docs.convex.dev/testing)

---

**Next Steps:**
1. Set up Vitest configuration
2. Create test utilities and mock data factories
3. Write tests for Compare Mode components
4. Implement E2E tests for critical flows
5. Add coverage reporting to CI/CD

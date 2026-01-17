# 📡 AnyDebate AI API Documentation

*Complete API reference for the AI-powered debate system*

## 📋 Table of Contents

1. [Authentication](#authentication)
2. [Chat API](#chat-api)
3. [Agent Configuration API](#agent-configuration-api)
4. [System Status API](#system-status-api)
5. [Error Handling](#error-handling)
6. [Rate Limiting](#rate-limiting)
7. [SDK Usage Examples](#sdk-usage-examples)

---

## 🔐 Authentication

Currently, the API uses environment variables for authentication with AI providers:

\`\`\`typescript
// Environment Variables Required
AI_GATEWAY_API_KEY=your_vercel_ai_gateway_key
TOGETHER_API_KEY=your_together_ai_key
\`\`\`

Future versions will include user authentication and API keys.

---

## 💬 Chat API

### **POST /api/chat**

Send messages to AI agents and receive streaming responses.

#### **Request**

\`\`\`typescript
interface ChatRequest {
  messages: Message[];
  agentConfig: AgentConfig;
  options?: ChatOptions;
}

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: string;
  agentId?: string;
}

interface AgentConfig {
  id: string;
  name: string;
  role: string;           // Role ID from available roles
  persona: string;        // Persona ID from available personas
  framework: string;      // Framework ID from available frameworks
  temperature?: number;   // 0.0 - 2.0, default: 0.7
  maxTokens?: number;     // Max response length, default: 2000
  model?: string;         // Override model selection
}

interface ChatOptions {
  stream?: boolean;       // Enable streaming, default: true
  context?: ConversationContext;
  retryOnError?: boolean; // Auto-retry on failure, default: true
  maxRetries?: number;    // Max retry attempts, default: 3
}

interface ConversationContext {
  type: 'debate' | 'collaboration' | 'analysis';
  urgency: 'low' | 'medium' | 'high';
  topic?: string;
  participants?: string[];
}
\`\`\`

#### **Response (Streaming)**

\`\`\`typescript
// Server-Sent Events format
// Content-Type: text/plain; charset=utf-8

// Partial response chunks
data: {"content": "Hello, I'm a ", "done": false, "agentId": "agent-1"}
data: {"content": "software engineer with an ", "done": false, "agentId": "agent-1"}
data: {"content": "analytical approach...", "done": false, "agentId": "agent-1"}

// Final chunk
data: {"content": "", "done": true, "agentId": "agent-1", "totalTokens": 150}

// End of stream
data: [DONE]
\`\`\`

#### **Response (Non-Streaming)**

\`\`\`typescript
interface ChatResponse {
  message: {
    role: 'assistant';
    content: string;
    agentId: string;
    timestamp: string;
  };
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  model: string;
  provider: string;
}
\`\`\`

#### **Example Request**

\`\`\`bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "role": "user",
        "content": "What are the pros and cons of microservices architecture?"
      }
    ],
    "agentConfig": {
      "id": "agent-1",
      "name": "Senior Architect",
      "role": "software-engineer",
      "persona": "analytical",
      "framework": "systems-thinking",
      "temperature": 0.7
    },
    "options": {
      "stream": true,
      "context": {
        "type": "analysis",
        "urgency": "medium",
        "topic": "software architecture"
      }
    }
  }'
\`\`\`

---

## ⚙️ Agent Configuration API

### **GET /api/agents/roles**

Get all available agent roles.

#### **Response**

\`\`\`typescript
interface RolesResponse {
  roles: Role[];
  categories: Record<string, Role[]>;
}

interface Role {
  id: string;
  name: string;
  category: string;
  description: string;
  expertise: string[];
  preferredModels: string[];
  temperatureRange: [number, number];
}
\`\`\`

### **GET /api/agents/personas**

Get all available behavioral personas.

#### **Response**

\`\`\`typescript
interface PersonasResponse {
  personas: Persona[];
}

interface Persona {
  id: string;
  name: string;
  description: string;
  communicationStyle: string;
  behaviorPatterns: string[];
  compatibleRoles: string[];
}
\`\`\`

### **GET /api/agents/frameworks**

Get all available thinking frameworks.

#### **Response**

\`\`\`typescript
interface FrameworksResponse {
  frameworks: Framework[];
  categories: Record<string, Framework[]>;
}

interface Framework {
  id: string;
  name: string;
  description: string;
  methodology: string;
  steps: string[];
  applicableContexts: string[];
}
\`\`\`

### **POST /api/agents/validate**

Validate an agent configuration.

#### **Request**

\`\`\`typescript
interface ValidateRequest {
  config: AgentConfig;
}
\`\`\`

#### **Response**

\`\`\`typescript
interface ValidateResponse {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  suggestions: string[];
  optimizedConfig?: AgentConfig;
}

interface ValidationError {
  field: string;
  message: string;
  code: string;
}

interface ValidationWarning {
  field: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
}
\`\`\`

### **POST /api/agents/optimize**

Get optimized agent configuration for specific context.

#### **Request**

\`\`\`typescript
interface OptimizeRequest {
  config: AgentConfig;
  context: ConversationContext;
  goals: string[];
}
\`\`\`

#### **Response**

\`\`\`typescript
interface OptimizeResponse {
  optimizedConfig: AgentConfig;
  changes: ConfigChange[];
  reasoning: string;
  expectedImprovements: string[];
}

interface ConfigChange {
  field: string;
  oldValue: any;
  newValue: any;
  reason: string;
}
\`\`\`

---

## 📊 System Status API

### **GET /api/status**

Get overall system health and provider status.

#### **Response**

\`\`\`typescript
interface SystemStatus {
  status: 'healthy' | 'degraded' | 'down';
  providers: ProviderStatus[];
  metrics: SystemMetrics;
  lastUpdated: string;
}

interface ProviderStatus {
  name: string;
  status: 'available' | 'degraded' | 'unavailable';
  responseTime: number;
  errorRate: number;
  models: ModelStatus[];
}

interface ModelStatus {
  name: string;
  available: boolean;
  responseTime: number;
  queueLength: number;
}

interface SystemMetrics {
  totalRequests: number;
  successRate: number;
  averageResponseTime: number;
  activeConnections: number;
}
\`\`\`

### **GET /api/status/providers**

Get detailed provider health information.

#### **Response**

\`\`\`typescript
interface ProvidersHealthResponse {
  providers: DetailedProviderStatus[];
  recommendations: string[];
}

interface DetailedProviderStatus extends ProviderStatus {
  lastHealthCheck: string;
  uptime: number;
  rateLimits: {
    current: number;
    limit: number;
    resetTime: string;
  };
  regions: RegionStatus[];
}

interface RegionStatus {
  region: string;
  status: 'available' | 'degraded' | 'unavailable';
  latency: number;
}
\`\`\`

---

## ❌ Error Handling

### **Error Response Format**

\`\`\`typescript
interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: any;
    timestamp: string;
    requestId: string;
  };
  retryAfter?: number;
  suggestions?: string[];
}
\`\`\`

### **Error Codes**

| Code | Description | HTTP Status | Retry |
|------|-------------|-------------|-------|
| `INVALID_CONFIG` | Invalid agent configuration | 400 | No |
| `MISSING_REQUIRED_FIELD` | Required field missing | 400 | No |
| `RATE_LIMIT_EXCEEDED` | Too many requests | 429 | Yes |
| `PROVIDER_UNAVAILABLE` | AI provider down | 503 | Yes |
| `NETWORK_ERROR` | Network connectivity issue | 502 | Yes |
| `TIMEOUT` | Request timeout | 504 | Yes |
| `INTERNAL_ERROR` | Server error | 500 | Yes |
| `VALIDATION_FAILED` | Input validation failed | 422 | No |
| `MODEL_UNAVAILABLE` | Requested model unavailable | 503 | Yes |
| `CONTEXT_TOO_LONG` | Message context too long | 413 | No |

### **Example Error Responses**

\`\`\`json
// Rate limit exceeded
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please wait before making another request.",
    "timestamp": "2025-09-28T10:30:00Z",
    "requestId": "req_123456"
  },
  "retryAfter": 60,
  "suggestions": [
    "Wait 60 seconds before retrying",
    "Consider upgrading to a higher rate limit tier"
  ]
}

// Validation error
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Agent configuration validation failed",
    "details": {
      "errors": [
        {
          "field": "role",
          "message": "Invalid role: 'invalid-role'",
          "code": "INVALID_ROLE"
        },
        {
          "field": "temperature",
          "message": "Temperature must be between 0 and 2",
          "code": "INVALID_RANGE"
        }
      ]
    },
    "timestamp": "2025-09-28T10:30:00Z",
    "requestId": "req_123457"
  },
  "suggestions": [
    "Check available roles using GET /api/agents/roles",
    "Set temperature between 0.0 and 2.0"
  ]
}
\`\`\`

---

## 🚦 Rate Limiting

### **Rate Limits**

| Endpoint | Limit | Window | Burst |
|----------|-------|--------|-------|
| `/api/chat` | 60 requests | 1 minute | 10 |
| `/api/agents/*` | 100 requests | 1 minute | 20 |
| `/api/status` | 30 requests | 1 minute | 5 |

### **Rate Limit Headers**

\`\`\`http
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1640995200
X-RateLimit-Retry-After: 15
\`\`\`

### **Rate Limit Response**

\`\`\`json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded",
    "timestamp": "2025-09-28T10:30:00Z",
    "requestId": "req_123458"
  },
  "retryAfter": 15
}
\`\`\`

---

## 🛠️ SDK Usage Examples

### **JavaScript/TypeScript Client**

\`\`\`typescript
// AI Chat Client
class AnyDebateAIClient {
  private baseUrl: string;
  
  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }
  
  async sendMessage(
    messages: Message[],
    agentConfig: AgentConfig,
    options?: ChatOptions
  ): Promise<ReadableStream> {
    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, agentConfig, options })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response.body!;
  }
  
  async getAvailableRoles(): Promise<Role[]> {
    const response = await fetch(`${this.baseUrl}/api/agents/roles`);
    const data = await response.json();
    return data.roles;
  }
  
  async validateAgent(config: AgentConfig): Promise<ValidationResult> {
    const response = await fetch(`${this.baseUrl}/api/agents/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ config })
    });
    
    return response.json();
  }
}

// Usage Example
const client = new AnyDebateAIClient();

const agentConfig: AgentConfig = {
  id: 'agent-1',
  name: 'Senior Developer',
  role: 'software-engineer',
  persona: 'analytical',
  framework: 'first-principles',
  temperature: 0.7
};

const messages: Message[] = [
  { role: 'user', content: 'Explain the benefits of TypeScript' }
];

// Send message with streaming
const stream = await client.sendMessage(messages, agentConfig);
const reader = stream.getReader();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  
  const chunk = new TextDecoder().decode(value);
  const lines = chunk.split('\n').filter(line => line.trim());
  
  for (const line of lines) {
    if (line.startsWith('data: ')) {
      const data = line.slice(6);
      if (data === '[DONE]') continue;
      
      const parsed = JSON.parse(data);
      if (parsed.content) {
        console.log('Received:', parsed.content);
      }
    }
  }
}
\`\`\`

### **React Hook Usage**

\`\`\`typescript
// Custom React Hook
function useAnyDebateAI() {
  const [client] = useState(() => new AnyDebateAIClient());
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const sendMessage = useCallback(async (
    content: string,
    agentConfig: AgentConfig
  ) => {
    setIsLoading(true);
    setError(null);
    
    const newMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, newMessage]);
    
    try {
      const stream = await client.sendMessage(
        [...messages, newMessage],
        agentConfig
      );
      
      // Handle streaming response
      const reader = stream.getReader();
      let accumulatedContent = '';
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = new TextDecoder().decode(value);
        // Process streaming chunks...
        
        setMessages(prev => [
          ...prev.slice(0, -1),
          { role: 'assistant', content: accumulatedContent, agentId: agentConfig.id }
        ]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, [client, messages]);
  
  return { messages, sendMessage, isLoading, error };
}

// Component Usage
function ChatComponent() {
  const { messages, sendMessage, isLoading, error } = useAnyDebateAI();
  
  const agentConfig: AgentConfig = {
    id: 'agent-1',
    name: 'AI Assistant',
    role: 'software-engineer',
    persona: 'analytical',
    framework: 'systems-thinking'
  };
  
  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          <strong>{message.role}:</strong> {message.content}
        </div>
      ))}
      
      {isLoading && <div>AI is thinking...</div>}
      {error && <div>Error: {error}</div>}
      
      <button onClick={() => sendMessage('Hello!', agentConfig)}>
        Send Message
      </button>
    </div>
  );
}
\`\`\`

### **Python Client Example**

\`\`\`python
import requests
import json
from typing import List, Dict, Any, Iterator

class AnyDebateAIClient:
    def __init__(self, base_url: str = "http://localhost:3000"):
        self.base_url = base_url
    
    def send_message(
        self,
        messages: List[Dict[str, str]],
        agent_config: Dict[str, Any],
        stream: bool = True
    ) -> Iterator[str]:
        """Send message and yield streaming response chunks."""
        
        response = requests.post(
            f"{self.base_url}/api/chat",
            json={
                "messages": messages,
                "agentConfig": agent_config,
                "options": {"stream": stream}
            },
            stream=stream
        )
        
        response.raise_for_status()
        
        if stream:
            for line in response.iter_lines():
                if line:
                    line_str = line.decode('utf-8')
                    if line_str.startswith('data: '):
                        data = line_str[6:]
                        if data == '[DONE]':
                            break
                        
                        try:
                            parsed = json.loads(data)
                            if 'content' in parsed:
                                yield parsed['content']
                        except json.JSONDecodeError:
                            continue
        else:
            yield response.json()['message']['content']
    
    def get_available_roles(self) -> List[Dict[str, Any]]:
        """Get all available agent roles."""
        response = requests.get(f"{self.base_url}/api/agents/roles")
        response.raise_for_status()
        return response.json()['roles']

# Usage Example
client = AnyDebateAIClient()

agent_config = {
    "id": "agent-1",
    "name": "Python Expert",
    "role": "software-engineer",
    "persona": "analytical",
    "framework": "first-principles",
    "temperature": 0.7
}

messages = [
    {"role": "user", "content": "Explain Python decorators"}
]

print("AI Response:")
for chunk in client.send_message(messages, agent_config):
    print(chunk, end='', flush=True)
print()  # New line after response
\`\`\`

---

*This API documentation provides comprehensive coverage of all endpoints, request/response formats, error handling, and usage examples for the AnyDebate AI system.*

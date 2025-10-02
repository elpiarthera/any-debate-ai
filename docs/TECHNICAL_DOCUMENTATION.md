# 🔧 AnyDebate AI Technical Documentation

*Comprehensive technical guide for developers working with the AI system*

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [AI Integration System](#ai-integration-system)
3. [Agent Configuration Engine](#agent-configuration-engine)
4. [Prompt Engineering System](#prompt-engineering-system)
5. [Streaming & Error Handling](#streaming--error-handling)
6. [API Reference](#api-reference)
7. [Development Guide](#development-guide)

---

## 🏗️ Architecture Overview

### **System Components**

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                      │
├─────────────────────────────────────────────────────────────┤
│  Components/     │  Hooks/        │  Pages/                │
│  - ModelColumn   │  - useAIChat   │  - /debate             │
│  - AgentBuilder  │  - useAgent    │  - /agents             │
│  - ChatThread    │                │  - /                   │
├─────────────────────────────────────────────────────────────┤
│                    AI Integration Layer                     │
├─────────────────────────────────────────────────────────────┤
│  lib/            │  app/api/      │  Agent Config/         │
│  - ai-config.ts  │  - chat/       │  - roles.ts            │
│  - ai-utils.ts   │  - route.ts    │  - personas.ts         │
│                  │                │  - frameworks.ts       │
├─────────────────────────────────────────────────────────────┤
│                    AI Providers                             │
├─────────────────────────────────────────────────────────────┤
│  Vercel AI Gateway    │  Together.ai      │  Direct APIs   │
│  - OpenAI            │  - Llama 3.1      │  - Anthropic   │
│  - Anthropic         │  - Llama 3.2      │  - OpenAI      │
│  - Google            │  - Code Llama     │                │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### **Data Flow**

1. **User Input** → Agent Configuration → System Prompt Generation
2. **System Prompt** → AI Provider Selection → API Request
3. **AI Response** → Stream Processing → Real-time UI Updates
4. **Error Handling** → Retry Logic → Fallback Providers

---

## 🤖 AI Integration System

### **Core Configuration (`lib/ai-config.ts`)**

\`\`\`typescript
// AI Provider Configuration
export const AI_PROVIDERS = {
  VERCEL_GATEWAY: {
    openai: 'openai/gpt-4',
    anthropic: 'anthropic/claude-3-sonnet',
    google: 'google/gemini-pro'
  },
  TOGETHER: {
    llama: 'meta-llama/Llama-3.1-70B-Instruct-Turbo',
    codellama: 'codellama/CodeLlama-34b-Instruct-hf'
  }
} as const;

// Model Selection Logic
export function selectOptimalModel(
  role: string, 
  complexity: 'low' | 'medium' | 'high'
): string {
  // Technical roles get code-optimized models
  if (TECHNICAL_ROLES.includes(role)) {
    return AI_PROVIDERS.TOGETHER.codellama;
  }
  
  // High complexity gets most powerful models
  if (complexity === 'high') {
    return AI_PROVIDERS.VERCEL_GATEWAY.anthropic;
  }
  
  // Default to balanced model
  return AI_PROVIDERS.VERCEL_GATEWAY.openai;
}
\`\`\`

### **Provider Health Monitoring**

\`\`\`typescript
// Provider Status Tracking
interface ProviderStatus {
  available: boolean;
  responseTime: number;
  errorRate: number;
  lastCheck: Date;
}

export class ProviderHealthMonitor {
  private status: Map<string, ProviderStatus> = new Map();
  
  async checkProviderHealth(provider: string): Promise<boolean> {
    // Health check implementation
    const startTime = Date.now();
    try {
      await this.pingProvider(provider);
      this.updateStatus(provider, {
        available: true,
        responseTime: Date.now() - startTime,
        errorRate: this.calculateErrorRate(provider),
        lastCheck: new Date()
      });
      return true;
    } catch (error) {
      this.markProviderDown(provider);
      return false;
    }
  }
}
\`\`\`

---

## ⚙️ Agent Configuration Engine

### **Configuration Types**

\`\`\`typescript
// Core Agent Configuration
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

// Role Definition
export interface Role {
  id: string;
  name: string;
  category: string;
  expertise: string[];
  systemPrompt: string;
  preferredModels: string[];
  temperatureRange: [number, number];
}

// Persona Definition
export interface Persona {
  id: string;
  name: string;
  description: string;
  communicationStyle: string;
  behaviorPatterns: string[];
  languageModifiers: string[];
}

// Framework Definition
export interface Framework {
  id: string;
  name: string;
  description: string;
  methodology: string;
  steps: string[];
  promptTemplate: string;
}
\`\`\`

### **Configuration Validation**

\`\`\`typescript
// Comprehensive Validation System
export function validateAgentConfig(config: AgentConfig): ValidationResult {
  const errors: string[] = [];
  
  // Role validation
  if (!AVAILABLE_ROLES.find(r => r.id === config.role)) {
    errors.push(`Invalid role: ${config.role}`);
  }
  
  // Persona validation
  if (!AVAILABLE_PERSONAS.find(p => p.id === config.persona)) {
    errors.push(`Invalid persona: ${config.persona}`);
  }
  
  // Framework validation
  if (!AVAILABLE_FRAMEWORKS.find(f => f.id === config.framework)) {
    errors.push(`Invalid framework: ${config.framework}`);
  }
  
  // Parameter validation
  if (config.temperature < 0 || config.temperature > 2) {
    errors.push('Temperature must be between 0 and 2');
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings: generateWarnings(config)
  };
}
\`\`\`

---

## 🧠 Prompt Engineering System

### **System Prompt Generation (`lib/ai-utils.ts`)**

\`\`\`typescript
// Advanced System Prompt Generation
export function generateSystemPrompt(config: AgentConfig): string {
  const role = getRoleById(config.role);
  const persona = getPersonaById(config.persona);
  const framework = getFrameworkById(config.framework);
  
  return `
# AI Agent Configuration

## Professional Role: ${role.name}
${role.systemPrompt}

**Expertise Areas:**
${role.expertise.map(area => `- ${area}`).join('\n')}

## Behavioral Persona: ${persona.name}
${persona.description}

**Communication Style:** ${persona.communicationStyle}
**Behavior Patterns:**
${persona.behaviorPatterns.map(pattern => `- ${pattern}`).join('\n')}

## Thinking Framework: ${framework.name}
${framework.description}

**Methodology:** ${framework.methodology}
**Approach Steps:**
${framework.steps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

## Response Guidelines
- Maintain consistency with your role expertise and persona
- Apply the ${framework.name} methodology to your reasoning
- Adapt your communication style based on context and audience
- Provide specific, actionable insights based on your professional background
- Stay in character throughout the conversation

## Context Adaptation
- **Debate Context**: Present strong, evidence-based arguments
- **Collaboration Context**: Focus on building consensus and finding solutions
- **Analysis Context**: Provide thorough, systematic evaluation
- **High Urgency**: Be more direct and action-oriented
- **Low Urgency**: Take time for comprehensive analysis

Remember: You are a ${role.name} with a ${persona.name} personality using ${framework.name} thinking. Every response should reflect this unique combination.
`;
}
\`\`\`

### **Context-Aware Adaptation**

\`\`\`typescript
// Dynamic Personality Adaptation
export function adaptPersonalityToContext(
  basePrompt: string,
  context: ConversationContext
): string {
  let adaptedPrompt = basePrompt;
  
  // Conversation type adaptation
  switch (context.type) {
    case 'debate':
      adaptedPrompt += '\n\n**Debate Mode**: Present strong arguments with evidence. Challenge opposing viewpoints respectfully but firmly.';
      break;
    case 'collaboration':
      adaptedPrompt += '\n\n**Collaboration Mode**: Focus on finding common ground and building on others\' ideas.';
      break;
    case 'analysis':
      adaptedPrompt += '\n\n**Analysis Mode**: Provide thorough, systematic evaluation with detailed reasoning.';
      break;
  }
  
  // Urgency adaptation
  if (context.urgency === 'high') {
    adaptedPrompt += '\n\n**High Urgency**: Be concise and action-oriented. Focus on immediate, practical solutions.';
  }
  
  // Topic expertise alignment
  if (context.topic && context.expertiseMatch) {
    adaptedPrompt += `\n\n**Topic Focus**: This discussion is about ${context.topic}. Draw heavily on your expertise in this area.`;
  }
  
  return adaptedPrompt;
}
\`\`\`

### **Personality Consistency Monitoring**

\`\`\`typescript
// Consistency Checking System
export function checkPersonalityConsistency(
  config: AgentConfig,
  recentMessages: Message[]
): ConsistencyReport {
  const expectedTraits = getExpectedTraits(config);
  const observedTraits = analyzeMessageTraits(recentMessages);
  
  const consistency = calculateConsistencyScore(expectedTraits, observedTraits);
  
  return {
    score: consistency,
    deviations: findDeviations(expectedTraits, observedTraits),
    suggestions: generateConsistencySuggestions(config, observedTraits),
    needsAdjustment: consistency < 0.8
  };
}

function analyzeMessageTraits(messages: Message[]): ObservedTraits {
  return {
    communicationStyle: extractCommunicationStyle(messages),
    vocabularyUsage: analyzeVocabulary(messages),
    reasoningPatterns: identifyReasoningPatterns(messages),
    emotionalTone: assessEmotionalTone(messages)
  };
}
\`\`\`

---

## 📡 Streaming & Error Handling

### **Enhanced Chat Hook (`hooks/useAIChat.ts`)**

\`\`\`typescript
// Advanced Streaming Chat Hook
export function useAIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  
  const abortControllerRef = useRef<AbortController | null>(null);
  
  const sendMessage = useCallback(async (
    content: string,
    agentConfig: AgentConfig
  ) => {
    setIsStreaming(true);
    setConnectionStatus('connecting');
    setError(null);
    
    // Create abort controller for request cancellation
    abortControllerRef.current = new AbortController();
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content }],
          agentConfig
        }),
        signal: abortControllerRef.current.signal
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      setConnectionStatus('connected');
      
      // Handle streaming response
      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');
      
      let accumulatedContent = '';
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n').filter(line => line.trim());
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                accumulatedContent += parsed.content;
                updateStreamingMessage(accumulatedContent);
              }
            } catch (e) {
              console.warn('Failed to parse streaming data:', e);
            }
          }
        }
      }
      
      // Finalize message
      finalizeMessage(accumulatedContent, agentConfig);
      setRetryCount(0); // Reset retry count on success
      
    } catch (error) {
      if (error.name === 'AbortError') {
        setConnectionStatus('aborted');
        return;
      }
      
      handleStreamingError(error, agentConfig);
    } finally {
      setIsStreaming(false);
      setConnectionStatus('idle');
    }
  }, [messages]);
  
  // Automatic retry with exponential backoff
  const handleStreamingError = useCallback(async (
    error: Error,
    agentConfig: AgentConfig
  ) => {
    const maxRetries = 3;
    const baseDelay = 1000;
    
    if (retryCount < maxRetries) {
      const delay = baseDelay * Math.pow(2, retryCount);
      setError(`Connection failed. Retrying in ${delay/1000}s... (${retryCount + 1}/${maxRetries})`);
      setConnectionStatus('retrying');
      
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        // Retry the last message
        const lastUserMessage = messages.findLast(m => m.role === 'user');
        if (lastUserMessage) {
          sendMessage(lastUserMessage.content, agentConfig);
        }
      }, delay);
    } else {
      setError(`Failed to connect after ${maxRetries} attempts. Please try again.`);
      setConnectionStatus('failed');
    }
  }, [retryCount, messages, sendMessage]);
  
  // Stop streaming
  const stopStreaming = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);
  
  return {
    messages,
    sendMessage,
    stopStreaming,
    isStreaming,
    connectionStatus,
    error,
    retryCount
  };
}
\`\`\`

### **Error Recovery System**

\`\`\`typescript
// Comprehensive Error Handling
export class AIErrorHandler {
  private static readonly ERROR_TYPES = {
    RATE_LIMIT: 'rate_limit',
    NETWORK: 'network',
    PROVIDER: 'provider',
    VALIDATION: 'validation',
    TIMEOUT: 'timeout'
  } as const;
  
  static handleError(error: Error, context: ErrorContext): ErrorResponse {
    const errorType = this.classifyError(error);
    
    switch (errorType) {
      case this.ERROR_TYPES.RATE_LIMIT:
        return {
          message: 'Rate limit reached. Please wait a moment before trying again.',
          retryAfter: this.extractRetryAfter(error),
          canRetry: true,
          suggestedAction: 'wait'
        };
        
      case this.ERROR_TYPES.NETWORK:
        return {
          message: 'Network connection issue. Checking connection...',
          canRetry: true,
          suggestedAction: 'retry',
          fallbackProvider: this.selectFallbackProvider(context.currentProvider)
        };
        
      case this.ERROR_TYPES.PROVIDER:
        return {
          message: 'AI provider temporarily unavailable. Switching providers...',
          canRetry: true,
          suggestedAction: 'switch_provider',
          fallbackProvider: this.selectFallbackProvider(context.currentProvider)
        };
        
      case this.ERROR_TYPES.VALIDATION:
        return {
          message: 'Invalid request configuration. Please check your settings.',
          canRetry: false,
          suggestedAction: 'fix_config',
          validationErrors: this.extractValidationErrors(error)
        };
        
      default:
        return {
          message: 'An unexpected error occurred. Please try again.',
          canRetry: true,
          suggestedAction: 'retry'
        };
    }
  }
  
  private static classifyError(error: Error): string {
    if (error.message.includes('rate limit')) return this.ERROR_TYPES.RATE_LIMIT;
    if (error.message.includes('network') || error.name === 'NetworkError') return this.ERROR_TYPES.NETWORK;
    if (error.message.includes('timeout')) return this.ERROR_TYPES.TIMEOUT;
    if (error.message.includes('validation')) return this.ERROR_TYPES.VALIDATION;
    return this.ERROR_TYPES.PROVIDER;
  }
}
\`\`\`

---

## 📚 API Reference

### **Chat API Endpoint (`/api/chat`)**

\`\`\`typescript
// POST /api/chat
interface ChatRequest {
  messages: Message[];
  agentConfig: AgentConfig;
  options?: {
    stream?: boolean;
    temperature?: number;
    maxTokens?: number;
    model?: string;
  };
}

interface ChatResponse {
  // Streaming response with Server-Sent Events
  // Format: data: {"content": "partial response", "done": false}
  // Final: data: [DONE]
}

// Error Responses
interface ErrorResponse {
  error: string;
  code: string;
  details?: any;
  retryAfter?: number;
}
\`\`\`

### **Agent Configuration API**

\`\`\`typescript
// Agent validation endpoint
// POST /api/agents/validate
interface ValidateAgentRequest {
  config: AgentConfig;
}

interface ValidateAgentResponse {
  valid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

// Agent optimization endpoint
// POST /api/agents/optimize
interface OptimizeAgentRequest {
  config: AgentConfig;
  context: ConversationContext;
}

interface OptimizeAgentResponse {
  optimizedConfig: AgentConfig;
  changes: ConfigChange[];
  reasoning: string;
}
\`\`\`

---

## 🛠️ Development Guide

### **Adding New AI Providers**

1. **Update Provider Configuration**
\`\`\`typescript
// lib/ai-config.ts
export const AI_PROVIDERS = {
  // ... existing providers
  NEW_PROVIDER: {
    model1: 'provider/model-name',
    model2: 'provider/other-model'
  }
};
\`\`\`

2. **Implement Provider Client**
\`\`\`typescript
// lib/providers/new-provider.ts
export class NewProviderClient {
  async generateResponse(prompt: string, options: GenerationOptions): Promise<string> {
    // Implementation
  }
  
  async streamResponse(prompt: string, options: GenerationOptions): Promise<ReadableStream> {
    // Streaming implementation
  }
}
\`\`\`

3. **Update Model Selection Logic**
\`\`\`typescript
// lib/ai-config.ts
export function selectOptimalModel(role: string, complexity: string): string {
  // Add logic for new provider
  if (shouldUseNewProvider(role, complexity)) {
    return AI_PROVIDERS.NEW_PROVIDER.model1;
  }
  // ... existing logic
}
\`\`\`

### **Adding New Agent Roles**

1. **Define Role Configuration**
\`\`\`typescript
// lib/agent-config/roles.ts
export const NEW_ROLE: Role = {
  id: 'new-role',
  name: 'New Role Name',
  category: 'category',
  expertise: ['area1', 'area2'],
  systemPrompt: 'Detailed role description...',
  preferredModels: ['model1', 'model2'],
  temperatureRange: [0.3, 0.8]
};
\`\`\`

2. **Add to Available Roles**
\`\`\`typescript
export const AVAILABLE_ROLES = [
  // ... existing roles
  NEW_ROLE
];
\`\`\`

3. **Update Role Categories**
\`\`\`typescript
export const ROLE_CATEGORIES = {
  // ... existing categories
  'new-category': [NEW_ROLE]
};
\`\`\`

### **Testing Guidelines**

\`\`\`typescript
// __tests__/ai-system.test.ts
describe('AI System', () => {
  test('generates valid system prompts', () => {
    const config: AgentConfig = {
      role: 'software-engineer',
      persona: 'analytical',
      framework: 'first-principles'
    };
    
    const prompt = generateSystemPrompt(config);
    expect(prompt).toContain('Software Engineer');
    expect(prompt).toContain('analytical');
    expect(prompt).toContain('first principles');
  });
  
  test('validates agent configurations', () => {
    const invalidConfig = { role: 'invalid-role' };
    const result = validateAgentConfig(invalidConfig);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Invalid role: invalid-role');
  });
});
\`\`\`

### **Performance Monitoring**

\`\`\`typescript
// lib/monitoring.ts
export class AIPerformanceMonitor {
  static trackResponse(
    provider: string,
    model: string,
    responseTime: number,
    tokenCount: number
  ) {
    // Track metrics
    console.log(`[AI Metrics] ${provider}/${model}: ${responseTime}ms, ${tokenCount} tokens`);
  }
  
  static trackError(provider: string, error: Error) {
    // Track errors
    console.error(`[AI Error] ${provider}:`, error);
  }
}
\`\`\`

---

## 🔍 Debugging

### **Debug Logging**

\`\`\`typescript
// Enable debug mode
const DEBUG_AI = process.env.NODE_ENV === 'development';

export function debugLog(category: string, message: string, data?: any) {
  if (DEBUG_AI) {
    console.log(`[v0 AI Debug] ${category}: ${message}`, data || '');
  }
}

// Usage throughout the system
debugLog('prompt-generation', 'Generated system prompt', { config, prompt });
debugLog('api-request', 'Sending request to provider', { provider, model });
debugLog('streaming', 'Received chunk', { chunkSize: chunk.length });
\`\`\`

### **Common Debug Scenarios**

1. **System Prompt Issues**
\`\`\`typescript
// Add to generateSystemPrompt function
debugLog('system-prompt', 'Role configuration', role);
debugLog('system-prompt', 'Generated prompt', prompt);
\`\`\`

2. **Streaming Problems**
\`\`\`typescript
// Add to streaming handler
debugLog('streaming', 'Connection status', connectionStatus);
debugLog('streaming', 'Chunk received', { chunk, accumulated: accumulatedContent });
\`\`\`

3. **Error Handling**
\`\`\`typescript
// Add to error handlers
debugLog('error-handling', 'Error classified as', errorType);
debugLog('error-handling', 'Retry attempt', { attempt: retryCount, maxRetries });
\`\`\`

---

*This technical documentation provides comprehensive coverage of the AI system architecture, implementation details, and development guidelines for the AnyDebate AI platform.*

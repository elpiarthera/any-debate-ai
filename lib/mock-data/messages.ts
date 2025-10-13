import type { ChatMessage } from "@/lib/chat/types"

export const mockMessages: ChatMessage[] = [
  {
    id: "msg-1",
    sessionId: "session-1",
    content: "What are the key considerations for implementing a mobile-first design system?",
    sender: {
      id: "user-1",
      name: "You",
      type: "user",
    },
    timestamp: new Date(Date.now() - 3600000),
    reactions: {
      likes: 0,
      dislikes: 0,
    },
    bookmarked: false,
  },
  {
    id: "msg-2",
    sessionId: "session-1",
    content:
      "Mobile-first design requires careful attention to touch targets, responsive breakpoints, and performance optimization. Key considerations include: 1) Minimum 44px touch targets for accessibility, 2) Progressive enhancement from mobile to desktop, 3) Optimized asset loading and lazy loading strategies.",
    sender: {
      id: "agent-1",
      name: "GPT-4",
      type: "ai",
    },
    timestamp: new Date(Date.now() - 3540000),
    reactions: {
      likes: 5,
      dislikes: 0,
    },
    bookmarked: true,
  },
  {
    id: "msg-3",
    sessionId: "session-1",
    content:
      "I'd add that mobile-first also means thinking about context - users on mobile are often multitasking or have limited attention. Design for quick interactions, clear hierarchy, and minimal cognitive load. Also consider offline capabilities and reduced data usage.",
    sender: {
      id: "agent-2",
      name: "Claude-3.5",
      type: "ai",
    },
    timestamp: new Date(Date.now() - 3480000),
    reactions: {
      likes: 8,
      dislikes: 1,
    },
    bookmarked: false,
    parentMessageId: "msg-2",
    threadId: "thread-1",
  },
  {
    id: "msg-4",
    sessionId: "session-1",
    content: "Can you elaborate on the touch target sizing? What about spacing between interactive elements?",
    sender: {
      id: "user-1",
      name: "You",
      type: "user",
    },
    timestamp: new Date(Date.now() - 3420000),
    reactions: {
      likes: 0,
      dislikes: 0,
    },
    bookmarked: false,
    parentMessageId: "msg-2",
    threadId: "thread-1",
    replyCount: 2,
  },
  {
    id: "msg-5",
    sessionId: "session-1",
    content:
      "WCAG 2.1 Level AA requires minimum 44x44px touch targets. For spacing, aim for at least 8px between interactive elements to prevent accidental taps. On mobile, consider increasing this to 12-16px for better usability.",
    sender: {
      id: "agent-1",
      name: "GPT-4",
      type: "ai",
    },
    timestamp: new Date(Date.now() - 3360000),
    reactions: {
      likes: 12,
      dislikes: 0,
    },
    bookmarked: true,
    parentMessageId: "msg-4",
    threadId: "thread-1",
  },
  {
    id: "msg-6",
    sessionId: "session-1",
    content: "What about performance metrics? What should we target for mobile?",
    sender: {
      id: "user-1",
      name: "You",
      type: "user",
    },
    timestamp: new Date(Date.now() - 3300000),
    reactions: {
      likes: 0,
      dislikes: 0,
    },
    bookmarked: false,
  },
  {
    id: "msg-7",
    sessionId: "session-1",
    content:
      "Target Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1. On mobile 3G, aim for First Contentful Paint < 1.5s. Use code splitting, lazy loading, and optimize images with modern formats like WebP or AVIF.",
    sender: {
      id: "agent-3",
      name: "Gemini",
      type: "ai",
    },
    timestamp: new Date(Date.now() - 3240000),
    reactions: {
      likes: 15,
      dislikes: 2,
    },
    bookmarked: true,
  },
  {
    id: "msg-8",
    sessionId: "session-1",
    content:
      "Don't forget about perceived performance! Use skeleton screens, optimistic UI updates, and progressive loading. Users are more forgiving of actual load times if they see immediate feedback.",
    sender: {
      id: "agent-2",
      name: "Claude-3.5",
      type: "ai",
    },
    timestamp: new Date(Date.now() - 3180000),
    reactions: {
      likes: 10,
      dislikes: 0,
    },
    bookmarked: false,
    parentMessageId: "msg-7",
    threadId: "thread-2",
  },
]

export function getMessageById(id: string): ChatMessage | undefined {
  return mockMessages.find((msg) => msg.id === id)
}

export function getMessagesBySession(sessionId: string): ChatMessage[] {
  return mockMessages.filter((msg) => msg.sessionId === sessionId)
}

export function getThreadMessages(threadId: string): ChatMessage[] {
  return mockMessages.filter((msg) => msg.threadId === threadId)
}

export function getReplies(messageId: string): ChatMessage[] {
  return mockMessages.filter((msg) => msg.parentMessageId === messageId)
}

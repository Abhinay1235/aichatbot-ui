/**
 * Shared TypeScript types
 */

// API Request Types
export interface ChatRequest {
  message: string
  session_id?: string
  conversation_history?: Array<{
    role: 'user' | 'assistant'
    content: string
  }>
}

export interface SessionCreateRequest {
  // Empty - sessions are auto-created
}

// API Response Types
export interface ChatResponse {
  success: boolean
  response: string
  session_id?: string
  sql_query?: string
  query_results?: {
    row_count: number
    columns: string[]
  }
  error?: string
}

export interface SessionResponse {
  session_id: string
  created_at: string
  message_count: number
}

export interface SessionListResponse {
  sessions: SessionResponse[]
}

export interface ConversationResponse {
  session_id: string
  messages: Message[]
}

export interface MessageResponse {
  id: number
  session_id: string
  role: 'user' | 'assistant'
  content: string
  created_at: string
}

// UI Types
export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp?: string
  sql_query?: string
  query_results?: {
    row_count: number
    columns: string[]
  }
  id?: string // Client-side ID for React keys
}

export interface Session {
  session_id: string
  created_at: string
  updated_at?: string // Optional - API doesn't always return this
  message_count: number
}

export interface Message {
  id: number
  session_id: string
  role: 'user' | 'assistant'
  content: string
  created_at: string
}

export interface Conversation {
  session_id: string
  messages: Message[]
}

// Error Types
export interface ApiError {
  message: string
  status?: number
  detail?: string
}

// UI Types
export type ThemeMode = 'light' | 'dark'

export interface AppState {
  currentSessionId: string | null
  theme: ThemeMode
}


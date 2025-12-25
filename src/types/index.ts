/**
 * Shared TypeScript types
 */

// API Types
export interface ChatRequest {
  message: string
  session_id?: string
  conversation_history?: ChatMessage[]
}

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

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp?: string
  sql_query?: string
  query_results?: {
    row_count: number
    columns: string[]
  }
}

export interface Session {
  session_id: string
  created_at: string
  updated_at: string
  message_count: number
}

export interface Conversation {
  session_id: string
  messages: Message[]
}

export interface Message {
  id: number
  session_id: string
  role: 'user' | 'assistant'
  content: string
  created_at: string
}

// UI Types
export type ThemeMode = 'light' | 'dark'

export interface AppState {
  currentSessionId: string | null
  theme: ThemeMode
}


/**
 * Chat store using Zustand
 * Manages chat messages, session ID, and loading states
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ChatMessage } from '@types'
import { STORAGE_KEYS } from '@utils/constants'

interface ChatState {
  // Messages in current conversation
  messages: ChatMessage[]
  
  // Current session ID
  sessionId: string | null
  
  // Loading states
  isSending: boolean
  isTyping: boolean
  
  // Error state
  error: string | null
  
  // Actions
  addMessage: (message: ChatMessage) => void
  setMessages: (messages: ChatMessage[]) => void
  setSessionId: (sessionId: string | null) => void
  setIsSending: (isSending: boolean) => void
  setIsTyping: (isTyping: boolean) => void
  setError: (error: string | null) => void
  clearMessages: () => void
  clearError: () => void
  reset: () => void
}

const initialState = {
  messages: [],
  sessionId: null,
  isSending: false,
  isTyping: false,
  error: null,
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      ...initialState,
      
      addMessage: (message: ChatMessage) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),
      
      setMessages: (messages: ChatMessage[]) =>
        set({ messages }),
      
      setSessionId: (sessionId: string | null) =>
        set({ sessionId }),
      
      setIsSending: (isSending: boolean) =>
        set({ isSending }),
      
      setIsTyping: (isTyping: boolean) =>
        set({ isTyping }),
      
      setError: (error: string | null) =>
        set({ error }),
      
      clearMessages: () =>
        set({ messages: [] }),
      
      clearError: () =>
        set({ error: null }),
      
      reset: () =>
        set(initialState),
    }),
    {
      name: STORAGE_KEYS.SESSION_ID, // Store session ID in localStorage
      partialize: (state) => ({
        sessionId: state.sessionId, // Only persist session ID
      }),
    }
  )
)


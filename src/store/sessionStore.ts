/**
 * Session store using Zustand
 * Manages list of sessions and current session
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Session } from '@types'
import { STORAGE_KEYS } from '@utils/constants'

interface SessionState {
  // List of all sessions
  sessions: Session[]
  
  // Current active session
  currentSession: Session | null
  
  // Loading states
  isLoadingSessions: boolean
  isLoadingSession: boolean
  
  // Error state
  error: string | null
  
  // Actions
  setSessions: (sessions: Session[]) => void
  addSession: (session: Session) => void
  updateSession: (sessionId: string, updates: Partial<Session>) => void
  removeSession: (sessionId: string) => void
  setCurrentSession: (session: Session | null) => void
  setIsLoadingSessions: (isLoading: boolean) => void
  setIsLoadingSession: (isLoading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
  reset: () => void
}

const initialState = {
  sessions: [],
  currentSession: null,
  isLoadingSessions: false,
  isLoadingSession: false,
  error: null,
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      ...initialState,
      
      setSessions: (sessions: Session[]) =>
        set({ sessions }),
      
      addSession: (session: Session) =>
        set((state) => ({
          sessions: [session, ...state.sessions], // Add to beginning
        })),
      
      updateSession: (sessionId: string, updates: Partial<Session>) =>
        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.session_id === sessionId ? { ...s, ...updates } : s
          ),
          currentSession:
            state.currentSession?.session_id === sessionId
              ? { ...state.currentSession, ...updates }
              : state.currentSession,
        })),
      
      removeSession: (sessionId: string) =>
        set((state) => ({
          sessions: state.sessions.filter((s) => s.session_id !== sessionId),
          currentSession:
            state.currentSession?.session_id === sessionId
              ? null
              : state.currentSession,
        })),
      
      setCurrentSession: (session: Session | null) =>
        set({ currentSession: session }),
      
      setIsLoadingSessions: (isLoading: boolean) =>
        set({ isLoadingSessions: isLoading }),
      
      setIsLoadingSession: (isLoading: boolean) =>
        set({ isLoadingSession: isLoading }),
      
      setError: (error: string | null) =>
        set({ error }),
      
      clearError: () =>
        set({ error: null }),
      
      reset: () =>
        set(initialState),
    }),
    {
      name: STORAGE_KEYS.SESSIONS, // Store sessions in localStorage
      partialize: (state) => ({
        sessions: state.sessions, // Persist sessions list
        currentSession: state.currentSession, // Persist current session
      }),
    }
  )
)


/**
 * Session API hooks using React Query
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { sessionService } from '@services/api'
import type { SessionListResponse, ConversationResponse } from '@types'
import { getErrorMessage } from './useApi'

/**
 * Hook to get all sessions
 */
export const useSessions = (limit: number = 100) => {
  return useQuery<SessionListResponse, Error>({
    queryKey: ['sessions', limit],
    queryFn: () => sessionService.getAllSessions(limit),
    staleTime: 30 * 1000, // 30 seconds
  })
}

/**
 * Hook to get a specific session with conversation history
 */
export const useSession = (
  sessionId: string | null,
  options?: { enabled?: boolean }
) => {
  return useQuery<ConversationResponse, Error>({
    queryKey: ['session', sessionId],
    queryFn: () => {
      if (!sessionId) {
        throw new Error('Session ID is required')
      }
      return sessionService.getSession(sessionId)
    },
    enabled: options?.enabled !== undefined ? options.enabled : !!sessionId, // Only run query if sessionId exists
    staleTime: 10 * 1000, // 10 seconds - conversation can change frequently
  })
}

/**
 * Hook to create a new session
 */
export const useCreateSession = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => sessionService.createSession(),
    onSuccess: () => {
      // Invalidate sessions list
      queryClient.invalidateQueries({ queryKey: ['sessions'] })
    },
    onError: (error) => {
      console.error('Error creating session:', getErrorMessage(error))
    },
  })
}

/**
 * Hook to delete a session
 */
export const useDeleteSession = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (sessionId: string) => sessionService.deleteSession(sessionId),
    onSuccess: (_, sessionId) => {
      // Invalidate sessions list and the specific session
      queryClient.invalidateQueries({ queryKey: ['sessions'] })
      queryClient.removeQueries({ queryKey: ['session', sessionId] })
    },
    onError: (error) => {
      console.error('Error deleting session:', getErrorMessage(error))
    },
  })
}


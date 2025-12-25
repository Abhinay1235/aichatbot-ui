/**
 * Enhanced Chat hook - Comprehensive chat functionality
 * Handles message sending, conversation history, and state management
 */

import { useCallback } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { chatService } from '@services/api'
import { useChatStore } from '@store'
import { useSessionStore } from '@store'
import type { ChatRequest, ChatResponse } from '@types'
import { getErrorMessage } from './useApi'
import { CHAT_CONFIG } from '@utils/constants'

/**
 * Enhanced hook for chat functionality
 * Manages sending messages, conversation history, and state
 */
export const useChat = () => {
  const queryClient = useQueryClient()
  
  // Chat store state
  const {
    messages,
    sessionId,
    isSending,
    isTyping,
    error,
    addMessage,
    setSessionId,
    setIsSending,
    setIsTyping,
    setError,
    clearError,
  } = useChatStore()

  // Session store
  const { addSession, updateSession } = useSessionStore()

  // Send message mutation
  const sendMessageMutation = useMutation<ChatResponse, Error, ChatRequest>({
    mutationFn: (request: ChatRequest) => chatService.sendMessage(request),
    onSuccess: (data) => {
      // Invalidate session queries when a new message is sent
      if (data.session_id) {
        queryClient.invalidateQueries({ queryKey: ['session', data.session_id] })
        queryClient.invalidateQueries({ queryKey: ['sessions'] })
      }
    },
    onError: (error) => {
      console.error('Error sending message:', getErrorMessage(error))
    },
  })


  /**
   * Send a message to the chatbot
   */
  const sendMessage = useCallback(
    async (messageText: string) => {
      if (!messageText.trim() || isSending) {
        return
      }

      clearError()
      setIsSending(true)
      setIsTyping(true)

      try {
        // Get current messages for conversation history
        const currentMessages = useChatStore.getState().messages
        
        // Add user message immediately (optimistic update)
        const userMessage = {
          role: 'user' as const,
          content: messageText,
          timestamp: new Date().toISOString(),
          id: `user-${Date.now()}`,
        }
        addMessage(userMessage)

        // Build conversation history from current messages (before adding new one)
        const recentMessages = currentMessages.slice(-CHAT_CONFIG.MAX_CONTEXT_MESSAGES)
        const conversationHistory = recentMessages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        }))

        // Build request with conversation history
        const currentSessionId = useChatStore.getState().sessionId
        const request: ChatRequest = {
          message: messageText,
          session_id: currentSessionId || undefined,
          conversation_history: conversationHistory,
        }

        // Send to API
        const response = await sendMessageMutation.mutateAsync(request)

        // Add assistant response
        const assistantMessage = {
          role: 'assistant' as const,
          content: response.response,
          timestamp: new Date().toISOString(),
          sql_query: response.sql_query,
          query_results: response.query_results,
          id: `assistant-${Date.now()}`,
        }
        addMessage(assistantMessage)

        // Update session ID if new session was created
        if (response.session_id) {
          const updatedSessionId = useChatStore.getState().sessionId
          if (!updatedSessionId) {
            // New session created
            setSessionId(response.session_id)
            // Add to session store
            addSession({
              session_id: response.session_id,
              created_at: new Date().toISOString(),
              message_count: 2, // User + Assistant
            })
          } else {
            // Update existing session message count
            const updatedMessages = useChatStore.getState().messages
            updateSession(updatedSessionId, {
              message_count: updatedMessages.length,
            })
          }
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to send message'
        setError(errorMessage)
        // Remove the optimistic user message on error
        // Note: In a production app, you might want to mark it as failed instead
      } finally {
        setIsSending(false)
        setIsTyping(false)
      }
    },
    [
      isSending,
      addMessage,
      setSessionId,
      setIsSending,
      setIsTyping,
      setError,
      clearError,
      sendMessageMutation,
      addSession,
      updateSession,
    ]
  )

  return {
    // State
    messages,
    sessionId,
    isSending,
    isTyping,
    error,
    
    // Actions
    sendMessage,
    clearError,
    
    // Mutation for advanced usage
    sendMessageMutation,
  }
}

/**
 * Hook to send a chat message (simpler version, backward compatible)
 */
export const useSendMessage = () => {
  const queryClient = useQueryClient()

  return useMutation<ChatResponse, Error, ChatRequest>({
    mutationFn: (request: ChatRequest) => chatService.sendMessage(request),
    onSuccess: (data) => {
      // Invalidate session queries when a new message is sent
      if (data.session_id) {
        queryClient.invalidateQueries({ queryKey: ['session', data.session_id] })
        queryClient.invalidateQueries({ queryKey: ['sessions'] })
      }
    },
    onError: (error) => {
      console.error('Error sending message:', getErrorMessage(error))
    },
  })
}

/**
 * Chat page - Main chat interface with enhanced functionality
 */

import { useEffect, useCallback, useRef, useState } from 'react'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import Layout from '@components/layout/Layout'
import ChatContainer from '@components/chat/ChatContainer'
import LoadingSpinner from '@components/common/LoadingSpinner'
import ErrorMessage from '@components/common/ErrorMessage'
import { useChatStore } from '@store'
import { useSessionStore } from '@store'
import { useChat } from '@hooks/useChat'
import { useSessions, useSession, useCreateSession, useDeleteSession } from '@hooks/useSessions'
import { useKeyboardShortcuts } from '@hooks/useKeyboardShortcuts'
import type { Session } from '@types'
import type { ChatInputHandle } from '@components/chat/ChatInput'

export const ChatPage = () => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
  const inputRef = useRef<ChatInputHandle>(null)
  const [sidebarToggle, setSidebarToggle] = useState(0) // Force re-render for sidebar toggle

  const {
    messages,
    sessionId,
    isSending,
    isTyping,
    error,
    setMessages,
    setSessionId,
    clearMessages,
    clearError,
  } = useChatStore()

  const {
    currentSession,
    setCurrentSession,
    setSessions,
    removeSession,
  } = useSessionStore()

  // Enhanced chat hook
  const { sendMessage: handleSendMessage } = useChat()

  // Fetch sessions list
  const { data: sessionsData, isLoading: isLoadingSessions, refetch: refetchSessions } = useSessions()
  const { mutateAsync: createSession } = useCreateSession()
  const { mutateAsync: deleteSession } = useDeleteSession()

  // Fetch current session messages if sessionId exists
  const {
    data: sessionData,
    isLoading: isLoadingSession,
  } = useSession(sessionId, { enabled: !!sessionId })

  // Update sessions list when fetched
  useEffect(() => {
    if (sessionsData?.sessions) {
      setSessions(sessionsData.sessions)
    }
  }, [sessionsData, setSessions])

  // Load messages when session data is fetched
  useEffect(() => {
    if (sessionData?.messages && sessionId) {
      const chatMessages = sessionData.messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
        timestamp: msg.created_at,
        id: msg.id.toString(),
      }))
      setMessages(chatMessages)
    } else if (!sessionId) {
      // Clear messages if no session
      setMessages([])
    }
  }, [sessionData, sessionId, setMessages])

  // Set current session when sessionId changes
  useEffect(() => {
    if (sessionId && sessionsData?.sessions) {
      const session = sessionsData.sessions.find((s) => s.session_id === sessionId)
      if (session) {
        setCurrentSession(session)
      }
    } else {
      setCurrentSession(null)
    }
  }, [sessionId, sessionsData, setCurrentSession])

  const handleNewSession = useCallback(async () => {
    try {
      const newSession = await createSession()
      // Convert SessionResponse to Session format
      const session: Session = {
        session_id: newSession.session_id,
        created_at: newSession.created_at,
        message_count: newSession.message_count,
      }
      setSessionId(newSession.session_id)
      setCurrentSession(session)
      clearMessages()
      clearError()
      // Refetch sessions to update the list
      await refetchSessions()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create session'
      // We'll handle this through the error state if needed
      console.error('Error creating session:', errorMessage)
    }
  }, [createSession, setSessionId, setCurrentSession, clearMessages, clearError, refetchSessions])

  const handleSelectSession = useCallback((selectedSessionId: string) => {
    setSessionId(selectedSessionId)
    clearError()
  }, [setSessionId, clearError])

  const handleDeleteSession = useCallback(async (sessionIdToDelete: string) => {
    try {
      await deleteSession(sessionIdToDelete)
      // Remove from store
      removeSession(sessionIdToDelete)
      
      // If deleted session was current, clear it
      if (sessionIdToDelete === sessionId) {
        setSessionId(null)
        clearMessages()
        setCurrentSession(null)
      }
      
      // Refetch sessions list
      await refetchSessions()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete session'
      console.error('Error deleting session:', errorMessage)
      // Re-throw to let the component handle it (show error state)
      throw err
    }
  }, [deleteSession, removeSession, sessionId, setSessionId, clearMessages, setCurrentSession, refetchSessions])

  const handleToggleSidebar = useCallback(() => {
    setSidebarToggle((prev) => prev + 1)
  }, [])

  // Keyboard shortcuts (only on desktop)
  useKeyboardShortcuts({
    onFocusInput: () => inputRef.current?.focus(),
    onNewSession: handleNewSession,
    onToggleSidebar: handleToggleSidebar,
    enabled: isDesktop,
  })

  if (isLoadingSessions || (isLoadingSession && sessionId)) {
    return (
      <Layout
        onNewSession={handleNewSession}
        onSelectSession={handleSelectSession}
        onDeleteSession={handleDeleteSession}
        currentSessionId={sessionId}
        sidebarToggleTrigger={sidebarToggle}
      >
        <LoadingSpinner message="Loading chat..." />
      </Layout>
    )
  }

  return (
    <Layout
      onNewSession={handleNewSession}
      onSelectSession={handleSelectSession}
      onDeleteSession={handleDeleteSession}
      currentSessionId={sessionId}
    >
      {error && (
        <Box sx={{ p: 2 }}>
          <ErrorMessage
            message={error}
            onRetry={() => clearError()}
            retryLabel="Dismiss"
          />
        </Box>
      )}
      <ChatContainer
        messages={messages}
        isTyping={isTyping}
        onSendMessage={handleSendMessage}
        isSending={isSending}
        inputRef={inputRef}
      />
    </Layout>
  )
}

export default ChatPage

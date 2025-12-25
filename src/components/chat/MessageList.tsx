/**
 * Message list component - Scrollable, Mobile-first & Accessible
 */

import { Box, Typography } from '@mui/material'
import { useEffect, useRef, useMemo, memo, useCallback } from 'react'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'
import type { ChatMessage } from '@types'

interface MessageListProps {
  messages: ChatMessage[]
  isTyping?: boolean
}

export const MessageList = memo(({ messages, isTyping = false }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Memoize empty state to prevent re-renders
  const isEmpty = useMemo(() => messages.length === 0, [messages.length])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Memoize message rendering to prevent unnecessary re-renders
  const renderedMessages = useMemo(() => {
    return messages.map((message, index) => (
      <MessageBubble key={message.id || `msg-${index}`} message={message} />
    ))
  }, [messages])

  return (
    <Box
      component="section"
      aria-label="Chat messages"
      sx={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        py: { xs: 2, sm: 3, md: 3 },
        px: { 
          xs: 0, 
          sm: 1, 
          md: 2, // More padding on tablet
          lg: 3, // Even more on desktop
        },
        // Smooth scrolling
        scrollBehavior: 'smooth',
        // Custom scrollbar - enhanced for tablet/desktop
        '&::-webkit-scrollbar': {
          width: { xs: '8px', md: '12px' }, // Wider on larger screens
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,0.2)',
          borderRadius: '4px',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.3)', // Hover state for desktop
          },
        },
      }}
    >
      {isEmpty ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            px: 2,
            textAlign: 'center',
          }}
        >
          <Box>
            <Typography variant="body1" color="text.secondary">
              Start a conversation by asking a question about the Uber trip data.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Try: "How many total trips are there?"
            </Typography>
          </Box>
        </Box>
      ) : (
        <>
          {renderedMessages}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} aria-hidden="true" />
        </>
      )}
    </Box>
  )
})

MessageList.displayName = 'MessageList'

export default MessageList


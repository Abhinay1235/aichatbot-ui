/**
 * Virtualized Message List Component
 * Only renders visible messages for performance with long conversations
 * Uses intersection observer for efficient rendering
 */

import { Box, Typography, Chip, Stack } from '@mui/material'
import { useEffect, useRef, useMemo, memo, useState, useCallback } from 'react'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'
import type { ChatMessage } from '@types'
import { 
  Info as InfoIcon,
  QuestionAnswer as QuestionIcon,
  Analytics as AnalyticsIcon
} from '@mui/icons-material'

interface VirtualizedMessageListProps {
  messages: ChatMessage[]
  isTyping?: boolean
  // Threshold for enabling virtualization (number of messages)
  virtualizationThreshold?: number
}

const ITEM_HEIGHT_ESTIMATE = 120 // Estimated height per message in pixels
const BUFFER_SIZE = 3 // Number of items to render outside viewport

export const VirtualizedMessageList = memo(({ 
  messages, 
  isTyping = false,
  virtualizationThreshold = 20 
}: VirtualizedMessageListProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: messages.length })

  // Determine if we should use virtualization
  const shouldVirtualize = messages.length > virtualizationThreshold

  // Calculate visible range based on scroll position
  const calculateVisibleRange = useCallback(() => {
    if (!containerRef.current || !shouldVirtualize) {
      setVisibleRange({ start: 0, end: messages.length })
      return
    }

    const container = containerRef.current
    const containerRect = container.getBoundingClientRect()
    const scrollTop = container.scrollTop
    const viewportHeight = containerRect.height

    // Calculate which items should be visible
    const start = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT_ESTIMATE) - BUFFER_SIZE)
    const end = Math.min(
      messages.length,
      Math.ceil((scrollTop + viewportHeight) / ITEM_HEIGHT_ESTIMATE) + BUFFER_SIZE
    )

    setVisibleRange({ start, end })
  }, [messages.length, shouldVirtualize])

  // Handle scroll events
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      calculateVisibleRange()
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    
    // Initial calculation
    calculateVisibleRange()

    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [calculateVisibleRange])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > 0) {
      const container = containerRef.current
      if (container) {
        // Always scroll to bottom when new messages arrive
        // Use a small delay to ensure DOM is updated
        setTimeout(() => {
          if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
          } else {
            // Fallback: scroll container to bottom
            container.scrollTo({
              top: container.scrollHeight,
              behavior: 'smooth'
            })
          }
        }, 100)
      }
    }
  }, [messages.length, isTyping])

  // Memoize empty state
  const isEmpty = useMemo(() => messages.length === 0, [messages.length])

  // Memoize visible messages
  const visibleMessages = useMemo(() => {
    if (!shouldVirtualize) {
      return messages
    }
    return messages.slice(visibleRange.start, visibleRange.end)
  }, [messages, visibleRange.start, visibleRange.end, shouldVirtualize])

  // Calculate spacer heights for virtualization
  const topSpacerHeight = shouldVirtualize ? visibleRange.start * ITEM_HEIGHT_ESTIMATE : 0
  const bottomSpacerHeight = shouldVirtualize 
    ? (messages.length - visibleRange.end) * ITEM_HEIGHT_ESTIMATE 
    : 0

  return (
    <Box
      ref={containerRef}
      component="section"
      aria-label="Chat messages"
      sx={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        py: { xs: 3, sm: 4, md: 4 },
        px: { 
          xs: 2, 
          sm: 3, 
          md: 4,
          lg: 5,
        },
        scrollBehavior: 'smooth',
        backgroundColor: 'background.default',
        '&::-webkit-scrollbar': {
          width: { xs: '6px', md: '8px' },
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,0.15)',
          borderRadius: '4px',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.25)',
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
          <Box sx={{ maxWidth: 600 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                borderRadius: '50%',
                backgroundColor: 'primary.light',
                color: 'primary.contrastText',
                mb: 3,
              }}
            >
              <InfoIcon sx={{ fontSize: { xs: 32, sm: 40 } }} />
            </Box>
            
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'text.primary',
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
              }}
            >
              Welcome to AI Chatbot
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'text.primary',
                mb: 3,
                lineHeight: 1.8,
                fontSize: { xs: '0.95rem', sm: '1rem' }
              }}
            >
              This AI-powered chatbot helps you explore and analyze <strong>Car Rides data</strong> from{' '}
              <strong>July 01, 2024 to July 31, 2024</strong> using natural language.
            </Typography>

            <Box
              sx={{
                backgroundColor: 'background.paper',
                borderRadius: 2,
                p: 3,
                mb: 3,
                border: '1px solid',
                borderColor: 'divider',
                textAlign: 'left',
              }}
            >
              <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
                <Chip 
                  icon={<AnalyticsIcon sx={{ fontSize: 18 }} />}
                  label="Data Analysis" 
                  size="small"
                  color="primary"
                  variant="outlined"
                />
                <Chip 
                  icon={<QuestionIcon sx={{ fontSize: 18 }} />}
                  label="Natural Language" 
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Stack>
              
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.secondary',
                  mb: 2,
                  lineHeight: 1.7
                }}
              >
                <strong>What you can do:</strong>
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2.5, color: 'text.secondary' }}>
                <li>Ask questions about ride bookings, cancellations, and patterns</li>
                <li>Query specific metrics like total trips, average fare, or ride durations</li>
                <li>Explore data by date, location, or ride type</li>
                <li>Get insights through conversational follow-up questions</li>
              </Box>
            </Box>

            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                mb: 1,
                fontWeight: 600
              }}
            >
              Try asking:
            </Typography>
            <Stack spacing={1} sx={{ mb: 2 }}>
              <Chip 
                label='"How many total trips are there?"'
                size="small"
                sx={{ 
                  fontStyle: 'italic',
                  backgroundColor: 'action.hover',
                  color: 'text.primary'
                }}
              />
              <Chip 
                label='"What is the average fare amount?"'
                size="small"
                sx={{ 
                  fontStyle: 'italic',
                  backgroundColor: 'action.hover',
                  color: 'text.primary'
                }}
              />
              <Chip 
                label='"Show me trips from July 15th"'
                size="small"
                sx={{ 
                  fontStyle: 'italic',
                  backgroundColor: 'action.hover',
                  color: 'text.primary'
                }}
              />
            </Stack>

            <Typography 
              variant="caption" 
              sx={{ 
                color: 'text.secondary',
                opacity: 0.7,
                fontStyle: 'italic'
              }}
            >
              Start typing your question below to begin exploring the data!
            </Typography>
          </Box>
        </Box>
      ) : (
        <>
          {/* Top spacer for virtualized items */}
          {shouldVirtualize && topSpacerHeight > 0 && (
            <Box sx={{ height: topSpacerHeight }} aria-hidden="true" />
          )}
          
          {/* Render visible messages */}
          {visibleMessages.map((message, index) => {
            const actualIndex = shouldVirtualize ? visibleRange.start + index : index
            return (
              <MessageBubble 
                key={message.id || `msg-${actualIndex}`} 
                message={message} 
              />
            )
          })}
          
          {isTyping && <TypingIndicator />}
          
          {/* Bottom spacer for virtualized items */}
          {shouldVirtualize && bottomSpacerHeight > 0 && (
            <Box sx={{ height: bottomSpacerHeight }} aria-hidden="true" />
          )}
          
          <div ref={messagesEndRef} aria-hidden="true" />
        </>
      )}
    </Box>
  )
})

VirtualizedMessageList.displayName = 'VirtualizedMessageList'

export default VirtualizedMessageList


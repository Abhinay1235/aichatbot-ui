/**
 * Message bubble component - Mobile-first & Accessible
 */

import { Box, Paper, Typography, IconButton, Collapse, Chip } from '@mui/material'
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material'
import { useState, memo } from 'react'
import { format } from 'date-fns'
import type { ChatMessage } from '@types'

interface MessageBubbleProps {
  message: ChatMessage
}

export const MessageBubble = memo(({ message }: MessageBubbleProps) => {
  const [showDetails, setShowDetails] = useState(false)
  const isUser = message.role === 'user'

  return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: isUser ? 'flex-end' : 'flex-start',
          mb: 3,
          px: { xs: 1, sm: 2 },
        }}
        role="article"
        aria-label={`${message.role} message`}
      >
      <Paper
        elevation={isUser ? 0 : 1}
        sx={{
          maxWidth: { xs: '85%', sm: '70%', md: '65%', lg: '55%' }, // Responsive width
          p: { xs: 2, sm: 2.5, md: 3 }, // More padding
          backgroundColor: isUser 
            ? 'primary.main' 
            : 'background.paper',
          color: isUser ? 'primary.contrastText' : 'text.primary',
          borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px', // Rounded corners with tail effect
          transition: 'all 0.2s ease',
          boxShadow: isUser 
            ? '0 2px 8px rgba(25, 118, 210, 0.2)' 
            : '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
          // Desktop hover effects
          '@media (min-width: 1024px)': {
            '&:hover': {
              boxShadow: isUser
                ? '0 4px 12px rgba(25, 118, 210, 0.3)'
                : '0 2px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.2)',
              transform: 'translateY(-1px)',
            },
          },
        }}
      >
        {/* Message Content */}
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '0.9375rem', sm: '1rem' },
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            fontWeight: 400,
            letterSpacing: '0.01em',
          }}
        >
          {message.content}
        </Typography>

        {/* Timestamp */}
        {message.timestamp && (
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              mt: 1.5,
              opacity: isUser ? 0.8 : 0.6,
              fontSize: '0.7rem',
              fontWeight: 500,
            }}
          >
            {format(new Date(message.timestamp), 'h:mm a')}
          </Typography>
        )}

        {/* SQL Query & Results (Debug Info) */}
        {(message.sql_query || message.query_results) && (
          <Box sx={{ mt: 1.5 }}>
            <IconButton
              size="small"
              onClick={() => setShowDetails(!showDetails)}
              aria-label={showDetails ? 'Hide details' : 'Show details'}
              sx={{
                minWidth: 32,
                minHeight: 32,
                color: isUser ? 'primary.contrastText' : 'text.secondary',
              }}
            >
              {showDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
            <Collapse in={showDetails}>
              <Box sx={{ mt: 1, pt: 1, borderTop: 1, borderColor: 'divider' }}>
                {message.sql_query && (
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>
                      SQL Query:
                    </Typography>
                    <Box
                      component="code"
                      sx={{
                        display: 'block',
                        p: 1,
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        borderRadius: 1,
                        fontSize: '0.75rem',
                        overflowX: 'auto',
                      }}
                    >
                      {message.sql_query}
                    </Box>
                  </Box>
                )}
                {message.query_results && (
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>
                      Results:
                    </Typography>
                    <Chip
                      label={`${message.query_results.row_count} rows, ${message.query_results.columns.length} columns`}
                      size="small"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  </Box>
                )}
              </Box>
            </Collapse>
          </Box>
        )}
      </Paper>
    </Box>
  )
})

MessageBubble.displayName = 'MessageBubble'

export default MessageBubble


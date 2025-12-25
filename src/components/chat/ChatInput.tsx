/**
 * Chat input component - Mobile-first & Accessible
 */

import { Box, TextField, IconButton, Paper } from '@mui/material'
import { Send as SendIcon } from '@mui/icons-material'
import { useState, KeyboardEvent, useRef, useEffect, forwardRef, useImperativeHandle, memo } from 'react'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
  placeholder?: string
}

export interface ChatInputHandle {
  focus: () => void
}

export const ChatInput = memo(forwardRef<ChatInputHandle, ChatInputProps>(({
  onSend,
  disabled = false,
  placeholder = 'Ask a question about the Uber trip data...',
}, ref) => {
  const [message, setMessage] = useState('')
  const textFieldRef = useRef<HTMLTextAreaElement>(null)

  useImperativeHandle(ref, () => ({
    focus: () => {
      textFieldRef.current?.focus()
    },
  }))

  const handleSend = () => {
    const trimmedMessage = message.trim()
    if (trimmedMessage && !disabled) {
      onSend(trimmedMessage)
      setMessage('')
      // Refocus input after sending
      setTimeout(() => {
        textFieldRef.current?.focus()
      }, 100)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Auto-resize textarea
  useEffect(() => {
    if (textFieldRef.current) {
      textFieldRef.current.style.height = 'auto'
      const scrollHeight = textFieldRef.current.scrollHeight
      const maxHeight = 120 // Max height for mobile
      textFieldRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`
    }
  }, [message])

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5, md: 3 },
        borderRadius: 0,
        borderTop: 1,
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        transition: 'all 0.2s ease',
        // Desktop hover effect
        '@media (min-width: 1024px)': {
          '&:hover': {
            boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.08)',
          },
        },
      }}
      component="form"
      onSubmit={(e) => {
        e.preventDefault()
        handleSend()
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 1,
          maxWidth: '100%',
        }}
      >
        <TextField
          inputRef={textFieldRef}
          fullWidth
          multiline
          maxRows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          variant="outlined"
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              fontSize: { xs: '0.9375rem', sm: '1rem', md: '1rem' },
              minHeight: { xs: 48, sm: 52, md: 52 },
              borderRadius: '24px',
              backgroundColor: 'background.default',
              '& fieldset': {
                borderColor: 'divider',
                borderWidth: '1px',
              },
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
                borderWidth: '2px',
              },
              '& textarea': {
                resize: 'none',
                maxHeight: { xs: '120px', md: '150px' },
                padding: '12px 16px',
              },
            },
          }}
          aria-label="Message input"
          aria-describedby="input-help-text"
        />
        <IconButton
          type="submit"
          onClick={handleSend}
          disabled={disabled || !message.trim()}
          color="primary"
          sx={{
            minWidth: 48,
            minHeight: 48,
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            '&:hover': {
              backgroundColor: 'primary.dark',
              transform: 'scale(1.05)',
            },
            '&:disabled': {
              backgroundColor: 'action.disabledBackground',
              color: 'action.disabled',
            },
            transition: 'all 0.2s ease',
            boxShadow: message.trim() ? '0 2px 8px rgba(25, 118, 210, 0.3)' : 'none',
          }}
          aria-label="Send message"
        >
          <SendIcon />
        </IconButton>
      </Box>
      <Box
        id="input-help-text"
        sx={{
          fontSize: '0.75rem',
          color: 'text.secondary',
          mt: 0.5,
          px: 1,
          display: { xs: 'none', sm: 'block' }, // Hide on mobile to save space
        }}
        aria-hidden="true"
      >
        Press Enter to send, Shift+Enter for new line
        <Box component="span" sx={{ display: { xs: 'none', lg: 'inline' }, ml: 1 }}>
          • Ctrl+K to focus input
        </Box>
      </Box>
    </Paper>
  )
}))

ChatInput.displayName = 'ChatInput'

export default ChatInput


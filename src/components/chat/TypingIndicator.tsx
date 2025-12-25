/**
 * Typing indicator component - Accessible
 */

import { Box, Paper, Typography } from '@mui/material'

export const TypingIndicator = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        mb: 2,
        px: { xs: 1, sm: 2 },
      }}
      role="status"
      aria-live="polite"
      aria-label="AI is typing"
    >
      <Paper
        elevation={1}
        sx={{
          p: { xs: 1.5, sm: 2 },
          backgroundColor: 'background.paper',
          borderRadius: 2,
          maxWidth: { xs: '85%', sm: '70%' },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              display: 'flex',
              gap: 0.5,
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: 'text.secondary',
                animation: 'typing 1.4s infinite',
                '@keyframes typing': {
                  '0%, 60%, 100%': {
                    transform: 'translateY(0)',
                    opacity: 0.7,
                  },
                  '30%': {
                    transform: 'translateY(-10px)',
                    opacity: 1,
                  },
                },
                '&:nth-of-type(1)': {
                  animationDelay: '0s',
                },
                '&:nth-of-type(2)': {
                  animationDelay: '0.2s',
                },
                '&:nth-of-type(3)': {
                  animationDelay: '0.4s',
                },
              }}
            />
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: 'text.secondary',
                animation: 'typing 1.4s infinite',
                animationDelay: '0.2s',
              }}
            />
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: 'text.secondary',
                animation: 'typing 1.4s infinite',
                animationDelay: '0.4s',
              }}
            />
          </Box>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontSize: '0.75rem',
            }}
          >
            AI is thinking...
          </Typography>
        </Box>
      </Paper>
    </Box>
  )
}

export default TypingIndicator


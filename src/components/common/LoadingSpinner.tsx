/**
 * Loading spinner component - Accessible
 */

import { Box, CircularProgress, Typography } from '@mui/material'

interface LoadingSpinnerProps {
  message?: string
  size?: number
  fullScreen?: boolean
}

export const LoadingSpinner = ({
  message = 'Loading...',
  size = 40,
  fullScreen = false,
}: LoadingSpinnerProps) => {
  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        minHeight: fullScreen ? '100vh' : 'auto',
        py: fullScreen ? 0 : 4,
      }}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <CircularProgress size={size} aria-hidden="true" />
      {message && (
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  )

  return content
}

export default LoadingSpinner


/**
 * Error message component - Accessible
 */

import { Alert, AlertTitle, Box } from '@mui/material'
import { ErrorOutline } from '@mui/icons-material'

interface ErrorMessageProps {
  message: string
  title?: string
  onRetry?: () => void
  retryLabel?: string
}

export const ErrorMessage = ({
  message,
  title = 'Error',
  onRetry,
  retryLabel = 'Retry',
}: ErrorMessageProps) => {
  return (
    <Alert
      severity="error"
      icon={<ErrorOutline />}
      role="alert"
      aria-live="assertive"
      sx={{
        m: 2,
        '& .MuiAlert-message': {
          width: '100%',
        },
      }}
    >
      <AlertTitle>{title}</AlertTitle>
      <Box>{message}</Box>
      {onRetry && (
        <Box sx={{ mt: 2 }}>
          <button
            onClick={onRetry}
            style={{
              padding: '8px 16px',
              backgroundColor: '#d32f2f',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              minHeight: '44px',
              minWidth: '44px',
            }}
            aria-label={retryLabel}
          >
            {retryLabel}
          </button>
        </Box>
      )}
    </Alert>
  )
}

export default ErrorMessage


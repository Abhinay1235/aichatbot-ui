import { Box, Container, Typography } from '@mui/material'

function App() {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h1" component="h1" gutterBottom>
          AI Chatbot UI
        </Typography>
        <Typography variant="body1" color="text.secondary">
          React + TypeScript + Vite + Material-UI
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Phase 1 Setup Complete! 🎉
        </Typography>
      </Box>
    </Container>
  )
}

export default App


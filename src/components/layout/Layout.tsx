/**
 * Main layout component - Mobile-first & Responsive
 */

import { Box, useMediaQuery, useTheme } from '@mui/material'
import { useState, useEffect } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import BottomNavigation from './BottomNavigation'

interface LayoutProps {
  children: React.ReactNode
  onNewSession: () => void
  onSelectSession: (sessionId: string) => void
  onDeleteSession?: (sessionId: string) => void
  currentSessionId: string | null
  sidebarToggleTrigger?: number // Increment this to trigger sidebar toggle
}

export const Layout = ({
  children,
  onNewSession,
  onSelectSession,
  onDeleteSession,
  currentSessionId,
  sidebarToggleTrigger = 0,
}: LayoutProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile) // Open on desktop, closed on mobile

  const handleMenuClick = () => {
    setSidebarOpen(true)
  }

  const handleSidebarClose = () => {
    setSidebarOpen(false)
  }

  // Listen for toggle requests from parent (via keyboard shortcuts)
  useEffect(() => {
    if (sidebarToggleTrigger > 0) {
      setSidebarOpen((prev) => !prev)
    }
  }, [sidebarToggleTrigger])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header
        onMenuClick={handleMenuClick}
        showMenuButton={isMobile}
        onNewChat={onNewSession}
      />
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar
          open={sidebarOpen}
          onClose={handleSidebarClose}
          onNewSession={onNewSession}
          onSelectSession={onSelectSession}
          onDeleteSession={onDeleteSession}
          currentSessionId={currentSessionId}
          variant={isMobile ? 'temporary' : 'persistent'}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            width: { md: `calc(100% - ${sidebarOpen ? 320 : 0}px)` },
            // Add padding bottom on mobile to account for bottom navigation
            pb: { xs: '64px', md: 0 },
            transition: 'width 0.3s ease', // Smooth transition for sidebar toggle
          }}
        >
          {children}
        </Box>
      </Box>
      <BottomNavigation />
    </Box>
  )
}

export default Layout


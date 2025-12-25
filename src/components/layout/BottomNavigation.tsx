/**
 * Bottom Navigation component - Mobile-first navigation
 * Only visible on mobile devices (320px-767px)
 */

import { BottomNavigation as MuiBottomNavigation, BottomNavigationAction, Paper, useTheme, useMediaQuery } from '@mui/material'
import { Chat as ChatIcon, History as HistoryIcon, Home as HomeIcon } from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

export const BottomNavigation = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate()
  const location = useLocation()
  const [value, setValue] = useState(0)

  // Update value based on current route
  useEffect(() => {
    if (location.pathname === '/') {
      setValue(0)
    } else if (location.pathname === '/chat') {
      setValue(1)
    } else if (location.pathname.startsWith('/sessions')) {
      setValue(2)
    }
  }, [location.pathname])

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    switch (newValue) {
      case 0:
        navigate('/')
        break
      case 1:
        navigate('/chat')
        break
      case 2:
        // For now, navigate to chat with sidebar open
        // In future, could have a dedicated sessions page
        navigate('/chat')
        break
    }
  }

  // Only show on mobile
  if (!isMobile) {
    return null
  }

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        borderTop: 1,
        borderColor: 'divider',
      }}
      elevation={3}
    >
      <MuiBottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
        sx={{
          height: 64, // Touch-friendly height
          '& .MuiBottomNavigationAction-root': {
            minWidth: 0,
            padding: '6px 12px',
            '&.Mui-selected': {
              color: 'primary.main',
            },
          },
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          aria-label="Navigate to home"
        />
        <BottomNavigationAction
          label="Chat"
          icon={<ChatIcon />}
          aria-label="Navigate to chat"
        />
        <BottomNavigationAction
          label="Sessions"
          icon={<HistoryIcon />}
          aria-label="View sessions"
        />
      </MuiBottomNavigation>
    </Paper>
  )
}

export default BottomNavigation


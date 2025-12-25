/**
 * Header component - Mobile-first & Accessible
 */

import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'

interface HeaderProps {
  onMenuClick?: () => void
  showMenuButton?: boolean
}

export const Header = ({ onMenuClick, showMenuButton = false }: HeaderProps) => {
  return (
    <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar
        sx={{
          minHeight: { xs: 56, sm: 64 }, // Mobile-first height
          px: { xs: 1, sm: 2 }, // Responsive padding
        }}
      >
        {showMenuButton && (
          <IconButton
            color="inherit"
            aria-label="Open menu"
            onClick={onMenuClick}
            edge="start"
            sx={{
              mr: 2,
              minWidth: 44,
              minHeight: 44,
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography
          variant="h6"
          component="h1"
          sx={{
            flexGrow: 1,
            fontSize: { xs: '1.125rem', sm: '1.25rem' }, // Mobile-first font size
            fontWeight: 600,
          }}
        >
          AI Chatbot
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header


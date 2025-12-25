/**
 * Header component - Mobile-first & Accessible
 */

import { AppBar, Toolbar, Typography, IconButton, Button, Box } from '@mui/material'
import { Menu as MenuIcon, Add as AddIcon } from '@mui/icons-material'

interface HeaderProps {
  onMenuClick?: () => void
  showMenuButton?: boolean
  onNewChat?: () => void
}

export const Header = ({ onMenuClick, showMenuButton = false, onNewChat }: HeaderProps) => {
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
        {onNewChat && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onNewChat}
            sx={{
              minHeight: { xs: 40, sm: 44 },
              fontSize: { xs: '0.875rem', sm: '1rem' },
              px: { xs: 1.5, sm: 2 },
              textTransform: 'none',
              backgroundColor: 'background.paper',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
              New Chat
            </Box>
            <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
              New
            </Box>
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header


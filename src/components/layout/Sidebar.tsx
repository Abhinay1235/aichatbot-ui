/**
 * Sidebar component - Mobile-first (drawer on mobile, sidebar on desktop)
 */

import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
  Chip,
} from '@mui/material'
import { Close as CloseIcon, Add as AddIcon, MoreVert as MoreVertIcon, History as HistoryIcon } from '@mui/icons-material'
import { useState } from 'react'
import { useSessionStore } from '@store'
import { format } from 'date-fns'

interface SidebarProps {
  open: boolean
  onClose: () => void
  onNewSession: () => void
  onSelectSession: (sessionId: string) => void
  onDeleteSession?: (sessionId: string) => void
  currentSessionId: string | null
  variant?: 'temporary' | 'persistent'
}

export const Sidebar = ({
  open,
  onClose,
  onNewSession,
  onSelectSession,
  onDeleteSession,
  currentSessionId,
  variant = 'temporary',
}: SidebarProps) => {
  const sessions = useSessionStore((state) => state.sessions)
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
  const [selectedSessionForMenu, setSelectedSessionForMenu] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, sessionId: string) => {
    event.stopPropagation()
    setMenuAnchor(event.currentTarget)
    setSelectedSessionForMenu(sessionId)
  }

  const handleMenuClose = () => {
    setMenuAnchor(null)
    setSelectedSessionForMenu(null)
  }

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true)
    handleMenuClose()
  }

  const handleDeleteConfirm = async () => {
    if (selectedSessionForMenu && onDeleteSession) {
      setIsDeleting(true)
      try {
        await onDeleteSession(selectedSessionForMenu)
        setDeleteDialogOpen(false)
        setSelectedSessionForMenu(null)
      } catch (error) {
        console.error('Error deleting session:', error)
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
    setSelectedSessionForMenu(null)
  }

  const selectedSession = sessions.find((s) => s.session_id === selectedSessionForMenu)

  const drawerContent = (
    <Box
      sx={{
        width: { xs: 280, sm: 320 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      role="navigation"
      aria-label="Sessions sidebar"
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Typography variant="h6" component="h2">
          Sessions
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            onClick={onNewSession}
            aria-label="Create new session"
            size="small"
            sx={{ minWidth: 44, minHeight: 44 }}
          >
            <AddIcon />
          </IconButton>
          {variant === 'temporary' && (
            <IconButton
              onClick={onClose}
              aria-label="Close sidebar"
              size="small"
              sx={{ minWidth: 44, minHeight: 44 }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* Sessions List */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <List sx={{ p: 0 }}>
          {sessions.length === 0 ? (
            <ListItem>
              <ListItemText
                primary="No sessions yet"
                secondary="Start a new conversation to create a session"
              />
            </ListItem>
          ) : (
            sessions.map((session) => (
              <ListItem
                key={session.session_id}
                disablePadding
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="Session options"
                    onClick={(e) => handleMenuOpen(e, session.session_id)}
                    sx={{ minWidth: 44, minHeight: 44 }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                }
              >
                <ListItemButton
                  selected={session.session_id === currentSessionId}
                  onClick={() => {
                    onSelectSession(session.session_id)
                    if (variant === 'temporary') {
                      onClose()
                    }
                  }}
                  sx={{
                    minHeight: 56, // Touch-friendly
                    py: 1.5,
                    px: 2,
                    transition: 'background-color 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                    '&.Mui-selected': {
                      backgroundColor: 'primary.light',
                      color: 'primary.contrastText',
                      '&:hover': {
                        backgroundColor: 'primary.main',
                      },
                    },
                  }}
                  aria-label={`Session from ${format(new Date(session.created_at), 'MMM d, yyyy')}`}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography variant="body1" component="span" sx={{ fontWeight: 500 }}>
                          {session.created_at
                            ? format(new Date(session.created_at), 'MMM d, yyyy')
                            : 'New Session'}
                        </Typography>
                        {session.session_id === currentSessionId && (
                          <Chip
                            label="Active"
                            size="small"
                            color="primary"
                            sx={{ height: 20, fontSize: '0.7rem' }}
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        <HistoryIcon sx={{ fontSize: 14, opacity: 0.7 }} />
                        <Typography variant="body2" component="span">
                          {session.message_count} {session.message_count === 1 ? 'message' : 'messages'}
                        </Typography>
                        {session.created_at && (
                          <Typography variant="caption" component="span" sx={{ opacity: 0.7 }}>
                            • {format(new Date(session.created_at), 'h:mm a')}
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))
          )}
        </List>
      </Box>

      {/* Session Options Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {onDeleteSession && (
          <MenuItem
            onClick={handleDeleteClick}
            sx={{ minHeight: 44 }}
            aria-label="Delete session"
          >
            Delete Session
          </MenuItem>
        )}
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Delete Session?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            {selectedSession ? (
              <>
                Are you sure you want to delete the session from{' '}
                <strong>{format(new Date(selectedSession.created_at), 'MMM d, yyyy h:mm a')}</strong>?
                <br />
                <br />
                This will permanently delete {selectedSession.message_count} message{selectedSession.message_count !== 1 ? 's' : ''} and cannot be undone.
              </>
            ) : (
              'Are you sure you want to delete this session? This action cannot be undone.'
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleDeleteCancel}
            disabled={isDeleting}
            sx={{ minHeight: 44 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={isDeleting}
            sx={{ minHeight: 44 }}
            startIcon={isDeleting ? <CircularProgress size={16} color="inherit" /> : null}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )

  if (variant === 'temporary') {
    return (
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: 280, sm: 320 },
          },
        }}
      >
        {drawerContent}
      </Drawer>
    )
  }

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: { xs: 280, sm: 320 },
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: { xs: 280, sm: 320 },
          boxSizing: 'border-box',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  )
}

export default Sidebar


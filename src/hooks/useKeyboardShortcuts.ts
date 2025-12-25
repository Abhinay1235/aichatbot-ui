/**
 * Keyboard shortcuts hook for desktop navigation
 * Provides keyboard shortcuts for common actions
 */

import { useEffect, useRef } from 'react'

interface KeyboardShortcutsOptions {
  onFocusInput?: () => void
  onNewSession?: () => void
  onToggleSidebar?: () => void
  enabled?: boolean
}

export const useKeyboardShortcuts = ({
  onFocusInput,
  onNewSession,
  onToggleSidebar,
  enabled = true,
}: KeyboardShortcutsOptions) => {
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement | null>(null)

  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle shortcuts when not typing in an input/textarea
      const target = event.target as HTMLElement
      const isInputElement =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable

      // Ctrl+K or Cmd+K: Focus input
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault()
        if (onFocusInput) {
          onFocusInput()
        } else if (inputRef.current) {
          inputRef.current.focus()
        }
        return
      }

      // Only handle other shortcuts when not in input
      if (isInputElement) return

      // Ctrl+N or Cmd+N: New session
      if ((event.ctrlKey || event.metaKey) && event.key === 'n') {
        event.preventDefault()
        onNewSession?.()
        return
      }

      // Ctrl+B or Cmd+B: Toggle sidebar
      if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
        event.preventDefault()
        onToggleSidebar?.()
        return
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [enabled, onFocusInput, onNewSession, onToggleSidebar])

  return { inputRef }
}


/**
 * Chat container component - Main chat wrapper
 */

import { Box } from '@mui/material'
import { useRef } from 'react'
import VirtualizedMessageList from './VirtualizedMessageList'
import ChatInput, { type ChatInputHandle } from './ChatInput'
import type { ChatMessage } from '@types'

interface ChatContainerProps {
  messages: ChatMessage[]
  isTyping?: boolean
  onSendMessage: (message: string) => void
  isSending?: boolean
  inputRef?: React.RefObject<ChatInputHandle>
}

export const ChatContainer = ({
  messages,
  isTyping = false,
  onSendMessage,
  isSending = false,
  inputRef,
}: ChatContainerProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
      }}
      role="main"
      aria-label="Chat conversation"
    >
      <VirtualizedMessageList messages={messages} isTyping={isTyping} />
      <ChatInput ref={inputRef} onSend={onSendMessage} disabled={isSending || isTyping} />
    </Box>
  )
}

export default ChatContainer


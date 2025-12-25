# Component Documentation

This document provides detailed documentation for all UI components in the AI Chatbot application.

## Table of Contents

- [Layout Components](#layout-components)
- [Chat Components](#chat-components)
- [Common Components](#common-components)
- [Hooks](#hooks)

## Layout Components

### Header

**Location:** `src/components/layout/Header.tsx`

**Description:** Top navigation bar component with app title and menu button.

**Props:**
- `onMenuClick?: () => void` - Callback when menu button is clicked
- `showMenuButton?: boolean` - Whether to show the menu button (mobile only)

**Features:**
- Responsive height (56px mobile, 64px desktop)
- Accessible with proper ARIA labels
- Touch-friendly button sizes (44x44px minimum)

**Usage:**
```tsx
<Header 
  onMenuClick={handleMenuClick}
  showMenuButton={isMobile}
/>
```

---

### Sidebar

**Location:** `src/components/layout/Sidebar.tsx`

**Description:** Session management sidebar with list of all chat sessions.

**Props:**
- `open: boolean` - Whether sidebar is open
- `onClose: () => void` - Callback to close sidebar
- `onNewSession: () => void` - Callback to create new session
- `onSelectSession: (sessionId: string) => void` - Callback when session is selected
- `onDeleteSession?: (sessionId: string) => void` - Callback to delete session
- `currentSessionId: string | null` - ID of currently active session
- `variant?: 'temporary' | 'persistent'` - Drawer variant (mobile vs desktop)

**Features:**
- Mobile-first design (drawer on mobile, persistent sidebar on desktop)
- Session list with timestamps and message counts
- Delete confirmation dialog
- Active session indicator
- Touch-friendly list items (56px height)

**Usage:**
```tsx
<Sidebar
  open={sidebarOpen}
  onClose={handleClose}
  onNewSession={handleNewSession}
  onSelectSession={handleSelectSession}
  onDeleteSession={handleDeleteSession}
  currentSessionId={currentSessionId}
  variant={isMobile ? 'temporary' : 'persistent'}
/>
```

---

### Layout

**Location:** `src/components/layout/Layout.tsx`

**Description:** Main layout wrapper that combines Header, Sidebar, and content area.

**Props:**
- `children: React.ReactNode` - Page content
- `onNewSession: () => void` - Callback to create new session
- `onSelectSession: (sessionId: string) => void` - Callback when session is selected
- `onDeleteSession?: (sessionId: string) => void` - Callback to delete session
- `currentSessionId: string | null` - ID of currently active session
- `sidebarToggleTrigger?: number` - Counter to trigger sidebar toggle (for keyboard shortcuts)

**Features:**
- Responsive layout (mobile drawer, desktop persistent sidebar)
- Automatic sidebar state management
- Smooth transitions
- Bottom navigation on mobile

**Usage:**
```tsx
<Layout
  onNewSession={handleNewSession}
  onSelectSession={handleSelectSession}
  onDeleteSession={handleDeleteSession}
  currentSessionId={sessionId}
>
  <ChatContainer />
</Layout>
```

---

### BottomNavigation

**Location:** `src/components/layout/BottomNavigation.tsx`

**Description:** Bottom navigation bar for mobile devices (320px-767px).

**Features:**
- Only visible on mobile devices
- Navigation to Home, Chat, and Sessions
- Touch-friendly (64px height)
- Fixed position at bottom

**Usage:**
Automatically included in Layout component.

---

## Chat Components

### ChatContainer

**Location:** `src/components/chat/ChatContainer.tsx`

**Description:** Main wrapper for chat interface combining message list and input.

**Props:**
- `messages: ChatMessage[]` - Array of chat messages
- `isTyping?: boolean` - Whether AI is typing
- `onSendMessage: (message: string) => void` - Callback when message is sent
- `isSending?: boolean` - Whether message is being sent
- `inputRef?: React.RefObject<ChatInputHandle>` - Ref to input component (for keyboard shortcuts)

**Usage:**
```tsx
<ChatContainer
  messages={messages}
  isTyping={isTyping}
  onSendMessage={handleSendMessage}
  isSending={isSending}
  inputRef={inputRef}
/>
```

---

### VirtualizedMessageList

**Location:** `src/components/chat/VirtualizedMessageList.tsx`

**Description:** Optimized message list with virtual scrolling for long conversations.

**Props:**
- `messages: ChatMessage[]` - Array of chat messages
- `isTyping?: boolean` - Whether AI is typing
- `virtualizationThreshold?: number` - Number of messages before enabling virtualization (default: 20)

**Features:**
- Virtual scrolling for performance with long conversations
- Only renders visible messages
- Auto-scroll to bottom on new messages
- Smooth scrolling
- Custom scrollbar styling

**Performance:**
- Automatically enables virtualization when message count exceeds threshold
- Uses intersection observer for efficient rendering
- Buffer zone for smooth scrolling

**Usage:**
```tsx
<VirtualizedMessageList
  messages={messages}
  isTyping={isTyping}
  virtualizationThreshold={20}
/>
```

---

### MessageBubble

**Location:** `src/components/chat/MessageBubble.tsx`

**Description:** Individual message display component with user/assistant distinction.

**Props:**
- `message: ChatMessage` - Message object to display

**Features:**
- User messages (right-aligned, primary color)
- Assistant messages (left-aligned, white background)
- Responsive width (85% mobile, 70% tablet, 60% desktop)
- Timestamp display
- Collapsible SQL query and results (debug mode)
- Hover effects on desktop
- Memoized for performance

**Message Format:**
```typescript
interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp?: string
  sql_query?: string
  query_results?: {
    row_count: number
    columns: string[]
  }
  id?: string
}
```

**Usage:**
```tsx
<MessageBubble message={message} />
```

---

### ChatInput

**Location:** `src/components/chat/ChatInput.tsx`

**Description:** Message input component with send button and keyboard shortcuts.

**Props:**
- `onSend: (message: string) => void` - Callback when message is sent
- `disabled?: boolean` - Whether input is disabled
- `placeholder?: string` - Input placeholder text

**Features:**
- Auto-resizing textarea
- Enter to send, Shift+Enter for new line
- Send button with loading state
- Keyboard accessible
- Memoized for performance
- Ref forwarding for programmatic focus

**Keyboard Shortcuts:**
- `Enter` - Send message
- `Shift + Enter` - New line
- `Ctrl/Cmd + K` - Focus input (via keyboard shortcuts hook)

**Usage:**
```tsx
const inputRef = useRef<ChatInputHandle>(null)

<ChatInput
  ref={inputRef}
  onSend={handleSend}
  disabled={isSending}
  placeholder="Ask a question..."
/>
```

---

### TypingIndicator

**Location:** `src/components/chat/TypingIndicator.tsx`

**Description:** Loading animation shown when AI is processing a response.

**Features:**
- Animated dots
- Accessible with ARIA live region
- Screen reader announcements

**Usage:**
```tsx
{isTyping && <TypingIndicator />}
```

---

## Common Components

### LoadingSpinner

**Location:** `src/components/common/LoadingSpinner.tsx`

**Description:** Reusable loading spinner component.

**Props:**
- `message?: string` - Optional loading message

**Features:**
- ARIA live region for screen readers
- Accessible loading announcements

**Usage:**
```tsx
<LoadingSpinner message="Loading chat..." />
```

---

### ErrorMessage

**Location:** `src/components/common/ErrorMessage.tsx`

**Description:** Error display component with retry option.

**Props:**
- `message: string` - Error message to display
- `onRetry?: () => void` - Optional retry callback
- `retryLabel?: string` - Label for retry button

**Features:**
- ARIA alert role
- High contrast colors
- Clear, descriptive text
- Optional retry button

**Usage:**
```tsx
<ErrorMessage
  message="Failed to load messages"
  onRetry={handleRetry}
  retryLabel="Try Again"
/>
```

---

## Hooks

### useChat

**Location:** `src/hooks/useChat.ts`

**Description:** Hook for sending chat messages and managing chat state.

**Returns:**
- `sendMessage: (message: string) => Promise<void>` - Function to send a message

**Usage:**
```tsx
const { sendMessage } = useChat()

await sendMessage("How many trips are there?")
```

---

### useSessions

**Location:** `src/hooks/useSessions.ts`

**Description:** React Query hooks for session management.

**Hooks:**
- `useSessions(limit?: number)` - Get all sessions
- `useSession(sessionId, options?)` - Get specific session with messages
- `useCreateSession()` - Create new session mutation
- `useDeleteSession()` - Delete session mutation

**Usage:**
```tsx
const { data: sessions, isLoading } = useSessions()
const { mutateAsync: createSession } = useCreateSession()
const { mutateAsync: deleteSession } = useDeleteSession()
```

---

### useKeyboardShortcuts

**Location:** `src/hooks/useKeyboardShortcuts.ts`

**Description:** Hook for keyboard shortcuts (desktop only).

**Props:**
- `onFocusInput?: () => void` - Callback for Ctrl/Cmd+K
- `onNewSession?: () => void` - Callback for Ctrl/Cmd+N
- `onToggleSidebar?: () => void` - Callback for Ctrl/Cmd+B
- `enabled?: boolean` - Whether shortcuts are enabled

**Keyboard Shortcuts:**
- `Ctrl/Cmd + K` - Focus input
- `Ctrl/Cmd + N` - New session
- `Ctrl/Cmd + B` - Toggle sidebar

**Usage:**
```tsx
useKeyboardShortcuts({
  onFocusInput: () => inputRef.current?.focus(),
  onNewSession: handleNewSession,
  onToggleSidebar: handleToggleSidebar,
  enabled: isDesktop,
})
```

---

## Performance Optimizations

### Memoization

The following components are memoized to prevent unnecessary re-renders:
- `MessageBubble` - Memoized with `React.memo`
- `MessageList` - Memoized with `React.memo`
- `ChatInput` - Memoized with `React.memo`

### Code Splitting

Pages are lazy-loaded for code splitting:
- `HomePage` - Lazy loaded
- `ChatPage` - Lazy loaded

### Virtual Scrolling

`VirtualizedMessageList` automatically enables virtualization when message count exceeds threshold (default: 20 messages).

---

## Accessibility

All components follow WCAG 2.1 AA standards:
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader announcements
- High contrast colors
- Touch-friendly targets (44x44px minimum)

---

## Styling

Components use Material-UI (MUI) for consistent styling:
- Mobile-first responsive design
- Custom theme with breakpoints
- Touch-friendly spacing
- Accessible color contrast


# AI Chatbot UI - Project Plan

## Design Principles

### 🎯 Mobile-First Approach
- **Primary Focus**: Design for mobile devices first (320px+)
- **Progressive Enhancement**: Enhance for larger screens
- **Touch-Friendly**: All interactive elements minimum 44x44px
- **Performance**: Optimize for slower mobile networks
- **Viewport**: Proper meta tags and responsive units

### ♿ Accessibility First
- **WCAG 2.1 AA Compliance**: Meet accessibility standards
- **Keyboard Navigation**: Full functionality via keyboard
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Color Contrast**: Minimum 4.5:1 ratio for text
- **Focus Management**: Clear focus indicators
- **Alternative Text**: Images and icons have alt text

### 📱 Responsive Breakpoints
- **Mobile**: 320px - 767px (Primary)
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+ (Enhanced)

## Technology Stack

### Core Framework
- **React 18+** - Modern React with hooks
- **TypeScript** - Type safety and better DX
- **Vite** - Fast build tool and dev server

### UI Framework Options

**Recommended: Material-UI (MUI)**
- ✅ Comprehensive component library
- ✅ Beautiful, modern design out of the box
- ✅ Excellent TypeScript support
- ✅ Great documentation
- ✅ **Built-in accessibility features**
- ✅ **Mobile-first responsive system**
- ✅ **Touch-friendly components**
- **Package**: `@mui/material`, `@mui/icons-material`

**Alternative Options:**
- **Shadcn/ui** - Modern, customizable components (copy-paste approach)
- **Chakra UI** - Simple, modular, **highly accessible**
- **Ant Design** - Enterprise-grade components

### Additional Libraries
- **Axios** - HTTP client for API calls
- **React Query (TanStack Query)** - Data fetching and caching
- **Zustand** or **Jotai** - Lightweight state management
- **React Hook Form** - Form handling (accessible)
- **date-fns** - Date formatting
- **React Markdown** - If we want to render markdown in responses
- **react-aria** or **@react-aria/** - Accessibility primitives (optional)
- **focus-trap-react** - Focus management in modals

## Project Structure

```
aichatbot-ui/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── chat/
│   │   │   ├── ChatContainer.tsx
│   │   │   ├── MessageList.tsx
│   │   │   ├── MessageBubble.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   └── TypingIndicator.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Layout.tsx
│   │   └── common/
│   │       ├── LoadingSpinner.tsx
│   │       ├── ErrorMessage.tsx
│   │       └── Button.tsx
│   ├── pages/
│   │   ├── ChatPage.tsx
│   │   ├── SessionsPage.tsx
│   │   └── HomePage.tsx
│   ├── services/
│   │   ├── api/
│   │   │   ├── chatService.ts
│   │   │   ├── sessionService.ts
│   │   │   └── apiClient.ts
│   │   └── types/
│   │       └── api.types.ts
│   ├── hooks/
│   │   ├── useChat.ts
│   │   ├── useSessions.ts
│   │   └── useApi.ts
│   ├── store/
│   │   ├── chatStore.ts
│   │   └── sessionStore.ts
│   ├── utils/
│   │   ├── constants.ts
│   │   ├── formatters.ts
│   │   └── validators.ts
│   ├── styles/
│   │   ├── theme.ts
│   │   └── global.css
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env.local
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Implementation Plan

### Phase 1: Project Setup & Configuration

#### Step 1: Initialize Vite + React + TypeScript Project
```bash
npm create vite@latest . -- --template react-ts
npm install
```

#### Step 2: Install Core Dependencies
```bash
# UI Framework
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material

# HTTP & Data Fetching
npm install axios @tanstack/react-query

# State Management
npm install zustand

# Form Handling
npm install react-hook-form

# Utilities
npm install date-fns

# Development
npm install -D @types/node
```

#### Step 3: Configure Vite
- Set up environment variables
- Configure proxy for API calls (if needed)
- Set up path aliases

#### Step 4: Set Up TypeScript
- Configure `tsconfig.json`
- Set up path aliases (`@/components`, `@/services`, etc.)

#### Step 5: Configure Material-UI Theme (Mobile-First)
- Create custom theme with mobile-first breakpoints
- Set up color palette with WCAG AA contrast ratios
- Configure typography (readable on small screens)
- Set up responsive spacing system
- Configure touch targets (minimum 44x44px)
- Set up dark/light mode toggle
- Ensure focus indicators are visible

### Phase 2: API Integration Layer

#### Step 6: Create API Client
- Set up Axios instance with base URL
- Configure interceptors for error handling
- Add request/response logging

#### Step 7: Define TypeScript Types
- Chat request/response types
- Session types
- Message types
- API error types

#### Step 8: Create API Services
- `chatService.ts` - Chat API calls
- `sessionService.ts` - Session management API calls
- Error handling and retry logic

#### Step 9: Set Up React Query
- Configure query client
- Set up default options
- Create query hooks for chat and sessions

### Phase 3: State Management

#### Step 10: Set Up Zustand Store
- Chat store (messages, session ID, loading states)
- Session store (list of sessions, current session)
- Persist session data to localStorage

### Phase 4: Core UI Components

#### Step 11: Layout Components
- **Header** - App title, theme toggle, settings
- **Sidebar** - Session list, new session button
- **Layout** - Main layout wrapper

#### Step 12: Chat Components (Mobile-First & Accessible)
- **ChatContainer** - Main chat wrapper
  - Full viewport height on mobile
  - Proper semantic structure
  - ARIA live region for new messages
- **MessageList** - Scrollable message container
  - Virtual scrolling for performance
  - Smooth scroll behavior
  - Keyboard navigation support
  - Touch-friendly scrolling
- **MessageBubble** - Individual message display
  - User messages (right-aligned, mobile-optimized width)
  - Assistant messages (left-aligned, mobile-optimized width)
  - Responsive padding (smaller on mobile)
  - Touch-friendly tap targets
  - Timestamp display (accessible format)
  - SQL query display (collapsible, keyboard accessible)
  - Proper ARIA roles and labels
- **ChatInput** - Message input with send button
  - Full-width on mobile
  - Text area with auto-resize (max height for mobile)
  - Send button (minimum 44x44px, accessible)
  - Keyboard shortcuts (Enter to send, Shift+Enter for new line)
  - Character counter (optional, screen reader accessible)
  - Proper focus management
- **TypingIndicator** - Loading animation
  - Accessible loading announcement
  - ARIA live region

#### Step 13: Common Components (Accessible)
- **LoadingSpinner** - Reusable loading component
  - ARIA live region
  - Screen reader announcements
  - Proper role attributes
- **ErrorMessage** - Error display component
  - ARIA alert role
  - High contrast colors
  - Clear, descriptive text
- **Button** - Custom button component
  - Minimum 44x44px touch target
  - Keyboard accessible
  - Focus indicators
  - Loading states with announcements

### Phase 5: Pages & Routing

#### Step 14: Set Up React Router
```bash
npm install react-router-dom
```

#### Step 15: Create Pages (Mobile-First Layout)
- **HomePage** - Landing page with instructions
  - Mobile-optimized layout
  - Clear call-to-action
  - Accessible navigation
- **ChatPage** - Main chat interface
  - Full-screen on mobile
  - Bottom sheet for sessions (mobile)
  - Sidebar for desktop
  - Keyboard navigation
- **SessionsPage** - Session management (optional)
  - Mobile-friendly list
  - Swipe actions (mobile)
  - Accessible table/list

#### Step 16: Implement Routing (Accessible Navigation)
- `/` - Home page
- `/chat` - Chat interface
- `/chat/:sessionId` - Chat with specific session
- `/sessions` - Session management
- **Mobile Navigation**: Bottom navigation bar or hamburger menu
- **Desktop Navigation**: Sidebar or top navigation
- **Keyboard Navigation**: Tab order, skip links
- **Focus Management**: Proper focus on route changes

### Phase 6: Chat Functionality

#### Step 17: Implement Chat Hook
- `useChat()` hook
  - Send message function
  - Handle responses
  - Manage loading states
  - Error handling
  - Auto-scroll to bottom

#### Step 18: Implement Session Management
- Create new session on first message
- Store session ID in state
- Load conversation history on session load
- Clear session functionality

#### Step 19: Message Display
- Format timestamps
- Display SQL queries (collapsible)
- Show query results metadata
- Handle error messages
- Markdown rendering (if needed)

### Phase 7: Advanced Features

#### Step 20: Real-time Updates
- Auto-refresh conversation
- Optimistic UI updates
- Error recovery

#### Step 21: Session Management UI
- List all sessions
- View session history
- Delete sessions
- Switch between sessions

#### Step 22: Search & Filter (Mobile & Accessible)
- Search in conversation history
  - Mobile-friendly search bar
  - Keyboard accessible
  - Voice input support (optional)
- Filter messages by type
  - Touch-friendly filters
  - Screen reader announcements
- Export conversation (optional)
  - Accessible download button

#### Step 23: Responsive Design (Mobile-First)
- **Mobile (320px-767px)**: Primary design
  - Full-width components
  - Bottom navigation
  - Stacked layouts
  - Touch-optimized interactions
  - Simplified navigation
- **Tablet (768px-1023px)**: Enhanced layout
  - Two-column layouts where appropriate
  - Larger touch targets
  - Optimized spacing
- **Desktop (1024px+)**: Full features
  - Sidebar navigation
  - Multi-column layouts
  - Hover states
  - Keyboard shortcuts

### Phase 8: Polish & Optimization

#### Step 24: Performance Optimization
- Code splitting
- Lazy loading components
- Memoization
- Virtual scrolling for long conversations

#### Step 25: Accessibility (Built-in from Start)
- **ARIA Labels & Roles**
  - Proper semantic HTML
  - ARIA labels for all interactive elements
  - ARIA live regions for dynamic content
  - ARIA landmarks for navigation
- **Keyboard Navigation**
  - Full keyboard functionality
  - Logical tab order
  - Skip links
  - Keyboard shortcuts
  - Escape key handlers
- **Screen Reader Support**
  - Descriptive alt text
  - Proper heading hierarchy
  - Form labels
  - Error announcements
  - Status updates
- **Focus Management**
  - Visible focus indicators (high contrast)
  - Focus trap in modals
  - Focus restoration
  - Focus on route changes
- **Color & Contrast**
  - WCAG AA compliance (4.5:1 for text)
  - Don't rely on color alone
  - High contrast mode support
- **Touch Targets**
  - Minimum 44x44px
  - Adequate spacing between targets
  - No hover-only interactions

#### Step 26: Error Handling
- Network error handling
- API error messages
- Retry mechanisms
- Offline detection

#### Step 27: Testing (Optional)
- Unit tests for utilities
- Component tests
- Integration tests

#### Step 28: Documentation
- Component documentation
- API integration guide
- Deployment instructions

## Key Features to Implement

### Core Features
1. ✅ **Chat Interface**
   - Send messages
   - Receive responses
   - Display conversation history
   - Loading states
   - Error handling

2. ✅ **Session Management**
   - Auto-create sessions
   - Maintain conversation context
   - Session persistence
   - Session switching

3. ✅ **Message Display**
   - User/Assistant message distinction
   - Timestamps
   - SQL query display (debug mode)
   - Query results metadata

### Nice-to-Have Features
4. **Dark/Light Mode** - Theme toggle
5. **Message Search** - Search in conversation
6. **Export Chat** - Download conversation as JSON/PDF
7. **Copy to Clipboard** - Copy messages/SQL queries
8. **Keyboard Shortcuts** - Quick actions
9. **Typing Indicators** - Show when AI is thinking
10. **Message Reactions** - Like/dislike responses

## API Integration Details

### Chat Endpoint
```typescript
POST /api/chat
Body: {
  message: string
  session_id?: string
  conversation_history?: Array<{role: string, content: string}>
}

Response: {
  success: boolean
  response: string
  session_id: string
  sql_query?: string
  query_results?: {
    row_count: number
    columns: string[]
  }
  error?: string
}
```

### Session Endpoints
- `POST /api/sessions` - Create session
- `GET /api/sessions` - List sessions
- `GET /api/sessions/{id}` - Get conversation
- `DELETE /api/sessions/{id}` - Delete session

## Design Considerations

### Mobile-First Design System

#### Color Scheme (WCAG AA Compliant)
- **Primary**: Blue/Purple (tech/AI theme) - 4.5:1 contrast
- **Success**: Green - 4.5:1 contrast
- **Error**: Red - 4.5:1 contrast
- **Background**: Light gray/White (or dark theme)
- **Text**: High contrast on all backgrounds
- **Focus Indicators**: High contrast, visible borders

#### Typography (Mobile-Optimized)
- **Base Font Size**: 16px minimum (prevents zoom on iOS)
- **Line Height**: 1.5 for readability
- **Font Weights**: Clear hierarchy
- **Responsive Sizing**: Scales appropriately
- **Readable Fonts**: System fonts for performance

#### Spacing System
- **Mobile**: 4px base unit (4, 8, 12, 16, 24, 32px)
- **Tablet**: 8px base unit
- **Desktop**: 8px base unit
- **Touch Targets**: Minimum 44x44px with padding

#### Layout (Responsive Breakpoints)
- **Mobile (320px-767px)**: 
  - Full-screen chat
  - Bottom navigation
  - Bottom sheet for sessions
  - Stacked components
  - Single column
- **Tablet (768px-1023px)**:
  - Two-column where appropriate
  - Side drawer for sessions
  - Optimized spacing
- **Desktop (1024px+)**:
  - Sidebar + Main chat area
  - Multi-column layouts
  - Hover interactions
  - Keyboard shortcuts

### User Experience (Mobile-First)

#### Mobile Optimizations
- **Touch Interactions**
  - Large tap targets (44x44px minimum)
  - Swipe gestures for actions
  - Pull-to-refresh
  - Bottom sheet modals
- **Performance**
  - Lazy loading
  - Code splitting
  - Optimized images
  - Minimal initial bundle
- **Network**
  - Offline detection
  - Retry mechanisms
  - Loading states
  - Error recovery

#### Cross-Platform
- **Smooth Scrolling**: Native-like experience
- **Auto-focus**: Input focus on mount (mobile-friendly)
- **Keyboard**: Enter to send, Shift+Enter for new line
- **Visual Feedback**: Clear loading, success, error states
- **Navigation**: Intuitive, accessible navigation
- **Gestures**: Swipe, pull, tap interactions

### Accessibility Features

#### Keyboard Navigation
- Tab through all interactive elements
- Enter/Space to activate
- Escape to close modals
- Arrow keys for lists
- Skip links for main content

#### Screen Reader Support
- Semantic HTML structure
- Descriptive labels
- Status announcements
- Error messages
- Loading states

#### Visual Accessibility
- High contrast mode
- Focus indicators
- Color-blind friendly
- Scalable text
- Reduced motion support

## Development Workflow

1. **Setup** → Initialize project and install dependencies
2. **API Layer** → Build API integration first
3. **Components** → Build UI components
4. **Integration** → Connect components to API
5. **Polish** → Add animations, error handling, etc.
6. **Testing** → Test all features
7. **Deploy** → Build and deploy

## Mobile-First Testing Checklist

### Device Testing
- ✅ **Mobile Devices** (320px - 767px)
  - iPhone SE (375px)
  - iPhone 12/13/14 (390px)
  - iPhone 14 Pro Max (430px)
  - Samsung Galaxy S21 (360px)
  - iPad Mini (768px)
- ✅ **Tablet Devices** (768px - 1023px)
  - iPad (768px)
  - iPad Pro (1024px)
- ✅ **Desktop** (1024px+)
  - Laptop (1366px)
  - Desktop (1920px)

### Accessibility Testing
- ✅ **Screen Readers**: Test with VoiceOver (iOS), TalkBack (Android), NVDA/JAWS (Desktop)
- ✅ **Keyboard Navigation**: Full functionality without mouse
- ✅ **Color Contrast**: Verify WCAG AA compliance
- ✅ **Touch Targets**: All interactive elements 44x44px minimum
- ✅ **Focus Indicators**: Visible on all focusable elements
- ✅ **Zoom**: Test at 200% zoom level

### Performance Testing
- ✅ **Network**: Test on 3G/4G/5G/WiFi
- ✅ **Load Time**: First Contentful Paint < 1.5s
- ✅ **Bundle Size**: Keep initial bundle < 200KB
- ✅ **Lighthouse**: Score 90+ on mobile

## Estimated Timeline

- **Phase 1-2** (Setup & API): 2-3 hours
- **Phase 3-4** (State & Components): 4-5 hours
- **Phase 5-6** (Pages & Chat): 3-4 hours
- **Phase 7** (Advanced Features): 2-3 hours
- **Phase 8** (Polish & Accessibility): 3-4 hours

**Total**: ~14-19 hours for complete implementation (including mobile-first & accessibility)

## Next Steps

1. Initialize Vite project
2. Install dependencies
3. Set up project structure
4. Start with API integration
5. Build components incrementally
6. Test as you build

## Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Material-UI Documentation](https://mui.com/)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)


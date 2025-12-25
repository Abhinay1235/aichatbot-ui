# API Integration Guide

This guide explains how to integrate the AI Chatbot UI with the backend API service.

## Table of Contents

- [API Client Setup](#api-client-setup)
- [API Endpoints](#api-endpoints)
- [Type Definitions](#type-definitions)
- [Service Functions](#service-functions)
- [React Query Integration](#react-query-integration)
- [Error Handling](#error-handling)
- [Environment Configuration](#environment-configuration)

## API Client Setup

### Base Configuration

The API client is configured in `src/services/api/apiClient.ts`:

```typescript
import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
})
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:8000
```

For production:
```env
VITE_API_BASE_URL=https://api.yourdomain.com
```

### Interceptors

The API client includes interceptors for:
- Request logging (development only)
- Error handling and transformation
- Response data extraction

## API Endpoints

### Chat Endpoint

**POST** `/api/chat`

Send a message and receive AI response.

**Request Body:**
```typescript
{
  message: string
  session_id?: string
  conversation_history?: Array<{
    role: 'user' | 'assistant'
    content: string
  }>
}
```

**Response:**
```typescript
{
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

**Usage:**
```typescript
import { chatService } from '@services/api'

const response = await chatService.sendMessage({
  message: "How many trips are there?",
  session_id: "optional-session-id"
})
```

---

### Session Endpoints

#### Create Session

**POST** `/api/sessions`

Create a new chat session.

**Response:**
```typescript
{
  session_id: string
  created_at: string
  message_count: number
}
```

**Usage:**
```typescript
import { sessionService } from '@services/api'

const session = await sessionService.createSession()
```

---

#### Get All Sessions

**GET** `/api/sessions?limit=100`

Get list of all sessions.

**Query Parameters:**
- `limit` (optional): Maximum number of sessions to return (default: 100)

**Response:**
```typescript
{
  sessions: Array<{
    session_id: string
    created_at: string
    message_count: number
  }>
}
```

**Usage:**
```typescript
const sessions = await sessionService.getAllSessions(100)
```

---

#### Get Session

**GET** `/api/sessions/{session_id}`

Get a specific session with all messages.

**Response:**
```typescript
{
  session_id: string
  messages: Array<{
    id: number
    session_id: string
    role: 'user' | 'assistant'
    content: string
    created_at: string
  }>
}
```

**Usage:**
```typescript
const conversation = await sessionService.getSession(sessionId)
```

---

#### Delete Session

**DELETE** `/api/sessions/{session_id}`

Delete a session and all its messages.

**Response:**
```typescript
{
  success: boolean
  message?: string
}
```

**Usage:**
```typescript
await sessionService.deleteSession(sessionId)
```

---

## Type Definitions

All API types are defined in `src/types/index.ts`:

```typescript
// Request Types
interface ChatRequest {
  message: string
  session_id?: string
  conversation_history?: Array<{
    role: 'user' | 'assistant'
    content: string
  }>
}

// Response Types
interface ChatResponse {
  success: boolean
  response: string
  session_id?: string
  sql_query?: string
  query_results?: {
    row_count: number
    columns: string[]
  }
  error?: string
}

interface SessionResponse {
  session_id: string
  created_at: string
  message_count: number
}

interface ConversationResponse {
  session_id: string
  messages: Message[]
}

interface Message {
  id: number
  session_id: string
  role: 'user' | 'assistant'
  content: string
  created_at: string
}
```

## Service Functions

### Chat Service

**Location:** `src/services/api/chatService.ts`

```typescript
import { chatService } from '@services/api'

// Send a message
const response = await chatService.sendMessage({
  message: "How many trips?",
  session_id: "session-123"
})
```

### Session Service

**Location:** `src/services/api/sessionService.ts`

```typescript
import { sessionService } from '@services/api'

// Create session
const session = await sessionService.createSession()

// Get all sessions
const sessions = await sessionService.getAllSessions(100)

// Get specific session
const conversation = await sessionService.getSession(sessionId)

// Delete session
await sessionService.deleteSession(sessionId)
```

## React Query Integration

The application uses React Query (TanStack Query) for data fetching and caching.

### Query Client Configuration

**Location:** `src/services/api/queryClient.ts`

```typescript
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000, // 30 seconds
      gcTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})
```

### Using Hooks

#### Chat Hook

```typescript
import { useChat } from '@hooks/useChat'

const { sendMessage } = useChat()

await sendMessage("How many trips?")
```

#### Session Hooks

```typescript
import { 
  useSessions, 
  useSession, 
  useCreateSession, 
  useDeleteSession 
} from '@hooks/useSessions'

// Get all sessions
const { data: sessions, isLoading, refetch } = useSessions(100)

// Get specific session
const { data: conversation, isLoading } = useSession(sessionId, {
  enabled: !!sessionId
})

// Create session mutation
const { mutateAsync: createSession } = useCreateSession()

// Delete session mutation
const { mutateAsync: deleteSession } = useDeleteSession()
```

## Error Handling

### Error Types

```typescript
interface ApiError {
  message: string
  status?: number
  detail?: string
}
```

### Error Handling in Components

```typescript
try {
  await sendMessage(message)
} catch (error) {
  if (error instanceof ApiException) {
    console.error('API Error:', error.message)
    // Handle error
  }
}
```

### Error Display

Use the `ErrorMessage` component:

```tsx
import ErrorMessage from '@components/common/ErrorMessage'

<ErrorMessage
  message={error?.message || 'An error occurred'}
  onRetry={handleRetry}
  retryLabel="Try Again"
/>
```

## Environment Configuration

### Development

```env
VITE_API_BASE_URL=http://localhost:8000
```

### Production

```env
VITE_API_BASE_URL=https://api.yourdomain.com
```

### Testing

You can override the API URL at runtime by setting the environment variable before building:

```bash
VITE_API_BASE_URL=https://staging-api.yourdomain.com npm run build
```

## CORS Configuration

If the API is on a different domain, ensure CORS is properly configured on the backend:

```python
# Backend CORS configuration example
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://yourdomain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Authentication (Future)

If authentication is added in the future, update the API client:

```typescript
// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

## Rate Limiting

The API client includes a 30-second timeout. For rate limiting, handle 429 responses:

```typescript
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      // Handle rate limiting
      console.error('Rate limit exceeded')
    }
    return Promise.reject(error)
  }
)
```

## Testing API Integration

### Mock Service Worker (Optional)

For testing, you can use MSW to mock API responses:

```typescript
import { rest } from 'msw'

export const handlers = [
  rest.post('/api/chat', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        response: "Mock response",
        session_id: "mock-session"
      })
    )
  }),
]
```

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend CORS is configured correctly
   - Check that `VITE_API_BASE_URL` matches the backend URL

2. **Timeout Errors**
   - Increase timeout in `apiClient.ts`
   - Check network connectivity

3. **404 Errors**
   - Verify API endpoint paths match backend
   - Check `VITE_API_BASE_URL` is correct

4. **Type Errors**
   - Ensure TypeScript types match API responses
   - Update types in `src/types/index.ts` if API changes


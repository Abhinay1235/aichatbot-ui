/**
 * Application constants
 */

// API Configuration
// Production backend: https://ai-chatbot-service.abhinaykumar.com
// Can be overridden via VITE_API_URL environment variable
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://ai-chatbot-service.abhinaykumar.com'
export const API_ENDPOINTS = {
  CHAT: '/api/chat',
  SESSIONS: '/api/sessions',
  SESSION: (id: string) => `/api/sessions/${id}`,
} as const

// Responsive Breakpoints (matches MUI theme)
export const BREAKPOINTS = {
  MOBILE: 320,
  TABLET: 768,
  DESKTOP: 1024,
} as const

// Touch Target Sizes (Accessibility)
export const TOUCH_TARGETS = {
  MINIMUM: 44, // Minimum touch target size in pixels
  RECOMMENDED: 48, // Recommended for mobile
} as const

// Chat Configuration
export const CHAT_CONFIG = {
  MAX_CONTEXT_MESSAGES: 10,
  DEBOUNCE_DELAY: 300, // ms
  TYPING_INDICATOR_DELAY: 1000, // ms
} as const

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'chatbot-theme',
  SESSION_ID: 'chatbot-session-id',
  SESSIONS: 'chatbot-sessions',
} as const


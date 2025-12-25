/**
 * Main App component with routing
 * Uses lazy loading for code splitting and performance optimization
 */

import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoadingSpinner from './components/common/LoadingSpinner'

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'))
const ChatPage = lazy(() => import('./pages/ChatPage'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner message="Loading..." />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="*" element={<Navigate to="/chat" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App

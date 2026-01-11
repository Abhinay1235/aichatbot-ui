# AI Chatbot UI

Frontend user interface for the AI Chatbot Service that analyzes Car Rides data collected for dates from July 01, 2024 to July 31, 2024.

## Overview

This is the client-side application that provides a user-friendly interface for interacting with the AI Chatbot Service backend. Users can ask natural language questions about car ride trips data and receive intelligent, data-driven responses.

## Features

- 💬 **Interactive Chat Interface** - Natural conversation with the AI chatbot
- 📊 **Data Analysis** - Ask questions about car rides data in plain English
- 💾 **Session Management** - Maintains conversation context across messages
- 🎨 **Modern UI** - Clean, responsive design built with Material-UI
- ⚡ **Real-time Responses** - Fast query processing and response generation
- 📱 **Mobile Responsive** - Works seamlessly on desktop and mobile devices

## Tech Stack

- **React** 18+ with TypeScript
- **Vite** - Fast build tool and dev server
- **Material-UI (MUI)** - Component library
- **React Query (TanStack Query)** - Data fetching and caching
- **Zustand** - State management
- **React Router** - Client-side routing

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Backend service running (see [aichatbot-service](../aichatbot-service))

### Installation

```bash
# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Configuration

Create a `.env.local` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8000
```

**Note:** If you don't create this file, the app will default to `http://localhost:8000`.

### Start Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at `http://localhost:5173` (or the port shown in the terminal).

### Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

The build output will be in the `dist/` directory.

## Project Structure

```
aichatbot-ui/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── chat/          # Chat-related components
│   │   ├── common/         # Common components (Loading, Error, etc.)
│   │   └── layout/         # Layout components (Header, Sidebar, etc.)
│   ├── pages/              # Page components
│   │   ├── HomePage.tsx    # Landing page
│   │   └── ChatPage.tsx    # Main chat interface
│   ├── services/           # API service layer
│   │   └── api/           # API client and services
│   ├── hooks/              # Custom React hooks
│   │   ├── useChat.ts      # Chat functionality hook
│   │   └── useSessions.ts  # Session management hook
│   ├── store/              # State management (Zustand)
│   ├── utils/              # Utility functions
│   ├── types/              # TypeScript type definitions
│   └── styles/             # Global styles and theme
├── public/                 # Static assets
├── package.json            # Dependencies
└── vite.config.ts          # Vite configuration
```

## API Integration

The UI connects to the backend API. By default, it connects to `http://localhost:8000` (configure via `VITE_API_BASE_URL`).

### Chat Endpoint
- `POST /api/chat` - Send message and get response

### Session Endpoints
- `POST /api/sessions` - Create new session
- `GET /api/sessions` - List all sessions
- `GET /api/sessions/{session_id}` - Get conversation history
- `DELETE /api/sessions/{session_id}` - Delete session

For detailed API documentation, see [API_INTEGRATION.md](API_INTEGRATION.md).

## Backend Service Setup

Make sure the backend service is running before starting the UI:

1. **Navigate to backend directory:**
   ```bash
   cd ../aichatbot-service
   ```

2. **Start the backend server:**
   ```bash
   # Activate virtual environment (if not already active)
   source venv/bin/activate
   
   # Start the server
   uvicorn src.main:app --reload
   ```

3. **Verify backend is running:**
   - Visit: http://localhost:8000/docs
   - Or check health: http://localhost:8000/health

4. **Start the UI:**
   ```bash
   # In the UI directory
   npm run dev
   ```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

### Key Features

- **Hot Module Replacement (HMR)** - Instant updates during development
- **TypeScript** - Full type safety
- **Code Splitting** - Automatic code splitting for optimal performance
- **Virtual Scrolling** - Efficient rendering of long message lists

## Troubleshooting

### Backend Connection Issues

**Issue:** API calls failing with connection errors
- **Solution:** Ensure the backend is running on `http://localhost:8000`
- Check that `VITE_API_BASE_URL` in `.env.local` matches your backend URL

### CORS Errors

**Issue:** CORS errors in browser console
- **Solution:** Ensure backend CORS is configured to allow `http://localhost:5173`
- Check backend `src/main.py` CORS configuration

### Build Errors

**Issue:** TypeScript or build errors
- **Solution:** Run `npm run lint` to identify issues
- Ensure all dependencies are installed: `npm install`

## Additional Resources

- **[API_INTEGRATION.md](API_INTEGRATION.md)** - Detailed API integration guide
- **Backend Service:** [aichatbot-service](../aichatbot-service) - Backend API documentation

## License

Personal portfolio project.

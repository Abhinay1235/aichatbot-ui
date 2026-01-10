# AI Chatbot UI

Frontend user interface for the AI Chatbot Service that analyzes Car Rides data collected for dates from July 01, 2024  -  July 31, 2024.

## Overview

This is the client-side application that provides a user-friendly interface for interacting with the AI Chatbot Service backend. Users can ask natural language questions about car ride trips data and receive intelligent, data-driven responses.

## Features

- 💬 **Interactive Chat Interface** - Natural conversation with the AI chatbot
- 📊 **Data Analysis** - Ask questions about car rides data in plain English
- 💾 **Session Management** - Maintains conversation context across messages
- 🎨 **Modern UI** - Clean, responsive design
- ⚡ **Real-time Responses** - Fast query processing and response generation

## Tech Stack

(To be determined based on framework choice)

**Recommended Options:**
- **React** + **TypeScript** + **Vite** - Modern, fast, type-safe
- **Next.js** - Full-stack React framework with SSR
- **Vue.js** + **TypeScript** - Progressive framework
- **Svelte** - Lightweight and fast

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

# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

### Configuration

Create a `.env.local` file:

```env
VITE_API_URL=http://localhost:8000
# or
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## API Integration

The UI connects to the backend API at `http://localhost:8000`:

### Chat Endpoint
- `POST /api/chat` - Send message and get response

### Session Endpoints
- `POST /api/sessions` - Create new session
- `GET /api/sessions` - List all sessions
- `GET /api/sessions/{session_id}` - Get conversation history
- `DELETE /api/sessions/{session_id}` - Delete session

## Project Structure

```
aichatbot-ui/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── services/      # API service layer
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   └── types/         # TypeScript types
├── public/            # Static assets
└── package.json       # Dependencies
```

## Development

See the backend service documentation for API details: [aichatbot-service README](../aichatbot-service/README.md)

## Backend Service

The backend service is located at: [aichatbot-service](../aichatbot-service)

Make sure the backend is running before starting the UI:
```bash
cd ../aichatbot-service
uvicorn src.main:app --reload
```

## License

Personal portfolio project.


/**
 * Session API service
 */

import apiClient from './apiClient'
import { API_ENDPOINTS } from '@utils/constants'
import type {
  SessionCreateRequest,
  SessionResponse,
  SessionListResponse,
  ConversationResponse,
} from '@types'

export const sessionService = {
  /**
   * Create a new chat session
   */
  async createSession(request: SessionCreateRequest = {}): Promise<SessionResponse> {
    try {
      const response = await apiClient.post<SessionResponse>(
        API_ENDPOINTS.SESSIONS,
        request
      )
      return response.data
    } catch (error) {
      throw error
    }
  },

  /**
   * Get all sessions
   */
  async getAllSessions(limit: number = 100): Promise<SessionListResponse> {
    try {
      const response = await apiClient.get<SessionListResponse>(
        API_ENDPOINTS.SESSIONS,
        {
          params: { limit },
        }
      )
      return response.data
    } catch (error) {
      throw error
    }
  },

  /**
   * Get a specific session with conversation history
   */
  async getSession(sessionId: string): Promise<ConversationResponse> {
    try {
      const response = await apiClient.get<ConversationResponse>(
        API_ENDPOINTS.SESSION(sessionId)
      )
      return response.data
    } catch (error) {
      throw error
    }
  },

  /**
   * Delete a session
   */
  async deleteSession(sessionId: string): Promise<void> {
    try {
      await apiClient.delete(API_ENDPOINTS.SESSION(sessionId))
    } catch (error) {
      throw error
    }
  },
}

export default sessionService


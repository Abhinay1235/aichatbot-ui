/**
 * Chat API service
 */

import apiClient from './apiClient'
import { API_ENDPOINTS } from '@utils/constants'
import type { ChatRequest, ChatResponse } from '@types'

export const chatService = {
  /**
   * Send a message to the chatbot
   */
  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    try {
      const response = await apiClient.post<ChatResponse>(
        API_ENDPOINTS.CHAT,
        request
      )
      return response.data
    } catch (error) {
      // Error is already handled by interceptor, but we can add additional handling here
      throw error
    }
  },
}

export default chatService


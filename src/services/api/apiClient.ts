/**
 * Axios API client with interceptors and error handling
 */

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios'
import { API_BASE_URL } from '@utils/constants'

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Log request in development
    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, config.data)
    }
    return config
  },
  (error: AxiosError) => {
    console.error('[API Request Error]', error)
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log(`[API Response] ${response.config.url}`, response.data)
    }
    return response
  },
  (error: AxiosError) => {
    // Handle errors
    if (error.response) {
      // Server responded with error status
      const status = error.response.status
      const data = error.response.data as any
      
      console.error(`[API Error] ${status} ${error.config?.url}`, data)
      
      // Handle specific error cases
      switch (status) {
        case 400:
          throw new Error(data.detail || 'Bad request. Please check your input.')
        case 401:
          throw new Error('Unauthorized. Please check your credentials.')
        case 404:
          throw new Error(data.detail || 'Resource not found.')
        case 500:
          throw new Error(data.detail || 'Server error. Please try again later.')
        default:
          throw new Error(data.detail || `Error: ${status}`)
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('[API Error] No response received', error.request)
      throw new Error('Network error. Please check your connection and try again.')
    } else {
      // Something else happened
      console.error('[API Error]', error.message)
      throw new Error(error.message || 'An unexpected error occurred.')
    }
  }
)

export default apiClient


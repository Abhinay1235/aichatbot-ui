/**
 * Base API hook utilities
 */

import { useMutation, useQuery, useQueryClient, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import type { ApiError } from '@types'

/**
 * Custom error type for API errors
 */
export class ApiException extends Error {
  status?: number
  detail?: string

  constructor(message: string, status?: number, detail?: string) {
    super(message)
    this.name = 'ApiException'
    this.status = status
    this.detail = detail
  }
}

/**
 * Helper to extract error message from API error
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof ApiException) {
    return error.message
  }
  if (error instanceof AxiosError) {
    return error.message || 'An error occurred'
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred'
}

/**
 * Default query options
 */
export const defaultQueryOptions: Partial<UseQueryOptions> = {
  staleTime: 30 * 1000,
  gcTime: 5 * 60 * 1000,
  retry: 2,
}

/**
 * Default mutation options
 */
export const defaultMutationOptions: Partial<UseMutationOptions> = {
  retry: 1,
}


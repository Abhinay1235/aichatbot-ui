/**
 * Date and time utility functions
 */

/**
 * Parse timestamp string and convert to local time
 * Handles UTC timestamps that may not have timezone indicator
 * 
 * @param timestamp - ISO timestamp string (may or may not include timezone)
 * @returns Date object in local timezone
 */
export const parseTimestamp = (timestamp: string): Date => {
  // If timestamp doesn't have timezone info (no Z or +/- offset), treat it as UTC
  if (!timestamp.includes('Z') && !timestamp.match(/[+-]\d{2}:\d{2}$/)) {
    // Append 'Z' to indicate UTC, then JavaScript will convert to local time
    return new Date(timestamp + 'Z')
  }
  // If it already has timezone info, parse normally
  return new Date(timestamp)
}

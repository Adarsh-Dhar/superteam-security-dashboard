import { format } from 'date-fns';

/**
 * Formats a date to "MMM DD" format (e.g., "Apr 19")
 * @param date The date to format
 * @returns A string with formatted date
 */
export function formatDateToMMDD(date: Date): string {
  return format(date, 'MMM dd');
}

/**
 * Formats a date to ISO string date only (YYYY-MM-DD)
 * @param date The date to format
 * @returns A string with formatted ISO date
 */
export function formatToISODate(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

/**
 * Gets the date range for the past N days
 * @param days Number of past days to include
 * @returns An object with startDate and endDate
 */
export function getDateRangeForPastDays(days: number): { startDate: Date, endDate: Date } {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - (days - 1));
  
  return { startDate, endDate };
}

/**
 * Creates an array with dates for each day in the given range
 * @param startDate The start date
 * @param endDate The end date
 * @returns Array of dates between start and end (inclusive)
 */
export function getDatesInRange(startDate: Date, endDate: Date): Date[] {
  const dates: Date[] = [];
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return dates;
}

/**
 * Checks if a date is within the given range
 * @param date The date to check
 * @param startDate Range start date
 * @param endDate Range end date
 * @returns boolean indicating if date is within range
 */
export function isDateInRange(date: Date, startDate: Date, endDate: Date): boolean {
  return date >= startDate && date <= endDate;
}
/**
 * Returns the most recent date from the list of ISO 8601 formatted date strings (YYYY-MM-DD).
 * Assumes all input strings follow correct ISO format.
 */
// TODO: Use a date library like date-fns or dayjs for better date handling
export function getLastCompletedDate(dates: string[]): string | null {
    if (!dates.length) return null;

    return [...dates].sort((a, b) => b.localeCompare(a))[0]; // latest ISO string
  }

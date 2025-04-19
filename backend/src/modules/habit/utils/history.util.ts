import { parseISO, max, format } from "date-fns";

export function getLastCompletedDate(dates: string[]): string | null {
    if (!dates.length) return null;

    const parsedDates = dates.map((date) => parseISO(date));
    const latestDate = max(parsedDates);

    return format(latestDate, "yyyy-MM-dd"); // Return in YYYY-MM-DD format
}

import { parseISO, subDays, isSameDay } from "date-fns";

export function calculateStreak(completedDates: string[]): number {
  const sortedDates = [...completedDates]
    .map((d) => parseISO(d))
    .sort((a, b) => b.getTime() - a.getTime());

  let streak = 0;
  let currentDate = new Date();

  for (const date of sortedDates) {
    if (isSameDay(date, currentDate)) {
      streak++;
      currentDate = subDays(currentDate, 1);
    } else {
      break;
    }
  }

  return streak;
}
